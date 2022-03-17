var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'apimqtt',
  description: 'API para comunicação N4/Khomp',
  script: 'C:\\api-mqtt\\src\\index.js'
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();