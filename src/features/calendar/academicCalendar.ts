export interface AssessmentEvent {
  id: string;
  name: 'Provão Paulista' | 'SARESP' | 'ENEM' | 'SAEB';
  grade: string;
  segment: 'ENSINO FUNDAMENTAL ANOS INICIAIS' | 'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO' | 'TODOS';
  dates: string[];
  daysDescription: string;
  type: 'remoto' | 'presencial' | 'final_de_semana' | 'a_definir';
  ruleNotice: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    dot: string;
  };
}

export interface WeekCalendarInfo {
  num: number;
  period: string;
  holiday?: string;
  events?: string[];
  operationalNotice?: string;
}

export const EXTERNAL_ASSESSMENTS_2026: AssessmentEvent[] = [
  // Provão Paulista
  {
    id: 'provao-3em',
    name: 'Provão Paulista',
    grade: '3ª série EM',
    segment: 'ENSINO MÉDIO',
    dates: ['04/11/2026', '05/11/2026'],
    daysDescription: '04 e 05/11 (Quarta e Quinta)',
    type: 'remoto',
    ruleNotice: 'Provão Paulista Seriado (3ª série EM).',
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-900 dark:text-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
      dot: 'bg-indigo-600'
    }
  },
  {
    id: 'provao-2em',
    name: 'Provão Paulista',
    grade: '2ª série EM',
    segment: 'ENSINO MÉDIO',
    dates: ['10/11/2026', '11/11/2026'],
    daysDescription: '10 e 11/11 (Terça e Quarta)',
    type: 'remoto',
    ruleNotice: 'Provão Paulista Seriado (2ª série EM).',
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-900 dark:text-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
      dot: 'bg-indigo-600'
    }
  },
  {
    id: 'provao-1em',
    name: 'Provão Paulista',
    grade: '1ª série EM',
    segment: 'ENSINO MÉDIO',
    dates: ['12/11/2026', '13/11/2026'],
    daysDescription: '12 e 13/11 (Quinta e Sexta)',
    type: 'remoto',
    ruleNotice: 'Provão Paulista Seriado (1ª série EM).',
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-900 dark:text-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700',
      dot: 'bg-indigo-600'
    }
  },

  // SARESP
  {
    id: 'saresp-9ef',
    name: 'SARESP',
    grade: '9º ano EF',
    segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
    dates: ['29/10/2026', '30/10/2026'],
    daysDescription: '29 e 30/10 (Quinta e Sexta)',
    type: 'presencial',
    ruleNotice: 'Aplicação SARESP (9º ano EF).',
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-900 dark:text-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
      dot: 'bg-emerald-600'
    }
  },
  {
    id: 'saresp-6ef',
    name: 'SARESP',
    grade: '6º ano EF',
    segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
    dates: ['19/11/2026'],
    daysDescription: '19/11 (Quinta)',
    type: 'presencial',
    ruleNotice: 'Aplicação SARESP Digital (6º ano EF).',
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-900 dark:text-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
      dot: 'bg-emerald-600'
    }
  },
  {
    id: 'saresp-7ef',
    name: 'SARESP',
    grade: '7º ano EF',
    segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
    dates: ['26/11/2026', '27/11/2026'],
    daysDescription: '26 e 27/11 (Quinta e Sexta)',
    type: 'presencial',
    ruleNotice: 'Aplicação SARESP Digital (7º ano EF).',
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-900 dark:text-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
      dot: 'bg-emerald-600'
    }
  },
  {
    id: 'saresp-8ef',
    name: 'SARESP',
    grade: '8º ano EF',
    segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
    dates: ['30/11/2026', '01/12/2026'],
    daysDescription: '30/11 e 01/12 (Segunda e Terça)',
    type: 'presencial',
    ruleNotice: 'Aplicação SARESP Digital (8º ano EF).',
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-900 dark:text-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
      dot: 'bg-emerald-600'
    }
  },
  {
    id: 'saresp-reposicao',
    name: 'SARESP',
    grade: '6º, 7º e 8º anos EF',
    segment: 'ENSINO FUNDAMENTAL ANOS FINAIS',
    dates: ['02/12/2026', '03/12/2026'],
    daysDescription: '02 e 03/12 (Quarta e Quinta)',
    type: 'presencial',
    ruleNotice: 'Reposição SARESP (6º, 7º e 8º anos).',
    color: {
      bg: 'bg-teal-50 dark:bg-teal-950/40',
      border: 'border-teal-200 dark:border-teal-800',
      text: 'text-teal-900 dark:text-teal-200',
      badge: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 border-teal-200 dark:border-teal-700',
      dot: 'bg-teal-600'
    }
  },

  // ENEM
  {
    id: 'enem-2026',
    name: 'ENEM',
    grade: 'Geral / 3ª série EM',
    segment: 'ENSINO MÉDIO',
    dates: ['08/11/2026', '15/11/2026'],
    daysDescription: '08 e 15/11 (Domingos)',
    type: 'final_de_semana',
    ruleNotice: 'Exame Nacional do Ensino Médio aos domingos (sem impacto na grade regular).',
    color: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-900 dark:text-amber-200',
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-700',
      dot: 'bg-amber-600'
    }
  },

  // SAEB
  {
    id: 'saeb-2026',
    name: 'SAEB',
    grade: 'Turmas Amostrais / Censo',
    segment: 'TODOS',
    dates: [],
    daysDescription: 'Data não publicada (Aguardando portaria MEC/Inep)',
    type: 'a_definir',
    ruleNotice: 'Data ainda não publicada oficialmente pelos órgãos federais.',
    color: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-900 dark:text-purple-200',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300 border-purple-200 dark:border-purple-700',
      dot: 'bg-purple-600'
    }
  }
];

