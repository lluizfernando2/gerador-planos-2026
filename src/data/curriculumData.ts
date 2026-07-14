import { CurriculumItem } from '../types';
import {
  topicsLP6_1, topicsLP6_2, topicsLP6_3, topicsLP6_4,
  topicsLP7_1, topicsLP7_2, topicsLP7_3, topicsLP7_4,
  topicsLP8_1, topicsLP8_2, topicsLP8_3, topicsLP8_4,
  topicsLP9_1, topicsLP9_2, topicsLP9_3, topicsLP9_4
} from './portugueseData';
import {
  topicsCiencias6_1, topicsCiencias6_2, topicsCiencias6_3, topicsCiencias6_4,
  topicsCiencias7_1, topicsCiencias7_2, topicsCiencias7_3, topicsCiencias7_4,
  topicsCiencias8_1, topicsCiencias8_2, topicsCiencias8_3, topicsCiencias8_4,
  topicsCiencias9_1, topicsCiencias9_2, topicsCiencias9_3, topicsCiencias9_4
} from './cienciasData';
import {
  topicsLP1em_1, topicsLP1em_2, topicsLP1em_3, topicsLP1em_4,
  topicsLP2em_1, topicsLP2em_2, topicsLP2em_3, topicsLP2em_4,
  topicsLP3em_1, topicsLP3em_2, topicsLP3em_3, topicsLP3em_4
} from './portugueseEMData';

interface TopicConfig {
  start: number;
  end: number;
  titulo: string;
  conteudo: string;
  objetivos: string;
  habilidade: string;
  aprendizagem: string;
}

function generateLessons(
  ano: string,
  bimestre: string,
  maxAulas: number,
  topics: TopicConfig[],
  disciplina: string = 'Matemática'
): CurriculumItem[] {
  const list: CurriculumItem[] = [];
  for (let aulaNum = 1; aulaNum <= maxAulas; aulaNum++) {
    const topic = topics.find(t => aulaNum >= t.start && aulaNum <= t.end) || topics[topics.length - 1];
    
    let finalTitulo = topic.titulo;
    const totalParts = topic.end - topic.start + 1;
    if (totalParts > 1) {
      const partNum = aulaNum - topic.start + 1;
      finalTitulo = `${topic.titulo} – Parte ${partNum}`;
    }

    list.push({
      id: `${disciplina.replace(/\s+/g, '')}-${ano.replace(/\s+/g, '')}-${bimestre.replace(/\s+/g, '')}-${aulaNum}`,
      ano,
      bimestre,
      aula: String(aulaNum),
      titulo: finalTitulo,
      conteudo: topic.conteudo,
      objetivos: topic.objetivos,
      habilidade: topic.habilidade,
      aprendizagem: topic.aprendizagem,
      disciplina
    });
  }
  return list;
}

// ==================== TOPICS CONFIGURATIONS ====================

// --- 6º ANO ---
const topics6_1: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Os números naturais em situações do cotidiano",
    conteudo: "Leitura, representação, identificação e utilização de números naturais.",
    objetivos: "• Reconhecer o sistema de numeração decimal, como o que prevaleceu no mundo ocidental.\n• Reconhecer características do sistema de numeração decimal (base, valor posicional e função do zero).\n• Ler e representar números naturais de até 6 ordens, em registros numéricos.\n• Identificar a utilização dos números em situações do cotidiano.",
    habilidade: "EF06MA01, EF06MA02",
    aprendizagem: "AE1 - Compor e decompor números naturais de diferentes ordens, reconhecendo as características do sistema de numeração decimal."
  },
  {
    start: 6, end: 10,
    titulo: "Comparação e ordenação de números naturais",
    conteudo: "Comparação e ordenação de números naturais (com e sem o uso da reta numérica).",
    objetivos: "• Comparar e ordenar números naturais de 6 ordens ou mais, em registros numéricos, em língua materna.\n• Ler, interpretar e analisar informações em diferentes tipos de gráficos (reta numérica).",
    habilidade: "EF06MA01, EF06MA02",
    aprendizagem: "AE2 - Comparar e ordenar números naturais de diferentes ordens, utilizando, inclusive, a reta numérica como suporte."
  },
  {
    start: 11, end: 15,
    titulo: "Procedimentos de adição e subtração com números naturais",
    conteudo: "Estratégias de adição e subtração com números naturais, envolvendo o cálculo mental.",
    objetivos: "• Empregar o cálculo mental para resolver operações de adição e subtração com números naturais.\n• Sistematizar estratégias de adição com números naturais com e sem reagrupamentos.",
    habilidade: "EF06MA03",
    aprendizagem: "AE3 - Resolver problemas envolvendo as quatro operações fundamentais com números naturais, por meio de estratégias variadas."
  },
  {
    start: 16, end: 20,
    titulo: "Estratégias de multiplicação e divisão com números naturais",
    conteudo: "Procedimentos de multiplicação e divisão com números naturais envolvendo as diferentes ideias do campo multiplicativo.",
    objetivos: "• Resolver problemas envolvendo multiplicação com números naturais.\n• Aplicar as diferentes ideias associadas à multiplicação (adição de parcelas iguais e formação retangular).\n• Resolver problemas envolvendo divisão com números naturais usando o algoritmo usual.",
    habilidade: "EF06MA03",
    aprendizagem: "AE3 - Resolver problemas envolvendo as quatro operações fundamentais com números naturais, por meio de estratégias variadas."
  },
  {
    start: 21, end: 25,
    titulo: "Explorando os múltiplos e divisores de um número natural",
    conteudo: "Regularidades em sequências numéricas compostas por múltiplos e divisores de um número natural.",
    objetivos: "• Aplicar o conceito de múltiplos de um número natural na construção de sequências numéricas.\n• Identificar os divisores de um número natural por meio da análise de agrupamentos e repartições exatas, explorando os conceitos de número primo e composto.",
    habilidade: "EF06MA06, EF06MA05",
    aprendizagem: "AE4 - Resolver problemas envolvendo múltiplos e divisores de números naturais, utilizando-os para ampliar estratégias de cálculo."
  },
  {
    start: 26, end: 30,
    titulo: "Critérios de divisibilidade",
    conteudo: "Critérios de divisibilidade por 2, 3, 5, 10, 100 e 1000 por meio da decomposição de números naturais.",
    objetivos: "• Construir os critérios de divisibilidade por 2, 3 e 5 por meio da decomposição de números e da identificação de padrões.\n• Decompor números naturais utilizando o conceito de múltiplo e divisor.",
    habilidade: "EF06MA05",
    aprendizagem: "AE4 - Resolver problemas envolvendo múltiplos e divisores de números naturais, utilizando-os para ampliar estratégias de cálculo."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão e verificação de números naturais, múltiplos e divisores",
    conteudo: "Decomposição, composição, representação, comparação e ordenação de números naturais, critérios de divisibilidade.",
    objetivos: "• Compor e decompor números de 6 ordens ou mais.\n• Identificar a localização de números naturais na reta numérica.\n• Resolver problemas envolvendo critérios de divisibilidade, múltiplos e divisores.",
    habilidade: "EF06MA01, EF06MA05, EF06MA06",
    aprendizagem: "AE4 - Resolver problemas envolvendo múltiplos e divisores de números naturais, utilizando-os para ampliar estratégias de cálculo."
  }
];

const topics6_2: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Frações e reta numérica",
    conteudo: "Explorar o significado de fração como parte de um todo. Cálculo da fração de uma quantidade. Resolução de problemas com grandezas.",
    objetivos: "• Compreender uma fração como resultado de uma divisão.\n• Aplicar a estratégia de cálculo da fração de uma quantidade.\n• Utilizar a reta numérica como recurso para comparar e ordenar frações.",
    habilidade: "EF05MA03, EF06MA09, EF06MA07",
    aprendizagem: "AE5 - Resolver problemas envolvendo cálculo da fração de uma quantidade, cujo resultado é um número natural."
  },
  {
    start: 6, end: 10,
    titulo: "Obtendo frações equivalentes e simplificação",
    conteudo: "Estratégias para comparar frações com denominadores diferentes. Identificação de frações equivalentes.",
    objetivos: "• Compreender que diferentes frações podem representar a mesma quantidade (frações equivalentes).\n• Desenvolver estratégias para comparar frações com denominadores diferentes.\n• Desenvolver estratégias para identificar frações equivalentes.",
    habilidade: "EF06MA07",
    aprendizagem: "AE6 - Comparar e ordenar frações, utilizando equivalência, representações visuais e a reta numérica como apoio."
  },
  {
    start: 11, end: 15,
    titulo: "Adição e subtração com frações e forma mista",
    conteudo: "Adição de frações com mesmo denominador e com denominadores diferentes. Compreensão do número misto.",
    objetivos: "• Compreender e aplicar a operação de adição e subtração com frações de mesmo denominador.\n• Compreender o conceito de número misto como soma de um número natural com uma fração.\n• Transformar frações impróprias em números mistos e vice-versa.",
    habilidade: "EF06MA10",
    aprendizagem: "AE7 - Resolver problemas que envolvam adição ou subtração de números racionais positivos na representação fracionária."
  },
  {
    start: 16, end: 20,
    titulo: "Multiplicação e divisão com frações",
    conteudo: "Multiplicação de frações: regra do produto dos numeradores e denominadores. Regra da divisão de frações.",
    objetivos: "• Aplicar o processo para realizar a multiplicação entre frações.\n• Aplicar a divisão entre frações utilizando a técnica da inversão da segunda fração.\n• Aplicar estratégias de simplificação de frações.",
    habilidade: "EF06MA10",
    aprendizagem: "AE7 - Resolver problemas que envolvam adição ou subtração de números racionais positivos na representação fracionária."
  },
  {
    start: 21, end: 25,
    titulo: "Ângulos, giros e polígonos",
    conteudo: "Medição de ângulos com transferidor e ferramentas digitais. Polígonos: definição, nomenclatura e classificação.",
    objetivos: "• Reconhecer e identificar ângulos retos e não retos em objetos e imagens do cotidiano.\n• Reconhecer e nomear polígonos com base na quantidade de lados e vértices.\n• Identificar polígonos convexos e compreender a diferença em relação aos não convexos.",
    habilidade: "EF06MA25A, EF06MA25B, EF06MA27, EF06MA18",
    aprendizagem: "AE8 - Classificar polígonos, considerando lados, vértices e ângulos, diferenciando os regulares dos não regulares."
  },
  {
    start: 26, end: 30,
    titulo: "Características dos triângulos e quadriláteros",
    conteudo: "Classificação de triângulos com base nas medidas dos lados (equilátero, isósceles, escaleno). Definição e características dos quadriláteros.",
    objetivos: "• Classificar triângulos com base nas medidas dos lados.\n• Classificar quadriláteros com base em suas propriedades geométricas.\n• Compreender as relações de inclusão entre quadrado, retângulo, trapézio e paralelogramo.",
    habilidade: "EF06MA19, EF06MA20, EF06MA22",
    aprendizagem: "AE9 - Classificar triângulos em relação às medidas de lados. AE10 - Classificar quadriláteros."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão complementar e verificação de frações e polígonos",
    conteudo: "Comparação de frações, adição, subtração, multiplicação e divisão de frações, classificação de triângulos e quadriláteros.",
    objetivos: "• Resolver problemas que envolvam as quatro operações com frações.\n• Identificar frações equivalentes como estratégia para igualar denominadores.\n• Classificar triângulos e quadriláteros com base em suas propriedades.",
    habilidade: "EF06MA10, EF06MA19, EF06MA20",
    aprendizagem: "AE7 - Resolver problemas de frações. AE10 - Classificar quadriláteros."
  }
];

