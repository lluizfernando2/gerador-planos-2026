import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronRight,
  ChevronLeft,
  Search,
  Sparkles,
  Sliders,
  Calendar,
  Layers,
  GraduationCap,
  ListFilter,
  FileText,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { CurriculumItem, MarginSettings, PlanFormat, WeekPlan } from '../types';

interface ConfigPanelProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  // Step 1 State
  planFormat: PlanFormat;
  setPlanFormat: (format: PlanFormat) => void;
  contentSource: string;
  setContentSource: (source: string) => void;
  // Step 2 State
  educationLevel: string;
  setEducationLevel: (level: string) => void;
  selectedSegment: string;
  setSelectedSegment: (segment: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedGrade: string;
  setSelectedGrade: (grade: string) => void;
  selectedBimester: string;
  setSelectedBimester: (bimester: string) => void;
  availableSubjects: { id: string; name: string; category: string; grades: string[] }[];
  // Step 3 State
  availableLessons: CurriculumItem[];
  selectedLessons: string[];
  setSelectedLessons: (lessons: string[]) => void;
  selectAllLessons: () => void;
  clearSelectedLessons: () => void;
  // Step 4 State
  selectedStrategy: string;
  setSelectedStrategy: (strategy: string) => void;
  selectedResources: string[];
  setSelectedResources: (resources: string[]) => void;
  // Step 5 State
  verificationEstrategia: string;
  setVerificationEstrategia: (est: string) => void;
  sarespDate: string;
  setSarespDate: (date: string) => void;
  provaPaulistaDate: string;
  setProvaPaulistaDate: (date: string) => void;
  // Step 6 / Action Callbacks
  onGeneratePlan: () => void;
  isGeneratingPlan: boolean;
  onSaveDraft: () => void;
  onOpenMarginModal: () => void;
  marginSettings: MarginSettings;
}