export const CALENDAR_2026_CONFIG = {
  year: 2026,
  bimesters: {
    '1º Bimestre': {
      rangeLabel: '1º Bimestre (02/02 a 10/04/2026)',
      start: '02/02/2026',
      end: '10/04/2026',
      weeksCount: 10
    },
    '2º Bimestre': {
      rangeLabel: '2º Bimestre (23/04 a 08/07/2026)',
      start: '23/04/2026',
      end: '08/07/2026',
      weeksCount: 10
    },
    '3º Bimestre': {
      rangeLabel: '3º Bimestre (24/07 a 02/10/2026)',
      start: '24/07/2026',
      end: '02/10/2026',
      weeksCount: 10
    },
    '4º Bimestre': {
      rangeLabel: '4º Bimestre (05/10 a 18/12/2026)',
      start: '05/10/2026',
      end: '18/12/2026',
      weeksCount: 11
    }
  }
};

export function getBimestreDateRange(bim: string): string {
  if (bim === '1º Bimestre') return '1º (02/02 a 10/04/2026)';
  if (bim === '2º Bimestre') return '2º (23/04 a 08/07/2026)';
  if (bim === '3º Bimestre') return '3º (24/07 a 02/10/2026)';
  if (bim === '4º Bimestre') return '4º (05/10 a 18/12/2026)';
  return bim;
}

