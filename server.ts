import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import helmet from 'helmet';
import { apiRouter } from './server/routes/api';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // Security headers configured safely for AI Studio preview iframe
  app.use(
    helmet({
      frameguard: false,
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginOpenerPolicy: false
    })
  );

  // API router
  app.use('/api', apiRouter);

  // Vite development mode vs Production static serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler (JSON, no stack trace)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Server error:', err.message || err);
    res.status(err.status || 500).json({
      error: 'Erro interno no servidor'
    });
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });

  // Graceful shutdown on SIGTERM / SIGINT
  const shutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
