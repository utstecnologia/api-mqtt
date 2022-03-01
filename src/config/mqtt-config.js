require('dotenv').config()

const server = {
host : process.env.MQTT_HOST,
port : process.env.MQTT_PORT,
clientId : Math.random().toString(16).substr(2, 8),
clean: process.env.MQTT_CLEAN,
username : process.env.MQTT_USERNAME,
password : process.env.MQTT_PASSWORD,
reconnectPeriod: process.env.MQTT_RECONNECTPERIOD,
connectTimeout: process.env.MQTT_CONNECTTIMEOUT
}

const topic =process.env.MQTT_TOPIC
module.exports = { server, topic };