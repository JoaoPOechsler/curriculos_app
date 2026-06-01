import SugestoesCurriculo from "@/components/SugestoesCurriculo";

export default function SugestoesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Sugestões de Currículos</h1>
        <p className="text-sm text-gray-500 mt-1">
          Informe habilidades, cargo ou área desejada para encontrar os currículos mais aderentes.
        </p>
      </div>
      <SugestoesCurriculo />
    </div>
  );
}
