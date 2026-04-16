import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Sistema de Gestão de Currículos
      </h1>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Cadastre, visualize e gerencie currículos de forma simples e rápida.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/curriculos/visualizar"
          className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          Ver Currículos
        </Link>
        <Link href="/curriculos/cadastrar"
          className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          Cadastrar
        </Link>
      </div>
    </div>
  );
}