const topics6_3: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Representação de números decimais",
    conteudo: "Conversão de frações em números decimais por meio da divisão. Valor posicional dos algarismos em números decimais. Representação na reta numérica.",
    objetivos: "• Reconhecer números racionais positivos em suas formas fracionária e decimal.\n• Reconhecer e utilizar o valor posicional dos algarismos em números decimais.\n• Relacionar números racionais positivos a pontos na reta numérica.",
    habilidade: "EF06MA08",
    aprendizagem: "AE11 - Resolver problemas que envolvam as quatro operações fundamentais com números racionais positivos na representação decimal."
  },
  {
    start: 6, end: 10,
    titulo: "Comparação e operações de adição e subtração de decimais",
    conteudo: "Estratégias de comparação e ordenação de decimais. Adição e subtração com decimais, com alinhamento da vírgula.",
    objetivos: "• Comparar números decimais com base no valor posicional dos algarismos.\n• Calcular adições e subtrações com números decimais.\n• Resolver problemas que envolvam estimativas e arredondamentos com decimais.",
    habilidade: "EF06MA11",
    aprendizagem: "AE11 - Resolver problemas que envolvam as quatro operações fundamentais com números racionais positivos na representação decimal."
  },
  {
    start: 11, end: 15,
    titulo: "Multiplicação com números decimais",
    conteudo: "Multiplicação de número natural por decimal. Multiplicação de decimais por 10, 100 e 1000. Valor posicional e a vírgula.",
    objetivos: "• Compreender e aplicar estratégias para multiplicar números naturais por decimais.\n• Reconhecer o efeito da multiplicação de decimais por 10, 100 e 1000.\n• Resolver problemas contextualizados que envolvam multiplicação com decimais.",
    habilidade: "EF06MA11",
    aprendizagem: "AE11 - Resolver problemas que envolvam as quatro operações fundamentais com números racionais positivos na representação decimal."
  },
  {
    start: 16, end: 20,
    titulo: "Divisão e potenciação de números racionais",
    conteudo: "Divisão de número decimal por outro decimal. Divisão de natural por decimal. Potenciação de decimais e frações.",
    objetivos: "• Compreender e aplicar estratégias diversas para realizar divisões com números decimais.\n• Compreender a potenciação como multiplicação repetida de fatores iguais.\n• Aplicar estratégias diversas para calcular potências de números decimais.",
    habilidade: "EF06MA11",
    aprendizagem: "AE11 - Resolver problemas que envolvam as quatro operações fundamentais com números racionais positivos na representação decimal."
  },
  {
    start: 21, end: 25,
    titulo: "Frações com denominador igual a 100 e porcentagem",
    conteudo: "Frações com denominador 100 como representação de porcentagens. Associação de porcentagens comuns a partes do todo.",
    objetivos: "• Compreender que toda fração com denominador 100 representa uma porcentagem.\n• Associar porcentagens comuns (10%, 25%, 50%, 75%, 100%) a frações equivalentes e decimais.\n• Reconhecer porcentagens em contextos reais, como embalagens.",
    habilidade: "EF06MA13",
    aprendizagem: "AE12 - Resolver problemas de porcentagem com base na proporcionalidade, sem uso da regra de três, utilizando estratégias pessoais."
  },
  {
    start: 26, end: 30,
    titulo: "Acréscimos e decréscimos simples",
    conteudo: "Representação decimal de porcentagens aplicadas a acréscimos e decréscimos. Cálculo por meio de multiplicação de decimais.",
    objetivos: "• Compreender o acréscimo percentual como adição proporcional ao valor original.\n• Compreender o decréscimo percentual como subtração proporcional do valor original.\n• Resolver problemas envolvendo acréscimos e decréscimos simples utilizando decimais.",
    habilidade: "EF06MA13",
    aprendizagem: "AE12 - Resolver problemas de porcentagem com base na proporcionalidade, sem uso da regra de três, utilizando estratégias pessoais."
  }
];

const topics6_4: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Sólidos geométricos no cotidiano",
    conteudo: "Identificação de sólidos geométricos: cilindros, cones, pirâmides, prismas. Classificação dos sólidos.",
    objetivos: "• Compreender que sólidos geométricos são figuras tridimensionais maciças.\n• Diferenciar figuras bidimensionais de figuras tridimensionais.\n• Identificar faces, arestas e vértices em prismas e pirâmides.",
    habilidade: "EF05MA16, EF06MA17",
    aprendizagem: "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."
  },
  {
    start: 6, end: 10,
    titulo: "Planificações de sólidos e corpos redondos",
    conteudo: "Associação de prismas e pirâmides a suas planificações. Características dos corpos redondos (cilindros e cones).",
    objetivos: "• Associar prismas e pirâmides com as suas planificações.\n• Diferenciar poliedros de corpos redondos.\n• Resolver problemas envolvendo a identificação de elementos de sólidos geométricos.",
    habilidade: "EF05MA16, EF06MA17",
    aprendizagem: "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."
  },
  {
    start: 11, end: 15,
    titulo: "Unidades de medida de comprimento e massa",
    conteudo: "Grandezas e unidades de medida: identificação das unidades convencionais. Unidades de comprimento e massa e suas conversões.",
    objetivos: "• Explorar unidades de medida em situações do cotidiano.\n• Compreender que medir é comparar grandezas de mesma natureza.\n• Resolver problemas envolvendo unidades de medidas de comprimento e de massa.",
    habilidade: "EF06MA24",
    aprendizagem: "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade, recorrendo a transformações."
  },
  {
    start: 16, end: 20,
    titulo: "Unidades de capacidade, tempo e conversão de unidades",
    conteudo: "Unidades de capacidade (litro, mL), tempo (conversão de horas, minutos, segundos) e cálculo de intervalos.",
    objetivos: "• Resolver situações-problema envolvendo medidas de capacidade.\n• Converter medidas de tempo entre unidades diferentes usando operações básicas.\n• Realizar conversões entre unidades de medida, aplicando-as na resolução de problemas.",
    habilidade: "EF06MA24",
    aprendizagem: "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade, recorrendo a transformações."
  },
  {
    start: 21, end: 25,
    titulo: "Área de quadrados, retângulos e triângulos",
    conteudo: "Cálculo de áreas em malha quadriculada. Relação entre dimensões e área. Resolução de problemas com áreas.",
    objetivos: "• Calcular áreas de quadrados e retângulos utilizando malhas quadriculadas como suporte visual.\n• Calcular áreas de triângulos utilizando malhas quadriculadas, contando quadradinhos.\n• Resolver problemas práticos que envolvam cálculo de áreas de figuras planas sem uso de fórmulas.",
    habilidade: "EF06MA03, EF06MA24",
    aprendizagem: "AE15 - Associar a área de um quadrado a uma potência de expoente 2. AE16 - Resolver problemas envolvendo a área de retângulos e triângulos, sem fazer uso de fórmulas."
  },
  {
    start: 26, end: 30,
    titulo: "Volume de cubos e blocos retangulares",
    conteudo: "Volume como grandeza associada a sólidos geométricos. Empilhamento e contagem de cubos. Relação entre dimensões e volume.",
    objetivos: "• Reconhecer volume como grandeza associada a sólidos geométricos.\n• Medir volumes por meio de empilhamento de cubos.\n• Resolver situações-problema que envolvam o cálculo de volume por empilhamento de blocos.",
    habilidade: "EF06MA03, EF06MA24",
    aprendizagem: "AE15 - Associar a área de um quadrado a uma potência de expoente 2 e o volume de um cubo a uma potência de expoente 3. AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares."
  }
];

// --- 7º ANO ---
const topics7_1: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Operações com números naturais e múltiplos",
    conteudo: "Estratégias de cálculo mental e escrito envolvendo as quatro operações fundamentais com números naturais.",
    objetivos: "• Resolver problemas envolvendo operações com números naturais.\n• Utilizar o conceito de múltiplos para ampliar estratégias de cálculo mental.",
    habilidade: "EF07MA01",
    aprendizagem: "AE1 - Resolver problemas que envolvam múltiplos e divisores de números naturais, em contextos reais."
  },
  {
    start: 6, end: 10,
    titulo: "Critérios de divisibilidade e divisão com números naturais",
    conteudo: "Divisores de um número natural, critérios de divisibilidade por 2, 3, 5 e 10. Divisão euclidiana.",
    objetivos: "• Reconhecer divisores de um número natural.\n• Resolver problemas envolvendo divisão com números naturais (cálculo mental e escrito).",
    habilidade: "EF07MA01",
    aprendizagem: "AE1 - Resolver problemas que envolvam múltiplos e divisores de números naturais, em contextos reais."
  },
  {
    start: 11, end: 15,
    titulo: "Números inteiros e reta numérica",
    conteudo: "Reconhecimento dos números inteiros no cotidiano. Representação de números inteiros na reta numérica.",
    objetivos: "• Identificar e interpretar números inteiros em diferentes contextos do cotidiano.\n• Representar números inteiros na reta numérica e realizar comparações.",
    habilidade: "EF07MA03",
    aprendizagem: "AE2 - Comparar e ordenar números inteiros, utilizando, inclusive, a reta numérica como recurso."
  },
  {
    start: 16, end: 20,
    titulo: "Operações de adição e subtração de inteiros",
    conteudo: "Estratégias de adição e subtração com números inteiros. Regras de sinais na soma.",
    objetivos: "• Realizar adições e subtrações de números inteiros.\n• Utilizar a reta numérica como apoio para representar e compreender as operações com inteiros.",
    habilidade: "EF07MA04",
    aprendizagem: "AE3 - Resolver problemas que envolvam operações com números inteiros, por meio de estratégias diversas."
  },
  {
    start: 21, end: 25,
    titulo: "Multiplicação e divisão com números inteiros",
    conteudo: "Multiplicação e divisão com inteiros. Regras de sinais nas operações.",
    objetivos: "• Construir as regras de sinais na multiplicação e divisão entre inteiros a partir de padrões numéricos.\n• Resolver problemas contextualizados que envolvam multiplicação e divisão de inteiros.",
    habilidade: "EF07MA04",
    aprendizagem: "AE3 - Resolver problemas que envolvam operações com números inteiros, por meio de estratégias diversas."
  },
  {
    start: 26, end: 30,
    titulo: "O conceito de fração",
    conteudo: "Leitura, escrita e representação de frações como parte de um todo, razão ou resultado de divisão.",
    objetivos: "• Compreender frações como representação de partes de um inteiro.\n• Representar e comparar frações positivas com a reta numérica.",
    habilidade: "EF07MA08",
    aprendizagem: "AE4 - Comparar e ordenar frações associadas às ideias de partes de inteiros, resultado da divisão, razão e operador."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão e ampliação da compreensão de frações",
    conteudo: "Comparação de números racionais positivos e negativos na forma fracionária na reta numérica.",
    objetivos: "• Comparar números racionais positivos e negativos.\n• Localizar frações entre dois inteiros consecutivos.",
    habilidade: "EF07MA08, EF07MA09, EF07MA10",
    aprendizagem: "AE4 - Comparar e ordenar frações associadas às ideias de partes de inteiros, resultado da divisão, razão e operador."
  }
];

