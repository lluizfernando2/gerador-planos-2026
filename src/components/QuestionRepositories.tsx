import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Tag, 
  Building2, 
  Layers, 
  Sparkles, 
  Globe, 
  Filter, 
  Award, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  FolderArchive
} from 'lucide-react';
import { QUESTION_REPOSITORIES, QuestionRepository } from '../data/questionRepositories';

type CategoryFilter = 'all' | 'oficial' | 'olimpiada' | 'plataforma' | 'humanas_linguagens';

const CATEGORIES: { id: CategoryFilter; label: string; icon: React.ElementType; countKey?: string }[] = [
  { id: 'all', label: 'Todos os Repositórios', icon: FolderArchive },
  { id: 'oficial', label: 'Órgãos Oficiais & Vestibulares', icon: GraduationCap },
  { id: 'olimpiada', label: 'Olimpíadas do Conhecimento', icon: Award },
  { id: 'plataforma', label: 'Bancos de Questões & Plataformas', icon: Globe },
  { id: 'humanas_linguagens', label: 'Humanas, Linguagens & Blogs', icon: BookOpen }
];

export default function QuestionRepositories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all unique subjects
  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    QUESTION_REPOSITORIES.forEach((repo) => {
      repo.subjects.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, []);

  // Extract all unique popular tags
  const popularTags = useMemo(() => {
    const tagCount: Record<string, number> = {};
    QUESTION_REPOSITORIES.forEach((repo) => {
      repo.tags.forEach((t) => {
        tagCount[t] = (tagCount[t] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([tag]) => tag);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: QUESTION_REPOSITORIES.length };
    QUESTION_REPOSITORIES.forEach((repo) => {
      counts[repo.category] = (counts[repo.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered repositories
  const filteredRepositories = useMemo(() => {
    return QUESTION_REPOSITORIES.filter((repo) => {
      // Category filter
      if (selectedCategory !== 'all' && repo.category !== selectedCategory) {
        return false;
      }

      // Subject filter
      if (selectedSubject !== 'all' && !repo.subjects.includes(selectedSubject)) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'all' && !repo.tags.includes(selectedTag)) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = repo.name.toLowerCase().includes(query);
        const matchesOrg = repo.organization.toLowerCase().includes(query);
        const matchesDesc = repo.description.toLowerCase().includes(query);
        const matchesTags = repo.tags.some((t) => t.toLowerCase().includes(query));
        const matchesSubjects = repo.subjects.some((s) => s.toLowerCase().includes(query));

        if (!matchesName && !matchesOrg && !matchesDesc && !matchesTags && !matchesSubjects) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedSubject, selectedTag, searchTerm]);

  const handleCopyLink = (repo: QuestionRepository) => {
    navigator.clipboard.writeText(repo.url);
    setCopiedId(repo.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryBadge = (category: QuestionRepository['category']) => {
    switch (category) {
      case 'oficial':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <GraduationCap className="w-3.5 h-3.5" /> Oficial / Vestibular
          </span>
        );
      case 'olimpiada':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Award className="w-3.5 h-3.5" /> Olimpíada
          </span>
        );
      case 'plataforma':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Globe className="w-3.5 h-3.5" /> Plataforma Digital
          </span>
        );
      case 'humanas_linguagens':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <BookOpen className="w-3.5 h-3.5" /> Humanas & Linguagens
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in" translate="no" lang="pt-BR">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Acervo Curado &bull; {QUESTION_REPOSITORIES.length} Fontes de Alta Qualidade
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Repositórios & Bancos de Questões Oficiais
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Acesse diretamente os melhores acervos oficiais do país (INEP, SAEB, FUVEST, UNICAMP, OBMEP, VUNESP, Bibliotecas e Portais Acadêmicos) para enriquecer suas avaliações, simulados e planos de aula.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters & Search Row */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por instituição, disciplina, tema ou palavra-chave (ex: ENEM, OBMEP, História, Gratuito)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
            >
              <option value="all">Todas as Disciplinas / Áreas</option>
              {allSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Todas
          </button>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 px-1">
        <span>
          Exibindo <strong className="text-slate-800 dark:text-slate-200">{filteredRepositories.length}</strong> {filteredRepositories.length === 1 ? 'repositório' : 'repositórios'}
        </span>
        {(searchTerm || selectedCategory !== 'all' || selectedSubject !== 'all' || selectedTag !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedSubject('all');
              setSelectedTag('all');
            }}
            className="text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Resetar todos os filtros
          </button>
        )}
      </div>

      {/* Repositories Grid */}
      {filteredRepositories.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Nenhum repositório encontrado</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Não encontramos nenhum banco de questões com os filtros aplicados. Tente buscar por outros termos ou limpar os filtros.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedSubject('all');
              setSelectedTag('all');
            }}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition cursor-pointer"
          >
            Ver todos os repositórios
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepositories.map((repo) => {
            const isCopied = copiedId === repo.id;
            return (
              <div
                key={repo.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3.5">
                  {/* Category & Org */}
                  <div className="flex items-center justify-between gap-2">
                    {getCategoryBadge(repo.category)}
                    <button
                      onClick={() => handleCopyLink(repo)}
                      title="Copiar link"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
                    {repo.name}
                  </h3>

                  {/* Organization */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{repo.organization}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {repo.description}
                  </p>

                  {/* Disciplines / Subjects */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                      Componentes / Áreas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {repo.subjects.map((sub) => (
                        <span
                          key={sub}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {repo.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition cursor-pointer"
                  >
                    <span>Acessar Acervo Oficial</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pro Tips Footer Box */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
        <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Como utilizar estes repositórios no seu planejamento?
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Recomendamos selecionar questões oficiais do INEP (SAEB e ENEM), Provão Paulista e Olimpíadas para alimentar os momentos de <strong>Prática Guiada</strong> e <strong>Checagem Formativa</strong> dos seus Planos de Aula. Questões com gabarito e comentários auxiliam na identificação rápida de distratores e concepções alternativas dos estudantes.
        </p>
      </div>
    </div>
  );
}
