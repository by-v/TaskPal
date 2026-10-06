import { describe, it, expect } from 'vitest';
import {
  loadConfig,
  HOST,
  CORS_ORIGIN,
  CONCURRENCY,
  MAX_INPUT_CHARS,
  LLM_TIMEOUT_MS,
} from '../src/config.js';

describe('loadConfig', () => {
  it('default valid', () => {
    const config = loadConfig({});
    expect(config.PORT).toBe(3001);
    expect(config.LLM_PROVIDER).toBe('gemini');
    expect(config.LLM_MODEL).toBe('gemini-3-flash');
    expect(config.MAX_TASKS_PER_RUN).toBe(5);
    expect(config.MAX_CALLS_PER_TASK).toBe(6);
    expect(config.llmConfigured).toBe(false);
  });

  it('PORT 80 ditolak', () => {
    expect(() => loadConfig({ PORT: '80' })).toThrow('PORT');
  });

  it('MAX_TASKS_PER_RUN 6 ditolak', () => {
    expect(() => loadConfig({ MAX_TASKS_PER_RUN: '6' })).toThrow('MAX_TASKS_PER_RUN');
  });

  it('pesan error tidak memuat nilai kunci API', () => {
    try {
      loadConfig({ PORT: '80', GEMINI_API_KEY: 'AIza-contoh-bukan-kunci-asli' });
    } catch (err) {
      expect(err.message).not.toContain('AIza');
      expect(err.message).not.toContain('contoh');
      expect(err.message).toContain('PORT');
    }
  });

  it('llmConfigured false tanpa kunci', () => {
    const config = loadConfig({});
    expect(config.llmConfigured).toBe(false);
  });

  it('llmConfigured true dengan kunci', () => {
    const config = loadConfig({ GEMINI_API_KEY: 'test-key' });
    expect(config.llmConfigured).toBe(true);
  });
});

describe('konstanta tetap', () => {
  it('HOST adalah 127.0.0.1', () => {
    expect(HOST).toBe('127.0.0.1');
  });

  it('CORS_ORIGIN adalah http://localhost:5173', () => {
    expect(CORS_ORIGIN).toBe('http://localhost:5173');
  });

  it('CONCURRENCY adalah 2', () => {
    expect(CONCURRENCY).toBe(2);
  });

  it('MAX_INPUT_CHARS adalah 4000', () => {
    expect(MAX_INPUT_CHARS).toBe(4000);
  });

  it('LLM_TIMEOUT_MS adalah 60000', () => {
    expect(LLM_TIMEOUT_MS).toBe(60000);
  });

  it('loadConfig({}) memuat semua konstanta di objek beku', () => {
    const config = loadConfig({});
    expect(config.HOST).toBe('127.0.0.1');
    expect(config.CORS_ORIGIN).toBe('http://localhost:5173');
    expect(config.CONCURRENCY).toBe(2);
    expect(config.MAX_INPUT_CHARS).toBe(4000);
    expect(config.LLM_TIMEOUT_MS).toBe(60000);
    expect(Object.isFrozen(config)).toBe(true);
  });
});
