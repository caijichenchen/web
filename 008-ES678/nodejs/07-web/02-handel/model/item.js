const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const dataPath =  path.normalize(__dirname + "/../static/data/item.json");

async function get(){
	const data = await readFile(dataPath);
	const arr = JSON.parse(data);
	return arr
}

async function add(task){
	//1.读取文件
	const data = await readFile(dataPath);
	//2.字符串转换为数组
	const arr = JSON.parse(data);
	//3.根据参数生成任务对象并且将任务对象插入到数组
	const obj = {
		id:Date.now().toString(),
		task:task
	}
	arr.push(obj)
	//4.把新数组转化为字符串
	const newArr = JSON.stringify(arr);
	//5.新数组插入页面
	await writeFile(dataPath,newArr);//完全写完后再返回obj
	//6.返回任务对象
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