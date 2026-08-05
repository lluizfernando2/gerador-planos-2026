export interface QuestionRepository {
  id: string;
  name: string;
  organization: string;
  description: string;
  url: string;
  category: 'oficial' | 'olimpiada' | 'plataforma' | 'humanas_linguagens';
  tags: string[];
  subjects: string[];
}

export const QUESTION_REPOSITORIES: QuestionRepository[] = [
  {
    id: 'inep-enem',
    name: 'Provas e Gabaritos do ENEM (Acervo Oficial)',
    organization: 'INEP / Ministério da Educação',
    description: 'Acervo oficial contendo todas as provas e gabaritos do Exame Nacional do Ensino Médio (ENEM) desde 1998. Essencial para selecionar questões complexas, interdisciplinares e contextualizadas para o Ensino Médio nas quatro áreas do conhecimento.',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos',
    category: 'oficial',
    tags: ['Oficial', 'Ensino Médio', 'Gabaritado', 'Nacional'],
    subjects: ['Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Linguagens']
  },
  {
    id: 'inep-saeb',
    name: 'Banco de Itens e Descritores do SAEB',
    organization: 'INEP / Ministério da Educação',
    description: 'Bancos de avaliações do Sistema de Avaliação da Educação Básica (SAEB). Fornece as escalas de proficiência e exemplos de itens de Língua Portuguesa (com foco em leitura, coerência e interpretação textual) e Matemática, excelentes para preparar simulados de Anos Finais.',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/saeb/matrizes-e-escalas',
    category: 'oficial',
    tags: ['Oficial', 'Proficiência', 'Anos Finais', 'Linguagens', 'Matemática'],
    subjects: ['Linguagens', 'Matemática']
  },
  {
    id: 'inep-encceja',
    name: 'Provas e Gabaritos Oficiais do ENCCEJA',
    organization: 'INEP / Ministério da Educação',
    description: 'Cadernos de prova oficiais do Exame Nacional para Certificação de Competências de Jovens e Adultos (Encceja). Oferece questões de cunho altamente cotidiano, prático e cidadão para o Ensino Fundamental e Médio, abrangendo Linguagens e Ciências Humanas.',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/encceja/provas-e-gabaritos',
    category: 'oficial',
    tags: ['Oficial', 'Didático', 'Cidadania', 'Linguagens', 'Ciências Humanas'],
    subjects: ['Linguagens', 'Ciências Humanas', 'Matemática', 'Ciências da Natureza']
  },
  {
    id: 'onhb-unicamp',
    name: 'Olimpíada Nacional em História do Brasil (ONHB)',
    organization: 'Universidade Estadual de Campinas (UNICAMP)',
    description: 'Excelente banco de questões multidisciplinares e históricas baseadas em análise de fontes primárias, imagens, canções, charges, textos literários e documentos de época. Ideal para desenvolver o pensamento crítico nos Anos Finais e Ensino Médio.',
    url: 'https://www.olimpiadadehistoria.com.br/',
    category: 'olimpiada',
    tags: ['História', 'Ciências Humanas', 'Fontes Primárias', 'Desafios'],
    subjects: ['História', 'Geografia', 'Sociologia']
  },
  {
    id: 'obind-unicamp',
    name: 'Olimpíada de História e Cultura Indígena e Africana',
    organization: 'Departamento de História / UNICAMP',
    description: 'Plataforma com atividades e propostas de debate focadas na Lei 10.639 e Lei 11.645. Oferece materiais iconográficos, cartografias antigas e textos críticos sobre representação social, sendo um tesouro para formular questões de História e Sociologia.',
    url: 'https://www.ifch.unicamp.br/ifch/noticias-eventos/noticias/olimpiada-historia-cultura-africana-afro-brasileira-indigena',
    category: 'olimpiada',
    tags: ['Cultura Indígena', 'História Afro', 'Relações Étnico-Raciais', 'Humanas'],
    subjects: ['História', 'Sociologia', 'Filosofia']
  },
  {
    id: 'escrevendo-futuro',
    name: 'Olimpíada de Língua Portuguesa - Escrevendo o Futuro',
    organization: 'CENPEC / Fundação Itaú',
    description: 'Incrível acervo de sequências didáticas e produções textuais comentadas por especialistas nos gêneros: Poema, Memórias Literárias, Crônica, Documentário e Artigo de Opinião. Excelente material para professores de Língua Portuguesa e Produção de Texto.',
    url: 'https://www.escrevendoofuturo.org.br/',
    category: 'humanas_linguagens',
    tags: ['Língua Portuguesa', 'Gêneros Textuais', 'Sequências Didáticas', 'Redação'],
    subjects: ['Linguagens']
  },
  {
    id: 'comvest-unicamp',
    name: 'Provas Anteriores e Expectativas da UNICAMP',
    organization: 'Comissão Permanente para os Vestibulares (COMVEST)',
    description: 'O vestibular da Unicamp é nacionalmente reconhecido por suas questões criativas de Humanas e Linguagens, além de redações focadas em gêneros discursivos específicos (como cartas argumentativas, manifestos, resenhas e roteiros). Útil para o aprofundamento do Ensino Médio.',
    url: 'https://www.comvest.unicamp.br/',
    category: 'oficial',
    tags: ['Vestibular', 'Campinas', 'Interdisciplinar', 'Gêneros Redação'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Sociologia', 'Filosofia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'fuvest-usp',
    name: 'Acervo de Provas e Resoluções da FUVEST (USP)',
    organization: 'Fundação Universitária para o Vestibular',
    description: 'Bancos de exames de primeira e segunda fase para ingresso na Universidade de São Paulo (USP). Oferece questões de alto rigor acadêmico, exigindo forte capacidade analítica, leitura de clássicos literários e correlação histórica.',
    url: 'https://www.fuvest.br/acervo-vestibular',
    category: 'oficial',
    tags: ['USP', 'Rigor Acadêmico', 'Segunda Fase', 'Gabaritado'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'provao-paulista',
    name: 'Provão Paulista Seriado (Acervo Oficial)',
    organization: 'Secretaria da Educação de São Paulo / Vunesp',
    description: 'Portal oficial do Provão Paulista Seriado, exame unificado de acesso direto às universidades públicas paulistas (USP, UNESP, UNICAMP, FATEC e UNIVESP) voltado para alunos do Ensino Médio da rede pública estadual.',
    url: 'https://provaopaulistaseriado.vunesp.com.br/',
    category: 'oficial',
    tags: ['Oficial', 'São Paulo', 'Ensino Médio', 'Vestibular'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Sociologia', 'Filosofia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'unesp-vestibular',
    name: 'Vestibular Vunesp (Acervo UNESP)',
    organization: 'Fundação Vunesp',
    description: 'Provas e gabaritos comentados do vestibular da Universidade Estadual Paulista. As questões de História, Geografia, Filosofia e Sociologia da UNESP são famosas pela abordagem baseada em direitos humanos, análise literária e debate contemporâneo.',
    url: 'https://www.vunesp.com.br/',
    category: 'oficial',
    tags: ['Vunesp', 'UNESP', 'Humanidades', 'Direitos Humanos'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Sociologia', 'Filosofia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'dominiopublico-mec',
    name: 'Biblioteca Digital Domínio Público (MEC)',
    organization: 'Ministério da Educação',
    description: 'Repositório oficial que disponibiliza gratuitamente milhares de obras literárias, artísticas e científicas em texto e som. Fonte indispensável para o professor extrair trechos de clássicos da literatura brasileira e portuguesa para formular questões de interpretação textual de forma fidedigna.',
    url: 'http://www.dominiopublico.gov.br/',
    category: 'humanas_linguagens',
    tags: ['Literatura', 'Clássicos', 'Interpretação', 'Biblioteca Gratuita'],
    subjects: ['Linguagens', 'História']
  },
  {
    id: 'ibge-educa',
    name: 'IBGE Educa (Mapas, Gráficos e Dados Oficiais)',
    organization: 'Instituto Brasileiro de Geografia e Estatística',
    description: 'Portal educativo oficial do IBGE que fornece infográficos interativos, dados demográficos, atlas geográficos escolares e estatísticas atualizadas do Brasil. Ideal para professores de Geografia, História e Sociologia montarem questões baseadas em tabelas estatísticas e mapas reais.',
    url: 'https://educa.ibge.gov.br/',
    category: 'humanas_linguagens',
    tags: ['Geografia', 'Demografia', 'Mapas', 'Dados Oficiais'],
    subjects: ['Geografia', 'Sociologia', 'História']
  },
  {
    id: 'obmep-banco',
    name: 'Banco de Questões e Provas da OBMEP',
    organization: 'Olimpíada Brasileira de Matemática das Escolas Públicas',
    description: 'Provas anteriores completas e bancos de questões divididos em três níveis: Nível 1 (6º e 7º anos), Nível 2 (8º e 9º anos) e Nível 3 (Ensino Médio). Ideal para trabalhar raciocínio lógico, criatividade e resolução de problemas.',
    url: 'https://www.obmep.org.br/provas.htm',
    category: 'olimpiada',
    tags: ['Olimpíada', 'Raciocínio Lógico', 'Fundamental e Médio', 'Gratuito'],
    subjects: ['Matemática']
  },
  {
    id: 'portal-matematica',
    name: 'Portal da Matemática (OBMEP / IMPA)',
    organization: 'Instituto de Matemática Pura e Aplicada',
    description: 'Plataforma oficial com módulos de estudos completos, apostilas de exercícios resolvidos e milhares de questões gravadas em vídeo. Excelente recurso para aprofundar tópicos de álgebra, geometria e probabilidade.',
    url: 'https://portaldamatematica.obmep.org.br/',
    category: 'plataforma',
    tags: ['Exercícios', 'Videoaulas', 'Apostilas', 'Interativo'],
    subjects: ['Matemática']
  },
  {
    id: 'saresp-provas',
    name: 'Acervo de Provas Anteriores do SARESP',
    organization: 'Secretaria da Educação do Estado de São Paulo',
    description: 'Provas oficiais e gabaritos aplicados nas edições anteriores do Sistema de Avaliação de Rendimento Escolar do Estado de São Paulo. Recurso fundamental para alinhar o nível das avaliações escolares com os padrões estaduais e paulistas de proficiência.',
    url: 'https://www.vunesp.com.br',
    category: 'oficial',
    tags: ['Oficial', 'São Paulo', 'Avaliação Larga Escala'],
    subjects: ['Matemática', 'Linguagens', 'Ciências da Natureza', 'Ciências Humanas']
  },
  {
    id: 'obf-provas',
    name: 'Provas e Gabaritos da Olimpíada Brasileira de Física (OBF)',
    organization: 'Sociedade Brasileira de Física (SBF)',
    description: 'Repositório de exames anteriores da OBF cobrindo desde o 9º ano do Ensino Fundamental até a 3ª série do Ensino Médio. Contém problemas de física clássica, termodinâmica, óptica e física moderna para enriquecimento curricular.',
    url: 'http://www.sbfisica.org.br/v1/obf/',
    category: 'olimpiada',
    tags: ['Olimpíada', 'Física', 'Ensino Médio', 'Aprofundado'],
    subjects: ['Física', 'Ciências']
  },
  {
    id: 'obq-banco',
    name: 'Portal da Olimpíada Brasileira de Química (OBQ)',
    organization: 'Associação Brasileira de Química (ABQ)',
    description: 'Banco de exames e recursos teóricos de olimpíadas regionais e nacionais de química. Destinado a estudantes do Ensino Médio e Anos Finais, com foco em reações, química geral, orgânica, analítica e inorgânica.',
    url: 'https://obquimica.org/',
    category: 'olimpiada',
    tags: ['Olimpíada', 'Química', 'Ensino Médio', 'Desafios'],
    subjects: ['Química', 'Ciências']
  },
  {
    id: 'oba-provas',
    name: 'Provas Anteriores da Olimpíada de Astronomia (OBA)',
    organization: 'Sociedade Astronômica Brasileira (SAB)',
    description: 'Bancos de questões de astronomia, astrofísica, astronáutica e gravitação universal. Excelente ferramenta para professores de Geografia, Ciências e Física elaborarem atividades desafiadoras de ciências espaciais.',
    url: 'http://www.oba.org.br/',
    category: 'olimpiada',
    tags: ['Olimpíada', 'Astronomia', 'Geografia', 'Ciências'],
    subjects: ['Geografia', 'Física', 'Ciências']
  },
  {
    id: 'olimpiada-geografia',
    name: 'Olimpíada Brasileira de Geografia (OBG)',
    organization: 'Comissão Organizadora OBG',
    description: 'Bancos de provas anteriores voltados para Geografia Física, Geopolítica, Meio Ambiente e Cartografia. Contém questões contemporâneas fantásticas baseadas na leitura de mapas temáticos, sensoriamento remoto e climatologia para Anos Finais e Ensino Médio.',
    url: 'https://obgeografia.org/',
    category: 'olimpiada',
    tags: ['Geografia', 'Cartografia', 'Geopolítica', 'Análise de Mapas'],
    subjects: ['Geografia']
  },
  {
    id: 'khan-academy',
    name: 'Plataforma de Exercícios Khan Academy',
    organization: 'Khan Academy Brasil',
    description: 'Extensa base de exercícios interativos estruturada por anos de ensino e disciplinas de Ciências, Física, Química, Biologia, Língua Portuguesa e Matemática, totalmente alinhada à Base Nacional Comum Curricular (BNCC).',
    url: 'https://pt.khanacademy.org/',
    category: 'plataforma',
    tags: ['Plataforma', 'Exercícios BNCC', 'Prática', 'Gratuito'],
    subjects: ['Matemática', 'Física', 'Química', 'Biologia', 'Ciências', 'Linguagens']
  },
  {
    id: 'uol-redacao',
    name: 'Banco de Propostas e Redações Corrigidas',
    organization: 'UOL Vestibulares',
    description: 'Repositório de propostas de produção de texto e temas de redação aplicados em exames renomados do Brasil. Inclui modelos de redações reais analisados e comentados por especialistas, ideal para professores de Língua Portuguesa.',
    url: 'https://vestibular.uol.com.br/redacao/',
    category: 'humanas_linguagens',
    tags: ['Redação', 'Argumentação', 'Língua Portuguesa', 'Vestibulares'],
    subjects: ['Linguagens']
  },
  {
    id: 'redacao-nota-1000',
    name: 'Redação Nota 1000 (Temas e Critérios)',
    organization: 'Plataforma Redação Nota 1000',
    description: 'Banco de temas de redação focados em problemáticas sociais, políticas e ambientais brasileiras contemporâneas. Traz exemplos de redações com nota máxima com análises detalhadas de critérios como repertório sociocultural e coesão textual.',
    url: 'https://redacaonota1000.com.br/',
    category: 'humanas_linguagens',
    tags: ['Redação', 'Dissertação', 'Critérios ENEM', 'Repertório'],
    subjects: ['Linguagens', 'Ciências Humanas']
  },
  {
    id: 'portal-bicentenario',
    name: 'Portal do Bicentenário - Acervo de Sequências Didáticas',
    organization: 'Associação Nacional de Pós-Graduação em Educação (ANPEd)',
    description: 'Portal educacional de acesso aberto com foco em Ciências Humanas, História, Geografia, Filosofia e Sociologia. Reúne recursos históricos primários, planos de aula estruturados e propostas de roteiros para análise documental e contextualizada.',
    url: 'https://portaldobicentenario.org.br/',
    category: 'humanas_linguagens',
    tags: ['Humanas', 'História', 'Geografia', 'Recursos Abertos'],
    subjects: ['História', 'Geografia', 'Sociologia', 'Filosofia']
  },
  {
    id: 'bvps-sociologia',
    name: 'Biblioteca Virtual do Pensamento Social Brasileiro (BVPS)',
    organization: 'BVPS / Universidade Federal do Rio de Janeiro (UFRJ)',
    description: 'Coletânea rica de documentos históricos, resenhas acadêmicas e ensaios críticos sobre a estrutura social, étnica, política e cultural do Brasil. Excelente para formular questões discursivas complexas e contextualizadas de Sociologia e História.',
    url: 'https://blogdabvps.com/',
    category: 'humanas_linguagens',
    tags: ['Pensamento Social', 'Sociologia', 'Ensaísmo', 'Documentação'],
    subjects: ['Sociologia', 'História', 'Filosofia']
  },
  {
    id: 'casa-rui-barbosa',
    name: 'Acervo Histórico Fundação Casa de Rui Barbosa',
    organization: 'Ministério da Cultura / FCRB',
    description: 'Acervo e biblioteca contendo caricaturas históricas, charges da Primeira República, cartas manuscritas de intelectuais e periódicos antigos. Recurso valiosíssimo para professores coletarem textos e imagens para construir itens críticos de Humanas.',
    url: 'http://casaruibarbosa.gov.br/',
    category: 'humanas_linguagens',
    tags: ['Iconografia', 'Charges Históricas', 'Cartas', 'Pesquisa'],
    subjects: ['História', 'Linguagens']
  },
  {
    id: 'cederj-vestibular',
    name: 'Provas e Gabaritos Comentados do Consórcio CEDERJ',
    organization: 'Fundação CECIERJ / Vestibular CEDERJ',
    description: 'Provas comentadas passo a passo de exames aplicados em conjunto por universidades do Rio de Janeiro (como UFRJ, UFF, UERJ, UNIRIO). Destaque para questões muito didáticas com excelente nível de análise de imagens, mapas regionais e fontes literárias.',
    url: 'https://www.cecierj.edu.br/consorcio-cederj/vestibular/provas-anteriores/',
    category: 'oficial',
    tags: ['Vestibular', 'CECIERJ', 'Provas Comentadas', 'Interdisciplinar'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'super-vestibular',
    name: 'Super Vestibular (Banco de Exercícios e Dicas)',
    organization: 'Portal Brasil Escola / UOL',
    description: 'Ampla base de dados contendo exercícios escolares resolvidos e classificados por tópicos específicos de Gramática, Literatura Brasileira, História Geral, Geografia Física e Cartografia. Excelente para fixação e lição de casa.',
    url: 'https://supervestibular.brasilescola.uol.com.br/',
    category: 'plataforma',
    tags: ['Exercícios Resolvidos', 'Literatura', 'Gramática', 'Geografia Humana'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Sociologia', 'Filosofia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'estuda-com',
    name: 'Banco de Questões e Avaliações Estuda.com',
    organization: 'Estuda.com',
    description: 'Comunidade e banco de questões escolar gratuito. Oferece mecanismos avançados de busca por habilidades BNCC específicas, temas escolares e vestibulares regionais, permitindo visualizar estatísticas de taxa de acerto por questão.',
    url: 'https://estuda.com/',
    category: 'plataforma',
    tags: ['Banco de Itens', 'Busca por Habilidade', 'Estatística de Acerto'],
    subjects: ['Matemática', 'História', 'Geografia', 'Física', 'Química', 'Biologia', 'Linguagens', 'Sociologia', 'Filosofia']
  },
  {
    id: 'ufrgs-vestibular',
    name: 'Acervo Histórico de Provas da UFRGS',
    organization: 'Universidade Federal do Rio Grande do Sul',
    description: 'A UFRGS é reconhecida nacionalmente pela altíssima qualidade de suas provas de Literatura e Língua Portuguesa (com leitura de leituras obrigatórias clássicas) e História do Brasil meridional. Excelente material para aprofundamento crítico.',
    url: 'https://www.ufrgs.br/coperse/provas-de-vestibulares-anteriores/',
    category: 'oficial',
    tags: ['UFRGS', 'Rigor Acadêmico', 'Leituras Obrigatórias'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Matemática', 'Física', 'Química', 'Biologia']
  },
  {
    id: 'qconcursos-banco',
    name: 'Banco de Questões de Vestibulares do QConcursos',
    organization: 'Plataforma QConcursos',
    description: 'Uma das maiores ferramentas de busca e filtragem de questões de vestibulares, ENEM e exames do país. Permite realizar consultas gratuitas parametrizadas por disciplina, sub-área, nível de complexidade e ano.',
    url: 'https://www.qconcursos.com/',
    category: 'plataforma',
    tags: ['Busca de Questões', 'Filtro por Disciplina', 'Acesso Gratuito'],
    subjects: ['Matemática', 'História', 'Geografia', 'Física', 'Química', 'Biologia', 'Linguagens', 'Sociologia', 'Filosofia']
  },
  {
    id: 'caed-ufjf',
    name: 'CAEd / UFJF - Avaliações Educacionais e Modelos de Itens',
    organization: 'Centro de Políticas Públicas e Avaliação da Educação / UFJF',
    description: 'Referência teórica e metodológica em avaliações de larga escala no Brasil. Oferece materiais educativos que descrevem as matrizes de referência e mostram como itens de prova são construídos com base em descritores de habilidade.',
    url: 'https://institucional.caed.ufjf.br/',
    category: 'oficial',
    tags: ['Metodologia', 'Avaliação Larga Escala', 'Teoria da Resposta ao Item'],
    subjects: ['Matemática', 'Linguagens']
  },
  {
    id: 'projeto-medicina',
    name: 'Projeto Medicina (Bancos de Questões em PDF)',
    organization: 'Projeto Medicina',
    description: 'Excelente portal de acesso gratuito que disponibiliza milhares de listas de exercícios resolvidas em formato PDF para o ENEM e vestibulares. É extremamente completo para as áreas de Ciências Humanas (História, Geografia, Sociologia, Filosofia) e Linguagens (Português, Literatura e Interpretação).',
    url: 'https://projetomedicina.com.br/',
    category: 'humanas_linguagens',
    tags: ['Exercícios PDF', 'ENEM', 'Linguagens', 'Humanas', 'Gratuito'],
    subjects: ['Linguagens', 'História', 'Geografia', 'Sociologia', 'Filosofia']
  },
  {
    id: 'blog-prof-warles',
    name: 'Blog do Professor Warles (Simulados SAEB / Prova Brasil)',
    organization: 'Professor Warles',
    description: 'Uma das maiores referências do Brasil para professores da rede pública. Oferece centenas de simulados, questionários interativos e arquivos em PDF de Língua Portuguesa (Linguagens) com foco em descritores de leitura e interpretação para os Anos Finais.',
    url: 'https://www.profwarles.blogspot.com/',
    category: 'humanas_linguagens',
    tags: ['Blog de Professor', 'Simulados', 'Linguagens', 'Anos Finais', 'Gratuito'],
    subjects: ['Linguagens']
  },
  {
    id: 'cafe-com-sociologia',
    name: 'Café com Sociologia (Questões e Práticas)',
    organization: 'Prof. Cristiano Bodart e Colaboradores',
    description: 'Blog de excelência acadêmica voltado para o ensino de Ciências Humanas no Ensino Médio. Disponibiliza bancos de questões resolvidos de Sociologia, Filosofia e História, além de sugestões de sequências didáticas e textos de apoio reflexivos.',
    url: 'https://cafecomsociologia.com/',
    category: 'humanas_linguagens',
    tags: ['Blog de Professor', 'Sociologia', 'Filosofia', 'Ensino Médio', 'Gratuito'],
    subjects: ['Sociologia', 'Filosofia', 'História']
  },
  {
    id: 'geografia-visual',
    name: 'Geografia Visual (Análise de Imagens, Mapas e Questões)',
    organization: 'Geografia Visual',
    description: 'Portal gratuito especializado em Geografia Física e Humana. Traz dezenas de artigos, mapas comentados, infográficos e questões de vestibulares focadas em leitura de paisagens, geomorfologia e geopolítica, perfeito para Anos Finais e Médio.',
    url: 'https://geografiavisual.com.br/',
    category: 'humanas_linguagens',
    tags: ['Geografia', 'Cartografia', 'Imagens', 'Anos Finais', 'Gratuito'],
    subjects: ['Geografia']
  },
  {
    id: 'blog-historiando',
    name: 'Historiando (Blog de História e Humanas)',
    organization: 'Prof. Victor de Sousa e Colaboradores',
    description: 'Blog educacional especializado em História Geral e do Brasil. Oferece bancos de questões, resumos temáticos de alto nível, análises de fontes históricas primárias e propostas de redação interdisciplinares para o Anos Finais e Ensino Médio.',
    url: 'https://www.historiando.com.br/',
    category: 'humanas_linguagens',
    tags: ['Blog de Professor', 'História', 'ENEM', 'Fontes Primárias', 'Gratuito'],
    subjects: ['História', 'Sociologia']
  }
];
