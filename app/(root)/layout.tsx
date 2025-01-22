import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared/header";

export const metadata: Metadata = {
  title: "Zinger Pizza | Main Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
    </main>
  );
}
