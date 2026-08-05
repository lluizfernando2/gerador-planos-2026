// Banco de dados estruturado para a Matriz Socioemocional do Projeto de Vida (Anos Finais: 6º ao 9º Ano)
export interface SocioemocionalRow {
  dimension: string;
  comprehensions: Record<string, string>;
  grades: Record<string, {
    bimestres: Record<string, {
      contexto: string;
      questoes: string;
      habilidade: string;
      atitude: string;
      pratica: string;
      bigFive: string;
      curriculoPaulista: string;
      estrategias: string[];
    }>;
  }>;
}

export const MATRIZ_SOCIOEMOCIONAL: SocioemocionalRow[] = [
  {
    dimension: 'Autoconhecimento',
    comprehensions: {
      '6º Ano': 'Assumir e valorizar quem somos é o primeiro passo para nos tornar quem desejamos ser.',
      '7º Ano': 'Escolher o que nos interessa é também escolher quem estamos nos tornando.',
      '8º Ano': 'Cultivar habilidades que conectem quem somos hoje com quem desejamos ser no futuro.',
      '9º Ano': 'Compreender as fragilidades como parte da identidade, buscando formas saudáveis de lidar com elas e caminhos possíveis de superação.'
    },
    grades: {
      '6º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Somos diferentes e habitamos o mesmo mundo. Qual será o resultado disso?',
            questoes: 'Quais são as características sem as quais eu deixaria de ser quem sou?',
            habilidade: 'AC.6.1 Reconhecer as próprias características físicas e psicológicas.',
            atitude: 'Autoconexão',
            pratica: 'Reconhecer',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Questionários de autopercepção; exercícios autobiográficos; autoentrevista.',
              'Roda “Quem sou eu por dentro e por fora”',
              'Espelho simbólico',
              'Retrato Identitário',
              'Diário “Eu comigo”',
              'Círculo das Diferenças'
            ]
          },
          '2º Bimestre': {
            contexto: 'Existem momentos em que estamos cercados de pessoas, e outros em que estamos só com nossos pensamentos. O que aprendemos sobre nós quando estamos em silêncio?',
            questoes: 'Como eu sou quando estou só comigo mesmo?',
            habilidade: 'AC.6.2 Identificar quais características pessoais promovem a autenticidade.',
            atitude: 'Autenticidade',
            pratica: 'Observar-se',
            bigFive: 'Abertura à experiência',
            curriculoPaulista: '',
            estrategias: [
              '“Cinco minutos comigo”',
              'Espaço do silêncio',
              'Cartas para mim mesmo',
              'Linha do tempo emocional',
              'Metáforas do eu'
            ]
          }
        }
      },
      '7º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Os interesses mudam com o tempo — o que gostávamos na infância pode já não fazer sentido hoje. E alguns gostos nos acompanham desde sempre. O que será que isso revela sobre nossa história e sobre quem estamos nos tornando?',
            questoes: 'O que mudou e o que permaneceu nos meus interesses até agora?',
            habilidade: 'AC.7.1 Analisar as transformações que ocorreram em seus interesses ao longo dos anos.',
            atitude: 'Autenticidade',
            pratica: 'Refletir',
            bigFive: 'Abertura à experiência',
            curriculoPaulista: '',
            estrategias: [
              'Linha do tempo dos interesses',
              'Caixa de memórias simbólicas',
              'Entrevista com o eu mais jovem',
              'Painel de transformações',
              'Diálogo entre fases da vida'
            ]
          },
          '2º Bimestre': {
            contexto: 'Nem tudo o que gostamos nos faz bem. Às vezes seguimos interesses que nos afastam de quem queremos ser. O que faz um interesse ser saudável ou ético? O que quero manter na minha vida — e o que vale a pena mudar?',
            questoes: 'Eu me interesso por coisas que fazem a minha vida ser melhor?',
            habilidade: 'AC.7.2 Fazer uma lista pessoal de interesses éticos e saudáveis para manter e/ou desenvolver.',
            atitude: 'Responsabilidade pessoal',
            pratica: 'Decidir',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Semáforo dos interesses',
              'Diálogo interno dramatizado',
              'Mapa de bem-estar',
              'Roda de compartilhamento: o que me faz bem?',
              'Cartas para o eu do futuro'
            ]
          }
        }
      },
      '8º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Desde que existimos, os seres humanos inventam, aprendem, cuidam, narram, dançam, constroem e sentem. O que será que essas habilidades dizem sobre o que é ser humano? E como elas continuam vivas em nós hoje?',
            questoes: 'Quais habilidades foram desenvolvidas pela humanidade?',
            habilidade: 'AC.8.1 Conhecer habilidades humanas de diversas naturezas.',
            atitude: 'Admiração pelo humano',
            pratica: 'Nomear',
            bigFive: 'Abertura à experiência',
            curriculoPaulista: '',
            estrategias: [
              'Mapa das habilidades humanas',
              'Galeria de pessoas sábias',
              'Linha do tempo das invenções humanas',
              'Roda de talentos esquecidos',
              'Árvore da humanidade'
            ]
          },
          '2º Bimestre': {
            contexto: 'Todos nós sabemos fazer algo — ouvir, organizar, criar, acalmar, liderar, cozinhar, consertar, desenhar… Mas nem sempre paramos para pensar: o que tenho feito com essas habilidades? Elas têm ajudado alguém? Me fazem crescer?',
            questoes: 'O que eu já sei fazer e o que tenho feito com isso?',
            habilidade: 'AC.8.2 Reconhecer as próprias habilidades e seus usos.',
            atitude: 'Autovalorização consciente',
            pratica: 'Reconhecer',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Inventário pessoal de habilidades',
              'Entrevistas cruzadas',
              'Painel “eu sei fazer”',
              'Cartas de habilidade para mim mesmo',
              'Caixa de usos possíveis'
            ]
          }
        }
      },
      '9º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Todos nós temos partes fortes e partes frágeis. Mas nem sempre olhamos com cuidado para aquilo que nos faz sentir inseguros, com medo ou expostos. Reconhecer essas partes pode nos tornar mais humanos, mais verdadeiros — e mais capazes de crescer.',
            questoes: 'Quais partes de mi fazem com que eu me sinta frágil ou vulnerável?',
            habilidade: 'AC.9.1 Reconhecer as próprias fragilidades.',
            atitude: 'Coragem emocional',
            pratica: 'Revelar-se',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Roda da coragem (com combinados de escuta segura)',
              'Metáforas do iceberg',
              'Cartas que não serão entregues',
              'Poema das fragilidades',
              'Escuta espelhada'
            ]
          },
          '2º Bimestre': {
            contexto: 'Todos nós temos dias difíceis. Todos sentimos medo, tristeza, insegurança. Mas o que fazemos com isso? Fugimos? Guardamos? Gritamos? Ou aprendemos a cuidar? Criar formas saudáveis de lidar com o que nos machuca é parte do que significa crescer.',
            questoes: 'Como posso lidar com as minhas fragilidades?',
            habilidade: 'AC.9.2 Criar formas saudáveis de lidar com as próprias fragilidades.',
            atitude: 'Cuidado consigo',
            pratica: 'Cuidar',
            bigFive: 'Neuroticismo / Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Kit de primeiros socorros emocionais',
              'Roteiro de autocuidado',
              'Roda de estratégias compartilhadas',
              'Diário da travessia',
              'Role-playing de autocuidado'
            ]
          }
        }
      }
    }
  },
  {
    dimension: 'Convivência',
    comprehensions: {
      '6º Ano': 'Aprender a se expressar com respeito, sem abrir mão da autenticidade, construindo relações de confiança com os demais.',
      '7º Ano': 'Utilizar os princípios da comunicação não violenta para expressar-se com respeito, empatia e assertividade.',
      '8º Ano': 'Agir com empatia, sendo capaz de compreender as perspectivas e os sentimentos dos outros.',
      '9º Ano': 'Agir com responsabilidade, considerando o impacto das próprias decisões no bem-estar físico e psicológico dos outros.'
    },
    grades: {
      '6º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Na escola e na vida, convivemos com pessoas diferentes — mas com algumas, criamos conexões mais fortes. Quem são essas pessoas? O que temos em comum? Como podemos estar juntos de forma positiva e criativa?',
            questoes: 'Quem são as pessoas com as quais eu tenho afinidades?',
            habilidade: 'C.6.1 Formar grupos de interesse com colegas.',
            atitude: 'Abertura para o encontro',
            pratica: 'Acolher',
            bigFive: 'Extroversão',
            curriculoPaulista: 'EF67LP23A',
            estrategias: [
              'Mapa das afinidades',
              'Dinâmica dos círculos de interesse',
              'Grupos por projeto espontâneo',
              'Roda “eu e os outros”',
              'Caderno coletivo de interesses'
            ]
          },
          '2º Bimestre': {
            contexto: 'Nem sempre todo mundo pensa igual. E tudo bem! Mas como dizer o que eu penso sem magoar? Como discordar sem brigar? Falar com respeito, mesmo em grupos diferentes, é uma habilidade importante para a escola e para a vida.',
            questoes: 'Como eu posso falar o que penso de forma respeitosa?',
            habilidade: 'C.6.2 Expor seu ponto de vista de modo respeitoso em grupos com opiniões diversas.',
            atitude: 'Respeito às diferenças',
            pratica: 'Argumentar',
            bigFive: 'Amabilidade',
            curriculoPaulista: 'EF69LP15',
            estrategias: [
              'Círculo de opiniões diferentes',
              'Jogo “concordo/discordo/tenho dúvidas”',
              'Roteiro de fala respeitosa',
              'Cena dramatizada de conflitos',
              'Painel das vozes'
            ]
          }
        }
      },
      '7º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Às vezes, o jeito como a gente fala pode machucar, ajudar ou confundir. Outras vezes, o silêncio fala mais do que as palavras. Será que sabemos como nossas palavras afetam os outros? E como a forma de escutar também faz diferença?',
            questoes: 'O que acontece quando eu sei me comunicar bem com os outros?',
            habilidade: 'C.7.1 Refletir sobre os efeitos de diferentes formas de se comunicar em contextos escolares, familiares e comunitários.',
            atitude: 'Consciência comunicativa',
            pratica: 'Escutar',
            bigFive: 'Amabilidade',
            curriculoPaulista: 'EF69LP01A',
            estrategias: [
              'Análise de falas cotidianas',
              'Cena muda x cena empática',
              'Jogo da escuta ativa',
              'Diário de comunicação',
              'Painel “palavras que constroem”'
            ]
          },
          '2º Bimestre': {
            contexto: 'Nem sempre falamos do mesmo jeito com todas as pessoas. Às vezes, somos mais cuidadosos com alguns, mais impacientes com outros. Será que a forma como falamos nos aproxima ou afasta das pessoas? E será que podemos escolher melhor como nos expressamos?',
            questoes: 'A forma como eu falo com os outros me ajuda ou me atrapalha?',
            habilidade: 'C.7.2 Avaliar e ampliar as formas de comunicação, assumindo papéis ativos em grupos e propondo estratégias de cooperação.',
            atitude: 'Auto-observação',
            pratica: 'Refletir',
            bigFive: 'Extroversão / Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Diário de interações',
              'Cartões de feedback anônimo',
              'Roleplay de situações reais',
              'Mapa de modos de falar',
              'Roda “eu costumo falar assim quando...”'
            ]
          }
        }
      },
      '8º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Nem sempre as pessoas pensam como a gente. Às vezes, elas reagem de formas que não entendemos. Mas será que conseguimos enxergar as situações pelos olhos dos outros? Entender como os outros pensam pode mudar nossas relações — e até nossas decisões.',
            questoes: 'O que os outros estão pensando?',
            habilidade: 'C.8.1 Conhecer a perspectiva dos outros em diferentes situações.',
            atitude: 'Curiosidade empática',
            pratica: 'Escutar',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Jogo “na cabeça do outro”',
              'Cartas de perspectiva',
              'Painel de múltiplas vozes',
              'Entrevista empática',
              'Cenas invertidas'
            ]
          },
          '2º Bimestre': {
            contexto: 'Às vezes, sentimos com tanta força o que está acontecendo que nem percebemos se o que sentimos é nosso ou vem do outro. Em outras vezes, julgamos ou ignoramos o que o outro sente. Como aprender a ouvir as emoções dos outros — sem confundir com as nossas?',
            questoes: 'O que os outros estão sentindo?',
            habilidade: 'C.8.2 Diferenciar os próprios sentimentos dos sentimentos dos outros em diferentes situações.',
            atitude: 'Sensibilidade emocional',
            pratica: 'Observar-se',
            bigFive: 'Neuroticismo / Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Mapa de emoções cruzadas',
              'Jogo “emoção não é adivinhação”',
              'Diário de empatia',
              'Roleplay de escuta afetiva',
              '“Onde termina o outro, onde começo eu?”'
            ]
          }
        }
      },
      '9º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Às vezes, pequenos gestos mudam o dia de alguém. Outras vezes, atitudes comuns podem machucar — mesmo sem intenção. O que realmente faz alguém se sentir bem? Como podemos aprender a reconhecer essas necessidades nas outras pessoas?',
            questoes: 'O que faz com que as pessoas se sintam bem?',
            habilidade: 'C.9.1 Conhecer o que gera bem-estar físico e psicológico para os outros.',
            atitude: 'Cuidado com o outro',
            pratica: 'Acolher',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Escuta empática orientada',
              'Roda do bem-estar',
              'Observação ativa',
              'Diário do bem-estar alheio',
              'Criação de um “guia de convivência empática”'
            ]
          },
          '2º Bimestre': {
            contexto: 'Tudo que fazemos ou deixamos de fazer impacta alguém. Às vezes, uma escolha pessoal pode ajudar — ou machucar — alguém próximo. Como tomar decisões pensando também nos outros? Será que isso limita ou fortalece a nossa liberdade?',
            questoes: 'O que o bem-estar dos outros tem a ver comigo?',
            habilidade: 'C.9.2 Considerar o bem-estar dos outros nas decisões da vida cotidiana.',
            atitude: 'Responsabilidade relacional',
            pratica: 'Decidir',
            bigFive: 'Amabilidade / Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Dilemas éticos do cotidiano',
              'Trilha das decisões conscientes',
              'Painel de “efeito colateral”',
              'Campanha “minhas escolhas, nosso mundo”',
              'Círculo de corresponsabilidade'
            ]
          }
        }
      }
    }
  },
  {
    dimension: 'Tomada de decisão',
    comprehensions: {
      '6º Ano': 'Testar possibilidades de decisão em diferentes cenários e com a participação de diferentes atores.',
      '7º Ano': 'Tomar decisões baseadas na análise das causas e consequências das situações.',
      '8º Ano': 'Usar valores éticos como critérios para a tomada de decisão.',
      '9º Ano': 'Compreender o papel que outras pessoas podem ter no processo de tomada de decisão dos estudantes.'
    },
    grades: {
      '6º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Escolher entre ir ou não, contar ou esconder, ajudar ou ignorar, se posicionar ou ficar quieto… Todos os dias tomamos decisões. Mas nem sempre é fácil. Por quê? O que torna uma escolha difícil?',
            questoes: 'É fácil tomar decisões?',
            habilidade: 'TD.6.1 Compreender porque pode ser difícil tomar decisões.',
            atitude: 'Coragem para decidir',
            pratica: 'Refletir',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              '“Escolhas difíceis” – relato pessoal',
              'Jogo das decisões cotidianas',
              'Mapa das dúvidas',
              'Termômetro da dificuldade',
              'Jogo de papéis com perspectivas diferentes'
            ]
          },
          '2º Bimestre': {
            contexto: 'Tomar uma decisão na frente dos amigos é diferente de decidir sozinho. Às vezes, o lugar, as pessoas, o momento ou o que está em jogo mudam tudo. Mas será que a gente percebe isso quando escolhe alguma coisa?',
            questoes: 'O que é preciso fazer para tomar decisões?',
            habilidade: 'TD.6.2 Analisar a influência dos contextos na tomada de decisões.',
            atitude: 'Atenção ao contexto',
            pratica: 'Observar-se',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Cenários de decisão',
              'Jogo “se fosse em outro lugar...”',
              'Roteiro de perguntas para decidir',
              'Mapa das influências',
              'Diário de decisão contextualizada'
            ]
          }
        }
      },
      '7º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Muitas vezes a gente decide porque algo acontece, alguém fala, ou uma situação muda. Mas e quando isso acontece com pessoas que tomam decisões que afetam o mundo? O que provoca essas decisões? E o que provoca as nossas?',
            questoes: 'O que causa a necessidade de tomar uma decisão?',
            habilidade: 'TD.7.1 Analisar causas de decisões pessoais e históricas.',
            atitude: 'Curiosidade investigativa',
            pratica: 'Observar-se',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Linha do tempo das decisões pessoais',
              'Jogo das causas históricas',
              'Comparando decisões: eu e o mundo',
              'Diário “antes de decidir”',
              'Mapa das causas invisíveis'
            ]
          },
          '2º Bimestre': {
            contexto: 'Algumas decisões mudam tudo. Outras, parecem pequenas, mas causam grandes efeitos. Pode ser na nossa vida ou na história do mundo. Como prever as consequências de uma escolha? Dá pra aprender com o que aconteceu com os outros?',
            questoes: 'Que tipo de consequências uma decisão pode ter?',
            habilidade: 'TD.7.2 Analisar consequências de decisões pessoais e históricas.',
            atitude: 'Responsabilidade pelas consequências',
            pratica: 'Refletir',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Antes e depois de uma escolha',
              'Linha de impacto histórico',
              'Dilemas com finais alternativos',
              'Mapa das consequências invisíveis',
              'Cartas para quem decide'
            ]
          }
        }
      },
      '8º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Às vezes, a gente faz algo que parece certo, mas depois percebe que pode ter ferido alguém. Outras vezes, somos pressionados a fazer o que todo mundo faz, mesmo que pareça errado. Como saber o que é ético em cada situação? Existe um jeito justo de decidir?',
            questoes: 'Como saber se uma decisão é ética ou não?',
            habilidade: 'TD.8.1 Avaliar as implicações éticas de diferentes decisões em contextos pessoais, familiares e sociais.',
            atitude: 'Compromisso com o que é justo',
            pratica: 'Refletir',
            bigFive: 'Conscienciosidade / Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Laboratório de dilemas éticos',
              'Jogo das consequências morais',
              'Roteiro de decisão ética',
              'Linha ética da vida real',
              'Mapa dos valores em jogo'
            ]
          },
          '2º Bimestre': {
            contexto: 'Nem tudo o que a gente valoriza faz bem. Às vezes, valorizamos ganhar sempre, ter mais do que os outros, ser reconhecido acima de tudo. Mas será que isso é justo? Como saber se algo que eu acho importante também é bom para mim e para quem está ao meu redor?',
            questoes: 'Tudo o que eu valorizo é bom para mim e para os outros?',
            habilidade: 'TD.8.2 Diferenciar valores éticos de antiéticos.',
            atitude: 'Autocrítica',
            pratica: 'Reconhecer',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Inventário de valores pessoais',
              'Debate “valor ou problema?”',
              'Histórias com valores ocultos',
              'Painel dos valores invertidos',
              'Roda de revisão pessoal'
            ]
          }
        }
      },
      '9º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Em muitas situações importantes, temos que decidir sozinhos — mas isso não significa que precisamos estar sozinhos. Pedir ajuda pode parecer sinal de fraqueza, mas e se for inteligência emocional? Como saber quando é hora de contar com alguém? E quem são essas pessoas?',
            questoes: 'É mais fácil tomar decisões sozinho ou com ajuda de outras pessoas?',
            habilidade: 'TD.9.1 Investigar e praticar estratégias de colaboração, pedindo ajuda e oferecendo apoio em processos de tomada de decisão coletiva.',
            atitude: 'Disposição para buscar apoio',
            pratica: 'Escutar',
            bigFive: 'Amabilidade / Extroversão',
            curriculoPaulista: '',
            estrategias: [
              'Mapa de pessoas-conselheiras',
              'Círculo de conselhos',
              'Autoanálise: eu peço ajuda?',
              'Estudo de caso: decisões compartilhadas',
              'Cenários com e sem ajuda'
            ]
          },
          '2º Bimestre': {
            contexto: 'Quem já passou por situações parecidas com as que você está vivendo pode ter algo importante a dizer. Mas a gente nem sempre quer ouvir. Como saber quando vale a pena escutar alguém mais velho? O que pessoas mais experientes podem ensinar sobre as decisões que ainda vou ter que tomar?',
            questoes: 'Como as pessoas mais experientes podem ajudar a tomar decisões melhores?',
            habilidade: 'TD.9.2 Compreender a importância de ouvir pessoas mais experientes antes de tomar decisões.',
            atitude: 'Respeito pela experiência do outro',
            pratica: 'Escutar',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Entrevista com uma pessoa experiente',
              'Círculo de gerações',
              'Roteiro de perguntas para escuta ativa',
              'Conselhos para mim mesmo',
              'Debate: seguir ou não seguir conselhos?'
            ]
          }
        }
      }
    }
  },
  {
    dimension: 'Planejamento',
    comprehensions: {
      '6º Ano': 'Estabelecer objetivos de curto prazo para organizar os estudos e conquistar metas pessoais na escola.',
      '7º Ano': 'Definir objetivos de curto e médio prazo em diferentes áreas da vida, utilizando estratégias e ferramentas para alcançá-los.',
      '8º Ano': 'Elaborar planos alternativos para lidar com imprevistos e frustrações sem perder de vista seus objetivos.',
      '9º Ano': 'Planejar a transição para o Ensino Médio com base em quem desejam ser e no que desejam conquistar nessa nova etapa.'
    },
    grades: {
      '6º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Cada estudante tem uma forma de aprender, se concentrar e se organizar. Descobrir o seu próprio jeito pode ser o primeiro passo para conquistar seus objetivos na escola. Mas o que será que já sabemos sobre nós mesmos como aprendizes?',
            questoes: 'Quem sou eu como estudante?',
            habilidade: 'P.6.1 Criar seu perfil acadêmico com base na observação de interesses e resultados.',
            atitude: 'Compromisso consigo mesmo',
            pratica: 'Observar-se',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Diário de aprendizagem',
              'Mapa de interesses escolares',
              'Autorretrato de estudante',
              'Entrevista entre pares',
              'Autoavaliação com base em resultados reais'
            ]
          },
          '2º Bimestre': {
            contexto: 'Cada pessoa aprende de um jeito — mas ninguém está pronto. Aprender também é melhorar. E isso exige fazer escolhas, testar caminhos e mudar hábitos. O que eu posso fazer diferente para me tornar um estudante melhor?',
            questoes: 'Como posso me tornar um estudante melhor?',
            habilidade: 'P.6.2 Avaliar as mudanças que gostaria de fazer para melhorar seu perfil acadêmico.',
            atitude: 'Disponibilidade',
            pratica: 'Transformar',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Plano de mudança pessoal',
              'Tabela de hábitos de estudo',
              'Experimento de 1 semana',
              'Estudo de caso: “O estudante que queria mudar”',
              'Círculo de compromissos'
            ]
          }
        }
      },
      '7º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Todo mundo tem sonhos, planos e desejos. Mas quais deles podem se tornar realidade em pouco tempo? E o que pode levar um pouco mais? Reconhecer essas metas e pensar em como conquistá-las é uma forma de cuidar da própria vida.',
            questoes: 'O que eu quero conquistar a curto e médio prazo?',
            habilidade: 'P.7.1 Criar uma lista de objetivos de curto e médio prazo para diversas áreas da vida.',
            atitude: 'Intencionalidade',
            pratica: 'Nomear',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Roda da vida escolar e pessoal',
              'Lista 3x2 (3 objetivos de curto prazo / 2 de médio prazo)',
              'Cartões de metas pessoais',
              'Mapa de objetivos com foco narrativo',
              'Círculo de metas inspiradoras'
            ]
          },
          '2º Bimestre': {
            contexto: 'Já sabemos o que queremos. Mas agora, como transformar esses desejos em algo que realmente acontece? Planejar é imaginar os passos e preparar o caminho. E cada pessoa tem um jeito próprio de se organizar. Qual será o seu?',
            questoes: 'Como posso me organizar para realizar de fato meus objetivos?',
            habilidade: 'P.7.2 Utilizar uma estrátegia de planejamento para organizar a realização dos seus objetivos.',
            atitude: 'Organização e perseverança',
            pratica: 'Decidir',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Roteiro de planejamento semanal/mensal com metas pessoais',
              'Agenda personalizada de metas',
              'Mapa de ação (passo a passo da meta)',
              'Painel de produtividade (Kanban pessoal)',
              'Diário de planejamento com reflexões semanais'
            ]
          }
        }
      },
      '8º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Nem tudo sai como o planejado. Às vezes, a internet cai, um compromisso atrasa ou simplesmente o cansaço aparece. Como você reage nesses momentos? O que você faz quando algo frustrante acontece e atrapalha seus planos?',
            questoes: 'Como eu lido com imprevistos e frustrações?',
            habilidade: 'P.8.1 Avaliar como costuma lidar com imprevistos e frustrações.',
            atitude: 'Flexibilidade',
            pratica: 'Reconhecer',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Roda de experiências frustrantes',
              'Mapa da frustração e da resposta',
              'Diário do inesperado',
              'Simulações de imprevistos',
              'Criação de um “kit de enfrentamento”'
            ]
          },
          '2º Bimestre': {
            contexto: 'Quando algo não dá certo, cada pessoa reage de um jeito. Uns se irritam, outros se isolam, outros procuram logo um novo caminho. Observar como diferentes pessoas lidam com frustrações pode nos ensinar estratégias úteis para os nossos próprios desafios.',
            questoes: 'Como as pessoas lidam, de modo geral, com imprevistos e frustrações?',
            habilidade: 'P.8.2 Conhecer formas de lidar com imprevistos e frustrações.',
            atitude: 'Abertura',
            pratica: 'Escutar',
            bigFive: 'Neuroticismo / Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Entrevistas com familiares e educadores',
              'Painel de histórias reais',
              'Role-playing com diferentes estilos de enfrentamento',
              'Comparação de estratégias',
              'Círculo de trocas de estratégias úteis'
            ]
          }
        }
      },
      '9º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Muita coisa pode mudar no Ensino Médio: amigos, professores, a rotina, os interesses… Pensar sobre essa nova etapa pode nos ajudar a nos preparar melhor. Como você imagina que vai se sentir? O que espera viver? E o que pode ser diferente?',
            questoes: 'Como será minha vida no Ensino Médio?',
            habilidade: 'P.9.1 Criar um cenário sobre como imagina sua vida, seus pensamentos e sentimentos em uma próxima etapa da vida, planejando estratégias de resiliência para enfrentar desafios e contratempos.',
            atitude: 'Visão de futuro',
            pratica: 'Revelar-se',
            bigFive: 'Abertura à experiência',
            curriculoPaulista: '',
            estrategias: [
              'Carta para o futuro',
              'Cenário ilustrado',
              'Roda de projeções',
              'Diálogo com ex-alunos ou estudantes do 1º ano',
              'Diário de transição'
            ]
          },
          '2º Bimestre': {
            contexto: 'Ninguém caminha sozinho. Amigos, familiares, professores e até colegas podem ser apoio importante para nossas escolhas e momentos difíceis. Mas será que sabemos quem realmente está por perto para ajudar? Como podemos fortalecer esses laços?',
            questoes: 'Quem me apoia?',
            habilidade: 'P.9.2 Avaliar sua rede de apoio atual e o que fazer para fortalecê-la.',
            atitude: 'Gratidão',
            pratica: 'Acolher',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Mapa da rede de apoio',
              'Roda de escuta sobre apoio mútuo',
              'Cartas de agradecimento',
              'Diagrama de confiança',
              'Plano de fortalecimento de vínculos'
            ]
          }
        }
      }
    }
  },
  {
    dimension: 'Engajamento',
    comprehensions: {
      '6º Ano': 'Manter a motivação necessária para realizar e concluir tarefas com autonomia e empenho pessoal.',
      '7º Ano': 'Estar atento e comprometido com as necessidades e demandas da escola, da comunidade e das pessoas com quem convive.',
      '8º Ano': 'Compreender seu papel na sociedade e as formas pelas quais pode contribuir para sua melhoria.',
      '9º Ano': 'Comprometer-se com ações éticas e conscientes no presente, que contribuam para a construção de futuros melhores para si e para os outros.'
    },
    grades: {
      '6º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Às vezes acordamos animados para realizar nossas tarefas; in outras, parece que nada faz sentido. Identificar o que influencia nossa motivação é um passo importante para aprender a lidar com os altos e baixos e manter o foco mesmo nos dias difíceis.',
            questoes: 'Como me sinto quando estou motivado? E desmotivado?',
            habilidade: 'E.6.1 Diferenciar estados de ânimo motivadores e desmotivadores.',
            atitude: 'Consciência emocional',
            pratica: 'Observar-se',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Diário de ânimo',
              'Linha do tempo da motivação',
              'Mapa de estímulos motivadores/desmotivadores',
              'Roda de escuta empática',
              'Acordo de estratégias pessoais'
            ]
          },
          '2º Bimestre': {
            contexto: 'A motivação pode nos ajudar a fazer tarefas com mais dedicação e alegria. Já a desmotivação pode atrapalhar nossos planos e nos deixar frustrados. Saber como isso impacta nossa rotina ajuda a entender melhor nossas atitudes e buscar equilíbrio.',
            questoes: 'Quais os efeitos da motivação e da desmotivação na minha vida?',
            habilidade: 'E.6.2 Reconhecer os efeitos da motivação e da desmotivação na vida pessoal.',
            atitude: 'Responsabilidade emocional',
            pratica: 'Refletir',
            bigFive: 'Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Estudo de caso pessoal',
              'Roda de impacto',
              'Autoentrevista',
              'Quadro comparativo',
              'Plano de ação pessoal'
            ]
          }
        }
      },
      '7º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Vivemos em comunidade. Na escola, em casa e em outros espaços, existem necessidades que nem sempre são ditas. Perceber essas demandas é o primeiro passo para colaborar e se engajar em soluções que fazem a diferença.',
            questoes: 'O que as pessoas à minha volta necessitam?',
            habilidade: 'E.7.1 Perceber e analisar as necessidades e demandas de sua escola, família e comunidade, propondo formas coletivas de atendê-las.',
            atitude: 'Empatia',
            pratica: 'Escutar',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Mapa das necessidades',
              'Entrevistas com escuta ativa',
              'Roda “O que vejo e não vejo?”',
              'Caixa de sugestões anônimas',
              'Caminhada sensível'
            ]
          },
          '2º Bimestre': {
            contexto: 'Ajudar não significa resolver tudo sozinho, mas estar disponível, se importar e agir quando possível. Quando cada um contribui, o ambiente onde vivemos se torna melhor para todos.',
            questoes: 'Como posso ajudar as pessoas da minha escola e família?',
            habilidade: 'E.7.2 Oferecer ajuda para suprir necessidades e demandas de sua escola e família.',
            atitude: 'Colaboração',
            pratica: 'Cuidar',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Desafio do bem',
              'Projeto “Eu me importo”',
              'Painel de iniciativas possíveis',
              'Diário de contribuição',
              'Roda de partilhas: quem cuidou de quem?'
            ]
          }
        }
      },
      '8º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'A sociedade em que vivemos é feita por pessoas e instituições. Em meio aos seus avanços e problemas, podemos aprender a enxergar o que merece ser valorizado e o que precisa ser transformado. Essa consciência é o primeiro passo para o engajamento social.',
            questoes: 'O que há de bom e de ruim na sociedade?',
            habilidade: 'E.8.1 Criticar e elogiar características da sociedade, incluindo percepções familiares e comunitárias.',
            atitude: 'Senso crítico',
            pratica: 'Argumentar',
            bigFive: 'Abertura à experiência',
            curriculoPaulista: '',
            estrategias: [
              'Análise de reportagens e dados sociais',
              'Painel “O que funciona e o que não funciona?”',
              'Debates críticos',
              'Crônica ou carta argumentativa',
              'Galeria de vozes sociais'
            ]
          },
          '2º Bimestre': {
            contexto: 'Vivemos em uma sociedade marcada por desigualdades. Algumas pessoas enfrentam barreiras maiores do que outras por causa de onde nasceram, de sua cor, classe, gênero ou outras características. Reconhecer isso é o primeiro passo para construir relações mais justas.',
            questoes: 'Quais são meus privilégios e minhas desvantagens na sociedade?',
            habilidade: 'E.8.2 Reconhecer seus privilégios e suas desvantagens na sociedade.',
            atitude: 'Consciência social',
            pratica: 'Refletir',
            bigFive: 'Amabilidade / Neuroticismo',
            curriculoPaulista: '',
            estrategias: [
              'Linha da vida social',
              'Mapa de privilégios e desafios',
              'Histórias cruzadas',
              'Roda “Não é sobre mim, é sobre o mundo”',
              'Círculo de empatia'
            ]
          }
        }
      },
      '9º Ano': {
        bimestres: {
          '1º Bimestre': {
            contexto: 'Melhorar a própria vida é um movimento que exige autoconhecimento, escolhas conscientes e ação contínua. Quando os jovens se colocam em movimento, eles expandem sua agência e sua capacidade de transformar também o entorno.',
            questoes: 'Como posso melhorar a minha vida?',
            habilidade: 'E.9.1 Realizar melhorias na vida pessoal.',
            atitude: 'Autonomia',
            pratica: 'Decidir',
            bigFive: 'Conscienciosidade',
            curriculoPaulista: '',
            estrategias: [
              'Plano de melhoria pessoal',
              'Roda de apoio entre pares',
              'Desafio “21 dias de mudança”',
              'Diário de metas e avanços',
              'Autoavaliação crítica'
            ]
          },
          '2º Bimestre': {
            contexto: 'A família é um espaço importante de cuidado, aprendizado e convivência. Quando os jovens se engajam para melhorar sua vida familiar — seja com gestos, atitudes ou iniciativas — contribuem para fortalecer vínculos e criar ambientes mais saudáveis.',
            questoes: 'Como posso melhorar a vida da minha família?',
            habilidade: 'E.9.2 Realizar melhorias na vida familiar.',
            atitude: 'Corresponsabilidade',
            pratica: 'Cuidar',
            bigFive: 'Amabilidade',
            curriculoPaulista: '',
            estrategias: [
              'Roda “o que posso fazer em casa”',
              'Projeto “pequenos gestos, grandes mudanças”',
              'Cartas para casa',
              'Mapa de afeto familiar',
              'Plano de apoio mútuo'
            ]
          }
        }
      }
    }
  }
];
