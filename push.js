const webPush = require('web-push');
const readline = require('readline');

var readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const vapidKeys = {
    "publicKey": "BBzCLs1CbfUr_9nnQfjYmWQT_LyFEvJ0anQe_OQkMFxUn5Xdsn8xVnaRBJ6_CcgzzECMyXMad0zrccbBleoUlEE",
    "privateKey": "avuY6CvJrgENprMCxCW_1JH09k36kvFTLfJhHrKcOuU"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

readl.question('Input Message to Push : ', (message) => {
    const pushSubscription = {
        "endpoint": "https://fcm.googleapis.com/fcm/send/e_VusS2ChZw:APA91bH00yLH0bk9fbUHJ2GMlzd5QQy5KsZIZTyZeDYDVJsqtCgpiTLxcpQpzztEgiI_jcQFwUXo4MOgKrPOiEgixepwLR3G2XsaSIHmJPhTZSAFtNoUidNJ3acJ_aCxWzcWa3Ooa-xj",
        "keys": {
            "p256dh": "BFx83l8oGHtNOKpuycv/gKX1HcTBfZTgmjJlm0a6DG4DePAiHHpCndZUKWuSLcuVl7085rTWQZsD3GSqoK/fxRI=",
            "auth": "gbD/4fdnOfwokZmWVmQhUA=="
        }
    };

    const payload = message;
    const options = {
        gcmAPIKey: '629516466457',
        TTL: 60
    };

    webPush.sendNotification(
        pushSubscription,
        payload,
        options
    );

    readl.close();
})