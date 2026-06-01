"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getCurriculoById, updateCurriculo } from "@/lib/curriculoService";
import { Curriculo } from "@/lib/data";
import FormCurriculo, { CurriculoFormData } from "@/components/FormCurriculo";
import { Skeleton } from "@/components/Skeleton";

function toFormValues(c: Curriculo): Partial<CurriculoFormData> {
  return {
    nome: c.nome,
    cargo: c.cargo,
    email: c.email,
    telefone: c.telefone,
    cpf: c.cpf,
    resumo: c.resumo,
    foto: c.foto,
    habilidades: (c.habilidades ?? []).map((v) => ({ valor: v })),
    experiencias: (c.experiencias ?? []) as any,
    formacoes: (c.formacoes ?? []) as any,
  };
}

export default function EditarPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurriculoById(id).then((data) => {
      if (!data) router.replace("/curriculos/visualizar");
      else setCurriculo(data);
      setLoading(false);
    });
  }, [id, router]);

  async function onSubmit(data: CurriculoFormData) {
    await updateCurriculo(id, {
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
    toast.success("Currículo atualizado com sucesso!");
    router.push(`/curriculos/${id}`);
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href={`/curriculos/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Voltar
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Currículo</h1>
      {curriculo && (
        <FormCurriculo
          defaultValues={toFormValues(curriculo)}
          onSubmit={onSubmit}
          isEditing
        />
      )}
    </div>
  );
}
