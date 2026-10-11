export interface CurriculumItem {
  id: string;
  ano: string;
  bimestre: string;
  aula: string;
  titulo?: string;
  conteudo?: string;
  objetivos?: string;
  habilidade?: string;
  aprendizagem?: string;
  disciplina?: string;
  eixo?: string;
  unidadeTematica?: string;
  objetoConhecimento?: string;
  habilidadeCodigo?: string;
  habilidadeTexto?: string;
  semanaInicio?: number;
  semanaFim?: number;
  tipo?: string;
  raw?: any;
  [key: string]: any;
}

export type GradeFilter = 'Todos' | '6º Ano' | '7º Ano' | '8º Ano' | '9º Ano' | '1ª Série' | '2ª Série' | '3ª Série';
export type BimestreFilter = 'Todos' | '1º Bimestre' | '2º Bimestre' | '3º Bimestre' | '4º Bimestre';

export type PlanFormat = 'campinas-leste' | 'ava-efape' | 'campinas-leste-custom';

export interface WeeklyAllocation {
  lessonKeys?: string[];
  projectDates?: string;
  projectDescription?: string;
}

export interface WeekPlan {
  semana: number;
  periodo: string;
  aulas_escopo: string;
  ae: string;
  acoes_bloom: string;
  conteudos: string;
  estrategia: string;
  estrategia_verificacao?: string;
  avaliacao: string;
  lessons?: any[];
  isProjectWeek?: boolean;
  projectTitle?: string;
  projectDescription?: string;
}

export interface MarginSettings {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

