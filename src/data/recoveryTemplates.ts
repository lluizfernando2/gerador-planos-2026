import { OFFICIAL_RECOVERY_DATA_2026, RecoveryPdfItem } from './recoveryData2026';
import { LOGO_SP_BASE64 } from './logoSp';

export interface RecoveryPlanInput {
  componente: string;
  ano: string;
  bimestre: string;
  aprendizagemEssencial: string;
  descritores: string;
  aulas: number;
  adaptacaoCurricularOptions?: string[];
  sugestaoMateriais?: string;
  retomadaAprendizagensAnteriores?: string;
}

export interface RecoveryPlanResult {
  title: string;
  ancoragemLegal: string;
  verboComando: string;
  objetoConhecimento: string;
  modificador: string;
  habilidadesRelacionadas: string;
  habilidadesPrevias: string;
  matrizCognitiva: string;
  planoAulas: string;
  itemAvaliacao: string;
  gabarito: string;
  feedbackPedagogico: string;
  adaptacaoCurricular?: string[];
  sugestaoMateriais?: string;
  retomadaAprendizagensAnteriores?: string;
  fullMarkdown: string;
}

export const PRESET_RECOVERY_TEMPLATES: { [key: string]: RecoveryPlanResult } = {
  "tecnologia_7": {
    title: "Plano de Recuperação e Aprofundamento Semestral (Currículo Paulista 2026)",
    ancoragemLegal: `Conforme Resolução SEDUC 42/2024, para estudantes com rendimento abaixo de 5,0 no 1º semestre (1º e 2º Bimestres). Registro de acompanhamento na SED e 'Professor Presente', focando na recomposição de habilidades essenciais e no preparo para a Prova Paulista.`,
    verboComando: "Identificar, descrever e desenvolver (Nível de Bloom: Compreensão / Aplicação)",
    objetoConhecimento: "1º Bimestre: Arquivos compactados (.zip, .rar) | 2º Bimestre: Algoritmos simples, raciocínio lógico e programação em blocos.",
    modificador: "Para compreender a compactação de dados e desenvolver o pensamento computacional por meio de lógica de programação aplicada ao cotidiano.",
    habilidadesRelacionadas: "1º Bimestre: EF07TE02 - Identificar o funcionamento de arquivos compactados e descrever vantagens da compressão de dados.\n2º Bimestre: EF07TE04 - Desenvolver algoritmos de programação simples para solucionar situações cotidianas.",
    habilidadesPrevias: "Noções básicas de pastas e diretórios digitais e ordenação lógica de passos.",
    matrizCognitiva: `| Grupo Cognitivo | 1º Bimestre - Foco (Arquivos) | 2º Bimestre - Foco (Lógica) |
| :--- | :--- | :--- |
| **Grupo 1: Identificar** | Identificar arquivos compactados (.zip) e a redução de espaço em disco. | Reconhecer algoritmo como uma sequência finita de instruções ordenadas. |
| **Grupo 2: Aplicar** | Comparar o tamanho de pastas normais com suas versões compactadas. | Usar blocos de programação visual para criar instruções condicionais (se/então). |
| **Grupo 3: Analisar** | Resolver limites de anexo aplicando compactação de arquivos escolares. | Analisar fluxogramas lógicos, identificar erros e corrigir algoritmos. |`,
    planoAulas: `| Aula | Período / Bimestre | Conteúdo | Metodologia Ativa e Prática de Sala de Aula | Recursos Pedagógicos |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 1º Bimestre | Arquivos Compactados (.zip, .rar) | **Roda de Conversa e Duplas**: Comparação com malas de viagem. Trabalho em duplas com auxílio de estudante monitor. | Material Digital SEDUC-SP, computadores. |
| **2** | 1º Bimestre | Algoritmos e Redução de Bytes | **Estudo Dirigido**: Prática de compactação de pastas com imagens e registro da economia de espaço. | Plataforma Start (Alura), Material Digital. |
| **3** | 1º Bimestre | Transmissão de Dados e Anexos | **Resolução de Problemas**: Desafio de envio de portfólio com limite de tamanho no e-mail. | Material Digital SEDUC-SP, e-mail escolar. |
| **4** | 1º Bimestre | Organização e Revisão | **Rotação por Estações**: Estação 1: Exercício; Estação 2: Desafio teórico; Estação 3: Autoavaliação. | Fichas de exercícios, folha de registro. |
| **5** | 2º Bimestre | Lógica e Algoritmos | **Programação Desplugada**: Elaboração de comandos em papel para guiar um colega em um circuito. | Quadro, fita adesiva, papel. |
| **6** | 2º Bimestre | Programação de Blocos Visuais | **Oficina Prática**: Enigmas de programação em blocos com apoio do professor tutor aos grupos em defasagem. | Plataforma de blocos visuais, computadores. |
| **7** | 2º Bimestre | Decisão Condicional (Se / Senão) | **Estudo de Caso**: Programação de comandos para automação simples (ex: luz de segurança). | Computadores, Material Digital SEDUC-SP. |
| **8** | 2º Bimestre | Consolidação Semestral | **Apresentação de Projetos**: Exposição de algoritmos e autoavaliação dos estudantes. | Rubricas de autoavaliação, Material Digital. |`,
    itemAvaliacao: `**Questão 1 (1º Bimestre - Compressão de Arquivos)**
**Enunciado:** Durante uma aula no Laboratório de Tecnologia, um grupo de alunos do 7º ano precisa enviar o projeto semestral contendo fotos e relatórios de texto para o e-mail do professor. Contudo, ao tentar anexar os arquivos individualmente, o sistema exibe uma mensagem de erro informando que o limite de 25 MB do anexo foi excedido, pois a soma total dos arquivos originais é de 48 MB.
Considerando os conceitos de armazenamento e transmissão de dados do Currículo Paulista, qual ação técnica soluciona esse problema para que enviem todos os arquivos de uma vez com segurança?
A) Copiar e colar todos os textos brutos de uma única vez no corpo do e-mail para burlar as medições de tamanho em MB de anexo.
B) Reunir todos os arquivos originais em uma única pasta digital do sistema operacional e utilizar a ferramenta padrão para compactá-la no formato ZIP.
C) Excluir metade das fotos do projeto para reduzir à força o tamanho total, comprometendo o escopo pedagógico da entrega.
D) Alterar de forma literal o nome das extensões de todas as imagens de .jpg para .zip sem aplicar nenhum software de compressão.

**Questão 2 (2º Bimestre - Lógica de Programação)**
**Enunciado:** No desenvolvimento de um algoritmo em blocos visuais de programação, um aluno deseja criar um sistema simples de segurança escolar que decide se uma lâmpada externa deve acender ou apagar. A regra lógica é: se o sensor de luminosidade detectar que está escuro, a lâmpada acende; caso contrário (se estiver claro), a lâmpada apaga.
Para estruturar essa sequência lógica perfeitamente de acordo com os conceitos de algoritmos estudados em Tecnologia e Inovação, qual estrutura condicional deve ser empregada?
A) Uma instrução de loop repetitivo infinito (como "Repita 10 vezes") sem testar nenhuma variável de luminosidade.
B) Uma estrutura de tomada de decisão condicional do tipo "Se (Sensor detecta escuro) Então (Lâmpada acende) Senão (Lâmpada apaga)".
C) Um comando de desligamento geral do computador para que a lâmpada seja controlada de forma puramente manual por um interruptor externo.
D) Uma linha única de atribuição de variável de texto indefinido que não executa testes lógicos sobre as condições do sensor.`,
    gabarito: "Questão 1: B | Questão 2: B",
    feedbackPedagogico: `- **Questão 1 - Justificativa da Alternativa Correta (B)**: A compactação reúne múltiplos elementos digitais em um só recipiente reduzindo o seu tamanho total em bytes (compressão de dados) sem perder nenhuma informação, permitindo que a pasta fique abaixo do limite de anexo e seja enviada perfeitamente (habilidade EF07TE02).
- **Questão 2 - Justificativa da Alternativa Correta (B)**: A estrutura condicional "Se/Então/Senão" é o mecanismo computacional adequado para a tomada de decisão em fluxogramas e códigos de bloco, bifurcando o fluxo de execução baseado na veracidade da condição testada (habilidade EF07TE04).
- **Análise dos Distratores (Questão 1)**: A alternativa A não reduz bytes reais e causará erro de tamanho de corpo; a alternativa C destrói conteúdo didático desnecessariamente; a alternativa D apenas corrompe as imagens porque mudar o nome da extensão não comprime seus dados internos.
- **Análise dos Distratores (Questão 2)**: A alternativa A gerará um loop sem sentido sem tomada de decisão; as alternativas C e D anulam a automação inteligente pretendida pelo algoritmo, descaracterizando o pensamento computacional.`,
    fullMarkdown: ""
  },
  "filosofia_1": {
    title: "Plano de Recuperação e Aprofundamento Semestral (Currículo Paulista 2026)",
    ancoragemLegal: `Fundamentado formalmente na Resolução SEDUC 42/2024 para recuperação semestral e recomposição de competências da Formação Geral Básica de Ciências Humanas (Filosofia), exigindo foco contínuo e integrado nos descritores avaliados de forma contínua na SED e no sistema 'Professor Presente'. Estrutura-se para abranger as aprendizagens prioritárias do 1º Semestre Letivo de 2026, integrando de maneira coesa o 1º e o 2º Bimestres letivos, preparando o estudante para a consolidação das avaliações escolares e da Prova Paulista.`,
    verboComando: "Identificar, analisar e discutir (Nível de Bloom: Análise / Avaliação)",
    objetoConhecimento: "1º Bimestre: Transição do mito ao logos, atitude filosófica e conceito estético do belo e feio | 2º Bimestre: Teoria do conhecimento (Racionalismo vs Empirismo).",
    modificador: "Para desconstruir preconceitos e visões dogmáticas baseadas no senso comum, articulando argumentos lógicos e racionais fundamentados histórica e criticamente no contexto do Ensino Médio.",
    habilidadesRelacionadas: "1º Bimestre: EM13CHS101 - Identificar, analisar e discutir circunstâncias de matrizes conceituais estéticas e filosóficas de diferentes épocas.\n2º Bimestre: EM13CHS102 - Identificar e analisar as lógicas de argumentação e contradições internas em discursos, contrapondo racionalismo e empirismo.",
    habilidadesPrevias: "Habilidades de leitura analítica, distinção entre fatos e opiniões e elaboração de argumentos estruturados no Ensino Fundamental. Ativação prática: o professor expõe uma propaganda moderna repleta de retórica e um mito clássico, questionando onde termina a opinião ingênua e onde começa o pensar crítico.",
    matrizCognitiva: `| Grupo Cognitivo | 1º Bimestre - Foco de Intervenção (Mito/Estética) | 2º Bimestre - Foco de Intervenção (Conhecimento) |
| :--- | :--- | :--- |
| **Grupo 1: Reconhecer / Identificar** | Reconhecer as características da explicação mitológica em contraste com as explicações racionais e conceituar o belo subjetivo. | Identificar as premissas centrais da Teoria do Conhecimento e a diferença básica entre razão e experiência. |
| **Grupo 2: Aplicar / Comparar** | Comparar padrões de beleza de diferentes marcos temporais para identificar a mutabilidade dos juízos estéticos. | Comparar as teses fundamentais do Racionalismo Cartesiano com as do Empirismo de John Locke. |
| **Grupo 3: Analisar / Resolver Problemas** | Analisar e argumentar contra preconceitos ou discursos dogmáticos modernos utilizando conceitos estéticos e filosóficos consolidados. | Analisar contradições em discursos de autoridade ou fake news contemporâneas, aplicando critérios de validação lógica racional. |`,
    planoAulas: `| Aula | Período / Bimestre | Objeto de Estudo (Conteúdo) | Metodologia Ativa e Prática de Sala de Aula | Recursos Pedagógicos |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 1º Bimestre | Do Mito ao Lógos: A Atitude Filosófica | **Estudo de Caso Dialogado**: Leitura comparativa da Teogonia e de fragmentos pré-socráticos. Trabalho em duplas de proficiência alternada. O **Aluno Monitor do BEEM** orienta a identificação de argumentos. | Slides do Material Digital SEDUC-SP, textos pré-socráticos. |
| **2** | 1º Bimestre | Estética: O Conceito do Belo e do Feio | **Rotação por Estações**: Estação A: Estátuas clássicas; Estação B: Obras modernas; Estação C: Imagens de redes sociais. Alunos debatem a relatividade do gosto estético. | Slides oficiais SEDUC-SP, Caderno do Estudante, reproduções de arte. |
| **3** | 1º Bimestre | A Ditadura da Beleza nas Redes Sociais | **Debates Socráticos Estruturados**: Discussão pautada em trios sobre os padrões estéticos comerciais modernos, exercitando o raciocínio crítico socrático e desconstruindo o senso comum. | Slides do Material Digital SEDUC-SP, recortes de revistas e redes. |
| **4** | 1º Bimestre | Prática de Síntese Crítica e Autoavaliação | **Produção de Fanzine Filosófico**: Elaboração individual de uma página contendo uma crítica ilustrada e argumentada sobre juízo de gosto. Autoavaliação com base em rubricas de proficiência. | Papel, lápis de cor, Slides do Material Digital SEDUC-SP. |
| **5** | 2º Bimestre | Teoria do Conhecimento: O que podemos saber? | **Metodologia de Tempestade de Ideias**: Provocações socráticas iniciais sobre a ilusão dos sentidos e a busca pela verdade objetiva. Organização dos grupos de recomposição. | Slides do Material Digital SEDUC-SP, lousa, notas conceituais. |
| **6** | 2º Bimestre | O Racionalismo Cartesiano e a Dúvida Metódica | **Análise de Texto Filosófico**: Estudo dirigido das "Meditações Metafísicas" de Descartes. O **Professor Tutor** atua dando suporte para a interpretação de jargões abstratos. | Slides oficiais do Material Digital SEDUC-SP, trechos de Descartes. |
| **7** | 2º Bimestre | O Empirismo de Locke e a Mente como Tábula Rasa | **Atividade Laboratorial Prática**: Simulação de conceitos empíricos baseada em dados sensoriais. Debate em trios contrastando as ideias inatas com a aquisição sensorial de dados. | Slides do Material Digital SEDUC-SP, objetos sensoriais diversos. |
| **8** | 2º Bimestre | Consolidação de Teoria do Conhecimento e Síntese | **Painel Integrado de Argumentação**: Estudantes redigem um texto refutando discursos dogmáticos ou boatos falsos modernos utilizando as regras do empirismo científico e do racionalismo analítico. | Slides do Material Digital SEDUC-SP, guias de redação argumentativa. |`,
    itemAvaliacao: `**Questão 1 (1º Bimestre - Estética e Filosofia)**
**Enunciado:** O filósofo Platão concebia o Belo como uma ideia universal, perfeita e imutável que residia no Mundo das Ideias. Por outro lado, no século XVIII, o filósofo empirista David Hume defendeu que a beleza não está nos objetos em si, mas na mente do próprio observador, variando conforme a sensibilidade e a vivência de cada sujeito.
Considerando esse contraste estético do Currículo Paulista, assinale a alternativa que descreve a atitude de reflexão filosófica diante dos fortes padrões estéticos promovidos massivamente na internet:
A) Adotar os filtros digitais de beleza de forma passiva, enxergando-os como a mais pura manifestação física da verdade platônica.
B) Ignorar discussões estéticas por considerá-las superficiais e desprovidas de relevância política ou psicológica sobre as comunidades.
C) Questionar a suposta universalidade dos padrões estéticos modernos e analisar criticamente como pressões de consumo e de imagem moldam os gostos individuais.
D) Declarar que apenas as estátuas gregas antigas representam a arte correta, invalidando todas as demais expressões culturais contemporâneas.

**Questão 2 (2º Bimestre - Racionalismo vs Empirismo)**
**Enunciado:** Na busca por fundamentar o conhecimento verdadeiro e superar o ceticismo, René Descartes propôs o racionalismo cartesiano, afirmando que a razão pura, baseada em ideias inatas, é a fonte confiável da verdade (método dedutivo). Em contrapartida, John Locke defendeu o empirismo, sustentando que a mente humana nasce vazia (uma "tábula rasa") e que todo conhecimento é adquirido estritamente através dos sentidos e da experiência acumulada (método indutivo).
Analise o conflito epistemológico dessas matrizes do Currículo Paulista e identifique o procedimento adequado para validar cientificamente uma informação em saúde pública hoje:
A) Aceitar boatos de redes sociais sem comprovação, pois a crença subjetiva do indivíduo supera qualquer teste lógico ou dado de laboratório.
B) Reunir evidências empíricas obtidas por observações e testes controlados (Locke) e processá-las sob rigorosa consistência matemática e dedutiva da razão (Descartes).
C) Desprezar a utilidade do método científico experimental, confiando apenas nas revelações dogmáticas de autoridades antigas da medicina grega.
D) Concluir que é impossível conhecer qualquer verdade no mundo real, abandonando as pesquisas científicas e agindo com base em superstições locais.`,
    gabarito: "Questão 1: C | Questão 2: B",
    feedbackPedagogico: `- **Questão 1 - Justificativa da Alternativa Correta (C)**: A atitude filosófica caracteriza-se pela interrogação das verdades prontas do senso comum. Analisar criticamente as construções sociais do gosto e os impactos do ideal de beleza mercantilizado exercita a autonomia intelectual do estudante de Filosofia (habilidade EM13CHS101).
- **Questão 2 - Justificativa da Alternativa Correta (B)**: A ciência moderna unifica a postulação empirista da coleta de dados de observação rigorosa com o processamento lógico-racional e dedutivo matemático, demonstrando como racionalismo e empirismo se combinam no método científico moderno (habilidade EM13CHS102).
- **Análise dos Distratores (Questão 1)**: As alternativas A e D representam visões dogmáticas acríticas avessas ao debate filosófico socrático, enquanto a alternativa B nega a importância social profunda de como a estética regula corpos e comportamentos na contemporaneidade.
- **Análise dos Distratores (Questão 2)**: As alternativas A, C e D ignoram o rigor exigido pelo Currículo Paulista para formação do pensamento crítico científico, estimulando o negacionismo, a inércia intelectual ou o descaso metodológico.`,
    fullMarkdown: ""
  },
  "matematica_9": {
    title: "Plano de Recuperação e Aprofundamento Semestral (Currículo Paulista 2026)",
    ancoragemLegal: `Formulado formalmente em concordância com os preceitos da Resolução SEDUC 42/2024 para recuperação pedagógica semestral contínua e recomposição de proficiências básicas em Matemática. Garante intervenção pedagógica focalizada, com registros digitais na SED e no sistema 'Professor Presente' (Resolução SEDUC 140/2025). Estruturado para o calendário integrado do 1º Semestre Letivo de 2026 (02/02 a 03/07), englobando o 1º e o 2º Bimestres, com foco na consolidação de habilidades críticas avaliadas na Prova Paulista.`,
    verboComando: "Resolver, elaborar e aplicar (Nível de Bloom: Aplicação / Análise)",
    objetoConhecimento: "1º Bimestre: Cálculos de potenciação, radiciação com números racionais | 2º Bimestre: Aplicação do Teorema de Pitágoras e equações polinomiais do 2º grau.",
    modificador: "Para solucionar problemas práticos e teóricos do cotidiano envolvendo cálculo de áreas, diagonal de terrenos, dimensões lineares e relações de potência no padrão de proficiência da Prova Paulista.",
    habilidadesRelacionadas: "1º Bimestre: EF09MA01 - Resolver e elaborar problemas com números reais, envolvendo cálculos de potenciação e radiciação com números racionais.\n2º Bimestre: EF09MA09 - Resolver e elaborar problemas que envolvam equações do 2º grau ou relações métricas do triângulo retângulo, inclusive o teorema de Pitágoras.",
    habilidadesPrevias: "Cálculos básicos de multiplicação, raiz quadrada elementar de números naturais e perímetro. Ativação prática: o professor desenha um triângulo retângulo na lousa mostrando que os catetos de tamanhos 3 e 4 sempre dão uma hipotenusa de tamanho 5, demonstrando fisicamente a validade de potências e áreas de quadrados.",
    matrizCognitiva: `| Grupo Cognitivo | 1º Bimestre - Foco de Intervenção (Potência/Raiz) | 2º Bimestre - Foco de Intervenção (Pitágoras/Eq) |
| :--- | :--- | :--- |
| **Grupo 1: Reconhecer / Identificar** | Identificar a base e o expoente de uma potência e reconhecer uma raiz quadrada exata. | Identificar os catetos e a hipotenusa em triângulos retângulos e reconhecer coeficientes da equação de 2º grau. |
| **Grupo 2: Aplicar / Comparar** | Aplicar as propriedades fundamentais das potências e efetuar cálculos simples de radiciação com frações. | Aplicar o Teorema de Pitágoras para descobrir medidas desconhecidas de hipotenusa e catetos. |
| **Grupo 3: Analisar / Resolver Problemas** | Resolver problemas complexos de área quadrada e notação científica associando potência e radiciação real. | Resolver problemas práticos modelando equações de 2º grau ou calculando diagonais de terrenos no modelo da Prova Paulista. |`,
    planoAulas: `| Aula | Período / Bimestre | Objeto de Estudo (Conteúdo) | Metodologia Ativa e Prática de Sala de Aula | Recursos Pedagógicos |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 1º Bimestre | Potenciação e propriedades operatórias de números reais | **Aula Prática Ativa**: Uso do Material Digital oficial. Jogo de correspondência em duplas de cartões de base e expoente. O **Aluno Monitor do BEEM** orienta os alunos na memorização das potências comuns. | Slides do Material Digital SEDUC-SP, cartões de associação de potências. |
| **2** | 1º Bimestre | Radiciação e cálculo de áreas de figuras quadradas | **Estudo Dirigido em Duplas**: Estudantes descobrem lados de terrenos quadrados calculando a raiz quadrada exata e aproximada das áreas. O professor circula auxiliando no raciocínio. | Slides oficiais SEDUC-SP, papel milimetrado para esboços. |
| **3** | 1º Bimestre | Expressões Numéricas complexas com Potências | **Oficina Digital Matific**: Resolução de pequenos jogos e desafios digitais sobre potências de expoentes negativos e frações. O **Professor Tutor** dá suporte prioritário às maiores defasagens. | Plataforma **Matific** (módulo 9º ano recomposição), computadores escolares. |
| **4** | 1º Bimestre | Consolidação de Radicais e Autoavaliação | **Resolução Cooperativa de Exercícios**: Alunos resolvem em trios problemas de simplificação de radicais, seguidos de autoavaliação guiada com folha de rubricas. | Slides do Material Digital SEDUC-SP, fichas de autoavaliação. |
| **5** | 2º Bimestre | O Triângulo Retângulo e as Relações Métricas | **Medição Prática no Pátio**: Estudantes em trios usam trenas de medição para desenhar triângulos no chão, validando empiricamente o ângulo reto e as projeções de sombra. | Trenas e fitas adesivas para pátio escolar, caderno de anotações. |
| **6** | 2º Bimestre | O Teorema de Pitágoras Aplicado a Rampas e Diagonais | **Aprendizagem Baseada em Desafios (PBL)**: Resolução de situações de acessibilidade (cálculo de inclinação de rampas escolares) usando trena e aplicando a fórmula clássica a² = b² + c². | Slides do Material Digital SEDUC-SP, calculadora simples, lousa. |
| **7** | 2º Bimestre | Equações de 2º Grau e Resolução por Bhaskara | **Oficina Prática Dirigida**: Modelagem algébrica de áreas retangulares de jardins, chegando à equação quadrática ax² + bx + c = 0 e calculando as raízes reais correspondentes. | Computadores escolares (Plataforma Matific ou calculadora de Bhaskara). |
| **8** | 2º Bimestre | Consolidação Semestral e Feedback de Recomposição | **Mapeamento e Painel de Erros**: Alunos analisam questões anteriores da Prova Paulista em pequenos painéis, compreendendo os erros comuns de cálculo e registrando os acertos finais. | Questões impressas da Prova Paulista, Slides oficiais SEDUC-SP. |`,
    itemAvaliacao: `**Questão 1 (1º Bimestre - Potenciação e Radiciação)**
**Enunciado:** Um terreno de formato quadrado possui uma área total registrada na prefeitura escolar de exatamente 144 metros quadrados. O professor de Matemática solicita que um grupo de estudantes calcule o comprimento total de cerca necessário para cercar inteiramente apenas três lados desse lote quadrado de terra.
Considerando os conceitos de radiciação e potenciação do Currículo Paulista, assinale o valor exato a ser calculado para o projeto:
A) 12 metros
B) 36 metros
C) 48 metros
D) 144 metros

**Questão 2 (2º Bimestre - Teorema de Pitágoras)**
**Enunciado:** Um arquiteto está projetando uma rampa retilínea de concreto para garantir acessibilidade universal ao palco de uma escola estadual de São Paulo. A altura vertical do solo até o palco é de exatamente 3 metros. Para atender às regras de acessibilidade e inclinação segura, o projeto estabelece que a distância horizontal do início da rampa até a base de apoio do palco no chão seja de exatamente 4 metros.
De acordo com as diretrizes métricas do triângulo retângulo e do Teorema de Pitágoras preconizados no Currículo Paulista de Matemática, qual deve ser o comprimento total da rampa (hipotenusa) de concreto a ser construída?
A) 5 metros
B) 7 metros
C) 12 metros
D) 25 metros`,
    gabarito: "Questão 1: B | Questão 2: A",
    feedbackPedagogico: `- **Questão 1 - Justificativa da Alternativa Correta (B)**: A área de um quadrado é dada por lado ao quadrado (L² = 144). Para achar a medida linear de um único lado, calculamos a raiz quadrada de 144 (L = √144 = 12 metros). Se os alunos precisam cercar exatamente 3 lados do terreno, calculamos a multiplicação aritmética simples: 3 x 12 = 36 metros (habilidade EF09MA01).
- **Questão 2 - Justificativa da Alternativa Correta (A)**: O triângulo retângulo possui catetos medindo 3 metros (vertical) e 4 metros (horizontal). Pelo Teorema de Pitágoras: a² = b² + c² => a² = 3² + 4² => a² = 9 + 16 => a² = 25 => a = √25 = 5 metros de comprimento total de rampa (habilidade EF09MA09).
- **Análise dos Distratores (Questão 1)**: A alternativa A representa apenas a medida de um único lado do lote; a alternativa C representa o perímetro total de todos os quatro lados do quadrado; a alternativa D confunde a medida de perímetro linear com a área de superfície bruta informada.
- **Análise dos Distratores (Questão 2)**: A alternativa B resulta da soma aritmética direta incorreta dos catetos (3 + 4 = 7); a alternativa C é o produto direto simples (3 x 4 = 12) que ignora a fórmula de Pitágoras; a alternativa D representa o quadrado da hipotenusa (25) esquecendo-se da extração final da raiz.`,
    fullMarkdown: ""
  }
};

