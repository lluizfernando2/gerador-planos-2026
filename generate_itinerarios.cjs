const fs = require('fs');

const data = [];

function addClasses(idPrefix, disciplina, ano, bimestre, lessons) {
  lessons.forEach((l, index) => {
    data.push({
      id: `${idPrefix}-${ano.replace(/\s/g,'')}-${bimestre.replace(/\s/g,'')}-${index+1}`,
      disciplina,
      ano,
      bimestre,
      aula: l.aula || `Aula ${index + 1}`,
      titulo: l.titulo,
      conteudo: l.conteudo || '',
      objetivos: l.objetivos || '',
      eixo: l.eixo || '',
      unidadeTematica: l.unidadeTematica || '',
      habilidade: l.habilidade || '',
    });
  });
}

// 1. Tecnologia e Inovação (Lógica de Programação, Computação)
// Ensino Médio 2ª série, 1º Bimestre
addClasses('tecinov', 'Programação', '2ª Série', '1º Bimestre', [
  { aula: '1', titulo: 'Tecnologia no dia a dia', conteudo: 'Transformações digitais no trabalho. Adaptação profissional e novas carreiras. Tecnologia e ODS (ONU).', objetivos: 'Identificar a presença e o uso de tecnologias digitais no trabalho. Compreender os impactos das tecnologias na evolução das profissões. Analisar como a tecnologia pode promover um mundo mais justo.' },
  { aula: '2', titulo: 'Vamos inspecionar', conteudo: 'Ferramentas de desenvolvedor (F12). Tags HTML e estrutura web. Verificação de informações e Fake News.', objetivos: 'Utilizar a ferramenta "Inspecionar" para visualizar o código web. Analisar a estrutura de páginas web e modificar seu conteúdo. Avaliar a autenticidade de informações para combater fake news.' },
  { aula: '3', titulo: 'O que veremos nas aulas?', conteudo: 'Ferramentas e linguagens de programação. Uso de tecnologia para solucionar problemas do cotidiano escolar. Reflexão sobre o uso responsável de IA e suas limitações.', objetivos: 'Refletir sobre o uso de diferentes tecnologias para a construção de soluções computacionais. Relacionar tecnologias digitais com saberes escolares. Propor o uso responsável de IA em soluções tecnológicas, avaliando suas limitações.' },
  { aula: '4', titulo: 'Inteligência artificial', conteudo: 'Fundamentos e tipos de IA. Comparativo IA vs. inteligência humana. Potenciais, riscos e limites da IA.', objetivos: 'Compreender os fundamentos da Inteligência Artificial. Comparar a inteligência artificial com a inteligência humana. Analisar os riscos e benefícios do uso da IA na sociedade.' },
  { aula: '5', titulo: 'Iniciando nossa jornada', conteudo: 'Fundamentos de programação com JavaScript utilizando a biblioteca P5.js. Utilização de funções básicas como setup() e draw(). Manipulação de coordenadas em formas geométricas no p5.js.', objetivos: 'Compreender os conceitos básicos de funções em JavaScript. Aplicar comandos básicos de desenho no P5.js, como createCanvas() e circle(). Modificar parâmetros de comandos em p5.js para ajustar a posição e o tamanho de formas geométricas.' },
  { aula: '6', titulo: 'Adicionando outras formas', conteudo: 'Recuperação e gerenciamento de projetos no editor P5.js. Uso de comandos de desenho (line() e triangle()) para criar formas geométricas específicas. Manipulação de coordenadas X e Y para posicionar elementos em um plano cartesiano.', objetivos: 'Aplicar comandos de desenho básicos como line() e triangle() no P5.js. Criar novas formas e elementos visuais (ex: boca, nariz, orelhas) no personagem utilizando as coordenadas do plano cartesiano. Relembrar o processo de login e recuperação de projetos anteriores no editor P5.js.' },
  { aula: '7', titulo: 'Colorindo nosso desenho', conteudo: 'Cores predefinidas e hexadecimal no P5.js. Utilização de outros comandos para criar mais formas geométricas. Comentários para documentação de código.', objetivos: 'Aplicar conceitos de cores em código usando o P5.js. Criar novas formas e elementos visuais (ex: sobrancelhas, pupilas) no personagem utilizando as coordenadas do plano cartesiano. Documentar o código com comentários claros e organizados.' },
  { aula: '8', titulo: 'Efeito Monalisa', conteudo: 'Comando map() para limitar o movimento de elementos na tela. Conceito de variáveis em programação. Práticas de declaração de variáveis e organização de código para evitar erros em animações.', objetivos: 'Aplicar conceitos de mapeamento para restringir a movimentação de elementos gráficos na tela. Analisar a lógica de posicionamento e ajuste de variáveis para criar interações visuais precisas. Criar uma animação interativa onde elementos gráficos seguem a posição do cursor do mouse.' },
  { aula: '11', titulo: 'Novo projeto: quente frio', conteudo: 'Utilização do comando random() para sortear um valor aleatório. Diferenciação entre números inteiros e decimais. Corrigir bugs a partir de pequenos testes.', objetivos: 'Aplicar conceitos de coordenadas aleatórias para posicionar elementos na tela de um projeto. Compreender a diferença entre números inteiros e decimais em operações de comparação. Testar e depurar código utilizando console.log().' },
  { aula: '12', titulo: 'Será que podemos utilizar Pitágoras?', conteudo: 'Uso de operadores lógicos (e). Introdução ao conceito de distância em um plano cartesiano. Aplicação do Teorema de Pitágoras.', objetivos: 'Aplicar operadores lógicos para combinar múltiplas condições em uma estrutura condicional. Compreender o conceito de distância e sua aplicação em projetos interativos. Implementar o Teorema de Pitágoras para calcular distâncias em um plano cartesiano.' },
  { aula: '13', titulo: 'Comandos em Javascript', conteudo: 'Ajuste do tamanho de um círculo baseado na distância do cursor ao ponto oculto. Uso da função dist() do P5JS. Comparação de métodos de cálculo de distância, incluindo o Teorema de Pitágoras e a função dist().', objetivos: 'Compreender o uso da função dist() do P5JS para calcular distâncias entre dois pontos. Aplicar o conceito de distância para ajustar o comportamento visual de elementos interativos. Associar diferentes abordagens para calcular distâncias.' },
  { aula: '14', titulo: 'Quente frio dinâmico', conteudo: 'Identificação e remoção de código redundante ou desnecessário. Uso do comando constrain do P5JS. Ajuste da dificuldade de um jogo interativo.', objetivos: 'Revisar o código para identificar e remover variáveis e comandos desnecessários. Aplicar o comando constrain para limitar o movimento de um objeto dentro de um plano cartesiano. Modificar a dificuldade de um projeto interativo através da modificação de parâmetros de distância.' }
]);

