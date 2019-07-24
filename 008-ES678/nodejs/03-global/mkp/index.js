//指定项目名称,创建前端项目目录结构
const fs = require('fs');


function mkp(){
	//1.获取名称
	const pathName = "./"+process.argv[2];
	// console.log(pathName);
	//2.根据名称生成文件夹
	fs.mkdirSync(pathName);
	fs.mkdirSync(pathName+"/css");
	fs.mkdirSync(pathName+"/js");
	fs.mkdirSync(pathName+"/img");
}
module.exports = mkp;