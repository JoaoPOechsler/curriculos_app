"use client";

import { useState, useEffect } from "react";
import { Search, AlertTriangle, Star } from "lucide-react";
import Link from "next/link";
import { getCurriculos } from "@/lib/curriculoService";
import { Curriculo } from "@/lib/data";
import { buscarSugestoes, ResultadoSugestao } from "@/utils/sugestoesCurriculo";
import { Skeleton } from "./Skeleton";

export default function SugestoesCurriculo() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<ResultadoSugestao[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurriculos().then((data) => {
      setCurriculos(data);
      setLoading(false);
    });
  }, []);

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    if (!busca.trim()) return;
    setResultados(buscarSugestoes(curriculos, busca));
    setBuscado(true);
  }

  return (
    <div>
      <form onSubmit={handleBuscar} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex: React, Frontend, SQL, Designer..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Carregando..." : "Buscar"}
        </button>
      </form>

      {loading && (
        <div className="space-y-3">
          {[1, 2].map((i) => <Skeleton key={i} className="h-28 w-full" />)}
        </div>
      )}

      {buscado && !loading && resultados.length === 0 && (
        <p className="text-center text-gray-400 py-10 text-sm">
          Nenhum currículo com aderência a essa busca.
        </p>
      )}

      <div className="space-y-4">
        {resultados.map(({ curriculo, score, avisos }, idx) => (
          <div key={curriculo.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-400">#{idx + 1}</span>
                  <Link href={`/curriculos/${curriculo.id}`} className="font-semibold text-gray-800 hover:underline">
                    {curriculo.nome}
                  </Link>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{curriculo.cargo}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500 shrink-0">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-semibold">{score}</span>
              </div>
            </div>

            {curriculo.habilidades?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {curriculo.habilidades.map((h) => (
                  <span key={h} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">{h}</span>
                ))}
              </div>
            )}

            {avisos.length > 0 && (
              <div className="border-t border-gray-100 pt-3 mt-3">
                <p className="text-xs font-medium text-amber-600 flex items-center gap-1 mb-2">
                  <AlertTriangle size={12} /> Sugestões de melhoria
                </p>
                <ul className="space-y-1">
                  {avisos.map((a, i) => (
                    <li key={i} className="text-xs text-gray-500">• {a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
