import { DocumentModel, DocTableBlock } from '../model/DocumentModel';

export interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
  field?: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
}

export class DocumentValidator {
  /**
   * Validates the intermediate DocumentModel before rendering to OOXML
   */
  public static validateModel(model: DocumentModel): ValidationResult {
    const issues: ValidationIssue[] = [];

    // 1. Metadata Validation
    if (!model.metadata.escola) {
      issues.push({ type: 'warning', message: 'Nome da escola não especificado no modelo', field: 'metadata.escola' });
    }
    if (!model.metadata.componente) {
      issues.push({ type: 'error', message: 'Componente curricular é obrigatório', field: 'metadata.componente' });
    }

    // 2. Page Bounds Validation
    const { widthMm, heightMm, marginsMm } = model.page;
    const pageValues = [
      widthMm,
      heightMm,
      marginsMm.top,
      marginsMm.bottom,
      marginsMm.left,
      marginsMm.right,
    ];
    if (pageValues.some((value) => !Number.isFinite(value) || value < 0)) {
      issues.push({
        type: 'error',
        message: 'Dimensões e margens devem ser números finitos não negativos',
        field: 'page',
      });
    }
    if (widthMm <= 0 || heightMm <= 0) {
      issues.push({ type: 'error', message: 'Dimensões da página devem ser maiores que zero', field: 'page.dimensions' });
    }
    if (marginsMm.left + marginsMm.right >= widthMm) {
      issues.push({ type: 'error', message: 'Soma das margens laterais excede a largura da página', field: 'page.margins' });
    }
    if (marginsMm.top + marginsMm.bottom >= heightMm) {
      issues.push({ type: 'error', message: 'Soma das margens superiores/inferiores excede a altura da página', field: 'page.margins' });
    }

    // 3. Blocks & Table Validation
    if (!model.blocks || model.blocks.length === 0) {
      issues.push({ type: 'error', message: 'Documento não possui blocos de conteúdo', field: 'blocks' });
    } else {
      model.blocks.forEach((block, idx) => {
        if (block.type === 'table') {
          this.validateTableBlock(block, idx, issues);
        }
      });
    }

    const hasErrors = issues.some((i) => i.type === 'error');
    return {
      isValid: !hasErrors,
      issues,
    };
  }

  /**
   * Validates table structure and grid dimensions
   */
  private static validateTableBlock(block: DocTableBlock, index: number, issues: ValidationIssue[]) {
    if (!block.colWidthsPercent || block.colWidthsPercent.length === 0) {
      issues.push({ type: 'error', message: `Tabela #${index} não possui definição de colunas (colWidthsPercent)`, field: `blocks[${index}]` });
      return;
    }

    if (block.colWidthsPercent.some((width) => !Number.isFinite(width) || width <= 0)) {
      issues.push({
        type: 'error',
        message: `Tabela #${index} possui largura de coluna inválida; todas devem ser finitas e maiores que zero`,
        field: `blocks[${index}].colWidthsPercent`,
      });
      return;
    }

    const sumPct = block.colWidthsPercent.reduce((a, b) => a + b, 0);
    if (Math.abs(sumPct - 100) > 1) {
      issues.push({ type: 'error', message: `Soma das porcentagens das colunas da Tabela #${index} é ${sumPct}% (esperado 100%)`, field: `blocks[${index}].colWidthsPercent` });
    }

    if (!block.rows || block.rows.length === 0) {
      issues.push({ type: 'error', message: `Tabela #${index} não possui linhas`, field: `blocks[${index}].rows` });
      return;
    }

    block.rows.forEach((row, rowIdx) => {
      if (!row.cells || row.cells.length === 0) {
        issues.push({ type: 'error', message: `Tabela #${index}, Linha #${rowIdx} está sem células`, field: `blocks[${index}].rows[${rowIdx}]` });
        return;
      }

      const occupiedColumns = row.cells.reduce((total, cell) => {
        const span = cell.colSpan ?? 1;
        if (!Number.isInteger(span) || span < 1) {
          issues.push({
            type: 'error',
            message: `Tabela #${index}, Linha #${rowIdx} contém colSpan inválido`,
            field: `blocks[${index}].rows[${rowIdx}].cells`,
          });
          return total;
        }
        return total + span;
      }, 0);

      if (occupiedColumns !== block.colWidthsPercent.length) {
        issues.push({
          type: 'error',
          message: `Tabela #${index}, Linha #${rowIdx} ocupa ${occupiedColumns} colunas, mas a grade define ${block.colWidthsPercent.length}`,
          field: `blocks[${index}].rows[${rowIdx}].cells`,
        });
      }
    });
  }

  /**
   * Validates binary structure of generated DOCX file (ZIP container check)
   */
  public static async validateDocxBinary(data: Blob | ArrayBuffer | Uint8Array): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];

    let buffer: Uint8Array;
    if (data instanceof Blob) {
      const arrayBuf = await data.arrayBuffer();
      buffer = new Uint8Array(arrayBuf);
    } else if (data instanceof ArrayBuffer) {
      buffer = new Uint8Array(data);
    } else {
      buffer = data;
    }

    if (!buffer || buffer.length === 0) {
      issues.push({ type: 'error', message: 'O arquivo DOCX gerado está vazio (0 bytes)' });
      return { isValid: false, issues };
    }

    // Check for standard ZIP magic bytes: 'P' 'K' 0x03 0x04
    if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4b || buffer[2] !== 0x03 || buffer[3] !== 0x04) {
      issues.push({ type: 'error', message: 'Cabeçalho de arquivo ZIP inválido no DOCX gerado' });
      return { isValid: false, issues };
    }

    return { isValid: true, issues: [] };
  }
}
