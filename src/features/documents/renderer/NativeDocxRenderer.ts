import {
  Document as DocxDocument,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TableLayoutType,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  PageBreak,
} from 'docx';
import { DocumentModel, DocBlock, DocTableBlock } from '../model/DocumentModel';
import { mmToTwips, ptToHalfPt, calculateUsableWidthTwips } from '../utils/docxUnits';

export class NativeDocxRenderer {
  /**
   * Renders a DocumentModel into a native docx.Document object
   */
  public renderToDocument(model: DocumentModel): DocxDocument {
    const usableWidthTwips = calculateUsableWidthTwips(
      model.page.widthMm,
      model.page.marginsMm.left,
      model.page.marginsMm.right
    );

    const childrenElements = model.blocks.map((block) =>
      this.renderBlock(block, model, usableWidthTwips)
    );

    const doc = new DocxDocument({
      styles: {
        default: {
          document: {
            run: {
              font: model.styles.fontFamily,
              size: ptToHalfPt(model.styles.baseFontSizePt),
            },
          },
        },
      },
      sections: [
        {
          properties: {
            page: {
              size: {
                width: mmToTwips(model.page.widthMm),
                height: mmToTwips(model.page.heightMm),
              },
              margin: {
                top: mmToTwips(model.page.marginsMm.top),
                bottom: mmToTwips(model.page.marginsMm.bottom),
                left: mmToTwips(model.page.marginsMm.left),
                right: mmToTwips(model.page.marginsMm.right),
              },
            },
          },
          headers: {
            default: this.buildHeader(model),
          },
          footers: {
            default: this.buildFooter(model),
          },
          children: childrenElements,
        },
      ],
    });

    return doc;
  }

  /**
   * Generates a Blob representing the .docx file
   */
  public async renderToBlob(model: DocumentModel): Promise<Blob> {
    const doc = this.renderToDocument(model);
    return await Packer.toBlob(doc);
  }

  /**
   * Generates a Node Buffer representing the .docx file
   */
  public async renderToBuffer(model: DocumentModel): Promise<Buffer> {
    const doc = this.renderToDocument(model);
    return await Packer.toBuffer(doc);
  }

  private renderBlock(block: DocBlock, model: DocumentModel, usableWidthTwips: number) {
    switch (block.type) {
      case 'paragraph': {
        const align = this.getAlignment(block.align);
        const runs = block.text.split('\n').flatMap((line, idx, array) => {
          const run = new TextRun({
            text: line,
            bold: block.bold,
            italics: block.italic,
            font: model.styles.fontFamily,
            size: ptToHalfPt(block.fontSizePt || model.styles.baseFontSizePt),
            color: block.colorHex ? block.colorHex.replace('#', '') : undefined,
          });
          return idx < array.length - 1 ? [run, new TextRun({ break: 1 })] : [run];
        });

        return new Paragraph({
          alignment: align,
          spacing: {
            before: block.spaceBeforePt ? block.spaceBeforePt * 20 : 0,
            after: block.spaceAfterPt ? block.spaceAfterPt * 20 : 0,
          },
          children: runs,
        });
      }

      case 'heading': {
        const align = this.getAlignment(block.align);
        const fontSize = block.level === 1 ? 16 : block.level === 2 ? 14 : 12;
        return new Paragraph({
          alignment: align,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: block.text,
              bold: true,
              font: model.styles.fontFamily,
              size: ptToHalfPt(fontSize),
              color: block.colorHex ? block.colorHex.replace('#', '') : undefined,
            }),
          ],
        });
      }

      case 'table': {
        return this.renderTable(block, model, usableWidthTwips);
      }

      case 'pageBreak': {
        return new Paragraph({
          children: [new PageBreak()],
        });
      }
    }
  }

  private renderTable(block: DocTableBlock, model: DocumentModel, totalWidthTwips: number): Table {
    const colTwips = block.colWidthsPercent.map(
      (pct) => Math.round((pct / 100) * totalWidthTwips)
    );

    const rows = block.rows.map((row) => {
      let colOffset = 0;
      const cells = row.cells.map((cell) => {
        const span = cell.colSpan || 1;
        let cellWidthTwips = 0;
        for (let i = 0; i < span; i++) {
          cellWidthTwips += colTwips[colOffset + i] || colTwips[colTwips.length - 1];
        }
        colOffset += span;

        const align = this.getAlignment(cell.align);
        const lines = cell.text.split('\n');

        const paragraphs = lines.map((line) => {
          return new Paragraph({
            alignment: align,
            spacing: { before: 20, after: 20 },
            children: [
              new TextRun({
                text: line,
                bold: cell.bold,
                italics: cell.italic,
                font: model.styles.fontFamily,
                size: ptToHalfPt(cell.fontSizePt || model.styles.baseFontSizePt),
                color: cell.textColorHex ? cell.textColorHex.replace('#', '') : '000000',
              }),
            ],
          });
        });

        return new TableCell({
          width: { size: cellWidthTwips, type: WidthType.DXA },
          columnSpan: cell.colSpan,
          rowSpan: cell.rowSpan,
          shading: cell.backgroundColorHex
            ? { fill: cell.backgroundColorHex.replace('#', '') }
            : undefined,
          margins: {
            top: mmToTwips(1.8),
            bottom: mmToTwips(1.8),
            left: mmToTwips(2.5),
            right: mmToTwips(2.5),
          },
          children: paragraphs.length > 0 ? paragraphs : [new Paragraph({ children: [] })],
        });
      });

      return new TableRow({
        cantSplit: row.cantSplit ?? true,
        tableHeader: row.isHeader ?? false,
        children: cells,
      });
    });

    return new Table({
      width: { size: totalWidthTwips, type: WidthType.DXA },
      layout: TableLayoutType.FIXED,
      alignment: AlignmentType.CENTER,
      indent: { size: 0, type: WidthType.DXA },
      rows: rows,
    });
  }

  private buildHeader(model: DocumentModel): Header {
    return new Header({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: model.header.stateTitle.toUpperCase(),
              bold: true,
              size: ptToHalfPt(9.5),
              font: model.styles.fontFamily,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [
            new TextRun({
              text: model.header.schoolName.toUpperCase(),
              bold: true,
              size: ptToHalfPt(10),
              font: model.styles.fontFamily,
            }),
          ],
        }),
      ],
    });
  }

  private buildFooter(model: DocumentModel): Footer {
    return new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: `${model.footer.leftText || ''}   |   Página `,
              size: ptToHalfPt(9),
              font: model.styles.fontFamily,
            }),
            new TextRun({
              children: [PageNumber.CURRENT],
              size: ptToHalfPt(9),
            }),
            new TextRun({
              text: ' de ',
              size: ptToHalfPt(9),
            }),
            new TextRun({
              children: [PageNumber.TOTAL_PAGES],
              size: ptToHalfPt(9),
            }),
          ],
        }),
      ],
    });
  }

  private getAlignment(align?: string): (typeof AlignmentType)[keyof typeof AlignmentType] {
    switch (align) {
      case 'center':
        return AlignmentType.CENTER;
      case 'right':
        return AlignmentType.RIGHT;
      case 'justify':
        return AlignmentType.JUSTIFIED;
      default:
        return AlignmentType.LEFT;
    }
  }
}
