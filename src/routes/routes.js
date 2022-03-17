const client = require('../mqtt')

function publishTopic(topic, value) {
    try {
  
      client.publish(topic, value.toString(), {
        qos: 0,
        retain: false
      }, (error) => {
        if (error) {
          console.error(error)
        }
      })
  
    } catch (error) {
  
      client.publish("GRU/UTS/LOG", error.toString(), {
        qos: 0,
        retain: false
      }, (error) => {
        if (error) {
          console.error(error)
        }
      })
  
    }
  
  }

function getValues(element, mac) {
    const prefix = process.env.MQTT_TOPIC.split(",")

    if (element.hasOwnProperty('bt')) {
      let {
        bt
      } = element
          const sensor = 'TIME'
          const topic = `${prefix}/${sensor}/${mac}`
          const date = new Date(bt*1000)
          const convertedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
          console.log(convertedDate)
          publishTopic(topic, convertedDate)
    }
    if (element.hasOwnProperty('n')) {
      if (element.hasOwnProperty('v')) {
        let {
          n,
          v
        } = element
        if (n === 'Bateria') {
          const sensor = 'BAT'
          const topic = `${prefix}/${sensor}/${mac}`
          publishTopic(topic, v)
        }
        if (n === 'Temperatura') {
          const sensor = 'TEMP'
          const topic = `${prefix}/${sensor}/${mac}`
          publishTopic(topic, v)
        }
        if (n === 'Umidade') {
          const sensor = 'HUM'
          const topic = `${prefix}/${sensor}/${mac}`
          publishTopic(topic, v)
        }

       
      }
      if (element.hasOwnProperty('vb')) {
        let {
          n,
          vb
        } = element
        if (n === 'in1') {
          const sensor = 'in1'
          const topic = `${prefix}/${sensor}/${mac}`
          publishTopic(topic, vb)
        }
        if (n === 'in2') {
          const sensor = 'in2'
          const topic = `${prefix}/${sensor}/${mac}`
          publishTopic(topic, vb)
        }
        
      }
  
    }
  }
  
  function getMac(receivedMessage) {
    let mac
    receivedMessage.forEach(element => {
      if (element.hasOwnProperty('bn')) {
        let {
          bn
        } = element
        mac = bn
      }
    })
    return mac
  }

 module.exports = {getMac, getValues};