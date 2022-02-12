const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');


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
