let lastImageTimestamp = 0;
let lastCursorX = 0;
let lastCursorY = 0;
const movementThreshold = 5; // Jarak minimal dalam piksel sebelum menambahkan gambar

document.addEventListener('mousemove', (e) => {
    const currentTime = new Date().getTime();
    const deltaX = e.pageX - lastCursorX;
    const deltaY = e.pageY - lastCursorY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > movementThreshold) {
        if (currentTime - lastImageTimestamp > 100) { // 1 detik delay
            lastImageTimestamp = currentTime;
            
            const floatingImagesContainer = document.getElementById('floating-image');

            // Daftar URL gambar yang akan digunakan
            const imageSources = [
                'image1.png', // Ganti dengan URL gambar Anda
                'image2.png', // Ganti dengan URL gambar Anda
                'image3.png', // Ganti dengan URL gambar Anda
                'image4.png'  // Ganti dengan URL gambar Anda
            ];

            // Pilih gambar secara acak dari daftar
            const randomImageSrc = imageSources[Math.floor(Math.random() * imageSources.length)];

            // Membuat elemen gambar baru
            const img = document.createElement('img');
            img.src = randomImageSrc;
            img.className = 'floating-image';
            img.style.left = `${e.pageX}px`;
            img.style.top = `${e.pageY}px`;

            // Menambahkan gambar ke kontainer
            floatingImagesContainer.appendChild(img);

            // Animasi gambar baru
            img.style.animation = 'fade-in 0.5s ease-out, pop 0.5s ease-out';

            // Menghapus gambar lama dengan animasi fade-out
            const oldImages = floatingImagesContainer.querySelectorAll('img:not(:last-child)');
            oldImages.forEach(oldImg => {
                oldImg.style.animation = 'fade-out 0.5s ease-out';
                setTimeout(() => {
                    floatingImagesContainer.removeChild(oldImg);
                }, 500); // Sesuaikan dengan durasi animasi fade-out
            });
        }
        
        // Update posisi kursor terakhir
        lastCursorX = e.pageX;
        lastCursorY = e.pageY;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1200, // Durasi animasi dalam milidetik
        easing: 'ease-in-out', // Jenis easing
    });
});