const topics7_2: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Frações e números decimais",
    conteudo: "Relações entre frações e representações decimais. Dízimas e decimais exatos.",
    objetivos: "• Reconhecer que os números racionais positivos podem ser expressos nas formas fracionária e decimal.\n• Estabelecer relações entre essas representações, passando de uma forma para outra.",
    habilidade: "EF06MA08, EF07MA10",
    aprendizagem: "AE6 - Resolver problemas envolvendo as quatro operações fundamentais com números racionais nas formas fracionária e decimal."
  },
  {
    start: 6, end: 10,
    titulo: "Operações com números racionais",
    conteudo: "Estratégias de cálculo para adição, subtração, multiplicação e divisão com números racionais na forma decimal.",
    objetivos: "• Realizar operações de adição e subtração com números decimais utilizando processos de cálculo.\n• Calcular multiplicações e divisões de decimais usando diversas estratégias.",
    habilidade: "EF07MA11, EF07MA12",
    aprendizagem: "AE6 - Resolver problemas envolvendo as quatro operações fundamentais com números racionais nas formas fracionária e decimal."
  },
  {
    start: 11, end: 15,
    titulo: "Classificação de polígonos e plano cartesiano",
    conteudo: "Elementos de um polígono: lados, vértices, ângulos. Coordenadas no plano cartesiano.",
    objetivos: "• Reconhecer e nomear polígonos com base em seus elementos.\n• Associar os vértices de um polígono a pares ordenados no plano cartesiano.",
    habilidade: "EF06MA18, EF06MA16A, EF06MA16B",
    aprendizagem: "AE7 - Reconhecer e representar figuras geométricas planas no plano cartesiano, reconhecendo suas características."
  },
  {
    start: 16, end: 20,
    titulo: "Simetria no plano cartesiano",
    conteudo: "Pontos e figuras simétricas no plano cartesiano em relação aos eixos e à origem.",
    objetivos: "• Localizar pontos em diferentes quadrantes do plano cartesiano.\n• Reconhecer e representar o simétrico de figuras em relação aos eixos e à origem.",
    habilidade: "EF07MA19, EF07MA20",
    aprendizagem: "AE7 - Reconhecer e representar figuras geométricas planas no plano cartesiano, reconhecendo suas características."
  },
  {
    start: 21, end: 25,
    titulo: "Cálculo de áreas na malha quadriculada",
    conteudo: "Conceito de área de retângulos e triângulos representados em malhas ou no plano.",
    objetivos: "• Medir a área de figuras planas em malha quadriculada por contagem.\n• Estabelecer expressões matemáticas para o cálculo de área de retângulos e quadrados.",
    habilidade: "EF06MA24, EF07MA31",
    aprendizagem: "AE8 - Resolver problemas de cálculo de áreas de figuras planas, por meio da decomposição em quadrados, retângulos e triângulos."
  },
  {
    start: 26, end: 30,
    titulo: "Cálculo de áreas por decomposição",
    conteudo: "Área de paralelogramos, losangos e trapézios por decomposição em polígonos conhecidos.",
    objetivos: "• Decompor paralelogramos, losangos e trapézios para auxiliar o cálculo de área.\n• Utilizar a equivalência entre áreas para resolver problemas.",
    habilidade: "EF07MA32",
    aprendizagem: "AE8 - Resolver problemas de cálculo de áreas de figuras planas, por meio da decomposição em quadrados, retângulos e triângulos."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão e verificação de áreas e geometria",
    conteudo: "Problemas integrados de representação cartesiana, simetria e áreas de figuras planas.",
    objetivos: "• Determinar a área de figuras geométricas utilizando decomposições e expressões de cálculo.\n• Aplicar conceitos geométricos em problemas contextualizados.",
    habilidade: "EF07MA31, EF07MA32, EF07MA20",
    aprendizagem: "AE8 - Resolver problemas de cálculo de áreas de figuras planas."
  }
];

const topics7_3: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Introdução à linguagem algébrica",
    conteudo: "Linguagem algébrica, expressões algébricas para cálculo de áreas e perímetros. Letras representam variáveis.",
    objetivos: "• Compreender o uso de letras como variáveis para expressar relações entre grandezas.\n• Representar situações geométricas por meio de expressões com variáveis.\n• Diferenciar variável de incógnita em situações algébricas.",
    habilidade: "EF07MA13",
    aprendizagem: "AE9 - Representar a relação entre duas grandezas, por meio de letras e símbolos, diferenciando variáveis de incógnitas."
  },
  {
    start: 6, end: 10,
    titulo: "Regularidades e sequências numéricas",
    conteudo: "Identificação de regularidades em sequências. Regras de formação por adição, subtração ou múltiplos.",
    objetivos: "• Identificar padrões e regularidades em sequências numéricas.\n• Reconhecer e descrever a regra de formação de uma sequência.\n• Construir fórmulas que permitam calcular qualquer termo de uma sequência.",
    habilidade: "EF07MA15",
    aprendizagem: "AE10 - Utilizar a simbologia algébrica para expressar regularidades."
  },
  {
    start: 11, end: 15,
    titulo: "Princípio de equivalência e igualdades",
    conteudo: "Igualdade matemática como relação de equilíbrio entre membros. Propriedades aditivas e multiplicativas da igualdade.",
    objetivos: "• Explorar a ideia de igualdade como equilíbrio usando recursos visuais.\n• Reconhecer que operações idênticas em ambos os lados de uma igualdade mantêm a equivalência.\n• Determinar valores desconhecidos em igualdades simples.",
    habilidade: "EF06MA14",
    aprendizagem: "AE11 - Resolver problemas representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade."
  },
  {
    start: 16, end: 20,
    titulo: "Resolução de equações do 1º grau",
    conteudo: "Processo de resolução de equações polinomiais do 1º grau na forma ax + b = c. Substituição e verificação.",
    objetivos: "• Resolver equações do 1º grau com números inteiros e racionais.\n• Aplicar as propriedades da igualdade para manter o equilíbrio.\n• Verificar a validade da solução por meio da substituição.",
    habilidade: "EF07MA18",
    aprendizagem: "AE11 - Resolver problemas representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade."
  },
  {
    start: 21, end: 25,
    titulo: "Estratégias e formatos de equações do 1º grau",
    conteudo: "Simplificação de equações, transposição de termos e manipulação algébrica para isolar variáveis.",
    objetivos: "• Compreender o papel das operações inversas na simplificação de equações.\n• Aplicar transformações para simplificar equações do 1º grau.\n• Resolver problemas envolvendo equações do 1º grau.",
    habilidade: "EF07MA18",
    aprendizagem: "AE11 - Resolver problemas representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade."
  },
  {
    start: 26, end: 30,
    titulo: "Modelagem e problemas com equações",
    conteudo: "Tradução de situações reais para a linguagem matemática. Modelos de equações e resolução de problemas.",
    objetivos: "• Traduzir situações do cotidiano para equações polinomiais do 1º grau.\n• Resolver equações construídas a partir da modelagem algébrica.\n• Validar e interpretar resultados no contexto dos problemas propostos.",
    habilidade: "EF07MA18, EF07MA15",
    aprendizagem: "AE11 - Resolver problemas representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade."
  }
];

const topics7_4: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Explorando ângulos e triângulos",
    conteudo: "Ângulo como elemento geométrico, classificação de ângulos. Propriedade angular dos triângulos.",
    objetivos: "• Reconhecer ângulos retos e não retos em figuras poligonais.\n• Classificar triângulos em relação a lados e ângulos.\n• Explorar a propriedade de que a soma dos ângulos internos de um triângulo resulta 180°.",
    habilidade: "EF07MA27",
    aprendizagem: "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."
  },
  {
    start: 6, end: 10,
    titulo: "Ângulos complementares, suplementares e quadriláteros",
    conteudo: "Ângulos complementares e suplementares. Equações do 1º grau aplicadas a relações angulares.",
    objetivos: "• Identificar e calcular ângulos complementares e suplementares.\n• Reconhecer relações angulares em quadriláteros e resolver equações do tipo ax + b = c correspondentes.",
    habilidade: "EF07MA27",
    aprendizagem: "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."
  },
  {
    start: 11, end: 15,
    titulo: "Razão, proporção e grandezas diretas",
    conteudo: "Conceito de razão e proporção. Constante de proporcionalidade. Grandezas diretamente proporcionais.",
    objetivos: "• Analisar situações do cotidiano envolvendo razão usando tabelas.\n• Conceituar proporção como igualdade de razões.\n• Identificar situações envolvendo grandezas diretamente proporcionais no cotidiano.",
    habilidade: "EF07MA17",
    aprendizagem: "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa entre duas grandezas, por meio de estratégias diversas."
  },
  {
    start: 16, end: 20,
    titulo: "Grandezas inversamente proporcionais e regra de três",
    conteudo: "Grandezas inversamente proporcionais, regra de três simples como estratégia de resolução.",
    objetivos: "• Reconhecer relações de proporcionalidade inversa.\n• Explorar estratégias de regra de três para resolver problemas de proporcionalidade direta e inversa.",
    habilidade: "EF07MA17",
    aprendizagem: "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa entre duas grandezas, por meio de estratégias diversas."
  },
  {
    start: 21, end: 25,
    titulo: "Explorando porcentagens no cotidiano",
    conteudo: "Porcentagens como frações e decimais. Relação entre divisão, fração e porcentagem.",
    objetivos: "• Associar as representações 10%, 25%, 50%, 75% e 100% a partes do todo.\n• Calcular porcentagens de um todo utilizando diferentes estratégias.\n• Relacionar e interpretar diferentes representações de um mesmo valor percentual.",
    habilidade: "EF07MA02",
    aprendizagem: "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples em diferentes contextos, incluindo a educação financeira."
  },
  {
    start: 26, end: 30,
    titulo: "Acréscimos e decréscimos percentuais",
    conteudo: "Acréscimo e decréscimo percentual simples. Representação e resolução de problemas usando decimais.",
    objetivos: "• Explorar o significado de acréscimo e decréscimo percentual simples, recaindo em operações com decimais.\n• Resolver problemas envolvendo descontos e acréscimos em contextos do cotidiano.",
    habilidade: "EF07MA02",
    aprendizagem: "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples em diferentes contextos, incluindo a educação financeira."
  }
];

// --- 8º ANO ---
const topics8_1: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Números racionais e operações básicas",
    conteudo: "Reconhecimento dos números racionais no cotidiano. Adição, subtração e multiplicação de números racionais.",
    objetivos: "• Reconhecer números racionais nas formas fracionária e decimal e sua localização na reta.\n• Adicionar e subtrair números positivos e negativos.\n• Multiplicar e dividir números inteiros positivos e negativos.",
    habilidade: "EF07MA10, EF07MA12, EF07MA04",
    aprendizagem: "AE1 - Resolver problemas que envolvam cálculos com números racionais, inclusive potências de expoentes inteiros, utilizando propriedades operatórias."
  },
  {
    start: 6, end: 10,
    titulo: "Multiplicação, divisão e operações fundamentais com racionais",
    conteudo: "Cálculo de multiplicação e divisão com decimais e frações positivas e negativas.",
    objetivos: "• Multiplicar e dividir números racionais positivos e negativos.\n• Resolver problemas envolvendo as quatro operações fundamentais com racionais nas formas fracionária e decimal.",
    habilidade: "EF07MA11, EF07MA12",
    aprendizagem: "AE1 - Resolver problemas que envolvam cálculos com números racionais, inclusive potências de expoentes inteiros, utilizando propriedades operatórias."
  },
  {
    start: 11, end: 15,
    titulo: "Potenciação com números racionais",
    conteudo: "Potência de um número racional com expoente natural. Conceito e operações.",
    objetivos: "• Compreender o conceito de potência com base racional e expoente natural.\n• Operar com potências de base racional e expoente natural.\n• Reconhecer regularidades em expressões com potências.",
    habilidade: "EF07MA12, EF08MA01",
    aprendizagem: "AE1 - Resolver problemas que envolvam cálculos com números racionais, inclusive potências de expoentes inteiros, utilizando propriedades operatórias."
  },
  {
    start: 16, end: 20,
    titulo: "Potências com expoente inteiro e propriedades",
    conteudo: "Potência com expoente inteiro negativo. Propriedades das potências com mesma base.",
    objetivos: "• Relacionar potências de expoentes inteiros negativos com frações e decimais.\n• Compreender e aplicar as propriedades das potências com mesma base.\n• Simplificar expressões numéricas por meio das propriedades das potências.",
    habilidade: "EF08MA01",
    aprendizagem: "AE1 - Resolver problemas que envolvam cálculos com números racionais, inclusive potências de expoentes inteiros, utilizando propriedades operatórias."
  },
  {
    start: 21, end: 25,
    titulo: "Raiz quadrada e radiciação de racionais",
    conteudo: "Conceito de raiz quadrada de números racionais. Operação de radiciação.",
    objetivos: "• Reconhecer o conceito de raiz quadrada.\n• Calcular raízes a partir da relação inversa entre potenciação e radiciação.\n• Representar uma raiz como potência de expoente fracionário.",
    habilidade: "EF08MA02",
    aprendizagem: "AE2 - Utilizar a relação entre potenciação e radiciação para representar raízes como potências de expoente fracionário e resolver problemas."
  },
  {
    start: 26, end: 30,
    titulo: "Propriedades dos radicais e cálculo",
    conteudo: "Explorar propriedades dos radicais. Decomposição do radicando em fatores primos.",
    objetivos: "• Aplicar propriedades dos radicais para calcular radiciações.\n• Decompor números naturais em fatores primos para cálculo de raízes inteiras.\n• Resolver problemas envolvendo simplificação de radicais.",
    habilidade: "EF08MA02",
    aprendizagem: "AE2 - Utilizar a relação entre potenciação e radiciação para representar raízes como potências de expoente fracionário e resolver problemas."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão e verificação de radiciação e potenciação",
    conteudo: "Problemas integrados de potenciação com expoentes inteiros, raízes e radicais.",
    objetivos: "• Resolver problemas envolvendo potências de expoentes inteiros e suas propriedades.\n• Simplificar radicais utilizando a decomposição em fatores primos.\n• Consolidar os conceitos operatórios dos racionais.",
    habilidade: "EF08MA01, EF08MA02, EF07MA12",
    aprendizagem: "AE2 - Utilizar a relação entre potenciação e radiciação."
  }
];

