import { CurriculumItem } from '../types';
import { ADMIN_INTRO_34_DATA } from './tecnicoData34';
import { MATEMATICA_APLICADA_DATA } from './matematicaAplicadaData';
import { MARKETING_ESTRATEGICO_DATA } from './tecnicoNovasData';
import { GESTAO_FINANCEIRA_DATA } from './tecnicoGestaoFinanceiraData';
import { GESTAO_OPERACOES_DATA } from './tecnicoGestaoOperacoesData';
import { INOVACAO_DATA } from './tecnicoInovacaoData';
import { COMUNICACAO_DATA } from './tecnicoComunicacaoData';

export interface TecnicoLessonItem {
  id: string;
  ano: string; // '2ª Série'
  bimestre: string; // '1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'
  semana: string;
  disciplina: string;
  codigoComponente: string;
  chTeoricaPratica: 'T' | 'P';
  aulasSemana: number;
  unidadeCurricular: string;
  codigoUnidade: string;
  temaSemana: string;
  aulaNumero: string;
  tituloAula: string;
  competenciaTecnica: string;
  competenciaSocioemocional: string;
  habilidadesTecnicas: string;
  habilidadesSocioemocionais: string;
  objetivosAula: string;
  objetoConhecimento: string;
  isRecomposicaoOuVisita?: boolean;
}

