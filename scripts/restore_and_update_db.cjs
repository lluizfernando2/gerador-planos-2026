const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const dataDir = path.join(rootDir, 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const pdfPath = path.join(rootDir, 'codigo_completo_app.pdf');
  const parser = new PDFParse({ data: fs.readFileSync(pdfPath) });
  await parser.load();
  const res = await parser.getText();

  function extractFileCode(fileNum, nextFileNum) {
    const s = res.text.indexOf('[Arquivo ' + fileNum + '/99]');
    const e = res.text.indexOf('[Arquivo ' + nextFileNum + '/99]');
    if (s === -1 || e === -1) {
      console.warn('Could not find boundaries for file', fileNum);
      return '';
    }
    const raw = res.text.substring(s, e);
    const lines = raw.split('\n');
    
    const codeLines = [];
    for (const l of lines) {
      if (l.startsWith('[Arquivo') || l.startsWith('Linhas:') || l.includes('of 1375') || l.includes('(continuação)')) {
        continue;
      }
      const match = l.match(/^\s*(\d+)\s*\|\s?(.*)$/);
      if (match) {
        codeLines.push({ num: parseInt(match[1]), text: match[2] });
      }
    }
    return codeLines.map(c => c.text).join('\n');
  }

  // 1. curriculumData.ts (59)
  const curriculumDataCode = extractFileCode(59, 60);
  fs.writeFileSync(path.join(dataDir, 'curriculumData.ts'), curriculumDataCode);
  console.log('Restored curriculumData.ts');

  // 2. diversificadaData.ts (60)
  const diversificadaCode = extractFileCode(60, 61);
  fs.writeFileSync(path.join(dataDir, 'diversificadaData.ts'), diversificadaCode);
  console.log('Restored diversificadaData.ts');

  // 3. itinerariosEMData.ts (61)
  const itinerariosCode = extractFileCode(61, 62);
  fs.writeFileSync(path.join(dataDir, 'itinerariosEMData.ts'), itinerariosCode);
  console.log('Restored itinerariosEMData.ts');

  // 4. logoSp.ts
  const logoContent = `export const LOGO_SP_BASE64 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 65' width='400' height='65'><rect width='400' height='65' fill='transparent'/><text x='10' y='28' font-family='Arial, Helvetica, sans-serif' font-weight='900' font-size='19' fill='%231a1a1a' letter-spacing='1'>SÃO PAULO</text><text x='10' y='46' font-family='Arial, Helvetica, sans-serif' font-weight='700' font-size='11' fill='%23555555' letter-spacing='0.5'>GOVERNO DO ESTADO</text><line x1='165' y1='10' x2='165' y2='55' stroke='%23cccccc' stroke-width='1.5'/><text x='180' y='36' font-family='Arial, Helvetica, sans-serif' font-weight='600' font-size='13' fill='%23333333'>Secretaria da Educação</text></svg>";\n`;
  fs.writeFileSync(path.join(dataDir, 'logoSp.ts'), logoContent);
  console.log('Restored logoSp.ts');

  // 5. recoveryData2026.ts (keep clean if exists)
  if (!fs.existsSync(path.join(dataDir, 'recoveryData2026.ts'))) {
    const recoveryDataCode = extractFileCode(63, 64);
    fs.writeFileSync(path.join(dataDir, 'recoveryData2026.ts'), recoveryDataCode);
    console.log('Restored recoveryData2026.ts');
  }

  // 6. recoveryTemplates.ts (keep clean if exists)
  if (!fs.existsSync(path.join(dataDir, 'recoveryTemplates.ts'))) {
    const recoveryTemplatesCode = extractFileCode(64, 65);
    fs.writeFileSync(path.join(dataDir, 'recoveryTemplates.ts'), recoveryTemplatesCode);
    console.log('Restored recoveryTemplates.ts');
  }

  // 7. socioemocionalDatabase.ts (keep clean if exists)
  if (!fs.existsSync(path.join(dataDir, 'socioemocionalDatabase.ts'))) {
    const socioemocionalCode = extractFileCode(65, 66);
    fs.writeFileSync(path.join(dataDir, 'socioemocionalDatabase.ts'), socioemocionalCode);
    console.log('Restored socioemocionalDatabase.ts');
  }

  // 8. subjectMappings.ts (keep clean if exists)
  if (!fs.existsSync(path.join(dataDir, 'subjectMappings.ts'))) {
    const subjectMappingsCode = extractFileCode(66, 67);
    fs.writeFileSync(path.join(dataDir, 'subjectMappings.ts'), subjectMappingsCode);
    console.log('Restored subjectMappings.ts');
  }

  // 9. tecnicoData.ts (67)
  const tecnicoCode = extractFileCode(67, 68);
  fs.writeFileSync(path.join(dataDir, 'tecnicoData.ts'), tecnicoCode);
  console.log('Restored tecnicoData.ts');

  // 10. questionRepositories.ts
  const questionRepositoriesCode = `export interface QuestionRepository {
  id: string;
  name: string;
  organization: string;
  description: string;
  category: 'oficial' | 'olimpiada' | 'plataforma' | 'humanas_linguagens';
  url: string;
  tags: string[];
  subjects: string[];
  featured?: boolean;
}

export const QUESTION_REPOSITORIES: QuestionRepository[] = [
  {
    id: 'inep-banco',
    name: 'Banco de Itens do INEP / SAEB',
    organization: 'INEP / Ministério da Educação',
    description: 'Questões públicas e matrizes de referência do SAEB, Prova Brasil e ENEM com descritores de aprendizagem por escala de proficiência.',
    category: 'oficial',
    url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/saeb',
    tags: ['Oficial', 'SAEB', 'Descritores', 'Fundamentado'],
    subjects: ['Língua Portuguesa', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas'],
    featured: true
  },
  {
    id: 'efape-prova-paulista',
    name: 'Repositório de Provas e Avaliações SEDUC-SP',
    organization: 'EFAPE / COPED - Secretaria da Educação de SP',
    description: 'Acervo oficial das edições anteriores da Prova Paulista, SARESP e Avaliações Diagnósticas de Entrada (ADE) com gabaritos comentados.',
    category: 'oficial',
    url: 'https://efape.educacao.sp.gov.br/',
    tags: ['SEDUC-SP', 'Prova Paulista', 'SARESP', 'Oficial'],
    subjects: ['Matemática', 'Língua Portuguesa', 'Ciências', 'História', 'Geografia', 'Língua Inglesa', 'Arte', 'Educação Física'],
    featured: true
  },
  {
    id: 'obmep-banco',
    name: 'Portal do Saber & Banco de Questões OBMEP',
    organization: 'IMPA / Sociedade Brasileira de Matemática',
    description: 'Milhares de questões resolvidas e comentadas de todos os níveis (6º ao 9º ano e Ensino Médio) com foco no desenvolvimento do raciocínio lógico.',
    category: 'olimpiada',
    url: 'https://portaldaobmep.impa.br/',
    tags: ['OBMEP', 'Olimpíada', 'Raciocínio Lógico', 'Matemática'],
    subjects: ['Matemática'],
    featured: true
  },
  {
    id: 'omasp-olimpiada',
    name: 'OMASP - Olimpíada de Matemática de São Paulo',
    organization: 'SEDUC-SP / Polo Olímpico',
    description: 'Provas e questões modelo da Olimpíada de Matemática das Escolas Estaduais de São Paulo com foco nos descritores do Currículo Paulista.',
    category: 'olimpiada',
    url: 'https://efape.educacao.sp.gov.br/curriculopaulista/',
    tags: ['OMASP', 'SEDUC-SP', 'Olimpíada Estadual', 'Matemática'],
    subjects: ['Matemática'],
    featured: true
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy Brasil - Alinhado BNCC',
    organization: 'Fundação Lemann / Khan Academy',
    description: 'Plataforma com exercícios interativos alinhados às habilidades da BNCC e Currículo Paulista com relatórios de domínio e progressão.',
    category: 'plataforma',
    url: 'https://pt.khanacademy.org/',
    tags: ['Interativo', 'BNCC', 'Gamificado', 'Gratuito'],
    subjects: ['Matemática', 'Ciências'],
    featured: true
  },
  {
    id: 'redacao-paulista',
    name: 'Plataforma Redação Paulista',
    organization: 'SEDUC-SP',
    description: 'Propostas temáticas oficiais de produção textual com critérios de correção e temas bimestrais para todos os anos do EF e EM.',
    category: 'humanas_linguagens',
    url: 'https://redacao.educacao.sp.gov.br/',
    tags: ['SEDUC-SP', 'Redação', 'Produção Textual', 'Oficial'],
    subjects: ['Língua Portuguesa', 'Redação e Leitura'],
    featured: true
  },
  {
    id: 'dominio-publico',
    name: 'Portal Domínio Público',
    organization: 'MEC - Ministério da Educação',
    description: 'Biblioteca digital oficial com textos clássicos da literatura brasileira, crônicas, poesias, relatórios históricos e acervo cultural.',
    category: 'humanas_linguagens',
    url: 'http://www.dominiopublico.gov.br/',
    tags: ['Literatura', 'História', 'Acervo Aberto', 'MEC'],
    subjects: ['Língua Portuguesa', 'História', 'Arte', 'Filosofia'],
    featured: false
  },
  {
    id: 'bncc-consulta',
    name: 'Plataforma de Consulta Curricular BNCC',
    organization: 'Ministério da Educação',
    description: 'Base oficial de dados estruturada com todas as competências gerais, habilidades e objetos de conhecimento do Ensino Fundamental.',
    category: 'oficial',
    url: 'http://basenacionalcomum.mec.gov.br/abase/',
    tags: ['BNCC', 'Matriz Oficial', 'Habilidades'],
    subjects: ['Matemática', 'Língua Portuguesa', 'Ciências', 'História', 'Geografia', 'Língua Inglesa', 'Arte', 'Educação Física'],
    featured: true
  }
];
`;
  fs.writeFileSync(path.join(dataDir, 'questionRepositories.ts'), questionRepositoriesCode);
  console.log('Restored questionRepositories.ts');
}

main().catch(console.error);