const topics8_2: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Cálculo algébrico e valor numérico",
    conteudo: "Introdução à linguagem algébrica. Variável como representação de uma grandeza. Substituição de variáveis por valores.",
    objetivos: "• Explorar a linguagem algébrica na representação de perímetros e áreas.\n• Compreender o processo de substituição de variáveis por números em expressões.\n• Calcular o valor numérico de expressões utilizando as propriedades operatórias.",
    habilidade: "EF07MA13, EF08MA06",
    aprendizagem: "AE3 - Calcular o valor numérico de expressões algébricas, utilizando as propriedades das operações."
  },
  {
    start: 6, end: 10,
    titulo: "Simplificação de expressões algébricas",
    conteudo: "Termos semelhantes em expressões. Adição, subtração e multiplicação de expressões por números racionais.",
    objetivos: "• Identificar e simplificar termos semelhantes em expressões algébricas.\n• Efetuar a multiplicação de expressões algébricas por números racionais.\n• Simplificar expressões por meio do uso de propriedades das operações.",
    habilidade: "EF08MA06",
    aprendizagem: "AE3 - Calcular o valor numérico de expressões algébricas, utilizando as propriedades das operações."
  },
  {
    start: 11, end: 15,
    titulo: "Equações polinomiais do 1º grau",
    conteudo: "Igualdade matemática e equivalência. Resolução de equações polinomiais do 1º grau com uma incógnita.",
    objetivos: "• Compreender a igualdade como equilíbrio entre membros.\n• Aplicar estratégias de resolução de equações do 1º grau utilizando propriedades de igualdade.\n• Resolver problemas modelados por equações do 1º grau.",
    habilidade: "EF06MA14, EF07MA18",
    aprendizagem: "AE4 - Resolver problemas que possam ser representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade, e interpretá-los geometricamente."
  },
  {
    start: 16, end: 20,
    titulo: "Equações do 1º grau com duas incógnitas",
    conteudo: "Equação polinomial do 1º grau com duas incógnitas. Soluções na forma de pares ordenados e reta no plano cartesiano.",
    objetivos: "• Compreender o conceito de equação polinomial com duas incógnitas.\n• Representar graficamente equações com duas incógnitas no plano cartesiano.\n• Identificar os pares ordenados que satisfazem a equação como pontos de uma reta.",
    habilidade: "EF08MA07, EF07MA18",
    aprendizagem: "AE4 - Resolver problemas que possam ser representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade, e interpretá-los geometricamente."
  },
  {
    start: 21, end: 25,
    titulo: "Sistemas de equações do 1º grau",
    conteudo: "Sistemas de equações do 1º grau com duas incógnitas. Ponto de interseção como solução do sistema.",
    objetivos: "• Representar graficamente sistemas de equações de 1º grau com duas incógnitas.\n• Identificar o ponto de interseção de duas retas como solução comum do sistema.\n• Resolver problemas envolvendo sistemas de equações.",
    habilidade: "EF08MA08",
    aprendizagem: "AE5 - Resolver problemas com sistemas de equações do 1º grau com duas incógnitas, utilizando a representação gráfica no plano cartesiano."
  },
  {
    start: 26, end: 30,
    titulo: "Resolução algébrica de sistemas de equações",
    conteudo: "Métodos algébricos de resolução de sistemas: método da adição e método da substituição.",
    objetivos: "• Resolver sistemas de equações utilizando o método da adição.\n• Resolver sistemas de equações utilizando o método da substituição.\n• Interpretar as soluções obtidas no contexto das situações-problema.",
    habilidade: "EF08MA08",
    aprendizagem: "AE5 - Resolver problemas com sistemas de equações do 1º grau com duas incógnitas, utilizando a representação gráfica no plano cartesiano."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão de expressões algébricas e sistemas",
    conteudo: "Resolução de problemas de sistemas aplicados a contextos variados, incluindo a educação financeira.",
    objetivos: "• Resolver problemas integrados que envolvam expressões e sistemas de equações.\n• Modelar situações de conflito de valores usando equações de 1º e 2º grau.",
    habilidade: "EF08MA08, EF08MA06, EF07MA18",
    aprendizagem: "AE5 - Resolver problemas com sistemas de equações do 1º grau."
  }
];

const topics8_3: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Equivalência de áreas de figuras planas",
    conteudo: "Conceito de área de quadriláteros e triângulos. Decomposição de figuras planas em polígonos mais simples.",
    objetivos: "• Compreender o conceito de medida de área de superfícies planas.\n• Utilizar expressões de cálculo de área de retângulos, paralelogramos e triângulos.\n• Resolver problemas envolvendo a equivalência de áreas.",
    habilidade: "EF07MA32, EF08MA19",
    aprendizagem: "AE6 - Resolver problemas que envolvam medidas de área de figuras geométricas, utilizando expressões de cálculo de área (quadriláteros, triângulos e círculos)."
  },
  {
    start: 6, end: 10,
    titulo: "Comprimento e área do círculo",
    conteudo: "Definição do número pi. Fórmulas para o cálculo de comprimento de circunferência e área de círculos.",
    objetivos: "• Compreender e aplicar a relação matemática para o comprimento da circunferência.\n• Conhecer e aplicar as expressões para cálculo da área de círculos.\n• Resolver problemas práticos que envolvam círculos e circunferências.",
    habilidade: "EF07MA33, EF08MA19",
    aprendizagem: "AE6 - Resolver problemas que envolvam medidas de área de figuras geométricas, utilizando expressões de cálculo de área (quadriláteros, triângulos e círculos)."
  },
  {
    start: 11, end: 15,
    titulo: "Conceito de volume e blocos retangulares",
    conteudo: "Conceito de volume como espaço ocupado. Empilhamento e contagem de cubos. Volume de blocos retangulares.",
    objetivos: "• Compreender o volume como medida de espaço.\n• Calcular o volume de cubos e de blocos retangulares com base na medida de suas arestas.\n• Resolver problemas práticos de cálculo de volume.",
    habilidade: "EF05MA21, EF07MA30",
    aprendizagem: "AE7 - Resolver problemas que envolvam o cálculo do volume de recipiente cujo formato é o de um bloco retangular, utilizando as relações entre volume e capacidade."
  },
  {
    start: 16, end: 20,
    titulo: "Medidas de capacidade e de volume",
    conteudo: "Relação entre volume e capacidade: 1 dm³ = 1 litro, 1 m³ = 1000 litros. Unidades usuais de medidas.",
    objetivos: "• Compreender a equivalência entre unidades de medida de volume e capacidade.\n• Resolver situações-problema envolvendo a capacidade de recipientes de formatos variados.\n• Aplicar relações de conversão de unidades.",
    habilidade: "EF08MA20",
    aprendizagem: "AE7 - Resolver problemas que envolvam o cálculo do volume de recipiente cujo formato é o de um bloco retangular, utilizando as relações entre volume e capacidade."
  },
  {
    start: 21, end: 25,
    titulo: "Explorando problemas de contagem",
    conteudo: "Estratégias de resolução de problemas de contagem: princípio multiplicativo, diagramas de árvore e tabelas de dupla entrada.",
    objetivos: "• Investigar estratégias para contagem de possibilidades.\n• Aplicar o princípio multiplicativo na resolução de problemas práticos de contagem.\n• Resolver problemas de combinatória simples.",
    habilidade: "EF05MA09, EF08MA03",
    aprendizagem: "AE8 - Resolver problemas de contagem, aplicando o princípio multiplicativo."
  },
  {
    start: 26, end: 30,
    titulo: "Probabilidade de eventos equiprováveis",
    conteudo: "Cálculo de probabilidade de eventos em espaços equiprováveis. Representação em fração, decimal e porcentagem.",
    objetivos: "• Compreender o conceito de experimento aleatório e espaço amostral.\n• Calcular a probabilidade de eventos equiprováveis como a razão entre favoráveis e possíveis.\n• Reconhecer que a soma de todas as probabilidades do espaço amostral é igual a 1.",
    habilidade: "EF08MA22",
    aprendizagem: "AE9 - Calcular a probabilidade de eventos a partir da construção do espaço espaço amostral, aplicando o princípio multiplicativo."
  }
];

const topics8_4: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Estatística: gráficos, amplitude e medidas centrais",
    conteudo: "Leitura de tabelas e gráficos. Amplitude em conjuntos de dados. Média aritmética e moda.",
    objetivos: "• Interpretar dados estatísticos apresentados em diferentes formatos.\n• Calcular a amplitude como medida de dispersão dos dados.\n• Determinar a média aritmética simples e a moda de um conjunto de dados.",
    habilidade: "EF06MA32, EF08MA25, EF07MA35",
    aprendizagem: "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."
  },
  {
    start: 6, end: 10,
    titulo: "Práticas de pesquisa estatística",
    conteudo: "Planejamento e realização de pesquisas amostrais ou censitárias. Organização de dados em tabelas.",
    objetivos: "• Planejar pesquisas definindo tema, coleta de dados (formulários) e tipo de pesquisa (amostra ou censo).\n• Organizar os resultados da pesquisa em tabelas e gráficos.\n• Comunicar os resultados por meio de relatórios estatísticos simples.",
    habilidade: "EF07MA36",
    aprendizagem: "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."
  },
  {
    start: 11, end: 15,
    titulo: "Álgebra para relacionar grandezas",
    conteudo: "Construção de sentenças algébricas para expressar relações de variação proporcional entre grandezas.",
    objetivos: "• Reconhecer padrões numéricos apresentados em tabelas.\n• Construir sentenças algébricas para relacionar variáveis.\n• Compreender a modelagem algébrica de grandezas.",
    habilidade: "EF07MA17",
    aprendizagem: "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais (direta e inversa) ou não proporcionais, expressando suas relações por meio de sentenças algébricas."
  },
  {
    start: 16, end: 20,
    titulo: "Variação de proporcionalidade direta e inversa",
    conteudo: "Proporcionalidade direta e inversa por meio de tabelas, equações e representações gráficas.",
    objetivos: "• Compreender a variação proporcional direta como relação constante.\n• Compreender a variação proporcional inversa (produto constante).\n• Resolver problemas práticos usando a regra de três simples.",
    habilidade: "EF08MA12, EF08MA13",
    aprendizagem: "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais (direta e inversa) ou não proporcionais, expressando suas relações por meio de sentenças algébricas."
  },
  {
    start: 21, end: 25,
    titulo: "Porcentagem e frações equivalentes",
    conteudo: "Associação entre porcentagens e frações equivalentes. Cálculo mental e estimativas de porcentagem.",
    objetivos: "• Relacionar porcentagens com frações e números decimais.\n• Utilizar cálculo mental e estimativas para resolver problemas simples de porcentagem.",
    habilidade: "EF06MA13, EF07MA02, EF08MA04",
    aprendizagem: "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples, utilizando cálculo mental, regra de três e calculadora."
  },
  {
    start: 26, end: 30,
    titulo: "Acréscimos e decréscimos sucessivos",
    conteudo: "Cálculo de acréscimos e descontos percentuais sucessivos sem uso de fórmulas algébricas.",
    objetivos: "• Resolver problemas envolvendo aumentos e descontos sucessivos de forma sequencial.\n• Compreender que acréscimos sucessivos não devem ser somados diretamente.\n• Aplicar estratégias de cálculo mental, escrito ou por calculadora.",
    habilidade: "EF08MA04",
    aprendizagem: "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples, utilizando cálculo mental, regra de três e calculadora."
  }
];

