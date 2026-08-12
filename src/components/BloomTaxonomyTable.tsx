import React, { useState } from 'react';
import { Search, Copy, Check, BookOpen, Layers, Sparkles, HelpCircle } from 'lucide-react';

export interface BloomLevel {
  level: number;
  name: string;
  category: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeText?: string;
  borderColor: string;
  verbs: string[];
  examples: string[];
}

export const BLOOM_LEVELS: BloomLevel[] = [
  {
    level: 1,
    name: 'Conhecimento / Lembrar',
    category: 'Processo Cognitivo Básico',
    description: 'Recuperar, reconhecer e memorizar informações, termos, fatos e conceitos básicos.',
    color: 'bg-blue-50 text-blue-900',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    borderColor: 'border-blue-200',
    verbs: [
      'enumerar', 'definir', 'descrever', 'identificar', 'denominar', 'listar',
      'nomear', 'combinar', 'realçar', 'apontar', 'relembrar', 'recordar',
      'relacionar', 'reproduzir', 'solucionar', 'declarar', 'distinguir',
      'rotular', 'memorizar', 'ordenar', 'reconhecer'
    ],
    examples: [
      'Listar os elementos químicos da tabela periódica.',
      'Identificar o sujeito e o predicado na oração.',
      'Relembrar as fórmulas fundamentais da cinemática.'
    ]
  },
  {
    level: 2,
    name: 'Compreensão / Entender',
    category: 'Processo Cognitivo Básico',
    description: 'Construir significado a partir de mensagens instrucionais, explicando e interpretando conceitos.',
    color: 'bg-teal-50 text-teal-900',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    borderColor: 'border-teal-200',
    verbs: [
      'alterar', 'construir', 'converter', 'decodificar', 'defender', 'definir',
      'descrever', 'distinguir', 'discriminar', 'estimar', 'explicar', 'generalizar',
      'dar exemplos', 'ilustrar', 'inferir', 'reformular', 'prever', 'reescrever',
      'resolver', 'resumir', 'classificar', 'discutir', 'identificar', 'interpretar',
      'reconhecer', 'redefinir', 'selecionar', 'situar', 'traduzir'
    ],
    examples: [
      'Explicar com suas palavras o ciclo da água.',
      'Interpretar gráficos estatísticos sobre demografia.',
      'Resumir as principais teses de um texto argumentativo.'
    ]
  },
  {
    level: 3,
    name: 'Aplicação / Aplicar',
    category: 'Processo Cognitivo Intermediário',
    description: 'Executar ou usar um procedimento em uma situação nova ou prática do cotidiano.',
    color: 'bg-emerald-50 text-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-200',
    verbs: [
      'aplicar', 'alterar', 'programar', 'demonstrar', 'desenvolver', 'descobrir',
      'dramatizar', 'empregar', 'ilustrar', 'interpretar', 'manipular', 'modificar',
      'operacionalizar', 'organizar', 'prever', 'preparar', 'produzir', 'relatar',
      'resolver', 'transferir', 'usar', 'construir', 'esboçar', 'escolher',
      'escrever', 'operar', 'praticar'
    ],
    examples: [
      'Resolver equações de segundo grau aplicadas à física.',
      'Demonstrar a aplicação das leis de Newton em experimentos.',
      'Empregar regras gramaticais na redação de um ensaio.'
    ]
  },
  {
    level: 4,
    name: 'Análise / Analisar',
    category: 'Processo Cognitivo Superior',
    description: 'Decompor o conhecimento em partes e compreender como elas se relacionam com a estrutura global.',
    color: 'bg-indigo-50 text-indigo-900',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    borderColor: 'border-indigo-200',
    verbs: [
      'analisar', 'reduzir', 'classificar', 'comparar', 'contrastar', 'determinar',
      'deduzir', 'diagramar', 'distinguir', 'diferenciar', 'identificar', 'ilustrar',
      'apontar', 'inferir', 'relacionar', 'selecionar', 'separar', 'subdividir',
      'calcular', 'discriminar', 'examinar', 'experimentar', 'testar',
      'esquematizar', 'questionar'
    ],
    examples: [
      'Comparar causas e consequências da Revolução Industrial.',
      'Diferenciar o uso do discurso direto do indireto em textos literários.',
      'Analisar a estabilidade química de compostos orgânicos.'
    ]
  },
  {
    level: 5,
    name: 'Criar / Síntese (Criar)',
    category: 'Processo Cognitivo Superior',
    description: 'Reorganizar elementos em um novo padrão, plano, modelo ou produto original.',
    color: 'bg-purple-50 text-purple-900',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    borderColor: 'border-purple-200',
    verbs: [
      'categorizar', 'combinar', 'compilar', 'compor', 'conceber', 'construir',
      'criar', 'desenhar', 'elaborar', 'estabelecer', 'explicar', 'formular',
      'generalizar', 'inventar', 'modificar', 'organizar', 'originar', 'planejar',
      'propor', 'reorganizar', 'relacionar', 'revisar', 'reescrever', 'resumir',
      'sistematizar', 'escrever', 'desenvolver', 'estruturar', 'montar', 'projetar'
    ],
    examples: [
      'Elaborar uma proposta de intervenção para um problema socioambiental.',
      'Criar um protótipo ou experimento de baixo custo.',
      'Formular hipóteses para investigação científica.'
    ]
  },
  {
    level: 6,
    name: 'Avaliação / Avaliar',
    category: 'Processo Cognitivo Superior',
    description: 'Fazer julgamentos baseados em critérios e padrões para fundamentar decisões e críticas.',
    color: 'bg-amber-50 text-amber-900',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-200',
    verbs: [
      'avaliar', 'averiguar', 'escolher', 'comparar', 'concluir', 'contrastar',
      'criticar', 'decidir', 'defender', 'discriminar', 'explicar', 'interpretar',
      'justificar', 'relatar', 'resolver', 'resumir', 'apoiar', 'validar',
      'escrever um review sobre', 'detectar', 'estimar', 'julgar', 'selecionar'
    ],
    examples: [
      'Avaliar a eficiência de diferentes algoritmos de resolução.',
      'Justificar o posicionamento crítico em relação a um artigo de opinião.',
      'Criticar a consistência metodológica de um estudo científico.'
    ]
  }
];

