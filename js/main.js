// ─── BOOTSTRAP ───
// index.html hanya berisi kerangka (shell). Tiap layar dimuat dari screens/*.html
// lalu disuntikkan ke dalam .main-content. Setelah semua layar ada di DOM, baru
// updateProgressUI() dijalankan.
//
// CATATAN: karena memakai fetch(), aplikasi HARUS dibuka lewat server
// (mis. ekstensi Live Server VS Code atau `python -m http.server`),
// bukan double-click file:// — browser memblokir fetch pada protokol file://.

// Urutan sesuai tampilan: Home, Modul 1–4, Kuis, Sertifikat.
const SCREENS = [
  'home',
  'module1',
  'module2',
  'module3',
  'module4',
  'quiz',
  'certificate'
];

async function bootstrap() {
  const container = document.getElementById('screensContainer');

  try {
    // Ambil semua partial secara paralel, tapi susun sesuai urutan SCREENS.
    const htmlParts = await Promise.all(
      SCREENS.map(name =>
        fetch(`screens/${name}.html`).then(res => {
          if (!res.ok) throw new Error(`Gagal memuat screens/${name}.html (${res.status})`);
          return res.text();
        })
      )
    );

    container.insertAdjacentHTML('beforeend', htmlParts.join('\n'));

    // Semua layar sudah di DOM — sinkronkan tampilan progres.
    updateProgressUI();
  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div style="max-width:600px;margin:40px auto;padding:24px;text-align:center;">
        <h2 style="color:var(--red);margin-bottom:10px;">Gagal memuat konten</h2>
        <p style="color:var(--text-muted);line-height:1.7;">
          Aplikasi ini perlu dijalankan lewat server lokal (misalnya ekstensi
          <strong>Live Server</strong> di VS Code, atau <code>python -m http.server</code>),
          bukan dibuka langsung dengan klik ganda pada file.
        </p>
      </div>`;
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);
