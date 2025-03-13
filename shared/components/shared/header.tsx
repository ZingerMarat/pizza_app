"use client";

import React, { use } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import { Button } from "../ui";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    if (searchParams.has("paid")) {
      setTimeout(() => {
        router.replace("/");
        toast.success("Order payed successfully");
      }, 500);
    }

    if (searchParams.has("verified")) {
      setTimeout(() => {
        router.replace("/");
        toast.success("Email verified successfully");
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-m text-gray-400 leading-3">it couldn't be tastier</p>
            </div>
          </div>
        </Link>

        {/* Center */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};
