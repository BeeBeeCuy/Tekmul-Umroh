// ─── STATE ───
// State aplikasi dipersist ke localStorage (key 'tekmul-umroh-state') lewat
// saveState(), dan dipulihkan saat mulai lewat loadState().
// Semua perubahan yang memengaruhi progres harus lewat addXP()/updateProgressUI()
// agar tampilan XP, progress bar, status modul, DAN localStorage tetap sinkron
// (updateProgressUI memanggil saveState() di akhir).
const STORAGE_KEY = 'tekmul-umroh-state';

const state = {
  xp: 0,
  modulesDone: [false, false, false, false],
  tabsDone: [[false, false, false], [false, false, false], [], [false, false, false, false]],
  kasusDone: false,
  quizScore: 0,
  quizDone: false,
  // Pelacakan XP kuis per identitas (indeks 0 = evaluasi akhir, 1–4 = modul):
  //  - attempted: kuis sudah pernah diselesaikan → percobaan berikutnya tanpa XP per-soal.
  //  - passed:    kuis sudah pernah lulus → bonus +100 hanya diberikan sekali.
  quizXP: {
    attempted: [false, false, false, false, false],
    passed: [false, false, false, false, false]
  },
  name: 'Peserta Didik'
};

function addXP(n) {
  state.xp += n;
  updateProgressUI();
}

function updateProgressUI() {
  // XP maksimum deterministik setelah guard anti-farming — tiap sumber hanya sekali:
  //   completeTab  : 4 tab (m1-t1, m1-t2, m2-t1, m2-t2) × 10 =  40
  //   studi kasus  : 1 × 20                                  =  20
  //   selesai modul: 4 × 50                                  = 200
  //   kuis (5: modul 1–4 + evaluasi akhir), tiap kuis
  //                  (5 benar × 15) + 100 bonus lulus = 175 → 5 × 175 = 875
  //   ── total ──────────────────────────────────────────────────── = 1135
  const maxXP = 1135;
  const pct = Math.min(100, Math.round(state.xp / maxXP * 100));

  document.getElementById('xpText').textContent = state.xp + ' XP';
  document.getElementById('topProgress').style.width = pct + '%';
  document.getElementById('xpBarHome').style.width = pct + '%';
  document.getElementById('xpValHome').textContent = pct + '%';

  const progVals = [0, 0, 0, 0];
  if (state.modulesDone[0]) progVals[0] = 100;
  if (state.modulesDone[1]) progVals[1] = 100;
  if (state.modulesDone[2]) progVals[2] = 100;
  if (state.modulesDone[3]) progVals[3] = 100;

  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('prog' + (i + 1));
    if (el) el.style.width = progVals[i] + '%';

    const card = document.getElementById('card' + (i + 1));
    if (card && state.modulesDone[i]) {
      card.classList.add('done');
    }
  }

  // Status gembok modul diturunkan dari state (bukan disimpan di DOM): modul n+1
  // terbuka begitu modul n selesai. Dengan begini hasil loadState() otomatis
  // membuka modul yang sudah diselesaikan tanpa perlu menyentuh DOM di doneModule.
  for (let n = 1; n <= 3; n++) {
    const nextCard = document.getElementById('card' + (n + 1));
    if (nextCard && state.modulesDone[n - 1]) {
      nextCard.classList.remove('locked');
    }
  }

  const evalBadge = document.getElementById('evalBadge');
  if (state.modulesDone.every(Boolean)) {
    evalBadge.textContent = '✅ Siap — Mulai Evaluasi Akhir';
    evalBadge.className = 'badge badge-green';
  }

  saveState();
}

// ─── PERSISTENSI ───

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage bisa gagal (mode privat / kuota penuh) — abaikan diam-diam.
  }
}

// Baca state tersimpan, validasi bentuk dasarnya, lalu merge ke `state`.
// Data korup/tak dikenal diabaikan tanpa memunculkan error ke pengguna.
function loadState() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (e) {
    return; // bukan JSON valid → abaikan
  }
  if (!saved || typeof saved !== 'object') return;

  if (typeof saved.xp === 'number' && isFinite(saved.xp)) state.xp = saved.xp;

  if (Array.isArray(saved.modulesDone) && saved.modulesDone.length === 4 &&
      saved.modulesDone.every(v => typeof v === 'boolean')) {
    state.modulesDone = saved.modulesDone;
  }

  if (Array.isArray(saved.tabsDone) && saved.tabsDone.length === 4 &&
      saved.tabsDone.every(Array.isArray)) {
    state.tabsDone = saved.tabsDone;
  }

  if (typeof saved.kasusDone === 'boolean') state.kasusDone = saved.kasusDone;
  if (typeof saved.quizScore === 'number' && isFinite(saved.quizScore)) state.quizScore = saved.quizScore;
  if (typeof saved.quizDone === 'boolean') state.quizDone = saved.quizDone;

  if (saved.quizXP &&
      Array.isArray(saved.quizXP.attempted) && saved.quizXP.attempted.length === 5 &&
      Array.isArray(saved.quizXP.passed) && saved.quizXP.passed.length === 5 &&
      saved.quizXP.attempted.every(v => typeof v === 'boolean') &&
      saved.quizXP.passed.every(v => typeof v === 'boolean')) {
    state.quizXP = saved.quizXP;
  }

  if (typeof saved.name === 'string' && saved.name) state.name = saved.name;
}

// Hapus progres tersimpan lalu muat ulang halaman (dipakai tombol "Mulai ulang").
function resetProgress() {
  if (!confirm('Yakin ingin menghapus seluruh progres dan mulai dari awal?')) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // abaikan — tetap muat ulang di bawah
  }
  location.reload();
}
