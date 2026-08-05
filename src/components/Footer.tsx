import React from 'react';
import { GraduationCap, Heart, ShieldCheck, Accessibility } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: any) => void;
}

export default function Footer({ onSelectTab }: FooterProps) {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 dark:text-white block">
                  Currículo Priorizado
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Estado de São Paulo • SEDUC-SP 2026
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Plataforma para professores, coordenadores pedagógicos e gestores escolares da rede pública e privada na consulta ágil do currículo paulista, aprendizagens essenciais e apoio ao plano de aula bimestral.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Conforme Diretrizes SEDUC-SP & BNCC 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onSelectTab('curriculum')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Consulta Curricular
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('plan-generator')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Gerador de Planos de Aula
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('recovery-plan')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Plano de Recomposição
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('repositories')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Banco de Questões
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('favorites')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Meus Favoritos
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Acessibilidade & Usabilidade
            </h4>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <Accessibility className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p>Interface em conformidade com WCAG 2.2 AA (navegação por teclado, alto contraste e leitores de tela).</p>
              </div>
              <p className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                Otimizado para dispositivos móveis, tablets e notebooks escolares.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Currículo Priorizado. Apoio pedagógico aos docentes do Brasil.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com foco na Educação Básica</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
