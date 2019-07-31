const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


const dataPath = path.normalize(__dirname + "/../data/item.json");

async function get(){
	const data = await readFile(dataPath);
	const arr = JSON.parse(data);

	return arr;
}

async function add(task){
	//1.读取目标数据文件
	const data = await readFile(dataPath);
	//2.将目标文件转换为可操作的数组
	const arr = JSON.parse(data);
	//3.将目标参数添加到目标文件中
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj);
	//4.将目标对象转化为字符串
	const newArr = JSON.stringify(arr);
	//5.写入文件
	await writeFile(dataPath,newArr);
	//6.将目标对象返回
	return obj;
}

async function del(id){
	//1.读取数据文件
	const data = await readFile(dataPath);
	//2.读取文件的数据转换成数组
	const arr = JSON.parse(data);
	//3.根据ID删除数据再生成新的数组
	const newArr = arr.filter((item)=>{
		return item.id != id;
	})
	//4.将数组转换成字符串
	await writeFile(dataPath,JSON.stringify(newArr));
}

module.exports = {
	get,
	add,
	del
}