export function getWeeksForBimestre(bimestre: string): WeekCalendarInfo[] {
  if (bimestre === '1º Bimestre') {
    return [
      { num: 1, period: "02 a 06/02/2026", holiday: "" },
      { num: 2, period: "09 a 13/02/2026", holiday: "" },
      { num: 3, period: "16 a 20/02/2026", holiday: "Feriado: 17/02 - Carnaval" },
      { num: 4, period: "23 a 27/02/2026", holiday: "" },
      { num: 5, period: "02 a 06/03/2026", holiday: "" },
      { num: 6, period: "09 a 13/03/2026", holiday: "" },
      { num: 7, period: "16 a 20/03/2026", holiday: "" },
      { num: 8, period: "23 a 27/03/2026", holiday: "Revisão / Prova Paulista" },
      { num: 9, period: "30/03 a 03/04/2026", holiday: "Feriado: 03/04 - Sexta-feira Santa; Recuperação" },
      { num: 10, period: "06 a 10/04/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '2º Bimestre') {
    return [
      { num: 1, period: "22 a 30/04/2026", holiday: "Dia do Trabalho (01/05)" },
      { num: 2, period: "04 a 08/05/2026", holiday: "" },
      { num: 3, period: "11 a 15/05/2026", holiday: "" },
      { num: 4, period: "18 a 22/05/2026", holiday: "" },
      { num: 5, period: "25 a 29/05/2026", holiday: "" },
      { num: 6, period: "01 a 05/06/2026", holiday: "Feriado: 04/06 - Corpus Christi" },
      { num: 7, period: "08 a 12/06/2026", holiday: "" },
      { num: 8, period: "15 a 19/06/2026", holiday: "Prova Paulista" },
      { num: 9, period: "22 a 26/06/2026", holiday: "Recuperação" },
      { num: 10, period: "29/06 a 03/07/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '3º Bimestre') {
    return [
      { num: 1, period: "24 a 31/07/2026", holiday: "" },
      { num: 2, period: "03 a 07/08/2026", holiday: "" },
      { num: 3, period: "10 a 14/08/2026", holiday: "" },
      { num: 4, period: "17 a 21/08/2026", holiday: "" },
      { num: 5, period: "24 a 28/08/2026", holiday: "" },
      { num: 6, period: "31/08 a 04/09/2026", holiday: "" },
      { num: 7, period: "07 a 11/09/2026", holiday: "Feriado: 07/09 - Independência do Brasil" },
      { num: 8, period: "14 a 18/09/2026", holiday: "Revisão e Preparatório" },
      { num: 9, period: "21 a 25/09/2026", holiday: "PROVA PAULISTA 3º BIMESTRE" },
      { num: 10, period: "28/09 a 02/10/2026", holiday: "Consolidação e Devolutiva" }
    ];
  }
  // 4º Bimestre (Detalhamento oficial 2026 - 11 semanas)
  return [
    { 
      num: 1, 
      period: "05/10 a 09/10/2026", 
      holiday: "",
      operationalNotice: "Início do 4º Bimestre e desenvolvimento regular de habilidades."
    },
    { 
      num: 2, 
      period: "12/10 a 16/10/2026", 
      holiday: "12/10 = Feriado Nacional | 13/10 = Catavento e Museu da Língua Portuguesa | 15/10 = Feriado Escolar",
      events: ["12/10: Feriado Nacional", "13/10: Catavento e Museu da Língua Portuguesa", "15/10: Feriado Escolar"],
      operationalNotice: "12/10 Feriado Nacional; 13/10 Saída Cultural (Catavento / Museu da Língua Portuguesa); 15/10 Feriado Escolar (Dia do Professor)."
    },
    { 
      num: 3, 
      period: "19/10 a 23/10/2026", 
      holiday: "",
      operationalNotice: "Desenvolvimento curricular regular e consolidação."
    },
    { 
      num: 4, 
      period: "26/10 a 30/10/2026", 
      holiday: "29 e 30/10 = SARESP (9º ano)",
      events: ["29 e 30/10: SARESP (9º ano)"],
      operationalNotice: "Aplicação do SARESP para o 9º ano EF em 29 e 30/10."
    },
    { 
      num: 5, 
      period: "02/11 a 06/11/2026", 
      holiday: "02/11 = Feriado Nacional (Finados) | 04 e 05/11 = Provão Paulista Seriado (3ª série EM)",
      events: ["02/11: Feriado Nacional (Finados)", "04 e 05/11: Provão Paulista (3ª série EM)"],
      operationalNotice: "Feriado de Finados em 02/11. Provão Paulista Seriado da 3ª série EM em 04 e 05/11."
    },
    { 
      num: 6, 
      period: "09/11 a 13/11/2026", 
      holiday: "10 e 11/11 = Provão Paulista Seriado (2ª série EM) | 12 e 13/11 = Provão Paulista Seriado (1ª série EM)",
      events: ["10 e 11/11: Provão Paulista (2ª série EM)", "12 e 13/11: Provão Paulista (1ª série EM)"],
      operationalNotice: "Provão Paulista Seriado da 2ª série (10 e 11/11) e 1ª série (12 e 13/11)."
    },
    { 
      num: 7, 
      period: "16/11 a 20/11/2026", 
      holiday: "19/11 = SARESP Digital (6º ano) | 20/11 = Feriado Nacional (Consciência Negra)",
      events: ["19/11: SARESP Digital (6º ano)", "20/11: Feriado Nacional (Consciência Negra)"],
      operationalNotice: "SARESP Digital 6º ano EF em 19/11. Feriado Nacional (Consciência Negra) em 20/11."
    },
    { 
      num: 8, 
      period: "23/11 a 27/11/2026", 
      holiday: "26 e 27/11 = SARESP Digital (7º ano) | 28/11 = Feriado Escolar",
      events: ["26 e 27/11: SARESP Digital (7º ano)", "28/11: Feriado Escolar"],
      operationalNotice: "SARESP Digital 7º ano EF em 26 e 27/11. Feriado escolar em 28/11."
    },
    { 
      num: 9, 
      period: "30/11 a 04/12/2026", 
      holiday: "30/11 e 01/12 = SARESP Digital (8º ano) | 02 e 03/12 = Reposição SARESP (6º, 7º e 8º anos)",
      events: ["30/11 e 01/12: SARESP Digital (8º ano)", "02 e 03/12: Reposição SARESP (6º, 7º e 8º anos)"],
      operationalNotice: "SARESP Digital 8º ano (30/11 e 01/12) e Reposição SARESP 6º, 7º e 8º anos (02 e 03/12)."
    },
    { 
      num: 10, 
      period: "07/12 a 11/12/2026", 
      holiday: "07, 08 e 09/12 = Recuperação Semestral SEDUC | 08/12 = Feriado Municipal",
      events: ["07, 08 e 09/12: Recuperação Semestral SEDUC", "08/12: Feriado Municipal"],
      operationalNotice: "Recuperação Semestral SEDUC (07, 08 e 09/12) e Feriado Municipal em 08/12."
    },
    { 
      num: 11, 
      period: "14/12 a 18/12/2026", 
      holiday: "14 a 18/12 = Conselho Final e Fechamento | 18/12 = Encerramento do Ano Letivo",
      events: ["14 a 18/12: Conselho Final e Fechamento", "18/12: Encerramento do Ano Letivo"],
      operationalNotice: "Conselho de Classe Final, Fechamento e Encerramento do Ano Letivo em 18/12/2026."
    }
  ];
}

export function getWeekPeriod(bimestre: string, weekIndex: number): string {
  const weeks = getWeeksForBimestre(bimestre);
  const w = weeks[weekIndex];
  if (!w) return '';
  if (w.holiday) {
    return `${w.period} | ${w.holiday}`;
  }
  return w.period;
}

export function getAssessmentsForGrade(grade: string): AssessmentEvent[] {
  const normalized = grade.trim().toLowerCase();
  return EXTERNAL_ASSESSMENTS_2026.filter(event => {
    if (event.segment === 'TODOS') return true;
    const eventGrade = event.grade.toLowerCase();
    if (normalized.includes('3ª') || normalized.includes('3a') || normalized.includes('3º') || normalized.includes('3o')) {
      return eventGrade.includes('3ª') || eventGrade.includes('3º');
    }
    if (normalized.includes('2ª') || normalized.includes('2a') || normalized.includes('2º') || normalized.includes('2o')) {
      return eventGrade.includes('2ª') || eventGrade.includes('2º');
    }
    if (normalized.includes('1ª') || normalized.includes('1a') || normalized.includes('1º') || normalized.includes('1o')) {
      return eventGrade.includes('1ª') || eventGrade.includes('1º');
    }
    if (normalized.includes('9º') || normalized.includes('9o')) return eventGrade.includes('9º');
    if (normalized.includes('8º') || normalized.includes('8o')) return eventGrade.includes('8º');
    if (normalized.includes('7º') || normalized.includes('7o')) return eventGrade.includes('7º');
    if (normalized.includes('6º') || normalized.includes('6o')) return eventGrade.includes('6º');
    if (normalized.includes('5º') || normalized.includes('5o')) return eventGrade.includes('5º');
    return false;
  });
}
