const mongoose = require('mongoose');
const Kittens = require('./modeljs/user.js');
const blogs = require('./modeljs/blog.js');
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
		age:'19',
		major:'computer',
		phone:"10630837989"
	})
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log(err.message);
	})
	*/
	/*
	Kittens.insertMany({
		name:"leo",
		age:'19',
		major:'computer',
		phone:"17630837989"
	})
	.then(docs=>{
		console.log(docs);
	})
	.catch(err=>{
		console.log(err.message);
	})
	*/
	//3.使用模型
	/*
	blogs.insertMany([{
		title:'best blog1',
		content:'this is a best blog',
		author:"5d413f427494a94a68a5698c"
	},{
		title:'best blog2',
		content:'this is a best blog2',
		author:"5d413f427494a94a68a5698c"
	}],(err,doc)=>{
		if(!err){
			console.log(doc);
		}
	})
	*/
	//根据姓名找到第一个用户的所有文章
	Kittens.findOne({name:"leo"},(err,doc)=>{
		if(!err){
			// console.log(doc);
			// blogs.find({author:doc._id},(err,result)=>{
			// 	if(!err){
			// 		console.log(result);
			// 	}
			// })
			
			doc.findBlogs((err,result)=>{
				if(!err){
					console.log(result);
				}
			})
			
		}
	})
	
})