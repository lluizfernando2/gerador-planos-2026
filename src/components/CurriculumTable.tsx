import React, { useState } from 'react';
import { CurriculumItem, GradeFilter, BimestreFilter } from '../types';
import { Search, SlidersHorizontal, BookOpen, Layers, CheckCircle2, Hammer, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CurriculumTableProps {
  items: CurriculumItem[];
  onDeleteItem?: (id: string) => void;
}

export default function CurriculumTable({ items, onDeleteItem }: CurriculumTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [segment, setSegment] = useState<'Todos' | 'Anos Finais' | 'Ensino Médio'>('Todos');
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('Todos');
  const [bimestreFilter, setBimestreFilter] = useState<BimestreFilter>('Todos');
  const [subject, setSubject] = useState<string>('Matemática');
  const [selectedItem, setSelectedItem] = useState<CurriculumItem | null>(null);

  // Handle segment changes
  const selectSegment = (newSegment: 'Todos' | 'Anos Finais' | 'Ensino Médio') => {
    setSegment(newSegment);
    setGradeFilter('Todos');
    
    const allowed = newSegment === 'Todos'
      ? ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte', 'Filosofia', 'Sociologia', 'Biologia', 'Química']
      : newSegment === 'Anos Finais'
      ? ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte']
      : ['Matemática', 'Língua Portuguesa', 'Filosofia', 'Sociologia', 'História', 'Geografia', 'Língua Inglesa', 'Educação Física', 'Arte', 'Biologia', 'Química'];
    
    if (!allowed.includes(subject)) {
      setSubject('Matemática');
    }
  };

  const getSubjects = () => {
    if (segment === 'Anos Finais') {
      return ['Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte'];
    }
    if (segment === 'Ensino Médio') {
      return ['Matemática', 'Língua Portuguesa', 'Filosofia', 'Sociologia', 'História', 'Geografia', 'Língua Inglesa', 'Educação Física', 'Arte', 'Biologia', 'Química'];
    }
    return [
      'Matemática', 'Língua Portuguesa', 'Ciências', 'Geografia', 'História', 'Língua Inglesa', 'Educação Física', 'Arte',
      'Filosofia', 'Sociologia', 'Biologia', 'Química'
    ];
  };

  const isUnderConstruction = (() => {
    if (subject === 'Matemática' || subject === 'Língua Portuguesa') {
      return false;
    }
    if (subject === 'Ciências') {
      if (segment === 'Ensino Médio') return true;
      if (['1ª Série', '2ª Série', '3ª Série'].includes(gradeFilter)) return true;
      return false;
    }
    return true;
  })();

  // Apply filtering logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.objetivos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.habilidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aprendizagem.toLowerCase().includes(searchTerm.toLowerCase());

    const itemSegment = ['6º Ano', '7º Ano', '8º Ano', '9º Ano'].includes(item.ano) ? 'Anos Finais' : 'Ensino Médio';
    const matchesSegment = segment === 'Todos' || itemSegment === segment;
    const matchesGrade = gradeFilter === 'Todos' || item.ano === gradeFilter;
    const matchesBimestre = bimestreFilter === 'Todos' || item.bimestre === bimestreFilter;

    const itemSubject = item.disciplina || 'Matemática';
    const matchesSubject = itemSubject === subject;

    return matchesSearch && matchesSegment && matchesGrade && matchesBimestre && matchesSubject;
  });

  const totalSubjectItems = items.filter(item => (item.disciplina || 'Matemática') === subject).length;

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="bg-white rounded border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
            Filtros do Currículo
          </h2>
          <div className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
            {isUnderConstruction ? 'Página em Construção' : `Mostrando ${filteredItems.length} de ${totalSubjectItems} Aulas`}
          </div>
        </div>

        {/* Segment selector buttons */}
        <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-4">
          <button
            onClick={() => selectSegment('Todos')}
            className={`px-4 py-2 text-xs font-bold rounded transition border cursor-pointer ${
              segment === 'Todos'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Todos os Segmentos
          </button>
          <button
            onClick={() => selectSegment('Anos Finais')}
            className={`px-4 py-2 text-xs font-bold rounded transition border cursor-pointer ${
              segment === 'Anos Finais'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Anos Finais (6º ao 9º)
          </button>
          <button
            onClick={() => selectSegment('Ensino Médio')}
            className={`px-4 py-2 text-xs font-bold rounded transition border cursor-pointer ${
              segment === 'Ensino Médio'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Ensino Médio (1ª a 3ª)
          </button>
        </div>

        {/* Disciplinas selector abas */}
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Disciplinas ({getSubjects().length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {getSubjects().map((sub) => {
              const active = subject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSubject(sub)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition border cursor-pointer ${
                    active
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar título, conteúdo, habilidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            />
          </div>

          {/* Grade selection */}
          <div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value as GradeFilter)}
              className="block w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            >
              {segment === 'Todos' && (
                <>
                  <option value="Todos">Todos os Anos / Séries</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
              {segment === 'Anos Finais' && (
                <>
                  <option value="Todos">Todos os Anos Finais</option>
                  <option value="6º Ano">6º Ano</option>
                  <option value="7º Ano">7º Ano</option>
                  <option value="8º Ano">8º Ano</option>
                  <option value="9º Ano">9º Ano</option>
                </>
              )}
              {segment === 'Ensino Médio' && (
                <>
                  <option value="Todos">Todo o Ensino Médio</option>
                  <option value="1ª Série">1ª Série</option>
                  <option value="2ª Série">2ª Série</option>
                  <option value="3ª Série">3ª Série</option>
                </>
              )}
            </select>
          </div>

          {/* Term selection */}
          <div>
            <select
              value={bimestreFilter}
              onChange={(e) => setBimestreFilter(e.target.value as BimestreFilter)}
              className="block w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50 hover:bg-gray-50 transition"
            >
              <option value="Todos">Todos os Bimestres</option>
              <option value="1º Bimestre">1º Bimestre</option>
              <option value="2º Bimestre">2º Bimestre</option>
              <option value="3º Bimestre">3º Bimestre</option>
              <option value="4º Bimestre">4º Bimestre</option>
            </select>
          </div>

          {/* Quick Clear Filter */}
          {(searchTerm !== '' || segment !== 'Todos' || gradeFilter !== 'Todos' || bimestreFilter !== 'Todos' || subject !== 'Matemática') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSegment('Todos');
                setGradeFilter('Todos');
                setBimestreFilter('Todos');
                setSubject('Matemática');
              }}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-bold self-center justify-self-start py-2 hover:underline transition cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          )}
        </div>
      </div>

      {/* Main Table Card or Under Construction Banner */}
      {isUnderConstruction ? (
        <div className="bg-white rounded border border-gray-200 p-8 shadow-sm flex flex-col items-center justify-center text-center max-w-2xl mx-auto my-8">
          <div className="relative mb-5">
            <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 animate-pulse">
              <Hammer className="h-8 w-8 stroke-[1.5]" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-sm">
              <Clock className="h-3 w-3" />
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-1.5">Página em Construção</h3>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-6">
            O currículo priorizado para a disciplina de <span className="font-semibold text-emerald-700">{subject}</span> no segmento <span className="font-semibold text-emerald-700">{segment === 'Todos' ? 'Anos Finais / Ensino Médio' : segment}</span> está em fase de elaboração e será inserido posteriormente.
          </p>

          <div className="w-full bg-gray-50 rounded border border-gray-100 p-4 text-left space-y-3 max-w-md">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Cronograma de Atividades</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Estruturação do Layout e Abas: <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Importação das aulas de Matemática: <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>Importação das aulas de Língua Portuguesa (Anos Finais): <strong className="text-emerald-700 font-medium">Concluído</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Importação dos demais conteúdos e disciplinas: <strong className="text-amber-600 font-medium">Em breve</strong></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-xs font-black text-gray-700 uppercase tracking-wider">
                <th className="px-5 py-3.5 w-32 relative">
                  Ano / Bim
                  <span className="absolute right-2 top-3.5 text-[9px] opacity-40">▼</span>
                </th>
                <th className="px-4 py-3.5 w-16 text-center">Aula</th>
                <th className="px-5 py-3.5 w-64">Título da Aula</th>
                <th className="px-5 py-3.5 w-72">Objetivos de Aprendizagem</th>
                <th className="px-5 py-3.5 w-36">Habilidade</th>
                <th className="px-5 py-3.5 w-64">Aprendizagem Essencial</th>
                {onDeleteItem && <th className="px-5 py-3.5 w-24 text-right">Ações</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={onDeleteItem ? 7 : 6} className="text-center py-12 text-gray-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <BookOpen className="h-10 w-10 text-gray-300 stroke-[1.5]" />
                      <p className="font-semibold text-gray-700">Nenhum dado curriculum encontrado</p>
                      <p className="text-xs text-gray-400">Tente ajustar seus termos de busca ou filtros.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* Grade & Bimestre */}
                    <td className="px-5 py-4 align-top">
                      <div className="space-y-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {item.ano}
                        </span>
                        <div className="text-xs text-gray-400 font-medium">{item.bimestre}</div>
                      </div>
                    </td>

                    {/* Lesson No */}
                    <td className="px-4 py-4 text-center font-bold text-gray-800 align-top">
                      {item.aula}
                    </td>

                    {/* Title / Content */}
                    <td className="px-5 py-4 align-top">
                      <div className="space-y-1">
                        <div className="font-bold text-gray-800 group-hover:text-emerald-700 transition line-clamp-2 leading-relaxed">
                          {item.titulo}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{item.conteudo}</div>
                      </div>
                    </td>

                    {/* Objectives */}
                    <td className="px-5 py-4 align-top text-[11px] leading-relaxed max-w-xs">
                      <div className="line-clamp-4 text-gray-600 whitespace-pre-line">
                        {item.objetivos}
                      </div>
                    </td>

                    {/* Skills */}
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {item.habilidade.split(/[\s,]+/).filter(Boolean).map((hab, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"
                          >
                            {hab}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Essential Learning */}
                    <td className="px-5 py-4 align-top text-[11px] text-gray-600 italic max-w-xs">
                      <div className="line-clamp-3 leading-relaxed">{item.aprendizagem}</div>
                    </td>

                    {/* Actions */}
                    {onDeleteItem && (
                      <td className="px-5 py-4 align-top text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            if (window.confirm('Tem certeza que deseja remover esta aula?')) {
                              onDeleteItem(item.id);
                            }
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-bold hover:underline p-1"
                        >
                          Excluir
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}

      {/* Row detail drawer / modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded border border-gray-200 shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded text-emerald-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">Detalhes da Aula {selectedItem.aula}</h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {selectedItem.ano} • {selectedItem.bimestre}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Título da Aula
                  </h4>
                  <p className="text-gray-800 font-bold text-base">{selectedItem.titulo}</p>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Conteúdo
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded border border-gray-100">
                    {selectedItem.conteudo}
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Objetivos de Aprendizagem
                  </h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100 text-sm text-gray-600 leading-relaxed whitespace-pre-line space-y-2">
                    {selectedItem.objetivos}
                  </div>
                </div>

                {/* Skills and Essential Learning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Habilidades
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.habilidade.split(/[\s,]+/).filter(Boolean).map((hab, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-100"
                        >
                          {hab}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Aprendizagem Essencial
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed bg-emerald-50/30 p-3 rounded border border-emerald-100/30 italic">
                      {selectedItem.aprendizagem}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition font-bold text-sm shadow-sm"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
