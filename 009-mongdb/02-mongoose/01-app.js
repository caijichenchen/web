const mongoose = require('mongoose');
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
	//1.定义Schema(模式对象)
	const UserSchema = new mongoose.Schema({
		name:String,
		age:Number,
		major:String
	})
	//2.根据Schema定义数据模型
	//2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
	//2.2 model方法第二个参数指定Schema
	const Kitten = mongoose.model('Kitten',UserSchema);//model(集合)
	//3.使用模型
	/*
	const user = new Kitten({name:"tom",age:18,major:"sport"});
	user.save((err,doc)=>{
		if(err){
			console.log("err");
		}else{
			console.log(doc);
		}
	})
	
	Kitten.find({},(err,docs)=>{
		if(err){
			console.log("err",err);
		}else{
			console.log(docs);
		}
	})
	*/
	Kitten.updateOne({name:"tom"},{$set:{age:10}},(err,reslut)=>{
		if(err){
			console.log(err);
		}else{
			console.log(reslut);
		}
	})
	/*
	Kitten.deleteOne({name:"tom"},(err,result)=>{
		if(err){
			console.log(err);
		}else{
			console.log(result);
		}
	})
	*/
})