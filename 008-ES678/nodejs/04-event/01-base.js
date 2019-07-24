const EventEmitter = require('events');
/*
const emitter = new EventEmitter();
emitter.on('test',()=>{
	console.log("test fn..");
})
emitter.emit('test');
console.log(EventEmitter);
*/
class CustomEmitter extends EventEmitter{

}

const emitter = new CustomEmitter();
emitter.on('test',()=>{
	console.log("test fn..");
})
emitter.emit('test');
console.log(EventEmitter);