function normalizeString(s: string): string {
  return s.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

export function matchOfficialRecoveryItem(componente: string, ano: string, bimester: string): RecoveryPdfItem | null {
  const normComp = normalizeString(componente);
  const normAno = normalizeString(ano);
  const normBim = normalizeString(bimester);

  const compKey = Object.keys(OFFICIAL_RECOVERY_DATA_2026).find(k => {
    const nk = normalizeString(k);
    return nk.includes(normComp) || normComp.includes(nk);
  });
  if (!compKey) return null;

  const grades = OFFICIAL_RECOVERY_DATA_2026[compKey];
  const gradeKey = Object.keys(grades).find(g => {
    const ng = normalizeString(g);
    return ng.includes(normAno) || normAno.includes(ng);
  });
  if (!gradeKey) return null;

  const bimestres = grades[gradeKey];
  let bimKey = Object.keys(bimestres).find(b => {
    const nb = normalizeString(b);
    return nb.includes(normBim) || normBim.includes(nb);
  });
  if (!bimKey) {
    bimKey = Object.keys(bimestres)[0];
  }
  if (!bimKey) return null;

  const items = bimestres[bimKey];
  if (items && items.length > 0) {
    return items[0];
  }
  return null;
}

export function generateCustomRecoveryPlan(input: RecoveryPlanInput): RecoveryPlanResult {
  // Normalize parameters to fetch the 1st and 2nd bimester items
  const normComp = normalizeString(input.componente);
  const normAno = normalizeString(input.ano);

  const compKey = Object.keys(OFFICIAL_RECOVERY_DATA_2026).find(k => {
    const nk = normalizeString(k);
    return nk.includes(normComp) || normComp.includes(nk);
  });

  let itemBim1: RecoveryPdfItem | null = null;
  let itemBim2: RecoveryPdfItem | null = null;

  if (compKey) {
    const grades = OFFICIAL_RECOVERY_DATA_2026[compKey];
    const gradeKey = Object.keys(grades).find(g => {
      const ng = normalizeString(g);
      return ng.includes(normAno) || normAno.includes(ng);
    });

    if (gradeKey) {
      const bimesteres = grades[gradeKey];
      // 1º Bimestre
      const b1 = Object.keys(bimesteres).find(b => normalizeString(b).includes("1"));
      if (b1 && bimesteres[b1] && bimesteres[b1].length > 0) {
        itemBim1 = bimesteres[b1][0];
      }
      // 2º Bimestre
      const b2 = Object.keys(bimesteres).find(b => normalizeString(b).includes("2"));
      if (b2 && bimesteres[b2] && bimesteres[b2].length > 0) {
        itemBim2 = bimesteres[b2][0];
      }
    }
  }

  const compLower = input.componente.toLowerCase();

  const cleanVerificadora = (text: string) => {
    return text.replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, "")
               .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, "")
               .replace(/:\s*$/, "")
               .trim();
  };

  const toBulletedList = (label: string, text: string) => {
    const cleaned = cleanVerificadora(text);
    // Split by common delimiters like '|', ';', or commas if they separate topics
    const topics = cleaned.split(/[,;|•\n]+/).map(t => t.trim()).filter(Boolean);
    if (topics.length > 0) {
      return `${label}:\n` + topics.map(t => `  • ${t}`).join('\n');
    }
    return "";
  };

  const toHabilidadeBulletedList = (label: string, text: string) => {
    // Split abilities by newlines or semicolons
    const topics = text.split(/[\n;]+/).map(t => t.trim()).filter(Boolean);
    if (topics.length > 0) {
      return `${label}:\n` + topics.map(t => `  • ${t}`).join('\n');
    }
    return "";
  };

  // Combine Objeto de Conhecimento from both bimesters
  let objetoConhecimento = "";
  if (itemBim1 && itemBim2) {
    objetoConhecimento = toBulletedList("1º Bimestre", itemBim1.conteudo) + "\n" + toBulletedList("2º Bimestre", itemBim2.conteudo);
  } else if (itemBim1) {
    objetoConhecimento = toBulletedList("1º Bimestre", itemBim1.conteudo);
  } else if (itemBim2) {
    objetoConhecimento = toBulletedList("2º Bimestre", itemBim2.conteudo);
  } else {
    const parts = input.aprendizagemEssencial.split(/\n/);
    if (parts.length > 1) {
      objetoConhecimento = toBulletedList("1º Bimestre", parts[0]) + "\n" + toBulletedList("2º Bimestre", parts[1]);
    } else {
      objetoConhecimento = toBulletedList("1º e 2º Bimestres", input.aprendizagemEssencial);
    }
  }

  // Combined Habilidades Relacionadas
  let habilidadeRel = "";
  if (itemBim1 && itemBim2) {
    habilidadeRel = toHabilidadeBulletedList("1º Bimestre", itemBim1.habilidade) + "\n" + toHabilidadeBulletedList("2º Bimestre", itemBim2.habilidade);
  } else if (itemBim1) {
    habilidadeRel = toHabilidadeBulletedList("1º Bimestre", itemBim1.habilidade);
  } else if (itemBim2) {
    habilidadeRel = toHabilidadeBulletedList("2º Bimestre", itemBim2.habilidade);
  } else {
    const parts = input.descritores.split(/\n/);
    if (parts.length > 1) {
      habilidadeRel = toHabilidadeBulletedList("1º Bimestre", parts[0]) + "\n" + toHabilidadeBulletedList("2º Bimestre", parts[1]);
    } else {
      habilidadeRel = toHabilidadeBulletedList("1º e 2º Bimestres", input.descritores);
    }
  }

  // Verb of command
  let verbComando = "Diferenciar, aplicar e resolver (Nível de Bloom: Análise / Aplicação)";
  if (itemBim1 || itemBim2) {
    let v1 = "Identificar";
    let v2 = "Analisar";
    if (itemBim1) {
      const cleanHab1 = itemBim1.habilidade.replace(/^([A-Z0-9-]+\s*[-—]?\s*)/, "").trim();
      const words1 = cleanHab1.split(" ");
      if (words1.length > 0) v1 = words1[0].replace(/[,;.:]/g, "");
    }
    if (itemBim2) {
      const cleanHab2 = itemBim2.habilidade.replace(/^([A-Z0-9-]+\s*[-—]?\s*)/, "").trim();
      const words2 = cleanHab2.split(" ");
      if (words2.length > 0) v2 = words2[0].replace(/[,;.:]/g, "");
    }
    verbComando = `${v1} (1º Bimestre) e ${v2} (2º Bimestre) – Alinhado ao Currículo Paulista`;
  }

  const descritorFoco1 = itemBim1 ? itemBim1.conteudo : (objetoConhecimento.split("|")[0] || objetoConhecimento);
  const descritorFoco2 = itemBim2 ? itemBim2.conteudo : (objetoConhecimento.split("|")[1] || objetoConhecimento);

  const modificador = `Para aplicar, compreender, comparar e resolver situações-problema associadas aos eixos estruturantes do 1º Semestre de 2026, com foco na superação de lacunas aferidas pela Prova Paulista.`;
  const habilidadesPrevias = `Habilidades de suporte dos anos escolares anteriores relacionadas aos conteúdos essenciais de ${descritorFoco1} (1º Bimestre) e ${descritorFoco2} (2º Bimestre). Ativação prática: realização de quizzes interativos rápidos, retomada de tabelas analógicas de dados e contextualizações do cotidiano no início de cada semana de estudo.`;

  // Dynamic integrated cognitive matrix
  const matrizCognitiva = `| Grupo Cognitivo | 1º Bimestre - Foco de Intervenção | 2º Bimestre - Foco de Intervenção |
| :--- | :--- | :--- |
| **Grupo 1: Reconhecer / Identificar** | Reconhecer termos teóricos, definições elementares e vocabulários técnicos associados a **${descritorFoco1}**. | Identificar as características básicas, representações gráficas ou esquemáticas de **${descritorFoco2}**. |
| **Grupo 2: Aplicar / Comparar** | Aplicar as definições estruturadas para resolver problemas de proficiência básica e fazer comparações com o cotidiano de **${descritorFoco1}**. | Comparar cenários de dados reais ou científicos correlacionando regras conceituais e operações práticas de **${descritorFoco2}**. |
| **Grupo 3: Analisar / Resolver Problemas** | Analisar dados, extrair inferências críticas profundas de textos ou fórmulas e resolver problemas novos associando **${descritorFoco1}**. | Elaborar modelos explicativos ou esquemas lógicos estruturados e solucionar problemas complexos padrão Prova Paulista sobre **${descritorFoco2}**. |`;

  // Build sequential lessons based on the total classes (e.g. 4, 6, 8, 10)
  let planoAulas = `| Aula | Período / Bimestre | Objeto de Estudo (Conteúdo) | Metodologia Ativa e Prática de Sala de Aula | Recursos Pedagógicos |
| :--- | :--- | :--- | :--- | :--- |
`;

  const totalAulas = input.aulas || 8;
  const aulasBim1 = Math.ceil(totalAulas / 2);
  const aulasBim2 = totalAulas - aulasBim1;

  const revisaoList1 = (itemBim1 && itemBim1.revisaoAulas && itemBim1.revisaoAulas.length > 0)
    ? itemBim1.revisaoAulas
    : [descritorFoco1];
  const revisaoList2 = (itemBim2 && itemBim2.revisaoAulas && itemBim2.revisaoAulas.length > 0)
    ? itemBim2.revisaoAulas
    : [descritorFoco2];

  for (let a = 1; a <= totalAulas; a++) {
    const isBim1 = a <= aulasBim1;
    const bimLabel = isBim1 ? "1º Bimestre" : "2º Bimestre";
    const revList = isBim1 ? revisaoList1 : revisaoList2;
    const currentBimAulaIdx = isBim1 ? (a - 1) : (a - aulasBim1 - 1);
    const totalBimAulas = isBim1 ? aulasBim1 : aulasBim2;

    const revIdx = Math.min(Math.floor(currentBimAulaIdx / (totalBimAulas / revList.length)), revList.length - 1);
    const revClass = revList[revIdx];

    let grupo = "Grupo 1 (Reconhecer / Identificar)";
    let metod = `**Ancoragem Prática**: Levantamento de ideias prévias e conexões cotidianas com o tema de **${revClass}** em duplas de proficiência diversificada. O **Aluno Monitor do BEEM** fornece apoio orientador aos colegas com dificuldades.`;

    const ratio = (currentBimAulaIdx + 1) / totalBimAulas;
    if (ratio > 0.7) {
      grupo = "Grupo 3 (Analisar / Resolver)";
      metod = `**Metodologia Baseada em Desafios (PBL)**: Resolução de situações complexas de **${revClass}** no modelo de complexidade cognitiva da Prova Paulista, com apoio ativo e mediação individual do **Professor Tutor**.`;
    } else if (ratio > 0.3) {
      grupo = "Grupo 2 (Aplicar / Comparar)";
      metod = `**Estudo de Caso Prático**: Investigação coletiva de dados, análise de tabelas ou textos e aplicação de fórmulas e regras conceituais em grupos de cooperação para desenvolver a autonomia intelectual.`;
    }

    planoAulas += `| **${a}** | ${bimLabel} | Recomposição: ${revClass} | ${metod} | Slides do Material Digital SEDUC-SP, Caderno do Estudante. |\n`;
  }

  // Create two distinct evaluation items
  const q1 = getBimesterQuestion(compLower, descritorFoco1, "1º Bimestre");
  const q2 = getBimesterQuestion(compLower, descritorFoco2, "2º Bimestre");

  const itemAvaliacao = `${q1.itemText}\n\n---\n\n${q2.itemText}`;
  const gabarito = "Questão 1: B | Questão 2: B";

  const feedbackPedagogico = `### **Questão 1 (1º Bimestre - ${descritorFoco1})**
- **Justificativa da alternativa correta (B)**: ${q1.feedbackCorrect}
- **Análise do distrator A**: Confiar apenas em especulação ingênua ou achismo carece do rigor científico e metodológico do Material Digital e das diretrizes curriculares do Estado.
- **Análise do distrator C**: O palpite desatento impossibilita diagnosticar com precisão a proficiência, tratando-se de uma postura inadequada diante de exames formativos importantes.
- **Análise do distrator D**: A teoria curricular fornece o suporte cognitivo e prático essencial para instrumentalizar o aluno no cotidiano pessoal e comunitário.

### **Questão 2 (2º Bimestre - ${descritorFoco2})**
- **Justificativa da alternativa correta (B)**: ${q2.feedbackCorrect}
- **Análise do distrator A**: Resoluções irracionais e sem critérios anulam o desenvolvimento da lógica reflexiva de recomposição de defasagem de aprendizagem.
- **Análise do distrator C**: Abandonar os métodos formais em prol de palpites aleatórios compromete diretamente o desempenho no currículo paulista de 2026.
- **Análise do distrator D**: Negar a relevância pedagógica da aplicação teórica em problemas do cotidiano gera desinteresse e inércia de protagonismo estudantil.`;

  return {
    title: `Plano de Recuperação e Aprofundamento Semestral (Currículo Paulista 2026)`,
    ancoragemLegal: `Fundamentado na Resolução SEDUC 42/2024, que rege as diretrizes e normas administrativas da recuperação semestral para os componentes da Formação Geral Básica e Itinerários Formativos, estabelecendo que estudantes com rendimento inferior a 5,0 devem passar por intervenções imediatas e contínuas registradas na Secretaria Escolar Digital (SED) e no sistema 'Professor Presente' (Resolução SEDUC 140/2025). Alinhado também ao cronograma oficial do 1º Semestre Letivo de 2026 (02/02 a 03/07), com a consolidação da Semana de Estudos Intensivos (SEI) de fechamento de período e a aplicação da Prova Paulista do semestre letivo.`,
    verboComando: verbComando,
    objetoConhecimento: objetoConhecimento,
    modificador: modificador,
    habilidadesRelacionadas: habilidadeRel,
    habilidadesPrevias: habilidadesPrevias,
    matrizCognitiva: matrizCognitiva,
    planoAulas: planoAulas,
    itemAvaliacao: itemAvaliacao,
    gabarito: gabarito,
    feedbackPedagogico: feedbackPedagogico,
    fullMarkdown: ""
  };
}

