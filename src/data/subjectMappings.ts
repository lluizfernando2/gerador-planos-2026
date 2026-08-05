import { LOGO_SP_BASE64 } from './logoSp';

export const SUBJECT_MAPPINGS: Record<string, {
  unidadeTematica: string;
  objetosConhecimento: string;
  espacoFisico: string[];
  investigacao: { definicao: string; objetivo: string; aplicacao: string };
  desafios: { definicao: string; objetivo: string; aplicacao: string };
  maker: { definicao: string; objetivo: string; aplicacao: string };
  centrado: { definicao: string; objetivo: string; aplicacao: string };
  recursos: string[];
  desenvolvimento: string[];
  avaliacao: string[];
  acessibilidade: string[];
  referencias: string[];
}> = {
  'Física': {
    unidadeTematica: 'Matéria e Energia, Tecnologia e Linguagem Científica',
    objetosConhecimento: 'Cinemática, Dinâmica, Termodinâmica, Ondulatória, Óptica Geométrica, Eletromagnetismo e Física Moderna.',
    espacoFisico: [
      'Laboratório de Ciências ou Física com kits de experimentação.',
      'Sala de aula equipada com projetor e computadores com simuladores virtuais (como PhET).'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa através do método científico e análise de variáveis físicas.',
      objetivo: 'Estimular a formulação de hipóteses físicas e a modelagem matemática de fenômenos reais.',
      aplicacao: 'A aula inicia-se com a problematização de um fenômeno visível (como a queda de objetos de massas diferentes ou o aquecimento de um gás), levando os estudantes a deduzirem leis de conservação de forma autônoma antes da formalização.'
    },
    desafios: {
      definicao: 'Resolução de problemas desafiadores do cotidiano utilizando equações físicas.',
      objetivo: 'Desenvolver raciocínio analítico, interpretação de gráficos e equações.',
      aplicacao: 'Em equipes, os discentes realizam o desafio de calcular a eficiência teórica e real de uma máquina térmica (Ciclo de Carnot) ou projetar as dimensões necessárias para que um fusível não derreta sob uma dada corrente.'
    },
    maker: {
      definicao: 'Construção física de protótipos como motores Stirling, circuitos elétricos ou câmaras escuras.',
      objetivo: 'Promover a compreensão mecânica e o design ativo de dispositivos reais.',
      aplicacao: 'Os estudantes constroem uma câmara escura de orifício ou um pequeno motor térmico funcional usando latas de refrigerante e balões, verificando na prática os princípios termodinâmicos.'
    },
    centrado: {
      definicao: 'Estudo autônomo baseado em ritmo individual e experimentação orientada.',
      objetivo: 'Favorecer o protagonismo discente e a exploração de fenômenos físicos autorregulados.',
      aplicacao: 'Os alunos selecionam diferentes ângulos de lançamento em simuladores digitais para identificar como o alcance horizontal varia, registrando de forma crítica as observações em relatórios individuais.'
    },
    recursos: [
      'Kits de óptica (lentes, espelhos, prismas).',
      'Multímetros, fontes de tensão, resistores e fios condutores para circuitos.',
      'Termômetros, calorímetros e fontes térmicas.',
      'Simuladores interativos de física e gráficos em planilha.'
    ],
    desenvolvimento: [
      'Problematização inicial baseada em fenômeno do cotidiano (ex.: funcionamento de uma geladeira ou o limite de frenagem de um carro).',
      'Apresentação de conceitos teóricos fundamentais em pequenos passos articulados com demonstrações práticas.',
      'Prática guiada com análise de diagramas (corpo livre, diagramas P-V ou de fases).',
      'Resolução de problemas numéricos em equipes e verificação constante de compreensão.',
      'Sistematização coletiva das leis físicas estudadas e encerramento com conexões tecnológicas (como carros elétricos ou fibras ópticas).'
    ],
    avaliacao: [
      'Acurácia técnica na interpretação e montagem de diagramas e modelos físicos.',
      'Coerência lógica e precisão matemática na resolução de equações físicas.',
      'Capacidade de projetar e explicar o funcionamento de protótipos funcionais.',
      'Participação ativa em práticas laboratoriais ou simulações virtuais.'
    ],
    acessibilidade: [
      'Uso de simulações em softwares com suporte a leitores de tela e alto contraste.',
      'Atividades experimentais táteis (tatear formatos de lentes ou arranjos de circuitos).',
      'Disponibilização de materiais de apoio simplificados com fórmulas e glossários visuais.',
      'Flexibilização do tempo e acompanhamento individualizado em atividades laboratoriais complexas.'
    ],
    referencias: [
      'Escopo-sequência do Currículo Paulista.',
      'Guia do Currículo Priorizado de Física.',
      'Base Nacional Comum Curricular (BNCC).',
      'Rosenshine, Barak. Principles of Instruction.',
      'Lemov, Doug. Aula nota 10 3.0.'
    ]
  },
  'Matemática': {
    unidadeTematica: 'Geometria e Álgebra',
    objetosConhecimento: 'Relações espaciais, cálculo de áreas e expressões matemáticas.',
    espacoFisico: [
      'Sala de aula equipada com quadro, projetor e materiais impressos.',
      'Possibilidade de uso de recursos digitais e softwares geométricos.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Estimular a formulação de hipóteses e a construção coletiva de estratégias matemáticas.',
      aplicacao: 'A aula inicia-se com a problematização baseada na otimização de espaços do cotidiano (como o cálculo de áreas planas em projetos arquitetônicos ou o clássico problema do toldo da padaria), levando os estudantes a debaterem quais superfícies cobrem maior área. O professor conduz as deduções geométricas sem antecipar a resposta.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Desenvolver raciocínio lógico-matemático e justificar escolhas de cálculo.',
      aplicacao: 'Em duplas, os estudantes enfrentam o desafio prático de calcular áreas de triângulos e quadriláteros em diferentes malhas quadriculadas e posições não convencionais (inclusive no plano cartesiano), comparando estratégias geométricas e defendendo as fórmulas propostas.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da experimentação prática, criação de protótipos ou decomposição física de figuras.',
      objetivo: 'Favorecer a compreensão de relações de equivalência geométrica por meio de recursos manipuláveis.',
      aplicacao: 'Utilizando recortes de triângulos em papel colorido e malhas quadriculadas, os estudantes duplicam formas e realizam a recomposição física de figuras em retângulos, visualizando de forma tátil e autônoma a equivalência entre áreas geométricas.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Promover a autonomia e protagonismo no processo de resolução matemática.',
      aplicacao: 'Os discentes escolhem autonomamente diferentes lados da figura geométrica como base e identificam a respectiva altura correspondente para seus cálculos, registrando os procedimentos, testando hipóteses e justificando os caminhos.'
    },
    recursos: [
      'Malha quadriculada impressa ou digital.',
      'Plano cartesiano em papel ou projetado.',
      'Material concreto (formas geométricas e triângulos recortados).',
      'Quadro branco, projetor e material didático oficial.'
    ],
    desenvolvimento: [
      'A aula é iniciada com a problematização do toldo da padaria, mobilizando conhecimentos prévios de contagem de quadradinhos. Os estudantes discutem em duplas e registram suas estratégias, favorecendo a participação coletiva (Técnica Lemov: “Todos juntos”).',
      'O professor conduz a recomposição de triângulos em retângulos, sistematizando a ideia de que a área do triângulo corresponde à metade da área do retângulo (Princípio Rosenshine: apresentação em pequenos passos).',
      'Em seguida, os estudantes identificam base e altura em diferentes triângulos, registrando medidas e calculando áreas (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com exercícios em tabela e discussão coletiva, garantindo alta taxa de sucesso e verificação da compreensão (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento retoma a ideia de equivalência geométrica, reforçando que qualquer lado pode ser base e que a área é invariável.'
    ],
    avaliacao: [
      'Correção técnica das medições e dos cálculos de área propostos.',
      'Justificativas geométricas apresentadas nas discussões e registros individuais.',
      'Participação ativa e cooperação no trabalho prático em duplas e no grande grupo.',
      'Acompanhamento do registro das atividades nas malhas e planos cartesianos.'
    ],
    acessibilidade: [
      'Linguagem simples e clara, com exemplos contextualizados com o cotidiano do estudante.',
      'Uso de recursos visuais e táteis interativos (como as formas geométricas coloridas recortadas).',
      'Flexibilização do tempo de execução e acompanhamento individualizado para discentes com dificuldades pedagógicas.',
      'Avaliação alternativa valorizando explicações orais e representações geométricas concretas.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem.',
      'Currículo Paulista.',
      'Base Nacional Comum Curricular (BNCC).',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction: research-based strategies that all teachers should know.',
      'Documentos norteadores sobre Desenho Universal para a Aprendizagem (DUA).'
    ]
  },
  'Língua Portuguesa': {
    unidadeTematica: 'Leitura, Escrita e Análise Linguística',
    objetosConhecimento: 'Gêneros discursivos, coesão, coerência e estratégias de argumentação.',
    espacoFisico: [
      'Sala de aula regular organizada para discussões coletivas.',
      'Acesso a materiais de leitura diversos (impressos e digitais).'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Estimular a análise crítica de recursos discursivos e textuais.',
      aplicacao: 'A aula inicia com a leitura de uma manchete jornalística de impacto ou um anúncio persuasivo, instigando os estudantes a identificarem intenções implícitas e recursos persuasivos. O professor atua como mediador de reflexão.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Desenvolver a habilidade de produção e argumentação textual com rigor gramatical.',
      aplicacao: 'Os estudantes enfrentam o desafio em duplas de estruturarem argumentos sólidos para defender uma tese polêmica em um pequeno artigo de opinião ou debate guiado, mobilizando conjunções e operadores argumentativos.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da experimentação prática, criação de protótipos ou montagem textual cooperativa.',
      objetivo: 'Materializar o conhecimento textual através de suportes reais ou fanzines e murais.',
      aplicacao: 'Os alunos utilizam jornais, revistas, canetas coloridas e folhas sulfite para recortar, reorganizar e diagramar um fanzine escolar focado na divulgação de suas opiniões e análise crítica dos discursos.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Promover escolhas estéticas e temáticas na criação autoral.',
      aplicacao: 'Os discentes têm autonomia para selecionar o tema de sua produção argumentativa dentre uma lista de problemas da atualidade, definindo também o formato de suporte (editorial, podcast ou carta aberta) mais adequado.'
    },
    recursos: [
      'Textos analíticos, anúncios e crônicas selecionadas.',
      'Folhas sulfites de cores variadas, jornais e revistas para recortes.',
      'Projetor multimídia para análise de mídias dinâmicas.',
      'Dicionários e gramáticas de consulta.'
    ],
    desenvolvimento: [
      'A aula é iniciada com a leitura compartilhada de um texto provocador, mobilizando o repertório linguístico prévio dos estudantes (Técnica Lemov: “Todos juntos”).',
      'O professor conduz a análise estrutural do gênero textual, dividindo o conteúdo gramatical ou literário em pequenos blocos (Princípio Rosenshine: apresentação em pequenos passos).',
      'Em seguida, os estudantes realizam um exercício prático de escrita ou identificação, registrando suas hipóteses no caderno (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com a leitura cruzada e feedback mútuo em duplas, garantindo a correção imediata (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento sistematiza as características do gênero e a importância da coesão.'
    ],
    avaliacao: [
      'Coerência e coesão textual de acordo com as regras gramaticais estudadas.',
      'Adequação do vocabulário e dos argumentos estruturados ao gênero textual.',
      'Engajamento nas análises em duplas e na revisão cooperativa.',
      'Qualidade do fanzine ou painel conceitual produzido.'
    ],
    acessibilidade: [
      'Apresentação de textos em formatos variados (áudio, visual de fonte ampliada, esquemas de ideias).',
      'Uso de glossários simplificados para apoiar o vocabulário mais complexo.',
      'Acompanhamento contínuo do planejamento textual em pequenos trechos e passos.',
      'Opção de expressão oral das opiniões para alunos com severa limitação de escrita.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de Língua Portuguesa.',
      'Currículo Paulista e BNCC.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Teoria dos Gêneros Textuais (Bakhtin, M.).'
    ]
  },
  'Ciências': {
    unidadeTematica: 'Matéria e Energia / Vida e Evolução',
    objetosConhecimento: 'Fenômenos físicos e químicos, ciclos naturais e relações de sustentabilidade.',
    espacoFisico: [
      'Laboratório de ciências ou sala adaptada para práticas experimentais.',
      'Áreas externas de observação do meio biológico/físico.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Estimular a investigação de fenômenos científicos e a formulação de hipóteses explicativas.',
      aplicacao: 'A aula se inicia com a observação de um fenômeno intrigante ou experimento simples (ex: mudança de estado físico, reações cromáticas ou simulação de erosão). O docente guia o debate sem dar a explicação pronta.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Desenvolver habilidades analíticas de interpretação de dados ecológicos e experimentais.',
      aplicacao: 'Os estudantes enfrentam o desafio de classificar dados de poluentes de uma represa ou tecer esquemas de equilíbrio biológico, justificando as causas de distúrbios e propondo soluções mitigadoras reais.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da experimentação prática, criação de protótipos ou simulações práticas.',
      objetivo: 'Compreender estruturas invisíveis (átomos, células, teias) por meio de modelos físicos táteis.',
      aplicacao: 'Os estudantes constroem modelos celulares tridimensionais usando materiais alternativos ou esquematizam um mini terrário em embalagens transparentes, visualizando dinamicamente as transformações materiais.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Permitir a escolha do foco analítico ou dos caminhos de experimentação biológica/física.',
      aplicacao: 'Os estudantes escolhem os componentes biológicos ou sistemas ecológicos que desejam simular e detalhar, elaborando cartazes informativos baseados em suas pesquisas sob orientação docente.'
    },
    recursos: [
      'Fichas científicas de observação de ecossistemas.',
      'Materiais práticos/alternativos (garrafas plásticas, lupas, termômetros).',
      'Simulações laboratoriais digitais ou projetor para esquemas anatômicos.',
      'Quadro conceitual de termos científicos.'
    ],
    desenvolvimento: [
      'A aula é iniciada com um experimento demonstração provocador, mobilizando hipóteses sobre o fenômeno físico/biológico (Técnica Lemov: “Todos juntos”).',
      'O professor sistematiza os conceitos científicos envolvidos, explicando os processos físicos ou biológicos passo a passo (Princípio Rosenshine: apresentação em pequenos passos).',
      'Em seguida, os estudantes registram as observações experimentais e as hipóteses deduzidas no relatório (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com exercícios conceituais e discussões em grupo com base nas evidências, assegurando a aprendizagem ativa (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento conecta as conclusões práticas com a teoria científica consolidada.'
    ],
    avaliacao: [
      'Rigor científico e clareza das hipóteses levantadas nos relatórios.',
      'Capacidade de estabelecer relações entre teoria e o fenômeno prático.',
      'Engajamento e zelo na montagem de modelos ou experimentos práticos.',
      'Compreensão dos impactos ambientais discutidos nas atividades.'
    ],
    acessibilidade: [
      'Disponibilização de materiais táteis e esquemas tridimensionais simplificados.',
      'Apoio individualizado com roteiros experimentais estruturados em pequenos passos.',
      'Permissão de registro de conclusões por meio de diagramas ilustrativos ou vídeos explicativos curtos.',
      'Flexibilização do tempo para acomodar diferentes ritmos de tabulação de dados.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de Ciências.',
      'Currículo Paulista e Referencial da BNCC.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Metodologias Ativas no Ensino de Ciências (Bacich, L.).'
    ]
  },
  'História': {
    unidadeTematica: 'Tempo, Memória e Sociedade',
    objetosConhecimento: 'Sujeitos históricos, permanências, rupturas temporais e análise de fontes.',
    espacoFisico: [
      'Sala de aula organizada em semicírculo propiciando debates qualificados.',
      'Projetor de mídias para apreciação de imagens históricas.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Fomentar o pensamento crítico a partir da análise de múltiplas fontes históricas.',
      aplicacao: 'A aula se inicia com a análise de fontes contraditórias de um mesmo fato histórico (como depoimentos, cartas ou pinturas antigas). Os estudantes levantam hipóteses sobre os interesses e o contexto do emissor.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Estabelecer paralelos lógicos e conexões analíticas entre o passado e problemas sociais do presente.',
      aplicacao: 'Em grupos, os estudantes são desafiados a identificar permanências e rupturas estruturais de um fato antigo na atualidade brasileira, formulando uma linha do tempo crítica comparativa.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da criação artística ou estruturação material de narrativas do passado.',
      objetivo: 'Materializar conceitos históricos através da criação de murais conceituais ou dossiês históricos.',
      aplicacao: 'Os alunos criam dossiês ou panfletos simulando a imprensa alternativa de épocas revolucionárias, utilizando materiais impressos, recortes e colagens de forma autoral e criativa.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Dar voz e protagonismo ao aluno na escolha de perspectivas de pesquisa histórica.',
      aplicacao: 'Os discentes elegem autonomamente um personagem ou grupo invisibilizado na narrativa histórica oficial (como mulheres, indígenas ou escravizados no período estudado) para aprofundarem suas análises.'
    },
    recursos: [
      'Documentos de época, imagens históricas e fragmentos de cartas.',
      'Cartolinas, papéis sulfite coloridos e pincéis para confecção de linhas do tempo.',
      'Projetor multimídia para exibição de curtas-metragens documentais.',
      'Biblioteca ou acervo didático escolar.'
    ],
    desenvolvimento: [
      'A aula é iniciada com a análise de uma imagem ou objeto histórico instigante, levantando questionamentos e hipóteses sobre o período (Técnica Lemov: “Todos juntos”).',
      'O professor conduz a exposição do contexto histórico, detalhando as relações de poder, economia e cultura do período em pequenos blocos explicativos (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes são desafiados a redigir um parágrafo crítico analisando a fonte histórica sob diferentes pontos de vista (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com debates mediados e correção coletiva dos conceitos fundamentais de tempo e sujeito histórico (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento sintetiza os principais legados e rupturas discutidos na aula.'
    ],
    avaliacao: [
      'Capacidade de identificar múltiplas causas e consequências do fato histórico.',
      'Rigor conceitual e leitura crítica das fontes históricas analisadas.',
      'Produção textual analítica e argumentativa individual de boa qualidade.',
      'Contribuição para o debate crítico no grande grupo.'
    ],
    acessibilidade: [
      'Uso de imagens ricas, áudios históricos e infográficos temporais de fácil leitura.',
      'Destaque explícito de palavras-chave e marcos cronológicos fundamentais.',
      'Fichas de perguntas estruturadas simplificando a interpretação das fontes.',
      'Substituição de extensos relatórios por esquemas visuais (como mapas mentais ou linhas do tempo).'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de História.',
      'Currículo Paulista e BNCC de Ciências Humanas.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'O Saber Histórico na Sala de Aula (Bittencourt, C.).'
    ]
  },
  'Geografia': {
    unidadeTematica: 'Espaço, Território e Dinâmicas Socioambientais',
    objetosConhecimento: 'Categorias do espaço geográfico, leitura cartográfica e interações socioespaciais.',
    espacoFisico: [
      'Sala de aula regular ou laboratório geográfico.',
      'Mapotecas ou acesso a atlas e recursos cartográficos digitais.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Desenvolver a análise interpretativa do espaço por meio da leitura cartográfica crítica.',
      aplicacao: 'A aula inicia-se com a apresentação de imagens aéreas ou de satélite com alterações abruptas na paisagem ao longo do tempo. O docente fomenta questionamentos sobre as causas humanas ou físicas dessas dinâmicas espaciais.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Resolver problemas espaciais práticos utilizando mapas temáticos e dados geográficos.',
      aplicacao: 'Em trios, os estudantes enfrentam o desafio prático de desenhar propostas para reverter a impermeabilização urbana ou otimizar bacias hidrográficas locais utilizando dados temáticos e croquis do bairro.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da criação artística ou estruturação material de representações espaciais.',
      objetivo: 'Materializar o relevo e conceitos de escala por meio de maquetes ou mapas táteis.',
      aplicacao: 'Os estudantes utilizam papel cartão ou papelão em camadas para confeccionar um croqui tridimensional ou maquete do relevo local, compreendendo curvas de nível de forma concreta.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Garantir protagonismo e escolhas de aprofundamento das problemáticas espaciais.',
      aplicacao: 'Os alunos escolhem uma região do estado ou do planeta que mais lhes interessa dentro do tema para pesquisarem os impactos das mudanças econômicas ou do clima e relatarem as conclusões.'
    },
    recursos: [
      'Atlas geográfico escolar e mapas de relevo ou demográficos.',
      'Papel milimetrado, papel vegetal, fitas métricas e bússolas.',
      'Projetor para visualização de sistemas de informação geográfica (SIG).',
      'Quadro branco e cartilhas ambientais.'
    ],
    desenvolvimento: [
      'A aula é iniciada com a observação de fotografias aéreas ou de satélite da paisagem local para problematizar as transformações espaciais (Técnica Lemov: “Todos juntos”).',
      'O professor explica as categorias geográficas (espaço, território, lugar) e as dinâmicas físicas ou sociais em foco com mapas de apoio (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes realizam a leitura de mapas e tabelas demográficas, anotando as conclusões espaciais no caderno (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com a elaboração coletiva de uma legenda geográfica e discussões críticas sobre o espaço geográfico (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento retoma a importância do ordenamento do território e das relações sociedade-natureza.'
    ],
    avaliacao: [
      'Habilidade na leitura e interpretação de legendas e dados cartográficos.',
      'Coerência dos croquis de relevo ou maquetes espaciais confeccionadas.',
      'Precisão conceitual ao explicar processos de transformação espacial ou ambiental.',
      'Participação ativa e debate crítico sobre a sociedade e sustentabilidade.'
    ],
    acessibilidade: [
      'Uso de mapas táteis de relevo em alto contraste para alunos com baixa visão.',
      'Simplificação de legendas complexas com uso de ícones ou pictogramas diretos.',
      'Roteiros direcionados simplificando as perguntas cartográficas passo a passo.',
      'Apoio individualizado na leitura espacial e transposição de escalas.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de Geografia.',
      'Currículo Paulista de Geografia (Anos Finais / Ensino Médio).',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Cartografia Escolar (Almeida, R. D.).'
    ]
  },
  'Língua Inglesa': {
    unidadeTematica: 'Dimensão Comunicativa e Interculturalidade',
    objetosConhecimento: 'Língua inglesa no mundo, repertório lexical, funções comunicativas e estruturas sintáticas.',
    espacoFisico: [
      'Sala de aula adaptada para interações orais fluídas.',
      'Aparelhos reprodutores de som ou multimídia.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Identificar padrões linguísticos e funções discursivas em língua inglesa de forma contextualizada.',
      aplicacao: 'A aula inicia com a análise de anúncios internacionais ou curtas em inglês contendo gírias ou expressões locais, onde os alunos decodificam os sentidos contextuais e as intenções de fala de forma ativa.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Utilizar ativamente o inglês em interações orais e produções escritas reais ou simuladas.',
      aplicacao: 'Em duplas, os discentes enfrentam o desafio de criarem um roteiro comunicativo rápido (ex: simular uma entrevista de emprego ou recepção turística) empregando vocabulário específico do bimestre sob regras de tempo.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da criação artística ou estruturação material de suportes comunicativos.',
      objetivo: 'Criar infográficos e suportes reais de divulgação usando a língua inglesa de forma poética ou de design.',
      aplicacao: 'Os discentes usam canetas coloridas e folhas de cartolinas para desenharem folhetos turísticos ou cartazes de utilidade pública em inglês com forte apelo visual, aplicando as regras linguísticas integradas.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Favorecer a escolha do ritmo e dos temas de conversação ou vocabulários de maior interesse pessoal.',
      aplicacao: 'Os alunos escolhem livremente entre produzir um áudio rápido, uma tira de quadrinhos ou uma postagem de blog em inglês sobre seus interesses pessoais para demonstrar as estruturas linguísticas aprendidas.'
    },
    recursos: [
      'Letras de música, cartazes, infográficos e curtas selecionados.',
      'Flashcards e cartões de gramática prática.',
      'Projetor multimídia, caixa de som e dicionários bilíngues.',
      'Fichas de exercícios para consolidação estrutural.'
    ],
    desenvolvimento: [
      'A aula inicia-se com uma música ou vídeo curto em inglês, estimulando a escuta ativa e a identificação de palavras-chave (Técnica Lemov: “Todos juntos”).',
      'O professor introduz a estrutura gramatical e o vocabulário temático de forma fásica, modelando a pronúncia e o uso (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes escrevem sentenças curtas ou pequenos diálogos aplicando a nova estrutura linguística (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com a dramatização dos diálogos em pares e feedback formativo das produções escritas (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento resume as funções comunicativas praticadas.'
    ],
    avaliacao: [
      'Precisão no uso das estruturas gramaticais e do vocabulário do bimestre.',
      'Adequação e clareza da entonação e da pronúncia nas interações simuladas.',
      'Criatividade e acabamento dos folhetos ou pôsteres em inglês produzidos.',
      'Engajamento ativo nas dinâmicas de conversação e escuta.'
    ],
    acessibilidade: [
      'Subtítulos em português ou uso de imagens de suporte para decodificação auditiva.',
      'Lista simplificada de termos-chave e conectivos básicos de conversação.',
      'Pareamento de alunos de diferentes níveis para auxílio mútuo nas dinâmicas de fala.',
      'Opção de envio de áudios gravados privadamente para alunos com timidez excessiva.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de Inglês.',
      'Currículo Paulista de Língua Inglesa e BNCC.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Ensino de Língua Estrangeira (Richards, J.).'
    ]
  },
  'Arte': {
    unidadeTematica: 'Artes Visuais, Teatro e Expressão Poética',
    objetosConhecimento: 'Materialidades, elementos formais da imagem, corporeidade e contextualização histórica artística.',
    espacoFisico: [
      'Ateliê de artes, quadra ampla ou sala organizada com espaço para circulação.',
      'Superfície de exposição para as criações plásticas dos discentes.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Desenvolver a percepção estética e a leitura formal de produções artísticas.',
      aplicacao: 'A aula inicia-se com a apreciação estética guiada de uma obra de arte conceitual desafiadora ou uma performance corporal marcante. O professor problematiza as intenções estéticas, cores e formas sem emitir julgamento prévio.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Resolver problemas composicionais, corporais ou plásticos pautados em técnicas de vanguarda.',
      aplicacao: 'Os estudantes enfrentam o desafio de estruturar uma composição visual monocromática ou uma pequena cena muda expressando emoções específicas, aplicando estritamente as teorias cromáticas e espaciais estudadas.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da criação artística ou estruturação material de produtos plásticos.',
      objetivo: 'Experimentar com materialidades diversas na elaboração de painéis plásticos ou objetos.',
      aplicacao: 'Em ateliê livre, utilizando materiais alternativos (tintas, argila, jornais velhos, materiais recicláveis), os discentes montam esculturas ou pintam painéis coletivos expressivos de forma autônoma e autoral.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Promover a autogestão estética e o desenvolvimento do estilo expressivo próprio.',
      aplicacao: 'Os estudantes escolhem livremente entre três linguagens artísticas diferentes (desenho, colagem ou teatro corporal) para responderem ao questionamento da unidade temática, definindo seu suporte expressivo.'
    },
    recursos: [
      'Reproduções impressas ou projeção de obras de referência (locais e internacionais).',
      'Suportes plásticos: tintas, guaches, argila, giz de cera, papéis, tesouras.',
      'Equipamento reprodutor de som para dinâmicas de teatro e sensibilização.',
      'Lousa de giz para conceitos e roteiros.'
    ],
    desenvolvimento: [
      'A aula inicia-se com a apreciação estética guiada de uma obra de arte de referência, incentivando a percepção sensorial (Técnica Lemov: “Todos juntos”).',
      'O professor contextualiza a corrente artística ou a linguagem técnica envolvida, explicando suas propriedades formais passo a passo (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes elaboram rascunhos individuais de suas composições poéticas no caderno de artes (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com o ateliê prático e a circulação do professor para feedback individual do processo de criação (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento promove a exposição das obras de arte criadas e a reflexão estética coletiva.'
    ],
    avaliacao: [
      'Compreensão conceitual das linguagens estéticas trabalhadas na atividade.',
      'Exploração criativa e coerência das materialidades aplicadas nas obras.',
      'Zelo, acabamento e empenho demonstrados no processo de produção de ateliê.',
      'Qualidade da crítica e do respeito à produção artística dos colegas.'
    ],
    acessibilidade: [
      'Uso de materiais de texturas ricas e marcadas para discentes com deficiência visual.',
      'Adaptação de pincéis e tesouras de fácil preensão anatômica.',
      'Flexibilização do silêncio ou da iluminação da sala para acolher discentes com hipersensibilidades.',
      'Valorização do processo e da expressão poética individual acima de resultados anatômicos rígidos.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Aprendizagem de Arte.',
      'Currículo Paulista de Arte e Diretrizes do Currículo da BNCC.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'O Ensino da Arte (Read, H.).'
    ]
  },
  'Educação Física': {
    unidadeTematica: 'Cultura Corporal do Movimento',
    objetosConhecimento: 'Esportes, ginásticas, lutas, danças, jogos coletivos e saúde integral.',
    espacoFisico: [
      'Quadra poliesportiva, pátio amplo ou espaço aberto demarcado.',
      'Uso seguro de materiais esportivos de impacto controlado.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Identificar as propriedades históricas e mecânicas dos esportes e jogos corporais.',
      aplicacao: 'A aula inicia-se com a análise de vídeos curtos ou esquemas de jogadas de vanguarda, provocando discussões sobre as forças físicas atuantes e as funções táticas espaciais envolvidas nos movimentos corporais.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Resolver problemas práticos de coordenação tática, velocidade e cooperação física.',
      aplicacao: 'Em equipes, os estudantes enfrentam o desafio de construírem um sistema tático defensivo-ofensivo que inclua obrigatoriamente todos os membros da equipe no jogo esportivo adaptado, com regras de passe limitados.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da reestruturação material de regras ou confecção de materiais alternativos.',
      objetivo: 'Estimular a autogestão lúdica através do desenho técnico de jogadas ou criação de implementos.',
      aplicacao: 'Os estudantes utilizam fita crepe, jornais velhos ou garrafas para criarem seus próprios cones e marcadores ou desenham em pranchetas esquemas táticos criativos de circulação em campo.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Oferecer escolhas seguras de participação motora de acordo com a autopercepção física.',
      aplicacao: 'Os discentes têm autonomia para optar pelas funções de quadra (defesa, armação, ataque, ou arbitragem formativa) que melhor se alinham às suas metas de desenvolvimento físico no bimestre.'
    },
    recursos: [
      'Bolas esportivas de materiais variados (borracha, espuma, couro).',
      'Cones demarcadores, fitas adesivas, coletes de cores variadas e apitos.',
      'Pranchetas para desenhos de jogadas táticas cooperativas.',
      'Caixa de som para ritmos e danças.'
    ],
    desenvolvimento: [
      'A aula é iniciada com um aquecimento recreativo cooperativo na quadra de esportes, estimulando a socialização e prontidão física (Técnica Lemov: “Todos juntos”).',
      'O professor expõe as regras formais e técnicas do esporte ou jogo, dividindo os movimentos táticos fundamentais (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes esboçam individualmente em duplas táticas de jogo ofensivas e defensivas em prancheta ou caderno (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com a vivência prática monitorada, focando no fair play, na cooperação e no feedback tático em tempo real (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento faz um balanço das estratégias de cooperação vivenciadas.'
    ],
    avaliacao: [
      'Respeito ético às regras de fair play e cooperação solidária na quadra.',
      'Adequação das estratégias táticas coletivas desenhadas e aplicadas.',
      'Engajamento, cuidado físico com si e com o próximo nas atividades motoras.',
      'Sistematização teórica do esporte registrada nas folhas conceituais.'
    ],
    acessibilidade: [
      'Adaptação de bolas (uso de guizos, tamanhos e pesos reduzidos para inclusão).',
      'Redimensionamento do espaço de jogo (quadras menores facilitando a circulação).',
      'Opções de passe adaptado ou pontuações adaptadas para garantir que todos joguem ativamente.',
      'Foco pedagógico nas conquistas corporais individuais e atitude inclusiva.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Educação Física.',
      'Currículo Paulista e BNCC de Educação Física.',
      'Lemov, Doug. Aula nota 10 3.0: 63 techniques.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Pedagogia do Esporte (Freire, J. B.).'
    ]
  },
  'Filosofia': {
    unidadeTematica: 'Ética, Epistemologia e Cidadania',
    objetosConhecimento: 'História das ideias filosóficas, lógica formal e informal, e argumentação dialética.',
    espacoFisico: [
      'Sala de aula organizada em círculo facilitando o diálogo socrático.',
      'Lousa livre para rascunhar diagramas e paradoxos conceituais.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Despertar o espanto filosófico e a desconstrução crítica de certezas cotidianas.',
      aplicacao: 'A aula inicia-se com um paradoxo lógico instigante ou dilema moral clássico (como o problema do bonde ou a alegoria da caverna). O professor guia a discussão promovendo perguntas problematizadoras que desconstroem argumentos frágeis.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Estruturar teses lógicas consistentes e refutar falácias formais de forma argumentativa.',
      aplicacao: 'Em duplas dialéticas, os estudantes recebem o desafio de estruturar argumentos contra e a favor de teses contemporâneas complexas de bioética ou cidadania, baseados nos filósofos da unidade, refutando falácias.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da modelagem lógica, árvores conceituais ou rascunho de discursos.',
      objetivo: 'Materializar o percurso da argumentação lógica e dos silogismos em diagramas visuais.',
      aplicacao: 'Os estudantes criam de forma autônoma "mapas mentais de teses" ou confeccionam uma "Árvore dos Argumentos" usando post-its e cartolinas, dividindo premissas falsas, premissas verdadeiras e conclusões lógicas.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Fomentar a reflexão autônoma e a justificativa racional de posicionamentos éticos.',
      aplicacao: 'Os discentes elegem o dilema ético contemporâneo que mais impacta suas vidas para fundamentarem uma defesa escrita pautada nas correntes filosóficas estudadas sob mentoria do docente.'
    },
    recursos: [
      'Textos filosóficos clássicos e excertos comentados.',
      'Cartolinas, post-its e canetas marcadoras de cores variadas.',
      'Projetor para exibição de dilemas e esquemas de lógica formal.',
      'Fichas conceituais com sínteses filosóficas.'
    ],
    desenvolvimento: [
      'A aula inicia-se com uma pergunta instigante ou dilema moral gerando reflexão pessoal imediata (Técnica Lemov: “Todos juntos”).',
      'O professor introduz as correntes de pensamento filosófico e os conceitos epistemológicos de forma clara e estruturada (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes escrevem um breve parágrafo justificando seu posicionamento ético inicial sobre o dilema (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com debates argumentativos estruturados em duplas e posterior socialização coletiva (Princípios Rosenshine: prática guia e verificação frequente).',
      'O encerramento sintetiza os conceitos formais e a importância da atitude filosófica.'
    ],
    avaliacao: [
      'Coerência lógica e ausência de contradições na defesa dos argumentos individuais.',
      'Capacidade de fundamentar posições usando conceitos dos filósofos em estudo.',
      'Respeito democrático e qualidade da escuta às objeções dos colegas.',
      'Riqueza conceitual do mapa lógico ou texto produzido.'
    ],
    acessibilidade: [
      'Uso de diagramas visuais explicativos detalhando silogismos de forma gráfica.',
      'Apoio com definições conceituais simplificadas de termos abstratos complexos.',
      'Permissão de gravação de explicações orais em áudio em vez de redações manuscritas.',
      'Pareamento estratégico de alunos para fomento mútuo do debate ético.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Filosofia.',
      'Currículo Paulista e Referencial Curricular de Filosofia (Ensino Médio).',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Convite à Filosofia (Chauí, M.).'
    ]
  },
  'Sociologia': {
    unidadeTematica: 'Sociedade, Desigualdades e Instituições Sociais',
    objetosConhecimento: 'Estratificação social, diversidade cultural, movimentos sociais e o papel das instituições.',
    espacoFisico: [
      'Sala de aula com assentos móveis propiciando trabalhos cooperativos.',
      'Acesso à projeção de infográficos socioeconômicos.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Desenvolver o olhar sociológico e o estranhamento de fenômenos sociais cotidianos.',
      aplicacao: 'A aula inicia-se com a apresentação de uma estatística socioeconômica contrastante do Brasil ou infográficos de consumo. O professor questiona os alunos sobre as raízes sociológicas destas clivagens, estimulando hipóteses sem dar respostas simplistas.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Analisar e propor alternativas viáveis para mitigar problemas sociais locais baseados em dados reais.',
      aplicacao: 'Os discentes assumem o desafio em equipes de criar um roteiro de ação social ou política de inclusão para um bairro fictício, embasados nos dados demográficos fornecidos e nos clássicos da sociologia.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da criação artística ou estruturação de dados empíricos visuais.',
      objetivo: 'Sintetizar as estruturas sociais invisíveis através do design de infográficos ou mídias visuais.',
      aplicacao: 'Os discentes criam infográficos de grande impacto visual utilizando cartolinas ou aplicativos, sistematizando os eixos das desigualdades de renda e gênero e exibindo-os nos murais escolares.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Fomentar a atitude autônoma de pesquisa empírica e interpretação social.',
      aplicacao: 'Os discentes planejam autonomamente as perguntas de um mini-questionário empírico que aplicariam em seu cotidiano para testar hipóteses sobre costumes ou estratificações locais.'
    },
    recursos: [
      'Excertos sociológicos clássicos e contemporâneos.',
      'Estatísticas oficiais (IBGE, IPEA) impressas ou em projeção.',
      'Cartolinas, pincéis, réguas e folhas conceituais estruturadas.',
      'Projetor de mídia.'
    ],
    desenvolvimento: [
      'A aula inicia-se com a exposição de um dado estatístico impactante sobre a sociedade contemporânea, despertando curiosidade crítica (Técnica Lemov: “Todos juntos”).',
      'O professor apresenta os conceitos sociológicos fundamentais (estratificação, socialização, cultura), associando-os aos fatos sociais (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes respondem a questões analíticas associando os dados apresentados às teorias sociológicas no caderno (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com o trabalho de campo simulado em grupo de tabulação de dados e discussões integradoras (Princípios Rosenshine: prática guia e verificação frequente).',
      'O encerramento retoma a importância da imaginação sociológica para compreender o mundo atual.'
    ],
    avaliacao: [
      'Domínio teórico de conceitos sociológicos fundamentais estudados.',
      'Habilidade de analisar tabelas e dados sociais reais com rigor científico.',
      'Engajamento, escuta ativa e trabalho colaborativo nas tarefas de grupo.',
      'Acabamento, clareza e poder de síntese do infográfico confeccionado.'
    ],
    acessibilidade: [
      'Apresentação de dados estatísticos em tabelas simplificadas de alto contraste visual.',
      'Acompanhamento contínuo e orientação individualizada nos conceitos sociológicos.',
      'Vocabulário sociológico de apoio destacando termos complexos com exemplos práticos.',
      'Possibilidade de produção em grupo facilitando a divisão equitativa das tarefas.'
    ],
    referencias: [
      'Escopo-sequência (SEDUC-SP).',
      'Guia Priorizado de Sociologia.',
      'Currículo Paulista e Referencial Curricular de Ciências Humanas.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'A Imaginação Sociológica (Wright Mills, C.).'
    ]
  },
  'Biologia': {
    unidadeTematica: 'Vida, Evolução e Biotecnologia',
    objetosConhecimento: 'Citologia, fluxos energéticos, genética mendeliana e dinâmicas ecológicas.',
    espacoFisico: [
      'Laboratório de biologia ou sala com mesas agrupadas para observação prática.',
      'Acesso à projeção de microscopia virtual ou animações em 3D.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Fomentar a dedução científica baseada na observação de ciclos ecológicos ou cruzamentos.',
      aplicacao: 'A aula inicia-se com a problematização de um mistério genético (como a herança de doenças em heredogramas familiares) ou uma crise de desequilíbrio trófico em um lago poluído, provocando discussões investigativas sobre os mecanismos subjacentes. O docente apoia os questionamentos.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Utilizar os modelos biológicos para desvendar heredogramas complexos ou fluxos de energia ecológicos.',
      aplicacao: 'Em grupos de trabalho, os discentes recebem o desafio de mapear a probabilidade de expressão de fenótipos a partir de cruzamentos genéticos específicos de herança ligada ao sexo ou de reestabelecer o equilíbrio ecológico a partir de dados reais de impacto.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da modelagem física de estruturas celulares ou fluxos biológicos.',
      objetivo: 'Compreender a complexidade microscópica (como DNA e células) por meio de protótipos físicos táteis.',
      aplicacao: 'Usando massinhas de modelar coloridas, papéis de reuso ou palitos, os discentes criam um modelo tátil tridimensional de organelas celulares ou dupla-hélice de DNA, rotulando os eixos principais sob supervisão.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Permitir a escolha do foco analítico ou dos caminhos de experimentação biológica.',
      aplicacao: 'Os estudantes escolhem os componentes biológicos ou sistemas ecológicos que desejam simular e detalhar, elaborando esquemas conceituais baseados em suas investigações dirigidas.'
    },
    recursos: [
      'Modelos de cruzamento genético e heredogramas didáticos.',
      'Esquemas coloridos de fisiologia celular e de fluxos de teia alimentar.',
      'Massinha de modelar, palitos de dente, cartões de rotulagem e fitas métricas.',
      'Projetor multimídia para infográficos de biotecnologia.'
    ],
    desenvolvimento: [
      'A aula é iniciada com um estudo de caso ecológico ou genético real, instigando hipóteses explicativas dos estudantes (Técnica Lemov: “Todos juntos”).',
      'O professor conduz a exposição biológica de forma fásica (estruturas celulares, fluxos de energia ou leis mendelianas) utilizando diagramas ricos (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes elaboram um diagrama esquemático explicativo do fenômeno celular ou biológico em foco (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com testes de múltiplos caminhos genéticos ou resolução cooperativa de problemas ecológicos (Princípios Rosenshine: prática guiada e verificação frequente).',
      'O encerramento consolida os conceitos biológicos e a importância da preservação ambiental e da biotecnologia.'
    ],
    avaliacao: [
      'Acurácia e rigor científico nas resoluções dos cruzamentos ou teias propostas.',
      'Criatividade, identificação e fidelidade científica na modelagem física (maker).',
      'Participação ativa, cooperação nas discussões e formulações em equipe.',
      'Clareza nos relatórios analíticos individuais de conclusões biológicas.'
    ],
    acessibilidade: [
      'Suporte tátil para estruturas celulares (uso de formas recortadas e massas de modelar).',
      'Pareamento de alunos com diferentes habilidades no mapeamento genético.',
      'Roteiros estruturados com menos etapas simultâneas para herança complexa.',
      'Avaliação flexível valorizando explicações orais e esquemas visuais amplos.'
    ],
    referencias: [
      'Escopo-sequência de Biologia (SEDUC-SP).',
      'Guia Priorizado de Biologia.',
      'Currículo Paulista de Biologia (Ensino Médio).',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas para melhorar a gestão da sala de aula.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Biologia Geral (Amabis & Martho).'
    ]
  },
  'Química': {
    unidadeTematica: 'Matéria, Energia e Transformações Moleculares',
    objetosConhecimento: 'Estrutura atômica, ligações químicas, balanceamento de reações e estequiometria.',
    espacoFisico: [
      'Laboratório escolar de química ou mesas organizadas para experimentos práticos.',
      'Projeção de simulações moleculares ou tabelas periódicas dinâmicas.'
    ],
    investigacao: {
      definicao: 'Abordagem investigativa com foco na descoberta pautada pelo questionamento.',
      objetivo: 'Fomentar a observação crítica microscópica e hipóteses moleculares de reações cotidianas.',
      aplicacao: 'A aula inicia-se com uma pergunta instigante sobre interações químicas do cotidiano (como a oxidação de metais ou a condutividade da água salgada), desafiando os alunos a elaborarem hipóteses eletrônicas sobre o fenômeno.'
    },
    desafios: {
      definicao: 'Organização da aprendizagem em torno de um desafio prático real ou simulado.',
      objetivo: 'Resolver problemas complexos de reações moleculares e equilíbrio estequiométrico.',
      aplicacao: 'Em pares de pesquisa, os estudantes enfrentam o desafio prático de balancear equações de oxirredução ou prever a geometria e polaridade de moléculas a partir de suas distribuições de elétrons, justificando as forças intermoleculares.'
    },
    maker: {
      definicao: 'Aprender fazendo por meio da simulação material de estruturas eletrônicas ou ligações atômicas.',
      objetivo: 'Compreender geometrias moleculares abstratas por meio da montagem física de esferas e conexões.',
      aplicacao: 'Os estudantes utilizam esferas de isopor coloridas e palitos para modelarem geometrias moleculares (ex: linear, tetraédrica) e ligações covalentes de compostos em estudo, rotulando os polos e elétrons.'
    },
    centrado: {
      definicao: 'Abordagem que valoriza a autonomia, o ritmo individual, os conhecimentos prévios e o protagonismo discente.',
      objetivo: 'Oferecer autonomia na seleção de caminhos práticos para demonstrar conceitos atômicos/moleculares.',
      aplicacao: 'Os alunos escolhem quais tipos de ligações (iônica, covalente ou metálica) e quais substâncias do cotidiano pretendem aprofundar e modelar, estruturando suas explicações para a sala sob mentoria docente.'
    },
    recursos: [
      'Tabelas periódicas ricas e atualizadas para consulta.',
      'Materiais de apoio: esferas de isopor, palitos, ganchos moleculares e massinhas.',
      'Projetor de mídia para simulações estequiométricas interativas.',
      'Roteiros direcionados de balanceamento químico.'
    ],
    desenvolvimento: [
      'A aula inicia-se com uma pergunta intrigante sobre reações cotidianas (oxidação, combustão, acidez), levantando teorias moleculares (Técnica Lemov: “Todos juntos”).',
      'O professor explica a estrutura dos átomos, ligações ou reações fracionando a teoria e as fórmulas matemáticas passo a passo (Princípio Rosenshine: apresentação em pequenos passos).',
      'Os estudantes exercitam a escrita de fórmulas ou balanceamento de reações nos seus cadernos de anotação (Técnica Lemov: “Todo mundo escreve”).',
      'A aula é consolidada com experimentos simulados ou práticas de montagem molecular com esferas e palitos (Princípios Rosenshine: prática guia e verificação frequente).',
      'O encerramento resume as propriedades macroscópicas deduzidas a partir das interações microscópicas químicas.'
    ],
    avaliacao: [
      'Exatidão nos balanceamentos e nas resoluções das equações químicas.',
      'Fidelidade e precisão geométrica na montagem dos modelos tridimensionais.',
      'Participação ativa e cooperação nas dinâmicas de raciocínio atômico-molecular.',
      'Zelo e cuidado no manuseio de materiais ou simulações analíticas.'
    ],
    acessibilidade: [
      'Uso de esferas de diferentes tamanhos e ranhuras táteis para facilitar a identificação dos átomos.',
      'Modelagem com cores de alto contraste para ligações químicas de valência.',
      'Roteiros estruturados passo a passo para o balanceamento de equações complexas.',
      'Apoio consultivo personalizado do professor nas tarefas matemáticas estequiométricas.'
    ],
    referencias: [
      'Escopo-sequência de Química (SEDUC-SP).',
      'Guia Priorizado de Química.',
      'Currículo Paulista e Referencial da BNCC de Ciências da Natureza.',
      'Lemov, Doug. Aula nota 10 3.0: 63 técnicas.',
      'Rosenshine, Barak. Principles of Instruction.',
      'Química Geral (Feltre, R.).'
    ]
  },
  'Projeto de Vida': {
    unidadeTematica: 'Autoconhecimento, Convivência, Tomada de Decisão e Planejamento',
    objetosConhecimento: 'Identidade, projeto de vida, empatia, inteligência emocional e metas de futuro.',
    espacoFisico: [
      'Sala de aula organizada em círculo para as rodas de conversa.',
      'Espaço acolhedor que permita dinâmicas interativas e de escuta ativa.'
    ],
    investigacao: {
      definicao: 'Processo de autodescoberta e reflexão sobre a própria história e objetivos futuros.',
      objetivo: 'Estimular o estudante a refletir sobre si mesmo, suas relações e o impacto de suas ações.',
      aplicacao: 'A aula inicia-se com uma pergunta instigante sobre o eu e o mundo (ex: "Quem sou eu quando ninguém está me olhando?"), levando os estudantes a compartilharem vivências sem medo de julgamentos.'
    },
    desafios: {
      definicao: 'Resolução de dilemas éticos cotidianos e planejamento de caminhos possíveis.',
      objetivo: 'Fomentar a tomada de decisões éticas e responsáveis.',
      aplicacao: 'Os estudantes em grupos simulam escolhas difíceis de sua jornada escolar e profissional, ponderando as consequências e argumentando com base em valores éticos e de convivência pacífica.'
    },
    maker: {
      definicao: 'Materialização das visões de futuro, sonhos e metas através de artes e painéis visuais.',
      objetivo: 'Visualizar de forma tátil e gráfica as aspirações e planos de curto, médio e longo prazo.',
      aplicacao: 'Os estudantes criam seu Painel de Metas ou "Árvore dos Sonhos" utilizando materiais recicláveis, recortes de revistas ou colagens digitais para materializar o seu percurso projetado.'
    },
    centrado: {
      definicao: 'Abordagem focado na individualidade e no protagonismo das escolhas discentes.',
      objetivo: 'Garantir que o estudante lidere a reflexão e construção do seu próprio plano de futuro.',
      aplicacao: 'Cada discente registra de forma autônoma suas impressões e sentimentos no seu Diário de Bordo, escolhendo quais metas priorizar e como organizar seu plano de estudos para alcançá-las.'
    },
    recursos: [
      'Caderno de Projetos / Diário de Bordo individual.',
      'Revistas velhas, tesouras, colas e cartolinas para colagens.',
      'Folhas de orientação de carreira ou material digital do Projeto de Vida SEDUC-SP.',
      'Projetor de mídias para vídeos reflexivos.'
    ],
    desenvolvimento: [
      'Abertura com sensibilização (música, poesia ou citação inspiradora) mobilizando reflexões prévias.',
      'Partilha em Roda de Conversa estruturada sobre o tema da semana, praticando a escuta ativa e empatia.',
      'Trabalho individual e reflexivo no Diário de Bordo registrando as respostas às Questões Essenciais.',
      'Consolidação coletiva através de sínteses das atitudes propostas no Currículo Paulista 2026.',
      'Fechamento com um compromisso pessoal ou uma ação concreta para a semana.'
    ],
    avaliacao: [
      'Profundidade e sinceridade dos registros autorreflexivos no Diário de Bordo.',
      'Atitude empática, respeito à opinião do colega e participação nas rodas de conversa.',
      'Engajamento e zelo na confecção do Painel de Metas/Árvore dos Sonhos.',
      'Acompanhamento do desenvolvimento das competências socioemocionais (colaboração, persistência).'
    ],
    acessibilidade: [
      'Permissão para que os registros no Diário de Bordo sejam feitos por meio de desenhos, esquemas visuais ou relatos gravados em áudio.',
      'Mediação direcionada do professor para garantir que todos os alunos tenham espaço de fala respeitado na roda de conversa.',
      'Uso de recursos visuais de apoio e dinâmicas de pareamento amigável para acolhimento socioemocional.',
      'Adaptação do tempo de fala e de reflexão respeitando o tempo de cada estudante.'
    ],
    referencias: [
      'Material Digital de Projeto de Vida (SEDUC-SP).',
      'Diretrizes do Inova Educação - São Paulo.',
      'Currículo Paulista e BNCC de Competências Socioemocionais.',
      'Lemov, Doug. Aula nota 10 3.0: Técnicas de engajamento.',
      'Rosenshine, Barak. Principles of Instruction.'
    ]
  },
  'Tecnologia e Inovação': {
    unidadeTematica: 'Pensamento Computacional, Mundo Digital e Cultura Digital',
    objetosConhecimento: 'Algoritmos, programação em blocos, cidadania digital, robótica desplugada e mídias.',
    espacoFisico: [
      'Sala de informática ou sala regular com mesas agrupadas para trabalho colaborativo.',
      'Laboratório escolar com kits de robótica ou espaço para atividades desplugadas.'
    ],
    investigacao: {
      definicao: 'Análise de problemas do mundo físico para modelagem de fluxos lógicos algorítmicos.',
      objetivo: 'Desenvolver a habilidade de decomposição e abstração algorítmica de processos cotidianos.',
      aplicacao: 'A aula inicia-se com a análise de um sistema inteligente do cotidiano (como o sensor do semáforo), levando os estudantes a deduzirem os passos lógicos que comandam o comportamento da máquina.'
    },
    desafios: {
      definicao: 'Resolução de missões lógicas, correção de códigos (debugging) ou criação de jogos didáticos.',
      objetivo: 'Fomentar o raciocínio dedutivo de programação e a resolução ágil de problemas tecnológicos.',
      aplicacao: 'Os estudantes em pares enfrentam o desafio de programar um balão de diálogo interativo ou depurar um código incorreto no Start Lab / Scratch para que execute a sequência corretamente sob tempo restrito.'
    },
    maker: {
      definicao: 'Prototipagem de interfaces, robôs desplugados ou jogos físicos usando materiais acessíveis.',
      objetivo: 'Aplicar conhecimentos de automação e mecânica elementar de forma lúdica e tátil.',
      aplicacao: 'Utilizando caixas de papelão, tampinhas e seringas descartáveis, a turma monta protótipos de garras hidráulicas ou robôs artesanais, relacionando com o conceito de atuadores e sensores.'
    },
    centrado: {
      definicao: 'Criação de projetos tecnológicos autorais alinhados aos interesses dos estudantes.',
      objetivo: 'Garantir a autonomia de criação e a seleção do suporte ou tema de programação.',
      aplicacao: 'Os alunos escolhem livremente o tema de seus jogos em bloco ou o conteúdo do vídeo de cidadania digital que irão produzir, liderando o design das telas e interações.'
    },
    recursos: [
      'Ambiente virtual de programação (Start Lab, Scratch, Blockly).',
      'Material reciclável e kits escolares de robótica de reuso.',
      'Caderno de bordo de programação e cartilhas sobre Segurança na Rede.',
      'Projetor de tela e computadores funcionais.'
    ],
    desenvolvimento: [
      'Abertura problematizadora demonstrando o funcionamento de um dispositivo digital ou desafio algorítmico.',
      'Apresentação de conceitos de computação em blocos passo a passo pelo professor (Princípio Rosenshine).',
      'Prática guiada no computador ou caderno criando sequências algorítmicas (Técnica Lemov: "Todo mundo escreve").',
      'Trabalho de criação colaborativa do projeto ou interface, trocando feedbacks em pares.',
      'Depuração (correção de erros) compartilhada e demonstração das telas criadas para a turma.'
    ],
    avaliacao: [
      'Entrega funcional do projeto programado ou do protótipo físico (maker).',
      'Domínio dos eixos computacionais (decomposição, abstração, raciocínio lógico) na resolução.',
      'Capacidade de identificar e corrigir falhas lógicas no algoritmo desenvolvido.',
      'Engajamento e cooperação solidária na co-criação dos protótipos e jogos.'
    ],
    acessibilidade: [
      'Uso de blocos visuais de cores chamativas e alto contraste nas telas de programação.',
      'Disponibilização de cartões táteis físicos simulando os blocos de código para alunos sem tela ou com restrição motora.',
      'Apoio individual do professor na modelagem lógica e transposição de ideias abstratas para o algoritmo.',
      'Flexibilização do tempo de entrega permitindo revisões progressivas no projeto.'
    ],
    referencias: [
      'Material Digital de Tecnologia e Inovação (SEDUC-SP).',
      'Diretrizes da CIEB (Centro de Inovação para a Educação Brasileira).',
      'Currículo Paulista e Referencial da BNCC de Tecnologia.',
      'Lemov, Doug. Aula nota 10 3.0: Práticas de aula.',
      'Rosenshine, Barak. Principles of Instruction.'
    ]
  },
  'Orientação de Estudo': {
    unidadeTematica: 'Metacognição, Técnicas de Organização e Auto-regulação',
    objetosConhecimento: 'Planejamento de rotinas, resumos, fichamentos, mapas mentais, preparação para provas.',
    espacoFisico: [
      'Sala de aula organizada de modo silencioso e concentrado para o estudo autônomo.',
      'Acesso à biblioteca escolar ou acervo para as dinâmicas de círculos de leitura.'
    ],
    investigacao: {
      definicao: 'Análise de hábitos e perfis de estudo individuais para aprimoramento contínuo.',
      objetivo: 'Identificar as técnicas mais adequadas de acordo com as afinidades e necessidades pedagógicas.',
      aplicacao: 'A aula inicia-se com a discussão sobre como cada estudante se prepara para as provas, levando-os a investigar de forma crítica seus pontos fortes e suas maiores distrações na rotina de casa.'
    },
    desafios: {
      definicao: 'Resolução sistemática de desafios de leitura rápida, interpretação de enunciados e fichamento cronometrado.',
      objetivo: 'Aprimorar a gestão do tempo, o foco e a retenção de conceitos complexos.',
      aplicacao: 'Os discentes enfrentam o desafio de resumirem em apenas 5 palavras-chave o tema principal de um texto acadêmico sob pressão de tempo (5 minutos), comparando as técnicas de síntese em duplas.'
    },
    maker: {
      definicao: 'Confecção física de organizadores, quadros Kanban e flashcards para memorização ativa.',
      objetivo: 'Materializar a organização escolar e as rotinas de estudo de forma gráfica e dinâmica.',
      aplicacao: 'Utilizando papéis coloridos, post-its e cartões, cada estudante monta seu próprio Painel Kanban de Atividades ("A Fazer", "Fazendo", "Feito") e baralhos de flashcards com perguntas e respostas.'
    },
    centrado: {
      definicao: 'Definição autônoma de rotas de estudo e auto-regulação da aprendizagem baseada nas próprias defasagens.',
      objetivo: 'Garantir o protagonismo do discente ao conduzir sua própria agenda de recuperação e foco.',
      aplicacao: 'Os estudantes escolhem em qual componente curricular concentrar sua prática de estudo orientado da semana, organizando seu roteiro de leitura, fichamento e preenchimento do diário de bordo com as metas.'
    },
    recursos: [
      'Fichas de Orientação GPS de Leitura e Escrita.',
      'Quadro Kanban ou organizadores de rotina semanais (Planner).',
      'Obras literárias indicadas e textos didáticos do acervo escolar.',
      'Plataformas digitais integradas e fichas conceituais.'
    ],
    desenvolvimento: [
      'Alinhamento com o GPS de Leitura e verificação das tarefas acumuladas da semana.',
      'Oficina expositiva em pequenos passos sobre uma técnica de estudo (ex: como construir um mapa mental) conduzida pelo professor.',
      'Estudo individual e focado de leitura ou produção de resumo (Técnica Lemov: "Todo mundo escreve").',
      'Troca e feedback mútuo em duplas, onde um estudante explica o conceito estudado para o outro (Peer Instruction).',
      'Preenchimento da ficha de autoavaliação e organização das próximas tarefas escolares.'
    ],
    avaliacao: [
      'Qualidade, capricho e legibilidade dos resumos, mapas mentais ou fichamentos nos cadernos.',
      'Zelo e consistência na atualização e uso do Planner de estudos ou Kanban.',
      'Capacidade de autoavaliação crítica das próprias facilidades e dificuldades.',
      'Colaboração nas oficinas de estudos dirigidos e no pareamento amigável.'
    ],
    acessibilidade: [
      'Uso de esquemas gráficos, mapas de ideias pré-preenchidos ou áudio-livros para facilitar a leitura.',
      'Instruções dadas em etapas extremamente curtas e simplificadas.',
      'Permissão para uso de organizadores digitais ou uso de cartões táteis para facilitar a ordenação de tarefas.',
      'Orientação individual focada para alunos que necessitam de estratégias diferenciadas de concentração.'
    ],
    referencias: [
      'Material Digital de Orientação de Estudo (SEDUC-SP).',
      'Caderno de Formação de Práticas de Estudo - Inova Educação.',
      'Teoria da Metacognição (John Flavell).',
      'Lemov, Doug. Aula nota 10 3.0.',
      'Rosenshine, Barak. Principles of Instruction.'
    ]
  },
  'Educação Financeira': {
    unidadeTematica: 'Finanças Pessoais, Consumo Consciente e Orçamento Familiar',
    objetosConhecimento: 'Dinheiro, poupança, investimento, juros, análise de consumo e sustentabilidade financeira.',
    espacoFisico: [
      'Sala de aula com carteiras agrupadas para simulações financeiras coletivas.',
      'Uso de laboratório com acesso a simuladores de taxas ou planilhas.'
    ],
    investigacao: {
      definicao: 'Investigação crítica de hábitos de consumo coletivos e individuais.',
      objetivo: 'Compreender a diferença entre necessidades e desejos, avaliando impactos financeiros das escolhas.',
      aplicacao: 'A aula inicia-se com a análise de um anúncio publicitário de alto impacto emocional, levando os discentes a investigarem quais mecanismos psicológicos influenciam as decisões impulsivas de compra.'
    },
    desafios: {
      definicao: 'Resolução de situações-problema financeiras de planejamento familiar e simulação de poupança.',
      objetivo: 'Fomentar raciocínio lógico-matemático aplicado e tomadas de decisão sob escassez de recursos.',
      aplicacao: 'Os estudantes em grupos enfrentam o desafio de equilibrar o orçamento de uma família hipotética, escolhengendo quais cortes realizar diante de um imprevisto (como quebra de eletrodoméstico), justificando matematicamente.'
    },
    maker: {
      definicao: 'Construção física de cofres categorizados (Sonhos de curto, médio e longo prazo) e tabelas visuais.',
      objetivo: 'Materializar o hábito de poupar de forma direcionada, lúdica e planejada.',
      aplicacao: 'Utilizando garrafas plásticas decoradas, a turma confecciona o "Cofre dos Três Sonhos", identificando o valor exato a ser poupado para cada meta individual sob acompanhamento docente.'
    },
    centrado: {
      definicao: 'Desenvolvimento do plano individual de poupança e metas alinhado à realidade do discente.',
      objetivo: 'Dar autonomia para que o estudante desenhe suas metas financeiras reais e rotas de consumo ético.',
      aplicacao: 'Cada aluno elabora de forma autônoma seu plano de poupança.'
    },
    recursos: [
      'Simuladores de orçamento familiar',
      'Material Digital de Educação Financeira (SEDUC-SP)',
      'Planilhas eletrônicas e cadernos'
    ],
    desenvolvimento: [
      'Contextualização das necessidades contra desejos',
      'Apresentação de conceitos de planejamento financeiro',
      'Atividades em grupos de orçamento familiar',
      'Criação de projetos práticos e discussões'
    ],
    avaliacao: [
      'Participação ativa e engajamento nas dinâmicas de orçamento',
      'Qualidade e coerência do plano de poupança elaborado',
      'Entrega do cofre dos sonhos e cartazes'
    ],
    acessibilidade: [
      'Atividades adaptadas com simulações visuais e táteis',
      'Apoio individualizado para cálculos matemáticos',
      'Flexibilização do tempo de execução'
    ],
    referencias: [
      'Material Digital de Educação Financeira (SEDUC-SP).',
      'Caderno de Educação Financeira - Inova Educação.',
      'Lemov, Doug. Aula nota 10 3.0.'
    ]
  }
};

