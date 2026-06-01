"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MaskedInput from "./MaskedInput";

const expSchema = yup.object({
  empresa: yup.string().required("Empresa é obrigatória"),
  cargo: yup.string().required("Cargo é obrigatório"),
  inicio: yup.string().required("Início é obrigatório"),
  fim: yup.string().required("Fim é obrigatório"),
  descricao: yup.string().default(""),
});

const formacaoSchema = yup.object({
  instituicao: yup.string().required("Instituição é obrigatória"),
  curso: yup.string().required("Curso é obrigatório"),
  nivel: yup.string().required("Nível é obrigatório"),
  inicio: yup.string().required("Início é obrigatório"),
  fim: yup.string().required("Fim é obrigatório"),
});

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cargo: yup.string().required("Cargo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  resumo: yup.string().default(""),
  foto: yup.string().default(""),
  habilidades: yup.array().of(yup.object({ valor: yup.string().required() })).default([]),
  experiencias: yup.array().of(expSchema).default([]),
  formacoes: yup.array().of(formacaoSchema).default([]),
});

export type CurriculoFormData = yup.InferType<typeof schema>;

interface Props {
  defaultValues?: Partial<CurriculoFormData>;
  onSubmit: (data: CurriculoFormData) => Promise<void>;
  isEditing?: boolean;
}

const input = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-gray-800">{title}</h2>
      <button type="button" onClick={onAdd} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <Plus size={14} /> Adicionar
      </button>
    </div>
  );
}

export default function FormCurriculo({ defaultValues, onSubmit, isEditing }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CurriculoFormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues ?? { habilidades: [], experiencias: [], formacoes: [] },
  });

  const { fields: habFields, append: addHab, remove: removeHab } =
    useFieldArray({ control, name: "habilidades" });
  const { fields: expFields, append: addExp, remove: removeExp } =
    useFieldArray({ control, name: "experiencias" });
  const { fields: formFields, append: addForm, remove: removeForm } =
    useFieldArray({ control, name: "formacoes" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Dados pessoais */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Dados pessoais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nome completo" error={errors.nome?.message}>
            <input {...register("nome")} className={input} placeholder="João da Silva" />
          </Field>
          <Field label="Cargo desejado" error={errors.cargo?.message}>
            <input {...register("cargo")} className={input} placeholder="Desenvolvedor Frontend" />
          </Field>
          <Field label="E-mail" error={errors.email?.message}>
            <input {...register("email")} type="email" className={input} placeholder="joao@email.com" />
          </Field>
          <Field label="Telefone" error={errors.telefone?.message}>
            <MaskedInput mask="telefone" {...register("telefone")} className={input} placeholder="(00) 00000-0000" />
          </Field>
          <Field label="CPF" error={errors.cpf?.message}>
            <MaskedInput mask="cpf" {...register("cpf")} className={input} placeholder="000.000.000-00" />
          </Field>
          <Field label="Foto (URL da imagem)" error={errors.foto?.message}>
            <input {...register("foto")} className={input} placeholder="https://..." />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Resumo profissional" error={errors.resumo?.message}>
            <textarea
              {...register("resumo")}
              className={input}
              rows={4}
              placeholder="Descreva sua experiência e objetivos profissionais (mínimo 100 caracteres)..."
            />
          </Field>
        </div>
      </section>

      {/* Habilidades */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader title="Habilidades" onAdd={() => addHab({ valor: "" })} />
        {habFields.length === 0 && (
          <p className="text-sm text-gray-400">Nenhuma habilidade adicionada.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {habFields.map((field, i) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`habilidades.${i}.valor`)}
                className={cn(input, "flex-1")}
                placeholder="Ex: React, TypeScript, SQL..."
              />
              <button type="button" onClick={() => removeHab(i)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Experiências */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader
          title="Experiências profissionais"
          onAdd={() => addExp({ empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}
        />
        {expFields.length === 0 && (
          <p className="text-sm text-gray-400">Nenhuma experiência adicionada.</p>
        )}
        <div className="space-y-4">
          {expFields.map((field, i) => (
            <div key={field.id} className="border border-gray-100 rounded-lg p-4 relative">
              <button type="button" onClick={() => removeExp(i)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                <Field label="Empresa" error={(errors.experiencias?.[i] as any)?.empresa?.message}>
                  <input {...register(`experiencias.${i}.empresa`)} className={input} placeholder="Nome da empresa" />
                </Field>
                <Field label="Cargo" error={(errors.experiencias?.[i] as any)?.cargo?.message}>
                  <input {...register(`experiencias.${i}.cargo`)} className={input} placeholder="Cargo exercido" />
                </Field>
                <Field label="Início" error={(errors.experiencias?.[i] as any)?.inicio?.message}>
                  <MaskedInput mask="data" {...register(`experiencias.${i}.inicio`)} className={input} placeholder="MM/AAAA" />
                </Field>
                <Field label="Fim" error={(errors.experiencias?.[i] as any)?.fim?.message}>
                  <MaskedInput mask="data" {...register(`experiencias.${i}.fim`)} className={input} placeholder="MM/AAAA ou Atual" />
                </Field>
              </div>
              <div className="mt-3 pr-8">
                <Field label="Descrição" error={(errors.experiencias?.[i] as any)?.descricao?.message}>
                  <textarea {...register(`experiencias.${i}.descricao`)} className={input} rows={2} placeholder="Atividades realizadas..." />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formações */}
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader
          title="Formação acadêmica"
          onAdd={() => addForm({ instituicao: "", curso: "", nivel: "", inicio: "", fim: "" })}
        />
        {formFields.length === 0 && (
          <p className="text-sm text-gray-400">Nenhuma formação adicionada.</p>
        )}
        <div className="space-y-4">
          {formFields.map((field, i) => (
            <div key={field.id} className="border border-gray-100 rounded-lg p-4 relative">
              <button type="button" onClick={() => removeForm(i)} className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                <Field label="Instituição" error={(errors.formacoes?.[i] as any)?.instituicao?.message}>
                  <input {...register(`formacoes.${i}.instituicao`)} className={input} placeholder="Nome da instituição" />
                </Field>
                <Field label="Curso" error={(errors.formacoes?.[i] as any)?.curso?.message}>
                  <input {...register(`formacoes.${i}.curso`)} className={input} placeholder="Nome do curso" />
                </Field>
                <Field label="Nível" error={(errors.formacoes?.[i] as any)?.nivel?.message}>
                  <select {...register(`formacoes.${i}.nivel`)} className={input}>
                    <option value="">Selecione...</option>
                    <option>Técnico</option>
                    <option>Graduação</option>
                    <option>Pós-graduação</option>
                    <option>MBA</option>
                    <option>Mestrado</option>
                    <option>Doutorado</option>
                  </select>
                </Field>
                <Field label="Início" error={(errors.formacoes?.[i] as any)?.inicio?.message}>
                  <MaskedInput mask="data" {...register(`formacoes.${i}.inicio`)} className={input} placeholder="MM/AAAA" />
                </Field>
                <Field label="Fim" error={(errors.formacoes?.[i] as any)?.fim?.message}>
                  <MaskedInput mask="data" {...register(`formacoes.${i}.fim`)} className={input} placeholder="MM/AAAA ou Em andamento" />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3 pb-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
