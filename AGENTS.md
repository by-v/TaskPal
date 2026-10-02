# AGENTS.md

Aturan kerja untuk AI agent dan developer yang mengerjakan TaskPal.

## 1. Proyek

TaskPal adalah AI agent dengan visual dunia pixel yang membantu mengerjakan tugas
kuliah. Stack: Node.js, Phaser untuk sisi client, server Node.js.

Struktur folder:

- `client/` — sisi client (Phaser)
- `server/` — sisi server (Node.js)
- `docs/` — dokumentasi
- `workspace/` — hasil keluaran tugas

## 2. Edit seminimal mungkin

- Satu perintah = satu tujuan.
- Ubah hanya bagian yang benar-benar diperlukan.
- Jangan melakukan refactor, rewrite, atau format ulang yang tidak diminta.

## 3. Batasan file

- Jangan mengubah file di luar yang disebut secara eksplisit dalam perintah.
- Jika sebuah perubahan menuntut file lain ikut berubah, tanyakan dulu.

## 4. Rahasia

- Jangan membaca, mencetak, isi, atau meng-commit file `.env`.
- Rujukan konfigurasi hanya lewat `.env.example`.
- Jangan pernah menuliskan API key ke dalam kode, log, atau dokumentasi.

## 5. Hasil tugas

- Hasil keluaran tugas hanya ditulis di dalam folder `workspace/`.
- Jangan menulis hasil ke folder lain.

## 6. Dependensi

- Jangan memasang dependensi baru tanpa bertanya lebih dulu.
- Jika memang diperlukan, jelaskan alasan dan pilihannya, lalu tunggu persetujuan.

## 7. Komentar kode

- Komentar kode ditulis dalam bahasa Indonesia.
- Komentar hanya untuk menjelaskan alasan, bukan menjelaskan apa yang sudah jelas dari kode.

## 8. Verifikasi

- Setelah perubahan, jalankan perintah verifikasi yang diminta dalam perintah.
- Laporkan hasilnya apa adanya: berhasil jika berhasil, pesan error apa adanya jika gagal.