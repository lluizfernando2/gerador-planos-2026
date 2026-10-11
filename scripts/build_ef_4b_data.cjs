const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'src', 'data', 'curriculumData.ts');

// Helper to create curriculum item
function createItem(disciplina, ano, aula, titulo, conteudo, objetivos, habilidade, aprendizagem) {
  const hab = habilidade ? habilidade.trim() : '';
  const obj = objetivos ? objetivos.trim() : '';
  return {
    id: `${disciplina.replace(/\s+/g, '')}-${ano.replace(/\s+/g, '')}-4ºBimestre-${aula}`,
    ano: ano,
    bimestre: '4º Bimestre',
    aula: String(aula),
    titulo: titulo ? titulo.trim() : '',
    conteudo: conteudo ? conteudo.trim() : '',
    objetivos: obj,
    habilidade: hab,
    habilidadeCodigo: hab,
    habilidadeTexto: obj,
    aprendizagem: aprendizagem ? aprendizagem.trim() : '',
    disciplina: disciplina
  };
}

const allItems = [
  // 1º Bimestre sample items
  {
    id: "Matemática-6ºAno-1ºBimestre-1",
    ano: "6º Ano",
    bimestre: "1º Bimestre",
    aula: "1",
    titulo: "Os números naturais em situações do cotidiano – Parte 1",
    conteudo: "Leitura, representação, identificação e utilização de números naturais.",
    objetivos: "Reconhecer o sistema de numeração decimal em contextos práticos.",
    habilidade: "EF06MA01 - Comparar, ordenar, ler e escrever números naturais.",
    habilidadeCodigo: "EF06MA01",
    habilidadeTexto: "Reconhecer o sistema de numeração decimal em contextos práticos.",
    disciplina: "Matemática"
  },
  {
    id: "Língua Portuguesa-6ºAno-1ºBimestre-1",
    ano: "6º Ano",
    bimestre: "1º Bimestre",
    aula: "1",
    titulo: "Leitura e Interpretação de Crônicas Cotidianas",
    conteudo: "Características estruturais e recursos estilísticos da crônica.",
    objetivos: "Identificar o tema e a progressão temática do texto narrativo.",
    habilidade: "EF69LP47 - Analisar a presença de recursos estilísticos na narrativa.",
    habilidadeCodigo: "EF69LP47",
    habilidadeTexto: "Identificar o tema e a progressão temática do texto narrativo.",
    disciplina: "Língua Portuguesa"
  }
];

