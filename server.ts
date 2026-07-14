import express from 'express';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Setup file upload handling in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

app.use(express.json({ limit: '15mb' }));

// Configuração para permitir a incorporação segura do web app em iframes (como o Google Sites)
app.use((req, res, next) => {
  // Remove restrições padrão de frame para permitir exibição em outros sites
  res.removeHeader('X-Frame-Options');
  
  // Define a política CSP permitindo o carregamento em iframes do Google Sites
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://sites.google.com https://*.google.com https://*.googleusercontent.com;"
  );
  next();
});

// Initialize the modern @google/genai SDK client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('A variável de ambiente GEMINI_API_KEY não está configurada.');
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return ai;
}

// -------------------------------------------------------------
// API Routes MUST go first!
// -------------------------------------------------------------

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Extract curriculum data from uploaded PDF
app.post('/api/extract', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo PDF enviado.' });
    }

    const gemini = getGeminiClient();
    const pdfBase64 = req.file.buffer.toString('base64');

    const promptText = `Analise atentamente as tabelas deste PDF de Currículo Priorizado (Matemática).
Extraia as aulas listadas, organizando as informações exatamente nas seguintes colunas:
- ano: O Ano Escolar (Ex: "6º Ano", "7º Ano", "8º Ano", "9º Ano" - identifique no cabeçalho ou texto da página)
- bimestre: O Bimestre (Ex: "1º Bimestre", "2º Bimestre", etc. - identifique na página)
- aula: O número da aula como string (Ex: "1", "2")
- titulo: O título oficial da aula (coluna "Aula" ou similar, ex: "Os números naturais em situações do cotidiano")
- conteudo: O texto da coluna "Conteúdo" correspondente
- objetivos: O texto da coluna "Objetivos de aprendizagem", preservando os marcadores/bullets (•)
- habilidade: O código da habilidade (Ex: "EF06MA01, EF06MA02" - coluna "Habilidades")
- aprendizagem: O texto da coluna "Aprendizagem Essencial" correspondente

Retorne EXCLUSIVAMENTE um objeto JSON estruturado da seguinte forma, com todos os campos preenchidos com o texto em português do PDF:
{
  "items": [
    {
      "id": "um-id-unico-gerado-ex-uuid",
      "ano": "6º Ano",
      "bimestre": "1º Bimestre",
      "aula": "1",
      "titulo": "Título da Aula",
      "conteudo": "Descrição do Conteúdo...",
      "objetivos": "• Objetivo 1\\n• Objetivo 2...",
      "habilidade": "EF06MA01, EF06MA02",
      "aprendizagem": "Descrição da aprendizagem..."
    }
  ]
}

Responda apenas com a string JSON válida. Não inclua nenhuma explicação adicional fora do JSON.`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: pdfBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text?.trim() || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(resultText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini output as JSON. Output raw:', resultText);
      return res.status(500).json({
        error: 'A inteligência artificial não retornou um formato JSON válido. Tente novamente com menos páginas ou arquivo mais limpo.',
        rawOutput: resultText,
      });
    }

    // Add unique IDs if they were missing or not generated properly
    if (parsedData.items && Array.isArray(parsedData.items)) {
      parsedData.items = parsedData.items.map((item: any, index: number) => ({
        ...item,
        id: item.id || `extracted-${Date.now()}-${index}`,
        ano: item.ano || '6º Ano',
        bimestre: item.bimestre || '1º Bimestre',
        aula: String(item.aula || index + 1),
        titulo: item.titulo || 'Aula Sem Título',
        conteudo: item.conteudo || '',
        objetivos: item.objetivos || '',
        habilidade: item.habilidade || '',
        aprendizagem: item.aprendizagem || '',
      }));
    }

    return res.json(parsedData);
  } catch (err: any) {
    console.error('Extraction handler error:', err);
    return res.status(500).json({ error: err.message || 'Erro interno do servidor ao extrair PDF.' });
  }
});