// -------------------------------------------------------------------------
// DISCIPLINA A: Introdução à Administração, Legislação e Pessoas (2ª Série)
// -------------------------------------------------------------------------
export const ADMIN_INTRO_DATA: TecnicoLessonItem[] = [
  // --- 1º BIMESTRE (Semanas 1 a 7 + Recomposição) ---
  {
    id: 'adm-s1-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 1',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Conceitos Básicos de Administração', codigoUnidade: 'U1', temaSemana: 'Fundamentos da Administração',
    aulaNumero: 'Aula 1', tituloAula: 'Origem da Administração',
    competenciaTecnica: 'Executar atividades de Recursos Humanos, tais como rotinas administrativas.',
    competenciaSocioemocional: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender.',
    habilidadesTecnicas: 'Compreender os conceitos de administração e evolução histórica.',
    habilidadesSocioemocionais: 'Apresentar curiosidade para explorar conceitos organizacionais.',
    objetivosAula: 'Identificar as origens da Administração e suas primeiras aplicações.',
    objetoConhecimento: '1. Fundamentos da Administração'
  },
  {
    id: 'adm-s1-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 1',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Conceitos Básicos de Administração', codigoUnidade: 'U1', temaSemana: 'Fundamentos da Administração',
    aulaNumero: 'Aula 2', tituloAula: 'Primeiras teorias administrativas',
    competenciaTecnica: 'Executar atividades de Recursos Humanos.',
    competenciaSocioemocional: 'Curiosidade e investigação intelectual.',
    habilidadesTecnicas: 'Compreender as escolas do pensamento administrativo.',
    habilidadesSocioemocionais: 'Analisar criticamente a evolução das teorias.',
    objetivosAula: 'Reconhecer as principais escolas clássicas da administração.',
    objetoConhecimento: '2. Escolas clássicas da administração'
  },
  {
    id: 'adm-s1-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 1',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Conceitos Básicos de Administração', codigoUnidade: 'U1', temaSemana: 'Fundamentos da Administração',
    aulaNumero: 'Aula 3', tituloAula: 'Evolução estrutural e humana',
    competenciaTecnica: 'Executar rotinas de gestão de pessoas e estrutura.',
    competenciaSocioemocional: 'Curiosidade e escuta atenta.',
    habilidadesTecnicas: 'Compreender abordagens contextuais e comportamentais.',
    habilidadesSocioemocionais: 'Demonstrar empatia perante relações de trabalho.',
    objetivosAula: 'Comparar diferentes abordagens contextuais e humanas na gestão.',
    objetoConhecimento: '3. Abordagens contextuais e humanas'
  },
  {
    id: 'adm-s1-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 1',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Conceitos Básicos de Administração', codigoUnidade: 'U1', temaSemana: 'Fundamentos da Administração',
    aulaNumero: 'Aula 4', tituloAula: 'Desafios atuais da Administração',
    competenciaTecnica: 'Analisar cenários administrativos contemporâneos.',
    competenciaSocioemocional: 'Pensamento crítico e adaptabilidade.',
    habilidadesTecnicas: 'Mapear transformações no ambiente de negócios.',
    habilidadesSocioemocionais: 'Propor soluções inovadoras para novos desafios.',
    objetivosAula: 'Identificar os desafios atuais enfrentados pelas organizações.',
    objetoConhecimento: '4. Administração nas organizações'
  },
  {
    id: 'adm-s2-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 2',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Planejamento e Organização',
    aulaNumero: 'Aula 1', tituloAula: 'Planejamento estratégico',
    competenciaTecnica: 'Planejar e organizar atividades administrativas.',
    competenciaSocioemocional: 'Agir com organização e disciplina.',
    habilidadesTecnicas: 'Compreender os níveis do planejamento organizacional.',
    habilidadesSocioemocionais: 'Trabalhar proativamente na estruturação de planos.',
    objetivosAula: 'Compreender os elementos do planejamento nas empresas.',
    objetoConhecimento: '1. Planejamento nas empresas'
  },
  {
    id: 'adm-s2-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 2',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Planejamento e Organização',
    aulaNumero: 'Aula 2', tituloAula: 'Análise SWOT',
    competenciaTecnica: 'Executar diagnósticos organizacionais.',
    competenciaSocioemocional: 'Visão crítica e foco em solução.',
    habilidadesTecnicas: 'Mapear Forças, Oportunidades, Fraquezas e Ameaças.',
    habilidadesSocioemocionais: 'Avaliar dados de forma objetiva.',
    objetivosAula: 'Compreender a estrutura e finalidade da Análise SWOT.',
    objetoConhecimento: '2. Ferramentas de análise organizacional'
  },
  {
    id: 'adm-s2-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 2',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Planejamento e Organização',
    aulaNumero: 'Aula 3', tituloAula: 'Inovação no planejamento',
    competenciaTecnica: 'Inserir inovação nas rotinas administrativas.',
    competenciaSocioemocional: 'Abertura ao novo e criatividade.',
    habilidadesTecnicas: 'Aplicar conceitos de inovação e melhoria.',
    habilidadesSocioemocionais: 'Propor estratégias diferenciais.',
    objetivosAula: 'Compreender como a inovação contribui para o planejamento.',
    objetoConhecimento: '3. Inovação como estratégia'
  },
  {
    id: 'adm-s2-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 2',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Planejamento e Organização',
    aulaNumero: 'Aula 4', tituloAula: 'Gestão contemporânea',
    competenciaTecnica: 'Gerir recursos sob incerteza.',
    competenciaSocioemocional: 'Resiliência e tolerância ao estresse.',
    habilidadesTecnicas: 'Identificar formas flexíveis de gestão.',
    habilidadesSocioemocionais: 'Adaptar-se a mudanças no planejamento.',
    objetivosAula: 'Identificar práticas de gestão contemporânea e adaptação.',
    objetoConhecimento: '4. Gestão e adaptação'
  },
  {
    id: 'adm-s3-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 3',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Direção e Controle Administrativo',
    aulaNumero: 'Aula 1', tituloAula: 'Uso eficiente dos recursos',
    competenciaTecnica: 'Otimizar o uso de insumos e tempo.',
    competenciaSocioemocional: 'Responsabilidade e zelo.',
    habilidadesTecnicas: 'Compreender a eficiência operacional.',
    habilidadesSocioemocionais: 'Agir com consciência no uso de recursos.',
    objetivosAula: 'Identificar o que torna uma atividade eficiente.',
    objetoConhecimento: '1. Otimização de recursos'
  },
  {
    id: 'adm-s3-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 3',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Direção e Controle Administrativo',
    aulaNumero: 'Aula 2', tituloAula: 'Cumprimento de metas com eficácia',
    competenciaTecnica: 'Acompanhar metas e padrões de desempenho.',
    competenciaSocioemocional: 'Foco em resultados.',
    habilidadesTecnicas: 'Compreender a eficácia no alcance dos objetivos.',
    habilidadesSocioemocionais: 'Manter engajamento até a conclusão da tarefa.',
    objetivosAula: 'Compreender como atingir objetivos com eficácia.',
    objetoConhecimento: '2. Alinhamento entre metas e resultados'
  },
  {
    id: 'adm-s3-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 3',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Direção e Controle Administrativo',
    aulaNumero: 'Aula 3', tituloAula: 'Resultados com impacto real',
    competenciaTecnica: 'Avaliar a efetividade social e organizacional.',
    competenciaSocioemocional: 'Visão de impacto e empatia.',
    habilidadesTecnicas: 'Compreender a efetividade das ações administrativas.',
    habilidadesSocioemocionais: 'Refletir sobre o valor gerado para as pessoas.',
    objetivosAula: 'Compreender o papel da efetividade nas ações.',
    objetoConhecimento: '3. Alcance e utilidade das ações'
  },
  {
    id: 'adm-s3-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 3',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Direção e Controle Administrativo',
    aulaNumero: 'Aula 4', tituloAula: 'Diferenças entre desempenho e efetividade',
    competenciaTecnica: 'Analisar indicadores de desempenho.',
    competenciaSocioemocional: 'Análise crítica e discernimento.',
    habilidadesTecnicas: 'Comparar eficiência, eficácia e efetividade.',
    habilidadesSocioemocionais: 'Articular conclusões baseadas em indicadores.',
    objetivosAula: 'Comparar eficiência, eficácia e efetividade.',
    objetoConhecimento: '4. Análise comparativa do desempenho'
  },
  {
    id: 'adm-s4-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 4',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Prática das Funções Administrativas',
    aulaNumero: 'Aula 1', tituloAula: 'Organizando tarefas com base no planejamento',
    competenciaTecnica: 'Executar a distribuição de tarefas na prática.',
    competenciaSocioemocional: 'Cooperar com a equipe.',
    habilidadesTecnicas: 'Aplicar conceitos de planejamento na prática.',
    habilidadesSocioemocionais: 'Trabalhar em equipe para executar cronogramas.',
    objetivosAula: 'Aplicar a lógica do planejamento na resolução de casos.',
    objetoConhecimento: '1. Execução do planejamento'
  },
  {
    id: 'adm-s4-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 4',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Prática das Funções Administrativas',
    aulaNumero: 'Aula 2', tituloAula: 'Identificação de pontos fortes e fracos',
    competenciaTecnica: 'Construir diagnósticos situacionais.',
    competenciaSocioemocional: 'Trabalho colaborativo e síntese.',
    habilidadesTecnicas: 'Utilizar matriz SWOT para organizar dados.',
    habilidadesSocioemocionais: 'Compartilhar percepções respeitando colegas.',
    objetivosAula: 'Utilizar a análise SWOT para organizar ideias.',
    objetoConhecimento: '2. Diagnóstico empresarial'
  },
  {
    id: 'adm-s4-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 4',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Prática das Funções Administrativas',
    aulaNumero: 'Aula 3', tituloAula: 'Escolha de estratégias e controle',
    competenciaTecnica: 'Selecionar alternativas estratégicas.',
    competenciaSocioemocional: 'Tomada de decisão compartilhada.',
    habilidadesTecnicas: 'Relacionar estratégias com indicadores.',
    habilidadesSocioemocionais: 'Negociar ideias em grupo.',
    objetivosAula: 'Relacionar estratégias com indicadores de controle.',
    objetoConhecimento: '3. Alinhamento entre estratégias e controle'
  },
  {
    id: 'adm-s4-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 4',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Funções Administrativas', codigoUnidade: 'U2', temaSemana: 'Prática das Funções Administrativas',
    aulaNumero: 'Aula 4', tituloAula: 'Eficiência, eficácia e efetividade na prática',
    competenciaTecnica: 'Simular acompanhamento e métricas.',
    competenciaSocioemocional: 'Atenção aos detalhes e foco.',
    habilidadesTecnicas: 'Aplicar os conceitos de desempenho em caso prático.',
    habilidadesSocioemocionais: 'Apresentar resultados com clareza.',
    objetivosAula: 'Aplicar os conceitos de desempenho em simulação.',
    objetoConhecimento: '4. Aplicação de indicadores de desempenho'
  },
  {
    id: 'adm-s5-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 5',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Perfil do Administrador e Evolução do Papel', codigoUnidade: 'U3', temaSemana: 'Papel do Administrador',
    aulaNumero: 'Aula 1', tituloAula: 'Níveis de planejamento',
    competenciaTecnica: 'Identificar a estrutura de planejamento.',
    competenciaSocioemocional: 'Pensamento estruturado.',
    habilidadesTecnicas: 'Compreender a atuação do administrador.',
    habilidadesSocioemocionais: 'Pensar criticamente sobre a aplicação prática.',
    objetivosAula: 'Identificar os níveis estratégico, tático e operacional.',
    objetoConhecimento: '1. Classificação do planejamento'
  },
  {
    id: 'adm-s5-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 5',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Perfil do Administrador e Evolução do Papel', codigoUnidade: 'U3', temaSemana: 'Papel do Administrador',
    aulaNumero: 'Aula 2', tituloAula: 'O ciclo PDCA',
    competenciaTecnica: 'Mapear a rotina de melhoria contínua.',
    competenciaSocioemocional: 'Foco na qualidade e superação.',
    habilidadesTecnicas: 'Compreender a ferramenta PDCA.',
    habilidadesSocioemocionais: 'Desenvolver postura de constante aprendizado.',
    objetivosAula: 'Compreender como o ciclo PDCA pode ser utilizado.',
    objetoConhecimento: '2. Ciclos de melhoria de processos'
  },
  {
    id: 'adm-s5-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 5',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Perfil do Administrador e Evolução do Papel', codigoUnidade: 'U3', temaSemana: 'Papel do Administrador',
    aulaNumero: 'Aula 3', tituloAula: 'Funções administrativas do gestor',
    competenciaTecnica: 'Articular planejamento, organização, direção e controle.',
    competenciaSocioemocional: 'Liderança e visão holística.',
    habilidadesTecnicas: 'Compreender as atribuições do gestor.',
    habilidadesSocioemocionais: 'Demonstrar autoconfiança na tomada de iniciativa.',
    objetivosAula: 'Compreender como as funções se integram no trabalho do gestor.',
    objetoConhecimento: '3. Atuação do gestor'
  },
  {
    id: 'adm-s5-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 5',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Perfil do Administrador e Evolução do Papel', codigoUnidade: 'U3', temaSemana: 'Papel do Administrador',
    aulaNumero: 'Aula 4', tituloAula: 'Desafios da gestão no ambiente competitivo',
    competenciaTecnica: 'Analisar cenários de concorrência e mudança.',
    competenciaSocioemocional: 'Adaptação e perseverança.',
    habilidadesTecnicas: 'Identificar ameaças e oportunidades de mercado.',
    habilidadesSocioemocionais: 'Propor caminhos estratégicos com serenidade.',
    objetivosAula: 'Compreender os desafios enfrentados no ambiente competitivo.',
    objetoConhecimento: '4. Gestão diante da competitividade'
  },
  {
    id: 'adm-s6-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 6',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Ética Profissional', codigoUnidade: 'U5', temaSemana: 'Ética no Ambiente Organizacional',
    aulaNumero: 'Aula 1', tituloAula: 'A ética profissional',
    competenciaTecnica: 'Aplicar princípios éticos nas rotinas de trabalho.',
    competenciaSocioemocional: 'Integridade e respeito mútuo.',
    habilidadesTecnicas: 'Identificar práticas éticas dentro do ambiente profissional.',
    habilidadesSocioemocionais: 'Colaborar e comunicar-se efetivamente.',
    objetivosAula: 'Compreender o conceito de ética e sua sustentação.',
    objetoConhecimento: '1. Fundamentos da ética nas organizações'
  },
  {
    id: 'adm-s6-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 6',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Ética Profissional', codigoUnidade: 'U5', temaSemana: 'Ética no Ambiente Organizacional',
    aulaNumero: 'Aula 2', tituloAula: 'A importância da ética',
    competenciaTecnica: 'Reconhecer normas de conduta interpessoal e profissional.',
    competenciaSocioemocional: 'Responsabilidade e respeito moral.',
    habilidadesTecnicas: 'Interpretar regulamentos internos e condutas.',
    habilidadesSocioemocionais: 'Manter atitude coerente e justa.',
    objetivosAula: 'Compreender a importância da ética na tomada de decisão.',
    objetoConhecimento: '2. Princípios que orientam condutas'
  },
  {
    id: 'adm-s6-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 6',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Ética Profissional', codigoUnidade: 'U5', temaSemana: 'Ética no Ambiente Organizacional',
    aulaNumero: 'Aula 3', tituloAula: 'Ética no ambiente digital',
    competenciaTecnica: 'Manter postura ética no uso de sistemas e redes.',
    competenciaSocioemocional: 'Cidadania digital e discernimento.',
    habilidadesTecnicas: 'Aplicar normas de privacidade e uso consciente.',
    habilidadesSocioemocionais: 'Zelar pela integridade de dados e reputação.',
    objetivosAula: 'Compreender a importância da ética no uso de tecnologias.',
    objetoConhecimento: '3. Conduta ética no uso de tecnologias'
  },
  {
    id: 'adm-s6-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 6',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Ética Profissional', codigoUnidade: 'U5', temaSemana: 'Ética no Ambiente Organizacional',
    aulaNumero: 'Aula 4', tituloAula: 'Lidando com a mentira no trabalho',
    competenciaTecnica: 'Mediação e mitigação de desvios de conduta.',
    competenciaSocioemocional: 'Assertividade e transparência.',
    habilidadesTecnicas: 'Identificar e lidar com situações de conflito ético.',
    habilidadesSocioemocionais: 'Enfrentar problemas morais com maturidade.',
    objetivosAula: 'Compreender como lidar com situações de conflito de valores.',
    objetoConhecimento: '4. Ética em situações de conflito de valores'
  },
  {
    id: 'adm-s7-a1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 7',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Processo de Decisão Administrativa',
    aulaNumero: 'Aula 1', tituloAula: 'Conceito de processo decisório',
    competenciaTecnica: 'Compreender as etapas de escolha racional.',
    competenciaSocioemocional: 'Ponderação e pensamento lógico.',
    habilidadesTecnicas: 'Compreender as etapas da tomada de decisão.',
    habilidadesSocioemocionais: 'Pensar criticamente sobre as escolhas.',
    objetivosAula: 'Compreender o que é processo decisório e seus tipos.',
    objetoConhecimento: '1. Processo decisório'
  },
  {
    id: 'adm-s7-a2', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 7',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Processo de Decisão Administrativa',
    aulaNumero: 'Aula 2', tituloAula: 'Informação e decisão nas empresas',
    competenciaTecnica: 'Analisar relevância e veracidade de dados.',
    competenciaSocioemocional: 'Curiosidade e discernimento.',
    habilidadesTecnicas: 'Relacionar fluxo de dados à qualidade decisória.',
    habilidadesSocioemocionais: 'Analisar criticamente fontes de informação.',
    objetivosAula: 'Compreender como a informação contribui para a escolha.',
    objetoConhecimento: '2. Informação para decisão'
  },
  {
    id: 'adm-s7-a3', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 7',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Processo de Decisão Administrativa',
    aulaNumero: 'Aula 3', tituloAula: 'Etapas da tomada de decisão',
    competenciaTecnica: 'Mapear problema, alternativas e seleção.',
    competenciaSocioemocional: 'Organização e método.',
    habilidadesTecnicas: 'Estruturar o passo a passo da tomada de decisão.',
    habilidadesSocioemocionais: 'Avaliar prós e contras objetivamente.',
    objetivosAula: 'Identificar as etapas envolvidas no processo decisório.',
    objetoConhecimento: '3. Etapas para tomada de decisão'
  },
  {
    id: 'adm-s7-a4', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Semana 7',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Processo de Decisão Administrativa',
    aulaNumero: 'Aula 4', tituloAula: 'Níveis da tomada de decisão',
    competenciaTecnica: 'Classificar decisões operacionais, táticas e estratégicas.',
    competenciaSocioemocional: 'Visão de longo e curto prazo.',
    habilidadesTecnicas: 'Distinguir o alcance de cada decisão.',
    habilidadesSocioemocionais: 'Refletir sobre responsabilidade decisória.',
    objetivosAula: 'Identificar e diferenciar os níveis estratégico, tático e operacional.',
    objetoConhecimento: '4. Níveis no processo decisório'
  },
  {
    id: 'adm-rec-b1', ano: '2ª Série', bimestre: '1º Bimestre', semana: 'Recomposição',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Recomposição da Aprendizagem', codigoUnidade: 'REC1', temaSemana: 'Recomposição da Aprendizagem',
    aulaNumero: 'Recomposição', tituloAula: 'Recomposição da Aprendizagem (1º Bimestre)',
    competenciaTecnica: 'Revisar conceitos básicos de administração, ética e decisão.',
    competenciaSocioemocional: 'Autofeedback e perseverança.',
    habilidadesTecnicas: 'Consolidar as aprendizagens do 1º bimestre.',
    habilidadesSocioemocionais: 'Solicitar ajuda e sanar lacunas de aprendizagem.',
    objetivosAula: 'Garantir a consolidação de conhecimentos fundamentais.',
    objetoConhecimento: 'Recomposição da Aprendizagem', isRecomposicaoOuVisita: true
  },

  // --- 2º BIMESTRE (Semanas 8 a 14 + Recomposição / Visita Técnica) ---
  {
    id: 'adm-s8-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 8',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Tomada de Decisão na Prática',
    aulaNumero: 'Aula 1', tituloAula: 'Organizando decisões com base na análise',
    competenciaTecnica: 'Aplicar etapas do processo decisório em casos.',
    competenciaSocioemocional: 'Colaborar com colegas na análise.',
    habilidadesTecnicas: 'Aplicar coleta e organização de dados para decidir.',
    habilidadesSocioemocionais: 'Trabalhar em equipe para resolver problemas.',
    objetivosAula: 'Aplicar a coleta e organização de dados para tomar decisões.',
    objetoConhecimento: '1. Planejamento de decisões'
  },
  {
    id: 'adm-s8-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 8',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Tomada de Decisão na Prática',
    aulaNumero: 'Aula 2', tituloAula: 'Etapas da decisão em um caso real',
    competenciaTecnica: 'Simular estudo de caso corporativo.',
    competenciaSocioemocional: 'Trabalho colaborativo e argumentação.',
    habilidadesTecnicas: 'Executar as fases de diagnósticos e escolha.',
    habilidadesSocioemocionais: 'Apresentar justificativas coerentes.',
    objetivosAula: 'Aplicar as etapas do processo decisório em caso real.',
    objetoConhecimento: '2. Execução do processo decisório'
  },
  {
    id: 'adm-s8-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 8',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Tomada de Decisão na Prática',
    aulaNumero: 'Aula 3', tituloAula: 'Níveis da decisão no dia a dia',
    competenciaTecnica: 'Distinguir abrangência de decisões cotidianas.',
    competenciaSocioemocional: 'Empatia e ponderação.',
    habilidadesTecnicas: 'Classificar decisões em rápidas e estratégicas.',
    habilidadesSocioemocionais: 'Ouvir e conciliar diferentes perspectivas.',
    objetivosAula: 'Distinguir decisões simples entre níveis organizacionais.',
    objetoConhecimento: '3. Classificação de decisões'
  },
  {
    id: 'adm-s8-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 8',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Processo Decisório', codigoUnidade: 'U12', temaSemana: 'Tomada de Decisão na Prática',
    aulaNumero: 'Aula 4', tituloAula: 'Resultados e consequências das decisões',
    competenciaTecnica: 'Mapear efeitos colaterais e impactos.',
    competenciaSocioemocional: 'Responsabilidade por escolhas.',
    habilidadesTecnicas: 'Avaliar o impacto de cada decisão tomada.',
    habilidadesSocioemocionais: 'Assumir compromisso com os resultados.',
    objetivosAula: 'Avaliar os impactos e consequências de uma decisão.',
    objetoConhecimento: '4. Análise de efeitos de decisões'
  },
  {
    id: 'adm-s9-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 9',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'Fundamentos do ESG',
    aulaNumero: 'Aula 1', tituloAula: 'ESG e sua importância',
    competenciaTecnica: 'Compreender os pilares do ESG (Environmental, Social, Governance).',
    competenciaSocioemocional: 'Demonstrar curiosidade na busca por práticas sustentáveis.',
    habilidadesTecnicas: 'Compreender os conceitos socioambientais e de governança.',
    habilidadesSocioemocionais: 'Propor ideias com consciência ecológica e social.',
    objetivosAula: 'Compreender o conceito de ESG e sua aplicação nos negócios.',
    objetoConhecimento: '1. Introdução ao ESG'
  },
  {
    id: 'adm-s9-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 9',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'Fundamentos do ESG',
    aulaNumero: 'Aula 2', tituloAula: 'Sustentabilidade nas empresas',
    competenciaTecnica: 'Mapear a dimensão ambiental nas organizações.',
    competenciaSocioemocional: 'Consciência ecológica e responsabilidade.',
    habilidadesTecnicas: 'Identificar ações de mitigação de resíduos e poluição.',
    habilidadesSocioemocionais: 'Incentivar atitudes sustentáveis no grupo.',
    objetivosAula: 'Compreender os impactos das práticas ambientais corporativas.',
    objetoConhecimento: '2. Dimensão ambiental do ESG'
  },
  {
    id: 'adm-s9-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 9',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'Fundamentos do ESG',
    aulaNumero: 'Aula 3', tituloAula: 'Práticas e indicadores',
    competenciaTecnica: 'Acompanhar indicadores de sustentabilidade.',
    competenciaSocioemocional: 'Visão de futuro e inovação social.',
    habilidadesTecnicas: 'Compreender métricas e relatórios ESG.',
    habilidadesSocioemocionais: 'Analisar indicadores com responsabilidade.',
    objetivosAula: 'Compreender os desafios e indicadores da agenda ESG.',
    objetoConhecimento: '3. Aplicações do ESG'
  },
  {
    id: 'adm-s9-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 9',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'Fundamentos do ESG',
    aulaNumero: 'Aula 4', tituloAula: 'Governança corporativa',
    competenciaTecnica: 'Entender transparência, equidade e prestação de contas.',
    competenciaSocioemocional: 'Integridade e imparcialidade.',
    habilidadesTecnicas: 'Identificar mecanismos de governança corporativa.',
    habilidadesSocioemocionais: 'Valorizar a transparência nas relações.',
    objetivosAula: 'Identificar práticas básicas de governança corporativa.',
    objetoConhecimento: '4. Dimensão da governança'
  },
  {
    id: 'adm-s10-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 10',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG e Responsabilidade Corporativa',
    aulaNumero: 'Aula 1', tituloAula: 'Responsabilidade social empresarial',
    competenciaTecnica: 'Entender a responsabilidade social corporativa (RSE).',
    competenciaSocioemocional: 'Empatia e solidariedade.',
    habilidadesTecnicas: 'Mapear ações voltadas à comunidade e funcionários.',
    habilidadesSocioemocionais: 'Demonstrar engajamento em causas sociais.',
    objetivosAula: 'Compreender o conceito de responsabilidade social empresarial.',
    objetoConhecimento: '1. Fundamentos da responsabilidade'
  },
  {
    id: 'adm-s10-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 10',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG e Responsabilidade Corporativa',
    aulaNumero: 'Aula 2', tituloAula: 'Engajamento com stakeholders',
    competenciaTecnica: 'Mapear partes interessadas (clientes, colaboradores, fornecedores).',
    competenciaSocioemocional: 'Comunicação assertiva e escuta ativa.',
    habilidadesTecnicas: 'Gerenciar expectativas de diferentes públicos.',
    habilidadesSocioemocionais: 'Construir diálogo colaborativo.',
    objetivosAula: 'Compreender o papel dos stakeholders e diálogo aberto.',
    objetoConhecimento: '2. Relações organizacionais'
  },
  {
    id: 'adm-s10-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 10',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG e Responsabilidade Corporativa',
    aulaNumero: 'Aula 3', tituloAula: 'Desafios do engajamento',
    competenciaTecnica: 'Superar resistências na implantação de diretrizes ESG.',
    competenciaSocioemocional: 'Persistência e facilitação.',
    habilidadesTecnicas: 'Identificar barreiras e estratégias de engajamento.',
    habilidadesSocioemocionais: 'Manter motivação em processos de mudança.',
    objetivosAula: 'Compreender os desafios enfrentados no engajamento ESG.',
    objetoConhecimento: '3. Desafios na implementação do ESG'
  },
  {
    id: 'adm-s10-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 10',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG e Responsabilidade Corporativa',
    aulaNumero: 'Aula 4', tituloAula: 'ESG em empresas de menor porte',
    competenciaTecnica: 'Adaptar práticas ESG a micro e pequenas empresas (MPEs).',
    competenciaSocioemocional: 'Criatividade e pés no chão.',
    habilidadesTecnicas: 'Propor soluções acessíveis e de baixo custo.',
    habilidadesSocioemocionais: 'Valorizar iniciativas locais e comunitárias.',
    objetivosAula: 'Identificar práticas de ESG aplicáveis a diferentes portes.',
    objetoConhecimento: '4. ESG em diferentes portes de empresa'
  },
  {
    id: 'adm-s11-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 11',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG nas Organizações',
    aulaNumero: 'Aula 1', tituloAula: 'Práticas de ESG nas organizações',
    competenciaTecnica: 'Aplicar pilares do ESG na análise de processos reais.',
    competenciaSocioemocional: 'Trabalho em equipe e cooperação.',
    habilidadesTecnicas: 'Identificar ações administrativas com foco em ESG.',
    habilidadesSocioemocionais: 'Elaborar propostas coletivas.',
    objetivosAula: 'Identificar ações administrativas sustentáveis na prática.',
    objetoConhecimento: '1. Elementos do ESG no ambiente de trabalho'
  },
  {
    id: 'adm-s11-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 11',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG nas Organizações',
    aulaNumero: 'Aula 2', tituloAula: 'Ações sustentáveis no dia a dia',
    competenciaTecnica: 'Implantar coleta seletiva, economia de energia e papel.',
    competenciaSocioemocional: 'Proatividade ambiental.',
    habilidadesTecnicas: 'Propor hábitos operacionais ecoeficientes.',
    habilidadesSocioemocionais: 'Incentivar o grupo a adotar boas práticas.',
    objetivosAula: 'Aplicar conceitos de sustentabilidade na rotina diária.',
    objetoConhecimento: '2. Sustentabilidade ambiental nas empresas'
  },
  {
    id: 'adm-s11-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 11',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG nas Organizações',
    aulaNumero: 'Aula 3', tituloAula: 'Engajamento social no ambiente de trabalho',
    competenciaTecnica: 'Desenvolver ações de inclusão, diversidade e bem-estar.',
    competenciaSocioemocional: 'Inclusão e respeito à diversidade.',
    habilidadesTecnicas: 'Propor campanhas de valorização humana.',
    habilidadesSocioemocionais: 'Acolher diferenças com empatia.',
    objetivosAula: 'Compreender o papel da responsabilidade social interna.',
    objetoConhecimento: '3. Responsabilidade social interna'
  },
  {
    id: 'adm-s11-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 11',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Introdução ao ESG – Responsabilidade', codigoUnidade: 'U4', temaSemana: 'ESG nas Organizações',
    aulaNumero: 'Aula 4', tituloAula: 'Propostas para melhorar a sustentabilidade',
    competenciaTecnica: 'Apresentar plano de ação ESG simplificado.',
    competenciaSocioemocional: 'Apresentação pública e liderança.',
    habilidadesTecnicas: 'Sintetizar propostas em relatórios ou pitches.',
    habilidadesSocioemocionais: 'Comunicar ideias com convicção e clareza.',
    objetivosAula: 'Aplicar os pilares do ESG para sugerir melhorias concretas.',
    objetoConhecimento: '4. Integração de ESG nas rotinas'
  },
  {
    id: 'adm-s12-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 12',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Deveres Trabalhistas',
    aulaNumero: 'Aula 1', tituloAula: 'Noções de direito do trabalho',
    competenciaTecnica: 'Compreender as fontes do direito trabalhista (CLT, acordos).',
    competenciaSocioemocional: 'Responsabilidade e cidadania.',
    habilidadesTecnicas: 'Compreender os direitos e deveres das partes contratantes.',
    habilidadesSocioemocionais: 'Agir com senso de justiça e dever.',
    objetivosAula: 'Compreender os conceitos básicos sobre a legislação trabalhista.',
    objetoConhecimento: '1. Introdução à legislação trabalhista'
  },
  {
    id: 'adm-s12-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 12',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Deveres Trabalhistas',
    aulaNumero: 'Aula 2', tituloAula: 'Direitos dos trabalhadores',
    competenciaTecnica: 'Identificar férias, 13º salário, FGTS, jornada.',
    competenciaSocioemocional: 'Respeito aos direitos humanos.',
    habilidadesTecnicas: 'Mapear garantias legais asseguradas ao empregado.',
    habilidadesSocioemocionais: 'Defender relações de trabalho éticas e respeitosas.',
    objetivosAula: 'Identificar os direitos garantidos por lei aos trabalhadores.',
    objetoConhecimento: '2. Garantias legais'
  },
  {
    id: 'adm-s12-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 12',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Deveres Trabalhistas',
    aulaNumero: 'Aula 3', tituloAula: 'Deveres das empresas',
    competenciaTecnica: 'Compreender obrigações patronais e medicina do trabalho.',
    competenciaSocioemocional: 'Conformidade e ética empresarial.',
    habilidadesTecnicas: 'Identificar responsabilidades legais do empregador.',
    habilidadesSocioemocionais: 'Manter compromisso com normas legais.',
    objetivosAula: 'Compreender os deveres legais e éticos das empresas.',
    objetoConhecimento: '3. Responsabilidades legais das empresas'
  },
  {
    id: 'adm-s12-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 12',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Deveres Trabalhistas',
    aulaNumero: 'Aula 4', tituloAula: 'Tecnologia e mudanças no trabalho',
    competenciaTecnica: 'Analisar teletrabalho, home office e novas relações.',
    competenciaSocioemocional: 'Adaptação a novos formatos.',
    habilidadesTecnicas: 'Compreender regulamentações de trabalho remoto.',
    habilidadesSocioemocionais: 'Flexibilizar atitudes em ambientes virtuais.',
    objetivosAula: 'Compreender como a tecnologia transforma o ambiente de trabalho.',
    objetoConhecimento: '4. Transformações no ambiente de trabalho'
  },
  {
    id: 'adm-s13-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 13',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Segurança e Saúde no Trabalho',
    aulaNumero: 'Aula 1', tituloAula: 'Conceitos de saúde e segurança',
    competenciaTecnica: 'Compreender biossegurança e higiene ocupacional.',
    competenciaSocioemocional: 'Cuidado individual e coletivo.',
    habilidadesTecnicas: 'Identificar fatores de risco no ambiente laboral.',
    habilidadesSocioemocionais: 'Agir com prudência para preservar a integridade.',
    objetivosAula: 'Compreender os conceitos iniciais de segurança e saúde.',
    objetoConhecimento: '1. Fundamentos da segurança e saúde'
  },
  {
    id: 'adm-s13-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 13',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Segurança e Saúde no Trabalho',
    aulaNumero: 'Aula 2', tituloAula: 'Introdução às Normas Regulamentadoras (NRs)',
    competenciaTecnica: 'Analisar finalidades das NRs (EPIs, ergonomia, CIPA).',
    competenciaSocioemocional: 'Atenção às regras de proteção.',
    habilidadesTecnicas: 'Identificar a estrutura e papéis das NRs.',
    habilidadesSocioemocionais: 'Respeitar sinalizações e equipamentos de proteção.',
    objetivosAula: 'Compreender o que são as NRs e sua importância.',
    objetoConhecimento: '2. Normas de proteção ao trabalhador'
  },
  {
    id: 'adm-s13-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 13',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Segurança e Saúde no Trabalho',
    aulaNumero: 'Aula 3', tituloAula: 'Aplicações das Normas no cotidiano',
    competenciaTecnica: 'Identificar uso de EPI/EPC e mapeamento de risco.',
    competenciaSocioemocional: 'Observação atenta.',
    habilidadesTecnicas: 'Verificar condições de trabalho conforme NRs.',
    habilidadesSocioemocionais: 'Alertar colegas sobre comportamentos inseguros.',
    objetivosAula: 'Identificar situações em que as NRs devem ser aplicadas.',
    objetoConhecimento: '3. Aplicação das normas no cotidiano'
  },
  {
    id: 'adm-s13-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 13',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Legislação Trabalhista, Normas Regulatórias', codigoUnidade: 'U6', temaSemana: 'Segurança e Saúde no Trabalho',
    aulaNumero: 'Aula 4', tituloAula: 'Acidentes de trabalho e prevenção',
    competenciaTecnica: 'Compreender CAT (Comunicação de Acidente de Trabalho) e prevenção.',
    competenciaSocioemocional: 'Prevenção e pronta resposta.',
    habilidadesTecnicas: 'Mapear causas raiz de acidentes e propor prevenções.',
    habilidadesSocioemocionais: 'Agir com serenidade e auxílio mútuo.',
    objetivosAula: 'Compreender o conceito de acidente de trabalho e prevenção.',
    objetoConhecimento: '4. Prevenção de riscos e responsabilidades'
  },
  {
    id: 'adm-s14-a1', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 14',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Recrutamento e Seleção', codigoUnidade: 'U7', temaSemana: 'Recrutamento',
    aulaNumero: 'Aula 1', tituloAula: 'Conceito e estrutura de cargos',
    competenciaTecnica: 'Compreender descrição e análise de cargos (CBO).',
    competenciaSocioemocional: 'Análise detalhada.',
    habilidadesTecnicas: 'Identificar requisitos, atribuições e funções.',
    habilidadesSocioemocionais: 'Mapear perfis profissionais com imparcialidade.',
    objetivosAula: 'Identificar o conceito de cargo e sua estruturação.',
    objetoConhecimento: '1. Fundamentos de cargos'
  },
  {
    id: 'adm-s14-a2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 14',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Recrutamento e Seleção', codigoUnidade: 'U7', temaSemana: 'Recrutamento',
    aulaNumero: 'Aula 2', tituloAula: 'Representação de cargos no organograma',
    competenciaTecnica: 'Elaborar e interpretar organogramas corporativos.',
    competenciaSocioemocional: 'Visão hierárquica e sistêmica.',
    habilidadesTecnicas: 'Mapear subordinação e amplitude de controle.',
    habilidadesSocioemocionais: 'Compreender a dinâmica de autoridade e cooperação.',
    objetivosAula: 'Interpretar como os cargos se organizam na empresa.',
    objetoConhecimento: '2. Representação estrutural'
  },
  {
    id: 'adm-s14-a3', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 14',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Recrutamento e Seleção', codigoUnidade: 'U7', temaSemana: 'Recrutamento',
    aulaNumero: 'Aula 3', tituloAula: 'Modelagem do trabalho nas organizações',
    competenciaTecnica: 'Compreender desenho de cargos e motivação.',
    competenciaSocioemocional: 'Empatia e design focado nas pessoas.',
    habilidadesTecnicas: 'Analisar arranjos de trabalho e autonomia.',
    habilidadesSocioemocionais: 'Valorizar o significado do trabalho.',
    objetivosAula: 'Compreender a importância do desenho de cargos.',
    objetoConhecimento: '3. Organização do trabalho'
  },
  {
    id: 'adm-s14-a4', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Semana 14',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'T', aulasSemana: 4,
    unidadeCurricular: 'Recrutamento e Seleção', codigoUnidade: 'U7', temaSemana: 'Recrutamento',
    aulaNumero: 'Aula 4', tituloAula: 'Recrutamento como parte da gestão humana',
    competenciaTecnica: 'Diferenciar recrutamento interno e externo.',
    competenciaSocioemocional: 'Abertura e atração de talentos.',
    habilidadesTecnicas: 'Mapear canais e fontes de atração de candidatos.',
    habilidadesSocioemocionais: 'Tratar candidatos com respeito e equidade.',
    objetivosAula: 'Compreender como o recrutamento inicia a gestão de pessoas.',
    objetoConhecimento: '4. Recrutamento e gestão humana'
  },
  {
    id: 'adm-rec-visita-b2', ano: '2ª Série', bimestre: '2º Bimestre', semana: 'Recomposição / Visita Técnica',
    disciplina: 'Introdução à Administração, Legislação e Pessoas', codigoComponente: 'C1', chTeoricaPratica: 'P', aulasSemana: 4,
    unidadeCurricular: 'Visita Técnica / Recomposição', codigoUnidade: 'VT1', temaSemana: 'Vivência Prática nas Organizações e Recomposição',
    aulaNumero: 'Visita Técnica', tituloAula: 'Visita Técnica a Empresas e Recomposição da Aprendizagem',
    competenciaTecnica: 'Observar in loco rotinas de RH, ESG, segurança do trabalho e tomada de decisão.',
    competenciaSocioemocional: 'Curiosidade e postura profissional.',
    habilidadesTecnicas: 'Relacionar a teoria observada na visita com os conteúdos do 2º bimestre.',
    habilidadesSocioemocionais: 'Demonstrar boa conduta, pontualidade e curiosidade profissional.',
    objetivosAula: 'Vivenciar na prática o ambiente empresarial e sanar dúvidas do bimestre.',
    objetoConhecimento: 'Vivência de campo e consolidação de aprendizagens', isRecomposicaoOuVisita: true
  }
];

