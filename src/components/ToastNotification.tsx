import React from 'react';
import { CheckCircle2, Info, AlertCircle, Heart, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error' | 'favorite';
}

interface ToastNotificationProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const isFav = toast.type === 'favorite';
        const isError = toast.type === 'error';
        const isWarn = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
              isFav
                ? 'bg-rose-500/95 text-white border-rose-600 dark:bg-rose-600/95'
                : isError
                ? 'bg-red-600/95 text-white border-red-700'
                : isWarn
                ? 'bg-amber-500/95 text-white border-amber-600'
                : 'bg-slate-900/95 text-white border-slate-700 dark:bg-slate-800/95'
            }`}
          >
            <div className="flex items-center gap-3">
              {isFav ? (
                <Heart className="w-5 h-5 fill-white text-white shrink-0" aria-hidden="true" />
              ) : isError || isWarn ? (
                <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              )}
              <span className="text-sm font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors text-white shrink-0 cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
