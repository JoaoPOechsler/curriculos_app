"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { getCurriculos } from "@/lib/curriculoService";
import { Curriculo } from "@/lib/data";
import CardCurriculo from "./CardCurriculo";
import { Skeleton } from "./Skeleton";

export default function ListaCurriculos() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCurriculos();
      setCurriculos(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const filtrados = curriculos.filter((c) => {
    const q = busca.toLowerCase();
    return c.nome.toLowerCase().includes(q) || c.cargo.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome ou cargo..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : filtrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          {busca ? "Nenhum currículo encontrado para esta busca." : "Nenhum currículo cadastrado ainda."}
        </div>
      ) : (
        <div className="grid gap-3">
          {filtrados.map((c) => (
            <CardCurriculo key={c.id} curriculo={c} onDeleted={carregar} />
          ))}
        </div>
      )}
    </div>
  );
}