export default function ConfigPanel({
  currentStep,
  setCurrentStep,
  planFormat,
  setPlanFormat,
  contentSource,
  setContentSource,
  educationLevel,
  setEducationLevel,
  selectedSegment,
  setSelectedSegment,
  selectedSubject,
  setSelectedSubject,
  selectedGrade,
  setSelectedGrade,
  selectedBimester,
  setSelectedBimester,
  availableSubjects,
  availableLessons,
  selectedLessons,
  setSelectedLessons,
  selectAllLessons,
  clearSelectedLessons,
  selectedStrategy,
  setSelectedStrategy,
  selectedResources,
  setSelectedResources,
  verificationEstrategia,
  setVerificationEstrategia,
  sarespDate,
  setSarespDate,
  provaPaulistaDate,
  setProvaPaulistaDate,
  onGeneratePlan,
  isGeneratingPlan,
  onSaveDraft,
  onOpenMarginModal,
  marginSettings
}: ConfigPanelProps) {
  const [subjectSearch, setSubjectSearch] = useState('');
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);

  const stepsList = [
    { num: 1, name: 'Modelo e fonte' },
    { num: 2, name: 'Disciplina e período' },
    { num: 3, name: 'Escopo e aulas' },
    { num: 4, name: 'Metodologias e recursos' },
    { num: 5, name: 'Avaliação e recuperação' },
    { num: 6, name: 'Revisão e exportação' }
  ];

  // Filter subjects for Combobox
  const filteredSubjects = availableSubjects.filter(s =>
    s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
    s.category.toLowerCase().includes(subjectSearch.toLowerCase())
  );

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      onGeneratePlan();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLessonToggle = (id: string) => {
    if (selectedLessons.includes(id)) {
      setSelectedLessons(selectedLessons.filter(l => l !== id));
    } else {
      setSelectedLessons([...selectedLessons, id]);
    }
  };

  const handleResourceToggle = (res: string) => {
    if (selectedResources.includes(res)) {
      setSelectedResources(selectedResources.filter(r => r !== res));
    } else {
      setSelectedResources([...selectedResources, res]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs font-sans">
      {/* Fixed Header with Step Progress */}
      <div className="bg-white dark:bg-slate-900 px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-bold text-[#00856A] uppercase tracking-wider">
              Etapa {currentStep} de 6
            </span>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">
              {stepsList[currentStep - 1].name}
            </h3>
          </div>
          <button
            onClick={onSaveDraft}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition cursor-pointer"
          >
            Salvar rascunho
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#00856A] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable Step Form Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* STEP 1: MODELO E FONTE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Nível de Ensino (Radio Cards) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Nível de Ensino
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'Ensino Médio',
                    title: 'Ensino Médio',
                    desc: '1ª, 2ª e 3ª Séries (Regular e Técnico)'
                  },
                  {
                    id: 'Anos Finais',
                    title: 'Anos Finais (EF)',
                    desc: '6º, 7º, 8º e 9º Anos do Ensino Fundamental'
                  }
                ].map(opt => {
                  const isSelected = educationLevel === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setEducationLevel(opt.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-slate-800/80 ${
                        isSelected
                          ? 'border-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setEducationLevel(opt.id)}
                        className="mt-0.5 accent-[#00856A]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modelo do Documento (Selectable Cards) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Modelo do Documento Oficial
              </label>
              <div className="space-y-3">
                {[
                  {
                    id: 'campinas-leste',
                    title: 'Modelo Oficial (SEDUC-SP / Campinas Leste 2026)',
                    desc: 'Formatado em landscape A4, cabeçalho institucional em bege/verde/amarelo, Ações Bloom e cronograma semanal de 10/11 semanas.'
                  },
                  {
                    id: 'campinas-leste-custom',
                    title: 'Modelo Sequência Customizável',
                    desc: 'Mesma fidelidade oficial com flexibilidade para ajustes específicos de carga horária.'
                  },
                  {
                    id: 'ava-efape',
                    title: 'Modelo AVA-EFAPE (Resumido)',
                    desc: 'Formato simplificado para postagem rápida na plataforma AVA-EFAPE.'
                  }
                ].map(opt => {
                  const isSelected = planFormat === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setPlanFormat(opt.id as PlanFormat)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-slate-800/80 ${
                        isSelected
                          ? 'border-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setPlanFormat(opt.id as PlanFormat)}
                        className="mt-0.5 accent-[#00856A]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Origem dos Conteúdos (Radio Cards) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Origem dos Conteúdos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'matriz-2026',
                    title: 'Matriz Paulista Oficial 2026',
                    desc: 'Aulas digitais, habilidades BNCC e AEs integradas'
                  },
                  {
                    id: 'caderno-professor',
                    title: 'Material Impresso / Caderno',
                    desc: 'Pautado no recurso impresso oficial da SEDUC-SP'
                  }
                ].map(opt => {
                  const isSelected = contentSource === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setContentSource(opt.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-slate-800/80 ${
                        isSelected
                          ? 'border-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setContentSource(opt.id)}
                        className="mt-0.5 accent-[#00856A]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {opt.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Configurações de Margens A4 */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#00856A]" />
                    Margens e Orientação A4
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    A4 Paisagem (29,70 × 21,00 cm) • Margens: {marginSettings.top} × {marginSettings.left} cm
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenMarginModal}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer shrink-0"
                >
                  Ajustar Margens
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: DISCIPLINA E PERÍODO */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Segmento Curricular / Modalidade */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Segmento / Modalidade Curricular
              </label>

              {/* Mobile: Dropdown */}
              <div className="sm:hidden">
                <select
                  value={selectedSegment}
                  onChange={e => setSelectedSegment(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  <option value="fgb">Formação Geral Básica</option>
                  <option value="diversificada">Parte Diversificada</option>
                  <option value="itinerario">Itinerário Formativo</option>
                  <option value="tecnico">Educação Profissional</option>
                </select>
              </div>

              {/* Tablet (2 columns) & Desktop (4 columns) Segmented Control */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl gap-1">
                {[
                  { id: 'fgb', label: 'Formação Geral' },
                  { id: 'diversificada', label: 'Parte Diversificada' },
                  { id: 'itinerario', label: 'Itinerário Formativo' },
                  { id: 'tecnico', label: 'Educação Profissional' }
                ].map(seg => {
                  const isSelected = selectedSegment === seg.id;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setSelectedSegment(seg.id)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold transition cursor-pointer text-center truncate ${
                        isSelected
                          ? 'bg-white dark:bg-slate-700 text-[#00856A] dark:text-emerald-300 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {seg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Componente Curricular (Searchable Combobox Grouped with Series & Bimesters info) */}
            <div className="space-y-2 relative">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Componente Curricular (Disciplina)
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={selectedSubject || subjectSearch}
                  onChange={e => {
                    setSubjectSearch(e.target.value);
                    setSelectedSubject('');
                    setIsComboboxOpen(true);
                  }}
                  onFocus={() => setIsComboboxOpen(true)}
                  placeholder="Pesquisar disciplina (ex: Biologia, Educação Financeira)..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] focus:ring-3 focus:ring-[#00856A]/15 text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Combobox Dropdown list */}
              {isComboboxOpen && (
                <div
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto p-2 space-y-2 font-sans"
                  onMouseLeave={() => setIsComboboxOpen(false)}
                >
                  {filteredSubjects.length === 0 ? (
                    <div className="p-3 text-xs text-slate-500 text-center">
                      Nenhuma disciplina encontrada.
                    </div>
                  ) : (
                    ['FGB', 'DIVERSIFICADA', 'ITINERARIOS', 'TECNICO'].map(cat => {
                      const groupItems = filteredSubjects.filter(s => s.category.toUpperCase() === cat);
                      if (groupItems.length === 0) return null;
                      const catName =
                        cat === 'FGB'
                          ? 'Formação Geral Básica (FGB)'
                          : cat === 'DIVERSIFICADA'
                          ? 'Parte Diversificada'
                          : cat === 'ITINERARIOS'
                          ? 'Itinerários Formativos'
                          : 'Educação Profissional (Ensino Técnico)';

                      return (
                        <div key={cat} className="space-y-1">
                          <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50 rounded-md">
                            {catName}
                          </div>
                          {groupItems.map(subj => (
                            <button
                              key={subj.id}
                              type="button"
                              onClick={() => {
                                setSelectedSubject(subj.name);
                                setSubjectSearch('');
                                setIsComboboxOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition text-left cursor-pointer ${
                                selectedSubject === subj.name
                                  ? 'bg-[#E8F7F2] text-[#00856A] font-bold dark:bg-[#00856A]/20 dark:text-emerald-300'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <span className="block truncate font-bold">{subj.name}</span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal block truncate">
                                  {educationLevel === 'Anos Finais' ? '6º ao 9º Ano (EF)' : '1ª, 2ª e 3ª Série (EM)'} • 1º ao 4º Bimestres
                                </span>
                              </div>
                              {selectedSubject === subj.name && (
                                <Check className="w-4 h-4 text-[#00856A] shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Série & Bimestre (Side by Side Desktop, Stacked Mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Ano / Série
                </label>
                <select
                  value={selectedGrade}
                  onChange={e => setSelectedGrade(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  <option value="6º Ano">6º Ano (Anos Finais)</option>
                  <option value="7º Ano">7º Ano (Anos Finais)</option>
                  <option value="8º Ano">8º Ano (Anos Finais)</option>
                  <option value="9º Ano">9º Ano (Anos Finais)</option>
                  <option value="1ª Série">1ª Série (Ensino Médio)</option>
                  <option value="2ª Série">2ª Série (Ensino Médio)</option>
                  <option value="3ª Série">3ª Série (Ensino Médio)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Bimestre Letivo
                </label>
                <select
                  value={selectedBimester}
                  onChange={e => setSelectedBimester(e.target.value)}
                  className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  <option value="1º Bimestre">1º Bimestre (Fev a Abr)</option>
                  <option value="2º Bimestre">2º Bimestre (Abr a Jul)</option>
                  <option value="3º Bimestre">3º Bimestre (Jul a Out)</option>
                  <option value="4º Bimestre">4º Bimestre (Out a Dez - 11 Semanas)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ESCOPO E AULAS */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Seleção das Aulas do Escopo
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedLessons.length} de {availableLessons.length} aulas selecionadas
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={selectAllLessons}
                  className="text-[11px] font-bold text-[#00856A] hover:underline cursor-pointer"
                >
                  Marcar todas
                </button>
                <span className="text-slate-300">•</span>
                <button
                  onClick={clearSelectedLessons}
                  className="text-[11px] font-semibold text-slate-500 hover:underline cursor-pointer"
                >
                  Limpar
                </button>
              </div>
            </div>

            {availableLessons.length === 0 ? (
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 space-y-1">
                <AlertCircle className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <p className="font-bold text-slate-700 dark:text-slate-300">
                  Nenhuma aula disponível para esta combinação.
                </p>
                <p className="text-[11px]">
                  Verifique os filtros de disciplina, série e bimestre na etapa anterior.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {availableLessons.map(lesson => {
                  const isChecked = selectedLessons.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleLessonToggle(lesson.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-slate-800/80 ${
                        isChecked
                          ? 'border-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLessonToggle(lesson.id)}
                        className="mt-0.5 accent-[#00856A]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md shrink-0">
                            {lesson.aula}
                          </span>
                          <span className="text-[10px] font-semibold text-[#00856A] truncate">
                            {lesson.habilidade ? lesson.habilidade.substring(0, 20) : 'BNCC'}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 truncate">
                          {lesson.titulo}
                        </h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                          {lesson.conteudo}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: METODOLOGIAS E RECURSOS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Estratégia Metodológica Ativa Predominante
              </label>
              <select
                value={selectedStrategy}
                onChange={e => setSelectedStrategy(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100 cursor-pointer"
              >
                <option value="A- Aula expositiva com discussão pautada no material digital">
                  A- Aula expositiva pautada no material digital
                </option>
                <option value="B- Aula de estudo dirigido pautada no recurso do material impresso">
                  B- Estudo dirigido em material impresso
                </option>
                <option value="C- Estudo dirigido em duplas ou grupos">
                  C- Estudo dirigido interativo
                </option>
                <option value="D- Estudo de caso (análise de situação)">
                  D- Estudo de caso
                </option>
                <option value="E- Aprendizagem baseada em problemas">
                  E- Aprendizagem baseada em problemas (ABP)
                </option>
                <option value="G- Mapa mental / conceitual">
                  G- Elaboração de mapas mentais/conceituais
                </option>
                <option value="J- Rotação por estações de aprendizagem">
                  J- Rotação por estações
                </option>
                <option value="K- Aula prática / experimento em laboratório">
                  K- Aula prática e experimentação
                </option>
              </select>
            </div>

            {/* Recursos Didáticos (Multiselect Checkboxes) */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Recursos Didáticos Utilizados
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Material Digital SEDUC-SP',
                  'Caderno do Professor / Aluno',
                  'Lousa Digital / Projetor',
                  'Laboratório / Kits de Ciência',
                  'Dispositivos Móveis / Tablets',
                  'Calculadoras / Planilhas',
                  'Jogos Didáticos / Gamificação',
                  'Formulários e Plataformas Digitais'
                ].map(res => {
                  const isChecked = selectedResources.includes(res);
                  return (
                    <div
                      key={res}
                      onClick={() => handleResourceToggle(res)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 bg-white dark:bg-slate-800/80 ${
                        isChecked
                          ? 'border-[#00856A] bg-[#E8F7F2] dark:bg-[#00856A]/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleResourceToggle(res)}
                        className="accent-[#00856A]"
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {res}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: AVALIAÇÃO E RECUPERAÇÃO */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Estratégia de Verificação da Aprendizagem / Parada Intencional
              </label>
              <select
                value={verificationEstrategia}
                onChange={e => setVerificationEstrategia(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100 cursor-pointer"
              >
                <option value="Fazer perguntas abertas que exijam explicação do raciocínio pelo estudante.">
                  Perguntas abertas com explicação do raciocínio
                </option>
                <option value="Pedir que estudantes demonstrem procedimentos no quadro.">
                  Demonstração de procedimentos no quadro
                </option>
                <option value="Circular pela sala observando produções e conversas.">
                  Observação ativa circulando entre duplas/grupos
                </option>
                <option value="Propor sínteses rápidas do que foi aprendido, por escrito ou oralmente.">
                  Síntese rápida escrita ou oral ao fim da aula
                </option>
                <option value="Solicitar que os estudantes identifiquem e corrijam um erro proposital no exemplo.">
                  Análise e correção de erro proposital
                </option>
                <option value="Aplicar um teste rápido de resposta única (exit ticket) para verificar a compreensão imediata.">
                  Teste rápido de saída (Exit Ticket)
                </option>
              </select>
            </div>

            {/* Avaliações Externas (Saresp & Provão Paulista) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Data / Período SARESP 2026
                </label>
                <input
                  type="text"
                  value={sarespDate}
                  onChange={e => setSarespDate(e.target.value)}
                  placeholder="Ex: 26/11 e 27/11/2026"
                  className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Data Provão Paulista Seriado
                </label>
                <input
                  type="text"
                  value={provaPaulistaDate}
                  onChange={e => setProvaPaulistaDate(e.target.value)}
                  placeholder="Ex: 10/11 e 11/11/2026"
                  className="w-full min-h-[44px] px-3 py-2.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-[#00856A] text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: REVISÃO E EXPORTAÇÃO */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00856A]" />
                Resumo do Plano Configurado
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Modelo:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {planFormat === 'campinas-leste' ? 'Oficial SEDUC-SP' : planFormat}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Disciplina:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate block">
                    {selectedSubject || 'Não selecionada'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Série & Bimestre:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {selectedGrade} • {selectedBimester}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Aulas Selecionadas:</span>
                  <span className="font-bold text-[#00856A]">
                    {selectedLessons.length} aulas no cronograma
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#E8F7F2] dark:bg-[#00856A]/20 border border-[#00856A]/30 rounded-xl text-xs text-slate-700 dark:text-slate-200 leading-relaxed space-y-1">
              <p className="font-bold text-[#00856A] dark:text-emerald-300">
                Pronto para gerar seu plano!
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Clique em <strong>Gerar Plano de Ensino</strong> abaixo. O documento será compilado e exibido instantaneamente no painel à direita com formatação oficial.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer Action Bar */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between shrink-0 font-sans gap-2">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={onSaveDraft}
          className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition cursor-pointer"
        >
          Salvar rascunho
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00856A] hover:bg-[#006B56] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <span>{currentStep === 6 ? 'Gerar Plano de Ensino' : 'Continuar'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
