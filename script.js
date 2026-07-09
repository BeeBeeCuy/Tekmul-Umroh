// ─── STATE ───
const state = {
  xp: 0,
  modulesDone: [false, false, false, false],
  tabsDone: [[false, false, false], [false, false, false], [], [false, false, false, false]],
  quizScore: 0,
  quizDone: false,
  name: 'Peserta Didik'
};

// ─── LARANGAN DATA ───
const laranganData = [
  { name: 'Memotong Rambut & Kuku', desc: 'Dilarang memotong rambut di bagian manapun dari tubuh, termasuk rambut ketiak, dan juga dilarang memotong kuku. Apabila dilakukan dengan sengaja, wajib membayar fidyah.', dam: 'Dam: Fidyah — puasa 3 hari / beri makan 6 miskin / sembelih kambing' },
  { name: 'Memakai Wewangian', desc: 'Dilarang menggunakan parfum, wewangian, sabun wangi, atau produk beraroma setelah berniat ihram. Ini berlaku untuk badan, pakaian, maupun rambut.', dam: 'Dam: Fidyah — puasa 3 hari / beri makan 6 miskin / sembelih kambing' },
  { name: 'Pakaian Berjahit (Khusus Pria)', desc: 'Pria dilarang memakai pakaian yang dijahit mengikuti bentuk badan seperti baju, celana, kaos kaki, sarung tangan, dan sepatu bertutup. Hanya boleh memakai 2 lembar kain ihram.', dam: 'Dam: Fidyah jika disengaja dan lama dipakai' },
  { name: 'Berburu atau Membunuh Binatang Darat', desc: 'Dilarang berburu binatang darat dalam keadaan ihram, bahkan menunjukkan arah hewan buruan kepada orang lain pun dilarang. Binatang laut boleh ditangkap.', dam: 'Dam: Menyembelih hewan semisal atau memberi nilai makanannya' },
  { name: 'Hubungan Suami-Istri (Jima\')', desc: 'Hubungan intim suami-istri dilarang keras selama berihram. Ini merupakan larangan paling berat — jika dilakukan sebelum tahallul awal pada haji, ibadahnya batal dan wajib menyembelih unta.', dam: 'Dam Terberat: Menyembelih unta; umroh/haji batal dan wajib diulangi' },
  { name: 'Mencabut atau Menebang Tanaman', desc: 'Dilarang mencabut, mematahkan, atau menebang tanaman yang ada di kawasan tanah haram Mekah, baik yang liar maupun yang ditanam.', dam: 'Dam: Membayar harga tanaman yang dirusak' },
  { name: 'Menutup Kepala (Khusus Pria)', desc: 'Pria dilarang menutup kepala dengan apapun yang menempel langsung di kepala, termasuk topi, peci, sorban yang diikat, dan sejenisnya. Boleh berteduh dengan payung atau tenda.', dam: 'Dam: Fidyah' },
  { name: 'Berkata Kotor, Bertengkar & Berbuat Fasik', desc: 'Diharamkan berkata-kata kotor, cabul, bertengkar, berdebat, dan segala perbuatan fasik. Hal ini berdasarkan firman Allah (QS. Al-Baqarah: 197).', dam: 'Tidak ada dam, tetapi mengurangi kesempurnaan ibadah' },
  { name: 'Menutup Wajah (Khusus Wanita)', desc: 'Wanita dilarang menutup wajah dengan cadar atau niqab selama ihram. Wajib menampakkan wajah kecuali saat ada laki-laki asing yang memandang, boleh menurunkan kain dari kepala menutupi wajah.', dam: 'Dam: Fidyah jika sengaja dan lama' }
];

