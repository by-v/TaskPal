import { z } from 'zod';

const configSchema = z.object({
  PORT: z.number().int().min(1024).max(65535).default(3001),
  LLM_PROVIDER: z.enum(['gemini']).default('gemini'),
  LLM_MODEL: z.string().min(1).default('gemini-3-flash'),
  GEMINI_API_KEY: z.string().optional(),
  MAX_TASKS_PER_RUN: z.number().int().min(1).max(5).default(5),
  MAX_CALLS_PER_TASK: z.number().int().min(1).max(10).default(6),
});

export const HOST = '127.0.0.1';
export const CORS_ORIGIN = 'http://localhost:5173';
export const CONCURRENCY = 2;
export const MAX_INPUT_CHARS = 4000;
export const LLM_TIMEOUT_MS = 60000;

export function loadConfig(env = process.env) {
  const parseIntSafe = (val) => {
    if (val === undefined || val === '') return undefined;
    const num = Number(val);
    return Number.isNaN(num) ? undefined : num;
  };

  const rawConfig = {
    PORT: parseIntSafe(env.PORT),
    LLM_PROVIDER: env.LLM_PROVIDER,
    LLM_MODEL: env.LLM_MODEL,
    GEMINI_API_KEY: env.GEMINI_API_KEY,
    MAX_TASKS_PER_RUN: parseIntSafe(env.MAX_TASKS_PER_RUN),
    MAX_CALLS_PER_TASK: parseIntSafe(env.MAX_CALLS_PER_TASK),
  };

  const result = configSchema.safeParse(rawConfig);

  if (!result.success) {
    const issues = result.error.issues;
    const firstIssue = issues[0];
    const varName = firstIssue.path && firstIssue.path.length > 0 ? firstIssue.path[0] : 'config';
    const reason = firstIssue.message;
    throw new Error(`${varName}: ${reason}`);
  }

  const config = result.data;
  const llmConfigured = Boolean(config.GEMINI_API_KEY);

  return Object.freeze({
    HOST,
    PORT: config.PORT,
    CORS_ORIGIN,
    LLM_PROVIDER: config.LLM_PROVIDER,
    LLM_MODEL: config.LLM_MODEL,
    MAX_TASKS_PER_RUN: config.MAX_TASKS_PER_RUN,
    MAX_CALLS_PER_TASK: config.MAX_CALLS_PER_TASK,
    CONCURRENCY,
    MAX_INPUT_CHARS,
    LLM_TIMEOUT_MS,
    llmConfigured,
  });
}
