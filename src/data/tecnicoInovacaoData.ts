import { TecnicoLessonItem } from './tecnicoData';
import { CompactWeek, expandCompactWeeks } from './tecnicoNovasData';

const INOVACAO_WEEKS: CompactWeek[] = [
  {
    s: 1, uc: 'Cultura da Inovação', codU: 'IN1', tema: 'Conceitos Iniciais e Tipos de Inovação',
    ct: 'Diferenciar inovação de invenção e classificar os diferentes tipos de inovação.',
    cs: 'Curiosidade intelectual e abertura ao novo.',
    aulas: [
      { t: 'Inovação vs. Invenção', ht: 'Diferenciar os conceitos de inovação e invenção em casos de mercado reais.', hs: 'Estimular a curiosidade para explorar conceitos de novos produtos.', obj: 'Compreender a definição de inovação e como ela agrega valor comercial.', oc: '1. Conceito de inovação' },
      { t: 'Os 4 tipos de inovação (Produto, Processo, Marketing, Organizacional)', ht: 'Classificar inovações conhecidas conforme o Manual de Oslo.', hs: 'Analisar criticamente e categorizar modelos de negócios.', obj: 'Categorizar inovações de mercado de acordo com sua abrangência.', oc: '2. Manual de Oslo e tipos de inovação' },
      { t: 'Inovação Incremental vs. Radical vs. Disruptiva', ht: 'Identificar a profundidade do impacto das inovações no mercado atual.', hs: 'Desenvolver visão crítica sobre mudanças tecnológicas aceleradas.', obj: 'Diferenciar a intensidade da inovação e seus respectivos riscos.', oc: '3. Intensidade da inovação' }
    ]
  },
  {
    s: 2, uc: 'Design Thinking', codU: 'IN2', tema: 'Imersão, Empatia e Definição',
    ct: 'Aplicar ferramentas de imersão e empatia para compreender as dores de potenciais clientes.',
    cs: 'Empatia interpessoal e escuta ativa.',
    aulas: [
      { t: 'Introdução ao Design Thinking e o Duplo Diamante', ht: 'Mapear as fases da abordagem centrada nas pessoas do Design Thinking.', hs: 'Valorizar abordagens colaborativas de solução de problemas.', obj: 'Compreender o conceito e o funcionamento do modelo de Duplo Diamante.', oc: '1. Metodologia do Design Thinking' },
      { t: 'Construção do Mapa de Empatia', ht: 'Estruturar o mapa de empatia com base em entrevistas com usuários reais.', hs: 'Demonstrar empatia real para entender dores e anseios de usuários.', obj: 'Mapear o que o usuário pensa, sente, ouve, vê, fala e faz.', oc: '2. Mapa de Empatia' },
      { t: 'Definição do Problema (Ponto de Vista - POV)', ht: 'Redigir perguntas "Como poderíamos?" que guiam a ideação futura.', hs: 'Sintetizar as descobertas obtidas de forma clara e assertiva.', obj: 'Definir o problema real a ser resolvido a partir do ponto de vista do usuário.', oc: '3. POV e foco de projeto' }
    ]
  },
  {
    s: 3, uc: 'Design Thinking', codU: 'IN2', tema: 'Ideação e Prototipagem',
    ct: 'Gerar uma ampla gama de ideias inovadoras e construir protótipos de baixa fidelidade.',
    cs: 'Criatividade livre de julgamentos e desapego material.',
    aulas: [
      { t: 'Técnicas de Ideação (Brainstorming e Brainwriting)', ht: 'Conduzir sessões de brainstorming seguindo regras de não julgamento.', hs: 'Pensar de forma criativa e incentivar ideias inovadoras dos colegas.', obj: 'Gerar dezenas de ideias criativas para solucionar o problema definido.', oc: '1. Técnicas de ideação' },
      { t: 'Matriz de Priorização de Ideias (Esforço vs. Impacto)', ht: 'Classificar propostas em uma matriz selecionando as de melhor custo-benefício.', hs: 'Tomar decisões lógicas fundamentadas e consensuais em grupo.', obj: 'Selecionar de forma democrática e estratégica a melhor ideia de solução.', oc: '2. Seleção de ideias' },
      { t: 'Prototipagem de Baixa Fidelidade (Físico, Storyboard, Wireframe)', ht: 'Construir maquetes rápidas de papel ou esboços visuais de soluções digitais.', hs: 'Aprender a errar rápido e de forma barata ao validar premissas.', obj: 'Dar forma física ou visual à solução para permitir a validação inicial.', oc: '3. Métodos de prototipagem' }
    ]
  },
  {
    s: 4, uc: 'Modelagem de Negócios', codU: 'IN3', tema: 'O Modelo Canvas (Business Model Canvas)', tp: 'P',
    ct: 'Estruturar e preencher o quadro de modelo de negócios Canvas (BMC) de uma proposta de valor.',
    cs: 'Pensamento estratégico sistêmico e colaboração ágil.',
    aulas: [
      { t: 'Os 9 Blocos do Canvas de Negócios (Lado Direito: Cliente e Valor)', ht: 'Definir Proposta de Valor, Segmentos de Clientes, Canais e Relacionamento.', hs: 'Pensar na experiência e percepções do público-alvo com cuidado.', obj: 'Preencher a metade do Canvas voltada ao valor externo do negócio.', oc: '1. Blocos de valor do Canvas' },
      { t: 'Os 9 Blocos do Canvas (Lado Esquerdo: Operação e Viabilidade)', ht: 'Definir Parcerias, Atividades, Recursos Chave, Custos e Receitas.', hs: 'Trabalhar com racionalidade operacional e consistência econômica.', obj: 'Preencher a metade do Canvas voltada para a execução interna e finanças.', oc: '2. Blocos operacionais do Canvas' },
      { t: 'Análise de Consistência e Alinhamento do Canvas', ht: 'Validar a coesão mútua dos 9 blocos de um modelo de negócio simulado.', hs: 'Expressar argumentos e críticas lógicas de forma construtiva.', obj: 'Mapear e interligar os blocos do Canvas garantindo a viabilidade geral.', oc: '3. Validação sistêmica de negócios' }
    ]
  },
  {
    s: 5, uc: 'Modelagem de Negócios', codU: 'IN3', tema: 'Proposta de Valor e Job-to-be-Done',
    ct: 'Definir a proposta de valor do negócio alinhada com as tarefas e dores do cliente.',
    cs: 'Empatia com o consumidor e capacidade de síntese.',
    aulas: [
      { t: 'A Teoria do Job-to-be-Done (Trabalho a ser Feito)', ht: 'Identificar a necessidade funcional, social e emocional subjacente do cliente.', hs: 'Aprofundar a observação analítica sobre o comportamento humano.', obj: 'Descobrir por que os clientes contratam produtos ou serviços.', oc: '1. Conceito de Job-to-be-Done' },
      { t: 'O Quadro da Proposta de Valor (Value Proposition Canvas)', ht: 'Esboçar o mapa de valor de produtos frente ao perfil de dores do cliente.', hs: 'Pensar de forma detalhada na solução e alívio de frustrações reais.', obj: 'Dominar o preenchimento do quadro de proposta de valor.', oc: '2. Alinhamento de valor e perfil' },
      { t: 'Construção da Proposta de Valor Única (UVP)', ht: 'Redigir uma frase de impacto que sintetiza o valor exclusivo do negócio.', hs: 'Comunicação verbal assertiva, clara e objetiva.', obj: 'Formular a declaração de posicionamento exclusivo do negócio.', oc: '3. Declaração UVP' }
    ]
  },
  {
    s: 6, uc: 'Modelagem de Negócios', codU: 'IN3', tema: 'Análise de Mercado e Benchmarking',
    ct: 'Pesquisar mercados, concorrentes e validar oportunidades de novos negócios.',
    cs: 'Curiosidade científica e foco em dados factuais.',
    aulas: [
      { t: 'Dimensionamento de Mercado (TAM, SAM, SOM)', ht: 'Calcular Mercado Total, Endereçável e Obtível de um setor simulado.', hs: 'Operar estatísticas e estimativas numéricas de forma séria.', obj: 'Estimar a fatia realista de mercado que a startup pode atingir.', oc: '1. Tamanho do mercado' },
      { t: 'Benchmarking de Concorrentes Diretos e Indiretos', ht: 'Pesquisar concorrentes mapeando pontos fortes, fracos e preços.', hs: 'Aprender com as melhores práticas de mercado de forma ética.', obj: 'Realizar análise comparativa estruturada de rivais.', oc: '2. Benchmarking competitivo' },
      { t: 'Pesquisa Desk Research de Tendências (PESTEL)', ht: 'Mapear tendências tecnológicas e legais de um novo nicho de mercado.', hs: 'Compreender cenários amplos e antecipar ameaças externas.', obj: 'Sinalizar ventos favoráveis e barreiras no setor por pesquisa.', oc: '3. Pesquisa secundária de mercado' }
    ]
  },
  {
    s: 7, uc: 'Metodologia Lean Startup', codU: 'IN4', tema: 'A Filosofia Enxuta e Validação',
    ct: 'Aplicar a filosofia de validação ágil baseada no ciclo Construir-Medir-Aprender.',
    cs: 'Rápido aprendizado com erros e flexibilidade cognitiva.',
    aulas: [
      { t: 'Origens da Lean Startup e o Ciclo Fundamental', ht: 'Mapear as fases do loop Construir-Medir-Aprender de validação.', hs: 'Resiliência e capacidade de aceitar ideias incompletas para aprender.', obj: 'Compreender a vantagem da validação ágil frente ao planejamento rígido.', oc: '1. Conceitos de Lean Startup' },
      { t: 'Identificação de Premissas de Alto Risco (Hipóteses)', ht: 'Isolar as suposições críticas de valor e de crescimento que sustentam o Canvas.', hs: 'Diferenciar fatos comprovados de suposições não validadas.', obj: 'Definir quais hipóteses críticas devem ser testadas com prioridade.', oc: '2. Formulação de hipóteses' },
      { t: 'Projeto de Testes e Entrevistas de Problema', ht: 'Formular roteiros de perguntas não tendenciosas (The Mom Test) para entrevistar.', hs: 'Conduzir diálogos de forma sincera, sem forçar vendas precoces.', obj: 'Aplicar técnicas de entrevista para validar a existência real da dor.', oc: '3. Entrevistas de validação' }
    ]
  },
  {
    s: 8, uc: 'Metodologia Lean Startup', codU: 'IN4', tema: 'Produto Mínimo Viável (MVP)',
    ct: 'Projetar e construir modelos práticos de Produto Mínimo Viável para testes.',
    cs: 'Pragmatismo, agilidade e simplicidade de execução.',
    aulas: [
      { t: 'O que é MVP e conceitos fundamentais', ht: 'Diferenciar MVP de protótipo descartável de design.', hs: 'Focar na entrega de valor com a menor quantidade de recursos.', obj: 'Compreender a utilidade do MVP como instrumento de aprendizado.', oc: '1. Definição e metas do MVP' },
      { t: 'Tipos de MVP (Fumaça, Mágico de Oz, Concierge, Duplo)', ht: 'Classificar estratégias de MVP usadas por startups de tecnologia conhecidas.', hs: 'Solucionar testes complexos por meio de automações simples.', obj: 'Diferenciar os métodos criativos de estruturação de MVPs enxutos.', oc: '2. Padrões de MVP' },
      { t: 'Projeto prático de um MVP Fumaça', ht: 'Criar uma página web básica de conversão (Landing Page) simulando vendas.', hs: 'Cooperar ativamente no desenvolvimento de layouts e copywriting.', obj: 'Projetar e colocar no ar uma página básica de captura de interesse.', oc: '3. Criação de landing page teste' }
    ]
  },
  {
    s: 9, uc: 'Metodologia Lean Startup', codU: 'IN4', tema: 'Desenvolvimento de Clientes (Customer Development)', tp: 'P',
    ct: 'Implementar as etapas da metodologia de Customer Development de Steve Blank.',
    cs: 'Sair de trás da mesa ("get out of the building") e iniciativa.',
    aulas: [
      { t: 'As 4 etapas do Customer Development', ht: 'Diferenciar as fases de Descoberta, Validação, Criação e Estruturação.', hs: 'Orientação ao crescimento planejado e sustentável de equipes.', obj: 'Compreender o fluxo de criação de clientes proposto por Steve Blank.', oc: '1. Modelo de Steve Blank' },
      { t: 'Entrevistas de Solução na Prática', ht: 'Apresentar o protótipo básico a potenciais compradores avaliando interesse.', hs: 'Superar o receio de ouvir rejeições ao produto de forma serena.', obj: 'Testar e validar a receptividade da solução proposta no mercado.', oc: '2. Entrevistas de solução' },
      { t: 'Métricas de Vaidade vs. Métricas Acionáveis', ht: 'Classificar métricas como cliques totais (vaidade) e taxa de retenção (acionável).', hs: 'Demonstrar integridade intelectual e olhar focado nos dados reais.', obj: 'Identificar e monitorar os indicadores que refletem o progresso real.', oc: '3. Indicadores de tração' }
    ]
  },
  {
    s: 10, uc: 'Metodologia Lean Startup', codU: 'IN4', tema: 'Estratégias de Pivotagem de Negócios',
    ct: 'Decidir de forma estruturada e justificada a hora de pivotar ou persistir no modelo.',
    cs: 'Desapego de ideias falhas e flexibilidade para recomeçar.',
    aulas: [
      { t: 'O que é Pivotar e por que é necessário', ht: 'Analisar casos históricos de startups famosas que mudaram de modelo.', hs: 'Aceitar mudanças drásticas com inteligência emocional e visão.', obj: 'Compreender a pivotagem como correção natural de rumo de startups.', oc: '1. Conceito de pivotagem' },
      { t: 'Tipos de Pivots (Zoom-In, Zoom-Out, Segmento, Canal...)', ht: 'Classificar os diferentes tipos de pivots aplicados no mercado.', hs: 'Analisar as rotas de escape operacionais sob ótica analítica.', obj: 'Identificar as alternativas estruturais para reformular a startup.', oc: '2. Tipos de pivots' },
      { t: 'Análise de caso prático de pivotagem', ht: 'Elaborar um plano de ação detalhando os passos para mudar de segmento.', hs: 'Demonstrar velocidade de adaptação corporativa em situações de crise.', obj: 'Simular os desdobramentos de uma pivotagem de modelo de negócios.', oc: '3. Simulação de pivot' }
    ]
  },
  {
    s: 11, uc: 'Finanças para Startups', codU: 'IN5', tema: 'Modelos de Monetização e Precificação',
    ct: 'Construir o modelo de receita da startup estimando faixas de precificação corretas.',
    cs: 'Raciocínio lógico e clareza de viabilidade.',
    aulas: [
      { t: 'Modelos de Monetização (SaaS, Freemium, Marketplace...)', ht: 'Classificar startups do mercado nacional de acordo com sua fonte de receita.', hs: 'Avaliar alternativas de faturamento sob a ótica da estabilidade.', obj: 'Identificar e selecionar o melhor modelo de receita para a solução.', oc: '1. Fontes de receita' },
      { t: 'Estratégias de Precificação para Novos Produtos', ht: 'Calcular preço de venda baseado em custo, concorrência e valor percebido.', hs: 'Ponderar o valor justo do esforço criativo com realismo.', obj: 'Dominar as técnicas de formação de preço em negócios digitais.', oc: '2. Precificação' },
      { t: 'Projeção de Unidade Econômica (Unit Economics)', ht: 'Calcular o custo de aquisição de cliente (CAC) e o valor de tempo de vida (LTV).', hs: 'Exigir a sustentabilidade matemática do negócio de forma rigorosa.', obj: 'Calcular e analisar a saúde financeira elementar do modelo (LTV/CAC).', oc: '3. Métricas de unit economics' }
    ]
  },
  {
    s: 12, uc: 'Finanças para Startups', codU: 'IN5', tema: 'Finanças Básicas e Necessidade de Capital',
    ct: 'Estimar a necessidade de recursos financeiros e controlar a taxa de queima (Burn Rate).',
    cs: 'Racionalidade financeira, autodisciplina e parcimônia.',
    aulas: [
      { t: 'Estruturação de Custos Iniciais (Setup Costs)', ht: 'Mapear todos os gastos pré-operacionais necessários para lançar o MVP.', hs: 'Agir com frugalidade, evitando desperdício de capital de apoio.', obj: 'Calcular o orçamento exato para implantação inicial da startup.', oc: '1. Custos de estruturação' },
      { t: 'Cálculo de Burn Rate e Runway (Sobrevivência de Caixa)', ht: 'Calcular a taxa mensal de queima de caixa e o tempo limite de operação.', hs: 'Prevenir crises de liquidez por meio de planejamento focado.', obj: 'Estimar a sobrevivência financeira da startup em cenários sem receita.', oc: '2. Burn rate e Runway' },
      { t: 'Ponto de Equilíbrio Econômico (Break-Even Point)', ht: 'Calcular a quantidade de vendas ou faturamento mínimo para zerar custos.', hs: 'Trabalhar com precisão quantitativa visando a sustentabilidade.', obj: 'Calcular e analisar o ponto de equilíbrio do novo modelo.', oc: '3. Break-even de startups' }
    ]
  },
  {
    s: 13, uc: 'Finanças para Startups', codU: 'IN5', tema: 'Projeto: Projeção de Viabilidade do Negócio', tp: 'P',
    ct: 'Integrar a monetização e os custos na modelagem de viabilidade do projeto.',
    cs: 'Trabalho em equipes focadas e cooperação ativa.',
    aulas: [
      { t: 'Cálculo do CAC e LTV projetados', ht: 'Dimensionar os investimentos necessários em anúncios e a retenção média.', hs: 'Basear projeções em pesquisas e benchmarks realistas.', obj: 'Projetar unit economics para as linhas do Canvas da equipe.', oc: '1. Modelagem de CAC/LTV' },
      { t: 'Montagem da planilha de caixa projetado de 1 ano', ht: 'Desenvolver a demonstração simplificada de caixa mensal de saída e entrada.', hs: 'Demonstrar paciência e exatidão na unificação de dados financeiros.', obj: 'Estruturar o fluxo de caixa mestre para o primeiro ano operacional.', oc: '2. Planilhas de caixa' },
      { t: 'Relatório de Viabilidade e Riscos Financeiros', ht: 'Redigir a análise de riscos financeiros do plano, apontando planos de fuga.', hs: 'Comunicar cenários de riscos de forma transparente e madura.', obj: 'Finalizar a seção econômico-financeira do projeto de inovação.', oc: '3. Relatórios de viabilidade' }
    ]
  },
  {
    s: 14, uc: 'Propriedade Intelectual e Aspectos Legislais', codU: 'IN6', tema: 'Propriedade Intelectual e Proteção de Ideias',
    ct: 'Identificar as melhores formas de proteção intelectual e registro para novos negócios.',
    cs: 'Rigor ético, conformidade jurídica e respeito ao direito alheio.',
    aulas: [
      { t: 'Fundamentos de Propriedade Intelectual (Marcas, Patentes, Direitos)', ht: 'Diferenciar patentes de invenção de registros de marcas no INPI.', hs: 'Zelar pelo respeito ético e legal aos direitos autorais globais.', obj: 'Mapear as formas de proteção jurídica para inovações e ideias.', oc: '1. Proteção de ativos intelectuais' },
      { t: 'Busca de Anterioridade no INPI', ht: 'Utilizar a ferramenta de busca do INPI para verificar disponibilidade de marcas.', hs: 'Trabalhar com precaução investigativa no desenvolvimento de marcas.', obj: 'Pesquisar e certificar se a marca proposta já está registrada por terceiros.', oc: '2. Pesquisa de anterioridade' },
      { t: 'Segredos Comerciais e Acordos de Confidencialidade (NDA)', ht: 'Esboçar cláusulas básicas de confidencialidade para parcerias.', hs: 'Zelar pela segurança das informações confidenciais corporativas.', obj: 'Compreender a aplicação legal do NDA em negociações com investidores.', oc: '3. Acordos NDA' }
    ]
  },
  {
    s: 15, uc: 'Propriedade Intelectual e Aspectos Legislais', codU: 'IN6', tema: 'Direito Empresarial e Estrutura Societária',
    ct: 'Definir os tipos de sociedades comerciais e os contratos adequados para startups.',
    cs: 'Foco em justiça e estruturação jurídica sólida.',
    aulas: [
      { t: 'Tipos Societários para Novos Negócios (LTDA, S/A, SLU)', ht: 'Diferenciar os níveis de responsabilidade patrimonial dos sócios.', hs: 'Analisar e selecionar opções legais de forma ponderada.', obj: 'Identificar a estrutura jurídica de sociedade ideal para a startup.', oc: '1. Tipos de sociedades' },
      { t: 'Contratos de Vesting e Memorando de Fundadores (MOU)', ht: 'Esboçar as premissas básicas de divisão de quotas e prazos de permanência.', hs: 'Conduzir pactos de parcerias de forma clara, justa e ética.', obj: 'Estruturar o MOU e entender o funcionamento do contrato de Vesting.', oc: '2. Acordos de cofundadores' },
      { t: 'Marco Legal das Startups no Brasil', ht: 'Mapear os benefícios fiscais e as regras de investimento-anjo da lei brasileira.', hs: 'Interpretar leis e normas vigentes de forma consultiva útil.', obj: 'Compreender o ambiente regulatório das startups no Brasil.', oc: '3. Marco Legal de Startups' }
    ]
  },
  {
    s: 16, uc: 'Técnicas de Apresentação e Pitch', codU: 'IN7', tema: 'Comunicação e Roteiro do Pitch',
    ct: 'Escrever o roteiro estruturado do Pitch alinhado aos padrões exigidos por investidores.',
    cs: 'Poder de síntese e comunicação carismática.',
    aulas: [
      { t: 'Estrutura clássica de um Pitch de 3 minutos', ht: 'Mapear as 10 telas essenciais do pitch (Problema, Solução, Mercado...)', hs: 'Sintetizar ideias complexas de forma curta e compreensível.', obj: 'Compreender o esqueleto lógico de uma apresentação para investidores.', oc: '1. Estrutura do Pitch' },
      { t: 'Storytelling aplicado ao Pitch', ht: 'Escrever um roteiro utilizando a jornada do herói ou conexão com a dor real.', hs: 'Conectar emocionalmente a audiência com causas e problemas reais.', obj: 'Criar um roteiro envolvente que mantém a atenção dos ouvintes.', oc: '2. Narrativas de negócios' },
      { t: 'Design Visual de Slides de Alto Impacto', ht: 'Montar slides limpos, sem excesso de textos, usando tipografia assertiva.', hs: 'Apreciar o capricho, o design profissional e a estética visual refinada.', obj: 'Projetar a apresentação visual (Pitch Deck) de forma profissional.', oc: '3. Design de Pitch Deck' }
    ]
  },
  {
    s: 17, uc: 'Técnicas de Apresentação e Pitch', codU: 'IN7', tema: 'Apresentação Oral e Linguagem Corporal', tp: 'P',
    ct: 'Apresentar o Pitch de forma oral expressando clareza, tom de voz adequado e postura.',
    cs: 'Autoconfiança, superação de timidez e oratória cênica.',
    aulas: [
      { t: 'Técnicas de Oratória e Modulação de Voz', ht: 'Controlar o ritmo de fala, pausas dramáticas e projeção de voz.', hs: 'Controlar o nervosismo e se expressar com segurança perante o público.', obj: 'Aprimorar o desempenho verbal na socialização do projeto.', oc: '1. Oratória expressiva' },
      { t: 'Linguagem Corporal e Expressão Facial', ht: 'Mapear a postura ereta, contato visual constante e gestual de apoio.', hs: 'Transmitir credibilidade e postura corporativa confiável pelo corpo.', obj: 'Alinhar a linguagem não-verbal com a mensagem transmitida.', oc: '2. Comunicação corporal' },
      { t: 'Preparação para Sessão de Perguntas e Respostas (Q&A)', ht: 'Mapear as perguntas prováveis de jurados e preparar respostas curtas.', hs: 'Manter a calma e a gentileza ao lidar com dúvidas desafiadoras.', obj: 'Superar críticas lógicas de negócios com compostura profissional.', oc: '3. Simulação de sabatina' }
    ]
  },
  {
    s: 18, uc: 'Captação de Recursos (Funding)', codU: 'IN8', tema: 'Ecossistema de Investimentos',
    ct: 'Mapear as fontes de fomento e investimentos disponíveis em cada estágio da startup.',
    cs: 'Visão de longo prazo e relacionamento interpessoal.',
    aulas: [
      { t: 'Fases de Captação (Bootstrap, Anjo, Pre-Seed, Seed, Series A...)', ht: 'Identificar a maturidade e necessidade financeira do negócio em cada fase.', hs: 'Planejar o endividamento e diluição societária de forma madura.', obj: 'Mapear as etapas evolutivas de investimento corporativo de risco.', oc: '1. Fases de Funding' },
      { t: 'Fontes de Fomento Público e Editais (PIPE, FINEP)', ht: 'Mapear linhas de financiamento não reembolsáveis de pesquisa.', hs: 'Trabalhar com rigor legal na elaboração de propostas públicas.', obj: 'Identificar opções de fomento público que preservam as quotas de sócios.', oc: '2. Editais de fomento' },
      { t: 'O que investidores buscam (Equipe, Mercado, Produto)', ht: 'Reconhecer que o capital aposta na capacidade de execução da equipe.', hs: 'Valorizar a colaboração constante e o profissionalismo de marcas.', obj: 'Identificar os pontos mais valorizados por investidores nas startups.', oc: '3. Critérios de seleção' }
    ]
  },
  {
    s: 19, uc: 'Captação de Recursos (Funding)', codU: 'IN8', tema: 'Financiamento Coletivo e Negociação',
    ct: 'Planejar campanhas de crowdfunding e dominar técnicas de negociação de Term Sheets.',
    cs: 'Habilidades de negociação diplomática e liderança comunitária.',
    aulas: [
      { t: 'Financiamento Coletivo (Crowdfunding) de Recompensa e Equity', ht: 'Projetar uma campanha coletiva calculando as faixas de prêmios.', hs: 'Comunicar e engajar comunidades em prol de projetos inovadores.', obj: 'Planejar e entender os mecanismos do financiamento coletivo.', oc: '1. Crowdfunding' },
      { t: 'A Matriz de Termos de Investimento (Term Sheet)', ht: 'Mapear as principais cláusulas (Pre-Money, Post-Money Valuation, Cliff).', hs: 'Defender interesses corporativos mantendo o tom diplomático.', obj: 'Compreender o teor de contratos de investimento de capital de risco.', oc: '2. Cláusulas de Term Sheet' },
      { t: 'Negociação e Alinhamento de Interesses', ht: 'Simular uma mesa de negociação entre fundadores e investidores anjo.', hs: 'Equilibrar perdas e ganhos buscando acordos ganha-ganha.', obj: 'Conduzir discussões de valuation e metas de tração de forma justa.', oc: '3. Técnicas de negociação' }
    ]
  },
  {
    s: 20, uc: 'Inovação Social e de Impacto', codU: 'IN9', tema: 'Negócios Sociais e Sustentabilidade',
    ct: 'Projetar negócios de impacto socioambiental positivo e sustentabilidade econômica.',
    cs: 'Consciência social e empatia coletiva.',
    aulas: [
      { t: 'Inovação Social vs. Filantropia vs. Negócio Tradicional', ht: 'Diferenciar o foco de ONGs, empresas ESG e negócios sociais híbridos.', hs: 'Zelar por causas sociais de forma sustentável e produtiva.', obj: 'Compreender o conceito de negócios sociais focados em resolver dores sociais.', oc: '1. Negócios de Impacto' },
      { t: 'As Metas de Desenvolvimento Sustentável (ODS da ONU)', ht: 'Alinhar o projeto de negócios a pelo menos uma ODS específica.', hs: 'Engajar-se ativamente na construção de uma sociedade equitativa.', obj: 'Mapear as metas globais da ONU e inseri-las na estratégia do negócio.', oc: '2. ODS da ONU' },
      { t: 'Certificações de Impacto (Sistema B)', ht: 'Identificar os requisitos necessários para uma empresa obter o selo B.', hs: 'Zelar pela ética geral das operações e fornecedores corporativos.', obj: 'Compreender a governança e o valor comercial do selo Sistema B.', oc: '3. Sistema B e ESG' }
    ]
  },
  {
    s: 21, uc: 'Inovação Social e de Impacto', codU: 'IN9', tema: 'Inovação Aberta e Ecossistemas',
    ct: 'Identificar e propor parcerias no âmbito da inovação aberta (Open Innovation).',
    cs: 'Colaboração comunitária ampla e interdependência de redes.',
    aulas: [
      { t: 'Conceito de Inovação Aberta (Inbound, Outbound)', ht: 'Diferenciar a pesquisa e desenvolvimento interna (Fechada) da aberta.', hs: 'Compartilhar conhecimentos gerando cooperação ampla no mercado.', obj: 'Identificar como o fluxo de ideias externas eleva a velocidade de inovação.', oc: '1. Inovação Aberta' },
      { t: 'Programas de Conexão Corporate-Startup', ht: 'Mapear desafios reais de grandes empresas e as formas de atração de startups.', hs: 'Demonstrar flexibilidade para atuar com parcerias robustas.', obj: 'Identificar oportunidades de parcerias de aceleração e codesenvolvimento.', oc: '2. Conexões corporativas' },
      { t: 'Ecossistemas de Inovação (Parques Tecnológicos, Hubs)', ht: 'Mapear os elos de ecossistemas (universidades, governos, empresas).', hs: 'Interagir e valorizar redes de fomento e cocriação locais.', obj: 'Compreender o papel de hubs de inovação e incubadoras do país.', oc: '3. Hubs e incubadoras' }
    ]
  },
  {
    s: 22, uc: 'Transformação Digital', codU: 'IN10', tema: 'Inteligência Artificial e Tecnologias Emergentes',
    ct: 'Mapear a aplicação prática da Inteligência Artificial em modelos de novos negócios.',
    cs: 'Curiosidade e adaptabilidade na vanguarda tecnológica.',
    aulas: [
      { t: 'Inteligência Artificial Generativa nos Negócios', ht: 'Mapear ganhos de produtividade no uso de IA para atendimento e criação.', hs: 'Abertura para dominar novas tecnologias de forma ética e profissional.', obj: 'Compreender as oportunidades de automação trazidas por modelos de IA.', oc: '1. Aplicações de IA' },
      { t: 'Tecnologias de Nuvem e Big Data', ht: 'Identificar o papel do processamento em nuvem na escalabilidade de startups.', hs: 'Usar o pensamento analítico para processamento de informações.', obj: 'Mapear como o processamento de dados apoia decisões inteligentes.', oc: '2. Nuvem e Big Data' },
      { t: 'Plataformas Low-Code e No-Code para MVP', ht: 'Mapear ferramentas visuais de criação de apps dispensando código.', hs: 'Agilidade de criação manual focada na resolução prática.', obj: 'Conhecer ferramentas ágeis que diminuem barreiras de desenvolvimento.', oc: '3. Ferramentas No-Code' }
    ]
  },
  {
    s: 23, uc: 'Desenvolvimento e Escala (Growth)', codU: 'IN11', tema: 'Growth Hacking e Escala de Negócios',
    ct: 'Planejar estratégias de crescimento ágil utilizando a metodologia Growth Hacking.',
    cs: 'Foco incansável no crescimento sustentável e criatividade.',
    aulas: [
      { t: 'O Funil Pirata do Growth (AARRR)', ht: 'Mapear Aquisição, Ativação, Retenção, Recomendação e Receita de clientes.', hs: 'Visualizar a jornada de conversão do usuário de forma integrada.', obj: 'Dominar o preenchimento e monitoramento do funil AARRR.', oc: '1. Funil Pirata' },
      { t: 'A Metodologia Growth Hacking e Experimentos', ht: 'Elaborar testes rápidos de alteração de layout ou títulos para conversão.', hs: 'Raciocínio empírico, testando hipóteses constantes sem apego.', obj: 'Criar ciclos rápidos de hipóteses, testes e análise de dados.', oc: '2. Processos de Growth' },
      { t: 'Otimização de Conversão (Testes A/B)', ht: 'Mapear o funcionamento de testes estatísticos de comparação de páginas.', hs: 'Apreciar o rigor analítico na escolha de designs eficientes.', obj: 'Compreender o uso de testes A/B na validação de layouts online.', oc: '3. Testes A/B' }
    ]
  },
  {
    s: 24, uc: 'Desenvolvimento e Escala (Growth)', codU: 'IN11', tema: 'Modelos de Plataformas e Efeito de Rede',
    ct: 'Projetar estratégias de crescimento baseadas em modelos bilaterais de plataforma.',
    cs: 'Visão integrativa de redes de relacionamento.',
    aulas: [
      { t: 'Modelos de Plataforma Bilaterais (Two-Sided Markets)', ht: 'Mapear as necessidades de produtores e consumidores na mesma rede.', hs: 'Facilitar a negociação e interações harmoniosas entre lados.', obj: 'Compreender o funcionamento de plataformas de conexão (Ex: Uber, Airbnb).', oc: '1. Plataformas bilaterais' },
      { t: 'Efeito de Rede (Network Effects) de Crescimento', ht: 'Identificar como o valor do produto escala com o aumento de usuários.', hs: 'Incentivar o senso de comunidade e cooperação integradas.', obj: 'Diferenciar o crescimento linear tradicional do crescimento de plataforma.', oc: '2. Efeito de rede' },
      { t: 'Resolução do Dilema do Ovo e da Galinha', ht: 'Propor táticas para atrair o lado crítico de usuários no início da rede.', hs: 'Propor soluções inovadoras de persuasão comercial na prática.', obj: 'Projetar soluções práticas para boot-strapping de plataformas bilaterais.', oc: '3. Lançamento de plataformas' }
    ]
  },
  {
    s: 25, uc: 'Gestão da Inovação Corporativa', codU: 'IN12', tema: 'Inovação e Empreendedorismo Corporativo', tp: 'P',
    ct: 'Estruturar planos de fomento ao intraempreendedorismo dentro de grandes firmas.',
    cs: 'Liderança inovadora de processos organizacionais.',
    aulas: [
      { t: 'O Dilema do Inovador (Clayton Christensen)', ht: 'Compreender por que grandes empresas líderes falham frente a disrupções.', hs: 'Desenvolver a visão analítica de longo prazo das tendências corporativas.', obj: 'Analisar as teorias de Christensen sobre inovações sustentadoras e disruptivas.', oc: '1. Dilema do Inovador' },
      { t: 'Intraempreendedorismo (Inovação Interna)', ht: 'Mapear como colaboradores podem sugerir e liderar novos projetos internos.', hs: 'Demonstrar proatividade e espírito de dono em equipes corporativas.', obj: 'Estruturar rotas administrativas para aprovação de ideias internas.', oc: '2. Intraempreendedorismo' },
      { t: 'Modelos de Spin-Offs e Corporate Venture', ht: 'Compreender a separação de equipes em novas empresas para dar velocidade.', hs: 'Zelar pelo equilíbrio e sinergia entre grandes e pequenas marcas.', obj: 'Diferenciar investimentos corporativos de risco e criação de novos CNPJs.', oc: '3. Modelos de Corporate Venture' }
    ]
  },
  {
    s: 26, uc: 'Modelagem de Negócios', codU: 'IN3', tema: 'Projeto: Consolidação do Modelo de Negócios', tp: 'P',
    ct: 'Consolidar as peças de Canvas, MVP e viabilidade no relatório mestre.',
    cs: 'Consistência de dados e foco na entrega com excelência.',
    aulas: [
      { t: 'Ajustes no Canvas com base nas validações', ht: 'Atualizar blocos de custos, canais ou segmentos após dados de testes.', hs: 'Manter a flexibilidade mental, abandonando premissas refutadas.', obj: 'Saldar o Canvas consolidado de acordo com as evidências de mercado.', oc: '1. Refinamento de Canvas' },
      { t: 'Unificação de dados de conversão do MVP', ht: 'Sintetizar as estatísticas de conversão da landing page do projeto.', hs: 'Demonstrar exatidão e transparência científica na análise de resultados.', obj: 'Apresentar dados reais obtidos nos testes rápidos de MVP realizados.', oc: '2. Resultados do MVP' },
      { t: 'Fechamento do Relatório Mestre do Novo Negócio', ht: 'Redigir a justificativa executiva final da viabilidade do negócio.', hs: 'Comunicação escrita assertiva, rigor lógico e capricho de apresentação.', obj: 'Consolidar o plano de negócios e inovação completo em formato mestre.', oc: '3. Relatório de Inovação' }
    ]
  },
  {
    s: 27, uc: 'Técnicas de Apresentação e Pitch', codU: 'IN7', tema: 'Projeto: Apresentação Final e Sabatina', tp: 'P',
    ct: 'Apresentar o Pitch final do projeto simulando rodadas reais de investimento.',
    cs: 'Controle de ansiedade, oratória refinada e presença cênica.',
    aulas: [
      { t: 'Apresentação formal da Startup (Pitch Final)', ht: 'Conduzir a apresentação mestre de 3 minutos para a banca avaliadora.', hs: 'Controle emocional, oratória convincente e postura profissional.', obj: 'Socializar o projeto consolidado do ano focando na proposta inovadora.', oc: '1. Apresentação de Pitch' },
      { t: 'Defesa de premissas financeiras e tração', ht: 'Superar questionamentos lógicos sobre valuation, custos e tração de clientes.', hs: 'Compostura diante de críticas técnicas de negócios.', obj: 'Sustentar com dados reais as escolhas operacionais e financeiras.', oc: '2. Sabatina de bancas' },
      { t: 'Feedback de encerramento do projeto de inovação', ht: 'Registrar as sugestões e pontuações dadas pela banca avaliadora.', hs: 'Humildade e resiliência, focando no aperfeiçoamento contínuo.', obj: 'Finalizar o ciclo anual de desenvolvimento de novos negócios.', oc: '3. Fechamento de ciclo' }
    ]
  },
  {
    s: 28, uc: 'Inovação Social e de Impacto', codU: 'IN9', tema: 'Projeto: Ajustes do Modelo Social e Encerramento', tp: 'P',
    ct: 'Garantir que as correções da banca sejam incorporadas na documentação final.',
    cs: 'Responsabilidade e aperfeiçoamento constante.',
    aulas: [
      { t: 'Incorporação de melhorias de premissas', ht: 'Corrigir taxas de custos ou premissas fiscais de acordo com feedbacks.', hs: 'Zelar pela exatidão lógica máxima do projeto orçamentário.', obj: 'Saldar as pendências finais de cálculo do relatório do negócio.', oc: '1. Correções de dados' },
      { t: 'Polimento estético do material final', ht: 'Revisar ortografia, consistência de cores dos slides e links de MVPs.', hs: 'Zelar pelo rigor visual e estética profissional de materiais.', obj: 'Aprimorar o design visual e linguístico dos entregáveis da startup.', oc: '2. Polimento de design' },
      { t: 'Lições Aprendidas no Desenvolvimento de Negócios', ht: 'Mapear as principais competências e soft skills desenvolvidas ao longo do ano.', hs: 'Estimular a autoavaliação profissional de forma madura.', obj: 'Consolidar as lições de inovação e mentalidade ágil do ano letivo.', oc: '3. Lições de inovação' }
    ]
  }
];

export const INOVACAO_DATA = expandCompactWeeks(
  'Inovação e Desenvolvimento de Negócios',
  'C4',
  3,
  INOVACAO_WEEKS
);
