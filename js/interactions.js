// ─── INTERAKSI KONTEN ───
// Elemen interaktif di dalam modul: panel larangan (Modul 3), studi kasus,
// dan timeline tahapan umroh (Modul 4).

let tlOpen = [false, false, false, false];

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

  // XP studi kasus hanya diberikan sekali (mencegah farming, penting setelah state persist).
  if (correct === 'benar' && !state.kasusDone) {
    state.kasusDone = true;
    addXP(20);
  }
}

function toggleTL(idx) {
  const el = document.getElementById('tl' + idx);
  tlOpen[idx] = !tlOpen[idx];
  el.classList.toggle('open', tlOpen[idx]);
}