// --- 9º ANO ---
const topics9_1: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Números racionais e potências",
    conteudo: "Reconhecimento de números racionais. Multiplicação e potenciação com base racional e expoente natural.",
    objetivos: "• Comparar números racionais na forma fracionária e decimal na reta.\n• Resolver problemas relacionados à multiplicação e potenciação de racionais.\n• Efetuar cálculos de potências de números positivos e negativos.",
    habilidade: "EF09MA04, EF09MA03",
    aprendizagem: "AE1 - Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias."
  },
  {
    start: 6, end: 10,
    titulo: "Propriedades da potenciação com racionais",
    conteudo: "Uso das propriedades operatórias da potenciação com bases racionais.",
    objetivos: "• Reconhecer e aplicar as propriedades da potenciação para simplificar expressões.\n• Resolver problemas envolvendo potências de expoentes inteiros positivos e negativos.",
    habilidade: "EF09MA03, EF09MA04",
    aprendizagem: "AE1 - Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias."
  },
  {
    start: 11, end: 15,
    titulo: "Radiciação e raízes de números racionais",
    conteudo: "Operação de radiciação. Raízes quadradas e cúbicas. Potências com expoente fracionário.",
    objetivos: "• Calcular raízes a partir da relação inversa entre potenciação e radiciação.\n• Representar uma raiz como potência de expoente fracionário.\n• Aplicar propriedades dos radicais para simplificar radicais.",
    habilidade: "EF09MA03, EF09MA04",
    aprendizagem: "AE1 - Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias."
  },
  {
    start: 16, end: 20,
    titulo: "Estratégias de cálculo com radicais e revisão",
    conteudo: "Fatoração e simplificação de radicais. Decomposição do radicando em fatores primos.",
    objetivos: "• Utilizar a decomposição em fatores primos para simplificar radicais cujos resultados não são exatos.\n• Resolver problemas envolvendo as propriedades operatórias de potências e radicais.",
    habilidade: "EF09MA03, EF09MA04",
    aprendizagem: "AE1 - Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias."
  },
  {
    start: 21, end: 25,
    titulo: "Características e semelhança de triângulos",
    conteudo: "Classificação de triângulos. Conceito de semelhança de triângulos (ângulos congruentes e lados proporcionais).",
    objetivos: "• Reconhecer triângulos e classificá-los em relação a lados e ângulos.\n• Identificar as condições necessárias e suficientes para que dois triângulos sejam semelhantes.\n• Construir figuras semelhantes por ampliação e redução.",
    habilidade: "EF09MA10, EF09MA12",
    aprendizagem: "AE2 - Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes, utilizando-as para resolver problemas."
  },
  {
    start: 26, end: 30,
    titulo: "Critérios de semelhança e Teorema de Tales",
    conteudo: "Os três critérios de semelhança de triângulos. Enunciado e aplicações do Teorema de Tales.",
    objetivos: "• Aplicar os critérios de semelhança para calcular medidas desconhecidas em triângulos.\n• Compreender o Teorema de Tales como relação proporcional entre retas paralelas cortadas por transversais.\n• Resolver problemas geométricos práticos.",
    habilidade: "EF09MA12, EF09MA24*",
    aprendizagem: "AE2 - Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes, utilizando-as para resolver problemas."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão geral de potências, radicais e semelhança",
    conteudo: "Problemas de revisão conectando potências, radiciação, Teorema de Tales e semelhança de triângulos.",
    objetivos: "• Aplicar o teorema de Tales em modelagem geométrica.\n• Resolver problemas que integrem semelhança de triângulos com representações numéricas.",
    habilidade: "EF09MA03, EF09MA12, EF09MA24*",
    aprendizagem: "AE2 - Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes."
  }
];

const topics9_2: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Semelhança no triângulo retângulo e relações métricas",
    conteudo: "Semelhança aplicada a triângulos retângulos. Dedução de relações métricas.",
    objetivos: "• Reconhecer triângulos retângulos e suas propriedades de semelhança.\n• Deduzir e aplicar as relações métricas do triângulo retângulo.\n• Resolver problemas práticos usando relações métricas.",
    habilidade: "EF09MA12, EF09MA13",
    aprendizagem: "AE3 - Reconhecer relações métricas do triângulo retângulo, entre elas o teorema de Pitágoras, utilizando, inclusive, a semelhança de triângulos."
  },
  {
    start: 6, end: 10,
    titulo: "O Teorema de Pitágoras",
    conteudo: "Demonstração e aplicações do Teorema de Pitágoras no plano e em situações reais.",
    objetivos: "• Demonstrar o Teorema de Pitágoras usando semelhança.\n• Aplicar a fórmula a² = b² + c² para resolver problemas de medidas de lados e diagonais.\n• Utilizar a radiciação como operação inversa da potenciação na geometria.",
    habilidade: "EF09MA13, EF09MA14",
    aprendizagem: "AE3 - Reconhecer relações métricas do triângulo retângulo, entre elas o teorema de Pitágoras, utilizando, inclusive, a semelhança de triângulos. AE4 - Resolver problemas com a aplicação do teorema de Pitágoras."
  },
  {
    start: 11, end: 15,
    titulo: "Números racionais infinitos e fração geratriz",
    conteudo: "Densidade dos racionais, dízimas periódicas e frações geratrizes.",
    objetivos: "• Reconhecer que dízimas periódicas representam números racionais.\n• Aplicar estratégias de manipulação de frações para obter a fração geratriz.\n• Compreender a densidade dos números racionais na reta numérica.",
    habilidade: "EF07MA10, EF08MA05, EF09MA01",
    aprendizagem: "AE5 - Reconhecer que existem segmentos de reta cujo comprimento não é expresso por número racional."
  },
  {
    start: 16, end: 20,
    titulo: "O conjunto dos números irracionais e reais",
    conteudo: "Conceito de número irracional (representações não periódicas). O conjunto dos números reais na reta.",
    objetivos: "• Identificar e diferenciar números racionais de irracionais.\n• Reconhecer que o conjunto dos números reais é formado pela união dos racionais e irracionais.\n• Representar números reais e irracionais na reta numérica por meio de aproximações decimais.",
    habilidade: "EF09MA02, EF09MA03",
    aprendizagem: "AE6 - Estimar a localização na reta numérica de números irracionais. AE7 - Resolver problemas envolvendo os números reais."
  },
  {
    start: 21, end: 25,
    titulo: "Operações com números reais",
    conteudo: "Cálculos e operações fundamentais (soma, subtração, multiplicação, divisão, potenciação e radicais) com reais.",
    objetivos: "• Efetuar cálculos com números reais utilizando aproximações decimais.\n• Compreender as propriedades das operações reais no plano da reta numérica.\n• Resolver problemas que envolvam operações combinadas com reais.",
    habilidade: "EF09MA04, EF09MA03",
    aprendizagem: "AE7 - Resolver problemas envolvendo os números reais, realizando operações e representando esses números na reta numérica."
  },
  {
    start: 26, end: 30,
    titulo: "Expressões algébricas e números reais",
    conteudo: "Substituição de valores reais em expressões algébricas com potências e radicais.",
    objetivos: "• Resolver problemas que envolvam o cálculo do valor numérico de expressões com potências e raízes.\n• Utilizar as propriedades das operações para simplificar expressões algébricas com radicais.",
    habilidade: "EF08MA06",
    aprendizagem: "AE7 - Resolver problemas envolvendo os números reais, realizando operações e representando esses números na reta numérica."
  },
  {
    start: 31, end: 35,
    titulo: "Revisão e verificação de números reais e Teorema de Pitágoras",
    conteudo: "Resolução de problemas que envolvam o Teorema de Pitágoras em contextos tridimensionais, dízimas e números irracionais.",
    objetivos: "• Resolver problemas práticos integrando Geometria e os subconjuntos de Reais.\n• Consolidar os conceitos de operações nos Reais.",
    habilidade: "EF09MA14, EF09MA02, EF09MA04",
    aprendizagem: "AE7 - Resolver problemas de reais e geometria."
  }
];

const topics9_3: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Variáveis, incógnitas e equações do 1º grau",
    conteudo: "Diferenciação de variável e incógnita. Revisão de equações do 1º grau e modelagem de problemas.",
    objetivos: "• Compreender a diferença conceitual entre variável e incógnita.\n• Resolver problemas modelados por igualdades polinomiais do 1º grau.\n• Praticar o uso de propriedades de igualdade.",
    habilidade: "EF07MA18",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  },
  {
    start: 6, end: 10,
    titulo: "Equações do 2º grau incompletas",
    conteudo: "Definição de equações do 2º grau. Resolução de equações incompletas (sem b ou sem c).",
    objetivos: "• Identificar equações do 2º grau incompletas e o papel do expoente 2.\n• Resolver equações do tipo ax² + c = 0 ou ax² + bx = 0.\n• Compreender que equações do 2º grau podem admitir duas soluções reais.",
    habilidade: "EF08MA09",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  },
  {
    start: 11, end: 15,
    titulo: "Produtos notáveis e fatoração de expressões",
    conteudo: "O quadrado da soma, o quadrado da diferença e o produto da soma pela diferença. Fatoração de expressões algébricas.",
    objetivos: "• Reconhecer e desenvolver produtos notáveis algébricos.\n• Compreender a fatoração de expressões (colocação em evidência e agrupamento).\n• Associar produtos notáveis à fatoração de equações de 2º grau.",
    habilidade: "EF09MA09",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  },
  {
    start: 16, end: 20,
    titulo: "A fórmula resolutiva das equações do 2º grau",
    conteudo: "Dedução e aplicação da fórmula de Bhaskara. O discriminante (delta) e a existência de raízes.",
    objetivos: "• Compreender e deduzir a fórmula geral de resolução de equações de 2º grau.\n• Aplicar a fórmula de Bhaskara para encontrar raízes de equações completas.\n• Analisar o discriminante para prever o número de soluções (delta positivo, zero ou negativo).",
    habilidade: "EF09MA09",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  },
  {
    start: 21, end: 25,
    titulo: "Resolução por Soma e Produto e relações entre raízes",
    conteudo: "Relações entre os coeficientes de uma equação de 2º grau e suas raízes (relações de Girard: soma e produto).",
    objetivos: "• Identificar relações de soma e produto em equações do 2º grau.\n• Resolver equações por meio do cálculo mental de soma e produto.\n• Resolver problemas modelados por equações de 2º grau.",
    habilidade: "EF09MA09",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  },
  {
    start: 26, end: 30,
    titulo: "Problemas integrados e equações simultâneas de 1º e 2º grau",
    conteudo: "Sistemas simples ou equações mistas em problemas geométricos (áreas) e do cotidiano.",
    objetivos: "• Resolver problemas práticos que exijam o uso de equações de 1º e 2º graus simultaneamente.\n• Praticar a análise de validade de raízes em problemas geométricos.",
    habilidade: "EF09MA09, EF08MA09, EF07MA18",
    aprendizagem: "AE8 - Resolver problemas envolvendo equações polinomiais do 1º e do 2º grau por meio de estratégias pessoais diversas."
  }
];

