# TaskPal - Standar Rekayasa

## Kode bersih
- JavaScript ES modules; ESLint + Prettier; pengujian dengan Vitest
- Modul terpisah: client (Phaser/UI), server (API), llm (adapter penyedia), orchestrator (pembagi tugas, tanpa LLM)
- Fungsi pendek, satu tanggung jawab; nama berbahasa Inggris, komentar berbahasa Indonesia
- Tanpa nilai ajaib: konstanta diberi nama (mis. MAX_INPUT_CHARS = 4000)

## Keamanan
- Kunci API hanya di server lewat .env; tidak pernah dikirim ke client
- Server hanya mendengarkan 127.0.0.1:3001; CORS hanya http://localhost:5173
- Semua input divalidasi (tipe dan panjang maks 4000 karakter)
- Output LLM dianggap tidak tepercaya: tidak pernah dirender sebagai HTML (cegah XSS), tidak pernah dijalankan
- Teks tugas pengguna dipisah dari instruksi sistem pada prompt (mitigasi prompt injection)
- Agent hanya menulis di workspace/; batas MAX_CALLS_PER_TASK=6
- Jalankan npm audit sebelum rilis; dependensi baru wajib disetujui

## Data penting
- Isi tugas dan hasil adalah data pribadi: tidak di-commit (workspace/*)
- Dilarang memasukkan password, NIM, atau data pribadi ke prompt
- Periksa kebijakan data penyedia LLM gratis sebelum memakai data sensitif
- Log tidak boleh memuat kunci API atau isi tugas penuh

## Keandalan
- Timeout panggilan LLM 60 detik; retry maks 2 kali (jeda 2 dan 4 detik) hanya untuk error 429 dan 5xx
- Tidak ada loop tanpa batas; setiap tugas berakhir di status selesai atau gagal dengan pesan jelas
- Tombol stop menghentikan semua tugas yang berjalan

## UI profesional
- Grid tile 16 px, tampil dengan skala bulat 3x, image-rendering: pixelated
- Palet warna terbatas (maks 16 warna) dan satu font pixel yang terbaca
- Status selalu punya teks, tidak hanya warna (menunggu, bekerja, selesai, gagal)
- Ada keadaan loading, error, dan kosong; kontras teks memadai
- Panel samping memuat log tugas dan tombol stop

## Proses
- Satu perubahan = satu commit kecil, format Conventional Commits (mis. feat: tambah adapter Gemini)
- Logika inti wajib punya tes: pembagi tugas, batas panggilan, validasi
- Fitur dianggap selesai bila: jalan, lolos lint dan tes, tidak ada rahasia di diff, dokumen terkait diperbarui

## Aturan perubahan
- Perbaikan bug: tulis tes yang gagal dulu, lalu perbaiki sampai tes lolos
- Satu branch per perubahan (mis. fix/retry-429); merge ke main hanya jika lint dan tes lolos
- Jika perubahan merusak, batalkan dengan git revert atau hapus branch; jangan menambal di atas kerusakan
- Kontrak antar modul (EVENT_SPEC.md, antarmuka adapter LLM) tidak boleh berubah tanpa memperbarui dokumen dan tesnya
- Ubah hanya file yang disebut; dilarang refactor atau merapikan kode di luar permintaan
- Tampilkan rencana perubahan dan daftar file sebelum menerapkan

## Dokumentasi
- Teknis: ARCHITECTURE.md, EVENT_SPEC.md, SECURITY.md
- Non-teknis: README.md (cara pakai), PROJECT_BRIEF.md, TASK_SPEC.md, CHANGELOG.md, DECISIONS.md
- Perubahan struktur atau perilaku wajib memperbarui dokumen terkait pada commit yang sama
