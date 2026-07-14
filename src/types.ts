export interface CurriculumItem {
  id: string;
  ano: string;
  bimestre: string;
  aula: string;
  titulo: string;
  conteudo: string;
  objetivos: string;
  habilidade: string;
  aprendizagem: string;
  disciplina?: string;
}

export type GradeFilter = 'Todos' | '6º Ano' | '7º Ano' | '8º Ano' | '9º Ano' | '1ª Série' | '2ª Série' | '3ª Série';
export type BimestreFilter = 'Todos' | '1º Bimestre' | '2º Bimestre' | '3º Bimestre' | '4º Bimestre';
