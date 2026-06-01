"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormCurriculo, { CurriculoFormData } from "@/components/FormCurriculo";
import { createCurriculo } from "@/lib/curriculoService";

export default function CadastrarPage() {
  const router = useRouter();

  async function onSubmit(data: CurriculoFormData) {
    await createCurriculo({
      nome: data.nome,
      cargo: data.cargo,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf,
      resumo: data.resumo ?? "",
      foto: data.foto ?? "",
      habilidades: (data.habilidades ?? []).map((h) => h.valor),
      experiencias: (data.experiencias ?? []) as any,
      formacoes: (data.formacoes ?? []) as any,
    });
    toast.success("Currículo cadastrado com sucesso!");
    router.push("/curriculos/visualizar");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Currículo</h1>
      <FormCurriculo onSubmit={onSubmit} />
    </div>
  );
}
