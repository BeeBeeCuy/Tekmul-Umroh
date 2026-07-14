// ─── STATE ───
// State aplikasi disimpan di memori (tidak persist — reset saat halaman di-reload).
// Semua perubahan yang memengaruhi progres harus lewat addXP()/updateProgressUI()
// agar tampilan XP, progress bar, dan status modul tetap sinkron.
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

  const evalBadge = document.getElementById('evalBadge');
  if (state.modulesDone.every(Boolean)) {
    evalBadge.textContent = '✅ Siap — Mulai Evaluasi Akhir';
    evalBadge.className = 'badge badge-green';
  }
}
