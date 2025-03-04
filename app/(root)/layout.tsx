import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/shared/components/shared/header";

export const metadata: Metadata = {
  title: "Next Pizza | Main Page",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      {modal}
    </main>
  );
}
