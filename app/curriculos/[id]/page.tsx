import { CURRICULOS_MOCK } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, Briefcase, User, ArrowLeft } from "lucide-react";

export default async function CurriculoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const curriculo = CURRICULOS_MOCK.find((c) => c.id === id);

  if (!curriculo) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/curriculos/visualizar"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={15} />
        Voltar
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-2xl">
            {curriculo.nome.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{curriculo.nome}</h1>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <Briefcase size={13} />
              {curriculo.cargo}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" />
            {curriculo.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" />
            {curriculo.telefone}
          </span>
          <span className="flex items-center gap-2">
            <User size={14} className="text-gray-400" />
            {curriculo.cpf}
          </span>
        </div>

        {curriculo.resumo && (
          <p className="mt-4 text-sm text-gray-600 border-t border-gray-100 pt-4">{curriculo.resumo}</p>
        )}
      </div>

      {curriculo.experiencias.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h2 className="font-semibold text-gray-800 mb-4">Experiências</h2>
          <div className="space-y-4">
            {curriculo.experiencias.map((exp, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-4">
                <p className="font-medium text-gray-800">{exp.cargo}</p>
                <p className="text-sm text-gray-500">{exp.empresa}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {exp.inicio} — {exp.fim}
                </p>
                {exp.descricao && (
                  <p className="text-sm text-gray-600 mt-1">{exp.descricao}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {curriculo.formacoes.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Formação</h2>
          <div className="space-y-4">
            {curriculo.formacoes.map((form, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-4">
                <p className="font-medium text-gray-800">{form.curso}</p>
                <p className="text-sm text-gray-500">
                  {form.instituicao} — {form.nivel}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {form.inicio} — {form.fim}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