// ================= MATEMÁTICA 6º ANO (30 AULAS) =================
const mat6 = [
  [1, "Sólidos geométricos em situações do cotidiano", "• Identificação de sólidos geométricos: cilindros, cones, pirâmides, prismas. • Classificação dos sólidos: distinção entre poliedros (prismas e pirâmides) e corpos redondos (cilindros e cones).", "• Compreender que sólidos geométricos são figuras geométricas tridimensionais maciças. • Compreender que, dependendo das características que possuem, os sólidos geométricos são classificados em poliedros ou corpos redondos. • Explorar situações do cotidiano em que os sólidos geométricos são utilizados.", "EF05MA16", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [2, "Elementos dos sólidos geométricos", "• Identificação de sólidos geométricos: cilindros, cones, pirâmides, prismas. • Classificação dos sólidos: distinção entre poliedros (prismas e pirâmides) e corpos redondos (cilindros e cones).", "• Diferenciar figuras bidimensionais de figuras tridimensionais. • Identificar, em sólidos geométricos, seus elementos: faces, arestas e vértices. • Diferenciar poliedros de corpos redondos.", "EF05MA16", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [3, "Explorando características de prismas e pirâmides", "• Elementos que constituem os prismas e pirâmides (faces, arestas e vértices). • Características dos prismas e das pirâmides. • Comparação entre prismas e pirâmides (semelhanças e diferenças).", "• Diferenciar figuras bidimensionais de figuras tridimensionais. • Identificar e quantificar vértices, faces e arestas de prismas e pirâmides. • Estabelecer relações entre o número de vértices, faces e arestas em prismas e pirâmides.", "EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [4, "Resolução de problemas - Prismas e pirâmides", "• Características dos prismas e das pirâmides. • Comparação entre prismas e pirâmides (semelhanças e diferenças).", "• Identificar e quantificar vértices, faces e arestas de prismas e pirâmides. • Estabelecer relações entre o número de vértices, faces e arestas em prismas e pirâmides.", "EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [5, "Revisão: Características de prismas e pirâmides", "• Comparação entre prismas e pirâmides (semelhanças e diferenças).", "• Identificar, em sólidos geométricos, seus elementos: faces, arestas e vértices. • Diferenciar poliedros de corpos redondos.", "EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [6, "A forma planificada de prismas e pirâmides", "• Associação de prismas e pirâmides a suas planificações. • Reconhecimento, nomeação e comparação dos polígonos que formam as faces de prismas e pirâmides.", "• Associar prismas e pirâmides com as suas planificações. • Reconhecer, nomear e comparar polígonos que representam faces de prismas e pirâmides, considerando lados, vértices e ângulos.", "EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [7, "Explorando características de cilindros e cones", "• Características dos corpos redondos. • Associação de cilindros e cones com prismas e pirâmides.", "• Diferenciar figuras bidimensionais de figuras tridimensionais. • Distinguir um sólido geométrico a partir da observação das figuras planas que o formam.", "EF05MA16", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [8, "Resolução de problemas - Prismas, pirâmides, cilindros e cones", "• Associação de prismas e pirâmides a suas planificações. • Associação de cilindros e cones com prismas e pirâmides.", "• Associar figuras geométricas a suas planificações e analisar, nomear e comparar seus atributos. • Resolver problemas envolvendo embalagens e logística.", "EF05MA16 EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [9, "Aula de verificação - Figuras geométricas espaciais", "• Identificação de sólidos geométricos: cilindros, cones, pirâmides, prismas. • Classificação dos sólidos.", "• Diferenciar figuras bidimensionais de figuras tridimensionais. • Identificar, em sólidos geométricos, seus elementos: faces, arestas e vértices.", "EF05MA16 EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [10, "Revisão: Figuras geométricas espaciais e suas planificações", "• Elementos que constituem os prismas, pirâmides e corpos redondos. • Características dos sólidos geométricos.", "• Estabelecer relações entre o número de vértices, faces e arestas em prismas e pirâmides. • Relacionar figuras geométricas espaciais e suas planificações.", "EF05MA16 EF06MA17", "AE13 - Associar figuras espaciais às suas planificações, reconhecendo e quantificando seus atributos geométricos."],
  [11, "Unidades de medida por toda parte", "• Grandezas e unidades de medida: identificação das unidades convencionais em situações do cotidiano. • Instrumentos e técnicas de medição.", "• Explorar unidades de medida em situações do cotidiano. • Compreender que medir é comparar grandezas de mesma natureza.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [12, "Medidas de comprimento", "• Unidades de medida de comprimento. • Conversão entre unidades. • Instrumentos e técnicas de medição.", "• Resolver problemas envolvendo unidades de medidas de comprimento, utilizando conversões entre as unidades de medida mais usuais.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [13, "Medidas de massa", "• Unidades de medida de massa. • Conversão simples entre unidades. • Instrumentos e técnicas de medição.", "• Resolver problemas envolvendo unidades de medidas de massa, utilizando conversões entre as unidades de medida mais usuais.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [14, "Resolução de problemas - Medidas de comprimento e de massa", "• Unidades de medida de massa e comprimento. • Conversão simples entre unidades.", "• Resolver problemas envolvendo unidades de medida de comprimento, massa e conversões usuais.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [15, "Revisão: Conversão de unidades de medida de comprimento", "• Conversão entre unidades de medida de comprimento.", "• Resolver problemas envolvendo a conversão entre unidades de medida de comprimento.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [16, "Medidas de capacidade", "• Unidades de medida de capacidade. • Relações entre unidades de capacidade. • Instrumentos de medição.", "• Resolver situações-problema envolvendo medidas de capacidade.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa, e capacidade."],
  [17, "Medidas de tempo", "• Unidades de medida de tempo. • Conversão entre unidades temporais. • Cálculo de intervalos temporais.", "• Identificar e utilizar adequadamente as unidades de medida de tempo. • Converter medidas de tempo entre unidades diferentes.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade."],
  [18, "Resolução de problemas - Medidas de capacidade e de tempo", "• Unidades de medida de capacidade e de tempo. • Instrumentos de medição. • Conversão entre unidades.", "• Reconhecer as unidades de medida de tempo e capacidade mais usuais. • Resolver problemas práticos que envolvam cálculos com tempo.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade."],
  [19, "Aula de verificação - Grandezas e medidas (comprimento, massa, capacidade e tempo)", "• Grandezas e medidas: comprimento, massa, capacidade e tempo. • Sistema de unidades e conversão.", "• Resolver situações-problema que envolvam diferentes grandezas, selecionando unidades adequadas.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade."],
  [20, "Revisão: Grandezas e conversão de unidades", "• Grandezas e medidas: comprimento, massa, tempo e capacidade. • Conversão entre unidades de medida.", "• Resolver situações-problema que envolvam diferentes grandezas, mobilizando conhecimentos já estudados.", "EF06MA24", "AE14 - Resolver problemas envolvendo unidades de medida de comprimento, tempo, massa e capacidade."],
  [21, "Medindo superfícies", "• Conceito de área. • Medição em malha quadriculada. • Comparação de superfícies.", "• Explorar o conceito de área em situações envolvendo medidas de superfície, utilizando malhas quadriculadas.", "EF06MA24", "AE16 - Resolver problemas envolvendo a área de retângulos e triângulos, sem fazer uso de fórmulas."],
  [22, "Área de quadrados e retângulos", "• Cálculo de áreas em malha quadriculada. • Relação entre dimensões e área.", "• Calcular áreas de quadrados e retângulos utilizando malhas quadriculadas como suporte visual e estratégias de contagem.", "EF06MA03 EF06MA24", "AE15 - Associar a área de um quadrado a uma potência de expoente 2 e volume de cubo a expoente 3."],
  [23, "Área de triângulos", "• Cálculo de áreas triangulares em malha quadriculada. • Decomposição de figuras.", "• Calcular áreas de triângulos utilizando malhas quadriculadas como suporte visual, contando quadradinhos inteiros e frações.", "EF06MA24", "AE16 - Resolver problemas envolvendo a área de retângulos e triângulos, sem fazer uso de fórmulas."],
  [24, "Resolução de problemas, envolvendo áreas de retângulos e triângulos", "• Cálculo de áreas de quadrados, retângulos e triângulos. • Potências com expoente 2.", "• Calcular áreas de quadrados, retângulos e triângulos utilizando diferentes estratégias.", "EF06MA03 EF06MA24", "AE15 - Associar a área de um quadrado a expoente 2 e volume a expoente 3."],
  [25, "Revisão: Área de quadrados, retângulos e triângulos", "• Cálculo de área de figuras planas: quadrado, retângulo e triângulo em malha quadriculada.", "• Resolver situações-problema que envolvam o cálculo de área de quadrados, retângulos e triângulos.", "EF06MA24", "AE16 - Resolver problemas envolvendo a área de retângulos e triângulos, sem fazer uso de fórmulas."],
  [26, "Volume de cubos - Parte 1", "• Volume como grandeza associada a sólidos geométricos. • Empilhamento e contagem. • Potência com expoente 3.", "• Reconhecer volume como grandeza associada a sólidos geométricos. • Medir volumes por meio de empilhamento de cubos.", "EF06MA03 EF06MA24", "AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares, por empilhamento de cubos."],
  [27, "Volume de cubos - Parte 2", "• Volume como grandeza associada a sólidos geométricos. • Unidades de medida de área e volume.", "• Reconhecer unidades de medida de volume. • Diferenciar unidades de medida de comprimento, área e volume.", "EF06MA03 EF06MA24", "AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares, por empilhamento de cubos."],
  [28, "Resolução de problemas envolvendo volume", "• Determinação do volume de sólidos por meio do empilhamento de cubos. • Volume de um cubo.", "• Resolver situações-problema envolvendo medidas de volume.", "EF06MA03 EF06MA24", "AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares, por empilhamento de cubos."],
  [29, "Aula de verificação - Área em malhas quadriculadas e volume por empilhamento", "• Área de figuras em malhas quadriculadas. • Volume de sólidos por empilhamento de cubos.", "• Resolver situações-problema que envolvam área e volume, mobilizando conhecimentos já estudados.", "EF06MA03 EF06MA24", "AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares, por empilhamento de cubos."],
  [30, "Revisão: Volume por empilhamento", "• Volume de sólidos por empilhamento de blocos. • Uso de unidades de medida de volume.", "• Resolver situações-problema que envolvam o cálculo de volume por empilhamento de blocos.", "EF06MA24", "AE17 - Resolver problemas envolvendo o cálculo de volume de blocos retangulares, por empilhamento de cubos."]
];

mat6.forEach(c => allItems.push(createItem("Matemática", "6º Ano", c[0], c[1], c[2], c[3], c[4], c[5])));

// ================= MATEMÁTICA 7º ANO (30 AULAS) =================
const mat7 = [
  [1, "Explorando o conceito de ângulo", "• Ângulo como elemento geométrico. • Classificação de ângulos. • Ângulos de figuras poligonais.", "• Reconhecer ângulos retos e não retos em figuras poligonais com o uso de dobraduras, esquadros ou softwares de geometria.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [2, "Triângulos e suas particularidades", "• Classificação quanto aos lados e quanto aos ângulos. • Propriedade angular dos triângulos.", "• Classificar triângulos em relação às medidas dos lados e dos ângulos. • Explorar a soma dos ângulos internos (180º).", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [3, "Ângulos complementares e suplementares", "• Ângulos suplementares. • Ângulos complementares. • Relações angulares do triângulo.", "• Explorar prolongamento de um dos lados do triângulo para ângulos suplementares e complementares.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [4, "Resolução de problemas - Ângulos complementares e suplementares", "• Ângulos suplementares e complementares. • Relações angulares do triângulo.", "• Reconhecer que a soma dos ângulos internos de um triângulo é igual a 180° e resolver problemas.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [5, "Revisão: Classificação e propriedades dos triângulos", "• Classificação quanto aos lados e ângulos. • Propriedade angular dos triângulos.", "• Reconhecer características dos triângulos, incluindo a soma dos ângulos internos igual a 180º.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [6, "Triângulos e ângulos", "• Ângulos internos e externos. • Relações angulares no triângulo. • Equações do 1º grau.", "• Reconhecer ângulos internos e externos, suplementares e complementares em triângulos.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [7, "Quadriláteros e ângulos", "• Ângulos internos e externos. • Relações angulares. • Equações do 1º grau.", "• Reconhecer ângulos internos e externos em quadriláteros. • Resolver equações ax + b = c.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [8, "Resolução de problemas - Triângulos, quadriláteros e ângulos", "• Relação entre os ângulos internos e externos de triângulos e quadriláteros.", "• Resolver problemas envolvendo a relação entre os ângulos internos e externos de triângulos e quadriláteros.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [9, "Aula de verificação - Triângulos, quadriláteros e ângulos", "• Ângulos internos e externos de triângulos e quadriláteros. • Equações do 1º grau.", "• Reconhecer ângulos internos e externos em polígonos e resolver equações do 1º grau.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [10, "Revisão: Relações angulares em quadriláteros", "• Ângulos internos e externos de quadriláteros. • Relações angulares. • Equações do 1º grau.", "• Reconhecer ângulos internos e externos em quadriláteros com equações.", "EF07MA27", "AE12 - Calcular medidas de ângulos internos e externos de polígonos, sem o uso de fórmulas."],
  [11, "Razões em situações do cotidiano", "• Conceito de razão. • Organização de dados em tabelas. • Constante de proporcionalidade.", "• Analisar situações do cotidiano envolvendo razão, utilizando tabelas.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa entre duas grandezas."],
  [12, "Entendendo a proporção", "• Conceito de proporção. • Propriedade fundamental das proporções.", "• Conceituar proporção como igualdade entre duas razões e aplicar a propriedade fundamental.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [13, "Grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais. • Constante de proporcionalidade.", "• Identificar situações envolvendo grandezas diretamente proporcionais em contextos do cotidiano.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [14, "Resolução de problemas - Proporção e grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais.", "• Resolver problemas envolvendo grandezas diretamente proporcionais.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [15, "Revisão: Grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais. • Constante de proporcionalidade.", "• Resolver problemas envolvendo grandezas diretamente proporcionais.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [16, "Grandezas inversamente proporcionais", "• Grandezas inversamente proporcionais.", "• Reconhecer relações de proporcionalidade inversa envolvendo duas grandezas.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [17, "Regra de três simples", "• Grandezas diretamente e inversamente proporcionais. • Regra de três simples.", "• Explorar as estratégias da regra de três para resolver problemas.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [18, "Resolução de problemas - Regra de três simples", "• Grandezas diretamente e inversamente proporcionais. • Regra de três simples.", "• Resolver problemas envolvendo grandezas proporcionais por meio da regra de três simples.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [19, "Aula de verificação - Grandezas diretamente e inversamente proporcionais", "• Grandezas diretamente e inversamente proporcionais. • Regra de três simples.", "• Reconhecer a regra de três simples como estratégia de resolução.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [20, "Revisão: Grandezas diretamente e inversamente proporcionais", "• Grandezas diretamente e inversamente proporcionais. • Situações-problema.", "• Resolver situações-problema que envolvam relações de proporcionalidade.", "EF07MA17", "AE13 - Resolver problemas que envolvam variação de proporcionalidade direta e inversa."],
  [21, "Explorando porcentagens", "• Porcentagens como frações e decimais. • Relação entre divisão, fração e porcentagem.", "• Associar as representações 10%, 25%, 50%, 75% e 100% respectivamente a frações.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [22, "Estratégias de cálculo com porcentagens – Parte 1", "• Porcentagens como frações e decimais. • Conversão entre formas fracionárias, decimais e percentuais.", "• Representar a porcentagem como uma fração e número decimal.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [23, "Estratégias de cálculo com porcentagens – Parte 2", "• Porcentagens como frações e decimais. • Operações com decimais.", "• Estratégias de cálculo de porcentagem envolvendo multiplicação de números decimais.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [24, "Resolução de problemas - Estratégias de cálculo de porcentagens", "• Porcentagem e suas diferentes representações no cotidiano.", "• Compreender e relacionar diferentes representações de porcentagem (fração e decimal).", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [25, "Revisão: Representações equivalentes e cálculo de porcentagem", "• Representações equivalentes: fração, decimal e porcentagem.", "• Relacionar e interpretar diferentes formas de representação de um mesmo número.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [26, "Acréscimos percentuais simples", "• Acréscimo percentual simples. • Representação por meio de decimais.", "• Explorar o significado de acréscimo percentual simples, recaindo em operações com decimais.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [27, "Decréscimos percentuais simples", "• Decréscimo percentual simples. • Representação de decréscimo por meio de decimais.", "• Explorar o significado de decréscimo percentual simples, recaindo em operações com números decimais.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [28, "Resolução de problemas - Acréscimos e decréscimos percentuais simples", "• Acréscimos e decréscimos percentuais; • Cálculo de porcentagem.", "• Identificar e diferenciar situações de acréscimo e decréscimo percentual em contextos cotidianos.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [29, "Aula de verificação - Porcentagem: acréscimos e decréscimos", "• Porcentagem como frações e decimais; • Acréscimo e decréscimo simples.", "• Reconhecer o conceito de porcentagem e resolver problemas.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."],
  [30, "Revisão: Acréscimos e decréscimos percentuais", "• Acréscimos e decréscimos percentuais em situações-problema.", "• Resolver situações-problema que envolvam acréscimos e decréscimos percentuais.", "EF07MA02", "AE14 - Resolver problemas que envolvam porcentagens, aplicando aumentos e descontos simples."]
];

mat7.forEach(c => allItems.push(createItem("Matemática", "7º Ano", c[0], c[1], c[2], c[3], c[4], c[5])));

// ================= MATEMÁTICA 8º ANO (30 AULAS) =================
const mat8 = [
  [1, "Analisando dados de pesquisas no cotidiano", "• Leitura e interpretação de dados apresentados em gráficos e tabelas. • Elementos constitutivos dos gráficos.", "• Compreender a função dos gráficos e tabelas na comunicação de informações em diferentes contextos sociais.", "EF06MA32", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [2, "A amplitude e moda de um conjunto de dados", "• Identificação da moda e amplitude em conjuntos de dados apresentados em tabelas e gráficos.", "• Identificar a moda em diferentes representações de dados e calcular a amplitude de um conjunto de dados.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [3, "Média aritmética simples", "• Média aritmética como medida de tendência central. • Cálculo da média aritmética.", "• Compreender a média aritmética como forma de representar um conjunto de dados.", "EF07MA35", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [4, "Resolução de problemas envolvendo amplitude, média aritmética e moda de um conjunto de dados - Parte 1", "• Identificação da moda em conjuntos de dados. • Cálculo e interpretação da moda, média e amplitude.", "• Identificar a moda e determinar a média aritmética simples de um conjunto de dados organizados.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [5, "Revisão: gráficos, tabelas, moda e média aritmética", "• Leitura e interpretação de dados em gráficos e tabelas. • Identificação da média e moda.", "• Interpretar dados apresentados em diferentes formatos e determinar a média aritmética simples.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [6, "Resolução de problemas envolvendo amplitude, média aritmética e moda de um conjunto de dados - Parte 2", "• Média aritmética como medida de tendência central. • Resolução de problemas com média e moda.", "• Calcular a média aritmética de um grupo de valores e resolver situações-problema contextualizadas.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [7, "Práticas de pesquisa - Parte 1", "• Planejamento e realização de pesquisas. • Pesquisa amostral e censitária.", "• Planejar e realizar pesquisa envolvendo tema de interesse dos estudantes, identificando necessidade de amostra.", "EF07MA36", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [8, "Práticas de pesquisa - Parte 2", "• Organização dos resultados de uma pesquisa em tabelas e gráficos. • Interpretação e comunicação dos resultados.", "• Organizar os dados de uma pesquisa por meio de tabelas e gráficos, determinando amplitude, média e moda.", "EF07MA36", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [9, "Aula de verificação - Média aritmética e moda utilizando gráficos e tabelas", "• Identificação da moda e cálculo da média em tabelas e gráficos. • Resolução de problemas.", "• Identificar a moda e calcular a média aritmética simples de um grupo de valores.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [10, "Revisão: situações-problema envolvendo média aritmética e moda", "• Média aritmética como medida de tendência central. • Situações-problema.", "• Resolver situações-problema contextualizadas que envolvam o cálculo e interpretação da média e moda.", "EF08MA25", "AE10 - Resolver problemas que envolvam o cálculo de média aritmética e moda de um conjunto de dados."],
  [11, "A linguagem algébrica para relacionar grandezas", "• Reconhecimento de padrões numéricos em tabelas. • Construção de sentenças algébricas.", "• Compreender o uso da linguagem algébrica para representar relações entre grandezas.", "EF07MA17", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não proporcionais."],
  [12, "Formas de representar a variação de proporcionalidade direta", "• Representação da proporcionalidade direta por meio de tabelas, sentenças algébricas e gráficos.", "• Compreender a proporcionalidade direta como uma relação constante entre duas grandezas.", "EF08MA12", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [13, "Formas de representar a variação de proporcionalidade inversa", "• Representação da proporcionalidade inversa por tabelas, sentenças algébricas e gráficos.", "• Compreender a proporcionalidade inversa como uma relação em que o produto entre duas grandezas é constante.", "EF08MA12", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [14, "Resolução de problemas - Representações da variação proporcional", "• Representação da proporcionalidade direta e inversa em tabelas, sentenças e gráficos.", "• Representar a variação proporcional por meio de sentença algébrica e gráfico no plano cartesiano.", "EF08MA12", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [15, "Revisão: Expressões algébricas e relações proporcionais", "• Construção de expressões algébricas para representar relações entre grandezas.", "• Representar a variação proporcional direta e inversa por meio de sentença algébrica.", "EF08MA12", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [16, "Grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais; • Regra de três simples. • Proporcionalidade.", "• Aplicar diferentes estratégias para resolver problemas com grandezas diretamente proporcionais.", "EF08MA13", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [17, "Grandezas inversamente proporcionais", "• Proporcionalidade; • Grandezas inversamente proporcionais; • Regra de três simples.", "• Compreender e aplicar diferentes estratégias para resolver problemas com grandezas inversamente proporcionais.", "EF08MA13", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [18, "Resolução de problemas - Grandezas diretamente e inversamente proporcionais", "• Grandezas diretamente proporcionais; • Grandezas inversamente proporcionais.", "• Resolver problemas envolvendo grandezas diretamente e inversamente proporcionais.", "EF08MA13", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [19, "Aula de verificação - Grandezas diretamente e inversamente proporcionais", "• Grandezas diretamente e inversamente proporcionais.", "• Aplicar diferentes estratégias para resolver problemas com grandezas direta e inversamente proporcionais.", "EF08MA13", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [20, "Revisão: Regra de três simples e grandezas diretamente e inversamente proporcionais", "• Regra de três simples; • Grandezas proporcionais.", "• Aplicar diferentes estratégias para resolver problemas com grandezas diretamente e inversamente proporcionais.", "EF08MA13", "AE11 - Resolver problemas que envolvam a variação entre duas grandezas, proporcionais ou não."],
  [21, "Explorando o conceito de porcentagem", "• Porcentagem como fração com denominador 100. • Relação entre porcentagem, fração e número decimal.", "• Compreender o conceito de porcentagem como uma forma de representar partes de um todo dividido em 100.", "EF06MA13", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [22, "Estratégias de cálculo de porcentagem – Parte 1", "• Cálculo de porcentagens simples por meio de estratégias pessoais e cálculo mental.", "• Compreender diferentes estratégias para calcular porcentagens simples, sem o uso da regra de três.", "EF07MA02", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [23, "Estratégias de cálculo de porcentagem – Parte 2", "• Aplicação da regra de três simples para o cálculo de porcentagens. • Acréscimos e decréscimos.", "• Resolver problemas envolvendo acréscimos e decréscimos percentuais simples, utilizando a regra de três.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [24, "Resolução de problemas envolvendo o cálculo de porcentagens", "• Cálculo de porcentagens simples por cálculo mental e regra de três.", "• Aplicar estratégias pessoais e cálculo mental para resolver problemas envolvendo porcentagens simples.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [25, "Revisão: Porcentagem e frações equivalentes", "• Associação entre porcentagens e frações equivalentes.", "• Compreender diferentes estratégias para calcular porcentagens simples, utilizando cálculo mental.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [26, "Acréscimos percentuais simples e sucessivos", "• Cálculo de acréscimos percentuais simples em contextos reais. • Acréscimos sucessivos.", "• Resolver problemas envolvendo acréscimos percentuais simples e sucessivos, utilizando cálculo mental e calculadora.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [27, "Decréscimos percentuais simples e sucessivos", "• Cálculo de decréscimos percentuais simples em valores monetários e outras grandezas.", "• Compreender o conceito de decréscimo percentual simples e sucessivo e sua aplicação em contextos reais.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [28, "Resolução de problemas envolvendo acréscimos e decréscimos percentuais", "• Aplicação de acréscimos e decréscimos percentuais sucessivos com manipulação numérica passo a passo.", "• Resolver problemas envolvendo acréscimos e decréscimos percentuais simples e sucessivos.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [29, "Aula de verificação - Cálculos envolvendo porcentagens", "• Aplicação da regra de três simples para o cálculo de porcentagens. • Acréscimos e decréscimos.", "• Resolver problemas envolvendo acréscimos e decréscimos percentuais simples e sucessivos.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."],
  [30, "Revisão: Acréscimos e decréscimos percentuais sucessivos", "• Aplicação de acréscimos percentuais sucessivos com manipulação numérica passo a passo.", "• Compreender que acréscimos sucessivos não devem ser somados diretamente e aplicar o cálculo de forma sequencial.", "EF08MA04", "AE12 - Resolver problemas envolvendo porcentagem, com acréscimo e decréscimo simples."]
];

mat8.forEach(c => allItems.push(createItem("Matemática", "8º Ano", c[0], c[1], c[2], c[3], c[4], c[5])));

// ================= MATEMÁTICA 9º ANO (30 AULAS) =================
const mat9 = [
  [1, "Diferenciando área e perímetro", "• Área e perímetro.", "• Diferenciar os conceitos de área e perímetro. • Estimar medidas de área e perímetro de figuras geométricas planas.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [2, "Área de triângulos e quadriláteros", "• Cálculo de área de triângulos e quadriláteros.", "• Reconhecer expressões de cálculo para a área de triângulos e quadriláteros. • Diferenciar área e perímetro.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [3, "Área de figuras geométricas planas por decomposição em triângulos e quadriláteros", "• Cálculo de área de figuras geométricas planas que possam ser decompostas.", "• Calcular a área de figuras geométricas planas por decomposição em triângulos e quadriláteros.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [4, "Resolução de problemas envolvendo cálculo de área de figuras por decomposição", "• Cálculo de área de figuras geométricas planas decomponíveis.", "• Resolver problemas envolvendo cálculo de área e perímetro de figuras geométricas planas decomponíveis.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [5, "Revisão: Área de figuras planas por decomposição", "• Cálculo de área de figuras geométricas planas decomponíveis.", "• Reconhecer expressões de cálculo para a área de figuras geométricas planas por decomposição.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [6, "O número π", "• Número π e comprimento da circunferência.", "• Reconhecer o número π a partir do seu contexto histórico e obter aproximações experimentais.", "EF07MA33", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [7, "Cálculo de área e comprimento de círculos e setores circulares", "• Área e comprimento da circunferência e do setor circular.", "• Reconhecer expressões de cálculo para a área e o comprimento de círculos e setores circulares.", "EF09MA11", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [8, "Resolução de problemas envolvendo cálculo de área e perímetro de círculos e setores circulares", "• Área e comprimento da circunferência e do setor circular.", "• Resolver problemas que envolvam o cálculo de área e perímetro de círculos e setores circulares.", "EF09MA11", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [9, "Aula de verificação - Área e perímetro de figuras geométricas planas", "• Área e perímetro de figuras geométricas planas.", "• Resolver problemas que envolvam o cálculo de área e perímetro de círculos e figuras planas decomponíveis.", "EF08MA19", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [10, "Revisão: Área do círculo e do setor circular", "• Área e comprimento da circunferência e do setor circular.", "• Resolver problemas que envolvam o cálculo de área e perímetro de círculos e setores circulares.", "EF07MA33", "AE9 - Resolver problemas envolvendo área de figuras geométricas planas decompostas."],
  [11, "Sorte ou azar?", "• Noções de probabilidade. • Probabilidade experimental.", "• Realizar experimentos aleatórios ou simulações que envolvam cálculo de probabilidade.", "EF07MA34", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [12, "Conceito de probabilidade", "• Conceito de probabilidade.", "• Reconhecer probabilidade como a razão entre o número de resultados favoráveis e o total de resultados possíveis.", "EF06MA30", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [13, "Cálculo de probabilidade com espaços amostrais equiprováveis", "• Probabilidade em espaços amostrais equiprováveis.", "• Calcular a probabilidade de ocorrência de eventos em espaços amostrais equiprováveis.", "EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [14, "Resolução de problemas envolvendo noções de probabilidade", "• Probabilidade em espaços amostrais equiprováveis.", "• Resolver problemas que envolvam noções elementares de probabilidade.", "EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [15, "Revisão: Probabilidade em espaços equiprováveis", "• Probabilidade em espaços amostrais equiprováveis.", "• Calcular a probabilidade de ocorrência de eventos em espaços amostrais equiprováveis.", "EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [16, "Cálculo de probabilidade a partir da construção do espaço amostral", "• Espaço amostral e cálculo de probabilidade.", "• Reconhecer espaços amostrais não-equiprováveis e construir o espaço amostral de diferentes experimentos.", "EF08MA22", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [17, "Reconhecimento de eventos dependentes e independentes", "• Eventos dependentes e independentes.", "• Reconhecer, em contextos do cotidiano, eventos dependentes e independentes, diferenciando-os.", "EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [18, "Resolução de problemas envolvendo cálculo de probabilidade por meio de estratégias diversas", "• Cálculo de probabilidade.", "• Calcular a probabilidade de ocorrência de eventos independentes a partir da construção do espaço amostral.", "EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [19, "Aula de verificação - Cálculo de probabilidades", "• Cálculo de probabilidade.", "• Calcular a probabilidade de ocorrência de eventos independentes a partir da construção do espaço amostral.", "EF08MA22 EF09MA20", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [20, "Revisão: Probabilidades", "• Cálculo de probabilidade.", "• Calcular a probabilidade de ocorrência de eventos independentes a partir da construção do espaço amostral.", "EF08MA22", "AE10 - Resolver situações-problema envolvendo noções elementares de probabilidade."],
  [21, "O que é proporcionalidade?", "• Proporcionalidade. • Variação entre grandezas.", "• Reconhecer a proporcionalidade em contextos cotidianos, percebendo grandezas que apresentam relações proporcionais.", "EF08MA12", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa, escalas e divisão proporcional."],
  [22, "Grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais.", "• Reconhecer grandezas diretamente proporcionais e expressar a relação por meio de sentença algébrica.", "EF08MA12", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [23, "Problemas envolvendo escala", "• Escala.", "• Reconhecer o conceito de escala, percebendo as noções de proporcionalidade direta.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [24, "Resolução de problemas envolvendo grandezas diretamente proporcionais", "• Grandezas diretamente proporcionais. • Escala.", "• Resolver problemas envolvendo grandezas diretamente proporcionais, incluindo escala.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [25, "Revisão: Grandezas diretamente proporcionais e escala", "• Grandezas diretamente proporcionais. • Escala.", "• Resolver problemas envolvendo grandezas diretamente proporcionais, incluindo escala.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [26, "Grandezas inversamente proporcionais", "• Grandezas inversamente proporcionais.", "• Reconhecer grandezas inversamente proporcionais e expressar a relação por meio de sentença algébrica.", "EF08MA12", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [27, "Problemas envolvendo divisão em partes proporcionais e proporcionalidade direta ou inversa", "• Divisão em partes proporcionais. • Proporcionalidade direta ou inversa entre mais de duas grandezas.", "• Resolver problemas que envolvam divisão em partes proporcionais e regra de três composta.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [28, "Resolução de problemas envolvendo proporcionalidade", "• Grandezas inversamente proporcionais. • Divisão em partes proporcionais.", "• Resolver problemas que envolvam grandezas inversamente proporcionais e divisão em partes proporcionais.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [29, "Aula de verificação - Proporcionalidade", "• Grandezas diretamente e inversamente proporcionais. • Divisão em partes proporcionais.", "• Resolver problemas que envolvam grandezas diretamente e inversamente proporcionais, incluindo escalas.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."],
  [30, "Revisão: Proporcionalidade inversa e divisão proporcional", "• Grandezas inversamente proporcionais. • Divisão em partes proporcionais.", "• Resolver problemas que envolvam grandezas inversamente proporcionais e divisão proporcional.", "EF09MA08", "AE11 - Resolver problemas envolvendo relações de proporcionalidade direta e inversa."]
];

mat9.forEach(c => allItems.push(createItem("Matemática", "9º Ano", c[0], c[1], c[2], c[3], c[4], c[5])));

console.log(`Matemática gerada. Total parcial: ${allItems.length}`);

// ================= LÍNGUA PORTUGUESA =================
const portuguesData = require('./data_portugues_4b.cjs');
portuguesData.forEach(item => {
  allItems.push(createItem("Língua Portuguesa", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Língua Portuguesa adicionada. Total parcial: ${allItems.length}`);

// ================= CIÊNCIAS =================
const cienciasData = require('./data_ciencias_ef_4b.cjs');
cienciasData.forEach(item => {
  allItems.push(createItem("Ciências", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Ciências adicionada. Total parcial: ${allItems.length}`);

// ================= HISTÓRIA =================
const historiaData = require('./data_historia_ef_4b.cjs');
historiaData.forEach(item => {
  allItems.push(createItem("História", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`História adicionada. Total parcial: ${allItems.length}`);

// ================= GEOGRAFIA =================
const geografiaData = require('./data_geografia_ef_4b.cjs');
geografiaData.forEach(item => {
  allItems.push(createItem("Geografia", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Geografia adicionada. Total parcial: ${allItems.length}`);

// ================= LÍNGUA INGLESA =================
const inglesData = require('./data_ingles_ef_4b.cjs');
inglesData.forEach(item => {
  allItems.push(createItem("Língua Inglesa", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Língua Inglesa adicionada. Total parcial: ${allItems.length}`);

// ================= ARTE =================
const arteData = require('./data_arte_ef_4b.cjs');
arteData.forEach(item => {
  allItems.push(createItem("Arte", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Arte adicionada. Total parcial: ${allItems.length}`);

// ================= EDUCAÇÃO FÍSICA =================
const edFisicaData = require('./data_ed_fisica_ef_4b.cjs');
edFisicaData.forEach(item => {
  allItems.push(createItem("Educação Física", item.ano, item.aula, item.titulo, item.conteudo, item.objetivos, item.habilidade, item.aprendizagem));
});
console.log(`Educação Física adicionada. Total EF: ${allItems.length}`);

// =========================================================================
// ========================= ENSINO MÉDIO (4º BIMESTRE & GUIAS) =============
// =========================================================================

// Helper for EM items
function createEMItem(disciplina, item, defaultBimestre = '4º Bimestre') {
  const hab = item.habilidade ? item.habilidade.trim() : '';
  const obj = item.objetivos ? item.objetivos.trim() : '';
  const bim = item.bimestre || defaultBimestre;
  return {
    id: `${disciplina.replace(/\s+/g, '')}-${item.ano.replace(/\s+/g, '')}-${bim.replace(/\s+/g, '')}-${item.aula}`,
    ano: item.ano,
    bimestre: bim,
    aula: String(item.aula),
    titulo: item.titulo ? item.titulo.trim() : '',
    conteudo: item.conteudo ? item.conteudo.trim() : '',
    objetivos: obj,
    habilidade: hab,
    habilidadeCodigo: hab,
    habilidadeTexto: obj,
    aprendizagem: item.aprendizagem ? item.aprendizagem.trim() : '',
    disciplina: disciplina
  };
}

// 1. MATEMÁTICA EM (72 AULAS)
const emMatematica = require('./data_em_matematica_4b.cjs');
emMatematica.forEach(item => allItems.push(createEMItem("Matemática", item, "4º Bimestre")));
console.log(`EM Matemática adicionada. Total parcial: ${allItems.length}`);

// 2. LÍNGUA PORTUGUESA EM (72 AULAS)
const emPortugues = require('./data_em_portugues_4b.cjs');
emPortugues.forEach(item => allItems.push(createEMItem("Língua Portuguesa", item, "4º Bimestre")));
console.log(`EM Língua Portuguesa adicionada. Total parcial: ${allItems.length}`);

// 3. QUÍMICA EM (24 AULAS)
const emQuimica = require('./data_em_quimica_4b.cjs');
emQuimica.forEach(item => allItems.push(createEMItem("Química", item, "4º Bimestre")));
console.log(`EM Química adicionada. Total parcial: ${allItems.length}`);

// 4. FÍSICA EM (36 AULAS)
const emFisica = require('./data_em_fisica_4b.cjs');
emFisica.forEach(item => allItems.push(createEMItem("Física", item, "4º Bimestre")));
console.log(`EM Física adicionada. Total parcial: ${allItems.length}`);

// 5. HISTÓRIA EM (36 AULAS)
const emHistoria = require('./data_em_historia_4b.cjs');
emHistoria.forEach(item => allItems.push(createEMItem("História", item, "4º Bimestre")));
console.log(`EM História adicionada. Total parcial: ${allItems.length}`);

// 6. GEOGRAFIA EM (24 AULAS)
const emGeografia = require('./data_em_geografia_4b.cjs');
emGeografia.forEach(item => allItems.push(createEMItem("Geografia", item, "4º Bimestre")));
console.log(`EM Geografia adicionada. Total parcial: ${allItems.length}`);

// 7. LÍNGUA INGLESA EM (60 AULAS)
const emIngles = require('./data_em_ingles_4b.cjs');
emIngles.forEach(item => allItems.push(createEMItem("Língua Inglesa", item, "4º Bimestre")));
console.log(`EM Língua Inglesa adicionada. Total parcial: ${allItems.length}`);

// 8. SOCIOLOGIA EM (GUIA COMPLETO: 1º, 2º, 3º, 4º BIMESTRES - 52 AULAS)
const emSociologia = require('./data_em_sociologia_all.cjs');
emSociologia.forEach(item => allItems.push(createEMItem("Sociologia", item, item.bimestre || "4º Bimestre")));
console.log(`EM Sociologia adicionada. Total parcial: ${allItems.length}`);

// 9. FILOSOFIA EM (GUIA COMPLETO: 1º, 2º, 3º, 4º BIMESTRES - 52 AULAS)
const emFilosofia = require('./data_em_filosofia_all.cjs');
emFilosofia.forEach(item => allItems.push(createEMItem("Filosofia", item, item.bimestre || "4º Bimestre")));
console.log(`EM Filosofia adicionada. Total parcial: ${allItems.length}`);

// 10. EMPREENDEDORISMO EM (GUIA COMPLETO 2ª E 3ª SÉRIES - 78 AULAS)
const emEmpreendedorismo = require('./data_em_empreendedorismo.cjs');
emEmpreendedorismo.forEach(item => allItems.push(createEMItem("Empreendedorismo", item, item.bimestre || "1º Bimestre")));
console.log(`EM Empreendedorismo adicionada. Total parcial: ${allItems.length}`);

// 11. EDUCAÇÃO FINANCEIRA EM (GUIA COMPLETO 1ª E 2ª SÉRIES - 104 AULAS)
const emEducacaoFinanceira = require('./data_em_educacao_financeira.cjs');
emEducacaoFinanceira.forEach(item => allItems.push(createEMItem("Educação Financeira", item, item.bimestre || "1º Bimestre")));
console.log(`EM Educação Financeira adicionada. Total parcial: ${allItems.length}`);

// 12. BIOLOGIA EM (GUIA COMPLETO 3ª SÉRIE NOTURNO - 52 AULAS)
const emBiologia = require('./data_em_biologia.cjs');
emBiologia.forEach(item => allItems.push(createEMItem("Biologia", item, item.bimestre || "1º Bimestre")));
console.log(`EM Biologia adicionada. Total parcial: ${allItems.length}`);

// 13. ATUALIDADES EM (GUIA COMPLETO 3ª SÉRIE - 52 AULAS)
const emAtualidades = require('./data_em_atualidades.cjs');
emAtualidades.forEach(item => allItems.push(createEMItem("Atualidades", item, item.bimestre || "1º Bimestre")));
console.log(`EM Atualidades adicionada. Total parcial: ${allItems.length}`);

// 14. ARTE E MÍDIAS DIGITAIS EM (GUIA COMPLETO 2ª SÉRIE - 26 AULAS)
const emArteMidias = require('./data_em_arte_midias_digitais.cjs');
emArteMidias.forEach(item => allItems.push(createEMItem("Arte e Mídias Digitais", item, item.bimestre || "1º Bimestre")));
console.log(`EM Arte e Mídias Digitais adicionada. Total final: ${allItems.length}`);

// Next, let's write to curriculumData.ts export
const tsCode = `import { CurriculumItem } from "../types";

export const initialCurriculumData: CurriculumItem[] = ${JSON.stringify(allItems, null, 2)};
`;

fs.writeFileSync(dataFile, tsCode);
console.log(`Total items saved to curriculumData.ts: ${allItems.length}`);