export function buildAvaEfapeDocumentHTML(
  escola: string,
  docente: string,
  segmento: string,
  componente: string,
  serie: string,
  bimestre: string,
  selectedLessons: any[],
  fullWeeks: any[],
  trabalhosDate: string,
  avaliacoesDate: string
) {
  const mapping = SUBJECT_MAPPINGS[componente] || SUBJECT_MAPPINGS[componente.replace(' (Aprofundamento)', '')] || SUBJECT_MAPPINGS['Matemática'];
  
  const espacoFisicoHtml = mapping.espacoFisico.map(e => `<li style="margin-bottom: 2pt;">${e}</li>`).join('');
  const referenciasHtml = mapping.referencias.map(r => `<li style="margin-bottom: 2pt;">${r}</li>`).join('');

  // Generate a separate full plan for each week
  const plansHtml = fullWeeks.map((s, idx) => {
    const rawLessons = s.lessons || [];
    
    // Calculate dynamic lecture quantity and labels
    const numAulas = s.aulas_escopo && s.aulas_escopo !== 'Sem aulas' && s.aulas_escopo !== 'Não se aplica'
      ? s.aulas_escopo.split(',').length 
      : (rawLessons.length > 0 ? rawLessons.length : 0);
    
    const aulasLabel = numAulas === 0 
      ? 'Não se aplica' 
      : numAulas === 1 
        ? 'Aula 1 (1 hora-aula)' 
        : `Aulas ${rawLessons.map((l: any) => l.num || l.aula || '').filter(Boolean).join(', ')} (${numAulas} horas-aula)`;

    // Process titles, contents and skills
    const lessonTitles = rawLessons.map((l: any) => l.titulo).filter(Boolean);
    const lessonContents = rawLessons.map((l: any) => l.conteudo || l.titulo).filter(Boolean);
    
    const cleanWeekTitle = lessonTitles.length > 0 
      ? lessonTitles.join('; ') 
      : (s.conteudos ? s.conteudos.replace(/<[^>]*>/g, '').trim() : 'Revisão e Atividades de Retomada');

    const cleanWeekContents = lessonContents.length > 0 
      ? lessonContents.join('; ') 
      : (s.conteudos ? s.conteudos.replace(/<[^>]*>/g, '').trim() : 'Sistematização de conteúdos essenciais');

    const cleanWeekAE = s.ae
      ? s.ae.replace(/<[^>]*>/g, '').trim().replaceAll('\n', '; ').replace(/^;+|;+$/g, '')
      : 'Desenvolvimento das habilidades prioritárias recomendadas pelo Currículo Paulista';

    // 1. Foco Pedagógico (Rule-based automatic generation based on subject/contents)
    let focoPedagogico = '';
    const compLower = componente.toLowerCase();
    if (compLower.includes('matemática') || compLower.includes('álgebra') || compLower.includes('geometria')) {
      focoPedagogico = `Ensino contextualizado de ${cleanWeekContents}, promovendo a articulação entre as representações conceituais e a resolução de problemas em situações significativas. O foco está em capacitar os estudantes a compreender a equivalência entre diferentes representações numéricas, utilizar raciocínios lógico-abstratos e aplicar estratégias estruturadas para realizar conversões, resolver cálculos e interpretar desafios do cotidiano escolar.`;
    } else if (compLower.includes('português') || compLower.includes('redação') || compLower.includes('leitura') || compLower.includes('língua')) {
      focoPedagogico = `Desenvolvimento da proficiência de leitura, interpretação e escrita reflexiva por meio do estudo estruturado de ${cleanWeekContents}. O foco está no engajamento crítico com gêneros discursivos diversos, na expansão do repertório lexical, na apropriação consciente de recursos morfossintáticos e semânticos e na aplicação prática dessas linguagens em contextos reais de comunicação.`;
    } else if (compLower.includes('tecnologia') || compLower.includes('computação')) {
      focoPedagogico = `Introdução ativa à cultura digital e pensamento computacional focado em ${cleanWeekContents}. Promove a resolução de problemas de forma lógica, estimulando a criatividade na elaboração de mídias e artefatos tecnológicos, a postura ética e cidadã na rede e a compreensão prática do impacto da tecnologia na sociedade moderna.`;
    } else if (compLower.includes('vida') || compLower.includes('socioemocional')) {
      focoPedagogico = `Acolhimento pedagógico e estímulo ao autoconhecimento voltado para ${cleanWeekContents}. Estimula o projeto de vida através de dinâmicas reflexivas sobre aspirações pessoais, responsabilidade cidadã, atitude ética e planejamento estratégico de metas acadêmicas e profissionais de curto e longo prazo.`;
    } else {
      focoPedagogico = `Abordagem integrada de ${cleanWeekContents}, com foco na contextualização das aprendizagens, estimulando a investigação, a argumentação fundamentada, a conexão com vivências práticas e o desenvolvimento da autonomia cognitiva indispensável para a resolução de situações-problema reais.`;
    }

    // 2. Objetivos da Aula
    let cleanWeekObjectives = '';
    const uniqueObjectives = Array.from(new Set(rawLessons.map((l: any) => l.objetivos || '').filter(Boolean)));
    if (uniqueObjectives.length > 0) {
      cleanWeekObjectives = `<ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">` + uniqueObjectives.map(obj => `<li style="margin-bottom: 2pt;">${obj}</li>`).join('') + `</ul>`;
    } else {
      cleanWeekObjectives = `<ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">
        <li style="margin-bottom: 2pt;">Compreender os aspectos conceituais estruturantes de ${cleanWeekTitle};</li>
        <li style="margin-bottom: 2pt;">Identificar a aplicabilidade prática dos conteúdos estudados no contexto escolar e cotidiano;</li>
        <li style="margin-bottom: 2pt;">Aplicar estratégias cognitivas para resolver problemas específicos relacionados à temática.</li>
      </ul>`;
    }

    // 3. Estratégias de Desenvolvimento: Abertura, Desenvolvimento, Encerramento
    const estrategiaAbertura = `O docente inicia a aula contextualizando a temática e relacionando os conteúdos de ${cleanWeekTitle} a situações cotidianas dos alunos. Realiza perguntas geradoras rápidas para resgatar os conhecimentos prévios e mobilizar a atenção coletiva (Técnica Lemov "Todos Juntos"), garantindo um ambiente favorável ao aprendizado ativo.`;
    const estrategiaDesenvolvimento = `Com base nas discussões iniciais, o docente conduz a mediação teórica estruturada em pequenos passos explicativos (Princípio Rosenshine), conectando as habilidades propostas ao Material Digital da Seduc-SP. Em seguida, os estudantes realizam atividades práticas de forma individual ou colaborativa (Técnica Lemov "Todo Mundo Escreve"), resolvendo exercícios e desafios guiados para consolidar a apropriação dos conceitos e aplicação dos procedimentos. O docente circula fornecendo suporte imediato e correções preventivas.`;
    const estrategiaEncerramento = `Retomada coletiva com sistematização dos pontos-chave desenvolvidos durante o período de ${cleanWeekTitle}. O professor esclarece dúvidas recorrentes e estimula os estudantes a realizarem uma breve autoavaliação metacognitiva, consolidando as aprendizagens essenciais estabelecidas para o bimestre corrente.`;

    // 4. Critérios de Avaliação
    const criteriosAvaliacao = `<ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">
      <li style="margin-bottom: 2pt;">Capacidade de compreender e aplicar de forma correta e lógica os conceitos de ${cleanWeekContents};</li>
      <li style="margin-bottom: 2pt;">Precisão, clareza e organização na elaboração das respostas e na resolução de problemas propostos;</li>
      <li style="margin-bottom: 2pt;">Participação ativa, cooperação mútua e cumprimento dos prazos nas tarefas individuais ou de equipe.</li>
    </ul>`;

    // 5. Instrumentos de Avaliação
    const instrumentosAvaliacao = `<ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">
      <li style="margin-bottom: 2pt;">Acompanhamento sistemático e contínuo do engajamento e participação nas discussões orais e fóruns;</li>
      <li style="margin-bottom: 2pt;">Análise detalhada das produções escritas e resoluções de problemas registradas nos cadernos pedagógicos;</li>
      <li style="margin-bottom: 2pt;">Verificação rápida de foco de saída de aula ou exercícios orais guiados rápidos (Técnicas Lemov);</li>
      <li style="margin-bottom: 2pt;">Atividade Verificadora e questionários de consolidação periódica integrados à plataforma.</li>
    </ul>`;

    return `
      <div class="weekly-plan-page" style="page-break-after: ${idx < fullWeeks.length - 1 ? 'always' : 'avoid'}; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; line-height: 1.35; max-width: 29.7cm; margin: 0 auto; box-sizing: border-box; text-align: justify; background: white; padding: 15px; margin-bottom: 25px; border: 1.5px solid #1e293b; border-radius: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        
        <!-- Top Institutional Header -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-family: Cambria, 'Cambria Math', Georgia, serif; border: none; font-size: 11pt;">
          <tr>
            <td style="width: 130px; vertical-align: middle; border: none; padding: 0;">
              <div style="display: flex; align-items: center;">
                <img src="${LOGO_SP_BASE64}" alt="Logo Governo SP" style="width: 125px; height: auto; display: block;" />
              </div>
            </td>
            <td style="vertical-align: middle; border: none; padding: 0; text-align: center;">
              <div style="font-size: 10.5pt; font-weight: bold; line-height: 1.3; text-transform: uppercase; color: #1a1a1a; font-family: Cambria, Georgia, serif;">
                GOVERNO DO ESTADO DE SÃO PAULO &mdash; SECRETARIA DA EDUCAÇÃO
              </div>
              <div style="font-size: 10pt; font-weight: bold; line-height: 1.3; margin-top: 2px; text-transform: uppercase; color: #1b365d; font-family: Cambria, Georgia, serif;">
                AMBIENTE VIRTUAL DE APRENDIZAGEM &mdash; AVA-EFAPE
              </div>
              <div style="font-size: 8.5pt; color: #555555; line-height: 1.2; margin-top: 3px; font-family: Cambria, Georgia, serif;">
                Plano de Aula Semanal Integrado ao Componente Curricular Priorizado
              </div>
            </td>
          </tr>
        </table>

        <!-- SP State Accent Line (Dark Red) -->
        <div style="border-bottom: 2.5px solid #de2728; margin-bottom: 15px; width: 100%;"></div>

        <div style="text-align: center; margin-bottom: 15px;">
          <h2 style="font-size: 13pt; font-weight: bold; text-transform: uppercase; margin: 0; color: #1b365d; letter-spacing: 0.5px;">
            Plano de Aula Semanal &mdash; Período de Realização: ${s.periodo}
          </h2>
          <div style="font-size: 9.5pt; color: #444444; margin-top: 2px; font-style: italic;">Material Oficial de Apoio Pedagógico Seduc-SP (Referencial 2026)</div>
        </div>

        <!-- 1. IDENTIFICAÇÃO TABLE -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 12px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1.5px solid #000000;">
          <tbody>
            <tr style="background-color: #f3f4f6;">
              <td colspan="4" style="border: 1px solid #000000; padding: 6px 10px; font-weight: bold; text-align: center; text-transform: uppercase; font-size: 11pt; color: #111827;">
                Dados de Identificação e Planejamento Semanal
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; width: 25%; background-color: #fafafa;">NOME DA ESCOLA:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; width: 75%;" colspan="3">${escola || '[preencha com os dados da escola na qual você atua]'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">NOME DO PROFESSOR:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px;" colspan="3">${docente || '[preencha com o seu nome]'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Componente Curricular:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; width: 35%;">${componente}</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa; width: 20%;">Etapa:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; width: 20%;">${segmento === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? 'Ensino Fundamental – Anos Finais' : 'Ensino Médio'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Ano/Série:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px;">${serie}</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Bimestre:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px;">${bimestre}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Aula:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px;">${aulasLabel}</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Semana:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px;">Semana ${idx + 1}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-weight: bold; background-color: #fafafa;">Título da Aula:</td>
              <td style="border: 1px solid #000000; padding: 5px 8px; font-style: italic;" colspan="3">
                ${cleanWeekTitle}
                ${s.lessons && s.lessons.some((l: any) => l.num === 999) ? `
                  <div class="no-print" style="margin-top: 6px;">
                    <button class="gemini-prompt-trigger" data-week-idx="${idx}" title="📋 Prompt copiado! Cole no chat do Gemini para criar questões extras prontas de apoio." style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; color: #166534; font-family: sans-serif; font-size: 10px; font-weight: bold; cursor: pointer;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: #15803d;"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
                      Copiar Roteiro de Apoio
                    </button>
                  </div>
                ` : ''}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 2. HABILIDADES -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">HABILIDADES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">${cleanWeekAE}</td>
            </tr>
          </tbody>
        </table>

        <!-- 3. OBJETO DE CONHECIMENTO -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Objeto de Conhecimento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">${cleanWeekContents}</td>
            </tr>
          </tbody>
        </table>

        <!-- 4. FOCO PEDAGÓGICO -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Foco Pedagógico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">${focoPedagogico}</td>
            </tr>
          </tbody>
        </table>

        <!-- 5. OBJETIVOS DA AULA -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Objetivos da Aula</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">${cleanWeekObjectives}</td>
            </tr>
          </tbody>
        </table>

        <!-- 6. APRENDIZAGEM ESSENCIAL -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Aprendizagem Essencial</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">${cleanWeekAE}</td>
            </tr>
          </tbody>
        </table>

        <!-- 7. ESPAÇO FÍSICO OU AMBIENTE DE APRENDIZAGEM -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Espaço físico ou ambiente de aprendizagem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">
                <ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">
                  ${espacoFisicoHtml}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 8. ESTRATÉGIAS DE DESENVOLVIMENTO -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Estratégias de desenvolvimento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.45;">
                <div style="margin-bottom: 8px;">
                  <strong style="color: #1b365d; text-transform: uppercase; font-size: 9.5pt; display: block; margin-bottom: 2px;">&bull; Abertura:</strong>
                  <div style="text-align: justify; text-indent: 12pt;">${estrategiaAbertura}</div>
                </div>
                <div style="margin-bottom: 8px;">
                  <strong style="color: #1b365d; text-transform: uppercase; font-size: 9.5pt; display: block; margin-bottom: 2px;">&bull; Desenvolvimento:</strong>
                  <div style="text-align: justify; text-indent: 12pt;">${estrategiaDesenvolvimento}</div>
                </div>
                <div>
                  <strong style="color: #1b365d; text-transform: uppercase; font-size: 9.5pt; display: block; margin-bottom: 2px;">&bull; Encerramento:</strong>
                  <div style="text-align: justify; text-indent: 12pt;">${estrategiaEncerramento}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 9 & 10. CRITÉRIOS E INSTRUMENTOS DE AVALIAÇÃO -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000; table-layout: fixed;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt; width: 50%;">Critérios de Avaliação</th>
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt; width: 50%;">Instrumentos de Avaliação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4; vertical-align: top;">${criteriosAvaliacao}</td>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4; vertical-align: top;">${instrumentosAvaliacao}</td>
            </tr>
          </tbody>
        </table>

        <!-- 11. REFERÊNCIAS -->
        <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-family: Cambria, Georgia, serif; font-size: 10.5pt; color: black; border: 1px solid #000000;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="border: 1px solid #000000; padding: 5px 8px; text-align: left; font-weight: bold; text-transform: uppercase; font-size: 10pt;">Referências</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #000000; padding: 8px; font-size: 10.5pt; line-height: 1.4;">
                <ul style="margin: 0; padding-left: 14pt; list-style-type: disc;">
                  ${referenciasHtml}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Signatures and Coordinator validation block -->
        <table style="width: 100%; border-collapse: collapse; border: none; font-family: Cambria, Georgia, serif; font-size: 10pt; margin-top: 25px; page-break-inside: avoid;">
          <tr>
            <td style="width: 45%; border: none; padding: 0; text-align: center; vertical-align: top;">
              <div style="margin-bottom: 30px; border-bottom: 1.5px solid #000000; width: 90%; margin-left: auto; margin-right: auto;"></div>
              <strong style="text-transform: uppercase; color: #1e293b; display: block; font-size: 9.5pt;">${docente.toUpperCase() || 'DOCENTE RESPONSÁVEL'}</strong>
              <span style="color: #475569; font-size: 8.5pt;">Assinatura do(a) Professor(a)</span>
            </td>
            <td style="width: 10%; border: none; padding: 0;"></td>
            <td style="width: 45%; border: none; padding: 0; text-align: center; vertical-align: top;">
              <div style="margin-bottom: 30px; border-bottom: 1.5px solid #000000; width: 90%; margin-left: auto; margin-right: auto;"></div>
              <strong style="text-transform: uppercase; color: #1e293b; display: block; font-size: 9.5pt;">Coordenação Pedagógica / Direção</strong>
              <span style="color: #475569; font-size: 8.5pt;">Visto e Validação do Plano &mdash; CGPG</span>
            </td>
          </tr>
        </table>

        <div style="font-size: 8pt; color: #777777; border-top: 1px dashed #cccccc; padding-top: 6px; margin-top: 25px; display: flex; justify-content: space-between;">
          <span>https://avaefape.educacao.sp.gov.br/</span>
          <span>Semana ${idx + 1} &bull; Documento Curricular Escolar Integrado (SEDUC-SP)</span>
        </div>
      </div>
    `;
  }).join('\n');

  return `
    <div style="background: #f1f5f9; padding: 20px 0;">
      ${plansHtml}
    </div>
  `;
}