addClasses('tecinov', 'Programação', '2ª Série', '2º Bimestre', [
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

// 2. Inglês (Aprofundamento)
const inglesB1 = [
  {titulo: 'Learning English nowadays (Part 1)', conteudo: 'Prática de leitura. Palavras conhecidas e cognatas. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar posicionamento crítico de um texto em inglês.'},
  {titulo: 'Learning English nowadays (Part 2)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Identificar posicionamento crítico de um texto em inglês.'},
  {titulo: 'Learning English nowadays (Part 3)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Identificar posicionamento crítico de um texto em inglês.'}
];
addClasses('ingles', 'Língua Inglesa', '1ª Série', '1º Bimestre', [
  { aula: 1, titulo: inglesB1[0].titulo, conteudo: inglesB1[0].conteudo, objetivos: inglesB1[0].objetivos },
  { aula: 3, titulo: inglesB1[1].titulo, conteudo: inglesB1[1].conteudo, objetivos: inglesB1[1].objetivos },
  { aula: 5, titulo: inglesB1[2].titulo, conteudo: inglesB1[2].conteudo, objetivos: inglesB1[2].objetivos }
]);

const inglesB2 = [
  {titulo: 'Learning English nowadays (Part 4)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Mobilizar conhecimentos prévios para compreensão de textos. Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de exercícios de vestibular.'},
  {titulo: 'Learning English nowadays (Part 5)', conteudo: 'Simple present tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo presente, compreendendo sua função na construção textual.'},
  {titulo: 'Learning English nowadays (Part 6)', conteudo: 'Simple Present tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar e utilizar elementos linguísticos específicos, compreendendo sua função na construção textual.'}
];
addClasses('ingles', 'Língua Inglesa', '1ª Série', '2º Bimestre', [
  { aula: 7, titulo: inglesB2[0].titulo, conteudo: inglesB2[0].conteudo, objetivos: inglesB2[0].objetivos },
  { aula: 9, titulo: inglesB2[1].titulo, conteudo: inglesB2[1].conteudo, objetivos: inglesB2[1].objetivos },
  { aula: 11, titulo: inglesB2[2].titulo, conteudo: inglesB2[2].conteudo, objetivos: inglesB2[2].objetivos }
]);

const inglesB3 = [
  {titulo: 'Evolution in Communication (Part 1)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura de tirinhas.'},
  {titulo: 'Evolution in Communication (Part 2)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura de tirinhas.'},
  {titulo: 'Evolution in Communication (Part 3)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de questões de múltipla escolha.'}
];
addClasses('ingles', 'Língua Inglesa', '1ª Série', '3º Bimestre', [
  { aula: 1, titulo: inglesB3[0].titulo, conteudo: inglesB3[0].conteudo, objetivos: inglesB3[0].objetivos },
  { aula: 3, titulo: inglesB3[1].titulo, conteudo: inglesB3[1].conteudo, objetivos: inglesB3[1].objetivos },
  { aula: 5, titulo: inglesB3[2].titulo, conteudo: inglesB3[2].conteudo, objetivos: inglesB3[2].objetivos }
]);

const inglesB4 = [
  {titulo: 'Evolution in Communication (Part 4)', conteudo: 'Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.', objetivos: 'Identificar informações gerais e específicas em um texto de temática familiar. Utilizar Estratégias de leitura para resolução de exercícios de vestibular.'},
  {titulo: 'Evolution in Communication (Part 5)', conteudo: 'Past simple tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo passado, compreendendo sua função na construção textual.'},
  {titulo: 'Evolution in Communication (Part 6)', conteudo: 'Past simple tense. Prática de compreensão e produção textual. Vocabulário temático.', objetivos: 'Mobilizar conhecimentos prévios para compreensão e produção de textos. Identificar verbos no tempo passado, compreendendo sua função na construção textual.'}
];
addClasses('ingles', 'Língua Inglesa', '1ª Série', '4º Bimestre', [
  { aula: 7, titulo: inglesB4[0].titulo, conteudo: inglesB4[0].conteudo, objetivos: inglesB4[0].objetivos },
  { aula: 9, titulo: inglesB4[1].titulo, conteudo: inglesB4[1].conteudo, objetivos: inglesB4[1].objetivos },
  { aula: 11, titulo: inglesB4[2].titulo, conteudo: inglesB4[2].conteudo, objetivos: inglesB4[2].objetivos }
]);

// We generate the final output
const out = `
import { CurriculumItem } from '../types';

export const itinerariosEMData: CurriculumItem[] = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;
fs.writeFileSync('src/data/itinerariosEMData.ts', out);
