import { TecnicoLessonItem } from './tecnicoData';
import { CompactWeek, expandCompactWeeks } from './tecnicoNovasData';

const COMUNICACAO_WEEKS: CompactWeek[] = [
  {
    s: 1, uc: 'Fundamentos da Comunicação', codU: 'CE1', tema: 'Comunicação Humana e Organizacional',
    ct: 'Identificar os elementos fundamentais do processo de comunicação organizacional.',
    cs: 'Escuta ativa e empatia.',
    aulas: [
      { t: 'O Processo de Comunicação e seus Elementos', ht: 'Identificar emissor, receptor, canal, mensagem, código e feedback.', hs: 'Desenvolver a escuta atenta e livre de prejulgar.', obj: 'Compreender o circuito básico da transmissão de informações.', oc: '1. Teoria geral da comunicação' },
      { t: 'Comunicação Verbal vs. Não-Verbal', ht: 'Reconhecer o impacto de gestos, tom de voz e expressões nas mensagens.', hs: 'Alinhar a postura física com o discurso falado.', obj: 'Analisar como a linguagem não-verbal complementa a fala.', oc: '2. Expressões verbais e corporais' },
      { t: 'Canais de Comunicação na Organização', ht: 'Classificar fluxos formais (ascendente, descendente, lateral) e informais.', hs: 'Colaborar de forma transparente com equipes de apoio.', obj: 'Mapear a rede de circulação de notícias de uma organização simulada.', oc: '3. Redes organizacionais' }
    ]
  },
  {
    s: 2, uc: 'Fundamentos da Comunicação', codU: 'CE1', tema: 'Barreiras e Ruídos na Comunicação',
    ct: 'Diagnosticar barreiras físicas, semânticas e psicológicas na comunicação.',
    cs: 'Autogestão de emoções e tolerância.',
    aulas: [
      { t: 'Tipos de Barreiras na Comunicação', ht: 'Identificar ruídos semânticos e distorções físicas em canais de mídia.', hs: 'Manter a paciência perante desentendimentos operacionais.', obj: 'Classificar e propor soluções para eliminar ruídos de canais.', oc: '1. Ruídos e interferências' },
      { t: 'A Importância do Feedback Eficiente', ht: 'Aplicar técnicas de feedback construtivo (método sanduíche).', hs: 'Receber e dar críticas construtivas de forma serena.', obj: 'Desenvolver diálogos focados no aperfeiçoamento mútuo.', oc: '2. Feedback construtivo' },
      { t: 'A Comunicação Assertiva no Trabalho', ht: 'Diferenciar respostas passivas, agressivas e assertivas em conflitos.', hs: 'Expressar desejos e limites com firmeza, clareza e respeito.', obj: 'Dominar as diretrizes de postura para diálogos assertivos.', oc: '3. Assertividade nas relações' }
    ]
  },
  {
    s: 3, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Clareza, Coesão e Coerência Textual',
    ct: 'Escrever textos corporativos claros, coesos, coerentes e gramaticalmente adequados.',
    cs: 'Rigor ortográfico e precisão escrita.',
    aulas: [
      { t: 'Princípios da Redação Corporativa', ht: 'Reconhecer a necessidade de clareza, concisão, precisão e impessoalidade.', hs: 'Zelar pelo profissionalismo linguístico em todas as comunicações.', obj: 'Compreender as regras básicas de redação de e-mails corporativos.', oc: '1. Regras de redação de negócios' },
      { t: 'Coesão e Coerência em Parágrafos', ht: 'Utilizar conectivos gramaticais de forma lógica e sequencial.', hs: 'Organizar ideias de forma racional em textos longos.', obj: 'Montar parágrafos que conduzem o leitor de forma natural ao foco.', oc: '2. Mecanismos de coesão' },
      { t: 'Correção Gramatical e Concordância', ht: 'Corrigir desvios recorrentes de concordância verbal e nominal.', hs: 'Demonstrar capricho e dedicação à revisão e polimento de textos.', obj: 'Identificar e sanar erros de escrita de documentos antes do envio.', oc: '3. Gramática normativa corporativa' }
    ]
  },
  {
    s: 4, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'E-mails e Correspondências Profissionais', tp: 'P',
    ct: 'Elaborar e-mails formais e profissionais seguindo as regras de netiqueta.',
    cs: 'Postura profissional, etiqueta e polidez.',
    aulas: [
      { t: 'Estruturação de um E-mail Profissional', ht: 'Definir assuntos claros, saudações formais, desenvolvimento e fecho.', hs: 'Tratar destinatários com polidez, respeito e adequação de cargo.', obj: 'Escrever e-mails focados que facilitam a leitura e respostas rápidas.', oc: '1. Anatomia do e-mail comercial' },
      { t: 'Regras de Netiqueta Corporativa', ht: 'Evitar o uso de caixa alta, abreviações informais ou temas pessoais.', hs: 'Respeitar limites de tempo e privacidade alheia no ambiente virtual.', obj: 'Compreender as normas de conduta profissional em redes digitais.', oc: '2. Netiqueta de mensagens' },
      { t: 'Simulação de Troca de Mensagens de Crise', ht: 'Redigir e-mails respondendo de forma calma a reclamações de clientes.', hs: 'Conter impulsos emocionais em respostas a críticas duras.', obj: 'Conduzir comunicações difíceis por escrito mantendo o profissionalismo.', oc: '3. E-mails de mediação de conflitos' }
    ]
  },
  {
    s: 5, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Documentos Oficiais e Administrativos',
    ct: 'Elaborar memorandos, ofícios e circulares conforme a Redação Oficial.',
    cs: 'Cumprimento de normas, rigor administrativo e disciplina.',
    aulas: [
      { t: 'O Memorando e sua Utilidade Interna', ht: 'Redigir memorandos direcionados para avisos internos entre setores.', hs: 'Zelar pelo fluxo de informações exato de forma disciplinada.', obj: 'Compreender a finalidade e a estrutura padrão de memorandos.', oc: '1. Memorandos administrativos' },
      { t: 'O Ofício e a Comunicação Externa', ht: 'Elaborar ofícios para órgãos públicos e fornecedores externos.', hs: 'Respeitar hierarquias e protocolos formais de correspondências.', obj: 'Aplicar as diretrizes formais da redação oficial brasileira.', oc: '2. Estrutura do Ofício' },
      { t: 'A Circular e Comunicados Coletivos', ht: 'Elaborar circulares internas direcionadas para equipes multidisciplinares.', hs: 'Expressar metas e diretrizes gerais de maneira unificada e respeitosa.', obj: 'Escrever circulares claras de fácil interpretação geral.', oc: '3. Circulares internas' }
    ]
  },
  {
    s: 6, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Atas de Reunião e Relatórios Técnicos',
    ct: 'Redigir atas de reunião completas de forma documental fidedigna.',
    cs: 'Atenção minuciosa a discussões e síntese objetiva.',
    aulas: [
      { t: 'O Papel Documental da Ata de Reunião', ht: 'Identificar a relevância de registros formais de decisões de equipe.', hs: 'Trabalhar com rigor e honestidade na descrição de discussões.', obj: 'Compreender a estrutura de atas de reuniões (data, presentes, pautas).', oc: '1. Finalidade de atas' },
      { t: 'Redação Prática de Ata em Tempo Real', ht: 'Sintetizar em tempo real as decisões e responsabilidades acordadas.', hs: 'Demonstrar foco, agilidade mental e atenção sob pressões temporais.', obj: 'Elaborar atas de reuniões de forma rápida e concisa durante discussões.', oc: '2. Prática de relatoria' },
      { t: 'Estruturação Básica de Relatórios Técnicos', ht: 'Mapear introdução, desenvolvimento, conclusões e assinaturas.', hs: 'Organizar dados de forma racional e visualmente limpa.', obj: 'Estruturar relatórios executivos para subsidiar decisões de gerentes.', oc: '3. Relatórios executivos' }
    ]
  },
  {
    s: 7, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Projeto: Elaboração de Manual de Comunicação', tp: 'P',
    ct: 'Integrar as regras e estruturas aprendidas em um guia corporativo prático.',
    cs: 'Trabalho colaborativo harmonioso e visão sistêmica.',
    aulas: [
      { t: 'Definição de Diretrizes de Estilo da Marca', ht: 'Debater e estipular o tom de voz corporativo (formal, informal, neutro).', hs: 'Incentivar e respeitar as opiniões criativas de colegas de equipe.', obj: 'Estipular o padrão de tom de voz para a comunicação da marca simulada.', oc: '1. Tom de voz institucional' },
      { t: 'Estruturação dos Modelos de Documentos', ht: 'Montar modelos visuais (templates) de e-mails, memorandos e atas.', hs: 'Prezar pela organização visual e polimento profissional de materiais.', obj: 'Desenhar modelos práticos que agilizam o cotidiano corporativo.', oc: '2. Modelagem de documentos' },
      { t: 'Consolidação e Revisão Gramatical do Manual', ht: 'Agrupar as partes desenvolvidas em um único manual integrado da marca.', hs: 'Zelar pelo rigor máximo, eliminando desvios ortográficos no trabalho.', obj: 'Finalizar o primeiro volume do manual de comunicação da marca.', oc: '3. Relatório do projeto' }
    ]
  },
  {
    s: 8, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Oratória e Apresentações Executivas',
    ct: 'Realizar apresentações públicas com desenvoltura, modulação de voz e postura.',
    cs: 'Autoconfiança e superação de ansiedade cênica.',
    aulas: [
      { t: 'Fundamentos de Oratória para Líderes', ht: 'Controlar o ritmo da fala e realizar respirações diafragmáticas.', hs: 'Superar o medo de falar em público por meio de autogestão emocional.', obj: 'Compreender os aspectos fundamentais para discursos seguros e claros.', oc: '1. Oratória para negócios' },
      { t: 'Modulação de Voz e Entonação de Destaque', ht: 'Variar a velocidade e a intensidade de tom de voz para enfatizar pautas.', hs: 'Demonstrar paixão e segurança cênica através da expressividade verbal.', obj: 'Utilizar a modulação vocal para prender a atenção da audiência.', oc: '2. Expressão vocal' },
      { t: 'Linguagem Corporal e Gesticulação de Apoio', ht: 'Mapear gestos abertos que auxiliam e complementam o discurso.', hs: 'Evitar posturas defensivas ou ticks corporais que distraem ouvintes.', obj: 'Posturar-se fisicamente de forma firme, confiante e aberta ao público.', oc: '3. Linguagem não-verbal cênica' }
    ]
  },
  {
    s: 9, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Negociação e Gestão de Conflitos', tp: 'P',
    ct: 'Conduzir negociações corporativas visando soluções integrativas (ganha-ganha).',
    cs: 'Diplomacia, inteligência emocional e resolução compartilhada.',
    aulas: [
      { t: 'O que é Conflito e como surge nas Equipes', ht: 'Mapear as origens organizacionais e pessoais de conflitos em grupos.', hs: 'Despolarizar discussões compreendendo a subjetividade alheia.', obj: 'Identificar a diferença entre conflito funcional e disfuncional.', oc: '1. Teoria de conflitos' },
      { t: 'Estilos de Gestão de Conflitos (Thomas-Kilmann)', ht: 'Classificar atitudes em competitivas, complacentes, conciliadoras ou colaborativas.', hs: 'Demonstrar diplomacia e autocontrole em situações de forte tensão.', obj: 'Aplicar o melhor método de resolução de acordo com a urgência.', oc: '2. Modelo de Thomas-Kilmann' },
      { t: 'A Negociação Baseada em Princípios (Método Harvard)', ht: 'Diferenciar posições rígidas de interesses de valor reais na mesa.', hs: 'Buscar parcerias integrativas focadas em soluções duradouras.', obj: 'Aplicar as quatro diretrizes do método Harvard de negociação.', oc: '3. Negociação integrativa' }
    ]
  },
  {
    s: 10, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Comunicação Interpessoal e Empatia',
    ct: 'Aplicar técnicas de Comunicação Não-Violenta (CNV) na mediação de desentendimentos.',
    cs: 'Empatia interpessoal e sensibilidade social.',
    aulas: [
      { t: 'Fundamentos da Comunicação Não-Violenta (CNV)', ht: 'Diferenciar julgamentos morais de observações puras de fatos.', hs: 'Expressar sentimentos sem acusar ou vitimizar-se perante colegas.', obj: 'Mapear as 4 etapas da CNV (Observação, Sentimento, Necessidade, Pedido).', oc: '1. Filosofia CNV de Marshall' },
      { t: 'A Formulação de Pedidos Clássicos pela CNV', ht: 'Elaborar pedidos de ação concretos, positivos e viáveis ao receptor.', hs: 'Demonstrar clareza, sinceridade e ausência de exigências impositivas.', obj: 'Escrever mensagens e pedidos de trabalho que geram colaboração imediata.', oc: '2. Formulação de pedidos' },
      { t: 'Prática de Escuta Ativa e Reconhecimento', ht: 'Parafrasear o interlocutor para validar sentimentos e necessidades.', hs: 'Oferecer presença atenta, respeitando o tempo de fala alheio.', obj: 'Conduzir simulações de feedback empático na mediação de conflitos.', oc: '3. Escuta empática' }
    ]
  },
  {
    s: 11, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Reuniões Produtivas e Storytelling',
    ct: 'Planejar, estruturar e mediar reuniões corporativas focadas e de menor tempo.',
    cs: 'Organização, liderança democrática e objetividade.',
    aulas: [
      { t: 'O Custo das Reuniões Improdutivas', ht: 'Calcular o custo financeiro do tempo gasto por profissionais em salas de reunião.', hs: 'Valorizar e respeitar a produtividade e o tempo dos colegas.', obj: 'Compreender a necessidade de pautas enxutas nas reuniões.', oc: '1. Produtividade de reuniões' },
      { t: 'Estruturação de Pautas e Moderação (Princípios Kanban)', ht: 'Moderar discussões controlando limites de tempo e objetivos firmes.', hs: 'Mediar debates de forma assertiva e sem impor visões de forma brusca.', obj: 'Escrever a agenda estruturada e moderações focadas de reuniões.', oc: '2. Pautas e moderação' },
      { t: 'Storytelling Aplicado a Reuniões Corporativas', ht: 'Roteirizar propostas de trabalho em reuniões utilizando jornadas narrativas.', hs: 'Despertar o interesse e engajamento genuíno de equipes.', obj: 'Aplicar estruturas de narrativa curta para justificar novos projetos.', oc: '3. Storytelling comercial' }
    ]
  },
  {
    s: 12, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Projeto: Simulação de Mesa de Negociação', tp: 'P',
    ct: 'Sustentar interesses e mediar conflitos na simulação de negociações difíceis.',
    cs: 'Diplomacia, oratória persuasiva e autocontrole emocional.',
    aulas: [
      { t: 'Definição do Cenário e Papéis (Sellers vs. Buyers)', ht: 'Estudar os interesses, limites (BATNA) e o orçamento das partes.', hs: 'Demonstrar compromisso e realismo técnico nas metas simuladas.', obj: 'Preparar a estratégia argumentativa com base em dados de mercado.', oc: '1. Cenários de negociação' },
      { t: 'A Rodada Crítica de Negociação (Mesa Simulada)', ht: 'Conduzir a mesa de negociação aplicando CNV e método Harvard.', hs: 'Manter a elegância, postura ética e respeito mútuo em discussões.', obj: 'Firmar acordos bilaterais justos, documentando os termos finais.', oc: '2. Prática de debate' },
      { t: 'Análise de Desempenho e Lições de Negociação', ht: 'Identificar os pontos de acerto e falhas lógicas da rodada de debate.', hs: 'Demonstrar maturidade na escuta de feedbacks do professor.', obj: 'Finalizar o projeto integrando lições de mediação e assertividade.', oc: '3. Relatório pós-negociação' }
    ]
  },
  {
    s: 13, uc: 'Comunicação Organizacional Interna', codU: 'CE4', tema: 'Canais de Endomarketing e Clima',
    ct: 'Desenhar canais digitais estruturados para integração e alinhamento de equipes.',
    cs: 'Senso de comunidade e cooperação mútua.',
    aulas: [
      { t: 'O que é Endomarketing e valor estratégico', ht: 'Diferenciar marketing de vendas externo de marketing para equipes interno.', hs: 'Zelar pelo clima organizacional motivador e integrado.', obj: 'Compreender como a informação clara reduz a rotatividade do time.', oc: '1. Conceito de Endomarketing' },
      { t: 'Estratégias de Comunicação de Clima Organizacional', ht: 'Identificar ferramentas de engajamento interno (mural, intranet).', hs: 'Demonstrar solidariedade e inclusão perante as minorias da firma.', obj: 'Diferenciar os canais de alinhamento com base na acessibilidade.', oc: '2. Clima e engajamento' },
      { t: 'Elaboração de Newsletters de Integração', ht: 'Montar layouts e redações de e-mails periódicos de engajamento.', hs: 'Apreciar o capricho no design visual e linguístico corporativo.', obj: 'Escrever newsletters internas curtas, interessantes e integradoras.', oc: '3. Criação de newsletters' }
    ]
  },
  {
    s: 14, uc: 'Comunicação Organizacional Interna', codU: 'CE4', tema: 'Comunicação em Tempos de Crise',
    ct: 'Estruturar planos de contingência de informação perante incidentes de imagem.',
    cs: 'Resiliência sob forte pressão e liderança madura.',
    aulas: [
      { t: 'O que é uma Crise de Imagem e Gatilhos', ht: 'Mapear desvios operacionais ou acidentes de marcas que arranham a reputação.', hs: 'Analisar riscos institucionais de forma pragmática e calma.', obj: 'Compreender a necessidade da transparência imediata nas crises.', oc: '1. Crise institucional' },
      { t: 'Planos de contingência de comunicação', ht: 'Montar comitês de crise e definir porta-vozes organizados da firma.', hs: 'Manter a estabilidade emocional e liderança resoluta de desvios.', obj: 'Definir o fluxo de informações para impedir boatos e alarmismos.', oc: '2. Fluxos de contingência' },
      { t: 'Redação de Notas Oficiais à Imprensa', ht: 'Escrever notas de esclarecimento formais contendo pedidos sinceros de desculpas.', hs: 'Demonstrar profundo senso de ética, responsabilidade e honestidade.', obj: 'Elaborar comunicados oficiais sinceros que acalmam a opinião pública.', oc: '3. Redação de notas' }
    ]
  },
  {
    s: 15, uc: 'Comunicação Externa e Relações Públicas', codU: 'CE5', tema: 'Assessoria de Imprensa e Imagem',
    ct: 'Redigir e encaminhar comunicados (Press Releases) para canais jornalísticos.',
    cs: 'Visão de mercado, relacionamento e ética de mídias.',
    aulas: [
      { t: 'O Papel de Relações Públicas (RP)', ht: 'Diferenciar a publicidade paga do relacionamento gratuito com a imprensa.', hs: 'Zelar pela ética de marcas mantendo postura íntegra e civil.', obj: 'Compreender o papel estratégico de RP na construção de reputação.', oc: '1. Relações Públicas' },
      { t: 'Redação de Press Releases', ht: 'Redigir comunicados jornalísticos objetivos contendo ganchos noticiosos.', hs: 'Sintetizar fatos com precisão e clareza informativa escrita.', obj: 'Dominar as estruturas de releases que elevam a conversão de notícias.', oc: '2. Press Releases' },
      { t: 'Gestão de Entrevistas Coletivas', ht: 'Simular roteiros de coletivas contendo mensagens chave pré-aprovadas.', hs: 'Comunicação assertiva verbal e controle cênico sob perguntas.', obj: 'Simular assessoria técnica na preparação de executivos da firma.', oc: '3. Media Training básico' }
    ]
  },
  {
    s: 16, uc: 'Redação Publicitária e Copywriting', codU: 'CE6', tema: 'Linguagem Persuasiva e Conversão',
    ct: 'Escrever redações persuasivas de alto impacto (Copywriting) para campanhas.',
    cs: 'Persuasão ética e integridade publicitária.',
    aulas: [
      { t: 'Fundamentos de Copywriting e Gatilhos Mentais', ht: 'Diferenciar redação literária comum de redação de vendas com gatilhos.', hs: 'Respeitar limites éticos, evitando falsas promessas de vendas.', obj: 'Identificar gatilhos de escassez, autoridade e prova social em campanhas.', oc: '1. Copywriting básico' },
      { t: 'Modelos de Redação Persuasiva (AIDA)', ht: 'Estruturar textos comerciais guiando a Atenção, Interesse, Desejo e Ação.', hs: 'Pensar de forma centrada nas vontades reais do consumidor.', obj: 'Dominar a estrutura AIDA escrevendo posts publicitários curtos.', oc: '2. Estrutura AIDA' },
      { t: 'Criação de Chamadas para Ação (CTAs)', ht: 'Redigir botões e links de conversão atraentes de e-commerce.', hs: 'Demonstrar clareza, concisão e foco em metas comerciais.', obj: 'Escrever chamadas curtas e persuasivas de alta conversão.', oc: '3. Técnicas de CTAs' }
    ]
  },
  {
    s: 17, uc: 'Redação Publicitária e Copywriting', codU: 'CE6', tema: 'Comunicação em Redes Sociais Corporativas', tp: 'P',
    ct: 'Projetar calendários editoriais e adequar a linguagem a redes sociais.',
    cs: 'Organização estruturada, criatividade e flexibilidade midiática.',
    aulas: [
      { t: 'Adequação Linguística das Redes Sociais', ht: 'Diferenciar o tom de voz do LinkedIn (Corporativo) do Instagram (Informal).', hs: 'Adaptar-se com facilidade a novos canais virtuais de mídias.', obj: 'Adaptar o mesmo anúncio de contratação da empresa para duas redes.', oc: '1. Tom de voz por rede' },
      { t: 'Planejamento de Calendário Editorial', ht: 'Montar planilhas organizando postagens semanais por categorias de temas.', hs: 'Organização metódica e consistência no cumprimento de cronogramas.', obj: 'Estruturar o planejamento de mídias da startup para 30 dias.', oc: '2. Calendários editoriais' },
      { t: 'Prática de Criação de Postagem de Vagas', ht: 'Redigir a postagem para LinkedIn atraindo talentos para a empresa.', hs: 'Zelar por termos inclusivos e respeitosos em anúncios de vagas.', obj: 'Escrever textos persuasivos de atração de candidatos no LinkedIn.', oc: '3. Redação de atração de marcas' }
    ]
  },
  {
    s: 18, uc: 'Comunicação Inclusiva e Acessibilidade', codU: 'CE7', tema: 'Inclusão Linguística e Netiqueta',
    ct: 'Aplicar premissas de linguagem acessível e descrições inclusivas na web.',
    cs: 'Empatia social ampla e respeito à diversidade humana.',
    aulas: [
      { t: 'Linguagem Clara (Plain Language) nos Negócios', ht: 'Reduzir jargões técnicos difíceis facilitando o entendimento geral.', hs: 'Prezar pela inclusão educacional de todos os clientes nas mídias.', obj: 'Reescrever contratos difíceis em linguagem clara de fácil leitura.', oc: '1. Plain Language' },
      { t: 'Acessibilidade em Mídias Digitais (Alt Text)', ht: 'Escrever descrições alternativas de imagens para leitores de tela.', hs: 'Demonstrar sensibilidade real perante as necessidades das PcD.', obj: 'Aplicar a descrição de imagens (alt text) de forma exata e útil.', oc: '2. Alt Text acessível' },
      { t: 'Comunicação Inclusiva de Equipes', ht: 'Garantir termos neutros de gênero e livres de vieses discriminatórios.', hs: 'Estimular a cultura do pertencimento e respeito mútuo em grupos.', obj: 'Identificar e propor correções para vieses linguísticos no RH.', oc: '3. Linguagem corporativa ética' }
    ]
  },
  {
    s: 19, uc: 'Etiqueta e Postura Profissional', codU: 'CE8', tema: 'Comunicação e Postura Corporativa',
    ct: 'Aplicar regras de netiqueta em canais de chat internos (Slack/Teams).',
    cs: 'Postura, decoro e polidez profissional.',
    aulas: [
      { t: 'Linguagem Profissional em Mensagens de Chat', ht: 'Diferenciar o uso de emojis, gírias e abreviações em canais rápidos.', hs: 'Respeitar o horário de folga e as regras corporativas de privacidade.', obj: 'Compreender a netiqueta de comunicações síncronas de trabalho.', oc: '1. Etiqueta de chat corporativo' },
      { t: 'Postura em Videoconferências Profissionais', ht: 'Mapear regras de microfone mutado, enquadramento de câmera e vestimenta.', hs: 'Zelar pelo decoro visual, pontualidade e foco em reuniões online.', obj: 'Aplicar as boas práticas de reuniões virtuais de trabalho.', oc: '2. Videoconferência profissional' },
      { t: 'Comportamento Corporativo em Ambientes Híbridos', ht: 'Zelar por e-mails curtos e canais organizados no modelo de trabalho.', hs: 'Equilibrar a proximidade virtual com a compostura de marcas.', obj: 'Mapear as normas de etiqueta de trabalho compartilhado em rede.', oc: '3. Relações de trabalho híbrido' }
    ]
  },
  {
    s: 20, uc: 'Processos de Seleção: Comunicação', codU: 'CE9', tema: 'Comunicação em Entrevistas de Emprego',
    ct: 'Comunicar competências técnicas e socioemocionais em processos seletivos.',
    cs: 'Autoconfiança, oratória assertiva e postura profissional.',
    aulas: [
      { t: 'A Comunicação Eficaz no Processo de Seleção', ht: 'Identificar a relevância de respostas assertivas em entrevistas.', hs: 'Zelar pela ética de marcas mantendo postura íntegra e civil.', obj: 'Compreender o papel estratégico de RP na construção de reputação.', oc: '1. Comunicação em entrevistas' },
      { t: 'Apresentação de Pitch de Qualificações', ht: 'Redigir e ensaiar um pitch curto detalhando competências essenciais.', hs: 'Sintetizar metas com precisão e clareza informativa escrita.', obj: 'Dominar as estruturas de releases que elevam a conversão de notícias.', oc: '2. Pitch de competências' },
      { t: 'Estruturação de Roteiros de Entrevista por Competência', ht: 'Formular roteiros de entrevista baseados na metodologia STAR.', hs: 'Comunicação assertiva e empatia interpessoal.', obj: 'Planejar e conduzir entrevistas técnicas focadas em competências.', oc: '3. Entrevistas STAR' }
    ]
  },
  {
    s: 21, uc: 'Redação Publicitária e Copywriting', codU: 'CE6', tema: 'Projeto: Campanha de Comunicação Externa', tp: 'P',
    ct: 'Integrar as técnicas de copywriting e redes sociais na campanha da marca.',
    cs: 'Trabalho colaborativo dinâmico e organização.',
    aulas: [
      { t: 'Definição do Produto e Público-Alvo', ht: 'Debater e delimitar o foco comercial da campanha integrada.', hs: 'Incentivar debates saudáveis baseados em fatos e ideias.', obj: 'Mapear o público-alvo da campanha corporativa da startup.', oc: '1. Alvo de comunicação' },
      { t: 'Criação das Peças Publicitárias e CTAs', ht: 'Escrever as postagens e e-mails comerciais utilizando a fórmula AIDA.', hs: 'Demonstrar zelo e polimento estético na redação comercial.', obj: 'Desenvolver as cópias persuasivas das peças da campanha de mídias.', oc: '2. Desenvolvimento de cópias' },
      { t: 'Montagem do Cronograma de Postagens do Projeto', ht: 'Programar o cronograma de faturamento e mídias de 30 dias do plano.', hs: 'Foco no cumprimento de prazos operacionais em equipes.', obj: 'Consolidar as postagens e mídias na planilha de calendário editorial.', oc: '3. Calendário editorial final' }
    ]
  },
  {
    s: 22, uc: 'Comunicação Inclusiva e Acessibilidade', codU: 'CE7', tema: 'Linguagem Clara e Inclusiva na Web',
    ct: 'Aplicar premissas de acessibilidade e redação inclusiva em textos de mídias.',
    cs: 'Sensibilidade social, empatia e compromisso.',
    aulas: [
      { t: 'Linguagem Inclusiva de Equipes em Mídias', ht: 'Garantir termos neutros de gênero e livres de preconceitos em posts.', hs: 'Estimular a cultura do pertencimento nas mídias organizacionais.', obj: 'Reescrever anúncios corporativos de acordo com o padrão inclusivo.', oc: '1. Inclusão linguística' },
      { t: 'Prática de Redação Acessível (Plain Language)', ht: 'Reduzir termos técnicos difíceis facilitando a leitura de relatórios.', hs: 'Zelar pelo fácil entendimento geral das comunicações públicas.', obj: 'Simplificar relatórios financeiros difíceis da marca simulada.', oc: '2. Simplificação de textos' },
      { t: 'Alt Text e Descrições de Imagens de Mídias', ht: 'Escrever alt text descritivos e informativos de imagens para redes.', hs: 'Demonstrar empatia real perante as necessidades das PcD.', obj: 'Aplicar a descrição alternativa em posts da marca nas mídias.', oc: '3. Descrições alternativas' }
    ]
  },
  {
    s: 23, uc: 'Etiqueta e Postura Profissional', codU: 'CE8', tema: 'Videoconferências e Trabalho Híbrido',
    ct: 'Aplicar regras de etiqueta e postura em reuniões e canais híbridos.',
    cs: 'Decoro, polidez, responsabilidade e foco.',
    aulas: [
      { t: 'Etiqueta e Postura em Videoconferências', ht: 'Mapear regras de microfone mudo, luz de câmera e roupas formais.', hs: 'Zelar pela compostura e pontualidade em reuniões online.', obj: 'Aplicar os padrões de conduta de reuniões virtuais corporativas.', oc: '1. Videoconferências profissionais' },
      { t: 'Netiqueta em Canais de Chat Síncronos', ht: 'Diferenciar o uso de emojis e gírias em canais de times (Slack).', hs: 'Respeitar horários de lazer e regras de privacidade interna.', obj: 'Escrever avisos de trabalho claros e polidos em canais corporativos.', oc: '2. Canais de comunicação síncronos' },
      { t: 'Postura Corporativa no Modelo Híbrido', ht: 'Zelar por avisos e e-mails curtos no modelo de trabalho compartilhado.', hs: 'Equilibrar a proximidade virtual com a compostura de marcas.', obj: 'Mapear as regras de relacionamento híbrido de equipes em rede.', oc: '3. Relações no modelo híbrido' }
    ]
  },
  {
    s: 24, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Ata de Reunião e Documentos Oficiais',
    ct: 'Elaborar e registrar relatórios documentais formais com rigor.',
    cs: 'Organização, exatidão sequencial e seriedade.',
    aulas: [
      { t: 'O Registro Fidedigno em Atas de Reunião', ht: 'Sintetizar em tempo real as decisões e deveres das pautas.', hs: 'Demonstrar foco e atenção cuidadosa em discussões coletivas.', obj: 'Escrever atas de reuniões corporativas de forma rápida e concisa.', oc: '1. Atas documentais' },
      { t: 'O Ofício e a Redação Oficial Externa', ht: 'Elaborar ofícios externos contendo termos polidos e adequados.', hs: 'Respeitar diretrizes de concordância e formalidades oficiais.', obj: 'Aplicar premissas da redação oficial brasileira em ofícios.', oc: '2. Ofícios oficiais' },
      { t: 'Memorandos e Comunicações Circulares Rápidas', ht: 'Redigir circulares claras direcionadas para múltiplos departamentos.', hs: 'Comunicação escrita, clareza e impessoalidade em comunicados.', obj: 'Estruturar comunicados circulares para alinhamento geral rápido.', oc: '3. Comunicados circulares' }
    ]
  },
  {
    s: 25, uc: 'Comunicação Escrita e Redação', codU: 'CE2', tema: 'Projeto: Relatório Mestre de Comunicação da Marca', tp: 'P',
    ct: 'Consolidar as peças de comunicação, manual e campanhas no relatório.',
    cs: 'Sinergia de dados, foco no detalhe e capricho visual.',
    aulas: [
      { t: 'Ajustes de Tom de Voz da Campanha', ht: 'Revisar os posts e e-mails de acordo com o tom de voz da marca.', hs: 'Cooperar ativamente no refinamento linguístico de materiais.', obj: 'Ajustar o tom de voz do material de mídias de forma alinhada.', oc: '1. Polimento de tom de voz' },
      { t: 'Unificação dos Templates do Manual da Marca', ht: 'Consolidar os modelos de e-mails e atas de reuniões da marca.', hs: 'Garantir coesão visual e estética profissional de templates.', obj: 'Estruturar os modelos padrão de e-mails e atas em formato único.', oc: '2. Templates do manual corporativo' },
      { t: 'Geração do Relatório de Comunicação Integrada', ht: 'Redigir a justificativa das escolhas estratégicas do manual mestre.', hs: 'Comunicação escrita assertiva, clareza e síntese de relatórios.', obj: 'Consolidar o plano de comunicação integrado da marca em relatório.', oc: '3. Relatórios integrados' }
    ]
  },
  {
    s: 26, uc: 'Comunicação Interpessoal', codU: 'CE3', tema: 'Projeto: Apresentação Final do Plano e Feedback', tp: 'P',
    ct: 'Apresentar com desenvoltura técnica e carisma o plano desenvolvido.',
    cs: 'Habilidade de negociação, oratória refinada e autodisciplina.',
    aulas: [
      { t: 'Apresentação Oral do Plano de Comunicação', ht: 'Comunicar as escolhas de tom de voz, modelos e campanhas oradas.', hs: 'Expressar-se oralmente de forma convincente e segura.', obj: 'Apresentar o manual de comunicação da marca para a banca.', oc: '1. Apresentação do manual de estilo' },
      { t: 'Defesa das Escolhas de Negociação e Mídias', ht: 'Justificar premissas de calendários de mídias e acordos fechados.', hs: 'Controle emocional perante questionamentos lógicos das bancas.', obj: 'Defender com dados de mercado as premissas de comunicação oradas.', oc: '2. Defesa sob questionamento' },
      { t: 'Análise de Feedback e Encerramento Anual', ht: 'Realizar os ajustes recomendados e celebrar o encerramento do plano.', hs: 'Humildade e orientação ao aperfeiçoamento constante e contínuo.', obj: 'Finalizar o manual de comunicação integrado com as revisões.', oc: '3. Consolidação e fechamento' }
    ]
  }
];

export const COMUNICACAO_DATA = expandCompactWeeks(
  'Comunicação Empresarial',
  'C5',
  3,
  COMUNICACAO_WEEKS,
  true // isComunicacaoEmpresarial = true (26-week custom bimestres)
);
