"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Início" },
  { href: "/curriculos/visualizar", label: "Currículos" },
  { href: "/curriculos/cadastrar", label: "Cadastrar" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold text-gray-800">CurriculoApp</span>
        <nav className="flex gap-1">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn(
                "px-3 py-1.5 rounded text-sm transition-colors",
                pathname === href
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              )}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
