import { TecnicoLessonItem } from './tecnicoData';
import { CompactWeek, expandCompactWeeks } from './tecnicoNovasData';

const GESTAO_OPERACOES_WEEKS: CompactWeek[] = [
  {
    s: 1, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Introdução e Tipos de Processos',
    ct: 'Compreender o papel estratégico da gestão de operações na manufatura e serviços.',
    cs: 'Pensamento sistêmico e visão integrativa.',
    aulas: [
      { t: 'O que é Gestão de Operações e histórico', ht: 'Diferenciar atividades de manufatura, serviços e processos de agregação de valor.', hs: 'Analisar cenários industriais complexos.', obj: 'Compreender a evolução histórica e o papel moderno da gestão de operações.', oc: '1. Evolução da Gestão de Operações' },
      { t: 'Modelo de Transformação de Inputs e Outputs', ht: 'Mapear entradas físicas, recursos de transformação e saídas geradas por um processo.', hs: 'Identificar relações de dependência entre variáveis.', obj: 'Mapear fluxos de transformação operacional de forma lógica.', oc: '2. Inputs, recursos e outputs' },
      { t: 'Tipos de Processos na Manufatura (Projeto, Jobbing, Lotes, Massa, Contínuos)', ht: 'Classificar sistemas produtivos de acordo com volume e variedade.', hs: 'Organizar ideias e classificar dados com base em padrões de processos.', obj: 'Distinguir os diferentes arranjos de processos fabris.', oc: '3. Processos de manufatura' },
      { t: 'Tipos de Processos em Serviços (Profissionais, Lojas, Serviços de Massa)', ht: 'Classificar operações de prestação de serviços reais por nível de contato.', hs: 'Demonstrar empatia perante as relações de atendimento ao cliente.', obj: 'Identificar as características e desafios da entrega de serviços.', oc: '4. Processos em serviços' }
    ]
  },
  {
    s: 2, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Arranjo Físico (Layout) e Fluxo',
    ct: 'Projetar e otimizar arranjos físicos de recursos produtivos para melhoria de fluxo.',
    cs: 'Organização espacial e racionalidade pragmática.',
    aulas: [
      { t: 'O que é Arranjo Físico (Layout) e objetivos', ht: 'Identificar desperdícios de movimentação causados por arranjos inadequados.', hs: 'Solucionar problemas práticos de distribuição física.', obj: 'Definir as metas de um bom arranjo físico industrial e comercial.', oc: '1. Definição e metas de layout' },
      { t: 'Tipos Básicos de Layout (Posição Fixa, Processo, Celular, Produto)', ht: 'Classificar layouts de empresas reais correlacionando com tipo de processo.', hs: 'Trabalhar com raciocínio lógico e representação geométrica.', obj: 'Diferenciar os quatro tipos básicos de layouts organizacionais.', oc: '2. Padrões de layout' },
      { t: 'Método de Balanço de Linhas de Produção', ht: 'Calcular tempo de ciclo e número mínimo de estações de trabalho de uma linha.', hs: 'Trabalhar de forma metódica sob limites de tempo.', obj: 'Equilibrar tarefas em estações para evitar gargalos e ociosidade.', oc: '3. Balanceamento de linha' },
      { t: 'Prática de Projeto de Layout Celular', ht: 'Agrupar máquinas e postos de trabalho para famílias de produtos específicos.', hs: 'Colaborar de forma criativa com colegas de equipe.', obj: 'Desenhar um fluxo celular minimizando distâncias de transporte.', oc: '4. Projeto de layout prático' }
    ]
  },
  {
    s: 3, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Gestão da Capacidade Produtiva',
    ct: 'Planejar e dimensionar recursos operacionais para atender metas de produção.',
    cs: 'Raciocínio lógico e planejamento prudente.',
    aulas: [
      { t: 'Definição de Capacidade Projetada, Efetiva e Real', ht: 'Diferenciar e quantificar os níveis de capacidade de máquinas e equipes.', hs: 'Manter o foco em metas objetivas e reais.', obj: 'Calcular a capacidade produtiva sob diferentes premissas de perdas.', oc: '1. Níveis de capacidade' },
      { t: 'Indicadores de Desempenho: Utilização e Eficiência', ht: 'Calcular índices de utilização e eficiência operacional a partir de dados históricos.', hs: 'Demonstrar honestidade profissional na medição de perdas.', obj: 'Medir o aproveitamento real dos recursos produtivos instalados.', oc: '2. Utilização e eficiência' },
      { t: 'Teoria das Restrições e Gestão de Gargalos', ht: 'Identificar a restrição física do sistema (gargalo) em processos sequenciais.', hs: 'Persistir na busca de soluções sistêmicas para problemas operacionais.', obj: 'Aplicar as etapas da Teoria das Restrições para aumentar o fluxo de saída.', oc: '3. Restrições e gargalos' },
      { t: 'Estratégias de Ajuste de Capacidade à Demanda', ht: 'Propor estratégias de capacidade de acompanhamento, nivelamento ou gestão de demanda.', hs: 'Demonstrar flexibilidade mental perante mudanças de mercado.', obj: 'Selecionar a melhor tática para equilibrar oferta operacional e demanda de vendas.', oc: '4. Ajuste capacidade-demanda' }
    ]
  },
  {
    s: 4, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Localização de Instalações', tp: 'P',
    ct: 'Decidir sobre a localização ótima de novas instalações fabris ou comerciais.',
    cs: 'Pensamento geográfico e tomada de decisão racional.',
    aulas: [
      { t: 'Fatores Determinantes de Localização', ht: 'Mapear fatores tangíveis (custos, impostos) e intangíveis (mão de obra, infraestrutura).', hs: 'Ponderar interesses e dados complexos de múltiplos locais.', obj: 'Identificar os aspectos críticos na escolha geográfica empresarial.', oc: '1. Variáveis de localização' },
      { t: 'Método do Centro de Gravidade para Distribuição', ht: 'Calcular coordenadas de um CD que minimiza custos de transporte.', hs: 'Aplicar métodos matemáticos cartesianos a problemas logísticos reais.', obj: 'Calcular e desenhar a localização centralizada de um depósito.', oc: '2. Centro de gravidade' },
      { t: 'Método de Ponderação de Fatores', ht: 'Atribuir pesos e notas para locais simulados gerando ranking de preferência.', hs: 'Tomar decisões ponderadas sem vieses emocionais.', obj: 'Estruturar uma matriz de decisão multicritério para novas filiais.', oc: '3. Matriz de ponderação' },
      { t: 'Apresentação da Matriz de Decisão Locacional', ht: 'Redigir justificativas para a escolha da melhor localidade do projeto.', hs: 'Comunicar com assertividade e precisão diagnósticos de negócios.', obj: 'Defender tecnicamente o local escolhido para implantação da nova planta.', oc: '4. Defesa de localização' }
    ]
  },
  {
    s: 5, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Projeto do Trabalho e Ergonomia',
    ct: 'Projetar postos de trabalho confortáveis, produtivos e em conformidade ergonômica.',
    cs: 'Empatia operacional e zelo pela saúde humana.',
    aulas: [
      { t: 'Estudo de Tempos e Movimentos', ht: 'Dividir tarefas em micro-movimentos e propor eliminações de redundâncias.', hs: 'Zelar pelo bem-estar e menor desgaste físico dos operadores.', obj: 'Compreender os princípios históricos da eficiência humana no trabalho.', oc: '1. Cronoanálise histórica' },
      { t: 'Cálculo do Tempo Padrão e Concessões', ht: 'Cronometrar tempos reais, calcular tempo normal e ajustar concessões de fadiga.', hs: 'Trabalhar com rigor estatístico de forma imparcial.', obj: 'Calcular o tempo padrão de uma tarefa fabril simulada.', oc: '2. Tempo padrão' },
      { t: 'Ergonomia no Posto de Trabalho (NR-17)', ht: 'Identificar riscos biomecânicos e de repetitividade de postos de trabalho.', hs: 'Expressar empatia e cuidado com a integridade física alheia.', obj: 'Aplicar diretrizes básicas da NR-17 de ergonomia do trabalho.', oc: '3. Diretrizes de ergonomia' },
      { t: 'Prática de Redesenho Ergonômico de Posto', ht: 'Propor ajustes de altura, alcance, ferramentas e iluminação de postos de trabalho.', hs: 'Cooperar na criação de ambientes corporativos mais humanos.', obj: 'Projetar melhorias ergonômicas que elevam a produtividade fabril.', oc: '4. Melhoria de postos' }
    ]
  },
  {
    s: 6, uc: 'Planejamento e Controle da Produção', codU: 'GO2', tema: 'Previsão de Demanda',
    ct: 'Estimar a demanda futura utilizando métodos estatísticos quantitativos.',
    cs: 'Previsibilidade de futuro e foco analítico.',
    aulas: [
      { t: 'Métodos Qualitativos de Previsão de Demanda', ht: 'Aplicar método Delphi, júri executivo e pesquisas de mercado simuladas.', hs: 'Sintetizar opiniões diversas de forma imparcial.', obj: 'Compreender os conceitos de previsão de mercado qualitativos.', oc: '1. Previsão qualitativa' },
      { t: 'Método da Média Móvel Simples e Ponderada', ht: 'Calcular projeções futuras a partir de históricos reais atribuindo pesos.', hs: 'Executar cálculos sequenciais com precisão.', obj: 'Projetar demandas utilizando suavização por médias móveis.', oc: '2. Médias móveis' },
      { t: 'Método do Amaciamento Exponencial Simples', ht: 'Calcular a constante alfa de ajuste de suavização exponencial.', hs: 'Avaliar a sensibilidade matemática a flutuações bruscas.', obj: 'Calcular previsões futuras que reagem a erros passados de previsão.', oc: '3. Suavização exponencial' },
      { t: 'Medição de Erros de Previsão (MAD e MAPE)', ht: 'Calcular o desvio médio absoluto e erro percentual médio de projeções.', hs: 'Assumir e corrigir desvios com resiliência técnica.', obj: 'Avaliar a precisão de múltiplos métodos de previsão de demanda.', oc: '4. Precisão estatística' }
    ]
  },
  {
    s: 7, uc: 'Planejamento e Controle da Produção', codU: 'GO2', tema: 'Planejamento Mestre de Produção',
    ct: 'Estruturar o Plano Mestre de Produção (MPS) e o Planejamento de Necessidade de Materiais.',
    cs: 'Foco organizacional e disciplina técnica.',
    aulas: [
      { t: 'Fluxo Hierárquico de Planejamento (S&OP, MPS, MRP)', ht: 'Conectar planos estratégicos agregados com ordens de fabricação de curto prazo.', hs: 'Compreender o papel da integração de metas organizacionais.', obj: 'Compreender a hierarquia do PCP corporativo de forma integrada.', oc: '1. Hierarquia do PCP' },
      { t: 'Estrutura do Plano Mestre de Produção (MPS)', ht: 'Elaborar matrizes de MPS balanceando estoque disponível, previsões e pedidos firmes.', hs: 'Resolver quebra-cabeças lógicos industriais com dedicação.', obj: 'Programar lotes de produção e estoque disponível para promessa (ATP).', oc: '2. Matriz do MPS' },
      { t: 'Estrutura de Produto (Explosão de Lista de Materiais - BOM)', ht: 'Estruturar uma árvore de produto (BOM) em múltiplos níveis de componentes.', hs: 'Organizar esquemas ramificados de forma meticulosa.', obj: 'Montar a lista detalhada de montagem de um produto industrial.', oc: '3. Lista de materiais BOM' },
      { t: 'Cálculo de Necessidades de Materiais (MRP I)', ht: 'Calcular recebimentos e liberações planejadas de ordens de insumos.', hs: 'Executar processos algorítmicos complexos com exatidão.', obj: 'Montar planilha MRP integrando prazos de entrega (Lead Times).', oc: '4. Processamento de MRP' }
    ]
  },
  {
    s: 8, uc: 'Planejamento e Controle da Produção', codU: 'GO2', tema: 'Programação de Operações de Curto Prazo',
    ct: 'Sequenciar tarefas e emitir ordens de trabalho conforme regras de prioridade.',
    cs: 'Organização operacional e equilíbrio decisório.',
    aulas: [
      { t: 'Regras de Prioridade no Sequenciamento (PEPS, TPC, MPT, DDP)', ht: 'Sequenciar tarefas e calcular tempo de fluxo e atraso médio.', hs: 'Tomar decisões justas baseadas em regras explícitas.', obj: 'Calcular e analisar o desempenho de regras de programação clássicas.', oc: '1. Regras de sequenciamento' },
      { t: 'Regra de Johnson para Sequenciamento em 2 Máquinas', ht: 'Otimizar o fluxo de tarefas que passam sequencialmente por dois centros.', hs: 'Resolver otimizações com raciocínio lógico rigoroso.', obj: 'Calcular a ordem ótima de tarefas para minimizar o tempo de fabricação total.', oc: '2. Regra de Johnson' },
      { t: 'Gráficos de Gantt de Carregamento e Controle', ht: 'Montar cronogramas de barras mapeando ocupação real de postos.', hs: 'Apreciar a utilidade prática do acompanhamento visual.', obj: 'Montar painel Gantt de carregamento de tarefas de produção.', oc: '3. Gráficos de Gantt' },
      { t: 'Emissão e Liberação de Ordens de Trabalho', ht: 'Criar documentos formais de ordens de serviço contendo especificações.', hs: 'Zelar pelo fluxo de informações exato e sem ambiguidades.', obj: 'Esboçar o fluxo administrativo de liberação de produção e controle.', oc: '4. Fluxo de ordens' }
    ]
  },
  {
    s: 9, uc: 'Filosofia Lean Manufacturing', codU: 'GO3', tema: 'Fundamentos e Eliminação de Desperdícios', tp: 'P',
    ct: 'Identificar, analisar e mitigar os 7 desperdícios clássicos do Sistema Toyota de Produção.',
    cs: 'Eficiência pragmática e repúdio ao desperdício.',
    aulas: [
      { t: 'Origens do Sistema Toyota de Produção (STP)', ht: 'Diferenciar produção em massa de produção enxuta e fluxos unitários.', hs: 'Apreciar a inovação frugal e a busca pela excelência.', obj: 'Compreender a história, princípios fundamentais e objetivos do Lean.', oc: '1. Origem do Lean' },
      { t: 'Os 7 Desperdícios do Lean (Superprodução, Espera, Transporte...)', ht: 'Mapear e apontar desperdícios operacionais em fotos ou fluxos reais.', hs: 'Desenvolver a sensibilidade analítica para identificar perdas.', obj: 'Identificar e classificar os desperdícios que não agregam valor ao cliente.', oc: '2. Desperdícios Lean' },
      { t: 'Mapeamento do Fluxo de Valor (VSM) Simplificado', ht: 'Desenhar fluxos de materiais e informações identificando lead times.', hs: 'Pensar de forma sistêmica e integrada.', obj: 'Esboçar um VSM básico identificando tempos agregadores e não agregadores de valor.', oc: '3. Desenho de VSM' },
      { t: 'Projeto de Redução de Desperdícios na Produção', ht: 'Propor planos Kaizen de melhorias de processo para casos industriais.', hs: 'Apresentar soluções inovadoras em cooperação mútua.', obj: 'Elaborar propostas de melhoria contínua focadas em ganhos rápidos de fluxo.', oc: '4. Melhoria Kaizen' }
    ]
  },
  {
    s: 10, uc: 'Filosofia Lean Manufacturing', codU: 'GO3', tema: 'Ferramentas de Estabilização e Fluxo',
    ct: 'Implementar as ferramentas Lean de estabilidade operacional e produção puxada.',
    cs: 'Autodisciplina, zelo ambiental e padronização.',
    aulas: [
      { t: 'Metodologia 5S (Sensos de Utilização, Organização...)', ht: 'Aplicar auditorias 5S em ambientes de trabalho simulados.', hs: 'Incorporar limpeza, organização e autodisciplina no cotidiano.', obj: 'Compreender os 5 sensos e seu papel de base na melhoria contínua.', oc: '1. Filosofia 5S' },
      { t: 'Gerenciamento Visual e Andon', ht: 'Projetar sinalizações e quadros de controle de produção transparentes.', hs: 'Facilitar a comunicação rápida e honesta sobre desvios.', obj: 'Desenhar controles visuais simples para acompanhamento operacional.', oc: '2. Controles visuais' },
      { t: 'Padronização de Trabalho (Standard Work)', ht: 'Redigir Folhas de Instrução de Trabalho (FIT) sequenciais com tempos.', hs: 'Valorizar a consistência de processos operacionais regulados.', obj: 'Estruturar o padrão de execução ótimo de uma atividade operacional.', oc: '3. Trabalho padronizado' },
      { t: 'Kanban e Mecanismo de Produção Puxada', ht: 'Calcular a quantidade de cartões Kanban para movimentação de caixas.', hs: 'Agir de forma coordenada sem criar estoques desnecessários.', obj: 'Dimensionar o sistema Kanban e entender o fluxo puxado na prática.', oc: '4. Fluxo puxado Kanban' }
    ]
  },
  {
    s: 11, uc: 'Gestão da Qualidade', codU: 'GO4', tema: 'Fundamentos e Gurus da Qualidade',
    ct: 'Mapear as principais correntes históricas e abordagens conceituais da Qualidade.',
    cs: 'Orientação à perfeição e dedicação técnica.',
    aulas: [
      { t: 'Evolução da Qualidade (Inspeção, Controle, Garantia, TQM)', ht: 'Diferenciar as eras da qualidade e as abordagens reativas das preventivas.', hs: 'Reconhecer que a qualidade se constrói no processo, não na inspeção.', obj: 'Compreender a evolução conceitual da Gestão da Qualidade.', oc: '1. Eras da Qualidade' },
      { t: 'Os Gurus da Qualidade e seus legados (Deming, Juran, Ishikawa)', ht: 'Aplicar a filosofia dos gurus (14 pontos de Deming, trilogia de Juran) a casos.', hs: 'Incorporar rigor metodológico e visão estratégica nas organizações.', obj: 'Analisar as principais contribuições teóricas para a qualidade moderna.', oc: '2. Gurus da Qualidade' },
      { t: 'Ciclo PDCA de Melhoria Contínua', ht: 'Aplicar o método PDCA na estruturação de planos de ação corretiva.', hs: 'Persistir na busca e teste de hipóteses de solução de forma circular.', obj: 'Dominar o fluxo científico de Planejar, Fazer, Checar e Agir.', oc: '3. Método PDCA' },
      { t: 'Custo da Qualidade (Prevenção, Avaliação, Falhas Internas...)', ht: 'Classificar custos reais de falhas e custos preventivos de processos.', hs: 'Ponderar o impacto de falhas sobre a sustentabilidade do negócio.', obj: 'Estruturar relatórios de custos de qualidade e propor otimização.', oc: '4. Custos de conformidade' }
    ]
  },
  {
    s: 12, uc: 'Gestão da Qualidade', codU: 'GO4', tema: 'As 7 Ferramentas da Qualidade',
    ct: 'Selecionar, processar e interpretar as ferramentas clássicas para solução de problemas.',
    cs: 'Análise quantitativa racional e foco em fatos.',
    aulas: [
      { t: 'Folha de Verificação e Histograma', ht: 'Montar planilhas de coleta de dados e gerar gráficos de distribuição.', hs: 'Demonstrar paciência e zelo na coleta fidedigna de informações.', obj: 'Sintetizar dados de defeitos industriais em formas gráficas legíveis.', oc: '1. Coleta e distribuição' },
      { t: 'Diagrama de Pareto (Regra 80/20)', ht: 'Calcular frequências acumuladas e identificar causas vitais de defeitos.', hs: 'Focar energia nas causas que geram o maior impacto prático.', obj: 'Construir gráficos de Pareto identificando prioridades de atuação.', oc: '2. Princípio de Pareto' },
      { t: 'Diagrama de Causa e Efeito (Ishikawa / 6M)', ht: 'Agrupar causas de problemas operacionais nos conceitos dos 6Ms.', hs: 'Pensar de forma aberta na busca de causas-raiz em discussões.', obj: 'Montar diagrama de Ishikawa investigando origens de perdas industriais.', oc: '3. Diagrama de Ishikawa' },
      { t: 'Diagrama de Dispersão e Fluxogramas', ht: 'Desenhar fluxos de processos detalhados e analisar correlações de variáveis.', hs: 'Visualizar causas sistêmicas e correlações físicas de dados.', obj: 'Mapear fluxos de trabalho e correlacionar causas potenciais.', oc: '4. Correlação e fluxogramas' }
    ]
  },
  {
    s: 13, uc: 'Gestão da Qualidade', codU: 'GO4', tema: 'Controle Estatístico de Processo (CEP)', tp: 'P',
    ct: 'Construir cartas de controle estatístico monitorando a variabilidade do processo.',
    cs: 'Rigor estatístico e integridade analítica.',
    aulas: [
      { t: 'Variação Comum vs. Variação Especial', ht: 'Diferenciar causas aleatórias inerentes ao processo de causas atípicas.', hs: 'Não tomar decisões reativas precipitadas perante variações normais.', obj: 'Compreender os fundamentos teóricos da variabilidade estatística.', oc: '1. Tipos de variabilidade' },
      { t: 'Construção de Cartas de Controle por Variáveis (Média e Amplitude)', ht: 'Calcular Limite Superior de Controle (LSC) e Limite Inferior (LIC).', hs: 'Operar estatísticas descritivas com exatidão.', obj: 'Montar cartas de controle X-barra e R monitorando dimensões físicas.', oc: '2. Cartas de controle' },
      { t: 'Leitura e Interpretação de Desvios na Carta', ht: 'Identificar padrões anômalos (tendências, ciclos, saltos) nos pontos.', hs: 'Identificar desvios e intervir com segurança no momento correto.', obj: 'Diagnosticar perda de estabilidade estatística do processo fabril.', oc: '3. Estabilidade de processo' },
      { t: 'Cálculo de Capacidade do Processo (Cp e Cpk)', ht: 'Calcular Cp e Cpk comparando variação real com especificações técnicas.', hs: 'Zelar pelo cumprimento rígido de especificações exigidas por clientes.', obj: 'Calcular índices Cp/Cpk indicando se o processo é capaz ou incapaz.', oc: '4. Capacabilidade de processos' }
    ]
  },
  {
    s: 14, uc: 'Gestão da Qualidade', codU: 'GO4', tema: 'Normas ISO e Auditoria da Qualidade',
    ct: 'Identificar as diretrizes da norma ISO 9001 e aplicar metodologias de auditoria.',
    cs: 'Conformidade de padrões e responsabilidade civil.',
    aulas: [
      { t: 'A Família ISO e Estrutura da ISO 9001:2015', ht: 'Mapear a abordagem por processos e mentalidade de riscos na organização.', hs: 'Respeitar normas e políticas corporativas regulamentadas.', obj: 'Compreender a finalidade e a estrutura dos requisitos da ISO 9001.', oc: '1. Requisitos ISO 9001' },
      { t: 'Processo de Auditoria Interna da Qualidade', ht: 'Conhecer as fases de planejamento, execução, relatório e acompanhamento.', hs: 'Manter postura ética, imparcial e profissional em avaliações.', obj: 'Mapear o fluxo de uma auditoria preventiva de sistema de qualidade.', oc: '2. Auditoria interna' },
      { t: 'Gestão de Não Conformidades e Ação Corretiva', ht: 'Registrar relatórios de Não Conformidade (RNC) e propor planos 5W2H.', hs: 'Propor soluções duradouras para desvios documentados.', obj: 'Investigar causas e criar planos de ação robustos com o 5W2H.', oc: '3. Relatórios RNC e 5W2H' },
      { t: 'Certificações de Qualidade e Reconhecimento', ht: 'Analisar o impacto comercial e mercadológico do selo ISO em empresas.', hs: 'Demonstrar comprometimento coletivo na obtenção de metas de marcas.', obj: 'Simular os passos finais para obtenção do selo de qualidade.', oc: '4. Processo de certificação' }
    ]
  },
  {
    s: 15, uc: 'Metodologia Seis Sigma', codU: 'GO5', tema: 'Conceitos e Método DMAIC',
    ct: 'Aplicar a estrutura DMAIC da metodologia Seis Sigma em projetos de melhoria contínua.',
    cs: 'Raciocínio orientado a projetos estruturados.',
    aulas: [
      { t: 'O que é Seis Sigma e seu nível de defeitos (DPMO)', ht: 'Calcular a taxa de defeitos por milhão de oportunidades (DPMO).', hs: 'Mirar o nível máximo de excelência com perseverança.', obj: 'Compreender o conceito estatístico e gerencial da meta Seis Sigma.', oc: '1. Estatística Seis Sigma' },
      { t: 'Etapas de Definição (Define) e Medição (Measure)', ht: 'Elaborar Contrato de Projeto (Project Charter) e mapear variáveis de entrada.', hs: 'Sintetizar as premissas e o escopo de um projeto com clareza.', obj: 'Definir o problema prático e mapear dados de medição iniciais.', oc: '2. Fases de Define e Measure' },
      { t: 'Etapa de Análise (Analyze) de Variáveis de Causa', ht: 'Utilizar Ishikawa ou regressões estatísticas identificando causas críticas.', hs: 'Interpretar dados de forma objetiva sem saltar para conclusões.', obj: 'Diagnosticar causas fundamentais que geram variabilidade de processos.', oc: '3. Fase de Analyze' },
      { t: 'Etapas de Melhoria (Improve) e Controle (Control)', ht: 'Definir plano de experimentos de melhoria e desenhar cartas de controle.', hs: 'Garantir que melhorias alcançadas sejam mantidas no tempo.', obj: 'Testar e documentar a solução do projeto e consolidar o controle.', oc: '4. Fases Improve e Control' }
    ]
  },
  {
    s: 16, uc: 'Gestão de Serviços e Filas', codU: 'GO6', tema: 'Operações em Serviços e Filas',
    ct: 'Gerenciar gargalos de fluxo de clientes e tempos de espera utilizando teoria das filas.',
    cs: 'Empatia com o cliente e controle situacional.',
    aulas: [
      { t: 'Pacote de Serviços e Servicesscape', ht: 'Mapear elementos explícitos, implícitos e as instalações de serviços.', hs: 'Visualizar a percepção subjetiva de satisfação humana.', obj: 'Identificar a estrutura do pacote de valor entregue ao cliente.', oc: '1. Pacote de serviços' },
      { t: 'Psicologia da Espera do Cliente', ht: 'Propor soluções de entretenimento ou distração para amenizar a espera.', hs: 'Desenvolver a empatia e a compreensão psicológica do cliente.', obj: 'Compreender as percepções cognitivas de clientes na fila de espera.', oc: '2. Percepção do tempo de espera' },
      { t: 'Estruturas de Sistemas de Filas (Fase, Canal)', ht: 'Classificar filas empresariais por canais paralelos e fases sequenciais.', hs: 'Organizar sistemas complexos de forma estruturada.', obj: 'Diferenciar os modelos estruturais de fluxo de atendimento.', oc: '3. Estrutura de filas' },
      { t: 'Cálculo de Desempenho de Filas Simples (M/M/1)', ht: 'Calcular tempo médio na fila, tamanho da fila e taxa de ocupação.', hs: 'Empregar modelos de probabilidade de forma assertiva.', obj: 'Calcular estatísticas de desempenho operacional de canais individuais.', oc: '4. Modelagem de filas' }
    ]
  },
  {
    s: 17, uc: 'Cadeia de Suprimentos (Supply Chain)', codU: 'GO7', tema: 'Fundamentos e Compras Integradas',
    ct: 'Planejar e integrar fluxos físicos na cadeia de suprimentos global.',
    cs: 'Colaboração estratégica e integridade transacional.',
    aulas: [
      { t: 'O que é Cadeia de Suprimentos e valor gerado', ht: 'Mapear os elos de uma cadeia de suprimentos integrando fornecedores e clientes.', hs: 'Enxergar conexões complexas na cadeia global de suprimentos.', obj: 'Compreender a relevância da sincronização de fluxos na cadeia.', oc: '1. Elos da cadeia de suprimentos' },
      { t: 'Efeito Chicote (Bullwhip Effect) em Cadeias', ht: 'Simular distorções de demanda ao longo dos elos operacionais.', hs: 'Cooperar de forma transparente para evitar distorções de estoque.', obj: 'Identificar as causas e propor controles para o efeito chicote.', oc: '2. Efeito chicote' },
      { t: 'Gestão de Compras e Seleção de Fornecedores', ht: 'Elaborar matrizes de homologação de fornecedores comparando critérios.', hs: 'Conduzir negócios com ética, transparência e imparcialidade.', obj: 'Estruturar o processo de qualificação e seleção de fornecedores.', oc: '3. Homologação de parceiros' },
      { t: 'Matriz de Kraljic para Compras Estratégicas', ht: 'Classificar insumos comprados de acordo com risco e impacto financeiro.', hs: 'Desenvolver habilidades de negociação estratégica de alto nível.', obj: 'Aplicar a Matriz de Kraljic otimizando o portfólio de compras corporativas.', oc: '4. Matriz de Kraljic' }
    ]
  },
  {
    s: 18, uc: 'Cadeia de Suprimentos (Supply Chain)', codU: 'GO7', tema: 'Logística de Armazenagem e Estoque',
    ct: 'Operar e otimizar rotinas de depósitos, inventário e controle físico de insumos.',
    cs: 'Organização rigorosa e foco preventivo contra perdas.',
    aulas: [
      { t: 'Funções e Operações de Armazenagem', ht: 'Mapear recebimento, triagem, endereçamento, separação (picking) e expedição.', hs: 'Trabalhar com precisão sequencial e agilidade física.', obj: 'Compreender as atividades de movimentação física interna de depósitos.', oc: '1. Atividades de armazenagem' },
      { t: 'Sistemas de Estocagem e Tecnologia (WMS)', ht: 'Mapear estruturas porta-paletes, blocados e utilidades do sistema WMS.', hs: 'Demonstrar facilidade e interesse por automações de controle.', obj: 'Conhecer as principais tecnologias de movimentação e controle físico.', oc: '2. Equipamentos e sistemas de estoque' },
      { t: 'Métodos de Endereçamento de Estoques', ht: 'Desenhar mapas de endereçamento alfa-numérico para localizações em CD.', hs: 'Orientação ao detalhe estruturado e organização espacial.', obj: 'Montar e aplicar sistemas lógicos de localização espacial de paletes.', oc: '3. Endereçamento de estoque' },
      { t: 'Inventário Físico: Geral e Rotativo', ht: 'Calcular acurácia de inventário e desvios de saldos reais e do sistema.', hs: 'Zelar com responsabilidade pela exatidão fiscal de saldos.', obj: 'Aplicar metodologias de contagem física para controle patrimonial.', oc: '4. Controles de inventário' }
    ]
  },
  {
    s: 19, uc: 'Cadeia de Suprimentos (Supply Chain)', codU: 'GO7', tema: 'Logística de Transportes e Distribuição', tp: 'P',
    ct: 'Selecionar e otimizar modais de transporte rodoviários, ferroviários e marítimos.',
    cs: 'Racionalidade econômica e planejamento geográfico.',
    aulas: [
      { t: 'Modais de Transporte e Características', ht: 'Comparar rodoviário, ferroviário, aquaviário, aéreo e dutoviário por custo.', hs: 'Analisar e selecionar opções com base em custo-benefício lógico.', obj: 'Diferenciar os modais logísticos de transporte intermunicipal e global.', oc: '1. Modais logísticos' },
      { t: 'Cálculo de Frete e Otimização de Cargas', ht: 'Calcular peso cubado de cargas de transporte rodoviário.', hs: 'Aplicar exatidão matemática em faturamentos logísticos.', obj: 'Calcular taxas de fretes e dimensionamento volumétrico de veículos.', oc: '2. Cubagem e frete' },
      { t: 'Roteirização de Veículos de Entrega', ht: 'Utilizar heurísticas simples para traçar rotas eficientes de distribuição.', hs: 'Otimizar trajetos com visão de sustentabilidade de combustíveis.', obj: 'Projetar rotas integradas de entrega minimizando distâncias e tempos.', oc: '3. Roteirização de frotas' },
      { t: 'Apresentação de Projeto de Redução de Frete', ht: 'Estruturar relatórios de otimização de frotas para aprovação de diretoria.', hs: 'Comunicação oral assertiva e segurança corporativa na defesa de propostas.', obj: 'Apresentar e argumentar o retorno financeiro do projeto de roteirização.', oc: '4. Defesa de projeto logístico' }
    ]
  },
  {
    s: 20, uc: 'Cadeia de Suprimentos (Supply Chain)', codU: 'GO7', tema: 'Logística Reversa e Sustentabilidade',
    ct: 'Desenhar fluxos de logística reversa mitigando passivos ecológicos industriais.',
    cs: 'Consciência socioambiental e compromisso com o futuro.',
    aulas: [
      { t: 'O que é Logística Reversa e Legislação (PNRS)', ht: 'Identificar as obrigações da Política Nacional de Resíduos Sólidos.', hs: 'Zelar pelas regras e deveres cívicos de conservação do planeta.', obj: 'Compreender a importância legal da logística reversa de pós-venda.', oc: '1. Legislação PNRS' },
      { t: 'Canais de Distribuição Reversos: Pós-Venda vs. Pós-Consumo', ht: 'Diferenciar retorno de produtos não usados de retorno de lixo eletrônico.', hs: 'Estruturar processos circulares de forma crítica.', obj: 'Mapear canais reversos de descarte ecológico ou reaproveitamento.', oc: '2. Canais pós-venda e consumo' },
      { t: 'Economia Circular e Manufatura Reversa', ht: 'Desenhar modelos de negócios que eliminam desperdícios por reciclagem.', hs: 'Visualizar novas soluções industriais verdes e inovadoras.', obj: 'Propor inovações sustentáveis nos ciclos de fabricação corporativa.', oc: '3. Economia circular' },
      { t: 'Prática de Projeto de Descarte Ecológico de Baterias', ht: 'Esboçar o fluxo reverso de coleta de pilhas e baterias de celulares.', hs: 'Cooperar ativamente na preservação do ambiente escolar e social.', obj: 'Desenhar canais práticos e viáveis de coleta e destinação verde.', oc: '4. Projeto de logística verde' }
    ]
  },
  {
    s: 21, uc: 'Manutenção e Confiabilidade', codU: 'GO8', tema: 'Estratégias de Manutenção Industrial',
    ct: 'Planejar e estruturar planos de manutenção preventiva e corretiva.',
    cs: 'Prevenção de riscos e zelo patrimonial.',
    aulas: [
      { t: 'Manutenção Corretiva (Reativa)', ht: 'Reconhecer perdas financeiras e gargalos causados por quebras inesperadas.', hs: 'Agir com resiliência e foco sob pressões operacionais de quebras.', obj: 'Identificar as desvantagens da dependência de ações corretivas.', oc: '1. Quebras emergenciais' },
      { t: 'Manutenção Preventiva (Planejada)', ht: 'Estruturar calendários e planos de paradas planejadas por horas de uso.', hs: 'Planejar com antecedência rotinas de prevenção contra falhas.', obj: 'Montar roteiros preventivos de lubrificação e check-lists de máquinas.', oc: '2. Preventiva sistemática' },
      { t: 'Manutenção Preditiva (Condição)', ht: 'Mapear métodos de análise de vibração, termografia e análise de óleos.', hs: 'Demonstrar afinidade técnica com análises preventivas sofisticadas.', obj: 'Compreender o uso de tecnologia na leitura de sinais preditivos.', oc: '3. Preditiva por condição' },
      { t: 'Manutenção Produtiva Total (TPM)', ht: 'Mapear os 8 pilares da TPM, focando em manutenção autônoma do operador.', hs: 'Engajar operadores no cuidado compartilhado de seus postos.', obj: 'Aplicar premissas de manutenção autônoma nas células fabris.', oc: '4. Filosofia TPM' }
    ]
  },
  {
    s: 22, uc: 'Manutenção e Confiabilidade', codU: 'GO8', tema: 'Cálculos de Confiabilidade e OEE',
    ct: 'Calcular indicadores de confiabilidade física e a eficiência global de equipamentos (OEE).',
    cs: 'Rigor estatístico descritivo e foco na melhoria.',
    aulas: [
      { t: 'Confiabilidade de Sistemas (Série e Paralelo)', ht: 'Calcular a probabilidade de falha combinada de componentes industriais.', hs: 'Aplicar matemática descritiva com seriedade na segurança física.', obj: 'Calcular o índice de confiabilidade de arranjos em série e redundantes.', oc: '1. Confiabilidade sistêmica' },
      { t: 'Tempo Médio Entre Falhas (MTBF) e Tempo de Reparo (MTTR)', ht: 'Calcular os índices MTBF e MTTR a partir de planilhas de paradas.', hs: 'Identificar a velocidade e eficácia de reparos técnicos operacionais.', obj: 'Interpretar e propor melhorias para o MTBF e o MTTR corporativo.', oc: '2. MTBF e MTTR' },
      { t: 'Cálculo de Eficiência Global de Equipamentos (OEE)', ht: 'Calcular OEE integrando disponibilidade, desempenho e qualidade.', hs: 'Desenvolver raciocínio sistêmico integrado sem focar apenas em volumes.', obj: 'Calcular e analisar o indicador OEE de células de fabricação.', oc: '3. Fórmula do OEE' },
      { t: 'Prática de Análise de Perdas utilizando OEE', ht: 'Apontar a causa raiz de um baixo OEE (se por quebras ou lentidão).', hs: 'Expressar diagnósticos de forma lógica baseada em números.', obj: 'Diagnosticar problemas de rentabilidade de máquinas reais.', oc: '4. Gestão de gargalos pelo OEE' }
    ]
  },
  {
    s: 23, uc: 'Tecnologia nas Operações (Indústria 4.0)', codU: 'GO9', tema: 'Automação e Digitalização Industrial',
    ct: 'Mapear tecnologias de digitalização aplicadas ao controle de processos fabris.',
    cs: 'Inovação e curiosidade tecnológica constante.',
    aulas: [
      { t: 'Fundamentos da Indústria 4.0 e Pilares', ht: 'Identificar a fusão do mundo físico e digital nos processos produtivos.', hs: 'Abertura para novas inovações e digitalização de rotinas.', obj: 'Compreender os 9 pilares conceituais da quarta revolução industrial.', oc: '1. Pilares da Indústria 4.0' },
      { t: 'Internet das Coisas (IoT) aplicada à produção', ht: 'Mapear sensores inteligentes transmitindo telemetria física em tempo real.', hs: 'Aplicar a curiosidade na conexão de sensores a processos lógicos.', obj: 'Identificar oportunidades de coleta de dados sem intervenção humana.', oc: '2. IoT industrial' },
      { t: 'Manufatura Aditiva (Impressão 3D)', ht: 'Compreender prototipagem rápida e fabricação sob demanda por aditivos.', hs: 'Imaginar alternativas de criação fora dos padrões de usinagem.', obj: 'Diferenciar os benefícios da impressão 3D na redução de tempos.', oc: '3. Impressão 3D' },
      { t: 'Gêmeos Digitais (Digital Twins) em Processos', ht: 'Interpretar modelos de simulação tridimensional que espelham a fábrica.', hs: 'Usar modelagem visual avançada de forma analítica.', obj: 'Compreender o uso de gêmeos digitais para simular melhorias físicas.', oc: '4. Gêmeos digitais' }
    ]
  },
  {
    s: 24, uc: 'Fundamentos de Operações', codU: 'GO1', tema: 'Otimização e Pesquisa Operacional',
    ct: 'Resolver problemas simples de otimização de recursos através de programação linear.',
    cs: 'Maximização de eficiência e precisão científica.',
    aulas: [
      { t: 'Introdução à Programação Linear', ht: 'Formular funções objetivo e restrições de capacidade em sistemas produtivos.', hs: 'Traduzir regras de negócios do mundo real em funções lógicas.', obj: 'Modelar problemas reais de maximização de lucros e menor custo.', oc: '1. Modelagem matemática' },
      { t: 'Resolução Gráfica de PL (2 Variáveis)', ht: 'Desenhar retas de restrição e identificar a área viável de solução.', hs: 'Trabalhar com geometria e coordenadas cartesianas exatas.', obj: 'Calcular a combinação de mix ótima que maximiza o retorno fabril.', oc: '2. Método gráfico' },
      { t: 'Otimização utilizando Solvers (Planilhas)', ht: 'Configurar o suplemento Solver de planilhas eletrônicas com restrições.', hs: 'Usar ferramentas tecnológicas de forma instrumental inteligente.', obj: 'Resolver problemas complexos de programação linear pelo computador.', oc: '3. Resolução automatizada' },
      { t: 'Análise de Sensibilidade de Soluções', ht: 'Interpretar relatórios de preço-sombra (Shadow Price) de insumos escassos.', hs: 'Tomar posições estratégicas de compras baseadas na restrição.', obj: 'Avaliar a alteração da solução ótima perante variações de limites.', oc: '4. Margens e limites' }
    ]
  },
  {
    s: 25, uc: 'Planejamento e Controle da Produção', codU: 'GO2', tema: 'Projeto: Estudo de Caso de PCP Integrado', tp: 'P',
    ct: 'Integrar as fases de previsão de demanda, PCP e programação de operações.',
    cs: 'Organização em equipes multidisciplinares e coesão.',
    aulas: [
      { t: 'Estruturação do Plano Agregado de Produção', ht: 'Planejar taxas de contratação e demissão de pessoal para oscilações.', hs: 'Gerenciar relações de recursos humanos de forma respeitosa.', obj: 'Elaborar o plano agregado para atender a demanda flutuante.', oc: '1. Planejamento agregado' },
      { t: 'Desdobramento do MPS e MRP do projeto', ht: 'Consolidar as compras necessárias de insumos a partir de explosões BOM.', hs: 'Rigor lógico operacional nos desdobramentos de insumos de fábrica.', obj: 'Consolidar as planilhas parciais de materiais do estudo de caso.', oc: '2. Desdobramento integrado' },
      { t: 'Montagem do Cronograma Gantt de Fabricação', ht: 'Roteirizar tarefas reais nas máquinas simuladas do caso resolvido.', hs: 'Desenvolver a visão de agilidade operacional de gargalos de tempo.', obj: 'Montar a programação operacional integrada com Gantt no computador.', oc: '3. Programação final' },
      { t: 'Consolidação das peças do PCP em Relatório', ht: 'Redigir a justificativa das estratégias de estoque de segurança adotadas.', hs: 'Comunicação escrita, clareza técnica e síntese corporativa.', obj: 'Documentar de forma detalhada o fluxo de PCP proposto do projeto.', oc: '4. Documentação mestre' }
    ]
  },
  {
    s: 26, uc: 'Planejamento e Controle da Produção', codU: 'GO2', tema: 'Projeto: Defesa do Plano de Operações', tp: 'P',
    ct: 'Defender as escolhas de planejamento e otimização operacionais realizadas.',
    cs: 'Oratória, convencimento técnico e segurança assertiva.',
    aulas: [
      { t: 'Apresentação formal da estratégia de operações', ht: 'Comunicar indicadores de OEE, tempos de fila e níveis de estoque orçados.', hs: 'Segurança oral, boa dicção e controle emocional perante bancas.', obj: 'Apresentar e defender o plano operacional mestre desenvolvido.', oc: '1. Apresentação do projeto de PCP' },
      { t: 'Defesa de decisões operacionais complexas', ht: 'Argumentar as taxas de utilização adotadas e mitigação de gargalos.', hs: 'Capacidade de argumentação lógica baseada puramente em dados.', obj: 'Justificar os níveis de segurança e investimentos em manutenção.', oc: '2. Argumentação sob arguição' },
      { t: 'Simulação de auditoria fabril', ht: 'Responder a perguntas de conformidade ergonômica e destinação reversa.', hs: 'Tratar avaliadores com profundo respeito, ética e postura comercial.', obj: 'Demonstrar conformidade total do projeto com normas regulamentadoras.', oc: '3. Auditoria simulada' },
      { t: 'Incorporação de correções e finalização', ht: 'Corrigir falhas lógicas ou de dados indicadas no feedback de bancas.', hs: 'Orientação ao aperfeiçoamento constante e foco na excelência.', obj: 'Saldar o projeto com a entrega final corrigida e documentada.', oc: '4. Consolidação final' }
    ]
  },
  {
    s: 27, uc: 'Gestão Industrial Avançada', codU: 'GO10', tema: 'Gestão de Projetos e Linha de Balanço',
    ct: 'Mapear e planejar projetos utilizando métodos de caminho crítico (CPM/PERT).',
    cs: 'Planejamento preventivo e coordenação de equipes.',
    aulas: [
      { t: 'Redes de Atividades e Precedências', ht: 'Desenhar redes orientadas por flechas ou nós identificando relações de dependência.', hs: 'Mapear interdependências estruturais com lógica matemática.', obj: 'Esboçar o mapa sequencial de tarefas necessárias de um projeto.', oc: '1. Diagrama de precedências' },
      { t: 'Identificação do Caminho Crítico (CPM)', ht: 'Calcular folgas e determinar as atividades de atraso zero (Críticas).', hs: 'Concentrar supervisão rigorosa onde há menor tolerância de erros.', obj: 'Calcular tempos de início mais cedo e fim mais tarde de tarefas.', oc: '2. Método CPM' },
      { t: 'Cálculos de Probabilidades de Prazo (PERT)', ht: 'Calcular desvios padrão baseados em estimativas otimista, provável e pessimista.', hs: 'Trabalhar com estatísticas e distribuições normais sob riscos.', obj: 'Calcular a probabilidade estatística de atrasar prazos de projetos.', oc: '3. Método PERT' },
      { t: 'Prática de Planejamento de Projeto de Expansão', ht: 'Desenhar o cronograma PERT/CPM para montagem de uma nova linha fabril.', hs: 'Integrar metas temporais com foco na entrega sem estouros de prazos.', obj: 'Otimizar o tempo total de implantação de um novo processo físico.', oc: '4. Projeto de expansão' }
    ]
  },
  {
    s: 28, uc: 'Gestão Industrial Avançada', codU: 'GO10', tema: 'Gestão de Projetos Industriais', tp: 'P',
    ct: 'Gerenciar recursos de projetos evitando estouros orçamentários por meio de Valor Agregado.',
    cs: 'Controle de custos e exatidão contábil.',
    aulas: [
      { t: 'Conceito de Gerenciamento de Valor Agregado (EVM)', ht: 'Calcular Valor Planejado (PV), Custo Real (AC) e Valor Agregado (EV).', hs: 'Zelar pela exatidão nos controles de faturamentos de projetos.', obj: 'Compreender a metodologia de medição EVM de projetos industriais.', oc: '1. Indicadores EVM' },
      { t: 'Variação de Custo (CV) e Variação de Prazo (SV)', ht: 'Calcular os índices CV e SV indicando estouros financeiros ou atrasos.', hs: 'Identificar desvios orçamentários com rapidez analítica.', obj: 'Calcular desvios monetários no andamento de projetos físicos de obras.', oc: '2. Desvios CV e SV' },
      { t: 'Índices de Desempenho de Custos (CPI) e Prazos (SPI)', ht: 'Calcular CPI e SPI interpretando a eficiência de uso de recursos.', hs: 'Demonstrar prudência nas estimativas de custos futuros de projetos.', obj: 'Calcular e analisar índices de eficiência de custos e prazos.', oc: '3. Eficiência CPI e SPI' },
      { t: 'Estimativa de Custo no Término (EAC)', ht: 'Calcular a estimativa EAC prevendo o custo real final com base no CPI.', hs: 'Trabalhar de forma preventiva evitando crises financeiras em projetos.', obj: 'Prever o orçamento total final do projeto a partir de tendências.', oc: '4. Estimativas de término' }
    ]
  }
];

export const GESTAO_OPERACOES_DATA = expandCompactWeeks(
  'Gestão de Operações',
  'C3',
  4,
  GESTAO_OPERACOES_WEEKS
);
