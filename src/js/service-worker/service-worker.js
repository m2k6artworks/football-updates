import "../../images/uefa-indoor.webp";
import "../../images/uefa-stadium.webp";
import "../../images/uefa-trophy.webp";
import '../../images/fb-updates.png';
import "../../images/germany.webp";
import "../../images/europe.webp";
import "../../images/holland.webp";
import "../../images/french.webp";
import "../../images/spain.webp";
import "../../images/english.webp";
import "../../images/profile.webp";
import "../../fonts/Poppins.TTF";
import "../../fonts/materialicons.woff2";

const CACHE_NAME = "fb-updates-v4";
const urlToCache = [
    "/",
    "images/fb-updates.png",
    "manifest.json",
    "regis-sw.js",
    "index.html"
];

const viewsCache = [
  "views/league.html",
  "views/favorite-team.html",
  "views/contact.html",
  "views/standings.html",
  "views/detail-team.html"
];

const imagesCache = [
  "images/uefa-indoor.webp",
  "images/uefa-stadium.webp",
  "images/uefa-trophy.webp",
  "images/germany.webp",
  "images/europe.webp",
  "images/holland.webp",
  "images/french.webp",
  "images/spain.webp",
  "images/english.webp",
  "images/profile.webp"
];

const jsCache = [
  "js/main.bundle.js",
  "js/standings.bundle.js",
  "js/detail-team.bundle.js"
];

const fontsCache = [
  "fonts/Poppins.TTF",
  "fonts/materialicons.woff2"
]

urlToCache.push(...viewsCache);
urlToCache.push(...imagesCache);
urlToCache.push(...jsCache);
urlToCache.push(...fontsCache);

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
          return cache.addAll(urlToCache);
      })
  )
});

self.addEventListener("fetch", function(event) {
  const apiUrl = "https://api.football-data.org/v2/";

  if(event.request.url.indexOf(apiUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch(error => {
        console.log(event.request.url);
        console.log("Fetch Error");
      })
    );
  }
  else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log(`ServiceWorker: cache ${cacheName} deleted`);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});

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