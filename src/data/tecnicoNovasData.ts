import { TecnicoLessonItem } from './tecnicoData';

export interface CompactWeek {
  s: number; // semana
  uc: string; // unidade curricular
  codU: string; // codigo unidade
  tema: string; // tema semana
  ct: string; // competencia tecnica
  cs: string; // competencia socioemocional
  tp?: 'T' | 'P'; // chTeoricaPratica (default T)
  aulas: {
    t: string; // titulo aula
    ht: string; // habilidade tecnica
    hs: string; // habilidade socioemocional
    obj: string; // objetivos aula
    oc: string; // objeto conhecimento
  }[];
}

export function expandCompactWeeks(
  disciplina: string,
  codigoComponente: string,
  aulasSemana: number,
  weeks: CompactWeek[],
  isComunicacaoEmpresarial = false
): TecnicoLessonItem[] {
  const result: TecnicoLessonItem[] = [];

  for (const w of weeks) {
    // Determine Bimestre
    let bimestre = '1º Bimestre';
    if (isComunicacaoEmpresarial) {
      if (w.s >= 8 && w.s <= 14) bimestre = '2º Bimestre';
      else if (w.s >= 15 && w.s <= 20) bimestre = '3º Bimestre';
      else if (w.s >= 21) bimestre = '4º Bimestre';
    } else {
      if (w.s >= 8 && w.s <= 14) bimestre = '2º Bimestre';
      else if (w.s >= 15 && w.s <= 21) bimestre = '3º Bimestre';
      else if (w.s >= 22) bimestre = '4º Bimestre';
    }

    w.aulas.forEach((a, index) => {
      result.push({
        id: `${codigoComponente.toLowerCase()}-s${w.s}-a${index + 1}`,
        ano: '3ª Série',
        bimestre,
        semana: `Semana ${w.s}`,
        disciplina,
        codigoComponente,
        chTeoricaPratica: w.tp || 'T',
        aulasSemana,
        unidadeCurricular: w.uc,
        codigoUnidade: w.codU,
        temaSemana: w.tema,
        aulaNumero: `Aula ${index + 1}`,
        tituloAula: a.t,
        competenciaTecnica: w.ct,
        competenciaSocioemocional: w.cs,
        habilidadesTecnicas: a.ht,
        habilidadesSocioemocionais: a.hs,
        objetivosAula: a.obj,
        objetoConhecimento: a.oc
      });
    });
  }

  // Add Recomposição / Visita Técnica at the end of each Bimestre
  const bimestres = isComunicacaoEmpresarial ? [1, 2, 3, 4] : [1, 2, 3, 4];
  bimestres.forEach(b => {
    let bLabel = `${b}º Bimestre`;
    result.push({
      id: `${codigoComponente.toLowerCase()}-rec-visita-b${b}`,
      ano: '3ª Série',
      bimestre: bLabel,
      semana: 'Recomposição / Visita Técnica',
      disciplina,
      codigoComponente,
      chTeoricaPratica: 'P',
      aulasSemana,
      unidadeCurricular: 'Visita Técnica / Recomposição',
      codigoUnidade: `VT${b}`,
      temaSemana: 'Vivência Prática nas Organizações e Recomposição',
      aulaNumero: 'Visita Técnica',
      tituloAula: 'Visita Técnica a Empresas e Recomposição da Aprendizagem',
      competenciaTecnica: `Observar in loco rotinas de ${disciplina} e sanar dúvidas de aprendizagem.`,
      competenciaSocioemocional: 'Curiosidade, postura profissional e proatividade.',
      habilidadesTecnicas: 'Relacionar teoria e prática empresarial observada.',
      habilidadesSocioemocionais: 'Demonstrar conduta profissional, ética e pontualidade.',
      objetivosAula: 'Vivenciar o cotidiano das empresas e consolidar conceitos bimestrais.',
      objetoConhecimento: 'Vivência prática em campo e consolidação de aprendizagens',
      isRecomposicaoOuVisita: true
    });
  });

  return result;
}

