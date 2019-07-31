const fs = require('fs');
const util = require('util');
//1.同步
//1.1逐步操作

///1.1.1打开文件
/*
const fd = fs.openSync('./01.txt','w');//w-->write  a-->追加append 会有一个返回值
// console.log(fd);
//1.1.2写入文件
fs.writeSync(fd,'hello');
//1.1.3关闭文件
fs.closeSync(fd);
*/
//1.2合并操作
// fs.writeFileSync('./01.txt','hello',{flag:'w'});


//2.异步
//2.1逐步操作
//2.1.1打开文件
/*
fs.open('./01.txt','w',(err,fd)=>{
	if(err){
		console.log('open file error',err);
	}else{
		// console.log(fd);
		//2.1.2写入文件
		fs.write(fd,'hello',(err)=>{
			if(err){
				console.log('write file err',err);
			}else{
				console.log('success');
			}
		})
		//2.1.3关闭文件
		fs.close(fd,err=>{
			if(err){
				console.log('close err',err);
			}else{
				console.log('close success');
			}
		})
	}
})
*/
//合并操作
/*
fs.writeFile('./01.txt','hihi',{flag:'w'},err=>{
	if(err){
		console.log('write file err',err);
	}else{
		console.log('success');
	}
})


console.log("after...");
*/


const writeFile = util.promisify(fs.writeFile);
writeFile('./01.txt','hello',{flag:'w'})
.then(data=>{
	console.log('success');
})
.catch(err=>{
	console.log('err');
})