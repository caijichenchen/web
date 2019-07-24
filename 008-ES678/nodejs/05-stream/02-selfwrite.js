const {Writable} = require('stream');
// console.log(Writable);
/*
const write = new Writable();
write.write('hello');
*/
class SelfWriter extends Writable{
	_write(chunk,encoding,callback){
		console.log("chunk::",chunk);
		console.log("encoding::",encoding);
		callback && callback();
	}
} 
const write = new SelfWriter();
write.on('finish',()=>{
	console.log("write done");
})


write.write("hello",'',()=>{
	console.log("after write hello");
});

write.write('good');
write.end('yes');