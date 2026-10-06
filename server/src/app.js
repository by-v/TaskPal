import express from 'express';

export function createApp(config) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (typeof origin === 'string' && origin === config.CORS_ORIGIN) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.sendStatus(204);
      }
    }
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', llmConfigured: config.llmConfigured });
  });

  app.use((req, res) => {
    res.status(404).json({ error: { code: 'not_found', message: 'Endpoint tidak ditemukan' } });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(`Error: ${err.name} - ${err.message}`);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res
        .status(400)
        .json({ error: { code: 'invalid_input', message: 'Body JSON tidak valid' } });
    }
    if (err.type === 'entity.parse.failed') {
      return res
        .status(400)
        .json({ error: { code: 'invalid_input', message: 'Body JSON tidak valid' } });
    }
    res
      .status(500)
      .json({ error: { code: 'internal_error', message: 'Terjadi kesalahan pada server' } });
  });

  return app;
}
