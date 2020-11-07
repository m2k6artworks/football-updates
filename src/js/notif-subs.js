if("serviceWorker" in navigator) {
    requestNotificationPermission();
}
else
    console.log("This browser doesn't support service worker");

if('PushManager' in window) {
    getPushSubcription()
    .then(pushSubscription => {
        console.log("Push notification subcribed");
    })
    .catch(message => {
        console.log(message);
        subscribePushNotification();
    });
}

function requestNotificationPermission() {
    if('Notification' in window) {
        Notification.requestPermission().then(result => {
            if(result === "denied") {
                console.log("Notification permission denied");
                return;
            }
            else if(result === "default"){
                console.log("User close notification permission dialog");
                return;
            }
        })
    }
}

function getPushSubcription() {
    return new Promise((resolve, reject) => {
        navigator.serviceWorker.ready.then(serviceWorkerRegistration => {
            serviceWorkerRegistration.pushManager.getSubscription().then(function(pushSubscription) {
                if(pushSubscription !== null)
                    resolve(pushSubscription);
                else
                    reject("Push notification unsubscribed");
            });
        })
    });
}

function subscribePushNotification() {
    navigator.serviceWorker.getRegistration().then(registration => {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BBzCLs1CbfUr_9nnQfjYmWQT_LyFEvJ0anQe_OQkMFxUn5Xdsn8xVnaRBJ6_CcgzzECMyXMad0zrccbBleoUlEE")
        }).then(subscribe => {
            console.log("Success subscribe with endpoint: ", subscribe.endpoint);
            console.log("Success subscribe with p256dh key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Sicess subscribe with auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error("Can't do push notification subscribe", e.message);
        });
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}