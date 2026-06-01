"use client";

import Link from "next/link";
import { Mail, Phone, Briefcase, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Curriculo } from "@/lib/data";
import { deleteCurriculo } from "@/lib/curriculoService";
import { toast } from "sonner";

interface Props {
  curriculo: Curriculo;
  onDeleted?: () => void;
}

export default function CardCurriculo({ curriculo, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteCurriculo(curriculo.id);
      toast.success("Currículo excluído");
      setOpen(false);
      onDeleted?.();
    } catch {
      toast.error("Erro ao excluir o currículo");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-lg shrink-0">
          {curriculo.foto ? (
            <img src={curriculo.foto} alt={curriculo.nome} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            curriculo.nome.charAt(0)
          )}
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/curriculos/${curriculo.id}`} className="font-semibold text-gray-800 hover:underline">
            {curriculo.nome}
          </Link>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Briefcase size={13} />{curriculo.cargo}</span>
            <span className="flex items-center gap-1"><Mail size={13} />{curriculo.email}</span>
            <span className="flex items-center gap-1"><Phone size={13} />{curriculo.telefone}</span>
          </div>
          {curriculo.habilidades?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {curriculo.habilidades.slice(0, 5).map((h) => (
                <span key={h} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{h}</span>
              ))}
              {curriculo.habilidades.length > 5 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full text-xs">+{curriculo.habilidades.length - 5}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-1 shrink-0">
          <Link
            href={`/curriculos/${curriculo.id}/editar`}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Pencil size={15} />
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={15} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl z-50 w-full max-w-sm mx-4">
                <Dialog.Title className="font-semibold text-gray-800 mb-2">Excluir currículo</Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500 mb-6">
                  Tem certeza que deseja excluir o currículo de <strong>{curriculo.nome}</strong>? Essa ação não pode ser desfeita.
                </Dialog.Description>
                <div className="flex gap-3 justify-end">
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Cancelar
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deleting ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
