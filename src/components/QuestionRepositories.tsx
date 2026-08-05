import React, { useState } from 'react';
import { 
  QUESTION_REPOSITORIES, 
  QuestionRepository 
} from '../data/questionRepositories';
import { 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award, 
  Globe, 
  Filter,
  GraduationCap
} from 'lucide-react';

export default function QuestionRepositories() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [activeSubject, setActiveSubject] = useState<string>('todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Repositórios' },
    { id: 'oficial', label: 'Avaliações Oficiais' },
    { id: 'olimpiada', label: 'Olimpíadas Científicas' },
    { id: 'plataforma', label: 'Plataformas de Exercícios' },
    { id: 'humanas_linguagens', label: 'Linguagens & Humanas' }
  ];

  const subjects = [
    { id: 'todos', label: 'Todas as Áreas' },
    { id: 'Matemática', label: 'Matemática' },
    { id: 'Ciências', label: 'Ciências / Física / Química' },
    { id: 'Linguagens', label: 'Linguagens / Redação' },
    { id: 'Geografia', label: 'Geografia / História / Humanas' }
  ];

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter logic
  const filteredRepositories = QUESTION_REPOSITORIES.filter(repo => {
    // Search term check
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category check
    const matchesCategory = activeCategory === 'todos' || repo.category === activeCategory;

    // Subject check
    let matchesSubject = activeSubject === 'todos';
    if (!matchesSubject) {
      if (activeSubject === 'Ciências') {
        matchesSubject = repo.subjects.some(s => ['Ciências', 'Física', 'Química', 'Biologia'].includes(s));
      } else if (activeSubject === 'Geografia') {
        matchesSubject = repo.subjects.some(s => ['Geografia', 'História', 'Sociologia', 'Filosofia', 'Ciências Humanas'].includes(s));
      } else {
        matchesSubject = repo.subjects.includes(activeSubject);
      }
    }

    return matchesSearch && matchesCategory && matchesSubject;
  });

  return (
    <div id="repositorio-questoes" className="mt-12 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden text-left">
      {/* Interactive Header to Expand/Collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200 hover:bg-gray-100/70 transition cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 shrink-0">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800">
              Coletânea de Repositórios de Questões (Aprofundamento Pedagógico)
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Links selecionados de portais oficiais, exames de larga escala e olimpíadas científicas — 100% livre de IA e verificado
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-white border text-gray-500 font-mono">
            {QUESTION_REPOSITORIES.length} Portais
          </span>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Controls Bar: Search, Category Filter, Subject Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por palavra-chave, tema ou tag..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>

            {/* Subject Filter (Dropdown for density) */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">Filtro Área:</span>
              <select
                value={activeSubject}
                onChange={(e) => setActiveSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none font-medium text-gray-700"
              >
                {subjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.label}</option>
                ))}
              </select>
            </div>

            {/* Hint message */}
            <div className="md:col-span-4 flex items-center justify-end text-right text-[11px] text-gray-400 italic">
              Selecione os portais para extrair itens desafiadores e diversificar provas escolares.
            </div>
          </div>

          {/* Category Tabs (Horizontal Pills) */}
          <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
            {categories.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Repositories Grid */}
          {filteredRepositories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepositories.map((repo) => (
                <div 
                  key={repo.id}
                  className="group bg-white rounded-lg border border-gray-200 p-5 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition duration-200"
                >
                  <div className="space-y-3">
                    {/* Header: Icon + Category Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase tracking-wide">
                        {repo.category === 'oficial' ? 'Oficial / Avaliação' : 
                         repo.category === 'olimpiada' ? 'Olimpíada' : 
                         repo.category === 'plataforma' ? 'Plataforma' : 'Humanas & Ling.'}
                      </span>
                      <div className="flex gap-1">
                        {repo.subjects.slice(0, 2).map(sub => (
                          <span key={sub} className="text-[9px] font-semibold text-gray-400 bg-gray-50 border px-1.5 py-0.2 rounded-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-emerald-700 transition duration-150">
                        {repo.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5">
                        {repo.organization}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 leading-relaxed text-justify line-clamp-4">
                      {repo.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {repo.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-semibold text-gray-400 border border-gray-100 bg-gray-50/50 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100">
                    <a
                      href={repo.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Acessar Portal
                    </a>
                    
                    <button
                      onClick={() => handleCopyLink(repo.url, repo.id)}
                      title="Copiar Link para Área de Transferência"
                      className="p-2 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition cursor-pointer"
                    >
                      {copiedId === repo.id ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400 text-xs flex flex-col items-center justify-center border border-dashed rounded-lg py-16 gap-3">
              <Globe className="h-8 w-8 text-gray-300" />
              <div className="space-y-1">
                <p className="font-bold text-gray-600 text-sm">Nenhum repositório encontrado</p>
                <p className="text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Não encontramos links que atendam simultaneamente aos filtros de pesquisa, categoria e disciplina selecionados. Tente limpar seus filtros.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('todos');
                  setActiveSubject('todos');
                }}
                className="mt-2 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-bold transition cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}

          {/* Practical tip footer for teachers */}
          <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100/60 flex items-start gap-3 text-xs leading-relaxed text-emerald-800">
            <BookOpen className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold">Dica de Prática Pedagógica (Alinhamento & Aprofundamento):</h5>
              <p className="text-emerald-700 text-[11px] leading-relaxed">
                Ao selecionar questões destes repositórios oficiais, priorize focar na <strong>habilidade correspondente (BNCC)</strong> indicada em sua semana de aula. Use os filtros de busca por assunto para encontrar itens correlatos de exames anteriores do ENEM, SARESP ou da OBMEP. Isso ajuda o estudante a se familiarizar com os formatos de exames em larga escala enquanto consolida o aprendizado básico!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
