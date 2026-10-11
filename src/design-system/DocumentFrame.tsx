import React, { useState } from 'react';
import { 
  Copy, 
  FileText, 
  Printer, 
  ExternalLink, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Sliders, 
  FileSpreadsheet, 
  Check 
} from 'lucide-react';

export interface DocumentFrameProps {
  htmlContent: string;
  marginSettings: { top: number; right: number; bottom: number; left: number };
  planFormat: string;
  onOpenMargins: () => void;
  onCopy: () => void;
  onDownloadDoc: () => void;
  onDownloadHtml: () => void;
  onPrintPdf: () => void;
  onWeekTriggerClick?: (weekIdx: number) => void;
}

export const DocumentFrame: React.FC<DocumentFrameProps> = ({
  htmlContent,
  marginSettings,
  planFormat,
  onOpenMargins,
  onCopy,
  onDownloadDoc,
  onDownloadHtml,
  onPrintPdf,
  onWeekTriggerClick
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(140, prev + 10));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(70, prev - 10));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="flex flex-col flex-1 h-full bg-[#F4F2ED] rounded-xl border border-[#D7DCE0] overflow-hidden shadow-xs">
      {/* Top Action Toolbar */}
      <div className="bg-white border-b border-[#D7DCE0] px-4 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#17365D]">
            <FileText className="w-4 h-4 text-[#2F5597]" />
            <span>Documento Oficial de Impressão (A4)</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-md border border-gray-200 text-xs">
            <button
              onClick={handleZoomOut}
              className="p-1 text-gray-600 hover:text-gray-900 rounded hover:bg-white transition cursor-pointer"
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-[11px] font-mono font-semibold text-gray-700 hover:bg-white rounded transition"
              title="Redefinir Zoom"
            >
              {zoomLevel}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1 text-gray-600 hover:text-gray-900 rounded hover:bg-white transition cursor-pointer"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenMargins}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition border border-slate-300 cursor-pointer"
            title="Configurar Margens A4 (cm)"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Margens ({marginSettings.top} × {marginSettings.left} cm)</span>
          </button>

          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Tabela</span>
          </button>

          <button
            onClick={onDownloadDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#DCE6F1] hover:bg-blue-100 text-[#17365D] text-xs font-bold transition border border-[#2F5597]/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#2F5597]" />
            <span>Baixar Word (.doc)</span>
          </button>

          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition border border-amber-200 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
            <span>HTML</span>
          </button>

          <button
            onClick={onPrintPdf}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#2F5597] hover:bg-[#17365D] text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            <span>Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Viewer Stage - 100% Exact Document Rendering */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 flex justify-center bg-[#E5E1D8]/60 shadow-inner">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="w-full max-w-[29.7cm] flex justify-center"
        >
          <div
            className="bg-white border border-[#D7DCE0] shadow-md w-full max-w-[29.7cm] box-border text-left"
            style={{
              paddingTop: `${marginSettings.top}cm`,
              paddingBottom: `${marginSettings.bottom}cm`,
              paddingLeft: `${marginSettings.left}cm`,
              paddingRight: `${marginSettings.right}cm`,
              fontFamily: "Cambria, 'Cambria Math', Georgia, serif"
            }}
          >
            <style>{`
              ${planFormat === 'ava-efape' ? `
                #output-document { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; color: black; line-height: 1.35; }
                #output-document p, #output-document td, #output-document li, #output-document span { font-size: 11pt !important; font-weight: normal; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.35; }
                #output-document strong, #output-document b, #output-document th, #output-document h1, #output-document h2, #output-document h3 { font-size: 12pt !important; font-weight: bold; }
                #output-document ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                #output-document li { margin-bottom: 3pt; text-align: justify; line-height: 1.35; }
                #output-document table { border-collapse: collapse; width: 100%; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.35; }
                #output-document td { padding: 6pt; vertical-align: top; word-wrap: break-word; text-align: justify; font-family: Cambria, 'Cambria Math', Georgia, serif; }
                #output-document .weekly-plan-page { border: none !important; box-shadow: none !important; margin-bottom: 0 !important; padding: 0 !important; background: transparent !important; }
              ` : `
                #output-document { font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; color: black; }
                #output-document p, #output-document td, #output-document li, #output-document span { font-size: 11pt !important; font-weight: normal; margin-top: 0; margin-bottom: 6pt; text-align: justify; line-height: 1.2; }
                #output-document strong, #output-document b, #output-document th, #output-document h1, #output-document h2, #output-document h3 { font-size: 12pt !important; font-weight: bold; }
                #output-document ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                #output-document li { margin-bottom: 3pt; text-align: justify; line-height: 1.2; }
                #output-document table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 12pt; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; }
                #output-document td { border: 1pt solid black; padding: 5pt; word-wrap: break-word; text-align: justify; font-family: Cambria, 'Cambria Math', Georgia, serif; font-size: 11pt; line-height: 1.2; }
              `}
            `}</style>
            <div
              id="output-document"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const trigger = target.closest('.gemini-prompt-trigger');
                if (trigger && onWeekTriggerClick) {
                  e.preventDefault();
                  const weekIdxAttr = trigger.getAttribute('data-week-idx');
                  if (weekIdxAttr !== null) {
                    onWeekTriggerClick(parseInt(weekIdxAttr, 10));
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
