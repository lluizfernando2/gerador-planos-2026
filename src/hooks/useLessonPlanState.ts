import { useState, useEffect } from 'react';
import { PlanFormat, WeeklyAllocation, MarginSettings, WeekPlan } from '../types';
import { buildDocumentHTML, buildAvaEfapeDocumentHTML, getWeekPeriod, getVerificationStrategy } from '../lib/documentGenerator';
import { initialCurriculumData } from '../data/curriculumData';

export function useLessonPlanState(showToast: (msg: string, isError?: boolean) => void) {
  const [selectedSegment, setSelectedSegment] = useState<'Ensino Fundamental' | 'Ensino Médio'>('Ensino Fundamental');
  const [planSubject, setPlanSubject] = useState('Matemática');
  const [planGrade, setPlanGrade] = useState('6º Ano');
  const [planBimester, setPlanBimester] = useState('3º Bimestre');
  
  // Selected lesson keys for Plan Generator
  const [selectedPlanLessons, setSelectedPlanLessons] = useState<Set<string>>(new Set());

  // Selected lesson keys in custom ordered sequence
  const [orderedSelectedLessons, setOrderedSelectedLessons] = useState<string[]>([]);

  // Format/Template style of lesson plans
  const [planFormat, setPlanFormat] = useState<PlanFormat>('campinas-leste');

  // Configuração Manual de Margens da Folha A4 (em cm)
  const [marginSettings, setMarginSettings] = useState<MarginSettings>(() => {
    try {
      const saved = localStorage.getItem('a4_margins_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };
  });

  // Custom Weekly allocations when using 'campinas-leste-custom'
  const [weeklyCustomAllocations, setWeeklyCustomAllocations] = useState<{ [weekIdx: number]: WeeklyAllocation }>({});

  const [uploadedDb, setUploadedDb] = useState<{ [sheetName: string]: any[][] }>({});
  const [schoolName, setSchoolName] = useState('');
  const [docenteName, setDocenteName] = useState('');
  const [trabalhosDate, setTrabalhosDate] = useState('02 a 06/11/2026');
  const [avaliacoesDate, setAvaliacoesDate] = useState('23 a 27/11/2026');
  const [sarespDate, setSarespDate] = useState('25 e 26/11/2026');

  const [generatedDocHtml, setGeneratedDocHtml] = useState<string | null>(null);
  const [generatedWeeks, setGeneratedWeeks] = useState<WeekPlan[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    localStorage.setItem('a4_margins_config', JSON.stringify(marginSettings));
  }, [marginSettings]);

  // Reset selected lessons when subject, grade, or bimester changes
  useEffect(() => {
    setSelectedPlanLessons(new Set());
    setOrderedSelectedLessons([]);
    setWeeklyCustomAllocations({});
  }, [planSubject, planGrade, planBimester]);

  // Auto select all lessons for selected subject, grade, bimester
  const handleSelectAllFilteredLessons = () => {
    const isUploadedSubject = uploadedDb[planSubject];
    let allKeys: string[] = [];

    if (isUploadedSubject) {
      const sheetData = uploadedDb[planSubject] || [];
      sheetData.forEach((row, rowIdx) => {
        if (rowIdx === 0) return;
        const rowGrade = String(row[0] || '').trim();
        const rowBim = String(row[1] || '').trim();
        if (rowGrade === planGrade && rowBim === planBimester) {
          allKeys.push(`upload|${planSubject}|${rowIdx}`);
        }
      });
    } else {
      const filtered = initialCurriculumData.filter(item => {
        const itemDisc = (item.disciplina || '').toLowerCase();
        const matchSubject = itemDisc === planSubject.toLowerCase() || (planSubject === 'Língua Portuguesa' && (itemDisc === 'português' || itemDisc === 'língua portuguesa'));
        const matchGrade = item.ano.trim() === planGrade.trim();
        const matchBim = item.bimestre.trim() === planBimester.trim();
        return matchSubject && matchGrade && matchBim;
      });
      allKeys = filtered.map(item => `oficial|${item.id}`);
    }

    setSelectedPlanLessons(new Set(allKeys));
    setOrderedSelectedLessons(allKeys);
    showToast(`${allKeys.length} aulas selecionadas.`);
  };

  const handleClearSelectedLessons = () => {
    setSelectedPlanLessons(new Set());
    setOrderedSelectedLessons([]);
    setWeeklyCustomAllocations({});
    showToast("Seleção de aulas limpa.");
  };

  const toggleLessonSelection = (key: string) => {
    const nextSet = new Set(selectedPlanLessons);
    let nextOrdered = [...orderedSelectedLessons];

    if (nextSet.has(key)) {
      nextSet.delete(key);
      nextOrdered = nextOrdered.filter(k => k !== key);
    } else {
      nextSet.add(key);
      if (!nextOrdered.includes(key)) {
        nextOrdered.push(key);
      }
    }

    setSelectedPlanLessons(nextSet);
    setOrderedSelectedLessons(nextOrdered);
  };

  return {
    selectedSegment,
    setSelectedSegment,
    planSubject,
    setPlanSubject,
    planGrade,
    setPlanGrade,
    planBimester,
    setPlanBimester,
    selectedPlanLessons,
    setSelectedPlanLessons,
    orderedSelectedLessons,
    setOrderedSelectedLessons,
    planFormat,
    setPlanFormat,
    marginSettings,
    setMarginSettings,
    weeklyCustomAllocations,
    setWeeklyCustomAllocations,
    uploadedDb,
    setUploadedDb,
    schoolName,
    setSchoolName,
    docenteName,
    setDocenteName,
    trabalhosDate,
    setTrabalhosDate,
    avaliacoesDate,
    setAvaliacoesDate,
    sarespDate,
    setSarespDate,
    generatedDocHtml,
    setGeneratedDocHtml,
    generatedWeeks,
    setGeneratedWeeks,
    isGeneratingPlan,
    setIsGeneratingPlan,
    handleSelectAllFilteredLessons,
    handleClearSelectedLessons,
    toggleLessonSelection
  };
}
