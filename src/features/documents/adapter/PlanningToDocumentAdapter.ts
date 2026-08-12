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
        escola: data.escola || 'E.E. Unidade Escolar',
        componente: data.componente || 'Componente Curricular',
        serie: data.serie || 'Ano/Série',
        bimestre: data.bimestre || 'Bimestre',
        format: isAvaEfape ? 'ava-efape' : 'campinas-leste',
        createdAt: new Date().toISOString(),
      },
      page: {
        paperSize: 'A4',
        widthMm: 210,
        heightMm: 297,
        orientation: 'portrait',
        marginsMm: {
          top: margins.top,
          bottom: margins.bottom,
          left: margins.left,
          right: margins.right,
        },
      },
      header: {
        schoolName: data.escola || 'E.E. NOME DA UNIDADE ESCOLAR',
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

    // 1. IDENTIFICATION TABLE (Yellow Theme #ffc000)
    const idRows: DocTableRow[] = [
      {
        cantSplit: true,
        backgroundColorHex: '#ffc000',
        cells: [
          {
            text: (data.escola || 'E.E. NOME DA UNIDADE ESCOLAR').toUpperCase(),
            bold: true,
            align: 'center',
            colSpan: 2,
            backgroundColorHex: '#ffc000',
            fontSizePt: 11,
          },
        ],
      },
      {
        cantSplit: true,
        backgroundColorHex: '#ffc000',
        cells: [
          {
            text: 'PLANO DE ENSINO COM DESENVOLVIMENTO DO PLANO DE AULA',
            bold: true,
            align: 'center',
            colSpan: 2,
            backgroundColorHex: '#ffc000',
            fontSizePt: 11,
          },
        ],
      },
      {
        cantSplit: true,
        backgroundColorHex: '#ffc000',
        cells: [
          { text: `Docente: ${data.docente || ''}`, bold: true, backgroundColorHex: '#ffc000' },
          { text: `Segmento: ${data.segmento || ''}`, bold: true, backgroundColorHex: '#ffc000' },
        ],
      },
      {
        cantSplit: true,
        backgroundColorHex: '#ffc000',
        cells: [
          { text: `Componente Curricular: ${data.componente || ''}`, bold: true, backgroundColorHex: '#ffc000' },
          { text: `Ano/Série: ${data.serie || ''}`, bold: true, backgroundColorHex: '#ffc000' },
        ],
      },
      {
        cantSplit: true,
        backgroundColorHex: '#ffc000',
        cells: [
          { text: `Bimestre: ${data.bimestre || ''}`, bold: true, backgroundColorHex: '#ffc000' },
          {
            text: `Aplicações e Avaliações: ${data.trabalhosDate || 'Período Regulamentar'}`,
            bold: true,
            backgroundColorHex: '#ffc000',
          },
        ],
      },
    ];

    blocks.push({
      type: 'table',
      colWidthsPercent: [50, 50],
      rows: idRows,
    });

    blocks.push({
      type: 'paragraph',
      text: '',
      spaceBeforePt: 6,
      spaceAfterPt: 6,
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
