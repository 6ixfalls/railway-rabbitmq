#!/usr/bin/env node

(async () => {
    console.log(" [*] Waiting 5 seconds for private networking");
    await new Promise(r => setTimeout(r, 5000));
    console.log(" [*] Running amqp");
    var amqp = require('amqplib/callback_api');

    amqp.connect('amqp://railway-rabbitmq.railway.internal', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'hello';
            var msg = 'Hello World!';

            channel.assertQueue(queue, {
                durable: false
            });
            setInterval(() => {
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            }, 5000);
        });
    });
})();
