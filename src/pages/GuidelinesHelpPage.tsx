import React from 'react';
import { 
  Calendar, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  BrainCircuit, 
  ExternalLink, 
  Info 
} from 'lucide-react';
import { getWeeksForBimestre } from '../document-templates/immutable';

export const GuidelinesHelpPage: React.FC = () => {
  const bimestres = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#17365D] rounded-2xl p-6 sm:p-8 text-white shadow-md border-l-4 border-amber-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-white/10 text-amber-300 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-white/15">
              Currículo Paulista 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Orientações, Calendário & Matrizes de Referência
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Diretrizes oficiais da Secretaria de Estado da Educação de São Paulo para organização do plano de ensino integrado, recuperação semestral (Res. SEDUC 42/2024) e avaliações diagnósticas/somativas.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-amber-300" />
          </div>
        </div>
      </div>

      {/* Grid: Calendário Oficial 2026 */}
      <div className="bg-white rounded-xl border border-[#D7DCE0] p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-[#D7DCE0] pb-3">
          <Calendar className="w-5 h-5 text-[#2F5597]" />
          <h3 className="text-base font-bold text-[#17365D]">
            Calendário Letivo & Cronograma Oficial 2026 (10 a 11 Semanas por Bimestre)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bimestres.map(bim => {
            const weeks = getWeeksForBimestre(bim);
            return (
              <div key={bim} className="border border-[#D7DCE0] rounded-lg p-4 bg-[#F4F2ED]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#17365D]">{bim}</h4>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#DCE6F1] text-[#17365D]">
                    {weeks.length} semanas
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {weeks.map(w => (
                    <div key={w.num} className="flex items-start justify-between gap-2 py-1 border-b border-gray-200/60 last:border-0">
                      <span className="font-semibold text-slate-700 min-w-[70px]">Semana {w.num}:</span>
                      <span className="text-slate-600 flex-1">{w.period}</span>
                      {w.holiday && (
                        <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-right">
                          {w.holiday}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Taxonomia de Bloom */}
      <div className="bg-white rounded-xl border border-[#D7DCE0] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#D7DCE0] pb-3">
          <BrainCircuit className="w-5 h-5 text-[#2F5597]" />
          <h3 className="text-base font-bold text-[#17365D]">
            Taxonomia de Bloom – Categorias & Verbos de Ação Cognitiva
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">1. Conhecimento / Memorizar</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> enumerar, definir, descrever, identificar, denominar, listar, nomear, combinar, apontar, relembrar, relacionar, reconhecer.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">2. Compreensão</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> alterar, construir, converter, decodificar, explicar, ilustrar, inferir, resolver, resumir, classificar, interpretar, traduzir.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">3. Aplicação</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> aplicar, programar, demonstrar, desenvolver, produzir, resolver problemas práticos, operar, praticar, transferir, utilizar.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">4. Análise</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> analisar, comparar, contrastar, determinar, deduzir, diferenciar, calcular, examinar, esquematizar, questionar hipóteses.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">5. Criar / Síntese</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> conceber, construir, criar, desenhar, elaborar, planejar, propor, reorganizar, estruturar, montar, projetar modelos.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 space-y-1.5">
            <h5 className="font-bold text-[#17365D]">6. Avaliação</h5>
            <p className="text-[#5D6872] leading-relaxed">
              <strong>Verbos:</strong> avaliar, averiguar, criticar, decidir, defender, interpretar, justificar, validar, estimar, julgar e selecionar critérios.
            </p>
          </div>
        </div>
      </div>

      {/* Ancoragem Legal Resolução SEDUC 42/2024 */}
      <div className="bg-white rounded-xl border border-[#D7DCE0] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 border-b border-[#D7DCE0] pb-3">
          <Award className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-[#17365D]">
            Recuperação Semestral Contínua & Intensiva (Resolução SEDUC 42/2024)
          </h3>
        </div>

        <p className="text-xs text-[#5D6872] leading-relaxed">
          A Resolução SEDUC nº 42/2024 estabelece a obrigatoriedade de acompanhamento pedagógico contínuo e planos de recomposição de aprendizagem aos estudantes com rendimento inferior a 5,0 no semestre letivo. Os registros devem ser documentados na Secretaria Escolar Digital (SED) e no sistema 'Professor Presente', focando na superação de defasagens das habilidades essenciais avaliadas na Prova Paulista e no SARESP.
        </p>
      </div>
    </div>
  );
};
