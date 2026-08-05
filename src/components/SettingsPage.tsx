import React from 'react';
import { Settings, Type, LayoutGrid, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

interface SettingsPageProps {
  appTypography: 'sans' | 'space' | 'mono' | 'serif';
  setAppTypography: (type: 'sans' | 'space' | 'mono' | 'serif') => void;
  borderStyle: 'rounded' | 'sharp';
  setBorderStyle: (style: 'rounded' | 'sharp') => void;
  onResetData: () => void;
  updateCount: number;
  lastUpdateFormatted: string;
}

export default function SettingsPage({
  appTypography,
  setAppTypography,
  borderStyle,
  setBorderStyle,
  onResetData,
  updateCount,
  lastUpdateFormatted
}: SettingsPageProps) {
  return (
    <div className="space-y-8 animate-fade-in" translate="no" lang="pt-BR">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          Configurações da Interface
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Ajuste as preferências de visualização, fontes, formatos e redefina o banco de dados local.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Visual Customizations */}
        <div className="space-y-6">
          
          {/* Typography options */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Tipografia Geral do Sistema
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Escolha a família de fontes para otimizar sua leitura pedagógica diária ou exportação de materiais.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'sans', label: 'Inter Sans', desc: 'Leitura Limpa (Padrão)' },
                { id: 'space', label: 'Space Grotesk', desc: 'Moderno / Geek' },
                { id: 'mono', label: 'JetBrains Mono', desc: 'Código Fonte' },
                { id: 'serif', label: 'Georgia Serif', desc: 'Estilo Acadêmico' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAppTypography(item.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 active:scale-95 ${
                    appTypography === item.id
                      ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20'
                      : 'border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Borders radius customizer */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Estilo de Cantos e Bordas
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Determine a curvatura das bordas de cards, tabelas e botões no painel administrativo.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'rounded', label: 'Arredondado', desc: 'Layout Moderno' },
                { id: 'sharp', label: 'Reto / Sharp', desc: 'Layout Corporativo' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBorderStyle(item.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 active:scale-95 ${
                    borderStyle === item.id
                      ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20'
                      : 'border-slate-150 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Database Maintenance & Info */}
        <div className="space-y-6">
          
          {/* Data reset block */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2 text-red-600 dark:text-red-400">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Zona de Perigo • Manutenção de Dados
            </h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Caso você tenha carregado planilhas corrompidas ou deseja restaurar as disciplinas e lições originais do estado de São Paulo, você pode redefinir o armazenamento local.
            </p>

            <div className="bg-red-50 dark:bg-red-950/10 p-4 rounded-xl border border-red-100 dark:border-red-900/40 text-[11px] text-red-800 dark:text-red-300 leading-normal">
              <strong>Importante:</strong> Esta ação removerá os dados escolares customizados da memória local e redefinirá a matriz curricular para o estado de fábrica. Não altera o arquivo de origem.
            </div>

            <button
              onClick={onResetData}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Banco de Dados Curricular
            </button>
          </div>

          {/* System information */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Informações do Sistema
            </h3>
            
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="text-slate-400">Versão de Compilação</span>
                <span className="font-mono font-bold">v3.1.2-SP</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="text-slate-400">Atualizações de Código</span>
                <span className="font-mono font-bold">#{updateCount}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                <span className="text-slate-400">Última Sincronização</span>
                <span className="font-mono font-bold">{lastUpdateFormatted}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">Ambiente</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Produção Ativa (SSL)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
