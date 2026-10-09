import React, { useState, useEffect, useCallback } from 'react';
import { initialCurriculumData } from './data/curriculumData';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA
} from './data/diversificadaData';
import { itinerariosEMData } from './data/itinerariosEMData';
import { MATRIZ_SOCIOEMOCIONAL } from './data/socioemocionalDatabase';
import { buildAvaEfapeDocumentHTML } from './data/subjectMappings';
import { buildDocumentHTML } from './lib/documentGenerator';
import { CurriculumItem } from './types';
import CurriculumTable from './components/CurriculumTable';
import ThemeToggle from './components/ThemeToggle';
import QuestionRepositories from './components/QuestionRepositories';
import GuidedTour from './components/GuidedTour';
import AppLayout from './components/AppLayout';
import DashboardPage from './components/DashboardPage';
import FavoritesPage from './components/FavoritesPage';
import SettingsPage from './components/SettingsPage';
import { initAuth, googleSignIn, logoutUser, getAccessToken } from './lib/firebase';
import { exportToGoogleSheets } from './lib/sheets';
import * as XLSX from 'xlsx';
import { PRESET_RECOVERY_TEMPLATES, generateCustomRecoveryPlan, RecoveryPlanResult, buildRecoveryPlanHTML, generateRecoveryPlanMarkdown, matchOfficialRecoveryItem } from './data/recoveryTemplates';
import { OFFICIAL_RECOVERY_DATA_2026 } from './data/recoveryData2026';
import { LOGO_SP_BASE64 } from './data/logoSp';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from './data/tecnicoData';
import { generatePixPayload } from './lib/pix';
import { pixService } from './features/pix/pixService';
import LandingComments from './components/LandingComments';
import buildInfo from './buildInfo.json';
import { buildSecuredPrompt } from './lib/securityPrompt';
import { documentEngine } from './features/documents/documentEngine';

function mapProyectoVidaToCurriculum(item: any): CurriculumItem {
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: `Aula ${item.aula}`,
    titulo: `Tema: ${item.tema.split('.')[0] || 'Projeto de Vida'}`,
    conteudo: `Dimensão: ${item.dimensao} | Atitude: ${item.atitude} | Prática: ${item.pratica} \n\nContexto: ${item.contexto} \nQuestões: ${item.questoes}`,
    objetivos: `Compreensão: ${item.compreensao}`,
    habilidade: item.habilidade,
    aprendizagem: `Estratégias BNCC / Currículo Paulista 2026: Desenvolver a competência socioemocional de ${item.dimensao.toLowerCase()} através da atitude de ${item.atitude.toLowerCase()} e prática de ${item.pratica.toLowerCase()}.`,
    disciplina: 'Projeto de Vida',
    raw: item
  };
}

function mapTecnologiaToCurriculum(item: any): CurriculumItem {
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: `Aula ${item.aulaSala} (${item.semana})`,
    titulo: item.titulo,
    conteudo: `Unidade: ${item.unidade} | Formato: ${item.formato} \nConteúdos: ${item.conteudos} \nEntrega: ${item.entrega}`,
    objetivos: item.objetivo,
    habilidade: item.habComputacaoCodigo !== 'n/a' ? `${item.habComputacaoCodigo}: ${item.habComputacaoTexto}` : `${item.habBnccCodigo}: ${item.habBnccTexto}`,
    aprendizagem: `Pensamento Computacional & Cultura Digital: ${item.habComputacaoTexto}`,
    disciplina: 'Tecnologia e Inovação',
    raw: item
  };
}

function mapOrientacaoEstudoToCurriculum(item: any): CurriculumItem {
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: `Aula ${item.aula} (${item.semana})`,
    titulo: item.tituloGps.split('|')[1]?.trim() || item.tituloGps,
    conteudo: `Gênero: ${item.genero} | Eixo: ${item.eixo} \nPráticas Pedagógicas: ${item.praticasPedagogicas} \nPlataforma: ${item.plataforma}`,
    objetivos: item.objetivos,
    habilidade: `${item.habilidadeCodigo}: ${item.habilidadeTexto}`,
    aprendizagem: `Prática de Linguagem: ${item.praticaLinguagem} | Sugestões: ${item.sugestoes.join(', ')}`,
    disciplina: item.disciplina || 'Orientação de Estudos - Matemática',
    raw: item
  };
}

function mapEducacaoFinanceiraToCurriculum(item: any): CurriculumItem {
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: `Aula ${item.aula}`,
    titulo: item.titulo,
    conteudo: `Unidade Temática: ${item.unidadeTematica} \nObjeto de Conhecimento: ${item.objetoConhecimento} \nConteúdos: ${item.conteudo}`,
    objetivos: item.objetivos,
    habilidade: `${item.habilidadeCodigo}: ${item.habilidadeTexto}`,
    aprendizagem: `Economia Aplicada e Consumo Consciente: ${item.objetoConhecimento}`,
    disciplina: 'Educação Financeira',
    raw: item
  };
}

