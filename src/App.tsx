import React, { useState, useEffect, useCallback } from 'react';
import { initialCurriculumData } from './data/curriculumData';
import { itinerariosEMData } from './data/itinerariosEMData';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from './data/tecnicoData';
const fourthBimesterData = initialCurriculumData.filter(i => i.bimestre === '4º Bimestre');
import { curriculumRepository } from './features/curriculum/curriculumRepository';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA
} from './data/diversificadaData';
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
import * as XLSX from 'xlsx';
import { PRESET_RECOVERY_TEMPLATES, generateCustomRecoveryPlan, RecoveryPlanResult, buildRecoveryPlanHTML, generateRecoveryPlanMarkdown, matchOfficialRecoveryItem } from './data/recoveryTemplates';
import { OFFICIAL_RECOVERY_DATA_2026 } from './data/recoveryData2026';
import { LOGO_SP_BASE64 } from './data/logoSp';
import { generatePixPayload } from './lib/pix';
import { pixService } from './features/pix/pixService';
import buildInfo from './buildInfo.json';
import { buildSecuredPrompt } from './lib/geminiPrompt';
import { documentEngine } from './features/documents/documentEngine';
import AssessmentCalendar4B from './components/AssessmentCalendar4B';
import { InstitutionalHeader } from './design-system/InstitutionalHeader';
import { HomePage } from './pages/HomePage';
import { GuidelinesHelpPage } from './pages/GuidelinesHelpPage';
import { DocumentFrame } from './design-system/DocumentFrame';
import { StepNavigation } from './design-system/StepNavigation';
import { 
  EssentialLearningItem, 
  CurriculumSkillItem, 
  LessonSequenceItem, 
  DocumentStatusNotice 
} from './design-system/PedagogicalComponents';
import { EXTERNAL_ASSESSMENTS_2026, getAssessmentsForGrade } from './features/calendar/academicCalendar';

export const sanitizeTextForAE = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/sistematização\s+e\s+checagem\s+de\s+retenção\s+(dos|de)?\s*conteúdos\.?/gi, '')
    .replace(/como\s+o\s+ensino\s+(está\s+sendo|é)\s+aplicado[^\.\n;]*/gi, '')
    .replace(/o\s+ensino\s+(está\s+sendo|é)\s+aplicado\s+(através|por\s+meio|com)[^\.\n;]*/gi, '')
    .replace(/aplicação\s+do\s+ensino\s+(através|por\s+meio|com)[^\.\n;]*/gi, '')
    .replace(/acompanhamento\s+do\s+aprendizado\s+para\s+garantir[^\.\n;]*/gi, '')
    .replace(/desenvolvimento\s+e\s+aplicação\s+prática\s+das\s+habilidades\s+essenciais[^\.\n;]*/gi, '')
    .replace(/acompanhar\s+a\s+absorção\s+do\s+conteúdo[^\.\n;]*/gi, '')
    .replace(/verificação\s+contínua/gi, '')
    .replace(/\bverificação\b/gi, 'Análise')
    .replace(/\bverificar\b/gi, 'Analisar')
    .replace(/\bconsolidação\b/gi, 'Síntese')
    .replace(/\bconsolidar\b/gi, 'Sintetizar')
    .replace(/\bdiagnosticar\b/gi, 'Identificar')
    .replace(/\bdiagnóstico\b/gi, 'Avaliação')
    .replace(/\bdiagnóstica\b/gi, 'Formativa')
    .replace(/\brevisão\s+e\s+preparatório\b/gi, 'Preparação e Síntese')
    .replace(/\brevisão\s+dos\s+conteúdos\b/gi, 'Síntese dos objetos de estudo')
    .replace(/\brevisão\s+geral\b/gi, 'Síntese curricular')
    .replace(/\brevisão\b/gi, 'Síntese')
    .replace(/\brevisar\b/gi, 'Sintetizar')
    .replace(/\brevisional\b/gi, 'Temático')
    .replace(/\s+/g, ' ')
    .trim();
};

export const sanitizeTextForBloom = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/como\s+o\s+ensino\s+(está\s+sendo|é)\s+aplicado[^\.\n;]*/gi, '')
    .replace(/o\s+ensino\s+(está\s+sendo|é)\s+aplicado\s+(através|por\s+meio|com)[^\.\n;]*/gi, '')
    .replace(/aplicação\s+do\s+ensino\s+(através|por\s+meio|com)[^\.\n;]*/gi, '')
    .replace(/acompanhamento\s+do\s+aprendizado\s+para\s+garantir[^\.\n;]*/gi, '')
    .replace(/desenvolvimento\s+e\s+aplicação\s+prática\s+das\s+habilidades\s+essenciais[^\.\n;]*/gi, '')
    .replace(/acompanhar\s+a\s+absorção\s+do\s+conteúdo[^\.\n;]*/gi, '')
    .replace(/sistematização\s+e\s+checagem\s+de\s+retenção\s+(dos|de)?\s*conteúdos\.?/gi, '')
    .replace(/verificação\s+contínua/gi, '')
    .replace(/\bverificação\b/gi, 'Análise')
    .replace(/\bverificar\b/gi, 'Analisar')
    .replace(/\bconsolidação\b/gi, 'Síntese')
    .replace(/\bconsolidar\b/gi, 'Sintetizar')
    .replace(/\bdiagnosticar\b/gi, 'Identificar')
    .replace(/\bdiagnóstico\b/gi, 'Avaliação')
    .replace(/\bdiagnóstica\b/gi, 'Formativa')
    .replace(/\brevisão\s+e\s+preparatório\b/gi, 'Preparação e Análise')
    .replace(/\brevisão\s+dos\s+conteúdos\b/gi, 'Análise dos objetos de estudo')
    .replace(/\brevisão\s+geral\b/gi, 'Análise integrada')
    .replace(/\brevisão\b/gi, 'Análise')
    .replace(/\brevisar\b/gi, 'Analisar')
    .replace(/\brevisional\b/gi, 'Cognitivo')
    .replace(/\s+/g, ' ')
    .trim();
};

function mapProyectoVidaToCurriculum(item: any): CurriculumItem {
  if (item.disciplina && item.titulo) {
    return {
      ...item,
      raw: item
    };
  }
  const temaStr = typeof item.tema === 'string' ? item.tema.split('.')[0] : (item.titulo || 'Projeto de Vida');
  return {
    id: item.id || `pv-${item.ano}-${item.bimestre}-${item.aula}`,
    ano: item.ano || '6º Ano',
    bimestre: item.bimestre || '1º Bimestre',
    aula: typeof item.aula === 'string' && item.aula.startsWith('Aula') ? item.aula : `Aula ${item.aula || 1}`,
    titulo: item.titulo || `Tema: ${temaStr}`,
    conteudo: item.conteudo || `Dimensão: ${item.dimensao || ''} | Atitude: ${item.atitude || ''} | Prática: ${item.pratica || ''} \n\nContexto: ${item.contexto || ''} \nQuestões: ${item.questoes || ''}`,
    objetivos: item.objetivos || item.compreensao || '',
    habilidade: item.habilidade || '',
    aprendizagem: item.aprendizagem || (item.habilidade ? `${item.habilidade} - ${item.compreensao || ''}` : item.compreensao || ''),
    disciplina: 'Projeto de Vida',
    raw: item
  };
}

function mapTecnologiaToCurriculum(item: any): CurriculumItem {
  if (item.disciplina && item.titulo) {
    return {
      ...item,
      raw: item
    };
  }
  const aulaLabel = item.aulaSala ? `Aula ${item.aulaSala} (${item.semana || ''})` : (typeof item.aula === 'string' && item.aula.startsWith('Aula') ? item.aula : `Aula ${item.aula || 1}`);
  const hab = item.habilidade || (item.habComputacaoCodigo && item.habComputacaoCodigo !== 'n/a' ? `${item.habComputacaoCodigo}: ${item.habComputacaoTexto || ''}` : `${item.habBnccCodigo || ''}: ${item.habBnccTexto || ''}`);
  return {
    id: item.id || `tec-${item.ano}-${item.bimestre}-${item.aula || 1}`,
    ano: item.ano || '6º Ano',
    bimestre: item.bimestre || '1º Bimestre',
    aula: aulaLabel,
    titulo: item.titulo || 'Tecnologia e Inovação',
    conteudo: item.conteudo || `Unidade: ${item.unidade || ''} | Formato: ${item.formato || ''} \nConteúdos: ${item.conteudos || ''} \nEntrega: ${item.entrega || ''}`,
    objetivos: item.objetivos || item.objetivo || '',
    habilidade: hab,
    aprendizagem: item.aprendizagem || item.habComputacaoTexto || item.habBnccTexto || '',
    disciplina: 'Tecnologia e Inovação',
    raw: item
  };
}

function mapOrientacaoEstudoToCurriculum(item: any): CurriculumItem {
  if (item.disciplina && item.titulo) {
    return {
      ...item,
      raw: item
    };
  }
  const titleGps = typeof item.tituloGps === 'string' ? (item.tituloGps.split('|')[1]?.trim() || item.tituloGps) : (item.titulo || 'Orientação de Estudos');
  const aulaLabel = item.semana ? `Aula ${item.aula || 1} (${item.semana})` : (typeof item.aula === 'string' && item.aula.startsWith('Aula') ? item.aula : `Aula ${item.aula || 1}`);
  const habCode = item.habilidadeCodigo ? `${item.habilidadeCodigo}: ${item.habilidadeTexto || ''}` : (item.habilidade || '');
  return {
    id: item.id || `oe-${item.ano}-${item.bimestre}-${item.aula || 1}`,
    ano: item.ano || '6º Ano',
    bimestre: item.bimestre || '1º Bimestre',
    aula: aulaLabel,
    titulo: titleGps,
    conteudo: item.conteudo || `Gênero: ${item.genero || ''} | Eixo: ${item.eixo || ''} \nPráticas Pedagógicas: ${item.praticasPedagogicas || ''} \nPlataforma: ${item.plataforma || ''}`,
    objetivos: item.objetivos || '',
    habilidade: habCode,
    aprendizagem: item.aprendizagem || item.habilidadeTexto || item.praticaLinguagem || '',
    disciplina: item.disciplina || 'Orientação de Estudos - Matemática',
    raw: item
  };
}

function mapEducacaoFinanceiraToCurriculum(item: any): CurriculumItem {
  if (item.disciplina && item.titulo) {
    return {
      ...item,
      raw: item
    };
  }
  const habCode = item.habilidadeCodigo ? `${item.habilidadeCodigo}: ${item.habilidadeTexto || ''}` : (item.habilidade || '');
  return {
    id: item.id || `ef-${item.ano}-${item.bimestre}-${item.aula || 1}`,
    ano: item.ano || '6º Ano',
    bimestre: item.bimestre || '1º Bimestre',
    aula: typeof item.aula === 'string' && item.aula.startsWith('Aula') ? item.aula : `Aula ${item.aula || 1}`,
    titulo: item.titulo || 'Educação Financeira',
    conteudo: item.conteudo || `Unidade Temática: ${item.unidadeTematica || ''} \nObjeto de Conhecimento: ${item.objetoConhecimento || ''} \nConteúdos: ${item.conteudo || ''}`,
    objetivos: item.objetivos || '',
    habilidade: habCode,
    aprendizagem: item.aprendizagem || item.habilidadeTexto || item.objetoConhecimento || '',
    disciplina: 'Educação Financeira',
    raw: item
  };
}

