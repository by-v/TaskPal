import { config as loadEnv } from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { loadConfig } from './config.js';
import { createApp } from './app.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '../../.env');
loadEnv({ path: envPath });

const config = loadConfig();
const app = createApp(config);

const server = app.listen(config.PORT, config.HOST, () => {
  console.log(`TaskPal server di http://${config.HOST}:${config.PORT}`);
  if (!config.llmConfigured) {
    console.warn('GEMINI_API_KEY belum diisi');
  }
});

const shutdown = (signal) => {
  console.log(`Menerima ${signal}, menutup server...`);
  server.close(() => {
    console.log('Server ditutup');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
