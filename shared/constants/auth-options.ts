import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";
import type { Account, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[AUTHORIZE] credentials:", credentials);
        if (!credentials) return null;

        const findUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!findUser || !findUser.password || !findUser.verified) {
          console.log("[AUTHORIZE] User not found or invalid:", findUser);
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          console.log("[AUTHORIZE] Invalid password");
          return null;
        }

        console.log("[AUTHORIZE] Successful login for:", findUser.email);
        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      try {
        console.log("[SIGNIN] user:", user, "account:", account);
        if (account?.provider === "credentials") {
          console.log("[SIGNIN] Credentials login success");
          return true;
        }

        if (!user.email) {
          console.log("[SIGNIN] OAuth login failed: No email");
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (findUser) {
          console.log("[SIGNIN] Found existing user:", findUser.email);
          if (!findUser.provider || !findUser.providerId) {
            await prisma.user.update({
              where: { id: findUser.id },
              data: {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
            });
          }
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        console.log("[SIGNIN] New OAuth user created:", user.email);
        return true;
      } catch (error) {
        console.log("Error [SIGNIN]", error);
        return false;
      }
    },

    async jwt({ token }: { token: JWT }) {
      if (!token.email) return token;

      const findUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.name = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },

    session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
};