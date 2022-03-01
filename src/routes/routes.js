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

    if (element.hasOwnProperty('n')) {
      if (element.hasOwnProperty('v')) {
        let {
          n,
          v
        } = element
        if (n === 'battery') {
          const sensor = 'BAT'
          const topic = `GRU/UTS/${sensor}/${mac}`
          publishTopic(topic, v)
        }
        if (n === 'Temperature') {
          const sensor = 'TEMP'
          const topic = `GRU/UTS/${sensor}/${mac}`
          publishTopic(topic, v)
        }
        if (n === 'Humidity') {
          const sensor = 'HUM'
          const topic = `GRU/UTS/${sensor}/${mac}`
          publishTopic(topic, v)
        }
      }
      if (element.hasOwnProperty('vb')) {
        let {
          n,
          vb
        } = element
        if (n === 'C3') {
          const sensor = 'C3'
          const topic = `GRU/UTS/${sensor}/${mac}`
          publishTopic(topic, vb)
        }
        if (n === 'C4') {
          const sensor = 'C4'
          const topic = `GRU/UTS/${sensor}/${mac}`
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