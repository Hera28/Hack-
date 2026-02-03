const landing = document.getElementById('landing-page');
const game = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const typer = document.getElementById('typer');
const displayText = document.getElementById('display-text');
const osInfo = document.getElementById('os-info');
const locInfo = document.getElementById('loc-info');
const video = document.getElementById('webcam');
const progress = document.getElementById('progress-bar');

const levels = [
    "SAYA MELIHAT DIRI SAYA.",
    "SAYA MEMBERI IZIN.",
    "JANGAN BERHENTI MENGETIK.",
    "MEREKA ADA DI DALAM KABEL.",
    "SAYA ADALAH DATA."
];

let currentLevel = 0;

startBtn.addEventListener('click', async () => {
    landing.style.display = 'none';
    game.style.display = 'flex';
    
    // Metadata
    osInfo.textContent = `SYSTEM: ${navigator.platform}`;
    
    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            locInfo.textContent = `LOC: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`;
        });
    }

    // Camera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (e) {}

    showLevel();
});

function showLevel() {
    if (currentLevel < levels.length) {
        displayText.textContent = levels[currentLevel];
        typer.value = "";
        progress.style.width = `${(currentLevel / levels.length) * 100}%`;
    } else {
        endGame();
    }
}

typer.addEventListener('input', () => {
    if (typer.value.toUpperCase() === levels[currentLevel].toUpperCase()) {
        currentLevel++;
        showLevel();
    }
});

function endGame() {
    displayText.style.color = "white";
    displayText.textContent = "UPLOADING CONSCIOUSNESS...";
    typer.style.display = "none";
    progress.style.width = "100%";
    
    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="background:black; color:red; height:100vh; display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; padding:20px;">
                    <h1>GOODBYE USER</h1>
                    <p>SESSION RECORDED. LOCATION PINNED. SOUL COPIED.</p>
                    <p style="font-size:10px; opacity:0.5;">Jangan lupa tutup kameramu.</p>
                </div>
            `;
        }, 100);
    }, 2000);
}
