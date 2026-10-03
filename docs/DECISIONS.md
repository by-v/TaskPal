# TaskPal - Catatan Keputusan
Tanggal: 2026-10-04

1. Pipeline: satu panggilan LLM per tugas, bukan loop agent. Alasan: hemat kuota gratis, bisa diuji, lebih aman.
2. Alur pengguna: input lewat form UI; hasil tampil di panel dengan tombol Salin dan tersimpan di workspace/.
3. Aset pixel berlisensi CC0 (mis. Kenney); atribusi dicatat di ASSETS.md.
4. Riwayat tugas disimpan sebagai file JSON lokal, tanpa database.
5. Teknologi UI: Phaser untuk dunia pixel, HTML/CSS biasa untuk panel, Vite sebagai dev server.
6. Agent coding bersifat umum (semua bahasa); Colab hanya salah satu lingkungan; bahasa diberi label teruji atau belum teruji.
7. Penanda keyakinan "perlu diperiksa" termasuk MVP.
8. Biaya proyek harus Rp0: hanya tier gratis dan perangkat open source.
9. Status real-time memakai SSE, bukan WebSocket (satu arah, tanpa dependensi tambahan).
10. Konkurensi 2 tugas; tugas lain mengantre (menjaga batas tier gratis).
11. Struktur npm workspaces (root, client, server); dependensi memakai versi tepat (save-exact) dan lockfile di-commit.
