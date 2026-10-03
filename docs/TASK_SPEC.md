# TaskPal - Spesifikasi Tugas

## Tipe 1: Coding (karakter: Coder)
- Input: deskripsi soal (maks 4000 karakter), bahasa (mis. Python), lingkungan (colab, lokal, atau arduino-ide)
- Output: daftar file (maks 5 file), tiap file berisi nama, bahasa, isi; penjelasan singkat yang memuat bahasa, versi, dan cara menjalankan; keyakinan
- Contoh input: "Hitung rata-rata dan nilai tertinggi dari [80, 75, 90, 65, 85]", bahasa Python, lingkungan colab
- Contoh output: 1 file main.py, rata-rata 79.0, tertinggi 90, keyakinan tinggi
- Sukses: kode sesuai soal dan bisa dijalankan pengguna tanpa error
- Bahasa teruji: Python, JavaScript, C++; bahasa lain diberi label "belum teruji" di UI

## Tipe 2: Soal (karakter: Solver)
- Input: teks soal (maks 4000 karakter), mata kuliah (mis. Jaringan Komputer)
- Output: per soal berisi jawaban, langkah (maks 3 baris), keyakinan
- Contoh input: "Berapa host valid pada subnet 192.168.1.0/26?"
- Contoh output: jawaban "62 host", keyakinan tinggi
- Sukses: jawaban benar dan langkah runtut; jika tidak tahu, mengaku tidak tahu dengan keyakinan rendah

## Aturan keyakinan
- Tinggi hanya jika bisa diverifikasi dari standar atau sumber yang disebut
- Rendah: UI menampilkan label "perlu diperiksa"

## Format keluaran
- Bahasa Indonesia, tanpa LaTeX, tanpa kalimat pembuka dan penutup

## Di luar MVP
Makalah, ide jawaban, PPT, mode belajar, ekspor.ipynb, prioritas deadline
