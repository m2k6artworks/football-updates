!function(e){var i={};function r(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=i,r.d=function(e,i,n){r.o(e,i)||Object.defineProperty(e,i,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,i){if(1&i&&(e=r(e)),8&i)return e;if(4&i&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&i&&"string"!=typeof e)for(var o in e)r.d(n,o,function(i){return e[i]}.bind(null,o));return n},r.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(i,"a",i),i},r.o=function(e,i){return Object.prototype.hasOwnProperty.call(e,i)},r.p="",r(r.s=0)}([function(e,i){importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"),workbox?(workbox.precaching.precacheAndRoute([{url:"/",revision:"1"},{url:"/images/fb-updates.png",revision:"1"},{url:"/images/fb-updates512.png",revision:"1"},{url:"/images/fb-updates256.png",revision:"1"},{url:"/images/fb-updates128.png",revision:"1"},{url:"/images/fb-updates64.png",revision:"1"},{url:"/images/fb-updates32.png",revision:"1"},{url:"/images/fb-updates24.png",revision:"1"},{url:"/manifest.json",revision:"1"},{url:"/regis-sw.js",revision:"1"},{url:"/index.html",revision:"1"},{url:"/views/league.html",revision:"1"},{url:"/views/favorite-team.html",revision:"1"},{url:"/views/contact.html",revision:"1"},{url:"/views/standings.html",revision:"1"},{url:"/views/detail-team.html",revision:"1"},{url:"/images/uefa-indoor.webp",revision:"1"},{url:"/images/uefa-stadium.webp",revision:"1"},{url:"/images/uefa-trophy.webp",revision:"1"},{url:"/images/germany.webp",revision:"1"},{url:"/images/europe.webp",revision:"1"},{url:"/images/holland.webp",revision:"1"},{url:"/images/french.webp",revision:"1"},{url:"/images/spain.webp",revision:"1"},{url:"/images/english.webp",revision:"1"},{url:"/images/profile.webp",revision:"1"},{url:"/js/main.bundle.js",revision:"1"},{url:"/js/standings.bundle.js",revision:"1"},{url:"/js/detail-team.bundle.js",revision:"1"},{url:"/fonts/Poppins.TTF",revision:"1"},{url:"/fonts/materialicons.woff2",revision:"1"}],{ignoreUrlParametersMatching:[/.*/]}),workbox.routing.registerRoute(new RegExp("https://api.football-data.org/v2/"),workbox.strategies.staleWhileRevalidate({cacheName:"api-data",plugins:[new workbox.expiration.Plugin({maxEntries:60,maxAgeSeconds:604800})]}))):console.log("Workbox gagal dimuat"),self.addEventListener("push",(function(e){var i={body:e.data?e.data.text():"Welcome to Football Updates",vibrate:[100,50,100],icon:"images/fb-updates128.png",badge:"images/fb-updates128.png",data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("Push notification",i))}))}]);