const topics9_4: TopicConfig[] = [
  {
    start: 1, end: 5,
    titulo: "Área e perímetro de figuras por decomposição",
    conteudo: "Cálculo de área e perímetro de figuras planas complexas por meio de sua decomposição.",
    objetivos: "• Diferenciar claramente os conceitos de área e perímetro.\n• Estimar e calcular a área de figuras geométricas planas que possam ser decompostas em triângulos e retângulos.\n• Resolver problemas práticos de pavimentação.",
    habilidade: "EF08MA19",
    aprendizagem: "AE9 - Resolver problemas envolvendo área de figuras geométricas planas que possam ser decompostas em triângulos, retângulos, círculos e semicírculos, por meio de estratégias pessoais diversas."
  },
  {
    start: 6, end: 10,
    titulo: "Círculo, circunferência e setores circulares",
    conteudo: "Comprimento da circunferência, área do círculo e área de setores circulares por proporcionalidade.",
    objetivos: "• Aplicar a relação matemática para o cálculo de comprimento de circunferência e área de círculos.\n• Compreender o cálculo de áreas de setores circulares por meio de relações de proporcionalidade e ângulos centrais.\n• Resolver problemas envolvendo áreas circulares.",
    habilidade: "EF07MA33, EF09MA11, EF08MA19",
    aprendizagem: "AE9 - Resolver problemas envolvendo área de figuras geométricas planas que possam ser decompostas em triângulos, retângulos, círculos e semicírculos, por meio de estratégias pessoais diversas."
  },
  {
    start: 11, end: 15,
    titulo: "Noções elementares de probabilidade",
    conteudo: "Conceito de probabilidade experimental, simulações de experimentos aleatórios.",
    objetivos: "• Realizar experimentos aleatórios simples ou simulações digitais de probabilidade.\n• Estimar e calcular probabilidades como fração, decimal e porcentagem.\n• Diferenciar probabilidade teórica de probabilidade experimental.",
    habilidade: "EF07MA34, EF06MA30, EF09MA20",
    aprendizagem: "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade, em contextos relacionados a eventos independentes em experimentos aleatórios."
  },
  {
    start: 16, end: 20,
    titulo: "Espaço amostral e eventos independentes",
    conteudo: "Construção de espaços amostrais. Cálculo de probabilidade de eventos dependentes e independentes.",
    objetivos: "• Construir espaços amostrais de experimentos compostos usando diagramas ou tabelas.\n• Diferenciar eventos dependentes de eventos independentes em contextos reais.\n• Resolver problemas de probabilidade composta.",
    habilidade: "EF08MA22, EF09MA20",
    aprendizagem: "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade, em contextos relacionados a eventos independentes em experimentos aleatórios."
  },
  {
    start: 21, end: 25,
    titulo: "Proporcionalidade de grandezas e escala",
    conteudo: "Variação proporcional direta e inversa. Conceito de escala e problemas práticos.",
    objetivos: "• Identificar proporcionalidade direta e inversa em tabelas e sentenças.\n• Compreender o conceito de escala (razão de semelhança).\n• Resolver problemas envolvendo escalas em mapas e plantas baixas.",
    habilidade: "EF08MA12, EF09MA08",
    aprendizagem: "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa entre grandezas, inclusive escalas e divisão em partes proporcionais."
  },
  {
    start: 26, end: 30,
    titulo: "Divisão proporcional e regra de três composta",
    conteudo: "Divisão de grandezas em partes diretamente ou inversamente proporcionais. Regra de três composta.",
    objetivos: "• Resolver problemas práticos que envolvam a partição de valores em partes proporcionais.\n• Compreender o funcionamento da regra de três composta envolvendo mais de duas grandezas.\n• Resolver problemas contextualizados de proporcionalidade.",
    habilidade: "EF09MA08",
    aprendizagem: "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa entre grandezas, inclusive escalas e divisão em partes proporcionais."
  }
];

// ==================== DATA COMPILATION ====================

// --- 1ª SÉRIE ---
const topics1em_1: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Números reais e racionais, potenciação e radiciação",
    conteudo: "Identificação, uso e operações fundamentais com números racionais e reais.",
    objetivos: "• Compreender e utilizar operações com números reais, incluindo potenciação e radiciação.\n• Resolver problemas práticos do cotidiano e em contextos matemáticos diversos.",
    habilidade: "EM13MAT103, EF07MA12, EF08MA01, EF08MA02",
    aprendizagem: "AE1 - Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões."
  },
  {
    start: 9, end: 16,
    titulo: "Teorema de Pitágoras e raízes quadradas",
    conteudo: "Demonstração e aplicação do Teorema de Pitágoras e estimativa de raízes quadradas.",
    objetivos: "• Compreender a demonstração geométrica do teorema de Pitágoras.\n• Determinar medidas desconhecidas de um triângulo retângulo.",
    habilidade: "EM13MAT308, EF09MA14, EF09MA03",
    aprendizagem: "AE2 - Resolver problemas geométricos que envolvem o Teorema de Pitágoras."
  },
  {
    start: 17, end: 24,
    titulo: "Conjunto dos números reais, dízimas e intervalos",
    conteudo: "Localização de irracionais na reta, frações geratrizes e intervalos reais.",
    objetivos: "• Representar e comparar números reais e irracionais na reta numérica.\n• Compreender a continuidade da reta real por meio de intervalos.",
    habilidade: "EF09MA01, EF08MA05, EF09MA02, EF07MA12",
    aprendizagem: "AE1 - Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e verificação de números reais e Pitágoras",
    conteudo: "Revisão prática e verificação de dízimas periódicas, irracionais, radiciação e Pitágoras.",
    objetivos: "• Consolidar conceitos de operações nos números reais e aplicações geométricas.\n• Resolver problemas práticos avaliativos.",
    habilidade: "EF09MA14, EF09MA02, EF09MA03",
    aprendizagem: "AE1 - Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões."
  }
];

const topics1em_2: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Equações do 1º grau, modelagem e grandezas",
    conteudo: "Equações polinomiais do 1º grau, modelagem algébrica de problemas.",
    objetivos: "• Resolver equações de 1º grau na forma ax + b = c.\n• Compreender a razão e relação entre grandezas de espécies diferentes.",
    habilidade: "EF07MA18, EF09MA07",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 1º grau, resolvendo equações e usando representações algébricas e geométricas."
  },
  {
    start: 9, end: 16,
    titulo: "Relação entre grandezas e conceito de função",
    conteudo: "Relações diretas/inversas de dependência e formalização de funções.",
    objetivos: "• Compreender e representar funções por meio de diagramas, tabelas e plano cartesiano.\n• Diferenciar relações de dependência unívoca.",
    habilidade: "EM13MAT101, EM13MAT104, EM13MAT501, EF09MA06",
    aprendizagem: "AE3 - Reconhecer as funções como relações de dependência unívoca entre duas variáveis, identificando as relações entre duas grandezas, em situações econômicas, sociais e das Ciências da Natureza."
  },
  {
    start: 17, end: 24,
    titulo: "Função afim e suas representações",
    conteudo: "Definição, taxa de crescimento, zeros de função afim e proporcionalidade linear.",
    objetivos: "• Modelar and resolver problemas envolvendo funções polinomiais de 1º grau.\n• Esboçar and interpretar gráficos de função afim.",
    habilidade: "EM13MAT302, EM13MAT404, EM13MAT501, EM13MAT401",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 1º grau, resolvendo equações e usando representações algébricas e geométricas."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e aulas complementares de função afim",
    conteudo: "Resolução de problemas, revisão conceitual e aplicações práticas.",
    objetivos: "• Resolver problemas práticos complementares sobre equações e funções lineares.\n• Consolidar os conceitos estudados no bimestre.",
    habilidade: "EM13MAT401, EF07MA18, EM13MAT501",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 1º grau, resolvendo equações e usando representações algébricas e geométricas."
  }
];

const topics1em_3: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Retomada, taxa de variação e modelagem de função afim",
    conteudo: "Coeficientes angular e linear, obtenção da lei de formação a partir do gráfico.",
    objetivos: "• Identificar e obter a taxa de variação de uma função afim.\n• Explorar etapas para a modelagem algébrica e gráfica.",
    habilidade: "EM13MAT401, EM13MAT302",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 1º grau, resolvendo equações e usando representações algébricas e geométricas."
  },
  {
    start: 9, end: 16,
    titulo: "Equações do 2º grau incompletas e completas na geometria",
    conteudo: "Resolução por fatoração e por fórmula resolutiva (Bhaskara).",
    objetivos: "• Resolver equações de 2º grau incompletas e completas.\n• Explorar situações envolvendo áreas geométricas e medidas desconhecidas.",
    habilidade: "EF08MA09, EF09MA09",
    aprendizagem: "AE5 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 2º grau, resolvendo equações e usando representações algébricas e geométricas."
  },
  {
    start: 17, end: 24,
    titulo: "Função polinomial do 2º grau",
    conteudo: "Conceito, elementos, zeros da função e modelagem algébrica.",
    objetivos: "• Compreender e construir gráficos de funções polinomiais de 2º grau (parábolas).\n• Investigar o comportamento e as leis de formação.",
    habilidade: "EM13MAT502, EM13MAT402",
    aprendizagem: "AE5 - Resolver situações-problema que possam ser modeladas por funções polinomiais de 2º grau, resolvendo equações e usando representações algébricas e geométricas."
  }
];

const topics1em_4: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Explorando o gráfico, vértice e otimização de função do 2º grau",
    conteudo: "Coordenadas do vértice da parábola, ponto de máximo e mínimo.",
    objetivos: "• Determinar e compreender o significado do vértice da parábola.\n• Resolver problemas de otimização envolvendo valores máximos e mínimos.",
    habilidade: "EM13MAT302, EM13MAT402, EM13MAT503",
    aprendizagem: "AE6 - Resolver problemas de otimização envolvendo funções quadráticas, relacionando representações algébricas e geométricas."
  },
  {
    start: 9, end: 16,
    titulo: "Revisão e problemas integrados de funções polinomiais",
    conteudo: "Análise combinada e comparação de funções polinomiais do 1º e 2º grau.",
    objetivos: "• Resolver problemas práticos modelados por funções afins ou quadráticas.\n• Realizar testes avaliativos de verificação das aprendizagens.",
    habilidade: "EM13MAT302, EM13MAT401, EM13MAT402",
    aprendizagem: "AE4 - Resolver de 1º grau. AE5 - Resolver de 2º grau."
  },
  {
    start: 17, end: 24,
    titulo: "Grandezas direta e inversamente proporcionais e gráficos",
    conteudo: "Variação proporcional direta e inversa, modelagem algébrica e representação gráfica.",
    objetivos: "• Diferenciar e representar no plano cartesiano relações proporcionais.\n• Resolver problemas envolvendo escalas e variações de grandezas.",
    habilidade: "EF09MA08, EM13MAT103, EM13MAT401",
    aprendizagem: "AE1 - Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões."
  }
];

