export interface WeekCalendarInfo {
  index: number;
  label: string;
  startDate: string;
  endDate: string;
  holiday?: string;
  isSarespWeek?: boolean;
}

export interface BimestreCalendarInfo {
  number: string;
  label: string;
  dateRange: string;
  weeks: WeekCalendarInfo[];
}

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
      rangeLabel: '4º Bimestre (13/10 a 18/12/2026)',
      start: '13/10/2026',
      end: '18/12/2026',
      weeksCount: 10
    }
  }
};

export function getBimestreDateRange(bim: string): string {
  if (bim === '1º Bimestre') return '1º (02/02 a 10/04/2026)';
  if (bim === '2º Bimestre') return '2º (23/04 a 08/07/2026)';
  if (bim === '3º Bimestre') return '3º (24/07 a 02/10/2026)';
  if (bim === '4º Bimestre') return '4º (13/10 a 18/12/2026)';
  return bim;
}

export function getWeeksForBimestre(bimestre: string): string[] {
  if (bimestre === '1º Bimestre') {
    return [
      'Semana 01 (02/02 a 06/02)',
      'Semana 02 (09/02 a 13/02)',
      'Semana 03 (16/02 a 20/02) - Carnaval',
      'Semana 04 (23/02 a 27/02)',
      'Semana 05 (02/03 a 06/03)',
      'Semana 06 (09/03 a 13/03)',
      'Semana 07 (16/03 a 20/03)',
      'Semana 08 (23/03 a 27/03)',
      'Semana 09 (30/03 a 03/04) - Paixão de Cristo',
      'Semana 10 (06/04 a 10/04)'
    ];
  }
  if (bimestre === '2º Bimestre') {
    return [
      'Semana 01 (23/04 a 24/04)',
      'Semana 02 (27/04 a 01/05) - Dia do Trabalho',
      'Semana 03 (04/05 a 08/05)',
      'Semana 04 (11/05 a 15/05)',
      'Semana 05 (18/05 a 22/05)',
      'Semana 06 (25/05 a 29/05)',
      'Semana 07 (01/06 a 05/06) - Corpus Christi',
      'Semana 08 (08/06 a 12/06)',
      'Semana 09 (15/06 a 19/06)',
      'Semana 10 (22/06 a 26/06)'
    ];
  }
  if (bimestre === '3º Bimestre') {
    return [
      'Semana 01 (24/07 a 31/07)',
      'Semana 02 (03/08 a 07/08)',
      'Semana 03 (10/08 a 14/08)',
      'Semana 04 (17/08 a 21/08)',
      'Semana 05 (24/08 a 28/08)',
      'Semana 06 (31/08 a 04/09)',
      'Semana 07 (08/09 a 11/09) - Independência do Brasil',
      'Semana 08 (14/09 a 18/09)',
      'Semana 09 (21/09 a 25/09)',
      'Semana 10 (28/09 a 02/10)'
    ];
  }
  // 4º Bimestre default
  return [
    'Semana 01 (13/10 a 16/10) - Dia do Professor',
    'Semana 02 (19/10 a 23/10)',
    'Semana 03 (26/10 a 30/10)',
    'Semana 04 (03/11 a 06/11) - Finados',
    'Semana 05 (09/11 a 13/11)',
    'Semana 06 (16/11 a 20/11) - Proclamação da República e C. Negra',
    'Semana 07 (23/11 a 27/11) - SARESP',
    'Semana 08 (30/11 a 04/12)',
    'Semana 09 (07/12 a 11/12)',
    'Semana 10 (14/12 a 18/12)'
  ];
}

export function getWeekPeriod(bimestre: string, weekIndex: number): string {
  const weeks = getWeeksForBimestre(bimestre);
  return weeks[weekIndex] || `Semana ${weekIndex + 1}`;
}