function mapRedacaoLeituraToCurriculum(item: any): CurriculumItem {
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: item.aula,
    titulo: item.titulo,
    conteudo: `Gênero/Tema: ${item.titulo} \nConteúdos: ${item.conteudo}`,
    objetivos: item.objetivos,
    habilidade: item.habilidade,
    aprendizagem: item.aprendizagem,
    disciplina: 'Redação e leitura',
    raw: item
  };
}
import {
  BookOpen,
  GraduationCap,
  Download,
  Share2,
  FileSpreadsheet,
  Trash2,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  LogOut,
  User as UserIcon,
  Check,
  Award,
  AlertCircle,
  Clock,
  LogIn,
  Loader2,
  Printer,
  Copy,
  FileText,
  FileCode,
  FileUp,
  ExternalLink,
  Inbox,
  Info,
  HelpCircle,
  Palette,
  Sparkles,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  Calendar,
  Sliders,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

// Weeks configuration for 2026 bimesters, including holidays
function getWeeksForBimestre(bimestre: string) {
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
  return [
    { num: 1, period: "05 a 09/10/2026", holiday: "" },
    { num: 2, period: "12 a 16/10/2026", holiday: "Feriado: 12/10 - N. Sra. Aparecida" },
    { num: 3, period: "19 a 23/10/2026", holiday: "" },
    { num: 4, period: "26 a 30/10/2026", holiday: "" },
    { num: 5, period: "02 a 06/11/2026", holiday: "Feriado: 02/11 - Finados" },
    { num: 6, period: "09 a 13/11/2026", holiday: "" },
    { num: 7, period: "16 a 20/11/2026", holiday: "Feriado: 20/11 - Consciência Negra" },
    { num: 8, period: "23 a 27/11/2026", holiday: "Previsão SARESP (25/11 e 26/11)" },
    { num: 9, period: "30/11 a 04/12/2026", holiday: "Recuperação" },
    { num: 10, period: "07 a 18/12/2026", holiday: "Consolidação / Atividades de Fechamento" }
  ];
}

function getWeekPeriod(bimestre: string, weekIndex: number) {
  const weeks = getWeeksForBimestre(bimestre);
  const w = weeks[weekIndex];
  if (!w) return '';
  if (w.holiday) {
    return `${w.period} | ${w.holiday}`;
  }
  return w.period;
}

const getVerificationStrategy = (weekContentLower: string, estrategiaSelected: string, weekIndex: number): string => {
  if (weekContentLower.includes('exercício') || weekContentLower.includes('cálculo') || weekContentLower.includes('equação') || weekContentLower.includes('resolução') || weekContentLower.includes('problema') || weekContentLower.includes('quadro') || weekContentLower.includes('matemática') || weekContentLower.includes('fórmula')) {
    const list = [
      "Pedir que estudantes demonstrem procedimentos no quadro.",
      "Solicitar que os estudantes identifiquem e corrijam um erro proposital no exemplo.",
      "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro."
    ];
    return list[weekIndex % list.length];
  }

  if (weekContentLower.includes('discussão') || weekContentLower.includes('debate') || weekContentLower.includes('conceito') || weekContentLower.includes('leitura') || weekContentLower.includes('texto') || weekContentLower.includes('análise') || weekContentLower.includes('teoria')) {
    const list = [
      "Fazer perguntas abertas que exijam explicação do raciocínio pelo estudante.",
      "Propor sínteses rápidas do que foi aprendido, por escrito ou oralmente.",
      "Pedir aos estudantes que formulem uma pergunta sobre a principal dúvida do tema abordado."
    ];
    return list[weekIndex % list.length];
  }

  if (weekContentLower.includes('grupo') || weekContentLower.includes('dupla') || weekContentLower.includes('prática') || weekContentLower.includes('oficina') || weekContentLower.includes('projeto') || weekContentLower.includes('estação') || estrategiaSelected.includes('Rotação') || estrategiaSelected.includes('grupo')) {
    const list = [
      "Circular pela sala observando produções e conversas.",
      "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro.",
      "Aplicar um teste rápido de resposta única (exit ticket) para verificar a compreensão imediata."
    ];
    return list[weekIndex % list.length];
  }

  const defaultList = [
    "Fazer perguntas abertas que exijam explicação do raciocínio pelo estudante.",
    "Pedir que estudantes demonstrem procedimentos no quadro.",
    "Circular pela sala observando produções e conversas.",
    "Propor sínteses rápidas do que foi aprendido, por escrito ou oralmente.",
    "Solicitar que os estudantes identifiquem e corrijam um erro proposital no exemplo.",
    "Promover checagem em duplas onde um estudante explica a resolução do problema ao outro.",
    "Aplicar um teste rápido de resposta única (exit ticket) para verificar a compreensão imediata."
  ];

  return defaultList[weekIndex % defaultList.length];
};

export default function App() {
  const [items, setItems] = useState<CurriculumItem[]>(initialCombinedCurriculumData);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tracks whether the user has entered the platform past the landing page (always starts false on page refresh)
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'curriculum' | 'plan-generator' | 'recovery-plan' | 'repositories' | 'favorites' | 'settings' | 'help'>('dashboard');

  // Recovery Plan Generator States
  const [recComponente, setRecComponente] = useState('Tecnologia e Inovação');
  const [recAno, setRecAno] = useState('7º Ano');
  const [recBimestre, setRecBimestre] = useState('1º Bimestre');
  const [recAprendizagemEssencial, setRecAprendizagemEssencial] = useState('EF07TE02 - Identificar o funcionamento de arquivos compactados e descrever vantagens no uso de algoritmos de compressão de dados.');
  const [recDescritores, setRecDescritores] = useState('Arquivos digitais compactados, formatos .zip/.rar e compressão de dados digitais');
  const [recAulas, setRecAulas] = useState(4);
  const [recAdaptacoes, setRecAdaptacoes] = useState<string[]>([
    "Responder dúvidas recorrentes, retomando explicações",
    "Oferecer exemplos adicionais ou utilizar outra estratégia de explicação para o mesmo conceito",
    "Propor atividades de apoio para estudantes que ainda não consolidaram a aprendizagem",
    "Disponibilizar desafios para estudantes que já dominaram o conteúdo"
  ]);
  const [recMateriais, setRecMateriais] = useState('Jogos pedagógicos, fichas impressas com apoio visual, esquemas gráficos, objetos manipuláveis e tutoria entre pares.');
  const [recRetomadaAnterior, setRecRetomadaAnterior] = useState('Revisão prática dos conceitos fundamentais dos bimestres anteriores do 1º Semestre para consolidação das habilidades essenciais em defasagem.');
  const [generatedRecoveryPlan, setGeneratedRecoveryPlan] = useState<RecoveryPlanResult | null>(PRESET_RECOVERY_TEMPLATES["tecnologia_7"]);
  const [isGeneratingRecoveryPlan, setIsGeneratingRecoveryPlan] = useState(false);

  // Plan Generator States
  const [schoolName, setSchoolName] = useState('');
  const [docenteName, setDocenteName] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO'>('ENSINO FUNDAMENTAL ANOS FINAIS');
  const [subjectCategory, setSubjectCategory] = useState<'FGB' | 'DIVERSIFICADA' | 'ITINERARIOS' | 'TECNICO'>('FGB');
  const [dataSource, setDataSource] = useState<'oficial' | 'upload'>('oficial');
  const [uploadedDb, setUploadedDb] = useState<Record<string, any[][]>>({});
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Selection filters for Plan Generator
  const [planSubject, setPlanSubject] = useState('Matemática');
  const [planGrade, setPlanGrade] = useState('6º Ano');
  const [planBimester, setPlanBimester] = useState('3º Bimestre');
  
  // Selected lesson keys for Plan Generator
  const [selectedPlanLessons, setSelectedPlanLessons] = useState<Set<string>>(new Set());

  // Selected lesson keys in custom ordered sequence
  const [orderedSelectedLessons, setOrderedSelectedLessons] = useState<string[]>([]);

  // Format/Template style of lesson plans
  const [planFormat, setPlanFormat] = useState<'campinas-leste' | 'ava-efape' | 'campinas-leste-custom'>('campinas-leste');

  // Configuração Manual de Margens da Folha A4 (em cm)
  const [marginSettings, setMarginSettings] = useState<{ top: number; bottom: number; left: number; right: number }>(() => {
    try {
      const saved = localStorage.getItem('a4_margins_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 };
  });

  useEffect(() => {
    try {
      localStorage.setItem('a4_margins_config', JSON.stringify(marginSettings));
    } catch (e) {}
  }, [marginSettings]);

  const [showMarginModal, setShowMarginModal] = useState(false);

  // Synchronize ordered selected lessons with selectedPlanLessons Set
  useEffect(() => {
    setOrderedSelectedLessons(prev => {
      const nextArr = prev.filter(k => selectedPlanLessons.has(k));
      selectedPlanLessons.forEach(k => {
        if (!nextArr.includes(k)) {
          nextArr.push(k);
        }
      });
      return nextArr;
    });
  }, [selectedPlanLessons]);

  // Custom important dates for evaluations and assignments
  const [trabalhosDate, setTrabalhosDate] = useState('18 a 22/05/2026');
  const [avaliacoesDate, setAvaliacoesDate] = useState('15 a 19/06/2026');
  const [sarespDate, setSarespDate] = useState('25/11/2026 e 26/11/2026');

  // Customizable Plan Week Allocations (Caixas Suspensas / Accordions)
  const [weeklyCustomAllocations, setWeeklyCustomAllocations] = useState<Record<number, { lessonKeys: string[]; projectDates: string; projectDescription: string }>>(() => {
    const init: Record<number, { lessonKeys: string[]; projectDates: string; projectDescription: string }> = {};
    for (let i = 0; i < 10; i++) {
      init[i] = { lessonKeys: [], projectDates: '', projectDescription: '' };
    }
    return init;
  });
  const [openCustomWeekIdx, setOpenCustomWeekIdx] = useState<number | null>(0);

  const toggleLessonInCustomWeek = (weekIdx: number, key: string) => {
    setWeeklyCustomAllocations(prev => {
      const currentList = prev[weekIdx]?.lessonKeys || [];
      const isPresent = currentList.includes(key);
      const updatedList = isPresent
        ? currentList.filter(k => k !== key)
        : [...currentList, key];

      // Sync selectedPlanLessons too!
      setSelectedPlanLessons(setPrev => {
        const next = new Set(setPrev);
        if (isPresent) {
          // Only remove from selectedPlanLessons if not present in any other week
          let existsElsewhere = false;
          for (let w = 0; w < 10; w++) {
            if (w !== weekIdx && prev[w]?.lessonKeys?.includes(key)) {
              existsElsewhere = true;
              break;
            }
          }
          if (!existsElsewhere) {
            next.delete(key);
          }
        } else {
          next.add(key);
        }
        return next;
      });

      return {
        ...prev,
        [weekIdx]: {
          ...(prev[weekIdx] || { projectDates: '', projectDescription: '' }),
          lessonKeys: updatedList
        }
      };
    });
  };

  const updateCustomWeekProject = (weekIdx: number, field: 'projectDates' | 'projectDescription', value: string) => {
    setWeeklyCustomAllocations(prev => ({
      ...prev,
      [weekIdx]: {
        ...(prev[weekIdx] || { lessonKeys: [] }),
        [field]: value
      }
    }));
  };

  // Page Redesign options states
  const [appTypography, setAppTypography] = useState<'sans' | 'space' | 'mono' | 'serif'>(() => {
    return (localStorage.getItem('appTypography') as 'sans' | 'space' | 'mono' | 'serif') || 'sans';
  });
  const [borderStyle, setBorderStyle] = useState<'rounded' | 'sharp'>(() => {
    return (localStorage.getItem('borderStyle') as 'rounded' | 'sharp') || 'rounded';
  });

  useEffect(() => {
    localStorage.setItem('appTypography', appTypography);
  }, [appTypography]);

  useEffect(() => {
    localStorage.setItem('borderStyle', borderStyle);
  }, [borderStyle]);

  // Generated document HTML
  const [generatedDocHtml, setGeneratedDocHtml] = useState<string>('');
  const [showTour, setShowTour] = useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIsError, setToastIsError] = useState(false);

  const showToast = (message: string, isError = false) => {
    setToastMessage(message);
    setToastIsError(isError);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const [generatedWeeks, setGeneratedWeeks] = useState<any[]>([]);
  const [showGeminiAlert, setShowGeminiAlert] = useState(false);
  const [previewMode, setPreviewMode] = useState<'document' | 'interactive'>('document');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({ 0: true });
  
  // Export states
  const [exportingToGoogle, setExportingToGoogle] = useState(false);
  const [createdSheetUrl, setCreatedSheetUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  
  // Filtered items states for scoped Excel export
  const [filteredItemsForExport, setFilteredItemsForExport] = useState<any[]>([]);
  const [currentExportSubject, setCurrentExportSubject] = useState<string>('Matemática');
  const [isExportDiversificada, setIsExportDiversificada] = useState<boolean>(false);

  // Dynamic Prompt Build & Update Counter
  const COMPILED_BUILD_NUMBER = buildInfo.buildNumber || 50;
  const COMPILED_BUILD_TIMESTAMP = buildInfo.timestamp || new Date().toISOString();

  const [updateCount, setUpdateCount] = useState<number>(() => {
    const saved = localStorage.getItem('app_prompt_update_count');
    const parsed = saved ? parseInt(saved, 10) : 0;
    return parsed >= COMPILED_BUILD_NUMBER ? parsed : COMPILED_BUILD_NUMBER;
  });

  const [lastUpdateFormatted, setLastUpdateFormatted] = useState<string>(() => {
    const savedDate = localStorage.getItem('app_last_update_formatted');
    if (savedDate) return savedDate;
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(COMPILED_BUILD_TIMESTAMP)).replace(',', ' às');
    } catch {
      return new Date().toLocaleDateString('pt-BR');
    }
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleFilteredItemsChange = useCallback((filtered: any[], subject: string, isDiv: boolean) => {
    setFilteredItemsForExport(filtered);
    setCurrentExportSubject(subject);
    setIsExportDiversificada(isDiv);
  }, []);
  
  // Real-time UTC Time Clock display
  const [currentTime, setCurrentTime] = useState(new Date());

  // Tracks Pix copy states
  const [copiedPixCode, setCopiedPixCode] = useState(false);
  const [copiedPixKey, setCopiedPixKey] = useState(false);

  useEffect(() => {
    // Sync with compiled build version if a new build was deployed
    const lastBuildTs = localStorage.getItem('app_last_prompt_build_timestamp');
    if (lastBuildTs !== COMPILED_BUILD_TIMESTAMP) {
      let formattedNow = '';
      try {
        formattedNow = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date(COMPILED_BUILD_TIMESTAMP)).replace(',', ' às');
      } catch {
        formattedNow = new Date().toLocaleDateString('pt-BR');
      }

      localStorage.setItem('app_last_prompt_build_timestamp', COMPILED_BUILD_TIMESTAMP);
      localStorage.setItem('app_prompt_update_count', COMPILED_BUILD_NUMBER.toString());
      localStorage.setItem('app_last_update_formatted', formattedNow);

      setUpdateCount(COMPILED_BUILD_NUMBER);
      setLastUpdateFormatted(formattedNow);
    }

    // Initialize Auth state listener
    const unsubscribe = initAuth(
      (currentUser, cachedToken) => {
        setUser(currentUser);
        setToken(cachedToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );

    // Update real-time clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  // Synchronize recovery components and auto-populate descriptions in semestral integrated mode
  useEffect(() => {
    if (OFFICIAL_RECOVERY_DATA_2026[recComponente]) {
      const grades = Object.keys(OFFICIAL_RECOVERY_DATA_2026[recComponente]);
      if (grades.length > 0 && !grades.includes(recAno)) {
        setRecAno(grades[0]);
      }
    }
  }, [recComponente]);

  useEffect(() => {
    // Combine 1st and 2nd bimesters for semestral integrated plan
    const itemBim1 = matchOfficialRecoveryItem(recComponente, recAno, "1º Bimestre");
    const itemBim2 = matchOfficialRecoveryItem(recComponente, recAno, "2º Bimestre");

    if (itemBim1 && itemBim2) {
      setRecAprendizagemEssencial(`1º Bimestre: ${itemBim1.conteudo} | 2º Bimestre: ${itemBim2.conteudo}`);
      setRecDescritores(`1º Bimestre: ${itemBim1.habilidade}\n2º Bimestre: ${itemBim2.habilidade}`);
    } else if (itemBim1) {
      setRecAprendizagemEssencial(`1º Bimestre: ${itemBim1.conteudo}`);
      setRecDescritores(`1º Bimestre: ${itemBim1.habilidade}`);
    } else if (itemBim2) {
      setRecAprendizagemEssencial(`2º Bimestre: ${itemBim2.conteudo}`);
      setRecDescritores(`2º Bimestre: ${itemBim2.habilidade}`);
    }
  }, [recComponente, recAno]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setExportError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setExportError('Falha ao autenticar com o Google. Certifique-se de conceder as permissões.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setCreatedSheetUrl(null);
      setHasEntered(false);
      try {
        localStorage.removeItem('curr_priorizado_entered');
      } catch (e) {}
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  // Delete a curriculum item
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset curriculum to initial State
  const handleResetData = () => {
    if (window.confirm('Deseja redefinir os dados para o currículo original do estado? Isso removerá itens importados.')) {
      setItems(initialCombinedCurriculumData);
      setCreatedSheetUrl(null);
    }
  };

  // Synchronize filters on dataSource change
  useEffect(() => {
    if (dataSource === 'oficial') {
      setPlanSubject('Língua Portuguesa');
      setSubjectCategory('FGB');
      setPlanGrade(selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? '6º Ano' : '1ª Série');
      setPlanBimester('3º Bimestre');
    }
  }, [dataSource]);

  // Update grade filter list and selected grade if planSubject changes under upload
  useEffect(() => {
    if (dataSource === 'upload' && planSubject && uploadedDb[planSubject]) {
      const sheetRows = uploadedDb[planSubject];
      const uniqueGrades = Array.from(new Set(sheetRows.slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean);
      if (uniqueGrades.length > 0) {
        if (!uniqueGrades.includes(planGrade)) {
          setPlanGrade(uniqueGrades[0]);
        }
      } else {
        setPlanGrade('');
      }
    }
  }, [planSubject, dataSource, uploadedDb]);

  // Update bimester filter list and selected bimester if planGrade changes under upload
  useEffect(() => {
    if (dataSource === 'upload' && planSubject && planGrade && uploadedDb[planSubject]) {
      const sheetRows = uploadedDb[planSubject];
      const filteredRows = sheetRows.slice(1).filter(r => String(r[0] || '').trim() === planGrade);
      const uniqueBims = Array.from(new Set(filteredRows.map(r => String(r[1] || '').trim()))).filter(Boolean);
      if (uniqueBims.length > 0) {
        if (!uniqueBims.includes(planBimester)) {
          setPlanBimester(uniqueBims[0]);
        }
      } else {
        setPlanBimester('');
      }
    }
  }, [planGrade, planSubject, dataSource, uploadedDb]);

  // Automatically select all available lessons when filters change
  useEffect(() => {
    const available = getAvailableLessons();
    setSelectedPlanLessons(() => {
      const next = new Set<string>();
      available.forEach(l => {
        const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
        next.add(key);
      });
      return next;
    });

    // Reset weeklyCustomAllocations on filter change to prevent residual choices
    setWeeklyCustomAllocations(() => {
      const init: Record<number, { lessonKeys: string[]; projectDates: string; projectDescription: string }> = {};
      for (let i = 0; i < 10; i++) {
        init[i] = { lessonKeys: [], projectDates: '', projectDescription: '' };
      }
      return init;
    });
  }, [planSubject, planGrade, planBimester, dataSource, items]);

  const getAvailableLessons = () => {
    if (dataSource === 'oficial') {
      if (!planSubject || !planGrade || !planBimester) return [];
      return items.filter((item) => {
        const itemDisc = item.disciplina || 'Matemática';
        return itemDisc === planSubject && item.ano === planGrade && item.bimestre === planBimester;
      });
    } else {
      if (!planSubject || !planGrade || !planBimester || !uploadedDb[planSubject]) return [];
      const sheetData = uploadedDb[planSubject];
      return sheetData.slice(1).map((row, index) => {
        return {
          id: `upload-${planSubject}-${index + 1}`,
          rowIdx: index + 1,
          ano: String(row[0] || '').trim(),
          bimestre: String(row[1] || '').trim(),
          aula: String(row[2] || '').trim(),
          titulo: String(row[3] || '').trim(),
          conteudo: String(row[4] || '').trim(),
          habilidade: String(row[5] || row[4] || '').trim(),
          objetivos: String(row[6] || row[5] || '').trim(),
        };
      }).filter(item => item.ano === planGrade && item.bimestre === planBimester);
    }
  };

  const togglePlanLesson = (key: string) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        // Also remove from any custom week allocation
        setWeeklyCustomAllocations(cPrev => {
          const updated = { ...cPrev };
          for (let w = 0; w < 10; w++) {
            if (updated[w]?.lessonKeys?.includes(key)) {
              updated[w] = {
                ...updated[w],
                lessonKeys: updated[w].lessonKeys.filter(k => k !== key)
              };
            }
          }
          return updated;
        });
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAllPlanLessons = (lessons: any[]) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      lessons.forEach(l => {
        const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
        next.add(key);
      });
      return next;
    });
  };

  const deselectAllPlanLessons = (lessons: any[]) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      lessons.forEach(l => {
        const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
        next.delete(key);
      });
      // Also remove those lessons from any custom week allocation
      setWeeklyCustomAllocations(cPrev => {
        const updated = { ...cPrev };
        lessons.forEach(l => {
          const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
          for (let w = 0; w < 10; w++) {
            if (updated[w]?.lessonKeys?.includes(key)) {
              updated[w] = {
                ...updated[w],
                lessonKeys: updated[w].lessonKeys.filter(k => k !== key)
              };
            }
          }
        });
        return updated;
      });
      return next;
    });
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const dataArr = new Uint8Array(evt?.target?.result as ArrayBuffer);
        const workbook = XLSX.read(dataArr, { type: 'array' });
        const db: Record<string, any[][]> = {};
        
        workbook.SheetNames.forEach(name => {
          const json = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }) as any[][];
          db[name] = json.filter(row => row && row.length > 0);
        });
        
        setUploadedDb(db);
        setDataSource('upload');
        
        // Reset selections
        const sheets = Object.keys(db);
        if (sheets.length > 0) {
          setPlanSubject(sheets[0]);
          
          const sheetRows = db[sheets[0]];
          const uniqueGrades = Array.from(new Set(sheetRows.slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean);
          if (uniqueGrades.length > 0) {
            setPlanGrade(uniqueGrades[0]);
            
            const filteredRows = sheetRows.slice(1).filter(r => String(r[0] || '').trim() === uniqueGrades[0]);
            const uniqueBims = Array.from(new Set(filteredRows.map(r => String(r[1] || '').trim()))).filter(Boolean);
            if (uniqueBims.length > 0) {
              setPlanBimester(uniqueBims[0]);
            } else {
              setPlanBimester('');
            }
          } else {
            setPlanGrade('');
            setPlanBimester('');
          }
        }
        showToast("Planilha de Escopo carregada com sucesso!");
      } catch (err) {
        showToast("Erro ao ler o arquivo Excel.", true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setPlanError(null);
    
    // Simulate a short delay for smoother UX transition
    setTimeout(() => {
      try {
        let selectedLessonsData: any[] = [];
        const isDiversificada = ['Projeto de Vida', 'Tecnologia e Inovação', 'Orientação de Estudos - Matemática', 'Orientação de Estudos - Português', 'Educação Financeira', 'Redação e leitura'].includes(planSubject);

        if (dataSource === 'oficial') {
          const activeKeys = orderedSelectedLessons.filter(k => k.startsWith('oficial|'));
          const selectedLessons: any[] = [];
          
          activeKeys.forEach(k => {
            const id = k.split('|')[1];
            const item = items.find(i => String(i.id) === id);
            if (item) {
              const itemDisc = item.disciplina || 'Matemática';
              const matchesFilter = itemDisc === planSubject && item.ano === planGrade && item.bimestre === planBimester;
              if (matchesFilter) {
                selectedLessons.push(item);
              }
            }
          });

          selectedLessonsData = selectedLessons.map(item => ({
            num: parseInt(String(item.aula).replace(/\D/g, '')) || 0,
            aula: item.aula,
            titulo: item.titulo,
            conteudo: item.conteudo,
            habilidade: item.habilidade,
            aprendizagem: item.aprendizagem,
            objetivos: item.objetivos,
            bimestre: item.bimestre,
            semana: item.semana,
            raw: item.raw
          }));

          if (planFormat !== 'campinas-leste-custom' && planFormat !== 'ava-efape') {
            selectedLessonsData.sort((a, b) => a.num - b.num);
          }
        } else {
          const sheetData = uploadedDb[planSubject];
          if (!sheetData) {
            throw new Error("Carregue uma planilha válida primeiro.");
          }

          const headers = sheetData[0] || [];
          const getCol = (rowData: any[], keyword: string) => {
            const idx = headers.findIndex(h => String(h || '').toLowerCase().includes(keyword.toLowerCase()));
            return idx !== -1 ? rowData[idx] : '';
          };

          const activeKeys = orderedSelectedLessons.filter(k => k.startsWith(`upload|${planSubject}|`));
          const selectedLessonsWrappers: any[] = [];

          activeKeys.forEach(k => {
            const rowIdx = parseInt(k.split('|')[2]) || 0;
            const row = sheetData[rowIdx];
            if (row) {
              const rowGrade = String(row[0] || '').trim();
              const rowBim = String(row[1] || '').trim();
              const matchesFilter = rowGrade === planGrade && rowBim === planBimester;
              if (matchesFilter) {
                selectedLessonsWrappers.push({ rowIdx, row });
              }
            }
          });

          selectedLessonsData = selectedLessonsWrappers.map(w => {
            const numVal = parseInt(String(w.row[2]).replace(/\D/g, '')) || 0;
            const tVal = String(getCol(w.row, 'título') || getCol(w.row, 'tema') || w.row[3] || '').trim();
            const cVal = String(getCol(w.row, 'conteúdo') || w.row[4] || tVal).trim();
            const hVal = String(getCol(w.row, 'essencial') || getCol(w.row, 'ae') || getCol(w.row, 'habilidade') || w.row[5] || w.row[4] || '').trim();
            const oVal = String(getCol(w.row, 'objetivo') || getCol(w.row, 'aprendizagem') || w.row[6] || w.row[5] || '').trim();
            return {
              num: numVal,
              aula: String(w.row[2] || numVal),
              titulo: tVal,
              conteudo: cVal,
              habilidade: hVal,
              aprendizagem: hVal,
              objetivos: oVal,
              bimestre: String(w.row[1] || '').trim(),
              semana: String(w.row[2] || '').toLowerCase().includes('semana') ? String(w.row[2] || '').split('-')[0].trim() : '',
              raw: null
            };
          });

          if (planFormat !== 'campinas-leste-custom' && planFormat !== 'ava-efape') {
            selectedLessonsData.sort((a, b) => a.num - b.num);
          }
        }

        if (selectedLessonsData.length === 0) {
          throw new Error("Selecione pelo menos uma aula para gerar o cronograma.");
        }

        // Insert learning verification activity every 20% of the classes
        const L = selectedLessonsData.length;
        const interval = Math.max(1, Math.floor(L * 0.2));
        const enrichedLessons: any[] = [];
        let activityCount = 1;
        const accumulatedNormal: any[] = [];
        for (let idx = 0; idx < selectedLessonsData.length; idx++) {
          const currentLesson = selectedLessonsData[idx];
          accumulatedNormal.push(currentLesson);
          enrichedLessons.push(currentLesson);
          if ((idx + 1) % interval === 0) {
            enrichedLessons.push({
              num: 999,
              aula: `Atividade Verificadora ${activityCount}`,
              titulo: `Atividade Verificadora de Aprendizagem ${activityCount}`,
              conteudo: "Verificação e checagem de retenção para garantir que os alunos estão realmente aprendendo os conceitos anteriores através de exercícios de feedback rápido e autoavaliação.",
              habilidade: "Verificação contínua e consolidação de aprendizagens essenciais.",
              aprendizagem: "Sistematização e checagem de retenção dos conteúdos.",
              objetivos: "Diagnosticar e verificar a real absorção do conteúdo e o desenvolvimento das habilidades trabalhadas até o momento.",
              raw: null,
              previousLessons: [...accumulatedNormal]
            });
            activityCount++;
          }
        }
        const lessonsToDistribute = enrichedLessons;

        // Distribute selected lessons across the content weeks
        const numContentWeeks = planBimester === '3º Bimestre' ? 6 : 7;
        const weeksLessons: any[][] = [];

        // Check if customizable plan has custom week allocations configured
        let isUsingCustomWeeks = false;
        if (planFormat === 'campinas-leste-custom') {
          for (let i = 0; i < numContentWeeks; i++) {
            if ((weeklyCustomAllocations[i]?.lessonKeys?.length || 0) > 0 || weeklyCustomAllocations[i]?.projectDates || weeklyCustomAllocations[i]?.projectDescription) {
              isUsingCustomWeeks = true;
              break;
            }
          }
        }

        if (isUsingCustomWeeks) {
          for (let i = 0; i < numContentWeeks; i++) {
            const weekConf = weeklyCustomAllocations[i] || { lessonKeys: [], projectDates: '', projectDescription: '' };
            const weekKeys = weekConf.lessonKeys || [];
            const weekLessons: any[] = [];

            weekKeys.forEach(k => {
              const found = lessonsToDistribute.find(l => {
                const itemKey = l.id ? `oficial|${l.id}` : `upload|${planSubject}|${l.num}`;
                return itemKey === k || k.endsWith(`|${l.num}`) || k.endsWith(`|${l.id}`);
              });
              if (found) {
                weekLessons.push(found);
              }
            });

            if (weekConf.projectDates || weekConf.projectDescription) {
              weekLessons.push({
                num: 998,
                aula: `Atividade Diferenciada / Projeto (${weekConf.projectDates || 'Semana ' + (i + 1)})`,
                titulo: weekConf.projectDescription || 'Execução de Projeto Prático / Atividade Diferenciada',
                conteudo: weekConf.projectDescription || 'Atividade Diferenciada e execução de projeto transversal.',
                habilidade: 'Desenvolvimento de competências socioemocionais, investigação e aplicação prática.',
                aprendizagem: 'Execução de projetos e atividades diferenciadas.',
                objetivos: 'Incentivar o protagonismo juvenil, a pesquisa e a resolução de problemas através de projetos dinâmicos.',
                raw: null
              });
            }

            if (weekLessons.length === 0) {
              weekLessons.push({
                num: 0,
                aula: `Ajuste Pedagógico / Semana ${i + 1}`,
                titulo: `Retomada e consolidação de aprendizagens`,
                conteudo: `Sistematização de conteúdos e acompanhamento individualizado.`,
                habilidade: `Consolidação de habilidades do bimestre.`,
                aprendizagem: `Acompanhamento pedagógico.`,
                objetivos: `Garantir o nivelamento e apoio aos estudantes.`,
                raw: null
              });
            }

            weeksLessons.push(weekLessons);
          }
        } else if (lessonsToDistribute.length >= numContentWeeks) {
          let currentIdx = 0;
          const N = lessonsToDistribute.length;
          const baseCount = Math.floor(N / numContentWeeks);
          const extraCount = N % numContentWeeks;
          for (let i = 0; i < numContentWeeks; i++) {
            const count = baseCount + (i < extraCount ? 1 : 0);
            weeksLessons.push(lessonsToDistribute.slice(currentIdx, currentIdx + count));
            currentIdx += count;
          }
        } else {
          // Pad empty weeks cyclically for diversified subjects so that every week is populated
          for (let i = 0; i < numContentWeeks; i++) {
            if (i < lessonsToDistribute.length) {
              weeksLessons.push([lessonsToDistribute[i]]);
            } else {
              const cyclicItem = lessonsToDistribute[i % lessonsToDistribute.length];
              weeksLessons.push([{
                ...cyclicItem,
                aula: `Aula ${i + 1} (Aprofundamento)`
              }]);
            }
          }
        }

        const STRATEGIES_LIST = [
          "A- Aula expositiva com discussão pautada no material digital;",
          "B- Aula de estudo dirigido pautada no recurso do material impresso;",
          "C- Estudo dirigido;",
          "D- Pesquisa de campo ou investigações em grupo;",
          "E- Aprendizagem baseada em problemas;",
          "F- Estudo de caso direcionado;",
          "G- Mapa mental;",
          "H- Debates estruturados e painéis integrados;",
          "I- Gamificação;",
          "J- Rotação por estações;",
          "K- Aula prática de laboratório ou simulações digitais;",
          "L- Sala de aula invertida;",
          "M- Seminários e apresentações dialogadas;",
          "N- Projetos interdisciplinares aplicados;",
          "O- Resolução de problemas complexos com modelagem;",
          "P- Produção de fanzines, murais ou infográficos ilustrativos;",
          "Q- Dimensão lúdica e cultural (danças, brincadeiras, lutas e adaptações dos esportes tradicionais.)"
        ];

        const EVALUATIONS_LIST = [
          "Devolutiva dos alunos dos exercícios",
          "Participação em aula",
          "Atividades em grupo e individuais",
          "Devolutiva dos alunos dos exercícios e participação em aula",
          "Participação em aula, atividades em grupo e individuais",
          "Devolutiva dos alunos dos exercícios, participação em aula e atividades em grupo e individuais"
        ];

        const getPertinentEvaluation = (weekContentLower: string, estrategiaSelected: string, weekIndex: number): string => {
          const options: string[] = [];
          
          const hasExerciseOrPractice = 
            weekContentLower.includes('exercício') || 
            weekContentLower.includes('prática') || 
            weekContentLower.includes('resolução') || 
            weekContentLower.includes('tarefa') || 
            weekContentLower.includes('questão') || 
            weekContentLower.includes('caderno') || 
            weekContentLower.includes('cálculo') || 
            weekContentLower.includes('equação') || 
            weekContentLower.includes('problema') ||
            weekContentLower.includes('produção') ||
            weekContentLower.includes('escrita') ||
            weekContentLower.includes('aplicação');

          if (hasExerciseOrPractice) {
            options.push("Devolutiva dos alunos dos exercícios");
          }
          
          const hasParticipationOrDiscussion = 
            weekContentLower.includes('discussão') || 
            weekContentLower.includes('debate') || 
            weekContentLower.includes('diálogo') || 
            weekContentLower.includes('participação') || 
            weekContentLower.includes('roda') || 
            weekContentLower.includes('apresentação') || 
            weekContentLower.includes('leitura') || 
            weekContentLower.includes('exposição') ||
            weekContentLower.includes('conceito') ||
            weekContentLower.includes('interação') ||
            weekContentLower.includes('reflexão');

          if (hasParticipationOrDiscussion) {
            options.push("Participação em aula");
          }

          const hasGroupOrIndividualActivity = 
            weekContentLower.includes('grupo') || 
            weekContentLower.includes('dupla') || 
            weekContentLower.includes('trio') || 
            weekContentLower.includes('estação') || 
            weekContentLower.includes('projeto') || 
            weekContentLower.includes('cooperação') || 
            weekContentLower.includes('oficina') ||
            weekContentLower.includes('pesquisa') ||
            weekContentLower.includes('individual') ||
            estrategiaSelected.includes('Aprendizagem baseada') || 
            estrategiaSelected.includes('Estudo dirigido') ||
            estrategiaSelected.includes('Rotação');

          if (hasGroupOrIndividualActivity) {
            options.push("Atividades em grupo e individuais");
          }

          // Garantir que pelo menos uma das três opções sempre apareça
          if (options.length === 0) {
            if (weekIndex % 3 === 0) {
              options.push("Devolutiva dos alunos dos exercícios", "Participação em aula");
            } else if (weekIndex % 3 === 1) {
              options.push("Participação em aula", "Atividades em grupo e individuais");
            } else {
              options.push("Atividades em grupo e individuais", "Devolutiva dos alunos dos exercícios");
            }
          }

          // Mantenha as atividades verificadoras também
          if (weekContentLower.includes('verificadora') || weekContentLower.includes('verificação')) {
            return `Atividade Verificadora de Aprendizagem com ${options.join(' e ').toLowerCase()}.`;
          }

          return options.join('; ') + '.';
        };

        const getAulasMaterialDigital = (weekLessonsData: any[], bimesterOverride?: string, weekIndexOverride?: number): string => {
          if (!weekLessonsData || weekLessonsData.length === 0) return 'Não se aplica';
          
          const isTech = MEDIO_TECNICO_SUBJECTS.some(s => s.id === planSubject);

          if (isTech) {
            const formattedLessons: string[] = [];
            weekLessonsData.forEach(l => {
              const aulaStr = String(l.aula || l.titulo || '').toLowerCase();
              const conteudoStr = String(l.conteudo || '').toLowerCase();

              // Ignore Atividades Verificadoras, Feriados, Recessos, e Avaliações externas
              const isVerificacao = aulaStr.includes('verificad') || aulaStr.includes('verificac') || conteudoStr.includes('atividade verificadora') || conteudoStr.includes('verificação');
              const isFeriado = aulaStr.includes('feriado') || aulaStr.includes('recesso') || conteudoStr.includes('feriado');
              const isProvaOuSaresp = aulaStr.includes('prova paulista') || aulaStr.includes('saresp') || aulaStr.includes('conselho');

              if (!isVerificacao && !isFeriado && !isProvaOuSaresp) {
                const bimText = l.bimestre || bimesterOverride || planBimester || '1º Bimestre';
                const normBim = (() => {
                  const match = String(bimText).match(/(\d+)/);
                  return match ? `${match[1]}ºbimestre` : '1ºbimestre';
                })();

                const normSem = (() => {
                  const semStr = l.semana || (l.raw && l.raw.semana) || '';
                  const match = String(semStr).match(/(\d+)/);
                  if (match) return `semana${match[1]}`;
                  if (typeof weekIndexOverride === 'number') return `semana${weekIndexOverride}`;
                  return 'semana1';
                })();

                const normAula = (() => {
                  const matchAula = aulaStr.match(/aula\s*(\d+)/i);
                  if (matchAula) return `aula ${matchAula[1]}`;
                  const matchDigits = aulaStr.match(/(\d+)/);
                  if (matchDigits) return `aula ${matchDigits[1]}`;
                  if (typeof l.num === 'number' && l.num > 0 && l.num < 900) return `aula ${l.num}`;
                  return 'aula 1';
                })();

                const formatted = `${normBim},${normSem},${normAula}`;
                if (!formattedLessons.includes(formatted)) {
                  formattedLessons.push(formatted);
                }
              }
            });

            return formattedLessons.length > 0 ? formattedLessons.join(', ') : 'Não se aplica';
          } else {
            const validLessonNums: string[] = [];
            weekLessonsData.forEach(l => {
              const aulaStr = String(l.aula || l.titulo || '').toLowerCase();
              const conteudoStr = String(l.conteudo || '').toLowerCase();

              const isVerificacao = aulaStr.includes('verificad') || aulaStr.includes('verificac') || conteudoStr.includes('atividade verificadora') || conteudoStr.includes('verificação');
              const isFeriado = aulaStr.includes('feriado') || aulaStr.includes('recesso') || conteudoStr.includes('feriado');
              const isProvaOuSaresp = aulaStr.includes('prova paulista') || aulaStr.includes('saresp') || aulaStr.includes('conselho');

              if (!isVerificacao && !isFeriado && !isProvaOuSaresp) {
                const numOnly = String(l.aula || '').replace(/\D/g, '');
                const val = numOnly || (typeof l.num === 'number' && l.num < 900 ? String(l.num) : '');
                if (val && !validLessonNums.includes(val)) {
                  validLessonNums.push(val);
                }
              }
            });

            return validLessonNums.length > 0 ? validLessonNums.join(', ') : 'Não se aplica';
          }
        };

        const isTechnical = MEDIO_TECNICO_SUBJECTS.some(s => s.id === planSubject);

        const getWeekNumber = (semanaStr: string) => {
          const match = semanaStr.match(/\d+/);
          return match ? parseInt(match[0], 10) : 999;
        };

        const isRecomposicaoOuVisitaLesson = (l: any) => {
          const s = String(l.semana || '').toLowerCase();
          const t = String(l.titulo || '').toLowerCase();
          const a = String(l.aula || '').toLowerCase();
          return s.includes('recomposição') || s.includes('visita') ||
                 t.includes('recomposição') || t.includes('visita') ||
                 a.includes('recomposição') || a.includes('visita') ||
                 l.raw?.isRecomposicaoOuVisita === true;
        };

        let contentLessons = selectedLessonsData.filter(l => !isRecomposicaoOuVisitaLesson(l));
        let recoLessons = selectedLessonsData.filter(l => isRecomposicaoOuVisitaLesson(l));

        const contentWeeksMap: Record<number, any[]> = {};
        contentLessons.forEach(lesson => {
          const wNum = getWeekNumber(lesson.raw?.semana || lesson.semana || '');
          if (!contentWeeksMap[wNum]) {
            contentWeeksMap[wNum] = [];
          }
          contentWeeksMap[wNum].push(lesson);
        });

        const sortedContentWeekNums = Object.keys(contentWeeksMap)
          .map(Number)
          .sort((a, b) => a - b);

        const groupedContentWeeks = sortedContentWeekNums.map(num => ({
          weekNum: num,
          lessons: contentWeeksMap[num]
        }));

        const fullWeeks = [];

        if (isTechnical) {
          const buildWeekData = (weekLessons: any[], calendarIdx: number) => {
            if (!weekLessons || weekLessons.length === 0) {
              return {
                periodo: getWeekPeriod(planBimester, calendarIdx),
                aulas_escopo: 'Não se aplica',
                conteudos: 'Nenhum conteúdo selecionado para esta semana.',
                avaliacao: 'Não aplicável',
                ae: 'Nenhuma Aprendizagem Essencial',
                estrategia: 'Nenhuma estratégia selecionada',
                acoes_bloom: 'Nenhuma ação selecionada',
                lessons: []
              };
            }

            const aulasEscopo = getAulasMaterialDigital(weekLessons, planBimester, calendarIdx + 1);

            // Extract rich data fields from raw item to prevent stacked repeating structures
            const firstRaw = weekLessons[0]?.raw || {};
            const unidade = firstRaw.unidadeCurricular || '';
            const codUnidade = firstRaw.codigoUnidade ? ` [${firstRaw.codigoUnidade}]` : '';
            const componente = firstRaw.disciplina || planSubject;
            const ch = firstRaw.chTeoricaPratica === 'P' ? 'Prática' : 'Teórica';
            const temaSemana = firstRaw.temaSemana || '';

            // Clean list of unique lesson items with their corresponding topic/knowledges
            const uniqueLessonItems = weekLessons.map(l => {
              const raw = l.raw || {};
              const num = raw.aulaNumero || l.aula || '';
              // Strip "Atividade Verificadora"
              const tit = (raw.tituloAula || l.titulo || '')
                .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                .trim();
              const objConhecimento = (raw.objetoConhecimento || '')
                .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                .trim();
              return `<strong>${num}</strong>: ${tit}${objConhecimento ? ` <span style="color: #4b5563;">(${objConhecimento})</span>` : ''}`;
            });

            let conteudosHtml = '';
            if (unidade) {
              conteudosHtml += `<p style="margin: 0 0 4pt 0;"><strong>U.C.:</strong> ${unidade}${codUnidade}</p>`;
            }
            if (componente) {
              conteudosHtml += `<p style="margin: 0 0 4pt 0;"><strong>Componente:</strong> ${componente} (${ch})</p>`;
            }
            if (temaSemana) {
              conteudosHtml += `<p style="margin: 0 0 6pt 0;"><strong>Tema:</strong> ${temaSemana}</p>`;
            }
            if (uniqueLessonItems.length > 0) {
              conteudosHtml += `<strong style="color: #002060;">Aulas e Objetos de Conhecimento:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonItems.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
            } else {
              conteudosHtml = '<p>Nenhum conteúdo listado.</p>';
            }

            // Extract distinct skills and competencies
            const competenciasTecnicas = Array.from(new Set(weekLessons.map(l => l.raw?.competenciaTecnica || l.aprendizagem || '').filter(Boolean)));
            const habilidadesTecnicas = Array.from(new Set(weekLessons.map(l => l.raw?.habilidadesTecnicas || '').filter(Boolean)));
            const habilidadesSocioemocionais = Array.from(new Set(weekLessons.map(l => l.raw?.habilidadesSocioemocionais || '').filter(Boolean)));

            let aeHtml = '';
            if (competenciasTecnicas.length > 0) {
              aeHtml += `<strong style="color: #002060;">Competências Técnicas:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + competenciasTecnicas.map(ct => `<li style="margin-bottom: 2pt;">${ct}</li>`).join('') + `</ul>`;
            }
            if (habilidadesTecnicas.length > 0) {
              aeHtml += `<strong style="color: #002060;">Habilidades Técnicas:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + habilidadesTecnicas.map(ht => `<li style="margin-bottom: 2pt;">${ht}</li>`).join('') + `</ul>`;
            }
            if (habilidadesSocioemocionais.length > 0) {
              aeHtml += `<strong style="color: #002060;">Habilidades Socioemocionais:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + habilidadesSocioemocionais.map(hs => `<li style="margin-bottom: 2pt;">${hs}</li>`).join('') + `</ul>`;
            }
            if (!aeHtml) {
              aeHtml = '<p>Nenhuma Aprendizagem Essencial selecionada.</p>';
            }

            // Extract objectives and socioemotional competencies
            const objetivosAulas = Array.from(new Set(weekLessons.map(l => l.raw?.objetivosAula || '').filter(Boolean)));
            const competenciasSocioemocionais = Array.from(new Set(weekLessons.map(l => l.raw?.competenciaSocioemocional || '').filter(Boolean)));

            let acoesBloomHtml = '';
            if (objetivosAulas.length > 0) {
              acoesBloomHtml += `<strong style="color: #002060;">Objetivos de Aprendizagem:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + objetivosAulas.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;
            }
            if (competenciasSocioemocionais.length > 0) {
              acoesBloomHtml += `<strong style="color: #002060;">Mobilização Socioemocional:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + competenciasSocioemocionais.map(cs => `<li style="margin-bottom: 2pt;">${cs}</li>`).join('') + `</ul>`;
            }
            if (!acoesBloomHtml) {
              acoesBloomHtml = '<ul><li>Lembrar</li><li>Compreender</li><li>Aplicar</li></ul>';
            }

            let estrategiaSelected = STRATEGIES_LIST[calendarIdx % STRATEGIES_LIST.length];
            const weekContentLower = (unidade + ' ' + temaSemana + ' ' + uniqueLessonItems.join(' ')).toLowerCase();
            const hasVisita = weekContentLower.includes('visita');
            if (hasVisita) {
              estrategiaSelected = "D- Pesquisa de campo ou investigações em grupo; (Visita Técnica)";
            } else if (weekContentLower.includes('recomposição') || weekContentLower.includes('retomada')) {
              estrategiaSelected = "C- Estudo dirigido; (Recomposição da Aprendizagem)";
            } else if (weekContentLower.includes('verificadora') || weekContentLower.includes('verificação')) {
              estrategiaSelected = "C- Estudo dirigido; (Atividades de Verificação Contínua)";
            } else if (weekContentLower.includes('jogo') || weekContentLower.includes('desafio') || weekContentLower.includes('lúdica')) {
              estrategiaSelected = "I- Gamificação;";
            } else if (weekContentLower.includes('problema') || weekContentLower.includes('equação') || weekContentLower.includes('situação')) {
              estrategiaSelected = "E- Aprendizagem baseada em problemas;";
            } else if (weekContentLower.includes('gráfico') || weekContentLower.includes('tabela') || weekContentLower.includes('pesquisa')) {
              estrategiaSelected = "C- Estudo dirigido;";
            } else if (weekContentLower.includes('laboratório') || weekContentLower.includes('experimento') || weekContentLower.includes('prática')) {
              estrategiaSelected = "K- Aula prática;";
            }

            let avaliacaoSelected = getPertinentEvaluation(weekContentLower, estrategiaSelected, calendarIdx);

            return {
              periodo: getWeekPeriod(planBimester, calendarIdx),
              aulas_escopo: aulasEscopo,
              conteudos: conteudosHtml,
              avaliacao: avaliacaoSelected,
              ae: aeHtml,
              estrategia: estrategiaSelected,
              acoes_bloom: acoesBloomHtml,
              lessons: weekLessons
            };
          };

          const is3rdBimestre = planBimester === '3º Bimestre';
          const is4thBimestre = planBimester === '4º Bimestre';
          const effectiveSarespDate = sarespDate || '25/11/2026 e 26/11/2026';

          if (is3rdBimestre) {
            // Week 1 (index 0) - Recovery Week
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, 0),
              aulas_escopo: "Não se aplica",
              conteudos: "<ul><li>Recuperação Semestral: Aplicação dos planos de recuperação semestral focados na retomada de conteúdos e habilidades essenciais do 1º semestre letivo para sanar lacunas de aprendizagem identificadas.</li></ul>",
              avaliacao: "Diagnóstica e formativa através de atividades práticas direcionadas e autoavaliação guiada.",
              ae: "<ul><li>Recuperação e consolidação de habilidades críticas e conteúdos não assimilados no primeiro semestre.</li></ul>",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "<ul><li>Identificar</li><li>Revisar</li><li>Consolidar</li></ul>",
              lessons: []
            });

            // Weeks 2 to 7 (indices 1 to 6)
            for (let i = 1; i < 7; i++) {
              const weekIdxInGrouped = i - 1;
              const weekLessons = groupedContentWeeks[weekIdxInGrouped]?.lessons || [];
              fullWeeks.push(buildWeekData(weekLessons, i));
            }

            // Week 8 (index 7) - Recomposição/Visita (reserved if present) or Revision
            if (recoLessons.length > 0) {
              fullWeeks.push(buildWeekData(recoLessons, 7));
            } else {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 7),
                aulas_escopo: "Não se aplica",
                conteudos: "Revisão dos conteúdos essenciais e preparação para a Prova Paulista do 3º Bimestre",
                avaliacao: "Diagnóstica / Formativa",
                ae: "Revisão de todas as habilidades desenvolvidas ao longo do 3º bimestre.",
                estrategia: "A- Aula expositiva com discussão pautada no material digital;",
                acoes_bloom: "<ul><li>Lembrar</li><li>Aplicar</li><li>Analisar</li></ul>",
                lessons: []
              });
            }

            // Week 9 (index 8) - Prova Paulista
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Aplicação da Prova Paulista do 3º Bimestre",
              avaliacao: "Formativa / Prova Paulista",
              ae: "Avaliação oficial das aprendizagens essenciais do 3º bimestre por meio da Prova Paulista.",
              estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
              acoes_bloom: "<ul><li>Analisar</li><li>Avaliar</li><li>Resolver</li></ul>",
              lessons: []
            });

            // Week 10 (index 9) - Consolidação
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Consolidação das aprendizagens e devolutiva pedagógica da Prova Paulista",
              avaliacao: "Formativa / Devolutiva",
              ae: "Consolidação e fechamento de notas/conceitos pedagógicos do bimestre.",
              estrategia: "C- Estudo dirigido; (Devolutiva da Prova Paulista)",
              acoes_bloom: "<ul><li>Revisar</li><li>Consolidar</li><li>Compreender</li></ul>",
              lessons: []
            });

          } else {
            // 1º, 2º, and 4º Bimestre (Content weeks are calendar weeks 1 to 7, i.e., indices 0 to 6)
            for (let i = 0; i < 7; i++) {
              const weekLessons = groupedContentWeeks[i]?.lessons || [];
              fullWeeks.push(buildWeekData(weekLessons, i));
            }

            // Week 8 (index 7) - Recomposição/Visita (reserved if present) or Revision/Saresp/External
            if (recoLessons.length > 0) {
              fullWeeks.push(buildWeekData(recoLessons, 7));
            } else {
              if (planBimester === '1º Bimestre') {
                fullWeeks.push({
                  periodo: getWeekPeriod(planBimester, 7),
                  aulas_escopo: "Não se aplica",
                  conteudos: "Revisão de conteúdos e preparação para a Prova Paulista",
                  avaliacao: "Diagnóstica / Formativa",
                  ae: "Retomada e consolidação de competências desenvolvidas ao longo do bimestre.",
                  estrategia: "A- Aula expositiva com discussão pautada no material digital;",
                  acoes_bloom: "<ul><li>Lembrar</li><li>Aplicar</li><li>Rever</li></ul>",
                  lessons: []
                });
              } else if (planBimester === '2º Bimestre') {
                fullWeeks.push({
                  periodo: getWeekPeriod(planBimester, 7),
                  aulas_escopo: "Não se aplica",
                  conteudos: "Aplicação da Prova Paulista do 2º Bimestre",
                  avaliacao: "Formativa / Prova Paulista",
                  ae: "Avaliação oficial das aprendizagens essenciais por meio da Prova Paulista.",
                  estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
                  acoes_bloom: "<ul><li>Analisar</li><li>Avaliar</li><li>Resolver</li></ul>",
                  lessons: []
                });
              } else {
                fullWeeks.push({
                  periodo: getWeekPeriod(planBimester, 7),
                  aulas_escopo: "Não se aplica",
                  conteudos: `Previsão SARESP (${effectiveSarespDate})`,
                  avaliacao: "Externa / SARESP",
                  ae: "Avaliação externa do rendimento escolar por meio do SARESP.",
                  estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
                  acoes_bloom: "<ul><li>Analisar</li><li>Avaliar</li><li>Resolver</li></ul>",
                  lessons: []
                });
              }
            }

            // Week 9 (index 8) - Recovery
            if (planBimester === '1º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Feriado: Sexta-feira Santa; Recuperação Contínua das habilidades em defasagem",
                avaliacao: "Formativa",
                ae: "Nivelamento e superação de defasagens de aprendizagem.",
                estrategia: "C- Estudo dirigido; (Nivelamento)",
                acoes_bloom: "<ul><li>Resolver</li><li>Identificar</li><li>Consolidar</li></ul>",
                lessons: []
              });
            } else if (planBimester === '2º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Recuperação Contínua e apoio pedagógico personalizado",
                avaliacao: "Formativa",
                ae: "Superação de defasagens e consolidação das habilidades essenciais do 2º bimestre.",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "<ul><li>Revisar</li><li>Resolver</li><li>Superar</li></ul>",
                lessons: []
              });
            } else {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Recuperação Contínua final e fechamento de conceitos pendentes",
                avaliacao: "Formativa",
                ae: "Recuperação final das habilidades em defasagem ao longo do semestre letivo.",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "<ul><li>Resolver</li><li>Revisar</li><li>Consolidar</li></ul>",
                lessons: []
              });
            }

            // Week 10 (index 9) - Consolidation
            if (planBimester === '4º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 9),
                aulas_escopo: "Não se aplica",
                conteudos: "Consolidação de notas, frequência e Atividades de Fechamento do ano letivo",
                avaliacao: "Formativa / Atividades de Fechamento",
                ae: "Fechamento do ciclo letivo e consolidação das habilidades anuais.",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "<ul><li>Refletir</li><li>Consolidar</li><li>Completar</li></ul>",
                lessons: []
              });
            } else {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 9),
                aulas_escopo: "Não se aplica",
                conteudos: "Consolidação e fechamento pedagógico do bimestre",
                avaliacao: "Formativa",
                ae: "Consolidação e sistematização final de todas as habilidades trabalhadas no bimestre.",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "<ul><li>Revisar</li><li>Consolidar</li><li>Compreender</li></ul>",
                lessons: []
              });
            }
          }
        } else {
          // --- STANDARD SUBJECT PLAN GENERATION (ORIGINAL LOGIC) ---
          const formatWeekDataForSubject = (weekLessons: any[], subjectName: string, defaultAe: string, defaultConteudos: string, defaultAcoes: string) => {
            if (!weekLessons || weekLessons.length === 0) {
              return { ae: defaultAe, conteudos: defaultConteudos, acoes: defaultAcoes };
            }

            const subjectLower = subjectName.toLowerCase();
            
            if (subjectLower.includes('projeto de vida')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const dimensao = firstRaw.dimensao || '';
              const atitude = firstRaw.atitude || '';
              const pratica = firstRaw.pratica || '';
              const contexto = firstRaw.contexto || '';
              const questoes = firstRaw.questoes || '';

              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + weekLessons.map(l => `<li style="margin-bottom: 2pt;"><strong>Aula ${l.raw?.aula || l.aula || ''}</strong>: ${l.titulo || ''}</li>`).join('') + `</ul>`;
              if (dimensao) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Dimensão:</strong> ${dimensao}</p>`;
              if (atitude) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Atitude:</strong> ${atitude}</p>`;
              if (pratica) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Prática:</strong> ${pratica}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.habilidade || l.aprendizagem || '').filter(Boolean)));
              let aeHtml = `<strong style="color: #002060;">Habilidades / Competências:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>`;

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => l.raw?.compreensao || l.objetivos || '').filter(Boolean)));
              let acoesBloomHtml = `<strong style="color: #002060;">Compreensão Esperada:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;
              if (contexto) acoesBloomHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Contexto:</strong> ${contexto}</p>`;
              if (questoes) acoesBloomHtml += `<p style="margin: 2pt 0 0 0;"><strong>Questões:</strong> ${questoes}</p>`;

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('tecnologia')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const unidade = firstRaw.unidade || '';
              const formato = firstRaw.formato || '';
              const entrega = firstRaw.entrega || '';

              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + weekLessons.map(l => `<li style="margin-bottom: 2pt;"><strong>Aula ${l.raw?.aulaSala || l.aula || ''}</strong>: ${l.titulo || ''}</li>`).join('') + `</ul>`;
              if (unidade) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Unidade Temática:</strong> ${unidade}</p>`;
              if (formato) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Formato:</strong> ${formato}</p>`;
              if (entrega) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Entrega Esperada:</strong> ${entrega}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.habilidade || l.aprendizagem || '').filter(Boolean)));
              let aeHtml = `<strong style="color: #002060;">Habilidades Computacionais/BNCC:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>`;

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => l.raw?.objetivo || l.objetivos || '').filter(Boolean)));
              let acoesBloomHtml = `<strong style="color: #002060;">Objetivos de Aprendizagem:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('orientação de estudos') || subjectLower.includes('estudos')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const genero = firstRaw.genero || '';
              const eixo = firstRaw.eixo || '';
              const praticas = firstRaw.praticasPedagogicas || '';
              const plataforma = firstRaw.plataforma || '';

              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + weekLessons.map(l => `<li style="margin-bottom: 2pt;"><strong>Aula ${l.raw?.aula || l.aula || ''}</strong>: ${l.titulo || ''}</li>`).join('') + `</ul>`;
              if (genero) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Gênero/Tema:</strong> ${genero}</p>`;
              if (eixo) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Eixo Temático:</strong> ${eixo}</p>`;
              if (plataforma) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Plataforma:</strong> ${plataforma}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.habilidade || l.aprendizagem || '').filter(Boolean)));
              let aeHtml = `<strong style="color: #002060;">Habilidades Prioritárias (GPS):</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>`;

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => l.raw?.objetivos || l.objetivos || '').filter(Boolean)));
              let acoesBloomHtml = `<strong style="color: #002060;">Objetivos e Práticas Pedagógicas:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;
              if (praticas) acoesBloomHtml += `<p style="margin: 4pt 0 0 0;"><strong>Metodologia Aplicada:</strong> ${praticas}</p>`;

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('finanças') || subjectLower.includes('financeira')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const unidade = firstRaw.unidadeTematica || '';
              const objeto = firstRaw.objetoConhecimento || '';

              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + weekLessons.map(l => `<li style="margin-bottom: 2pt;"><strong>Aula ${l.raw?.aula || l.aula || ''}</strong>: ${l.titulo || ''}</li>`).join('') + `</ul>`;
              if (unidade) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Unidade Temática:</strong> ${unidade}</p>`;
              if (objeto) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Objeto de Conhecimento:</strong> ${objeto}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.habilidade || l.aprendizagem || '').filter(Boolean)));
              let aeHtml = `<strong style="color: #002060;">Habilidades (Currículo Paulista):</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>`;

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => l.raw?.objetivos || l.objetivos || '').filter(Boolean)));
              let acoesBloomHtml = `<strong style="color: #002060;">Objetivos de Aprendizagem:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('redação') || subjectLower.includes('leitura')) {
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + weekLessons.map(l => `<li style="margin-bottom: 2pt;"><strong>Aula ${l.raw?.aula || l.aula || ''}</strong>: ${l.titulo || ''}</li>`).join('') + `</ul>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.habilidade || l.aprendizagem || '').filter(Boolean)));
              let aeHtml = `<strong style="color: #002060;">Habilidades:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>`;

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => l.objetivos || '').filter(Boolean)));
              let acoesBloomHtml = `<strong style="color: #002060;">Objetivos:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            return { ae: defaultAe, conteudos: defaultConteudos, acoes: defaultAcoes };
          };

          const fullWeeksStandard = [];

          if (planBimester === '3º Bimestre') {
            // Week 1 (index 0) - Recovery Week
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 0),
              aulas_escopo: "Não se aplica",
              conteudos: "<ul><li>Recuperação Semestral: Aplicação dos planos de recuperação semestral focados na retomada de conteúdos e habilidades essenciais do 1º semestre letivo para sanar lacunas de aprendizagem identificadas.</li></ul>",
              avaliacao: "Diagnóstica e formativa através de atividades práticas direcionadas e autoavaliação guiada.",
              ae: "<ul><li>Recuperação e consolidação de habilidades críticas e conteúdos não assimilados no primeiro semestre.</li></ul>",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "<ul><li>Identificar</li><li>Revisar</li><li>Consolidar</li></ul>",
              lessons: []
            });

            // Weeks 2 to 7 (indices 1 to 6)
            for (let i = 1; i < 7; i++) {
              const weekLessons = weeksLessons[i - 1] || [];
              
              if (weekLessons.length === 0) {
                fullWeeksStandard.push({
                  periodo: getWeekPeriod(planBimester, i),
                  aulas_escopo: 'Não se aplica',
                  conteudos: 'Nenhum conteúdo selecionado para esta semana.',
                  avaliacao: 'Não aplicável',
                  ae: 'Nenhuma Aprendizagem Essencial',
                  estrategia: 'Nenhuma estratégia selecionada',
                  acoes_bloom: 'Nenhuma ação selecionada',
                  lessons: []
                });
                continue;
              }

              // 1. aulas_escopo
              const aulasEscopo = getAulasMaterialDigital(weekLessons, planBimester, i + 1);

              // 2. ae (Aprendizagem Essencial)
              const uniqueAEs: string[] = [];
              weekLessons.forEach(l => {
                const text = (l.aprendizagem || l.habilidade || '').trim();
                if (!text) return;
                const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
                lines.forEach(line => {
                  if (!uniqueAEs.includes(line)) {
                    uniqueAEs.push(line);
                  }
                });
              });

              const aeHtml = uniqueAEs.length > 0
                ? `<ul>` + uniqueAEs.map(ae => `<li>${ae}</li>`).join('') + `</ul>`
                : '<p>Nenhuma Aprendizagem Essencial selecionada.</p>';

              // 3. conteudos
              const uniqueContents: string[] = [];
              weekLessons.forEach(l => {
                const title = (l.titulo || '').trim();
                const content = (l.conteudo || '').trim();
                let displayText = title;
                if (content && content !== title) {
                  displayText = `${title}: ${content}`;
                }
                // Strip "Atividade Verificadora" from contents
                displayText = displayText
                  .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                  .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                  .replace(/:\s*$/, '')
                  .trim();
                if (displayText && !uniqueContents.includes(displayText)) {
                  uniqueContents.push(displayText);
                }
              });

              const conteudosHtml = uniqueContents.length > 0
                ? `<ul>` + uniqueContents.map(c => `<li>${c}</li>`).join('') + `</ul>`
                : '<p>Nenhum conteúdo listado.</p>';

              // 4. acoes_bloom
              const uniqueObjectives: string[] = [];
              weekLessons.forEach(l => {
                const text = (l.objetivos || '').trim();
                if (!text) return;
                const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
                lines.forEach(line => {
                  if (!uniqueObjectives.includes(line)) {
                    uniqueObjectives.push(line);
                  }
                });
              });

              const acoesBloomHtml = uniqueObjectives.length > 0
                ? `<ul>` + uniqueObjectives.map(obj => `<li>${obj}</li>`).join('') + `</ul>`
                : '<ul><li>Lembrar</li><li>Compreender</li><li>Aplicar</li></ul>';

              // 5. estrategia
              let estrategiaSelected = STRATEGIES_LIST[i % STRATEGIES_LIST.length];
              const weekContentLower = uniqueContents.join(' ').toLowerCase();
              if (weekContentLower.includes('verificadora') || weekContentLower.includes('verificação')) {
                estrategiaSelected = "C- Estudo dirigido; (Atividades de Verificação Contínua)";
              } else if (weekContentLower.includes('jogo') || weekContentLower.includes('desafio') || weekContentLower.includes('lúdica')) {
                estrategiaSelected = "I- Gamificação;";
              } else if (weekContentLower.includes('problema') || weekContentLower.includes('equação') || weekContentLower.includes('situação')) {
                estrategiaSelected = "E- Aprendizagem baseada em problemas;";
              } else if (weekContentLower.includes('gráfico') || weekContentLower.includes('tabela') || weekContentLower.includes('pesquisa')) {
                estrategiaSelected = "C- Estudo dirigido;";
              } else if (weekContentLower.includes('laboratório') || weekContentLower.includes('experimento') || weekContentLower.includes('prática')) {
                estrategiaSelected = "K- Aula prática;";
              }

              // 6. avaliacao
              let avaliacaoSelected = getPertinentEvaluation(weekContentLower, estrategiaSelected, i);

              const formatted = formatWeekDataForSubject(weekLessons, planSubject, aeHtml, conteudosHtml, acoesBloomHtml);

              fullWeeksStandard.push({
                periodo: getWeekPeriod(planBimester, i),
                aulas_escopo: aulasEscopo,
                conteudos: formatted.conteudos,
                avaliacao: avaliacaoSelected,
                ae: formatted.ae,
                estrategia: estrategiaSelected,
                acoes_bloom: formatted.acoes,
                lessons: weekLessons
              });
            }
          } else {
            // Normal 7 weeks of content
            for (let i = 0; i < 7; i++) {
              const weekLessons = weeksLessons[i] || [];
              
              if (weekLessons.length === 0) {
                fullWeeksStandard.push({
                  periodo: getWeekPeriod(planBimester, i),
                  aulas_escopo: 'Não se aplica',
                  conteudos: 'Nenhum conteúdo selecionado para esta semana.',
                  avaliacao: 'Não aplicável',
                  ae: 'Nenhuma Aprendizagem Essencial',
                  estrategia: 'Nenhuma estratégia selecionada',
                  acoes_bloom: 'Nenhuma ação selecionada',
                  lessons: []
                });
                continue;
              }

              // 1. aulas_escopo
              const aulasEscopo = getAulasMaterialDigital(weekLessons, planBimester, i + 1);

              // 2. ae (Aprendizagem Essencial)
              const uniqueAEs: string[] = [];
              weekLessons.forEach(l => {
                const text = (l.aprendizagem || l.habilidade || '').trim();
                if (!text) return;
                const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
                lines.forEach(line => {
                  if (!uniqueAEs.includes(line)) {
                    uniqueAEs.push(line);
                  }
                });
              });

              const aeHtml = uniqueAEs.length > 0
                ? `<ul>` + uniqueAEs.map(ae => `<li>${ae}</li>`).join('') + `</ul>`
                : '<p>Nenhuma Aprendizagem Essencial selecionada.</p>';

              // 3. conteudos
              const uniqueContents: string[] = [];
              weekLessons.forEach(l => {
                const title = (l.titulo || '').trim();
                const content = (l.conteudo || '').trim();
                let displayText = title;
                if (content && content !== title) {
                  displayText = `${title}: ${content}`;
                }
                // Strip "Atividade Verificadora" from contents
                displayText = displayText
                  .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                  .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                  .replace(/:\s*$/, '')
                  .trim();
                if (displayText && !uniqueContents.includes(displayText)) {
                  uniqueContents.push(displayText);
                }
              });

              const conteudosHtml = uniqueContents.length > 0
                ? `<ul>` + uniqueContents.map(c => `<li>${c}</li>`).join('') + `</ul>`
                : '<p>Nenhum conteúdo listado.</p>';

              // 4. acoes_bloom
              const uniqueObjectives: string[] = [];
              weekLessons.forEach(l => {
                const text = (l.objetivos || '').trim();
                if (!text) return;
                const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
                lines.forEach(line => {
                  if (!uniqueObjectives.includes(line)) {
                    uniqueObjectives.push(line);
                  }
                });
              });

              const acoesBloomHtml = uniqueObjectives.length > 0
                ? `<ul>` + uniqueObjectives.map(obj => `<li>${obj}</li>`).join('') + `</ul>`
                : '<ul><li>Lembrar</li><li>Compreender</li><li>Aplicar</li></ul>';

              // 5. estrategia
              let estrategiaSelected = STRATEGIES_LIST[i % STRATEGIES_LIST.length];
              const weekContentLower = uniqueContents.join(' ').toLowerCase();
              if (weekContentLower.includes('verificadora') || weekContentLower.includes('verificação')) {
                estrategiaSelected = "C- Estudo dirigido; (Atividades de Verificação Contínua)";
              } else if (weekContentLower.includes('jogo') || weekContentLower.includes('desafio') || weekContentLower.includes('lúdica')) {
                estrategiaSelected = "I- Gamificação;";
              } else if (weekContentLower.includes('problema') || weekContentLower.includes('equação') || weekContentLower.includes('situação')) {
                estrategiaSelected = "E- Aprendizagem baseada em problemas;";
              } else if (weekContentLower.includes('gráfico') || weekContentLower.includes('tabela') || weekContentLower.includes('pesquisa')) {
                estrategiaSelected = "C- Estudo dirigido;";
              } else if (weekContentLower.includes('laboratório') || weekContentLower.includes('experimento') || weekContentLower.includes('prática')) {
                estrategiaSelected = "K- Aula prática;";
              }

              // 6. avaliacao
              let avaliacaoSelected = getPertinentEvaluation(weekContentLower, estrategiaSelected, i);

              const formatted = formatWeekDataForSubject(weekLessons, planSubject, aeHtml, conteudosHtml, acoesBloomHtml);

              fullWeeksStandard.push({
                periodo: getWeekPeriod(planBimester, i),
                aulas_escopo: aulasEscopo,
                conteudos: formatted.conteudos,
                avaliacao: avaliacaoSelected,
                ae: formatted.ae,
                estrategia: estrategiaSelected,
                acoes_bloom: formatted.acoes,
                lessons: weekLessons
              });
            }
          }

          // Weeks 8, 9, 10
          const is4thBimestre = planBimester === '4º Bimestre';
          const is3rdBimestre = planBimester === '3º Bimestre';
          const effectiveSarespDate = sarespDate || '25/11/2026 e 26/11/2026';

          if (is3rdBimestre) {
            // Week 8 (14 a 18/09/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 7),
              aulas_escopo: "Não se aplica",
              conteudos: "Revisão dos conteúdos essenciais e preparação para a Prova Paulista do 3º Bimestre",
              avaliacao: "Diagnóstica / Formativa",
              ae: "Revisão de todas as habilidades desenvolvidas ao longo do 3º bimestre.",
              estrategia: "A- Aula expositiva com discussão pautada no material digital;",
              acoes_bloom: "<ul><li>Lembrar</li><li>Aplicar</li><li>Analisar</li></ul>"
            });
            // Week 9 (21 a 25/09/2026) - Prova Paulista
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Aplicação da Prova Paulista do 3º Bimestre (Período: 21 a 25/09/2026)",
              avaliacao: "Formativa / Prova Paulista",
              ae: "Avaliação oficial das aprendizagens essenciais do 3º bimestre por meio da Prova Paulista.",
              estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
              acoes_bloom: "<ul><li>Analisar</li><li>Avaliar</li><li>Resolver</li></ul>"
            });
            // Week 10 (28/09 a 02/10/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Fechamento de notas, conselho de classe, devolutiva da Prova Paulista e consolidação das aprendizagens",
              avaliacao: "Somativa / Final",
              ae: "Sistematização e consolidação final das aprendizagens essenciais do 3º bimestre.",
              estrategia: "J- Rotação por estações;",
              acoes_bloom: "<ul><li>Avaliar</li><li>Refletir</li></ul>"
            });
          } else {
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 7),
              aulas_escopo: "Não se aplica",
              conteudos: is4thBimestre 
                ? `Revisão Geral e aplicação da Avaliação SARESP (Data/Período: ${effectiveSarespDate})` 
                : "Revisão Geral e aplicação da Prova Paulista",
              avaliacao: is4thBimestre ? "Formativa / SARESP" : "Formativa / Prova Paulista",
              ae: is4thBimestre 
                ? `Revisão de todas as habilidades desenvolvidas ao longo do ano letivo para o SARESP (${effectiveSarespDate}).` 
                : "Revisão de todas as habilidades desenvolvidas ao longo do bimestre.",
              estrategia: "A- Aula expositiva com discussão pautada no material digital;",
              acoes_bloom: "<ul><li>Lembrar</li><li>Aplicar</li><li>Analisar</li></ul>"
            });
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Retomada de habilidades e conceitos com maior defasagem pedagógica",
              avaliacao: "Diagnóstica / Formativa",
              ae: "Atividades de reforço e retomada focadas nos descritores menos consolidados.",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "<ul><li>Corrigir</li><li>Identificar</li><li>Compreender</li></ul>"
            });
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Fechamento de notas, conselho de classe e consolidação das aprendizagens",
              avaliacao: "Somativa / Final",
              ae: "Sistematização e consolidação das aprendizagens essenciais estabelecidas no currículo paulista.",
              estrategia: "J- Rotação por estações;",
              acoes_bloom: "<ul><li>Avaliar</li><li>Refletir</li></ul>"
            });
          }

          fullWeeks.push(...fullWeeksStandard);
        }

        let docHtml = '';
        if (planFormat === 'ava-efape') {
          docHtml = buildAvaEfapeDocumentHTML(schoolName, docenteName, selectedSegment, planSubject, planGrade, planBimester, selectedLessonsData, fullWeeks, trabalhosDate, avaliacoesDate);
        } else {
          docHtml = buildDocumentHTML(schoolName, docenteName, selectedSegment, planSubject, planGrade, planBimester, fullWeeks, trabalhosDate, avaliacoesDate);
        }
        setGeneratedDocHtml(docHtml);
        setGeneratedWeeks(fullWeeks);
        showToast("Plano de Ensino Gerado com Sucesso!");
      } catch (err: any) {
        console.error('Plan generation failed:', err);
        setPlanError(err.message || 'Erro ao gerar o plano.');
        showToast(err.message || "Erro ao gerar o plano.", true);
      } finally {
        setIsGeneratingPlan(false);
      }
    }, 600);
  };

  const handleOpenGeminiPrompt = (verificadoraLesson: any) => {
    const previous = verificadoraLesson?.previousLessons || [];
    const lessonsText = previous.length > 0
      ? previous.map((l: any, index: number) => {
          return `- Aula ${l.aula || index + 1}: ${l.titulo || ''}\n  Conteúdo: ${l.conteudo || ''}\n  Habilidade: ${l.habilidade || ''}`;
        }).join('\n')
      : 'Revisão geral dos conteúdos do bimestre.';

    const skillsText = Array.from(new Set(previous.map((l: any) => l.habilidade || '').filter(Boolean))).join('\n') || 'Retomada de habilidades críticas do Currículo Paulista.';

    const rawPromptText = `Atue como um Professor Mentor especialista do Currículo Paulista de 2026.
Preciso de uma Atividade Verificadora de Aprendizagem de alta qualidade e pronta para aplicação, focada nos conteúdos ministrados nas últimas aulas.

Aqui estão as informações do plano:
- Componente Curricular: ${planSubject}
- Ano/Série: ${planGrade}
- Bimestre: ${planBimester}

As aulas anteriores ministradas foram:
${lessonsText}

Habilidades trabalhadas até o momento:
${skillsText}

Instruções para Elaboração da Atividade Verificadora:
1. **Estrutura**: Crie 3 a 5 questões desafiadoras e contextualizadas com a realidade dos alunos do ${planGrade}.
2. **Tipos de Questões**:
   - Questões de múltipla escolha (com 4 alternativas de A a D, justificando por que a alternativa correta é a certa e o erro comum das distratoras).
   - Questão dissertativa/prática baseada em resolução de problemas ou situação real.
3. **Foco**: Diagnosticar a real retenção dos conteúdos anteriores, identificar lacunas de aprendizagem e preparar os alunos para a Prova Paulista 2026.
4. **Metodologia**: Inclua um pequeno roteiro de autoavaliação (ex: "O que eu aprendi?", "Onde tive mais dificuldade?") para que o estudante faça a checagem metacognitiva.
5. **Gabarito**: Forneça o gabarito detalhado com orientações para o professor fazer a devolutiva (feedback rápido).

Gere o documento formatado em Markdown pronto para ser copiado e impresso.`;

    const promptText = buildSecuredPrompt(rawPromptText);

    navigator.clipboard.writeText(promptText)
      .then(() => {
        showToast("📋 Prompt copiado com sucesso!");
        setShowGeminiAlert(true);
      })
      .catch((err) => {
        console.error("Failed to copy", err);
        showToast("Erro ao copiar o prompt automático.", true);
      });
  };

  const sanitizeHtmlForExport = (html: string): string => {
    if (!html) return '';
    return html
      .replace(/<button[^>]*class="[^"]*gemini-prompt-trigger[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '<span style="float: right; font-size: 8.5pt; font-weight: bold; color: #166534; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px;">🎁 Bônus: Prompt Gemini Incluído</span>')
      .replace(/<button[^>]*data-week-idx="[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '<span style="float: right; font-size: 8.5pt; font-weight: bold; color: #166534; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px;">🎁 Bônus: Prompt Gemini Incluído</span>');
  };

  const handleCopy = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const cleanHtml = sanitizeHtmlForExport(generatedDocHtml);
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-9999px';
    tempDiv.innerHTML = cleanHtml;
    document.body.appendChild(tempDiv);

    // Extract only tables after "PLANO DE AULA SEMANAL" header
    const allTables = Array.from(tempDiv.querySelectorAll('table'));
    
    let headerTableIndex = allTables.findIndex(t => 
      t.textContent?.toLowerCase().includes('plano de aula semanal')
    );

    let targetTables: HTMLTableElement[] = [];

    if (headerTableIndex !== -1) {
      // Standard format: tables after the Section 5 header table
      targetTables = allTables.slice(headerTableIndex + 1).filter(t => {
        const txt = t.textContent?.toLowerCase() || '';
        return !txt.includes('referências') && !txt.includes('bloom, b. s.');
      }) as HTMLTableElement[];
    } else {
      // Fallback for AVA-EFAPE or other templates
      const allElements = Array.from(tempDiv.querySelectorAll('*'));
      const headerElem = allElements.find(el => 
        el.children.length === 0 && el.textContent?.toLowerCase().includes('plano de aula semanal')
      );
      if (headerElem) {
        targetTables = allTables.filter(t => 
          (headerElem.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) &&
          !t.textContent?.toLowerCase().includes('referências')
        ) as HTMLTableElement[];
      }
    }

    if (targetTables.length === 0) {
      targetTables = allTables;
    }

    // Process tables into locked HTML container
    const tablesContainer = document.createElement('div');
    targetTables.forEach(t => {
      const cloned = t.cloneNode(true) as HTMLTableElement;
      
      // Enforce locked inline styles on cloned table & all children for Google Docs compatibility
      cloned.setAttribute('style', 'table-layout: fixed !important; mso-table-layout-alt: fixed !important; border-collapse: collapse !important; width: 100% !important; margin-top: 0pt !important; margin-bottom: 12pt !important; padding: 0pt !important; border: 1px solid #000000 !important; mso-table-lspace: 0pt !important; mso-table-rspace: 0pt !important; mso-padding-alt: 0pt 0pt 0pt 0pt !important;');
      cloned.setAttribute('width', '100%');
      cloned.setAttribute('border', '1');
      cloned.setAttribute('cellpadding', '0');
      cloned.setAttribute('cellspacing', '0');

      cloned.querySelectorAll('p, div, li, span').forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.marginTop = '0pt';
        htmlEl.style.marginBottom = '0pt';
        htmlEl.style.paddingLeft = '0pt';
        htmlEl.style.paddingRight = '0pt';
        htmlEl.style.textIndent = '0pt';
        htmlEl.style.lineHeight = '1.0';
        htmlEl.style.fontFamily = "Calibri, 'Segoe UI', Arial, sans-serif";
        htmlEl.style.fontSize = '11pt';
      });

      cloned.querySelectorAll('th, td').forEach(cell => {
        const htmlCell = cell as HTMLElement;
        htmlCell.style.border = '1px solid #000000';
        htmlCell.style.padding = '4px 6px';
        htmlCell.style.fontFamily = "Calibri, 'Segoe UI', Arial, sans-serif";
        htmlCell.style.fontSize = '11pt';
        htmlCell.style.wordBreak = 'break-word';
        htmlCell.style.overflowWrap = 'break-word';
        htmlCell.style.wordWrap = 'break-word';
        htmlCell.style.marginTop = '0pt';
        htmlCell.style.marginBottom = '0pt';
      });

      tablesContainer.appendChild(cloned);
    });

    // Remove empty text nodes and spaces between tags to avoid extra paragraphs in Google Docs
    const tablesCleanHtml = tablesContainer.innerHTML
      .replace(/>\s+</g, '><')
      .trim();

    const lockedDocumentHtml = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<style>
  @page WordSection1 { size: 29.7cm 21.0cm; mso-page-orientation: landscape; margin: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; }
  div.WordSection1 { page: WordSection1; }
  body, p, div, li, span, td {
      font-family: Cambria, 'Cambria Math', Georgia, serif !important;
      font-size: 11pt !important;
      font-weight: normal !important;
      line-height: 1.15 !important;
      color: #000000;
      margin-top: 0pt !important;
      margin-bottom: 0pt !important;
      padding-left: 0pt !important;
      padding-right: 0pt !important;
      text-indent: 0pt !important;
  }
  strong, b, th, thead td, .tableHeader, h1, h2, h3, h4 {
      font-family: Cambria, 'Cambria Math', Georgia, serif !important;
      font-size: 12pt !important;
      font-weight: bold !important;
  }
  p { margin-top: 0pt !important; margin-bottom: 0pt !important; line-height: 1.15 !important; }
  table {
      table-layout: fixed !important;
      mso-table-layout-alt: fixed !important;
      border-collapse: collapse !important;
      width: 100% !important;
      margin-left: 0 !important;
      margin-right: auto !important;
      margin-bottom: 12pt !important;
      border: 1px solid #000000 !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
      mso-padding-alt: 0pt 0pt 0pt 0pt !important;
  }
  th, thead td, .tableHeader {
      font-family: Cambria, 'Cambria Math', Georgia, serif !important;
      font-size: 12pt !important;
      font-weight: bold !important;
      color: #FFFFFF !important;
      background-color: #4472C4 !important;
      text-align: center !important;
      border: 1px solid #000000 !important;
      padding: 4px 6px !important;
      mso-style-parent: "" !important;
  }
  td, .tableCell {
      font-family: Cambria, 'Cambria Math', Georgia, serif !important;
      font-size: 11pt !important;
      color: #000000 !important;
      border: 1px solid #000000 !important;
      padding: 4px 6px !important;
      vertical-align: top !important;
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
      word-break: break-word !important;
      mso-style-parent: "" !important;
  }
