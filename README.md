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

Berdasarkan repositori ini, file dan folder diatur sebagai berikut:

*   **`audio/`** — Direktori ini digunakan untuk menyimpan aset suara/audio berformat `.mp3` (contoh: rekaman Niat Umroh dan Talbiyah).
*   **`index.html`** — File utama yang berisi kerangka struktur halaman antarmuka aplikasi (App Shell, Topbar, Bottom Nav, dan Screen content).
*   **`style.css`** — File yang memuat seluruh gaya desain, animasi, warna, dan tata letak (layout) responsif aplikasi.
*   **`script.js`** — File JavaScript yang mengontrol logika aplikasi, sistem navigasi antar-layar (Single Page Application feel), state management, pemutar audio, dan logika kuis.
*   **`About Project Umroh.docx`** — Dokumen Microsoft Word yang berisi latar belakang, ringkasan, atau penjelasan lebih detail mengenai konsep awal proyek edukasi ini.

---

## 🚀 Cara Menjalankan Aplikasi

Karena aplikasi ini dibangun murni di sisi klien (Client-Side), Anda tidak memerlukan instalasi server atau dependensi (*package manager*) tambahan.

1.  **Clone Repositori:**
    ```bash
    git clone [https://github.com/BeeBeeCuy/Tekmul-Umroh.git](https://github.com/BeeBeeCuy/Tekmul-Umroh.git)
    ```
    *(Atau klik tombol hijau **Code** > **Download ZIP** lalu ekstrak file-nya).*
2.  **Pastikan Aset Tersedia:** 
    Pastikan file audio yang dipanggil pada tombol di `index.html` (misalnya `talbiyah.mp3`) sudah diletakkan dengan benar di dalam folder `audio/`.
3.  **Buka Aplikasi:**
    Klik kanan pada file `index.html` dan pilih **Open with...** lalu pilih browser modern favorit Anda (Google Chrome, Mozilla Firefox, Safari, atau Microsoft Edge).

---

## 🛠️ Teknologi yang Digunakan

*   **HTML5** (Semantik markup)
*   **CSS3** (Variabel CSS, Flexbox, Grid, Animasi)
*   **JavaScript (ES6+)** (Vanilla JS, DOM Manipulation, Audio API)

---

## 📝 Lisensi & Kredit

Dikembangkan oleh [BeeBeeCuy](https://github.com/BeeBeeCuy) sebagai proyek media edukasi.