// --- 2ª SÉRIE ---
const topics2em_1: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Potenciação, expoentes fracionários e notação científica",
    conteudo: "Potências com expoentes inteiros e fracionários, propriedades e notação científica.",
    objetivos: "• Compreender e efetuar cálculos com potências de expoente fracionário e radiciação.\n• Representar números e efetuar operações utilizando notação científica.",
    habilidade: "EF08MA01, EF09MA03, EM13MAT103, EM13MAT313",
    aprendizagem: "AE1 - Utilizar a notação científica para representar medidas e resolver problemas que empregam unidades de medida de diferentes grandezas."
  },
  {
    start: 9, end: 16,
    titulo: "Equações do 1º e 2º grau, produtos notáveis e fatoração",
    conteudo: "Resolução de equações de 1º e 2º grau com produtos notáveis e fatoração algébrica.",
    objetivos: "• Modelar e resolver algebricamente problemas do 1º e 2º grau.\n• Aplicar fatoração de expressões algébricas para simplificação de cálculos.",
    habilidade: "EF07MA18, EM13MAT101, EF09MA09",
    aprendizagem: "AE2 - Modelar problemas que possam ser representados por equações polinomiais do 1º e 2º graus, em situações econômicas, sociais e das Ciências da Natureza."
  },
  {
    start: 17, end: 24,
    titulo: "Crescimento exponencial, propriedades e equações",
    conteudo: "Sequências e equações exponenciais, propriedades de potências e mudança de variável.",
    objetivos: "• Diferenciar crescimento linear de exponencial.\n• Resolver equações exponenciais simples ou com mudança de variável.",
    habilidade: "EM13MAT304",
    aprendizagem: "AE3 - Resolver situações-problema que possam ser modeladas por funções exponenciais, resolvendo equações e utilizando das representações algébricas e geométricas."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e verificação de equações e potenciação",
    conteudo: "Resolução de problemas de revisão, equações lineares, quadráticas e exponenciais.",
    objetivos: "• Consolidar os procedimentos de potenciação e resoluções de equações.\n• Realizar verificações individuais de conteúdo.",
    habilidade: "EM13MAT313, EF07MA18, EM13MAT304",
    aprendizagem: "AE3 - Resolver situações-problema que possam ser modeladas por funções exponenciais."
  }
];

const topics2em_2: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Explorando a função exponencial e gráficos",
    conteudo: "Conceito, base de restrição, comportamento e esboços de gráficos exponenciais.",
    objetivos: "• Esboçar e analisar gráficos de funções exponenciais.\n• Modelar situações de crescimento e decrescimento populacional ou financeiro.",
    habilidade: "EM13MAT304",
    aprendizagem: "AE3 - Resolver situações-problema que possam ser modeladas por funções exponenciais, resolvendo equações e utilizando das representações algébricas e geométricas."
  },
  {
    start: 9, end: 16,
    titulo: "Logaritmos, propriedades operatórias e equações",
    conteudo: "Conceito de logaritmo, propriedades de produto, quociente, potência e mudança de base.",
    objetivos: "• Calcular logaritmos de números reais.\n• Resolver equações logarítmicas utilizando a definição e propriedades operatórias.",
    habilidade: "EM13MAT305",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções logarítmicas, resolvendo equações e fazendo uso das representações algébricas e geométricas."
  },
  {
    start: 17, end: 24,
    titulo: "Funções logarítmicas e suas propriedades",
    conteudo: "Conceito de função logarítmica, relação com a exponencial e gráficos.",
    objetivos: "• Identificar e analisar o comportamento e gráficos de funções logarítmicas.\n• Resolver problemas reais em contextos como abalos sísmicos (escala Richter) e pH.",
    habilidade: "EM13MAT403, EM13MAT305",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções logarítmicas, resolvendo equações e fazendo uso das representações algébricas e geométricas."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e aulas complementares de funções e logaritmos",
    conteudo: "Revisão integradora de funções exponenciais, logaritmos e suas aplicações.",
    objetivos: "• Resolver problemas práticos integrados de fim de bimestre.\n• Realizar avaliações somativas das aprendizagens.",
    habilidade: "EM13MAT304, EM13MAT305",
    aprendizagem: "AE4 - Resolver situações-problema que possam ser modeladas por funções logarítmicas."
  }
];

const topics2em_3: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Progressão aritmética (PA) e soma de termos",
    conteudo: "Regularidades em sequências, termo geral de PA, propriedades e soma dos n primeiros termos.",
    objetivos: "• Identificar regularidades, obter o termo geral e classificar PAs.\n• Calcular a soma dos termos de uma PA em contextos práticos.",
    habilidade: "EM13MAT507",
    aprendizagem: "AE5 - Associar progressões aritméticas a funções afins de domínio discreto, deduzindo fórmulas e aplicando-as em situações-problema."
  },
  {
    start: 9, end: 16,
    titulo: "Progressão geométrica (PG) e soma finita e infinita",
    conteudo: "Conceito, termo geral de PG, soma finita e limite da soma infinita.",
    objetivos: "• Compreender o comportamento de PGs crescentes e decrescentes.\n• Calcular a soma de termos de uma PG finita ou PG infinita.",
    habilidade: "EM13MAT508",
    aprendizagem: "AE6 - Associar progressões geométricas a funções exponenciais de domínio discreto, deduzindo fórmulas e aplicando-as em situações-problema."
  },
  {
    start: 17, end: 24,
    titulo: "PA, PG, juros simples e juros compostos",
    conteudo: "Relações entre progressões e funções, montantes de juros simples e compostos.",
    objetivos: "• Relacionar juros simples à PA (crescimento linear) e juros compostos à PG (crescimento exponencial).\n• Resolver problemas financeiros reais de comparação de regimes de capitalização.",
    habilidade: "EM13MAT507, EM13MAT508, EM13MAT303",
    aprendizagem: "AE7 - Comparar situações de juros simples e compostos, destacando os comportamentos de crescimento linear e exponencial."
  }
];

const topics2em_4: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Áreas de figuras geométricas planas",
    conteudo: "Cálculo de áreas de quadrados, retângulos, triângulos, trapézios, losangos, círculos e setores.",
    objetivos: "• Compreender as relações matemáticas para cálculo de superfícies planas.\n• Resolver problemas práticos envolvendo áreas regulares e decomposição de figuras.",
    habilidade: "EM13MAT307",
    aprendizagem: "AE8 - Empregar diferentes métodos para a obtenção da medida da área de uma superfície e deduzir expressões de cálculo para aplicá-las em situações reais."
  },
  {
    start: 9, end: 16,
    titulo: "Poliedros, relação de Euler, prismas e pirâmides",
    conteudo: "Vértices, arestas e faces, planificações, áreas e volumes de prismas e pirâmides.",
    objetivos: "• Aplicar a relação de Euler para poliedros convexos.\n• Calcular áreas laterais, totais e volumes de prismas e pirâmides.",
    habilidade: "EF06MA17, EM13MAT309",
    aprendizagem: "AE9 - Resolver problemas que envolvem o cálculo de áreas totais e de volumes de prismas, pirâmides, cilindros e cones em situações reais."
  },
  {
    start: 17, end: 24,
    titulo: "Unidades de volume e capacidade, cilindros e cones",
    conteudo: "Fórmulas, áreas laterais/totais e cálculo de volumes de cilindros e cones circulares.",
    objetivos: "• Compreender a relação entre volume e capacidade de blocos e corpos redondos.\n• Resolver problemas práticos industriais, reservatórios e embalagens.",
    habilidade: "EM13MAT309",
    aprendizagem: "AE9 - Resolver problemas que envolvem o cálculo de áreas totais e de volumes de prismas, pirâmides, cilindros e cones em situações reais."
  }
];

// --- 3ª SÉRIE ---
const topics3em_1: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Equações do 1º e 2º grau e proporcionalidade",
    conteudo: "Propriedades da igualdade, equações de 1º grau, Bhaskara e equações incompletas de 2º grau.",
    objetivos: "• Resolver equações de 1º e 2º grau com uma incógnita em problemas reais.\n• Investigar relações de razão e proporção de grandezas de espécies diferentes.",
    habilidade: "EF07MA18, EF08MA09, EF09MA09, EM13MAT302, EM13MAT104, EM13MAT101",
    aprendizagem: "AE1 - Utilizar equações polinomiais de 1º e 2º grau para modelar situações-problema envolvendo grandezas e medidas."
  },
  {
    start: 9, end: 16,
    titulo: "Sistemas lineares com duas incógnitas",
    conteudo: "Sistemas formados por duas equações lineares com duas variáveis. Métodos algébricos e geometria.",
    objetivos: "• Resolver sistemas lineares pelo método da substituição e da adição.\n• Interpretar geometricamente e discutir a existência e quantidade de soluções.",
    habilidade: "EM13MAT301",
    aprendizagem: "AE2 - Resolver problemas do cotidiano que envolvem equações lineares simultâneas, utilizando técnicas algébricas e gráficas."
  },
  {
    start: 17, end: 24,
    titulo: "Sistemas lineares de três equações a três incógnitas",
    conteudo: "Definição de sistemas 3x3, equivalência de sistemas e método de escalonamento.",
    objetivos: "• Escalonar e resolver sistemas lineares de três equações a três incógnitas.\n• Classificar sistemas em possível/determinado, possível/indeterminado ou impossível.",
    habilidade: "EM13MAT301",
    aprendizagem: "AE2 - Resolver problemas do cotidiano que envolvem equações lineares simultâneas, utilizando técnicas algébricas e gráficas."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e verificação de equações e sistemas",
    conteudo: "Resolução de problemas práticos que recaiam em sistemas e equações polinomiais.",
    objetivos: "• Consolidar os métodos de resolução de sistemas lineares e equações.\n• Realizar testes somativos diagnósticos.",
    habilidade: "EF09MA09, EF08MA08, EM13MAT301",
    aprendizagem: "AE2 - Resolver problemas do cotidiano que envolvem equações lineares simultâneas."
  }
];

const topics3em_2: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Análise combinatória: contagem e agrupamentos",
    conteudo: "Princípio multiplicativo, fatoriais, permutações simples, arranjos e combinações.",
    objetivos: "• Aplicar o princípio fundamental da contagem para resolver problemas.\n• Distinguir e calcular o número de permutações, arranjos e combinações simples.",
    habilidade: "EM13MAT310",
    aprendizagem: "AE3 - Resolver problemas de contagem envolvendo agrupamentos ordenados ou não de elementos, recorrendo a estratégias diversas."
  },
  {
    start: 9, end: 16,
    titulo: "Noções e cálculo básico de probabilidade",
    conteudo: "Experimentos aleatórios, espaços amostrais, eventos equiprováveis e probabilidade teórica.",
    objetivos: "• Definir e descrever espaço amostral de experimentos aleatórios simples.\n• Calcular a probabilidade de eventos simples expressando em fração, decimal e porcentagem.",
    habilidade: "EF06MA30, EM13MAT311, EM13MAT511",
    aprendizagem: "AE4 - Resolver problemas de probabilidade envolvendo eventos aleatórios não sucessivos, por meio da identificação do espaço amostral e da contagem de possibilidades."
  },
  {
    start: 17, end: 24,
    titulo: "Adição, multiplicação e probabilidade condicional",
    conteudo: "União de eventos, probabilidade composta e probabilidade condicional.",
    objetivos: "• Compreender e aplicar a regra da adição e multiplicação de probabilidades.\n• Identificar eventos dependentes e independentes e calcular a probabilidade condicional.",
    habilidade: "EM13MAT311, EM13MAT312",
    aprendizagem: "AE5 - Resolver problemas de probabilidade em experimentos sucessivos, envolvendo eventos dependentes e independentes."
  },
  {
    start: 25, end: 28,
    titulo: "Revisão e aulas complementares de combinatória e probabilidade",
    conteudo: "Resolução de problemas práticos complementares integrando contagem e probabilidades.",
    objetivos: "• Aplicar técnicas combinatórias integradas a problemas complexos de probabilidade.\n• Consolidar os conceitos estudados.",
    habilidade: "EM13MAT310, EM13MAT312",
    aprendizagem: "AE5 - Resolver problemas de probabilidade em experimentos sucessivos."
  }
];

