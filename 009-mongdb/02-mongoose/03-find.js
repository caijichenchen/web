const mongoose = require('mongoose');

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
	//1.定义Schema
	const UserSchema = new mongoose.Schema({
		name:String,
		age:Number,
		major:String
	})
	//2.根据Schema定义数据模型
	//2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
	//2.2 model方法第二个参数指定Schema
	const Kitten = mongoose.model('Kitten',UserSchema);
	//3.使用模型
	
	// console.log(arr);
	/*
	Kitten.find({age:{$gt:90}},(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	
	Kitten.find({age:{$gt:90}},null,{limit(1)}(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	
	Kitten.findById("5d3ebd3a684f993db07eb996",(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	
	Kitten.findOne({age:{$gt:90}},(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	Kitten.find({age:{$gt:90}},null,{limit:1},(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	*/
	Kitten.find({age:{$gt:90}},"name _id",{limit:1},(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
})