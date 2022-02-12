/*

const webpush = require('web-push');

console.log(webpush.generateVAPIDKeys());

const subscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cgDcfYJuvVE:APA91bG_x3deM9gwdO_Sxmkc8AvdieKubzEjHezZPdL7pThJ9f4oxgANazpGRIK_9v8Mvg82Hv8kRRDnNSXKE3KzC9S7wvcG8oSefyLKD_0OXADap1SWZmifYWpkokwqcjPmA4LEIz2e",
    "expirationTime": null,
    "keys": {
        "p256dh": "BObsf0-K3-YeIslYAsdQ_6uA7f0QFNRoYlDYFBJar5O7mKxbDtGXo11O8TRW07R39mjvSlmHMlklbyeRJG3TTSc",
        "auth": "IvlA4VlAjt7dsaykuUPPzA"
    }
}

const payload = {
    notification: {
        data: {url: 'http://www.google.fr'},
        title: 'Fun notitifcation',
        vibrate: [100, 50, 100]
    }
}

webpush.setVapidDetails('mailto:benoit.bonavia@gmail.com', publicKey, privateKey);

webpush.sendNotification(subscription, JSON.stringify(payload))

setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 5000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 10000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 15000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 20000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 20000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 30000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 40000);
setTimeout(() => webpush.sendNotification(subscription, JSON.stringify(payload)), 50000);

*/

const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const path = require('path');


const app = express();

const publicKey = 'BKXP-R7bNLxphfkNkn_hxWhMgVNZXo6Df_6_86SKUBs74su4WIZSTfwZY13Q7AwNrUZW_lfi-MglLn94Di3bX7U';
const privateKey = 'vT2CuE_30mqLtV911zfHlFPahTBrAsgcsRhjC8M0GO0';

webpush.setVapidDetails('mailto:benoit.bonavia@gmail.com', publicKey, privateKey);

let subscription;

const jsonParser = bodyparser.json();

app.post('/subscribe', jsonParser, (req, res) => {
    subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({
        notification: {
            title: 'Congratulations',
            body: 'You have register to push notifications with success',
            vibrate: [100, 50, 100],
            actions: []
        }
    });

    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
})

app.get('/request-notification', (req, res) => {
    console.log(subscription);

    const payload = {
        notification: {
            title: 'Fun notitifcation',
            icon: '/pictures/car.png',
            image: '/pictures/car.png',
            vibrate: [100, 50, 100],
            actions: []
        }
    }

    webpush.sendNotification(subscription, JSON.stringify(payload)).catch(err => console.error(err));
    res.status(200).json({});
})

app.listen(3000, () => console.log('listening on port 3000'));
