import Link from "next/link";
import { CURRICULOS_MOCK } from "@/lib/data";
import { Mail, Phone, Briefcase } from "lucide-react";

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

      {CURRICULOS_MOCK.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          Nenhum currículo cadastrado ainda.
        </div>
      ) : (
        <div className="grid gap-4">
          {CURRICULOS_MOCK.map((curriculo) => (
            <Link
              key={curriculo.id}
              href={`/curriculos/${curriculo.id}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-lg shrink-0">
                  {curriculo.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-800">{curriculo.nome}</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase size={13} />
                      {curriculo.cargo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={13} />
                      {curriculo.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={13} />
                      {curriculo.telefone}
                    </span>
                  </div>
                  {curriculo.resumo && (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">{curriculo.resumo}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