// ─── QUIZ DATA ───
const quizData = [
  { q: 'Secara bahasa, kata "ihram" berasal dari akar kata Arab yang berarti...', opts: ['Menyucikan', 'Mengharamkan / melarang', 'Memuliakan', 'Mewajibkan'], ans: 1, explain: 'Ihram berasal dari kata حرم (harama) yang berarti mengharamkan, karena seseorang yang berihram mengharamkan dirinya dari hal-hal yang dilarang.' },
  { q: 'Pakaian ihram pria terdiri dari...', opts: ['Satu lembar kain berwarna putih', 'Dua lembar kain putih tidak berjahit (izar dan rida\')', 'Baju gamis putih panjang', 'Jubah putih berjahit'], ans: 1, explain: 'Pria memakai dua lembar kain putih tidak berjahit: izar (bawah) dan rida\' (atas).' },
  { q: 'Lafal niat ihram umroh yang benar adalah...', opts: ['Nawaitu al-hajja', 'Labbaika Allāhumma \'umratan', 'Allāhumma labbaik', 'Nawaitu al-\'umrata wa ahrамtu bihā'], ans: 1, explain: 'Bacaan niat ihram umroh yang shahih adalah "Labbaika Allāhumma \'umratan" artinya ya Allah aku sambut panggilan-Mu untuk umroh.' },
  { q: 'Tawaf dalam umroh dilaksanakan sebanyak...', opts: ['5 putaran', '6 putaran', '7 putaran', '8 putaran'], ans: 2, explain: 'Tawaf wajib dilaksanakan sebanyak 7 putaran, dimulai dan diakhiri di Hajar Aswad.' },
  { q: 'Sa\'i dimulai dari bukit...', opts: ['Marwah ke Shafa', 'Shafa ke Marwah kemudian seterusnya', 'Arafah ke Muzdalifah', 'Mina ke Mekah'], ans: 1, explain: 'Sa\'i dimulai dari Shafa menuju Marwah (1 perjalanan), lalu Marwah ke Shafa (2), seterusnya 7 perjalanan dan berakhir di Marwah.' },
  { q: 'Tahallul adalah...', opts: ['Niat memasuki ihram', 'Shalat sunnah di Masjidil Haram', 'Mencukur atau memendekkan rambut sebagai penanda selesainya ihram', 'Doa penutup tawaf'], ans: 2, explain: 'Tahallul adalah mencukur/memendekkan rambut yang menandai berakhirnya ihram. Pria dianjurkan cukur habis (halq).' },
  { q: 'Larangan ihram yang paling berat (jika dilanggar pada haji menyebabkan ibadah batal) adalah...', opts: ['Memotong rambut', 'Memakai parfum', 'Hubungan suami-istri', 'Menutup kepala bagi pria'], ans: 2, explain: 'Jima\' (hubungan suami-istri) sebelum tahallul pertama adalah larangan terberat dalam haji yang menyebabkan hajinya batal.' },
  { q: 'Wanita yang berihram dilarang...', opts: ['Memakai cadar dan sarung tangan', 'Memakai jilbab berwarna', 'Berjalan cepat saat tawaf', 'Masuk Masjidil Haram'], ans: 0, explain: 'Wanita yang berihram dilarang menutup wajah (cadar/niqab) dan tidak boleh memakai sarung tangan.' },
  { q: 'Talbiyah wajib dibaca mulai dari...', opts: ['Saat memasuki Masjidil Haram', 'Setelah niat ihram di miqat hingga melihat Ka\'bah', 'Hanya saat tawaf putaran pertama', 'Sepanjang sa\'i saja'], ans: 1, explain: 'Talbiyah dibaca setelah mengucapkan niat ihram dan terus dibaca hingga melihat Ka\'bah untuk umroh.' },
  { q: 'Miqat makani bagi jamaah umroh dari Indonesia yang terbang langsung ke Jeddah adalah...', opts: ['Di Madinah (Bir Ali/Dzulhulaifah)', 'Di atas pesawat saat melewati garis miqat atau di bandara Jeddah', 'Di Mina', 'Di Arafah'], ans: 1, explain: 'Jamaah dari Indonesia yang terbang langsung ke Jeddah miqatnya di atas pesawat saat melewati garis miqat, atau bisa berihram langsung dari rumah.' },
];

// ─── FUNCTIONS ───
let currentQuizIdx = 0;
let answered = false;
let tlOpen = [false, false, false, false];

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
  
  // Unlock next
  if (n < 4) {
    const nextCard = document.getElementById('card' + (n + 1));
    if (nextCard) nextCard.classList.remove('locked');
  }
  
  updateProgressUI();
  // Go to mini quiz
  startQuiz(n);
}

