"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cargo: yup.string().required("Cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  resumo: yup.string().default(""),
});

type FormData = yup.InferType<typeof schema>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent";

export default function CadastrarPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Currículo cadastrado com sucesso!");
    router.push("/curriculos/visualizar");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Currículo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nome completo" error={errors.nome?.message}>
            <input {...register("nome")} className={inputClass} placeholder="Ex: João da Silva" />
          </Field>

          <Field label="Cargo desejado" error={errors.cargo?.message}>
            <input {...register("cargo")} className={inputClass} placeholder="Ex: Desenvolvedor Frontend" />
          </Field>

          <Field label="E-mail" error={errors.email?.message}>
            <input {...register("email")} type="email" className={inputClass} placeholder="joao@email.com" />
          </Field>

          <Field label="Telefone" error={errors.telefone?.message}>
            <input {...register("telefone")} className={inputClass} placeholder="(00) 00000-0000" />
          </Field>

          <Field label="CPF" error={errors.cpf?.message}>
            <input {...register("cpf")} className={inputClass} placeholder="000.000.000-00" />
          </Field>
        </div>

        <Field label="Resumo profissional" error={errors.resumo?.message}>
          <textarea
            {...register("resumo")}
            className={inputClass}
            rows={4}
            placeholder="Descreva brevemente sua experiência e objetivos..."
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : "Cadastrar"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
