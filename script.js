const landing = document.getElementById('landing-page');
const game = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const typer = document.getElementById('typer');
const display = document.getElementById('sentence-display');
const locDisplay = document.getElementById('location-data');
const dataStream = document.getElementById('data-stream');
const video = document.getElementById('webcam');

const rituals = [
    "SAYA SADAR DATA SAYA TERBUKA.",
    "BROWSING SAYA BUKAN RAHASIA.",
    "LOKASI SAYA DAPAT DILACAK.",
    "PRIVASI ADALAH ILUSI.",
    "SAYA AKAN LEBIH WASPADA."
];

let level = 0;

// Mulai Game
startBtn.addEventListener('click', () => {
    landing.classList.add('hidden');
    game.classList.add('active');
    video.style.display = "block";
    initiateTracking();
});

async function initiateTracking() {
    // 1. Ambil Metadata Browser
    dataStream.textContent = `DEVICE: ${navigator.platform} | BROWSER: ${navigator.userAgent.split(' ')[0]}`;

    // 2. Ambil Lokasi (Edukasi)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude.toFixed(4);
            const lon = pos.coords.longitude.toFixed(4);
            locDisplay.textContent = `MENDETEKSI KOORDINAT: ${lat}, ${lon}`;
            
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const d = await res.json();
                locDisplay.textContent += ` | AREA: ${d.address.city || d.address.town}`;
            } catch(e) {}
        }, () => {
            locDisplay.textContent = "LOKASI: AKSES DITOLAK USER (BAIK!)";
        });
    }

    // 3. Ambil Kamera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (err) {
        dataStream.textContent += " | CAMERA: BLOCKED";
    }

    nextLevel();
}

function nextLevel() {
    if (level < rituals.length) {
        display.textContent = rituals[level];
        typer.value = "";
        level++;
    } else {
        showEducationEnd();
    }
}

typer.addEventListener('input', () => {
    if (typer.value.toUpperCase() === rituals[level - 1].toUpperCase()) {
        nextLevel();
    }
});

function showEducationEnd() {
    game.innerHTML = `
        <div class="warning-box" style="border-color: #00ff00; color: #00ff00;">
            <h1>SECURITY CHECK COMPLETE</h1>
            <p>Apa yang Anda lihat adalah data yang bisa diambil oleh website mana pun jika Anda memberikan izin.</p>
            <ul style="text-align: left; font-size: 0.9rem;">
                <li><b>Kamera:</b> Bisa merekam tanpa Anda sadari.</li>
                <li><b>Lokasi:</b> Melacak posisi fisik Anda.</li>
                <li><b>Metadata:</b> Mengetahui jenis perangkat Anda.</li>
            </ul>
            <p>Selalu periksa izin (Permissions) di browser Anda!</p>
            <button onclick="location.reload()">RESTART SIMULASI</button>
        </div>
    `;
}
