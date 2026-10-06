import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { loadConfig } from '../src/config.js';
import { createApp } from '../src/app.js';

describe('app', () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    const config = loadConfig({});
    const app = createApp(config);
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        baseUrl = `http://127.0.0.1:${server.address().port}`;
        resolve();
      });
    });
  });

  afterAll(() => {
    if (server) server.close();
  });

  it('health 200 dan body benar', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(typeof body.llmConfigured).toBe('boolean');
  });

  it('respons tidak memuat kunci API', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    const text = await res.text();
    expect(text).not.toMatch(/AIza/i);
  });

  it('tidak ada header x-powered-by', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.headers.get('x-powered-by')).toBeNull();
  });

  it('origin http://localhost:5173 mendapat Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://localhost:5173' },
    });
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });

  it('origin http://evil.example tidak mendapat Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://evil.example' },
    });
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('rute tidak dikenal 404 berformat error', async () => {
    const res = await fetch(`${baseUrl}/api/unknown`);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error.code).toBe('not_found');
    expect(body.error.message).toBe('Endpoint tidak ditemukan');
  });

  it('POST ke /api/x dengan JSON rusak menghasilkan 400', async () => {
    const res = await fetch(`${baseUrl}/api/x`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalid json',
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe('invalid_input');
    expect(body.error.message).toBe('Body JSON tidak valid');
  });

  it('tanpa Origin, /api/health -> 200 tanpa header Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('Origin http://localhost:5173 -> 200 dengan Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://localhost:5173' },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });

  it('Origin http://evil.example -> 200 tanpa Access-Control-Allow-Origin', async () => {
    const res = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://evil.example' },
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBeNull();
  });

  it('/api/tidak-ada tanpa Origin -> 404 berformat error', async () => {
    const res = await fetch(`${baseUrl}/api/tidak-ada`);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error.code).toBe('not_found');
    expect(body.error.message).toBe('Endpoint tidak ditemukan');
  });
});
