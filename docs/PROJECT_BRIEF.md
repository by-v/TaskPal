# TaskPal - Project Brief

## Tujuan
AI agent dengan visual dunia pixel yang membantu mahasiswa mengerjakan
tugas harian. Tiap tugas dikerjakan oleh satu karakter.

## Pengguna
Satu mahasiswa (pemakaian pribadi).

## Beban kerja
- Normal: 2 tugas per sekali jalan
- Maksimal: 5 tugas (kasus terburuk)

## Jenis tugas
- MVP: coding (bahasa apa pun; teruji: Python, JavaScript, C++), mengerjakan soal
- Nanti: makalah, ide jawaban tugas, materi PPT

## Prinsip
- Hasil agent adalah draf yang diperiksa pengguna
- Pengguna harus bisa menjelaskan ulang jawaban tanpa melihat

## Batasan
- 100% gratis: LLM memakai tier gratis (mis. Gemini Flash)
- Kunci API hanya di backend, tidak pernah di client
- MVP: agent hanya menulis kode, tidak menjalankannya

## Di luar cakupan MVP
Eksekusi kode otomatis, login, multi-pengguna, deploy publik,
agent yang saling berbicara.

## Kriteria sukses MVP
- 2 tugas nyata selesai dalam satu kali jalan
- Karakter menampilkan status: menunggu, bekerja, selesai, gagal
- Hasil tersimpan di workspace/