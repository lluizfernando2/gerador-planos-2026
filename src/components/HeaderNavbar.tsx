import React from 'react';
import { HelpCircle, GraduationCap } from 'lucide-react';

interface HeaderNavbarProps {
  onStartTour: () => void;
}

export default function HeaderNavbar({
  onStartTour
}: HeaderNavbarProps) {
  return (
    <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white shadow-md border-b border-emerald-900/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 border border-emerald-400/30 rounded-xl backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              Planejador Curricular SEDUC-SP 2026
            </h1>
            <p className="text-[11px] text-emerald-200/90 font-medium">
              Gerador de Planos de Aula • Rede Estadual SP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStartTour}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer"
            title="Iniciar tutorial guiado da plataforma"
          >
            <HelpCircle className="h-4 w-4 text-emerald-300" />
            <span className="hidden sm:inline">Guia de Uso</span>
          </button>
        </div>
      </div>
    </header>
  );
}
