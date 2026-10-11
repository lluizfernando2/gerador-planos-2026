import React from 'react';
import { 
  BookOpen, 
  Award, 
  Search, 
  FileText, 
  Calendar, 
  Sparkles, 
  Plus, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';

export interface HomePageProps {
  onNavigate: (tab: string) => void;
  schoolName: string;
  docenteName: string;
  onQuickStartPlan: (segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO', subject: string) => void;
  recentDocumentsCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  schoolName,
  docenteName,
  onQuickStartPlan,
  recentDocumentsCount
}) => {
  const quickCategories = [
    {
      title: 'Plano de Ensino (10 Semanas)',
      subtitle: 'Modelo Oficial 1 & Sequência Customizável',
      description: 'Elabore o cronograma bimestral integrado com Aprendizagens Essenciais (AE), Taxonomia de Bloom, estratégias ativas e paradas intencionais.',
      icon: BookOpen,
      badge: 'Currículo 2026',
      badgeColor: 'bg-[#DCE6F1] text-[#17365D]',
      action: () => onNavigate('plan-builder')
    },
    {
      title: 'Recuperação Semestral (SEDUC 42/2024)',
      subtitle: 'Recomposição Contínua de Habilidades',
      description: 'Gere planos de recuperação semestrais fundamentados na Resolução 42/2024 para alunos com defasagens no 1º semestre e preparo para Prova Paulista.',
      icon: Award,
      badge: 'Resolução 42/2024',
      badgeColor: 'bg-amber-100 text-amber-900',
      action: () => onNavigate('recovery-plan')
    },
    {
      title: 'Consulta Curricular Priorizada',
      subtitle: 'Matrizes FGB, Técnicos e Diversificada',
      description: 'Pesquise habilidades, descritores, objetos de conhecimento e competências socioemocionais em todo o catálogo oficial do Estado de São Paulo.',
      icon: Search,
      badge: 'Catálogo Oficial',
      badgeColor: 'bg-emerald-100 text-emerald-900',
      action: () => onNavigate('curriculum-search')
    },
    {
      title: 'Documentos & Exportações',
      subtitle: 'Word (.doc), HTML e Impressão A4',
      description: 'Acesse o histórico de planos elaborados, faça downloads em formato Word/HTML e configure margens personalizadas de folha A4.',
      icon: FileText,
      badge: 'Exportação Direta',
      badgeColor: 'bg-purple-100 text-purple-900',
      action: () => onNavigate('documents-history')
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[#17365D] rounded-2xl p-6 sm:p-8 text-white shadow-md border-l-4 border-amber-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-white/10 text-amber-300 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border border-white/15">
              Ambiente de Trabalho Docente
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {docenteName ? `Olá, Prof(a). ${docenteName}` : 'Mesa de Planejamento Pedagógico'}
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Organize seus planos de aula, cronogramas de 10 semanas, atividades verificadoras e planos de recomposição de aprendizagem em estrito alinhamento ao Currículo Paulista 2026.
            </p>
          </div>
          <button
            onClick={() => onNavigate('plan-builder')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#17365D] font-bold text-xs shadow-sm transition cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Criar Novo Plano</span>
          </button>
        </div>
      </div>

      {/* Task-oriented action cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#17365D] uppercase tracking-wider">
              O que você deseja preparar hoje?
            </h3>
            <p className="text-xs text-[#5D6872]">
              Selecione o instrumento pedagógico desejado para iniciar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quickCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={cat.action}
                className="bg-white rounded-xl border border-[#D7DCE0] p-5 hover:border-[#2F5597] hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F2ED] border border-[#D7DCE0] flex items-center justify-center text-[#17365D] group-hover:bg-[#DCE6F1] group-hover:text-[#2F5597] transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${cat.badgeColor}`}>
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#17365D] group-hover:text-[#2F5597] transition">
                      {cat.title}
                    </h4>
                    <div className="text-[11px] font-semibold text-[#5D6872] mb-1.5">
                      {cat.subtitle}
                    </div>
                    <p className="text-xs text-[#5D6872] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2F5597] group-hover:text-[#17365D]">
                  <span>Acessar Ferramenta</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Component Starters */}
      <div className="bg-white rounded-xl border border-[#D7DCE0] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2F5597]" />
            <h4 className="text-xs font-bold text-[#17365D] uppercase tracking-wider">
              Acesso Rápido por Componente Curricular
            </h4>
          </div>
          <span className="text-[11px] font-semibold text-[#5D6872]">Anos Finais & Ensino Médio</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          {[
            { label: 'Matemática', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Língua Portuguesa', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Física', segment: 'ENSINO MÉDIO' as const },
            { label: 'Química', segment: 'ENSINO MÉDIO' as const },
            { label: 'História', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Geografia', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Biologia', segment: 'ENSINO MÉDIO' as const },
            { label: 'Filosofia', segment: 'ENSINO MÉDIO' as const },
            { label: 'Sociologia', segment: 'ENSINO MÉDIO' as const },
            { label: 'Inglês', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Projeto de Vida', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
            { label: 'Tecnologia e Inovação', segment: 'ENSINO FUNDAMENTAL ANOS FINAIS' as const },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onQuickStartPlan(item.segment, item.label);
                onNavigate('plan-builder');
              }}
              className="p-2.5 rounded-lg border border-[#D7DCE0] bg-[#F4F2ED]/50 hover:bg-[#DCE6F1] hover:border-[#2F5597] text-left transition cursor-pointer text-slate-800 font-semibold text-xs truncate"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
