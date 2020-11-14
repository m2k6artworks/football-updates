importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    // console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/images/fb-updates.png", revision: '1' },
    { url: "/images/fb-updates512.png", revision: '1' },
    { url: "/images/fb-updates256.png", revision: '1' },
    { url: "/images/fb-updates128.png", revision: '1' },
    { url: "/images/fb-updates64.png", revision: '1' },
    { url: "/images/fb-updates32.png", revision: '1' },
    { url: "/images/fb-updates24.png", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/regis-sw.js", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/views/league.html", revision: '1' },
    { url: "/views/favorite-team.html", revision: '1' },
    { url: "/views/contact.html", revision: '1' },
    { url: "/views/standings.html", revision: '1' },
    { url: "/views/detail-team.html", revision: '1' },
    { url: "/images/uefa-indoor.webp", revision: '1' },
    { url: "/images/uefa-stadium.webp", revision: '1' },
    { url: "/images/uefa-trophy.webp", revision: '1' },
    { url: "/images/germany.webp", revision: '1' },
    { url: "/images/europe.webp", revision: '1' },
    { url: "/images/holland.webp", revision: '1' },
    { url: "/images/french.webp", revision: '1' },
    { url: "/images/spain.webp", revision: '1' },
    { url: "/images/english.webp", revision: '1' },
    { url: "/images/profile.webp", revision: '1' },
    { url: "/js/main.bundle.js", revision: '1' },
    { url: "/js/standings.bundle.js", revision: '1' },
    { url: "/js/detail-team.bundle.js", revision: '1' },
    { url: "/fonts/Poppins.TTF", revision: '1' },
    { url: "/fonts/materialicons.woff2", revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
  new RegExp('https:\/\/api\.football-data\.org\/v2\/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-data',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60, //7 Days
      })
    ],
  })
);
//Workbox Routing Strategies end here

} else {
  console.log(`Workbox gagal dimuat`);
}

//Event listener push
self.addEventListener('push', event => {
  let body;

  if(event.data)
      body = event.data.text();
  else
      body = "Welcome to Football Updates";

  const options = {
      body: body,
      vibrate: [100, 50, 100],
      icon: 'images/fb-updates128.png',
      badge: 'images/fb-updates128.png',
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };

  event.waitUntil(
      self.registration.showNotification('Push notification', options)
  );
});