export interface RecoveryPdfItem {
  habilidade: string;
  conteudo: string;
  revisaoAulas: string[];
}

export const OFFICIAL_RECOVERY_DATA_2026: {
  [component: string]: {
    [grade: string]: {
      [bimester: string]: RecoveryPdfItem[];
    };
  };
} = {
  "Matemática": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Comparar e ordenar números naturais de diferentes ordens, utilizando, inclusive, a reta numérica como suporte.",
          conteudo: "Reta numérica",
          revisaoAulas: ["6 Comparação e ordenação de números naturais – Parte 1", "7 Comparação e ordenação de números naturais – Parte 2"]
        },
        {
          habilidade: "AE3 Resolver problemas envolvendo as quatro operações fundamentais com números naturais, por meio de estratégias variadas.",
          conteudo: "Operações fundamentais com números naturais",
          revisaoAulas: ["13 Procedimentos de subtração com números naturais", "14 Resolução de problemas de adição e subtração com números naturais", "16 Estratégias de multiplicação com números naturais", "18 Resolução de problemas com multiplicações e divisões de números naturais"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE6 Comparar e ordenar frações, utilizando equivalência, representações visuais e a reta numérica como apoio.",
          conteudo: "Frações",
          revisaoAulas: ["3 Comparação de frações com a reta numérica", "6 Obtendo frações equivalentes"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Comparar e ordenar números inteiros, utilizando, inclusive, a reta numérica como recurso.",
          conteudo: "Números inteiros",
          revisaoAulas: ["12 Representação e comparação entre números inteiros"]
        },
        {
          habilidade: "AE3 Resolver problemas que envolvam operações com números inteiros, por meio de estratégias diversas.",
          conteudo: "Números inteiros",
          revisaoAulas: ["14 Resolução de problemas com adição e subtração de números inteiros", "18 Resolução de problemas com multiplicação e divisão de números inteiros"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE6 Resolver problemas envolvendo as quatro operações fundamentais com números racionais, relacionando essas representações.",
          conteudo: "Números decimais",
          revisaoAulas: ["3 Estratégias de adição e subtração com números racionais - Parte 2", "6 Multiplicação e potenciação de números racionais", "7 Divisão de números racionais", "8 Resolução de problemas envolvendo multiplicação e divisão de números racionais (V2)"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Resolver problemas que envolvam cálculos com números racionais, inclusive potências de expoentes inteiros, utilizando propriedades operatórias.",
          conteudo: "Números racionais",
          revisaoAulas: ["2 Resolução de problemas envolvendo adição e subtração de números racionais", "4 Resolução de problemas envolvendo adição, subtração, multiplicação e divisão", "6 Resolução de problemas envolvendo multiplicação de números - Parte 1", "8 Resolução de problemas envolvendo multiplicação e divisão de - Parte 2"]
        },
        {
          habilidade: "AE2 Utilizar a relação entre potenciação e radiciação para representar raízes como potências de expoente fracionário e resolver problemas.",
          conteudo: "Radiciação",
          revisaoAulas: ["22 Radiciação com números racionais", "23 Raízes como potências de expoentes fracionários", "24 Resolução de problemas envolvendo radiciação com números racionais", "26 Propriedades dos radicais"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Resolver problemas que possam ser representados por equações polinomiais do 1º grau, utilizando as propriedades da igualdade, e interpretá-los geometricamente.",
          conteudo: "Equações polinomiais do 1º grau",
          revisaoAulas: ["12 Estratégias de resolução de equações do 1º grau", "13 Modelagem algébrica de problemas do 1º grau - Parte 1", "16 Resolução de equações do 1º grau com duas incógnitas", "17 Representação de equações do 1º grau com duas incógnitas no plano cartesiano (v2)"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias.",
          conteudo: "Operações fundamentais com números racionais",
          revisaoAulas: ["3 Potenciação com números racionais", "4 Problemas de potenciação com números racionais"]
        },
        {
          habilidade: "AE1 Resolver problemas envolvendo cálculos de potenciação e radiciação com números racionais, utilizando as propriedades operatórias.",
          conteudo: "Raízes quadradas",
          revisaoAulas: ["31 Aula de revisão - multiplicação e potenciação com números racionais", "32 Aula de revisão - Radiciação com números racionais"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Resolver problemas com a aplicação do teorema de Pitágoras.",
          conteudo: "Teorema de Pitágoras",
          revisaoAulas: ["6 O Teorema de Pitágoras", "7 Modelagem geométrica com o Teorema de Pitágoras", "8 Resolução de problemas envolvendo o Teorema de Pitágoras", "9 Aula de verificação - Semelhança de triângulos e Teorema de Pitágoras"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões.",
          conteudo: "Raízes quadradas",
          revisaoAulas: ["6 Radiciação com números racionais", "7 Resolução de problemas envolvendo operações com números racionais"]
        },
        {
          habilidade: "AE1 Utilizar operações com números reais, incluindo potenciação e radiciação, para resolver situações-problemas envolvendo grandezas, medidas e suas conversões.",
          conteudo: "Operações fundamentais com números reais",
          revisaoAulas: ["2 Problemas de adição e subtração com números racionais", "3 Problemas de multiplicação e divisão com números racionais"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Resolver situações-problema que possam ser modeladas por funções polinomiais de 1º grau, resolvendo equações e usando representações algébricas e geométricas.",
          conteudo: "Equações e funções polinomiais do 1º grau",
          revisaoAulas: ["1 Retomando equações do 1º grau", "2 Modelagem algébrica de problemas do 1º grau – Parte 1", "3 Modelagem algébrica de problemas do 1º grau - Parte 2"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Modelar problemas que possam ser representados por equações polinomiais do 1º e 2º grau, em situações econômicas, sociais e das Ciências da Natureza.",
          conteudo: "Equações polinomiais do 2º grau",
          revisaoAulas: ["13 Estratégias de resolução de equações do 2º grau - Parte 1", "14 Estratégias de resolução de equações do 2º grau - Parte 2", "15 Resolução de problemas do 1º e do 2º grau"]
        },
        {
          habilidade: "AE3 Resolver situações-problema que possam ser modeladas por funções exponenciais, resolvendo equações e utilizando das representações algébricas e geométricas.",
          conteudo: "Equações exponenciais",
          revisaoAulas: ["24 Aula de verificação - Potenciação e equações exponenciais", "27 Revisão: equações exponenciais"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Resolver situações-problema que possam ser modeladas por funções logarítmicas, resolvendo equações e fazendo uso das representações algébricas e geométricas.",
          conteudo: "Logaritmo",
          revisaoAulas: ["11 Propriedades dos logarítmos - Parte 2"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Utilizar equações polinomiais de 1º e 2º grau para modelar situações-problema envolvendo grandezas e medidas.",
          conteudo: "Equações polinomiais do 1º e 2º graus",
          revisaoAulas: ["1 Equações do 1º grau e proporcionalidade", "2 Problemas com equações do 1º grau com uma incógnita", "3 Problemas com equações incompletas do 2º grau"]
        },
        {
          habilidade: "AE2 Resolver problemas do cotidiano que envolvem equações lineares simultâneas, utilizando técnicas algébricas e gráficas.",
          conteudo: "Sistema de equações lineares",
          revisaoAulas: ["13 Interpretação geométrica de um sistema linear com duas de equações e duas incógnitas", "21 Classificação de sistemas lineares - Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Resolver problemas de probabilidade envolvendo eventos aleatórios não sucessivos, por meio da identificação do espaço amostral e da contagem de possibilidades.",
          conteudo: "Conceito de probabilidade",
          revisaoAulas: ["9 Noções de probabilidade", "11 Cálculo da probabilidade de um evento - Parte 1", "16 Resolução de problemas de probabilidades"]
        }
      ]
    }
  },
  "Língua Portuguesa": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Estabelecer relações entre gêneros jornalísticos, comparando suas características estruturais, linguísticas e temáticas.",
          conteudo: "Leitura de notícia.",
          revisaoAulas: ["3 Fatos - Parte 1", "5 Deu na mídia! – Parte 1"]
        },
        {
          habilidade: "AE5 Utilizar diferentes estratégias de leitura em textos literários diversos, inferindo informações implícitas e analisando efeitos de sentido.",
          conteudo: "Leitura de conto.",
          revisaoAulas: ["5 Deu na mídia! – Parte 1", "11 Nem tudo é o que parece – Parte 1", "13 Diferentes olhares - Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Utilizar diferentes estratégias de leitura em textos literários diversos, inferindo informações implícitas e analisando efeitos de sentido.",
          conteudo: "Leitura de crônica literária.",
          revisaoAulas: ["1 Por dentro da crônica - Parte 1"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE4 Comparar informações sobre um mesmo fato divulgadas por diferentes veículos e mídias, identificando elementos que contribuem para a credibilidade.",
          conteudo: "Leitura: diferentes escolhas editoriais sobre um mesmo fato.",
          revisaoAulas: ["7 Um fato, duas versões – Parte 1", "11 Nem tudo que pensamos é real – Parte 1", "15 O que você vê?"]
        },
        {
          habilidade: "AE6 Analisar os elementos da narrativa em gêneros narrativos ficcionais diversos, reconhecendo suas características próprias.",
          conteudo: "Leitura de romance infantojuvenil. Leitura de conto popular.",
          revisaoAulas: ["16 Vidas em palavras - Parte 1", "19 Descobrindo histórias: romances infantojuvenis – Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE6 Analisar os elementos da narrativa em gêneros narrativos ficcionais diversos, reconhecendo suas características próprias.",
          conteudo: "Elemento da narrativa: narrador e personagens.",
          revisaoAulas: ["5 Universos paralelos – Parte 1", "13 A passagem do tempo em textos narrativos – Parte 1", "15 Elementos da trama narrativa – Parte 1"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Analisar aspectos linguísticos e gramaticais em funcionamento em um texto.",
          conteudo: "Advérbios. Modalizadores discursivos. Estratégias de modalização em artigos de opinião.",
          revisaoAulas: ["6 De grão em grão, constrói-se uma argumentação! – Parte 2", "7 Demonstrando opiniões", "8 Verbos que posicionam", "9 Os efeitos dos advérbios em textos opinativos"]
        },
        {
          habilidade: "AE5 Analisar os efeitos de sentido produzidos por recursos linguísticos e gramaticais, paralinguísticos e cinésicos, como a gestualidade, em textos diversos.",
          conteudo: "Estratégias de leitura de textos literários.",
          revisaoAulas: ["18 Linhas e entrelinhas: estratégias para ler textos literários – Parte 3", "19 Um retrato do dia a dia – Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Analisar aspectos linguísticos e gramaticais em funcionamento em um texto.",
          conteudo: "Figuras de linguagem. Recursos estilísticos em textos publicitários. Voz ativa e voz passiva. Pontuação: uso de ponto e vírgula.",
          revisaoAulas: ["1 Estilo e impacto: o poder das linguagens verbal e não verbal - Parte 1", "2 Estilo e impacto: o poder das linguagens verbal e não verbal - Parte 2", "4 Entre papéis e links: as notícias impressas e digitais – Parte 2", "11 Jornalismo em foco – Parte 1"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE3 Analisar as características e os efeitos de sentido gerados pela linguagem e organização de textos literários narrativos.",
          conteudo: "Pretérito perfeito e imperfeito do indicativo.",
          revisaoAulas: ["4 Jovens em ação: biografias inspiradoras - Parte 2"]
        },
        {
          habilidade: "AE4 Analisar a estrutura, linguagem e temáticas próprias de gêneros jornalísticos, reconhecendo suas especificidades e função social.",
          conteudo: "Reportagem: fato central.",
          revisaoAulas: ["9 Notícia: informações e atualidades - Parte 1", "11 Reportagem: um mergulho mais profundo - Parte 1", "13 Entrevista em foco – Parte 1", "20 De parágrafo em parágrafo"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar as características e os efeitos de sentido gerados pela linguagem e organização de textos literários narrativos.",
          conteudo: "Leitura de conto.",
          revisaoAulas: ["3 No conto, os verbos contam histórias – Parte 1"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Analisar elementos da sintaxe da língua portuguesa e as escolhas linguísticas de acordo com os diversos contextos comunicativos.",
          conteudo: "Advérbios e locuções adverbiais.",
          revisaoAulas: ["16 Literatura periférica - Parte 2"]
        },
        {
          habilidade: "AE4 Identificar os efeitos de sentido decorrentes de escolhas linguísticas e da relação entre textos.",
          conteudo: "Denotação e conotação em textos literários. Efeitos de sentido.",
          revisaoAulas: ["11 Um texto em outros textos", "12 Sentidos reais, sentidos simbólicos", "17 Chargens e cartuns - Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Analisar elements da sintaxe da língua portuguesa e as escolhas linguísticas de acordo com os diversos contextos comunicativos.",
          conteudo: "Concordância verbal com sujeito composto.",
          revisaoAulas: ["6 Do interesse de todos - Parte 2"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Analisar elementos da sintaxe da língua portuguesa, identificando escolhas linguísticas em textos diversos.",
          conteudo: "Conectivos – conjunções e locuções conjuntivas",
          revisaoAulas: ["16 Resumir é um poder – Parte 2"]
        },
        {
          habilidade: "AE4 Analisar textos do campo jornalístico-midiático para produzir textos autorais contextualizados.",
          conteudo: "Textos multimodais diversos",
          revisaoAulas: ["11 Leitura de gráficos", "12 Leitura de infográficos"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Analisar textos de divulgação científica de diferentes áreas do conhecimento, identificando suas características e criticando enfoques tendenciosos e superficiais.",
          conteudo: "Citação direta e indireta",
          revisaoAulas: ["21 Pesquisas em tempos digitais - Parte 1", "22 Pesquisas em tempos digitais - Parte 2"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Avaliar obras da literatura brasileira, de expressão portuguesa, indígena, africana e latino-americana, considerando culturas e povos relacionados, reconhecendo sua importância para a construção de uma identidade nacional.",
          conteudo: "Leitura e compreensão do conto. Análise dos efeitos de sentido do conto. Análise de contexto de produção.",
          revisaoAulas: ["17 Contos do século XIX: Machado de Assis – Parte 1", "19 Contos do século XIX – Parte 1"]
        },
        {
          habilidade: "AE8 Analisar diferentes obras e gêneros, identificando aspectos do contexto histórico, social e político, para reconhecer as relações de intertextualidade e de interdiscursividade existentes entre elas.",
          conteudo: "Sistematização de diferenças marcantes entre romances românticos e realistas, com base em trechos de livros.",
          revisaoAulas: ["11 Romances românticos", "12 Romances realistas", "13 Romantismo x Realismo – Parte 1"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE8 Analisar differentes obras e gêneros, identificando aspectos do contexto histórico, social e político, para reconhecer as relações de intertextualidade e de interdiscursividade existentes entre elas.",
          conteudo: "Leitura e análise de crônica. Intertextualidade. Polissemia.",
          revisaoAulas: ["26 Os olhares do cotidiano: desvendando o gênero Crônica – Parte 3"]
        }
      ]
    }
  },
  "Ciências": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Descrever as esferas que compõem a Terra, reconhecendo o surgimento da litosfera e suas transformações ao longo do tempo.",
          conteudo: "Terra Primitiva. Tempo Geológico.",
          revisaoAulas: ["3 Terra primitiva: formação do planeta Terra", "4 Tempo histórico × tempo geológico × tempo cronológico"]
        },
        {
          habilidade: "AE2 Explicar os efeitos dos movimentos do Sistema Terra-Sol-Lua na ocorrência de fenômenos naturais, considerando as relações entre rotação e translação da Terra e a interação entre Sol e Lua.",
          conteudo: "Movimentos da Terra. Efeitos dos movimentos da Terra. Sistema Sol-Terra-Lua.",
          revisaoAulas: ["8 Movimento de rotação", "15 Estações do ano: solstício e equinócio"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Analisar os processos de separação de misturas do cotidiano, classificando as substâncias, as misturas e as mudanças de estado físico da matéria.",
          conteudo: "Substâncias puras: simples e compostas. Misturas homogêneas e heterogêneas. Processos de separação de misturas.",
          revisaoAulas: ["15 Substância pura simples e composta", "16 Misturas homogêneas e heterogêneas"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Identificar a composição da atmosfera e os fatores naturais e humanos que a modificam, relacionando-os aos impactos ambientais e à saúde do sistema respiratório humano.",
          conteudo: "Atmosfera da terra.",
          revisaoAulas: ["7 Atmosfera da Terra"]
        },
        {
          habilidade: "AE3 Distinguir o uso e o funcionamento de máquinas simples, com base no conceito de força e exemplos do cotidiano.",
          conteudo: "Máquina simples.",
          revisaoAulas: ["14 Maquinas simples: alavancas e plano inclinado"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE7 Identificar o efeito estufa como um fenômeno natural, reconhecendo os impactos das ações humanas que o intensificam.",
          conteudo: "Efeito Estufa.",
          revisaoAulas: ["3 Efeito estufa"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Comparar processos reprodutivos assexuados e sexuados em vegetais e animais, com base em mecanismos evolutivos e adaptativos.",
          conteudo: "Processos reprodutivos dos vegetais.",
          revisaoAulas: ["8 Reprodução das gimnospermas e angiospermas"]
        },
        {
          habilidade: "AE3 Analisar formas de prevenção das infecções sexualmente transmissíveis e da gravidez precoce, reconhecendo práticas de saúde sexual e reprodutiva.",
          conteudo: "Infecções sexualmente transmissíveis - ISTs.",
          revisaoAulas: ["12 Infecções sexualmente transmissíveis (ISTs)", "14 Sífilis"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Descrever as principais estruturas e funções do sistema digestório e dos nutrientes, relacionando os à classificação dos alimentos em processados, ultraprocessados e in natura.",
          conteudo: "Guia Alimentar para a População Brasileira.",
          revisaoAulas: ["3 Guia Alimentar da População Brasileira"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Identificar os modelos que estruturam a matéria, reconhecendo a evolução histórica dos modelos atômicos e a classificação dos elementos químicos.",
          conteudo: "Modelos atômicos. Características atômicas. Representação dos elementos químicos.",
          revisaoAulas: ["6 Átomos: o desenvolvimento dos modelos", "10 Organização dos elementos químicos: classificação periódica"]
        },
        {
          habilidade: "AE6 Investigar as características das ondas mecânicas e eletromagnéticas, reconhecendo como esses conhecimentos revolucionaram os sistemas de comunicação humana.",
          conteudo: "Ondas mecânicas e ondas eletromagnéticas. Propriedades das ondas.",
          revisaoAulas: ["17 Ondas eletromagnéticas e mecânicas", "18 Características das ondas: amplitude e comprimento de onda"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE8 Explicar a transmissão das características hereditárias com base nas ideias de Mendel sobre fatores hereditários, gametas, segregação e fecundação, utilizando heredogramas.",
          conteudo: "Hereditariedade. Leis de Mendel. Quado de Punnet.",
          revisaoAulas: ["10 Bases da Hereditariedade: o DNA e os genes", "11 Primeira Lei de Mendel"]
        }
      ]
    }
  },
  "História": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Identificar formas de organizar o tempo ao longo da história para reconhecê-lo como uma construção cultural.",
          conteudo: "Tempo da natureza, cronológico e tempo histórico. As diferentes formas de datação do tempo cronológico. A representação do tempo para diferentes culturas ao longo da História.",
          revisaoAulas: ["1 Os diferentes tipos de tempo", "3 A importância do tempo para diferentes culturas"]
        },
        {
          habilidade: "AE2 Discutir o papel das fontes e dos historiadores na produção de conhecimentos históricos.",
          conteudo: "O trabalho do historiador. Fontes históricas. As diferenças entre a cultura material e imaterial.",
          revisaoAulas: ["6 O que são fontes históricas?", "8 Cultura material e imaterial"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Identificar as diferentes formas de expressão cultural utilizadas pelas sociedades antigas da África, Ásia e Américas, a partir de suas fontes e destacando sua contribuição para outras civilizações.",
          conteudo: "Reino de Kush e o Império Axum escultura, objetos cerâmica e metalurgia. Formação do Egito Antigo a política, arte e escrita egípcia. Griots africanos.",
          revisaoAulas: ["2 Reino de Kush e Axum", "3 Egito Antigo"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar o significado de modernidade na concepção europeia, considerando suas manifestações culturais, artísticas, científicas, religiosas e políticas, bem como suas lógicas de inclusão e exclusão.",
          conteudo: "As principais características do movimento humanista. O conceito de Renascimento. Características do Renascimento. Reforma Protestante e Contrarreforma",
          revisaoAulas: ["3 Renascimento", "4 Reforma Protestante"]
        },
        {
          habilidade: "AE2 Identificar as características sociais, políticas, econômicas, tecnológicas e artísticas de sociedades africanas e americanas antes do início sistemático da colonização, para valorizar a diversidade dessas civilizações.",
          conteudo: "Patrimônios cultural, material e imaterial. Técnicas agrícolas incas. Arquitetura e engenharia inca. Tecidos africanos. Símbolos adinkras.",
          revisaoAulas: ["8 Saberes e técnicas da região Andina", "9 Saberes e técnicas das sociedades africanas"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Analisar as dinâmicas políticas, econômicas e sociais da América Espanhola no período colonial, com base na comparação e interpretação de diferentes fontes históricas, considerando os pontos de vista dos europeus, indígenas e africanos.",
          conteudo: "Minas de prata na América colonial (Potosí na atual Bolívia e Zacatecas no atual México). Exploração de mão de obra escravizada. Economia colonial na América espanhola. Resistência dos povos nativos",
          revisaoAulas: ["8 América espanhola colonial: o trabalho nas minas de prata", "10 Impactos da conquista: lutas e estratégias dos povos indígenas"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Discutir a emergência de ideias iluministas e liberais, relacionando com suas manifestações políticas na Europa.",
          conteudo: "Conceitos iluministas. Liberalismo econômico. Revolução Puritana. Absolutismo inglês.",
          revisaoAulas: ["1 Introdução às ideias iluministas", "4 A Revolução Gloriosa"]
        },
        {
          habilidade: "AE2 Analisar o processo histórico denominado Revolução Industrial e seus impactos nas relações de trabalho, na produção e na circulação de povos, produtos e culturas.",
          conteudo: "Industrialização na Inglaterra do século XVIII. Relações de trabalho na Inglaterra do século XVIII: trabalho infantil e da mulher. Transformações nas relações familiares e sociais. Movimentos trabalhistas.",
          revisaoAulas: ["7 Revolução Industrial: aspectos econômicos e sociais", "9 Mãos pequenas, longas jornadas: trabalho infantil e feminino nas fábricas"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE6 Analisar os processos de independência da América Espanhola e Haiti, examinando o ideário dos líderes independentes: a influência do panamericanismo e as transformações políticas territoriais.",
          conteudo: "Circulação dos ideais que deram respaldo para as independências nas América Espanhola; Movimentos de Independência na América Espanhola",
          revisaoAulas: ["1 Influências ideológicas nas Independências da América espanhola", "2 Movimentos de Independência nas Américas - Parte 1"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar o processo histórico de implementação da Primeira República no Brasil, suas características políticas, culturais, urbanísticas e sociais.",
          conteudo: "Os desafios do início da República. Coronelismo e a Política do Café com Leite na Primeira República. Processos de urbanização e modernização no Brasil do início do século XX. As contradições do processo de urbanização.",
          revisaoAulas: ["2 Estrutura política e social no Brasil na Primeira República", "5 Urbanização, modernização e suas contradições na Primeira República"]
        },
        {
          habilidade: "AE2 Analisar os conflitos sociais durante a Primeira República no Brasil, considerando suas causas, seus agentes e desdobramentos.",
          conteudo: "A Guerra de Canudos. A Revolta da Vacina. A Revolta da Chibata. A Greve Geral de 1917. Trabalhismo.",
          revisaoAulas: ["4 Conflitos e revoltas rurais na Primeira República", "6 Urbanização e a questão da 'higienização' na Primeira República"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE8 Analisar a ascensão dos regimes nazista e fascista no contexto do entreguerras, seus projetos de perseguição sistêmica e seu papel como catalisadores da Segunda Guerra Mundial.",
          conteudo: "Ascensão dos regimes totalitários no século XX. O antissemitismo. O Holocausto. A bipolarização mundial. A criação da Organização das Nações Unidas (ONU).",
          revisaoAulas: ["9 O nazismo", "10 Segunda Guerra Mundial: o mundo em guerra novamente"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar fontes e narrativas historiográficas, considerando suas tipologias na construção do conhecimento histórico.",
          conteudo: "A produção do conhecimento histórico; As fontes históricas; A construção da narrativa historiográfica.",
          revisaoAulas: ["1 A produção do conhecimento histórico: \"o ofício do historiador\"", "2 \"A memória evanescente\": o que é lembrado e o que é esquecido ao longo do"]
        },
        {
          habilidade: "AE2 Examinar a linguagem da cultura material e imaterial para analisar as primeiras sociedades do continente americano.",
          conteudo: "Teses e evidências sobre o povoamento do continente americano; Arqueologia; Estudos de Niède Guidon, Walter Neves; Sítios arqueológicos da Serra da Capivara.",
          revisaoAulas: ["5 Teorias, evidências e a reescrita da História: os diferentes caminhos do", "6 Os rastros do espaço natural brasileiro: sambaquieiros e a Serra da Capivara"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar a ocupação humana e a produção do espaço desde a Antiguidade Oriental e Clássica até a Idade Média, considerando suas diferentes dimensões.",
          conteudo: "Grécia: do óikos às pólis gregas: as cidades e o legado clássico da civilização grega; Monarquia e República Romana; Feudalismo; senhores e servos; Historiografia da Idade Média.",
          revisaoAulas: ["1 Cidades-Estados na Antiguidade: a política e a identidade das pólis gregas", "6 A República Romana e seus espaços públicos"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar os movimentos históricos da Revolução Francesa (1789-1815), avaliando seus desdobramentos sociais, políticos e jurídicos, em tempos e espaços distintos.",
          conteudo: "Iluminismo; Fim do absolutismo/Antigo Regime; Revolução Francesa; Movimentos anticolonialistas.",
          revisaoAulas: ["1 \"As abomináveis ideias francesas\": o Iluminismo e as bases da sociedade", "2 Revolução Francesa: de \"súditos\" a \"cidadãos\""]
        },
        {
          habilidade: "AE2 Analisar os processos de formação de territórios, territorialidades e fronteiras nas independências da América, comparando diferentes regiões a partir de fontes históricas que evidenciam as características desse contexto.",
          conteudo: "Revolução Americana e Independência dos Estados Unidos da América; Insurreição dos escravizados e Proclamação da República negra no Haiti.",
          revisaoAulas: ["2 Revolução Francesa: de \"súditos\" a \"cidadãos\"", "6 Os ecos da Revolução Francesa no Caribe: a ilha de São Domingos e o"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Analisar as características políticas, sociais e econômicas da sociedade brasileira durante a Primeira República, considerando os conflitos sociais, as desigualdades, as contradições e as transformações tecnológicas em suas relações com o trabalho e a vida cotidiana.",
          conteudo: "Teorias racialistas e branqueamento; Conflitos e contestações na Primeira República: Canudos; \"Reforma\" Urbana; Favelização; Políticas higienistas; Revolta da Vacina; Higienismo.",
          revisaoAulas: ["4 A \"imagem\" do Brasil na Primeira República: um retrato da exclusão", "8 \"Uma Paris Tropical\": a modernização do Rio de Janeiro via \"bota-abaixo\""]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Relacionar as transformações tecnológicas, econômicas e sociais da Segunda Revolução Industrial à crise de 1929, associando imperialismo, neocolonialismo, nacionalismo e Primeira Guerra Mundial, e considerando as contradições ético-políticas e os papéis sociais da mulher na sociedade urbano-industrial.",
          conteudo: "Segunda Revolução Industrial, Expansão industrial dos países europeus; Expansão colonial século XIX; Imperialismo; Conferência de Berlim; Imperialismo; cientificismo racialista, racismo no século XIX; Transformações tecnológicas e científicas dos séculos XIX e XX; Segunda Revolução Industrial e desdobramentos tecnológicos e políticos; Avanços da ciência; a concepção de progresso e as guerras mundiais; Belle Époque; liberalismo excludente; avanços técnicos e científicos.",
          revisaoAulas: ["1 As sociedades do \"progresso\": a Segunda Revolução Industrial", "3 A dominação europeia da África e Ásia: colônias, protetorados e áreas de"]
        },
        {
          habilidade: "AE1 Relacionar as transformações tecnológicas, econômicas e sociais da Segunda Revolução Industrial à crise de 1929, associando imperialismo, neocolonialismo, nacionalismo e Primeira Guerra Mundial, e considerando as contradições ético-políticas e os papéis sociais da mulher na sociedade urbano-industrial.",
          conteudo: "Rivalidades das potências europeias imperialistas; Primeira Guerra Mundial e a relação entre o desenvolvimento científico-tecnológico e as guerras; Fim da Primeira Guerra Mundial; Acordos de Paz; Tratado de Versalhes; Anos 1920: American way of life; Especulação financeira como motivação da crise do capitalismo em 1929;Grande Depressão; New Deal.",
          revisaoAulas: ["8 Potências em conflito: a Grande Guerra", "10 EUA nos anos 1920 e 1930: a prosperidade, a crise e a Grande Depressão"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar a ascensão do fascismo e do nazismo, seus regimes totalitários e a eclosão da Segunda Guerra Mundial, discutindo os usos políticos da violência e avaliando mecanismos éticos de combate a essas práticas.",
          conteudo: "Ascensão do Fascismo; Totalitarismo; Racismo e antissemitismo nazista; Usos políticos da violência pelo Estado Nazista;",
          revisaoAulas: ["1 \"Uma marcha sobre Roma\": o fascismo no poder", "7 A banalidade do mal: a \"solução final\" e o Holocausto"]
        }
      ]
    }
  },
  "Geografia": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Descrever paisagens a partir de seus elementos constitutivos, comparando as modificações dos lugares de vivência em diferentes tempos.",
          conteudo: "O conceito de paisagem; · Tipos de paisagem; · Planos da paisagem; Transformação da paisagem",
          revisaoAulas: ["2 Paisagem", "3 Transformação da paisagem"]
        },
        {
          habilidade: "AE2 Relacionar os processos de urbanização, industrialização e desenvolvimento da agropecuária às transformações observadas nas paisagens, reconhecendo as diferentes formas de organização do espaço e as mudanças na interação entre sociedade e natureza.",
          conteudo: "Extrativismo mineral; · Extrativismo animal; · Extrativismo vegetal; Setor primário: extrativismo; Setores da economia",
          revisaoAulas: ["7 Setores da economia", "8 Setor primário: extrativismo"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Examinar as representações cartográficas, reconhecendo a importância da Cartografia como forma de linguagem para a interpretação do espaço, diferenciando os elementos de mapas com diferentes representações e escalas.",
          conteudo: "Escala gráfica; · Escala numérica; · Escala grande; · Escala pequena; Escala cartográfica; Cartografia",
          revisaoAulas: ["2 Cartografia", "8 Escala cartográfica"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Analisar como os fluxos econômicos e populacionais contribuem para a formação do território brasileiro e para o surgimento de tensões e conflitos, especialmente em São Paulo, com base em mapas temáticos.",
          conteudo: "Atividades econômicas. · Características do território brasileiro. · Transformações territoriais em São Paulo; Ciclos econômicos no território brasileiro; Papel de São Paulo na reorganização do território nacional",
          revisaoAulas: ["3 O território em movimento: ciclos econômicos e expansão", "6 São Paulo e as transformações territoriais"]
        },
        {
          habilidade: "AE2 Analisar como os fluxos econômicos e populacionais contribuem para a formação do território brasileiro e para o surgimento de tensões e conflitos, especialmente em São Paulo, com base em mapas temáticos.",
          conteudo: "Conceito de território e sua dimensão política. · Construção do território brasileiro. · Tensões ligadas ao uso e posse do território; Território brasileiro: conflitos e disputas por terras; Localização e limites do território brasileiro",
          revisaoAulas: ["5 Território brasileiro: conflitos e disputas por terra"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar a distribuição territorial da população brasileira, relacionando os indicadores demográficos e considerando as diversidades étnico-raciais e culturais.",
          conteudo: "Fluxos migratórios históricos e contemporâneos; Fatores de atração e repulsão populacional, com foco nos complexos regionais",
          revisaoAulas: ["2 Distribuição territorial da população", "3 População e território"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar a influência política, econômica, social e cultural da Nova Ordem Mundial estabelecida no pós-Segunda Guerra sobre os Estados Unidos, a América Latina, a África, com destaque para o Brasil.",
          conteudo: "Estratégias diplomáticas e econômicas; Desafios e oportunidades para os países latino -americanos no contexto da · Nova Ordem Mundial; O Brasil e a Nova Ordem · Mundial.\"; Do mundo bipolar ao mundo multipolar; América Latina no contexto da Guerra Fria",
          revisaoAulas: ["1 Estados Unidos na Nova Ordem Mundial", "3 América Latina na Nova Ordem Mundial"]
        },
        {
          habilidade: "AE1 Analisar a influência política, econômica, social e cultural da Nova Ordem Mundial estabelecida no pós-Segunda Guerra sobre os Estados Unidos, a América Latina, a África, com destaque para o Brasil.",
          conteudo: "Do mundo bipolar ao mundo multipolar; A ascensão dos EUA; Estados Unidos: a superpotência; África e Nova Ordem Mundial",
          revisaoAulas: ["2 Estados Unidos: a superpotência", "4 África na Nova Ordem Mundial"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Analisar padrões econômicos e geopolíticos mundiais, relacionando a produção e o intercâmbio dos Estados Unidos e dos BRICS com a atuação de organizações mundiais e blocos econômicos regionais.",
          conteudo: "Setores da economia.Indicadores econômicos dos Estados Unidos, da China e dos BRICS. USMCA, CAN, ALADI e MERCOSUL. · Principais produtos e serviços comercializados por Estados Unidos e China, e entre Estados Unidos e BRICS; Características gerais do BRICS; Indicadores econômicos dos Estados Unidos e dos BRICS",
          revisaoAulas: ["3 BRICS", "6 Relações comerciais entre os Estados Unidos e os BRICS"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar o exercício da hegemonia europeia em diferentes tempos e lugares, usando representações cartográficas e gráficas para evidenciar desigualdades sociopolíticas e geopolíticas.",
          conteudo: "Organização do sistema colonial e pacto colonial; Consequências atuais da colonização nas fronteiras, culturas e relações de poder; Início da globalização e hegemonia europeia no controle territorial",
          revisaoAulas: ["1 As Grandes Navegações e o início da hegemonia europeia", "3 Permanências da hegemonia europeia"]
        },
        {
          habilidade: "AE2 Analisar fatos e situações da integração mundial econômica, política e cultural, comparando características e fenômenos da globalização com os da mundialização.",
          conteudo: "Características gerais da · Guerra Fria; · Corrida espacial, tecnológica e cultural como formas de disputa geopolítica; · Muro de Berlim e a separação entre Ocidente e Oriente; Principais influências nos conflitos contemporâneos do Oriente Médio",
          revisaoAulas: ["9 Oriente Médio: território e conflitos"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Analisar fatos e situações da integração mundial econômica, política e cultural, comparando características e fenômenos da globalização com os da mundialização.",
          conteudo: "Quarta fase da globalização e tecnologias emergentes; · Desigualdades, tensões e novas dinâmicas no mundo atual; Economia global e seu impacto no cotidiano local",
          revisaoAulas: ["4 Globalização hoje: tecnologias, desafios e conexões globais", "5 Global e local: conexões no mundo atual"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar os impactos socioambientais das ações humanas coletivas e individuais, selecionando, incorporando e promovendo as que favoreçam a consciência e a ética socioambiental, consumo responsável e a mitigação das mudanças climáticas.",
          conteudo: "Diferenças entre Climatologia e Meteorologia; Conceitos de tempo e clima; Elementos e controles climáticos",
          revisaoAulas: ["1 Climatologia e meteorologia", "3 Elementos e controles climáticos"]
        },
        {
          habilidade: "AE2 Analisar as relações entre elementos naturais e ações humanas, reconhecendo os impactos e a importância da gestão sustentável da água, do relevo e dos biomas.",
          conteudo: "Distribuição da água na Terra; Conceito de bacia hidrográfica; Gestão sustentável dos recursos hídricos; Políticas públicas e práticas de gestão sustentável dos recursos hídricos",
          revisaoAulas: ["6 Recursos hídricos", "7 Gestão sustentável dos recursos hídricos"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Utilizar a linguagem cartográfica de forma crítica e reflexiva.",
          conteudo: "Cartografia temática. Mapas qualitativos e quantitativos; Principais elementos dos mapas",
          revisaoAulas: ["1 Principais elementos dos mapas", "2 Mapas qualitativos e quantitativos"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar como diferentes regiões se organizam, considerando aspectos culturais, econômicos, ambientais, políticos e sociais, com base em dados demográficos e econômicos.",
          conteudo: "Dados de demografia do Brasil. Distribuição e principais características da população brasileira; Principais conceitos de demografia",
          revisaoAulas: ["1 Demografia", "2 Demografia brasileira"]
        },
        {
          habilidade: "AE3 Analisar indicadores socioeconômicos do Brasil, relacionando-os às leis trabalhistas e à atuação do país na economia mundial.",
          conteudo: "Principais dados da economia brasileira atual, com destaque para o PIB; O papel da economia brasileira no cenário mundial.",
          revisaoAulas: ["6 O Brasil na economia mundial"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Analisar os processos de urbanização no Brasil e no mundo, relacionando a formação de cidades, megacidades e territórios ao papel de diferentes agentes e aos impactos socioambientais e socioculturais envolvidos.",
          conteudo: "Impactos socioambientais do processo de urbanização; Urbanização no Brasil",
          revisaoAulas: ["1 A expansão da urbanização no Brasil ao longo dos séculos", "2 Impactos socioambientais da urbanização"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar os impactos socioambientais das ações humanas coletivas e individuais, selecionando, incorporando e promovendo as que favoreçam a consciência e a ética socioambiental, consumo responsável e a mitigação das mudanças climáticas.",
          conteudo: "Principais elementos de um climograma: temperatura e precipitação; Biomas associados a determinados padrões de climogramas; Principais biomas da Terra",
          revisaoAulas: ["2 Climograma", "5 Principais biomas do planeta Terra"]
        },
        {
          habilidade: "AE2 Analisar as relações entre elementos naturais e ações humanas, reconhecendo os impactos e a importância da gestão sustentável da água, do relevo e dos biomas.",
          conteudo: "Processos endógenos e exógenos de formação do relevo; Distribuição de água na Terra",
          revisaoAulas: ["3 Recursos hídricos", "4 Relevo"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "EM13CHS301 Problematizar hábitos e práticas individuais e coletivos de produção, reaproveitamento e descarte de resíduos em metrópoles, áreas urbanas e rurais, e comunidades com diferentes características socioeconômicas, e elaborar e/ou selecionar propostas de ação que promovam a sustentabilidade socioambiental, o combate à poluição sistêmica e o consumo responsável.",
          conteudo: "Causas antrópicas das mudanças climáticas; Principais gases de efeito estufa (GEE); Conceito de pegada ecológica e consumo sustentável",
          revisaoAulas: ["3 Pegada ecológica", "4 Efeito estufa"]
        }
      ]
    }
  },
  "Língua Inglesa": {
    "6º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Trocar informações sobre si mesmo, o outro e o universo da sala de aula, atendendo às instruções e comandos orais.",
          conteudo: "Saudações e despedidas. · Vocabulário referente ao uso do inglês em sala de aula. (E.g. Please./ Sorry./ Thanks/ May I go out, please?/ Repeat, please! How do you say “x” in English?). · Comandos e instruções do universo da sala de aula.",
          revisaoAulas: ["2 English in the classroom - Part 1", "3 English in the classroom - Part 2"]
        },
        {
          habilidade: "AE1 Trocar informações sobre si mesmo, o outro e o universo da sala de aula, atendendo às instruções e comandos orais.",
          conteudo: "Tipos de nomes (first/ middle/ last/ full name/ surname) e títulos (Mr./ Miss/ Ms./ Mrs.). · Idade (How old are you?/ I´m __). · Números 1- 20. · Origem (Where are you from? / What's your nationality?). · Países e nacionalidades.",
          revisaoAulas: ["12 Countries and nationalities - Part 2"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Localizar informações pontuais e explícitas sobre si, família, rotina ou preferências, em textos escritos.",
          conteudo: "Selecionar informações explícitas em um texto escrito em língua inglesa sobre informações pessoais.",
          revisaoAulas: ["5 Meet my family - Part 1", "7 Someone Special (Part 1)"]
        }
      ]
    },
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Interagir com os colegas para trocar informações sobre acontecimentos e hábitos passados.",
          conteudo: "Verbs to describe leisure activities. · Preposition “with”. · Like/ dislike + ing (ou infinitive). · Specific vocabulary related to the lesson topic.",
          revisaoAulas: ["1 Free time activities"]
        },
        {
          habilidade: "AE2 Utilizar a escrita para comunicar fatos, hábitos e acontecimentos, especialmente sobre o passado.",
          conteudo: "Preposição de tempo (in, on, at). · Prepositions of time (in, on, at).",
          revisaoAulas: ["5 I don’t like going out on Saturday!", "8 In the morning"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Utilizar a escrita para comunicar fatos, hábitos e acontecimentos, especialmente sobre o passado.",
          conteudo: "To be: simple past. · Specific vocabulary related to the lesson topic. · Simple past: Affirmative form (regular and irregular verbs).",
          revisaoAulas: ["3 How was your weekend?", "9 What a weekend! - Part 1"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Produzir texto escrito para comunicar ideias sobre o futuro.",
          conteudo: "Going to para planos e intenções futuras (Forma afirmativa).",
          revisaoAulas: ["1 Weekend plans"]
        },
        {
          habilidade: "AE2 Produzir texto escrito para comunicar ideias sobre o futuro.",
          conteudo: "Going to para planos e intenções futuras (Forma negativa). · Future time markers (E.g. tomorrow, next weekend, etc.).",
          revisaoAulas: ["3 We are not going to do any homework"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Identificar informações explícitas e implícitas em textos instrucionais e descritivos.",
          conteudo: "Leitura de uma receita em inglês. · Leitura de um tutorial em inglês.",
          revisaoAulas: ["9 Reading descriptions - Part 1", "11 Reading descriptions – Part 2"]
        }
      ]
    },
    "9º Ano": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Expressar recomendações, obrigações, necessidades e probabilidades, utilizando verbos modais em diferentes contextos comunicativos.",
          conteudo: "Modal Verbs.",
          revisaoAulas: ["1 You must consume less", "3 What should I do?"]
        },
        {
          habilidade: "AE3 Identificar estratégias e recursos de persuasão em textos publicitários.",
          conteudo: "Recursos de persuasão.",
          revisaoAulas: ["9 Reading ads - Part 1", "11 Reading ads - Part 2"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Interpretar tirinhas, identificando o posicionamento crítico do autor, as evidências que sustentam sua tese e os efeitos de sentido produzidos por elementos verbais e não verbais.",
          conteudo: "Leitura de tirinhas.",
          revisaoAulas: ["9 Reading Comics - Part 1", "11 Reading Comics - Part 2"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Utilizar diferentes estratégias de leitura, tais como identificação de palavras chave e inferências do significado de palavras desconhecidas pelo contexto, para compreensão de textos em língua inglesa da esfera social.",
          conteudo: "Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.",
          revisaoAulas: ["1 Learning English nowadays (Part 1)", "3 Learning English nowadays (Part 2)"]
        },
        {
          habilidade: "AE1 Utilizar diferentes estratégias de leitura, tais como identificação de palavras chave e inferências do significado de palavras desconhecidas pelo contexto, para compreensão de textos em língua inglesa da esfera social.",
          conteudo: "Inferência de significado pelo contexto.",
          revisaoAulas: ["5 Learning English nowadays (Part 3)", "7 Learning English nowadays (Part 4)"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Utilizar elementos linguísticos específicos da língua inglesa para compreensão e produção de textos da esfera social.",
          conteudo: "Simple Past Tense. Prática de compreensão e produção textual.",
          revisaoAulas: ["9 Evolution in Communication - Part 5", "11 Evolution in Communication - Part 6"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Utilizar diferentes estratégias de leitura, tais como identificação de palavras chave e inferências do significado de palavras desconhecidas pelo contexto, para compreensão de textos em língua inglesa da esfera social.",
          conteudo: "Prática de leitura. Vocabulário temático. Estratégias para compreensão de textos.",
          revisaoAulas: ["1 Fitness and health (Part 1)", "3 Fitness and health (Part 2)"]
        },
        {
          habilidade: "AE1 Utilizar diferentes estratégias de leitura, tais como identificação de palavras chave e inferências do significado de palavras desconhecidas pelo contexto, para compreensão de textos em língua inglesa da esfera social.",
          conteudo: "Prática de leitura. Vocabulário temático. Inferência de significado pelo contexto.",
          revisaoAulas: ["5 Fitness and health (Part 3)", "7 Fitness and health (Part 4)"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Utilizar elementos linguísticos específicos da língua inglesa para compreensão e produção de textos da esfera social.",
          conteudo: "Prática de compreensão e produção textual. Vocabulário temático. Voz passiva.",
          revisaoAulas: ["9 Science Revolution - Part 5", "11 Science Revolution - Part 6"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "EM13LGG403 Fazer uso do inglês como língua de comunicação global, levando em conta a multiplicidade e variedade de usos, usuários e funções dessa língua no mundo contemporâneo.",
          conteudo: "Prática de leitura; Técnicas de leitura: skimming e scanning. Vocabulário Específico.",
          revisaoAulas: ["1 English for life (Part 1)", "3 English for life (Part 2)"]
        },
        {
          habilidade: "EM13LGG403 Fazer uso do inglês como língua de comunicação global, levando em conta a multiplicidade e variedade de usos, usuários e funções dessa língua no mundo contemporâneo.",
          conteudo: "Prática de leitura; Técnicas de leitura: skimming e scanning. Vocabulário Específico.",
          revisaoAulas: ["1 English for life (Part 1)", "3 English for life (Part 2)"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "EM13LGG401 Analisar criticamente textos de modo a compreender e caracterizar as línguas como fenômeno (geo)político, histórico, social, cultural, variável, heterogêneo e sensível aos contextos de uso. (EM13LGG403) Fazer uso do inglês como língua de comunicação global, levando em conta a multiplicidade e variedade de usos, usuários e funções dessa língua no mundo contemporâneo.",
          conteudo: "Prática de leitura; Simple Present; Vocabulário Específico.",
          revisaoAulas: ["1 Technology: Good or Evil? - Part 1", "3 Technology: Good or Evil? - Part 2"]
        }
      ]
    }
  },
  "Biologia": {
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar as transformações e conservações de matéria e energia em sistemas biológicos, associando processos celulares e interações ecológicas à sustentabilidade ambiental.",
          conteudo: "Conceitos básicos da fotossíntese",
          revisaoAulas: ["5 Metabolismo energético: fotossíntese"]
        },
        {
          habilidade: "AE1 Analisar as transformações e conservações de matéria e energia em sistemas biológicos, associando processos celulares e interações ecológicas à sustentabilidade ambiental.",
          conteudo: "Biomas terrestres brasileiros",
          revisaoAulas: ["4 Biomas terrestres brasileiros"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Explicar o aquecimento global, avaliando suas relações com as mudanças climáticas e os riscos ambientais provocados pelas ações humanas.",
          conteudo: "Mudanças climáticas.",
          revisaoAulas: ["2 Eventos climáticos extremos"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Relacionar a meiose à reprodução e a mitose ao crescimento, à manutenção dos tecidos e à origem de cânceres.",
          conteudo: "Mitose",
          revisaoAulas: ["3 Mitose e câncer"]
        },
        {
          habilidade: "AE2 Relacionar a meiose à reprodução e a mitose ao crescimento, à manutenção dos tecidos e à origem de cânceres.",
          conteudo: "Meiose",
          revisaoAulas: ["4 Meiose"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE5 Analisar a importância da diversidade genética, discutindo sua relação com organismos geneticamente modificados e transgênicos, considerando os princípios de biossegurança, bioética e biodiversidade.",
          conteudo: "Manipulação genética",
          revisaoAulas: ["9 Organismos geneticamente modificados são transgênicos?"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "EM13CNT101 Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais específicos, as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento para realizar previsões sobre seus comportamentos em situações cotidianas e em processos produtivos que priorizem o desenvolvimento sustentável, o uso consciente dos recursos naturais e a preservação da vida em todas as suas formas.",
          conteudo: "Biomas terrestres brasileiros",
          revisaoAulas: ["1 Biomas terrestres brasileiros"]
        },
        {
          habilidade: "EM13CNT101 Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais específicos, as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento para realizar previsões sobre seus comportamentos em situações cotidianas e em processos produtivos que priorizem o desenvolvimento sustentável, o uso consciente dos recursos naturais e a preservação da vida em todas as suas formas.",
          conteudo: "Sucessão ecológica",
          revisaoAulas: ["3 Sucessão ecológica"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "EM13CNT102 Realizar previsões, avaliar intervenções e/ou construir protótipos de sistemas térmicos que visem à sustentabilidade, considerando sua composição e os efeitos das variáveis termodinâmicas sobre seu funcionamento, considerando também o uso de tecnologias digitais que auxiliem no cálculo de estimativas e no apoio à construção dos protótipos.",
          conteudo: "Conceitos básicos da fotossíntese",
          revisaoAulas: ["1 Metabolismo energético: fotossíntese"]
        }
      ]
    }
  },
  "Física": {
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Resolver problemas envolvendo corpos em movimento com velocidade e/ou aceleração constantes, representando trajetória, posição, velocidade e aceleração por meio de funções, gráficos e tabelas.",
          conteudo: "Equações horárias do MRUV e equação de Torricelli.",
          revisaoAulas: ["4 Equações do MRUV: além da velocidade constante"]
        },
        {
          habilidade: "AE1 Resolver problemas envolvendo corpos em movimento com velocidade e/ou aceleração constantes, representando trajetória, posição, velocidade e aceleração por meio de funções, gráficos e tabelas.",
          conteudo: "Conceitos iniciais para a descrição do movimento.",
          revisaoAulas: ["1 Movimento e repouso: tudo é uma questão de referencial"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Analisar situações de equilíbrio e de movimento acelerado, aplicando grandezas escalares e vetoriais com operações algébricas e vetoriais, com base nas Leis de Newton.",
          conteudo: "Segunda Lei de Newton: Relação entre força resultante, massa e aceleração; contraste com a ideia de que a força é proporcional à velocidade.",
          revisaoAulas: ["1 Segunda Lei de Newton: quando a força muda o movimento", "4 Deslizando sem atrito: ação das forças de contato"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Interpretar sistemas térmicos, aplicando leis e modelos da Termodinâmica para descrever as transformações de energia associadas à transferência de calor e às variações de temperatura.",
          conteudo: "Formas de propagação do calor e suas aplicações.",
          revisaoAulas: ["5 Quando o calor eleva a temperatura: entendendo o calor sensível", "7 Da condução à radiação: entendendo a propagação do calor"]
        },
        {
          habilidade: "AE1 Interpretar sistemas térmicos, aplicando leis e modelos da Termodinâmica para descrever as transformações de energia associadas à transferência de calor e às variações de temperatura.",
          conteudo: "Calor sensível e capacidade térmica dos materiais",
          revisaoAulas: ["5 Quando o calor eleva a temperatura: Entendendo o calor sensível", "8 Do gelo ao vapor: Investigando calor sensível e latente"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Aplicar princípios da Termodinâmica na análise, avaliação e construção de sistemas térmicos, relacionando sua eficiência a contextos de uso sustentável da energia.",
          conteudo: "Primeira Lei da Termodinâmica em transformações cíclicas.",
          revisaoAulas: ["2 A conservação da Energia: Primeira Lei da Termodinâmica", "5 1ª Lei da Termodinâmica: Exercícios propostos"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar interações eletrostáticas entre cargas e campos elétricos, calculando forças, potenciais e energia associada à situações práticas e simuladas.",
          conteudo: "Definição e unidades do vetor campo elétrico.",
          revisaoAulas: ["5 Representando o campo elétrico: definição, cálculo e linhas de força"]
        },
        {
          habilidade: "AE1 Analisar interações eletrostáticas entre cargas e campos elétricos, calculando forças, potenciais e energia associada à situações práticas e simuladas.",
          conteudo: "Cálculo do campo de cargas pontuais.",
          revisaoAulas: ["7 Quando os campos se encontram: O princípio da superposição", "8 Resolvendo problemas com a superposição de campos elétricos"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE2 Analisar circuitos elétricos, calculando corrente, resistência, tensão, potência e consumo de energia.",
          conteudo: "Resistores ôhmicos e não ôhmicos e a Primeira Lei de Ohm",
          revisaoAulas: ["3 Entre o linear e o não linear", "5 Do watt ao real: potência, consumo e custo na energia elétrica"]
        }
      ]
    }
  },
  "Química": {
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar a evolução histórica e científica dos modelos atômicos, reconhecendo-os como uma construção humana e compreendendo como eles explicam fenômenos do cotidiano.",
          conteudo: "Modelos. Evolução dos modelos atômicos.",
          revisaoAulas: ["3 Descobertas sobre a constituição da matéria", "5 Modelo de Bohr e modelos atuais"]
        },
        {
          habilidade: "AE2 Analisar a origem, a classificação e a organização dos elementos químicos na Tabela Periódica, reconhecendo as características dos radioisótopos e as leis das emissões radioativas.",
          conteudo: "Classificação periódica dos elementos. Tabela periódica (características dos radioisótopos).",
          revisaoAulas: ["9 Radioisótopos", "11 A tabela periódica"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar as diversas interações entre átomos, entre moléculas e entre átomos e moléculas, bem como seus efeitos nas propriedades dos materiais, distinguindo as ligações químicas e as interações intermoleculares das moléculas essenciais à vida.",
          conteudo: "Geometria Molecular. Forças de Interação interpartículas",
          revisaoAulas: ["3 Geometria molecular", "4 Forças de interação interpartículas"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE2 Analisar a eficiência e os impactos socioambientais dos combustíveis renováveis e não renováveis, calculando a entalpia das reações químicas e identificando a dependência mundial dos combustíveis não renováveis.",
          conteudo: "Entalpia de combustão (eficiência energética). Recursos não renováveis (gasolina, diesel) e renováveis (biodiesel, biogás, etanol)",
          revisaoAulas: ["8 Dependência do mundo quanto ao uso de combustíveis não renováveis", "11 Combustíveis alternativos"]
        },
        {
          habilidade: "AE2 Analisar a eficiência e os impactos socioambientais dos combustíveis renováveis e não renováveis, calculando a entalpia das reações químicas e identificando a dependência mundial dos combustíveis não renováveis.",
          conteudo: "Impactos ambientais e sustentabilidade.Materiais, combustíveis e energias alternativas (novas tecnologias).",
          revisaoAulas: ["7 Efeito estufa e o cálculo das emissões de CO2", "13 Vantagens e desvantagens dos combustíveis alternativos."]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar os compostos orgânicos e as suas aplicações, nomeando, classificando e identificando as funções orgânicas, para elaborar ações de prevenção e de promoção da saúde e do bem-estar.",
          conteudo: "Hidrocarbonetos. Hidrocarbonetos ramificados",
          revisaoAulas: ["3 Hidrocarbonetos", "4 Hidrocarbonetos ramificados"]
        }
      ]
    },
    "3ª Série": {
      "1º Bimestre": [
        {
          habilidade: "EM13CNT101 Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais específicos, as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento para realizar previsões sobre seus comportamentos em situações cotidianas e em processos produtivos que priorizem o desenvolvimento sustentável, o uso consciente dos recursos naturais e a preservação da vida em todas as suas formas. (EM13CNT209) Analisar a evolução estelar associando-a aos modelos de origem e distribuição dos elementos químicos no Universo, compreendendo suas relações com as condições necessárias ao surgimento de sistemas solares e planetários, suas estruturas e composições e as possibilidades de existência de vida, utilizando representações e simulações, com ou sem o uso de dispositivos e aplicativos digitais (como softwares de simulação e de realidade virtual, entre outros).",
          conteudo: "Características dos elementos químicos e sua posição na tabela periódica.",
          revisaoAulas: ["3 A tabela periódica", "4 Propriedades periódicas e aperiódicas"]
        },
        {
          habilidade: "EM13CNT101 Analisar e representar, com ou sem o uso de dispositivos e de aplicativos digitais específicos, as transformações e conservações em sistemas que envolvam quantidade de matéria, de energia e de movimento para realizar previsões sobre seus comportamentos em situações cotidianas e em processos produtivos que priorizem o desenvolvimento sustentável, o uso consciente dos recursos naturais e a preservação da vida em todas as suas formas.",
          conteudo: "Estrutura eletrônica dos átomos. Níveis e subníveis de energia.",
          revisaoAulas: ["2 Modelo atômico de Böhr"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "EM13CNT105 Analisar os ciclos biogeoquímicos e interpretar os efeitos de fenômenos naturais e da interferência humana sobre esses ciclos, para promover ações individuais e/ou coletivas que minimizem consequências nocivas à vida.",
          conteudo: "Soluções e concentrações",
          revisaoAulas: ["2 Aspectos quantitativo das soluções"]
        }
      ]
    }
  },
  "Filosofia": {
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar as origens da Filosofia, seus campos de investigação e as características da atitude filosófica, considerando a importância do diálogo e da argumentação fundamentada.",
          conteudo: "As origens da filosofia. Hipóteses sobre o nascimento da filosofia. A atitude filosófica: a exigência pela argumentação. O diálogo como forma de expressão da filosofia. A argumentação nos diálogos filosóficos. A narrativa mitológica e o discurso filosófico.",
          revisaoAulas: ["3 Atitude filosófica: a exigência pela argumentação", "4 A atitude filosófica: a análise dos argumentos"]
        },
        {
          habilidade: "AE2 Analisar a produção artística, compreendendo a formação do gosto e exercitando a atitude crítica diante de padrões estéticos, conhecimentos e valores historicamente construídos.",
          conteudo: "A arte como objeto e como motivação da reflexão filosófica. Estética como campo de investigação filosófica. Os conceitos fundamentais da Estética. O conceito de crítica. A atitude crítica em filosofia.",
          revisaoAulas: ["10 O belo, o feio e o gosto"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE3 Analisar as relações intergeracionais no Brasil e no mundo contemporâneo, problematizando estereótipos e a prática do etarismo, e reconhecendo a importância dos estatutos de proteção às diferentes fases da vida.",
          conteudo: "Estereótipos geracionais e etarismo na sociedade contemporânea. Desafios éticos na convivência entre diferentes gerações. Os valores éticos do respeito à alteridade e da empatia. As condições e as possibilidades de convívio intergeracional: contribuições da filosofia contemporânea para a promoção de diálogo e da responsabilidade entre gerações. Marcos legais de proteção das fases da vida: os Estatutos da Criança e do Adolescente, da Juventude e da Pessoa Idosa. A noção de olhar do outro segundo Jean Paul Sartre. O olhar do outro nas relações intergeracionais. O protagonismo juvenil na promoção de relações intergeracionais éticas. Orientações para produção de uma campanha de promoção de relações éticas intergeracionais no âmbito escolar.",
          revisaoAulas: ["1 Desafios éticos nas relações intergeracionais", "3 O olhar do outro nas relações intergeracionais"]
        }
      ]
    }
  },
  "Sociologia": {
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "AE1 Analisar a especificidade do conhecimento sociológico como campo científico, reconhecendo seus conceitos fundamentais e teorias clássicas da relação entre indivíduo e sociedade, aplicando-os na análise de processos sociais.",
          conteudo: "O conceito de fatos sociais. A sociedade como realidade externa, anterior e coercitiva. A noção de consciência coletiva. Conceito de ação social: sentido, orientação, interação. Tipos de ação social: racional com relação à fins, racional com relação a valores, carismática e tradicional. Conceito de materialismo histórico: a infraestrutura econômica determina a superestrutura. A luta de classes como motor da história.",
          revisaoAulas: ["3 A sociedade em Émile Durkheim", "5 A sociedade em Max Weber"]
        },
        {
          habilidade: "AE2 Analisar a relação entre o indivíduo e o contexto sociocultural em que vive, aplicando conceitos da antropologia e da sociologia, identificando os processos que tornam os humanos seres sociais e culturais.",
          conteudo: "O processo de socialização (primária e secundária). Sociabilidade: interação, representação e papel social nas relações cotidianas. A construção da identidade como processo social. Identidade social e pessoal. Identidade cultural: a cultura como fator que nos iguala e nos diferencia como seres humanos.",
          revisaoAulas: ["1 A Sociologia no Ensino Médio", "2 O surgimento da Sociologia"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "AE4 Analisar as relações entre sujeitos e grupos no mundo contemporâneo, aplicando os conceitos de diferenciação, produção social da diferença, estratificação e classe social, para explicar problemas de convivência, exclusão social, marginalização e desigualdades.",
          conteudo: "Marcadores sociais das diferenças. Produção social do preconceito, da discriminação e da intolerância. O que nos torna desiguais: os processos de estratificação social. A relação entre diferenciação e estratificação social. Estratificação e produção social das desigualdades. A noção de classe social; Karl Marx: a desigualdade é estrutural da sociedade capitalista. Max Weber: desigualdades de riqueza, prestígio e poder.",
          revisaoAulas: ["3 Estratificação social e diferenças", "4 Estratificação social e classes sociais"]
        }
      ]
    }
  },
  "Tecnologia e Inovação": {
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "Compreender conceitos básicos relacionados à organização e ao uso de arquivos digitais no computador",
          conteudo: "Arquivos compactados e descompactados",
          revisaoAulas: ["Slides Aula 3 de Tecnologia do 7º Ano", "Como comprimir e descompactar arquivos no sistema operacional"]
        },
        {
          habilidade: "Compreender como ocorre a circulação de informações em ambientes digitais.",
          conteudo: "Transmissão de dados",
          revisaoAulas: ["Funcionamento básico de redes", "Como os arquivos trafegam de forma segura na internet"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Criar, documentar e publicar, de forma individual ou colaborativa, produtos (vídeos, podcasts, web sites) usando recursos de tecnologia.",
          conteudo: "Uso de recursos tecnológicos na criação de produtos digitais",
          revisaoAulas: ["Edição básica de áudio e vídeo", "Ferramentas colaborativas de produção digital"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "Planejar produtos digitais considerando organização, estrutura e etapas de desenvolvimento.",
          conteudo: "Planejamento de produto digital",
          revisaoAulas: ["O que é wireframe e wireflow", "Etapas clássicas do design de interfaces digitais"]
        },
        {
          habilidade: "Organizar e comparar informações digitais de forma estruturada para apoiar análises e decisões.",
          conteudo: "Tabelas e organização de informações",
          revisaoAulas: ["Introdução a planilhas eletrônicas", "Como estruturar dados em linhas e colunas de forma lógica"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Construir soluções computacionais de problemas de diferentes áreas do conhecimento, de forma individual e colaborativa, selecionando as estruturas de dados e técnicas adequadas, aperfeiçoando e articulando saberes escolares.",
          conteudo: "Plano cartesiano e construção de padrões simétricos com múltiplas canetas",
          revisaoAulas: ["Programação em blocos ou Scratch", "Como funciona a repetição de comandos e o plano cartesiano"]
        }
      ]
    }
  },
  "Educação Financeira": {
    "7º Ano": {
      "1º Bimestre": [
        {
          habilidade: "Resolver problemas que envolvam as operações com números racionais",
          conteudo: "Consumo Consciente",
          revisaoAulas: ["5 Consumo consciente no dia a dia: analisando nossos gastos - Parte 2", "6 Consumo consciente no dia a dia: analisando nossos gastos - Parte 3"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Resolver problemas que envolvam as operações com números racionais",
          conteudo: "Objetivos pessoais e metas financeiras",
          revisaoAulas: ["3 Planejando para alcançar um objetivo – Parte 1", "4 Planejando para alcançar um objetivo - Parte 2"]
        }
      ]
    },
    "8º Ano": {
      "1º Bimestre": [
        {
          habilidade: "Resolver problemas que envolvam as operações com números racionais",
          conteudo: "Cálculo de porcentagens",
          revisaoAulas: ["7 Descontos e percentuais: calculando a economia real - Parte 1"]
        },
        {
          habilidade: "Obter os valores de medidas de tendência central de uma pesquisa estatística (média) com a compreensão de seus significados.",
          conteudo: "Estatística: medidas de tendência central - média aritmética",
          revisaoAulas: ["5 Decisões de compra - Parte 2"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Resolver problemas envolvendo cálculo de porcentagens",
          conteudo: "Cálculo de porcentagens",
          revisaoAulas: ["3 Promoções e descontos - Parte 1", "5 Percentuais na mídia: analisando notícias - Parte 1"]
        }
      ]
    },
    "1ª Série": {
      "1º Bimestre": [
        {
          habilidade: "Compreender a função do Banco Central na economia nacional.",
          conteudo: "Banco Central e sua função",
          revisaoAulas: ["4 Sistema Financeiro Nacional - Parte 2: reconhecendo as instituições financeiras"]
        },
        {
          habilidade: "Compreender o funcionamento do Sistema Financeiro Nacional",
          conteudo: "Organização do sistema financeiro brasileiro.",
          revisaoAulas: ["3 Sistema Financeiro Nacional - Parte 1: bancos e meios de pagamento"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Aplicar conceitos matemáticos no planejamento, na execução e na análise de ações envolvendo a utilização de aplicativos e a criação de planilhas (para o controle de orçamento familiar, simuladores de cálculos de juros simples e compostos, entre outros), para tomar decisões.",
          conteudo: "Uso consciente do crédito e risco de endividamento.",
          revisaoAulas: ["2 Entendendo o crédito", "3 Uso consciente do crédito"]
        }
      ]
    },
    "2ª Série": {
      "1º Bimestre": [
        {
          habilidade: "Aplicar estratégias de organização orçamentária para distribuir recursos financeiros de forma equilibrada e consciente.",
          conteudo: "Regra 50-30-20; orçamento; planejamento financeiro; distribuição de recursos.",
          revisaoAulas: ["5 Planejamento financeiro básico: oficina de orçamento - Parte 1"]
        },
        {
          habilidade: "Compreender a importância da definição e organização de metas para o planejamento financeiro.",
          conteudo: "Metas financeiras de curto, médio e longo prazo e planejamento financeiro.",
          revisaoAulas: ["4 Planejamento financeiro básico: conceitos e prioridades"]
        }
      ],
      "2º Bimestre": [
        {
          habilidade: "Classificar metas financeiras de acordo com seu horizonte temporal para fortalecer o planejamento financeiro.",
          conteudo: "Metas financeiras de curto, médio e longo prazo e planejamento financeiro.",
          revisaoAulas: ["4 Modelagem de investimentos"]
        }
      ]
    }
  }
};
