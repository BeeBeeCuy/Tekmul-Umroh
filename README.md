# Tekmul-Umroh 🕋

**Tekmul-Umroh** adalah aplikasi Media Pembelajaran Interaktif berbasis web yang dirancang untuk membantu pengguna mempelajari panduan dan tata cara pelaksanaan Ihram serta Umroh dengan cara yang menarik dan mudah dipahami. 

Proyek ini dibangun menggunakan Vanilla HTML, CSS, dan JavaScript, serta dilengkapi dengan fitur audio dan evaluasi interaktif.

---

## 🌟 Fitur Utama

*   **Modul Terstruktur:** Materi dibagi menjadi 4 modul utama (Pengertian, Niat & Tata Cara, Larangan, dan Tahapan Umroh).
*   **Audio Panduan:** Dilengkapi dengan pemutar audio terintegrasi untuk mendengarkan lafal Niat dan doa Talbiyah.
*   **Studi Kasus & Kuis Interaktif:** Evaluasi pemahaman pengguna melalui kuis pilihan ganda dan studi kasus larangan ihram dengan sistem skoring.
*   **Progress Tracking & Gamifikasi:** Pengguna dapat melihat progres penyelesaian modul (dalam bentuk XP) yang membuka kunci untuk kuis akhir.
*   **Sertifikat Digital:** Menghasilkan sertifikat kelulusan bagi pengguna yang berhasil menyelesaikan kuis dengan nilai minimum.
*   **Desain Responsif:** Tampilan antarmuka yang ramah pengguna (UI/UX) dan dapat diakses dengan baik melalui perangkat *mobile* maupun *desktop*.

---

## 📂 Struktur Proyek

Agar mudah dipelihara, kode dipecah menjadi beberapa file berdasarkan perannya:

```
Tekmul-Umroh/
├── index.html            ← kerangka (shell): splash, topbar, bottom-nav
├── assets/audio/         ← aset suara .mp3 (Niat Umroh, Talbiyah)
├── css/                  ← gaya dipecah per bagian
│   ├── base.css          ← variabel warna (:root), reset, body
│   ├── splash.css        ← layar pembuka
│   ├── layout.css        ← app shell, topbar, bottom-nav, transisi layar
│   ├── home.css          ← hero & kartu modul
│   ├── lesson.css        ← materi, tab, larangan, timeline
│   ├── quiz.css          ← kuis, umpan balik, hasil
│   ├── certificate.css   ← sertifikat
│   └── components.css    ← badge, info-row, media query responsif
├── js/                   ← logika aplikasi
│   ├── main.js           ← bootstrap: memuat partial screens/ via fetch()
│   ├── state.js          ← state, XP, updateProgressUI
│   ├── navigation.js     ← perpindahan layar & tab
│   ├── quiz.js           ← mesin kuis
│   ├── audio.js          ← pemutar audio
│   ├── interactions.js   ← larangan, studi kasus, timeline
│   └── data/             ← data konten
│       ├── quiz-data.js
│       └── larangan-data.js
└── screens/              ← isi tiap layar (dimuat saat runtime)
    ├── home.html
    ├── module1.html … module4.html
    ├── quiz.html
    └── certificate.html
```

`index.html` hanya berisi kerangka; isi tiap layar dimuat dari `screens/*.html` oleh `js/main.js` menggunakan `fetch()`, lalu disuntikkan ke dalam `.main-content`.

*   **`About Project Umroh.docx`** — Dokumen Microsoft Word yang berisi latar belakang, ringkasan, atau penjelasan lebih detail mengenai konsep awal proyek edukasi ini.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi tetap murni sisi klien (tanpa dependensi/*package manager*). Namun karena layar dimuat lewat `fetch()`, aplikasi **harus dijalankan melalui server lokal** — membukanya langsung dengan klik ganda (`file://`) akan diblokir browser.

1.  **Clone Repositori:**
    ```bash
    git clone https://github.com/BeeBeeCuy/Tekmul-Umroh.git
    ```
    *(Atau klik tombol hijau **Code** > **Download ZIP** lalu ekstrak file-nya).*
2.  **Jalankan lewat server lokal** — pilih salah satu:
    *   **VS Code:** klik kanan `index.html` → **Open with Live Server** (ekstensi *Live Server*).
    *   **Python:** dari folder proyek jalankan `python -m http.server 8000`, lalu buka `http://localhost:8000`.
    *   **Node:** `npx serve` (atau `npx http-server`) dari folder proyek.
3.  **Buka di browser modern** (Chrome, Firefox, Edge, Safari) melalui alamat `http://localhost:...` yang diberikan server.

---

## 🛠️ Teknologi yang Digunakan

*   **HTML5** (Semantik markup)
*   **CSS3** (Variabel CSS, Flexbox, Grid, Animasi)
*   **JavaScript (ES6+)** (Vanilla JS, DOM Manipulation, Audio API)

---

## 📝 Lisensi & Kredit

Dikembangkan oleh [BeeBeeCuy](https://github.com/BeeBeeCuy) sebagai proyek media edukasi.
