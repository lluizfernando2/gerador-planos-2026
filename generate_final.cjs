const fs = require('fs');

const grades = ['1ª Série', '2ª Série', '3ª Série'];
const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];

let dataMap = new Map();

function addClassesPlaceholder(disc, grade, bim, aulas) {
  for (const aula of aulas) {
    const id = `${disc.replace(/\s/g,'')}-${grade.replace(/\s/g,'')}-${bim.replace(/\s/g,'')}-${aula}`;
    if (!dataMap.has(id)) {
      dataMap.set(id, {
        id,
        disciplina: disc,
        ano: grade,
        bimestre: bim,
        aula: String(aula),
        titulo: "",
        conteudo: "",
        objetivos: "",
        eixo: "",
        unidadeTematica: "",
        habilidade: ""
      });
    }
  }
}

function addClassesRich(idPrefix, disciplina, ano, bimestre, lessons) {
  lessons.forEach((l, index) => {
    const aulaNum = l.aula || String(index + 1);
    const id = `${disciplina.replace(/\s/g,'')}-${ano.replace(/\s/g,'')}-${bimestre.replace(/\s/g,'')}-${aulaNum}`;
    
    dataMap.set(id, {
      id,
      disciplina,
      ano,
      bimestre,
      aula: String(aulaNum),
      titulo: l.titulo || "",
      conteudo: l.conteudo || '',
      objetivos: l.objetivos || '',
      eixo: l.eixo || '',
      unidadeTematica: l.unidadeTematica || '',
      habilidade: l.habilidade || '',
    });
  });
}

// 1. Aprofundamentos base - Rich mapping for Itinerários Formativos
const subjectGradesMap = {
  'Empreendedorismo': {
    '2ª Série': { '1º Bimestre': 7, '2º Bimestre': 7, '3º Bimestre': 6, '4º Bimestre': 6 },
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Aprofundamento em Sociologia': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Aprofundamento em Biologia': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Aprofundamento em Filosofia': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Aprofundamento em Geografia': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Arte e Mídias Digitais': {
    '2ª Série': { '1º Bimestre': 7, '2º Bimestre': 7, '3º Bimestre': 6, '4º Bimestre': 6 }
  },
  'Atualidades': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Liderança e Oratória': {
    '2ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  },
  'Aprofundamento em Química': {
    '3ª Série': { '1º Bimestre': 14, '2º Bimestre': 14, '3º Bimestre': 12, '4º Bimestre': 12 }
  }
};

