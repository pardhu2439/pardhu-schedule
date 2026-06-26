.const SCHEDULE = [
  { time:"06:00", label:"Python 🐍" },
  { time:"08:00", label:"Break ☕" },
  { time:"10:00", label:"DSA 🧠" },
  { time:"12:00", label:"Break 🍽️" },
  { time:"15:00", label:"Core 💻" },
  { time:"17:00", label:"Aptitude 📐" },
  { time:"18:30", label:"Break 🎮" },
  { time:"19:30", label:"English 📖" },
  { time:"20:30", label:"Break 😌" },
  { time:"21:00", label:"Sleep 🌙" },
];

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/pardhu-schedule/'));
});

function checkAndNotify() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  SCHEDULE.forEach(slot => {
    const [sh, sm] = slot.time.split(':').map(Number);
    if(sh === h && sm === m) {
      self.registration.showNotification("⏰ Pardhu! Time to start", {
        body: slot.label + " starts now! Let's go 💪",
        icon: '/pardhu-schedule/icon.png',
        badge: '/pardhu-schedule/icon.png',
        vibrate: [200, 100, 200],
        tag: slot.time,
      });
    }
  });
}

// Check every minute
setInterval(checkAndNotify, 60000);
