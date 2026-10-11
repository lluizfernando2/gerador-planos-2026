import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Monitor, 
  LogOut, 
  HelpCircle, 
  Filter, 
  Copy, 
  Check, 
  FileText, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  EXTERNAL_ASSESSMENTS_2026, 
  getWeeksForBimestre, 
  AssessmentEvent 
} from '../features/calendar/academicCalendar';

interface AssessmentCalendar4BProps {
  onNavigateToPlan?: () => void;
}

export default function AssessmentCalendar4B({ onNavigateToPlan }: AssessmentCalendar4BProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>('TODOS');
  const [selectedGrade, setSelectedGrade] = useState<string>('TODAS');
  const [copiedText, setCopiedText] = useState(false);
  const [activeDateModal, setActiveDateModal] = useState<string | null>(null);

  // Weeks of 4th Bimester
  const weeks4B = useMemo(() => getWeeksForBimestre('4º Bimestre'), []);

  // Filtered Assessments
  const filteredAssessments = useMemo(() => {
    return EXTERNAL_ASSESSMENTS_2026.filter((item) => {
      if (selectedSegment !== 'TODOS' && item.segment !== 'TODOS' && item.segment !== selectedSegment) {
        return false;
      }
      if (selectedGrade !== 'TODAS') {
        const itemGrade = item.grade.toLowerCase();
        const selGrade = selectedGrade.toLowerCase();
        if (!itemGrade.includes(selGrade) && item.segment !== 'TODOS') {
          return false;
        }
      }
      return true;
    });
  }, [selectedSegment, selectedGrade]);

  // November 2026 Grid Data (Month starts on Sunday 01/11/2026, 30 days)
  const novDays = useMemo(() => {
    const list = [];
    for (let day = 1; day <= 30; day++) {
      let events: { type: 'provao' | 'enem' | 'saresp' | 'feriado'; label: string; details: string; rule: string }[] = [];
      
      if (day === 2) {
        events.push({ type: 'feriado', label: 'Finados', details: 'Feriado Nacional', rule: 'Sem atividades escolares.' });
      }
      if (day === 4 || day === 5) {
        events.push({ type: 'provao', label: 'Provão Paulista 3ª série', details: 'Provão Paulista Seriado (3ª série EM)', rule: 'Aplicação oficial 3ª série EM.' });
      }
      if (day === 8) {
        events.push({ type: 'enem', label: 'ENEM (1º Dia)', details: 'Exame Nacional do Ensino Médio', rule: 'Aplicação no domingo.' });
      }
      if (day === 10 || day === 11) {
        events.push({ type: 'provao', label: 'Provão Paulista 2ª série', details: 'Provão Paulista Seriado (2ª série EM)', rule: 'Aplicação oficial 2ª série EM.' });
      }
      if (day === 12 || day === 13) {
        events.push({ type: 'provao', label: 'Provão Paulista 1ª série', details: 'Provão Paulista Seriado (1ª série EM)', rule: 'Aplicação oficial 1ª série EM.' });
      }
      if (day === 15) {
        events.push({ type: 'enem', label: 'ENEM (2º Dia) / Proclamação da República', details: 'Exame Nacional do Ensino Médio', rule: 'Aplicação no domingo.' });
      }
      if (day === 19) {
        events.push({ type: 'saresp', label: 'SARESP Digital 6º ano', details: 'Aplicação SARESP Digital 6º ano EF', rule: 'Aplicação presencial 6º ano EF.' });
      }
      if (day === 20) {
        events.push({ type: 'feriado', label: 'Consciência Negra', details: 'Feriado Nacional', rule: 'Sem atividades escolares.' });
      }
      if (day === 26 || day === 27) {
        events.push({ type: 'saresp', label: 'SARESP Digital 7º ano', details: 'Aplicação SARESP Digital 7º ano EF', rule: 'Aplicação presencial 7º ano EF.' });
      }
      if (day === 28) {
        events.push({ type: 'feriado', label: 'Feriado Escolar', details: 'Feriado Escolar', rule: 'Sem atividades escolares.' });
      }
      if (day === 30) {
        events.push({ type: 'saresp', label: 'SARESP Digital 8º ano', details: 'Aplicação SARESP Digital 8º ano EF (1º dia)', rule: 'Aplicação presencial 8º ano EF.' });
      }

      list.push({ day, events });
    }
    return list;
  }, []);

  // December 2026 Grid Data (Month starts on Tuesday 01/12/2026, 31 days)
  const decDays = useMemo(() => {
    const list = [];
    for (let day = 1; day <= 31; day++) {
      let events: { type: 'provao' | 'enem' | 'saresp' | 'feriado'; label: string; details: string; rule: string }[] = [];
      
      if (day === 1) {
        events.push({ type: 'saresp', label: 'SARESP Digital 8º ano', details: 'Aplicação SARESP Digital 8º ano EF (2º dia)', rule: 'Aplicação presencial 8º ano EF.' });
      }
      if (day === 2 || day === 3) {
        events.push({ type: 'saresp', label: 'Reposição SARESP (6º, 7º e 8º)', details: 'Reposição SARESP 6º, 7º e 8º anos', rule: 'Aplicação de reposição.' });
      }
      if (day === 7 || day === 8 || day === 9) {
        events.push({ type: 'feriado', label: day === 8 ? 'Feriado Municipal / Recuperação' : 'Recuperação Semestral SEDUC', details: 'Recuperação Semestral SEDUC', rule: 'Recuperação Intensiva de Defasagens.' });
      }
      if (day === 18) {
        events.push({ type: 'feriado', label: 'Encerramento Letivo 2026', details: 'Conselho Final e Encerramento do Ano Letivo', rule: 'Fechamento do 4º bimestre.' });
      }

      list.push({ day, events });
    }
    return list;
  }, []);

  const handleCopySummary = () => {
    const text = `CALENDÁRIO DE AVALIAÇÕES E DATAS OFICIAIS - 4º BIMESTRE 2026 (SEDUC-SP)
==============================================================
Duração: 11 semanas (05/10/2026 a 18/12/2026)

DATAS IMPORTANTES DO 4º BIMESTRE:
- 12/10/2026: Feriado Nacional
- 13/10/2026: Catavento e Museu da Língua Portuguesa – Anos Finais
- 15/10/2026: Feriado Escolar (Dia do Professor)
- 20/10/2026: Simulado Provão Paulista e ENEM (Ensino Médio)
- 23/10/2026: Jardim do Conhecimento / Feira
- 29 e 30/10/2026: SARESP 9º ano (Impresso)
- 02/11/2026: Feriado Nacional (Finados)
- 04 e 05/11/2026: Provão Paulista Seriado (3ª série EM)
- 10 e 11/11/2026: Provão Paulista Seriado (2ª série EM)
- 12 e 13/11/2026: Provão Paulista Seriado (1ª série EM)
- 19/11/2026: SARESP Digital (6º ano EF)
- 20/11/2026: Feriado Nacional (Consciência Negra)
- 26 e 27/11/2026: SARESP Digital (7º ano EF)
- 28/11/2026: Feriado Escolar
- 30/11 e 01/12/2026: SARESP Digital (8º ano EF)
- 02 e 03/12/2026: Reposição SARESP (6º, 7º e 8º anos)
- 07, 08 e 09/12/2026: Recuperação Semestral SEDUC
- 08/12/2026: Feriado Municipal
- 14 a 18/12/2026: Conselho Final e Fechamento / Encerramento do Ano Letivo (18/12/2026)`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 dark:bg-slate-900/90 rounded-xl p-6 text-white shadow-xs border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            SEDUC-SP • Calendário Oficial 2026
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Avaliações Externas & Gestão do 4º Bimestre
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-normal mt-1">
                Cronograma oficial das avaliações externas (Provão Paulista, SARESP, ENEM e SAEB) com diretrizes operacionais de <strong>aulas remotas</strong> e <strong>organização presencial</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-100 transition cursor-pointer"
                title="Copiar texto completo do cronograma"
              >
                {copiedText ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-slate-400" />
                    <span>Copiar Cronograma</span>
                  </>
                )}
              </button>
              {onNavigateToPlan && (
                <button
                  onClick={onNavigateToPlan}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition cursor-pointer shadow-xs"
                >
                  <FileText className="h-4 w-4" />
                  <span>Ir para Planejamento</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Rules Alert Callout (Gestão do 4º Bimestre) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Provão Paulista Rule */}
        <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 shrink-0 mt-0.5">
            <Monitor className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">
                Regra Provão Paulista
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-200/80 dark:bg-indigo-800/60 text-indigo-900 dark:text-indigo-100">
                Aulas Remotas
              </span>
            </div>
            <p className="text-xs text-indigo-950 dark:text-indigo-200/90 leading-relaxed">
              <strong>Nos dias de Provão Paulista, as aulas regulares devem ser remotas</strong> (04 e 05/11 para 3ª EM; 10 e 11/11 para 2ª EM; 12 e 13/11 para 1ª EM). A escola deve fornecer roteiros assíncronos no CMSP ou tarefas direcionadas.
            </p>
          </div>
        </div>

        {/* SARESP Rule */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shrink-0 mt-0.5">
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200">
                Regra SARESP
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200/80 dark:bg-emerald-800/60 text-emerald-900 dark:text-emerald-100">
                Aplicação Oficial
              </span>
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-200/90 leading-relaxed">
              <strong>Aplicação do SARESP 2026</strong>: 9º EF (29 e 30/10), 6º EF (19/11), 7º EF (26 e 27/11), 8º EF (30/11 e 01/12) e Reposição (02 e 03/12). A gestão deve planejar a organização das turmas e o cronograma letivo.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Calendar Reproduction (Novembro e Dezembro 2026) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Calendário das Avaliações Externas 2026 (Painel SEDUC-SP)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Representação visual exata dos meses de Novembro e Dezembro de 2026 com os dias sinalizados.
            </p>
          </div>

          {/* Color Legend (Identical to Projection) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 inline-block border border-indigo-700 shadow-2xs"></span>
              <span className="text-slate-700 dark:text-slate-200">Provão Paulista</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-amber-600 inline-block border border-amber-700 shadow-2xs"></span>
              <span className="text-slate-700 dark:text-slate-200">ENEM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block border border-emerald-700 shadow-2xs"></span>
              <span className="text-slate-700 dark:text-slate-200">SARESP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-purple-600 inline-block border border-purple-700 shadow-2xs"></span>
              <span className="text-slate-700 dark:text-slate-200">SAEB (A definir)</span>
            </div>
          </div>
        </div>

        {/* 2 Month Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Novembro 2026 */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Novembro 2026
              </h4>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                12 dias de avaliações / feriados
              </span>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-600 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-700">
              <div>DOM</div>
              <div>SEG</div>
              <div>TER</div>
              <div>QUA</div>
              <div>QUI</div>
              <div>SEX</div>
              <div>SÁB</div>
            </div>

            {/* November Days Grid (Starts Sun 01) */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
              {novDays.map((d) => {
                const hasEvents = d.events.length > 0;
                const provao = d.events.find(e => e.type === 'provao');
                const saresp = d.events.find(e => e.type === 'saresp');
                const enem = d.events.find(e => e.type === 'enem');
                const feriado = d.events.find(e => e.type === 'feriado');

                let badgeClass = 'text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                let dotClass = '';

                if (provao) {
                  badgeClass = 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-900 dark:text-indigo-100 border-indigo-400 font-bold';
                  dotClass = 'bg-indigo-600 ring-2 ring-indigo-300';
                } else if (saresp) {
                  badgeClass = 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border-emerald-400 font-bold';
                  dotClass = 'bg-emerald-600 ring-2 ring-emerald-300';
                } else if (enem) {
                  badgeClass = 'bg-amber-100 dark:bg-amber-900/80 text-amber-900 dark:text-amber-100 border-amber-400 font-bold';
                  dotClass = 'bg-amber-600 ring-2 ring-amber-300';
                } else if (feriado) {
                  badgeClass = 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 font-semibold';
                }

                return (
                  <div
                    key={`nov-${d.day}`}
                    onClick={() => hasEvents && setActiveDateModal(`nov-${d.day}`)}
                    className={`min-h-[44px] p-1 rounded-lg border flex flex-col items-center justify-between transition-all ${badgeClass} ${
                      hasEvents ? 'cursor-pointer hover:scale-105 shadow-2xs' : 'opacity-80'
                    }`}
                    title={d.events.map(e => `${e.label}: ${e.rule}`).join(' | ')}
                  >
                    <span className="text-[11px] font-mono">{d.day}</span>
                    {hasEvents && (
                      <div className="flex items-center gap-1 justify-center">
                        {d.events.map((e, idx) => {
                          const c = e.type === 'provao' ? 'bg-indigo-600' : e.type === 'saresp' ? 'bg-emerald-600' : e.type === 'enem' ? 'bg-amber-600' : 'bg-rose-500';
                          return (
                            <span key={idx} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dezembro 2026 */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Dezembro 2026
              </h4>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                01/12 SARESP • 18/12 Encerramento Letivo
              </span>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-600 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-700">
              <div>DOM</div>
              <div>SEG</div>
              <div>TER</div>
              <div>QUA</div>
              <div>QUI</div>
              <div>SEX</div>
              <div>SÁB</div>
            </div>

            {/* December Days Grid (Starts Tue 01 -> 2 empty offsets) */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
              {/* Offset 2 days (Sun 29, Mon 30 of Nov) */}
              <div className="min-h-[44px] rounded-lg border border-transparent opacity-20"></div>
              <div className="min-h-[44px] rounded-lg border border-transparent opacity-20"></div>

              {decDays.map((d) => {
                const hasEvents = d.events.length > 0;
                const saresp = d.events.find(e => e.type === 'saresp');
                const feriado = d.events.find(e => e.type === 'feriado');

                let badgeClass = 'text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700';

                if (saresp) {
                  badgeClass = 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border-emerald-400 font-bold';
                } else if (feriado) {
                  badgeClass = 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 font-semibold';
                }

                return (
                  <div
                    key={`dec-${d.day}`}
                    onClick={() => hasEvents && setActiveDateModal(`dec-${d.day}`)}
                    className={`min-h-[44px] p-1 rounded-lg border flex flex-col items-center justify-between transition-all ${badgeClass} ${
                      hasEvents ? 'cursor-pointer hover:scale-105 shadow-2xs' : 'opacity-80'
                    }`}
                    title={d.events.map(e => `${e.label}: ${e.rule}`).join(' | ')}
                  >
                    <span className="text-[11px] font-mono">{d.day}</span>
                    {hasEvents && (
                      <div className="flex items-center gap-1 justify-center">
                        {d.events.map((e, idx) => {
                          const c = e.type === 'saresp' ? 'bg-emerald-600' : 'bg-rose-500';
                          return (
                            <span key={idx} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown by Assessment & Action Rules */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Tabela Discriminada de Datas e Orientações Operacionais
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Filtre por etapa ou série para verificar os dias exatos e as ações exigidas para sua turma.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSegment}
              onChange={(e) => {
                setSelectedSegment(e.target.value);
                setSelectedGrade('TODAS');
              }}
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
            >
              <option value="TODOS">Todos os Segmentos</option>
              <option value="ENSINO MÉDIO">Ensino Médio</option>
              <option value="ENSINO FUNDAMENTAL ANOS FINAIS">EF Anos Finais</option>
              <option value="ENSINO FUNDAMENTAL ANOS INICIAIS">EF Anos Iniciais</option>
            </select>
          </div>
        </div>

        {/* Assessment Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredAssessments.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border ${item.color.border} ${item.color.bg} flex flex-col justify-between space-y-3 transition hover:shadow-2xs`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${item.color.badge}`}>
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                    {item.grade}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 dark:text-white pt-1">
                  📅 {item.daysDescription}
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {item.ruleNotice}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  {item.type === 'remoto' && '💻 Aula Remota Obrigatória'}
                  {item.type === 'presencial' && '📝 Aplicação Presencial Regular'}
                  {item.type === 'final_de_semana' && '☀️ Aplicação de Domingo'}
                  {item.type === 'a_definir' && '⏳ Aguardando Publicação'}
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${item.color.dot}`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4th Bimester Weekly Architecture Guide (Gestão das 11 Semanas) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Estrutura Pedagógica das 11 Semanas do 4º Bimestre (05/10 a 18/12/2026)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Organização completa de carga horária, desenvolvimento curricular (Semanas 1 a 7), avaliações externas (Semanas 8 e 9), recuperação semestral (Semana 10) e fechamento do ano letivo (Semana 11: 14 a 18/12).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {weeks4B.map((w) => {
            const isAssessmentWeek = Boolean(w.events && w.events.length > 0);
            return (
              <div
                key={w.num}
                className={`p-3 rounded-lg border ${
                  isAssessmentWeek 
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' 
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700'
                } flex flex-col justify-between space-y-2 text-xs`}
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1">
                    <span>Semana {w.num < 10 ? `0${w.num}` : w.num}</span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {w.period.split('/2026')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                    {w.holiday || 'Aulas regulares de conteúdo.'}
                  </p>
                </div>

                {w.operationalNotice && (
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    {w.operationalNotice}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
