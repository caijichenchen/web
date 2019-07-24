const EventEmitter = require('events');
class CustEmitter extends EventEmitter{

}
const emitter = new CustEmitter();
const listener = ()=>{
	console.log('test fn1 ...');
}
emitter.on('test',listener);
//不能移除匿名函数
console.log(emitter.removeListener == emitter.off);
// emitter.off(listener);
emitter.removeListener('test',listener);
emitter.emit('test');