import React from 'react';
import { Monitor, Sliders, Copy, FileText, ExternalLink, Printer, Loader2, BookOpen } from 'lucide-react';
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
  if (isGeneratingPlan) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4 min-h-[500px]">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 text-sm">Elaborando Cronograma Integrado...</h4>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed mx-auto">
            O organizador automático está compilando e distribuindo os objetivos, conteúdos e habilidades do material oficial para preencher as estratégias metodológicas, avaliações, Ações da Taxonomia de Bloom e as Aprendizagens Essenciais (AE) de cada semana.
          </p>
        </div>
      </div>
    );
  }

  if (!generatedDocHtml) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4 min-h-[500px] shadow-2xs">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 text-sm">Cronograma Integrado de 10 Semanas</h4>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed mx-auto">
            Selecione as aulas na lista lateral esquerda e clique em <strong>Gerar Plano de Ensino Pronto</strong>. O sistema compilará automaticamente de forma local e offline as avaliações, metodologias ativas, ações Bloom e o cronograma integrado de 2026.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 max-w-lg text-left text-[11px] text-slate-600 space-y-2 mt-2 leading-relaxed">
          <h5 className="font-bold text-slate-700 uppercase tracking-wide text-xs mb-1">Previsão e Calendário Escolar (2026):</h5>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>1º Bimestre:</strong> 02/02 a 10/04 (10 semanas; Carnaval em 17/02; Sexta-feira Santa em 03/04).</li>
            <li><strong>2º Bimestre:</strong> 22/04 a 03/07 (10 semanas; Dia do Trabalho em 01/05; Corpus Christi em 04/06).</li>
            <li><strong>3º Bimestre:</strong> 24/07 a 02/10 (10 semanas; Independência do Brasil em 07/09).</li>
            <li><strong>4º Bimestre:</strong> 05/10 a 18/12 (10 semanas; N. Sra. Aparecida em 12/10; Finados em 02/11; Consciência Negra em 20/11).</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 flex flex-col flex-1">
      {/* Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Monitor className="h-4 w-4 text-emerald-600" />
            <span>Documento de Impressão Oficial (A4)</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenMarginModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-300"
            title="Configurar Margens A4 (cm)"
          >
            <Sliders className="h-3.5 w-3.5 text-slate-600" />
            Margens A4 ({marginSettings.top} × {marginSettings.left} cm)
          </button>
          <button
            onClick={onCopyText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-200"
          >
            <Copy className="h-3.5 w-3.5" />
            Copiar Texto
          </button>
          <button
            onClick={onDownloadWord}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" />
            Baixar Word (.docx)
          </button>
          <button
            onClick={onDownloadHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Baixar HTML
          </button>
          <button
            onClick={onPrintPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Rendering Stage: Direct Official A4 Document View */}
      <div className="bg-slate-200/70 rounded-2xl border border-slate-300 p-6 overflow-y-auto flex-1 flex justify-center max-h-[850px] shadow-inner">
        <div
          className="bg-white border border-slate-300 shadow-xl w-full max-w-[29.7cm] box-border overflow-x-auto min-h-[21cm] text-left rounded-sm"
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
            dangerouslySetInnerHTML={{ __html: generatedDocHtml }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const trigger = target.closest('.gemini-prompt-trigger');
              if (trigger) {
                e.preventDefault();
                const weekIdxAttr = trigger.getAttribute('data-week-idx');
                if (weekIdxAttr !== null) {
                  const weekIdx = parseInt(weekIdxAttr);
                  const week = generatedWeeks[weekIdx];
                  if (week) {
                    const verificadora = week.lessons?.find((l: any) => l.num === 999);
                    onOpenGeminiPrompt(verificadora || { previousLessons: week.lessons || [] });
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
