// ─── QUIZ ENGINE ───
// Dipakai untuk kuis mini per-modul (5 soal) maupun evaluasi akhir.
// Soal diambil dari quizData (js/data/quiz-data.js) lalu diacak (shuffleArr).

let currentQuizIdx = 0;
let answered = false;

// Identitas kuis yang sedang berjalan (0 = evaluasi akhir, 1–4 = modul) dan
// apakah percobaan ini berhak atas XP per-soal (hanya percobaan pertama).
let activeQuizModule = 0;
let quizAwardsXP = false;

function startQuiz(moduleNum) {
  currentQuizIdx = 0;
  answered = false;

  // Simpan identitas kuis; XP per-soal hanya untuk percobaan pertama kuis ini.
  activeQuizModule = moduleNum;
  quizAwardsXP = !state.quizXP.attempted[moduleNum];

  // Ambil 5 soal untuk kuis modul, atau evaluasi akhir (moduleNum = 0)
  const questions = shuffleArr(quizData).slice(0, 5);
  renderQuiz(questions, 0, moduleNum);

  showScreen('screenQuiz');
  document.getElementById('quizTitle').textContent = moduleNum ? 'Kuis Modul ' + moduleNum : 'Evaluasi Akhir';
  updateNavActive(2);
}

function goQuiz() {
  const allDone = state.modulesDone.every(Boolean);
  if (!allDone) {
    alert('Selesaikan semua modul terlebih dahulu!');
    return;
  }
  startQuiz(0);
}

let qArr = [], qIdx = 0, score = 0;

function renderQuiz(questions, idx, moduleNum) {
  qArr = questions;
  qIdx = idx;
  score = 0;
  showQuestion();
}

function showQuestion() {
  answered = false;
  const q = qArr[qIdx];
  const wrap = document.getElementById('quizWrap');
  const total = qArr.length;

  wrap.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-meta">
        <span class="quiz-num">Soal ${qIdx + 1} dari ${total}</span>
        <span class="quiz-timer">${qArr.length} soal</span>
      </div>
      <div class="quiz-prog">
        <div class="quiz-prog-fill" style="width:${((qIdx) / total * 100)}%"></div>
      </div>
    </div>
    <div class="content-card">
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `
          <div class="quiz-opt" onclick="answerQuiz(${i})" id="opt${i}">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>${o}
          </div>
        `).join('')}
      </div>
      <div class="feedback-box" id="quizFeedback"></div>
    </div>
    <button class="btn-primary" id="nextBtn" disabled onclick="nextQuestion()">Lanjut →</button>
  `;
}

function answerQuiz(i) {
  if (answered) return;
  answered = true;

  const q = qArr[qIdx];
  const fb = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');

  for (let j = 0; j < q.opts.length; j++) {
    const el = document.getElementById('opt' + j);
    if (j === q.ans) {
      el.classList.add('correct');
    } else if (j === i && i !== q.ans) {
      el.classList.add('wrong');
    }
  }

  if (i === q.ans) {
    score++;
    fb.className = 'feedback-box show correct';
    fb.innerHTML = '✅ <strong>Benar!</strong> ' + q.explain;
    // +15 hanya pada percobaan pertama kuis ini; pengulangan untuk latihan tanpa XP.
    if (quizAwardsXP) addXP(15);
  } else {
    fb.className = 'feedback-box show wrong';
    fb.innerHTML = '❌ <strong>Kurang tepat.</strong> ' + q.explain;
  }

  nextBtn.disabled = false;
  nextBtn.textContent = (qIdx + 1 < qArr.length) ? 'Soal Berikutnya →' : 'Lihat Hasil';
}

function nextQuestion() {
  qIdx++;
  if (qIdx < qArr.length) {
    showQuestion();
    return;
  }

  // Tampilkan hasil
  const pct = Math.round(score / qArr.length * 100);
  const lulus = pct >= 70;

  // Bonus lulus +100 hanya sekali per kuis (saat pertama kali lulus kuis ini).
  if (lulus && !state.quizXP.passed[activeQuizModule]) {
    state.quizXP.passed[activeQuizModule] = true;
    addXP(100);
  }
  // Tandai kuis ini sudah pernah diselesaikan → percobaan berikutnya tanpa XP per-soal.
  state.quizXP.attempted[activeQuizModule] = true;

  // Sertifikat hanya terbuka bila LULUS dan semua modul telah diselesaikan.
  const earnedCert = lulus && state.modulesDone.every(Boolean);
  if (earnedCert) {
    state.quizDone = true;
    state.quizScore = pct;
  }

  const wrap = document.getElementById('quizWrap');
  wrap.innerHTML = `
    <div class="hasil-card">
      <div class="hasil-score">${pct}<span style="font-size:1.5rem;">%</span></div>
      <div class="hasil-label">${score} dari ${qArr.length} soal benar</div>
      <div class="hasil-status ${lulus ? 'lulus' : 'gagal'}">
        ${lulus ? '🎉 Selamat! Anda Lulus' : '😔 Belum Lulus'}
      </div>
      <div class="hasil-pesan">
        ${lulus ? 'Pemahaman Anda sangat baik! Terus tingkatkan ilmu dan amalkan dalam pelaksanaan umroh.' : 'Nilai minimum kelulusan adalah 70%. Silakan pelajari kembali materi dan coba lagi.'}
      </div>
      <button class="btn-primary" style="margin-top:20px;" onclick="${earnedCert ? 'showSertifikat()' : 'goHome()'}">
        ${earnedCert ? '🏆 Lihat Sertifikat' : '← Kembali ke Menu'}
      </button>
      ${!lulus ? `<button class="btn-primary" style="margin-top:10px; background:var(--blue);" onclick="goHome()">Pelajari Ulang Materi</button>` : ''}
    </div>
  `;
  updateProgressUI();
}

// Fisher–Yates shuffle, mengembalikan salinan array baru (tidak memutasi input).
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
