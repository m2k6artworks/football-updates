//Register Service Worker
if("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
        console.log("Service worker sucessfully registered");
    })
    .catch(error => {
        console.error("Error: Failed to register service worker", error);
    });
}
else
    console.log("This browser doesn't support service worker");