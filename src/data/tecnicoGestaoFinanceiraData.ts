import { TecnicoLessonItem } from './tecnicoData';
import { CompactWeek, expandCompactWeeks } from './tecnicoNovasData';

const GESTAO_FINANCEIRA_WEEKS: CompactWeek[] = [
  {
    s: 1, uc: 'Introdução à Contabilidade', codU: 'GF1', tema: 'Conceitos Fundamentais e o Balanço',
    ct: 'Compreender os fundamentos da contabilidade e ler balanços patrimoniais básicos.',
    cs: 'Pensamento analítico e atenção aos detalhes.',
    aulas: [
      { t: 'O que é Contabilidade e sua relevância social', ht: 'Diferenciar os usuários internos e externos da contabilidade.', hs: 'Analisar o impacto das informações na tomada de decisões.', obj: 'Entender a contabilidade como instrumento de controle e gestão.', oc: '1. Fundamentos da contabilidade' },
      { t: 'Patrimônio: Ativo, Passivo e Patrimônio Líquido', ht: 'Identificar bens, direitos e obrigações de uma entidade.', hs: 'Organizar ideias de forma lógica e estruturada.', obj: 'Classificar os elementos que compõem o patrimônio de uma empresa.', oc: '2. Equação patrimonial fundamental' },
      { t: 'Estruturação básica do Balanço Patrimonial', ht: 'Elaborar um balanço simplificado a partir de saldos informados.', hs: 'Demonstrar persistência ao lidar com conciliações financeiras.', obj: 'Montar e analisar a igualdade fundamental Ativo = Passivo + PL.', oc: '3. Estrutura do Balanço Patrimonial' }
    ]
  },
  {
    s: 2, uc: 'Introdução à Contabilidade', codU: 'GF1', tema: 'Demonstração do Resultado do Exercício (DRE)',
    ct: 'Analisar e estruturar receitas, custos e despesas para apuração do lucro.',
    cs: 'Foco em resultados e ética na apresentação de informações financeiras.',
    aulas: [
      { t: 'Diferença entre Regime de Caixa e de Competência', ht: 'Aplicar os regimes de caixa e competência em transações típicas.', hs: 'Reconhecer a importância do rigor técnico nas finanças.', obj: 'Compreender o momento do registro de receitas e despesas.', oc: '1. Regimes de contabilização' },
      { t: 'Estrutura conceitual da DRE', ht: 'Identificar a receita bruta, deduções, custos e despesas operacionais.', hs: 'Analisar criticamente a formação do lucro empresarial.', obj: 'Esquematizar a estrutura vertical de uma DRE de forma lógica.', oc: '2. Estrutura da DRE' },
      { t: 'Apuração do resultado do exercício', ht: 'Calcular o lucro bruto, operacional e líquido de uma empresa.', hs: 'Desenvolver a precisão numérica e o raciocínio dedutivo.', obj: 'Calcular a rentabilidade líquida do período a partir de lançamentos.', oc: '3. Lucro líquido e margens' }
    ]
  },
  {
    s: 3, uc: 'Introdução à Contabilidade', codU: 'GF1', tema: 'Fluxo de Caixa e Demonstrações Complementares',
    ct: 'Interpretar a geração e consumo de caixa nas atividades operacionais, de investimento e financiamento.',
    cs: 'Planejamento e visão de futuro.',
    aulas: [
      { t: 'Importância da Demonstração do Fluxo de Caixa (DFC)', ht: 'Diferenciar lucro (DRE) de caixa (DFC).', hs: 'Entender as necessidades de curto prazo da organização.', obj: 'Compreender a finalidade e a relevância da DFC na gestão financeira.', oc: '1. Caixa vs. Competência' },
      { t: 'Estruturação do Fluxo de Caixa Direto e Indireto', ht: 'Classificar entradas e saídas de caixa operacionais, de investimento e financiamento.', hs: 'Resolver problemas estruturais e de classificação financeira.', obj: 'Identificar os métodos de elaboração da demonstração do fluxo de caixa.', oc: '2. Classificação de atividades de caixa' },
      { t: 'Análise de liquidez imediata através do caixa', ht: 'Calcular e avaliar a capacidade de pagamento imediata da empresa.', hs: 'Avaliar cenários de escassez e propor medidas preventivas.', obj: 'Mapear a saúde financeira de curto prazo com base na DFC.', oc: '3. Saúde de caixa' }
    ]
  },
  {
    s: 4, uc: 'Contabilidade de Custos', codU: 'GF2', tema: 'Classificação e Apropriação de Custos', tp: 'P',
    ct: 'Classificar gastos empresariais em custos, despesas, investimentos e perdas.',
    cs: 'Determinação e organização metódica.',
    aulas: [
      { t: 'Terminologia aplicada à Contabilidade de Custos', ht: 'Classificar gastos reais de uma empresa simulada.', hs: 'Colaborar na separação objetiva de informações e dados.', obj: 'Distinguir custos de despesas em cenários industriais e de serviços.', oc: '1. Classificação de gastos' },
      { t: 'Custos Diretos e Indiretos: Critérios de Rateio', ht: 'Aplicar rateio de custos indiretos de fabricação (CIF) aos produtos.', hs: 'Debater de forma respeitosa soluções de rateio complexas.', obj: 'Distribuir custos indiretos de maneira justa utilizando direcionadores.', oc: '2. Apropriação de custos indiretos' },
      { t: 'Custos Fixos e Variáveis', ht: 'Identificar o comportamento dos custos em relação ao volume de produção.', hs: 'Demonstrar agilidade mental e facilidade de adaptação.', obj: 'Analisar o comportamento de custos fixos e variáveis na produção.', oc: '3. Comportamento dos custos' }
    ]
  },
  {
    s: 5, uc: 'Contabilidade de Custos', codU: 'GF2', tema: 'Métodos de Custeio e Tomada de Decisão',
    ct: 'Calcular o custo unitário por meio do Custeio por Absorção e Variável.',
    cs: 'Responsabilidade e tomada de decisão fundamentada.',
    aulas: [
      { t: 'Custeio por Absorção (Princípios e Prática)', ht: 'Calcular estoques e resultado pelo método de custeio por absorção.', hs: 'Trabalhar com rigor legal e atenção a normas contábeis.', obj: 'Aplicar as regras do custeio por absorção para relatórios externos.', oc: '1. Custeio por Absorção' },
      { t: 'Custeio Variável / Direto', ht: 'Calcular margem de contribuição utilizando o custeio variável.', hs: 'Pensar de forma estratégica na otimização de portfólio de produtos.', obj: 'Empregar o custeio variável para fins de tomada de decisões internas.', oc: '2. Custeio Variável' },
      { t: 'Comparação prática entre os métodos de custeio', ht: 'Explicar a variação de lucro entre absorção e variável devido a estoques.', hs: 'Expressar ideias complexas de forma clara e argumentada.', obj: 'Analisar o impacto de cada método no resultado e na avaliação de estoques.', oc: '3. Análise comparativa de custeio' }
    ]
  },
  {
    s: 6, uc: 'Contabilidade de Custos', codU: 'GF2', tema: 'Métodos de Depreciação e Amortização',
    ct: 'Calcular a depreciação de ativos imobilizados utilizando diferentes métodos.',
    cs: 'Raciocínio lógico e prudência.',
    aulas: [
      { t: 'Conceito de Depreciação, Amortização e Exaustão', ht: 'Identificar a perda de valor econômico e físico de bens duráveis.', hs: 'Valorizar a manutenção e conservação do patrimônio.', obj: 'Compreender o impacto contábil do desgaste de ativos no tempo.', oc: '1. Perda de valor de ativos' },
      { t: 'Depreciação pelo Método Linear', ht: 'Calcular a quota de depreciação anual e mensal pelo método das cotas constantes.', hs: 'Trabalhar com exatidão matemática de forma constante.', obj: 'Aplicar a fórmula do método linear para ativos industriais.', oc: '2. Depreciação linear' },
      { t: 'Depreciação por Unidades Produzidas ou Horas de Trabalho', ht: 'Calcular depreciação com base na utilização efetiva do equipamento.', hs: 'Adequar a mensuração de recursos à sua utilização real.', obj: 'Calcular a depreciação variável de máquinas industriais.', oc: '3. Depreciação por uso' }
    ]
  },
  {
    s: 7, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Introdução à Gestão de Capital de Giro',
    ct: 'Definir as necessidades de recursos de curto prazo e o funcionamento das contas circulantes.',
    cs: 'Equilíbrio emocional e visão estratégica.',
    aulas: [
      { t: 'Conceito de Capital de Giro e Capital de Giro Líquido (CGL)', ht: 'Calcular o CGL a partir do ativo e passivo circulantes.', hs: 'Avaliar os limites de segurança financeira de uma organização.', obj: 'Calcular e interpretar a liquidez global da empresa.', oc: '1. Capital de giro' },
      { t: 'Necessidade de Capital de Giro (NCG)', ht: 'Calcular a NCG comparando prazos médios de estocagem, recebimento e pagamento.', hs: 'Antecipar problemas de liquidez através do raciocínio analítico.', obj: 'Mapear a necessidade de financiamento operacional da empresa.', oc: '2. Necessidade de capital de giro' },
      { t: 'Saldo de Tesouraria e Efeito Tesoura', ht: 'Identificar o crescimento acelerado com falta de caixa (Overtrading).', hs: 'Reconhecer riscos e agir com cautela e planejamento.', obj: 'Avaliar o equilíbrio de tesouraria de uma empresa em expansão.', oc: '3. Equilíbrio de tesouraria' }
    ]
  },
  {
    s: 8, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Gestão de Contas a Receber e Políticas de Crédito',
    ct: 'Determinar políticas de crédito e cobrança adequadas para minimizar a inadimplência.',
    cs: 'Assertividade e empatia comercial.',
    aulas: [
      { t: 'Políticas de concessão de crédito', ht: 'Avaliar o risco de crédito utilizando os 5 Cs do Crédito.', hs: 'Tomar decisões ponderadas e éticas sobre o risco comercial.', obj: 'Definir critérios para análise de perfil e limite de crédito de clientes.', oc: '1. Concessão de crédito' },
      { t: 'Prazos de recebimento e descontos financeiros', ht: 'Calcular o custo de antecipação de recebíveis comparando com financiamento.', hs: 'Negociar prazos e condições financeiras equilibradas.', obj: 'Analisar o impacto financeiro de descontos por pagamento antecipado.', oc: '2. Gestão de prazos de recebimento' },
      { t: 'Controle de inadimplência e réguas de cobrança', ht: 'Desenvolver relatórios de Aging List (contas a receber vencidas por faixa).', hs: 'Manter a calma e a postura profissional em situações difíceis.', obj: 'Criar uma estratégia estruturada e respeitosa de cobrança.', oc: '3. Controle e cobrança' }
    ]
  },
  {
    s: 9, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Gestão de Estoques e Compras sob a Ótica Financeira', tp: 'P',
    ct: 'Otimizar o caixa empresarial através da gestão financeira de estoques.',
    cs: 'Planejamento preventivo e cooperação setorial.',
    aulas: [
      { t: 'Custos de manutenção e de falta de estoque', ht: 'Calcular os custos operacionais de armazenagem e de capital parado.', hs: 'Articular necessidades de compras com a realidade financeira.', obj: 'Avaliar o impacto financeiro do estoque excessivo ou deficitário.', oc: '1. Custos de estocagem' },
      { t: 'Lote Econômico de Compra (LEC)', ht: 'Calcular a quantidade ótima de pedido que minimiza custos totais.', hs: 'Aplicar raciocínio matemático a decisões de suprimentos.', obj: 'Calcular oLEC e determinar o ponto de pedido de segurança.', oc: '2. Lote econômico de compra' },
      { t: 'Impacto dos prazos de estoques no fluxo de caixa', ht: 'Desenhar a relação entre giro de estoques e liquidez corporativa.', hs: 'Visualizar processos integrados na cadeia de valor.', obj: 'Analisar como a redução do prazo de estocagem melhora o caixa livre.', oc: '3. Giro de estoque e caixa' }
    ]
  },
  {
    s: 10, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Fluxo de Caixa Projetado e Orçamento de Caixa',
    ct: 'Montar e monitorar um orçamento de caixa mensal e semanal para previsão de saldos.',
    cs: 'Prevencionismo e atenção rigorosa.',
    aulas: [
      { t: 'Componentes do Orçamento de Caixa', ht: 'Identificar as entradas previstas de vendas e saídas de pagamentos e despesas.', hs: 'Estruturar planos robustos e realistas de despesas.', obj: 'Definir as premissas e a estrutura de um orçamento de caixa de 12 meses.', oc: '1. Orçamento de caixa' },
      { t: 'Elaboração do Orçamento de Caixa Projetado', ht: 'Prever superávits ou déficits de tesouraria de curto prazo.', hs: 'Resolver situações simuladas de escassez extrema de recursos.', obj: 'Elaborar uma planilha de projeção de fluxo de caixa operacional.', oc: '2. Projeção de fluxo' },
      { t: 'Estratégias para Gestão de Déficits e Superávits', ht: 'Propor aplicações financeiras para superávit ou fontes de crédito para déficit.', hs: 'Demonstrar versatilidade e proatividade na gestão de problemas.', obj: 'Definir ações financeiras para correção de desvios no fluxo de caixa.', oc: '3. Tomada de decisão de caixa' }
    ]
  },
  {
    s: 11, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Ciclos Operacional e Financeiro',
    ct: 'Mapear, calcular e interpretar os ciclos operacionais e financeiros da organização.',
    cs: 'Pensamento sistêmico e otimização contínua.',
    aulas: [
      { t: 'Prazo Médio de Estocagem (PME)', ht: 'Calcular o PME a partir dos dados de compras e estoques médios.', hs: 'Analisar índices operacionais com exatidão.', obj: 'Compreender a velocidade de rotação do inventário da empresa.', oc: '1. Prazo médio de estocagem' },
      { t: 'Prazo Médio de Recebimento (PMR) e Prazo Médio de Pagamento (PMP)', ht: 'Calcular PMR e PMP correlacionando vendas a prazo e compras a prazo.', hs: 'Equilibrar interesses de clientes e fornecedores de forma diplomática.', obj: 'Calcular os prazos médios de relacionamento financeiro da empresa.', oc: '2. Prazos médios financeiros' },
      { t: 'Ciclo Operacional (CO) vs. Ciclo Financeiro (CF)', ht: 'Calcular os índices CO e CF e analisar suas implicações práticas.', hs: 'Desenvolver soluções para redução do ciclo financeiro (lacuna de caixa).', obj: 'Calcular e analisar o hiato de caixa operacional e financeiro.', oc: '3. Cálculo dos ciclos' }
    ]
  },
  {
    s: 12, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Indicadores de Liquidez e Solvência',
    ct: 'Avaliar a capacidade de pagamento de curto e longo prazo através de índices.',
    cs: 'Visão crítica e diagnóstico imparcial.',
    aulas: [
      { t: 'Liquidez Corrente e Liquidez Seca', ht: 'Calcular e interpretar os índices de liquidez corrente e seca.', hs: 'Avaliar o grau de dependência dos estoques para quitação de dívidas.', obj: 'Diferenciar a solvabilidade imediata da solvabilidade de curto prazo.', oc: '1. Liquidez de curto prazo' },
      { t: 'Liquidez Geral e Liquidez Imediata', ht: 'Calcular índices de liquidez geral e imediata em balanços patrimoniais.', hs: 'Desenvolver visão global sobre o passivo de longo prazo da empresa.', obj: 'Interpretar a capacidade de quitação de todas as obrigações a longo prazo.', oc: '2. Solvência de longo prazo' },
      { t: 'Endividamento e Estrutura de Capitais', ht: 'Calcular o grau de endividamento e a relação entre capital próprio e de terceiros.', hs: 'Analisar riscos de alavancagem financeira de forma analítica.', obj: 'Calcular e criticar o nível de endividamento geral da firma.', oc: '3. Estrutura de capital' }
    ]
  },
  {
    s: 13, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Projeto: Diagnóstico Patrimonial e Financeiro', tp: 'P',
    ct: 'Consolidar os conceitos contábeis e de curto prazo no diagnóstico de uma empresa real.',
    cs: 'Trabalho em equipe e liderança cooperativa.',
    aulas: [
      { t: 'Coleta de demonstrações reais', ht: 'Pesquisar e selecionar balanços publicados de companhias abertas brasileiras.', hs: 'Iniciativa na busca por informações confiáveis.', obj: 'Adquirir dados financeiros históricos de empresas do mercado.', oc: '1. Coleta de dados contábeis' },
      { t: 'Cálculo de indicadores patrimoniais', ht: 'Aplicar planilhas para calcular liquidez corrente, seca, endividamento e ciclo operacional.', hs: 'Organização estruturada e exatidão operacional nas tarefas.', obj: 'Calcular as métricas do diagnóstico para a empresa selecionada.', oc: '2. Cálculo de métricas' },
      { t: 'Desenvolvimento do relatório de diagnóstico (parte 1)', ht: 'Redigir a análise patrimonial e de curto prazo, apontando gargalos.', hs: 'Comunicação escrita, clara e assertiva de diagnósticos.', obj: 'Estruturar o primeiro relatório do projeto prático do ano.', oc: '3. Redação do diagnóstico financeiro' }
    ]
  },
  {
    s: 14, uc: 'Gestão Financeira de Curto Prazo', codU: 'GF3', tema: 'Projeto: Apresentação do Diagnóstico de Liquidez', tp: 'P',
    ct: 'Demonstrar competência na apresentação visual e verbal de relatórios financeiros.',
    cs: 'Autoconfiança e oratória profissional.',
    aulas: [
      { t: 'Elaboração de painéis visuais (Dashboards)', ht: 'Construir gráficos e tabelas resumidas de liquidez e prazos médios.', hs: 'Criatividade e capricho na representação visual de dados.', obj: 'Sintetizar as principais métricas calculadas em um layout visual claro.', oc: '1. Visualização de dados financeiros' },
      { t: 'Simulação de reunião de diretoria', ht: 'Praticar o papel de analista de finanças comunicando o diagnóstico para executivos.', hs: 'Adaptabilidade ao lidar com perguntas desafiadoras.', obj: 'Apresentar oralmente o diagnóstico de liquidez e ciclos da empresa.', oc: '2. Oratória corporativa' },
      { t: 'Incorporação de feedbacks de diagnóstico', ht: 'Registrar sugestões do professor e colegas para ajustes no projeto.', hs: 'Resiliência e busca constante pela excelência.', obj: 'Finalizar a primeira etapa com correções e ajustes consolidados.', oc: '3. Revisão do projeto' }
    ]
  },
  {
    s: 15, uc: 'Matemática Financeira Aplicada', codU: 'GF4', tema: 'Juros Simples e Desconto Comercial',
    ct: 'Calcular montante, juros, taxas e descontos simples no contexto comercial.',
    cs: 'Precisão de cálculo e raciocínio lógico.',
    aulas: [
      { t: 'Conceito de Valor do Dinheiro no Tempo', ht: 'Reconhecer que o dinheiro tem valor de acordo com a data de sua posse.', hs: 'Planejamento de longo prazo sobre o consumo.', obj: 'Diferenciar capital, juros e montante nas relações financeiras.', oc: '1. Juros no tempo' },
      { t: 'Fórmulas e aplicação de Juros Simples', ht: 'Calcular juros ordinários e exatos utilizando regime de capitalização simples.', hs: 'Resolver equações financeiras com foco e precisão.', obj: 'Calcular o retorno financeiro em aplicações simples de curtíssimo prazo.', oc: '2. Capitalização simples' },
      { t: 'Desconto Comercial Simples (Por Fora)', ht: 'Calcular o valor presente de títulos e duplicatas descontadas em bancos.', hs: 'Analisar criticamente os custos ocultos de operações de desconto.', obj: 'Aplicar regras de desconto de títulos sob regime comercial simples.', oc: '3. Desconto de duplicatas' }
    ]
  },
  {
    s: 16, uc: 'Matemática Financeira Aplicada', codU: 'GF4', tema: 'Juros Compostos e Equivalência de Taxas',
    ct: 'Calcular o montante acumulado e taxas efetivas sob regime de juros compostos.',
    cs: 'Pensamento exponencial e autodisciplina.',
    aulas: [
      { t: 'Mecânica dos Juros Compostos (Juros sobre Juros)', ht: 'Demonstrar matematicamente o crescimento exponencial do capital.', hs: 'Compreender o impacto da persistência de hábitos de poupança.', obj: 'Calcular montante, capital e taxa utilizando o regime composto.', oc: '1. Capitalização composta' },
      { t: 'Taxa Nominal vs. Taxa Efetiva', ht: 'Converter taxas de juros nominais em taxas efetivas equivalentes.', hs: 'Identificar armadilhas de juros em contratos de crédito.', obj: 'Diferenciar e calcular a taxa efetiva real cobrada pelo mercado.', oc: '2. Taxas nominais e efetivas' },
      { t: 'Equivalência de taxas no regime composto', ht: 'Calcular taxas equivalentes mensais, bimestrais e anuais compostas.', hs: 'Usar o pensamento matemático de forma rigorosa.', obj: 'Aplicar a fórmula de equivalência de taxas de juros compostos.', oc: '3. Equivalência composta' }
    ]
  },
  {
    s: 17, uc: 'Matemática Financeira Aplicada', codU: 'GF4', tema: 'Sistemas de Amortização de Empréstimos',
    ct: 'Montar planilhas de evolução de saldos devedores pelos sistemas Price e SAC.',
    cs: 'Análise criteriosa e organização instrumental.',
    aulas: [
      { t: 'Estruturação do Sistema de Amortização Constante (SAC)', ht: 'Calcular parcelas de financiamento pelo SAC, demonstrando amortização constante.', hs: 'Elaborar projeções ordenadas e estruturadas.', obj: 'Montar planilha SAC identificando juros, amortização e prestação decrescentes.', oc: '1. Sistema SAC' },
      { t: 'Estruturação da Tabela Price (Francês)', ht: 'Calcular parcelas pelo Sistema Price, identificando prestações iguais.', hs: 'Comparar alternativas de endividamento sob ótica de juros totais.', obj: 'Montar tabela Price de financiamento imobiliário ou de veículos.', oc: '2. Tabela Price' },
      { t: 'Análise comparativa de custos de captação', ht: 'Identificar qual sistema resulta em menor juro total para prazos idênticos.', hs: 'Tomar decisões bem fundamentadas em dados lógicos.', obj: 'Aconselhar a escolha do melhor financiamento empresarial (SAC vs. Price).', oc: '3. Decisão de financiamento' }
    ]
  },
  {
    s: 18, uc: 'Fontes de Financiamento e Custo de Capital', codU: 'GF5', tema: 'Modalidades de Crédito Empresarial',
    ct: 'Identificar e analisar as principais linhas de crédito corporativo disponíveis.',
    cs: 'Responsabilidade e gestão de riscos.',
    aulas: [
      { t: 'Linhas de Crédito para Capital de Giro', ht: 'Avaliar condições de conta garantida, desconto de títulos e empréstimos.', hs: 'Avaliar taxas e prazos com postura crítica.', obj: 'Mapear as opções de sustentação financeira de curtíssimo prazo.', oc: '1. Crédito operacional' },
      { t: 'Financiamentos de Longo Prazo e Financiadoras Públicas', ht: 'Conhecer linhas do BNDES, debêntures e leasing financeiro.', hs: 'Planejar o investimento de capital produtivo de longo prazo.', obj: 'Mapear fontes de fomento industrial e expansão física.', oc: '2. Fomento de longo prazo' },
      { t: 'Custo de capital de terceiros (Kd)', ht: 'Calcular o custo efetivo de empréstimos considerando tributação.', hs: 'Trabalhar com racionalidade em negociações bancárias.', obj: 'Calcular a taxa líquida de juros incidentes sobre a dívida.', oc: '3. Custo da dívida' }
    ]
  },
  {
    s: 19, uc: 'Fontes de Financiamento e Custo de Capital', codU: 'GF5', tema: 'Custo de Oportunidade e Estrutura de Capital', tp: 'P',
    ct: 'Calcular o custo do capital próprio e ponderar o custo médio de capital (WACC).',
    cs: 'Visão integral de negócios e prudência analítica.',
    aulas: [
      { t: 'Custo do Capital Próprio (Ke)', ht: 'Compreender o conceito de taxa de atratividade e custo de oportunidade.', hs: 'Respeitar o retorno exigido por investidores e sócios.', obj: 'Calcular a taxa mínima exigida por acionistas para aporte de capital.', oc: '1. Retorno de capital próprio' },
      { t: 'Custo Médio Ponderado de Capital (WACC)', ht: 'Calcular o WACC combinando custo de terceiros e capital próprio.', hs: 'Resolver modelos complexos de pesos e proporções financeiras.', obj: 'Calcular o WACC de uma firma simulada com base na estrutura de capital.', oc: '2. Taxa de desconto WACC' },
      { t: 'Otimização da Estrutura de Capitais', ht: 'Mapear a relação entre alavancagem financeira e o valor de mercado da empresa.', hs: 'Tomar posições estratégicas que balanceiam risco e retorno.', obj: 'Propor o nível ótimo de dívida para redução do WACC.', oc: '3. Alavancagem ideal' }
    ]
  },
  {
    s: 20, uc: 'Análise de Viabilidade de Investimentos', codU: 'GF6', tema: 'Fluxo de Caixa Livre e Taxa Mínima de Atratividade',
    ct: 'Estimar os fluxos de caixa operacionais para projetos de investimento.',
    cs: 'Visão empreendedora sustentável.',
    aulas: [
      { t: 'Investimento Inicial e Capital de Giro Associado', ht: 'Identificar gastos pré-operacionais, aquisição de máquinas e caixas iniciais.', hs: 'Planejar orçamentos completos de implantação de novos negócios.', obj: 'Calcular o desembolso total de caixa no período zero do projeto.', oc: '1. Investimento inicial' },
      { t: 'Projeção de Fluxos de Caixa Incrementais', ht: 'Diferenciar custos afundados de despesas e receitas futuras incrementais.', hs: 'Prever receitas futuras com base em projeções de mercado sensatas.', obj: 'Projetar os fluxos líquidos futuros gerados por uma nova filial.', oc: '2. Projeção de fluxos futuros' },
      { t: 'Definição da Taxa Mínima de Atratividade (TMA)', ht: 'Selecionar a TMA adequada com base na taxa de mercado e risco.', hs: 'Assumir riscos de forma calculada e ponderada.', obj: 'Definir o padrão de comparação de retorno para validação do projeto.', oc: '3. Taxa de atratividade' }
    ]
  },
  {
    s: 21, uc: 'Análise de Viabilidade de Investimentos', codU: 'GF6', tema: 'Métodos de Análise: VPL, TIR e Payback',
    ct: 'Decidir sobre a aceitação de projetos utilizando ferramentas de orçamento de capital.',
    cs: 'Rigidez metodológica e raciocínio crítico.',
    aulas: [
      { t: 'Valor Presente Líquido (VPL)', ht: 'Descontar fluxos de caixa futuros e calcular o VPL de projetos de investimento.', hs: 'Empregar ferramentas lógicas para aprovação de recursos.', obj: 'Calcular e interpretar o VPL para aceitar ou rejeitar um projeto.', oc: '1. Método do VPL' },
      { t: 'Taxa Interna de Retorno (TIR)', ht: 'Calcular a TIR e compará-la com o custo médio ponderado de capital (WACC).', hs: 'Identificar a rentabilidade inerente aos investimentos corporativos.', obj: 'Calcular a taxa de retorno de um fluxo por aproximação ou software.', oc: '2. Método da TIR' },
      { t: 'Payback Simples e Descontado', ht: 'Calcular o tempo necessário para recuperar o capital investido inicial.', hs: 'Equilibrar velocidade de retorno com a rentabilidade total de longo prazo.', obj: 'Calcular o prazo de retorno do investimento considerando juros.', oc: '3. Prazo de payback' }
    ]
  },
  {
    s: 22, uc: 'Orçamento Empresarial', codU: 'GF7', tema: 'Premissas de Vendas e Produção',
    ct: 'Desenvolver a projeção orçamentária do topo da estrutura organizacional (Vendas).',
    cs: 'Organização estruturada e realismo mercadológico.',
    aulas: [
      { t: 'Introdução ao Orçamento Empresarial (Master Budget)', ht: 'Reconhecer as etapas de elaboração e controle do orçamento integrado.', hs: 'Alinhar objetivos de múltiplos setores de maneira coesa.', obj: 'Compreender o fluxo de criação do orçamento anual de uma firma.', oc: '1. Introdução ao orçamento' },
      { t: 'Projeção de Receitas de Vendas', ht: 'Prever o volume de vendas e preços por linha de produto e canais.', hs: 'Utilizar premissas macroeconômicas realistas nas metas de vendas.', obj: 'Elaborar o orçamento de receitas com base em dados de mercado.', oc: '2. Orçamento de vendas' },
      { t: 'Orçamento de Volumes de Produção', ht: 'Calcular a quantidade de produtos a fabricar integrando estoques inicial e desejado.', hs: 'Gerenciar a capacidade instalada de forma coordenada.', obj: 'Equilibrar vendas projetadas e estoques para planejar o volume fabril.', oc: '3. Orçamento de produção' }
    ]
  },
  {
    s: 23, uc: 'Orçamento Empresarial', codU: 'GF7', tema: 'Orçamento de Gastos Operacionais e DRE Projetada',
    ct: 'Estimar os recursos necessários para a manutenção das atividades corporativas.',
    cs: 'Racionalidade de gastos e combate ao desperdício.',
    aulas: [
      { t: 'Orçamento de Matéria-Prima e Mão de Obra Direta', ht: 'Calcular o volume necessário de insumos e custo com equipe direta.', hs: 'Trabalhar com fichas técnicas de produto de forma organizada.', obj: 'Projetar os custos industriais necessários de fabricação.', oc: '1. Custos industriais orçados' },
      { t: 'Orçamento de Despesas Administrativas e Comerciais (SG&A)', ht: 'Projetar despesas fixas de escritório, comissões de vendas e logística.', hs: 'Identificar e propor o corte de gastos desnecessários.', obj: 'Estruturar a planilha de despesas de apoio da corporação.', oc: '2. Despesas SG&A' },
      { t: 'Consolidação da DRE Orçada', ht: 'Agrupar as peças parciais em uma demonstração de resultados projetada.', hs: 'Apresentar dados consolidados em reuniões de prestação de contas.', obj: 'Calcular o lucro operacional orçado e as margens previstas para o ano.', oc: '3. DRE Projetada' }
    ]
  },
  {
    s: 24, uc: 'Planejamento Tributário', codU: 'GF8', tema: 'Regimes Tributários Brasileiros',
    ct: 'Diferenciar e planejar o recolhimento de tributos conforme regimes fiscais.',
    cs: 'Consciência cívica e cumprimento legal das obrigações.',
    aulas: [
      { t: 'Simples Nacional: Alíquotas e Enquadramento', ht: 'Avaliar os limites de faturamento e faixas de tributação unificada.', hs: 'Apoiar o crescimento ordenado de micro e pequenas empresas.', obj: 'Calcular a guia DAS e analisar faixas de tributos de pequenos negócios.', oc: '1. Simples Nacional' },
      { t: 'Lucro Presumido vs. Lucro Real', ht: 'Calcular IRPJ e CSLL estimados pela receita presumida e pelo lucro contábil.', hs: 'Desenvolver raciocínio analítico fiscal aprofundado.', obj: 'Determinar a forma mais econômica e legal de tributação societária.', oc: '2. Lucro Presumido e Real' },
      { t: 'Tributos Incidentes sobre Vendas e Faturamento', ht: 'Calcular ICMS, ISS, PIS e COFINS na emissão de Notas Fiscais.', hs: 'Garantir a exatidão documental nas rotinas de faturamento.', obj: 'Identificar a carga de impostos indiretos cobrada na venda de mercadorias.', oc: '3. Impostos indiretos' }
    ]
  },
  {
    s: 25, uc: 'Orçamento Empresarial', codU: 'GF7', tema: 'Análise de Desvios Orçamentários (Budget vs. Actual)', tp: 'P',
    ct: 'Elaborar relatórios de controle de desempenho, comparando o planejado e o realizado.',
    cs: 'Flexibilidade adaptativa e autoavaliação profissional.',
    aulas: [
      { t: 'Relatório de Acompanhamento Orçamentário', ht: 'Identificar variações monetárias e percentuais de desvios operacionais.', hs: 'Encarar falhas no planejamento como oportunidades de aprendizado.', obj: 'Sinalizar desvios de custos e receitas em planilhas mensais.', oc: '1. Desvios orçamentários' },
      { t: 'Análise de Variação de Preço e Volume', ht: 'Isolar os motivos do desvio se causados por alteração de preço ou quantidade.', hs: 'Diagnosticar a causa raiz de problemas de custos de forma objetiva.', obj: 'Calcular a variação mista de receita e custos orçados.', oc: '2. Variação de preço e volume' },
      { t: 'Estratégias de correção de desvios operacionais', ht: 'Propor realocações de verbas ou contingenciamento de gastos emergenciais.', hs: 'Resolver crises e reestruturar prioridades corporativas.', obj: 'Determinar as ações financeiras corretivas para atingir a meta orçada.', oc: '3. Gestão orçamentária ágil' }
    ]
  },
  {
    s: 26, uc: 'Controladoria e Auditoria', codU: 'GF9', tema: 'Fundamentos de Controladoria',
    ct: 'Desenhar sistemas de informações gerenciais e relatórios para executivos.',
    cs: 'Rigor profissional e dedicação a controles internos.',
    aulas: [
      { t: 'O papel do Controller nas organizações modernas', ht: 'Mapear a estrutura da controladoria e sua atuação consultiva à diretoria.', hs: 'Atuar com integridade, ética e imparcialidade profissional.', obj: 'Compreender a governança e o papel de controle da controladoria.', oc: '1. Função de controladoria' },
      { t: 'Indicadores de Desempenho Chave (KPIs)', ht: 'Definir metas de rentabilidade do ativo (ROA) e de patrimônio líquido (ROE).', hs: 'Simplificar relatórios de forma que apoiem a alta liderança.', obj: 'Selecionar e monitorar os KPIs estratégicos de saúde corporativa.', oc: '2. KPIs financeiros' },
      { t: 'Controles Internos e Auditoria Preventiva', ht: 'Auditar lançamentos básicos e procedimentos de tesouraria prevenindo fraudes.', hs: 'Zelar pelas regras de conformidade e governança (Compliance).', obj: 'Identificar riscos operacionais de caixa e estruturar salvaguardas.', oc: '3. Auditoria e controles' }
    ]
  },
  {
    s: 27, uc: 'Orçamento Empresarial', codU: 'GF7', tema: 'Projeto: Elaboração do Plano Orçamentário Anual', tp: 'P',
    ct: 'Construir a peça completa do orçamento empresarial integrado para o ano seguinte.',
    cs: 'Raciocínio lógico estruturado e consistência de dados.',
    aulas: [
      { t: 'Dimensionamento de premissas setoriais', ht: 'Coordenar estimativas de receitas de vendas e limites de custos industriais.', hs: 'Conduzir discussões de equipe com objetividade.', obj: 'Estipular premissas de reajustes, inflação e expansão para o plano.', oc: '1. Definição de premissas orçamentárias' },
      { t: 'Montagem integrada de planilhas orçamentárias', ht: 'Programar fórmulas financeiras interligando vendas, custos e despesas operacionais.', hs: 'Garantir a coesão matemática de múltiplos arquivos e relatórios.', obj: 'Unificar as peças do orçamento na planilha orçamentária mestre.', oc: '2. Consolidação orçamentária' },
      { t: 'Geração do relatório final do orçamento (Master Budget)', ht: 'Redigir justificativas das premissas utilizadas no orçamento anual.', hs: 'Argumentar por meio de dados escritos sólidos o plano estratégico.', obj: 'Registrar de forma documental as metas físicas e financeiras da empresa.', oc: '3. Relatório do plano anual' }
    ]
  },
  {
    s: 28, uc: 'Orçamento Empresarial', codU: 'GF7', tema: 'Projeto: Defesa do Plano Orçamentário e Feedback', tp: 'P',
    ct: 'Apresentar com desenvoltura técnica e persuasão o orçamento planejado.',
    cs: 'Habilidade de negociação e argumentação objetiva sob pressão.',
    aulas: [
      { t: 'Apresentação formal da proposta orçamentária', ht: 'Comunicar as projeções de receitas, custos e lucro para uma banca examinadora.', hs: 'Expressar-se oralmente com clareza técnica e segurança executiva.', obj: 'Defender o Master Budget orçamentário consolidado para o próximo ano.', oc: '1. Apresentação do Master Budget' },
      { t: 'Defesa de premissas e contingenciamento', ht: 'Argumentar as escolhas de investimentos de capital e custos de empréstimos.', hs: 'Manter o autocontrole em situações de questionamento orçamentário.', obj: 'Superar críticas lógicas e lógicas de mercado sobre o planejamento.', oc: '2. Defesa sob questionamento' },
      { t: 'Análise de feedback e encerramento do projeto', ht: 'Realizar os ajustes de corte ou fomento recomendados pela diretoria.', hs: 'Reconhecer que planos devem ser realistas e adaptáveis no cotidiano.', obj: 'Finalizar o plano orçamentário anual integrado com as revisões.', oc: '3. Consolidação final do projeto' }
    ]
  }
];

export const GESTAO_FINANCEIRA_DATA = expandCompactWeeks(
  'Gestão Financeira e Contabilidade',
  'C2',
  3,
  GESTAO_FINANCEIRA_WEEKS
);