interface BimesterQuestion {
  itemText: string;
  questionHeader: string;
  optionBCorrect: string;
  feedbackCorrect: string;
}

function getBimesterQuestion(compLower: string, objetoConhecimento: string, bimesterLabel: string): BimesterQuestion {
  let questionHeader = `No âmbito das competências gerais do Currículo Paulista, para resolver problemas sobre **${objetoConhecimento}** (${bimesterLabel}), qual procedimento metodológico o estudante deve adotar de acordo com as diretrizes educacionais?`;
  let optionBCorrect = `Identificar os elementos conceituais fundamentais de **${objetoConhecimento}**, aplicar de maneira estruturada as relações lógicas e analisar criticamente as soluções geradas com suporte nos recursos pedagógicos do Material Digital.`;
  let feedbackCorrect = `A compreensão sistemática dos termos básicos de ${objetoConhecimento} aliada à lógica reflexiva atende plenamente aos níveis de proficiência cognitiva esperados na Prova Paulista de recomposição escolar.`;

  if (compLower.includes("matematica") || compLower.includes("financeira") || compLower.includes("orientacao de estudos")) {
    questionHeader = `Ao resolver uma situação-problema de matemática que mobiliza conhecimentos sobre **${objetoConhecimento}** (${bimesterLabel}), qual é o procedimento técnico estruturado pelo Currículo Paulista para garantir precisão e fundamentação lógica?`;
    optionBCorrect = `Identificar as variáveis numéricas, modelar a situação matematicamente através de expressões ou equações reais e verificar a consistência física ou lógica dos resultados obtidos.`;
    feedbackCorrect = `A habilidade de modelar situações reais por meio do raciocínio analítico matemático constitui a meta central das intervenções pedagógicas de Matemática no Currículo Paulista.`;
  } else if (compLower.includes("portugues") || compLower.includes("lingua portuguesa") || compLower.includes("redacao") || compLower.includes("leitura")) {
    questionHeader = `Ao analisar e interpretar textos literários, acadêmicos ou jornalísticos associados a **${objetoConhecimento}** (${bimesterLabel}), qual estratégia de leitura crítica favorece o desenvolvimento da proficiência leitora do estudante?`;
    optionBCorrect = `Localizar dados explícitos e implícitos no texto, reconhecer os elementos composicionais típicos do gênero discursivo e correlacionar as escolhas de linguagem com as intenções comunicativas do autor.`;
    feedbackCorrect = `A leitura analítica fundamentada no reconhecimento de gêneros textuais e na articulação de ideias é essencial para a recomposição pedagógica em Língua Portuguesa.`;
  } else if (compLower.includes("fisica") || compLower.includes("quimica") || compLower.includes("biologia") || compLower.includes("ciencias")) {
    questionHeader = `Para analisar e resolver problemas científicos que abordam fenômenos biológicos ou físicos associados a **${objetoConhecimento}** (${bimesterLabel}), qual postura investigativa é preconizada pelo Currículo Paulista?`;
    optionBCorrect = `Observar as variáveis físicas ou biológicas envolvidas, elaborar hipóteses plausíveis com suporte em teorias científicas validadas e interpretar os dados experimentais coletados.`;
    feedbackCorrect = `O letramento científico preconiza que o discente saiba interpretar fenômenos de ${objetoConhecimento} correlacionando variáveis, causas e consequências reais de forma ordenada.`;
  } else if (compLower.includes("historia") || compLower.includes("geografia") || compLower.includes("filosofia") || compLower.includes("sociologia")) {
    questionHeader = `Ao analisar processos de transformação histórica, social, espacial ou estética relacionados a **${objetoConhecimento}** (${bimesterLabel}), qual abordagem crítica e analítica as Ciências Humanas recomendam priorizar?`;
    optionBCorrect = `Examinar diferentes fontes documentais ou cartográficas, contextualizar os fatos em seus múltiplos marcos temporais/espaciais e identificar relações de causalidade, hegemonia ou poder.`;
    feedbackCorrect = `As Ciências Humanas exigem a desconstrução crítica de discursos dogmáticos para que o educando compreenda as estruturas de tempo e espaço de forma reflexiva e consciente.`;
  } else if (compLower.includes("ingles") || compLower.includes("inglesa")) {
    questionHeader = `To develop reading comprehension and communicative skills in English regarding **${objetoConhecimento}** (${bimesterLabel}), what is the primary active strategy recommended?`;
    optionBCorrect = `Apply reading strategies such as skimming and scanning to locate explicit details, make contextual inferences, and recognize structural grammar patterns in English texts.`;
    feedbackCorrect = `Using active reading processes and utilizing contextual clues is essential to build linguistic independence and critical comprehension of texts in English.`;
  }

  const itemText = `**Questão (${bimesterLabel})**
**Enunciado:** ${questionHeader}

A) Utilizar apenas o senso comum e palpites aleatórios, dispensando teorias, fórmulas, dados oficiais ou leituras críticas do Material Digital.
B) ${optionBCorrect}
C) Chutar mecanicamente as alternativas de resposta sem efetuar a devida interpretação de textos, gráficos ou dados de apoio fornecidos.
D) Tratar o conteúdo como sabedoria abstrata e sem utilidade prática para o cotidiano, omitindo-se da realização das atividades escolares recomendadas.`;

  return { itemText, questionHeader, optionBCorrect, feedbackCorrect };
}

