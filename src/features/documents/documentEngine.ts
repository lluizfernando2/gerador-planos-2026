import { MarginSettings, PlanFormat, WeekPlan } from '../../types';
import { buildAvaEfapeDocumentHTML } from '../../data/subjectMappings';
import { buildDocumentHTML, sanitizeHtmlForExport } from '../../lib/documentGenerator';
import { PlanningToDocumentAdapter } from './adapter/PlanningToDocumentAdapter';
import { NativeDocxRenderer } from './renderer/NativeDocxRenderer';
import { DocumentValidator } from './validation/DocumentValidator';
import { DocumentModel } from './model/DocumentModel';

export interface DocumentModelData {
  escola: string;
  docente: string;
  segmento: string;
  componente: string;
  serie: string;
  bimestre: string;
  semanas: WeekPlan[];
  trabalhosDate?: string;
  avaliacoesDate?: string;
  format: PlanFormat;
  margins: MarginSettings;
}

export interface IDocumentRenderer {
  renderHtml(model: DocumentModelData): string;
  renderExportableHtml(model: DocumentModelData): string;
}

export class HtmlDocumentRenderer implements IDocumentRenderer {
  renderHtml(model: DocumentModelData): string {
    if (model.format === 'ava-efape') {
      return buildAvaEfapeDocumentHTML(
        model.escola,
        model.docente,
        model.segmento,
        model.componente,
        model.serie,
        model.bimestre,
        [],
        model.semanas,
        model.trabalhosDate || '',
        model.avaliacoesDate || ''
      );
    }

    return buildDocumentHTML(
      model.escola,
      model.docente,
      model.segmento,
      model.componente,
      model.serie,
      model.bimestre,
      model.semanas,
      model.trabalhosDate,
      model.avaliacoesDate
    );
  }

  renderExportableHtml(model: DocumentModelData): string {
    const rawHtml = this.renderHtml(model);
    return sanitizeHtmlForExport(rawHtml);
  }
}

export class DocxDocumentEngine {
  private renderer: IDocumentRenderer;
  private adapter: PlanningToDocumentAdapter;
  private nativeRenderer: NativeDocxRenderer;

  constructor(renderer: IDocumentRenderer = new HtmlDocumentRenderer()) {
    this.renderer = renderer;
    this.adapter = new PlanningToDocumentAdapter();
    this.nativeRenderer = new NativeDocxRenderer();
  }

  public generateDocumentHtml(model: DocumentModelData): string {
    return this.renderer.renderHtml(model);
  }

  public generateExportableHtml(model: DocumentModelData): string {
    return this.renderer.renderExportableHtml(model);
  }

  /**
   * Generates a native OOXML DOCX Blob directly from Planning Data
   */
  public async generateNativeDocxBlob(data: DocumentModelData): Promise<Blob> {
    const docModel = this.createValidatedModel(data);
    const blob = await this.nativeRenderer.renderToBlob(docModel);
    const binaryValidation = await DocumentValidator.validateDocxBinary(blob);

    if (!binaryValidation.isValid) {
      throw new Error(`[DocxDocumentEngine] Generated DOCX binary invalid: ${binaryValidation.issues.map(i => i.message).join('; ')}`);
    }

    return blob;
  }

  /**
   * Generates a native OOXML DOCX Buffer directly from Planning Data (Node.js environment)
   */
  public async generateNativeDocxBuffer(data: DocumentModelData): Promise<Buffer> {
    const docModel = this.createValidatedModel(data);
    const buffer = await this.nativeRenderer.renderToBuffer(docModel);
    const binaryValidation = await DocumentValidator.validateDocxBinary(buffer);

    if (!binaryValidation.isValid) {
      throw new Error(`[DocxDocumentEngine] Generated DOCX binary invalid: ${binaryValidation.issues.map(i => i.message).join('; ')}`);
    }

    return buffer;
  }

