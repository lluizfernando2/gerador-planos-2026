// Curriculo da Parte Diversificada do Estado de São Paulo (Inova Educação)
// Contém os dados gerados dinamicamente para Projeto de Vida, Tecnologia e Inovação, Orientação de Estudo, Educação Financeira e Redação e Leitura
import { MATRIZ_SOCIOEMOCIONAL } from './socioemocionalDatabase';

export interface ProjetoVidaItem {
  id: string;
  ano: string;
  bimestre: string;
  aula: number;
  tema: string;
  dimensao: string;
  compreensao: string;
  contexto: string;
  questoes: string;
  atitude: string;
  pratica: string;
  habilidade: string;
}

export interface TecnologiaInovacaoItem {
  id: string;
  ano: string;
  bimestre: string;
  semana: string;
  unidade: string;
  aulaUnidade: string;
  aulaSala: string;
  titulo: string;
  formato: string;
  objetivo: string;
  conteudos: string;
  entrega: string;
  habComputacaoCodigo: string;
  habComputacaoTexto: string;
  habBnccCodigo: string;
  habBnccTexto: string;
}

export interface OrientacaoEstudoItem {
  id: string;
  ano: string;
  bimestre: string;
  semana: string;
  tituloGps: string;
  aula: number;
  praticaLinguagem: string;
  proposta: string;
  genero: string;
  eixo: string;
  sugestoes: string[];
  praticasPedagogicas: string;
  plataforma: string;
  objetivos: string;
  objetosConhecimento: string;
  habilidadeCodigo: string;
  habilidadeTexto: string;
  disciplina?: string;
}

export interface EducacaoFinanceiraItem {
  id: string;
  ano: string;
  bimestre: string;
  aula: number;
  unidadeTematica: string;
  objetoConhecimento: string;
  titulo: string;
  conteudo: string;
  objetivos: string;
  habilidadeCodigo: string;
  habilidadeTexto: string;
}

export interface RedacaoLeituraItem {
  id: string;
  ano: string;
  bimestre: string;
  aula: string; // e.g., "Aula 1 (Semana Dupla 1)"
  titulo: string;
  conteudo: string;
  objetivos: string;
  habilidade: string;
  aprendizagem: string;
}

// Helper to determine grades
const GRADES_EF = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'];
const GRADES_EM = ['1ª Série', '2ª Série', '3ª Série'];
const ALL_GRADES = [...GRADES_EF, ...GRADES_EM];
const BIMESTRES = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];

