const client = require('./mqtt.js');
const{ getMac, getValues } = require('./routes/routes.js');


client.on('message', (topic, payload) => {
    const receivedMessage = JSON.parse(payload.toString());
    const mac = getMac(receivedMessage)

    receivedMessage.forEach(element => {
        getValues(element, mac) 
    });
})


