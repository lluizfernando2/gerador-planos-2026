import React from 'react';
import { Sliders, X, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MarginSettings } from '../types';

interface A4MarginsModalProps {
  isOpen: boolean;
  onClose: () => void;
  marginSettings: MarginSettings;
  setMarginSettings: React.Dispatch<React.SetStateAction<MarginSettings>>;
}

export default function A4MarginsModal({
  isOpen,
  onClose,
  marginSettings,
  setMarginSettings
}: A4MarginsModalProps) {
  const handleResetDefaults = () => {
    setMarginSettings({ top: 1.27, bottom: 1.27, left: 1.27, right: 1.27 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden my-6"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 p-5 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition cursor-pointer"
                title="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-300" />
                Ajuste de Margens da Folha A4
              </h2>
              <p className="text-xs text-emerald-100/90 mt-1 font-medium leading-relaxed">
                Configure as margens em centímetros (cm) para exportação perfeita em Word e PDF.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Margem Superior (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={marginSettings.top}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, top: parseFloat(e.target.value) || 1.27 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Margem Inferior (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={marginSettings.bottom}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, bottom: parseFloat(e.target.value) || 1.27 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Margem Esquerda (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={marginSettings.left}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, left: parseFloat(e.target.value) || 1.27 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Margem Direita (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="5.0"
                    value={marginSettings.right}
                    onChange={(e) => setMarginSettings(prev => ({ ...prev, right: parseFloat(e.target.value) || 1.27 }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 font-medium">
                💡 <strong>Dica de Impressão:</strong> O padrão oficial para o modelo compactado é de <strong>1,27 cm</strong> para todas as margens.
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restaurar Padrão (1,27cm)
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" /> Salvar & Aplicar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
