const {Readable} = require('stream');
const reader = new Readable();
/*
reader.on('data',(chunk)=>{
	console.log(chunk);
})
*/
class Reader extends Readable{
	//模拟底层数据的读取
	constructor(){
		super();
		this.index = 0;
	}
	_read(){
		this.index ++;
		if(this.index > 5){
			this.push(null);
		}else{
			this.push(this.index+'');	
		}
	}
}

const readers = new Reader();
/*
//1.初始化一个变量用来保存数据
let body = '';
//3.监听end事件，在回调函数中保存数据
readers.on('end',()=>{
	console.log("end ...");
	console.log("read data::",body);
})
//2.监听data事件实现累加
readers.on('data',(chunk)=>{
	// console.log(chunk);
	body += chunk;
})
*/
//可读流的数据-->标准流的输出设备
readers.pipe(process.stdout);