function mapRedacaoLeituraToCurriculum(item: any): CurriculumItem {
  if (item.disciplina && item.titulo) {
    return {
      ...item,
      raw: item
    };
  }
  return {
    id: item.id || `rl-${item.ano}-${item.bimestre}-${item.aula || 1}`,
    ano: item.ano || '6º Ano',
    bimestre: item.bimestre || '1º Bimestre',
    aula: typeof item.aula === 'string' && item.aula.startsWith('Aula') ? item.aula : `Aula ${item.aula || 1}`,
    titulo: item.titulo || 'Redação e Leitura',
    conteudo: item.conteudo || `Gênero/Tema: ${item.titulo || ''} \nConteúdos: ${item.conteudo || ''}`,
    objetivos: item.objetivos || '',
    habilidade: item.habilidade || '',
    aprendizagem: item.aprendizagem || '',
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
  // 4º Bimestre (Detalhamento oficial 2026 - 11 semanas)
  return [
    { num: 1, period: "05/10 a 09/10/2026", holiday: "" },
    { num: 2, period: "12/10 a 16/10/2026", holiday: "12/10 = Feriado Nacional | 13/10 = Catavento e Museu da Língua Portuguesa | 15/10 = Feriado Escolar" },
    { num: 3, period: "19/10 a 23/10/2026", holiday: "" },
    { num: 4, period: "26/10 a 30/10/2026", holiday: "29 e 30/10 = SARESP (9º ano)" },
    { num: 5, period: "02/11 a 06/11/2026", holiday: "02/11 = Feriado Nacional | 04 e 05/11 = Provão Paulista Seriado (3ª série EM)" },
    { num: 6, period: "09/11 a 13/11/2026", holiday: "10 e 11/11 = Provão Paulista Seriado (2ª série EM) | 12 e 13/11 = Provão Paulista Seriado (1ª série EM)" },
    { num: 7, period: "16/11 a 20/11/2026", holiday: "19/11 = SARESP Digital (6º ano) | 20/11 = Feriado Nacional" },
    { num: 8, period: "23/11 a 27/11/2026", holiday: "26 e 27/11 = SARESP Digital (7º ano) | 28/11 = Feriado Escolar" },
    { num: 9, period: "30/11 a 04/12/2026", holiday: "30/11 e 01/12 = SARESP Digital (8º ano) | 02 e 03/12 = Reposição SARESP (6º, 7º e 8º anos)" },
    { num: 10, period: "07/12 a 11/12/2026", holiday: "07, 08 e 09/12 = Recuperação Semestral SEDUC | 08/12 = Feriado Municipal" },
    { num: 11, period: "14/12 a 18/12/2026", holiday: "14 a 18/12 = Conselho Final e Fechamento | 18/12 = Encerramento do Ano Letivo" }
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

function _legacyBuildDocumentHTML(
  escola: string,
  docente: string,
  segmento: string,
  componente: string,
  serie: string,
  bimestre: string,
  semanas: any[],
  trabalhosDate: string,
  avaliacoesDate: string
) {
  // Extract unique AEs for the global AEs block from week list
  const globalAEs: string[] = [];
  semanas.forEach(s => {
    if (!s.ae) return;
    const matches = s.ae.matchAll(/<li>(.*?)<\/li>/g);
    for (const match of matches) {
      const text = match[1].replace(/<[^>]*>/g, '').trim();
      if (text && !globalAEs.includes(text)) {
        globalAEs.push(text);
      }
    }
  });

  const getBimestreDateRange = (bim: string) => {
    if (bim === '1º Bimestre') return '1º (02/02 a 10/04/2026)';
    if (bim === '2º Bimestre') return '2º (23/04 a 08/07/2026)';
    if (bim === '3º Bimestre') return '3º (24/07 a 02/10/2026)';
    return '4º (05/10 a 18/12/2026)';
  };

  const tableRows = semanas.map((s, idx) => {
    const isDiversificada = ['Tecnologia e Inovação', 'Orientação de Estudos - Matemática', 'Orientação de Estudos - Português', 'Educação Financeira'].includes(componente) && s.lessons && s.lessons.length > 0;
    
    if (isDiversificada) {
      const lessons = s.lessons || [];
      const firstLesson = lessons[0] || {};
      const raw = firstLesson.raw || {};

      if (componente === 'Tecnologia e Inovação') {
        const unidade = raw.unidade || 'Tecnologia';
        const formato = raw.formato || 'Plugada';
        const conteudos = raw.conteudos || firstLesson.conteudo || '';
        const entrega = raw.entrega || 'n/a';
        const objetivo = raw.objetivo || firstLesson.objetivos || '';
        const habComputacaoCodigo = raw.habComputacaoCodigo || '';
        const habComputacaoTexto = raw.habComputacaoTexto || '';
        const habBnccCodigo = raw.habBnccCodigo || '';
        const habBnccTexto = raw.habBnccTexto || '';

        return `
          <!-- Week Table for Tecnologia e Inovação -->
          <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt; page-break-inside: avoid; line-height: 1.35;">
            <colgroup>
              <col width="15%" style="width: 15%;">
              <col width="25%" style="width: 25%;">
              <col width="25%" style="width: 25%;">
              <col width="15%" style="width: 15%;">
              <col width="20%" style="width: 20%;">
            </colgroup>
            <tbody>
              <tr>
                <td colspan="5" width="100%" style="border: 1pt solid black; padding: 6pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #e0f2fe; color: #0369a1; line-height: 1.15; width: 100%;">
                  Período: ${s.periodo} | Componente: Tecnologia e Inovação (Currículo Paulista 2026)
                  ${s.lessons && s.lessons.some((l: any) => l.num === 999) ? `
                    <button class="gemini-prompt-trigger no-print" data-week-idx="${idx}" title="Prompt copiado para a área de transferência! Cole estas instruções no ChatBox do Gemini." style="float: right; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534; font-family: sans-serif; font-size: 10px; font-weight: bold; cursor: pointer; transition: all 0.2s;">
                      Prompt Gemini 📋
                    </button>
                  ` : ''}
                </td>
              </tr>
              <tr style="background-color: #f0f9ff; font-weight: bold; font-size: 10pt; text-align: center; color: #0369a1;">
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Aula / Formato</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">Unidade / Objetivos</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">Habilidades (Computação & BNCC)</td>
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Conteúdo Crítico</td>
                <td width="20%" style="border: 1pt solid black; padding: 5pt; width: 20%; word-wrap: break-word;">Entrega do Projeto & Metodologia</td>
              </tr>
              <tr>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; text-align: center; vertical-align: middle; font-weight: bold; color: #0284c7; width: 15%; word-wrap: break-word;">
                  ${s.aulas_escopo}<br/>
                  <span style="font-size: 9pt; background-color: #e0f2fe; color: #0369a1; padding: 2px 4px; border-radius: 3px; display: inline-block; margin-top: 5px;">${formato}</span>
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; width: 25%; word-wrap: break-word;">
                  <strong style="color: #075985;">Unidade:</strong> ${unidade}<br/><br/>
                  <strong style="color: #075985;">Objetivo:</strong> ${objetivo}
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; font-size: 9.5pt; width: 25%; word-wrap: break-word;">
                  ${habComputacaoCodigo ? `<strong style="color: #0369a1;">Computação (${habComputacaoCodigo}):</strong> ${habComputacaoTexto}<br/><br/>` : ''}
                  ${habBnccCodigo ? `<strong style="color: #047857;">Mapeamento BNCC (${habBnccCodigo}):</strong> ${habBnccTexto}` : ''}
                </td>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; width: 15%; word-wrap: break-word;">
                  ${conteudos}
                </td>
                <td width="20%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; font-size: 10pt; width: 20%; word-wrap: break-word;">
                  ${entrega && entrega !== 'n/a' ? `<div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 4pt; border-radius: 4px; margin-bottom: 5px; color: #92400e; font-weight: bold;">⚠️ Entrega: ${entrega}</div>` : ''}
                  <strong style="color: #0284c7;">Metodologia Ativa:</strong> ${s.estrategia}<br/><br/>
                  <strong style="color: #0284c7;">Avaliação:</strong> ${s.avaliacao}
                </td>
              </tr>
            </tbody>
          </table>
        `;
      }

      if (componente === 'Orientação de Estudos - Matemática' || componente === 'Orientação de Estudos - Português') {
        const genero = raw.genero || 'Gênero Estudo';
        const eixo = raw.eixo || 'Leitura';
        const praticasPedagogicas = raw.praticasPedagogicas || firstLesson.conteudo || '';
        const plataforma = raw.plataforma || '';
        const objetivos = raw.objetivos || firstLesson.objetivos || '';
        const sugestoes = raw.sugestoes || [];
        const praticaLinguagem = raw.praticaLinguagem || '';
        const tituloGps = raw.tituloGps || firstLesson.titulo || '';

        return `
          <!-- Week Table for Orientação de Estudos -->
          <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt; page-break-inside: avoid; line-height: 1.35;">
            <colgroup>
              <col width="15%" style="width: 15%;">
              <col width="25%" style="width: 25%;">
              <col width="25%" style="width: 25%;">
              <col width="15%" style="width: 15%;">
              <col width="20%" style="width: 20%;">
            </colgroup>
            <tbody>
              <tr>
                <td colspan="5" width="100%" style="border: 1pt solid black; padding: 6pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #ffe4e6; color: #be123c; line-height: 1.15; width: 100%;">
                  Período: ${s.periodo} | Componente: ${componente} (Currículo Paulista 2026)
                  ${s.lessons && s.lessons.some((l: any) => l.num === 999) ? `
                    <button class="gemini-prompt-trigger no-print" data-week-idx="${idx}" title="Prompt copiado para a área de transferência! Cole estas instruções no ChatBox do Gemini." style="float: right; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534; font-family: sans-serif; font-size: 10px; font-weight: bold; cursor: pointer; transition: all 0.2s;">
                      Prompt Gemini 📋
                    </button>
                  ` : ''}
                </td>
              </tr>
              <tr style="background-color: #fff1f2; font-weight: bold; font-size: 10pt; text-align: center; color: #be123c;">
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Aula / Percurso</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">GPS & Gênero Discursivo</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">Práticas Pedagógicas & Roteiro</td>
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Obras & Leituras Adotadas</td>
                <td width="20%" style="border: 1pt solid black; padding: 5pt; width: 20%; word-wrap: break-word;">Plataformas de Apoio & Estudo</td>
              </tr>
              <tr>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; text-align: center; vertical-align: middle; font-weight: bold; color: #e11d48; width: 15%; word-wrap: break-word;">
                  ${s.aulas_escopo}<br/>
                  <span style="font-size: 8.5pt; color: #9f1239; font-weight: normal; display: block; margin-top: 5px;">Eixo: <strong>${eixo}</strong></span>
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; width: 25%; word-wrap: break-word;">
                  <strong style="color: #9f1239;">GPS:</strong> ${tituloGps}<br/><br/>
                  <strong style="color: #9f1239;">Gênero:</strong> ${genero}<br/><br/>
                  <strong style="color: #9f1239;">Linguagem:</strong> ${praticaLinguagem}
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; width: 25%; word-wrap: break-word;">
                  <strong style="color: #111827;">Roteiro de Práticas:</strong> ${praticasPedagogicas}<br/><br/>
                  <strong style="color: #111827;">Objetivos:</strong> ${objetivos}
                </td>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; font-size: 9.5pt; width: 15%; word-wrap: break-word;">
                  <strong style="color: #9f1239; display: block; margin-bottom: 4px;">📖 Indicações:</strong>
                  ${Array.isArray(sugestoes) && sugestoes.length > 0 ? `<ul style="margin: 0; padding-left: 10pt;">` + sugestoes.map(o => `<li>${o}</li>`).join('') + `</ul>` : 'Nenhuma obra cadastrada'}
                </td>
                <td width="20%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; font-size: 10pt; width: 20%; word-wrap: break-word;">
                  ${plataforma ? `<div style="background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 4pt; border-radius: 4px; font-weight: bold; margin-bottom: 5px;">💻 Plataforma: ${plataforma}</div>` : ''}
                  <strong style="color: #e11d48;">Estratégia:</strong> ${s.estrategia}<br/><br/>
                  <strong style="color: #e11d48;">Avaliação:</strong> ${s.avaliacao}
                </td>
              </tr>
            </tbody>
          </table>
        `;
      }

      if (componente === 'Educação Financeira') {
        const unidadeTematica = raw.unidadeTematica || 'Economia';
        const objetoConhecimento = raw.objetoConhecimento || 'Consumo';
        const conteudo = raw.conteudo || firstLesson.conteudo || '';
        const objetivos = raw.objetivos || firstLesson.objetivos || '';
        const titulo = firstLesson.titulo || '';

        return `
          <!-- Week Table for Educação Financeira -->
          <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt; page-break-inside: avoid; line-height: 1.35;">
            <colgroup>
              <col width="15%" style="width: 15%;">
              <col width="25%" style="width: 25%;">
              <col width="25%" style="width: 25%;">
              <col width="15%" style="width: 15%;">
              <col width="20%" style="width: 20%;">
            </colgroup>
            <tbody>
              <tr>
                <td colspan="5" width="100%" style="border: 1pt solid black; padding: 6pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #fef3c7; color: #b45309; line-height: 1.15; width: 100%;">
                  Período: ${s.periodo} | Componente: Educação Financeira (Currículo Paulista 2026)
                  ${s.lessons && s.lessons.some((l: any) => l.num === 999) ? `
                    <button class="gemini-prompt-trigger no-print" data-week-idx="${idx}" title="Prompt copiado para a área de transferência! Cole estas instruções no ChatBox do Gemini." style="float: right; display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534; font-family: sans-serif; font-size: 10px; font-weight: bold; cursor: pointer; transition: all 0.2s;">
                      Prompt Gemini 📋
                    </button>
                  ` : ''}
                </td>
              </tr>
              <tr style="background-color: #fffbeb; font-weight: bold; font-size: 10pt; text-align: center; color: #b45309;">
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Aula / Percurso</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">Unidade & Objeto de Estudo</td>
                <td width="25%" style="border: 1pt solid black; padding: 5pt; width: 25%; word-wrap: break-word;">Título & Percurso da Aula</td>
                <td width="15%" style="border: 1pt solid black; padding: 5pt; width: 15%; word-wrap: break-word;">Conteúdo Crítico & Habilidade</td>
                <td width="20%" style="border: 1pt solid black; padding: 5pt; width: 20%; word-wrap: break-word;">Metodologia & Avaliação</td>
              </tr>
              <tr>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; text-align: center; vertical-align: middle; font-weight: bold; color: #d97706; width: 15%; word-wrap: break-word;">
                  ${s.aulas_escopo}<br/>
                  <span style="font-size: 8.5pt; color: #92400e; font-weight: normal; display: block; margin-top: 5px;">Consumo Sustentável</span>
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; width: 25%; word-wrap: break-word;">
                  <strong style="color: #92400e;">Unidade:</strong> ${unidadeTematica}<br/><br/>
                  <strong style="color: #92400e;">Objeto:</strong> ${objetoConhecimento}
                </td>
                <td width="25%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; width: 25%; word-wrap: break-word;">
                  <strong style="color: #111827;">Título:</strong> ${titulo}<br/><br/>
                  <strong style="color: #111827;">Objetivos:</strong> ${objetivos}
                </td>
                <td width="15%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; width: 15%; word-wrap: break-word;">
                  <strong style="color: #92400e;">Conteúdos:</strong> ${conteudo}<br/><br/>
                  <strong style="color: #15803d;">Habilidade:</strong> ${firstLesson.habilidade}
                </td>
                <td width="20%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; font-size: 10pt; width: 20%; word-wrap: break-word;">
                  <strong style="color: #d97706;">Dinâmica de Aula:</strong> ${s.estrategia}<br/><br/>
                  <strong style="color: #d97706;">Avaliação:</strong> ${s.avaliacao}
                </td>
              </tr>
            </tbody>
          </table>
        `;
      }
    }

    const estrategiaVerificacaoTexto = s.estrategia_verificacao || getVerificationStrategy(s.conteudos ? s.conteudos.toLowerCase() : '', s.estrategia || '', idx);

    // Default table template for standard subjects - Updated official template layout
    return `
      <!-- Week Table -->
      <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt; page-break-inside: avoid; line-height: 1.2;">
        <colgroup>
          <col width="50%" style="width: 50%;">
          <col width="50%" style="width: 50%;">
        </colgroup>
        <tbody>
          <!-- Row 1: Plano de Aula -->
          <tr>
            <td colspan="2" width="100%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #00b0f0; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; text-align: center; width: 100%;">
              <strong>Plano de Aula</strong>
            </td>
          </tr>
          <!-- Row 2: Período e Aula(s) material digital (fundo branco) -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #ffffff; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Período: ${s.periodo}</strong>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt 8pt; background-color: #ffffff; color: black; font-weight: bold; font-size: 11pt; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Aula(s) material digital: ${s.aulas_escopo}</strong>
            </td>
          </tr>
          <!-- Black divider row shifted between Periodo and Aprendizagem Essencial -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 2pt; background-color: #000000; color: #000000; font-size: 1pt; line-height: 1pt; width: 50%;">&nbsp;</td>
            <td width="50%" style="border: 1pt solid black; padding: 2pt; background-color: #000000; color: #000000; font-size: 1pt; line-height: 1pt; width: 50%;">&nbsp;</td>
          </tr>
          <!-- Row 3 Headers: Aprendizagem Essencial (AE) & Ações Tax. Bloom -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Aprendizagem Essencial (AE)</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Ações Tax. Bloom / Habilidades priorizadas</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 3 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.ae || ''}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.acoes_bloom || ''}
            </td>
          </tr>

          <!-- Row 4 Headers: Conteúdo & Metodologia/Estratégia -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Conteúdo</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Metodologia/Estratégia</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 4 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.conteudos || ''}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.estrategia || ''}
            </td>
          </tr>

          <!-- Row 5 Headers: Estratégia de verificação / Parada Intencional & Avaliação -->
          <tr style="background-color: white;">
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Estratégia de verificação / Parada Intencional</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 5pt; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; width: 50%; word-wrap: break-word;">
              <strong>Avaliação</strong> <span style="font-size: 11pt; margin-left: 2px;">⬇️</span>
            </td>
          </tr>
          <!-- Row 5 Content -->
          <tr>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${estrategiaVerificacaoTexto}
            </td>
            <td width="50%" style="border: 1pt solid black; padding: 6pt; vertical-align: top; text-align: justify; font-size: 11pt; line-height: 1.2; width: 50%; word-wrap: break-word;">
              ${s.avaliacao || ''}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }).join('\n<p style="margin: 6pt 0 6pt 0; font-size: 1pt; line-height: 1pt; display: block; mso-line-height-rule: exactly;">&nbsp;</p>\n');

  return `
    <div style="font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; line-height: 1.2; max-width: 21cm; margin: 0 auto; box-sizing: border-box; text-align: justify;">
        <!-- Header Logo Block -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 8pt; font-family: Cambria, Georgia, serif; border: none; font-size: 11pt; line-height: 1.15;">
          <tr>
            <td style="width: 160px; vertical-align: middle; border: none; padding: 0;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img src="${LOGO_SP_BASE64}" alt="Logo Governo SP" style="width: 150px; height: auto; display: block;" />
              </div>
            </td>
            <td style="vertical-align: middle; border: none; padding: 0; text-align: center;">
              <div style="font-size: 10pt; font-weight: bold; line-height: 1.15; text-transform: uppercase; color: black; font-family: Cambria, Georgia, serif;">
                SECRETARIA DE ESTADO DA EDUCAÇÃO DE SÃO PAULO – DIRETORIA DE ENSINO
              </div>
              <div style="font-size: 10.5pt; font-weight: bold; line-height: 1.15; margin-top: 2pt; text-transform: uppercase; color: black; font-family: Cambria, Georgia, serif;">
                ${escola.toUpperCase() || 'E.E. NOME DA UNIDADE ESCOLAR'}
              </div>
              <div style="font-size: 8.5pt; color: black; line-height: 1.15; margin-top: 2pt; font-family: Cambria, Georgia, serif;">
                DIRETORIA DE ENSINO / UNIDADE REGIONAL DE ENSINO - SÃO PAULO
              </div>
            </td>
          </tr>
        </table>
        
        <!-- SP State Identity Accent Line (Dark Red) -->
        <div style="border-bottom: 2.5px solid #a31515; margin-bottom: 12pt; width: 100%;"></div>

        <!-- Identification Block (Yellow Theme #ffc000) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; border: 1.5pt solid black; table-layout: fixed; background-color: #ffc000; line-height: 1.15;">
          <tbody>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #ffc000; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                ${escola.toUpperCase() || 'E.E. NOME DA UNIDADE ESCOLAR'}
              </td>
            </tr>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; background-color: #ffc000; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                PLANO DE ENSINO COM DESENVOLVIMENTO DO PLANO DE AULA
              </td>
            </tr>
            <tr>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; width: 50%; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Curso:</strong> ${segmento.toUpperCase()}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; width: 50%; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;" colspan="2">
                <strong>Componente Curricular:</strong> ${componente.toUpperCase()}
              </td>
            </tr>
            <tr>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Docente:</strong> ${docente.toUpperCase() || 'DOCENTE RESPONSÁVEL'}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Ano Letivo:</strong> 2026
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Bimestre:</strong> ${getBimestreDateRange(bimestre)}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Ano/Série:</strong> ${serie.toUpperCase()}
              </td>
              <td style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              </td>
            </tr>
            <tr>
              <td colspan="3" style="border: 1pt solid black; padding: 5pt; text-align: left; background-color: #ffc000; color: black; line-height: 1.25; font-size: 11pt; font-family: Cambria, 'Cambria Math', Georgia, serif;">
                <strong>Datas:</strong><br />
                ${bimestre === '1º Bimestre' ? `
                  FERIADOS E PONTO FACULTATIVO: 17/02/2026; 03/04/2026<br />
                  OMASP: 09 a 13/03/2026<br />
                  PROVA PAULISTA 1º BIMESTRE: 23 a 27/03/2026
                ` : bimestre === '2º Bimestre' ? `
                  FERIADOS E PONTO FACULTATIVO: 01/05/2026; 04 e 05/06/2026; 09/07/2026<br />
                  OMASP: 18 a 22/05/2026<br />
                  PROVA PAULISTA 2º BIMESTRE: 15 a 19/06/2026
                ` : bimestre === '4º Bimestre' ? `
                  11 semanas<br />
                  <strong>Datas:</strong><br />
                  12/10 = Feriado Nacional<br />
                  13/10 = Catavento e Museu da Língua Portuguesa – Anos Finais<br />
                  15/10 = Feriado Escolar<br />
                  20/10 = Simulado Provão Paulista e ENEM (Para o Ensino Médio)<br />
                  23/10 = Jardim do Conhecimento/Feira<br />
                  29 e 30/10/2026 = SARESP 9º ano (Impresso)<br />
                  02/11 = Feriado Nacional<br />
                  04 e 05/11/2026 = Provão Paulista Seriado 3ª série<br />
                  10 e 11/11/2026 = Provão Paulista Seriado 2ª série<br />
                  12 e 13/11/2026 = Provão Paulista Seriado 1ª série<br />
                  19/11/2026 = SARESP Digital 6º ano<br />
                  20/11 = Feriado Nacional<br />
                  26 e 27/11/2026 = SARESP Digital 7º ano<br />
                  28/11 = Feriado Escolar<br />
                  30/11 e 01/12/2026 = SARESP Digital 8º ano<br />
                  02 e 03/12/2026 = Reposição SARESP (6º, 7º e 8º anos)<br />
                  07, 08 e 09/12/2026 = Recuperação Semestral SEDUC<br />
                  08/12 = Feriado Municipal<br />
                  14 a 18/12/2026 = Conselho Final e Fechamento / Encerramento do Ano Letivo
                ` : `
                  FERIADOS E PONTO FACULTATIVO: 07/09/2026<br />
                  RECUPERAÇÃO E APROFUNDAMENTO: 27 a 30/07/2026<br />
                  PROVA DE RECUPERAÇÃO: 03 a 07/08/2026<br />
                  OLISP: 24 a 28/08/2026<br />
                  PROVA PAULISTA 3º BIMESTRE: 21 a 25/09/2026
                `}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Section 1: PLANO DE ENSINO (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 6pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              PLANO DE ENSINO – BASE GUIA PRIORIZADO
            </td>
          </tr>
        </table>

        <!-- Section 2: AEs = Aprendizagens Essenciais (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              AEs = Aprendizagens Essenciais
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 8pt 6pt; text-align: justify; background-color: white; font-size: 11pt; line-height: 1.15; color: black; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              ${globalAEs.length > 0 
                ? globalAEs.map(ae => `<p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">${ae}</p>`).join('')
                : "<p style=\"margin: 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;\">Nenhuma Aprendizagem Essencial selecionada.</p>"
              }
            </td>
          </tr>
        </table>

        <!-- Section 3: Taxonomia de Bloom (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              Taxonomia de Bloom
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 8pt 6pt; text-align: justify; background-color: white; font-size: 11pt; line-height: 1.15; color: black; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>1. Conhecimento/Memorizar: Verbos:</strong> enumerar, definir, descrever, identificar, denominar, listar, nomear, combinar, realçar, apontar, relembrar, recordar, relacionar, reproduzir, solucionar, declarar, distinguir, rotular, memorizar, ordenar e reconhecer.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>2. Compreensão: Verbos:</strong> alterar, construir, converter, decodificar, defender, definir, descrever, distinguir, discriminar, estimar, explicar, generalizar, dar exemplos, ilustrar, inferir, reformular, prever, reescrever, resolver, resumir, classificar, discutir, identificar, interpretar, reconhecer, redefinir, selecionar, situar e traduzir.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>3. Aplicação: Verbos:</strong> aplicar, alterar, programar, demonstrar, desenvolver, descobrir, dramatizar, empregar, ilustrar, interpretar, manipular, modificar, operacionalizar, organizar, prever, preparar, produzir, relatar, resolver, transferir, usar, construir, esboçar, escolher, escrever, operar e praticar.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>4. Análise: Verbos:</strong> analisar, reduzir, classificar, comparar, contrastar, determinar, deduzir, diagramar, distinguir, diferenciar, identificar, ilustrar, apontar, inferir, relacionar, selecionar, separar, subdividir, calcular, discriminar, examinar, experimentar, testar, esquematizar e questionar.</p>
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>5. Criar/Síntese: Verbos:</strong> categorizar, combinar, compilar, compor, conceber, construir, criar, desenhar, elaborar, estabelecer, explicar, formular, generalizar, inventar, modificar, organizar, originar, planejar, propor, reorganizar, relacionar, revisar, reescrever, resumir, sistematizar, escrever, desenvolver, estruturar, montar e projetar.</p>
              <p style="margin: 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>6. Avaliação: Verbos:</strong> Avaliar, averiguar, escolher, comparar, concluir, contrastar, criticar, decidir, defender, discriminar, explicar, interpretar, justificar, relatar, resolver, resumir, apoiar, validar, escrever um review sobre, detectar, estimar, julgar e selecionar.</p>
            </td>
          </tr>
        </table>

        <!-- Section 4: ESTRATÉGIA/METODOLOGIAS (Cyan #00b0f0) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #00b0f0; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; text-transform: uppercase; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              ESTRATÉGIA/METODOLOGIAS
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="width: 50%; border: 1pt solid black; padding: 8pt 6pt; vertical-align: top; text-align: justify; background-color: white; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>A-</strong> Aula expositiva com discussão pautada no material digital;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>B-</strong> Aula de estudo dirigido pautada no recurso do material impresso;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>C-</strong> Estudo dirigido;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>D-</strong> Estudo de caso (análise criteriosa e minuciosa de uma situação)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>E-</strong> Aprendizagem baseada em problemas;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>F-</strong> Brainstorm (chuva de ideias)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>G-</strong> Mapa mental;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>H-</strong> Mapa conceitual;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>I-</strong> Gamificação;</p>
            </td>
            <td style="width: 50%; border: 1pt solid black; padding: 8pt 6pt; vertical-align: top; text-align: justify; background-color: white; color: black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>J-</strong> Rotação por estações;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>K-</strong> Aula prática;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>L-</strong> Sala de aula invertida;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>M-</strong> Philips 66 (análise e discussão em grupo);</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>N-</strong> Estudo do meio;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>O-</strong> Seminário;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>P-</strong> Construção de painel;</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>Q-</strong> Dimensão lúdica e cultural (danças, brincadeiras, lutas e adaptações dos esportes tradicionais.)</p>
              <p style="margin: 0 0 4pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;"><strong>R-</strong> Outros (Especificar)</p>
            </td>
          </tr>
        </table>

        <!-- Section 5: PLANO DE AULA SEMANAL (Dark Navy #002060) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 6pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #002060; border: 1pt solid black; padding: 5pt; text-align: center; font-weight: bold; font-size: 11pt; color: white; text-transform: uppercase; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              PLANO DE AULA SEMANAL
            </td>
          </tr>
        </table>

        <!-- Table Rows -->
        ${tableRows}

        <!-- References Section (Yellow #ffc000) -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 12pt; margin-bottom: 0pt; border: 1pt solid black; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="background-color: #ffc000; border: 1pt solid black; padding: 5pt; text-align: left; font-weight: bold; font-size: 11pt; color: black; text-transform: uppercase; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              REFERÊNCIAS
            </td>
          </tr>
        </table>
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid black; border-top: none; font-size: 11pt; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">
          <tr>
            <td style="border: 1pt solid black; padding: 8pt 6pt; text-align: justify; background-color: white; font-size: 11pt; line-height: 1.15; color: black; font-family: Cambria, 'Cambria Math', Georgia, serif;">
              <p style="margin: 0 0 6pt 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">BLOOM, B. S. et al. <strong>Taxonomy of educational objectives</strong>. New York: David Mckay, 1956. 262 p.</p>
              <p style="margin: 0; text-align: justify; line-height: 1.15; font-family: Cambria, 'Cambria Math', Georgia, serif;">FERRAZ, Ana Paula do C. M. e BELHOT, Renato V.. <strong>Taxonomia de Bloom: revisão teórica e apresentação das adequações do instrumento para definição de objetivos instrucionais</strong>. Gest. Prod., São Carlos, v. 17, n. 2, p. 421-431, 2010.</p>
            </td>
          </tr>
        </table>
    </div>
  `;
}

const cleanItinerariosEMData = itinerariosEMData.filter(
  item => (item.titulo && item.titulo.trim() !== '') || (item.conteudo && item.conteudo.trim() !== '') || (item.objetivos && item.objetivos.trim() !== '')
);

const allMappedDiversificada = [
  ...PROJETO_DE_VIDA_DATA.map(mapProyectoVidaToCurriculum),
  ...TECNOLOGIA_INOVACAO_DATA.map(mapTecnologiaToCurriculum),
  ...ORIENTACAO_ESTUDO_MATEMATICA_DATA.map(mapOrientacaoEstudoToCurriculum),
  ...ORIENTACAO_ESTUDO_PORTUGUES_DATA.map(mapOrientacaoEstudoToCurriculum),
  ...EDUCACAO_FINANCEIRA_DATA.map(mapEducacaoFinanceiraToCurriculum),
  ...REDACAO_LEITURA_DATA.map(mapRedacaoLeituraToCurriculum)
];

const allMappedTecnico = ALL_TECNICO_DATA.map(mapTecnicoToCurriculum);

const initialCombinedCurriculumData = [
  ...initialCurriculumData,
  ...allMappedDiversificada,
  ...cleanItinerariosEMData,
  ...allMappedTecnico
].filter((item: any) => {
  if (!item) return false;
  const t = (item.titulo || item.tema || '').trim();
  const c = (item.conteudo || item.contexto || '').trim();
  const o = (item.objetivos || item.compreensao || '').trim();
  return t !== '' || c !== '' || o !== '';
});

const FUNDAMENTAL_FGB_SUBJECTS = [
  { id: 'Língua Portuguesa', label: 'Língua Portuguesa', ready: true },
  { id: 'Matemática', label: 'Matemática', ready: true },
  { id: 'Ciências', label: 'Ciências', ready: true },
  { id: 'Geografia', label: 'Geografia', ready: true },
  { id: 'História', label: 'História', ready: true },
  { id: 'Língua Inglesa', label: 'Língua Inglesa', ready: true },
  { id: 'Educação Física', label: 'Educação Física', ready: true },
  { id: 'Arte', label: 'Arte', ready: true }
];

const FUNDAMENTAL_DIVERSIFICADA_SUBJECTS = [
  { id: 'Projeto de Vida', label: 'Projeto de Vida', ready: true },
  { id: 'Tecnologia e Inovação', label: 'Tecnologia e Inovação', ready: true },
  { id: 'Orientação de Estudos - Matemática', label: 'Orientação de Estudos - Matemática', ready: true },
  { id: 'Orientação de Estudos - Português', label: 'Orientação de Estudos - Português', ready: true },
  { id: 'Educação Financeira', label: 'Educação Financeira', ready: true },
  { id: 'Redação e leitura', label: 'Redação e Leitura', ready: true }
];

const MEDIO_FGB_SUBJECTS = [
  { id: 'Língua Portuguesa', label: 'Língua Portuguesa', ready: true },
  { id: 'Matemática', label: 'Matemática', ready: true },
  { id: 'Física', label: 'Física', ready: true },
  { id: 'Química', label: 'Química', ready: true },
  { id: 'Biologia', label: 'Biologia', ready: true },
  { id: 'História', label: 'História', ready: true },
  { id: 'Geografia', label: 'Geografia', ready: true },
  { id: 'Filosofia', label: 'Filosofia', ready: true },
  { id: 'Sociologia', label: 'Sociologia', ready: true },
  { id: 'Língua Inglesa', label: 'Língua Inglesa', ready: true },
  { id: 'Arte', label: 'Arte', ready: true },
  { id: 'Educação Física', label: 'Educação Física', ready: true }
];

const MEDIO_DIVERSIFICADA_SUBJECTS = [
  { id: 'Projeto de Vida', label: 'Projeto de Vida', ready: true },
  { id: 'Educação Financeira', label: 'Educação Financeira', ready: true },
  { id: 'Redação e leitura', label: 'Redação e Leitura', ready: true }
];

const MEDIO_ITINERARIOS_SUBJECTS = [
  { id: 'Aprofundamento em Biologia', label: 'Aprofundamento em Biologia', ready: true },
  { id: 'Aprofundamento em Filosofia', label: 'Aprofundamento em Filosofia', ready: true },
  { id: 'Aprofundamento em Geografia', label: 'Aprofundamento em Geografia', ready: true },
  { id: 'Aprofundamento em Química', label: 'Aprofundamento em Química', ready: true },
  { id: 'Aprofundamento em Sociologia', label: 'Aprofundamento em Sociologia', ready: true },
  { id: 'Arte e Mídias Digitais', label: 'Arte e Mídias Digitais', ready: true },
  { id: 'Atualidades', label: 'Atualidades', ready: true },
  { id: 'Empreendedorismo', label: 'Empreendedorismo', ready: true },
  { id: 'Liderança e Oratória', label: 'Liderança e Oratória', ready: true },
  { id: 'Língua Inglesa (Aprofundamento)', label: 'Língua Inglesa (Aprofundamento)', ready: true },
  { id: 'Programação', label: 'Programação', ready: false }
];

const MEDIO_TECNICO_SUBJECTS = [
  { id: 'Introdução à Administração, Legislação e Pessoas', label: 'Introdução à Administração, Legislação e Pessoas', ready: true },
  { id: 'Matemática Aplicada à Administração', label: 'Matemática Aplicada à Administração', ready: true },
  { id: 'Marketing Estratégico', label: 'Marketing Estratégico', ready: true },
  { id: 'Gestão Financeira e Contabilidade', label: 'Gestão Financeira e Contabilidade', ready: true },
  { id: 'Gestão de Operações', label: 'Gestão de Operações', ready: true },
  { id: 'Inovação e Desenvolvimento de Negócios', label: 'Inovação e Desenvolvimento de Negócios', ready: true },
  { id: 'Comunicação Empresarial', label: 'Comunicação Empresarial', ready: true }
];

export default function App() {
  const [items, setItems] = useState<CurriculumItem[]>(initialCombinedCurriculumData);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab & Workflow
  const [activeTab, setActiveTab] = useState<string>('plan-generator');
  const [editorStep, setEditorStep] = useState<number>(1);
  const [lastSavedText, setLastSavedText] = useState<string>('Salvo localmente');
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false);
  const [showCalendarDetails, setShowCalendarDetails] = useState<boolean>(false);

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

  const getOfficialCurriculumData = (): CurriculumItem[] => {
    if (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS') {
      if (subjectCategory === 'FGB') {
        return initialCurriculumData.filter(i => ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(i.ano));
      }

      if (subjectCategory === 'DIVERSIFICADA') {
        return allMappedDiversificada.filter(i => ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(i.ano));
      }

      return [];
    }

    switch (subjectCategory) {
      case 'FGB':
        return initialCurriculumData.filter(i => ['1ª Série', '2ª Série', '3ª Série'].includes(i.ano));

      case 'DIVERSIFICADA':
        return allMappedDiversificada.filter(i => ['1ª Série', '2ª Série', '3ª Série'].includes(i.ano));

      case 'TECNICO':
        return allMappedTecnico;

      case 'ITINERARIOS':
        return cleanItinerariosEMData;

      default:
        return [];
    }
  };

  const [dataSource, setDataSource] = useState<'oficial' | 'upload'>('oficial');
  const [allAvailableLessons, setAllAvailableLessons] = useState<CurriculumItem[]>([]);
  const [uploadedDb, setUploadedDb] = useState<Record<string, any[][]>>({});
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Selection filters for Plan Generator
  const [planSubject, setPlanSubject] = useState('Matemática');
  const [planGrade, setPlanGrade] = useState('6º Ano');
  const [planBimester, setPlanBimester] = useState('4º Bimestre');
  
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

  // Active Plan Skills Mapping
  const activePlanSkillsMapping = useCallback(() => {
    const activeLessons: any[] = [];
    const skillCounts: Record<string, number> = {};
    const activeSkillCodes = new Set<string>();

    items.forEach(item => {
      const key = `oficial|${item.id}`;
      if (selectedPlanLessons.has(key)) {
        activeLessons.push(item);
        const hab = item.habilidade || item.aprendizagem || '';
        if (hab) {
          const matches = hab.match(/[A-Z]{2,4}\d{2}[A-Z0-9]{2,4}/gi) || [];
          if (matches.length > 0) {
            matches.forEach(code => {
              const uppercaseCode = code.toUpperCase();
              activeSkillCodes.add(uppercaseCode);
              skillCounts[uppercaseCode] = (skillCounts[uppercaseCode] || 0) + 1;
            });
          } else {
            const trimmed = hab.slice(0, 60);
            activeSkillCodes.add(trimmed);
            skillCounts[trimmed] = (skillCounts[trimmed] || 0) + 1;
          }
        }
      }
    });

    return {
      subject: planSubject,
      grade: planGrade,
      bimester: planBimester,
      totalSelectedLessons: activeLessons.length,
      activeSkillCodes: Array.from(activeSkillCodes),
      skillCounts,
      activeLessons
    };
  }, [selectedPlanLessons, items, planSubject, planGrade, planBimester])();

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

  // Sincroniza os filtros ao trocar a fonte ou o segmento de ensino
  useEffect(() => {
    if (dataSource !== 'oficial') return;

    setSubjectCategory('FGB');
    setPlanSubject('Língua Portuguesa');

    setPlanGrade(
      selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
        ? '6º Ano'
        : '1ª Série'
    );

    if (!planBimester) {
      setPlanBimester('1º Bimestre');
    }
  }, [dataSource, selectedSegment]);

  // Load lessons when category or dataSource changes
  useEffect(() => {
    async function loadData() {
      if (dataSource !== 'oficial') return;
      
      let data: CurriculumItem[] = [];
      if (subjectCategory === 'FGB') {
        data = await curriculumRepository.getFgbItems();
      } else if (subjectCategory === 'ITINERARIOS') {
        data = await curriculumRepository.getItinerarioItems();
      } else if (subjectCategory === 'TECNICO') {
        data = await curriculumRepository.getTecnicoItems();
      } else if (subjectCategory === 'DIVERSIFICADA') {
        const divData = await curriculumRepository.getDiversificadaData();
        let allDiv: CurriculumItem[] = [];
        Object.keys(divData).forEach(key => {
          allDiv = allDiv.concat(divData[key]);
        });
        data = allDiv;
      }
      setAllAvailableLessons(data);
    }
    loadData();
  }, [subjectCategory, dataSource]);

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

  // Synchronize grade and bimester if planSubject changes under official data
  useEffect(() => {
    if (dataSource === 'oficial' && planSubject) {
      const relevant = getOfficialCurriculumData().filter(i =>
        normalizeFilter(i.disciplina) === normalizeFilter(planSubject)
      );
      if (relevant.length > 0) {
        const uniqueGrades = Array.from(new Set(relevant.map(r => r.ano))).filter(Boolean);
        let currentGrade = planGrade;
        if (uniqueGrades.length > 0 && !uniqueGrades.includes(planGrade)) {
          currentGrade = uniqueGrades[0];
          setPlanGrade(currentGrade);
        }
        const relevantForGrade = relevant.filter(r => r.ano === currentGrade);
        const uniqueBims = Array.from(new Set(relevantForGrade.map(r => r.bimestre))).filter(Boolean);
        if (uniqueBims.length > 0 && !uniqueBims.includes(planBimester)) {
          setPlanBimester(uniqueBims[0]);
        }
      }
    }
  }, [planSubject, subjectCategory, selectedSegment, dataSource]);

  // Update bimester filter list and selected bimester if planGrade changes under upload
  useEffect(() => {
    if (dataSource === 'upload' && planSubject && planGrade && uploadedDb[planSubject]) {
      const sheetRows = uploadedDb[planSubject];
      const filteredRows = sheetRows.slice(1).filter(r => String(r[0] || '').trim() === planGrade);
      const uniqueBims = Array.from(new Set(filteredRows.map(r => String(r[1] || '').trim()))).filter(Boolean);
      if (uniqueBims.length > 0) {
        if (!uniqueBims.includes(planBimester)) {
          setPlanBimester('4º Bimestre');
        }
      } else {
        setPlanBimester('4º Bimestre');
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
  }, [planSubject, planGrade, planBimester, dataSource, items, selectedSegment, subjectCategory]);

  const normalizeFilter = (s: any) => String(s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');

  const normalizeBimester = (b: string) => {
    const s = normalizeFilter(b).replace('bimestre', '');
    return s.replace('quarto', '4').replace('terceiro', '3').replace('segundo', '2').replace('primeiro', '1').replace('º', '');
  };

  const getImportedCurriculumData = (): CurriculumItem[] => {
    if (!planSubject || !uploadedDb[planSubject]) return [];
    const sheetData = uploadedDb[planSubject];
    return sheetData.slice(1).map((row, index) => ({
      id: `upload-${planSubject}-${index + 1}`,
      rowIdx: index + 1,
      ano: String(row[0] || '').trim(),
      bimestre: String(row[1] || '').trim(),
      aula: String(row[2] || '').trim(),
      titulo: String(row[3] || '').trim(),
      conteudo: String(row[4] || '').trim(),
      habilidade: String(row[5] || row[4] || '').trim(),
      objetivos: String(row[6] || row[5] || '').trim(),
      disciplina: planSubject
    }));
  };

  const getAvailableLessons = (): CurriculumItem[] => {
    if (!planSubject || !planGrade || !planBimester) {
      return [];
    }

    const source =
      dataSource === 'oficial'
        ? getOfficialCurriculumData()
        : getImportedCurriculumData();

    return source.filter((item) =>
      normalizeFilter(item.disciplina) ===
        normalizeFilter(planSubject) &&
      normalizeFilter(item.ano) ===
        normalizeFilter(planGrade) &&
      normalizeBimester(item.bimestre) ===
        normalizeBimester(planBimester)
    );
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
              const b4 = uniqueBims.find(b => b.includes('4') || b.toLowerCase().includes('quarto'));
              setPlanBimester('4º Bimestre');
            } else {
              setPlanBimester('4º Bimestre');
            }
          } else {
            setPlanGrade('');
            setPlanBimester('4º Bimestre');
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
          
          const normalizeFilter = (s: any) => String(s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '');
          
          const normalizeBimester = (b: string) => {
            const s = normalizeFilter(b).replace('bimestre', '');
            return s.replace('quarto', '4').replace('terceiro', '3').replace('segundo', '2').replace('primeiro', '1').replace('º', '');
          };

          activeKeys.forEach(k => {
            const id = k.split('|')[1];
            
            const allOfficialItems = [
              ...initialCurriculumData,
              ...allMappedDiversificada,
              ...cleanItinerariosEMData,
              ...allMappedTecnico
            ];

            const item = allOfficialItems.find(
              i => String(i.id) === id
            );
            
            if (item) {
              const matchesFilter =
                normalizeFilter(item.disciplina) === normalizeFilter(planSubject) &&
                normalizeFilter(item.ano) === normalizeFilter(planGrade) &&
                normalizeBimester(item.bimestre) === normalizeBimester(planBimester);

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
            const prevSkills = Array.from(new Set(accumulatedNormal.map((l: any) => l.habilidade || l.aprendizagem).filter(Boolean)));
            const prevTopics = Array.from(new Set(accumulatedNormal.map((l: any) => l.titulo || l.conteudo).filter(Boolean)));
            const primarySkill = prevSkills[prevSkills.length - 1] || `${planSubject}: Aplicação das habilidades curriculares`;
            const topicsSummary = prevTopics.slice(-2).join(' e ') || planSubject;

            enrichedLessons.push({
              num: 999,
              aula: `Atividade Verificadora ${activityCount}`,
              titulo: `Atividade Verificadora de Aprendizagem ${activityCount}: ${topicsSummary}`,
              conteudo: `Aplicação prática e resolução de problemas sobre: ${topicsSummary}.`,
              habilidade: primarySkill,
              aprendizagem: primarySkill,
              objetivos: `Analisar, resolver questões e demonstrar domínio conceitual e procedimental sobre ${topicsSummary}.`,
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
              const projectTitle = weekConf.projectDescription || `Investigação Prática e Modelagem em ${planSubject}`;
              weekLessons.push({
                num: 998,
                aula: `Atividade Diferenciada / Projeto (${weekConf.projectDates || 'Semana ' + (i + 1)})`,
                titulo: projectTitle,
                conteudo: projectTitle,
                habilidade: `${planSubject}: Investigação científica e aplicação prática dos conceitos curriculares`,
                aprendizagem: `${planSubject}: Investigação científica e aplicação prática dos conceitos curriculares`,
                objetivos: `Investigar, modelar e resolver situações-problema pertinentes a ${projectTitle}.`,
                raw: null
              });
            }

            if (weekLessons.length === 0) {
              weekLessons.push({
                num: 0,
                aula: `Atividade Curricular / Semana ${i + 1}`,
                titulo: `Aprofundamento temático de ${planSubject}`,
                conteudo: `Estudo direcionado dos objetos de conhecimento de ${planSubject} (${planGrade} - ${planBimester}).`,
                habilidade: `${planSubject}: Habilidades curriculares prioritárias do período letivo`,
                aprendizagem: `${planSubject}: Habilidades curriculares prioritárias do período letivo`,
                objetivos: `Analisar e aplicar os conceitos fundamentais de ${planSubject}.`,
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

            // Clean list of unique lesson items with their corresponding topic/knowledges without repeating codes, texts or lesson numbers
            const uniqueLessonItems: string[] = [];
            weekLessons.forEach(l => {
              const raw = l.raw || {};
              let num = String(raw.aulaNumero || l.aula || '').trim();
              let tit = (raw.tituloAula || l.titulo || '')
                .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                .trim();
              let objConhecimento = (raw.objetoConhecimento || '')
                .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                .trim();

              // Remove skill codes (e.g. EF07..., EM13...) from content
              tit = tit.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();
              objConhecimento = objConhecimento.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();

              // If title already starts with the lesson number, avoid duplicating
              if (tit.toLowerCase().startsWith(num.toLowerCase())) {
                tit = tit.slice(num.length).replace(/^[\s:\-]+/, '').trim();
              }

              let itemStr = '';
              if (
                objConhecimento &&
                objConhecimento.toLowerCase() !== tit.toLowerCase() &&
                !tit.toLowerCase().includes(objConhecimento.toLowerCase())
              ) {
                itemStr = `<strong>${num}</strong>: ${tit} <span style="color: #4b5563;">(${objConhecimento})</span>`;
              } else {
                itemStr = `<strong>${num}</strong>: ${tit}`;
              }

              const normKey = itemStr.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]/g, '');
              if (tit && !uniqueLessonItems.some(it => it.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]/g, '') === normKey)) {
                uniqueLessonItems.push(itemStr);
              }
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
              const mainTopic = weekLessons[0]?.titulo || weekLessons[0]?.conteudo || componente;
              acoesBloomHtml = `<ul><li>Analisar procedimentos técnicos e resolver situações práticas referentes a ${mainTopic}</li><li>Aplicar os conhecimentos operacionais do componente</li></ul>`;
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
              ae: "Não se aplica",
              estrategia: "C- Estudo directed;",
              acoes_bloom: "Não se aplica",
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
                conteudos: "Síntese dos conteúdos essenciais e preparação para a Prova Paulista do 3º Bimestre",
                avaliacao: "Formativa",
                ae: "Não se aplica",
                estrategia: "A- Aula expositiva com discussão pautada no material digital;",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            }

            // Week 9 (index 8) - Prova Paulista
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Aplicação da Prova Paulista do 3º Bimestre",
              avaliacao: "Formativa / Prova Paulista",
              ae: "Não se aplica",
              estrategia: "C- Estudo directed; (Aplicação de Avaliação Externa)",
              acoes_bloom: "Não se aplica",
              lessons: []
            });

            // Week 10 (index 9) - Fechamento
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Acompanhamento das aprendizagens e devolutiva pedagógica da Prova Paulista",
              avaliacao: "Formativa / Devolutiva",
              ae: "Não se aplica",
              estrategia: "C- Estudo dirigido; (Devolutiva da Prova Paulista)",
              acoes_bloom: "Não se aplica",
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
                  conteudos: "Síntese de conteúdos e preparação para a Prova Paulista",
                  avaliacao: "Formativa",
                  ae: "Não se aplica",
                  estrategia: "A- Aula expositiva com discussão pautada no material digital;",
                  acoes_bloom: "Não se aplica",
                  lessons: []
                });
              } else if (planBimester === '2º Bimestre') {
                fullWeeks.push({
                  periodo: getWeekPeriod(planBimester, 7),
                  aulas_escopo: "Não se aplica",
                  conteudos: "Aplicação da Prova Paulista do 2º Bimestre",
                  avaliacao: "Formativa / Prova Paulista",
                  ae: "Não se aplica",
                  estrategia: "C- Estudo directed; (Aplicação de Avaliação Externa)",
                  acoes_bloom: "Não se aplica",
                  lessons: []
                });
              } else {
                fullWeeks.push({
                  periodo: getWeekPeriod(planBimester, 7),
                  aulas_escopo: "Não se aplica",
                  conteudos: `Previsão SARESP (${effectiveSarespDate})`,
                  avaliacao: "Externa / SARESP",
                  ae: "Não se aplica",
                  estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
                  acoes_bloom: "Não se aplica",
                  lessons: []
                });
              }
            }

            // Week 9 (index 8) - Recovery
            if (planBimester === '1º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Feriado: Sexta-feira Santa; Recuperação de habilidades em defasagem",
                avaliacao: "Formativa",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido; (Nivelamento)",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            } else if (planBimester === '2º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Recuperação e apoio pedagógico personalizado",
                avaliacao: "Formativa",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            } else {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 8),
                aulas_escopo: "Não se aplica",
                conteudos: "Recuperação final e fechamento de conceitos pendentes",
                avaliacao: "Formativa",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            }

            // Week 10 (index 9) and Week 11 (index 10) for 4º Bimestre
            if (planBimester === '4º Bimestre') {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 9),
                aulas_escopo: "Não se aplica",
                conteudos: "Recuperação Semestral Intensiva SEDUC e fechamento de notas e frequência",
                avaliacao: "Formativa / Recuperação Semestral",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 10),
                aulas_escopo: "Não se aplica",
                conteudos: "Conselho de Classe Final, Devolutivas Pedagógicas e Encerramento do Ano Letivo",
                avaliacao: "Formativa / Conselho Final",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido; (Conselho de Classe)",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            } else {
              fullWeeks.push({
                periodo: getWeekPeriod(planBimester, 9),
                aulas_escopo: "Não se aplica",
                conteudos: "Fechamento pedagógico do bimestre",
                avaliacao: "Formativa",
                ae: "Não se aplica",
                estrategia: "C- Estudo dirigido;",
                acoes_bloom: "Não se aplica",
                lessons: []
              });
            }
          }
        } else {
          // --- STANDARD SUBJECT PLAN GENERATION (ORIGINAL LOGIC) ---
          const getFormattedSkillWithCodeAndText = (l: any): string => {
            const habCode = (l.habilidade || l.raw?.habilidade || l.raw?.habilidadeCodigo || '').trim();
            const aprText = (l.aprendizagem || l.raw?.aprendizagem || l.raw?.habilidadeTexto || '').trim();

            const cleanApr = aprText
              .replace(/sistematização\s+e\s+checagem\s+de\s+retenção\s+(dos|de)?\s*conteúdos\.?/gi, '')
              .replace(/como\s+o\s+ensino\s+(está\s+sendo|é)\s+aplicado[^\.\n;]*/gi, '')
              .trim();

            if (!habCode && !cleanApr) return '';

            // If both code and description exist
            if (habCode && cleanApr) {
              if (cleanApr.toLowerCase().includes(habCode.toLowerCase()) && cleanApr.length > habCode.length + 5) {
                return cleanApr;
              }
              if (habCode.length > 25 && habCode.toLowerCase().includes(cleanApr.toLowerCase())) {
                return habCode;
              }
              if (cleanApr.toLowerCase() !== habCode.toLowerCase()) {
                return `${habCode} - ${cleanApr}`;
              }
            }

            const baseText = habCode || cleanApr;
            // If text is only a skill code (e.g., EF09MA01, EM13CHS101), look up description in curriculum items
            const matchCode = baseText.match(/^(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})/i);
            if (matchCode) {
              const code = matchCode[1].toUpperCase();
              const rest = baseText.replace(new RegExp(`^${code}\\s*[:\\-]?\\s*`, 'i'), '').trim();
              if (!rest || rest.length < 8) {
                const foundItem = items.find(ci => 
                  ci.habilidade && (
                    ci.habilidade.toUpperCase().includes(code) || 
                    (ci.aprendizagem && ci.aprendizagem.toUpperCase().includes(code))
                  ) && ((ci.aprendizagem && ci.aprendizagem.length > 20) || (ci.habilidade && ci.habilidade.length > 20))
                );
                if (foundItem) {
                  const desc = (foundItem.aprendizagem || foundItem.habilidade)
                    .replace(new RegExp(`^${code}\\s*[:\\-]?\\s*`, 'i'), '')
                    .trim();
                  if (desc && desc.length > 5) {
                    return `${code} - ${desc}`;
                  }
                }
              } else {
                return `${code} - ${rest}`;
              }
            }

            return baseText;
          };

          const formatWeekDataForSubject = (weekLessons: any[], subjectName: string, defaultAe: string, defaultConteudos: string, defaultAcoes: string) => {
            if (!weekLessons || weekLessons.length === 0) {
              return { ae: defaultAe, conteudos: defaultConteudos, acoes: defaultAcoes };
            }

            const subjectLower = subjectName.toLowerCase();

            // Helper to build deduplicated unique lesson item strings
            const buildUniqueLessonEntries = (lessons: any[], label = 'Aula') => {
              const entries: string[] = [];
              lessons.forEach(l => {
                let tit = (l.titulo || '').replace(/^Aula\s*\d+\s*[:\-]\s*/i, '').trim();
                let aulaNum = String(l.raw?.aula || l.raw?.aulaSala || l.aula || '').replace(/^Aula\s*/i, '').trim();
                if (!aulaNum && !tit) return;
                const entry = aulaNum ? `<strong>${label} ${aulaNum}</strong>: ${tit}` : `<strong>${tit}</strong>`;
                const normKey = entry.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]/g, '');
                if (!entries.some(e => e.toLowerCase().replace(/<[^>]*>/g, '').replace(/[^a-z0-9]/g, '') === normKey)) {
                  entries.push(entry);
                }
              });
              return entries;
            };
            
            if (subjectLower.includes('projeto de vida')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const dimensao = firstRaw.dimensao || '';
              const atitude = firstRaw.atitude || '';
              const pratica = firstRaw.pratica || '';

              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              if (dimensao) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Dimensão:</strong> ${dimensao}</p>`;
              if (atitude) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Atitude:</strong> ${atitude}</p>`;
              if (pratica) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Prática:</strong> ${pratica}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.raw?.compreensao || l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('tecnologia')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const unidade = firstRaw.unidade || '';
              const formato = firstRaw.formato || '';
              const entrega = firstRaw.entrega || '';

              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              if (unidade) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Unidade Temática:</strong> ${unidade}</p>`;
              if (formato) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Formato:</strong> ${formato}</p>`;
              if (entrega) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Entrega Esperada:</strong> ${entrega}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.raw?.objetivo || l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('orientação de estudos') || subjectLower.includes('estudos')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const genero = firstRaw.genero || '';
              const eixo = firstRaw.eixo || '';
              const plataforma = firstRaw.plataforma || '';

              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              if (genero) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Gênero/Tema:</strong> ${genero}</p>`;
              if (eixo) conteudosHtml += `<p style="margin: 2pt 0 2pt 0;"><strong>Eixo Temático:</strong> ${eixo}</p>`;
              if (plataforma) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Plataforma:</strong> ${plataforma}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.raw?.objetivos || l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('finanças') || subjectLower.includes('financeira')) {
              const firstRaw = weekLessons[0]?.raw || {};
              const unidade = firstRaw.unidadeTematica || '';
              const objeto = firstRaw.objetoConhecimento || '';

              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              if (unidade) conteudosHtml += `<p style="margin: 4pt 0 2pt 0;"><strong>Unidade Temática:</strong> ${unidade}</p>`;
              if (objeto) conteudosHtml += `<p style="margin: 2pt 0 0 0;"><strong>Objeto de Conhecimento:</strong> ${objeto}</p>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.raw?.objetivos || l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('redação') || subjectLower.includes('leitura')) {
              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas da Semana:</strong><ul style="margin: 2pt 0 0 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('aprofundamento') || subjectLower.includes('itinerario') || subjectLower.includes('itinerário')) {
              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas do Aprofundamento:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;

              const uniqueAEs = Array.from(new Set(weekLessons.map(l => getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';

              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.objetivos || l.raw?.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';

              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('empreendedorismo')) {
              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas de Empreendedorismo:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.aprendizagem || getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';
              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';
              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('atualidades')) {
              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas de Atualidades:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.aprendizagem || getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';
              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';
              return { ae: aeHtml, conteudos: conteudosHtml, acoes: acoesBloomHtml };
            }

            if (subjectLower.includes('mídias digitais') || subjectLower.includes('midias digitais')) {
              const uniqueLessonsList = buildUniqueLessonEntries(weekLessons);
              let conteudosHtml = `<strong style="color: #002060;">Aulas de Arte e Mídias Digitais:</strong><ul style="margin: 2pt 0 4pt 0; padding-left: 14pt; list-style-type: disc;">` + uniqueLessonsList.map(item => `<li style="margin-bottom: 2pt;">${item}</li>`).join('') + `</ul>`;
              const uniqueAEs = Array.from(new Set(weekLessons.map(l => l.aprendizagem || getFormattedSkillWithCodeAndText(l)).filter(Boolean)));
              let aeHtml = uniqueAEs.length > 0 ? `<ul>` + uniqueAEs.map(ae => `<li style="margin-bottom: 2pt;">${ae}</li>`).join('') + `</ul>` : 'Não se aplica';
              const uniqueObjectives = Array.from(new Set(weekLessons.map(l => sanitizeTextForBloom(l.objetivos || '')).filter(Boolean)));
              let acoesBloomHtml = uniqueObjectives.length > 0 ? `<ul>` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>` : 'Não se aplica';
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
              avaliacao: "Formativa através de atividades práticas direcionadas e autoavaliação guiada.",
              ae: "<ul><li>Recuperação e síntese de habilidades críticas e conteúdos do primeiro semestre.</li></ul>",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "<ul><li>Identificar</li><li>Sintetizar</li><li>Compreender</li></ul>",
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
                const text = getFormattedSkillWithCodeAndText(l);
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
                let title = (l.titulo || '').trim();
                let content = (l.conteudo || '').trim();

                // Strip repeated "Aula X:" prefixes
                title = title.replace(/^Aula\s*\d+\s*[:\-]\s*/i, '').trim();
                content = content.replace(/^Aula\s*\d+\s*[:\-]\s*/i, '').trim();

                // Remove skill codes from content field to avoid redundancy with AE
                title = title.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();
                content = content.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();

                let displayText = '';
                if (!title && !content) {
                  return;
                } else if (!content || content.toLowerCase() === title.toLowerCase()) {
                  displayText = title;
                } else if (!title) {
                  displayText = content;
                } else {
                  const contentLower = content.toLowerCase();
                  const titleLower = title.toLowerCase();
                  if (contentLower.includes(titleLower)) {
                    displayText = content;
                  } else if (titleLower.includes(contentLower)) {
                    displayText = title;
                  } else {
                    displayText = `${title}: ${content}`;
                  }
                }

                // Strip "Atividade Verificadora" from contents
                displayText = displayText
                  .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                  .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                  .replace(/^[\s:\-]+/, '')
                  .replace(/:\s*$/, '')
                  .trim();

                const normKey = displayText.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (displayText && !uniqueContents.some(c => c.toLowerCase().replace(/[^a-z0-9]/g, '') === normKey)) {
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
                  const sanitized = sanitizeTextForBloom(line);
                  if (sanitized && !uniqueObjectives.includes(sanitized)) {
                    uniqueObjectives.push(sanitized);
                  }
                });
              });

              const primaryTopicBim3 = (uniqueContents[0] || planSubject).replace(/^[^:]*:\s*/, '').replace(/<[^>]*>/g, '').trim();

              const acoesBloomHtml = uniqueObjectives.length > 0
                ? `<ul>` + uniqueObjectives.map(obj => `<li>${obj}</li>`).join('') + `</ul>`
                : `<ul><li>Analisar conceitos e procedimentos de ${primaryTopicBim3}</li><li>Resolver situações-problema aplicando as habilidades do componente</li></ul>`;

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
                const text = getFormattedSkillWithCodeAndText(l);
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
                let title = (l.titulo || '').trim();
                let content = (l.conteudo || '').trim();

                // Strip repeated "Aula X:" prefixes
                title = title.replace(/^Aula\s*\d+\s*[:\-]\s*/i, '').trim();
                content = content.replace(/^Aula\s*\d+\s*[:\-]\s*/i, '').trim();

                // Remove skill codes from content field to avoid redundancy with AE
                title = title.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();
                content = content.replace(/\b(EF\d{2}[A-Z]{2}\d{2}|EM\d{2}[A-Z]{3}\d{3})\b\s*[:\-]?\s*/gi, '').trim();

                let displayText = '';
                if (!title && !content) {
                  return;
                } else if (!content || content.toLowerCase() === title.toLowerCase()) {
                  displayText = title;
                } else if (!title) {
                  displayText = content;
                } else {
                  const contentLower = content.toLowerCase();
                  const titleLower = title.toLowerCase();
                  if (contentLower.includes(titleLower)) {
                    displayText = content;
                  } else if (titleLower.includes(contentLower)) {
                    displayText = title;
                  } else {
                    displayText = `${title}: ${content}`;
                  }
                }

                // Strip "Atividade Verificadora" from contents
                displayText = displayText
                  .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
                  .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
                  .replace(/^[\s:\-]+/, '')
                  .replace(/:\s*$/, '')
                  .trim();

                const normKey = displayText.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (displayText && !uniqueContents.some(c => c.toLowerCase().replace(/[^a-z0-9]/g, '') === normKey)) {
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
                  const sanitized = sanitizeTextForBloom(line);
                  if (sanitized && !uniqueObjectives.includes(sanitized)) {
                    uniqueObjectives.push(sanitized);
                  }
                });
              });

              const primaryTopicNorm = (uniqueContents[0] || planSubject).replace(/^[^:]*:\s*/, '').replace(/<[^>]*>/g, '').trim();

              const acoesBloomHtml = uniqueObjectives.length > 0
                ? `<ul>` + uniqueObjectives.map(obj => `<li>${obj}</li>`).join('') + `</ul>`
                : `<ul><li>Analisar conceitos e propriedades de ${primaryTopicNorm}</li><li>Resolver problemas aplicando as habilidades curriculares</li></ul>`;

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
              conteudos: "Síntese dos conteúdos essenciais e preparação para a Prova Paulista do 3º Bimestre",
              avaliacao: "Formativa",
              ae: "Não se aplica",
              estrategia: "A- Aula expositiva com discussão pautada no material digital;",
              acoes_bloom: "Não se aplica"
            });
            // Week 9 (21 a 25/09/2026) - Prova Paulista
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Aplicação da Prova Paulista do 3º Bimestre (Período: 21 a 25/09/2026)",
              avaliacao: "Formativa / Prova Paulista",
              ae: "Não se aplica",
              estrategia: "C- Estudo dirigido; (Aplicação de Avaliação Externa)",
              acoes_bloom: "Não se aplica"
            });
            // Week 10 (28/09 a 02/10/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Fechamento de notas, conselho de classe, devolutiva da Prova Paulista e acompanhamento das aprendizagens",
              avaliacao: "Somativa / Final",
              ae: "Não se aplica",
              estrategia: "J- Rotação por estações;",
              acoes_bloom: "Não se aplica"
            });
          } else if (is4thBimestre) {
            // Week 8 (23/11 a 27/11/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 7),
              aulas_escopo: "Não se aplica",
              conteudos: `Síntese Geral e aplicação da Avaliação SARESP (Período: 23 a 27/11/2026)`,
              avaliacao: "Formativa / SARESP",
              ae: "Não se aplica",
              estrategia: "A- Aula expositiva com discussão pautada no material digital;",
              acoes_bloom: "Não se aplica"
            });
            // Week 9 (30/11 a 04/12/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Conclusão do SARESP Digital (8º ano) e Reposição do SARESP (02 e 03/12/2026)",
              avaliacao: "Formativa / Reposição",
              ae: "Não se aplica",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "Não se aplica"
            });
            // Week 10 (07/12 a 11/12/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Recuperação Semestral Intensiva SEDUC (07, 08 e 09/12/2026) e superação de defasagens pedagógicas",
              avaliacao: "Formativa / Recuperação",
              ae: "Não se aplica",
              estrategia: "J- Rotação por estações; (Recuperação Intensiva)",
              acoes_bloom: "Não se aplica"
            });
            // Week 11 (14/12 a 18/12/2026)
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 10),
              aulas_escopo: "Não se aplica",
              conteudos: "Conselho de Classe Final, Fechamento de Médias e Encerramento do Ano Letivo (18/12/2026)",
              avaliacao: "Somativa / Final",
              ae: "Não se aplica",
              estrategia: "J- Rotação por estações; (Conselho Final e Encerramento)",
              acoes_bloom: "Não se aplica"
            });
          } else {
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 7),
              aulas_escopo: "Não se aplica",
              conteudos: "Síntese Geral e aplicação da Prova Paulista",
              avaliacao: "Formativa / Prova Paulista",
              ae: "Não se aplica",
              estrategia: "A- Aula expositiva com discussão pautada no material digital;",
              acoes_bloom: "Não se aplica"
            });
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 8),
              aulas_escopo: "Não se aplica",
              conteudos: "Retomada de habilidades e conceitos com maior defasagem pedagógica",
              avaliacao: "Formativa",
              ae: "Não se aplica",
              estrategia: "C- Estudo dirigido;",
              acoes_bloom: "Não se aplica"
            });
            fullWeeksStandard.push({
              periodo: getWeekPeriod(planBimester, 9),
              aulas_escopo: "Não se aplica",
              conteudos: "Fechamento de notas, conselho de classe e acompanhamento das aprendizagens",
              avaliacao: "Somativa / Final",
              ae: "Não se aplica",
              estrategia: "J- Rotação por estações;",
              acoes_bloom: "Não se aplica"
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
      : `Conteúdos curriculares de ${planSubject} (${planGrade} - ${planBimester}).`;

    const skillsText = Array.from(new Set(previous.map((l: any) => l.habilidade || '').filter(Boolean))).join('\n') || `Habilidades oficiais de ${planSubject} (${planGrade} - ${planBimester}).`;

    const rawPromptText = `Atue como um Professor Mentor especialista do Currículo Paulista de 2026.
Preciso de uma Atividade Verificadora de Aprendizagem de alta qualidade e pronta para aplicação, focada nos conteúdos ministrados nas últimas aulas.

Aqui estão as informações do plano:
- Componente Curricular: ${planSubject}
- Ano/Série: ${planGrade}
- Bimestre: ${planBimester}

Aulas e Objetos de Conhecimento trabalhados:
${lessonsText}

Habilidades curriculares focais:
${skillsText}

DIRETRIZES OBRIGATÓRIAS DE ELABORAÇÃO:
1. NÃO faça referências a "revisão" nem inclua frases que expliquem como o ensino está sendo aplicado nos campos de Aprendizagem Essencial e Taxonomia de Bloom.
2. NÃO crie frases genéricas de modo algum. Todos os enunciados, alternativas, justificativas e habilidades devem ser específicos, técnicos e contextuais ao conteúdo.
3. Estrutura da Atividade:
   - 3 a 5 questões contextualizadas com a realidade dos alunos do ${planGrade}.
   - Questões de múltipla escolha (com 4 alternativas de A a D, justificando a alternativa correta e o erro conceitual das distratoras).
   - Questão dissertativa ou prática de resolução de problemas.
   - Roteiro de autoavaliação guiada com foco no protagonismo discente.
   - Gabarito detalhado com orientações para devolutiva pedagógica direta.

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

  return (
    <AppLayout
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
      saveStatus={isAutosaving ? 'saving' : 'saved'}
    >
      <div className={`${
        appTypography === 'space' ? 'font-space' : appTypography === 'mono' ? 'font-mono' : appTypography === 'serif' ? 'font-serif' : 'font-sans'
      } ${borderStyle === 'sharp' ? 'style-sharp' : 'style-rounded'}`}>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            
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
                    <div className="bg-amber-50/90 dark:bg-amber-950/40 p-3.5 rounded-lg border border-amber-200 dark:border-amber-800 space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <label className="block text-amber-900 dark:text-amber-200 font-bold text-xs flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                          Avaliações Externas do 4º Bimestre (SEDUC 2026)
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowCalendarDetails(!showCalendarDetails)}
                          className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          {showCalendarDetails ? 'Ocultar Calendário ▲' : 'Ver Calendário Completo ▼'}
                        </button>
                      </div>

                      {showCalendarDetails && (
                        <div className="p-3 bg-white dark:bg-slate-900 rounded border border-amber-300 dark:border-amber-700 text-[11px] text-amber-950 dark:text-amber-100 space-y-1.5 animate-fadeIn">
                          <div className="font-bold text-amber-900 dark:text-amber-200">Cronograma Completo SEDUC 2026:</div>
                          <p>&bull; <strong>Provão Paulista:</strong> 3ª EM (04 e 05/11), 2ª EM (10 e 11/11), 1ª EM (12 e 13/11).</p>
                          <p>&bull; <strong>SARESP 2026:</strong> 9º EF (29 e 30/10), 6º EF (18 e 19/11), 7º EF (26 e 27/11), 8º EF (30/11 e 01/12).</p>
                          <p>&bull; <strong>Reposição SARESP:</strong> 02 e 03/12/2026.</p>
                          <p>&bull; <strong>Recuperação Semestral:</strong> 07, 08 e 09/12/2026.</p>
                          <p>&bull; <strong>Conselho de Classe Final:</strong> 18/12/2026.</p>
                        </div>
                      )}

                      {/* Series-Specific Reminders */}
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 text-[11px] text-amber-900 dark:text-amber-100 space-y-1">
                        <p><strong>💻 Provão Paulista:</strong> 3ª EM (04-05/11), 2ª EM (10-11/11), 1ª EM (12-13/11) &mdash; <em>Aulas remotas</em>.</p>
                        <p><strong>📝 SARESP 2026:</strong> 9º EF (29-30/10), 6º EF (19/11), 7º EF (26-27/11), 8º EF (30/11-01/12), Reposição (02-03/12).</p>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-amber-900 dark:text-amber-200">
                          Data do SARESP desta Série no Plano de Aula:
                        </label>
                        <input
                          type="text"
                          value={sarespDate}
                          onChange={(e) => setSarespDate(e.target.value)}
                          placeholder="Ex: 18 e 19/11/2026 (6º ano) ou 23 e 24/11/2026 (9º ano)"
                          className="w-full px-2.5 py-1.5 border border-amber-300 dark:border-amber-700 rounded bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
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
                      {Array.from({ length: planBimester === '4º Bimestre' ? 11 : 10 }).map((_, weekIdx) => {
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
                <DocumentFrame
                  htmlContent={generatedDocHtml}
                  marginSettings={marginSettings}
                  planFormat={planFormat}
                  onOpenMargins={() => setShowMarginModal(true)}
                  onCopy={handleCopy}
                  onDownloadDoc={handleDownloadDoc}
                  onDownloadHtml={handleDownloadHtml}
                  onPrintPdf={handlePrintPdf}
                  onWeekTriggerClick={(weekIdx) => {
                    const week = generatedWeeks[weekIdx];
                    if (week) {
                      const verificadora = week.lessons?.find((l: any) => l.num === 999);
                      handleOpenGeminiPrompt(verificadora || { previousLessons: week.lessons || [] });
                    }
                  }}
                />
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