  /**
   * Builds and validates the canonical model before any DOCX bytes are emitted.
   * Errors block generation; warnings are retained for diagnostics.
   */
  private createValidatedModel(data: DocumentModelData): DocumentModel {
    const model = this.adapter.adapt(data);
    const validation = DocumentValidator.validateModel(model);
    const errors = validation.issues.filter((issue) => issue.type === 'error');
    const warnings = validation.issues.filter((issue) => issue.type === 'warning');

    if (errors.length > 0) {
      throw new Error(
        `[DocxDocumentEngine] Invalid document model: ${errors.map((issue) => issue.message).join('; ')}`
      );
    }

    if (warnings.length > 0) {
      console.warn('[DocxDocumentEngine] Document model warnings:', warnings);
    }

    return model;
  }

  /**
   * Legacy MSO Word HTML fallback exporter
   */
  public buildWordDownloadBlob(model: DocumentModelData): Blob {
    const cleanDocHtml = this.generateExportableHtml(model);
    const m = model.margins || { top: 15, bottom: 15, left: 15, right: 15 };
    const marginTopCm = (m.top / 10).toFixed(2);
    const marginBottomCm = (m.bottom / 10).toFixed(2);
    const marginLeftCm = (m.left / 10).toFixed(2);
    const marginRightCm = (m.right / 10).toFixed(2);

    const isEfape = model.format === 'ava-efape';
    const dynamicStyle = isEfape ? `
      @page Section1 {
        size: 21.0cm 29.7cm;
        margin: ${marginTopCm}cm ${marginRightCm}cm ${marginBottomCm}cm ${marginLeftCm}cm;
        mso-header-margin: 35.4pt;
        mso-footer-margin: 35.4pt;
        mso-paper-source: 0;
      }
      div.Section1 { page: Section1; }
      body { font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #000000; line-height: 1.15; background-color: #ffffff; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 8pt; border: 1.5pt solid #000000; table-layout: fixed; mso-table-layout-alt: fixed; }
      td, th { border: 1pt solid #000000; padding: 4pt 6pt; vertical-align: top; font-size: 10pt; word-wrap: break-word; }
    ` : `
      @page Section1 {
        size: 21.0cm 29.7cm;
        margin: ${marginTopCm}cm ${marginRightCm}cm ${marginBottomCm}cm ${marginLeftCm}cm;
        mso-header-margin: 35.4pt;
        mso-footer-margin: 35.4pt;
        mso-paper-source: 0;
      }
      div.Section1 { page: Section1; }
      body { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: #000000; line-height: 1.15; background-color: #ffffff; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 12pt; border: 1pt solid #000000; table-layout: fixed; mso-table-layout-alt: fixed; }
      td, th { border: 1pt solid #000000; padding: 5pt 8pt; vertical-align: top; font-size: 11pt; word-wrap: break-word; }
    `;

    const fullHtml = `<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="ProgId" content="Word.Document">
<meta name="Generator" content="Microsoft Word 15">
<meta name="Originator" content="Microsoft Word 15">
<!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:EnableOpenTypeKerning/>
   <w:DontFlipMirrorIndents/>
   <w:OverrideTableStyleHREf/>
  </w:Compatibility>
  <m:mathPr>
   <m:mathFont m:val="Cambria Math"/>
   <m:brkBin m:val="before"/>
   <m:brkBinSub m:val="&#45;-"/>
   <m:smallFrac m:val="off"/>
   <m:dispDef/>
   <m:lMargin m:val="0"/>
   <m:rMargin m:val="0"/>
   <m:defJc m:val="centerGroup"/>
   <m:wrapIndent m:val="1440"/>
   <m:intLim m:val="subSup"/>
   <m:naryLim m:val="undOvr"/>
  </m:mathPr>
 </w:WordDocument>
</xml><![endif]-->
<style>
${dynamicStyle}
</style>
</head>
<body>
<div class="Section1">
${cleanDocHtml}
</div>
</body>
</html>`;

    return new Blob(['\ufeff', fullHtml], { type: 'application/msword;charset=utf-8' });
  }
}

export const documentEngine = new DocxDocumentEngine();

