const EventEmitter = require('events');
class CustEmitter extends EventEmitter{

}
const emitter = new CustEmitter();
emitter.on('newListener',(eventName,cb)=>{
	console.log('newListener fn ...');
	console.log(eventName);
	cb();
})
// emitter.emit('newListener');
//有新事件绑定时会立马被触发
emitter.on('test',()=>{
	console.log('test fn ...');
})
emitter.on('text',()=>{
	console.log('text fn ...');
})