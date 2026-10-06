# TaskPal - Arsitektur

## Gambaran
Browser (client) <-> server Node lokal <-> adapter LLM <-> Gemini.
Status tugas dikirim ke client lewat SSE (satu arah). Hasil disimpan
di workspace/.

## Struktur folder
- client/src/: main.js, api.js, world/ (peta, karakter, state machine), ui/ (form, panel hasil, log)
- server/src/: index.js, config.js, routes/, orchestrator/, agents/ (coder.js, solver.js), llm/ (antarmuka + gemini.js), storage/
- server/tests/

## Tanggung jawab modul
- routes: validasi request dengan zod, tanpa logika bisnis
- orchestrator: kode biasa tanpa LLM; membuat run, antrean, konkurensi 2, batas tugas dan panggilan, penghentian
- agents: bangun prompt (instruksi sistem terpisah dari teks pengguna), panggil llm, validasi output dengan skema, 1 retry jika output tidak valid; semua percobaan dihitung dalam MAX_CALLS_PER_TASK
- llm: antarmuka generate({system, user, signal}) -> {text, usage}; hanya gemini.js yang tahu detail penyedia
- storage: tulis hasil ke workspace/runs/<runId>.json dan file kode ke workspace/<runId>/<taskId>/
- client: hanya menampilkan; tidak pernah memegang kunci API; hasil dirender sebagai teks

## Alur data
1. UI kirim POST /api/runs berisi daftar tugas
2. Server validasi, buat run, balas 202 dengan runId
3. UI membuka SSE ke /api/runs/:runId/events
4. Orchestrator menjalankan tugas (maks 2 bersamaan) dan mengirim event
5. Hasil disimpan, event task.done dikirim
6. UI menampilkan hasil; karakter pindah ke sofa

## Aturan keamanan khusus
- Nama file dari LLM disanitasi: hanya huruf, angka, titik, strip, garis bawah; tanpa pemisah path; maks 64 karakter; maks 5 file per tugas
- Penulisan file dibatasi di workspace/ (cek path hasil resolve)
- Output LLM wajib lolos skema; gagal setelah 1 retry berarti tugas berstatus gagal dengan alasan invalid_output
- Field tak dikenal pada request ditolak

## Konstanta (config.js)
HOST=127.0.0.1, PORT=3001 (dari.env), CORS_ORIGIN=http://localhost:5173,
MAX_TASKS_PER_RUN=5, MAX_CALLS_PER_TASK=6, CONCURRENCY=2,
MAX_INPUT_CHARS=4000, LLM_TIMEOUT_MS=60000

## Teknologi (semua gratis dan open source)
Client: Phaser, Vite. Server: Node.js, Express, zod, dotenv.
Alat: ESLint, Prettier, Vitest. Instalasi dilakukan di prompt terpisah.
