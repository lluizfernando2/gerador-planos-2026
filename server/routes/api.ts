import express, { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { SUPER_PROMPT_SYSTEM_INSTRUCTIONS, sanitizeInput, containsPromptInjection, buildSecuredPrompt } from '../../src/lib/securityPrompt';

export const apiRouter = Router();

// Limit body payload to 1mb for DoS prevention
apiRouter.use(express.json({ limit: '1mb' }));

// Security Headers Middleware
apiRouter.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Simple In-Memory Rate Limiter (Anti-DoS / Anti-Spam)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimiter(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown_client';
    const clientKey = `${ip}_${req.path}`;
    const now = Date.now();

    const record = rateLimitMap.get(clientKey);

    if (!record || now > record.resetTime) {
      rateLimitMap.set(clientKey, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Muitas requisições enviadas em pouco tempo. Por favor, aguarde antes de tentar novamente.'
      });
    }

    record.count += 1;
    next();
  };
}

// Comments persistence file path
const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

function loadComments(): any[] {
  try {
    if (!fs.existsSync(COMMENTS_FILE)) {
      const dir = path.dirname(COMMENTS_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(COMMENTS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load comments from disk:', err);
    return [];
  }
}

function saveComments(comments: any[]): void {
  try {
    const dir = path.dirname(COMMENTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save comments to disk:', err);
  }
}

// GET real user comments
apiRouter.get('/comments', (_req: Request, res: Response) => {
  const comments = loadComments();
  res.json({ success: true, comments });
});

// POST a real user comment (Rate-limited to 10 per 5 min)
apiRouter.post('/comments', rateLimiter(10, 5 * 60 * 1000), (req: Request, res: Response) => {
  const { name, role, rating, text } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'O nome é obrigatório.' });
  }

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ success: false, error: 'O comentário/avaliação é obrigatório.' });
  }

  // Security sanitization and bounds checking
  const cleanName = sanitizeInput(name).slice(0, 80);
  const cleanRole = sanitizeInput(role || 'Docente da Rede Estadual').slice(0, 100);
  const cleanText = sanitizeInput(text).slice(0, 1000);

  if (containsPromptInjection(text)) {
    return res.status(400).json({
      success: false,
      error: 'Conteúdo do comentário possui padrões de texto inválidos ou não permitidos.'
    });
  }

  const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

  const newComment = {
    id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 7),
    name: cleanName,
    role: cleanRole,
    rating: numRating,
    text: cleanText,
    date: new Date().toLocaleDateString('pt-BR'),
    timestamp: Date.now(),
    likes: 0
  };

  const comments = loadComments();
  comments.unshift(newComment);
  saveComments(comments);

  res.status(201).json({ success: true, comment: newComment, comments });
});

// POST upvote/like a comment (Rate-limited to 30 per min)
apiRouter.post('/comments/:id/like', rateLimiter(30, 60 * 1000), (req: Request, res: Response) => {
  const { id } = req.params;
  const comments = loadComments();
  let found = false;

  const updatedComments = comments.map(item => {
    if (item.id === id) {
      found = true;
      return { ...item, likes: (item.likes || 0) + 1 };
    }
    return item;
  });

  if (!found) {
    return res.status(404).json({ success: false, error: 'Comentário não encontrado.' });
  }

  saveComments(updatedComments);
  res.json({ success: true, comments: updatedComments });
});

// POST AI Prompt Security Verifier endpoint
apiRouter.post('/ai/verify-prompt', rateLimiter(20, 60 * 1000), (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Prompt é obrigatório.'
    });
  }

  const isInjection = containsPromptInjection(prompt);
  const sanitized = sanitizeInput(prompt);
  const securedPrompt = buildSecuredPrompt(prompt);

  return res.json({
    success: true,
    isInjectionDetected: isInjection,
    sanitizedPrompt: sanitized,
    securedPrompt,
    systemInstructions: SUPER_PROMPT_SYSTEM_INSTRUCTIONS
  });
});

// Health check endpoint
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'Sistema Integrado de Gestão Curricular SP - 2026',
    securityStatus: 'SUPER_PROMPT_PROTECTION_ACTIVE',
    timestamp: new Date().toISOString()
  });
});

// Curriculum overview API
apiRouter.get('/curriculum/subjects', (_req: Request, res: Response) => {
  const subjects = [
    'Matemática',
    'Língua Portuguesa',
    'Física',
    'Química',
    'Biologia',
    'História',
    'Geografia',
    'Sociologia',
    'Filosofia',
    'Inglês',
    'Educação Física',
    'Arte',
    'Projeto de Vida',
    'Tecnologia e Inovação',
    'Orientação de Estudos - Matemática',
    'Orientação de Estudos - Português',
    'Educação Financeira',
    'Redação e Leitura'
  ];

  res.json({
    count: subjects.length,
    subjects,
    standards: ['campinas-leste', 'campinas-leste-custom', 'ava-efape']
  });
});

// Domain Curriculum search endpoint
apiRouter.get('/curriculum/search', rateLimiter(60, 60 * 1000), (req: Request, res: Response) => {
  const query = req.query.q ? String(req.query.q).toLowerCase() : '';
  const subject = req.query.subject ? String(req.query.subject) : '';
  const grade = req.query.grade ? String(req.query.grade) : '';
  const bimester = req.query.bimester ? String(req.query.bimester) : '';

  res.json({
    success: true,
    filtersApplied: { query, subject, grade, bimester },
    message: 'Busca de currículo efetuada no backend de domínio.'
  });
});

// Plan generation validator endpoint
apiRouter.post('/plans/validate', rateLimiter(30, 60 * 1000), (req: Request, res: Response) => {
  const { escola, docente, componente, serie, bimestre, selectedLessons } = req.body;

  if (!componente || !serie || !bimestre) {
    return res.status(400).json({
      error: 'Parâmetros obrigatórios ausentes: componente, serie ou bimestre.'
    });
  }

  return res.json({
    valid: true,
    message: 'Parâmetros do plano de ensino validados com sucesso.',
    payloadSummary: {
      escola: sanitizeInput(escola || 'E.E. PROF. FRANCISCO ÁLVARES'),
      docente: sanitizeInput(docente || 'Docente Responsável'),
      componente: sanitizeInput(componente),
      serie: sanitizeInput(serie),
      bimestre: sanitizeInput(bimestre),
      totalAulasSelecionadas: Array.isArray(selectedLessons) ? selectedLessons.length : 0
    }
  });
});