// API: Generate structured Lesson Plan (Plano de Ensino)
app.post('/api/generate-plan', async (req, res) => {
  try {
    const { componente, bimestre, aulas } = req.body;
    if (!aulas || !Array.isArray(aulas) || aulas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma aula selecionada para geração.' });
    }

    const gemini = getGeminiClient();
    const compStr = String(componente || 'Matemática').toUpperCase();
    const aulaInfoText = JSON.stringify(aulas);

    const prompt = `Gere os dados pedagógicos para o plano de ensino de ${compStr} (${bimestre || '2º Bimestre'}). Baseie-se nestas aulas selecionadas (fornecidas em JSON): ${aulaInfoText}. 
REGRAS OBRIGATÓRIAS:
1. Em 'aulas_escopo', retorne APENAS os dígitos numéricos das aulas separados por vírgula (ex: 5, 6, 7). OBRIGATÓRIO: Não escreva a palavra "Aula" ou "Aulas", apenas os números.
2. No campo 'ae', você DEVE PUXAR E TRANSCREVER o texto do campo 'Habilidade' (Aprendizagens Essenciais) fornecido no JSON. Garanta que a informação contenha o código da AE e sua descrição completa. IMPORTANTE (SEM DUPLICATAS): Analise os textos. Se a mesma AE se repetir na mesma aula ou em aulas diferentes dentro da mesma semana, ESCREVA-A APENAS UMA VEZ. Remova informações e frases duplicadas.
3. No campo 'acoes_bloom', você DEVE PUXAR E TRANSCREVER o texto do campo 'Objetivos_de_Aprendizagem' ou 'objetivos' fornecido no JSON. IMPORTANTE (SEM DUPLICATAS): Assim como nas AEs, se o objetivo for exatamente o mesmo para múltiplas aulas, agrupe-os e escreva-o APENAS UMA VEZ para não poluir o documento.
4. FORMATAÇÃO VISUAL (MARCADORES): Nos campos 'ae' e 'acoes_bloom', apresente as informações na forma de lista com marcadores (bullet points). Utilize as tags HTML <ul> e <li> para listar cada tópico ou texto distinto. Não utilize a tag <hr> e não crie linhas ou bordas divisórias.
5. No campo 'estrategia', você DEVE escolher e retornar OBRIGATORIAMENTE APENAS uma (ou mais) das seguintes opções exatas para cada aula, baseando-se no que for mais apropriado para o tema (mantenha a letra inicial e o texto exato):
   A- Aula expositiva com discussão pautada no material digital;
   B- Aula de estudo dirigido pautada no recurso do material impresso;
   C- Estudo dirigido;
   D- Estudo de caso (análise criteriosa e minuciosa de uma situação);
   E- Aprendizagem baseada em problemas;
   F- Brainstorn (chuva de ideias);
   G- Mapa mental;
   H- Mapa conceitual;
   I- Gamificação;
   J- Rotação por estações;
   K- Aula prática;
   L- Sala de aula invertida;
   M- Philips 66 (análise e discussão em grupo);
   N- Estudo do meio;
   O- Seminário;
   P- Construção de painel;
   Q- Dimensão lúdica e cultural (danças, brincadeiras, lutas e adaptações dos esportes tradicionais.)
6. No campo 'conteudos', resuma os principais conteúdos/tópicos abordados nas aulas correspondentes àquela semana.
7. No campo 'avaliacao', descreva uma breve estratégia de avaliação formativa correspondente aos conteúdos da semana.
8. Não gere textos ou descrições gerais, limite-se aos dados das 7 semanas de conteúdo.`;

    const response = await gemini.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            semanas_1_a_7: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  aulas_escopo: { type: Type.STRING },
                  conteudos: { type: Type.STRING },
                  avaliacao: { type: Type.STRING },
                  ae: { type: Type.STRING },
                  estrategia: { type: Type.STRING },
                  acoes_bloom: { type: Type.STRING }
                },
                required: ['aulas_escopo', 'conteudos', 'avaliacao', 'ae', 'estrategia', 'acoes_bloom']
              }
            }
          },
          required: ['semanas_1_a_7']
        }
      }
    });

    const resultText = response.text?.trim() || '{}';
    return res.json(JSON.parse(resultText));
  } catch (err: any) {
    console.error('Plan generation error:', err);
    return res.status(500).json({ error: err.message || 'Erro ao gerar plano de ensino.' });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Production Static Fallback
// -------------------------------------------------------------

async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware mounted.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static files from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Failed to initialize server:', err);
});
