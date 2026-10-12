import React, { useState } from 'react';
import {
  Monitor,
  Copy,
  FileText,
  ExternalLink,
  Printer,
  Loader2,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronDown,
  Sliders,
  Check,
  LayoutGrid,
  Share2
} from 'lucide-react';
import { MarginSettings, PlanFormat, WeekPlan } from '../types';

interface DocumentPreviewProps {
  isGeneratingPlan: boolean;
  generatedDocHtml: string | null;
  marginSettings: MarginSettings;
  planFormat: PlanFormat;
  generatedWeeks: WeekPlan[];
  onOpenMarginModal: () => void;
  onCopyText: () => void;
  onDownloadWord: () => void;
  onDownloadHtml: () => void;
  onPrintPdf: () => void;
  onOpenGeminiPrompt: (data: any) => void;
}

export default function DocumentPreview({
  isGeneratingPlan,
  generatedDocHtml,
  marginSettings,
  planFormat,
  generatedWeeks,
  onOpenMarginModal,
  onCopyText,
  onDownloadWord,
  onDownloadHtml,
  onPrintPdf,
  onOpenGeminiPrompt
}: DocumentPreviewProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [fitMode, setFitMode] = useState<'page' | 'width'>('page');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 60));

  if (isGeneratingPlan) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4 h-full shadow-2xs font-sans">
        <Loader2 className="h-10 w-10 animate-spin text-[#00856A]" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
            Elaborando Plano de Ensino Oficial 2026...
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mx-auto">
            Compilando objetivos, conteúdos, habilidades da Matriz Paulista e formatando a estrutura com rigor institucional.
          </p>
        </div>
      </div>
    );
  }

  if (!generatedDocHtml) {
    return (
      <div className="bg-[#E9EEF3] dark:bg-slate-950 rounded-xl border border-slate-300/80 dark:border-slate-800 p-8 text-center flex-1 flex flex-col items-center justify-center gap-5 h-full shadow-inner font-sans">
        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-[#00856A] shadow-md border border-slate-200 dark:border-slate-800">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
            Pré-visualização do Plano de Ensino
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md leading-relaxed mx-auto">
            Preencha e selecione as etapas no painel à esquerda e clique em <strong>Gerar Plano de Ensino</strong> para visualizar e exportar seu documento oficial.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 max-w-lg text-left text-xs text-slate-600 dark:text-slate-300 space-y-2.5 shadow-2xs leading-relaxed">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 tracking-wide text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00856A]"></span>
            Calendário e Diretrizes SEDUC-SP (2026):
          </h5>
          <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
            <li>• <strong>1º Bimestre:</strong> 02/02 a 10/04 (10 semanas; Prova Paulista)</li>
            <li>• <strong>2º Bimestre:</strong> 22/04 a 03/07 (10 semanas; Prova Paulista)</li>
            <li>• <strong>3º Bimestre:</strong> 24/07 a 02/10 (10 semanas; Prova Paulista)</li>
            <li>• <strong>4º Bimestre:</strong> 05/10 a 18/12 (11 semanas; Saresp / Provão Paulista)</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-[#E9EEF3] p-4' : 'relative'}`}>
      {/* Top Single Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs mb-3 font-sans shrink-0">
        {/* Left: Page Counter & Zoom */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            Página 1 de 1
          </span>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 60}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              title="Reduzir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1.5 min-w-[38px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 cursor-pointer"
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Middle: Page Adjustment Modes */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => {
              setFitMode('page');
              setZoomLevel(100);
            }}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
              fitMode === 'page'
                ? 'bg-white dark:bg-slate-700 text-[#00856A] dark:text-emerald-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Ajustar página
          </button>
          <button
            onClick={() => {
              setFitMode('width');
              setZoomLevel(110);
            }}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
              fitMode === 'width'
                ? 'bg-white dark:bg-slate-700 text-[#00856A] dark:text-emerald-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Ajustar largura
          </button>
        </div>

        {/* Right: Fullscreen & Export Dropdown */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer transition"
            title={isFullscreen ? 'Sair da Tela Cheia' : 'Visualizar em Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Plano de Ensino 2026',
                  text: 'Confira meu Plano de Ensino gerado!',
                  url: window.location.href,
                }).catch(console.error);
              } else {
                alert("Compartilhamento não suportado neste navegador.");
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition shadow-2xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Compartilhar</span>
          </button>

          {/* Export Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00856A] hover:bg-[#006B56] text-white text-xs font-bold rounded-lg transition shadow-2xs cursor-pointer"
            >
              <span>Exportar</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Export Dropdown Options */}
            {isExportMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-1.5 space-y-1 font-sans"
                onMouseLeave={() => setIsExportMenuOpen(false)}
              >
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Opções de Exportação
                </div>

                <button
                  onClick={() => {
                    onDownloadWord();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition text-left cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Baixar Word (.docx)</span>
                </button>

                <button
                  onClick={() => {
                    onPrintPdf();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#00856A] dark:text-emerald-400 hover:bg-[#E8F7F2] dark:hover:bg-[#00856A]/20 rounded-lg transition text-left cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#00856A]" />
                  <span>Imprimir / Salvar PDF</span>
                </button>

                <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>

                <button
                  onClick={() => {
                    onDownloadHtml();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-left cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>Baixar Arquivo HTML</span>
                </button>

                <button
                  onClick={() => {
                    onCopyText();
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition text-left cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copiar Conteúdo em Texto</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Preview Container with #E9EEF3 background and white paper sheet */}
      <div className="bg-[#E9EEF3] dark:bg-slate-950 rounded-xl border border-slate-300/80 dark:border-slate-800 p-4 sm:p-6 overflow-y-auto flex-1 flex justify-center shadow-inner relative">
        <div
          className="bg-white border border-slate-300 shadow-[0_4px_18px_rgba(15,23,42,0.16)] w-full max-w-[29.7cm] box-border overflow-x-auto min-h-[21cm] text-left rounded-sm transition-transform origin-top"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            paddingTop: `${marginSettings.top}cm`,
            paddingBottom: `${marginSettings.bottom}cm`,
            paddingLeft: `${marginSettings.left}cm`,
            paddingRight: `${marginSettings.right}cm`,
            fontFamily: "Cambria, 'Cambria Math', Georgia, serif"
          }}
        >
          <div
            id="output-document"
            dangerouslySetInnerHTML={{ __html: generatedDocHtml }}
          />
        </div>
      </div>
    </div>
  );
}