// =============================================================
// 1. GENERATE PROJETO DE VIDA
// =============================================================
function generateProjetoVida(): ProjetoVidaItem[] {
  const data: ProjetoVidaItem[] = [];
  
  for (const grade of ALL_GRADES) {
    for (const bimester of BIMESTRES) {
      if (GRADES_EM.includes(grade)) {
        // High School specific lessons
        let numLessons = 0;
        if (bimester === '1º Bimestre' || bimester === '2º Bimestre') {
          numLessons = 7;
        } else {
          numLessons = 6;
        }

        for (let i = 1; i <= numLessons; i++) {
          let tema = '';
          let dimensao = '';
          let compreensao = 'Compreensão do Projeto de Vida e desenvolvimento pessoal.';
          let contexto = 'Cotidiano escolar e planejamento de futuro.';
          let questoes = 'Como planejar meu futuro e me conhecer melhor?';
          let atitude = 'Autonomia e responsabilidade.';
          let pratica = 'Reflexão individual e socialização.';
          let habilidade = 'Determinação e autoconhecimento.';

          if (grade === '1ª Série') {
            if (bimester === '1º Bimestre') {
              dimensao = 'Autoconhecimento e Convivência';
              const themes = [
                'Construindo conexões no Ensino Médio',
                'Um novo capítulo, um novo projeto de vida',
                'O que quero ser agora que cresci?',
                'Caminhos e Marcos: Construindo a Sua Linha do Tempo',
                'Conectando histórias: Compartilhando a Linha do Tempo',
                'Quem sou eu e o que me move?',
                'IKIGAI: Reflexões Finais e Troca de Aprendizados'
              ];
              const contents = [
                'A importância de conhecer os outros e as experiências que eles trazem. Introdução ao componente Projeto de Vida no Ensino Médio.',
                'Retomada do Projeto de Vida e reflexão sobre as diferenças entre o Ensino Fundamental e o Ensino Médio.',
                'Análise das mudanças de aspirações e sonhos ao longo do tempo e reconstrução de nossa identidade.',
                'Conceito de linha do tempo como ferramenta de reflexão e influências na trajetória de vida.',
                'Compartilhamento e socialização da linha do tempo elaborada, fortalecendo a rede de apoio.',
                'Reflexão sobre os valores, paixões e experiências que moldam escolhas. Introdução ao Diagrama IKIGAI.',
                'Finalização da elaboração do diagrama IKIGAI, reflexão coletiva sobre as descobertas feitas e autoavaliação.'
              ];
              const objectives = [
                'Promover a integração entre os alunos e o desenvolvimento de uma rede de apoio e inspiração mútua. Apresentar o componente.',
                'Retomar a trajetória no componente de Projeto de Vida e refletir sobre a transição para o Ensino Médio.',
                'Expressar sentimentos e percepções sobre mudanças de sonhos e identidade por meio de produções reflexivas.',
                'Ajudar os estudantes a refletir sobre suas trajetórias e iniciar a produção de uma linha do tempo pessoal.',
                'Fortalecer a conexão entre os alunos e finalizar a socialização das produções.',
                'Refletir sobre experiências, valores e paixões pessoais. Introduzir o diagrama IKIGAI.',
                'Finalizar a elaboração do diagrama IKIGAI e promover um momento de socialização e autoavaliação anual.'
              ];
              const skills = [
                'Entusiasmo e Curiosidade para aprender.',
                'Curiosidade para aprender.',
                'Imaginação criativa e interesse artístico.',
                'Autoconfiança.',
                'Empatia e respeito.',
                'Imaginação criativa e reflexão estruturada.',
                'Autoconfiança e tolerância à frustração.'
              ];
              tema = themes[i - 1] || 'Cultura e Identidade';
              pratica = contents[i - 1] || 'Atividades de autoconhecimento.';
              compreensao = objectives[i - 1] || 'Compreender a própria identidade.';
              habilidade = skills[i - 1] || 'Empatia.';
            } else if (bimester === '2º Bimestre') {
              dimensao = 'Tomada de Decisão';
              const themes = [
                'Meu Raio-X pessoal',
                'A Arte de Tomar Decisões Responsáveis',
                'Entendo os Itinerários formativos de Matemática e Ciências da Natureza',
                'Entendo os Itinerários formativos de Linguagens, Ciências Humanas e Sociais',
                'Entendendo os Itinerários técnicos',
                'Decisões Assertivas: Ferramentas para Escolher Seu Itinerário - Aula complementar',
                'Reflexões Finais: Caminhos Escolhidos'
              ];
              const contents = [
                'Reconhecimento de habilidades, talentos e potencial de crescimento com base no autoconhecimento.',
                'Estratégias para tomada de decisões conscientes e responsáveis e análise de cenários cotidianos.',
                'Apresentação do itinerário de Matemática e Ciências da Natureza e conexão de carreiras.',
                'Apresentação do itinerário de Linguagens, Ciências Humanas e Sociais e conexão de carreiras.',
                'Apresentação dos itinerários técnicos, escopo do mercado e possibilidades de carreiras.',
                'Ferramentas de tomada de decisões estruturada no contexto das escolhas de itinerários formativos.',
                'Análise de como habilidades, interesses e rede de apoio familiar influenciam decisões de carreira.'
              ];
              const objectives = [
                'Reconhecer habilidades, talentos e potencialidades, valorizando suas características pessoais.',
                'Desenvolver habilidades de tomada de decision com foco em escolhas conscientes e consequências.',
                'Apresentar as diretrizes do itinerário de Matemática e Ciências da Natureza para escolha consciente.',
                'Apresentar as diretrizes do itinerário de Linguagens, Ciências Humanas e Sociais para escolha consciente.',
                'Apresentar o escopo e as vantagens profissionais dos itinerários técnicos profissionais.',
                'Desenvolver habilidades de análise crítica e tomada de decisão utilizando matrizes estruturadas.',
                'Desenvolver a capacidade de argumentar sobre as escolhas feitas, estimulando a autoconfiança.'
              ];
              const skills = [
                'Autoconfiança.',
                'Foco e responsabilidade.',
                'Determinação e foco.',
                'Determinação e foco.',
                'Determinação e foco.',
                'Organização e responsabilidade.',
                'Assertividade e entusiasmo.'
              ];
              tema = themes[i - 1] || 'Escolha e Cidadania';
              pratica = contents[i - 1] || 'Práticas de escolha acadêmica.';
              compreensao = objectives[i - 1] || 'Fazer escolhas responsáveis.';
              habilidade = skills[i - 1] || 'Responsabilidade.';
            } else if (bimester === '3º Bimestre') {
              dimensao = 'Engajamento e Convivência';
              const themes = [
                'Estresse e ansiedade: como identificar e enfrentar com confiança',
                'Gerenciando Emoções para uma Convivência Respeitosa',
                'Manifesto da Convivência: Juntos, Construindo uma Escola Melhor',
                'O combate ao bullying começa comigo',
                'Criando um ambiente escolar saudável',
                'Assinando o Manifesto da Boa Convivência'
              ];
              const contents = [
                'Causas de estresse de adolescentes e estratégias de enfrentamento: relaxamento e respiração.',
                'Gerenciamento emocional, empatia e impactos práticos nos relacionamentos escolares.',
                'Direitos e deveres dos alunos e início da escrita de um manifesto de boa convivência na sala.',
                'Definição e impactos do bullying e cyberbullying e continuidade do manifesto de convivência.',
                'Protagonismo estudantil e acolhimento escolar saudável.',
                'Finalização, apresentação pública e assinatura coletiva do manifesto de boas práticas de convivência.'
              ];
              const objectives = [
                'Ajudar os estudantes a reconhecer os sinais de estresse e estresse diário, oferecendo recursos de controle.',
                'Refletir sobre como a inteligência emocional ajuda nas relações interpessoais e pacificação.',
                'Refletir sobre direitos e deveres para construção de um ambiente de convivência respeitosa.',
                'Conscientizar os alunos sobre o impacto do bullying na saúde mental e combatê-lo ativamente.',
                'Engajar os alunos na criação de uma comunidade de apoio e acolhimento mútuo escolar.',
                'Apresentar e assinar o manifesto de convivência, selando compromissos éticos.'
              ];
              const skills = [
                'Tolerância ao estresse e tolerância às frustrações.',
                'Organização e tolerância ao estresse.',
                'Empatia e respeito.',
                'Empatia e respeito.',
                'Empatia e respeito.',
                'Empatia e respeito e cooperação.'
              ];
              tema = themes[i - 1] || 'Relações Saudáveis';
              pratica = contents[i - 1] || 'Práticas socioemocionais.';
              compreensao = objectives[i - 1] || 'Garantir convivência respeitosa.';
              habilidade = skills[i - 1] || 'Empatia.';
            } else {
              dimensao = 'Planejamento de Futuro';
              const themes = [
                'Resgatando minhas origens',
                'Entendendo o Passado para Construir o Futuro',
                'Meu Lugar no Mundo',
                'Visualizando o meu Futuro Ideal',
                'Como Contribuir para o meu Futuro Ideal?',
                'O Que Aprendi com o Projeto de Vida?'
              ];
              const contents = [
                'Identidade cultural, influências da família e da comunidade na construção de quem somos.',
                'Impacto de experiências passadas nas decisões e início formal da escrita do documento de Projeto de Vida.',
                'Conceito de propósito, papel individual no mundo e impacto positivo de nossas escolhas na sociedade.',
                'A importância da visualização como técnica para traçar metas de curto, médio e longo prazo.',
                'Relação de causa e efeito entre decisões tomadas no presente e o alcance do futuro idealizado.',
                'Avaliação do progresso individual, consolidação do projeto de vida e partilha coletiva.'
              ];
              const objectives = [
                'Refletir sobre origens familiares e culturais, valorizando-as para fortalecer o autoconceito.',
                'Compreender como o passado molda o presente e orientar a estruturação do documento do Projeto de Vida.',
                'Identificar o próprio propósito de vida e o engajamento com causas comunitárias e cidadãs.',
                'Desenvolver competências de design e visualização de metas e planejamento prático de carreira.',
                'Fomentar a responsabilidade pessoal nas ações presentes para concretização de aspirações.',
                'Consolidar os aprendizados, avaliar competências e comemorar os projetos estruturados.'
              ];
              const skills = [
                'Respeito e Autoconfiança.',
                'Persistência e Respeito.',
                'Responsabilidade e Assertividade.',
                'Determinação e foco.',
                'Determinação e foco.',
                'Curiosidade para aprender e Entusiasmo.'
              ];
              tema = themes[i - 1] || 'Futuro e Propósito';
              pratica = contents[i - 1] || 'Práticas de planejamento de carreira.';
              compreensao = objectives[i - 1] || 'Consolidar o plano de futuro.';
              habilidade = skills[i - 1] || 'Foco.';
            }
          } else if (grade === '2ª Série') {
            if (bimester === '1º Bimestre') {
              dimensao = 'Autoconhecimento e Cidadania';
              const themes = [
                'Quem sou eu nas relações sociais e comunitárias',
                'Meus valores e o impacto na convivência social',
                'Cidadania ativa: protagonismo estudantil e social',
                'Resolução de conflitos de forma colaborativa',
                'O papel das redes de apoio na vida pessoal e acadêmica',
                'Diagrama Ikigai avançado: alinhando paixões e sociedade',
                'Apresentação e partilha do Ikigai social'
              ];
              tema = themes[i - 1] || 'Cidadania Social';
              pratica = 'Discussão dirigida e escrita reflexiva baseada em dinâmicas sociais.';
              compreensao = 'Desenvolver a noção de cidadania ativa e responsabilidade social.';
              habilidade = 'Empatia, respeito e cidadania.';
            } else if (bimester === '2º Bimestre') {
              dimensao = 'Planejamento e Carreira';
              const themes = [
                'Mundo do trabalho: tendências e novas profissões',
                'Minhas competências e habilidades profissionais em foco',
                'Elaboração do primeiro currículo profissional (Curriculum Vitae)',
                'Simulação de processos seletivos e entrevistas de emprego',
                'Empreendedorismo de negócios de impacto social',
                'Elaboração do esqueleto de um plano de negócios pessoal',
                'Apresentação e debate do plano de negócios social'
              ];
              tema = themes[i - 1] || 'Carreira e Negócios';
              pratica = 'Elaboração de currículos, simulação de processos de entrevista e roteiros de plano de negócio.';
              compreensao = 'Estruturar o planejamento de ingresso profissional e mercado de trabalho.';
              habilidade = 'Organização, responsabilidade e foco.';
            } else if (bimester === '3º Bimestre') {
              dimensao = 'Gestão de Emoções';
              const themes = [
                'Lidar com pressões sociais e expectativas familiares',
                'Técnicas de gerenciamento de estresse e ansiedade pré-vestibular',
                'Organização e hábitos de estudos eficientes no Ensino Médio',
                'Métodos Pomodoro e Kanban para controle de metas',
                'Lidando com fracassos e frustrações com resiliência',
                'Planejando o fechamento do ano acadêmico'
              ];
              tema = themes[i - 1] || 'Autogestão de Emoções';
              pratica = 'Identificação de estressores de rotina e introdução de métodos estruturados de organização pessoal.';
              compreensao = 'Equilibrar saúde mental e cobranças acadêmicas com estratégias de resiliência.';
              habilidade = 'Tolerância ao estresse, autogestão e persistência.';
            } else {
              dimensao = 'Memórias e Plano de Ação';
              const themes = [
                'Resgatando minhas raízes e sua influência nas minhas aspirações',
                'Escrevendo minhas memórias e aprendizados escolares',
                'Planejamento estratégico de metas para o próximo ano',
                'Visualizando meu propósito de vida e lugar no mundo',
                'Como transformar sonhos em planos de ação de curto e médio prazo',
                'Autoavaliação do ano: o que aprendi e como cresci'
              ];
              tema = themes[i - 1] || 'Plano de Ação e Memórias';
              pratica = 'Escrita de portfólios autorais, reflexão de metas de longo prazo e autoavaliação anual.';
              compreensao = 'Alinhar raízes pessoais com o projeto futuro em passos planejados de ação.';
              habilidade = 'Determinação, perseverança e assertividade.';
            }
          } else {
            if (bimester === '1º Bimestre') {
              dimensao = 'Autoconhecimento Profundo';
              const themes = [
                'O início do fim da jornada escolar: sentimentos e expectativas',
                'Identidade pessoal e consolidação de valores éticos',
                'Autogestão e inteligência emocional em momentos de transição',
                'Autoliderança: como ser protagonista da própria história',
                'O papel do autoconhecimento na tomada de decisões futuras',
                'Construindo minha âncora de carreira e interesses centrais',
                'Partilha e consolidação do mapa de competências pessoais'
              ];
              tema = themes[i - 1] || 'Autoconhecimento Profundo';
              pratica = 'Dinâmicas de autoliderança, mapeamento de competências individuais e autoanálise de valores.';
              compreensao = 'Fomentar a autonomia, autogestão e clareza identitária na transição pós-escolar.';
              habilidade = 'Autoconfiança, assertividade e responsabilidade.';
            } else if (bimester === '2º Bimestre') {
              dimensao = 'Transição e Oportunidades';
              const themes = [
                'Explorando caminhos pós-Ensino Médio: opções de carreira',
                'Entendendo o ENEM e os vestibulares públicos e privados',
                'FIES, PROUNI e as formas de financiamento e bolsas de estudo',
                'Cursos técnicos e tecnológicos como inserção rápida no trabalho',
                'O perfil profissional desejado pelo mercado contemporâneo',
                'Planejamento financeiro básico para a vida universitária ou profissional',
                'Apresentação do plano de transição pós-Ensino Médio'
              ];
              tema = themes[i - 1] || 'Transição Pós-Escola';
              pratica = 'Pesquisa de cursos de nível superior, bolsas, vestibulares e elaboração de planos financeiros de subsistência.';
              compreensao = 'Oferecer diretrizes técnicas completas sobre vestibulares, ENEM, ProUni e mercado de trabalho.';
              habilidade = 'Organização, foco e determinação.';
            } else if (bimester === '3º Bimestre') {
              dimensao = 'Resiliência e Cuidado';
              const themes = [
                'Saúde mental em foco: lidando com a ansiedade pré-vestibular',
                'Rede de apoio: como pedir ajuda e dar apoio aos colegas',
                'Autocuidado: equilíbrio entre estudos, lazer e descanso',
                'Estratégias metacognitivas para melhorar o desempenho em avaliações',
                'Lidando com a frustração em caso de resultados negativos',
                'Assinatura do pacto de apoio mútuo da turma para o final de ano'
              ];
              tema = themes[i - 1] || 'Resiliência e Equilíbrio';
              pratica = 'Técnicas metacognitivas, compartilhamento de experiências e pacto de empatia e apoio na sala.';
              compreensao = 'Desenvolver estratégias práticas de enfrentamento à ansiedade de fim de ciclo de Ensino Médio.';
              habilidade = 'Tolerância ao estresse, tolerância à frustração e empatia.';
            } else {
              dimensao = 'Despedida e Planos Futuros';
              const themes = [
                'Retrospectiva da trajetória escolar: o que levo na mala',
                'Escrevendo a carta para o meu eu do futuro (cápsula do tempo)',
                'Meu plano de ação estruturado para os próximos 5 anos',
                'Visualizando minha contribuição social para um mundo melhor',
                'Celebrando o encerramento do Ensino Médio com gratidão',
                'Autoavaliação final do componente Projeto de Vida e formatura'
              ];
              tema = themes[i - 1] || 'Cápsula do Tempo e Despedida';
              pratica = 'Confecção da cápsula do tempo, elaboração de plano de ação quinquenal e autoavaliação de jornada.';
              compreensao = 'Consolidar de forma prática as memórias escolares e os planos e objetivos de longo prazo.';
              habilidade = 'Gratidão, entusiasmo, autoconfiança e determinação.';
            }
          }

          data.push({
            id: `pv-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
            ano: grade,
            bimestre: bimester,
            aula: i,
            tema: tema,
            dimensao: dimensao,
            compreensao: compreensao,
            contexto: contexto,
            questoes: questoes,
            atitude: atitude,
            pratica: pratica,
            habilidade: habilidade
          });
        }
        continue;
      }

      // 1º and 2º bimester: 7 lessons. 3º and 4º bimester: 6 lessons.
      const isFirstHalf = bimester === '1º Bimestre' || bimester === '2º Bimestre';
      const maxLessons = isFirstHalf ? 7 : 6;
      
      // Select dimensions based on bimester to cover everything
      let primaryDimension = 'Autoconhecimento';
      let secondaryDimension = 'Convivência';
      let bimesterKeyInMatrix = '1º Bimestre';
      
      if (bimester === '2º Bimestre') {
        primaryDimension = 'Tomada de decisão';
        secondaryDimension = 'Planejamento';
        bimesterKeyInMatrix = '2º Bimestre';
      } else if (bimester === '3º Bimestre') {
        primaryDimension = 'Engajamento';
        secondaryDimension = 'Convivência';
        bimesterKeyInMatrix = '1º Bimestre';
      } else if (bimester === '4º Bimestre') {
        primaryDimension = 'Planejamento';
        secondaryDimension = 'Autoconhecimento';
        bimesterKeyInMatrix = '2º Bimestre';
      }

      // Fallback grade name in database (6º to 9º Ano)
      const matrixGrade = GRADES_EF.includes(grade) ? grade : '9º Ano';
      
      const pDim = MATRIZ_SOCIOEMOCIONAL.find(d => d.dimension === primaryDimension);
      const sDim = MATRIZ_SOCIOEMOCIONAL.find(d => d.dimension === secondaryDimension);
      
      const pData = pDim?.grades[matrixGrade]?.bimestres[bimesterKeyInMatrix] || pDim?.grades['6º Ano']?.bimestres['1º Bimestre'];
      const sData = sDim?.grades[matrixGrade]?.bimestres[bimesterKeyInMatrix] || sDim?.grades['6º Ano']?.bimestres['1º Bimestre'];
      
      for (let i = 1; i <= maxLessons; i++) {
        // Alternating lessons between primary and secondary dimension
        const usePrimary = i % 2 !== 0;
        const currentDimName = usePrimary ? primaryDimension : secondaryDimension;
        const currentData = usePrimary ? pData : sData;
        const currentComp = (usePrimary ? pDim : sDim)?.comprehensions[matrixGrade] || '';
        
        if (!currentData) continue;
        
        let tema = '';
        if (currentDimName === 'Autoconhecimento') {
          const themes = [
            'Quem sou eu: Identidade e Autoconexão',
            'Meus Interesses, Gostos e Hobbies',
            'História de Vida e Memórias Familiares',
            'Autoestima e Reconhecimento de Potenciais',
            'Superando Vulnerabilidades com Coragem',
            'Cuidado Pessoal e Bem-estar Emocional',
            'Autoavaliação e Síntese de Aprendizado'
          ];
          tema = themes[i - 1] || 'Minha Trajetória de Vida';
        } else if (currentDimName === 'Convivência') {
          const themes = [
            'Empatia e Relações de Confiança',
            'Abertura para o Encontro e Novas Amizades',
            'Comunicação Assertiva e Não Violenta',
            'Colaboração e Atividades em Grupo',
            'Respeitando a Opinião do Outro',
            'Resolução de Conflitos na Escola',
            'Bem-estar Coletivo e Convivência Harmônica'
          ];
          tema = themes[i - 1] || 'Espaço de Convivência Escolar';
        } else if (currentDimName === 'Tomada de decisão') {
          const themes = [
            'Dilemas Éticos e Escolhas Diárias',
            'Causas e Efeitos das Nossas Decisões',
            'Valores Éticos versus Pressão do Grupo',
            'Decidindo com Autonomia e Consciência',
            'Pedindo Apoio de Pessoas de Confiança',
            'Refletindo sobre Escolhas Futuras',
            'Decisão Responsável em Sala de Aula'
          ];
          tema = themes[i - 1] || 'Caminhos de Escolha Ética';
        } else if (currentDimName === 'Planejamento') {
          const themes = [
            'Sonhos e Projetos para o Futuro',
            'Definindo Metas de Curto e Médio Prazo',
            'Organização da Rotina e Hábitos de Estudo',
            'Ferramentas de Planejamento (Kanban/Agenda)',
            'Lidando com Frustrações e Imprevistos',
            'Minha Rede de Apoio e Recursos Disponíveis',
            'Planejando o Próximo Semestre/Ano'
          ];
          tema = themes[i - 1] || 'Organizando Minha Trajetória';
        } else {
          const themes = [
            'Motivação, Propósito e Engajamento',
            'Identificando Necessidades da Comunidade',
            'Iniciativas de Apoio Mútuo e Cidadania',
            'Liderança Jovem e Protagonismo Escolar',
            'Minhas Ações no Presente para o Futuro',
            'Engajando-se em Projetos Sociais',
            'Compartilhando Conquistas e Resultados'
          ];
          tema = themes[i - 1] || 'Engajamento e Ação Protagonista';
        }

        data.push({
          id: `pv-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
          ano: grade,
          bimestre: bimester,
          aula: i,
          tema: tema,
          dimensao: currentDimName,
          compreensao: currentComp,
          contexto: currentData.contexto,
          questoes: currentData.questoes,
          atitude: currentData.atitude,
          pratica: currentData.pratica,
          habilidade: currentData.habilidade
        });
      }
    }
  }
  
  return data;
}

// =============================================================
function generateTecnologiaInovacao(): TecnologiaInovacaoItem[] {
  const data: TecnologiaInovacaoItem[] = [];
  const targetGrades = ['6º Ano', '7º Ano', '8º Ano'];
  
  for (const grade of targetGrades) {
    for (const bimester of BIMESTRES) {
      let startWeek = 1;
      let endWeek = 11;
      
      if (bimester === '2º Bimestre') {
        startWeek = 12;
        endWeek = 21;
      } else if (bimester === '3º Bimestre') {
        startWeek = 26;
        endWeek = 34;
      } else if (bimester === '4º Bimestre') {
        startWeek = 35;
        endWeek = 45;
      }
      
      const numWeeks = endWeek - startWeek + 1;
      
      for (let weekIdx = startWeek; weekIdx <= endWeek; weekIdx++) {
        const i = weekIdx - startWeek + 1;
        const semanaStr = `Semana ${i}`;
        
        let unidade = '';
        let titulo = '';
        let objetivo = '';
        let conteudos = '';
        let habCodigo = '';
        let habTexto = '';
        
        // Grade-specific logic
        if (grade === '6º Ano') {
          if (bimester === '1º Bimestre') {
            unidade = 'Introdução à computação: iniciando meus estudos';
            const titles = [
              'Primeiros passos na tecnologia',
              'Entrada e saída no computador',
              'Explorando o mouse',
              'Criando com Teclado',
              'Explorando a cultura digital',
              'O poder das respostas',
              'Tirando dúvidas corretamente',
              'Desvendando a Obsolescência Programada',
              'Prática com computadores e sistemas',
              'Sessão de feedback do bimestre',
              'Avaliação prática da unidade'
            ];
            titulo = titles[i - 1] || 'Introdução à Computação e Tecnologias';
            objetivo = 'Identificar os três eixos principais de estudo da Tecnologia e Inovação e entender os componentes físicos do computador.';
            conteudos = 'Eixos estruturantes (Cultura Digital, Pensamento Computacional, TDIC) e periféricos de entrada e saída.';
            habCodigo = 'EF03CO06';
            habTexto = 'Identificar e descrever as funções de componentes básicos de computadores e sistemas digitais.';
          } else if (bimester === '2º Bimestre') {
            unidade = 'Pensamento Computacional e Programação Básica';
            const titles = [
              'O que é um Algoritmo? Passos para Resolver Problemas',
              'Lógica de Programação: Estruturas de Decisão (Se... Então)',
              'Estruturas de Repetição (Loops) e Fluxogramas',
              'Trabalhando com Variáveis e Entrada de Dados',
              'Programação desplugada',
              'Desenho com lógica',
              'Criação de mini-algoritmos',
              'Depurando erros de lógica',
              'Desafio prático de algoritmos',
              'Apresentação de fluxogramas'
            ];
            titulo = titles[i - 1] || 'Algoritmos e Lógica';
            objetivo = 'Compreender os fundamentos dos algoritmos e lógica de programação através de atividades práticas e desplugadas.';
            conteudos = 'Algoritmos, estruturas condicionais e de repetição, depuração de falhas e representação por fluxogramas.';
            habCodigo = 'EF69TEC05';
            habTexto = 'Desenvolver e testar algoritmos simples em ambientes de programação ou através de atividades desplugadas.';
          } else if (bimester === '3º Bimestre') {
            unidade = 'Robótica e Tecnologias Assistivas';
            const titles = [
              'O que é Robótica e Automação',
              'Circuitos Elétricos de Forma Simples',
              'Sensores no Cotidiano',
              'Tecnologias Assistivas e Acessibilidade',
              'Projetando Soluções Inclusivas',
              'Inclusão Social por meio da Tecnologia',
              'Robótica Desplugada na Prática',
              'Modelagem de Maquetes Escolares',
              'Avaliação de Soluções Sustentáveis'
            ];
            titulo = titles[i - 1] || 'Iniciação à Robótica';
            objetivo = 'Explorar conceitos básicos de eletrônica, sensores e automação, desenhando soluções inclusivas focadas em problemas reais.';
            conteudos = 'Robótica criativa, materiais recicláveis, circuitos simples e tecnologias de inclusão.';
            habCodigo = 'EF69TEC08';
            habTexto = 'Criar protótipos de sistemas automatizados e discutir o impacto social das novas tecnologias de automação.';
          } else {
            unidade = 'Mídias Digitais e Projetos de Inovação';
            const titles = [
              'Planejamento de uma Mídia Escolar',
              'Criação de Podcast e Storyboard',
              'Captação de Áudio e Vídeo na Escola',
              'Edição Básica de Som e Imagem',
              'Narrativas Digitais e Storytelling',
              'Design Visual e Criação de Cartazes',
              'Desenvolvimento de Interfaces',
              'Apresentando Projetos (Pitching)',
              'Exposição Tecnológica da Turma',
              'Portfólio Digital de Aprendizagens',
              'Fechamento do Ano de Tecnologia'
            ];
            titulo = titles[i - 1] || 'Mídias e Comunicação Digital';
            objetivo = 'Fomentar a autoria e criatividade digital através da concepção, produção e divulgação de conteúdos midiáticos e protótipos.';
            conteudos = 'Produção audiovisual, storytelling, edição, fanzines digitais e portfólio digital.';
            habCodigo = 'EF69TEC12';
            habTexto = 'Utilizar de forma criativa e autoral diferentes linguagens e mídias digitais para comunicar ideias e realizar projetos colaborativos.';
          }
        } else if (grade === '7º Ano') {
          if (bimester === '1º Bimestre') {
            unidade = 'Introdução à computação: conhecendo o teclado e o mouse';
            const titles = [
              'Mãos no teclado',
              'Atalhos em ação',
              'Mouse e seus botões',
              'Mais funções do mouse',
              'Pacote de dados',
              'Regras de transmissão de dados',
              'A internet: endereços e dados',
              'Organizando arquivos digitais',
              'Rastros na Internet',
              'Ameaças digitais',
              'Desinformação online'
            ];
            titulo = titles[i - 1] || 'Teclado, Mouse e Redes';
            objetivo = 'Recordar o padrão QWERTY, aprofundar na organização de arquivos e redes e iniciar práticas de segurança cibernética.';
            conteudos = 'Uso do teclado e mouse, gerenciamento de arquivos em pastas, regras de redes de computadores e internet.';
            habCodigo = 'EF69TEC01';
            habTexto = 'Identificar e analisar riscos e benefícios do uso de tecnologias digitais de informação e comunicação.';
          } else if (bimester === '2º Bimestre') {
            unidade = 'Segurança Cibernética e Algoritmos';
            const titles = [
              'Planejando nosso roteiro',
              'Produção criativa',
              'Finalização do produto',
              'Hora de compartilhar',
              'Debugar o código',
              'Lógica condicional',
              'Laços de repetição',
              'Classificando números com lógica',
              'Bugs de memória',
              'Teste de mesa'
            ];
            titulo = titles[i - 1] || 'Criptografia e Condicionais';
            objetivo = 'Planejar projetos de segurança cibernética e compreender os conceitos de laços de repetição e lógica condicional avançada.';
            conteudos = 'Segurança online, algoritmos de verificação, detecção de bugs, lógica condicional e estruturas de repetição.';
            habCodigo = 'EF69TEC05';
            habTexto = 'Compreender o papel dos algoritmos de criptografia e segurança lógica básica de dados.';
          } else if (bimester === '3º Bimestre') {
            unidade = 'Robótica e Prototipagem com Arduino';
            const titles = [
              'O que é Arduino?',
              'Simulando circuitos no Tinkercad',
              'Programando o pisca-led',
              'Sensores de presença na prática',
              'Sistemas de automação simples',
              'Eletrônica básica e resistores',
              'Atuadores e motores',
              'Robótica de baixo custo',
              'Mostra de circuitos inteligentes'
            ];
            titulo = titles[i - 1] || 'Arduino e Tinkercad';
            objetivo = 'Compreender os componentes de placas Arduino e programar circuitos simulados usando Tinkercad.';
            conteudos = 'Circuitos de prototipagem, código C++ básico para Arduino, sensores digitais e atuadores.';
            habCodigo = 'EF69TEC08';
            habTexto = 'Modelar e prototipar pequenos sistemas automatizados e interativos de interesse coletivo.';
          } else {
            unidade = 'Mídias Sociais e Inteligência Artificial';
            const titles = [
              'O impacto da inteligência artificial',
              'Análise crítica de fake news nas mídias',
              'Criação de infográficos digitais',
              'Apresentação e pitching',
              'Design centrado no usuário',
              'Pesquisas eficientes no Google',
              'Curadoria de mídias confiáveis',
              'Segurança em redes sociais',
              'Criação de blogs escolares',
              'Revisão e fechamento do ano',
              'Avaliação final'
            ];
            titulo = titles[i - 1] || 'Ética e IA';
            objetivo = 'Analisar de forma ética o impacto de algoritmos de recomendação e mídias sociais no cotidiano.';
            conteudos = 'Algoritmos das redes sociais, inteligência artificial generativa, notícias falsas e cidadania digital.';
            habCodigo = 'EF69TEC12';
            habTexto = 'Analisar criticamente o uso e o impacto social das redes digitais e de inteligência artificial na rotina.';
          }
        } else if (grade === '8º Ano') {
          if (bimester === '1º Bimestre') {
            unidade = 'Introdução à computação: explorando recursos de edição de texto';
            const titles = [
              'Conhecendo o explorador de arquivos',
              'Iniciando o roteiro dos sonhos',
              'Adicionando imagens e símbolos',
              'Estilizando o texto',
              'Comparando locais com tabelas',
              'Revisão ortográfica',
              'Criando um menu de navegação',
              'Apresentando o projeto',
              'Pega pega',
              'Correr ou deslizar?',
              'Quem é mais rápido?'
            ];
            titulo = titles[i - 1] || 'Edição de Textos e Introdução a Jogos';
            objetivo = 'Dominar ferramentas avançadas de editores de texto e compreender as mecânicas básicas do desenvolvimento de jogos de blocos.';
            conteudos = 'Edição de textos, tabelas, estilização de parágrafos, lógica de colisão e variáveis de velocidade.';
            habCodigo = 'EF06CO08';
            habTexto = 'Utilizar editores de texto e planilhas eletrônicas para organizar informações e apresentar resultados.';
          } else if (bimester === '2º Bimestre') {
            unidade = 'Lógica de programação: jogos, arte e criatividade';
            const titles = [
              'Desenho com caneta',
              'Caneta simétrica',
              'Mais canetas',
              'Levanta a caneta',
              'Contagem regressiva',
              'Comunicação dos atores',
              'Iteração x Recursão',
              'Recursão no dia a dia',
              'Arte de girar/generativa',
              'Desenhos recursivos'
            ];
            titulo = titles[i - 1] || 'Extensão de Caneta e Recursão';
            objetivo = 'Explorar o uso da extensão de desenho por blocos e compreender as diferenças entre loops iterativos e funções recursivas.';
            conteudos = 'Extensão de caneta de programação por blocos, recursão em arte generativa e comunicação de eventos.';
            habCodigo = 'EF69TEC05';
            habTexto = 'Resolver problemas complexos aplicando os conceitos de recursividade e iteração lógica.';
          } else if (bimester === '3º Bimestre') {
            unidade = 'Internet das Coisas (IoT) e Automação';
            const titles = [
              'O que é Internet das Coisas (IoT)?',
              'Sensores inteligentes em casa',
              'Programando termostatos e relés',
              'Criação de maquetes automatizadas',
              'Conectando objetos à rede',
              'Smart Cities e sustentabilidade',
              'Casas inteligentes: vantagens',
              'Ameaças em redes de IoT',
              'Exposição de projetos inovadores de IoT'
            ];
            titulo = titles[i - 1] || 'IoT e Smart Homes';
            objetivo = 'Entender o funcionamento de sensores inteligentes e conexões de rede em projetos de Internet das Coisas e Cidades Inteligentes.';
            conteudos = 'Redes sem fio, sensores ambientais, automação doméstica inteligente e segurança de dados.';
            habCodigo = 'EF69TEC08';
            habTexto = 'Reconhecer e debater as aplicações de sensores e conectividade na Internet das Coisas (IoT).';
          } else {
            unidade = 'Cultura Maker e Fabricação Digital';
            const titles = [
              'Princípios do design 3D',
              'Modelagem de objetos simples',
              'Prototipagem rápida na comunidade',
              'Feira maker de soluções locais',
              'Impressão 3D e fabricação digital',
              'Do It Yourself (DIY): filosofia',
              'Corte a laser e marcenaria criativa',
              'Cultura Maker e sustentabilidade',
              'Design thinking para resolução de problemas',
              'Portfólio anual maker',
              'Fechamento de Tecnologia'
            ];
            titulo = titles[i - 1] || 'Design 3D e Prototipagem';
            objetivo = 'Aplicar metodologias ativas como o Design Thinking e a Cultura Maker para criar soluções físicas ou digitais focadas na comunidade.';
            conteudos = 'Modelagem 3D, metodologias ativas, fabricação digital e soluções sustentáveis com materiais reutilizáveis.';
            habCodigo = 'EF69TEC12';
            habTexto = 'Utilizar a cultura maker e recursos digitais para criar soluções colaborativas a desafios reais.';
          }
        } else if (grade === '9º Ano') {
          if (bimester === '1º Bimestre') {
            unidade = 'Redes sociais: conteúdo que se conecta com algoritmos';
            const titles = [
              'Introdução às Redes Sociais',
              'Algoritmo das redes sociais',
              'Primeira postagem no canva',
              'Animando textos',
              'Elementos visuais no canva',
              'Efeitos e camadas',
              'Efeitos sonoros',
              'Compartilhando o post',
              'Desvendando fake news',
              'Criando postagens confiáveis',
              'Verificação de fatos online'
            ];
            titulo = titles[i - 1] || 'Mídias e Algoritmos com Canva';
            objetivo = 'Analisar o cenário do uso da internet e redes sociais no Brasil, criando designs e posts éticos e acessíveis utilizando o Canva.';
            conteudos = 'Algoritmos das redes sociais, design gráfico básico, comunicação visual ética e verificação de notícias.';
            habCodigo = 'EF09CO09';
            habTexto = 'Analisar de forma crítica e ética o papel das redes sociais e os algoritmos de recomendação na circulação de dados.';
          } else if (bimester === '2º Bimestre') {
            unidade = 'Educação Midiática e Inteligência Artificial';
            const titles = [
              'A bolha das redes sociais',
              'Privacidade e proteção de dados',
              'Criando campanhas de conscientização',
              'O que é Inteligência Artificial?',
              'Redes neurais e aprendizado de máquina',
              'Ética e vieses nos algoritmos de IA',
              'IA na criação de conteúdos',
              'Os limites éticos do deepfake',
              'Trabalho prático sobre IA',
              'Debate sobre o futuro do trabalho'
            ];
            titulo = titles[i - 1] || 'Privacidade de Dados e Redes Neurais';
            objetivo = 'Discutir os riscos das bolhas informativas, a importância da LGPD e os princípios fundamentais da Inteligência Artificial e ética dos algoritmos.';
            conteudos = 'Proteção de dados pessoais (LGPD), redes neurais artificiais, aprendizado de máquina e vieses algorítmicos.';
            habCodigo = 'EF09CO10';
            habTexto = 'Discutir a importância da segurança de dados pessoais e debater os desafios éticos da IA.';
          } else if (bimester === '3º Bimestre') {
            unidade = 'Programação de Jogos Digitais';
            const titles = [
              'Conceitos de Game Design e Roteiro',
              'Criação de cenários e colisão de atores',
              'Controlando pontuações e estados',
              'Publicando o jogo escolar',
              'Mecânicas de jogos 2D',
              'Programando gravidade nos jogos',
              'Efeitos de áudio em games',
              'Fase final e balanceamento do jogo',
              'Teste de usabilidade de jogos'
            ];
            titulo = titles[i - 1] || 'Lógica de Game Design 2D';
            objetivo = 'Desenvolver pequenos jogos bidimensionais estruturando roteiros, cenários, colisões de atores e sistemas de pontuação.';
            conteudos = 'Game design, lógica de desenvolvimento de jogos digitais, colisão e variáveis de pontuação.';
            habCodigo = 'EF69TEC08';
            habTexto = 'Desenvolver soluções computacionais e jogos digitais simples exercitando a criatividade e lógica.';
          } else {
            unidade = 'Cidadania Global e Startups Sociais';
            const titles = [
              'Modelagem de negócios de impacto social',
              'Prototipagem de aplicativos com Figma',
              'Pitch final e marketing sustentável',
              'Exposição de inovações da escola',
              'O que é uma Startup Social?',
              'Design de interfaces responsivas',
              'Ferramentas no-code e de baixo código',
              'Planejando o lançamento do app',
              'Avaliação de impacto comunitário',
              'Criação do portfólio digital',
              'Encerramento do ano letivo'
            ];
            titulo = titles[i - 1] || 'Aplicativos No-Code e Pitching';
            objetivo = 'Desenvolver protótipos de aplicativos móveis utilizando ferramentas no-code, buscando resolver problemas reais da comunidade.';
            conteudos = 'Startups de impacto, prototipagem ágil, Figma, ferramentas no-code e marketing ético sustentável.';
            habCodigo = 'EF69TEC12';
            habTexto = 'Conceber, planejar e prototipar aplicações digitais de interesse público ou empreendedorismo social.';
          }
        } else {
          // High School (1ª Série, 2ª Série, 3ª Série)
          if (bimester === '1º Bimestre') {
            unidade = 'Tecnologia, Cidadania e Sociedade Digital';
            const titles = [
              'A cultura hacker e a história da computação',
              'Identidade digital e a pegada cibernética',
              'Cidadania nas redes e netiqueta profissional',
              'A economia dos dados e as Big Techs',
              'Democracia e desinformação na era dos algoritmos',
              'Inclusão digital e superação do fosso tecnológico',
              'Propriedade intelectual e a cultura de copyleft',
              'Oficina de escrita colaborativa em Wiki',
              'Planejamento de campanha de netiqueta',
              'Apresentação dos folhetos de cidadania',
              'Avaliação de encerramento da unidade'
            ];
            titulo = titles[i - 1] || 'Cultura Digital e Ética';
            objetivo = 'Refletir de forma profunda e crítica sobre a relação entre tecnologia, sociedade, direitos humanos e cidadania.';
            conteudos = 'Cultura hacker, privacidade de dados, pegada digital, netiqueta e propriedade intelectual.';
            habCodigo = 'EM13TEC01';
            habTexto = 'Analisar e debater o impacto das tecnologias digitais na sociedade contemporânea e propor condutas éticas.';
          } else if (bimester === '2º Bimestre') {
            unidade = 'Resolução de Problemas Complexos e Programação Avançada';
            const titles = [
              'O que são problemas complexos?',
              'Decomposição e design thinking em sistemas',
              'Estruturas de dados básicas: listas e dicionários',
              'Lógica condicional aplicada em Python',
              'Laços de repetição e loops controlados',
              'Modularização de códigos com funções',
              'Interface com o usuário e usabilidade (UI/UX)',
              'Tratamento de exceções e depuração',
              'Projeto prático: criando uma calculadora complexa',
              'Apresentação e análise de código entre colegas'
            ];
            titulo = titles[i - 1] || 'Estruturas de Dados e Python';
            objetivo = 'Modelar a resolução de problemas utilizando fluxogramas estruturados e lógica algorítmica em linguagens textuais de alto nível.';
            conteudos = 'Design thinking, estruturas de dados básicas, lógica condicional/repetição, modularização e depuração.';
            habCodigo = 'EM13TEC05';
            habTexto = 'Desenvolver e validar algoritmos para resolver problemas complexos com o auxílio de linguagens de programação.';
          } else if (bimester === '3º Bimestre') {
            unidade = 'Desenvolvimento Web e Interfaces de Informação';
            const titles = [
              'Como funciona a internet: protocolo HTTP e DNS',
              'Introdução ao esqueleto de páginas: HTML5',
              'Estilização e posicionamento visual: CSS3',
              'Grid e Flexbox no design de telas responsivas',
              'Interfaces acessíveis: melhores práticas',
              'Sistemas de controle de versão: Git e GitHub',
              'Publicando o primeiro site escolar na web',
              'Oficina de portfólios pessoais online',
              'Avaliação crítica de design de páginas famosas'
            ];
            titulo = titles[i - 1] || 'HTML, CSS e Git';
            objetivo = 'Compreender a estrutura de redes de computadores e projetar interfaces digitais utilizando padrões modernos de desenvolvimento web.';
            conteudos = 'Arquitetura web, marcação estruturada HTML5, folhas de estilo CSS3, responsividade e Git.';
            habCodigo = 'EM13TEC08';
            habTexto = 'Projetar e produzir interfaces digitais e páginas web responsivas respeitando critérios de acessibilidade e design.';
          } else {
            unidade = 'Mídias Sociais, Audiovisual e Comunicação na Rede';
            const titles = [
              'O ecossistema de mídias de massa e digitais',
              'Roteirização profissional para vídeo e podcast',
              'Técnicas de captação de imagem e captação de áudio',
              'Edição não-linear de vídeo e pós-produção',
              'O papel das miniaturas (thumbnails) e chamadas',
              'Análise crítica das métricas de engajamento',
              'Produção de um minidocumentário temático',
              'Finalização e renderização do projeto audiovisual',
              'Feira de mídias e cinema estudantil',
              'Autoavaliação e portfólio final do ano',
              'Encerramento do ano de Tecnologia'
            ];
            titulo = titles[i - 1] || 'Edição de Vídeo e Storytelling';
            objetivo = 'Produzir e editar conteúdos audiovisuais estruturados a partir de roteiros, discutindo o impacto social das métricas de redes.';
            conteudos = 'Roteirização, captação audiovisual, softwares de edição, métricas de redes e cidadania midiática.';
            habCodigo = 'EM13TEC12';
            habTexto = 'Construir conteúdos midiáticos e audiovisuais de forma autoral para intervir de maneira crítica em debates públicos.';
          }
        }
        
        data.push({
          id: `tec-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${weekIdx}`,
          ano: grade,
          bimestre: bimester,
          semana: semanaStr,
          unidade: unidade || 'Cultura Digital e Cidadania',
          aulaUnidade: `${i} de ${numWeeks}`,
          aulaSala: `${weekIdx}`,
          titulo: titulo,
          formato: i % 2 === 0 ? 'Desplugada' : 'Pluga ou Híbrida',
          objetivo: objetivo,
          conteudos: conteudos,
          entrega: i === numWeeks ? 'Apresentação Final do Portfólio' : 'Atividade prática registrada no caderno/computador',
          habComputacaoCodigo: habCodigo || 'EF69TEC01',
          habComputacaoTexto: habTexto || 'Identificar e analisar riscos e benefícios do uso de tecnologias digitais de informação.',
          habBnccCodigo: 'CG05',
          habBnccTexto: 'Compreender, utilizar e criar tecnologias digitais de informação e comunicação de forma crítica, significativa, reflexiva e ética.'
        });
      }
    }
  }
  
  return data;
}

// =============================================================
// 3. GENERATE ORIENTAÇÃO DE ESTUDO - MATEMÁTICA
// =============================================================
function generateOrientacaoEstudoMatematica(): OrientacaoEstudoItem[] {
  const data: OrientacaoEstudoItem[] = [];
  const targetGrades = ['9º Ano'];
  
  const missionConfigs: Record<number, {
    titulo: string;
    proposta: string;
    objetivos: string;
    sugestoes: string[];
    objetosConhecimento: string;
    habilidadeCodigo: string;
    habilidadeTexto: string;
  }> = {
    1: {
      titulo: 'Superando Desafios e Explorando Relações Numéricas na Reta',
      proposta: 'Identificar a localização de números racionais positivos e negativos na reta numérica e convertê-los de sua representação fracionária para decimal finita, superando barreiras e bloqueios de aprendizagem inicial.',
      objetivos: 'Compreender e aplicar as operações básicas com números naturais e racionais representados sob forma de dízimas finitas, associando-as à sua representação na reta real.',
      sugestoes: ['Khan Academy: Racionais na Reta Numérica', 'Livro: O Homem que Calculava (Malba Tahan)', 'Atividades Saeb - Números Reais'],
      objetosConhecimento: 'Representação decimal finita de racionais, ordenação e comparação na reta numérica, e resolução de operações de números reais.',
      habilidadeCodigo: 'Saeb: 9N1.1, 9N1.2, 9N1.9, 9N2.1 | BNCC: EF06MA01, EF06MA08, EF09MA04',
      habilidadeTexto: 'Comparar, ordenar, ler e escrever números reais e racionais na reta numérica. Reconhecer relações de equivalência entre representações fracionárias e decimais finitas e resolver problemas associados.'
    },
    2: {
      titulo: 'Frações Equivalentes, Representação Real e Notação Científica',
      proposta: 'Identificar frações equivalentes que representam a mesma quantidade real e expressar números de grande ou pequena escala em notação científica, operando com diferentes potências de base 10.',
      objetivos: 'Comparar e ordenar frações associando-as a partes de inteiros e divisões, além de instrumentalizar o uso prático de notação científica na resolução de problemas.',
      sugestoes: ['Khan Academy: Frações Equivalentes', 'Simulado Saeb Matemática 9º Ano', 'Apostila Aprender Sempre Vol. 1'],
      objetosConhecimento: 'Frações equivalentes, ordenação real na reta numérica, dízimas e representação científica de potências.',
      habilidadeCodigo: 'Saeb: 9N1.8, 9N2.1 | BNCC: EF06MA07, EF09MA04',
      habilidadeTexto: 'Compreender, comparar e ordenar frações associadas a partes de inteiros/divisão. Resolver problemas reais envolvendo notação científica e operações básicas.'
    },
    3: {
      titulo: 'Educação Financeira: Porcentagens Sucessivas e Planejamento',
      proposta: 'Resolver e formular situações-problema baseadas na vida cotidiana que envolvam acréscimos e descontos sucessivos, calculando taxas percentuais acumuladas e discutindo a tomada de decisão inteligente com o dinheiro.',
      objetivos: 'Aplicar taxas de variação percentual em cenários de economia doméstica e educação financeira, utilizando técnicas lógicas e planilhas eletrônicas.',
      sugestoes: ['Khan Academy: Porcentagens no Dia a Dia', 'Planilhas de Simulação de Finanças', 'Plataforma Foco Aprendizado'],
      objetosConhecimento: 'Cálculo de juros simples, descontos e acréscimos sucessivos, e educação financeira aplicada.',
      habilidadeCodigo: 'Saeb: 9N2.3 | BNCC: EF09MA05',
      habilidadeTexto: 'Resolver e elaborar problemas que envolvam porcentagens, taxas de juros, e aplicação de percentuais sucessivos preferencialmente com o uso de tecnologias digitais.'
    },
    4: {
      titulo: 'Estimativas Numéricas e Arredondamento com Potências de 10',
      proposta: 'Fazer estimativas lógicas de grandezas reais do dia a dia e realizar arredondamentos e aproximações numéricas rápidas para múltiplos da potência de 10 mais próxima.',
      objetivos: 'Adquirir fluência em estimativas aproximadas e cálculos mentais de ordem de grandeza, facilitando a resolução de exatas no cotidiano e em avaliações de larga escala.',
      sugestoes: ['Simulado Digital de Estimativas Matemáticas', 'Khan Academy: Arredondamentos', 'Desafio de Cálculo Mental de Ordens de Grandeza'],
      objetosConhecimento: 'Estimativas de quantidades, potências de 10, arredondamentos e aproximações em problemas.',
      habilidadeCodigo: 'Saeb: 9N1.4 | BNCC: EF06MA12',
      habilidadeTexto: 'Fazer estimativas de quantidades e aproximar números reais para múltiplos da potência de 10 mais próxima de forma rápida e contextualizada.'
    },
    5: {
      titulo: 'Localização, Croquis e Deslocamento no Plano',
      proposta: 'Descrever, projetar e analisar trajetos de pessoas e objetos no plano cartesiano a partir de croquis, mapas, plantas baixas e instruções de coordenadas cartesianas.',
      objetivos: 'Desenvolver o raciocínio espacial e geométrico do estudante, relacionando pontos coordenados a deslocamentos reais e representações de trajetórias.',
      sugestoes: ['GeoGebra: Coordenadas e Plano Cartesiano', 'Planta Baixa da Escola e Caça ao Tesouro', 'Atividade Prática com Mapas do Bairro'],
      objetosConhecimento: 'Localização e movimentação no plano, mapas coordenados e noções geométricas de translação.',
      habilidadeCodigo: 'Saeb: 9G2.1 | BNCC: Alinhada ao Saeb (Espaço e Forma)',
      habilidadeTexto: 'Identificar a localização/movimentação de objetos em mapas e outras representações gráficas, descrevendo e esboçando trajetos com base em coordenadas cartesianas.'
    },
    6: {
      titulo: 'Polígonos, Triângulos, Quadriláteros e Distâncias no Plano',
      proposta: 'Determinar o ponto médio de um segmento de reta e calcular a distância entre pontos no plano cartesiano, além de identificar e classificar as propriedades de triângulos e quadriláteros e analisar variação de perímetro/área.',
      objetivos: 'Dominar a geometria de coordenadas sem o uso direto de fórmulas prontas, relacionando-a às propriedades geométricas das figuras planas tradicionais e variação de área/perímetro.',
      sugestoes: ['GeoGebra Interativo: Distância no Plano Cartesiano', 'Khan Academy: Classificação de Triângulos', 'Simulado Saeb Geometria'],
      objetosConhecimento: 'Classificação de polígonos, ponto médio, distância no plano cartesiano, e variação de área e perímetro.',
      habilidadeCodigo: 'Saeb: 9G1.6, 9G2.8, 9M2.2 | BNCC: EF06MA19, EF06MA20, EF09MA16, EF06MA29',
      habilidadeTexto: 'Identificar características de triângulos e quadriláteros e classificá-los. Determinar o ponto médio e distância entre dois pontos no plano cartesiano. Analisar variação de perímetro/área de quadrados.'
    },
    7: {
      titulo: 'Leitura Crítica de Gráficos e Identificação de Vieses da Mídia',
      proposta: 'Analisar gráficos divulgados por canais de notícias na mídia e identificar elements que podem induzir a erros de leitura (escalas distorcidas, omissão de fontes, etc.), interpretando-os de forma ética.',
      objetivos: 'Capacitar os estudantes a interpretarem criticamente dados estatísticos expostos em veículos de imprensa sobre contextos ambientais, trânsito ou sustentabilidade.',
      sugestoes: ['Artigos de Jornais com Gráficos Enganosos', 'Plataforma Foco Aprendizado: Estatística', 'Livro: Como Mentir com Estatística'],
      objetosConhecimento: 'Elementos constitutivos dos gráficos, análise crítica de publicações da mídia, e sustentabilidade e trânsito.',
      habilidadeCodigo: 'Saeb: 9E1.2, 9E2.1, 9E2.2 | BNCC: EF09MA22, EF06MA32, EF09MA21',
      habilidadeTexto: 'Escolher o gráfico adequado. Interpretar criticamente dados de pesquisas de sustentabilidade veiculados em mídias. Analisar escalas inapropriadas e elementos indutores de erro de leitura.'
    },
    8: {
      titulo: 'Estatística Prática: Média, Mediana, Moda e Amostras',
      proposta: 'Planejar e executar uma pesquisa estatística rápida com os colegas utilizando planilhas eletrônicas, calculando as medidas de tendência central (média, mediana e moda) e determinando a amplitude dos dados coletados.',
      objetivos: 'Consolidar a capacidade de projetar pesquisas amostrais ou censitárias da realidade social, tabulando as informações coletadas e construindo gráficos representativos.',
      sugestoes: ['Planilhas Google Escolares', 'Desafio Estatístico da Turma', 'Khan Academy: Média, Mediana e Moda'],
      objetosConhecimento: 'Pesquisas censitárias e amostrais, medidas de tendência central, representação em planilhas digitais e amplitude de dispersão.',
      habilidadeCodigo: 'Saeb: 9E1.1, 9E1.2, 9E1.3, 9E1.5, 9E2.1, 9E2.2, 9E2.3 | BNCC: EF06MA31, EF09MA22, EF07MA36, EF08MA25, EF06MA32, EF09MA21, EF06MA33',
      habilidadeTexto: 'Identificar elementos de gráficos. Construir gráficos estatísticos. Planejar pesquisas e interpretar os dados com relatório. Obter e analisar média, moda, mediana e amplitude de dispersão.'
    },
    9: {
      titulo: 'Razões entre Grandezas e Proporcionalidade Direta/Inversa',
      proposta: 'Analisar a relação entre grandezas de espécies diferentes (como velocidade, densidade demográfica, consumo de combustível) e distinguir proporcionalidade direta de inversa em tabelas práticas de mercado.',
      objetivos: 'Classificar as grandezas envolvidas em um problema socioambiental ou cotidiano e aplicar conceitos de proporcionalidade para encontrar incógnitas e valores desconhecidos.',
      sugestoes: ['Simulador Digital de Proporcionalidade', 'Khan Academy: Razões e Proporções', 'Caderno de Matemática Aprender Sempre'],
      objetosConhecimento: 'Razão entre grandezas de espécies diferentes, proporcionalidade direta e inversa, escalas e taxas de variação.',
      habilidadeCodigo: 'Saeb: 9A2.1 | BNCC: EF09MA07, EF09MA08',
      habilidadeTexto: 'Resolver problemas envolvendo razão entre grandezas de espécies diferentes. Resolver e elaborar problemas envolvendo relações de proporcionalidade direta e inversa entre grandezas.'
    },
    10: {
      titulo: 'Divisão Proporcional, Escalas e Variações Socioambientais',
      proposta: 'Solucionar desafios de divisão em partes direta ou inversamente proporcionais e calcular dimensões geográficas reais baseadas em escalas cartográficas e taxas de variação.',
      objetivos: 'Consolidar a lógica de proporcionalidade aplicada a mapas, plantas de engenharia civil, problemas financeiros de sociedade e distribuição proporcional justa.',
      sugestoes: ['Atividade Prática: Escalas em Mapas do Brasil', 'Khan Academy: Divisão Proporcional', 'Simulados Saeb Resolvidos'],
      objetosConhecimento: 'Relações de proporcionalidade direta e inversa, escalas cartográficas, divisão em partes proporcionais e taxas de variação complexas.',
      habilidadeCodigo: 'Saeb: 9A2.1 | BNCC: EF09MA07, EF09MA08',
      habilidadeTexto: 'Resolver e elaborar problemas de proporcionalidade direta/inversa em diversos contextos, abrangendo escalas geográficas, divisões proporcionais e variação de taxas.'
    },
    11: {
      titulo: 'Equações, Expressões Algébricas e Sistemas de 1º Grau',
      proposta: 'Traduzir problemas cotidianos escritos em linguagem natural para equações polinomiais de 1º grau (ax+b=c) e sistemas de equações com duas incógnitas, calculando o valor numérico de expressões algébricas.',
      objetivos: 'Desenvolver o raciocínio algébrico abstrato do estudante, instrumentalizando a resolução e verificação de igualdades de forma lógica e sistemática.',
      sugestoes: ['Khan Academy: Sistemas de Equações de 1º Grau', 'GeoGebra: Interseção de Retas de Sistemas', 'Caderno Aprender Sempre Vol. 3'],
      objetosConhecimento: 'Equações de 1º grau, expressões algébricas com variáveis, sistemas de duas equações de primeiro grau.',
      habilidadeCodigo: 'Saeb: 9A1.1, 9A1.2, 9A2.2, 9A2.3 | BNCC: EF07MA18, EF08MA07, EF08MA08, EF08MA06',
      habilidadeTexto: 'Resolver e elaborar problemas de equações de 1º grau e de sistemas lineares. Calcular valores numéricos de expressões algébricas utilizando propriedades.'
    },
    12: {
      titulo: 'Introdução ao Conceito de Função e Representação Gráfica',
      proposta: 'Analisar tabelas numéricas e gráficos de situações reais (como corrida de aplicativos, contas de água) para compreender funções de 1º e 2º grau como dependência de variáveis.',
      objetivos: 'Visualizar e compreender a relação unívoca de dependência entre duas variáveis, aprendendo a esboçar retas e parábolas no plano cartesiano associadas às suas expressões.',
      sugestoes: ['GeoGebra: Gráficos de Funções do 1º e 2º Grau', 'Simulador PhET: Funções e Variáveis', 'Apostila São Paulo Faz Escola de Álgebra'],
      objetosConhecimento: 'Conceito de funções, dependência unívoca de variáveis, função afim e função quadrática, representações tabulares e gráficas.',
      habilidadeCodigo: 'Saeb: 9A1.1, 9A1.2, 9A1.5, 9A1.8, 9A2.5 | BNCC: EF07MA18, EF08MA07, EF08MA08, EF09MA06',
      habilidadeTexto: 'Compreender funções como relações de dependência unívoca entre variáveis e suas representações (tabular, algébrica, gráfica) de funções afins e quadráticas.'
    },
    13: {
      titulo: 'Grandezas Macro e Micro: Distâncias e Armazenamento Digital',
      proposta: 'Empregar e comparar unidades de medida muito grandes e muito pequenas, operando com prefixos do armazenamento digital (KB, MB, GB, TB) e ordens de magnitude na astronomia e microbiologia.',
      objetivos: 'Ampliar a percepção do aluno sobre escalas numéricas de tamanhos reais extremamente díspares, facilitando a resolução de problemas científicos de tecnologia e física.',
      sugestoes: ['Simulador Interativo: Escalas do Universo', 'Desafio de Medidas Tecnológicas de Armazenamento', 'Khan Academy: Unidades de Medidas Científicas'],
      objetosConhecimento: 'Unidades de medidas muito grandes ou muito pequenas, potências aplicadas a grandezas físicas e tecnologia.',
      habilidadeCodigo: 'Saeb: 9M2.1 | BNCC: EF09MA18',
      habilidadeTexto: 'Reconhecer e empregar unidades usadas para expressar medidas muito grandes ou muito pequenas em contextos tecnológicos, científicos e cotidianos.'
    },
    14: {
      titulo: 'Proporcionalidade Geométrica: Variação de Perímetro e Área',
      proposta: 'Ampliar e reduzir as dimensões dos lados de um quadrado ou retângulo e deduzir empiricamente o comportamento proporcional de seu perímetro e o crescimento quadrático de sua área.',
      objetivos: 'Compreender que ao dobrar o lado de um polígono regular, seu perímetro dobra mas sua área quadruplica, evitando erros conceituais recorrentes na geometria clássica.',
      sugestoes: ['Atividade Prática com Malha Quadriculada', 'GeoGebra: Ampliação de Figuras Planas', 'Apostila Aprender Sempre - Geometria Espacial'],
      objetosConhecimento: 'Variação de perímetro e área por ampliação ou redução de lados, proporcionalidade geométrica.',
      habilidadeCodigo: 'Saeb: 9M2.2 | BNCC: EF06MA29',
      habilidadeTexto: 'Analisar e descrever mudanças que ocorrem no perímetro e na área de um quadrado ao se ampliarem ou reduzirem, igualmente, as medidas de seus lados.'
    },
    15: {
      titulo: 'Cálculo de Áreas de Polígonos Planos e Círculos',
      proposta: 'Resolver e formular situações-problema baseadas em situações reais de engenharia ou agricultura que envolvam o cálculo de áreas de terrenos formados por quadriláteros, triângulos e círculos.',
      objetivos: 'Aplicar as expressões matemáticas clássicas de cálculo de áreas de superfícies bidimensionais e desenvolver táticas de decomposição de figuras complexas.',
      sugestoes: ['Desafio: Planta Baixa de uma Residência', 'GeoGebra: Áreas de Figuras Planas', 'Khan Academy: Áreas de Quadriláteros e Círculos'],
      objetosConhecimento: 'Fórmulas de área de triângulos, quadriláteros e círculos, problemas práticos de dimensionamento geométrico.',
      habilidadeCodigo: 'Saeb: 9M2.2, 9M2.3 | BNCC: EF06MA29, EF08MA19',
      habilidadeTexto: 'Resolver e elaborar problemas que envolvam medidas de área de figuras geométricas, utilizando expressões de cálculo de área (quadriláteros, triângulos e círculos).'
    },
    16: {
      titulo: 'Volumes de Prismas e Cilindros no Cotidiano',
      proposta: 'Calcular a capacidade volumétrica e o volume de embalagens cilíndricas, caixas d\'água prismáticas e outros depósitos industriais aplicando fórmulas geométricas de volume.',
      objetivos: 'Dominar as expressões para calcular o volume de prismas e cilindros retos em cenários cotidianos e empresariais, relacionando-o a medidas de litros (capacidade).',
      sugestoes: ['Khan Academy: Volume de Cilindros e Prismas', 'Cálculo da Caixa d\'Água da Minha Casa', 'Simulado Final de Geometria Espacial'],
      objetosConhecimento: 'Volume de prismas retos e cilindros regulares, relação entre volume e capacidade volumétrica (litros).',
      habilidadeCodigo: 'Saeb: 9M2.4 | BNCC: EF09MA19',
      habilidadeTexto: 'Resolver e elaborar problemas que envolvam medidas de volumes de prismas e de cilindros retos, inclusive com uso de expressões de cálculo, em situações cotidianas.'
    }
  };

  for (const grade of targetGrades) {
    BIMESTRES.forEach((bimester, bimesterIdx) => {
      for (let i = 1; i <= 4; i++) {
        const missaoNum = (bimesterIdx * 4) + i;
        const config = missionConfigs[missaoNum];
        
        let genero = 'Resolução de Problemas Matemáticos';
        let plataforma = 'Tarefa SP / Caderno de OE';
        let praticasPedagogicas = 'Metodologias ativas de resolução de problemas, estudo cooperativo, análise metacognitiva de erros e modelagem.';

        data.push({
          id: `oe-mat-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
          ano: grade,
          bimestre: bimester,
          semana: `Semana ${i}`,
          tituloGps: `Missão ${missaoNum}: ${config.titulo}`,
          aula: i,
          praticaLinguagem: 'Autogestão, Metacognição e Raciocínio Lógico-Matemático',
          proposta: config.proposta,
          genero: genero,
          eixo: 'Resolução de Problemas, Análise de Erros e Modelagem em Exatas',
          sugestoes: config.sugestoes,
          praticasPedagogicas: praticasPedagogicas,
          plataforma: plataforma,
          objetivos: config.objetivos,
          objetosConhecimento: config.objetosConhecimento,
          habilidadeCodigo: config.habilidadeCodigo,
          habilidadeTexto: config.habilidadeTexto,
          disciplina: 'Orientação de Estudos - Matemática'
        });
      }
    });
  }
  
  return data;
}

function generateOrientacaoEstudoPortugues(): OrientacaoEstudoItem[] {
  // Conteúdo desta disciplina será enviado posteriormente pelo usuário.
  return [];
}

function disabled_generateOrientacaoEstudoPortugues(): OrientacaoEstudoItem[] {
  const data: OrientacaoEstudoItem[] = [];
  
  for (const grade of ALL_GRADES) {
    const isEM = ['1ª Série', '2ª Série', '3ª Série'].includes(grade);
    
    for (const bimester of BIMESTRES) {
      for (let i = 1; i <= 10; i++) {
        let tituloGps = '';
        let proposta = '';
        let genero = 'Técnicas de Estudo e Leitura Crítica';
        let plataforma = 'Tarefa SP / Caderno de OE';
        let objetivos = '';
        let habCodigo = '';
        let habTexto = '';
        let objetosConhecimento = '';
        let sugestoes: string[] = [];
        let praticasPedagogicas = 'Metodologias ativas, estudo cooperativo, autorregulação e leitura analítica direcionada.';
        
        if (bimester === '1º Bimestre') {
          // Organização e Autogestão
          habCodigo = isEM ? 'EM13CG06' : 'EF69CG06';
          habTexto = isEM
            ? 'Desenvolver rotinas de autogestão e organização pessoal voltadas ao planejamento do projeto de vida e estudos pré-vestibular.'
            : 'Organizar materiais, rotina diária e cronogramas de estudo semanais, estimulando a autonomia escolar e gestão do tempo.';
            
          objetosConhecimento = 'Rotina de estudos, planejamento de tempo, cronograma semanal, canais de aprendizagem.';
          
          const titlesAF = [
            'Como Organizar meu Material Escolar e Mochila',
            'O Ambiente de Estudos Ideal em Casa',
            'Como Criar meu Primeiro Cronograma Semanal',
            'Descobrindo meu Canal de Aprendizagem (Visual, Auditivo, Cinestésico)',
            'Técnica Pomodoro: Como Focar e Evitar Distrações',
            'Planejando Metas de Estudo para o Bimestre',
            'Como Funciona a Nossa Atenção na Sala de Aula',
            'A Importância do Sono e da Alimentação no Aprendizado',
            'Autoavaliação Semanal de Hábitos de Estudo',
            'Revisão do Cronograma e Ajustes Práticos'
          ];
          
          const titlesEM = [
            'Planejamento de Estudos de Alta Performance',
            'Gestão de Tempo para Conciliar Escola e Vida Pessoal',
            'Criação de Cronogramas de Estudos Avançados (Ciclos de Estudo)',
            'Identificação de Estilos Cognitivos e Estratégias Metacognitivas',
            'Combate à Procrastinação através do Método de Blocos de Tempo',
            'Estabelecendo Metas SMART para o Ano Letivo',
            'Fisiologia da Aprendizagem: Concentração e Memória de Longo Prazo',
            'Rotina Noturna e Higiene do Sono para Estudantes',
            'Uso Eficiente de Agendas Digitais e Aplicativos de Produtividade',
            'Sessão de Mentoria Individual e Ajustes de Metas'
          ];
          
          tituloGps = isEM ? (titlesEM[i - 1] || 'Organização Avançada') : (titlesAF[i - 1] || 'Organizando meus Estudos');
          proposta = isEM 
            ? 'Desenvolver um plano de estudos baseado no modelo de ciclos de disciplinas.'
            : 'Construir um quadro de rotina semanal colorido identificando horários de estudo.';
          objetivos = 'Estruturar hábitos saudáveis e organizativos iniciais para consolidar a rotina de estudo individual diária.';
          sugestoes = isEM
            ? ['Testar aplicativo Google Agenda ou Notion', 'Montar ciclo de estudos intercalado', 'Elaborar mapa de metas de médio prazo']
            : ['Fazer faxina nos cadernos e estojo', 'Desenhar quadro horário em folha sulfite', 'Discutir com os pais o local de estudo'];
            
        } else if (bimester === '2º Bimestre') {
          // Técnicas de Processamento e Memorização
          habCodigo = isEM ? 'EM13CG05' : 'EF69CG05';
          habTexto = isEM
            ? 'Utilizar recursos e ferramentas digitais para catalogar, resumir e estruturar conhecimentos de forma sintética e crítica.'
            : 'Desenvolver habilidades de sublinhar informações essenciais, fazer esquemas, fichamentos e resumos estruturados.';
            
          objetosConhecimento = 'Leitura analítica, técnicas de sublinhar, resumo, fichamento, mapas conceituais, flashcards.';
          
          const titlesAF = [
            'Como Ler de Forma Ativa (Interagindo com o Texto)',
            'Técnica de Sublinhar: O que Realmente Importa?',
            'Como Fazer Anotações Eficientes no Caderno',
            'O Método Cornell para Anotações de Aula',
            'Construindo meu Primeiro Fichamento',
            'Como Transformar Textos em Esquemas Visuais',
            'O que é um Mapa Mental e Como Desenhar Um',
            'Como Fazer Flashcards de Memorização Ativa',
            'Técnica de Estudo Feynman: Explicar para Aprender',
            'Oficina de Resumos Colaborativos na Sala'
          ];
          
          const titlesEM = [
            'Leitura Crítica e Anotações de Alto Rendimento',
            'Sintetizando Textos Complexos com a Técnica de Sublinhar',
            'Sistemas de Organização de Cadernos Médios e Fichários',
            'Otimizando o Método Cornell para Conteúdos de Humanas e Exatas',
            'Fichamento de Leituras Obrigatórias dos Vestibulares',
            'Mapeamento Conceitual Avançado e Diagramação de Conteúdos',
            'Sistemas de Mapas Mentais Digitais (XMind, Miro)',
            'Memorização de Longo Prazo com Repetição Espaçada (Anki)',
            'Princípio de Feynman Aplicado a Conceitos Complexos',
            'Produção de Portfólios de Aprendizagem Integrados'
          ];
          
          tituloGps = isEM ? (titlesEM[i - 1] || 'Processamento Conceitual') : (titlesAF[i - 1] || 'Técnicas de Memorização');
          proposta = isEM
            ? 'Criar um baralho de repetição espaçada digital ou analógico para termos e fórmulas.'
            : 'Fazer o resumo de um capítulo utilizando a técnica Cornell.';
          objetivos = 'Aprender técnicas ativas de processamento e consolidação de textos para garantir memorização duradoura.';
          sugestoes = isEM
            ? ['Baixar ou testar o aplicativo Anki', 'Criar mapa conceitual de um tópico do ENEM', 'Apresentar um minisseminário de 3 minutos']
            : ['Usar marca-textos de 3 cores com legenda', 'Fazer fichas de cartolina tamanho 10x15', 'Praticar explicação mútua em duplas'];
            
        } else if (bimester === '3º Bimestre') {
          // Interpretação de Questões e Raciocínio
          habCodigo = isEM ? 'EM13CG02' : 'EF69CG02';
          habTexto = isEM
            ? 'Analisar criticamente problemas complexos, identificando conexões entre áreas do conhecimento e estratégias eficazes de resolução.'
            : 'Interpretar textos matemáticos, tabelas e gráficos, decodificando enunciados de provas e reconhecendo caminhos lógicos.';
            
          objetosConhecimento = 'Decodificação de enunciados, identificação de distratores, análise de erros, raciocínio lógico-matemático.';
          
          const titlesAF = [
            'Como Ler e Compreender Enunciados de Questões',
            'O que são Distratores? Como Identificar Pegadinhas',
            'Interpretação de Gráficos e Tabelas na Prática',
            'Como Organizar meu Raciocínio Matemático no Papel',
            'A Engenharia Reversa do Erro: Aprender com o que Errei',
            'Interpretação de Enunciados Multidisciplinares',
            'Estratégias para Resolver Questões de Múltipla Escolha',
            'Oficina de Resolução Lógica em Grupos',
            'Análise Crítica dos Resultados dos meus Simulados',
            'Como Formular Perguntas Inteligentes para Tirar Dúvidas'
          ];
          
          const titlesEM = [
            'Desmontando Enunciados Complexos de Vestibular e ENEM',
            'Análise Estatística de Distratores e Itens do Tri (ENEM)',
            'Leitura Técnica de Dados, Infográficos e Gráficos de Provas',
            'Modelagem Matemática e Lógica de Solução Sistêmica',
            'Clínica de Erros: Diagnóstico de Falhas de Conteúdo x Atenção',
            'Habilidades Transversais nas Ciências da Natureza e Exatas',
            'Táticas de Exclusão e Eliminação Lógica em Provas Objetivas',
            'Estudo Baseado em Resolução de Questões (Estudo Reverso)',
            'Simulação de Bancas Examinadoras e Critérios de Correção',
            'Formulando Argumentações Sólidas para Questões Dissertativas'
          ];
          
          tituloGps = isEM ? (titlesEM[i - 1] || 'Interpretação Lógica') : (titlesAF[i - 1] || 'Entendendo Questões');
          proposta = isEM
            ? 'Praticar o estudo reverso: partir das questões para encontrar as lacunas de conteúdo.'
            : 'Pegar uma prova antiga de Matemática e circular as palavras-chave do comando da questão.';
          objetivos = 'Exercitar a capacidade interpretativa de questões, reduzindo erros por falta de atenção ou má interpretação.';
          sugestoes = isEM
            ? ['Catalogar os erros mais comuns em planilhas', 'Fazer um simulado focado em velocidade de raciocínio', 'Criar questões com gabarito comentado']
            : ['Fazer um glossário de termos matemáticos de comando', 'Colorir palavras-chave nas questões', 'Explicar o erro de um colega de forma construtiva'];
            
        } else {
          // Inteligência Emocional e Provas
          habCodigo = isEM ? 'EM13CG10' : 'EF69CG10';
          habTexto = isEM
            ? 'Gerenciar estados emocionais, resiliência e autoconfiança diante de exames, vestibulares e tomadas de decisão importantes.'
            : 'Desenvolver atitudes de persistência, foco diante de exames coletivos e estratégias de revisão de conteúdos de fim de ano.';
            
          objetosConhecimento = 'Ansiedade em avaliações, resiliência, gestão de tempo de prova, curva de esquecimento, autoavaliação.';
          
          const titlesAF = [
            'Por que Sentimos Medo de Prova? Entendendo Nossas Emoções',
            'Técnicas Simples de Respiração para Manter a Calma',
            'Como Organizar o Tempo During uma Avaliação na Escola',
            'A Importância de Revisar a Prova Antes de Entregar',
            'O que é a Curva de Esquecimento e Como Combater',
            'Como Estudar em Grupo sem Perder o Foco',
            'Celebrando Pequenas Conquistas e Esforços Individuais',
            'Planejamento de Revisão Final de Conteúdos do Ano',
            'Roda de Conversa: Como Superei Minhas Dificuldades de Estudo',
            'Autoavaliação de OE do Ano e Compromissos para o Futuro'
          ];
          
          const titlesEM = [
            'Neurociência do Estresse e Inteligência Emocional Pré-ENEM',
            'Técnicas de Mindfulness e Mindset de Crescimento',
            'Táticas Avançadas de Gestão do Tempo de Provas (Estratégia de Resolução)',
            'Revisões Finais e o Perigo do Overstudying (Sobrecarga Cognitiva)',
            'Sistemas Avançados de Revisão Espaçada de Fim de Ano',
            'Estudo Cooperativo e Grupos de Estudo Autogeridos',
            'Autoconfiança, Autoeficácia e o Papel do Mindset de Sucesso',
            'Planejamento Estratégico de Revisões de Véspera de Vestibular',
            'Sessão Coletiva de Compartilhamento de Aprendizados e Resiliência',
            'Portfólio Final de Autogestão e Plano de Estudos para o Próximo Ano'
          ];
          
          tituloGps = isEM ? (titlesEM[i - 1] || 'Inteligência Emocional') : (titlesAF[i - 1] || 'Preparando-me para Provas');
          proposta = isEM
            ? 'Desenhar um plano detalhado de controle do tempo de prova e estratégias de calma.'
            : 'Fazer um diário de emoções e uma sessão de respiração guiada de 5 minutos.';
          objetivos = 'Fortalecer a resiliência acadêmica e instrumentalizar o aluno para ter alto desempenho emocional em avaliações.';
          sugestoes = isEM
            ? ['Meditar 5 minutos por dia usando guias', 'Criar plano B para controle de tempo de prova', 'Escrever carta de autoapoio mental']
            : ['Treinar respiração diafragmática em silêncio', 'Fazer simulação cronometrada de 10 questões', 'Compartilhar conquistas com os amigos'];
        }
        
        data.push({
          id: `oe-port-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
          ano: grade,
          bimestre: bimester,
          semana: `Semana ${i}`,
          tituloGps: `${tituloGps}`,
          aula: i,
          praticaLinguagem: 'Autogestão, Metacognição e Técnicas de Estudo e Leitura',
          proposta: proposta,
          genero: genero,
          eixo: 'Habilidades Metacognitivas, Organização e Compreensão de Texto',
          sugestoes: sugestoes,
          praticasPedagogicas: praticasPedagogicas,
          plataforma: plataforma,
          objetivos: objetivos,
          objetosConhecimento: objetosConhecimento,
          habilidadeCodigo: habCodigo,
          habilidadeTexto: habTexto,
          disciplina: 'Orientação de Estudos - Português'
        });
      }
    }
  }
  
  return data;
}

// =============================================================
// 4. GENERATE EDUCAÇÃO FINANCEIRA
// =============================================================
function generateEducacaoFinanceira(): EducacaoFinanceiraItem[] {
  const data: EducacaoFinanceiraItem[] = [];
  // Belongs to 7º, 8º Ano, 1ª Série, 2ª Série
  const targetGrades = ['7º Ano', '8º Ano', '1ª Série', '2ª Série'];
  
  for (const grade of targetGrades) {
    for (const bimester of BIMESTRES) {
      // 1º and 2º bimester: 14 lessons. 3º and 4º bimester: 12 lessons.
      const isFirstHalf = bimester === '1º Bimestre' || bimester === '2º Bimestre';
      const maxLessons = isFirstHalf ? 14 : 12;
      
      for (let i = 1; i <= maxLessons; i++) {
        let unidadeTematica = '';
        let objetoConhecimento = '';
        let titulo = '';
        let conteudo = '';
        let objetivos = '';
        let habCodigo = '';
        let habTexto = '';
        
        if (grade === '1ª Série') {
          unidadeTematica = bimester === '1º Bimestre' ? 'Planejamento Financeiro e Consumo Consciente' :
                            bimester === '2º Bimestre' ? 'Planejamento Familiar e Matemática Financeira' :
                            bimester === '3º Bimestre' ? 'Sistema Financeiro e Investimentos Básicos' :
                            'Empreendedorismo e Cidadania Financeira';
          objetoConhecimento = bimester === '1º Bimestre' ? 'Orçamento pessoal, poupança, consumo x consumismo, influência do marketing' :
                               bimester === '2º Bimestre' ? 'Planejamento financeiro familiar, faturas residenciais, impostos, juros simples e compostos' :
                               bimester === '3º Bimestre' ? 'Sistema financeiro nacional, bancos x cooperativas, poupança x investimentos, perfil de investidor' :
                               'Empreendedorismo de impacto, plano de negócios, precificação, marketing pessoal, cidadania e ética financeira';
          
          let titles: string[] = [];
          if (bimester === '1º Bimestre') {
            titles = [
              'Dinheiro, sociedade e escolhas',
              'O que é educação financeira e seu impacto na vida',
              'Necessidades versus desejos de consumo',
              'Como as emoções afetam nossas escolhas de consumo',
              'Publicidade, algoritmos e o consumo na internet',
              'Planejamento financeiro de curto prazo',
              'Diagnosticando os próprios gastos (Raio-X financeiro)',
              'Como elaborar uma planilha de orçamento pessoal',
              'Economizando recursos no dia a dia: água, luz e transporte',
              'Poupar e guardar dinheiro de forma estratégica',
              'O perigo do crédito fácil e cartões',
              'Juros: o custo do dinheiro emprestado',
              'Direitos básicos do consumidor e consumo ético',
              'Avaliação e consolidação do orçamento bimestral'
            ];
          } else if (bimester === '2º Bimestre') {
            titles = [
              'Planejamento financeiro para a família',
              'Organizando o orçamento do lar de forma colaborativa',
              'Como analisar faturas residenciais e reduzir custos',
              'O papel dos tributos e impostos no consumo cotidiano',
              'Para onde vão os impostos que pagamos?',
              'Juros simples: conceitos e fórmulas no dia a dia',
              'Aplicação de juros simples em compras parceladas',
              'Juros compostos: o conceito de capitalização acumulada',
              'Juros compostos: o efeito bola de neve das dívidas',
              'Como calcular variações de preços e a inflação',
              'O impacto da inflação no poder de compra familiar',
              'Planejamento para sonhos de médio prazo',
              'Negociação de dívidas e saída do superendividamento',
              'Mostra de planos orçamentários residenciais'
            ];
          } else if (bimester === '3º Bimestre') {
            titles = [
              'Como funciona o Sistema Financeiro Nacional?',
              'Bancos comerciais, fintechs e cooperativas de crédito',
              'Contas correntes, digitais e tarifas bancárias',
              'Meios de pagamento modernos: segurança com Pix e cartões',
              'O que significa investir dinheiro?',
              'Poupança: rentabilidade e perda de poder de compra',
              'Introdução à Renda Fixa: Tesouro Direto e CDB',
              'Descobrindo meu perfil de investidor (conservador, moderado, arrojado)',
              'Diversificação de investimentos e riscos financeiros',
              'Planejando a independência financeira desde jovem',
              'Simulação de uma carteira de investimentos básicos',
              'Apresentação e avaliação da carteira simulada'
            ];
          } else {
            titles = [
              'Empreendedorismo como opção de carreira e projeto de vida',
              'O que é empreendedorismo social e startups de impacto',
              'Como identificar oportunidades e resolver problemas na comunidade',
              'Elaborando um modelo de negócios simplificado (Canvas)',
              'Estrutura de custos: fixos, variáveis e investimento inicial',
              'Como precificar produtos e serviços de forma justa',
              'Noções básicas de marketing e divulgação de baixo custo',
              'Planejamento financeiro de uma feira ou bazar escolar',
              'Executando o projeto prático de empreendedorismo na escola',
              'Prestação de contas e análise de resultados do projeto',
              'Ética financeira, sustentabilidade e bem comum',
              'Autoavaliação do ano e celebração dos resultados'
            ];
          }
          titulo = titles[i - 1] || 'Tópico de Educação Financeira';
          conteudo = 'Análise aprofundada de conceitos econômicos, orçamentos e tomada de decisões conscientes.';
          objetivos = 'Capacitar os estudantes com ferramentas analíticas para a tomada de decisões financeiras saudáveis.';
          habCodigo = 'EM13MAT315';
          habTexto = 'Investigar e registrar variações de preços de bens de consumo e investimentos financeiro-econômicos.';
        } else if (grade === '2ª Série') {
          unidadeTematica = bimester === '1º Bimestre' ? 'Economia Comportamental e Decisões de Consumo' :
                            bimester === '2º Bimestre' ? 'Planejamento Financeiro Estratégico' :
                            bimester === '3º Bimestre' ? 'Mercado Financeiro e Investimentos Avançados' :
                            'Empreendedorismo de Negócios e Cidadania';
          objetoConhecimento = bimester === '1º Bimestre' ? 'Vieses cognitivos, heurísticas, armadilhas do consumo moderno, crédito e endividamento' :
                               bimester === '2º Bimestre' ? 'Orçamentos complexos, planilhas inteligentes, tributação e imposto de renda' :
                               bimester === '3º Bimestre' ? 'Renda fixa vs renda variável, inflação x rentabilidade, fundos de investimento, previdência e longo prazo' :
                               'Plano de negócios complexo, fluxo de caixa, ponto de equilíbrio, tributação de empresas, microempreendedor individual (MEI), sustentabilidade e ética corporativa';
          
          let titles: string[] = [];
          if (bimester === '1º Bimestre') {
            titles = [
              'Introdução à Economia Comportamental: razão x emoção',
              'Vieses cognitivos nas escolhas de consumo cotidianas',
              'Heurística da escassez e da ancoragem de preços',
              'Como as lojas usam gatilhos mentais para vender mais',
              'O papel do crédito e do parcelamento no consumo',
              'Cartão de crédito: amigo ou vilão das finanças?',
              'Juros rotativos e o perigo do endividamento descontrolado',
              'Análise de contratos de financiamento e letras miúdas',
              'Consumo sustentável versus obsolescência programada',
              'A pegada ecológica do nosso padrão de consumo',
              'Direitos do consumidor na era digital: e-commerce e segurança',
              'Como evitar fraudes, golpes financeiros e pirâmides na internet',
              'Elaborando um guia de sobrevivência financeira para jovens',
              'Apresentação e debate sobre os guias produzidos'
            ];
          } else if (bimester === '2º Bimestre') {
            titles = [
              'Orçamento financeiro avançado utilizando planilhas eletrônicas',
              'Fórmulas e funções essenciais no Excel/Google Sheets para controle financeiro',
              'Projetando o orçamento doméstico para cenários de crise',
              'Reserva de emergência: tamanho ideal, segurança e liquidez',
              'Como calcular e ler holerites (salário bruto x líquido)',
              'Tributação sobre consumo x tributação sobre renda',
              'O que é o Imposto de Renda e quem deve declarar?',
              'Como fazer uma simulação simplificada de Declaração de IRPF',
              'Planejamento financeiro para morar sozinho e custos de vida',
              'Aluguel x Compra de imóvel: uma análise financeira e social',
              'Custos invisíveis de manutenção residencial e tarifas públicas',
              'Planejamento financeiro de viagens e lazer inteligente',
              'Criação de um plano de contingência para crises familiares',
              'Mostra de planilhas orçamentárias estratégicas da turma'
            ];
          } else if (bimester === '3º Bimestre') {
            titles = [
              'Aprofundando no mercado de investimentos: Renda Fixa vs Renda Variável',
              'Taxa Selic, CDI e IPCA: como a macroeconomia afeta o bolso',
              'Tesouro Direto: títulos públicos (Selic, IPCA+, Prefixado)',
              'Renda variável: como funciona a Bolsa de Valores e ações',
              'Fundos Imobiliários (FIIs): conceitos, vantagens e riscos',
              'Fundos de Investimento: taxas de administração e performance',
              'O poder do tempo nos juros compostos para o longo prazo',
              'Previdência Privada: PGBL e VGBL na prática',
              'Como analisar a rentabilidade real descontando taxas e inflação',
              'Mitigando riscos por meio da diversificação estratégica de carteira',
              'Simulação avançada de investimento em simuladores de mercado',
              'Apresentação do relatório da carteira de investimentos de longo prazo'
            ];
          } else {
            titles = [
              'Empreendedorismo e inovação de negócios no Ensino Médio',
              'Microempreendedor Individual (MEI): vantagens, custos e formalização',
              'Planejamento de um plano de negócios estruturado',
              'Análise de mercado: concorrentes, público-alvo e proposta de valor',
              'Fluxo de caixa corporativo: controle de entradas e saídas diárias',
              'Ponto de Equilíbrio (Break-even point): como calcular',
              'Noções de tributação empresarial (Simples Nacional, etc.)',
              'Marketing digital avançado e captação de clientes éticos',
              'Oficina prática: simulação de negócios e tomada de decisões empresariais',
              'Prestação de contas, auditoria interna e cálculo de lucros',
              'Responsabilidade social empresarial, governança e sustentabilidade',
              'Fechamento anual: autoavaliação de cidadania financeira global'
            ];
          }
          titulo = titles[i - 1] || 'Tópico de Educação Financeira Avançada';
          conteudo = 'Investigação crítica de comportamentos orçamentários, planilhas estruturadas, investimentos e mercado de ações.';
          objetivos = 'Projetar e otimizar reservas de longo prazo e entender o funcionamento do mercado de capitais e tributário.';
          habCodigo = 'EM13MAT315';
          habTexto = 'Aplicar conceitos matemáticos avançados para analisar, comparar e tomar decisões em investimentos familiares ou empresariais.';
        } else if (grade === '7º Ano') {
          if (bimester === '1º Bimestre') {
            unidadeTematica = 'Planejamento e gestão financeira';
            objetoConhecimento = 'Orçamento e controle financeiro';
            const titles = [
              'Como nos relacionamos com o dinheiro? ‒ Parte 1',
              'Como nos relacionamos com o dinheiro? ‒ Parte 2',
              'De onde vem o dinheiro? Família e Trabalho',
              'O valor das coisas e o preço dos produtos',
              'Planejamento Financeiro de Curto Prazo',
              'Como poupar dinheiro de forma eficiente',
              'Cofre dos Sonhos e Metas de Economia',
              'Orçamento familiar simples: Entradas e Saídas',
              'Despesas fixas e variáveis no lar',
              'O consumo consciente e sustentável',
              'Evitando a compra por impulso no comércio',
              'Pesquisa de preços e consumo inteligente',
              'A história das trocas e do dinheiro',
              'Sessão de fechamento e orçamento final'
            ];
            titulo = titles[i - 1] || 'Planejamento e Orçamento';
            conteudo = 'Dinheiro no cotidiano, relação pessoal com o dinheiro, orçamento doméstico e economia inteligente.';
            objetivos = 'Reconhecer a presença do dinheiro no cotidiano e aprender a formular orçamentos domésticos básicos.';
            habCodigo = 'EF05CO10';
            habTexto = 'Expressar-se crítica e criativamente na compreensão das mudanças tecnológicas no mundo do trabalho.';
          } else if (bimester === '2º Bimestre') {
            unidadeTematica = 'Definição de objetivos';
            objetoConhecimento = 'Objetivos e sustentabilidade familiar';
            const titles = [
              'Definição de objetivos ‒ Parte 1',
              'Definição de objetivos ‒ Parte 2',
              'Sustentabilidade e Consumo Responsável',
              'Evitando o desperdício em casa (água, luz e comida)',
              'Diferença entre consumo sustentável e consumismo',
              'A publicidade e as compras por impulso',
              'Entendendo as faturas residenciais',
              'Poupança e investimento para objetivos futuros',
              'Como planejar as compras do mês',
              'Marketing pessoal e consumo ético',
              'Cálculo matemático de descontos simples',
              'Análise de panfletos de ofertas',
              'Despesas invisíveis e tarifas',
              'Apresentação dos projetos de economia'
            ];
            titulo = titles[i - 1] || 'Objetivos e Consumo Sustentável';
            conteudo = 'Objetivos pessoais, consumo consciente, consumo sustentável e tarifas residenciais.';
            objetivos = 'Explicar o que são objetivos e como estruturá-los para manter as finanças saudáveis.';
            habCodigo = 'EF06MA33';
            habTexto = 'Planejar e coletar dados de pesquisas de mercado e consumo pessoal para elaborar tabelas.';
          } else if (bimester === '3º Bimestre') {
            unidadeTematica = 'Prevenção e Imprevistos';
            objetoConhecimento = 'Reserva de emergência e riscos financeiros';
            const titles = [
              'Retomando os imprevistos',
              'O que é uma reserva de emergência?',
              'Como lidar com despesas inesperadas na família',
              'Consumo compartilhado e economia colaborativa',
              'Riscos financeiros e seguros básicos',
              'A importância de ter foco nas metas',
              'Avaliando cenários de crise financeira',
              'Alternativas sustentáveis de economia',
              'Oficina de produção com materiais recicláveis',
              'Reduzindo gastos supérfluos',
              'Dinheiro no tempo: instrução básica',
              'Apresentação dos cofres de emergência'
            ];
            titulo = titles[i - 1] || 'Gestão de Imprevistos e Riscos';
            conteudo = 'Imprevistos, planejamento contra crises, reserva de emergência e consumo compartilhado.';
            objetivos = 'Propor soluções financeiras para situações de imprevistos e organizar reservas financeiras básicas.';
            habCodigo = 'EF07MA04';
            habTexto = 'Resolver e elaborar problemas que envolvam variação proporcional e planejamento contra imprevistos.';
          } else {
            unidadeTematica = 'Renda e Meios de Pagamento';
            objetoConhecimento = 'Meios de pagamento e renda familiar';
            const titles = [
              'Introdução à renda ‒ Parte 1',
              'Introdução à renda ‒ Parte 2',
              'Diferentes meios de pagamento: dinheiro, cartão, Pix',
              'Segurança e cuidados ao usar canais de pagamento',
              'A renda ativa versus renda passiva',
              'Fontes de renda na comunidade',
              'Entendendo salários e impostos básicos',
              'O papel do trabalho no desenvolvimento pessoal',
              'Como planejar uma mini-feira escolar',
              'Orçamento de produção da mini-feira',
              'Análise de lucros e perdas do evento',
              'Encerramento e autoavaliação anual'
            ];
            titulo = titles[i - 1] || 'Renda, Trabalho e Meios Digitais';
            conteudo = 'Meios de pagamento físicos e digitais, segurança cibernética em finanças, e fontes de renda.';
            objetivos = 'Identificar e compreender diferentes meios de pagamento e formas de geração de renda familiar sustentável.';
            habCodigo = 'EF06MA32';
            habTexto = 'Interpretar e resolver problemas de juros simples aplicados ao consumo e investimentos de curto prazo.';
          }
        } else {
          // 8º Ano
          if (bimester === '1º Bimestre') {
            unidadeTematica = 'Consumismo e Crítica Social';
            objetoConhecimento = 'Orçamento familiar e consumo consciente';
            const titles = [
              'Consumismo: o que é e como nos afeta?',
              'A influência do marketing e das redes sociais',
              'Moda e sustentabilidade: o custo das roupas',
              'O lixo que geramos com nossas compras',
              'Cálculo de taxas e descontos matemáticos simples',
              'Comparações de preços em lojas físicas e virtuais',
              'O perigo do parcelamento excessivo e cartões de crédito',
              'Dívidas e superendividamento: causas e soluções',
              'Projeto de consumo consciente na escola',
              'Sessão de fechamento e apresentação',
              'Direitos básicos do consumidor',
              'Leitura e análise de propagandas',
              'Pesquisa de marcas sustentáveis',
              'Elaborando folhetos de consumo ético'
            ];
            titulo = titles[i - 1] || 'Consumismo e Sociedade';
            conteudo = 'Consumo consciente, consumo sustentável, impactos da publicidade e matemática financeira básica.';
            objetivos = 'Diferenciar consumismo de consumo consciente, propondo mudanças de hábitos pessoais.';
            habCodigo = 'EF07GE06';
            habTexto = 'Analisar a apropriação e o consumo de recursos naturais e propor alternativas sustentáveis no orçamento.';
          } else if (bimester === '2º Bimestre') {
            unidadeTematica = 'Matemática Financeira Básica';
            objetoConhecimento = 'Porcentagem, juros simples e compostos';
            const titles = [
              'Introdução às porcentagens no cotidiano',
              'Juros simples: acréscimos e descontos nas compras',
              'Juros compostos: o efeito bola de neve',
              'Inflação: por que as coisas sobem de preço?',
              'Como calcular a variação de preços ao longo do tempo',
              'Elaborando uma planilha orçamentária pessoal',
              'A planilha eletrônica no controle de gastos',
              'Comparando juros em financiamentos',
              'O custo do dinheiro no tempo',
              'Projetando sonhos de médio prazo',
              'Finanças saudáveis: plano de ação de 1 ano',
              'Análise do extrato de contas',
              'Custos embutidos e juros de mora',
              'Mostra de planilhas orçamentárias criativas'
            ];
            titulo = titles[i - 1] || 'Matemática Financeira Aplicada';
            conteudo = 'Aplicações da porcentagem, juros simples e compostos, inflação e variação cambial/monetária.';
            objetivos = 'Identificar o uso prático de porcentagens e juros no dia a dia, aplicando-os em planilhas financeiras.';
            habCodigo = 'EF08MA04';
            habTexto = 'Resolver e elaborar problemas que envolvam o cálculo de porcentagens, acréscimos, juros simples e compostos.';
          } else if (bimester === '3º Bimestre') {
            unidadeTematica = 'Economia Doméstica';
            objetoConhecimento = 'Impostos, tarifas públicas e serviços residenciais';
            const titles = [
              'Entendendo a Economia Doméstica',
              'Entendendo faturas residenciais: Água e Energia',
              'Como ler o cupom fiscal e entender os impostos',
              'Onde o governo investe os impostos que pagamos?',
              'Consumo sustentável e impostos ecológicos',
              'Estratégias de economia de água e energia em casa',
              'Matemática aplicada à leitura de hidrômetros e relógios de luz',
              'O papel do cidadão na fiscalização pública',
              'Apresentação de propostas de economia de recursos na escola',
              'Metas de economia coletiva para a turma',
              'Análise matemática de tarifas públicas',
              'Relação entre impostos e serviços públicos'
            ];
            titulo = titles[i - 1] || 'Tarifas, Impostos e Despesas';
            conteudo = 'Economia de recursos domiciliares, tarifas, impostos e serviços governamentais.';
            objetivos = 'Analisar e reduzir as despesas domiciliares a partir da leitura técnica de tarifas de água, luz e impostos.';
            habCodigo = 'EF08MA04';
            habTexto = 'Resolver problemas que envolvam cálculo de tarifas, consumo mensal e impostos embutidos.';
          } else {
            unidadeTematica = 'Cidadania Financeira';
            objetoConhecimento = 'Empreendedorismo social e direito do consumidor';
            const titles = [
              'Cidadania Financeira: o que é e por que é importante?',
              'Direitos do Consumidor e o Procon',
              'Introdução ao Empreendedorismo Social',
              'Elaborando um plano de negócios para um bazar escolar',
              'Precificação e custos de produção',
              'Cálculo de custos fixos e variáveis de um negócio',
              'Marketing de baixo custo para ações sociais',
              'Executando o bazar escolar beneficente',
              'Prestação de contas do bazar para a comunidade',
              'Lucro versus doação social',
              'Autoavaliação e portfólio anual de cidadania financeira',
              'Fechamento e comemoração do ano'
            ];
            titulo = titles[i - 1] || 'Empreendedorismo Social e Bazar';
            conteudo = 'Direitos do consumidor, precificação, custos, empreendedorismo ético e plano de negócios social.';
            objetivos = 'Desenvolver habilidades empreendedoras focadas na responsabilidade social e cidadania financeira prática.';
            habCodigo = 'EF69LP41';
            habTexto = 'Usar adequadamente recursos expressivos e argumentativos para defender direitos e expor planos de negócios.';
          }
        }
        
        data.push({
          id: `ef-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
          ano: grade,
          bimestre: bimester,
          aula: i,
          unidadeTematica: unidadeTematica || 'Planejamento e Gestão Financeira',
          objetoConhecimento: objetoConhecimento || 'Relação com o dinheiro e Orçamento',
          titulo: titulo,
          conteudo: conteudo,
          objetivos: objetivos,
          habilidadeCodigo: habCodigo || 'EF07MA39*',
          habilidadeTexto: habTexto || 'Compreender o cálculo de juros simples e compostos em situações cotidianas.'
        });
      }
    }
  }
  
  return data;
}

// =============================================================
// 5. GENERATE REDAÇÃO E LEITURA
// =============================================================
function generateRedacaoLeitura(): RedacaoLeituraItem[] {
  const data: RedacaoLeituraItem[] = [];
  const targetGrades = ['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1ª Série', '2ª Série', '3ª Série'];
  
  for (const grade of targetGrades) {
    for (const bimester of BIMESTRES) {
      if (GRADES_EM.includes(grade)) {
        const maxLessons = 16;
        for (let i = 1; i <= maxLessons; i++) {
          let textNum = i <= 8 ? 1 : 2;
          let isProduction = i % 2 === 0;
          let isReading = !isProduction;
          let step = '';
          if (i === 1 || i === 2 || i === 9 || i === 10) step = 'Projeto de Texto';
          else if (i === 3 || i === 4 || i === 11 || i === 12) step = 'Elaboração do Rascunho';
          else if (i === 5 || i === 6 || i === 13 || i === 14) step = 'Versão Final';
          else step = 'Devolutiva e Reescrita';

          let genero = '';
          let obras = '';
          let habilidade = '';
          let aprendizagem = '';
          let plataforma = isProduction ? 'Redação Paulista' : 'Leia SP';

          if (grade === '1ª Série') {
            if (bimester === '1º Bimestre') {
              genero = textNum === 1 ? 'Carta pessoal' : 'Conto';
              obras = textNum === 1 ? 'Cartas ao meu vizinho palestino / Diário de Anne Frank' : 'Contos Clássicos Brasileiros';
              habilidade = 'EM13LP01: Analisar o funcionamento das linguagens para interpretar e produzir textos.';
              aprendizagem = 'Gênero: ' + genero + '. Análise estrutural e prática de produção criativa de textos ficcionais e pessoais.';
            } else if (bimester === '2º Bimestre') {
              genero = textNum === 1 ? 'Artigo de Opinião' : 'Crônica';
              obras = textNum === 1 ? 'Suave aroma dos campos de lavanda / A menina que roubava livros' : 'Crônicas do Cotidiano';
              habilidade = 'EM13LP05: Analisar criticamente as estratégias argumentativas e persuasivas.';
              aprendizagem = 'Gênero: ' + genero + '. Argumentação fundamentada e estilística de textos jornalísticos e literários.';
            } else if (bimester === '3º Bimestre') {
              genero = textNum === 1 ? 'Dissertação Argumentativa ENEM' : 'Dissertação Argumentativa Provão Paulista';
              obras = textNum === 1 ? 'O amanhã não está à venda / A vida não é útil' : 'O Guarani';
              habilidade = 'EM13LP08: Redigir textos argumentativos e dissertativos de acordo com a norma-padrão.';
              aprendizagem = 'Gênero: ' + genero + '. Elaboração de tese, seleção de repertório e propostas de intervenção social.';
            } else {
              genero = textNum === 1 ? 'Dissertação Argumentativa ENEM' : 'Dissertação Argumentativa Provão Paulista';
              obras = textNum === 1 ? 'Vidas Secas / A Cabeça do Santo' : 'Os Sertões';
              habilidade = 'EM13LP08: Redigir textos de acordo com os critérios do ENEM e Provão Paulista.';
              aprendizagem = 'Gênero: ' + genero + '. Práticas de escrita acadêmica formal com foco em coesão e argumentação.';
            }
          } else if (grade === '2ª Série') {
            if (bimester === '1º Bimestre') {
              genero = textNum === 1 ? 'Crônica' : 'Artigo de divulgação científica';
              obras = textNum === 1 ? '1984 / Frankenstein / O médico e o monstro' : 'Textos de Divulgação Científica';
              habilidade = 'EM13LP02: Produzir textos de diferentes gêneros, considerando os contextos.';
              aprendizagem = 'Gênero: ' + genero + '. Produção textual de caráter dissertativo e expositivo.';
            } else if (bimester === '2º Bimestre') {
              genero = textNum === 1 ? 'Conto' : 'Artigo de Opinião';
              obras = textNum === 1 ? 'A Cabeça do Santo / Auto da Compadecida' : 'Artigos e Ensaios Brasileiros';
              habilidade = 'EM13LP05: Analisar o posicionamento e marcas de autoria de textos de opinião.';
              aprendizagem = 'Gênero: ' + genero + '. Práticas de escrita com foco em coerência e desenvolvimento de ideias.';
            } else if (bimester === '3º Bimestre') {
              genero = textNum === 1 ? 'Dissertação Argumentativa ENEM (Desafios Sociais)' : 'Dissertação Argumentativa ENEM';
              obras = textNum === 1 ? 'Hibisco Roxo / O Fio das Missangas' : 'Pequeno manual antirracista';
              habilidade = 'EM13LP08: Empregar conectivos argumentativos com precisão coesiva.';
              aprendizagem = 'Gênero: ' + genero + '. Escrita argumentativa voltada a temas estruturais e de diversidade social.';
            } else {
              genero = textNum === 1 ? 'Dissertação Argumentativa Provão Paulista' : 'Dissertação Argumentativa Provão Paulista';
              obras = textNum === 1 ? 'Dom Casmurro / O Primo Basílio' : 'Romeu e Julieta';
              habilidade = 'EM13LP08: Adequar a escrita formal aos critérios estaduais de redação.';
              aprendizagem = 'Gênero: ' + genero + '. Produção dissertativa de relações interpessoais e clássicos literários.';
            }
          } else {
            // 3ª Série
            if (bimester === '1º Bimestre') {
              genero = textNum === 1 ? 'Dissertação Argumentativa ENEM (Valor da Vida)' : 'Dissertação Argumentativa ENEM (Identidade e Futuro)';
              obras = textNum === 1 ? 'A vida não é útil' : 'Morangos Mofados';
              habilidade = 'EM13LP08: Redigir de forma autônoma e com repertório sociocultural consolidado.';
              aprendizagem = 'Gênero: ' + genero + '. Produções dissertativas em nível avançado preparatório de vestibulares.';
            } else if (bimester === '2º Bimestre') {
              genero = textNum === 1 ? 'Dissertação Argumentativa Provão Paulista' : 'Dissertação Argumentativa Provão Paulista';
              obras = textNum === 1 ? 'Balada de Amor ao Vento' : 'A Visão das Plantas';
              habilidade = 'EM13LP08: Formular tese sólida e conectivos para progressão textual fluida.';
              aprendizagem = 'Gênero: ' + genero + '. Prática avançada de redação de exames com foco em direitos humanos.';
            } else if (bimester === '3º Bimestre') {
              genero = textNum === 1 ? 'Dissertação Argumentativa Provão Paulista' : 'Dissertação Argumentativa ENEM';
              obras = textNum === 1 ? 'Olhos D\'Água' : 'Canção Para Ninar Menino Grande';
              habilidade = 'EM13LP08: Adequação estilística, coesão, gramática padrão e proposta inovadora.';
              aprendizagem = 'Gênero: ' + genero + '. Práticas de escrita com temas complexos, literaturas negras e contemporâneas.';
            } else {
              genero = textNum === 1 ? 'Dissertação Argumentativa ENEM' : 'Dissertação Argumentativa ENEM';
              obras = textNum === 1 ? 'Memórias póstumas de Brás Cubas' : 'Memórias póstumas de Brás Cubas';
              habilidade = 'EM13LP08: Consolidação de todas as competências textuais do Ensino Médio.';
              aprendizagem = 'Gênero: ' + genero + '. Simulação final completa de redação, reescrita e autoavaliação anual.';
            }
          }

          let titulo = `Aula ${i}: ${step} - Gênero: ${genero}`;
          let conteudo = isReading
            ? `Prática de leitura analítica. Obra de apoio: ${obras}. Análise estilística, paradas estratégicas e marcas do gênero.`
            : `Prática de produção escrita individual. Foco no esqueleto do gênero e refinamento textual. Plataforma: ${plataforma}.`;

          let objetivos = isReading
            ? `Desenvolver a competência leitora, identificar marcas do gênero e relacionar a obra com o contexto contemporâneo.`
            : `Produzir, planejar, revisar ou submeter o texto na plataforma ${plataforma}, refinando aspectos gramaticais e estilísticos.`;

          data.push({
            id: `rl-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
            ano: grade,
            bimestre: bimester,
            aula: `Aula ${i}`,
            titulo: titulo,
            conteudo: conteudo,
            objetivos: objetivos,
            habilidade: habilidade,
            aprendizagem: aprendizagem
          });
        }
        continue;
      }

      // 8 double lessons per bimester (Aula Dupla 1 to Aula Dupla 8)
      const maxLessons = 8;
      
      for (let i = 1; i <= maxLessons; i++) {
        const aulaStr = `Aula Dupla ${i}`;
        
        let titulo = '';
        let conteudo = '';
        let objetivos = '';
        let habilidade = '';
        let aprendizagem = '';
        
        if (bimester === '1º Bimestre') {
          const titles = [
            'Explorando Gêneros e Escrita Criativa de Crônicas',
            'Narrativas de Mistério e a Arte do Diálogo',
            'Narrando Aventuras, Clímax e Desfecho',
            'Leitura de Crônicas e Contos de Autores Brasileiros',
            'Prática de Escrita da Primeira Crônica do Ano',
            'Revisão, Autoedição e Reescrita Coletiva',
            'Fanzine e Redação Paulista: Planejamento',
            'Produção Final, Feedback e Varal de Histórias'
          ];
          const contents = [
            'Estrutura narrativa, criação de enredo, diálogos e personagens marcantes.',
            'Gênero enigma, uso de pontuação expressiva e coesão nos diálogos.',
            'Jornada do herói adaptada, momentos de tensão narrativa e encerramentos contundentes.',
            'Apreciação estética, análise estilística e leitura dirigida de autores clássicos.',
            'Escrita autoral guiada a partir de episódios cotidianos reais.',
            'Técnicas de polimento sintático, remoção de redundâncias e clareza de cenários.',
            'Instruções do sistema oficial de redação e esboços de diagramação multimodal.',
            'Envio no sistema, autoavaliação anual e compartilhamento literário coletivo.'
          ];
          const objectivesList = [
            'Compreender as características estruturais da crônica e criar personagens verossímeis.',
            'Desenvolver pequenos contos de suspense focando na expressividade pontual.',
            'Modelar e rascunhar o ápice dramático de uma narrativa ficcional.',
            'Identificar as marcas de subjetividade e ironia na literatura nacional curta.',
            'Produzir a primeira versão completa de um texto narrativo crônico.',
            'Editar e aprimorar o próprio texto de forma reflexiva e colaborativa.',
            'Preparar a estrutura argumentativa alinhada aos critérios estaduais.',
            'Finalizar a versão oficial do texto e celebrar as produções da turma.'
          ];
          
          titulo = titles[i - 1] || 'Práticas Narrativas e Criativas';
          conteudo = contents[i - 1] || 'Estrutura narrativa e criação de enredo.';
          objetivos = objectivesList[i - 1] || 'Ler de forma crítica textos literários curtos e produzir crônicas.';
          habilidade = 'EF69LP47: Analisar a presença de recursos estilísticos e semânticos na narrativa literária.';
          aprendizagem = 'Gêneros Literários: Crônica e Conto. Atividades de escrita focadas em voz narrativa e construção de cenas cotidianas.';
          
        } else if (bimester === '2º Bimestre') {
          const titles = [
            'O Jornalismo Escolar: Notícia, Fatos e Linguagem Clara',
            'A Reportagem de Investigação: Fontes e Entrevistas',
            'Opinião versus Fato: Analisando Cartas do Leitor',
            'Design de Notícias: Manchetes e Diagramação',
            'Oficina de Produção: Noticiando Eventos da Escola',
            'Edição de Textos Jornalísticos e Voz Passiva',
            'Mural de Notícias e Sistema Redação Paulista',
            'Divulgação Científica e Encerramento do Ciclo'
          ];
          const contents = [
            'O gênero notícia, objetividade jornalística e a estrutura clássica do lide.',
            'Diferença de notícia e reportagem, técnicas de pesquisa e roteiros de entrevista.',
            'Editorial, artigo de opinião, cartas críticas e análise de comentários online.',
            'Hierarquia visual, impacto de manchetes e uso ético de fotografias jornalísticas.',
            'Prática de campo, redação jornalística e uso de discurso direto/indireto.',
            'Concordância verbal, voz passiva em chamadas e técnicas de corte de texto.',
            'Critérios de avaliação do sistema estadual para notícias e artigos informativos.',
            'Artigos de divulgação científica voltados ao público jovem e autoavaliação.'
          ];
          const objectivesList = [
            'Identificar a estrutura de notícias analisando quem, o quê, onde e por quê.',
            'Planejar e redigir roteiros estruturados de perguntas para a comunidade escolar.',
            'Aprender a discernir fatos descritos de posicionamentos opinativos explícitos.',
            'Criar esboços de diagramação de notícias para jornais-mural.',
            'Produzir a primeira versão de uma notícia curta sobre acontecimento escolar recente.',
            'Editar notícias em duplas focando na concisão e impessoalidade jornalística.',
            'Transcrever e digitar as produções jornalísticas de acordo com as normas.',
            'Refletir sobre o impacto das mídias na escola e avaliar as competências adquiridas.'
          ];
          
          titulo = titles[i - 1] || 'Gêneros Jornalísticos e Informação';
          conteudo = contents[i - 1] || 'O lide jornalístico, objetividade e imparcialidade.';
          objetivos = objectivesList[i - 1] || 'Diferenciar fatos de opiniões na leitura de notícias.';
          habilidade = 'EF69LP03: Analisar criticamente as estratégias argumentativas e informativas de gêneros jornalísticos.';
          aprendizagem = 'Gêneros Jornalísticos: Notícia, Reportagem e Carta de Leitor. Oficina de escrita focado em clareza informativa.';
          
        } else if (bimester === '3º Bimestre') {
          const titles = [
            'O Debate Regrado e Argumentação Ética',
            'A Estrutura do Texto Argumentativo: Tese e Fundamentação',
            'Tipos de Argumentos: Dados, Exemplos e Autoridades',
            'Como Identificar Falácias e Argumentações Frágeis',
            'Artigo de Opinião e Tomada de Posição Ética',
            'A Resenha Crítica: Avaliando Livros e Filmes',
            'Conectivos Argumentativos e Coesão Sequencial',
            'Oficina Redação Paulista e Painel de Debates final'
          ];
          const contents = [
            'Raciocínio lógico, respeito à divergência e regras de debate formal na sala.',
            'Partes da dissertação, tese central, introdução e parágrafos de desenvolvimento.',
            'Argumentação por evidência estatística, citação de autoridades e analogia lógica.',
            'Falácias lógicas comuns, inconsistências de dados e análises tendenciosas.',
            'Gênero opinativo assinado, uso de operadores argumentativos e marcas de autoria.',
            'Diferença de resumo e resenha, apreciação crítica de obras literárias ou audiovisuais.',
            'Operadores lógicos de oposição, conclusão, adição e explicação nos parágrafos.',
            'Produção final no sistema, redação argumentativa oficial e autoavaliação.'
          ];
          const objectivesList = [
            'Formular argumentos respeitosos expressando pontos de vista oralmente.',
            'Delinear e registrar a tese central de um tema social de forma clara.',
            'Pesquisar e selecionar fontes fiáveis para embasar posicionamentos pessoais.',
            'Analisar e identificar generalizações de forma crítica em artigos diversos.',
            'Escrever a introdução e o desenvolvimento de um artigo de opinião autoral.',
            'Produzir uma resenha expressando juízo de valor embasado de uma obra.',
            'Utilizar conectivos adequados para garantir a fluidez do texto argumentativo.',
            'Finalizar o artigo de opinião enviando-o no sistema estadual de redação.'
          ];
          
          titulo = titles[i - 1] || 'Argumentação, Opinião e Crítica';
          conteudo = contents[i - 1] || 'Tese, argumentos por dados/exemplificação/autoridade.';
          objetivos = objectivesList[i - 1] || 'Desenvolver raciocínio crítico por meio da escrita de resenhas críticas.';
          habilidade = 'EF89LP14: Formular propostas de intervenção a partir da leitura e análise de gêneros argumentativos.';
          aprendizagem = 'Gêneros Argumentativos: Artigo de Opinião e Resenha Crítica. Técnicas de sustentação de pontos de vista.';
          
        } else {
          const titles = [
            'Linguagem Poética: Ritmo, Rimas e Estilo',
            'A Poesia Marginal e o Slam: Expressão Social',
            'Textos Multimodais: Cartazes e Infográficos',
            'Fanzines Literários: Planejamento e Dobradura',
            'Oficina de Escrita Criativa para o Fanzine',
            'Gravação de Podcast Literário e Roteiros',
            'Revisão Final de Ano e Redação Paulista',
            'Celebração do Ano Literário e Exposição de Fanzines'
          ];
          const contents = [
            'A estrutura de estrofes, versos, métrica básica e recursos estilísticos diversos.',
            'Cultura periférica de slam, oralidade, batalhas de poesia e denúncias sociais.',
            'Integração harmônica de elementos verbais e visuais no design gráfico.',
            'História dos fanzines independentes, esboços e formatos de dobradura com papel.',
            'Fusão de poesias, pequenas notícias ou contos e ilustrações feitas à mão.',
            'Técnicas de leitura dramatizada, entonação e roteirização para áudio/podcast.',
            'Revisão ortográfica geral de todos os textos produzidos ao longo do ano letivo.',
            'Varal de fanzines, escuta coletiva de podcasts e autoavaliação anual de leitura.'
          ];
          const objectivesList = [
            'Apreciar poemas variados compreendendo as metáforas e personificações.',
            'Produzir pequenos versos autorais expressando vivências comunitárias.',
            'Interpretar infográficos complexos relacionando imagens a dados estatísticos.',
            'Planejar a distribuição física do fanzine poético-literário individual.',
            'Redigir e ilustrar as páginas internas do fanzine autoral.',
            'Gravar áudio-poemas utilizando celulares para divulgação digital.',
            'Finalizar a última produção multimodal oficial no sistema estadual.',
            'Realizar a autoavaliação do portfólio de escrita expressando os avanços do ano.'
          ];
          
          titulo = titles[i - 1] || 'Poesia, Multimodalidade e Expressão';
          conteudo = contents[i - 1] || 'Rimas, figuras de estilo, elementos de diagramação multimodal.';
          objetivos = objectivesList[i - 1] || 'Criar textos multimodais (fanzines/infográficos) e expressivos.';
          habilidade = 'EF69LP48: Produzir textos literários e multimodais adequados à proposta estilística escolhida.';
          aprendizagem = 'Gêneros Poéticos e Multimodais: Slam, Fanzine e Infográfico. Produções artísticas integradas.';
        }
        
        data.push({
          id: `rl-generated-${grade.replace(/\s+/g, '-')}-${bimester.replace(/\s+/g, '-')}-${i}`,
          ano: grade,
          bimestre: bimester,
          aula: aulaStr,
          titulo: titulo,
          conteudo: conteudo,
          objetivos: objetivos,
          habilidade: habilidade,
          aprendizagem: aprendizagem
        });
      }
    }
  }
  
  return data;
}

// Export pre-generated dynamic arrays matching the existing design of App.tsx
export const PROJETO_DE_VIDA_DATA = generateProjetoVida();
export const TECNOLOGIA_INOVACAO_DATA = generateTecnologiaInovacao();
export const ORIENTACAO_ESTUDO_MATEMATICA_DATA = generateOrientacaoEstudoMatematica();
export const ORIENTACAO_ESTUDO_PORTUGUES_DATA = generateOrientacaoEstudoPortugues();
export const EDUCACAO_FINANCEIRA_DATA = generateEducacaoFinanceira();
export const REDACAO_LEITURA_DATA = generateRedacaoLeitura();
