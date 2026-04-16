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
  experiencias: Experiencia[];
  formacoes: Formacao[];
}

export const CURRICULOS_MOCK: Curriculo[] = [
  {
    id: "1",
    nome: "Ana Paula Silva",
    cargo: "Desenvolvedora Frontend",
    email: "ana.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    resumo: "Desenvolvedora com 5 anos de experiência em React e Next.js, apaixonada por UI/UX e acessibilidade.",
    foto: "/avatars/avatar1.png",
    experiencias: [
      {
        empresa: "TechCorp",
        cargo: "Frontend Developer",
        inicio: "01/2020",
        fim: "12/2023",
        descricao: "Desenvolvimento de interfaces com React e TypeScript.",
      },
    ],
    formacoes: [
      {
        instituicao: "USP",
        curso: "Ciência da Computação",
        nivel: "Graduação",
        inicio: "01/2015",
        fim: "12/2019",
      },
    ],
  },
  {
    id: "2",
    nome: "Carlos Eduardo Mendes",
    cargo: "Engenheiro de Software",
    email: "carlos.mendes@email.com",
    telefone: "(21) 99876-5432",
    cpf: "987.654.321-00",
    resumo: "Engenheiro backend especializado em Node.js, microsserviços e arquitetura em nuvem.",
    foto: "/avatars/avatar2.png",
    experiencias: [
      {
        empresa: "Startup XYZ",
        cargo: "Backend Engineer",
        inicio: "03/2021",
        fim: "Atual",
        descricao: "Criação de APIs REST e GraphQL para produtos SaaS.",
      },
    ],
    formacoes: [
      {
        instituicao: "UNICAMP",
        curso: "Engenharia de Computação",
        nivel: "Graduação",
        inicio: "01/2016",
        fim: "12/2020",
      },
    ],
  },
  {
    id: "3",
    nome: "Fernanda Costa Rodrigues",
    cargo: "UX Designer",
    email: "fernanda.rodrigues@email.com",
    telefone: "(31) 97654-3210",
    cpf: "456.789.123-00",
    resumo: "Designer com foco em pesquisa de usuário, prototipagem e design systems para produtos digitais.",
    foto: "/avatars/avatar3.png",
    experiencias: [
      {
        empresa: "DesignLab",
        cargo: "UX Designer",
        inicio: "06/2019",
        fim: "Atual",
        descricao: "Condução de pesquisas qualitativas e criação de protótipos de alta fidelidade.",
      },
    ],
    formacoes: [
      {
        instituicao: "PUC-MG",
        curso: "Design Gráfico",
        nivel: "Graduação",
        inicio: "01/2015",
        fim: "12/2018",
      },
    ],
  },
];