function startQuiz(moduleNum) {
  currentQuizIdx = 0;
  answered = false;
  
  // Pick 5 questions for module quiz or all 10 for final
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
    addXP(15);
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
  
  // Show results
  const pct = Math.round(score / qArr.length * 100);
  const lulus = pct >= 70;
  
  if (lulus) addXP(100);
  
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
      <button class="btn-primary" style="margin-top:20px;" onclick="${lulus && state.modulesDone.every(Boolean) ? 'showSertifikat()' : 'goHome()'}">
        ${lulus && state.modulesDone.every(Boolean) ? '🏆 Lihat Sertifikat' : '← Kembali ke Menu'}
      </button>
      ${!lulus ? `<button class="btn-primary" style="margin-top:10px; background:var(--blue);" onclick="goHome()">Pelajari Ulang Materi</button>` : ''}
    </div>
  `;
  updateProgressUI();
}

function showSertifikat() {
  showScreen('screenSertifikat');
  updateNavActive(3);
}

function showLarangan(idx) {
  document.querySelectorAll('.larangan-item').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });
  
  const d = laranganData[idx];
  const det = document.getElementById('laranganDetail');
  
  document.getElementById('ldTitle').textContent = '🚫 ' + d.name;
  document.getElementById('ldDesc').textContent = d.desc;
  document.getElementById('ldDam').textContent = '⚖️ ' + d.dam;
  det.classList.add('show');
}

function kasusJawab(idx, correct) {
  const opts = document.querySelectorAll('#kasus1 .quiz-opt');
  opts.forEach(o => o.style.pointerEvents = 'none');
  
  opts[idx].classList.add(correct === 'benar' ? 'correct' : 'wrong');
  if (correct !== 'benar') {
    opts[1].classList.add('correct'); // Jawaban benar adalah B
  }
  
  const fb = document.getElementById('kasusFeedback');
  fb.className = 'feedback-box show ' + (correct === 'benar' ? 'correct' : 'wrong');
  fb.innerHTML = correct === 'benar' 
    ? '✅ Tepat! Menggunakan wewangian saat ihram wajib membayar fidyah (berpuasa 3 hari, atau memberi makan 6 orang miskin, atau menyembelih seekor kambing).' 
    : '❌ Belum tepat. Jawaban yang benar adalah B — wajib membayar fidyah karena melanggar larangan ihram.';
    
  if (correct === 'benar') addXP(20);
}

function toggleTL(idx) {
  const el = document.getElementById('tl' + idx);
  tlOpen[idx] = !tlOpen[idx];
  el.classList.toggle('open', tlOpen[idx]);
}

function addXP(n) {
  state.xp += n;
  updateProgressUI();
}

function updateProgressUI() {
  const maxXP = 600;
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

// Variabel global untuk melacak audio yang sedang diputar
let currentAudio = null;
let currentAudioBtn = null;

function playAudio(btn, audioSrc) {
  const dot = btn.querySelector('.audio-dot');
  const textSpan = btn.querySelector('.audio-text');
  
  // Jika tombol yang sama diklik saat audio sedang berjalan, maka hentikan (Pause)
  if (currentAudio && currentAudioBtn === btn) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    resetAudioUI(btn);
    currentAudio = null;
    currentAudioBtn = null;
    return;
  }

  // Jika ada audio lain yang sedang berjalan, hentikan terlebih dahulu
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    resetAudioUI(currentAudioBtn);
  }

  // Mulai memutar audio baru
  currentAudio = new Audio(audioSrc);
  currentAudioBtn = btn;

  // Ubah status UI menjadi memutar
  dot.classList.remove('paused');
  textSpan.textContent = ' Memutar...';

  // Jalankan audio dan tangani error jika file tidak ditemukan
  currentAudio.play().catch(error => {
    alert("Gagal memutar audio. Pastikan file audio tersedia di lokasi yang benar.");
    resetAudioUI(btn);
  });

  // Saat audio selesai diputar, kembalikan UI ke awal
  currentAudio.onended = () => {
    resetAudioUI(btn);
    currentAudio = null;
    currentAudioBtn = null;
  };
}

// Fungsi bantuan untuk mengembalikan tampilan tombol ke kondisi awal
function resetAudioUI(btn) {
  if (!btn) return;
  const dot = btn.querySelector('.audio-dot');
  const textSpan = btn.querySelector('.audio-text');
  
  dot.classList.add('paused');
  // Kembalikan teks berdasarkan konteks tombol aslinya
  if (textSpan.textContent.includes('Talbiyah') || btn.getAttribute('onclick').includes('talbiyah')) {
    textSpan.textContent = ' Dengarkan Talbiyah';
  } else {
    textSpan.textContent = ' Dengarkan Lafal Niat';
  }
}

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Init
updateProgressUI();