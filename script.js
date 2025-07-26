document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Logika Halaman Pembuka
    const openButton = document.getElementById('open-invitation');
    const mainContent = document.getElementById('main-content');
    const openingPage = document.getElementById('opening');
    const audio = document.getElementById('background-music');

    openButton.addEventListener('click', function() {
        openingPage.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Memulai musik
        audio.play().catch(error => console.log("Autoplay was prevented."));
        document.getElementById('audio-control').style.display = 'block';

        // Scroll ke atas
        window.scrollTo(0, 0);
    });

    // 2. Mengambil Nama Tamu dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guest-name').textContent = guestName.replace(/_/g, " ");
    } else {
         document.getElementById('guest-name').textContent = 'Bapak/Ibu/Saudara/i';
    }

    // 3. Countdown Timer
    const countdownDate = new Date("August 09, 2025 09:00:00").getTime();
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("clock").innerHTML = "ACARA TELAH SELESAI";
        }
    }, 1000);

    // 4. Logika Salin untuk BANYAK No. Rekening dengan Notifikasi
    const copyButtons = document.querySelectorAll('.btn-copy');
    const toast = document.getElementById('copy-toast'); // Ambil elemen toast

    copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const input = e.currentTarget.previousElementSibling;
            const rekeningNumber = input.value;
            const bankName = e.currentTarget.dataset.bank; // Ambil nama bank

            navigator.clipboard.writeText(rekeningNumber).then(() => {
                // Tampilkan notifikasi
                toast.innerText = `No. Rekening ${bankName} berhasil disalin!`; // Ubah teks notifikasi
                toast.classList.add('show');

                // Sembunyikan notifikasi setelah 3 detik
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);

            }).catch(err => {
                console.error('Gagal menyalin: ', err);
                // Tampilkan notifikasi error jika perlu
                toast.innerText = 'Gagal menyalin. Coba lagi.';
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            });
        });
    });
    
    // 5. Kontrol Musik
    const musicButton = document.getElementById('toggle-music');
    let isPlaying = true;
    musicButton.addEventListener('click', function(){
        if(isPlaying) {
            audio.pause();
            musicButton.innerHTML = '<i class="bi bi-play-circle"></i>';
        } else {
            audio.play();
            musicButton.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        }
        isPlaying = !isPlaying;
    });

    // 6. efek transisi scroll
    // 1. Pilih semua elemen yang ingin diberi efek transisi
    const fadeElements = document.querySelectorAll('.fade-in-element');

    // 2. Buat observer baru
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // Jika elemen masuk ke layar, tambahkan kelas .visible
            entry.target.classList.add('visible');
            } else {
            // Jika elemen keluar dari layar, hapus kelas .visible
            entry.target.classList.remove('visible');
        }
        });
    }, {
        threshold: 0.1 // Animasi akan terpicu saat 10% elemen terlihat
    });

    // 3. Terapkan observer pada setiap elemen yang telah dipilih
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});