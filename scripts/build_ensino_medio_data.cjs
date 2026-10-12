const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

function cleanStr(val) {
  return String(val || '').trim();
}

function createItem(disciplina, ano, bimestre, aula, titulo, conteudo, objetivos, habilidade, aprendizagem) {
  const hab = cleanStr(habilidade);
  const obj = cleanStr(objetivos);
  const tit = cleanStr(titulo);
  const cont = cleanStr(conteudo);
  const ap = cleanStr(aprendizagem);
  const cleanDisc = cleanStr(disciplina);
  const cleanAno = cleanStr(ano);
  const cleanBim = cleanStr(bimestre || '4º Bimestre');
  const cleanAula = String(aula).replace(/Aula\s*/i, '').trim();

  return {
    id: `em-${cleanDisc.toLowerCase().replace(/[^a-z0-9]/g, '')}-${cleanAno.replace(/[^a-z0-9]/g, '')}-${cleanBim.replace(/[^a-z0-9]/g, '')}-${cleanAula}`,
    ano: cleanAno,
    bimestre: cleanBim,
    aula: cleanAula,
    titulo: tit,
    conteudo: cont,
    objetivos: obj,
    habilidade: hab,
    habilidadeCodigo: hab.split(' ')[0] || hab,
    habilidadeTexto: obj,
    aprendizagem: ap || obj,
    disciplina: cleanDisc
  };
}

console.log('Building Ensino Médio FGB data...');
const fgbItems = [];
fs.writeFileSync(
  path.join(dataDir, 'ensinoMedioFgbData.ts'),
  `import { CurriculumItem } from "../types";\n\nexport const ensinoMedioFgbData: CurriculumItem[] = ${JSON.stringify(fgbItems, null, 2)};\n`,
  'utf8'
);

console.log('Building Ensino Médio Diversificada data...');
const divItems = [];
fs.writeFileSync(
  path.join(dataDir, 'ensinoMedioDiversificadaData.ts'),
  `import { CurriculumItem } from "../types";\n\nexport const ensinoMedioDiversificadaData: CurriculumItem[] = ${JSON.stringify(divItems, null, 2)};\n`,
  'utf8'
);

console.log('Building Ensino Médio Itinerários data...');
const itinItems = [];
fs.writeFileSync(
  path.join(dataDir, 'ensinoMedioItinerariosData.ts'),
  `import { CurriculumItem } from "../types";\n\nexport const ensinoMedioItinerariosData: CurriculumItem[] = ${JSON.stringify(itinItems, null, 2)};\n`,
  'utf8'
);

console.log('Building Ensino Médio Técnico data...');
const tecItems = [];
fs.writeFileSync(
  path.join(dataDir, 'ensinoMedioTecnicoData.ts'),
  `import { CurriculumItem } from "../types";\n\nexport const ensinoMedioTecnicoData: CurriculumItem[] = ${JSON.stringify(tecItems, null, 2)};\n`,
  'utf8'
);

console.log('Done!');
