import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CurriculoApp",
  description: "Sistema de Gestão de Currículos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
