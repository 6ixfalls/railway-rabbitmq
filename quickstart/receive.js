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

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
            }, {
                noAck: true
            });
        });
    });
})();
