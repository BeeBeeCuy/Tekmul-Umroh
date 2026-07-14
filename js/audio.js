// ─── AUDIO PLAYER ───
// Hanya satu audio yang boleh berbunyi dalam satu waktu; instance yang sedang
// aktif dilacak lewat currentAudio / currentAudioBtn.

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
