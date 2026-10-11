import { DocumentModelData } from '../documentEngine';
import { DocumentModel, DocBlock, DocTableRow, DocTableCell } from '../model/DocumentModel';
import { getVerificationStrategy } from '../../../lib/documentGenerator';
import { SUBJECT_MAPPINGS } from '../../../data/subjectMappings';

export class PlanningToDocumentAdapter {
  /**
   * Adapts raw planning data into a clean, typed DocumentModel
   */
  public adapt(data: DocumentModelData): DocumentModel {
    const isAvaEfape = data.format === 'ava-efape';
    const margins = data.margins || { top: 15, bottom: 15, left: 15, right: 15 };

    const model: DocumentModel = {
      metadata: {
        title: `Plano de Ensino 2026 - ${data.componente}`,
        docente: data.docente || 'Docente Não Informado',
        escola: data.escola || 'E.E. PROF. FRANCISCO ALVARES',
        componente: data.componente || 'Componente Curricular',
        serie: data.serie || 'Ano/Série',
        bimestre: data.bimestre || 'Bimestre',
        format: isAvaEfape ? 'ava-efape' : 'campinas-leste',
        createdAt: new Date().toISOString(),
      },
      page: {
        paperSize: 'A4',
        widthMm: 297,
        heightMm: 210,
        orientation: 'landscape',
        marginsMm: {
          top: 12.7,
          bottom: 12.7,
          left: 12.7,
          right: 12.7,
        },
      },
      header: {
        schoolName: data.escola || 'E.E. PROF. FRANCISCO ALVARES',
        regionalDirectorate: 'DIRETORIA DE ENSINO / UNIDADE REGIONAL DE ENSINO - SÃO PAULO',
        stateTitle: 'SECRETARIA DE ESTADO DA EDUCAÇÃO DE SÃO PAULO',
        showLogo: true,
      },
      footer: {
        showPageNumbers: true,
        leftText: 'Sede SP • Currículo Priorizado 2026',
        rightText: 'Documento Pedagógico Oficial',
      },
      styles: {
        fontFamily: isAvaEfape ? 'Arial' : 'Cambria',
        baseFontSizePt: 11,
        primaryColorHex: isAvaEfape ? '#1e3a8a' : '#000000',
        lineSpacing: 1.15,
      },
      blocks: [],
    };

    if (isAvaEfape) {
      model.blocks = this.buildAvaEfapeBlocks(data);
    } else {
      model.blocks = this.buildCampinasLesteBlocks(data);
    }

    return model;
  }

