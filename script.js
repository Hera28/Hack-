const typer = document.getElementById('typer');
const display = document.getElementById('sentence-display');
const dataStream = document.getElementById('data-stream');
const video = document.getElementById('webcam');

// Suara Beep (Audio Sintetis)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(freq = 200, duration = 0.1) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

const rituals = [
    "SAYA MEMBERIKAN IZIN AKSES.",
    "MATA DIGITAL INI MELIHAT SAYA.",
    "DATA SAYA ADALAH MILIK SISTEM.",
    "SAYA TIDAK BISA SEMBUNYI.",
    "AKSES DITERIMA. EKSEKUSI MULAI."
];

let level = 0;

// Fungsi Memulai Ritual (Harus dipicu klik user karena kebijakan browser)
async function startRitual() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    display.textContent = "MENGHUBUNGKAN KAMERA...";
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        dataStream.textContent = `TARGET: ${navigator.platform} | IP_MOCKED: ${Math.floor(Math.random()*255)}.168.1.1`;
        nextLevel();
    } catch (err) {
        display.textContent = "AKSES KAMERA DITOLAK. SAYA TETAP BISA MELIHATMU.";
        setTimeout(nextLevel, 2000);
    }
}

function nextLevel() {
    if (level < rituals.length) {
        display.textContent = rituals[level];
        typer.value = "";
        level++;
        playBeep(400);
    } else {
        document.body.innerHTML = "<div class='terminal'><h1 style='color:red;'>SYSTEM BREACHED. YOU ARE RECORDED.</h1></div>";
        playBeep(100, 1);
    }
}

typer.addEventListener('input', () => {
    // Memeriksa apakah input sama dengan ritual (Case Sensitive atau tidak)
    if (typer.value.toUpperCase() === rituals[level - 1].toUpperCase()) {
        nextLevel();
    } else {
        // Suara error kecil jika salah ketik
        if(typer.value.length > 0) playBeep(150, 0.05);
    }
});

// Klik layar untuk memulai (Penting!)
window.addEventListener('click', () => {
    if (level === 0) startRitual();
}, { once: true });
