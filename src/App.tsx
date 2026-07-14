import React, { useState, useEffect } from 'react';
import { initialCurriculumData } from './data/curriculumData';
import { CurriculumItem } from './types';
import CurriculumTable from './components/CurriculumTable';
import { initAuth, googleSignIn, logoutUser, getAccessToken } from './lib/firebase';
import { exportToGoogleSheets } from './lib/sheets';
import * as XLSX from 'xlsx';
import {
  BookOpen,
  Download,
  Share2,
  FileSpreadsheet,
  Trash2,
  Plus,
  ArrowUpDown,
  LogOut,
  User as UserIcon,
  Check,
  AlertCircle,
  Clock,
  LogIn,
  Loader2,
  Printer,
  Copy,
  FileText,
  FileCode,
  FileUp,
  ExternalLink,
  Inbox,
  Info
} from 'lucide-react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';

// Weeks configuration for 2026 bimesters, including holidays in Campinas
function getWeeksForBimestre(bimestre: string) {
  if (bimestre === '1º Bimestre') {
    return [
      { num: 1, period: "02 a 06/02/2026", holiday: "" },
      { num: 2, period: "09 a 13/02/2026", holiday: "" },
      { num: 3, period: "16 a 20/02/2026", holiday: "Feriado: 17/02 - Carnaval" },
      { num: 4, period: "23 a 27/02/2026", holiday: "" },
      { num: 5, period: "02 a 06/03/2026", holiday: "" },
      { num: 6, period: "09 a 13/03/2026", holiday: "" },
      { num: 7, period: "16 a 20/03/2026", holiday: "" },
      { num: 8, period: "23 a 27/03/2026", holiday: "Revisão / Prova Paulista" },
      { num: 9, period: "30/03 a 03/04/2026", holiday: "Feriado: 03/04 - Sexta-feira Santa; Recuperação" },
      { num: 10, period: "06 a 10/04/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '2º Bimestre') {
    return [
      { num: 1, period: "22 a 30/04/2026", holiday: "Dia do Trabalho (01/05)" },
      { num: 2, period: "04 a 08/05/2026", holiday: "" },
      { num: 3, period: "11 a 15/05/2026", holiday: "" },
      { num: 4, period: "18 a 22/05/2026", holiday: "" },
      { num: 5, period: "25 a 29/05/2026", holiday: "" },
      { num: 6, period: "01 a 05/06/2026", holiday: "Feriado: 04/06 - Corpus Christi" },
      { num: 7, period: "08 a 12/06/2026", holiday: "" },
      { num: 8, period: "15 a 19/06/2026", holiday: "Prova Paulista" },
      { num: 9, period: "22 a 26/06/2026", holiday: "Recuperação" },
      { num: 10, period: "29/06 a 03/07/2026", holiday: "Consolidação" }
    ];
  }
  if (bimestre === '3º Bimestre') {
    return [
      { num: 1, period: "24 a 31/07/2026", holiday: "" },
      { num: 2, period: "03 a 07/08/2026", holiday: "" },
      { num: 3, period: "10 a 14/08/2026", holiday: "" },
      { num: 4, period: "17 a 21/08/2026", holiday: "" },
      { num: 5, period: "24 a 28/08/2026", holiday: "" },
      { num: 6, period: "31/08 a 04/09/2026", holiday: "" },
      { num: 7, period: "07 a 11/09/2026", holiday: "Feriado: 07/09 - Independência do Brasil" },
      { num: 8, period: "14 a 18/09/2026", holiday: "Prova Paulista" },
      { num: 9, period: "21 a 25/09/2026", holiday: "Recuperação" },
      { num: 10, period: "28/09 a 02/10/2026", holiday: "Consolidação" }
    ];
  }
  return [
    { num: 1, period: "05 a 09/10/2026", holiday: "" },
    { num: 2, period: "12 a 16/10/2026", holiday: "Feriado: 12/10 - N. Sra. Aparecida" },
    { num: 3, period: "19 a 23/10/2026", holiday: "" },
    { num: 4, period: "26 a 30/10/2026", holiday: "" },
    { num: 5, period: "02 a 06/11/2026", holiday: "Feriados: 02/11 - Finados; 04/11 - Padroeiro de Campinas (S. Carlos Borromeu)" },
    { num: 6, period: "09 a 13/11/2026", holiday: "" },
    { num: 7, period: "16 a 20/11/2026", holiday: "Feriado: 20/11 - Consciência Negra" },
    { num: 8, period: "23 a 27/11/2026", holiday: "Prova Paulista" },
    { num: 9, period: "30/11 a 04/12/2026", holiday: "Recuperação" },
    { num: 10, period: "07 a 18/12/2026", holiday: "Feriado: 08/12 - Imaculada Conceição (Campinas); Consolidação" }
  ];
}

function getWeekPeriod(bimestre: string, weekIndex: number) {
  const weeks = getWeeksForBimestre(bimestre);
  const w = weeks[weekIndex];
  if (!w) return '';
  if (w.holiday) {
    return `${w.period} | ${w.holiday}`;
  }
  return w.period;
}

function buildDocumentHTML(
  escola: string,
  docente: string,
  segmento: string,
  componente: string,
  serie: string,
  bimestre: string,
  semanas: any[]
) {
  const tableRows = semanas.map((s, idx) => {
    return `
      <table border="1" style="width: 100%; border-collapse: collapse; margin-bottom: 15pt; font-family: Cambria, Georgia, serif; font-size: 11pt; color: black; border: 1pt solid black; table-layout: fixed;">
          <colgroup>
              <col style="width: 5%;">
              <col style="width: 34%;">
              <col style="width: 16%;">
              <col style="width: 29%;">
              <col style="width: 16%;">
          </colgroup>
          <tbody>
              <tr style="background-color: #f2f2f2; font-weight: bold;">
                  <td colspan="5" style="border: 1pt solid black; padding: 6pt; text-align: left; font-size: 11pt; text-transform: uppercase;">
                      SEMANA ${idx + 1} &nbsp;&nbsp;|&nbsp;&nbsp; PERÍODO: ${s.periodo}
                  </td>
              </tr>
              <tr>
                  <td colspan="2" style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: left;">
                      Aula(s) do material Escopo-Sequência: <span style="font-weight: normal;">${s.aulas_escopo}</span>
                  </td>
                  <td style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: center; background-color: #fafafa;">Conteúdos ⬇️</td>
                  <td style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: center; background-color: #fafafa;">Estratégia/Metodologia ⬇️</td>
                  <td style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: center; background-color: #fafafa;">Avaliação ⬇️</td>
              </tr>
              <tr>
                  <td style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: center; vertical-align: middle; background-color: #fafafa;">
                      A<br>E
                  </td>
                  <td style="border: 1pt solid black; padding: 6pt; text-align: left; vertical-align: top;">
                      ${s.ae}
                  </td>
                  <td rowspan="2" style="border: 1pt solid black; padding: 6pt; text-align: left; vertical-align: top;">
                      ${s.conteudos}
                  </td>
                  <td rowspan="2" style="border: 1pt solid black; padding: 6pt; text-align: left; vertical-align: top;">
                      ${s.estrategia}
                  </td>
                  <td rowspan="2" style="border: 1pt solid black; padding: 6pt; text-align: left; vertical-align: top;">
                      ${s.avaliacao}
                  </td>
              </tr>
              <tr>
                  <td style="border: 1pt solid black; padding: 6pt; font-weight: bold; text-align: center; vertical-align: middle; background-color: #fafafa; font-size: 9pt; line-height: 1.1;">
                      Ações<br>Tax.<br>Bloom
                  </td>
                  <td style="border: 1pt solid black; padding: 6pt; text-align: left; vertical-align: top;">
                      ${s.acoes_bloom}
                  </td>
              </tr>
          </tbody>
      </table>
    `;
  }).join('\n');

  return `
    <div style="font-family: Cambria, Georgia, serif; font-size: 11pt; color: black; line-height: 1.15; max-width: 21cm; margin: 0 auto; box-sizing: border-box;">
        <div style="border: 1.5pt solid black; padding: 10pt; margin-bottom: 15pt; text-align: center; background-color: #fafafa;">
            <p style="margin: 0 0 4pt 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                ${escola}
            </p>
            <p style="margin: 0 0 8pt 0; font-size: 11pt; font-weight: bold; letter-spacing: 0.3px;">
                PLANO DE ENSINO - CRONOGRAMA INTEGRADO 2026
            </p>
            <div style="border-top: 1pt solid black; padding-top: 8pt; margin-top: 6pt; display: grid; grid-template-columns: repeat(2, 1fr); gap: 6pt; text-align: left; font-size: 10pt;">
                <div><strong>DOCENTE:</strong> ${docente.toUpperCase() || 'NÃO INFORMADO'}</div>
                <div><strong>SEGMENTO:</strong> ${segmento.toUpperCase()}</div>
                <div><strong>COMPONENTE CURRICULAR:</strong> ${componente.toUpperCase()}</div>
                <div><strong>SÉRIE / ANO:</strong> ${serie.toUpperCase()}</div>
                <div><strong>PERÍODO PEDAGÓGICO:</strong> ${bimestre.toUpperCase()}</div>
                <div><strong>PLANEJAMENTO:</strong> 10 SEMANAS (CRONOGRAMA FIXO COM FERIADOS)</div>
            </div>
        </div>
        ${tableRows}
    </div>
  `;
}

const FUNDAMENTAL_SUBJECTS = [
  { id: 'Matemática', label: 'Matemática', ready: true },
  { id: 'Língua Portuguesa', label: 'Língua Portuguesa', ready: true },
  { id: 'Ciências', label: 'Ciências', ready: true },
  { id: 'Geografia', label: 'Geografia (Construção)', ready: false },
  { id: 'História', label: 'História (Construção)', ready: false },
  { id: 'Língua Inglesa', label: 'Língua Inglesa (Construção)', ready: false },
  { id: 'Educação Física', label: 'Educação Física (Construção)', ready: false },
  { id: 'Arte', label: 'Arte (Construção)', ready: false }
];

const MEDIO_SUBJECTS = [
  { id: 'Matemática', label: 'Matemática', ready: true },
  { id: 'Língua Portuguesa', label: 'Língua Portuguesa', ready: true },
  { id: 'Filosofia', label: 'Filosofia (Construção)', ready: false },
  { id: 'Sociologia', label: 'Sociologia (Construção)', ready: false },
  { id: 'História', label: 'História (Construção)', ready: false },
  { id: 'Geografia', label: 'Geografia (Construção)', ready: false },
  { id: 'Língua Inglesa', label: 'Língua Inglesa (Construção)', ready: false },
  { id: 'Educação Física', label: 'Educação Física (Construção)', ready: false },
  { id: 'Arte', label: 'Arte (Construção)', ready: false },
  { id: 'Biologia', label: 'Biologia (Construção)', ready: false },
  { id: 'Química', label: 'Química (Construção)', ready: false }
];

export default function App() {
  const [items, setItems] = useState<CurriculumItem[]>(initialCurriculumData);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'curriculum' | 'plan-generator'>('curriculum');

  // Plan Generator States
  const [schoolName, setSchoolName] = useState('E.E. PROF. FRANCISCO ÁLVARES');
  const [docenteName, setDocenteName] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<'ENSINO FUNDAMENTAL ANOS FINAIS' | 'ENSINO MÉDIO'>('ENSINO FUNDAMENTAL ANOS FINAIS');
  const [dataSource, setDataSource] = useState<'oficial' | 'upload'>('oficial');
  const [uploadedDb, setUploadedDb] = useState<Record<string, any[][]>>({});
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Selection filters for Plan Generator
  const [planSubject, setPlanSubject] = useState('Matemática');
  const [planGrade, setPlanGrade] = useState('6º Ano');
  const [planBimester, setPlanBimester] = useState('3º Bimestre');
  
  // Selected lesson keys for Plan Generator
  const [selectedPlanLessons, setSelectedPlanLessons] = useState<Set<string>>(new Set());

  // Generated document HTML
  const [generatedDocHtml, setGeneratedDocHtml] = useState<string>('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIsError, setToastIsError] = useState(false);

  const showToast = (message: string, isError = false) => {
    setToastMessage(message);
    setToastIsError(isError);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  
  // Export states
  const [exportingToGoogle, setExportingToGoogle] = useState(false);
  const [createdSheetUrl, setCreatedSheetUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  
  // Real-time UTC Time Clock display
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initialize Auth state listener
    const unsubscribe = initAuth(
      (currentUser, cachedToken) => {
        setUser(currentUser);
        setToken(cachedToken);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );

    // Update real-time clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(timer);
    };
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setExportError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setExportError('Falha ao autenticar com o Google. Certifique-se de conceder as permissões.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setCreatedSheetUrl(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };


  // Delete a curriculum item
  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset curriculum to initial State
  const handleResetData = () => {
    if (window.confirm('Deseja redefinir os dados para o currículo original do estado? Isso removerá itens importados.')) {
      setItems(initialCurriculumData);
      setCreatedSheetUrl(null);
    }
  };

  // Synchronize filters on dataSource change
  useEffect(() => {
    if (dataSource === 'oficial') {
      setPlanSubject('Matemática');
      setPlanGrade(selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? '6º Ano' : '1ª Série');
      setPlanBimester('3º Bimestre');
    }
  }, [dataSource, selectedSegment]);

  // Update grade filter list and selected grade if planSubject changes under upload
  useEffect(() => {
    if (dataSource === 'upload' && planSubject && uploadedDb[planSubject]) {
      const sheetRows = uploadedDb[planSubject];
      const uniqueGrades = Array.from(new Set(sheetRows.slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean);
      if (uniqueGrades.length > 0) {
        if (!uniqueGrades.includes(planGrade)) {
          setPlanGrade(uniqueGrades[0]);
        }
      } else {
        setPlanGrade('');
      }
    }
  }, [planSubject, dataSource, uploadedDb]);

  // Update bimester filter list and selected bimester if planGrade changes under upload
  useEffect(() => {
    if (dataSource === 'upload' && planSubject && planGrade && uploadedDb[planSubject]) {
      const sheetRows = uploadedDb[planSubject];
      const filteredRows = sheetRows.slice(1).filter(r => String(r[0] || '').trim() === planGrade);
      const uniqueBims = Array.from(new Set(filteredRows.map(r => String(r[1] || '').trim()))).filter(Boolean);
      if (uniqueBims.length > 0) {
        if (!uniqueBims.includes(planBimester)) {
          setPlanBimester(uniqueBims[0]);
        }
      } else {
        setPlanBimester('');
      }
    }
  }, [planGrade, planSubject, dataSource, uploadedDb]);

  const getAvailableLessons = () => {
    if (dataSource === 'oficial') {
      if (!planSubject || !planGrade || !planBimester) return [];
      return items.filter((item) => {
        const itemDisc = item.disciplina || 'Matemática';
        return itemDisc === planSubject && item.ano === planGrade && item.bimestre === planBimester;
      });
    } else {
      if (!planSubject || !planGrade || !planBimester || !uploadedDb[planSubject]) return [];
      const sheetData = uploadedDb[planSubject];
      return sheetData.slice(1).map((row, index) => {
        return {
          id: `upload-${planSubject}-${index + 1}`,
          rowIdx: index + 1,
          ano: String(row[0] || '').trim(),
          bimestre: String(row[1] || '').trim(),
          aula: String(row[2] || '').trim(),
          titulo: String(row[3] || '').trim(),
          conteudo: String(row[4] || '').trim(),
          habilidade: String(row[5] || row[4] || '').trim(),
          objetivos: String(row[6] || row[5] || '').trim(),
        };
      }).filter(item => item.ano === planGrade && item.bimestre === planBimester);
    }
  };

  const togglePlanLesson = (key: string) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const selectAllPlanLessons = (lessons: any[]) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      lessons.forEach(l => {
        const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
        next.add(key);
      });
      return next;
    });
  };

  const deselectAllPlanLessons = (lessons: any[]) => {
    setSelectedPlanLessons(prev => {
      const next = new Set(prev);
      lessons.forEach(l => {
        const key = dataSource === 'oficial' ? `oficial|${l.id}` : `upload|${planSubject}|${l.rowIdx}`;
        next.delete(key);
      });
      return next;
    });
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const dataArr = new Uint8Array(evt?.target?.result as ArrayBuffer);
        const workbook = XLSX.read(dataArr, { type: 'array' });
        const db: Record<string, any[][]> = {};
        
        workbook.SheetNames.forEach(name => {
          const json = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }) as any[][];
          db[name] = json.filter(row => row && row.length > 0);
        });
        
        setUploadedDb(db);
        setDataSource('upload');
        
        // Reset selections
        const sheets = Object.keys(db);
        if (sheets.length > 0) {
          setPlanSubject(sheets[0]);
          
          const sheetRows = db[sheets[0]];
          const uniqueGrades = Array.from(new Set(sheetRows.slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean);
          if (uniqueGrades.length > 0) {
            setPlanGrade(uniqueGrades[0]);
            
            const filteredRows = sheetRows.slice(1).filter(r => String(r[0] || '').trim() === uniqueGrades[0]);
            const uniqueBims = Array.from(new Set(filteredRows.map(r => String(r[1] || '').trim()))).filter(Boolean);
            if (uniqueBims.length > 0) {
              setPlanBimester(uniqueBims[0]);
            } else {
              setPlanBimester('');
            }
          } else {
            setPlanGrade('');
            setPlanBimester('');
          }
        }
        showToast("Planilha de Escopo carregada com sucesso!");
      } catch (err) {
        showToast("Erro ao ler o arquivo Excel.", true);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setPlanError(null);
    
    // Simulate a short delay for smoother UX transition
    setTimeout(() => {
      try {
        let selectedLessonsData: any[] = [];
        if (dataSource === 'oficial') {
          const selectedLessons = items.filter(item => {
            const itemDisc = item.disciplina || 'Matemática';
            const matchesFilter = itemDisc === planSubject && item.ano === planGrade && item.bimestre === planBimester;
            return matchesFilter && selectedPlanLessons.has(`oficial|${item.id}`);
          });
          selectedLessonsData = selectedLessons.map(item => ({
            num: parseInt(String(item.aula).replace(/\D/g, '')) || 0,
            aula: item.aula,
            titulo: item.titulo,
            conteudo: item.conteudo,
            habilidade: item.habilidade,
            aprendizagem: item.aprendizagem,
            objetivos: item.objetivos
          })).sort((a, b) => a.num - b.num);
        } else {
          const sheetData = uploadedDb[planSubject];
          if (!sheetData) {
            throw new Error("Carregue uma planilha válida primeiro.");
          }
          const selectedLessons = sheetData.slice(1).map((row, index) => ({
            rowIdx: index + 1,
            row
          })).filter(wrapper => {
            const rowGrade = String(wrapper.row[0] || '').trim();
            const rowBim = String(wrapper.row[1] || '').trim();
            const matchesFilter = rowGrade === planGrade && rowBim === planBimester;
            return matchesFilter && selectedPlanLessons.has(`upload|${planSubject}|${wrapper.rowIdx}`);
          });
          
          const headers = sheetData[0] || [];
          const getCol = (rowData: any[], keyword: string) => {
            const idx = headers.findIndex(h => String(h || '').toLowerCase().includes(keyword.toLowerCase()));
            return idx !== -1 ? rowData[idx] : '';
          };

          selectedLessonsData = selectedLessons.map(w => {
            const numVal = parseInt(String(w.row[2]).replace(/\D/g, '')) || 0;
            const tVal = String(getCol(w.row, 'título') || getCol(w.row, 'tema') || w.row[3] || '').trim();
            const cVal = String(getCol(w.row, 'conteúdo') || w.row[4] || tVal).trim();
            const hVal = String(getCol(w.row, 'essencial') || getCol(w.row, 'ae') || getCol(w.row, 'habilidade') || w.row[5] || w.row[4] || '').trim();
            const oVal = String(getCol(w.row, 'objetivo') || getCol(w.row, 'aprendizagem') || w.row[6] || w.row[5] || '').trim();
            return {
              num: numVal,
              aula: String(w.row[2] || numVal),
              titulo: tVal,
              conteudo: cVal,
              habilidade: hVal,
              aprendizagem: hVal,
              objetivos: oVal
            };
          }).sort((a, b) => a.num - b.num);
        }

        if (selectedLessonsData.length === 0) {
          throw new Error("Selecione pelo menos uma aula para gerar o cronograma.");
        }

        // Distribute selected lessons across 7 weeks as evenly as possible
        const N = selectedLessonsData.length;
        const baseCount = Math.floor(N / 7);
        const extraCount = N % 7;
        
        const weeksLessons: any[][] = [];
        let currentIdx = 0;
        for (let i = 0; i < 7; i++) {
          const count = baseCount + (i < extraCount ? 1 : 0);
          weeksLessons.push(selectedLessonsData.slice(currentIdx, currentIdx + count));
          currentIdx += count;
        }

        const STRATEGIES_LIST = [
          "A- Aula expositiva com discussão pautada no material digital;",
          "B- Aula de estudo dirigido pautada no recurso do material impresso;",
          "C- Estudo dirigido;",
          "E- Aprendizagem baseada em problemas;",
          "G- Mapa mental;",
          "I- Gamificação;",
          "J- Rotação por estações;",
          "L- Sala de aula invertida;",
          "Q- Dimensão lúdica e cultural (danças, brincadeiras, lutas e adaptações dos esportes tradicionais.)"
        ];

        const EVALUATIONS_LIST = [
          "Acompanhamento da participação ativa e resolução de exercícios propostos no material digital.",
          "Avaliação formativa baseada na discussão dirigida e registros individuais no caderno.",
          "Observação direta da resolução de problemas e cooperação no trabalho prático.",
          "Análise qualitativa das produções dos estudantes e engajamento nas atividades de reflexão.",
          "Acompanhamento formativo através de autoavaliação e verificação de conceitos consolidados."
        ];

        const fullWeeks = [];
        for (let i = 0; i < 7; i++) {
          const weekLessons = weeksLessons[i] || [];
          
          if (weekLessons.length === 0) {
            fullWeeks.push({
              periodo: getWeekPeriod(planBimester, i),
              aulas_escopo: 'Sem aulas',
              conteudos: 'Nenhum conteúdo selecionado para esta semana.',
              avaliacao: 'Não aplicável',
              ae: 'Nenhuma Aprendizagem Essencial',
              estrategia: 'Nenhuma estratégia selecionada',
              acoes_bloom: 'Nenhuma ação selecionada'
            });
            continue;
          }

          // 1. aulas_escopo (only unique numbers)
          const uniqueAulas = Array.from(new Set(weekLessons.map(l => {
            const numOnly = String(l.aula).replace(/\D/g, '');
            return numOnly || String(l.num);
          }).filter(Boolean)));
          const aulasEscopo = uniqueAulas.join(', ');

          // 2. ae (Aprendizagem Essencial - pull from Habilidade/Aprendizagem with unique elements)
          const uniqueAEs: string[] = [];
          weekLessons.forEach(l => {
            const text = (l.aprendizagem || l.habilidade || '').trim();
            if (!text) return;
            const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
            lines.forEach(line => {
              if (!uniqueAEs.includes(line)) {
                uniqueAEs.push(line);
              }
            });
          });

          const aeHtml = uniqueAEs.length > 0
            ? `<ul>` + uniqueAEs.map(ae => `<li>${ae}</li>`).join('') + `</ul>`
            : '<p>Nenhuma Aprendizagem Essencial selecionada.</p>';

          // 3. conteudos
          const uniqueContents: string[] = [];
          weekLessons.forEach(l => {
            const title = (l.titulo || '').trim();
            const content = (l.conteudo || '').trim();
            let displayText = title;
            if (content && content !== title) {
              displayText = `${title}: ${content}`;
            }
            if (displayText && !uniqueContents.includes(displayText)) {
              uniqueContents.push(displayText);
            }
          });

          const conteudosHtml = uniqueContents.length > 0
            ? `<ul>` + uniqueContents.map(c => `<li>${c}</li>`).join('') + `</ul>`
            : '<p>Nenhum conteúdo listado.</p>';

          // 4. acoes_bloom (transcribe goals without duplicates)
          const uniqueObjectives: string[] = [];
          weekLessons.forEach(l => {
            const text = (l.objetivos || '').trim();
            if (!text) return;
            const lines = text.split('\n').map(line => line.replace(/^[•\s\-\*]+/, '').trim()).filter(Boolean);
            lines.forEach(line => {
              if (!uniqueObjectives.includes(line)) {
                uniqueObjectives.push(line);
              }
            });
          });

          const acoesBloomHtml = uniqueObjectives.length > 0
            ? `<ul>` + uniqueObjectives.map(obj => `<li>${obj}</li>`).join('') + `</ul>`
            : '<ul><li>Lembrar</li><li>Compreender</li><li>Aplicar</li></ul>';

          // 5. estrategia
          let estrategiaSelected = STRATEGIES_LIST[i % STRATEGIES_LIST.length];
          const weekContentLower = uniqueContents.join(' ').toLowerCase();
          if (weekContentLower.includes('jogo') || weekContentLower.includes('desafio') || weekContentLower.includes('lúdica')) {
            estrategiaSelected = "I- Gamificação;";
          } else if (weekContentLower.includes('problema') || weekContentLower.includes('equação') || weekContentLower.includes('situação')) {
            estrategiaSelected = "E- Aprendizagem baseada em problemas;";
          } else if (weekContentLower.includes('gráfico') || weekContentLower.includes('tabela') || weekContentLower.includes('pesquisa')) {
            estrategiaSelected = "C- Estudo dirigido;";
          } else if (weekContentLower.includes('laboratório') || weekContentLower.includes('experimento') || weekContentLower.includes('prática')) {
            estrategiaSelected = "K- Aula prática;";
          }

          // 6. avaliacao
          let avaliacaoSelected = EVALUATIONS_LIST[i % EVALUATIONS_LIST.length];
          if (estrategiaSelected.includes("Gamificação")) {
            avaliacaoSelected = "Acompanhamento formativo através da participação nos jogos, colaboração mútua e pontuação nos desafios propostos.";
          } else if (estrategiaSelected.includes("Aprendizagem baseada em problemas")) {
            avaliacaoSelected = "Formativa: Observação do percurso de resolução de situações-problema e da argumentação oral na validação dos resultados.";
          }

          fullWeeks.push({
            periodo: getWeekPeriod(planBimester, i),
            aulas_escopo: aulasEscopo,
            conteudos: conteudosHtml,
            avaliacao: avaliacaoSelected,
            ae: aeHtml,
            estrategia: estrategiaSelected,
            acoes_bloom: acoesBloomHtml
          });
        }

        // Weeks 8, 9, 10
        fullWeeks.push({
          periodo: getWeekPeriod(planBimester, 7),
          aulas_escopo: "Prova Paulista",
          conteudos: "Revisão Geral e aplicação da Prova Paulista",
          avaliacao: "Formativa / Prova Paulista",
          ae: "Revisão de todas as habilidades desenvolvidas ao longo do bimestre.",
          estrategia: "A- Aula expositiva com discussão pautada no material digital;",
          acoes_bloom: "<ul><li>Lembrar</li><li>Aplicar</li><li>Analisar</li></ul>"
        });
        fullWeeks.push({
          periodo: getWeekPeriod(planBimester, 8),
          aulas_escopo: "Recuperação",
          conteudos: "Retomada de habilidades e conceitos com maior defasagem pedagógica",
          avaliacao: "Diagnóstica / Formativa",
          ae: "Atividades de reforço e retomada focadas nos descritores menos consolidados.",
          estrategia: "C- Estudo dirigido;",
          acoes_bloom: "<ul><li>Corrigir</li><li>Identificar</li><li>Compreender</li></ul>"
        });
        fullWeeks.push({
          periodo: getWeekPeriod(planBimester, 9),
          aulas_escopo: "Consolidação",
          conteudos: "Fechamento de notas, conselho de classe e consolidação das aprendizagens",
          avaliacao: "Somativa / Final",
          ae: "Sistematização e consolidação das aprendizagens essenciais estabelecidas no currículo paulista.",
          estrategia: "J- Rotação por estações;",
          acoes_bloom: "<ul><li>Avaliar</li><li>Refletir</li></ul>"
        });

        const docHtml = buildDocumentHTML(schoolName, docenteName, selectedSegment, planSubject, planGrade, planBimester, fullWeeks);
        setGeneratedDocHtml(docHtml);
        showToast("Plano de Ensino Gerado com Sucesso!");
      } catch (err: any) {
        console.error('Plan generation failed:', err);
        setPlanError(err.message || 'Erro ao gerar o plano.');
        showToast(err.message || "Erro ao gerar o plano.", true);
      } finally {
        setIsGeneratingPlan(false);
      }
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const el = document.getElementById('output-document');
    if (!el) return;
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    try {
      document.execCommand('copy');
      showToast("Texto e Tabelas Copiados!");
    } catch (err) {
      showToast("Erro ao copiar.", true);
    }
    window.getSelection()?.removeAllRanges();
  };

  const handleDownloadHtml = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <title>Plano de Ensino 2026</title>
          <style>
              body { font-family: Cambria, Georgia, serif; background-color: #f1f5f9; margin: 0; padding: 40px; display: flex; justify-content: center; }
              .plano-page { background: white; width: 100%; max-width: 1100px; padding: 40px 50px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); box-sizing: border-box; font-size: 11pt; color: black; line-height: 1.15; }
              p { margin-top: 0; margin-bottom: 6pt; text-align: left; }
              ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
              li { margin-bottom: 3pt; text-align: left; }
              table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 15pt; }
              td { border: 1pt solid black; padding: 0.15cm 0.2cm; vertical-align: top; word-wrap: break-word; text-align: left; }
              @media print { body { background: white; padding: 0; } .plano-page { box-shadow: none; max-width: 100%; padding: 0; } }
          </style>
      </head>
      <body>
          <div class="plano-page">
              ${generatedDocHtml}
          </div>
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Plano_Ensino.html";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
    showToast("Arquivo HTML baixado!");
  };

  const handleDownloadDoc = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    const fullHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
          <meta charset='utf-8'>
          <title>Plano de Ensino</title>
          <style>
              @page WordSection1 {
                  size: 21.0cm 29.7cm;
                  margin: 1.27cm 1.27cm 1.27cm 1.27cm;
                  mso-header-margin: 35.4pt;
                  mso-footer-margin: 35.4pt;
                  mso-paper-source: 0;
              }
              div.WordSection1 { page: WordSection1; }
          </style>
      </head>
      <body>
          <div class="WordSection1">
              ${generatedDocHtml}
          </div>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', fullHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Plano_Ensino.doc";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
    showToast("Arquivo Word (.doc) baixado!");
  };

  const handlePrintPdf = () => {
    if (!generatedDocHtml) {
      showToast("Gere um documento primeiro.", true);
      return;
    }
    try {
      const printFrame = document.createElement('iframe');
      printFrame.style.visibility = 'hidden';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow ? printFrame.contentWindow.document : printFrame.contentDocument;
      if (!frameDoc) throw new Error("Could not access iframe document");
      
      frameDoc.open();
      frameDoc.write(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <title>Imprimir Plano de Ensino</title>
              <style>
                  body { font-family: Cambria, Georgia, serif; color: black; line-height: 1.15; font-size: 11pt; margin: 0; padding: 0; }
                  p { margin-top: 0; margin-bottom: 6pt; text-align: left; }
                  ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                  li { margin-bottom: 3pt; text-align: left; }
                  table { table-layout: fixed; border-collapse: collapse; width: 100%; margin-bottom: 15pt; page-break-inside: avoid; }
                  td { border: 1pt solid black; padding: 0.15cm 0.2cm; vertical-align: top; word-wrap: break-word; text-align: left; }
                  @page { size: A4 portrait; margin: 1.27cm; }
              </style>
          </head>
          <body>
              ${generatedDocHtml}
          </body>
          </html>
      `);
      frameDoc.close();

      printFrame.contentWindow?.focus();
      setTimeout(() => {
          try {
              printFrame.contentWindow?.print();
          } catch (err) {
              window.print();
          }
          setTimeout(() => document.body.removeChild(printFrame), 1000);
      }, 500);
    } catch (e) {
      window.print();
    }
  };

  // Local Excel (.xlsx) Export Handler
  const handleExportLocalExcel = () => {
    setExportError(null);
    try {
      const headers = [
        'Ano',
        'Bimestre',
        'Aula',
        'Título da Aula',
        'Conteúdo',
        'Objetivos de Aprendizagem',
        'Habilidade',
        'Aprendizagem Essencial',
      ];

      const rows = items.map((item) => [
        item.ano,
        item.bimestre,
        item.aula,
        item.titulo,
        item.conteudo,
        item.objetivos,
        item.habilidade,
        item.aprendizagem,
      ]);

      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

      // Add column widths for nice spacing in Excel
      ws['!cols'] = [
        { wch: 12 }, // Ano
        { wch: 15 }, // Bimestre
        { wch: 8 },  // Aula
        { wch: 35 }, // Título
        { wch: 45 }, // Conteúdo
        { wch: 50 }, // Objetivos
        { wch: 18 }, // Habilidade
        { wch: 45 }, // Aprendizagem
      ];

      // Enable Auto-Filters in Excel
      ws['!autofilter'] = { ref: `A1:H${items.length + 1}` };

      // Apply bold style metadata to first row if supported by client engines
      ws['A1'].s = { font: { bold: true } };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Currículo Priorizado');

      XLSX.writeFile(wb, 'curriculo_priorizado_completo.xlsx');
    } catch (err: any) {
      console.error('Excel writing error:', err);
      setExportError('Erro ao gerar o arquivo Excel local.');
    }
  };

  // Google Sheets Export Handler using the authorized OAuth access token
  const handleExportGoogleSheets = async () => {
    setExportError(null);
    setCreatedSheetUrl(null);

    // If needs authentication, prompt first
    if (needsAuth || !token) {
      try {
        const result = await googleSignIn();
        if (result) {
          await executeGoogleSheetsExport(result.accessToken);
        }
      } catch (err) {
        console.error('Authentication popup failed:', err);
        setExportError('É necessário autenticar com o Google para exportar diretamente para sua conta.');
      }
      return;
    }

    await executeGoogleSheetsExport(token);
  };

  const executeGoogleSheetsExport = async (accessToken: string) => {
    setExportingToGoogle(true);
    try {
      const sheetTitle = schoolName
        ? `Currículo Priorizado 2026 - ${schoolName.toUpperCase()}`
        : 'Currículo Priorizado Multidisciplinar 2026';
      const response = await exportToGoogleSheets(accessToken, items, sheetTitle);
      setCreatedSheetUrl(response.spreadsheetUrl);
    } catch (err: any) {
      console.error('Google Sheets export failed:', err);
      setExportError(err.message || 'Falha ao sincronizar com o Google Planilhas. Verifique suas conexões de rede.');
    } finally {
      setExportingToGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-16">
      {/* Top Professional Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center text-white shrink-0 shadow-sm">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800 leading-tight flex items-center gap-2">
                Organizador do Currículo Priorizado
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Multidisciplinar
                </span>
              </h1>
              <p className="text-xs text-gray-400">
                Planejamento_Curricular_Integrado.xlsx • Ensino Fundamental e Ensino Médio
              </p>
            </div>
          </div>

          {/* Time / UTC and User profile */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {/* Live UTC time */}
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span>{currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC</span>
            </div>

            {/* Login State */}
            {user ? (
              <div className="flex items-center gap-2.5 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuário'}
                    referrerPolicy="no-referrer"
                    className="h-6 w-6 rounded border border-gray-300"
                  />
                ) : (
                  <div className="bg-emerald-600 text-white p-1 rounded">
                    <UserIcon className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-gray-700 line-clamp-1">{user.displayName}</div>
                  <div className="text-[10px] text-gray-400 line-clamp-1">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sair"
                  className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition ml-1"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                ) : (
                  <LogIn className="h-3.5 w-3.5 text-emerald-600" />
                )}
                Conectar Google Drive
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-6 font-semibold text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-emerald-600 text-emerald-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Matriz Curricular Priorizada
          </button>
          <button
            onClick={() => setActiveTab('plan-generator')}
            className={`py-3 px-6 font-semibold text-sm border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'plan-generator'
                ? 'border-emerald-600 text-emerald-600 font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BookOpen className="h-4 w-4 text-emerald-600" />
            Gerador de Plano de Ensino (Campinas 2026)
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        
        {activeTab === 'curriculum' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            
            {/* Bento Column Left: Statistics, AI Actions and Export */}
            <div className="space-y-6 lg:col-span-1">
              
              {/* Bento Block 1: Statistics Card */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">
                  Resumo Curricular
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="text-gray-400 text-xs font-semibold">Total de Aulas</div>
                    <div className="text-3xl font-extrabold text-gray-800 mt-1">{items.length}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-100">
                    <div className="text-gray-400 text-xs font-semibold">Habilidades Únicas</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">
                      {new Set(items.flatMap((i) => i.habilidade.split(/[\s,]+/).filter(Boolean))).size}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs text-gray-500 font-semibold flex items-center justify-between">
                    <span>Aulas por Série / Ano:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    {['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1ª Série', '2ª Série', '3ª Série'].map((ano) => (
                      <div key={ano} className="bg-gray-50 rounded p-2 border border-gray-100">
                        <div className="font-bold text-gray-800">
                          {items.filter((i) => i.ano === ano).length}
                        </div>
                        <div className="text-gray-400 text-[9px] font-medium leading-none mt-1">{ano}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Block 3: Export Actions */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">
                  Exportar e Formatar
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Gere e baixe a planilha formatada com <strong>filtros automáticos</strong> e <strong>cabeçalhos em negrito</strong>. Escolha o formato de saída:
                </p>

                <div className="space-y-3 pt-2">
                  {/* Local Excel Export */}
                  <button
                    onClick={handleExportLocalExcel}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-xs cursor-pointer"
                  >
                    <Download className="h-4 w-4 text-emerald-600" />
                    Baixar Excel (.xlsx) local
                  </button>

                  {/* Google Sheets Live Export */}
                  <button
                    onClick={handleExportGoogleSheets}
                    disabled={exportingToGoogle}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-sm font-bold text-white shadow-sm transition disabled:opacity-50 cursor-pointer"
                  >
                    {exportingToGoogle ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4" />
                        Exportar para Google Planilhas
                      </>
                    )}
                  </button>
                </div>

                {/* Status and messages */}
                <AnimatePresence>
                  {createdSheetUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-emerald-50 border border-emerald-100 p-4 rounded space-y-2.5 text-xs text-emerald-800"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-emerald-600" />
                        Planilha criada com sucesso!
                      </div>
                      <p className="text-emerald-700 leading-normal">
                        A planilha formatada foi gerada no seu Google Drive com filtros de busca e cabeçalhos em negrito.
                      </p>
                      <a
                        href={createdSheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs"
                      >
                        Abrir no Google Planilhas ↗
                      </a>
                    </motion.div>
                  )}

                  {exportError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-red-50 border border-red-100 p-4 rounded flex gap-2 text-xs text-red-700 leading-relaxed"
                    >
                      <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-red-500" />
                      <span>{exportError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bento Block 4: Utilities */}
              <div className="bg-white rounded border border-gray-200 p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Opções de Dados</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Deseja reiniciar a tabela?</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded border border-gray-200 hover:border-red-100 transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Redefinir tudo
                </button>
              </div>

            </div>

            {/* Table Column Right: Full Interactive Table Grid */}
            <div className="lg:col-span-2">
              <CurriculumTable items={items} onDeleteItem={handleDeleteItem} />
            </div>

          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Filter and Lesson List Sidebar: Col span 4 */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* IDENTIFICATION CARD */}
              <div className="bg-white rounded border border-gray-200 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  Identificação do Plano
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nome da Unidade Escolar</label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ex: E.E. PROF. FRANCISCO ÁLVARES"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nome do(a) Docente</label>
                    <input
                      type="text"
                      value={docenteName}
                      onChange={(e) => setDocenteName(e.target.value)}
                      placeholder="Digite seu nome completo"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* MATRIX CONFIG CARD */}
              <div className="bg-white rounded border border-gray-200 p-5 shadow-xs space-y-4">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-2 flex items-center gap-1.5">
                  <FileCode className="h-4 w-4 text-emerald-600" />
                  Fonte de Dados & Seleção
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Nível de Ensino</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSelectedSegment('ENSINO FUNDAMENTAL ANOS FINAIS');
                          setPlanGrade('6º Ano');
                        }}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Anos Finais
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSegment('ENSINO MÉDIO');
                          setPlanGrade('1ª Série');
                        }}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          selectedSegment === 'ENSINO MÉDIO'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Ensino Médio
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 font-semibold mb-1">Origem dos Conteúdos</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDataSource('oficial')}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          dataSource === 'oficial'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Matriz Integrada
                      </button>
                      <button
                        onClick={() => setDataSource('upload')}
                        className={`px-3 py-2 rounded border font-semibold text-center transition cursor-pointer ${
                          dataSource === 'upload'
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        Nova Planilha (Escopo)
                      </button>
                    </div>
                  </div>

                  {dataSource === 'upload' && (
                    <div className="bg-emerald-50/50 p-3 rounded border border-emerald-100 space-y-2 text-xs">
                      <label className="block text-emerald-800 font-bold">Importar Planilha Personalizada</label>
                      <p className="text-[10px] text-emerald-700 leading-relaxed">
                        Arraste ou selecione qualquer arquivo <strong>.xlsx / .xls</strong> contendo as colunas de escopo (Ano, Bimestre, Aula, Conteúdo, Objetivos, Habilidade). As abas serão lidas como disciplinas!
                      </p>
                      <div className="relative border border-dashed border-emerald-300 rounded bg-white hover:bg-emerald-50 transition p-3 text-center cursor-pointer">
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          onChange={handleExcelUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-1">
                          <FileUp className="h-5 w-5 text-emerald-600" />
                          <span className="text-[11px] font-semibold text-emerald-800">
                            {uploadedFileName ? uploadedFileName : "Selecionar arquivo .xlsx"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Filter fields */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-gray-600 font-semibold mb-1">Componente Curricular / Disciplina</label>
                      {dataSource === 'oficial' ? (
                        <select
                          value={planSubject}
                          onChange={(e) => setPlanSubject(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS'
                            ? FUNDAMENTAL_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)
                            : MEDIO_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                        </select>
                      ) : (
                        <select
                          value={planSubject}
                          onChange={(e) => setPlanSubject(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        >
                          {Object.keys(uploadedDb).length > 0 ? (
                            Object.keys(uploadedDb).map(sheet => <option key={sheet} value={sheet}>{sheet}</option>)
                          ) : (
                            <option value="">Carregue uma planilha primeiro</option>
                          )}
                        </select>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">Série / Ano</label>
                        {dataSource === 'oficial' ? (
                          <select
                            value={planGrade}
                            onChange={(e) => setPlanGrade(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? (
                              <>
                                <option value="6º Ano">6º Ano</option>
                                <option value="7º Ano">7º Ano</option>
                                <option value="8º Ano">8º Ano</option>
                                <option value="9º Ano">9º Ano</option>
                              </>
                            ) : (
                              <>
                                <option value="1ª Série">1ª Série</option>
                                <option value="2ª Série">2ª Série</option>
                                <option value="3ª Série">3ª Série</option>
                              </>
                            )}
                          </select>
                        ) : (
                          <select
                            value={planGrade}
                            onChange={(e) => setPlanGrade(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {uploadedDb[planSubject] ? (
                              Array.from(new Set(uploadedDb[planSubject].slice(1).map(r => String(r[0] || '').trim()))).filter(Boolean).map(g => (
                                <option key={g} value={g}>{g}</option>
                              ))
                            ) : (
                              <option value="">Sem dados</option>
                            )}
                          </select>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-600 font-semibold mb-1">Bimestre</label>
                        {dataSource === 'oficial' ? (
                          <select
                            value={planBimester}
                            onChange={(e) => setPlanBimester(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            <option value="1º Bimestre">1º Bimestre</option>
                            <option value="2º Bimestre">2º Bimestre</option>
                            <option value="3º Bimestre">3º Bimestre</option>
                            <option value="4º Bimestre">4º Bimestre</option>
                          </select>
                        ) : (
                          <select
                            value={planBimester}
                            onChange={(e) => setPlanBimester(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-white rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                          >
                            {uploadedDb[planSubject] ? (
                              Array.from(new Set(
                                uploadedDb[planSubject].slice(1)
                                  .filter(r => String(r[0] || '').trim() === planGrade)
                                  .map(r => String(r[1] || '').trim())
                              )).filter(Boolean).map(b => (
                                <option key={b} value={b}>{b}</option>
                              ))
                            ) : (
                              <option value="">Sem dados</option>
                            )}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LESSONS CONTAINER */}
              {(() => {
                const isConstruction = dataSource === 'oficial' && (
                  (selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' && !FUNDAMENTAL_SUBJECTS.find(s => s.id === planSubject)?.ready) ||
                  (selectedSegment === 'ENSINO MÉDIO' && !MEDIO_SUBJECTS.find(s => s.id === planSubject)?.ready)
                );

                if (isConstruction) {
                  return (
                    <div className="bg-amber-50 rounded border border-amber-200 p-5 shadow-xs text-center space-y-3">
                      <Info className="h-8 w-8 text-amber-500 mx-auto" />
                      <h4 className="font-bold text-amber-900 text-sm">Página em Construção 🚧</h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        A matriz oficial de <strong>{planSubject}</strong> para o {selectedSegment === 'ENSINO FUNDAMENTAL ANOS FINAIS' ? 'Ensino Fundamental' : 'Ensino Médio'} está sendo integrada e será disponibilizada em breve!
                      </p>
                      <p className="text-[11px] text-amber-700 leading-relaxed bg-amber-100/50 p-2.5 rounded border border-amber-200/50">
                        <strong>Dica:</strong> Você pode usar a aba <strong>"Nova Planilha (Escopo)"</strong> acima para importar o escopo e planejar as aulas de Ciências, História, Geografia, Biologia, etc., agora mesmo!
                      </p>
                    </div>
                  );
                }

                const lessons = getAvailableLessons();

                return (
                  <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden flex flex-col h-[400px]">
                    <div className="bg-gray-50 border-b border-gray-200 p-4 shrink-0 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">Aulas Disponíveis</h4>
                        <span className="text-[10px] text-gray-400 font-semibold">{lessons.length} aulas encontradas</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => selectAllPlanLessons(lessons)}
                          className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded cursor-pointer"
                        >
                          Sel. Todas
                        </button>
                        <button
                          onClick={() => deselectAllPlanLessons(lessons)}
                          className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-2 py-1 rounded cursor-pointer"
                        >
                          Limpar
                        </button>
                      </div>
                    </div>

                    <div className="overflow-y-auto divide-y divide-gray-100 flex-1">
                      {lessons.length > 0 ? (
                        lessons.map((lesson) => {
                          const key = dataSource === 'oficial' ? `oficial|${lesson.id}` : `upload|${planSubject}|${lesson.rowIdx}`;
                          const isChecked = selectedPlanLessons.has(key);
                          return (
                            <div
                              key={key}
                              onClick={() => togglePlanLesson(key)}
                              className={`p-3 text-xs text-left cursor-pointer transition flex gap-2 items-start ${
                                isChecked ? 'bg-emerald-50/40 hover:bg-emerald-50' : 'bg-white hover:bg-gray-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // click handled on parent div
                                className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <div className="space-y-0.5">
                                <div className="font-bold text-gray-700 flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-sm text-[10px]">
                                    {lesson.aula}
                                  </span>
                                  <span className="line-clamp-1">{lesson.titulo}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 line-clamp-1 leading-normal">
                                  <strong>Conteúdo:</strong> {lesson.conteudo}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-8 text-center text-gray-400 text-xs flex flex-col items-center justify-center h-full gap-2">
                          <Inbox className="h-6 w-6 text-gray-300" />
                          <span>Nenhuma aula disponível para os filtros selecionados.</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 p-4 shrink-0 space-y-2">
                      <button
                        onClick={handleGeneratePlan}
                        disabled={isGeneratingPlan || lessons.length === 0 || Array.from(selectedPlanLessons).filter((k: string) => k.startsWith(dataSource === 'oficial' ? 'oficial|' : 'upload|')).length === 0}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-sm disabled:opacity-50 transition cursor-pointer"
                      >
                        {isGeneratingPlan ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin animate-infinite" />
                            <span>Elaborando Plano de Ensino...</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="h-4 w-4" />
                            <span>Gerar Plano de Ensino Pronto</span>
                          </>
                        )}
                      </button>
                      <div className="text-[10px] text-gray-400 text-center font-medium leading-relaxed">
                        {Array.from(selectedPlanLessons).filter((k: string) => k.startsWith(dataSource === 'oficial' ? 'oficial|' : 'upload|')).length} aula(s) selecionada(s) para o plano de 10 semanas.
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>

            {/* Live Preview & Actions Panel: Col span 8 */}
            <div className="lg:col-span-8 flex flex-col min-h-[600px]">
              {isGeneratingPlan ? (
                <div className="bg-white rounded border border-gray-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm">Elaborando Cronograma Integrado...</h4>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                      O organizador automático está compilando e distribuindo os objetivos, conteúdos e habilidades do material oficial de Campinas 2026 para preencher as estratégias metodológicas, avaliações, Ações da Taxonomia de Bloom e as Aprendizagens Essenciais (AE) de cada semana.
                    </p>
                  </div>
                </div>
              ) : generatedDocHtml ? (
                <div className="space-y-4 flex flex-col flex-1">
                  {/* Action Bar */}
                  <div className="bg-white rounded border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500 font-semibold">Documento Pronto para Exportação</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copiar Texto
                      </button>
                      <button
                        onClick={handleDownloadDoc}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-55 hover:bg-blue-100 text-blue-700 text-xs font-bold transition cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Baixar Word (.doc)
                      </button>
                      <button
                        onClick={handleDownloadHtml}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold transition cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Baixar HTML
                      </button>
                      <button
                        onClick={handlePrintPdf}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Imprimir / PDF
                      </button>
                    </div>
                  </div>

                  {/* Styled centered Page rendering */}
                  <div className="bg-gray-100/60 rounded border border-gray-200 p-6 overflow-y-auto flex-1 flex justify-center max-h-[800px] shadow-inner">
                    <div className="bg-white border shadow-md w-full max-w-[21cm] p-[1.5cm] box-sizing-border-box overflow-x-auto min-h-[29.7cm] text-left">
                      <style>{`
                        #output-document p { margin-top: 0; margin-bottom: 6pt; }
                        #output-document ul { margin-top: 0; margin-bottom: 0; padding-left: 15pt; }
                        #output-document li { margin-bottom: 3pt; }
                      `}</style>
                      <div id="output-document" dangerouslySetInnerHTML={{ __html: generatedDocHtml }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded border border-gray-200 p-12 text-center flex-1 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm">Cronograma Integrado de 10 Semanas</h4>
                    <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto">
                      Selecione as aulas na lista lateral esquerda e clique em <strong>Gerar Plano de Ensino Pronto</strong>. O sistema compilará automaticamente de forma local e offline as avaliações, metodologias ativas, ações Bloom e o cronograma integrado de Campinas 2026.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded border border-gray-100 max-w-lg text-left text-[11px] text-gray-500 space-y-2 mt-2 leading-relaxed">
                    <h5 className="font-bold text-gray-700 uppercase tracking-wide text-xs mb-1">Previsão e Calendário Escolar de Campinas (2026):</h5>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>1º Bimestre:</strong> 02/02 a 10/04 (10 semanas; Carnaval em 17/02; Sexta-feira Santa em 03/04).</li>
                      <li><strong>2º Bimestre:</strong> 22/04 a 03/07 (10 semanas; Dia do Trabalho em 01/05; Corpus Christi em 04/06).</li>
                      <li><strong>3º Bimestre:</strong> 24/07 a 02/10 (10 semanas; Independência do Brasil em 07/09).</li>
                      <li><strong>4º Bimestre:</strong> 05/10 a 18/12 (10 semanas; N. Sra. Aparecida em 12/10; Finados em 02/11; Padroeiro de Campinas em 04/11; Consciência Negra em 20/11; Imaculada Conceição em 08/12).</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-semibold border ${
              toastIsError
                ? 'bg-red-50 border-red-100 text-red-800'
                : 'bg-emerald-50 border-emerald-100 text-emerald-800'
            }`}
          >
            {toastIsError ? <AlertCircle className="h-4 w-4 text-red-600" /> : <Check className="h-4 w-4 text-emerald-600" />}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
