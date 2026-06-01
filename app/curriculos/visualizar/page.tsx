import Link from "next/link";
import ListaCurriculos from "@/components/ListaCurriculos";

export default function VisualizarPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Currículos</h1>
        <Link
          href="/curriculos/cadastrar"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          + Cadastrar
        </Link>
      </div>
      <ListaCurriculos />
    </div>
  );
}
