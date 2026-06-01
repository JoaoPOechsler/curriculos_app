import { Curriculo } from "@/lib/data";

export interface ResultadoSugestao {
  curriculo: Curriculo;
  score: number;
  avisos: string[];
}

const CARGO_HABILIDADES: Record<string, string[]> = {
  frontend: ["react", "vue", "angular", "css", "html", "javascript", "typescript"],
  backend: ["node", "java", "python", "php", "sql", "api"],
  fullstack: ["react", "node", "javascript", "typescript", "sql"],
  designer: ["figma", "photoshop", "illustrator", "ux", "ui"],
  devops: ["docker", "kubernetes", "aws", "linux", "git"],
  dados: ["python", "sql", "machine learning", "pandas", "análise"],
  data: ["python", "sql", "machine learning", "pandas"],
};

export function analisarAvisos(curriculo: Curriculo): string[] {
  const avisos: string[] = [];

  if (!curriculo.resumo || curriculo.resumo.trim().length < 100)
    avisos.push("Resumo muito curto — escreva pelo menos 100 caracteres");

  if (!curriculo.experiencias || curriculo.experiencias.length === 0)
    avisos.push("Nenhuma experiência profissional cadastrada");

  if (!curriculo.formacoes || curriculo.formacoes.length === 0)
    avisos.push("Nenhuma formação acadêmica cadastrada");

  if (!curriculo.habilidades || curriculo.habilidades.length < 3)
    avisos.push("Poucas habilidades — adicione pelo menos 3");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(curriculo.email))
    avisos.push("E-mail em formato inválido");

  if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(curriculo.telefone))
    avisos.push("Telefone fora do padrão — use (00) 00000-0000");

  const cargoLow = curriculo.cargo.toLowerCase();
  const habLow = (curriculo.habilidades ?? []).map((h) => h.toLowerCase());
  const match = Object.entries(CARGO_HABILIDADES).find(([k]) => cargoLow.includes(k));
  if (match) {
    const temRelacionada = match[1].some((sk) => habLow.some((h) => h.includes(sk)));
    if (!temRelacionada)
      avisos.push(`Cargo "${curriculo.cargo}" pode ser incompatível com as habilidades informadas`);
  }

  return avisos;
}

function calcularScore(curriculo: Curriculo, termos: string[]): number {
  if (termos.length === 0) return 0;
  let score = 0;
  const habLow = (curriculo.habilidades ?? []).map((h) => h.toLowerCase());

  for (const t of termos) {
    if (curriculo.nome.toLowerCase().includes(t)) score += 1;
    if (curriculo.cargo.toLowerCase().includes(t)) score += 3;
    habLow.forEach((h) => { if (h.includes(t)) score += 2; });
    (curriculo.formacoes ?? []).forEach((f) => {
      if (f.curso.toLowerCase().includes(t)) score += 1;
    });
    (curriculo.experiencias ?? []).forEach((e) => {
      if (e.cargo.toLowerCase().includes(t)) score += 1;
    });
  }

  if ((curriculo.resumo ?? "").length >= 100) score += 1;
  if ((curriculo.experiencias ?? []).length > 0) score += 1;
  if ((curriculo.formacoes ?? []).length > 0) score += 1;
  if ((curriculo.habilidades ?? []).length >= 3) score += 1;

  return score;
}

export function buscarSugestoes(curriculos: Curriculo[], busca: string): ResultadoSugestao[] {
  const termos = busca.toLowerCase().split(/[\s,]+/).filter(Boolean);
  return curriculos
    .map((c) => ({
      curriculo: c,
      score: calcularScore(c, termos),
      avisos: analisarAvisos(c),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}
