const mongoose = require('mongoose');
const Kitten = require('./modeljs/model.js');

const getRandom = (min,max)=>{
	return Math.round(min + (max-min)*Math.random());
}

const names = ["amy","tom","leo","jack","stark","lucy","peter","rick"];
const majors = ["art","computer","sport","english","music"];

const getName = ()=>names[getRandom(0,names.length-1)];
const getMajor = ()=>majors[getRandom(0,majors.length-1)];

//1.连接数据库
mongoose.connect('mongodb://localhost/kuazhu',{useNewUrlParser:true})

//2.获取对象
const db = mongoose.connection;
//3.连接数据库失败
db.on('error',()=>{
	console.log("connect db error");
	throw 'connect db error';
})

db.once('open',()=>{
	
	//3.使用模型
	Kitten.distinct("name",{age:{$gt:90}},(err,result)=>{
		if(!err){
			console.log(result);
		}
	})
})