export const ALL_TECNICO_DATA: TecnicoLessonItem[] = [
  ...ADMIN_INTRO_DATA,
  ...ADMIN_INTRO_34_DATA,
  ...MATEMATICA_APLICADA_DATA,
  ...MARKETING_ESTRATEGICO_DATA,
  ...GESTAO_FINANCEIRA_DATA,
  ...GESTAO_OPERACOES_DATA,
  ...INOVACAO_DATA,
  ...COMUNICACAO_DATA
];

export function mapTecnicoToCurriculum(item: TecnicoLessonItem): CurriculumItem {
  const isSemana = item.semana.toLowerCase().startsWith('semana');
  return {
    id: item.id,
    ano: item.ano,
    bimestre: item.bimestre,
    aula: isSemana ? `${item.semana} - ${item.aulaNumero}` : item.semana,
    titulo: `${item.tituloAula}`,
    conteudo: `Unidade: ${item.unidadeCurricular} [${item.codigoUnidade}] | Componente: ${item.codigoComponente} (${item.chTeoricaPratica === 'P' ? 'Prática' : 'Teórica'})\n\nTema: ${item.temaSemana}\nObjeto de Conhecimento: ${item.objetoConhecimento}`,
    objetivos: `Objetivo: ${item.objetivosAula}\n\nCompetência Técnica: ${item.competenciaTecnica}\nCompetência Socioemocional: ${item.competenciaSocioemocional}`,
    habilidade: `Técnicas: ${item.habilidadesTecnicas}\nSocioemocionais: ${item.habilidadesSocioemocionais}`,
    aprendizagem: `Formação Técnica Profissional: ${item.competenciaTecnica}`,
    disciplina: item.disciplina,
    raw: item
  };
}
