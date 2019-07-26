const fs = require('fs');
//1.向文件中增加对象
const wcs = fs.createWriteStream('./wcs.txt');
const obj = {
	name:'tom',
	age:18
}
wcs.write('');
wcs.write(JSON.stringify(obj));
wcs.end();
//2.从文件中获取所有对象
fs.readFile('./wcs.txt',{flag:'r',encoding:'utf8'},(err,data)=>{
	if(err){
		console.log('read err');
	}else{
		console.log(JSON.parse(data));
	}
})
//3.向文件中删除对象

