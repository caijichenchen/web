const EventEmitter = require('events');
class CustEmitter extends EventEmitter{

}
const emitter = new CustEmitter();

emitter.on('test',(arg1,arg2)=>{
	console.log("arg1::",arg1);
	console.log("arg2::",arg2);
})
// emitter.emit('test','aa','bb');
const args = ['bb','cc'];
emitter.emit('test',...args);