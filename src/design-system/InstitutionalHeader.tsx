import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  Search, 
  Award, 
  FileText, 
  Check, 
  HelpCircle, 
  User, 
  Save, 
  GraduationCap 
} from 'lucide-react';

export interface InstitutionalHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  schoolName: string;
  docenteName: string;
  lastSavedText?: string;
  isAutosaving?: boolean;
  onOpenSettings?: () => void;
}

export const InstitutionalHeader: React.FC<InstitutionalHeaderProps> = ({
  activeTab,
  setActiveTab,
  schoolName,
  docenteName,
  lastSavedText = 'Salvo localmente',
  isAutosaving = false,
  onOpenSettings
}) => {
  const tabs = [
    { id: 'plan-builder', label: 'Plano de Ensino (10 Semanas)', icon: BookOpen },
    { id: 'recovery-plan', label: 'Recuperação Semestral (SEDUC 42/2024)', icon: Award },
    { id: 'curriculum-search', label: 'Consulta Curricular 2026', icon: Search },
    { id: 'documents-history', label: 'Documentos & Exportações', icon: FileText },
    { id: 'guidelines-help', label: 'Orientações & Matrizes', icon: HelpCircle },
  ];

  return (
    <header className="bg-[#17365D] text-white border-b border-[#2F5597] shadow-sm sticky top-0 z-40">
      {/* Top sub-bar: Institutional identification & status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <GraduationCap className="w-4 h-4 text-amber-300" />
          <span className="font-semibold tracking-wide uppercase text-[11px]">
            Secretaria da Educação do Estado de São Paulo
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline truncate max-w-xs">
            {schoolName || 'Escola Estadual'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <Save className={`w-3.5 h-3.5 ${isAutosaving ? 'text-amber-300 animate-spin' : 'text-emerald-400'}`} />
            <span>{isAutosaving ? 'Salvando alterações...' : lastSavedText}</span>
          </div>
          {docenteName && (
            <div className="flex items-center gap-1 text-[11px] text-slate-200 font-medium bg-white/10 px-2 py-0.5 rounded">
              <User className="w-3 h-3 text-slate-300" />
              <span className="truncate max-w-[150px]">{docenteName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-amber-300 text-sm shadow-xs">
              SP
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                Mesa de Planejamento Pedagógico
              </h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">
                Currículo Paulista Priorizado 2026
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#17365D] shadow-xs'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2F5597]' : 'text-slate-300'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Tabs */}
        <div className="lg:hidden flex overflow-x-auto pb-2 gap-1 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition ${
                  isActive
                    ? 'bg-white text-[#17365D]'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
