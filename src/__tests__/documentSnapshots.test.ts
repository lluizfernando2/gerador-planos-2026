import { describe, it, expect } from 'vitest';
import { buildDocumentHTML } from '../lib/documentGenerator';
import { buildAvaEfapeDocumentHTML } from '../data/subjectMappings';

describe('Document Generation Snapshots (Baseline Characterization)', () => {
  const fixedSchool = 'E.E. Professora Maria José - Diretoria Centro - São Paulo';
  const fixedDocente = 'Prof. Dr. João de Alcântara e Silva';
  const fixedSegmento = 'Ensino Fundamental - Anos Finais';
  const fixedComponente = 'Matemática';
  const fixedSerie = '7º Ano';
  const fixedBimestre = '1º Bimestre';

  const fixedWeeks = [
    {
      semana: 'Semana 1 (02/02 a 06/02/2026)',
      aulas_escopo: 'Aula 1, Aula 2',
      conteudo: 'Operações com Números Inteiros e Frações\nLinha 2 com acentuação e pontuação: á, é, í, ó, ú, ç, ã.',
      habilidade: 'EF07MA03 - Ler, comparar e ordenar números inteiros em diferentes contextos.',
      ae: '<li>Reconhecer e aplicar números inteiros em situações reais.</li><li>Comparar grandezas numéricas com precisão.</li>',
      recursos: 'Livro didático, quadro branco, régua de fração.',
      avaliacao: 'Participação nas discussões iniciais e registro no caderno escolar.'
    },
    {
      semana: 'Semana 2 (09/02 a 13/02/2026)',
      aulas_escopo: 'Aula 3, Aula 4, Aula 5',
      conteudo: 'Adição e Subtração de Números Inteiros:\nPropriedades fundamentais e cálculo mental.',
      habilidade: 'EF07MA04 - Resolver e elaborar situações-problema com números inteiros.',
      ae: '<li>Calcular adição e subtração de inteiros sem calculadora.</li>',
      recursos: 'Caderno do Aluno SP Faz Escola, jogos pedagógicos de tabuleiro.',
      avaliacao: 'Resolução colaborativa de situações-problema em duplas.'
    }
  ];

  it('characterizes buildDocumentHTML output (Modelo Oficial 1 - Campinas Leste)', () => {
    const html = buildDocumentHTML(
      fixedSchool,
      fixedDocente,
      fixedSegmento,
      fixedComponente,
      fixedSerie,
      fixedBimestre,
      fixedWeeks,
      '15/03/2026',
      '25/03/2026'
    );
    expect(html).toMatchSnapshot();
  });

  it('characterizes buildAvaEfapeDocumentHTML output (Modelo Oficial 2 - AVA-EFAPE)', () => {
    const selectedLessons = [
      { id: '1', title: 'Aula Inaugural de Frações', desc: 'Introdução com materiais concretos.' }
    ];
    const html = buildAvaEfapeDocumentHTML(
      fixedSchool,
      fixedDocente,
      fixedSegmento,
      fixedComponente,
      fixedSerie,
      fixedBimestre,
      selectedLessons,
      fixedWeeks,
      '10/03/2026',
      '20/03/2026'
    );
    expect(html).toMatchSnapshot();
  });
});
