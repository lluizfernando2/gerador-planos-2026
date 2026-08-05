import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const apiRouter = Router();

apiRouter.use(express.json({ limit: '10mb' }));

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

// POST a real user comment
apiRouter.post('/comments', (req: Request, res: Response) => {
  const { name, role, rating, text } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'O nome é obrigatório.' });
  }

  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ success: false, error: 'O comentário/avaliação é obrigatório.' });
  }

  const numRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

  const newComment = {
    id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 7),
    name: name.trim().slice(0, 80),
    role: (role && typeof role === 'string') ? role.trim().slice(0, 100) : 'Docente da Rede Estadual',
    rating: numRating,
    text: text.trim().slice(0, 1000),
    date: new Date().toLocaleDateString('pt-BR'),
    timestamp: Date.now(),
    likes: 0
  };

  const comments = loadComments();
  comments.unshift(newComment);
  saveComments(comments);

  res.status(201).json({ success: true, comment: newComment, comments });
});

// POST upvote/like a comment
apiRouter.post('/comments/:id/like', (req: Request, res: Response) => {
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

// Health check endpoint
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'Sistema Integrado de Gestão Curricular SP - 2026',
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

// Plan generation validator endpoint
apiRouter.post('/plans/validate', (req: Request, res: Response) => {
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
      escola: escola || 'E.E. PROF. FRANCISCO ÁLVARES',
      docente: docente || 'Docente Responsável',
      componente,
      serie,
      bimestre,
      totalAulasSelecionadas: Array.isArray(selectedLessons) ? selectedLessons.length : 0
    }
  });
});
