import React, { useState } from 'react';
import { HelpCircle, BookOpen, Layers, Heart, Download, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';

interface HelpSectionProps {
  onStartTour?: () => void;
}

export default function HelpSection({ onStartTour }: HelpSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const steps = [
    {
      num: '01',
      title: 'Busca Rápida de Habilidades',
      desc: 'Digite termos como "Frações", "Sintaxe" ou códigos como "EF06MA03" para localizar em segundos as diretrizes curriculares oficiais.',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      num: '02',
      title: 'Filtros por Etapa e Bimestre',
      desc: 'Selecione entre Anos Finais (6º ao 9º), Ensino Médio, Ensino Técnico ou Parte Diversificada para personalizar sua consulta.',
      icon: Layers,
      color: 'bg-emerald-500'
    },
    {
      num: '03',
      title: 'Planos Bimestrais Automáticos',
      desc: 'Use nossa ferramenta de planejamento para distribuir aulas semana a semana com alinhamento a ações da Taxonomia de Bloom.',
      icon: Sparkles,
      color: 'bg-indigo-500'
    },
    {
      num: '04',
      title: 'Favoritos & Exportação Word/PDF',
      desc: 'Guarde suas habilidades mais consultadas nos favoritos e exporte planos formatados prontos para impressão ou envio à gestão.',
      icon: Download,
      color: 'bg-amber-500'
    }
  ];

  const faqs = [
    {
      q: 'O que é o Currículo Priorizado SEDUC-SP?',
      a: 'O Currículo Priorizado do Estado de São Paulo é o documento norteador que estabelece as habilidades essenciais, objetos de conhecimento e conteúdos indispensáveis para o ano letivo de 2026 na rede estadual paulista.'
    },
    {
      q: 'Como utilizar o gerador de plano de aula?',
      a: 'Acesse a aba "Planejamento" no menu superior, escolha seu componente curricular, série, bimestre e a quantidade de aulas semanais. O sistema gera automaticamente a matriz semanal pronta com aprendizagens essenciais e estratégias de avaliação.'
    },
    {
      q: 'Os dados cobrem o Ensino Técnico e o Inova Educação?',
      a: 'Sim! A plataforma possui suporte integral às disciplinas da Parte Diversificada (Projeto de Vida, Tecnologia & Inovação, Orientação de Estudos, Educação Financeira) e às disciplinas dos cursos técnicos de Administração, Vendas, Informática, Recursos Humanos, entre outros.'
    },
    {
      q: 'Como funciona a exportação dos planos de aula?',
      a: 'Você pode exportar os planos em arquivo formatado do Microsoft Word (.docx) ou PDF pronto para impressão nas normas A4 oficiais da diretoria de ensino.'
    }
  ];

  return (
    <section id="guia-de-uso" className="w-full my-12 pt-8 border-t border-slate-200 dark:border-slate-800" aria-label="Guia de uso e ajuda">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3">
          <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Guia do Docente & Coordenador</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Como usar o Currículo Priorizado no seu planejamento
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
          Passo a passo simples para otimizar a preparação de aulas e o preenchimento dos diários escolares.
        </p>
      </div>

      {/* 4 Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {steps.map((step) => {
          const IconComp = step.icon;
          return (
            <div
              key={step.num}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xs text-left hover:border-blue-400 dark:hover:border-blue-500 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${step.color} text-white flex items-center justify-center font-bold shadow-xs`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-slate-200 dark:text-slate-700">
                  {step.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 text-left flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Dúvidas Frequentes de Professores e Gestores
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700/60 leading-relaxed text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
