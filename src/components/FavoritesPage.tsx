import React from 'react';
import { Bookmark, Search, Trash2, ArrowRight } from 'lucide-react';
import ResultCard, { CurriculumCardItem } from './ResultCard';

interface FavoritesPageProps {
  items: any[];
  favorites: string[];
  onToggleFavorite: (item: CurriculumCardItem) => void;
  onViewDetails: (item: any) => void;
  onClearAll: () => void;
}

export default function FavoritesPage({
  items,
  favorites,
  onToggleFavorite,
  onViewDetails,
  onClearAll
}: FavoritesPageProps) {
  
  // Filter only items whose IDs are in favorites
  const favoriteItems = items.filter(item => favorites.includes(String(item.id)));

  return (
    <div className="space-y-6 animate-fade-in" translate="no" lang="pt-BR">
      
      {/* Header section with stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-rose-500" />
            Meus Favoritos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Lista de habilidades e aprendizagens essenciais selecionadas para acesso rápido e atalho pedagógico.
          </p>
        </div>

        {favoriteItems.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl transition cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar Todos os Favoritos
          </button>
        )}
      </div>

      {favoriteItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 max-w-xl mx-auto mt-8">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Nenhum item favoritado</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal">
              Você ainda não favoritou nenhuma habilidade. Navegue pela matriz curricular e clique no ícone de marcador para salvar seus itens críticos de ensino aqui.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {favoriteItems.length} {favoriteItems.length === 1 ? 'item salvo' : 'itens salvos'} no seu navegador
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => {
              // Convert to card item format
              const cardItem: CurriculumCardItem = {
                id: String(item.id),
                ano: item.ano,
                bimestre: item.bimestre,
                aula: item.aula,
                titulo: item.titulo || 'Sem título',
                conteudo: item.conteudo || item.descricao || '',
                objetivos: item.objetivos || '',
                habilidade: item.habilidade || '',
                aprendizagem: item.aprendizagem || '',
                disciplina: item.disciplina || item.componente || 'Outros',
                eixo: item.eixo || '',
                raw: item
              };

              return (
                <ResultCard
                  key={cardItem.id}
                  item={cardItem}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onViewDetails={onViewDetails}
                  onCopy={(ci) => {
                    const text = `${ci.disciplina || ''} - ${ci.ano} (${ci.bimestre})\nHabilidade: ${ci.habilidade || ''}\nTítulo: ${ci.titulo}\nConteúdo: ${ci.conteudo || ''}`;
                    navigator.clipboard.writeText(text);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
