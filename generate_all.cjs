const fs = require('fs');

const grades = ['1ª Série', '2ª Série', '3ª Série'];
const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];

let data = [];

function addClasses(disc, grade, bim, aulas) {
  for (const aula of aulas) {
    data.push({
      id: `${disc}-${grade}-${bim}-${aula}`,
      disciplina: disc,
      ano: grade,
      bimestre: bim,
      aula: String(aula),
      titulo: "",
      conteudo: "",
      objetivos: "",
      eixo: "",
      unidadeTematica: "",
      habilidade: ""
    });
  }
}

// Aprofundamentos
const aprofundamentos = [
  'Aprofundamento em Biologia',
  'Aprofundamento em Filosofia',
  'Aprofundamento em Geografia',
  'Aprofundamento em Química',
  'Aprofundamento em Sociologia',
  'Arte e Mídias Digitais',
  'Atualidades',
  'Empreendedorismo',
  'Liderança e Oratória',
  'Língua Inglesa'
];

for (const disc of aprofundamentos) {
  for (const grade of grades) {
    for (const bim of bimestres) {
      let limit = (bim === '1º Bimestre' || bim === '2º Bimestre') ? 14 : 12;
      let aulas = [];
      for(let i=1; i<=limit; i++) aulas.push(i);
      addClasses(disc, grade, bim, aulas);
    }
  }
}

// Programação - apenas 2ª série
let progBims = {
  '1º Bimestre': { start: 1, end: 11 },
  '2º Bimestre': { start: 12, end: 21 },
  '3º Bimestre': { start: 26, end: 34 },
  '4º Bimestre': { start: 35, end: 45 }
};
for (const bim of bimestres) {
  let aulas = [];
  for(let i=progBims[bim].start; i<=progBims[bim].end; i++) aulas.push(i);
  addClasses('Programação', '2ª Série', bim, aulas);
}

// Parte Diversificada
// Redação e Leitura: aulas duplas 1 até 8
for (const grade of grades) {
  for (const bim of bimestres) {
    let aulas = [];
    for(let i=1; i<=8; i++) aulas.push(i);
    addClasses('Redação e Leitura', grade, bim, aulas);
    addClasses('Projeto de Vida', grade, bim, [1,2,3,4,5,6,7]);
    addClasses('Educação Financeira', grade, bim, [1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
  }
}

const out = `import { CurriculumItem } from '../types';
export const itinerariosEMData: CurriculumItem[] = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '$1:')};`;
fs.writeFileSync('src/data/itinerariosEMData.ts', out);