  private buildCampinasLesteBlocks(data: DocumentModelData): DocBlock[] {
    const blocks: DocBlock[] = [];

    // Helper for Course string
    const seg = (data.segmento || '').toLowerCase();
    const comp = (data.componente || '').toLowerCase();
    const isTech = seg.includes('técnico') || seg.includes('profissional') || seg.includes('emhp') || comp.includes('técnico');
    const isEF = seg.includes('fundamental') || seg.includes('anos finais') || seg.includes('ef');
    const cursoText = isTech
      ? 'Curso: (      ) ANOS FINAIS   (      ) ENSINO MÉDIO   (  X  ) ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL'
      : isEF
      ? 'Curso: (  X  ) ANOS FINAIS   (      ) ENSINO MÉDIO   (      ) ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL'
      : 'Curso: (      ) ANOS FINAIS   (  X  ) ENSINO MÉDIO   (      ) ENSINO MÉDIO COM HABILITAÇÃO PROFISSIONAL';

    const getBimestreRange = (bim?: string) => {
      if (bim === '1º Bimestre') return '1º (02/02 a 10/04/2026)';
      if (bim === '2º Bimestre') return '2º (23/04 a 08/07/2026)';
      if (bim === '3º Bimestre') return '3º (24/07 a 02/10/2026)';
      return '4º (05/10 a 18/12/2026)';
    };

    const getDatasContent = (bim?: string) => {
      const numSemanas = bim === '4º Bimestre' ? '11 semanas' : '10 semanas';
      let datesList = '';
      if (bim === '1º Bimestre') {
        datesList = '17/02/2026 = Feriado Carnaval\n09 a 13/03/2026 = OMASP\n23 a 27/03/2026 = PROVA PAULISTA 1º BIMESTRE\n03/04/2026 = Feriado Sexta-Feira Santa';
      } else if (bim === '2º Bimestre') {
        datesList = '01/05/2026 = Feriado Dia do Trabalho\n18 a 22/05/2026 = OMASP\n04 e 05/06/2026 = Feriado Corpus Christi\n15 a 19/06/2026 = PROVA PAULISTA 2º BIMESTRE\n09/07/2026 = Feriado Revolução Constitucionalista';
      } else if (bim === '4º Bimestre') {
        datesList = '12/10 = Feriado Nacional\n13/10 = Catavento e Museu da Lingua Portuguesa (?) – Anos Finais\n15/10 = Feriado Escolar\n20/10 = Simulado Provão Paulista e ENEM (Para o Ensino Médio)\n23/10 = Jardim do Conhecimento/Feira\n29 (Linguagens e CN) e 30/10/2026 (Matemática e CH) = SARESP 9º ano (Impresso)\n02/11 = Feriado Nacional\n04 e 05/11/2026 = Provão Paulista Seriado 3ª serie\n10 e 11/11/2026 = Provão Paulista Seriado 2ª serie\n12 e 13/11/2026 = Provão Paulista Seriado 1ª serie\n18 (Linguagens e CN) e 19/11/2026 (Matemática e CH) = SARESP 6º ano (Digital)\n20/11 = Feriado Nacional\n26 (Linguagens e CN) e 27/11/2026 (Matemática e CH) = SARESP 7º ano (Digital)\n28/11 = Feriado Escolar Dia do Servidor Publico\n30/11 (Linguagens e CN) e 01/12/2026 (Matemática e CH) = SARESP 8º ano (Digital)\n02/12 e (Linguagens e CN) 03/12/2026 = Reposição SARESP\n07, 08 e 09/12 = Recuperação Semestral da SEDUC\n08/12 = Feriado Municipal';
      } else {
        datesList = '07/09/2026 = Feriado Independência do Brasil\n27 a 30/07/2026 = Recuperação e Aprofundamento\n03 a 07/08/2026 = Prova de Recuperação\n24 a 28/08/2026 = OLISP\n21 a 25/09/2026 = PROVA PAULISTA 3º BIMESTRE';
      }
      return `${numSemanas}\n\nDatas:\n${datesList}`;
    };

    // 1. IDENTIFICATION TABLE (6 Rows, 3 Structural Columns)
    const idRows: DocTableRow[] = [
      // Row 1: Escola
      {
        cantSplit: true,
        backgroundColorHex: '#C4BC96',
        cells: [
          {
            text: (data.escola || 'E.E. PROF. FRANCISCO ALVARES').toUpperCase(),
            bold: true,
            align: 'center',
            colSpan: 3,
            backgroundColorHex: '#C4BC96',
            fontSizePt: 11,
          },
        ],
      },
      // Row 2: Title
      {
        cantSplit: true,
        backgroundColorHex: '#C4BC96',
        cells: [
          {
            text: 'PLANO DE ENSINO COM DESENVOLVIMENTO DO PLANO DE AULA',
            bold: true,
            align: 'center',
            colSpan: 3,
            backgroundColorHex: '#C4BC96',
            fontSizePt: 11,
          },
        ],
      },
      // Row 3: Modalidade
      {
        cantSplit: true,
        backgroundColorHex: '#D6E3BC',
        cells: [
          {
            text: cursoText,
            bold: true,
            align: 'left',
            colSpan: 3,
            backgroundColorHex: '#D6E3BC',
            fontSizePt: 9,
          },
        ],
      },
      // Row 4: Componente, Ano Letivo, Bimestre
      {
        cantSplit: true,
        backgroundColorHex: '#FFC000',
        cells: [
          {
            text: `Componente Curricular: ${(data.componente || '').toUpperCase()}`,
            bold: true,
            align: 'left',
            backgroundColorHex: '#FFC000',
            fontSizePt: data.componente && data.componente.length > 35 ? 8 : 9,
          },
          {
            text: 'Ano Letivo: 2026',
            bold: true,
            align: 'left',
            backgroundColorHex: '#FFC000',
            fontSizePt: 9,
          },
          {
            text: `Bimestre: ${getBimestreRange(data.bimestre)}`,
            bold: true,
            align: 'left',
            backgroundColorHex: '#FFC000',
            fontSizePt: 9,
          },
        ],
      },
      // Row 5: Docente e Série
      {
        cantSplit: true,
        backgroundColorHex: '#D6E3BC',
        cells: [
          {
            text: `Docente: ${(data.docente || '').toUpperCase()}`,
            bold: true,
            align: 'left',
            colSpan: 2,
            backgroundColorHex: '#D6E3BC',
            fontSizePt: 11,
          },
          {
            text: `Ano/Série: ${(data.serie || '').toUpperCase()}`,
            bold: true,
            align: 'left',
            backgroundColorHex: '#D6E3BC',
            fontSizePt: 9,
          },
        ],
      },
      // Row 6: Calendário
      {
        cantSplit: true,
        backgroundColorHex: '#FFC000',
        cells: [
          {
            text: getDatasContent(data.bimestre),
            bold: false,
            align: 'justify',
            colSpan: 3,
            backgroundColorHex: '#FFC000',
            fontSizePt: 9.5,
          },
        ],
      },
    ];

    blocks.push({
      type: 'table',
      colWidthsPercent: [50.0, 23.64, 26.36],
      rows: idRows,
    });

    blocks.push({
      type: 'paragraph',
      text: '',
      spaceBeforePt: 2,
      spaceAfterPt: 4,
    });

    // 2. SECTION HEADER (Cyan #00B0F0)
    blocks.push({
      type: 'table',
      colWidthsPercent: [100],
      rows: [
        {
          cantSplit: true,
          cells: [
            {
              text: 'PLANO DE ENSINO – BASE GUIA PRIORIZADO',
              bold: true,
              align: 'center',
              backgroundColorHex: '#00B0F0',
              textColorHex: '#000000',
              fontSizePt: 11,
            },
          ],
        },
      ],
    });

    blocks.push({
      type: 'paragraph',
      text: '',
      spaceBeforePt: 2,
      spaceAfterPt: 4,
    });

    // 2. WEEKLY TABLES
    data.semanas.forEach((s, idx) => {
      const cleanConteudos = (s.conteudos || '')
        .replace(/atividade\s+verificadora(\s+de\s+aprendizagem)?/gi, '')
        .replace(/Atividade\s+Verificadora(\s+de\s+Aprendizagem)?/gi, '')
        .replace(/<\/?li>\s*<\/?li>/gi, '')
        .replace(/<li>\s*:\s*<\/li>/gi, '')
        .trim();

      const estrategiaVerificacaoTexto =
        s.estrategia_verificacao ||
        getVerificationStrategy(
          cleanConteudos ? cleanConteudos.toLowerCase() : '',
          s.estrategia || '',
          idx
        );

      const weekRows: DocTableRow[] = [
        // Row 1: Header Cyan
        {
          isHeader: true,
          cantSplit: true,
          cells: [
            {
              text: 'Plano de Aula',
              bold: true,
              align: 'center',
              colSpan: 2,
              backgroundColorHex: '#00b0f0',
              textColorHex: '#000000',
              fontSizePt: 11,
            },
          ],
        },
        // Row 2: Período & Material
        {
          cantSplit: true,
          cells: [
            { text: `Período: ${s.periodo || ''}`, bold: true, backgroundColorHex: '#ffffff' },
            { text: `Aula(s) material digital: ${s.aulas_escopo || ''}`, bold: true, backgroundColorHex: '#ffffff' },
          ],
        },
        // Row 3: Separator Row
        {
          cantSplit: true,
          cells: [
            { text: ' ', backgroundColorHex: '#000000', fontSizePt: 2 },
            { text: ' ', backgroundColorHex: '#000000', fontSizePt: 2 },
          ],
        },
        // Row 4: AE & Bloom Headers
        {
          cantSplit: true,
          cells: [
            { text: 'Aprendizagem Essencial (AE) ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
            { text: 'Ações Tax. Bloom / Habilidades priorizadas ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
          ],
        },
        // Row 5: AE & Bloom Content
        {
          cantSplit: true,
          cells: [
            { text: this.stripHtml(s.ae || ''), align: 'justify' },
            { text: this.stripHtml(s.acoes_bloom || ''), align: 'justify' },
          ],
        },
        // Row 6: Conteúdo & Metodologia Headers
        {
          cantSplit: true,
          cells: [
            { text: 'Conteúdo ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
            { text: 'Metodologia/Estratégia ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
          ],
        },
        // Row 7: Conteúdo & Metodologia Content
        {
          cantSplit: true,
          cells: [
            { text: this.stripHtml(cleanConteudos), align: 'justify' },
            { text: this.stripHtml(s.estrategia || ''), align: 'justify' },
          ],
        },
        // Row 8: Verificação & Avaliação Headers
        {
          cantSplit: true,
          cells: [
            { text: 'Estratégia de verificação / Parada Intencional ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
            { text: 'Avaliação ⬇️', bold: true, backgroundColorHex: '#f8fafc' },
          ],
        },
        // Row 9: Verificação & Avaliação Content
        {
          cantSplit: true,
          cells: [
            { text: this.stripHtml(estrategiaVerificacaoTexto), align: 'justify' },
            { text: this.stripHtml(s.avaliacao || ''), align: 'justify' },
          ],
        },
      ];

      blocks.push({
        type: 'table',
        colWidthsPercent: [50, 50],
        rows: weekRows,
        cantSplit: true,
      });

      blocks.push({
        type: 'paragraph',
        text: '',
        spaceBeforePt: 4,
        spaceAfterPt: 4,
      });
    });

    return blocks;
  }

  private buildAvaEfapeBlocks(data: DocumentModelData): DocBlock[] {
    const blocks: DocBlock[] = [];
    const mapping = SUBJECT_MAPPINGS[data.componente] || SUBJECT_MAPPINGS['Matemática'];

    blocks.push({
      type: 'heading',
      level: 1,
      text: `MODELO AVA-EFAPE: ${data.componente.toUpperCase()}`,
      align: 'center',
      colorHex: '#1e3a8a',
      spaceAfterPt: 12,
    });

    const infoRows: DocTableRow[] = [
      {
        cantSplit: true,
        cells: [
          { text: `Unidade Escolar: ${data.escola}`, bold: true },
          { text: `Docente: ${data.docente}`, bold: true },
        ],
      },
      {
        cantSplit: true,
        cells: [
          { text: `Componente: ${data.componente}`, bold: true },
          { text: `Série/Bimestre: ${data.serie} - ${data.bimestre}`, bold: true },
        ],
      },
      {
        cantSplit: true,
        cells: [
          { text: `Unidade Temática: ${mapping.unidadeTematica}`, colSpan: 2 },
        ],
      },
      {
        cantSplit: true,
        cells: [
          { text: `Objetos de Conhecimento: ${mapping.objetosConhecimento}`, colSpan: 2 },
        ],
      },
    ];

    blocks.push({
      type: 'table',
      colWidthsPercent: [50, 50],
      rows: infoRows,
    });

    blocks.push({
      type: 'paragraph',
      text: '',
      spaceBeforePt: 8,
      spaceAfterPt: 8,
    });

    // Append weekly tables as well
    data.semanas.forEach((s) => {
      blocks.push({
        type: 'table',
        colWidthsPercent: [50, 50],
        rows: [
          {
            isHeader: true,
            cantSplit: true,
            cells: [
              { text: `Semana - ${s.periodo}`, bold: true, colSpan: 2, backgroundColorHex: '#003366', textColorHex: '#ffffff' },
            ],
          },
          {
            cantSplit: true,
            cells: [
              { text: 'Aprendizagem Essencial', bold: true, backgroundColorHex: '#f1f5f9' },
              { text: 'Estratégias / Metodologia', bold: true, backgroundColorHex: '#f1f5f9' },
            ],
          },
          {
            cantSplit: true,
            cells: [
              { text: this.stripHtml(s.ae || '') },
              { text: this.stripHtml(s.estrategia || '') },
            ],
          },
        ],
      });

      blocks.push({
        type: 'paragraph',
        text: '',
        spaceBeforePt: 4,
        spaceAfterPt: 4,
      });
    });

    return blocks;
  }

  private stripHtml(html: string): string {
    if (!html) return '';
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .trim();
  }
}
