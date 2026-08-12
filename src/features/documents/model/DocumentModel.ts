export type BlockType = 'paragraph' | 'heading' | 'table' | 'pageBreak';

export interface DocParagraphBlock {
  type: 'paragraph';
  text: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  bold?: boolean;
  italic?: boolean;
  fontSizePt?: number;
  colorHex?: string;
  backgroundColorHex?: string;
  spaceBeforePt?: number;
  spaceAfterPt?: number;
}

export interface DocHeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  text: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  colorHex?: string;
  spaceBeforePt?: number;
  spaceAfterPt?: number;
}

export interface DocTableCell {
  text: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  colSpan?: number;
  rowSpan?: number;
  backgroundColorHex?: string;
  textColorHex?: string;
  fontSizePt?: number;
  paddingMm?: { top: number; bottom: number; left: number; right: number };
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
}

export interface DocTableRow {
  isHeader?: boolean;
  cantSplit?: boolean;
  backgroundColorHex?: string;
  cells: DocTableCell[];
}

export interface DocTableBlock {
  type: 'table';
  colWidthsPercent: number[];
  colWidthsTwips?: number[];
  rows: DocTableRow[];
  cantSplit?: boolean;
}

export interface DocPageBreakBlock {
  type: 'pageBreak';
}

export type DocBlock = DocParagraphBlock | DocHeadingBlock | DocTableBlock | DocPageBreakBlock;

export interface PageConfig {
  paperSize: 'A4';
  widthMm: number;
  heightMm: number;
  orientation: 'portrait' | 'landscape';
  marginsMm: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface DocumentHeaderConfig {
  schoolName: string;
  regionalDirectorate: string;
  stateTitle: string;
  showLogo?: boolean;
}

export interface DocumentFooterConfig {
  showPageNumbers: boolean;
  leftText?: string;
  rightText?: string;
}

export interface DocumentStyleConfig {
  fontFamily: string;
  baseFontSizePt: number;
  primaryColorHex: string;
  lineSpacing: number;
}

export interface DocumentModel {
  metadata: {
    title: string;
    docente: string;
    escola: string;
    componente: string;
    serie: string;
    bimestre: string;
    format: 'campinas-leste' | 'ava-efape';
    createdAt: string;
  };
  page: PageConfig;
  header: DocumentHeaderConfig;
  footer: DocumentFooterConfig;
  styles: DocumentStyleConfig;
  blocks: DocBlock[];
}
