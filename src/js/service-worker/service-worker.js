importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
// if (workbox)
//   console.log(`Workbox berhasil dimuat`);
// else
//   console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  "images/fb-updates.png",
  "manifest.json",
  "regis-sw.js",
  "index.html",
  "views/league.html",
  "views/favorite-team.html",
  "views/contact.html",
  "views/standings.html",
  "views/detail-team.html",
  "images/uefa-indoor.webp",
  "images/uefa-stadium.webp",
  "images/uefa-trophy.webp",
  "images/germany.webp",
  "images/europe.webp",
  "images/holland.webp",
  "images/french.webp",
  "images/spain.webp",
  "images/english.webp",
  "images/profile.webp",
  "js/main.bundle.js",
  "js/standings.bundle.js",
  "js/detail-team.bundle.js",
  "fonts/Poppins.TTF",
  "fonts/materialicons.woff2",
]);

workbox.routing.registerRoute(
  "views/league.html",
  "views/detail-team.html",
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https:\/\/api\.football-data\.org\/v2\/'),
  workbox.strategies.networkFirst({
    cacheName: 'api-data',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60, //7 Days
      })
    ],
  })
);


self.addEventListener('push', event => {
  let body;

  if(event.data)
      body = event.data.text();
  else
      body = "Push message no payload";

  const options = {
      body: body,
      vibrate: [100, 50, 100],
      icon: 'resources/images/fb-updates.png',
      badge: 'resources/images/fb-updates.png',
      data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
      }
  };

  event.waitUntil(
      self.registration.showNotification('Push notification', options)
  );
});