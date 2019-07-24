const EventEmitter = require('events');
class CustEmitter extends EventEmitter{

}
const emitter = new CustEmitter();
/*
emitter.on('test',()=>{
	console.log('test fn1 ...');
})
emitter.addListener('test',()=>{
	console.log('test fn2 ...');
})
emitter.once('test',()=>{
	console.log('test fn3 ...');
})
emitter.emit('test');
emitter.emit('test');
emitter.emit('test');
*/
//是同一个方法
console.log(emitter.on == emitter.addListener);

emitter.setMaxListeners(3);
emitter.on('test',()=>{
	console.log('test fn1 ...');
})
emitter.on('test',()=>{
	console.log('test fn2 ...');
})
emitter.on('test',()=>{
	console.log('test fn3 ...');
})
emitter.on('test',()=>{
	console.log('test fn4 ...');
})
emitter.emit('test');