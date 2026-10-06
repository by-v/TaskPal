# TaskPal - Spesifikasi Event dan API
Versi kontrak: 1

## Endpoint
- GET /api/health -> 200 {status, llmConfigured}
- POST /api/runs -> 202 {runId, taskIds}
- GET /api/runs/:runId/events -> aliran SSE
- POST /api/runs/:runId/stop -> 200
- GET /api/runs -> riwayat run
- GET /api/runs/:runId -> detail run

## Contoh request POST /api/runs (tulis sebagai blok kode JSON)
```json
{"tasks":[
 {"type":"coding","input":"Hitung rata-rata dari [80, 75, 90, 65, 85]",
 "language":"Python","environment":"colab"},
 {"type":"soal","input":"Berapa host valid pada 192.168.1.0/26?",
 "course":"Jaringan Komputer"}]}
```
Contoh respons: {"runId":"run-0001","taskIds":["task-0001","task-0002"]}

## Bentuk event
Semua event membawa: v (1), event, ts (mis. 2026-10-04T10:15:30Z), runId.

- run.started: taskCount (mis. 2)
```json
{"v":1,"event":"run.started","ts":"2026-10-04T10:15:30Z","runId":"run-0001","taskCount":2}
```

- task.queued: taskId, agent (coder atau solver), title
```json
{"v":1,"event":"task.queued","ts":"2026-10-04T10:15:31Z","runId":"run-0001","taskId":"task-0001","agent":"coder","title":"Coding task"}
```

- task.working: taskId, attempt (mis. 1)
```json
{"v":1,"event":"task.working","ts":"2026-10-04T10:15:32Z","runId":"run-0001","taskId":"task-0001","attempt":1}
```

- task.done: taskId, confidence (tinggi, sedang, rendah), needsReview (true jika confidence rendah), result
```json
{"v":1,"event":"task.done","ts":"2026-10-04T10:15:35Z","runId":"run-0001","taskId":"task-0001","confidence":"tinggi","needsReview":false,"result":{"files":[{"name":"main.py","language":"python","content":"..."}],"explanation":"Python 3.10. Jalankan di sel Colab."}}
```

- task.failed: taskId, reason, message
```json
{"v":1,"event":"task.failed","ts":"2026-10-04T10:15:36Z","runId":"run-0001","taskId":"task-0002","reason":"rate_limit","message":"Rate limit exceeded"}
```

- run.finished: done (mis. 1), failed (mis. 1)
```json
{"v":1,"event":"run.finished","ts":"2026-10-04T10:15:37Z","runId":"run-0001","done":1,"failed":1}
```

- run.stopped: tanpa field tambahan
```json
{"v":1,"event":"run.stopped","ts":"2026-10-04T10:15:38Z","runId":"run-0001"}
```

## Bentuk result
- coding: {"files":[{"name":"main.py","language":"python","content":"."}], "explanation":"Python 3.10. Jalankan di sel Colab.","confidence":"tinggi"}
- soal: {"answers":[{"answer":"62 host","steps":["2^6 = 64","64 - 2 = 62"], "confidence":"tinggi"}]}

## Nilai reason pada task.failed
Rate_limit, timeout, invalid_output, limit_exceeded, stopped, provider_error

## Pemetaan status ke karakter
- queued: duduk di sofa
- working: di meja, animasi mengetik
- done: ke sofa, ekspresi senang; jika needsReview true, tampil ikon tanda seru
- failed: ke sofa, ikon silang

## Aturan
- Format error HTTP: {"error":{"code":"invalid_input","message":"."}}
- Perubahan kontrak wajib memperbarui dokumen ini, tes, dan menaikkan nomor versi