export default function BloomTaxonomyTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  const handleCopyVerb = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1800);
  };

  const filteredLevels = BLOOM_LEVELS.map(level => {
    if (!searchTerm.trim()) return level;
    const term = searchTerm.toLowerCase();
    const matchingVerbs = level.verbs.filter(v => v.toLowerCase().includes(term));
    return {
      ...level,
      verbs: matchingVerbs
    };
  }).filter(level => level.verbs.length > 0 || !searchTerm.trim());

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-3xl p-6 text-white shadow-lg border border-emerald-700/40 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" />
            Matriz Cognitiva de Objetivos Educacionais
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Taxonomia de Bloom — Verbos de Ação
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-3xl leading-relaxed font-medium">
            Guia prático para formulação de objetivos de aprendizagem, habilidades priorizadas do Currículo Paulista e estratégias pedagógicas alinhadas aos níveis cognitivos.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Pesquisar verbo (ex: analisar, identificar, criar)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-slate-900 transition"
          />
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Clique em qualquer verbo para copiá-lo para a área de transferência</span>
        </div>
      </div>

      {/* Grid of 6 Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLevels.map((level) => (
          <div
            key={level.level}
            className={`bg-white dark:bg-slate-800 rounded-2xl border ${level.borderColor} dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
          >
            <div>
              {/* Level Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${level.badgeBg}`}>
                  Nível {level.level}
                </span>
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {level.category}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
                {level.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 font-medium leading-relaxed">
                {level.description}
              </p>

              {/* Verbs List */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Verbos de Ação ({level.verbs.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  {level.verbs.length > 0 ? (
                    level.verbs.map((verb) => (
                      <button
                        key={verb}
                        onClick={() => handleCopyVerb(verb)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          copiedVerb === verb
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-200 hover:text-emerald-900 dark:hover:text-emerald-200 border border-slate-200 dark:border-slate-700'
                        }`}
                        title="Clique para copiar este verbo"
                      >
                        <span>{verb}</span>
                        {copiedVerb === verb ? (
                          <Check className="h-3 w-3 text-white" />
                        ) : (
                          <Copy className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100" />
                        )}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic p-2">Nenhum verbo encontrado para "{searchTerm}"</span>
                  )}
                </div>
              </div>
            </div>

            {/* Examples Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <strong className="text-slate-800 dark:text-slate-200 font-bold block mb-1">Exemplo de Aplicação:</strong>
              <ul className="list-disc list-inside space-y-1">
                {level.examples.map((ex, idx) => (
                  <li key={idx} className="leading-tight">{ex}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Reference Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4 transition-colors">
        <h3 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
          Tabela Comparativa Completa da Taxonomia de Bloom (Revisão Ferraz & Belhot)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-3 border border-slate-300 dark:border-slate-700">Nível / Domínio</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Definição do Processo Cognitivo</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Verbos de Ação Principais</th>
                <th className="p-3 border border-slate-300 dark:border-slate-700">Produtos / Evidências Esperadas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-blue-900 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/30">1. Conhecimento / Lembrar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Reconhecer, memorizar e recuperar termos, fatos, convenções e definições.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">definir, listar, nomear, identificar, descrever, apontar, memorizar, citar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Listas, definições, questionários de verificação, identificação de termos.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-teal-900 dark:text-teal-300 bg-teal-50/50 dark:bg-teal-950/30">2. Compreensão / Entender</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Explicar, interpretar, classificar e exemplificar conceitos e ideias centrais.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">explicar, interpretar, resumir, classificar, converter, dar exemplos, reescrever</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Resumos, paráfrases, diagramas explicativos, classificações de itens.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30">3. Aplicação / Aplicar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Usar o conhecimento ou métodos em situações práticas, problemas e contextos novos.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">aplicar, demonstrar, resolver, calcular, executar, utilizar, construir, dramatizar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Resolução de problemas, simulações, cálculos, uso prático de regras.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-indigo-900 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/30">4. Análise / Analisar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Decompor informações em partes, identificar relações, padrões e estruturas.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">analisar, comparar, contrastar, diferenciar, deduzir, esquematizar, questionar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Mapas conceituais, quadros comparativos, gráficos de causa e efeito.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-purple-900 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-950/30">5. Criação / Criar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Reorganizar elementos para produzir algo novo, propor planos e elaborar produtos.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">criar, elaborar, formular, planejar, compor, propor, desenhar, inventar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Planos de ação, protótipos, ensaios autorais, projetos de intervenção.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-bold text-amber-900 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/30">6. Avaliação / Avaliar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Emitir julgamentos fundamentados com base em critérios, evidências e padrões.</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-semibold">avaliar, criticar, justificar, defender, concluir, validar, decidir, julgar</td>
                <td className="p-3 border border-slate-200 dark:border-slate-700">Resenhas críticas, relatórios de parecer, debates fundamentados.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bibliography footnote */}
        <div className="bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
          <strong className="text-slate-800 dark:text-slate-200 font-bold block mb-1">Referências Bibliográficas Oficiais:</strong>
          <p>• BLOOM, B. S. et al. <strong>Taxonomy of educational objectives</strong>. New York: David Mckay, 1956. 262 p.</p>
          <p>• FERRAZ, Ana Paula do C. M. e BELHOT, Renato V.. <strong>Taxonomia de Bloom: revisão teórica e apresentação das adequações do instrumento para definição de objetivos instrucionais</strong>. Gest. Prod., São Carlos, v. 17, n. 2, p. 421-431, 2010.</p>
        </div>
      </div>
    </div>
  );
}
