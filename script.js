const typer = document.getElementById('typer');
const display = document.getElementById('sentence-display');
const dataStream = document.getElementById('data-stream');
const video = document.getElementById('webcam');

// Ambil data user
const browser = navigator.userAgent.split(') ')[0].split(' (')[1];
const platform = navigator.platform;

// Kalimat ritual yang makin personal
const rituals = [
    "Saya mengizinkan sistem mengakses privasi saya.",
    `Saya sadar saya menggunakan ${platform}.`,
    "Mata digital ini sedang menatap saya.",
    "Data saya adalah harga yang harus saya bayar.",
    "Selesai. Kamu telah terhapus."
];

let level = 0;

// Akses Kamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => { video.srcObject = stream; })
    .catch(err => { dataStream.textContent = "CAMERA ACCESS DENIED. SUBJECT IS HIDING."; });

function nextLevel() {
    if (level < rituals.length) {
        display.textContent = rituals[level];
        typer.value = "";
        level++;
    } else {
        document.body.innerHTML = "<h1 style='color:red; text-align:center; width:100%;'>SISTEM BERHASIL MENGUASAI PERANGKAT ANDA.</h1>";
    }
}

typer.addEventListener('input', () => {
    if (typer.value === rituals[level - 1]) {
        nextLevel();
        dataStream.textContent = `UPDATING_MANIFEST_V${level}.0... [SUCCESS]`;
    }
});

// Init
dataStream.textContent = `TARGET_OS: ${platform} | SESSION_ID: ${Math.floor(Math.random()*99999)}`;
nextLevel();
