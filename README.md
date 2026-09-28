# Jadwal Perkuliahan Semester 3 - Kelas 2IA06

Website statis yang menampilkan jadwal perkuliahan mingguan (Senin–Sabtu) untuk Semester 3 Kelas 2IA06, mengikuti tata letak tabel dari jadwal aslinya.

## Teknologi

- HTML, CSS, dan JavaScript murni (tanpa framework/build step)
- Kolom hari saat ini disorot otomatis lewat JavaScript sederhana

## Menjalankan secara lokal

Buka `index.html` langsung di browser, atau jalankan server statis:

```bash
netlify dev --port 8889
```

## Struktur

- `index.html` — konten dan struktur tabel jadwal
- `styles.css` — tampilan (tema biru navy, responsif ke tampilan kartu di layar kecil)
- `script.js` — menyorot kolom/hari yang sedang berjalan
- `netlify.toml` — konfigurasi deploy (publish root)

## Mengubah data jadwal

Data jadwal ditulis langsung di dalam tabel `index.html` (di dalam `<tbody>`). Untuk mengubah mata kuliah, jam, ruangan, atau dosen, edit teks di dalam `<span class="course-name">`, `<span class="course-time">`, dan `<span class="course-room">` pada baris/kolom hari yang sesuai.
