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
	blogs.findOne({title:"best blog1"},(err,blog)=>{
		if(!err){
			const result = {};
			result.blog = blog;
			Kittens.findOne(result.author,(err,doc)=>{
				if(!err){
					result.user = doc;
					console.log(result);
				}
			})
		}
	})
	
	blogs.findOne({title:"best blog1"})
	.populate('author',"name -_id")
	.then(data=>{
		console.log(data);
	})
	*/
	blogs.findBlogs({title:"best blog1"})
	.then(data=>{
		console.log(data);
	})
})