export function buildRecoveryPlanHTML(school: string, teacher: string, data: RecoveryPlanResult, input: RecoveryPlanInput): string {
  const matrixHtml = parseMarkdownTableToHtml(data.matrizCognitiva);
  const planHtml = parseMarkdownTableToHtml(data.planoAulas);

  const adaptOpts = input.adaptacaoCurricularOptions && input.adaptacaoCurricularOptions.length > 0
    ? input.adaptacaoCurricularOptions
    : [
        "Responder dúvidas recorrentes, retomando explicações",
        "Oferecer exemplos adicionais ou utilizar outra estratégia de explicação para o mesmo conceito",
        "Propor atividades de apoio para estudantes que ainda não consolidaram a aprendizagem",
        "Disponibilizar desafios para estudantes que já dominaram o conteúdo"
      ];

  const adaptListHtml = adaptOpts.map(opt => `<li style="margin-bottom: 6px; line-height: 1.5;">${opt}</li>`).join('');
  const matSuggest = input.sugestaoMateriais || "Jogos pedagógicos, fichas de exercícios impressas com apoio visual, esquemas gráficos e infográficos, objetos manipuláveis e tutoria entre pares.";
  const retAnterior = input.retomadaAprendizagensAnteriores || "Revisão prática dos conceitos fundamentais do 1º e 2º bimestres anteriores necessários para a consolidação das habilidades essenciais em defasagem.";

  return `
    <div style="font-family: Cambria, 'Cambria Math', Georgia, serif; color: #1e293b; line-height: 1.5; font-size: 11pt; max-width: 100%; box-sizing: border-box;">
      <!-- CABEÇALHO OFICIAL SEDUC COM LOGO SP -->
      <table border="0" width="100%" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; border: none; font-family: Cambria, Georgia, serif;">
        <tr>
          <td style="width: 150px; vertical-align: middle; border: none; padding: 0;">
            <img src="${LOGO_SP_BASE64}" alt="Logo Governo SP" style="width: 140px; height: auto; display: block;" />
          </td>
          <td style="vertical-align: middle; border: none; padding: 0; text-align: center;">
            <h4 style="margin: 0; font-family: Cambria, Georgia, serif; font-size: 9.5pt; font-weight: bold; color: #64748b; letter-spacing: 1px; text-transform: uppercase;">GOVERNO DO ESTADO DE SÃO PAULO</h4>
            <h3 style="margin: 3px 0; font-family: Cambria, Georgia, serif; font-size: 11pt; font-weight: bold; color: #1e293b; text-transform: uppercase;">SECRETARIA DA EDUCAÇÃO DO ESTADO DE SÃO PAULO - SEDUC-SP</h3>
            <h2 style="margin: 4px 0 2px 0; font-family: Cambria, Georgia, serif; font-size: 13pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase;">PLANO DE RECUPERAÇÃO SEMESTRAL</h2>
            <span style="font-family: Cambria, Georgia, serif; font-size: 8.5pt; font-weight: bold; color: #475569; background-color: #f1f5f9; padding: 3px 12px; border-radius: 10px; border: 1px solid #e2e8f0; display: inline-block; margin-top: 3px;">1º Semestre Letivo / Alinhamento SEDUC – 2026</span>
          </td>
        </tr>
      </table>

      <!-- TABELA DE IDENTIFICAÇÃO -->
      <table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1.5px solid #1e3a8a; font-size: 11pt; font-family: Cambria, Georgia, serif; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <colgroup>
          <col width="25%" style="width: 25%;">
          <col width="25%" style="width: 25%;">
          <col width="25%" style="width: 25%;">
          <col width="25%" style="width: 25%;">
        </colgroup>
        <tr>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Unidade Escolar:</td>
          <td width="75%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; width: 75%; font-size: 11pt; font-weight: normal; word-wrap: break-word;" colspan="3">${school || 'E.E. de Ensino Integral Estadual'}</td>
        </tr>
        <tr>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Docente Responsável:</td>
          <td width="75%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; font-size: 11pt; font-weight: normal; width: 75%; word-wrap: break-word;" colspan="3">${teacher || 'Professor(a) de Apoio Escolar / Tutor'}</td>
        </tr>
        <tr>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Componente Curricular:</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; width: 25%; font-size: 11pt; font-weight: normal; word-wrap: break-word;">${input.componente}</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Série / Ano:</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; width: 25%; font-size: 11pt; font-weight: normal; word-wrap: break-word;">${input.ano}</td>
        </tr>
        <tr>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Período Alvo:</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; font-size: 11pt; font-weight: normal; width: 25%; word-wrap: break-word;">1º Semestre (1º e 2º Bimestres Integrados)</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold; font-size: 12pt; color: #1e3a8a; background-color: #f8fafc; width: 25%; word-wrap: break-word;">Carga Horária:</td>
          <td width="25%" style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155; font-size: 11pt; font-weight: normal; width: 25%; word-wrap: break-word;">${input.aulas} aulas de recomposição</td>
        </tr>
      </table>

      <!-- SEÇÃO 1: FUNDAMENTAÇÃO LEGAL -->
      <div style="margin-bottom: 24px;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">1. Diretrizes e Fundamentação</h4>
        </div>
        <p style="margin: 0; font-size: 10.5pt; text-align: justify; text-indent: 1.5cm; color: #334155; line-height: 1.6;">${data.ancoragemLegal}</p>
      </div>

      <!-- SEÇÃO 2: HABILIDADES E CONTEÚDOS DA RECUPERAÇÃO -->
      <div style="margin-bottom: 24px;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">2. Habilidades e Conteúdos Focais</h4>
        </div>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 10pt; color: #334155;">
          <p style="margin: 4px 0; line-height: 1.5;"><strong>Nível Cognitivo / Ação Pedagógica:</strong> <span style="color: #1e3a8a; font-weight: 600;">${data.verboComando}</span></p>
          <div style="border-top: 1px solid #e2e8f0; margin: 8px 0; padding-top: 8px;"></div>
          <p style="margin: 4px 0; line-height: 1.5; white-space: pre-wrap;"><strong>Conteúdos Principais do Semestre:</strong> <span style="font-weight: 500; display: block; margin-top: 4px; padding-left: 8px; border-left: 2px solid #cbd5e1;">${data.objetoConhecimento}</span></p>
          <div style="border-top: 1px solid #e2e8f0; margin: 8px 0; padding-top: 8px;"></div>
          <p style="margin: 4px 0; line-height: 1.5;"><strong>Objetivo Prático:</strong> <span>${data.modificador}</span></p>
          <div style="border-top: 1px solid #e2e8f0; margin: 8px 0; padding-top: 8px;"></div>
          <p style="margin: 4px 0; line-height: 1.5; white-space: pre-wrap;"><strong>Habilidades do Currículo Paulista (2026):</strong> <span style="font-weight: 500; color: #1e3a8a; display: block; margin-top: 4px; padding-left: 8px; border-left: 2px solid #cbd5e1;">${data.habilidadesRelacionadas}</span></p>
          <div style="border-top: 1px solid #e2e8f0; margin: 8px 0; padding-top: 8px;"></div>
          <p style="margin: 4px 0; line-height: 1.5;"><strong>Conhecimentos Prévios de Suporte:</strong> <span>${data.habilidadesPrevias}</span></p>
        </div>
      </div>

      <!-- SEÇÃO 3: MATRIZ DE ALINHAMENTO COGNITIVO -->
      <div style="margin-bottom: 24px;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">3. Matriz de Níveis de Aprendizagem</h4>
        </div>
        ${matrixHtml}
      </div>

      <!-- SEÇÃO 4: PLANO DE AULAS DE RECUPERAÇÃO -->
      <div style="margin-bottom: 24px;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">4. Cronograma de Aulas de Recuperação</h4>
        </div>
        <p style="margin: 0 0 10px 0; font-size: 9.5pt; font-style: italic; color: #64748b;">Aulas organizadas para o aprofundamento das habilidades defasadas, com apoio de duplas e tutoria pedagógica.</p>
        ${planHtml}
      </div>

      <!-- SEÇÃO 5: ADAPTAÇÃO CURRICULAR E MATERIAIS DE APOIO -->
      <div style="margin-bottom: 24px;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">5. Adaptação Curricular e Estratégias Diferenciadas</h4>
        </div>
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 14px; font-size: 10pt; color: #334155;">
          <p style="margin: 0 0 8px 0; font-weight: 700; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Estratégias de Adaptação Adotadas:</p>
          <ul style="margin: 0 0 12px 0; padding-left: 20px; font-size: 9.5pt; color: #334155;">
            ${adaptListHtml}
          </ul>

          <div style="border-top: 1px solid #e2e8f0; margin: 10px 0; padding-top: 10px;"></div>

          <p style="margin: 0 0 4px 0; font-weight: 700; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Sugestão de Materiais para Adaptação de Atividades:</p>
          <p style="margin: 0 0 12px 0; font-size: 9.5pt; color: #334155; line-height: 1.5;">${matSuggest}</p>

          <div style="border-top: 1px solid #e2e8f0; margin: 10px 0; padding-top: 10px;"></div>

          <p style="margin: 0 0 4px 0; font-weight: 700; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Previsão de Retomada de Aprendizagens Essenciais (Bimestres Anteriores):</p>
          <p style="margin: 0; font-size: 9.5pt; color: #334155; line-height: 1.5;">${retAnterior}</p>
        </div>
      </div>

      <!-- SEÇÃO 6: AVALIAÇÃO FORMATIVA -->
      <div style="margin-bottom: 24px; page-break-inside: avoid;">
        <div style="border-left: 4px solid #1e3a8a; padding-left: 10px; margin-bottom: 10px;">
          <h4 style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 11pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px;">6. Atividades e Avaliação Formativa</h4>
        </div>
        <div style="background-color: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 4px solid #15803d; padding: 16px; border-radius: 6px; font-size: 10.5pt; font-family: Arial, Helvetica, sans-serif; margin-top: 10px;">
          <div style="margin-bottom: 15px;">
            <span style="background-color: #e2e8f0; color: #334155; font-size: 8pt; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 6px; text-transform: uppercase;">Exercícios de Verificação</span>
            <p style="margin: 5px 0; white-space: pre-wrap; line-height: 1.5; color: #1e293b; font-weight: 500;">${data.itemAvaliacao}</p>
          </div>
          
          <div style="border-top: 2.5px dashed #cbd5e1; margin: 16px 0; padding-top: 12px;"></div>
          
          <p style="margin: 5px 0 10px 0; font-weight: 700; color: #15803d; font-size: 11pt; background-color: #d1fae5; display: inline-block; padding: 4px 12px; border-radius: 4px; border: 1px solid #a7f3d0;">${data.gabarito}</p>
          
          <div style="margin-top: 14px;">
            <p style="margin: 0 0 6px 0; font-weight: 700; color: #1e293b; font-size: 10pt; text-transform: uppercase; letter-spacing: 0.3px;">Análise Pedagógica e Orientações:</p>
            <p style="margin: 0; font-size: 9.5pt; white-space: pre-wrap; text-align: justify; color: #475569; line-height: 1.5;">${data.feedbackPedagogico}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateRecoveryPlanMarkdown(school: string, teacher: string, data: RecoveryPlanResult, input: RecoveryPlanInput): string {
  const adaptOpts = input.adaptacaoCurricularOptions && input.adaptacaoCurricularOptions.length > 0
    ? input.adaptacaoCurricularOptions
    : [
        "Responder dúvidas recorrentes, retomando explicações",
        "Oferecer exemplos adicionais ou utilizar outra estratégia de explicação para o mesmo conceito",
        "Propor atividades de apoio para estudantes que ainda não consolidaram a aprendizagem",
        "Disponibilizar desafios para estudantes que já dominaram o conteúdo"
      ];

  const adaptMarkdown = adaptOpts.map(o => `- ${o}`).join('\n');
  const matSuggest = input.sugestaoMateriais || "Jogos pedagógicos, fichas de exercícios impressas com apoio visual, esquemas gráficos e infográficos, objetos manipuláveis e tutoria entre pares.";
  const retAnterior = input.retomadaAprendizagensAnteriores || "Revisão prática dos conceitos fundamentais do 1º e 2º bimestres anteriores necessários para a consolidação das habilidades essenciais em defasagem.";

  return `# PLANO DE RECUPERAÇÃO SEMESTRAL (2026)

**Unidade Escolar**: ${school || 'E.E. de Ensino Integral Estadual'}  
**Docente Responsável**: ${teacher || 'Professor(a) de Apoio Escolar / Tutor'}  
**Componente Curricular**: ${input.componente}  
**Série / Ano**: ${input.ano}  
**Período**: 1º Semestre (1º e 2º Bimestres Integrados)  
**Carga Horária**: ${input.aulas} aulas de recomposição  

---

## 1. Diretrizes e Fundamentação
${data.ancoragemLegal}

---

## 2. Habilidades e Conteúdos Focais
- **Nível Cognitivo / Ação Pedagógica**: ${data.verboComando}
- **Conteúdos Principais do Semestre**: ${data.objetoConhecimento}
- **Objetivo Prático**: ${data.modificador}
- **Habilidades do Currículo Paulista (2026)**: 
${data.habilidadesRelacionadas}
- **Conhecimentos Prévios de Suporte**: ${data.habilidadesPrevias}

---

## 3. Matriz de Níveis de Aprendizagem
${data.matrizCognitiva}

---

## 4. Cronograma de Aulas de Recuperação
${data.planoAulas}

---

## 5. Adaptação Curricular e Estratégias Diferenciadas
### Estratégias de Adaptação Adotadas:
${adaptMarkdown}

### Sugestão de Materiais para Adaptação de Atividades:
${matSuggest}

### Previsão de Retomada de Aprendizagens Essenciais (Bimestres Anteriores):
${retAnterior}

---

## 6. Atividades e Avaliação Formativa
### Exercícios de Verificação:
${data.itemAvaliacao}

### Gabarito:
${data.gabarito}

### Análise Pedagógica e Orientações:
${data.feedbackPedagogico}
`;
}

export function parseMarkdownTableToHtml(mdTable: string): string {
  const lines = mdTable.trim().split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
  if (lines.length < 2) return mdTable;

  const headers = lines[0].split("|").slice(1, -1).map(h => h.trim());
  const numCols = headers.length || 1;
  const colWidthPct = (100 / numCols).toFixed(2) + "%";

  let html = `<table border="1" width="100%" style="width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 15px; border: 1.5px solid #1e3a8a; font-size: 9.5pt; line-height: 1.45; font-family: Arial, Helvetica, sans-serif; table-layout: fixed; mso-table-layout-alt: fixed; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">`;

  html += "<colgroup>";
  for (let c = 0; c < numCols; c++) {
    html += `<col width="${colWidthPct}" style="width: ${colWidthPct};">`;
  }
  html += "</colgroup>";

  // Headers
  html += "<thead><tr style='background-color: #1e3a8a; color: white;'>";
  headers.forEach(h => {
    html += `<th width="${colWidthPct}" style='border: 1px solid #1e3a8a; padding: 10px 12px; text-align: left; font-weight: bold; width: ${colWidthPct}; word-wrap: break-word; overflow-wrap: break-word;'>${h}</th>`;
  });
  html += "</tr></thead><tbody>";

  // Skip separator line (lines[1]) and iterate rows
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split("|").slice(1, -1).map(c => c.trim());
    const isEven = i % 2 === 0;
    const bg = isEven ? "#f8fafc" : "#ffffff";
    html += `<tr style='background-color: ${bg};'>`;
    cells.forEach(c => {
      let content = c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `<td width="${colWidthPct}" style='border: 1px solid #cbd5e1; padding: 8px 12px; vertical-align: top; color: #334155; width: ${colWidthPct}; word-wrap: break-word; overflow-wrap: break-word;'>${content}</td>`;
    });
    html += "</tr>";
  }
  html += "</tbody></table>";
  return html;
}