const topics3em_3: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Trigonometria no triângulo retângulo e razões",
    conteudo: "Teorema de Pitágoras, razões seno, cosseno e tangente, racionalização e ângulos notáveis.",
    objetivos: "• Definir e aplicar as razões trigonométricas fundamentais para ângulos de 30º, 45º e 60º.\n• Determinar medidas desconhecidas em triângulos retângulos.",
    habilidade: "EM13MAT308",
    aprendizagem: "AE6 - Resolver problemas que envolvem relações métricas, trigonométricas ou semelhança de triângulos, em contextos variados."
  },
  {
    start: 9, end: 16,
    titulo: "Círculo trigonométrico e funções trigonométricas",
    conteudo: "Graus e radianos, arcos côngruos, seno e cosseno no círculo e funções trigonométricas.",
    objetivos: "• Conceituar circunferência trigonométrica, quadrantes, sinais e arcos côngruos.\n• Construir e analisar os gráficos das funções periódicas seno e cosseno (domínio, imagem, período).",
    habilidade: "EM13MAT306",
    aprendizagem: "AE7 - Comparar as representações de fenômenos periódicos reais com as funções seno e cosseno no plano cartesiano."
  },
  {
    start: 17, end: 24,
    titulo: "Semelhança e leis dos senos e cossenos",
    conteudo: "Condições de semelhança de triângulos, demonstração e aplicação das leis de senos e cossenos.",
    objetivos: "• Resolver problemas envolvendo a semelhança de triângulos quaisquer.\n• Aplicar a lei dos senos e cossenos para determinar medidas em triângulos oblíquos.",
    habilidade: "EM13MAT308",
    aprendizagem: "AE6 - Resolver problemas que envolvem relações métricas, trigonométricas ou semelhança de triângulos, em contextos variados."
  }
];

const topics3em_4: TopicConfig[] = [
  {
    start: 1, end: 8,
    titulo: "Grandezas determinadas por razão/produto e regra de três",
    conteudo: "Razão de espécies diferentes, escalas, regra de três simples e composta.",
    objetivos: "• Resolver problemas práticos de escala, velocidade média e vazão.\n• Analisar relações de proporcionalidade direta e inversa entre múltiplas grandezas.",
    habilidade: "EM13MAT314",
    aprendizagem: "AE8 - Resolver problemas que envolvem grandezas determinadas pela razão ou pelo produto de outras, aplicando relações de proporcionalidade."
  },
  {
    start: 9, end: 16,
    titulo: "Estatística: medidas de tendência central e dispersão",
    conteudo: "Média simples/ponderada, mediana e moda; amplitude, variância, desvio médio e padrão.",
    objetivos: "• Calcular e interpretar a média, mediana e moda para um conjunto de dados.\n• Analisar a dispersão de dados por meio da variância e do desvio padrão em problemas reais.",
    habilidade: "EM13MAT316",
    aprendizagem: "AE9 - Resolver problemas que envolvem cálculo e interpretação das medidas de tendência central e de dispersão."
  },
  {
    start: 17, end: 24,
    titulo: "Áreas de polígonos regulares, convexos e círculo",
    conteudo: "Polígonos convexos e regulares, áreas de triângulos, hexágonos, círculo e setores.",
    objetivos: "• Compreender as relações de áreas de polígonos convexos e regulares.\n• Resolver problemas práticos de estimativa e cálculo de áreas complexas.",
    habilidade: "EM13MAT506, EM13MAT307",
    aprendizagem: "AE10 - Resolver problemas que envolvem área de figuras geométricas planas em situações reais, empregando diferentes métodos e estratégias de cálculo."
  }
];

export const initialCurriculumData: CurriculumItem[] = [
  ...generateLessons("6º Ano", "1º Bimestre", 35, topics6_1),
  ...generateLessons("6º Ano", "2º Bimestre", 35, topics6_2),
  ...generateLessons("6º Ano", "3º Bimestre", 30, topics6_3),
  ...generateLessons("6º Ano", "4º Bimestre", 30, topics6_4),

  ...generateLessons("7º Ano", "1º Bimestre", 35, topics7_1),
  ...generateLessons("7º Ano", "2º Bimestre", 35, topics7_2),
  ...generateLessons("7º Ano", "3º Bimestre", 30, topics7_3),
  ...generateLessons("7º Ano", "4º Bimestre", 30, topics7_4),

  ...generateLessons("8º Ano", "1º Bimestre", 35, topics8_1),
  ...generateLessons("8º Ano", "2º Bimestre", 35, topics8_2),
  ...generateLessons("8º Ano", "3º Bimestre", 30, topics8_3),
  ...generateLessons("8º Ano", "4º Bimestre", 30, topics8_4),

  ...generateLessons("9º Ano", "1º Bimestre", 35, topics9_1),
  ...generateLessons("9º Ano", "2º Bimestre", 35, topics9_2),
  ...generateLessons("9º Ano", "3º Bimestre", 30, topics9_3),
  ...generateLessons("9º Ano", "4º Bimestre", 30, topics9_4),

  ...generateLessons("1ª Série", "1º Bimestre", 28, topics1em_1),
  ...generateLessons("1ª Série", "2º Bimestre", 28, topics1em_2),
  ...generateLessons("1ª Série", "3º Bimestre", 24, topics1em_3),
  ...generateLessons("1ª Série", "4º Bimestre", 24, topics1em_4),

  ...generateLessons("2ª Série", "1º Bimestre", 28, topics2em_1),
  ...generateLessons("2ª Série", "2º Bimestre", 28, topics2em_2),
  ...generateLessons("2ª Série", "3º Bimestre", 24, topics2em_3),
  ...generateLessons("2ª Série", "4º Bimestre", 24, topics2em_4),

  ...generateLessons("3ª Série", "1º Bimestre", 28, topics3em_1),
  ...generateLessons("3ª Série", "2º Bimestre", 28, topics3em_2),
  ...generateLessons("3ª Série", "3º Bimestre", 24, topics3em_3),
  ...generateLessons("3ª Série", "4º Bimestre", 24, topics3em_4),

  // --- LÍNGUA PORTUGUESA (ANOS FINAIS) ---
  ...generateLessons("6º Ano", "1º Bimestre", 28, topicsLP6_1, "Língua Portuguesa"),
  ...generateLessons("6º Ano", "2º Bimestre", 28, topicsLP6_2, "Língua Portuguesa"),
  ...generateLessons("6º Ano", "3º Bimestre", 24, topicsLP6_3, "Língua Portuguesa"),
  ...generateLessons("6º Ano", "4º Bimestre", 24, topicsLP6_4, "Língua Portuguesa"),

  ...generateLessons("7º Ano", "1º Bimestre", 28, topicsLP7_1, "Língua Portuguesa"),
  ...generateLessons("7º Ano", "2º Bimestre", 28, topicsLP7_2, "Língua Portuguesa"),
  ...generateLessons("7º Ano", "3º Bimestre", 24, topicsLP7_3, "Língua Portuguesa"),
  ...generateLessons("7º Ano", "4º Bimestre", 24, topicsLP7_4, "Língua Portuguesa"),

  ...generateLessons("8º Ano", "1º Bimestre", 28, topicsLP8_1, "Língua Portuguesa"),
  ...generateLessons("8º Ano", "2º Bimestre", 28, topicsLP8_2, "Língua Portuguesa"),
  ...generateLessons("8º Ano", "3º Bimestre", 24, topicsLP8_3, "Língua Portuguesa"),
  ...generateLessons("8º Ano", "4º Bimestre", 24, topicsLP8_4, "Língua Portuguesa"),

  ...generateLessons("9º Ano", "1º Bimestre", 28, topicsLP9_1, "Língua Portuguesa"),
  ...generateLessons("9º Ano", "2º Bimestre", 28, topicsLP9_2, "Língua Portuguesa"),
  ...generateLessons("9º Ano", "3º Bimestre", 24, topicsLP9_3, "Língua Portuguesa"),
  ...generateLessons("9º Ano", "4º Bimestre", 24, topicsLP9_4, "Língua Portuguesa"),

  // --- CIÊNCIAS (ANOS FINAIS) ---
  ...generateLessons("6º Ano", "1º Bimestre", 21, topicsCiencias6_1, "Ciências"),
  ...generateLessons("6º Ano", "2º Bimestre", 21, topicsCiencias6_2, "Ciências"),
  ...generateLessons("6º Ano", "3º Bimestre", 18, topicsCiencias6_3, "Ciências"),
  ...generateLessons("6º Ano", "4º Bimestre", 18, topicsCiencias6_4, "Ciências"),

  ...generateLessons("7º Ano", "1º Bimestre", 21, topicsCiencias7_1, "Ciências"),
  ...generateLessons("7º Ano", "2º Bimestre", 21, topicsCiencias7_2, "Ciências"),
  ...generateLessons("7º Ano", "3º Bimestre", 18, topicsCiencias7_3, "Ciências"),
  ...generateLessons("7º Ano", "4º Bimestre", 18, topicsCiencias7_4, "Ciências"),

  ...generateLessons("8º Ano", "1º Bimestre", 28, topicsCiencias8_1, "Ciências"),
  ...generateLessons("8º Ano", "2º Bimestre", 28, topicsCiencias8_2, "Ciências"),
  ...generateLessons("8º Ano", "3º Bimestre", 24, topicsCiencias8_3, "Ciências"),
  ...generateLessons("8º Ano", "4º Bimestre", 24, topicsCiencias8_4, "Ciências"),

  ...generateLessons("9º Ano", "1º Bimestre", 28, topicsCiencias9_1, "Ciências"),
  ...generateLessons("9º Ano", "2º Bimestre", 28, topicsCiencias9_2, "Ciências"),
  ...generateLessons("9º Ano", "3º Bimestre", 24, topicsCiencias9_3, "Ciências"),
  ...generateLessons("9º Ano", "4º Bimestre", 24, topicsCiencias9_4, "Ciências"),

  // --- LÍNGUA PORTUGUESA (ENSINO MÉDIO) ---
  ...generateLessons("1ª Série", "1º Bimestre", 28, topicsLP1em_1, "Língua Portuguesa"),
  ...generateLessons("1ª Série", "2º Bimestre", 28, topicsLP1em_2, "Língua Portuguesa"),
  ...generateLessons("1ª Série", "3º Bimestre", 24, topicsLP1em_3, "Língua Portuguesa"),
  ...generateLessons("1ª Série", "4º Bimestre", 24, topicsLP1em_4, "Língua Portuguesa"),

  ...generateLessons("2ª Série", "1º Bimestre", 28, topicsLP2em_1, "Língua Portuguesa"),
  ...generateLessons("2ª Série", "2º Bimestre", 28, topicsLP2em_2, "Língua Portuguesa"),
  ...generateLessons("2ª Série", "3º Bimestre", 24, topicsLP2em_3, "Língua Portuguesa"),
  ...generateLessons("2ª Série", "4º Bimestre", 24, topicsLP2em_4, "Língua Portuguesa"),

  ...generateLessons("3ª Série", "1º Bimestre", 28, topicsLP3em_1, "Língua Portuguesa"),
  ...generateLessons("3ª Série", "2º Bimestre", 28, topicsLP3em_2, "Língua Portuguesa"),
  ...generateLessons("3ª Série", "3º Bimestre", 24, topicsLP3em_3, "Língua Portuguesa"),
  ...generateLessons("3ª Série", "4º Bimestre", 24, topicsLP3em_4, "Língua Portuguesa")
];
