// ─── LARANGAN DATA ───
// Daftar larangan saat berihram beserta konsekuensi (dam/fidyah).
// Dipakai oleh js/interactions.js (fungsi showLarangan) untuk Modul 3.
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