const topicsMap = {
  'Empreendedorismo': {
    '1º Bimestre': [
      { titulo: "Introdução ao Empreendedorismo", conteudo: "Conceitos de empreendedorismo, identificação de oportunidades e o perfil do empreendedor moderno.", objetivos: "Compreender os conceitos fundamentais do empreendedorismo e identificar as características de perfil empreendedor.", habilidade: "EM13CG01", eixo: "Empreendedorismo" },
      { titulo: "Design Thinking e Ideação", conteudo: "Abordagem do Design Thinking para resolução de problemas reais de forma criativa e iterativa.", objetivos: "Aplicar etapas do Design Thinking para propor soluções criativas para problemas da comunidade.", habilidade: "EM13CG02", eixo: "Processos Criativos" },
      { titulo: "Análise de Público e Clientes", conteudo: "Compreensão do público-alvo, persona e mapeamento de necessidades de potenciais clientes.", objetivos: "Definir personas e conduzir mapeamentos de dores e necessidades de mercado.", habilidade: "EM13CG03", eixo: "Investigação Científica" }
    ],
    '2º Bimestre': [
      { titulo: "Business Model Canvas", conteudo: "Desenho de modelos de negócios através de nove blocos estruturantes de forma ágil.", objetivos: "Estruturar uma proposta de valor clara através do quadro Canvas de Modelo de Negócio.", habilidade: "EM13CG04", eixo: "Empreendedorismo" },
      { titulo: "Finanças Empreendedoras", conteudo: "Noções básicas de custos, receitas, fluxo de caixa, precificação e capital de giro.", objetivos: "Calcular pontos de equilíbrio financeiro e custos fundamentais de um produto ou serviço.", habilidade: "EM13CG05", eixo: "Empreendedorismo" },
      { titulo: "Sustentabilidade nos Negócios", conteudo: "Negócios sociais, economia circular e estratégias de impacto socioambiental positivo.", objetivos: "Planejar empreendimentos sustentáveis alinhados aos Objetivos de Desenvolvimento Sustentável.", habilidade: "EM13CG06", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '3º Bimestre': [
      { titulo: "Marketing e Canais", conteudo: "Estratégias de atração, funil de vendas, canais de comunicação e identidade de marca.", objetivos: "Criar planos de marketing básico de divulgação e engajamento com clientes.", habilidade: "EM13CG07", eixo: "Processos Criativos" },
      { titulo: "Prototipagem de Produtos", conteudo: "Construção de MVP (Mínimo Produto Viável) para validação rápida no mercado.", objetivos: "Construir protótipos rápidos e de baixo custo para testar hipóteses de negócio.", habilidade: "EM13CG08", eixo: "Processos Criativos" }
    ],
    '4º Bimestre': [
      { titulo: "Técnicas de Pitch", conteudo: "Comunicação de projetos de forma curta, persuasiva e impactante para investidores.", objetivos: "Desenvolver apresentações eficazes utilizando a estrutura clássica de pitch comercial.", habilidade: "EM13CG09", eixo: "Processos Criativos" },
      { titulo: "Feira de Negócios e Avaliação", conteudo: "Apresentação prática dos projetos à comunidade escolar e consolidação dos resultados.", objetivos: "Executar apresentações públicas coletivas de projetos empreendedores e refletir criticamente.", habilidade: "EM13CG10", eixo: "Empreendedorismo" }
    ]
  },
  'Arte e Mídias Digitais': {
    '1º Bimestre': [
      { titulo: "Cultura e Estética Digital", conteudo: "Histórico das mídias digitais, manifestações de arte digital e novas linguagens contemporâneas.", objetivos: "Compreender as relações entre arte, tecnologia e sociedade ao longo da história recente.", habilidade: "EM13LGG601", eixo: "Processos Criativos" },
      { titulo: "Design Gráfico e Composição", conteudo: "Princípios de teoria das cores, tipografia estruturada, gestalt e hierarquia visual.", objetivos: "Aplicar regras de contraste, cores e tipografia em peças visuais digitais.", habilidade: "EM13LGG602", eixo: "Processos Criativos" }
    ],
    '2º Bimestre': [
      { titulo: "Fotografia e Edição Digital", conteudo: "Composição fotográfica, enquadramento, planos visuais e ferramentas de tratamento de imagens.", objetivos: "Capturar e editar fotos digitais de alta qualidade para narrativas visuais.", habilidade: "EM13LGG603", eixo: "Processos Criativos" },
      { titulo: "Produção de Áudio e Podcasts", conteudo: "Técnicas de roteiro para áudio, captação acústica, sonorização e edição básica de faixas.", objetivos: "Gravar e editar episódios de podcasts abordando temas escolares ou sociais.", habilidade: "EM13LGG604", eixo: "Processos Criativos" }
    ],
    '3º Bimestre': [
      { titulo: "Criação e Edição de Vídeos", conteudo: "Linguagem audiovisual, etapas de roteirização, técnicas de gravação e softwares de edição.", objetivos: "Produzir pequenos documentários ou curtas de vídeo com ferramentas acessíveis.", habilidade: "EM13LGG605", eixo: "Processos Criativos" },
      { titulo: "Redes Sociais e Narrativas", conteudo: "Estruturação de narrativas transmídia e curadoria de conteúdo para redes sociais digitais.", objetivos: "Criar campanhas digitais de conscientização social em plataformas online.", habilidade: "EM13LGG606", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '4º Bimestre': [
      { titulo: "Arte Interativa e Instalações", conteudo: "Instalações multimídia, projeções artísticas mapeadas e o papel ativo do espectador.", objetivos: "Conceber instalações artísticas integrando recursos digitais e espaços físicos.", habilidade: "EM13LGG607", eixo: "Processos Criativos" },
      { titulo: "Exposição Multimídia Virtual", conteudo: "Planejamento, curadoria e publicação de portfólios ou galerias digitais abertas.", objetivos: "Organizar uma mostra virtual das produções artísticas realizadas no ano.", habilidade: "EM13LGG608", eixo: "Mediação e Intervenção Sociocultural" }
    ]
  },
  'Liderança e Oratória': {
    '1º Bimestre': [
      { titulo: "Fundamentos da Comunicação", conteudo: "Elementos do processo comunicativo, escuta ativa, feedback e barreiras de compreensão.", objetivos: "Desenvolver habilidades de escuta empática e compreender os fluxos da oratória clara.", habilidade: "EM13LGG101", eixo: "Processos Criativos" },
      { titulo: "Linguagem Corporal e Postura", conteudo: "Expressão não verbal: postura corporal, gestos intencionais, controle do nervosismo e contato visual.", objetivos: "Controlar a linguagem corporal para conferir credibilidade e dinamismo em apresentações.", habilidade: "EM13LGG102", eixo: "Processos Criativos" }
    ],
    '2º Bimestre': [
      { titulo: "Voz, Dicção e Respiração", conteudo: "Técnicas de projeção vocal, articulação precisa das palavras e exercícios de respiração diafragmática.", objetivos: "Utilizar a modulação de tom e velocidade da voz de maneira expressiva e consciente.", habilidade: "EM13LGG103", eixo: "Processos Criativos" },
      { titulo: "Estrutura do Discurso Persuasivo", conteudo: "Organização lógica de discursos: introdução magnética, desenvolvimento consistente e conclusão memorável.", objetivos: "Estruturar roteiros de apresentações orais aplicando técnicas de retórica.", habilidade: "EM13LGG104", eixo: "Processos Criativos" }
    ],
    '3º Bimestre': [
      { titulo: "Argumentação e Retórica", conteudo: "Técnicas de convencimento e persuasão fundamentadas nos eixos aristotélicos (Ethos, Pathos, Logos).", objetivos: "Formular argumentos robustos com base em evidências, rebatendo falácias lógicas.", habilidade: "EM13LGG105", eixo: "Investigação Científica" },
      { titulo: "Oratória para Negociação", conteudo: "Princípios de comunicação não violenta, inteligência emocional e resolução de conflitos coletivos.", objetivos: "Mediar conversas complexas e debates atingindo consensos produtivos.", habilidade: "EM13LGG106", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '4º Bimestre': [
      { titulo: "Liderança Inspiradora", conteudo: "Perfis de liderança situacional, motivação de equipes e condução ética de reuniões.", objetivos: "Liderar grupos de trabalho promovendo a colaboração e a delegação eficiente de tarefas.", habilidade: "EM13LGG107", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Grande Debate e Simulações", conteudo: "Prática em formato de painéis temáticos e debates formais com avaliação e feedback cooperativo.", objetivos: "Apresentar discursos improvisados ou preparados e avaliar o desenvolvimento individual.", habilidade: "EM13LGG108", eixo: "Processos Criativos" }
    ]
  },
  'Atualidades': {
    '1º Bimestre': [
      { titulo: "Globalização e Conectividade", conteudo: "O mundo globalizado em rede: fluxos financeiros, de mercadorias, informações e migrações.", objetivos: "Analisar as vantagens e as contradições da globalização econômica e cultural contemporânea.", habilidade: "EM13CHS102", eixo: "Investigação Científica" },
      { titulo: "Geopolítica Global e Tensões", conteudo: "Análise das principais zonas de tensão mundial, blocos econômicos e acordos de segurança internacional.", objetivos: "Identificar as causas e consequências geopolíticas de conflitos atuais pelo mundo.", habilidade: "EM13CHS103", eixo: "Investigação Científica" }
    ],
    '2º Bimestre': [
      { titulo: "Emergência Climática e COP", conteudo: "Aquecimento global, acordos ambientais internacionais e caminhos para a transição energética global.", objetivos: "Avaliar o andamento das metas climáticas internacionais e propor ações sustentáveis locais.", habilidade: "EM13CHS201", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Mercado de Trabalho e Indústria 4.0", conteudo: "A digitalização da economy, automação, gig economy e as novas demandas profissionais mundiais.", objetivos: "Discutir os desafios do desemprego estrutural e as transformações na legislação trabalhista.", habilidade: "EM13CHS202", eixo: "Investigação Científica" }
    ],
    '3º Bimestre': [
      { titulo: "Direitos Humanos e Migrações", conteudo: "Crise global de refugiados, minorias, inclusão social e declarações de direitos fundamentais.", objetivos: "Compreender os fluxos migratórios atuais a partir da perspectiva dos Direitos Humanos.", habilidade: "EM13CHS501", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Algoritmos e Pós-Verdade", conteudo: "A circulação de desinformação (fake news), bolhas digitais, segurança cibernética e regulação das redes.", objetivos: "Identificar vieses informativos de fontes digitais e desenvolver senso crítico na web.", habilidade: "EM13CHS502", eixo: "Investigação Científica" }
    ],
    '4º Bimestre': [
      { titulo: "Saúde Pública e Soberania", conteudo: "Segurança alimentar mundial, acesso a vacinas e a cooperação internacional em ciência.", objetivos: "Analisar os impactos socioeconômicos de crises sanitárias recentes nas populações vulneráveis.", habilidade: "EM13CHS601", eixo: "Investigação Científica" },
      { titulo: "O Brasil no Cenário Internacional", conteudo: "A inserção diplomática e econômica brasileira, reformas estruturais internas e sustentabilidade.", objetivos: "Propor soluções para gargalos produtivos e educacionais do Brasil contemporâneo.", habilidade: "EM13CHS602", eixo: "Mediação e Intervenção Sociocultural" }
    ]
  },
  'Aprofundamento em Biologia': {
    '1º Bimestre': [
      { titulo: "Metodologia Científica", conteudo: "Formulação de hipóteses científicas, desenho experimental, coleta de variáveis e ética.", objetivos: "Planejar e esquematizar uma investigação de biologia seguindo o método científico padrão.", habilidade: "EM13CNT301", eixo: "Investigação Científica" },
      { titulo: "Biotecnologia e Genoma", conteudo: "Tecnologia de edição gênica (CRISPR), organismos transgênicos, clonagem terapêutica e testes de DNA.", objetivos: "Analisar as aplicações industriais e biomédicas da manipulação genética moderna.", habilidade: "EM13CNT302", eixo: "Investigação Científica" }
    ],
    '2º Bimestre': [
      { titulo: "Epidemiologia e Imunologia", conteudo: "Mecanismos de transmissão de patógenos, vacinação em massa, imunidade humoral e controle de vetores.", objetivos: "Desenvolver planos de conscientização sobre controle epidemiológico e vacinas na comunidade.", habilidade: "EM13CNT303", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Biodiversidade e Conservação", conteudo: "Ecologia populacional, hotspots de biodiversidade, corredores ecológicos e unidades de conservação.", objetivos: "Avaliar o estado de conservação de biomas locais e propor soluções de reflorestamento.", habilidade: "EM13CNT304", eixo: "Investigação Científica" }
    ],
    '3º Bimestre': [
      { titulo: "Mudanças Climáticas nos Ecossistemas", conteudo: "Efeito estufa ampliado, acidificação dos oceanos, bioindicadores e perda de serviços ecossistêmicos.", objetivos: "Estudar o impacto do aquecimento global na distribuição geográfica de espécies nativas.", habilidade: "EM13CNT305", eixo: "Investigação Científica" },
      { titulo: "Biorremediação de Solos e Águas", conteudo: "Utilização de bactérias, fungos ou plantas modificadas para degradação de poluentes químicos.", objetivos: "Esboçar um modelo experimental de tratamento biológico para resíduos industriais locais.", habilidade: "EM13CNT306", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '4º Bimestre': [
      { titulo: "Fisiologia e Adaptações Celulares", conteudo: "Mecanismos de homeostase, regulação térmica celular e sinalizações hormonais em condições extremas.", objetivos: "Explicar as adaptações funcionais do metabolismo celular perante estressores externos.", habilidade: "EM13CNT307", eixo: "Investigação Científica" },
      { titulo: "Divulgação Científica em Biologia", conteudo: "Combate à pseudociência e ao negacionismo biológico através de materiais didáticos e mídias.", objetivos: "Produzir boletins informativos de biologia traduzindo termos acadêmicos para o grande público.", habilidade: "EM13CNT308", eixo: "Processos Criativos" }
    ]
  },
  'Aprofundamento em Filosofia': {
    '1º Bimestre': [
      { titulo: "Epistemologia e Verdade", conteudo: "Como se constrói o conhecimento verdadeiro? Racionalismo, empirismo e ceticismo filosófico.", objetivos: "Diferenciar as visões clássica e moderna sobre a natureza da verdade e do saber científico.", habilidade: "EM13CHS101", eixo: "Investigação Científica" },
      { titulo: "Filosofia da Ciência", conteudo: "Debates contemporâneos sobre o método científico: Popper, Kuhn e a evolução dos paradigmas.", objetivos: "Analisar as condições de validade das teorias científicas e suas rupturas históricas.", habilidade: "EM13CHS102", eixo: "Investigação Científica" }
    ],
    '2º Bimestre': [
      { titulo: "Ética Aplicada e Bioética", conteudo: "Dilemas éticos contemporâneos: inteligência artificial, manipulação genética e ética animal.", objetivos: "Aplicar correntes éticas tradicionais na resolução de debates tecnológicos atuais.", habilidade: "EM13CHS301", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Teorias da Justiça e Democracia", conteudo: "Contractualismo clássico e o debate contemporâneo de John Rawls sobre equidade e bem comum.", objetivos: "Avaliar políticas redistributivas sob a ótica das teorias de justiça social.", habilidade: "EM13CHS302", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '3º Bimestre': [
      { titulo: "Estética e Indústria Cultural", conteudo: "A perda da aura na arte, reprodutibilidade técnica, Adorno e a recepção estética de massa.", objetivos: "Analisar a mercadorização da arte e as possibilidades de emancipação criativa digital.", habilidade: "EM13CHS501", eixo: "Processos Criativos" },
      { titulo: "Filosofia da Tecnologia", conteudo: "Alienação na era dos algoritmos, pós-humanismo, cibercultura e redes sociais cooperativas.", objetivos: "Avaliar o impacto existencial e político da dependência tecnológica nas juventudes.", habilidade: "EM13CHS502", eixo: "Investigação Científica" }
    ],
    '4º Bimestre': [
      { titulo: "Existencialismo Contemporâneo", conteudo: "Sartre, Beauvoir e Camus: liberdade, angústia, responsabilidade social e engajamento político.", objetivos: "Refletir sobre a construção autônoma da identidade individual e do projeto de vida.", habilidade: "EM13CHS601", eixo: "Investigação Científica" },
      { titulo: "Filosofia da Diferença e Poder", conteudo: "A arqueologia do saber em Foucault, biopolítica, microfísica do poder e as alteridades.", objetivos: "Identificar mecanismos de exclusão institucional de diversidades culturais e sociais.", habilidade: "EM13CHS602", eixo: "Mediação e Intervenção Sociocultural" }
    ]
  },
  'Aprofundamento em Geografia': {
    '1º Bimestre': [
      { titulo: "Geotecnologias Applied", conteudo: "Princípios de sensoriamento remoto, cartografia digital, sistemas de informação geográfica (SIG).", objetivos: "Interpretar e elaborar mapas temáticos interativos com dados socioespaciais públicos.", habilidade: "EM13CHS201", eixo: "Investigação Científica" },
      { titulo: "Geografia Urbana das Cidades", conteudo: "Gentrificação, metropolização, cidades inteligentes, segregação socioespacial e mobilidade urbana.", objetivos: "Propor soluções de planejamento para os gargalos de transporte e habitação locais.", habilidade: "EM13CHS202", eixo: "Investigação Científica" }
    ],
    '2º Bimestre': [
      { titulo: "Geopolítica Ambiental e Recursos", conteudo: "A disputa internacional por água doce, minerais raros, terras agricultáveis e petróleo.", objetivos: "Analisar o impacto ecológico e estratégico das disputas energéticas internacionais.", habilidade: "EM13CHS301", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Agronegócio e Agricultura Familiar", conteudo: "Modernização conservadora do campo, latifúndios, agroecologia e segurança alimentar.", objetivos: "Contrastar os modelos de produção agrícola em larga escala com a produção orgânica familiar.", habilidade: "EM13CHS302", eixo: "Investigação Científica" }
    ],
    '3º Bimestre': [
      { titulo: "Transições Demográficas Globais", conteudo: "Envelhecimento populacional acelerado, políticas natalistas, fluxos migratórios e xenofobia.", objetivos: "Projetar os impactos econômicos das pirâmides etárias futuras na previdência social.", habilidade: "EM13CHS401", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Representação de Dados Cartográficos", conteudo: "Anamorfoses geográficas, gráficos estatísticos espaciais, projeções distorcidas e ideologias.", objetivos: "Identificar as intencionalidades políticas por trás de diferentes projeções de mapas mundi.", habilidade: "EM13CHS402", eixo: "Investigação Científica" }
    ],
    '4º Bimestre': [
      { titulo: "Riscos Climáticos e Vulnerabilidade", conteudo: "Desastres naturais correlacionados às mudanças climáticas, racismo ambiental e resiliência das encostas.", objetivos: "Desenvolver mapas de risco e planos comunitários preventivos contra enchentes e deslizamentos.", habilidade: "EM13CHS601", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Planejamento Regional Participativo", conteudo: "A importância da descentralização industrial, corredores logísticos, portos e ferrovias.", objetivos: "Simular a elaboração de planos regionais de desenvolvimento sustentável integrado.", habilidade: "EM13CHS602", eixo: "Mediação e Intervenção Sociocultural" }
    ]
  },
  'Aprofundamento em Sociologia': {
    '1º Bimestre': [
      { titulo: "Métodos de Pesquisa Social", conteudo: "Pesquisas quantitativas de opinião, questionários estruturados, amostragem e observação em campo.", objetivos: "Conduzir coletas éticas de dados demográficos e de opinião dentro da escola ou bairro.", habilidade: "EM13CHS101", eixo: "Investigação Científica" },
      { titulo: "Movimentos Sociais e Redes", conteudo: "Ativismo em rede social, lutas ambientais, feminismo negro e novos direitos coletivos.", objetivos: "Analisar a eficácia das novas formas de mobilização social na era digital de massa.", habilidade: "EM13CHS102", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '2º Bimestre': [
      { titulo: "Sociologia do Trabalho Digital", conteudo: "Uberização, precarização de direitos, novas formas de empregabilidade e o trabalho remoto.", objetivos: "Identificar os desafios sociais e jurídicos das jornadas flexíveis de trabalho digital.", habilidade: "EM13CHS401", eixo: "Investigação Científica" },
      { titulo: "Interseccionalidades e Desigualdades", conteudo: "A sobreposição de raça, gênero e classe na distribuição de renda e oportunidades sociais.", objetivos: "Avaliar as trajetórias de mobilidade social sob as lentes da interseccionalidade.", habilidade: "EM13CHS402", eixo: "Investigação Científica" }
    ],
    '3º Bimestre': [
      { titulo: "Cultura de Massa e Consumismo", conteudo: "Fetichismo da mercadoria, sociedade do cansaço, influenciadores digitais e hiperconsumo.", objetivos: "Avaliar o impacto psicológico e sociológico do consumo ostensivo de imagens online.", habilidade: "EM13CHS501", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Violências Estruturais e Estado", conteudo: "Encarceramento de jovens periféricos, letalidade policial e políticas públicas de pacificação.", objetivos: "Estudar índices nacionais de criminalidade juvenil propondo estratégias alternativas preventivas.", habilidade: "EM13CHS502", eixo: "Mediação e Intervenção Sociocultural" }
    ],
    '4º Bimestre': [
      { titulo: "Políticas Públicas e Bem-Estar", conteudo: "Modelos de Estado de bem-estar social, programas assistenciais, previdência e seguridade pública.", objetivos: "Analisar as conquistas decorrentes de políticas afirmativas e cotas sociais no Brasil.", habilidade: "EM13CHS601", eixo: "Mediação e Intervenção Sociocultural" },
      { titulo: "Diagnóstico Participativo da Juventude", conteudo: "Levantamento estatístico e qualitativo sobre os desejos de carreira e as barreiras dos jovens locais.", objetivos: "Estruturar relatórios finais de diagnóstico socioeducativo sugerindo melhorias na escola.", habilidade: "EM13CHS602", eixo: "Investigação Científica" }
    ]
  },
  'Aprofundamento em Química': {
    '1º Bimestre': [
      { titulo: "Química Verde e Sustentável", conteudo: "Os doze princípios fundamentais da química limpa, métricas de eficiência atômica e fontes de carbono renováveis.", objetivos: "Analisar e projetar processos de síntese industrial baseados nas premissas ecológicas da química verde.", habilidade: "EM13CNT104", eixo: "Investigação Científica" },
      { titulo: "Polímeros e Reciclagem Avançada", conteudo: "Síntese de polímeros biodegradáveis, processos de reciclagem química e a poluição global por microplásticos.", objetivos: "Esquematizar reações de polimerização e propor substitutos ecológicos viáveis para plásticos descartáveis.", habilidade: "EM13CNT105", eixo: "Processos Criativos" }
    ],
    '2º Bimestre': [
      { titulo: "Química da Atmosfera e Poluição", conteudo: "Mecanismos cinéticos de formação do smog fotoquímico, chuva ácida, ozônio troposférico e emissões gasosas.", objetivos: "Monitorar e calcular as taxas de liberação de óxidos nitrosos e sulfurosos por veículos na região.", habilidade: "EM13CNT203", eixo: "Investigação Científica" },
      { titulo: "Fármacos e Bioprospecção", conteudo: "Isolamento de princípios ativos vegetais, técnicas de destilação fracionada, purificação de extratos e espectrometria.", objetivos: "Compreender as bases da bioprospecção nacional e as metodologias clássicas de síntese farmacêutica.", habilidade: "EM13CNT204", eixo: "Investigação Científica" }
    ],
    '3º Bimestre': [
      { titulo: "Eletroquímica e Armazenamento", conteudo: "Fundamentos de pilhas avançadas de íon-lítio, baterias de estado sólido e células eletroquímicas de hidrogênio verde.", objetivos: "Avaliar os potenciais termodinâmicos de novos sistemas redox voltados para eletrificação automotiva.", habilidade: "EM13CNT302", eixo: "Investigação Científica" },
      { titulo: "Química Alimentar e Conservação", conteudo: "Estruturas químicas de antioxidantes artificiais, conservantes lipofílicos, emulsificantes e rotulagem nutricional.", objetivos: "Identificar as funções químicas dos aditivos presentes nos rótulos de alimentos industrializados comuns.", habilidade: "EM13CNT303", eixo: "Processos Criativos" }
    ],
    '4º Bimestre': [
      { titulo: "Nanotecnologia Química", conteudo: "Propriedades quânticas e ópticas de nanopartículas metálicas, aplicações do grafeno e dos nanotubos de carbono.", objetivos: "Conceber aplicações inovadoras de nanomateriais para processos de purificação ou catálise química.", habilidade: "EM13CNT309", eixo: "Investigação Científica" },
      { titulo: "Segurança de Resíduos Químicos", conteudo: "Tabelas de incompatibilidade química, metodologias de neutralização de efluentes ácidos e tratamento de metais pesados.", objetivos: "Elaborar manuais de boas práticas de descarte seguro de reagentes em laboratórios de ensino médio.", habilidade: "EM13CNT310", eixo: "Mediação e Intervenção" }
    ]
  }
};

// Generate rich, detailed Itinerários Formativos lessons
for (const [subject, gradesObj] of Object.entries(subjectGradesMap)) {
  for (const [grade, bimesObj] of Object.entries(gradesObj)) {
    for (const [bimester, limit] of Object.entries(bimesObj)) {
      
      const bimesterTopics = topicsMap[subject]?.[bimester] || [
        { titulo: `Estudos em ${subject}`, conteudo: `Aprofundamento de competências, conteúdos e habilidades na área de ${subject}.`, objetivos: "Desenvolver raciocínio analítico, capacidade de síntese e argumentação fundamentada.", habilidade: "EM13CHS101", eixo: "Investigação Científica" }
      ];
      
      const lessons = [];
      for (let i = 1; i <= limit; i++) {
        // Pick topic index evenly
        const topicIdx = Math.min(bimesterTopics.length - 1, Math.floor(((i - 1) / limit) * bimesterTopics.length));
        const topic = bimesterTopics[topicIdx];
        
        // Find occurrences of this topic
        const occurrences = [];
        for (let j = 1; j <= limit; j++) {
          const idx = Math.min(bimesterTopics.length - 1, Math.floor(((j - 1) / limit) * bimesterTopics.length));
          if (idx === topicIdx) {
            occurrences.push(j);
          }
        }
        
        let titulo = topic.titulo;
        if (occurrences.length > 1) {
          const partNum = occurrences.indexOf(i) + 1;
          titulo = `${topic.titulo} - Parte ${partNum}`;
        }
        
        lessons.push({
          aula: String(i),
          titulo: titulo,
          conteudo: topic.conteudo,
          objetivos: topic.objetivos,
          habilidade: topic.habilidade,
          eixo: topic.eixo || "Eixos Integrados NEM",
          unidadeTematica: topic.unidadeTematica || `Unidade de Aprofundamento de ${subject}`
        });
      }
      
      addClassesRich(subject.toLowerCase().replace(/\s/g,''), subject, grade, bimester, lessons);
    }
  }
}

// 2. Programação - apenas 2ª série base
let progBims = {
  '1º Bimestre': { start: 1, end: 11 },
  '2º Bimestre': { start: 12, end: 21 },
  '3º Bimestre': { start: 26, end: 34 },
  '4º Bimestre': { start: 35, end: 45 }
};
for (const bim of bimestres) {
  let aulas = [];
  for(let i=progBims[bim].start; i<=progBims[bim].end; i++) aulas.push(i);
  addClassesPlaceholder('Programação', '2ª Série', bim, aulas);
}

// 3. Parte Diversificada base
for (const grade of grades) {
  for (const bim of bimestres) {
    let aulas = [];
    for(let i=1; i<=8; i++) aulas.push(i);
    addClassesPlaceholder('Redação e Leitura', grade, bim, aulas);
    addClassesPlaceholder('Projeto de Vida', grade, bim, [1,2,3,4,5,6,7]);
    addClassesPlaceholder('Educação Financeira', grade, bim, [1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
  }
}

// 4. Overwrite with rich data
addClassesRich('tecinov', 'Programação', '2ª Série', '1º Bimestre', [
  { aula: '1', titulo: 'Tecnologia no dia a dia', conteudo: 'Transformações digitais no trabalho. Adaptação profissional e novas carreiras. Tecnologia e ODS (ONU).', objetivos: 'Identificar a presença e o uso de tecnologias digitais no trabalho. Compreender os impactos das tecnologias na evolução das profissões. Analisar como a tecnologia pode promover um mundo mais justo.' },
  { aula: '2', titulo: 'Vamos inspecionar', conteudo: 'Ferramentas de desenvolvedor (F12). Tags HTML e estrutura web. Verificação de informações e Fake News.', objetivos: 'Utilizar a ferramenta "Inspecionar" para visualizar o código web. Analisar a estrutura de páginas web e modificar seu conteúdo. Avaliar a autenticidade de informações para combater fake news.' },
  { aula: '3', titulo: 'O que veremos nas aulas?', conteudo: 'Ferramentas e linguagens de programação. Uso de tecnologia para solucionar problemas do cotidiano escolar. Reflexão sobre o uso responsável de IA e suas limitações.', objetivos: 'Refletir sobre o uso de diferentes tecnologias para a construção de soluções computacionais. Relacionar tecnologias digitais com saberes escolares. Propor o uso responsável de IA em soluções tecnológicas, avaliando suas limitações.' },
  { aula: '4', titulo: 'Inteligência artificial', conteudo: 'Fundamentos e tipos de IA. Comparativo IA vs. inteligência humana. Potenciais, riscos e limites da IA.', objetivos: 'Compreender os fundamentos da Inteligência Artificial. Comparar a inteligência artificial com a inteligência humana. Analisar os riscos e benefícios do uso da IA na sociedade.' },
  { aula: '5', titulo: 'Iniciando nossa jornada', conteudo: 'Fundamentos de programação com JavaScript utilizando a biblioteca P5.js. Utilização de funções básicas como setup() e draw(). Manipulação de coordenadas em formas geométricas no p5.js.', objetivos: 'Compreender os conceitos básicos de funções em JavaScript. Aplicar comandos básicos de desenho no P5.js, como createCanvas() e circle(). Modificar parâmetros de comandos em p5.js para ajustar a posição e o tamanho de formas geométricas.' },
  { aula: '6', titulo: 'Adicionando outras formas', conteudo: 'Recuperação e gerenciamento de projetos no editor P5.js. Uso de comandos de desenho (line() e triangle()) para criar formas geométricas específicas. Manipulação de coordenadas X e Y para posicionar elementos em um plano cartesiano.', objetivos: 'Aplicar comandos de desenho básicos como line() e triangle() no P5.js. Criar novas formas e elementos visuais (ex: boca, nariz, orelhas) no personagem utilizando as coordenadas do plano cartesiano. Relembrar o processo de login e recuperação de projetos anteriores no editor P5.js.' },
  { aula: '7', titulo: 'Colorindo nosso desenho', conteudo: 'Cores predefinidas e hexadecimal no P5.js. Utilização de outros comandos para criar mais formas geométricas. Comentários para documentação de código.', objetivos: 'Aplicar conceitos de cores em código usando o P5.js. Criar novas formas e elementos visuais (ex: sobrancelhas, pupilas) no personagem utilizando as coordenadas do plano cartesiano. Documentar o código com comentários claros e organizados.' },
  { aula: '8', titulo: 'Efeito Monalisa', conteudo: 'Comando map() para limitar o movimento de elementos na tela. Conceito de variáveis em programação. Práticas de declaração de variáveis e organização de código para evitar erros em animations.', objetivos: 'Aplicar conceitos de mapeamento para restringir a movimentação de elementos gráficos na tela. Analisar a lógica de posicionamento e ajuste de variáveis para criar interações visuais precisas. Criar uma animação interativa onde elementos gráficos seguem a posição do cursor do mouse.' },
  { aula: '11', titulo: 'Novo projeto: quente frio', conteudo: 'Utilização do comando random() para sortear um valor aleatório. Diferenciação entre números inteiros e decimais. Corrigir bugs a partir de pequenos testes.', objetivos: 'Aplicar conceitos de coordenadas aleatórias para posicionar elementos na tela de um projeto. Compreender a diferença entre números inteiros e decimais em operações de comparação. Testar e depurar código utilizando console.log().' },
  { aula: '12', titulo: 'Será que podemos utilizar Pitágoras?', conteudo: 'Uso de operadores lógicos (e). Introdução ao conceito de distância em um plano cartesiano. Aplicação do Teorema de Pitágoras.', objetivos: 'Aplicar operadores lógicos para combinar múltiplas condições em uma estrutura condicional. Compreender o conceito de distância e sua aplicação em projetos interativos. Implementar o Teorema de Pitágoras para calcular distâncias em um plano cartesiano.' },
  { aula: '13', titulo: 'Comandos em Javascript', conteudo: 'Ajuste do tamanho de um círculo baseado na distância do cursor ao ponto oculto. Uso da função dist() do P5JS. Comparação de métodos de cálculo de distância, incluindo o Teorema de Pitágoras e a função dist().', objetivos: 'Compreender o uso da função dist() do P5JS para calcular distâncias entre dois pontos. Aplicar o conceito de distância para ajustar o comportamento visual de elementos interativos. Associar diferentes abordagens para calcular distâncias.' },
  { aula: '14', titulo: 'Quente frio dinâmico', conteudo: 'Identificação e remoção de código redundante ou desnecessário. Uso do comando constrain do P5JS. Ajuste da dificuldade de um jogo interativo.', objetivos: 'Revisar o código para identificar e remover variáveis e comandos desnecessários. Aplicar o comando constrain para limitar o movimento de um objeto dentro de um plano cartesiano. Modificar a dificuldade de um projeto interativo através da modificação de parâmetros de distância.' }
]);

addClassesRich('tecinov', 'Programação', '2ª Série', '2º Bimestre', [
  { aula: '21', titulo: 'Criando uma planilha do zero', conteudo: 'Acesso e criação de uma planilha no Google Planilhas. Estrutura básica de uma planilha: células, colunas e linhas. Inserção e organização de informações em uma planilha.', objetivos: 'Nomear os principais elementos de uma planilha eletrônica, como células, colunas e linhas. Compreender a importância da organização de dados dentro de uma planilha para planejamento e tomada de decisões. Demonstrar como criar uma planilha em branco no Google Planilhas e inserir informações básicas.' },
  { aula: '22', titulo: 'Formatando a planilha', conteudo: 'Ajuste de colunas e mesclagem de células. Personalização de textos, fontes e cores. Uso de cores alternadas para melhor visualização de dados.', objetivos: 'Listar as principais ferramentas de formatação no Google Planilhas. Descrever a importância da formatação para a organização e legibilidade da planilha. Aplicar estilos e cores para melhorar a visualização dos dados.' },
  { aula: '23', titulo: 'Fórmulas e cálculos', conteudo: 'Uso de fórmulas matemáticas no Google Planilhas. Aplicação da multiplicação e soma em células específicas. Exploração de funções e ajustes dinâmicos de valores.', objetivos: 'Nomear as células e colunas utilizadas para cálculos dentro do Google Planilhas. Explicar como utilizar fórmulas básicas de multiplicação e soma para calcular valores automaticamente. Aplicar as fórmulas aprendidas para ajustar valores e explorar diferentes cenários de custos em uma planilha.' },
  { aula: '24', titulo: 'Extraindo informações com gráficos', conteudo: 'Seleção de dados e inserção de gráficos. Personalização de gráficos (cores, títulos e legendas). Atualização dinâmica de gráficos com base em mudanças na planilha.', objetivos: 'Nomear os principais tipos de gráficos disponíveis no Google Planilhas. Explicar como os gráficos podem ajudar na interpretação de dados da planilha. Aplicar a criação e personalização de gráficos para representar visualmente os valores da planilha.' },
  { aula: '27', titulo: 'Fórmulas matemáticas', conteudo: 'Identificação e organização de células em planilhas. Cálculo de porcentagens e reservas financeiras usando fórmulas. Criação de simulações financeiras dinâmicas para projeção futura.', objetivos: 'Listar as células e referências utilizadas para cálculos de porcentagem em planilhas. Explicar como utilizar fórmulas para calcular valores com porcentagem e valores acumulados. Aplicar fórmulas dinâmicas para simular diferentes cenários de economia financeira ao longo dos anos.' },
  { aula: '28', titulo: 'Fórmulas em planilhas', conteudo: 'Utilização de preenchimento automático para séries numéricas. Aplicação de porcentagem em cálculos. Fixação de células ($) para manter referências em cálculos dinâmicos.', objetivos: 'Localizar células e referências utilizadas para cálculos. Explicar como fixar células para garantir cálculos corretos ao longo dos anos. Aplicar fórmulas para prever aumentos e seus impactos em reservas financeiras.' },
  { aula: '29', titulo: 'Modelo computacional', conteudo: 'Correção e fixação de células para cálculos de reserva anual. Adição de rendimentos sobre valores acumulados. Adição de rendimentos sobre valores acumulados.', objetivos: 'Identificar erros em cálculos de reserva anual e entender a necessidade da fixação de células. Explicar como os rendimentos podem impactar no acúmulo de uma reserva financeira. Aplicar fórmulas para calcular o valor acumulado ao longo dos anos, considerando investimentos com juros.' },
  { aula: '30', titulo: 'Compartilhando a Planilha', conteudo: 'Expansão dos dados e verificação de fórmulas ao longo dos anos. Formatação de planilhas (moeda, cores, bordas e organização). Inserção e personalização de gráficos para análise visual de tendências financeiras.', objetivos: 'Analisar os dados da planilha e testar diferentes cenários, expandindo o modelo para mais anos. Formatar os valores como moeda, ajustar a estrutura visual e aplicar cores alternadas para melhor organização. Criar gráficos para representar visualmente o crescimento dos valores e compreender padrões de crescimento exponencial.' },
  { aula: '33', titulo: 'Introdução ao Google Colab', conteudo: 'Introdução, criação de notebooks e execução de células. Uso para exibir textos na tela e prática inicial de programação. Criação e manipulação de variáveis para personalizar saídas.', objetivos: 'Compreender os conceitos básicos do Google Colab e sua interface. Aplicar o comando print para exibir textos em Python. Criar variáveis simples para armazenar dados reutilizáveis em código Python.' },
  { aula: '34', titulo: 'Calculando pontos', conteudo: 'Armazenamento de valores associados a diferentes categorias em variáveis. Utilizar operações matemáticas com variáveis para calcular totais. Apresentar de forma clara de resultados no terminal usando concatenação de string e variável.', objetivos: 'Identificar variáveis apropriadas para representar diferentes categorias em um problema. Calcular resultados combinando variáveis matematicamente em Python. Apresentar resultados de forma clara e explicativa utilizando strings formatadas.' },
  { aula: '35', titulo: 'Distribuindo itens', conteudo: 'Uso de input para obter valores de usuários com descrições claras. Divisão inteira, soma, e multiplicação para solucionar problemas práticos. Determinar quantidades proporcionais de itens com base em condições.', objetivos: 'Coletar entradas do usuário utilizando a função input para resolver problemas interativos. Implementar cálculos matemáticos em Python para distribuir recursos de forma equitativa. Exibir resultados utilizando print com mensagens claras e variáveis integradas.' },
  { aula: '36', titulo: 'Usando condicionais', conteudo: 'Entrada de dados com input. Estruturas condicionais (if/else). Mensagens dinâmicas usando condições (positivo ou negativo).', objetivos: 'Coletar entradas de dados do usuário para definir as condições do problema. Utilizar estruturas condicionais (if e else) para validar cenários e tomar decisões. Validar a capacidade de transporte com base em restrições e apresentar resultados claros.' }
]);

const inglesB1 = [
  {titulo: 'Learning English nowadays (Part 1)', conteudo: 'Prática de leitura. Palavras conhecidas e cognatas. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar posicionamento crítico de um texto em inglês.'},
  {titulo: 'Learning English nowadays (Part 2)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Identificar posicionamento crítico de um texto em inglês.'},
  {titulo: 'Learning English nowadays (Part 3)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Identificar posicionamento crítico de um texto em inglês.'}
];
addClassesRich('ingles', 'Língua Inglesa (Aprofundamento)', '1ª Série', '1º Bimestre', [
  { aula: '1', titulo: inglesB1[0].titulo, conteudo: inglesB1[0].conteudo, objetivos: inglesB1[0].objetivos },
  { aula: '3', titulo: inglesB1[1].titulo, conteudo: inglesB1[1].conteudo, objetivos: inglesB1[1].objetivos },
  { aula: '5', titulo: inglesB1[2].titulo, conteudo: inglesB1[2].conteudo, objetivos: inglesB1[2].objetivos }
]);

const inglesB2 = [
  {titulo: 'Learning English nowadays (Part 4)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de exercícios de vestibular.'},
  {titulo: 'Learning English nowadays (Part 5)', conteudo: 'Simple present tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo presente, compreendendo sua função na construção textual.'},
  {titulo: 'Learning English nowadays (Part 6)', conteudo: 'Simple Present tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar e utilizar elementos linguísticos específicos, compreendendo sua função na construção textual.'}
];
addClassesRich('ingles', 'Língua Inglesa (Aprofundamento)', '1ª Série', '2º Bimestre', [
  { aula: '7', titulo: inglesB2[0].titulo, conteudo: inglesB2[0].conteudo, objetivos: inglesB2[0].objetivos },
  { aula: '9', titulo: inglesB2[1].titulo, conteudo: inglesB2[1].conteudo, objetivos: inglesB2[1].objetivos },
  { aula: '11', titulo: inglesB2[2].titulo, conteudo: inglesB2[2].conteudo, objetivos: inglesB2[2].objetivos }
]);

const inglesB3 = [
  {titulo: 'Evolution in Communication (Part 1)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura de tirinhas.'},
  {titulo: 'Evolution in Communication (Part 2)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura de tirinhas.'},
  {titulo: 'Evolution in Communication (Part 3)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de questões de múltipla escolha.'}
];
addClassesRich('ingles', 'Língua Inglesa (Aprofundamento)', '1ª Série', '3º Bimestre', [
  { aula: '1', titulo: inglesB3[0].titulo, conteudo: inglesB3[0].conteudo, objetivos: inglesB3[0].objetivos },
  { aula: '3', titulo: inglesB3[1].titulo, conteudo: inglesB3[1].conteudo, objetivos: inglesB3[1].objetivos },
  { aula: '5', titulo: inglesB3[2].titulo, conteudo: inglesB3[2].conteudo, objetivos: inglesB3[2].objetivos }
]);

const inglesB4 = [
  {titulo: 'Evolution in Communication (Part 4)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de exercícios de vestibular.'},
  {titulo: 'Evolution in Communication (Part 5)', conteudo: 'Past simple tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo passado, compreendendo sua função na construção textual.'},
  {titulo: 'Evolution in Communication (Part 6)', conteudo: 'Past simple tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo passado, compreendendo sua função na construção textual.'}
];
addClassesRich('ingles', 'Língua Inglesa (Aprofundamento)', '1ª Série', '4º Bimestre', [
  { aula: '7', titulo: inglesB4[0].titulo, conteudo: inglesB4[0].conteudo, objetivos: inglesB4[0].objetivos },
  { aula: '9', titulo: inglesB4[1].titulo, conteudo: inglesB4[1].conteudo, objetivos: inglesB4[1].objetivos },
  { aula: '11', titulo: inglesB4[2].titulo, conteudo: inglesB4[2].conteudo, objetivos: inglesB4[2].objetivos }
]);

const data = Array.from(dataMap.values());

const out = `import { CurriculumItem } from '../types';
export const itinerariosEMData: CurriculumItem[] = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '$1:')};`;
fs.writeFileSync('src/data/itinerariosEMData.ts', out);
console.log('Finished writing combined data: ' + data.length + ' items.');
