import React, { useState, useEffect, useMemo } from 'react';
import { CurriculumItem, GradeFilter, BimestreFilter } from '../types';
import { Search, SlidersHorizontal, BookOpen, Layers, CheckCircle2, Hammer, Clock, Palette, RotateCcw, Download, Sparkles, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as XLSX from 'xlsx';
import FilterPanel, { FilterState } from './FilterPanel';
import ResultsGrid from './ResultsGrid';
import ResultCard, { CurriculumCardItem } from './ResultCard';
import DetailModal from './DetailModal';
import ToastNotification, { ToastMessage } from './ToastNotification';
import HelpSection from './HelpSection';
import Footer from './Footer';
import {
  PROJETO_DE_VIDA_DATA,
  TECNOLOGIA_INOVACAO_DATA,
  ORIENTACAO_ESTUDO_MATEMATICA_DATA,
  ORIENTACAO_ESTUDO_PORTUGUES_DATA,
  EDUCACAO_FINANCEIRA_DATA,
  REDACAO_LEITURA_DATA,
  ProjetoVidaItem,
  TecnologiaInovacaoItem,
  OrientacaoEstudoItem,
  EducacaoFinanceiraItem,
  RedacaoLeituraItem
} from '../data/diversificadaData';
import { ALL_TECNICO_DATA, mapTecnicoToCurriculum } from '../data/tecnicoData';
import { MATRIZ_SOCIOEMOCIONAL } from '../data/socioemocionalDatabase';

interface CurriculumTableProps {
  items: CurriculumItem[];
  onDeleteItem?: (id: string) => void;
  onFilteredItemsChange?: (filtered: any[], currentSubject: string, isDiversificada: boolean) => void;
}

export default function CurriculumTable({ items, onDeleteItem, onFilteredItemsChange }: CurriculumTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO'>('ENSINO FUNDAMENTAL ANOS FINAIS');
  const [subjectCategory, setSubjectCategory] = useState<'FGB' | 'DIVERSIFICADA' | 'ITINERARIOS' | 'TECNICO'>('FGB');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('Todos');

  let segment = 'Anos Finais';
  if (subjectCategory === 'DIVERSIFICADA') {
    segment = 'Parte Diversificada';
  } else if (subjectCategory === 'ITINERARIOS') {
    segment = 'Itinerários Formativos';
  } else if (subjectCategory === 'TECNICO') {
    segment = 'Ensino Técnico';
  } else if (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS') {
    segment = 'Anos Finais';
  } else {
    segment = 'Ensino Médio';
  }

  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('Todos');
  const [bimestreFilter, setBimestreFilter] = useState<BimestreFilter>('Todos');
  const [subject, setSubject] = useState<string>('Língua Portuguesa');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showSocioMatrix, setShowSocioMatrix] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_curriculum_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' | 'favorite' = 'success') => {
    const id = String(Date.now() + Math.random());
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showLocalToast = (msg: string) => {
    showToast(msg, 'success');
  };

  const toggleFavorite = (cardItem: CurriculumCardItem) => {
    setFavorites((prev) => {
      const isFav = prev.includes(cardItem.id);
      let next: string[];
      if (isFav) {
        next = prev.filter((id) => id !== cardItem.id);
        showToast('Item removido dos favoritos', 'info');
      } else {
        next = [...prev, cardItem.id];
        showToast('Item adicionado aos favoritos!', 'favorite');
      }
      try {
        localStorage.setItem('saved_curriculum_favorites', JSON.stringify(next));
      } catch (e) {
        console.error('Erro ao salvar favoritos:', e);
      }
      return next;
    });
  };

  const handleGeminiPrompt = (item: any, groupNum: number) => {
    const disciplina = item.disciplina || subject || 'Matéria';
    const ano = item.ano || 'Série';
    const bime = item.bimestre || 'Bimestre';
    const aulaNo = item.aula || (item.semana ? `Semana ${item.semana}` : 'Aula');
    
    // Extract info based on what fields the item actually has
    let titulo = item.titulo || item.tituloGps || item.tema || 'Tópico da Aula';
    let conteudoInfo = item.conteudo || item.conteudos || item.contexto || item.praticasPedagogicas || '';
    let objetivosInfo = item.objetivos || item.objetivo || item.compreensao || '';
    
    let habilidadesList: string[] = [];
    if (item.habilidade) habilidadesList.push(item.habilidade);
    if (item.habilidadeCodigo) habilidadesList.push(`${item.habilidadeCodigo}: ${item.habilidadeTexto || ''}`);
    if (item.habComputacaoCodigo && item.habComputacaoCodigo !== 'n/a') {
      habilidadesList.push(`Computação ${item.habComputacaoCodigo}: ${item.habComputacaoTexto || ''}`);
    }
    if (item.habBnccCodigo && item.habBnccCodigo !== 'n/a') {
      habilidadesList.push(`BNCC ${item.habBnccCodigo}: ${item.habBnccTexto || ''}`);
    }
    const habilidadeInfo = habilidadesList.join(' | ') || 'Habilidades do Currículo';

    let groupDescription = '';
    let groupCriteria = '';
    if (groupNum === 1) {
      groupDescription = 'Grupo 1 (Nível Básico - Lembrar / Entender)';
      groupCriteria = 'Questões de múltipla escolha diretas, focadas em conceitos-chave, definições, identificação de termos e compreensão elementar da aula. Ideais para verificar se o aluno assistiu e compreendeu os conceitos fundamentais.';
    } else if (groupNum === 2) {
      groupDescription = 'Grupo 2 (Nível Intermediário - Aplicar / Analisar)';
      groupCriteria = 'Questões contextualizadas de múltipla escolha com situações-problema do cotidiano, gráficos, tirinhas ou pequenos textos que desafiem o estudante a relacionar teorias com a prática e interpretar informações.';
    } else {
      groupDescription = 'Grupo 3 (Nível Avançado - Avaliar / Criar)';
      groupCriteria = 'Questões discursivas/dissertativas complexas que exijam reflexão crítica, argumentação bem estruturada, síntese de ideias ou solução detalhada de problemas complexos. Forneça o gabarito e a expectativa de resposta esperada para o professor.';
    }

    const promptText = `Olá, Gemini! Atuo como docente de **${disciplina}** para o **${ano}** do Ensino Básico.
Gostaria que você gerasse um banco de dados com exatamente **10 questões inéditas de nível do ${groupDescription}** baseadas rigorosamente na aula abaixo, seguindo as diretrizes do Currículo Paulista:

📌 **DADOS DA AULA:**
- **Disciplina:** ${disciplina}
- **Série / Ano:** ${ano}
- **Período:** ${bime}
- **Aula:** ${aulaNo}
- **Título / Tema da Aula:** ${titulo}

📖 **INFORMAÇÕES PEDAGÓGICAS:**
${conteudoInfo ? `- **Conteúdo / Contexto:** ${conteudoInfo}` : ''}
${objetivosInfo ? `- **Objetivos da Aula:** ${objetivosInfo}` : ''}
${habilidadeInfo ? `- **Habilidades Mobilizadas:** ${habilidadeInfo}` : ''}
${item.aprendizagem ? `- **Aprendizagem Essencial:** ${item.aprendizagem}` : ''}
${item.questoes ? `- **Questões Essenciais de Apoio:** ${item.questoes}` : ''}

🎯 **CRITÉRIOS DE FORMATAÇÃO DO PROMPT:**
1. **Foco Pedagógico:** ${groupCriteria}
2. **Formato das Questões:**
   - Para Grupos 1 e 2 (Múltipla Escolha): Cada questão deve ter 4 alternativas (A, B, C, D) e apenas uma única resposta correta.
   - Para Grupo 3 (Discursivas): Apresente o enunciado estimulante e, logo abaixo de cada questão, coloque a "Expectativa de Resposta / Critério de Correção" para auxiliar minha avaliação.
3. **Gabarito Completo no Final:** No final do documento, forneça um gabarito claro de todas as 10 questões, incluindo para cada uma delas a justificativa detalhada da resposta correta (por que a alternativa está certa e as outras erradas/incompletas).
4. **Linguagem:** Clara, acessível para estudantes do ${ano}, gramaticalmente perfeita, de acordo com a norma-padrão da Língua Portuguesa.

Por favor, gere o material completo estruturado para cópia direta!`;

    navigator.clipboard.writeText(promptText).then(() => {
      showLocalToast(`Prompt do Grupo ${groupNum} copiado! Abrindo Gemini...`);
      setTimeout(() => {
        window.open('https://gemini.google.com/', '_blank', 'noopener,noreferrer');
      }, 500);
    }).catch((err) => {
      console.error('Erro ao copiar prompt:', err);
      window.open('https://gemini.google.com/', '_blank', 'noopener,noreferrer');
    });
  };

  // Handle segment changes
  useEffect(() => {
    setGradeFilter('Todos');
    setBimestreFilter('Todos');

    let allowed: string[] = [];
    if (segment === 'Anos Finais') {
      allowed = ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte'];
    } else if (segment === 'Ensino Médio') {
      allowed = ['Matemática', 'Língua Portuguesa', 'Filosofia', 'Sociologia', 'História', 'Geografia', 'Língua Inglesa', 'Educação Física', 'Arte', 'Biologia', 'Química'];
    } else if (segment === 'Parte Diversificada') {
      if (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS') {
        allowed = ['Projeto de Vida', 'Tecnologia e Inovação', 'Orientação de Estudos - Matemática', 'Orientação de Estudos - Português'];
      } else {
        allowed = ['Projeto de Vida', 'Educação Financeira', 'Redação e Leitura'];
      }
    } else if (segment === 'Itinerários Formativos') {
      allowed = [
        'Aprofundamento em Biologia', 'Aprofundamento em Filosofia',
        'Aprofundamento em Geografia', 'Aprofundamento em Química',
        'Aprofundamento em Sociologia', 'Arte e Mídias Digitais',
        'Atualidades', 'Empreendedorismo', 'Liderança e Oratória',
        'Língua Inglesa (Aprofundamento)', 'Programação'
      ];
    } else if (segment === 'Ensino Técnico') {
      allowed = [
        'Introdução à Administração, Legislação e Pessoas',
        'Matemática Aplicada à Administração',
        'Marketing Estratégico',
        'Gestão Financeira e Contabilidade',
        'Gestão de Operações',
        'Inovação e Desenvolvimento de Negócios',
        'Comunicação Empresarial'
      ];
    }

    if (allowed.length > 0) {
      if (!allowed.includes(subject)) {
        setSubject(allowed[0]);
      }
    }
  }, [segment, selectedSegment]);

  const getSubjects = () => {
    if (segment === 'Anos Finais') {
      return ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte'];
    }
    if (segment === 'Ensino Médio') {
      return ['Matemática', 'Língua Portuguesa', 'Filosofia', 'Sociologia', 'História', 'Geografia', 'Língua Inglesa', 'Educação Física', 'Arte', 'Biologia', 'Química'];
    }
    if (segment === 'Parte Diversificada') {
      return ['Projeto de Vida', 'Tecnologia e Inovação', 'Orientação de Estudos - Matemática', 'Orientação de Estudos - Português', 'Redação e leitura', 'Educação Financeira'];
    }
    if (segment === 'Itinerários Formativos') {
      return [
        'Aprofundamento em Biologia', 'Aprofundamento em Filosofia',
        'Aprofundamento em Geografia', 'Aprofundamento em Química',
        'Aprofundamento em Sociologia', 'Arte e Mídias Digitais',
        'Atualidades', 'Empreendedorismo', 'Liderança e Oratória',
        'Língua Inglesa (Aprofundamento)', 'Programação'
      ];
    }
    if (segment === 'Ensino Técnico') {
      return [
        'Introdução à Administração, Legislação e Pessoas',
        'Matemática Aplicada à Administração',
        'Marketing Estratégico',
        'Gestão Financeira e Contabilidade',
        'Gestão de Operações',
        'Inovação e Desenvolvimento de Negócios',
        'Comunicação Empresarial'
      ];
    }
    return [
      'Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte',
      'Filosofia', 'Sociologia', 'Biologia', 'Química'
    ];
  };

  const isUnderConstruction = (() => {
    if (segment === 'Ensino Técnico') {
      return false; // Available technical curriculum data
    }
    if (segment === 'Itinerários Formativos') {
      if (subject === 'Programação') return true;
      const allowedIT = [
        'Aprofundamento em Biologia', 'Aprofundamento em Filosofia',
        'Aprofundamento em Geografia', 'Aprofundamento em Química',
        'Aprofundamento em Sociologia', 'Arte e Mídias Digitais',
        'Atualidades', 'Empreendedorismo', 'Liderança e Oratória',
        'Língua Inglesa (Aprofundamento)', 'Programação'
      ];
      if (!allowedIT.includes(subject)) return true;
      return false; // we generated dummy entries for missing ones
    }
    if (segment === 'Parte Diversificada') {
      return false; // we have rich complete databases for all subjects
    }
    
    const selectedSegmentNormalized = segment === 'Todos'
      ? (['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(gradeFilter) ? 'Anos Finais' : ['1ª Série', '2ª Série', '3ª Série'].includes(gradeFilter) ? 'Ensino Médio' : 'Todos')
      : segment;

    if (selectedSegmentNormalized === 'Anos Finais') {
      const allowedAF = ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte'];
      if (!allowedAF.includes(subject)) return true;
      if (gradeFilter !== 'Todos') {
        const hasLessons = items.some(i => (i.disciplina || 'Matemática') === subject && i.ano === gradeFilter);
        return !hasLessons;
      }
      return false;
    }

    if (selectedSegmentNormalized === 'Ensino Médio') {
      const allowedEM = ['Matemática', 'Língua Portuguesa', 'Geografia', 'Língua Inglesa', 'História', 'Arte', 'Educação Física', 'Filosofia', 'Sociologia', 'Biologia', 'Química'];
      if (!allowedEM.includes(subject)) return true;

      if (gradeFilter !== 'Todos') {
        const hasLessons = items.some(i => (i.disciplina || 'Matemática') === subject && i.ano === gradeFilter);
        return !hasLessons;
      } else {
        const hasLessons = items.some(i => (i.disciplina || 'Matemática') === subject && ['1ª Série', '2ª Série', '3ª Série'].includes(i.ano));
        return !hasLessons;
      }
    }

    const hasAnyLessons = items.some(i => (i.disciplina || 'Matemática') === subject);
    return !hasAnyLessons;
  })();

  // Retrieve correct diversified dataset
  const getDiversificadaItems = () => {
    switch (subject) {
      case 'Projeto de Vida':
        return PROJETO_DE_VIDA_DATA;
      case 'Tecnologia e Inovação':
        return TECNOLOGIA_INOVACAO_DATA;
      case 'Orientação de Estudos - Matemática':
        return ORIENTACAO_ESTUDO_MATEMATICA_DATA;
      case 'Orientação de Estudos - Português':
        return ORIENTACAO_ESTUDO_PORTUGUES_DATA;
      case 'Redação e Leitura':
      case 'Redação e leitura':
        return REDACAO_LEITURA_DATA;
      case 'Educação Financeira':
        return EDUCACAO_FINANCEIRA_DATA;
      default:
        return [];
    }
  };

  // Memoized technical dashboard calculation
  const tecnicoDashboardData = useMemo(() => {
    if (segment !== 'Ensino Técnico') return null;

    const currentLessons = ALL_TECNICO_DATA.filter(raw => raw.disciplina === subject);
    const totalLessons = currentLessons.length;
    
    // Theoretical vs Practical count
    const T_count = currentLessons.filter(l => l.chTeoricaPratica === 'T').length;
    const P_count = currentLessons.filter(l => l.chTeoricaPratica === 'P').length;
    const T_percentage = totalLessons > 0 ? Math.round((T_count / totalLessons) * 100) : 0;
    const P_percentage = totalLessons > 0 ? Math.round((P_count / totalLessons) * 100) : 0;

    // Unique competencies and skills
    const uniqueComp = Array.from(new Set(currentLessons.map(l => l.competenciaTecnica).filter(Boolean)));
    const uniqueHabTec = Array.from(new Set(currentLessons.map(l => l.habilidadesTecnicas).filter(Boolean)));
    const uniqueSocio = Array.from(new Set(currentLessons.map(l => l.competenciaSocioemocional || l.habilidadesSocioemocionais).filter(Boolean)));
    const uniqueUCs = Array.from(new Set(currentLessons.map(l => l.unidadeCurricular).filter(Boolean)));

    // Bimester distribution
    const bimestresCount = {
      '1º Bimestre': currentLessons.filter(l => l.bimestre === '1º Bimestre').length,
      '2º Bimestre': currentLessons.filter(l => l.bimestre === '2º Bimestre').length,
      '3º Bimestre': currentLessons.filter(l => l.bimestre === '3º Bimestre').length,
      '4º Bimestre': currentLessons.filter(l => l.bimestre === '4º Bimestre').length,
    };

    // Code of component and UCs
    const firstLesson = currentLessons[0];
    const compCode = firstLesson?.codigoComponente || 'C1';
    const ucCode = firstLesson?.codigoUnidade || 'U1';

    return {
      totalLessons,
      T_count,
      P_count,
      T_percentage,
      P_percentage,
      uniqueComp,
      uniqueHabTec,
      uniqueSocio,
      uniqueUCs,
      bimestresCount,
      compCode,
      ucCode
    };
  }, [segment, subject]);

  // Filter diversified items (memoized)
  const filteredDiversificadaItems = useMemo(() => {
    const rawItems = getDiversificadaItems();
    return rawItems.filter((item: any) => {
      // Exclude blank / empty items
      const hasTitle = (item.tema || item.titulo || '').trim() !== '';
      const hasContent = (item.contexto || item.conteudo || '').trim() !== '';
      if (!hasTitle && !hasContent) return false;

      const matchesGrade = gradeFilter === 'Todos' || item.ano === gradeFilter;
      const matchesBimestre = bimestreFilter === 'Todos' || item.bimestre === bimestreFilter;

      let matchesSegment = true;
      if (segment === 'Parte Diversificada') {
        if (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS') {
          matchesSegment = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(item.ano);
        } else if (selectedSegment === 'ENSINO MÉDIO') {
          matchesSegment = ['1ª Série', '2ª Série', '3ª Série'].includes(item.ano);
        }
      }

      const query = searchTerm.toLowerCase().trim();
      if (query === '') return matchesGrade && matchesBimestre && matchesSegment;

      const matchText = (val: any) => val ? String(val).toLowerCase().includes(query) : false;

      const matchesSearch =
        matchText(item.ano) ||
        matchText(item.bimestre) ||
        ('tema' in item && matchText(item.tema)) ||
        ('dimensao' in item && matchText(item.dimensao)) ||
        ('compreensao' in item && matchText(item.compreensao)) ||
        ('contexto' in item && matchText(item.contexto)) ||
        ('questoes' in item && matchText(item.questoes)) ||
        ('atitude' in item && matchText(item.atitude)) ||
        ('pratica' in item && matchText(item.pratica)) ||
        ('habilidade' in item && matchText(item.habilidade)) ||
        ('semana' in item && matchText(item.semana)) ||
        ('unidade' in item && matchText(item.unidade)) ||
        ('titulo' in item && matchText(item.titulo)) ||
        ('formato' in item && matchText(item.formato)) ||
        ('objetivo' in item && matchText(item.objetivo)) ||
        ('conteudos' in item && matchText(item.conteudos)) ||
        ('entrega' in item && matchText(item.entrega)) ||
        ('habComputacaoCodigo' in item && matchText(item.habComputacaoCodigo)) ||
        ('habComputacaoTexto' in item && matchText(item.habComputacaoTexto)) ||
        ('habTecCodigo' in item && matchText(item.habTecCodigo)) ||
        ('habTecTexto' in item && matchText(item.habTecTexto)) ||
        ('habBnccCodigo' in item && matchText(item.habBnccCodigo)) ||
        ('habBnccTexto' in item && matchText(item.habBnccTexto)) ||
        ('tituloGps' in item && matchText(item.tituloGps)) ||
        ('praticaLinguagem' in item && matchText(item.praticaLinguagem)) ||
        ('proposta' in item && matchText(item.proposta)) ||
        ('genero' in item && matchText(item.genero)) ||
        ('eixo' in item && matchText(item.eixo)) ||
        ('praticasPedagogicas' in item && matchText(item.praticasPedagogicas)) ||
        ('plataforma' in item && matchText(item.plataforma)) ||
        ('objetivos' in item && matchText(item.objetivos)) ||
        ('objetosConhecimento' in item && matchText(item.objetosConhecimento)) ||
        ('habilidadeCodigo' in item && matchText(item.habilidadeCodigo)) ||
        ('habilidadeTexto' in item && matchText(item.habilidadeTexto)) ||
        ('unidadeTematica' in item && matchText(item.unidadeTematica)) ||
        ('objetoConhecimento' in item && matchText(item.objetoConhecimento)) ||
        ('conteudo' in item && matchText(item.conteudo)) ||
        ('sugestoes' in item && item.sugestoes.some(s => matchText(s)));

      return matchesGrade && matchesBimestre && matchesSegment && matchesSearch;
    });
  }, [subject, gradeFilter, bimestreFilter, searchTerm, segment, selectedSegment]);

  // Filter Ensino Técnico items (memoized)
  const filteredTecnicoItems = useMemo(() => {
    return ALL_TECNICO_DATA.filter((raw) => {
      if (raw.disciplina !== subject) return false;
      const matchesGrade = gradeFilter === 'Todos' || raw.ano === gradeFilter;
      const matchesBimestre = bimestreFilter === 'Todos' || raw.bimestre === bimestreFilter;

      const query = searchTerm.toLowerCase().trim();
      if (query === '') return matchesGrade && matchesBimestre;

      const matchesSearch =
        raw.tituloAula.toLowerCase().includes(query) ||
        raw.unidadeCurricular.toLowerCase().includes(query) ||
        raw.temaSemana.toLowerCase().includes(query) ||
        raw.competenciaTecnica.toLowerCase().includes(query) ||
        raw.objetivosAula.toLowerCase().includes(query) ||
        raw.habilidadesTecnicas.toLowerCase().includes(query) ||
        raw.habilidadesSocioemocionais.toLowerCase().includes(query);

      return matchesGrade && matchesBimestre && matchesSearch;
    }).map(mapTecnicoToCurriculum);
  }, [subject, gradeFilter, bimestreFilter, searchTerm]);

  // Apply standard filtering logic (memoized)
  const filteredItems = useMemo(() => {
    if (segment === 'Parte Diversificada') {
      return filteredDiversificadaItems;
    }
    if (segment === 'Ensino Técnico') {
      return filteredTecnicoItems;
    }
    return items.filter((item) => {
      // Exclude blank / empty items
      const hasTitle = (item.titulo || '').trim() !== '';
      const hasContent = (item.conteudo || '').trim() !== '';
      const hasObjectives = (item.objetivos || '').trim() !== '';
      if (!hasTitle && !hasContent && !hasObjectives) return false;

      const matchesSearch =
        searchTerm.trim() === '' ||
        (item.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.conteudo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.objetivos || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.habilidade || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.aprendizagem || '').toLowerCase().includes(searchTerm.toLowerCase());

      const itemSegment = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(item.ano) ? 'Anos Finais' : 'Ensino Médio';
      const isItinerario = [
        'Aprofundamento em Biologia', 'Aprofundamento em Filosofia',
        'Aprofundamento em Geografia', 'Aprofundamento em Química',
        'Aprofundamento em Sociologia', 'Arte e Mídias Digitais',
        'Atualidades', 'Empreendedorismo', 'Liderança e Oratória',
        'Língua Inglesa (Aprofundamento)', 'Programação'
      ].includes(item.disciplina || 'Matemática');

      const isDiversificadaEM = [
        'Projeto de Vida', 'Educação Financeira', 'Redação e Leitura', 'Redação e leitura'
      ].includes(item.disciplina || 'Matemática') && itemSegment === 'Ensino Médio';

      let matchesSegment = false;
      if (segment === 'Todos') {
        matchesSegment = true; // wait, if we want to include everything
      } else if (segment === 'Itinerários Formativos') {
        matchesSegment = isItinerario;
      } else if (segment === 'Ensino Médio') {
        matchesSegment = itemSegment === 'Ensino Médio' && !isItinerario && !isDiversificadaEM;
      } else if (segment === 'Anos Finais') {
        matchesSegment = itemSegment === 'Anos Finais' && !isItinerario && !isDiversificadaEM;
      } else if (segment === 'Parte Diversificada' && selectedSegment === 'ENSINO MÉDIO') {
        matchesSegment = isDiversificadaEM;
      }

      const matchesGrade = gradeFilter === 'Todos' || item.ano === gradeFilter;
      const matchesBimestre = bimestreFilter === 'Todos' || item.bimestre === bimestreFilter;

      const itemSubject = item.disciplina || 'Matemática';
      const matchesSubject = itemSubject.toLowerCase() === subject.toLowerCase();

      return matchesSearch && matchesSegment && matchesGrade && matchesBimestre && matchesSubject;
    });
  }, [segment, filteredDiversificadaItems, items, searchTerm, gradeFilter, bimestreFilter, subject, selectedSegment]);

  const totalSubjectItems = useMemo(() => {
    if (segment === 'Parte Diversificada') {
      return filteredDiversificadaItems.length;
    }
    if (segment === 'Ensino Técnico') {
      return filteredTecnicoItems.length;
    }
    return items.filter(item => (item.disciplina || 'Matemática').toLowerCase() === subject.toLowerCase()).length;
  }, [segment, subject, items, filteredDiversificadaItems, filteredTecnicoItems]);

  useEffect(() => {
    if (onFilteredItemsChange) {
      onFilteredItemsChange(filteredItems, subject, segment === 'Parte Diversificada');
    }
  }, [filteredItems, subject, segment, onFilteredItemsChange]);

  // Clear selected item detail view on subject or filter changes to avoid stale or incorrect details
  useEffect(() => {
    setSelectedItem(null);
  }, [subject, segment, gradeFilter, bimestreFilter, searchTerm]);

  // Handle spreadsheet download for active filtered items
  const handleDownloadFilteredExcel = () => {
    try {
      let headers: string[] = [];
      let rows: any[][] = [];

      if (segment === 'Parte Diversificada') {
        if (subject === 'Projeto de Vida') {
          headers = ['Ano/Série', 'Bimestre', 'Aula', 'Dimensão', 'Atitude', 'Tema', 'Contexto', 'Habilidade', 'Prática', 'Questões Essenciais'];
          rows = filteredItems.map((item: any) => [
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
          rows = filteredItems.map((item: any) => [
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
          rows = filteredItems.map((item: any) => [
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
          rows = filteredItems.map((item: any) => [
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
          rows = filteredItems.map((item: any) => [
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
          rows = filteredItems.map((item: any) => [
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
        rows = filteredItems.map((item: any) => [
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
      XLSX.utils.book_append_sheet(wb, ws, 'Currículo Filtrado');

      const fileName = `curriculo_filtrado_${subject.toLowerCase().replace(/[^a-z0-9]/g, '_')}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (err) {
      console.error('Erro ao gerar planilha filtrada:', err);
    }
  };

  // Custom table layout for each diversified subject
  const renderDiversificadaTable = () => {
    if (filteredDiversificadaItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 bg-white">
          <BookOpen className="h-10 w-10 text-gray-300 stroke-[1.5] mx-auto mb-2" />
          <p className="font-semibold text-gray-700">Nenhum dado encontrado</p>
          <p className="text-xs text-gray-400">Tente ajustar seus termos de busca ou filtros.</p>
        </div>
      );
    }

    if (subject === 'Projeto de Vida') {
      return (
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-purple-50 border-b border-purple-200 text-xs font-black text-purple-800 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-32">Série / Bimestre</th>
              <th className="px-4 py-3.5 w-16 text-center">Aula</th>
              <th className="px-5 py-3.5 w-52">Dimensão / Atitude</th>
              <th className="px-5 py-3.5 w-64">Contexto da Aula</th>
              <th className="px-5 py-3.5 w-52">Habilidade & Prática</th>
              <th className="px-5 py-3.5 w-64">Questões Essenciais</th>
              <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {filteredDiversificadaItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-purple-50/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                  {item.aula}
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <div className="font-bold text-gray-800 text-xs uppercase tracking-wider">{item.dimensao}</div>
                    <div className="text-xs text-purple-600 font-semibold">{item.atitude}</div>
                  </div>
                </td>
                <td className="px-5 py-4 align-top">
                  <div className="text-xs text-gray-700 leading-relaxed font-medium line-clamp-3">{item.contexto}</div>
                  <div className="text-[10px] text-gray-400 mt-1.5 italic line-clamp-2">Tema: {item.tema}</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-100 mb-1">
                    {item.habilidade.split(' ')[0]}
                  </span>
                  <div className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">{item.habilidade.replace(/^[A-Z0-9\.]+\s+/, '')}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Prática: {item.pratica}</div>
                </td>
                <td className="px-5 py-4 align-top text-xs text-purple-900/80 font-medium max-w-xs leading-relaxed">
                  <div className="line-clamp-4 whitespace-pre-line">{item.questoes}</div>
                </td>
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-purple-500 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-extrabold px-2 py-1 rounded border border-purple-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-2 py-1 rounded border border-indigo-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-pink-50 hover:bg-pink-100 text-pink-700 text-[10px] font-extrabold px-2 py-1 rounded border border-pink-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (subject === 'Tecnologia e Inovação') {
      return (
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-sky-50 border-b border-sky-200 text-xs font-black text-sky-800 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-32">Série / Bimestre</th>
              <th className="px-4 py-3.5 w-24 text-center">Semana / Aula</th>
              <th className="px-5 py-3.5 w-64">Unidade / Título</th>
              <th className="px-5 py-3.5 w-72">Objetivos da Aula</th>
              <th className="px-5 py-3.5 w-52">Conteúdos / Entrega</th>
              <th className="px-5 py-3.5 w-52">Habilidades (Computação & BNCC)</th>
              <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {filteredDiversificadaItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-sky-50/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center align-top space-y-1">
                  <div className="text-xs font-bold text-gray-400">{item.semana}</div>
                  <div className="text-xs font-mono text-sky-700 bg-sky-50 rounded px-1.5 py-0.5 inline-block border border-sky-100 font-bold">
                    U{item.aulaUnidade} • S{item.aulaSala}
                  </div>
                </td>
                <td className="px-5 py-4 align-top space-y-1">
                  <div className="font-bold text-gray-800 leading-snug">{item.titulo}</div>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                    {item.formato}
                  </span>
                  <div className="text-[10px] text-gray-400 italic line-clamp-1">{item.unidade}</div>
                </td>
                <td className="px-5 py-4 align-top text-xs text-gray-600 leading-relaxed">
                  <div className="line-clamp-4 whitespace-pre-line">{item.objetivo}</div>
                </td>
                <td className="px-5 py-4 align-top space-y-2 text-xs text-gray-600">
                  <div className="line-clamp-3 leading-relaxed">{item.conteudos}</div>
                  {item.entrega && item.entrega !== 'n/a' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded">
                      ⚠️ Entrega de Projeto
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 align-top space-y-2">
                  {item.habComputacaoCodigo && item.habComputacaoCodigo !== 'n/a' && (
                    <div>
                      <div className="text-[10px] font-bold text-sky-700">Computação: {item.habComputacaoCodigo}</div>
                      <div className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{item.habComputacaoTexto}</div>
                    </div>
                  )}
                  {item.habBnccCodigo && item.habBnccCodigo !== 'n/a' && (
                    <div>
                      <div className="text-[10px] font-bold text-emerald-700">BNCC: {item.habBnccCodigo}</div>
                      <div className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{item.habBnccTexto}</div>
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-sky-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-sky-50 hover:bg-sky-100 text-sky-700 text-[10px] font-extrabold px-2 py-1 rounded border border-sky-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-1 rounded border border-blue-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2 py-1 rounded border border-amber-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (subject === 'Orientação de Estudos - Matemática' || subject === 'Orientação de Estudos - Português') {
      return (
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-rose-50 border-b border-rose-200 text-xs font-black text-rose-800 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-32">Série / Bimestre</th>
              <th className="px-4 py-3.5 w-24 text-center">Semana / Aula</th>
              <th className="px-5 py-3.5 w-64">GPS / Gênero</th>
              <th className="px-5 py-3.5 w-72">Práticas / Plataforma</th>
              <th className="px-5 py-3.5 w-72">Objetivos / Conhecimento</th>
              <th className="px-5 py-3.5 w-52">Indicações Literárias</th>
              <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {filteredDiversificadaItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-rose-50/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center align-top space-y-1">
                  <div className="text-xs font-bold text-gray-400">{item.semana}</div>
                  <div className="text-xs font-mono text-rose-700 bg-rose-50 rounded px-1.5 py-0.5 inline-block border border-rose-100 font-bold">
                    Aula {item.aula}
                  </div>
                </td>
                <td className="px-5 py-4 align-top space-y-1.5">
                  <div className="font-bold text-gray-800 leading-snug line-clamp-2">{item.tituloGps}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
                      {item.genero}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-gray-50 text-gray-500 border border-gray-100">
                      {item.praticaLinguagem}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 line-clamp-1">{item.eixo}</div>
                </td>
                <td className="px-5 py-4 align-top space-y-2 text-xs text-gray-600">
                  <div className="line-clamp-4 leading-relaxed">{item.praticasPedagogicas}</div>
                  {item.plataforma && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      Plataforma: {item.plataforma}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 align-top space-y-1.5 text-xs text-gray-600">
                  <div className="line-clamp-3 leading-relaxed font-medium text-gray-800">{item.objetivos}</div>
                  <div className="text-[10px] text-gray-400 leading-normal line-clamp-2">Obj. Conhecimento: {item.objetosConhecimento}</div>
                </td>
                <td className="px-5 py-4 align-top space-y-1">
                  <span className="block text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">Obras Adotadas</span>
                  <div className="space-y-1">
                    {item.sugestoes.map((sug: string, idx: number) => (
                      <div key={idx} className="text-xs text-gray-700 bg-rose-50/20 px-2 py-1 rounded border border-rose-100/10 line-clamp-1">
                        📖 {sug}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-rose-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-extrabold px-2 py-1 rounded border border-rose-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-2 py-1 rounded border border-indigo-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-pink-50 hover:bg-pink-100 text-pink-700 text-[10px] font-extrabold px-2 py-1 rounded border border-pink-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (subject === 'Redação e leitura' || subject === 'Redação e Leitura') {
      return (
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-teal-50 border-b border-teal-200 text-xs font-black text-teal-800 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-32">Série / Bimestre</th>
              <th className="px-4 py-3.5 w-24 text-center">Aula</th>
              <th className="px-5 py-3.5 w-64">Título</th>
              <th className="px-5 py-3.5 w-72">Conteúdos</th>
              <th className="px-5 py-3.5 w-72">Objetivos</th>
              <th className="px-5 py-3.5 w-52">Habilidade & Aprendizagem</th>
              <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {filteredDiversificadaItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-teal-50/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                  {item.aula}
                </td>
                <td className="px-5 py-4 align-top font-semibold text-gray-800 leading-snug">
                  {item.titulo}
                </td>
                <td className="px-5 py-4 align-top text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.conteudo}
                </td>
                <td className="px-5 py-4 align-top text-xs text-gray-600 leading-relaxed">
                  {item.objetivos}
                </td>
                <td className="px-5 py-4 align-top space-y-1">
                  <div className="text-xs font-semibold text-teal-700">{item.habilidade}</div>
                  <div className="text-[10px] text-gray-400 leading-relaxed">{item.aprendizagem}</div>
                </td>
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-[10px] font-extrabold px-2 py-1 rounded border border-teal-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-1 rounded border border-blue-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2 py-1 rounded border border-amber-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (subject === 'Educação Financeira') {
      return (
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="bg-amber-50 border-b border-amber-200 text-xs font-black text-amber-800 uppercase tracking-wider">
              <th className="px-5 py-3.5 w-32">Série / Bimestre</th>
              <th className="px-4 py-3.5 w-16 text-center">Aula</th>
              <th className="px-5 py-3.5 w-64">Unidade / Objeto</th>
              <th className="px-5 py-3.5 w-64">Título da Aula</th>
              <th className="px-5 py-3.5 w-72">Objetivos de Aprendizagem</th>
              <th className="px-5 py-3.5 w-64">Habilidade</th>
              <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
            {filteredDiversificadaItems.map((item: any) => (
              <tr
                key={item.id}
                className="hover:bg-amber-50/20 transition-colors cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                  {item.aula}
                </td>
                <td className="px-5 py-4 align-top space-y-1">
                  <div className="font-bold text-gray-800 text-xs uppercase tracking-wider">{item.unidadeTematica}</div>
                  <div className="text-xs text-gray-400 italic leading-snug">{item.objetoConhecimento}</div>
                </td>
                <td className="px-5 py-4 align-top space-y-1">
                  <div className="font-bold text-gray-800 leading-snug">{item.titulo}</div>
                  <div className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">{item.conteudo}</div>
                </td>
                <td className="px-5 py-4 align-top text-xs text-gray-600 leading-relaxed max-w-xs">
                  <div className="line-clamp-4 whitespace-pre-line">{item.objetivos}</div>
                </td>
                <td className="px-5 py-4 align-top">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-100 mb-1">
                    {item.habilidadeCodigo}
                  </span>
                  <div className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">{item.habilidadeTexto}</div>
                </td>
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2 py-1 rounded border border-amber-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2 py-1 rounded border border-orange-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-1 rounded border border-red-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  // Custom table layout for Itinerários Formativos (with distinct columns and parameters)
  const renderItinerariosTable = () => {
    if (filteredItems.length === 0) {
      return (
        <div className="text-center py-12 text-gray-400 bg-white">
          <BookOpen className="h-10 w-10 text-gray-300 stroke-[1.5] mx-auto mb-2" />
          <p className="font-semibold text-gray-700">Nenhum itinerário encontrado</p>
          <p className="text-xs text-gray-400">Tente ajustar seus termos de busca ou filtros.</p>
        </div>
      );
    }

    return (
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr className="bg-teal-50 border-b border-teal-200 text-xs font-black text-teal-800 uppercase tracking-wider">
            <th className="px-5 py-3.5 w-32 relative">Série / Bimestre</th>
            <th className="px-4 py-3.5 w-16 text-center">Aula</th>
            <th className="px-5 py-3.5 w-64">Título da Atividade / Tema</th>
            <th className="px-5 py-3.5 w-64">Eixo Estruturante & Unidade Temática</th>
            <th className="px-5 py-3.5 w-64">Objetivos e Habilidades</th>
            <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
            <th className="px-5 py-3.5 w-36 text-center">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
          {filteredItems.map((item: any) => {
            const hasContent = item.titulo && item.titulo.trim() !== '';
            return (
              <tr
                key={item.id}
                className={`hover:bg-teal-50/20 transition-colors cursor-pointer group ${!hasContent ? 'opacity-85' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                {/* Serie & Bimestre */}
                <td className="px-5 py-4 align-top">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700 border border-teal-150">
                      {item.ano}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                  </div>
                </td>

                {/* Lesson No */}
                <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                  {item.aula}
                </td>

                {/* Title / Content */}
                <td className="px-5 py-4 align-top">
                  {hasContent ? (
                    <div className="space-y-1">
                      <div className="font-bold text-gray-800 group-hover:text-teal-700 transition leading-snug">
                        {item.titulo}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{item.conteudo}</div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-medium text-gray-400 italic">Planejamento aberto</div>
                      <div className="text-[11px] text-gray-450 leading-relaxed bg-gray-50 p-2 rounded border border-gray-100 border-dashed">
                        Conteúdo aberto para personalização pelo docente com IA.
                      </div>
                    </div>
                  )}
                </td>

                {/* Structural Axes / Unit */}
                <td className="px-5 py-4 align-top space-y-1">
                  {item.eixo ? (
                    <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">{item.eixo}</div>
                  ) : (
                    <div className="text-xs font-semibold text-gray-400 italic">Eixos Integrados NEM</div>
                  )}
                  {item.unidadeTematica ? (
                    <div className="text-xs text-gray-600 font-medium">{item.unidadeTematica}</div>
                  ) : (
                    <div className="text-[11px] text-gray-400 leading-normal">Unidades curriculares de aprofundamento de {subject}</div>
                  )}
                </td>

                {/* Objectives / Skills */}
                <td className="px-5 py-4 align-top space-y-2">
                  {item.objetivos ? (
                    <div className="text-xs text-gray-600 line-clamp-3 leading-relaxed">{item.objetivos}</div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">Pronto para gerar objetivos</div>
                  )}
                  {item.habilidade ? (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {(item.habilidade || '').split(/[\s,]+/).filter(Boolean).map((hab: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-100">
                          {hab}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500 border border-gray-200 uppercase">
                        Habilidades BNCC
                      </span>
                    </div>
                  )}
                </td>

                {/* Gemini IA Column */}
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                    <div className="flex gap-1 justify-center">
                      <button
                        onClick={() => handleGeminiPrompt(item, 1)}
                        className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-[10px] font-extrabold px-2 py-1 rounded border border-teal-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 1 (Básico)"
                      >
                        G1
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 2)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-1 rounded border border-blue-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 2 (Intermediário)"
                      >
                        G2
                      </button>
                      <button
                        onClick={() => handleGeminiPrompt(item, 3)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2 py-1 rounded border border-amber-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                        title="Grupo 3 (Avançado)"
                      >
                        G3
                      </button>
                    </div>
                  </div>
                </td>

                {/* Action Column */}
                <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded transition shadow-xs cursor-pointer ${
                      hasContent
                        ? 'bg-teal-500 hover:bg-teal-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {hasContent ? 'Visualizar' : 'Planejar Aula'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  // Custom detailed view inside the modal for Itinerários Formativos
  const renderItinerariosDetails = () => {
    if (!selectedItem) return null;
    const hasContent = selectedItem.titulo && selectedItem.titulo.trim() !== '';

    return (
      <div className="space-y-6 text-left">
        {/* Title */}
        <div>
          <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100 mb-2">
            Itinerário: {selectedItem.disciplina}
          </span>
          <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
            Título da Atividade / Tema
          </h4>
          <p className="text-gray-800 font-bold text-base bg-teal-50/10 p-4 rounded border border-teal-100 leading-relaxed">
            {hasContent ? selectedItem.titulo : `Aula ${selectedItem.aula}: Planejamento de Itinerário Formativo`}
          </p>
        </div>

        {/* Eixo Estruturante & Unidade Temática */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eixo Estruturante</h4>
            <p className="text-teal-700 font-bold text-xs bg-teal-50/50 p-2.5 rounded border border-teal-100">
              {selectedItem.eixo || "Investigação Científica, Processos Criativos e Empreendedorismo"}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Unidade Temática</h4>
            <p className="text-gray-700 font-semibold text-xs bg-gray-50 p-2.5 rounded border border-gray-200">
              {selectedItem.unidadeTematica || `Aprofundamento de competências da área do conhecimento`}
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Conteúdo Programático / Proposta
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line">
            {hasContent ? selectedItem.conteudo : `O conteúdo desta aula de aprofundamento curricular está focado na aplicação prática e desenvolvimento de competências integradas. Você pode usar o Gerador de Planos para desenhar esta aula de forma dinâmica e interativa.`}
          </p>
        </div>

        {/* Objectives */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Objetivos de Aprendizagem sugeridos
          </h4>
          <div className="bg-gray-50 p-4 rounded border border-gray-100 text-sm text-gray-650 leading-relaxed whitespace-pre-line space-y-2">
            {hasContent ? selectedItem.objetivos : `1. Fomentar o pensamento crítico e a resolução de problemas reais de forma autônoma.\n2. Articular os saberes da área do conhecimento com demandas sociais e contemporâneas.\n3. Desenvolver o protagonismo juvenil através de dinâmicas ativas de aprendizagem.`}
          </div>
        </div>

        {/* Habilidade */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            Habilidades Requeridas
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedItem.habilidade ? (
              selectedItem.habilidade.split(/[\s,]+/).filter(Boolean).map((hab: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-teal-50 text-teal-700 border border-teal-100"
                >
                  {hab}
                </span>
              ))
            ) : (
              ['EMIFCG01', 'EMIFCG04', 'EMIFCG07'].map((hab: string, idx: number) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-gray-100 text-gray-600 border border-gray-200"
                >
                  {hab}
                </span>
              ))
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">Habilidades gerais de Itinerários Formativos integrados da BNCC (Formação Integral).</p>
        </div>
      </div>
    );
  };

  // Custom detailed view inside the modal for diversified items
  const renderDiversificadaDetails = () => {
    if (!selectedItem) return null;

    if (subject === 'Projeto de Vida') {
      const item = selectedItem as ProjetoVidaItem;
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Eixo Temático / Projeto</h4>
            <p className="text-gray-800 font-bold text-base bg-purple-50/30 p-4 rounded border border-purple-100 leading-relaxed">
              {item.tema}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dimensão Pedagógica</h4>
              <p className="text-gray-800 font-semibold text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
                {item.dimensao}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Atitude Priorizada</h4>
              <p className="text-purple-700 font-bold text-sm bg-purple-50/50 p-2.5 rounded border border-purple-100/50">
                {item.atitude}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Compreensão Desejada</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
              {item.compreensao}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contexto da Aula</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
              {item.contexto}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Questões Essenciais</h4>
            <div className="bg-purple-50/30 p-4 rounded border border-purple-100 text-sm text-purple-900 font-semibold whitespace-pre-line leading-relaxed">
              {item.questoes}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Prática Própria</h4>
              <p className="text-gray-700 font-semibold text-xs bg-gray-50 p-2.5 rounded border border-gray-100">
                {item.pratica}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Habilidade Relacionada</h4>
              <div className="bg-purple-50/40 p-2.5 rounded border border-purple-100/40">
                <span className="inline-block px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[10px] mb-1">
                  {item.habilidade.split(' ')[0]}
                </span>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {item.habilidade.replace(/^[A-Z0-9\.]+\s+/, '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (subject === 'Tecnologia e Inovação') {
      const item = selectedItem as TecnologiaInovacaoItem;
      return (
        <div className="space-y-6">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100 mb-2">
              Unidade: {item.unidade}
            </span>
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Título da Atividade</h4>
            <p className="text-gray-800 font-bold text-base bg-sky-50/30 p-4 rounded border border-sky-100 leading-relaxed">
              {item.titulo}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Formato de Aplicação</h4>
              <p className="text-gray-800 font-semibold text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
                {item.formato}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Entrega Solicitada</h4>
              <p className={`font-bold text-sm p-2.5 rounded border ${
                item.entrega && item.entrega !== 'n/a'
                  ? 'bg-amber-50 text-amber-700 border-amber-100'
                  : 'bg-gray-50 text-gray-500 border-gray-100'
              }`}>
                {item.entrega && item.entrega !== 'n/a' ? `⚠️ ${item.entrega}` : 'Não requer entrega obrigatória'}
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objetivo de Aprendizagem</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line">
              {item.objetivo}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Conteúdos Abordados</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
              {item.conteudos}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Habilidades Vinculadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.habComputacaoCodigo && item.habComputacaoCodigo !== 'n/a' && (
                <div className="bg-sky-50/40 p-3 rounded border border-sky-100/40">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-mono font-bold text-[10px] mb-1.5">
                    {item.habComputacaoCodigo}
                  </span>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.habComputacaoTexto}</p>
                </div>
              )}
              {item.habBnccCodigo && item.habBnccCodigo !== 'n/a' && (
                <div className="bg-emerald-50/40 p-3 rounded border border-emerald-100/40">
                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] mb-1.5">
                    {item.habBnccCodigo}
                  </span>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.habBnccTexto}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (subject === 'Orientação de Estudos - Matemática' || subject === 'Orientação de Estudos - Português') {
      const item = selectedItem as OrientacaoEstudoItem;
      return (
        <div className="space-y-6">
          <div>
            <div className="flex gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                Gênero: {item.genero}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                Prática: {item.praticaLinguagem}
              </span>
            </div>
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">GPS da Semana / Roteiro</h4>
            <p className="text-gray-800 font-bold text-base bg-rose-50/30 p-4 rounded border border-rose-100 leading-relaxed">
              {item.tituloGps}
            </p>
            <div className="text-xs text-gray-400 italic mt-1">Eixo: {item.eixo} (Proposta {item.proposta})</div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objetivos</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line">
              {item.objetivos}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Práticas Pedagógicas</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line font-medium text-gray-700">
              {item.praticasPedagogicas}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Plataforma Educacional</h4>
              <p className="text-gray-800 font-semibold text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
                {item.plataforma ? item.plataforma : 'Não aplicável'}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objetos de Conhecimento</h4>
              <p className="text-gray-600 text-xs bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed">
                {item.objetosConhecimento}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">Indicações Literárias Adotadas</h4>
              <div className="space-y-1.5">
                {item.sugestoes.map((sug, idx) => (
                  <div key={idx} className="text-xs text-rose-900 bg-rose-50/30 px-3 py-1.5 rounded border border-rose-100/30 font-medium">
                    📖 {sug}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Habilidade Requerida</h4>
              <div className="bg-rose-50/40 p-3 rounded border border-rose-100/40">
                <span className="inline-block px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold text-[10px] mb-1">
                  {item.habilidadeCodigo}
                </span>
                <p className="text-gray-600 text-[11px] leading-relaxed">{item.habilidadeTexto}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (subject === 'Redação e leitura' || subject === 'Redação e Leitura') {
      const item = selectedItem as RedacaoLeituraItem;
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">Título da Atividade</h4>
            <p className="text-gray-800 font-bold text-base bg-teal-50/30 p-4 rounded border border-teal-100 leading-relaxed">
              {item.titulo}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Conteúdos</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line">
              {item.conteudo}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objetivos</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line font-medium text-gray-700">
              {item.objetivos}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Habilidade</h4>
              <p className="text-gray-600 text-xs bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed font-semibold">
                {item.habilidade}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Aprendizagem Foco</h4>
              <p className="text-gray-600 text-xs bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed">
                {item.aprendizagem}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (subject === 'Educação Financeira') {
      const item = selectedItem as EducacaoFinanceiraItem;
      return (
        <div className="space-y-6">
          <div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 mb-2">
              Unidade Temática: {item.unidadeTematica}
            </span>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Título da Aula</h4>
            <p className="text-gray-800 font-bold text-base bg-amber-50/30 p-4 rounded border border-amber-100 leading-relaxed">
              {item.titulo}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objeto do Conhecimento</h4>
            <p className="text-gray-800 font-semibold text-sm bg-gray-50 p-2.5 rounded border border-gray-100">
              {item.objetoConhecimento}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Conteúdos</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
              {item.conteudo}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Objetivos da Aula</h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100 whitespace-pre-line">
              {item.objetivos}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Habilidade Envolvida</h4>
            <div className="bg-amber-50/30 p-4 rounded border border-amber-100">
              <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-[10px] mb-1.5">
                {item.habilidadeCodigo}
              </span>
              <p className="text-gray-700 text-xs leading-relaxed">{item.habilidadeTexto}</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="bg-white rounded border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
            Filtros do Currículo
          </h2>
          <div className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
            {isUnderConstruction ? 'Página em Construção' : `Mostrando ${filteredItems.length} de ${totalSubjectItems} Aulas`}
          </div>
        </div>

        {/* Segment selector buttons */}
        <div className="flex flex-col gap-3 border-b border-gray-100 pb-4">
          <div className="flex bg-slate-200/90 p-1.5 rounded-xl w-fit border border-slate-300" translate="no" lang="pt-BR">
            <button
              onClick={() => {
                setSelectedSegment('ENSINO FUNDAMENTAL ANOS FINAIS');
                if (subjectCategory === 'ITINERARIOS') setSubjectCategory('FGB');
              }}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
              }`}
            >
              Ensino Fundamental (Anos Finais)
            </button>
            <button
              onClick={() => setSelectedSegment('ENSINO MÉDIO')}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                selectedSegment === 'ENSINO MÉDIO'
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
              }`}
            >
              Ensino Médio
            </button>
          </div>

          <div className="flex bg-slate-200/90 p-1.5 rounded-xl w-fit border border-slate-300" translate="no" lang="pt-BR">
            <button
              onClick={() => setSubjectCategory('FGB')}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                subjectCategory === 'FGB'
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
              }`}
            >
              Formação Geral Básica
            </button>
            <button
              onClick={() => setSubjectCategory('DIVERSIFICADA')}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                subjectCategory === 'DIVERSIFICADA'
                  ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
              }`}
            >
              Parte Diversificada
            </button>
            {selectedSegment === 'ENSINO MÉDIO' && (
              <>
                <button
                  onClick={() => setSubjectCategory('ITINERARIOS')}
                  className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                    subjectCategory === 'ITINERARIOS'
                      ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
                  }`}
                >
                  Itinerários Formativos
                </button>
                <button
                  onClick={() => setSubjectCategory('TECNICO')}
                  className={`px-4 py-2 text-xs font-black rounded-lg transition-all duration-150 cursor-pointer ${
                    subjectCategory === 'TECNICO'
                      ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500 border border-emerald-900 scale-[1.02]'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/80 font-bold'
                  }`}
                >
                  Ensino Técnico
                </button>
              </>
            )}
          </div>
        </div>

        {/* Disciplinas selector abas */}
        <div className="space-y-2 border-b border-gray-100 pb-4" translate="no" lang="pt-BR">
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            {segment === 'Parte Diversificada' ? 'Componentes do Programa Inova Educação' : `Disciplinas (${getSubjects().length})`}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {getSubjects().length === 0 ? (
              <span className="text-xs text-gray-400 italic">Nenhuma disciplina cadastrada para este segmento.</span>
            ) : (
              getSubjects().map((sub) => {
                const active = subject === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSubject(sub)}
                    className={`px-3.5 py-1.5 text-xs font-black rounded-full transition-all duration-150 border cursor-pointer ${
                      active
                        ? 'bg-emerald-700 text-white border-emerald-900 shadow-md ring-2 ring-emerald-400 scale-[1.03]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 font-bold'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar título, conteúdo, habilidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            />
          </div>

          {/* Grade selection */}
          <div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value as GradeFilter)}
              className="block w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            >
              {segment === 'Todos' && (
                <>
                  <option value="Todos">Todos os Anos / Séries</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
              {segment === 'Anos Finais' && (
                <>
                  <option value="Todos">Todos os Anos Finais</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                </>
              )}
              {segment === 'Ensino Médio' && (
                <>
                  <option value="Todos">Todo o Ensino Médio</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
              {segment === 'Parte Diversificada' && (
                <>
                  <option value="Todos">Todas as Séries / Anos</option>
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
                </>
              )}
              {segment === 'Itinerários Formativos' && (
                <>
                  <option value="Todos">Todas as Séries / Módulos</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
              {segment === 'Ensino Técnico' && (
                <>
                  <option value="Todos">Todas as Séries (Técnico)</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
            </select>
          </div>

          {/* Term selection */}
          <div>
            <select
              value={bimestreFilter}
              onChange={(e) => setBimestreFilter(e.target.value as BimestreFilter)}
              className="block w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            >
              <option value="Todos">Todos os Bimestres</option>
              <option value="1º Bimestre">1º Bimestre</option>
              <option value="2º Bimestre">2º Bimestre</option>
              <option value="3º Bimestre">3º Bimestre</option>
              <option value="4º Bimestre">4º Bimestre</option>
            </select>
          </div>

        </div>

        {/* Action bar at the bottom of filters card */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div>
            {(searchTerm !== '' || gradeFilter !== 'Todos' || bimestreFilter !== 'Todos' || subjectCategory !== 'FGB' || selectedSegment !== 'ENSINO FUNDAMENTAL ANOS FINAIS' || subject !== 'Língua Portuguesa') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSegment('ENSINO FUNDAMENTAL ANOS FINAIS');
                  setSubjectCategory('FGB');
                  setGradeFilter('Todos');
                  setBimestreFilter('Todos');
                  setSubject('Língua Portuguesa');
                }}
                className="text-xs text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1.5 transition cursor-pointer hover:underline"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Limpar todos os filtros
              </button>
            )}
          </div>

          <button
            onClick={handleDownloadFilteredExcel}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white rounded shadow-sm transition hover:scale-[1.01] cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" />
            Baixar Planilha Filtrada (.xlsx)
          </button>
        </div>
      </div>

      {/* Technical Subject Dashboard */}
      {segment === 'Ensino Técnico' && tecnicoDashboardData && (
        <div className="bg-emerald-50/40 rounded-lg border border-emerald-200/80 p-5 shadow-xs text-left mb-6">
          <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-800 shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                Painel Analítico de Matriz Curricular – Ensino Técnico
                <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {subject}
                </span>
              </h3>
              <p className="text-xs text-emerald-800/80 mt-0.5">
                Indicadores e carga horária integrada para o componente curricular técnico do Ensino Médio Técnico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* COLUMN 1: Key Metrics */}
            <div className="space-y-3">
              <span className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Indicadores Gerais</span>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white p-3 rounded border border-emerald-100 shadow-xs">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total de Aulas</div>
                  <div className="text-xl font-black text-slate-800 mt-1">{tecnicoDashboardData.totalLessons}</div>
                  <div className="text-[9px] text-slate-400 font-medium leading-none mt-1">
                    Carga Horária: {tecnicoDashboardData.totalLessons * 45} min
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-emerald-100 shadow-xs">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Módulos (UCs)</div>
                  <div className="text-xl font-black text-emerald-700 mt-1">{tecnicoDashboardData.uniqueUCs.length}</div>
                  <div className="text-[9px] text-slate-400 font-medium leading-none mt-1 truncate">
                    Cod: {tecnicoDashboardData.ucCode}
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-emerald-100 shadow-xs">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Competências</div>
                  <div className="text-xl font-black text-slate-800 mt-1">{tecnicoDashboardData.uniqueComp.length}</div>
                  <div className="text-[9px] text-slate-400 font-medium leading-none mt-1">
                    Garantia de Qualidade
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-emerald-100 shadow-xs">
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Hab. Socioemocionais</div>
                  <div className="text-xl font-black text-emerald-700 mt-1">{tecnicoDashboardData.uniqueSocio.length}</div>
                  <div className="text-[9px] text-slate-400 font-medium leading-none mt-1">
                    Desenvolvimento Humano
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: Theoretical vs Practical bar */}
            <div className="bg-white p-4 rounded border border-emerald-100 flex flex-col justify-between shadow-xs">
              <div>
                <span className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1.5">Abordagem Metodológica</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  As aulas são divididas em Teóricas (T), de contextualização e análise, e Práticas (P), voltadas à simulação em laboratório e exercícios práticos.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Aulas Práticas (P)</span>
                  <span className="text-emerald-700">{tecnicoDashboardData.P_percentage}% ({tecnicoDashboardData.P_count} aulas)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex border border-slate-200">
                  <div 
                    style={{ width: `${tecnicoDashboardData.P_percentage}%` }} 
                    className="bg-emerald-600 h-full transition-all duration-500"
                  />
                  <div 
                    style={{ width: `${tecnicoDashboardData.T_percentage}%` }} 
                    className="bg-amber-500 h-full transition-all duration-500"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600 inline-block"></span>Prática</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block"></span>Teórica ({tecnicoDashboardData.T_percentage}%)</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Bimester Distribution */}
            <div className="bg-white p-4 rounded border border-emerald-100 flex flex-col justify-between shadow-xs">
              <div>
                <span className="block text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-2">Aulas por Bimestre</span>
                <div className="space-y-2 text-xs">
                  {['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'].map((bim) => {
                    const count = tecnicoDashboardData.bimestresCount[bim as keyof typeof tecnicoDashboardData.bimestresCount] || 0;
                    const percentage = tecnicoDashboardData.totalLessons > 0 ? Math.round((count / tecnicoDashboardData.totalLessons) * 100) : 0;
                    return (
                      <div key={bim} className="flex items-center gap-2">
                        <span className="w-20 text-slate-500 font-medium text-[10px]">{bim}</span>
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden border border-slate-200/50">
                          <div 
                            style={{ width: `${percentage}%` }} 
                            className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                          />
                        </div>
                        <span className="w-8 text-right font-bold text-slate-800 text-[10px]">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 text-[9px] text-slate-400 leading-none flex items-center justify-between">
                <span>Cod. Componente: <strong className="text-emerald-900 font-semibold">{tecnicoDashboardData.compCode}</strong></span>
                <span>Unidades: <strong className="text-emerald-900 font-semibold">{tecnicoDashboardData.uniqueUCs.length}</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Collapsible Matriz Socioemocional integrated under Projeto de Vida */}
      {subject === 'Projeto de Vida' && (
        <div className="bg-purple-50/50 rounded-lg border border-purple-200/80 p-5 shadow-xs text-left mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer select-none" onClick={() => setShowSocioMatrix(!showSocioMatrix)}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 rounded-lg text-purple-700 shadow-inner">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-purple-900 text-sm flex items-center gap-2">
                  Matriz de Competências Socioemocionais – Inova Educação
                  <span className="bg-purple-150 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">Projeto de Vida</span>
                </h3>
                <p className="text-xs text-purple-700/90 mt-0.5">Mapeamento integrado contendo dimensões, competências, contextos formativos e estratégias ativas alinhadas à BNCC.</p>
              </div>
            </div>
            <button className="text-xs bg-white hover:bg-purple-50 text-purple-800 font-bold px-3 py-2 rounded border border-purple-200 shadow-xs transition cursor-pointer self-start sm:self-center">
              {showSocioMatrix ? 'Recolher Matriz' : 'Visualizar Matriz Integrada'}
            </button>
          </div>
          
          {showSocioMatrix && (
            <div className="mt-5 overflow-x-auto border border-purple-100 rounded-lg shadow-sm">
              <table className="w-full border-collapse text-[11px] text-left bg-white">
                <thead>
                  <tr className="bg-purple-100/50 text-purple-950 font-bold border-b border-purple-200">
                    <th className="p-3 text-left w-28">Dimensão</th>
                    <th className="p-3 text-left w-48">Compreensão Curricular</th>
                    <th className="p-3 text-left w-16">Ano</th>
                    <th className="p-3 text-left w-16">Bimestre</th>
                    <th className="p-3 text-left w-48">Contexto Formativo</th>
                    <th className="p-3 text-left w-40">Questões Essenciais</th>
                    <th className="p-3 text-left w-40">Habilidade (Competência)</th>
                    <th className="p-3 text-left w-24">Atitude / Prática</th>
                    <th className="p-3 text-left w-20">Big Five</th>
                    <th className="p-3 text-left w-48">Estratégias Ativas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100 text-gray-700">
                  {MATRIZ_SOCIOEMOCIONAL.map((row) => {
                    const gradeKeys = Object.keys(row.grades);
                    return gradeKeys.flatMap((grade, gIdx) => {
                      const bimesterKeys = Object.keys(row.grades[grade].bimestres);
                      return bimesterKeys.map((bimestre, bIdx) => {
                        const cell = row.grades[grade].bimestres[bimestre];
                        
                        // Rowspans calculations
                        const totalBimestersForGrade = bimesterKeys.length;
                        const totalBimestersForDimension = gradeKeys.reduce((sum, gk) => sum + Object.keys(row.grades[gk].bimestres).length, 0);

                        return (
                          <tr key={`${row.dimension}-${grade}-${bimestre}`} className="hover:bg-purple-50/10">
                            {/* Dimension cell */}
                            {gIdx === 0 && bIdx === 0 && (
                              <td rowSpan={totalBimestersForDimension} className="border-r border-purple-100 p-3 font-bold text-purple-900 bg-purple-50/10 align-top">
                                {row.dimension}
                              </td>
                            )}
                            
                            {/* Comprehension cell */}
                            {bIdx === 0 && (
                              <td rowSpan={totalBimestersForGrade} className="border-r border-purple-100 p-3 text-gray-600 bg-purple-50/5 align-top leading-relaxed font-medium">
                                <div className="font-semibold text-purple-950 mb-1">{grade}:</div>
                                {row.comprehensions[grade]}
                              </td>
                            )}

                            <td className="p-3 font-semibold text-gray-900 bg-gray-50/10 whitespace-nowrap border-r border-purple-100 align-top">{grade}</td>
                            <td className="p-3 font-medium text-purple-800 bg-purple-50/5 whitespace-nowrap border-r border-purple-100 align-top">{bimestre}</td>
                            <td className="p-3 leading-relaxed text-justify border-r border-purple-100 align-top">{cell.contexto}</td>
                            <td className="p-3 italic text-gray-600 leading-relaxed border-r border-purple-100 align-top">"{cell.questoes}"</td>
                            <td className="p-3 font-medium text-gray-800 leading-relaxed border-r border-purple-100 align-top">
                              {cell.habilidade}
                              {cell.curriculoPaulista && (
                                <span className="block text-[10px] text-purple-700 font-bold mt-1">
                                  Cod: {cell.curriculoPaulista}
                                </span>
                              )}
                            </td>
                            <td className="p-3 border-r border-purple-100 align-top">
                              <span className="block font-semibold text-purple-950">{cell.atitude}</span>
                              <span className="block text-[11px] text-gray-400 mt-0.5">Prática: {cell.pratica}</span>
                            </td>
                            <td className="p-3 font-mono text-[10px] text-purple-700 whitespace-pre-line border-r border-purple-100 align-top">{cell.bigFive}</td>
                            <td className="p-3 align-top">
                              <ul className="list-disc list-inside space-y-1 text-gray-600 leading-relaxed">
                                {cell.estrategias.map((est, eIdx) => (
                                  <li key={eIdx}>{est}</li>
                                ))}
                              </ul>
                            </td>
                          </tr>
                        );
                      });
                    });
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Main Table Card or Under Construction Banner */}
      {isUnderConstruction ? (
        <div className="bg-white rounded border border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-8">
          <div className="relative mb-5">
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 animate-pulse">
              <Hammer className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-sm">
              <Clock className="h-3 w-3" />
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-1.5">Página em Construção</h3>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-6">
            {segment === 'Itinerários Formativos' ? (
              <span>Os conteúdos da <strong>{segment}</strong> estão em fase de curadoria e estruturação pedagógica. Essa seção será atualizada posteriormente de acordo com as diretrizes da Secretaria de Educação.</span>
            ) : (
              <span>O currículo priorizado para a disciplina de <span className="font-semibold text-emerald-700">{subject}</span> no segmento <span className="font-semibold text-emerald-700">{segment === 'Todos' ? 'Anos Finais / Ensino Médio' : segment}</span> está em fase de elaboração e será inserido posteriormente.</span>
            )}
          </p>

          <div className="w-full bg-gray-50 rounded border border-gray-100 p-4 text-left space-y-3 max-w-md">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Cronograma de Atividades</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Estruturação do Layout e Abas: <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Importação das aulas de Matemática: <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Importação das aulas de Língua Portuguesa (Anos Finais): <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Importação da Parte Diversificada (Inova Educação): <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Importação dos demais conteúdos de Itinerários: <strong className="text-amber-600 font-medium">Em breve</strong></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {segment === 'Parte Diversificada' ? (
              renderDiversificadaTable()
            ) : segment === 'Itinerários Formativos' ? (
              renderItinerariosTable()
            ) : (
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300 text-xs font-black text-gray-700 uppercase tracking-wider">
                    <th className="px-5 py-3.5 w-32 relative">
                      Ano / Bim
                      <span className="absolute right-2 top-3.5 text-[9px] opacity-40">▼</span>
                    </th>
                    <th className="px-4 py-3.5 w-16 text-center">Aula</th>
                    <th className="px-5 py-3.5 w-64">Título da Aula</th>
                    <th className="px-5 py-3.5 w-64">Objetivos de Aprendizagem</th>
                    <th className="px-5 py-3.5 w-36">Habilidade</th>
                    <th className="px-5 py-3.5 w-52">Aprendizagem Essencial</th>
                    <th className="px-5 py-3.5 w-40 text-center">Gerar Questões (IA)</th>
                    {onDeleteItem && <th className="px-5 py-3.5 w-24 text-right">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={onDeleteItem ? 8 : 7} className="text-center py-12 text-gray-400">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <BookOpen className="h-10 w-10 text-gray-300 stroke-[1.5]" />
                          <p className="font-semibold text-gray-700">Nenhum dado de currículo encontrado</p>
                          <p className="text-xs text-gray-400">Tente ajustar seus termos de busca ou filtros.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    (filteredItems as CurriculumItem[]).map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-blue-50 transition-colors cursor-pointer group"
                        onClick={() => setSelectedItem(item)}
                      >
                        {/* Grade & Bimestre */}
                        <td className="px-5 py-4 align-top">
                          <div className="space-y-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              {item.ano}
                            </span>
                            <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                          </div>
                        </td>

                        {/* Lesson No */}
                        <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                          {item.aula}
                        </td>

                        {/* Title / Content */}
                        <td className="px-5 py-4 align-top">
                          <div className="space-y-1">
                            <div className="font-bold text-gray-800 group-hover:text-emerald-700 transition line-clamp-2 leading-relaxed">
                              {item.titulo}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.conteudo}</div>
                          </div>
                        </td>

                        {/* Objectives */}
                        <td className="px-5 py-4 align-top text-[11px] leading-relaxed max-w-xs">
                          <div className="line-clamp-4 text-gray-600 whitespace-pre-line">
                            {item.objetivos}
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap gap-1">
                            {item.habilidade.split(/[\s,]+/).filter(Boolean).map((hab, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"
                              >
                                {hab}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Essential Learning */}
                        <td className="px-5 py-4 align-top text-[11px] text-gray-600 italic max-w-xs">
                          <div className="line-clamp-3 leading-relaxed">{item.aprendizagem}</div>
                        </td>

                        {/* Gemini IA Column */}
                        <td className="px-5 py-4 align-top text-center" onClick={(e) => e.stopPropagation()}>
                          <div className="flex flex-col gap-1.5 items-center justify-center">
                            <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider flex items-center gap-1"><Sparkles className="h-2.5 w-2.5" /> Criar no Gemini</span>
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => handleGeminiPrompt(item, 1)}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-1 rounded border border-emerald-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                                title="Grupo 1 (Básico)"
                              >
                                G1
                              </button>
                              <button
                                onClick={() => handleGeminiPrompt(item, 2)}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-1 rounded border border-blue-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                                title="Grupo 2 (Intermediário)"
                              >
                                G2
                              </button>
                              <button
                                onClick={() => handleGeminiPrompt(item, 3)}
                                className="bg-amber-50 hover:bg-amber-100 text-amber-700 text-[10px] font-extrabold px-2 py-1 rounded border border-amber-200 shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition"
                                title="Grupo 3 (Avançado)"
                              >
                                G3
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        {onDeleteItem && (
                          <td className="px-5 py-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                if (window.confirm('Tem certeza que deseja remover esta aula?')) {
                                  onDeleteItem(item.id);
                                }
                              }}
                              className="text-xs text-red-500 hover:text-red-700 font-bold hover:underline p-1"
                            >
                              Excluir
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Row detail drawer / modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded border border-gray-200 shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${
                    segment === 'Parte Diversificada'
                      ? subject === 'Projeto de Vida' ? 'bg-purple-50 text-purple-600'
                        : subject === 'Tecnologia e Inovação' ? 'bg-sky-50 text-sky-600'
                        : (subject === 'Orientação de Estudos - Matemática' || subject === 'Orientação de Estudos - Português') ? 'bg-rose-50 text-rose-600'
                        : (subject === 'Redação e leitura' || subject === 'Redação e Leitura') ? 'bg-teal-50 text-teal-600'
                        : 'bg-amber-50 text-amber-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {segment === 'Parte Diversificada' ? `Detalhes de ${subject}` : `Detalhes da Aula ${selectedItem.aula}`}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {selectedItem.ano} • {selectedItem.bimestre} {selectedItem.semana ? `• ${selectedItem.semana}` : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {segment === 'Parte Diversificada' ? (
                  renderDiversificadaDetails()
                ) : segment === 'Itinerários Formativos' ? (
                  renderItinerariosDetails()
                ) : (
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Título da Aula
                      </h4>
                      <p className="text-gray-800 font-bold text-base">{selectedItem.titulo}</p>
                    </div>

                    {/* Content */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Conteúdo
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
                        {selectedItem.conteudo}
                      </p>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Objetivos de Aprendizagem
                      </h4>
                      <div className="bg-gray-50 p-4 rounded border border-gray-100 text-sm text-gray-600 leading-relaxed whitespace-pre-line space-y-2">
                        {selectedItem.objetivos}
                      </div>
                    </div>

                    {/* Skills and Essential Learning */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Habilidades
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedItem.habilidade.split(/[\s,]+/).filter(Boolean).map((hab: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"
                            >
                              {hab}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Aprendizagem Essencial
                        </h4>
                        <p className="text-gray-600 text-xs leading-relaxed bg-emerald-50/30 p-3 rounded border border-emerald-100/30 italic">
                          {selectedItem.aprendizagem}
                        </p>
                      </div>
                    </div>

                    {/* Gemini Prompt Generator Section */}
                    <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-3 mt-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Gerador de Questões Gemini IA
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Selecione o grupo desejado para copiar o prompt pedagogicamente estruturado e abrir o Gemini do Google em uma nova aba:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                        <button
                          onClick={() => handleGeminiPrompt(selectedItem, 1)}
                          className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left p-2.5 rounded shadow-xs transition group cursor-pointer"
                        >
                          <div className="text-xs font-black text-emerald-700 uppercase tracking-wider mb-0.5 group-hover:text-emerald-800">Grupo 1</div>
                          <div className="text-[10px] text-slate-400 font-semibold mb-1">Nível Básico</div>
                          <div className="text-[10px] text-slate-500 leading-normal line-clamp-2">Perguntas diretas de múltipla escolha para checar memorização e conceitos.</div>
                        </button>
                        <button
                          onClick={() => handleGeminiPrompt(selectedItem, 2)}
                          className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left p-2.5 rounded shadow-xs transition group cursor-pointer"
                        >
                          <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-0.5 group-hover:text-blue-800">Grupo 2</div>
                          <div className="text-[10px] text-slate-400 font-semibold mb-1">Intermediário</div>
                          <div className="text-[10px] text-slate-500 leading-normal line-clamp-2">Contextualizadas com problemas reais do cotidiano ou tirinhas.</div>
                        </button>
                        <button
                          onClick={() => handleGeminiPrompt(selectedItem, 3)}
                          className="bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-left p-2.5 rounded shadow-xs transition group cursor-pointer"
                        >
                          <div className="text-xs font-black text-amber-700 uppercase tracking-wider mb-0.5 group-hover:text-amber-800">Grupo 3</div>
                          <div className="text-[10px] text-slate-400 font-semibold mb-1">Avançado / Dissertativo</div>
                          <div className="text-[10px] text-slate-500 leading-normal line-clamp-2">Discursivas complexas com expectativas de resposta para avaliação crítica.</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className={`px-5 py-2 text-white rounded transition font-bold text-sm shadow-sm ${
                    segment === 'Parte Diversificada'
                      ? subject === 'Projeto de Vida' ? 'bg-purple-600 hover:bg-purple-700'
                        : subject === 'Tecnologia e Inovação' ? 'bg-sky-600 hover:bg-sky-700'
                        : (subject === 'Orientação de Estudos - Matemática' || subject === 'Orientação de Estudos - Português') ? 'bg-rose-600 hover:bg-rose-700'
                        : (subject === 'Redação e leitura' || subject === 'Redação e Leitura') ? 'bg-teal-600 hover:bg-teal-700'
                        : 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification Container */}
      <ToastNotification toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
