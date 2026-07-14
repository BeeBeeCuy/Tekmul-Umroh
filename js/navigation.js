// ─── NAVIGATION ───
// Perpindahan layar dilakukan dengan toggle class .active pada elemen .screen
// (bukan lewat URL/router). Bottom nav diperbarui via updateNavActive().

function startApp() {
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
  if (state.tabsDone[mod - 1]) {
    state.tabsDone[mod - 1][tab - 1] = true;
  }
  addXP(10);
}

function doneModule(n) {
  if (!state.modulesDone[n - 1]) {
    state.modulesDone[n - 1] = true;
    addXP(50);
  }

  // Buka kunci modul berikutnya
  if (n < 4) {
    const nextCard = document.getElementById('card' + (n + 1));
    if (nextCard) nextCard.classList.remove('locked');
  }

  updateProgressUI();
  // Lanjut ke kuis mini modul
  startQuiz(n);
}

function showSertifikat() {
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
