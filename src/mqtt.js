const mqtt = require("mqtt")
const { server, topic } = require("./config/mqtt-config.js");

const client = mqtt.connect(server);


client.on('connect', () => {
    console.log(`Conectado, no host ${process.env.MQTT_HOST} na porta ${process.env.MQTT_PORT}`);
    client.subscribe(topic, () => {
        topic.forEach(element => {
           console.log(`Subscribe to topic '${element}'`)
         })
    })
})

module.exports = client;