import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";


export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }

                const values = {
                    email: credentials.email,
                }

                const findUser = await prisma.user.findFirst({
                    where: values
                })

                if (!findUser) {
                    return null
                }

                const isPasswordValid = await compare(credentials.password, findUser.password)

                if (!findUser.verified) {
                    return null
                }

                return { id: String(findUser.id), email: findUser.email, name: findUser.fullName, role: findUser.role }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    //TODO: Add JWT secret
}



const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
