// ─── NAVIGATION ───
// Perpindahan layar dilakukan dengan toggle class .active pada elemen .screen
// (bukan lewat URL/router). Bottom nav diperbarui via updateNavActive().

function startApp() {
  // Ambil nama dari input splash; kosong → fallback 'Peserta Didik'.
  const input = document.getElementById('namaInput');
  const nama = input ? input.value.trim() : '';
  state.name = nama || 'Peserta Didik';
  saveState(); // simpan nama agar bisa mem-prefill input saat reload berikutnya

  document.getElementById('splash').classList.add('hide');
  setTimeout(() => {
    document.getElementById('app').classList.add('visible');
  }, 600);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

function goHome() {
  showScreen('screenHome');
  updateNavActive(0);
  updateProgressUI();
}

function navTo(idx, screenId) {
  showScreen(screenId);
  updateNavActive(idx);
}

function updateNavActive(idx) {
  document.querySelectorAll('.nav-btn').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });
  const ind = document.getElementById('navIndicator');
  ind.style.left = (idx * 25) + '%';
  ind.style.width = '25%';
}

function goModule(n) {
  const card = document.getElementById('card' + n);
  if (card && card.classList.contains('locked')) {
    alert('Selesaikan modul sebelumnya terlebih dahulu!');
    return;
  }
  showScreen('screenM' + n);
  updateNavActive(1);
}

function showTab(mod, tab) {
  document.querySelectorAll('#screen' + mod.toUpperCase() + ' .tab-content')
    .forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#screen' + mod.toUpperCase() + ' .lesson-tab')
    .forEach(t => t.classList.remove('active'));

  document.getElementById(mod + '-' + tab).classList.add('active');

  const tabs = document.querySelectorAll('#screen' + mod.toUpperCase() + ' .lesson-tab');
  const tabIdx = parseInt(tab.replace('t', '')) - 1;
  if (tabs[tabIdx]) tabs[tabIdx].classList.add('active');
}

function completeTab(mod, tab) {
  const tabs = state.tabsDone[mod - 1];
  // XP hanya diberikan sekali per tab; kunjungan ulang tidak menambah XP.
  if (tabs && !tabs[tab - 1]) {
    tabs[tab - 1] = true;
    addXP(10);
  }
}

function doneModule(n) {
  if (!state.modulesDone[n - 1]) {
    state.modulesDone[n - 1] = true;
    addXP(50);
  }

  // Gembok modul berikutnya kini diturunkan dari state di updateProgressUI().
  updateProgressUI();
  // Lanjut ke kuis mini modul
  startQuiz(n);
}

function showSertifikat() {
  // Isi nama peserta dan nilai kelulusan ke sertifikat dari state.
  document.getElementById('sertName').textContent = state.name;
  const scoreEl = document.getElementById('sertScore');
  if (scoreEl) scoreEl.textContent = state.quizScore;

  showScreen('screenSertifikat');
  updateNavActive(3);
}

// Gerbang akses sertifikat (dipakai tombol nav "Sertifikat").
// Sertifikat hanya bisa dibuka bila pengguna sudah LULUS kuis (state.quizDone)
// dengan seluruh modul terselesaikan — jika belum, akses ditolak.
function openSertifikat() {
  if (!state.quizDone) {
    if (!state.modulesDone.every(Boolean)) {
      alert('🔒 Sertifikat masih terkunci.\nSelesaikan semua modul terlebih dahulu.');
    } else {
      alert('🔒 Sertifikat masih terkunci.\nLulus Evaluasi Akhir (nilai ≥ 70%) untuk membuka sertifikat.');
    }
    return;
  }
  showSertifikat();
}
