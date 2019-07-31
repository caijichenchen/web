const mongoose = require('mongoose');
const Kitten = require('./modeljs/user.js');
const moment = require('moment');

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
	/*
	Kitten.insertMany({
		name:"leo",
		age:'20'
	})
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log(err);
	})
	*/
	Kitten.findById("5d40f56ae11fa63464cda9ba",(err,doc)=>{
		if(!err){
			// console.log(doc);
			const date = new Date(doc.createdAt);
			console.log(date.getHours());
			console.log(date.toLocaleString());
			console.log(moment(date).format('YYYY - MM - DD HH:mm:ss'));
		}
	})
})