// =========================================================================
// A) Marketing Estratégico (C1, 3 aulas/semana)
// =========================================================================
const MARKETING_WEEKS: CompactWeek[] = [
  {
    s: 1, uc: 'Introdução ao Marketing', codU: 'U1', tema: 'Conceitos Básicos de Marketing',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Definição e importância do marketing', ht: 'Reconhecer se uma empresa está orientada para a administração de marketing.', hs: 'Analisar situações complexas.', obj: 'Compreender o conceito de marketing e a sua relevância para o mercado.', oc: '1. Conceito e importância do marketing' },
      { t: 'Tipos de marketing', ht: 'Reconhecer se uma empresa está orientada para a administração de marketing.', hs: 'Analisar situações complexas.', obj: 'Identificar os diferentes tipos de marketing utilizados pelas organizações.', oc: '2. Tipos de marketing' },
      { t: 'Os Ps do marketing', ht: 'Reconhecer se uma empresa está orientada para a administração de marketing.', hs: 'Analisar situações complexas.', obj: 'Identificar os Ps do marketing em cenários reais.', oc: '3. Definição e identificação dos Ps do marketing' }
    ]
  },
  {
    s: 2, uc: 'Introdução ao Marketing', codU: 'U1', tema: 'Ambientes de Marketing',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Macroambiente – Matriz PESTEL', ht: 'Empregar o pensamento analítico a fim de obter uma visão clara e precisa das oportunidades e ameaças.', hs: 'Pensar de forma criativa e colaborativa no desenvolvimento da análise de ambiente.', obj: 'Compreender o conceito de macroambiente do marketing.', oc: '1. Compreensão do macroambiente por meio da Matriz PESTEL' },
      { t: 'Microambiente', ht: 'Empregar o pensamento analítico a fim de obter uma visão clara e precisa das oportunidades e ameaças.', hs: 'Pensar de forma criativa e colaborativa no desenvolvimento da análise de ambiente.', obj: 'Compreender o conceito de microambiente do marketing.', oc: '2. Compreensão do microambiente do marketing' },
      { t: 'Análise SWOT dos ambientes de marketing', ht: 'Empregar o pensamento analítico a fim de obter uma visão clara e precisa das oportunidades e ameaças.', hs: 'Pensar de forma criativa e colaborativa no desenvolvimento da análise de ambiente.', obj: 'Identificar e analisar as forças, as fraquezas, as oportunidades e as ameaças (SWOT).', oc: '3. Análise SWOT como ferramenta de análise dos ambientes' }
    ]
  },
  {
    s: 3, uc: 'Introdução ao Marketing', codU: 'U1', tema: 'Comportamento do Consumidor',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Processo de decisão de compra', ht: 'Identificar dados e informações sobre o mercado e seus segmentos.', hs: 'Desenvolver interesse por novas ideias e conceitos.', obj: 'Identificar as etapas que compõem o processo de decisão de compra.', oc: '1. Compreensão das etapas que envolvem o processo de decisão' },
      { t: 'Fatores que influenciam o comportamento do consumidor', ht: 'Identificar dados e informações sobre o mercado e seus segmentos.', hs: 'Desenvolver interesse por novas ideias e conceitos.', obj: 'Identificar os fatores que influenciam o comportamento do consumidor.', oc: '2. Fatores que influenciam o comportamento do consumidor' },
      { t: 'Segmentação de mercado', ht: 'Identificar dados e informações sobre o mercado e seus segmentos.', hs: 'Desenvolver interesse por novas ideias e conceitos.', obj: 'Compreender como ocorre a divisão do mercado em segmentos homogêneos.', oc: '3. Identificação dos métodos de segmentação de mercado e suas aplicações' }
    ]
  },
  {
    s: 4, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Estratégias de Marketing Competitivo', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Aplicação prática da Matriz PESTEL', ht: 'Aplicar as ferramentas PESTEL e SWOT para a análise do ambiente de uma organização real.', hs: 'Pensar de maneira crítica e inovadora sobre as informações coletadas.', obj: 'Aplicar a ferramenta PESTEL para análise de macroambiente de uma empresa simulada.', oc: '1. Aplicabilidade da Matriz PESTEL' },
      { t: 'Compreender a aplicação prática da Análise SWOT', ht: 'Aplicar as ferramentas PESTEL e SWOT para a análise do ambiente de uma organização real.', hs: 'Pensar de maneira crítica e inovadora sobre as informações coletadas.', obj: 'Aplicar a ferramenta Análise SWOT para análise de ambiente de uma empresa real.', oc: '2. Aplicabilidade da Análise SWOT' },
      { t: 'Análise prática do macroambiente e microambiente', ht: 'Aplicar as ferramentas PESTEL e SWOT para a análise do ambiente de uma organização real.', hs: 'Pensar de maneira crítica e inovadora sobre as informações coletadas.', obj: 'Analisar na prática, de forma crítica e a partir das Matrizes PESTEL e SWOT.', oc: '3. Elaboração de documento de análise crítica do macroambiente' }
    ]
  },
  {
    s: 5, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Análise: Posicionamento Estratégico e Vantagem',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Análise da concorrência', ht: 'Utilizar ferramentas de análise do mercado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Identificar os concorrentes diretos e indiretos de uma empresa.', oc: '1. Identificação dos concorrentes diretos e indiretos' },
      { t: 'Estratégias de posicionamento', ht: 'Utilizar ferramentas de análise do mercado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Compreender os conceitos de posicionamento de mercado.', oc: '2. Compreensão das estratégias de posicionamento' },
      { t: 'Vantagem competitiva', ht: 'Utilizar ferramentas de análise do mercado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Compreender a aplicação de técnicas e ferramentas de vantagem competitiva.', oc: '3. Técnicas de vantagem competitiva no mercado' }
    ]
  },
  {
    s: 6, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Planejamento de Marketing',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Definição e importância do plano de marketing', ht: 'Aplicar os conceitos fundamentais de um plano de marketing, destacando sua relevância estratégica.', hs: 'Trabalhar de forma colaborativa e harmoniosa com a equipe.', obj: 'Compreender a importância de um plano de marketing como um guia estratégico.', oc: '1. Plano de marketing: guia estratégico' },
      { t: 'Elementos de um plano de marketing', ht: 'Aplicar os conceitos fundamentais de um plano de marketing, destacando sua relevância estratégica.', hs: 'Trabalhar de forma colaborativa e harmoniosa com a equipe.', obj: 'Compreender os elementos fundamentais de um plano de marketing.', oc: '2. Definição dos elementos de um plano de marketing' },
      { t: 'Processo de desenvolvimento do plano de marketing', ht: 'Aplicar os conceitos fundamentais de um plano de marketing, destacando sua relevância estratégica.', hs: 'Trabalhar de forma colaborativa e harmoniosa com a equipe.', obj: 'Compreender as etapas da criação de um plano de marketing eficaz e aplicável.', oc: '3. Escopo de um plano de marketing' }
    ]
  },
  {
    s: 7, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Gestão de Produto e Marca',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Ciclo de vida do produto', ht: 'Identificar os elementos-chave e as estratégias para a construção de uma marca forte.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas de marca.', obj: 'Compreender as diferentes fases do ciclo de vida de um produto.', oc: '1. Identificação das fases do ciclo de vida de um produto' },
      { t: 'Desenvolvimento de novos produtos', ht: 'Identificar os elementos-chave e as estratégias para a construção de uma marca forte.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas de marca.', obj: 'Compreender os processos de inovação e lançamento de novos produtos.', oc: '2. Processo de inovação de produtos' },
      { t: 'Gestão de marca', ht: 'Identificar os elementos-chave e as estratégias para a construção de uma marca forte.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas de marca.', obj: 'Identificar elementos principais de branding que auxiliam na construção de marca forte.', oc: '3. Análise crítica de uma marca forte' }
    ]
  },
  {
    s: 8, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Comunicação e Promoção',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Mix de comunicação e marketing', ht: 'Utilizar as principais ferramentas de comunicação de marketing para campanhas promocionais.', hs: 'Analisar situações complexas.', obj: 'Identificar as principais ferramentas de comunicação de marketing.', oc: '1. Ferramentas de comunicação de marketing' },
      { t: 'Planejamento de campanhas promocionais', ht: 'Utilizar as principais ferramentas de comunicação de marketing para campanhas promocionais.', hs: 'Analisar situações complexas.', obj: 'Relacionar o funcionamento de um planejamento e desenvolvimento de campanhas.', oc: '2. Análise de uma campanha de marketing' },
      { t: 'Mídias e ferramentas de comunicação', ht: 'Utilizar as principais ferramentas de comunicação de marketing para campanhas promocionais.', hs: 'Analisar situações complexas.', obj: 'Identificar como as mídias tradicionais e digitais podem ser integradas.', oc: '3. Integração de mídias tradicionais e digitais em campanhas' }
    ]
  },
  {
    s: 9, uc: 'Estratégias e Planejamento', codU: 'U2', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Escolhendo setor de atuação na prática', ht: 'Aplicar os conceitos fundamentais na elaboração de um plano de marketing no contexto real.', hs: 'Trabalhar de maneira colaborativa, estratégica e assertiva no desenvolvimento de projetos.', obj: 'Debater e escolher o setor de atuação alinhado ao plano de marketing.', oc: '1. Escolha do setor de atuação' },
      { t: 'Objetivos de marketing na prática', ht: 'Aplicar os conceitos fundamentais na elaboração de um plano de marketing no contexto real.', hs: 'Trabalhar de maneira colaborativa, estratégica e assertiva no desenvolvimento de projetos.', obj: 'Elaborar os objetivos de marketing do plano de acordo com as necessidades identificadas.', oc: '2. Definição dos objetivos de marketing' },
      { t: 'Construção do relatório na prática (parte 1)', ht: 'Aplicar os conceitos fundamentais na elaboração de um plano de marketing no contexto real.', hs: 'Trabalhar de maneira colaborativa, estratégica e assertiva no desenvolvimento de projetos.', obj: 'Elaborar o relatório do plano de marketing contendo a contextualização inicial do projeto.', oc: '3. Relatório do projeto: plano de marketing' }
    ]
  },
  {
    s: 10, uc: 'Pesquisa de Mercado e Segmentação', codU: 'U3', tema: 'Introdução à Pesquisa de Mercado',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Importância da pesquisa de mercado', ht: 'Conhecer as etapas do desenvolvimento de uma pesquisa de mercado com coleta de dados.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Identificar a importância da pesquisa de mercado e das decisões baseadas em dados.', oc: '1. Importância da pesquisa de mercado no processo de tomada de decisão' },
      { t: 'Tipos de pesquisa de mercado', ht: 'Conhecer as etapas do desenvolvimento de uma pesquisa de mercado com coleta de dados.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Compreender as características da pesquisa qualitativa e quantitativa no mercado.', oc: '2. Características da pesquisa de mercado qualitativa e quantitativa' },
      { t: 'Processo de pesquisa de mercado', ht: 'Conhecer as etapas do desenvolvimento de uma pesquisa de mercado com coleta de dados.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Identificar e demonstrar as etapas do desenvolvimento de uma pesquisa de mercado.', oc: '3. Etapas de uma pesquisa de mercado' }
    ]
  },
  {
    s: 11, uc: 'Pesquisa de Mercado e Segmentação', codU: 'U3', tema: 'Métodos de Coleta de Dados',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Pesquisa de campo', ht: 'Identificar métodos tradicionais e on-line para coletar dados, reconhecendo a importância de amostragem.', hs: 'Pensar de maneira crítica as informações coletadas e justificar suas escolhas de pesquisa.', obj: 'Compreender as técnicas de coleta de dados – entrevistas, observações de campo e questionários.', oc: '1. Técnicas de pesquisa de campo como método de coleta' },
      { t: 'Pesquisa on-line', ht: 'Identificar métodos tradicionais e on-line para coletar dados, reconhecendo a importância de amostragem.', hs: 'Pensar de maneira crítica as informações coletadas e justificar suas escolhas de pesquisa.', obj: 'Identificar o uso de ferramentas e técnicas para a coleta de dados on-line.', oc: '2. Identificação de ferramentas e técnicas para coleta de dados on-line' },
      { t: 'Painéis de consumidores e Focus Groups', ht: 'Identificar métodos tradicionais e on-line para coletar dados, reconhecendo a importância de amostragem.', hs: 'Pensar de maneira crítica as informações coletadas e justificar suas escolhas de pesquisa.', obj: 'Compreender a utilização de grupos de consumidores focados para coleta qualitativa.', oc: '3. Focus Groups como método de coleta de dados qualitativa' }
    ]
  },
  {
    s: 12, uc: 'Pesquisa de Mercado e Segmentação', codU: 'U3', tema: 'Segmentação de Mercado',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Critérios de segmentação', ht: 'Identificar segmentos-alvo promissores, apoiando o desenvolvimento de ações de marketing.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Identificar os critérios de segmentação de mercado na prática (demográfica, geográfica, etc.).', oc: '1. Critérios de segmentação de mercado na identificação de oportunidades' },
      { t: 'Escolha de segmentos de mercado', ht: 'Identificar segmentos-alvo promissores, apoiando o desenvolvimento de ações de marketing.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Compreender como selecionar os segmentos-alvo na segmentação de mercado.', oc: '2. Seleção de segmentos-alvo de mercado' },
      { t: 'Estratégias de segmentação', ht: 'Identificar segmentos-alvo promissores, apoiando o desenvolvimento de ações de marketing.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Compreender como as estratégias de segmentação de mercado auxiliam o posicionamento.', oc: '3. Aplicação das estratégias de segmentação de mercado' }
    ]
  },
  {
    s: 13, uc: 'Pesquisa de Mercado e Segmentação', codU: 'U3', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Análise de mercado e concorrência na prática', ht: 'Analisar mercado e concorrentes utilizando a Matriz SWOT, segmentação de mercado e definição de público-alvo.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Analisar o mercado e os concorrentes por meio da Matriz SWOT do plano em desenvolvimento.', oc: '1. Análise de mercado e de concorrentes' },
      { t: 'Definição do público-alvo – segmentação na prática', ht: 'Analisar mercado e concorrentes utilizando a Matriz SWOT, segmentação de mercado e definição de público-alvo.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Relacionar e definir a segmentação do público-alvo a partir de seus critérios.', oc: '2. Definição da segmentação do público-alvo do plano' },
      { t: 'Definição do público-alvo – criação de personas na prática', ht: 'Analisar mercado e concorrentes utilizando a Matriz SWOT, segmentação de mercado e definição de público-alvo.', hs: 'Pensar de maneira crítica e inovadora as informações coletadas.', obj: 'Identificar as personas que fazem parte do plano de marketing a partir do público-alvo.', oc: '3. Identificar as personas (cliente ideal) do plano de marketing' }
    ]
  },
  {
    s: 14, uc: 'Pesquisa de Mercado e Segmentação', codU: 'U3', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Estratégias de marketing na prática', ht: 'Definir a proposta de valor para o plano de marketing, documentando as estratégias do produto, preço e promoção.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Analisar o posicionamento por meio do mapa de posicionamento de mercado.', oc: '1. Análise de posicionamento' },
      { t: 'Definição dos Ps do marketing na prática', ht: 'Definir a proposta de valor para o plano de marketing, documentando as estratégias do produto, preço e promoção.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Definir os Ps e os canais do plano de marketing em desenvolvimento.', oc: '2. Definição dos Ps e canais do plano de marketing' },
      { t: 'Construção do relatório na prática (parte 2)', ht: 'Definir a proposta de valor para o plano de marketing, documentando as estratégias do produto, preço e promoção.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Registrar e organizar, no relatório do plano de marketing, as estratégias definidas.', oc: '3. Relatório do Projeto: plano de marketing' }
    ]
  },
  {
    s: 15, uc: 'Marketing Digital', codU: 'U4', tema: 'Fundamentos do Marketing Digital',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Conceitos básicos de marketing digital', ht: 'Reconhecer princípios fundamentais de marketing digital em diversos cenários organizacionais.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Compreender os conceitos básicos e a importância do marketing digital nas empresas.', oc: '1. Conceito e importância do marketing digital' },
      { t: 'Principais ferramentas de marketing digital', ht: 'Reconhecer princípios fundamentais de marketing digital em diversos cenários organizacionais.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Identificar as principais ferramentas de marketing digital disponíveis no mercado.', oc: '2. Ferramentas de marketing digital' },
      { t: 'Análise das ferramentas de marketing digital', ht: 'Reconhecer princípios fundamentais de marketing digital em diversos cenários organizacionais.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Analisar o uso das principais ferramentas de marketing digital aplicadas aos negócios.', oc: '3. Análise de ferramentas de marketing digital' }
    ]
  },
  {
    s: 16, uc: 'Marketing de Varejo e Serviços', codU: 'U5', tema: 'Fundamentos do Marketing de Varejo',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Estratégias de varejo', ht: 'Identificar estratégias eficazes de varejo, reconhecendo a importância da gestão do ponto de venda.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Compreender as principais estratégias de varejo e como impactam as vendas.', oc: '1. Estratégias de varejo' },
      { t: 'Gestão de lojas', ht: 'Identificar estratégias eficazes de varejo, reconhecendo a importância da gestão do ponto de venda.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Identificar os aspectos que influenciam a gestão de lojas físicas.', oc: '2. Aspectos influenciadores na gestão de lojas' },
      { t: 'Marketing de relacionamento no varejo', ht: 'Identificar estratégias eficazes de varejo, reconhecendo a importância da gestão do ponto de venda.', hs: 'Trabalhar em equipe de forma colaborativa.', obj: 'Compreender como a gestão de relacionamento com clientes (CRM) pode reter consumidores.', oc: '3. Plano básico para um programa de CRM' }
    ]
  },
  {
    s: 17, uc: 'Marketing Digital', codU: 'U4', tema: 'Estratégias de Marketing Digital',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Desenvolvimento de estratégias digitais', ht: 'Identificar oportunidades digitais e auxiliar no desenvolvimento de planos de ação específicos.', hs: 'Pensar e atuar criticamente.', obj: 'Desenvolver estratégias digitais alinhadas aos objetivos de negócio das empresas.', oc: '1. Desenvolvimento de estratégias digitais' },
      { t: 'Inbound Marketing', ht: 'Identificar oportunidades digitais e auxiliar no desenvolvimento de planos de ação específicos.', hs: 'Pensar e atuar criticamente.', obj: 'Compreender os conceitos fundamentais do Inbound Marketing e atração de leads.', oc: '2. Etapas do Inbound Marketing' },
      { t: 'Marketing de conteúdo', ht: 'Identificar oportunidades digitais e auxiliar no desenvolvimento de planos de ação específicos.', hs: 'Pensar e atuar criticamente.', obj: 'Criar um miniplano de Inbound Marketing para um produto ou marca específica.', oc: '3. Miniplano de Inbound Marketing' }
    ]
  },
  {
    s: 18, uc: 'Marketing Digital', codU: 'U4', tema: 'Redes Sociais e Marketing',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Principais plataformas de redes sociais', ht: 'Reconhecer o uso das plataformas adequadas para diferentes objetivos de campanhas e marcas.', hs: 'Analisar situações complexas.', obj: 'Compreender o uso de plataformas de redes sociais aplicadas ao marketing de negócios.', oc: '1. Plataformas de redes sociais' },
      { t: 'Estratégias de engajamento nas redes sociais', ht: 'Reconhecer o uso das plataformas adequadas para diferentes objetivos de campanhas e marcas.', hs: 'Analisar situações complexas.', obj: 'Desenvolver estratégias de engajamento nas redes sociais por meio de formatos específicos.', oc: '2. Estratégias de engajamento nas redes sociais' },
      { t: 'Medição e análise de desempenho em redes sociais', ht: 'Reconhecer o uso das plataformas adequadas para diferentes objetivos de campanhas e marcas.', hs: 'Analisar situações complexas.', obj: 'Compreender o uso de ferramentas e métricas para medir resultados em redes.', oc: '3. Ferramentas e métricas para avaliar as redes sociais' }
    ]
  },
  {
    s: 19, uc: 'Marketing Digital', codU: 'U4', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Ferramentas de marketing digital no plano de marketing', ht: 'Selecionar plataformas de redes sociais adequadas para um plano de marketing integrado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Definir as ferramentas de marketing digital a serem utilizadas no plano.', oc: '1. Definição das ferramentas de marketing digital no plano' },
      { t: 'Inbound marketing do plano de marketing', ht: 'Selecionar plataformas de redes sociais adequadas para um plano de marketing integrado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Desenvolver uma estratégia de Inbound Marketing direcionada no plano.', oc: '2. Estratégia de Inbound Marketing no plano de marketing' },
      { t: 'Plataforma de rede social do plano de marketing', ht: 'Selecionar plataformas de redes sociais adequadas para um plano de marketing integrado.', hs: 'Persistir diante de desafios e complexidades.', obj: 'Definir as plataformas de redes sociais para serem utilizadas no plano prático.', oc: '3. Definição de redes sociais para o plano de marketing' }
    ]
  },
  {
    s: 20, uc: 'Marketing de Varejo e Serviços', codU: 'U5', tema: 'Comportamento do Consumidor no Varejo',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Padrões de compra no varejo', ht: 'Compreender os fatores que influenciam a decisão de compra dos consumidores no ponto de venda.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Compreender as tendências e os fatores que influenciam a decisão de compra.', oc: '1. Tendências e fatores que influenciam a decisão de compra' },
      { t: 'Análise do ponto de venda (PDV)', ht: 'Compreender os fatores que influenciam a decisão de compra dos consumidores no ponto de venda.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Identificar as técnicas de merchandising e promoção aplicadas no PDV.', oc: '2. Techniques de merchandising e promoção no PDV' },
      { t: 'Experiência de compra', ht: 'Compreender os fatores que influenciam a decisão de compra dos consumidores no ponto de venda.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Criar um esboço de estratégia de merchandising e promoção para um negócio simulado.', oc: '3. Criação de esboço de merchandising e PDV' }
    ]
  },
  {
    s: 21, uc: 'Marketing Digital', codU: 'U4', tema: 'E-commerce e Publicidade On-line',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Fundamentos do e-commerce', ht: 'Compreender os processos de vendas on-line em plataformas estruturadas.', hs: 'Enfrentar e superar desafios durante a aplicação prática.', obj: 'Compreender a estrutura e o funcionamento do e-commerce no mercado atual.', oc: '1. Estruturas e funcionamento do e-commerce' },
      { t: 'Plataformas de e-commerce', ht: 'Compreender os processos de vendas on-line em plataformas estruturadas.', hs: 'Enfrentar e superar desafios durante a aplicação prática.', obj: 'Analisar as características, as vantagens e as desvantagens de plataformas de vendas.', oc: '2. Características das plataformas de vendas on-line' },
      { t: 'Publicidade on-line', ht: 'Compreender os processos de vendas on-line em plataformas estruturadas.', hs: 'Enfrentar e superar desafios durante a aplicação prática.', obj: 'Compreender a utilização de ferramentas publicitárias on-line (Ads e banners).', oc: '3. Utilização de ferramentas publicitárias on-line' }
    ]
  },
  {
    s: 22, uc: 'Marketing Digital', codU: 'U4', tema: 'Métricas e Análise de Dados Digitais',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Importância das métricas no marketing digital', ht: 'Avaliar pontos fortes e áreas de melhoria nas campanhas digitais desenvolvidas.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Compreender a importância das métricas no marketing digital e otimização.', oc: '1. Importância das métricas no marketing digital' },
      { t: 'Principais métricas de marketing digital', ht: 'Avaliar pontos fortes e áreas de melhoria nas campanhas digitais desenvolvidas.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Conhecer as principais métricas utilizadas no marketing digital (CPC, CTR, etc.).', oc: '2. Principais métricas do marketing digital' },
      { t: 'Ferramentas de análise de dados', ht: 'Avaliar pontos fortes e áreas de melhoria nas campanhas digitais desenvolvidas.', hs: 'Avaliar informações, tomar decisões informadas e justificar suas escolhas.', obj: 'Identificar as principais ferramentas de análise de dados aplicadas ao marketing.', oc: '3. Principais ferramentas de análise de dados no marketing' }
    ]
  },
  {
    s: 23, uc: 'Marketing Digital', codU: 'U4', tema: 'UX e UI no Marketing Digital',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Experiência do Usuário (UX)', ht: 'Contribuir na análise dos princípios fundamentais e das boas práticas de design e usabilidade.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Compreender os princípios fundamentais da Experiência do Usuário (UX).', oc: '1. Princípios fundamentais da Experiência do Usuário (UX)' },
      { t: 'Design de Interface do Usuário (UI)', ht: 'Contribuir na análise dos princípios fundamentais e das boas práticas de design e usabilidade.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Identificar boas práticas e tendências atuais em Design de Interface do Usuário (UI).', oc: '2. Boas práticas e tendências em Design de Interface do Usuário' },
      { t: 'Criação de uma landing page', ht: 'Contribuir na análise dos princípios fundamentais e das boas práticas de design e usabilidade.', hs: 'Colaborar e comunicar-se efetivamente com colegas para alcançar objetivos.', obj: 'Aplicar conceitos de UX e UI para criar uma landing page eficaz em campanhas.', oc: '3. Criação de uma landing page de uma campanha' }
    ]
  },
  {
    s: 24, uc: 'Marketing de Varejo e Serviços', codU: 'U5', tema: 'Marketing de Serviços',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Características dos serviços', ht: 'Aplicar conceitos de características dos serviços, criando propostas de valor diferenciadas.', hs: 'Superar desafios e alcançar objetivos em equipes.', obj: 'Compreender as características do marketing de serviços e sua especificidade.', oc: '1. Características do marketing de serviços' },
      { t: 'Estratégias de marketing de serviços', ht: 'Aplicar conceitos de características dos serviços, criando propostas de valor diferenciadas.', hs: 'Superar desafios e alcançar objetivos em equipes.', obj: 'Discutir estratégias de personalização e diferenciação na entrega de serviços.', oc: '2. Estratégias de personalização e diferenciação' },
      { t: 'Criação de um plano estratégico', ht: 'Aplicar conceitos de características dos serviços, criando propostas de valor diferenciadas.', hs: 'Superar desafios e alcançar objetivos em equipes.', obj: 'Aplicar os conceitos de características dos serviços em plano estratégico.', oc: '3. Plano estratégico de serviços' }
    ]
  },
  {
    s: 25, uc: 'Marketing Digital', codU: 'U4', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Landing page para o plano de marketing', ht: 'Desenvolver estratégias de marketing digital de um plano de marketing no contexto prático.', hs: 'Trabalhar em equipe de forma organizada.', obj: 'Desenvolver uma landing page para o plano de marketing em desenvolvimento.', oc: '1. Criação de uma landing page para o plano de marketing' },
      { t: 'Plano de serviços para o plano de marketing', ht: 'Desenvolver estratégias de marketing digital de um plano de marketing no contexto prático.', hs: 'Trabalhar em equipe de forma organizada.', obj: 'Desenvolver um plano básico de serviços alinhado ao projeto de marketing.', oc: '2. Plano básico de serviços para o plano de marketing' },
      { t: 'Ajustes e entrega do plano de marketing', ht: 'Desenvolver estratégias de marketing digital de um plano de marketing no contexto prático.', hs: 'Trabalhar em equipe de forma organizada.', obj: 'Realizar os últimos ajustes no plano de marketing e organizar entrega final.', oc: '3. Ajustes e finalização do plano de marketing' }
    ]
  },
  {
    s: 26, uc: 'Marketing Digital', codU: 'U4', tema: 'Tendências em Marketing Digital',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Inteligência Artificial e automação', ht: 'Utilizar ferramentas de Inteligência Artificial e automação de marketing em planos.', hs: 'Demonstrar interesse por novas ideias e conhecimentos de tecnologia.', obj: 'Compreender como a Inteligência Artificial e a automação podem ser aplicadas.', oc: '1. Uso da Inteligência Artificial e automação no marketing digital' },
      { t: 'Marketing de influência', ht: 'Utilizar ferramentas de Inteligência Artificial e automação de marketing em planos.', hs: 'Demonstrar interesse por novas ideias e conhecimentos de tecnologia.', obj: 'Compreender o papel dos influenciadores digitais no marketing contemporâneo.', oc: '2. Papel dos influenciadores digitais no marketing' },
      { t: 'Realidade aumentada e virtual', ht: 'Utilizar ferramentas de Inteligência Artificial e automação de marketing em planos.', hs: 'Demonstrar interesse por novas ideias e conhecimentos de tecnologia.', obj: 'Identificar o uso da realidade aumentada e virtual aplicada à publicidade.', oc: '3. Uso da realidade aumentada e virtual no marketing' }
    ]
  },
  {
    s: 27, uc: 'Marketing de Varejo e Serviços', codU: 'U5', tema: 'Tendências em Marketing de Varejo e Serviços',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Omnichannel', ht: 'Contribuir no planejamento e na implementação de estratégias de marketing integradas.', hs: 'Demonstrar interesse por novas ideias e conceitos inovadores.', obj: 'Definir o conceito de omnichannel e a importância de canais integrados.', oc: '1. Definição e importância de omnichannel' },
      { t: 'Tecnologia no varejo', ht: 'Contribuir no planejamento e na implementação de estratégias de marketing integradas.', hs: 'Demonstrar interesse por novas ideias e conceitos inovadores.', obj: 'Compreender como a tecnologia pode ser aplicada no varejo físico e virtual.', oc: '2. O uso da tecnologia no varejo' },
      { t: 'Sustentabilidade e responsabilidade social', ht: 'Contribuir no planejamento e na implementação de estratégias de marketing integradas.', hs: 'Demonstrar interesse por novas ideias e conceitos inovadores.', obj: 'Reconhecer práticas sustentáveis e socialmente responsáveis na gestão varejista.', oc: '3. Práticas sustentáveis e socialmente responsáveis no varejo' }
    ]
  },
  {
    s: 28, uc: 'Marketing de Varejo e Serviços', codU: 'U5', tema: 'Projeto: Planejamento do Plano de Marketing', tp: 'P',
    ct: 'Apoiar o desenvolvimento de estratégias de marketing para os diferentes produtos e os diferentes tipos de empresa; Pensamento analítico para o apoio e exploração intelectual.',
    cs: 'Curiosidade - Ser interessado em ideias e ter paixão por aprender, compreensão e exploração intelectual; uma mentalidade curiosa.',
    aulas: [
      { t: 'Apresentação do plano de marketing', ht: 'Estruturar e praticar técnicas de apresentação em público de projetos.', hs: 'Colaborar e comunicar-se efetivamente na socialização de ideias.', obj: 'Apresentar o plano de marketing desenvolvido ao longo do ano para feedback.', oc: '1. Apresentação do plano de marketing' },
      { t: 'Socialização de estratégias do plano de marketing', ht: 'Estruturar e praticar técnicas de apresentação em público de projetos.', hs: 'Colaborar e comunicar-se efetivamente na socialização de ideias.', obj: 'Apresentar o plano de marketing focando nas propostas inovadoras.', oc: '2. Apresentação do plano de marketing' },
      { t: 'Feedback do plano de marketing', ht: 'Estruturar e praticar técnicas de apresentação em público de projetos.', hs: 'Colaborar e comunicar-se efetivamente na socialização de ideias.', obj: 'Compreender o feedback do plano de marketing e da apresentação realizada.', oc: '3. Feedback do plano de marketing' }
    ]
  }
];

export const MARKETING_ESTRATEGICO_DATA = expandCompactWeeks(
  'Marketing Estratégico',
  'C1',
  3,
  MARKETING_WEEKS
);
