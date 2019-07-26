const fs = require('fs');
const util = require('util');
//1.同步
/*
const fd = fs.openSync('./01.txt','r');
// console.log(fd);

const buf = Buffer.alloc(50);
// console.log(buf);
fs.readSync(fd,buf,0,1,0)
console.log(buf.toString());

const data = fs.readFileSync('./01.txt',{encoding:'utf8'});
console.log(data);
*/
//2.异步
/*
fs.open('./01.txt','r',(err,fd)=>{
	if(err){
		console.log('open err');
	}else{
		// console.log(fd);
		const buf = Buffer.alloc(50);
		fs.read(fd,buf,0,1,0,(err)=>{
			if(err){
				console.log('read err');
			}else{
				console.log(buf.toString());
			}
		})
		fs.close(fd,err=>{
			if(err){
				console.log('close err',err);
			}else{
				console.log('close success');
			}
		})
	}
})

fs.readFile('./01.txt',{flag:'r',encoding:'utf8'},(err,data)=>{
	if(err){
		console.log('read err');
	}else{
		console.log(data.toString());
	}
})
*/

const readFile = util.promisify(fs.readFile);
//flag读取方式 encoding是在后台解析语言方式
readFile('./01.txt',{flag:'r',encoding:'utf8'})
.then(data=>{
	console.log(data.toString());
})
.catch(err=>{
	console.log('err');
})