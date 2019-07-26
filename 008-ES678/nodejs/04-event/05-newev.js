const EventEmitter = require('events');
class CustEmitter extends EventEmitter{

}
const emitter = new CustEmitter();
emitter.on('newListener',(eventName,cb)=>{
	console.log('newListener fn ...');
	//打印出所有被绑定事件
	console.log(eventName);
	//执行新绑定的事件
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