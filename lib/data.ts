export interface Experiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  descricao: string;
}

export interface Formacao {
  instituicao: string;
  curso: string;
  nivel: string;
  inicio: string;
  fim: string;
}

export interface Curriculo {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  foto: string;
  habilidades: string[];
  experiencias: Experiencia[];
  formacoes: Formacao[];
  createdAt: string;
}