</style>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotShredHTML/>
      <w:Compatibility>
          <w:DoNotAutofitConstrainedTables/>
          <w:BreakWrappedTables/>
          <w:SnapToGridInCell/>
          <w:DoNotExpandShiftReturn/>
      </w:Compatibility>
      <w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
  </w:WordDocument>
</xml>
<![endif]-->
</head>
<body>
<div class="WordSection1">
${tablesCleanHtml}
</div>
</body>
</html>`;

    // Attempt navigator.clipboard.write with ClipboardItem
    const plainText = tablesContainer.textContent || '';
    if (navigator.clipboard && window.ClipboardItem) {
      const htmlBlob = new Blob([lockedDocumentHtml], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        })
      ]).then(() => {
        showToast("Tabelas copiadas com formato travado para Google Docs!");
      }).catch(() => {
        fallbackCopyExec(lockedDocumentHtml);
      });
    } else {
      fallbackCopyExec(lockedDocumentHtml);
    }

    function fallbackCopyExec(htmlPayload: string) {
      tempDiv.innerHTML = htmlPayload;
      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      try {
        document.execCommand('copy');
        showToast("Tabelas copiadas com formato travado para Google Docs!");
      } catch (err) {
        showToast("Erro ao copiar.", true);
      }
      window.getSelection()?.removeAllRanges();
    }

    document.body.removeChild(tempDiv);
  };

  const handleDownloadHtml = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const cleanDocHtml = sanitizeHtmlForExport(generatedDocHtml);
    const isEfape = planFormat === 'ava-efape';
    const dynamicStyle = isEfape ? `
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                body { font-family: Arial, Helvetica, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px; display: flex; justify-content: center; }
                .plano-page { background: white; width: 100%; max-width: 1100px; padding: 1.27cm; box-shadow: 0 10px 25px rgba(0,0,0,0.1); box-sizing: border-box; font-size: 11pt; color: black; line-height: 1.45; }
                p { margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.45; }
                ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                li { margin-bottom: 3pt; text-align: justify; line-height: 1.45; }
                table { border-collapse: collapse; width: 100%; margin-bottom: 15pt; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; line-height: 1.45; }
                td { padding: 6pt; vertical-align: top; word-wrap: break-word; text-align: justify; font-family: Arial, Helvetica, sans-serif; }
                .weekly-plan-page { border: none !important; box-shadow: none !important; margin-bottom: 0 !important; padding: 0 !important; background: transparent !important; }
                .no-print { display: none !important; }
    ` : `
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                body { font-family: Cambria, 'Cambria Math', Georgia, serif; background-color: #f1f5f9; margin: 0; padding: 40px; display: flex; justify-content: center; }
                .plano-page { background: white; width: 100%; max-width: 1100px; padding: 1.27cm; box-shadow: 0 10px 25px rgba(0,0,0,0.1); box-sizing: border-box; font-size: 12pt; color: black; line-height: 1.15; }
                p { margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.15; }
                ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                li { margin-bottom: 3pt; text-align: justify; line-height: 1.15; }
                table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 15pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 12pt; line-height: 1.15; }
                td { border: 1pt solid black; padding: 5pt; vertical-align: top; word-wrap: break-word; text-align: justify; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 12pt; line-height: 1.15; }
                .no-print { display: none !important; }
    `;

    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <title>Plano de Ensino 2026</title>
          <style>
              ${dynamicStyle}
              @page { size: A4 portrait; margin: 0; }
              @media print {
                  body { background: white; margin: 0; padding: 1.27cm; display: block; }
                  .plano-page { box-shadow: none; max-width: 100%; padding: 0; }
              }
          </style>
      </head>
      <body>
          <div class="plano-page">
              ${cleanDocHtml}
          </div>
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    triggerFileDownload(blob, `Plano_Ensino_2026_${planFormat}.html`);
    showToast("Arquivo HTML baixado!");
  };

  const triggerFileDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleDownloadDoc = async () => {
    if (!generatedDocHtml && (!generatedWeeks || generatedWeeks.length === 0)) {
      showToast("Gere um documento primeiro.", true);
      return;
    }

    try {
      showToast("Gerando arquivo DOCX nativo...");
      const docxBlob = await documentEngine.generateNativeDocxBlob({
        escola: schoolName || 'E.E. Unidade Escolar',
        docente: docenteName || 'Docente',
        segmento: selectedSegment || 'Ensino Fundamental II',
        componente: planSubject || 'Componente Curricular',
        serie: planGrade || 'Ano/Série',
        bimestre: planBimester || 'Bimestre',
        semanas: generatedWeeks,
        trabalhosDate: trabalhosDate,
        avaliacoesDate: avaliacoesDate,
        format: planFormat,
        margins: marginSettings,
      });

      triggerFileDownload(docxBlob, `Plano_Ensino_2026_${planFormat}.docx`);
      showToast("Documento DOCX NATIVO editável baixado com sucesso!");
    } catch (error) {
      console.error("[handleDownloadDoc] Error generating native DOCX:", error);
      showToast("Erro ao gerar DOCX nativo. Utilizando exportador MSO...", true);
      // Fallback to legacy MSO Word export if any runtime issue occurs
      const legacyBlob = documentEngine.buildWordDownloadBlob({
        escola: schoolName || 'E.E. Unidade Escolar',
        docente: docenteName || 'Docente',
        segmento: selectedSegment || 'Ensino Fundamental II',
        componente: planSubject || 'Componente Curricular',
        serie: planGrade || 'Ano/Série',
        bimestre: planBimester || 'Bimestre',
        semanas: generatedWeeks,
        trabalhosDate: trabalhosDate,
        avaliacoesDate: avaliacoesDate,
        format: planFormat,
        margins: marginSettings,
      });
      triggerFileDownload(legacyBlob, `Plano_Ensino_2026_${planFormat}.doc`);
    }
  };

  const handlePrintPdf = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const cleanDocHtml = sanitizeHtmlForExport(generatedDocHtml);
    try {
      const printFrame = document.createElement('iframe');
      printFrame.style.visibility = 'hidden';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow ? printFrame.contentWindow.document : printFrame.contentDocument;
      if (!frameDoc) throw new Error("Could not access iframe document");
      
      const isEfape = planFormat === 'ava-efape';
      const dynamicStyle = isEfape ? `
                    @page { size: A4 landscape; margin: 0; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    html, body { font-family: Cambria, 'Cambria Math', Georgia, serif; color: black; line-height: 1.35; font-size: 11pt; margin: 0; padding: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; background: white; }
                    p, td, li, span { font-size: 11pt !important; font-weight: normal !important; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.35; }
                    strong, b, th, h1, h2, h3, h4 { font-size: 12pt !important; font-weight: bold !important; }
                    ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                    li { margin-bottom: 3pt; text-align: justify; line-height: 1.35; }
                    table { table-layout: fixed !important; border-collapse: collapse !important; width: 100% !important; margin-bottom: 12pt !important; page-break-inside: avoid; font-family: Cambria, 'Cambria Math', Georgia, serif !important; font-size: 11pt !important; line-height: 1.35 !important; border: 1px solid black !important; }
                    td { border: 1pt solid black !important; padding: 5pt !important; vertical-align: top !important; word-wrap: break-word !important; overflow-wrap: break-word !important; word-break: break-word !important; text-align: justify !important; font-family: Cambria, 'Cambria Math', Georgia, serif !important; }
                    .weekly-plan-page { border: none !important; box-shadow: none !important; margin-bottom: 0 !important; padding: 0 !important; background: transparent !important; max-width: 100% !important; }
                    .no-print { display: none !important; }
      ` : `
                    @page { size: A4 landscape; margin: 0; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    html, body { font-family: Cambria, 'Cambria Math', Georgia, serif; color: black; line-height: 1.2; font-size: 11pt; margin: 0; padding: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; background: white; }
                    p, td, li, span { font-size: 11pt !important; font-weight: normal !important; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.2; }
                    strong, b, th, h1, h2, h3, h4 { font-size: 12pt !important; font-weight: bold !important; }
                    ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                    li { margin-bottom: 3pt; text-align: justify; line-height: 1.2; }
                    table { table-layout: fixed !important; border-collapse: collapse !important; width: 100% !important; margin-bottom: 12pt !important; page-break-inside: avoid; font-family: Cambria, 'Cambria Math', Georgia, serif !important; font-size: 11pt !important; line-height: 1.2 !important; border: 1px solid black !important; }
                    td { border: 1pt solid black !important; padding: 5pt !important; vertical-align: top !important; word-wrap: break-word !important; overflow-wrap: break-word !important; word-break: break-word !important; text-align: justify !important; font-family: Cambria, 'Cambria Math', Georgia, serif !important; font-size: 11pt !important; line-height: 1.2 !important; }
                    .no-print { display: none !important; }
      `;

      frameDoc.open();
      frameDoc.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <title>Imprimir Plano de Ensino</title>
              <style>
                  ${dynamicStyle}
              </style>
          </head>
          <body>
              ${cleanDocHtml}
          </body>
          </html>
      `);
      frameDoc.close();

      printFrame.contentWindow?.focus();
      setTimeout(() => {
          try {
              printFrame.contentWindow?.print();
          } catch (err) {
              window.print();
          }
          setTimeout(() => document.body.removeChild(printFrame), 1000);
      }, 500);
    } catch (e) {
      window.print();
    }
  };

  const handleGenerateRecoveryPlanAction = () => {
    setIsGeneratingRecoveryPlan(true);
    setTimeout(() => {
      const result = generateCustomRecoveryPlan({
        componente: recComponente,
        ano: recAno,
        bimestre: recBimestre,
        aprendizagemEssencial: recAprendizagemEssencial,
        descritores: recDescritores,
        aulas: recAulas
      });
      setGeneratedRecoveryPlan(result);
      setIsGeneratingRecoveryPlan(false);
      showToast("Plano de Recuperação Gerado com Sucesso!");
    }, 800);
  };

  const loadPresetRecovery = (key: string) => {
    const t = PRESET_RECOVERY_TEMPLATES[key];
    if (t) {
      if (key === "tecnologia_7") {
        setRecComponente("Tecnologia e Inovação");
        setRecAno("7º Ano");
        setRecBimestre("1º Bimestre");
        setRecAprendizagemEssencial("1º Bimestre: Estrutura de arquivos compactados e diretórios | 2º Bimestre: Algoritmos visuais e lógica de programação simples.");
        setRecDescritores("1º Bimestre: EF07TE02 - Identificar o funcionamento de arquivos compactados e descrever vantagens no uso de algoritmos de compressão de dados.\n2º Bimestre: EF07TE04 - Desenvolver algoritmos de programação simples, com fluxogramas ou blocos visuais, para solucionar situações cotidianas.");
        setRecAulas(8);
      } else if (key === "filosofia_1") {
        setRecComponente("Filosofia");
        setRecAno("1ª Série");
        setRecBimestre("1º Bimestre");
        setRecAprendizagemEssencial("1º Bimestre: Passagem do mito ao logos e atitude filosófica | 2º Bimestre: Teoria do conhecimento: racionalismo e empirismo.");
        setRecDescritores("1º Bimestre: EM13CHS101 - Identificar, analisar e discutir as circunstâncias de matrizes conceituais estéticas e filosóficas de diferentes épocas.\n2º Bimestre: EM13CHS102 - Identificar e analisar as lógicas de argumentação e contradições internas em discursos, contrapondo racionalismo e empirismo.");
        setRecAulas(8);
      } else if (key === "matematica_9") {
        setRecComponente("Matemática");
        setRecAno("9º Ano");
        setRecBimestre("1º Bimestre");
        setRecAprendizagemEssencial("1º Bimestre: Cálculos de potenciação, radiciação com números racionais | 2º Bimestre: Aplicação do Teorema de Pitágoras e equações polinomiais do 2º grau.");
        setRecDescritores("1º Bimestre: EF09MA01 - Resolver e elaborar problemas com números reais, envolvendo cálculos de potenciação e radiciação com números racionais.\n2º Bimestre: EF09MA09 - Resolver e elaborar problemas que envolvam equações do 2º grau ou relações métricas do triângulo retângulo, inclusive o teorema de Pitágoras.");
        setRecAulas(8);
      }
      setGeneratedRecoveryPlan(t);
      showToast(`Preset de Recuperação Semestral carregado!`);
    }
  };

  const handleCopyRecovery = () => {
    if (!generatedRecoveryPlan) return;
    const markdownText = generateRecoveryPlanMarkdown(schoolName, docenteName, generatedRecoveryPlan, {
      componente: recComponente,
      ano: recAno,
      bimestre: recBimestre,
      aprendizagemEssencial: recAprendizagemEssencial,
      descritores: recDescritores,
      aulas: recAulas,
      adaptacaoCurricularOptions: recAdaptacoes,
      sugestaoMateriais: recMateriais,
      retomadaAprendizagensAnteriores: recRetomadaAnterior
    });
    navigator.clipboard.writeText(markdownText);
    showToast("Plano copiado em formato Markdown para a área de transferência!");
  };

  const handleDownloadRecoveryDoc = () => {
    if (!generatedRecoveryPlan) return;
    const htmlContent = buildRecoveryPlanHTML(schoolName, docenteName, generatedRecoveryPlan, {
      componente: recComponente,
      ano: recAno,
      bimestre: recBimestre,
      aprendizagemEssencial: recAprendizagemEssencial,
      descritores: recDescritores,
      aulas: recAulas,
      adaptacaoCurricularOptions: recAdaptacoes,
      sugestaoMateriais: recMateriais,
      retomadaAprendizagensAnteriores: recRetomadaAnterior
    });
    
    const header = `<html xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="ProgId" content="Word.Document">
          <meta name="Generator" content="Microsoft Word 15">
          <meta name="Originator" content="Microsoft Word 15">
          <!--[if gte mso 9]>
          <xml>
              <w:WordDocument>
                  <w:View>Print</w:View>
                  <w:Zoom>100</w:Zoom>
                  <w:DoNotOptimizeForCustomXSL/>
                  <w:DoNotShredHTML/>
                  <w:Compatibility>
                      <w:DoNotAutofitConstrainedTables/>
                      <w:BreakWrappedTables/>
                      <w:SnapToGridInCell/>
                      <w:DoNotExpandShiftReturn/>
                  </w:Compatibility>
                  <w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel>
              </w:WordDocument>
          </xml>
          <![endif]-->
          <title>Plano de Recuperacao Semestral</title>
          <style>
              @page WordSection1 { size: 29.7cm 21.0cm; mso-page-orientation: landscape; margin: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; }
              div.WordSection1 { page: WordSection1; }
              body, p, div, li, span, td {
                  font-family: Cambria, 'Cambria Math', Georgia, serif !important;
                  font-size: 11pt !important;
                  font-weight: normal !important;
                  line-height: 1.15 !important;
                  color: #000000;
                  margin-top: 0pt !important;
                  margin-bottom: 0pt !important;
                  padding-left: 0pt;
                  padding-right: 0pt;
                  text-indent: 0pt;
              }
              strong, b, th, thead td, .tableHeader, h1, h2, h3, h4 {
                  font-family: Cambria, 'Cambria Math', Georgia, serif !important;
                  font-size: 12pt !important;
                  font-weight: bold !important;
              }
              p { margin-top: 0pt !important; margin-bottom: 0pt !important; line-height: 1.15 !important; }
              table {
                  table-layout: fixed !important;
                  mso-table-layout-alt: fixed !important;
                  border-collapse: collapse !important;
                  width: 100% !important;
                  margin-left: 0 !important;
                  margin-right: auto !important;
                  margin-bottom: 12pt !important;
                  border: 1px solid #000000 !important;
                  mso-table-lspace: 0pt !important;
                  mso-table-rspace: 0pt !important;
                  mso-padding-alt: 0pt 0pt 0pt 0pt !important;
              }
              th, thead td, .tableHeader, tr.bg-header td, tr[style*="background-color: #1e3a8a"] td {
                  font-family: Cambria, 'Cambria Math', Georgia, serif !important;
                  font-size: 12pt !important;
                  font-weight: bold !important;
                  color: #FFFFFF !important;
                  background-color: #4472C4 !important;
                  text-align: center !important;
                  border: 1px solid #000000 !important;
                  padding: 4px 6px !important;
                  mso-style-parent: "" !important;
              }
              td, .tableCell {
                  font-family: Cambria, 'Cambria Math', Georgia, serif !important;
                  font-size: 11pt !important;
                  color: #000000 !important;
                  border: 1px solid #000000 !important;
                  padding: 4px 6px !important;
                  vertical-align: top;
                  word-wrap: break-word !important;
                  overflow-wrap: break-word !important;
                  word-break: break-word !important;
                  mso-style-parent: "" !important;
              }
          </style>
      </head>
      <body>
          <div class="WordSection1">`;
    const footer = "</div></body></html>";
    const fullHtml = header + htmlContent + footer;
    
    const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword;charset=utf-8' });
    triggerFileDownload(blob, `Plano_Recuperacao_2026_${recComponente.replace(/\s+/g, '_')}.doc`);
    showToast("Plano baixado em formato Word (.doc) com o padrão JSON!");
  };

  const handleDownloadRecoveryHtml = () => {
    if (!generatedRecoveryPlan) return;
    const htmlContent = buildRecoveryPlanHTML(schoolName, docenteName, generatedRecoveryPlan, {
      componente: recComponente,
      ano: recAno,
      bimestre: recBimestre,
      aprendizagemEssencial: recAprendizagemEssencial,
      descritores: recDescritores,
      aulas: recAulas,
      adaptacaoCurricularOptions: recAdaptacoes,
      sugestaoMateriais: recMateriais,
      retomadaAprendizagensAnteriores: recRetomadaAnterior
    });
    
    const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Plano de Recuperação Semestral</title>
  <style>
    body { font-family: Cambria, 'Cambria Math', Georgia, serif; max-width: 29.7cm; margin: 1cm auto; padding: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 12pt; border: 1px solid black; }
    th, td { border: 1px solid black; padding: 6px; text-align: left; word-wrap: break-word; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    triggerFileDownload(blob, `Plano_Recuperacao_2026_${recComponente.replace(/\s+/g, '_')}.html`);
    showToast("Plano baixado em formato HTML!");
  };

  const handlePrintRecoveryPdf = () => {
    if (!generatedRecoveryPlan) {
      showToast("Gere um plano primeiro.", true);
      return;
    }
    try {
      const printFrame = document.createElement('iframe');
      printFrame.style.visibility = 'hidden';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow ? printFrame.contentWindow.document : printFrame.contentDocument;
      if (!frameDoc) throw new Error("Could not access iframe document");
      
      const htmlContent = buildRecoveryPlanHTML(schoolName, docenteName, generatedRecoveryPlan, {
        componente: recComponente,
        ano: recAno,
        bimestre: recBimestre,
        aprendizagemEssencial: recAprendizagemEssencial,
        descritores: recDescritores,
        aulas: recAulas,
        adaptacaoCurricularOptions: recAdaptacoes,
        sugestaoMateriais: recMateriais,
        retomadaAprendizagensAnteriores: recRetomadaAnterior
      });

      frameDoc.open();
      frameDoc.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <title>Imprimir Plano de Recuperação</title>
              <style>
                  @page { size: A4 landscape; margin: 0; }
                  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                  html, body { font-family: Cambria, 'Cambria Math', Georgia, serif; color: black; line-height: 1.2; font-size: 11pt; margin: 0; padding: ${marginSettings.top}cm ${marginSettings.right}cm ${marginSettings.bottom}cm ${marginSettings.left}cm; background: white; }
                  p, td, li, span { font-size: 11pt !important; font-weight: normal !important; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.2; font-family: Cambria, 'Cambria Math', Georgia, serif !important; }
                  strong, b, th, h1, h2, h3, h4 { font-size: 12pt !important; font-weight: bold !important; font-family: Cambria, 'Cambria Math', Georgia, serif !important; }
                  table { table-layout: fixed !important; border-collapse: collapse !important; width: 100% !important; margin-bottom: 12pt !important; page-break-inside: avoid; border: 1px solid black !important; font-family: Cambria, 'Cambria Math', Georgia, serif !important; }
                  td, th { border: 1pt solid black !important; padding: 5pt !important; vertical-align: top !important; word-wrap: break-word !important; overflow-wrap: break-word !important; word-break: break-word !important; font-family: Cambria, 'Cambria Math', Georgia, serif !important; font-size: 11pt !important; }
                  .no-print { display: none !important; }
              </style>
          </head>
          <body>
              ${htmlContent}
          </body>
          </html>
      `);
      frameDoc.close();

      printFrame.contentWindow?.focus();
      setTimeout(() => {
          try {
              printFrame.contentWindow?.print();
          } catch (err) {
              window.print();
          }
          setTimeout(() => document.body.removeChild(printFrame), 1000);
      }, 500);
    } catch (e) {
      window.print();
    }
  };

  // Local Excel (.xlsx) Export Handler (Respects active filters)
  const handleExportLocalExcel = () => {
    setExportError(null);
    try {
      const dataToExport = filteredItemsForExport.length > 0 ? filteredItemsForExport : items;
      let headers: string[] = [];
      let rows: any[][] = [];

      if (filteredItemsForExport.length > 0 && isExportDiversificada) {
        const subject = currentExportSubject;
        if (subject === 'Projeto de Vida') {
          headers = ['Ano/Série', 'Bimestre', 'Aula', 'Dimensão', 'Atitude', 'Tema', 'Contexto', 'Habilidade', 'Prática', 'Questões Essenciais'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.aula,
            item.dimensao || '',
            item.atitude || '',
            item.tema || '',
            item.contexto || '',
            item.habilidade || '',
            item.pratica || '',
            item.questoes || ''
          ]);
        } else if (subject === 'Tecnologia e Inovação') {
          headers = ['Ano/Série', 'Bimestre', 'Semana', 'Aula Unidade', 'Aula Sala', 'Unidade', 'Título', 'Formato', 'Objetivo', 'Conteúdos', 'Habilidade Computação', 'Habilidade BNCC'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.semana || '',
            item.aulaUnidade || '',
            item.aulaSala || '',
            item.unidade || '',
            item.titulo || '',
            item.formato || '',
            item.objetivo || '',
            item.conteudos || '',
            (item.habComputacaoCodigo && item.habComputacaoCodigo !== 'n/a') ? `${item.habComputacaoCodigo} - ${item.habComputacaoTexto}` : '',
            (item.habBnccCodigo && item.habBnccCodigo !== 'n/a') ? `${item.habBnccCodigo} - ${item.habBnccTexto}` : ''
          ]);
        } else if (subject.startsWith('Orientação de Estudos')) {
          headers = ['Ano/Série', 'Bimestre', 'Semana', 'Aula', 'Título GPS', 'Gênero', 'Prática Linguagem', 'Eixo', 'Práticas Pedagógicas', 'Plataforma', 'Objetivos', 'Objetos Conhecimento', 'Indicações Literárias'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.semana || '',
            item.aula || '',
            item.tituloGps || '',
            item.genero || '',
            item.praticaLinguagem || '',
            item.eixo || '',
            item.praticasPedagogicas || '',
            item.plataforma || '',
            item.objetivos || '',
            item.objetosConhecimento || '',
            item.sugestoes ? item.sugestoes.join(" | ") : ""
          ]);
        } else if (subject === 'Redação e leitura' || subject === 'Redação e Leitura') {
          headers = ['Ano/Série', 'Bimestre', 'Aula', 'Título', 'Conteúdo', 'Objetivos', 'Habilidade', 'Aprendizagem'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.aula || '',
            item.titulo || '',
            item.conteudo || '',
            item.objetivos || '',
            item.habilidade || '',
            item.aprendizagem || ''
          ]);
        } else if (subject === 'Educação Financeira') {
          headers = ['Ano/Série', 'Bimestre', 'Aula', 'Unidade Temática', 'Objeto Conhecimento', 'Título', 'Conteúdo', 'Objetivos', 'Habilidade Código', 'Habilidade Texto'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.aula || '',
            item.unidadeTematica || '',
            item.objetoConhecimento || '',
            item.titulo || '',
            item.conteudo || '',
            item.objetivos || '',
            item.habilidadeCodigo || '',
            item.habilidadeTexto || ''
          ]);
        } else {
          headers = ['Ano/Série', 'Bimestre', 'Aula', 'Título', 'Conteúdo', 'Objetivos', 'Habilidade', 'Aprendizagem Essencial'];
          rows = dataToExport.map((item: any) => [
            item.ano,
            item.bimestre,
            item.aula || '',
            item.titulo || '',
            item.conteudo || '',
            item.objetivos || '',
            item.habilidade || '',
            item.aprendizagem || ''
          ]);
        }
      } else {
        headers = ['Ano/Série', 'Bimestre', 'Aula', 'Título', 'Conteúdo', 'Objetivos', 'Habilidade', 'Aprendizagem Essencial'];
        rows = dataToExport.map((item: any) => [
          item.ano,
          item.bimestre,
          item.aula || '',
          item.titulo || '',
          item.conteudo || '',
          item.objetivos || '',
          item.habilidade || '',
          item.aprendizagem || ''
        ]);
      }

      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

      const thinBorder = {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } }
      };

      // Header row styling according to JSON tableHeader spec
      headers.forEach((_, c) => {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c });
        if (ws[cellRef]) {
          ws[cellRef].s = {
            font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: 'FFFFFF' } },
            fill: { fgColor: { rgb: '4472C4' } },
            alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
            border: thinBorder
          };
        }
      });

      // Data rows styling according to JSON tableCell spec
      rows.forEach((row, r) => {
        row.forEach((_, c) => {
          const cellRef = XLSX.utils.encode_cell({ r: r + 1, c });
          if (ws[cellRef]) {
            ws[cellRef].s = {
              font: { name: 'Calibri', sz: 11, color: { rgb: '000000' } },
              alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
              border: thinBorder
            };
          }
        });
      });

      // Set column widths dynamically
      ws['!cols'] = headers.map(h => ({ wch: Math.max(16, h.length + 6) }));

      // Autofilters
      const lastCellRef = XLSX.utils.encode_cell({ r: rows.length, c: headers.length - 1 });
      ws['!autofilter'] = { ref: `A1:${lastCellRef}` };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Currículo Exportado');

      const prefix = filteredItemsForExport.length > 0 ? 'curriculo_filtrado' : 'curriculo_completo';
      const fileName = `${prefix}_${currentExportSubject.toLowerCase().replace(/[^a-z0-9]/g, '_')}.xlsx`;
      XLSX.writeFile(wb, fileName);
      showToast("Planilha Excel (.xlsx) baixada com formatação padronizada!");
    } catch (err: any) {
      console.error('Excel writing error:', err);
      setExportError('Erro ao gerar o arquivo Excel local.');
    }
  };

  const getSubjectStyles = (subject: string) => {
    const norm = subject ? subject.toLowerCase() : '';
    if (norm.includes('matemática') || norm.includes('estudos - m') || norm.includes('estudo - m')) {
      return {
        bg: 'bg-blue-50 border-blue-200 text-blue-800',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        text: 'text-blue-700 font-bold',
        iconColor: 'text-blue-600',
        border: 'border-blue-100 hover:border-blue-300',
        accentBg: 'bg-blue-600',
      };
    }
    if (norm.includes('projeto de vida')) {
      return {
        bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        text: 'text-emerald-700 font-bold',
        iconColor: 'text-emerald-600',
        border: 'border-emerald-100 hover:border-emerald-300',
        accentBg: 'bg-emerald-600',
      };
    }
    if (norm.includes('tecnologia')) {
      return {
        bg: 'bg-purple-50 border-purple-200 text-purple-800',
        badge: 'bg-purple-100 text-purple-800 border-purple-200',
        text: 'text-purple-700 font-bold',
        iconColor: 'text-purple-600',
        border: 'border-purple-100 hover:border-purple-300',
        accentBg: 'bg-purple-600',
      };
    }
    if (norm.includes('financeira')) {
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        text: 'text-amber-700 font-bold',
        iconColor: 'text-amber-600',
        border: 'border-amber-100 hover:border-amber-300',
        accentBg: 'bg-amber-600',
      };
    }
    if (norm.includes('redação') || norm.includes('portuguesa') || norm.includes('leitura') || norm.includes('redacao')) {
      return {
        bg: 'bg-rose-50 border-rose-200 text-rose-800',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        text: 'text-rose-700 font-bold',
        iconColor: 'text-rose-600',
        border: 'border-rose-100 hover:border-rose-300',
        accentBg: 'bg-rose-600',
      };
    }
    return {
      bg: 'bg-gray-50 border-gray-200 text-gray-800',
      badge: 'bg-gray-100 text-gray-800 border-gray-200',
      text: 'text-gray-700 font-bold',
      iconColor: 'text-gray-600',
      border: 'border-gray-100 hover:border-gray-200',
      accentBg: 'bg-gray-600',
    };
  };

  // Generates valid EMV BR Code Pix string
  const pixPayload = pixService.generatePayload({
    key: '272c5784-fca9-457d-b6de-7ebaaf3e888a',
    name: 'APOIO PROFESSOR',
    city: 'SAO PAULO'
  });

  const handleCopyPixCode = () => {
    try {
      navigator.clipboard.writeText(pixPayload);
      setCopiedPixCode(true);
      showToast('Código Pix Copia e Cola copiado! Abra o app do seu banco e cole.');
      setTimeout(() => setCopiedPixCode(false), 3000);
    } catch (e) {
      showToast('Pix Copia e Cola: ' + pixPayload);
    }
  };

  const handleCopyPixKey = () => {
    try {
      navigator.clipboard.writeText('272c5784-fca9-457d-b6de-7ebaaf3e888a');
      setCopiedPixKey(true);
      showToast('Chave Pix (UUID) copiada!');
      setTimeout(() => setCopiedPixKey(false), 3000);
    } catch (e) {
      showToast('Chave Pix: 272c5784-fca9-457d-b6de-7ebaaf3e888a');
    }
  };

  if (!hasEntered) {
    return (
      <div className="bg-[#F3F5F8] text-slate-800 font-sans min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900" translate="no" lang="pt-BR">
        {/* HEADER */}
        <header className="bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-2xs">
          <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight block">
                  Currículo Priorizado
                </span>
                <span className="text-[10px] text-blue-700 font-bold tracking-wider uppercase leading-none block">
                  SEDUC-SP • 2026
                </span>
              </div>
            </div>
            <nav className="space-x-5 text-sm text-slate-600 font-semibold flex items-center">
              <a href="#inicio" className="hover:text-blue-600 transition-colors">Início</a>
              <a href="#sobre" className="hover:text-blue-600 transition-colors">Sobre</a>
              <a href="#comentarios" className="hover:text-blue-600 transition-colors">Avaliações</a>
              
              {/* Highlighted Apoie button in Nav */}
              <a 
                href="#apoio" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-full text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
              >
                <span className="text-sm">💚</span>
                <span>Apoie o Projeto</span>
              </a>

              <button 
                onClick={() => {
                  setHasEntered(true);
                  try { localStorage.setItem('curr_priorizado_entered', 'true'); } catch (e) {}
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-xs cursor-pointer ml-2"
              >
                Acessar Plataforma
              </button>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section id="inicio" className="bg-gradient-to-b from-slate-100/80 via-slate-50 to-emerald-50/20 py-16 md:py-24 border-b border-slate-200/70 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
            {/* Soft highlight badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs bg-blue-100/80 text-blue-800 font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider border border-blue-200/60 shadow-2xs">
                Inovação Pedagógica 2026
              </span>
              <a 
                href="#apoio" 
                className="text-xs bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-800 font-extrabold px-3.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs transition flex items-center gap-1"
              >
                <span>💚 Projeto Aberto para Professores</span>
                <span className="underline ml-1 text-[11px]">Apoie via Pix</span>
              </a>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              Planejamento mais simples para o professor
            </h2>
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
              Organize conteúdos, priorize habilidades e tenha mais clareza no seu dia a dia em sala de aula de acordo com a Matriz Curricular Paulista de 2026.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => {
                  setHasEntered(true);
                  try { localStorage.setItem('curr_priorizado_entered', 'true'); } catch (e) {}
                }}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-md hover:shadow-lg w-full sm:w-auto cursor-pointer"
              >
                Acessar plataforma
              </button>
              <a 
                href="#sobre" 
                className="text-slate-700 hover:text-blue-600 font-semibold text-sm transition px-6 py-3 border border-slate-200 rounded-xl bg-slate-50/80 hover:bg-slate-100 w-full sm:w-auto shadow-2xs"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section className="py-16 md:py-20 bg-slate-100/60">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Benefícios Exclusivos</h3>
              <p className="text-slate-500 text-sm">Projetado com base nas necessidades reais da rotina docente paulista</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50/90 p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center mb-5 shadow-2xs">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3">Mais organização</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Estruture seus conteúdos e cronogramas bimestrais de forma totalmente digital, organizada e acessível de qualquer lugar.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-5 shadow-2xs">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3">Foco no essencial</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Priorize as habilidades estruturantes, conteúdos nucleares e avaliações diagnósticas essenciais para acelerar o aprendizado dos estudantes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 p-8 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center mb-5 shadow-2xs">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-3">Facilidade no dia a dia</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Gere planos de aula completos e relatórios de recuperação em poucos cliques. Gaste menos tempo planejando burocracias e mais tempo ensinando.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 py-16 md:py-20 border-y border-slate-200/70">
          <div className="max-w-5xl mx-auto px-6 space-y-10">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs bg-indigo-100/80 text-indigo-800 font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-indigo-200/60">
                Transparência & Uso Livre
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                Pensado para professores
              </h2>
              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-normal">
                Esta ferramenta foi desenvolvida para apoiar o planejamento pedagógico e a elaboração de planos de aula e recuperação de forma prática, ajudando professores a tomarem decisões com mais segurança.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white/80 backdrop-blur-xs border border-slate-200/90 p-6 rounded-2xl space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  🔒
                </div>
                <h4 className="font-bold text-sm text-slate-800">Sistema Aberto & Privacidade</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  O sistema é aberto e <strong>não armazena nenhum dado pessoal ou pedagógico dos usuários em servidores</strong>. Todas as informações e planejamentos permanecem estritamente no seu próprio navegador.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs border border-slate-200/90 p-6 rounded-2xl space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
                  🛠️
                </div>
                <h4 className="font-bold text-sm text-slate-800">Em Desenvolvimento Ativo</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trata-se de um <strong>sistema em contínuo desenvolvimento</strong>. Por estar em fase de aprimoramento constante, pequenas inconsistências ou erros podem eventualmente ocorrer.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xs border border-slate-200/90 p-6 rounded-2xl space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                  🤖
                </div>
                <h4 className="font-bold text-sm text-slate-800">Varredura de Escopo por IA</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A <strong>varredura do escopo e sequência das aulas foi realizada por Inteligência Artificial de forma automatizada</strong>. O docente pode revisar e adaptar livremente os conteúdos conforme a necessidade da turma.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* APOIO & PIX DONATION (PROMINENT HIGHLIGHTED SECTION) */}
        <section id="apoio" className="py-16 md:py-24 bg-gradient-to-b from-slate-100/80 via-emerald-50/40 to-slate-100/80 border-b border-slate-200/80 relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-emerald-500/30 relative overflow-hidden space-y-8">
              
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                <div className="space-y-5 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 font-extrabold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase border border-emerald-400/30">
                    <span>💚 Projeto Aberto para Professores</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Apoie a continuidade do projeto!
                  </h3>
                  <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed">
                    Esta ferramenta é <strong>100% gratuita e aberta para todos os professores</strong>. Se ela tem sido útil no seu planejamento e você quiser apoiar os custos do servidor e o trabalho do professor desenvolvedor, qualquer valor via Pix é profundamente apreciado.
                  </p>
                  
                  <div className="bg-emerald-900/50 border border-emerald-500/30 text-emerald-200 text-xs p-4 rounded-xl flex items-start gap-3 text-left">
                    <span className="text-xl shrink-0">💡</span>
                    <span>
                      <strong>Doação estritamente voluntária:</strong> O uso do sistema é e sempre será gratuito. Doe apenas se achar devido e quiser apoiar o projeto!
                    </span>
                  </div>
                </div>

                {/* QR Code and Copy Box */}
                <div className="bg-white/95 text-slate-900 p-6 rounded-2xl shadow-2xl space-y-4 shrink-0 w-full max-w-xs text-center border border-white/40">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-600">QR Code Pix</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Funcional</span>
                  </div>

                  {/* Scannable Pix BR Code QR Image */}
                  <div className="bg-white p-3 border-2 border-emerald-100 rounded-xl inline-block shadow-inner">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(pixPayload)}`} 
                      alt="QR Code Pix Funcional" 
                      className="w-44 h-44 mx-auto block object-contain"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium leading-tight">
                    Escaneie pelo aplicativo de qualquer banco (Nubank, Itaú, BB, Bradesco, Inter, Caixa, etc.)
                  </p>

                  <div className="space-y-2 pt-1">
                    {/* Primary Copia e Cola button */}
                    <button
                      onClick={handleCopyPixCode}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {copiedPixCode ? (
                        <>
                          <span className="text-sm">✓</span>
                          <span>Pix Copia e Cola Copiado!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          <span>Copiar Pix Copia e Cola</span>
                        </>
                      )}
                    </button>

                    {/* Secondary UUID Key button */}
                    <button
                      onClick={handleCopyPixKey}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-[11px] transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
                    >
                      {copiedPixKey ? (
                        <span>✓ Chave Copiada!</span>
                      ) : (
                        <span>Copiar apenas a chave (UUID)</span>
                      )}
                    </button>

                    <span className="text-[10px] text-slate-400 block font-mono select-all pt-1">
                      272c5784-fca9-457d-b6de-7ebaaf3e888a
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMENTÁRIOS E AVALIAÇÕES DOS PROFESSORES */}
        <LandingComments showToast={showToast} />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
          {/* Subtle geometric overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="grid_cta" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid_cta)" />
            </svg>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Comece agora mesmo
            </h2>
            <p className="text-indigo-200 text-base md:text-lg max-w-xl mx-auto">
              Acesse a plataforma hoje e facilite todo o seu planejamento curricular e plano de recuperação.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => {
                  setHasEntered(true);
                  try { localStorage.setItem('curr_priorizado_entered', 'true'); } catch (e) {}
                }}
                className="bg-white text-indigo-950 hover:bg-slate-100 px-8 py-4 rounded-xl font-black text-sm transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform cursor-pointer inline-flex items-center gap-2"
              >
                <span>Entrar no Sistema</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* AVISO LEGAL DE GRATUIDADE E DIREITOS AUTORAIS SEDUC-SP */}
        <section className="bg-amber-500/10 border-t border-b border-amber-500/20 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-extrabold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider border border-amber-300">
              <span>⚠️ Aviso Importante & Isenção de Vínculo</span>
            </div>
            <p className="text-slate-800 text-xs md:text-sm font-medium leading-relaxed max-w-3xl mx-auto">
              O Gerador de Currículo é uma ferramenta independente e gratuita de apoio pedagógico aos professores. O escopo-sequência baseia-se em dados curriculares públicos da SEDUC-SP. As contribuições são 100% voluntárias e destinadas exclusivamente à manutenção dos servidores e melhoria da plataforma. A página não possui qualquer vínculo com a Secretaria de Educação.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-200/80 border-t border-slate-300/80 py-8">
          <div className="max-w-6xl mx-auto px-6 text-xs text-slate-600 text-center space-y-2">
            <div>
              © 2026 Currículo Priorizado • Uso educacional para a Rede Estadual de São Paulo (SEDUC-SP).
            </div>
            <div className="text-slate-500">
              Desenvolvido por professores da rede estadual com tecnologias inovadoras. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <AppLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onReturnToLanding={() => {
        setHasEntered(false);
        try { localStorage.setItem('curr_priorizado_entered', 'false'); } catch (e) {}
      }}
      favoritesCount={
        (() => {
          try {
            const saved = localStorage.getItem('saved_curriculum_favorites');
            return saved ? JSON.parse(saved).length : 0;
          } catch {
            return 0;
          }
        })()
      } 
      onShowTour={() => setShowTour(true)}
    >
      <div className={`${
        appTypography === 'space' ? 'font-space' : appTypography === 'mono' ? 'font-mono' : appTypography === 'serif' ? 'font-serif' : 'font-sans'
      } ${borderStyle === 'sharp' ? 'style-sharp' : 'style-rounded'}`}>
        
        {activeTab === 'dashboard' && (
          <DashboardPage
            totalItems={items.length}
            totalSkills={new Set(items.flatMap((i) => i.habilidade.split(/[\s,]+/).filter(Boolean))).size}
            favoritesCount={
              (() => {
                try {
                  const saved = localStorage.getItem('saved_curriculum_favorites');
                  return saved ? JSON.parse(saved).length : 0;
                } catch {
                  return 0;
                }
              })()
            }
            updateCount={updateCount}
            lastUpdateFormatted={lastUpdateFormatted}
            onNavigate={(tab) => setActiveTab(tab)}
            onShowTour={() => setShowTour(true)}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage
            items={items}
            favorites={
              (() => {
                try {
                  const saved = localStorage.getItem('saved_curriculum_favorites');
                  return saved ? JSON.parse(saved) : [];
                } catch {
                  return [];
                }
              })()
            }
            onToggleFavorite={(cardItem) => {
              try {
                const saved = localStorage.getItem('saved_curriculum_favorites');
                const favs = saved ? JSON.parse(saved) : [];
                const idStr = String(cardItem.id);
                let nextFavs;
                if (favs.includes(idStr)) {
                  nextFavs = favs.filter((f: string) => f !== idStr);
                  showToast("Item removido dos favoritos!");
                } else {
                  nextFavs = [...favs, idStr];
                  showToast("Item adicionado aos favoritos!");
                }
                localStorage.setItem('saved_curriculum_favorites', JSON.stringify(nextFavs));
                setItems(prev => [...prev]);
              } catch (err) {
                console.error(err);
              }
            }}
            onViewDetails={(detailItem) => {
              showToast(`Carregando detalhes de ${detailItem.habilidade || 'item'}...`);
            }}
            onClearAll={() => {
              if (window.confirm("Deseja realmente limpar todos os favoritos salvos?")) {
                localStorage.setItem('saved_curriculum_favorites', JSON.stringify([]));
                setItems(prev => [...prev]);
                showToast("Todos os favoritos foram limpos!");
              }
            }}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage
            appTypography={appTypography}
            setAppTypography={setAppTypography}
            borderStyle={borderStyle}
            setBorderStyle={setBorderStyle}
            onResetData={handleResetData}
            updateCount={updateCount}
            lastUpdateFormatted={lastUpdateFormatted}
          />
        )}

        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            
            {/* Bento Column Left: Statistics, AI Actions and Export */}
            <div className="space-y-6 lg:col-span-1">
              
              {/* Bento Block 1: Statistics Card */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">
                  Resumo Curricular
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="text-gray-400 text-xs font-semibold">Total de Aulas</div>
                    <div className="text-3xl font-extrabold text-gray-800 mt-1">{items.length}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="text-gray-400 text-xs font-semibold">Habilidades Únicas</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                      {new Set(items.flatMap((i) => i.habilidade.split(/[\s,]+/).filter(Boolean))).size}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                    <span>Aulas por Série / Ano:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1ª Série', '2ª Série', '3ª Série'].map((ano) => (
                      <div key={ano} className="bg-gray-50 rounded p-2 border border-gray-100">
                        <div className="font-bold text-gray-800">
                          {items.filter((i) => i.ano === ano).length}
                        </div>
                        <div className="text-gray-400 text-[9px] font-medium leading-none mt-1">{ano}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Block 3: Export Actions */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">
                  Exportar e Formatar
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Gere e baixe a planilha formatada com <strong>filtros automáticos</strong> e <strong>cabeçalhos em negrito</strong>. Escolha o formato de saída:
                </p>

                <div className="space-y-3 pt-2">
                  {/* Local Excel Export */}
                  <button
                    onClick={handleExportLocalExcel}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-sm font-bold text-white rounded shadow-sm transition hover:scale-[1.01] cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    Baixar Planilha de Currículo (.xlsx)
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-100 mt-2 text-[11px] text-gray-400 text-center">
                  Os dados do seu currículo são armazenados localmente e exportados de forma segura e imediata em formato Excel.
                </div>

                {/* Status and messages */}
                <AnimatePresence>
                  {createdSheetUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-emerald-50 border border-emerald-100 p-4 rounded space-y-2.5 text-xs text-emerald-800"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-emerald-600" />
                        Planilha criada com sucesso!
                      </div>
                      <p className="text-emerald-700 leading-normal">
                        A planilha formatada foi gerada no seu Google Drive com filtros de busca e cabeçalhos em negrito.
                      </p>
                      <a
                        href={createdSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs"
                      >
                        Abrir no Google Planilhas ↗
                      </a>
                    </motion.div>
                  )}

                  {exportError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-red-50 border border-red-100 p-4 rounded flex gap-2 text-xs text-red-700 leading-relaxed"
                    >
                      <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-500" />
                      <span>{exportError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bento Block 4: Utilities */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Opções de Dados</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Deseja reiniciar a tabela?</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border border-gray-200 hover:border-red-100 transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Redefinir tudo
                </button>
              </div>

            </div>

            {/* Table Column Right: Full Interactive Table Grid */}
            <div className="lg:col-span-2">
              <CurriculumTable 
                items={items} 
                onDeleteItem={handleDeleteItem} 
                onFilteredItemsChange={handleFilteredItemsChange}
              />
            </div>

          </div>
        )}

        {activeTab === 'plan-generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Filter and Lesson List Sidebar: Col span 4 */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* CARD DE SELEÇÃO DO MODELO DE TEMPLATE (ABSOLUTE TOP) */}
              <div className="bg-white rounded border border-emerald-200 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-emerald-600" />
                    Modelo do Template
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase">
                    Estrutura
                  </span>
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Escolha o Modelo de Formatação</label>
                    <select
                      value={planFormat}
                      onChange={(e) => setPlanFormat(e.target.value as 'campinas-leste' | 'ava-efape' | 'campinas-leste-custom')}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white font-semibold text-gray-700"
                    >
                      <option value="campinas-leste">Modelo Oficial 1</option>
                      <option value="campinas-leste-custom">Modelo Oficial 1 (Sequência Customizável) ✨</option>
                      <option value="ava-efape">Modelo Efape</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 1. MATRIX CONFIG CARD: FONTE DE DADOS & SELEÇÃO (TOP) */}
              <div className="bg-white rounded border border-gray-200 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="h-4 w-4 text-emerald-600" />
                    Fonte de Dados & Seleção
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase">
                    1. Matriz
                  </span>
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nível de Ensino</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedSegment('ENSINO FUNDAMENTAL ANOS FINAIS');
                          setPlanGrade('6º Ano');
                          setSubjectCategory('FGB');
                          setPlanSubject('Língua Portuguesa');
                        }}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Anos Finais
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSegment('ENSINO MÉDIO');
                          setPlanGrade('1ª Série');
                          setSubjectCategory('FGB');
                          setPlanSubject('Língua Portuguesa');
                        }}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          selectedSegment === 'ENSINO MÉDIO'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Ensino Médio
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Origem dos Conteúdos</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDataSource('oficial')}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          dataSource === 'oficial'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Matriz Integrada
                      </button>
                      <button
                        onClick={() => setDataSource('upload')}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          dataSource === 'upload'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Nova Planilha (Escopo)
                      </button>
                    </div>
                  </div>

                  {dataSource === 'upload' && (
                    <div className="bg-emerald-50/50 p-3 rounded border border-emerald-100 space-y-2 text-xs">
                      <label className="block text-emerald-800 font-bold">Importar Planilha Personalizada</label>
                      <p className="text-[10px] text-emerald-700 leading-relaxed">
                        Arraste ou selecione qualquer arquivo <strong>.xlsx / .xls</strong> contendo as colunas de escopo (Ano, Bimestre, Aula, Conteúdo, Objetivos, Habilidade). As abas serão lidas como disciplinas!
                      </p>
                      <div className="relative border border-dashed border-emerald-300 rounded bg-white hover:bg-emerald-50 transition p-3 text-center cursor-pointer">
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          onChange={handleExcelUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-1">
                          <FileUp className="h-5 w-5 text-emerald-600" />
                          <span className="text-[11px] font-semibold text-emerald-800">
                            {uploadedFileName ? uploadedFileName : "Selecionar arquivo .xlsx"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Filter fields */}
                  <div className="space-y-3 pt-1">
                    {dataSource === 'oficial' && (
                      <div className="flex bg-gray-100 p-1 rounded gap-1 flex-wrap">
                        <button
                          onClick={() => {
                            setSubjectCategory('FGB');
                            setPlanSubject('Língua Portuguesa');
                          }}
                          className={`flex-1 min-w-[80px] text-xs py-1.5 rounded font-semibold transition ${subjectCategory === 'FGB' ? 'bg-white shadow-xs text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          FGB
                        </button>
                        <button
                          onClick={() => {
                            setSubjectCategory('DIVERSIFICADA');
                            setPlanSubject('Projeto de Vida');
                          }}
                          className={`flex-1 min-w-[80px] text-xs py-1.5 rounded font-semibold transition ${subjectCategory === 'DIVERSIFICADA' ? 'bg-white shadow-xs text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Diversificada
                        </button>
                        {selectedSegment === 'ENSINO MÉDIO' && (
                          <>
                            <button
                              onClick={() => {
                                setSubjectCategory('ITINERARIOS');
                                setPlanSubject('Aprofundamento em Biologia');
                              }}
                              className={`flex-1 min-w-[80px] text-xs py-1.5 rounded font-semibold transition ${subjectCategory === 'ITINERARIOS' ? 'bg-white shadow-xs text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                              Itinerários
                            </button>
                            <button
                              onClick={() => {
                                setSubjectCategory('TECNICO');
                                setPlanGrade('2ª Série');
                                setPlanSubject('Introdução à Administração, Legislação e Pessoas');
                              }}
                              className={`flex-1 min-w-[80px] text-xs py-1.5 rounded font-semibold transition ${subjectCategory === 'TECNICO' ? 'bg-white shadow-xs text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                              Ensino Técnico
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="block text-gray-600 font-semibold mb-1">Componente Curricular / Disciplina</label>
                      {dataSource === 'oficial' ? (
                        <select
                          value={planSubject}
                          onChange={(e) => setPlanSubject(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
                            ? (subjectCategory === 'FGB' ? FUNDAMENTAL_FGB_SUBJECTS : FUNDAMENTAL_DIVERSIFICADA_SUBJECTS).map(s => <option key={s.id} value={s.id}>{s.label}</option>)
                            : (subjectCategory === 'FGB' 
                                ? MEDIO_FGB_SUBJECTS 
                                : (subjectCategory === 'DIVERSIFICADA' 
                                    ? MEDIO_DIVERSIFICADA_SUBJECTS 
                                    : (subjectCategory === 'TECNICO' 
                                        ? MEDIO_TECNICO_SUBJECTS 
                                        : MEDIO_ITINERARIOS_SUBJECTS))).map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      ) : (
                        <select
                          value={planSubject}
                          onChange={(e) => setPlanSubject(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          {Object.keys(uploadedDb).length > 0 ? (
                            Object.keys(uploadedDb).map(sheet => <option key={sheet} value={sheet}>{sheet}</option>)
                          ) : (
                            <option value="">Carregue uma planilha primeiro</option>
                          )}
                        </select>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">Série / Ano</label>
                        {dataSource === 'oficial' ? (
                          <select
                            value={planGrade}
                            onChange={(e) => setPlanGrade(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? (
                              <>
                                <option value="6º Ano">6º Ano</option>
                                <option value="7º Ano">7º Ano</option>
                                <option value="8º Ano">8º Ano</option>
                                <option value="9º Ano">9º Ano</option>
                              </>
                            ) : (
                              <>
                                <option value="1ª Série">1ª Série</option>
                                <option value="2ª Série">2ª Série</option>
                                <option value="3ª Série">3ª Série</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <select
                            value={planGrade}
                            onChange={(e) => setPlanGrade(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {uploadedDb[planSubject] ? (
                              Array.from(new Set(uploadedDb[planSubject].slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean).map(g => (
                                <option key={g} value={g}>{g}</option>
                              ))
                            ) : (
                              <option value="">Sem dados</option>
                            )}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">Bimestre</label>
                        {dataSource === 'oficial' ? (
                          <select
                            value={planBimester}
                            onChange={(e) => setPlanBimester(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="1º Bimestre">1º Bimestre</option>
                            <option value="2º Bimestre">2º Bimestre</option>
                            <option value="3º Bimestre">3º Bimestre</option>
                            <option value="4º Bimestre">4º Bimestre</option>
                          </select>
                        ) : (
                          <select
                            value={planBimester}
                            onChange={(e) => setPlanBimester(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {uploadedDb[planSubject] ? (
                              Array.from(new Set(
                                uploadedDb[planSubject].slice(1)
                                  .filter(r => String(r[0] || '').trim() === planGrade)
                                  .map(r => String(r[1] || '').trim())
                              )).filter(Boolean).map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))
                            ) : (
                              <option value="">Sem dados</option>
                            )}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. SEÇÃO CUSTOMIZÁVEL & IDENTIFICAÇÃO DO PLANO (LOGO APÓS A FONTE DE DADOS) */}
              <div className="bg-white rounded border border-gray-200 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    Identificação do Plano
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded uppercase">
                    2. Identificação
                  </span>
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nome da Unidade Escolar</label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: E.E. Nome da Escola"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nome do(a) Docente</label>
                    <input
                      type="text"
                      value={docenteName}
                      onChange={(e) => setDocenteName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {planBimester === '4º Bimestre' && (
                    <div className="bg-amber-50/80 p-3 rounded border border-amber-200 space-y-1.5 animate-fadeIn">
                      <label className="block text-amber-900 font-bold text-xs flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-amber-600" />
                        Data / Período da Aplicação do SARESP (4º Bimestre)
                      </label>
                      <input
                        type="text"
                        value={sarespDate}
                        onChange={(e) => setSarespDate(e.target.value)}
                        placeholder="Ex: 25/11/2026 e 26/11/2026"
                        className="w-full px-2.5 py-1.5 border border-amber-300 rounded bg-white text-xs font-medium text-gray-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                      <p className="text-[10px] text-amber-700 leading-tight">
                        Esta data será automaticamente inserida na semana correspondente do plano do 4º bimestre.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* CUSTOM WEEKLY ALLOCATION ACCORDIONS (CAIXAS SUSPENSAS - QUANDO EM MODELO CUSTOMIZÁVEL) */}
              {planFormat === 'campinas-leste-custom' && (() => {
                const availableLessons = getAvailableLessons();
                const numContentWeeks = planBimester === '3º Bimestre' ? 6 : 7;

                return (
                  <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col space-y-3 p-4">
                    <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-emerald-600" />
                          Organização por Semanas (Caixas Suspensas)
                        </h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Abra a caixa de cada semana para escolher as aulas correspondentes e alocar datas para Atividades Diferenciadas / Projetos.
                        </p>
                      </div>
                    </div>

                    {/* Accordions list */}
                    <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                      {Array.from({ length: 10 }).map((_, weekIdx) => {
                        const isOpened = openCustomWeekIdx === weekIdx;
                        const alloc = weeklyCustomAllocations[weekIdx] || { lessonKeys: [], projectDates: '', projectDescription: '' };
                        const assignedCount = alloc.lessonKeys.length;
                        const hasProject = Boolean(alloc.projectDates || alloc.projectDescription);
                        const isContentWeek = weekIdx < numContentWeeks;

                        return (
                          <div
                            key={weekIdx}
                            className={`border rounded-lg transition-all ${
                              isOpened ? 'border-emerald-500 shadow-xs bg-emerald-50/10' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            {/* Accordion Header (Caixa Suspensa) */}
                            <div
                              onClick={() => setOpenCustomWeekIdx(isOpened ? null : weekIdx)}
                              className="p-3 flex items-center justify-between cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded ${
                                  isContentWeek ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  Semana {weekIdx + 1}
                                </span>
                                <span className="text-xs font-bold text-gray-700">
                                  {getWeekPeriod(planBimester, weekIdx)}
                                </span>
                                {assignedCount > 0 && (
                                  <span className="text-[10px] font-semibold px-2 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
                                    {assignedCount} aula(s)
                                  </span>
                                )}
                                {hasProject && (
                                  <span className="text-[10px] font-bold px-2 py-0.2 bg-amber-100 text-amber-800 rounded-full">
                                    🎨 Projeto/Atividade
                                  </span>
                                )}
                                {!isContentWeek && weekIdx === 7 && (
                                  <span className="text-[10px] font-bold px-2 py-0.2 bg-purple-100 text-purple-800 rounded-full">
                                    📝 {planBimester === '4º Bimestre' ? 'SARESP' : 'Prova Paulista'}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1 text-gray-400">
                                {isOpened ? <ChevronUp className="h-4 w-4 text-emerald-600" /> : <ChevronDown className="h-4 w-4" />}
                              </div>
                            </div>

                            {/* Accordion Body */}
                            {isOpened && (
                              <div className="p-3 border-t border-gray-100 space-y-3 bg-white rounded-b-lg animate-fadeIn text-xs">
                                {/* Atividades Diferenciadas / Execução de Projetos */}
                                <div className="bg-amber-50/70 p-3 rounded border border-amber-200/80 space-y-2">
                                  <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-amber-600" />
                                    Atividade Diferenciada / Execução de Projetos
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] text-amber-800 font-semibold mb-0.5">Datas / Período do Projeto</label>
                                      <input
                                        type="text"
                                        value={alloc.projectDates || ''}
                                        onChange={(e) => updateCustomWeekProject(weekIdx, 'projectDates', e.target.value)}
                                        placeholder="Ex: 15/09 a 18/09"
                                        className="w-full px-2 py-1 border border-amber-300 rounded bg-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] text-amber-800 font-semibold mb-0.5">Descrição do Projeto / Atividade</label>
                                      <input
                                        type="text"
                                        value={alloc.projectDescription || ''}
                                        onChange={(e) => updateCustomWeekProject(weekIdx, 'projectDescription', e.target.value)}
                                        placeholder="Ex: Oficina Prática de Robótica / Mão na Massa"
                                        className="w-full px-2 py-1 border border-amber-300 rounded bg-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Lesson selection checkboxes for this week */}
                                <div className="space-y-1.5">
                                  <label className="block text-gray-700 font-bold text-[11px]">
                                    Selecione as Aulas para a Semana {weekIdx + 1}:
                                  </label>

                                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded p-2 space-y-1 bg-gray-50/50">
                                    {availableLessons.length > 0 ? (
                                      availableLessons.map((lesson) => {
                                        const key = dataSource === 'oficial' ? `oficial|${lesson.id}` : `upload|${planSubject}|${lesson.rowIdx}`;
                                        const isChecked = alloc.lessonKeys.includes(key);

                                        return (
                                          <label
                                            key={key}
                                            className={`flex items-start gap-2 p-1.5 rounded text-xs cursor-pointer transition select-none ${
                                              isChecked ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium' : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              onChange={() => toggleLessonInCustomWeek(weekIdx, key)}
                                              className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                            />
                                            <div className="min-w-0 flex-1">
                                              <span className="font-bold text-emerald-800 mr-1">
                                                {lesson.aula}:
                                              </span>
                                              <span className="text-gray-800">{lesson.titulo}</span>
                                            </div>
                                          </label>
                                        );
                                      })
                                    ) : (
                                      <div className="text-center py-4 text-gray-400 text-xs">
                                        Nenhuma aula disponível para os filtros selecionados.
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* 3. LESSONS CONTAINER: AULAS DISPONÍVEIS DA MATRIZ INTEGRADA */}
              {(() => {
                const isConstruction = dataSource === 'oficial' && (
                  (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' && !(subjectCategory === 'FGB' ? FUNDAMENTAL_FGB_SUBJECTS : FUNDAMENTAL_DIVERSIFICADA_SUBJECTS).find(s => s.id === planSubject)?.ready) ||
                  (selectedSegment === 'ENSINO MÉDIO' && !(subjectCategory === 'FGB' 
                      ? MEDIO_FGB_SUBJECTS 
                      : (subjectCategory === 'DIVERSIFICADA' 
                          ? MEDIO_DIVERSIFICADA_SUBJECTS 
                          : (subjectCategory === 'TECNICO' 
                              ? MEDIO_TECNICO_SUBJECTS 
                              : MEDIO_ITINERARIOS_SUBJECTS))).find(s => s.id === planSubject)?.ready)
                );

                if (isConstruction) {
                  return (
                    <div className="bg-amber-50 rounded border border-amber-200 p-5 shadow-xs text-center space-y-3">
                      <Info className="h-8 w-8 text-amber-500 mx-auto" />
                      <h4 className="font-bold text-amber-900 text-sm">Página em Construção 🚧</h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        A matriz oficial de <strong>{planSubject}</strong> para o {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? 'Ensino Fundamental' : 'Ensino Médio'} está sendo integrada e será disponibilizada em breve!
                      </p>
                      <p className="text-[11px] text-amber-700 leading-relaxed bg-amber-100/50 p-2.5 rounded border border-amber-200/50">
                        <strong>Dica:</strong> Você pode usar a aba <strong>"Nova Planilha (Escopo)"</strong> acima para importar o escopo e planejar as aulas de Ciências, História, Geografia, Biologia, etc., agora mesmo!
                      </p>
                    </div>
                  );
                }

                const lessons = getAvailableLessons();

                return (
                  <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col h-[400px]">
                    <div className="bg-gray-50 border-b border-gray-200 p-4 shrink-0 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Aulas Disponíveis</h4>
                        <span className="text-[10px] text-gray-400 font-semibold">{lessons.length} aulas encontradas</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => selectAllPlanLessons(lessons)}
                          className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded cursor-pointer"
                        >
                          Sel. Todas
                        </button>
                        <button
                          onClick={() => deselectAllPlanLessons(lessons)}
                          className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded cursor-pointer"
                        >
                          Limpar
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto divide-y divide-gray-100 flex-1">
                      {lessons.length > 0 ? (
                        lessons.map((lesson) => {
                          const key = dataSource === 'oficial' ? `oficial|${lesson.id}` : `upload|${planSubject}|${lesson.rowIdx}`;
                          const isChecked = selectedPlanLessons.has(key);
                          return (
                            <div
                              key={key}
                              onClick={() => togglePlanLesson(key)}
                              className={`p-3 text-xs text-left cursor-pointer transition flex gap-2 items-start ${
                                isChecked ? 'bg-emerald-50/40 hover:bg-emerald-50' : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // click handled on parent div
                                className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <div className="space-y-0.5">
                                <div className="font-bold text-gray-700 flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-sm text-[10px]">
                                    {lesson.aula}
                                  </span>
                                  <span className="line-clamp-1">{lesson.titulo}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 line-clamp-1 leading-normal">
                                  <strong>Conteúdo:</strong> {lesson.conteudo}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center text-gray-400 text-xs flex flex-col items-center justify-center h-full gap-2">
                          <Inbox className="h-6 w-6 text-gray-300" />
                          <span>Nenhuma aula disponível para os filtros selecionados.</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 p-4 shrink-0 space-y-2">
                      <button
                        onClick={handleGeneratePlan}
                        disabled={isGeneratingPlan || lessons.length === 0 || Array.from(selectedPlanLessons).filter((k: string) => k.startsWith(dataSource === 'oficial' ? 'oficial|' : 'upload|')).length === 0}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-sm disabled:opacity-50 transition cursor-pointer"
                      >
                        {isGeneratingPlan ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin animate-infinite" />
                            <span>Elaborando Plano de Ensino...</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4" />
                            <span>Gerar Plano de Ensino Pronto</span>
                          </>
                        )}
                      </button>
                      <div className="text-[10px] text-gray-400 text-center font-medium leading-relaxed">
                        {Array.from(selectedPlanLessons).filter((k: string) => k.startsWith(dataSource === 'oficial' ? 'oficial|' : 'upload|')).length} aula(s) selecionada(s) para o plano de 10 semanas.
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>

            {/* Live Preview & Actions Panel: Col span 8 */}
            <div className="lg:col-span-8 flex flex-col min-h-[600px]">
              {isGeneratingPlan ? (
                <div className="bg-white rounded border border-gray-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm">Elaborando Cronograma Integrado...</h4>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                      O organizador automático está compilando e distribuindo os objetivos, conteúdos e habilidades do material oficial para preencher as estratégias metodológicas, avaliações, Ações da Taxonomia de Bloom e as Aprendizagens Essenciais (AE) de cada semana.
                    </p>
                  </div>
                </div>
              ) : generatedDocHtml ? (
                <div className="space-y-4 flex flex-col flex-1">
                  {/* Action Bar */}
                  <div className="bg-white rounded border border-gray-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Monitor className="h-4 w-4 text-emerald-600" />
                        <span>Documento de Impressão Oficial (A4)</span>
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setShowMarginModal(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-300"
                        title="Configurar Margens A4 (cm)"
                      >
                        <Sliders className="h-3.5 w-3.5 text-slate-600" />
                        Margens A4 ({marginSettings.top} × {marginSettings.left} cm)
                      </button>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copiar Texto
                      </button>
                      <button
                        onClick={handleDownloadDoc}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Baixar Word (.doc)
                      </button>
                      <button
                        onClick={handleDownloadHtml}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Baixar HTML
                      </button>
                      <button
                        onClick={handlePrintPdf}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Imprimir / PDF
                      </button>
                    </div>
                  </div>

                  {/* Rendering Stage: Direct Official A4 Document View */}
                  <div className="bg-gray-100/60 rounded border border-gray-200 p-6 overflow-y-auto flex-1 flex justify-center max-h-[800px] shadow-inner">
                    <div 
                      className="bg-white border shadow-md w-full max-w-[29.7cm] box-border overflow-x-auto min-h-[21cm] text-left"
                      style={{
                        paddingTop: `${marginSettings.top}cm`,
                        paddingBottom: `${marginSettings.bottom}cm`,
                        paddingLeft: `${marginSettings.left}cm`,
                        paddingRight: `${marginSettings.right}cm`,
                        fontFamily: "Cambria, 'Cambria Math', Georgia, serif"
                      }}
                    >
                      <style>{`
                        ${planFormat === 'ava-efape' ? `
                          #output-document { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; line-height: 1.35; }
                          #output-document p, #output-document td, #output-document li, #output-document span { font-size: 11pt !important; font-weight: normal; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.35; }
                          #output-document strong, #output-document b, #output-document th, #output-document h1, #output-document h2, #output-document h3 { font-size: 12pt !important; font-weight: bold; }
                          #output-document ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                          #output-document li { margin-bottom: 3pt; text-align: justify; line-height: 1.35; }
                          #output-document table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.35; }
                          #output-document td { padding: 6pt; vertical-align: top; word-wrap: break-word; text-align: justify; font-family: Cambria, 'Cambria Math', Georgia, serif; }
                          #output-document .weekly-plan-page { border: none !important; box-shadow: none !important; margin-bottom: 0 !important; padding: 0 !important; background: transparent !important; }
                        ` : `
                          #output-document { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; color: black; }
                          #output-document p, #output-document td, #output-document li, #output-document span { font-size: 11pt !important; font-weight: normal; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.2; }
                          #output-document strong, #output-document b, #output-document th, #output-document h1, #output-document h2, #output-document h3 { font-size: 12pt !important; font-weight: bold; }
                          #output-document ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                          #output-document li { margin-bottom: 3pt; text-align: justify; line-height: 1.2; }
                          #output-document table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; }
                          #output-document td { border: 1pt solid black; padding: 5pt; word-wrap: break-word; text-align: justify; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; }
                        `}
                      `}</style>
                      <div 
                        id="output-document" 
                        dangerouslySetInnerHTML={{ __html: generatedDocHtml }} 
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          const trigger = target.closest('.gemini-prompt-trigger');
                          if (trigger) {
                            e.preventDefault();
                            const weekIdxAttr = trigger.getAttribute('data-week-idx');
                            if (weekIdxAttr !== null) {
                              const weekIdx = parseInt(weekIdxAttr);
                              const week = generatedWeeks[weekIdx];
                              if (week) {
                                const verificadora = week.lessons?.find((l: any) => l.num === 999);
                                handleOpenGeminiPrompt(verificadora || { previousLessons: week.lessons || [] });
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded border border-gray-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm">Cronograma Integrado de 10 Semanas</h4>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                      Selecione as aulas na lista lateral esquerda e clique em <strong>Gerar Plano de Ensino Pronto</strong>. O sistema compilará automaticamente de forma local e offline as avaliações, metodologias ativas, ações Bloom e o cronograma integrado de 2026.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded border border-gray-100 max-w-lg text-left text-[11px] text-gray-500 space-y-2 mt-2 leading-relaxed">
                    <h5 className="font-bold text-gray-700 uppercase tracking-wide text-xs mb-1">Previsão e Calendário Escolar (2026):</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>1º Bimestre:</strong> 02/02 a 10/04 (10 semanas; Carnaval em 17/02; Sexta-feira Santa em 03/04).</li>
                      <li><strong>2º Bimestre:</strong> 22/04 a 03/07 (10 semanas; Dia do Trabalho em 01/05; Corpus Christi em 04/06).</li>
                      <li><strong>3º Bimestre:</strong> 24/07 a 02/10 (10 semanas; Independência do Brasil em 07/09).</li>
                      <li><strong>4º Bimestre:</strong> 05/10 a 18/12 (10 semanas; N. Sra. Aparecida em 12/10; Finados em 02/11; Consciência Negra em 20/11).</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Recovery Plan Generator Section */}
        {activeTab === 'recovery-plan' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header / Banner */}
            <div className="bg-[#152e72] rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-amber-500">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 backdrop-blur-md text-amber-200 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-amber-400/25">
                    Resolução SEDUC 42/2024
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-slate-100 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-white/15">
                    Ensino Regular & Itinerários
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight font-sans text-white">
                  Gerador de Planos de Recuperação Semestral
                </h2>
                <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
                  Crie planos de recomposição de aprendizagem contínuas e semestrais em estrito alinhamento ao Currículo Paulista 2026, com foco na Prova Paulista, plataformas oficiais de aprendizagem (Matific, Start by Alura) e cronograma letivo estadual.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 self-start md:self-auto shrink-0 backdrop-blur-sm">
                <Award className="h-10 w-10 text-amber-300 animate-pulse" />
                <div className="text-xs">
                  <div className="font-bold text-amber-200">1º Semestre Letivo</div>
                  <div className="text-white/70">Ano Letivo de 2026</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Information Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
                  <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                    <Info className="h-4 w-4 text-amber-600" />
                    Orientações Administrativas Letivas
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    A recuperação semestral deve abranger o agrupamento produtivo dos estudantes com notas insatisfatórias (&lt; 5,0) por meio de <strong>metodologias ativas diferenciadas</strong>, tutoria pedagógica e engajamento contínuo registrado na Secretaria Escolar Digital (SED) e no sistema 'Professor Presente'.
                  </p>
                </div>



                {/* Form Controls */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
                  <h3 className="font-bold text-gray-800 text-sm border-b pb-2">
                    Configuração de Parâmetros
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Unidade Escolar</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="Ex: E.E. Dr. Alarico Silveira"
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Docente Responsável</label>
                      <input
                        type="text"
                        value={docenteName}
                        onChange={(e) => setDocenteName(e.target.value)}
                        placeholder="Ex: Profª Ana Carolina Silva"
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Componente Curricular</label>
                      <select
                        value={recComponente}
                        onChange={(e) => setRecComponente(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
                      >
                        {Object.keys(OFFICIAL_RECOVERY_DATA_2026).map(comp => (
                          <option key={comp} value={comp}>{comp}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Série / Ano</label>
                      <select
                        value={recAno}
                        onChange={(e) => setRecAno(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
                      >
                        {OFFICIAL_RECOVERY_DATA_2026[recComponente] ? (
                          Object.keys(OFFICIAL_RECOVERY_DATA_2026[recComponente]).map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))
                        ) : (
                          <>
                            <option value="6º Ano">6º Ano (EF)</option>
                            <option value="7º Ano">7º Ano (EF)</option>
                            <option value="8º Ano">8º Ano (EF)</option>
                            <option value="9º Ano">9º Ano (EF)</option>
                            <option value="1ª Série">1ª Série (EM)</option>
                            <option value="2ª Série">2ª Série (EM)</option>
                            <option value="3ª Série">3ª Série (EM)</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Período Alvo</label>
                      <input
                        type="text"
                        readOnly
                        value="1º Semestre (1º e 2º Bimestres)"
                        className="w-full text-xs px-3 py-2 rounded border border-gray-200 bg-gray-50 text-gray-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 col-span-2">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Aulas Homologadas</label>
                      <select
                        value={recAulas}
                        onChange={(e) => setRecAulas(Number(e.target.value))}
                        className="w-full text-xs px-2.5 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
                      >
                        <option value={4}>4 Aulas</option>
                        <option value={6}>6 Aulas</option>
                        <option value={8}>8 Aulas</option>
                        <option value={10}>10 Aulas</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Aprendizagem Essencial em Foco</label>
                      <textarea
                        rows={3}
                        value={recAprendizagemEssencial}
                        onChange={(e) => setRecAprendizagemEssencial(e.target.value)}
                        placeholder="Ex: EF07TE02 - Identificar o funcionamento de arquivos compactados e descrever vantagens..."
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Descritor de Habilidade em Defasagem</label>
                      <textarea
                        rows={2}
                        value={recDescritores}
                        onChange={(e) => setRecDescritores(e.target.value)}
                        placeholder="Ex: Arquivos digitais compactados, formatos .zip e compressão de dados..."
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    {/* Adaptação Curricular */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <label className="text-xs font-bold text-gray-700 block uppercase">Estratégias de Adaptação Curricular</label>
                      <div className="space-y-2 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                        {[
                          "Responder dúvidas recorrentes, retomando explicações",
                          "Oferecer exemplos adicionais ou utilizar outra estratégia de explicação para o mesmo conceito",
                          "Propor atividades de apoio para estudantes que ainda não consolidaram a aprendizagem",
                          "Disponibilizar desafios para estudantes que já dominaram o conteúdo"
                        ].map((opt) => {
                          const checked = recAdaptacoes.includes(opt);
                          return (
                            <label key={opt} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setRecAdaptacoes([...recAdaptacoes, opt]);
                                  } else {
                                    setRecAdaptacoes(recAdaptacoes.filter(o => o !== opt));
                                  }
                                }}
                                className="mt-0.5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                              />
                              <span className="leading-snug">{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sugestão de Materiais */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Sugestão de Materiais para Adaptação</label>
                      <textarea
                        rows={2}
                        value={recMateriais}
                        onChange={(e) => setRecMateriais(e.target.value)}
                        placeholder="Ex: Jogos pedagógicos, fichas impressas com apoio visual, esquemas gráficos..."
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    {/* Previsão de Retomada de Aprendizagens Anteriores */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 block uppercase">Previsão de Retomada de Aprendizagens Anteriores</label>
                      <textarea
                        rows={2}
                        value={recRetomadaAnterior}
                        onChange={(e) => setRecRetomadaAnterior(e.target.value)}
                        placeholder="Ex: Revisão prática dos conceitos fundamentais dos bimestres anteriores do 1º Semestre..."
                        className="w-full text-xs px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateRecoveryPlanAction}
                    disabled={isGeneratingRecoveryPlan}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs tracking-wider uppercase transition shadow disabled:opacity-55 cursor-pointer"
                  >
                    {isGeneratingRecoveryPlan ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Estruturando Recuperação...
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4" />
                        Gerar Plano de Recuperação Oficial
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Preview Column */}
              <div className="lg:col-span-7 flex flex-col h-full min-h-[600px]">
                {isGeneratingRecoveryPlan ? (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex-1 flex flex-col items-center justify-center text-center gap-6 animate-pulse">
                    <Loader2 className="h-10 w-10 text-amber-600 animate-spin" />
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-800 text-base">Processando Restrições Sintáticas Letivas</h4>
                      <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                        Mapeando os níveis cognitivos da Bloom, estruturando scaffolding para o Currículo Paulista 2026 e construindo frentes para grupos da Prova Paulista.
                      </p>
                    </div>
                  </div>
                ) : generatedRecoveryPlan ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* Exporters and Toolbar */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                        <Check className="h-4 w-4 text-emerald-600" />
                        Plano Compilado Letivo (Pronto)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShowMarginModal(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-300"
                          title="Configurar Margens A4 (cm)"
                        >
                          <Sliders className="h-3.5 w-3.5 text-slate-600" />
                          Margens A4 ({marginSettings.top} × {marginSettings.left} cm)
                        </button>
                        <button
                          onClick={handleCopyRecovery}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copiar Texto
                        </button>
                        <button
                          onClick={handleDownloadRecoveryDoc}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          Baixar Word (.doc)
                        </button>
                        <button
                          onClick={handleDownloadRecoveryHtml}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Exportar HTML
                        </button>
                        <button
                          onClick={handlePrintRecoveryPdf}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition cursor-pointer"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          Imprimir / PDF
                        </button>
                      </div>
                    </div>

                    {/* Standard A4 Styled Box */}
                    <div className="flex-1 bg-gray-100 rounded-xl border border-gray-300 p-6 md:p-10 shadow-inner overflow-y-auto max-h-[800px] flex justify-center">
                      <div 
                        className="bg-white w-full max-w-[29.7cm] border border-gray-300 shadow-lg relative min-h-[21cm] text-black"
                        style={{
                          paddingTop: `${marginSettings.top}cm`,
                          paddingBottom: `${marginSettings.bottom}cm`,
                          paddingLeft: `${marginSettings.left}cm`,
                          paddingRight: `${marginSettings.right}cm`,
                          fontFamily: "Cambria, 'Cambria Math', Georgia, serif"
                        }}
                      >
                        {/* Custom print styling scope */}
                        <style>{`
                          #recovery-document { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; }
                          #recovery-document p, #recovery-document td, #recovery-document li, #recovery-document span { font-size: 11pt !important; font-weight: normal; }
                          #recovery-document strong, #recovery-document b, #recovery-document th, #recovery-document h1, #recovery-document h2 { font-size: 12pt !important; font-weight: bold; }
                          #recovery-document table { border-collapse: collapse; width: 100%; margin-top: 10px; margin-bottom: 15px; border: 1px solid black; }
                          #recovery-document th, #recovery-document td { border: 1px solid black; padding: 6px; vertical-align: top; text-align: left; }
                        `}</style>
                        <div 
                          id="recovery-document" 
                          dangerouslySetInnerHTML={{ 
                            __html: buildRecoveryPlanHTML(schoolName, docenteName, generatedRecoveryPlan, {
                              componente: recComponente,
                              ano: recAno,
                              bimestre: recBimestre,
                              aprendizagemEssencial: recAprendizagemEssencial,
                              descritores: recDescritores,
                              aulas: recAulas,
                              adaptacaoCurricularOptions: recAdaptacoes,
                              sugestaoMateriais: recMateriais,
                              retomadaAprendizagensAnteriores: recRetomadaAnterior
                            }) 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                      <Award className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-800 text-sm">Plano de Recuperação Semestral</h4>
                      <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                        Selecione um dos modelos de precisão à esquerda ou preencha os parâmetros e clique em <strong>Gerar Plano de Recuperação Oficial</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'repositories' && (
          <QuestionRepositories />
        )}

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
            <p className="order-2 md:order-1 text-center md:text-left">
              &copy; 2026 Currículo Integrado &bull; Todos os direitos reservados.
            </p>
            <p className="order-1 md:order-2 text-center md:text-right font-medium tracking-wide">
              Desenvolvido por <span className="text-gray-700 font-semibold">professores da rede estadual</span> em 2026, com o auxílio do <span className="text-emerald-600 font-semibold">Gemini</span> via <span className="italic font-semibold text-gray-700">vibe coding</span>.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-semibold border ${
              toastIsError
                ? 'bg-red-50 border-red-100 text-red-800'
                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
            }`}
          >
            {toastIsError ? <AlertCircle className="h-4 w-4 text-red-600" /> : <Check className="h-4 w-4 text-emerald-600" />}
            <span>{toastMessage}</span>
          </motion.div>
        )}

        {/* Gemini Prompt Copy Alert Overlay */}
        {showGeminiAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-emerald-200 shadow-2xl relative"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-emerald-500/20 opacity-40">
                  <Sparkles className="h-40 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">📋 Prompt Copiado com Sucesso!</h3>
                    <p className="text-xs text-emerald-100 font-medium">As instruções já estão na sua Área de Trabalho (Clipboard)</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 text-xs text-emerald-950 font-semibold flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    A Inteligência Artificial do Gemini usará essas instruções estruturadas para gerar avaliações, atividades e autoavaliações de alta precisão baseadas no seu plano de 2026.
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-400">
                    Como usar agora (Passo a Passo)
                  </h4>

                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">1</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Clique no botão verde abaixo</p>
                        <p className="text-2xs text-gray-400">Você será redirecionado em segurança para o site oficial do Gemini.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">2</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Cole as instruções (Ctrl + V)</p>
                        <p className="text-2xs text-gray-400">Clique com o botão direito e escolha "Colar", ou segure na tela do celular e toque em "Colar".</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-emerald-700 shrink-0">3</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">Envie a mensagem no chat</p>
                        <p className="text-2xs text-gray-400">O Gemini gerará sua atividade verificadora e o gabarito formatado em segundos!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-2.5">
                <button
                  onClick={() => setShowGeminiAlert(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    setShowGeminiAlert(false);
                    window.open("https://gemini.google.com/app", "_blank", "noopener,noreferrer");
                  }}
                  className="px-5 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ir para o Gemini Agora</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Configuração Manual de Margens A4 (cm) */}
      <AnimatePresence>
        {showMarginModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Sliders className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Configurar Margens da Folha A4</h3>
                    <p className="text-2xs text-gray-400">Padrão em centímetros (cm) para impressão e exportação</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMarginModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Ajuste manualmente as 4 margens da página A4. Estas configurações serão mantidas e aplicadas na visualização em tela, na cópia travada para o Google Docs, nas exportações em Word (.doc), HTML e PDF.
              </p>

              {/* Margins Inputs Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <label className="block text-2xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Superior (cm)
                  </label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.5" 
                    max="5"
                    value={marginSettings.top}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, top: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Inferior (cm)
                  </label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.5" 
                    max="5"
                    value={marginSettings.bottom}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, bottom: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Esquerda (cm)
                  </label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.5" 
                    max="5"
                    value={marginSettings.left}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, left: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">
                    Direita (cm)
                  </label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0.5" 
                    max="5"
                    value={marginSettings.right}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, right: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Modelos Pré-definidos:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setMarginSettings({ top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 })}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold transition cursor-pointer border ${
                      marginSettings.top === 1.27 && marginSettings.left === 1.27
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Econômica (1.27 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarginSettings({ top: 2.0, bottom: 2.0, left: 2.0, right: 2.0 })}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold transition cursor-pointer border ${
                      marginSettings.top === 2.0 && marginSettings.left === 2.0
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Padrão (2.0 cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarginSettings({ top: 2.5, bottom: 2.5, left: 3.0, right: 3.0 })}
                    className={`px-3 py-1.5 text-xs rounded-lg font-bold transition cursor-pointer border ${
                      marginSettings.top === 2.5 && marginSettings.left === 3.0
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    Norma ABNT (2.5 / 3.0 cm)
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setShowMarginModal(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-extrabold transition shadow-md cursor-pointer"
                >
                  Confirmar e Aplicar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Detalhes e Status das Atualizações */}
      <AnimatePresence>
        {showUpdateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Status de Atualizações</h3>
                    <p className="text-2xs text-gray-400">Contador de compilações do aplicativo</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Atualização Atual:</span>
                  <span className="text-base font-extrabold text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-emerald-200 shadow-2xs">
                    #{updateCount}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-xs">
                  <span className="text-emerald-700 font-medium">Última Compilação:</span>
                  <span className="font-bold text-emerald-900">{lastUpdateFormatted}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Este contador registra automaticamente cada nova melhoria, correção ou ajuste efetuado no código-fonte da aplicação.
              </p>

              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    const nextVal = updateCount + 1;
                    const now = new Date();
                    const formattedNow = new Intl.DateTimeFormat('pt-BR', {
                      timeZone: 'America/Sao_Paulo',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(now).replace(',', ' às');

                    localStorage.setItem('app_prompt_update_count', nextVal.toString());
                    localStorage.setItem('app_last_update_formatted', formattedNow);
                    setUpdateCount(nextVal);
                    setLastUpdateFormatted(formattedNow);
                  }}
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                  Simular Nova Atualização (+1)
                </button>

                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="w-full py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-xs font-extrabold transition shadow-md cursor-pointer mt-1"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guided Tour Component */}
      <GuidedTour 
        isOpen={showTour} 
        onClose={() => setShowTour(false)} 
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
        }} 
      />

      </div>
    </AppLayout>
  );
}
