import { MarginSettings, PlanFormat, WeekPlan } from '../../types';

export interface PlanningIdentification {
  schoolName: string;
  docenteName: string;
  segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO';
  subjectCategory: 'FGB' | 'DIVERSIFACADA' | 'ITINERARIOS' | 'TECNICO';
}

export interface PlanningCurriculumContext {
  subject: string;
  grade: string;
  bimester: string;
}

export interface WeeklyAllocation {
  lessonKeys: string[];
  projectDates: string;
  projectDescription: string;
}

export interface PlanningDraft {
  id?: string;
  userId?: string;
  identification: PlanningIdentification;
  curriculumContext: PlanningCurriculumContext;
  selectedLessonKeys: string[];
  orderedSelectedLessons: string[];
  weeklyAllocations: Record<number, WeeklyAllocation>;
  planFormat: PlanFormat;
  marginSettings: MarginSettings;
  trabalhosDate: string;
  avaliacoesDate: string;
  sarespDate: string;
  generatedDocHtml?: string | null;
  generatedWeeks?: WeekPlan[];
  createdAt?: string;
  updatedAt?: string;
}

export function createEmptyPlanningDraft(): PlanningDraft {
  return {
    identification: {
      schoolName: '',
      docenteName: '',
      segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
      subjectCategory: 'FGB',
    },
    curriculumContext: {
      subject: 'Matemática',
      grade: '6º Ano',
      bimester: '3º Bimestre',
    },
    selectedLessonKeys: [],
    orderedSelectedLessons: [],
    weeklyAllocations: {},
    planFormat: 'campinas-leste',
    marginSettings: {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    },
    trabalhosDate: '18 a 22/05/2026',
    avaliacoesDate: '15 a 19/06/2026',
    sarespDate: '25/11/2026 e 26/11/2026',
    generatedDocHtml: null,
    generatedWeeks: [],
  };
}

export function validatePlanningDraft(draft: PlanningDraft): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!draft.curriculumContext.subject) {
    errors.push('O componente curricular (disciplina) é obrigatório.');
  }

  if (!draft.curriculumContext.grade) {
    errors.push('O ano/série é obrigatório.');
  }

  if (!draft.curriculumContext.bimester) {
    errors.push('O bimestre é obrigatório.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
