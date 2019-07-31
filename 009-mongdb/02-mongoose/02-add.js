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
	/*
	const user = new Kitten({name:"tom",age:18,major:"sport"});
	user.save()
	.then(doc=>{
		console.log(doc);
	})
	.catch(err=>{
		console.log(err);
	})
	
	Kitten.insertMany([{name:"leo",age:18,major:"sport"},{name:"jack",age:28,major:"computer"}],(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	
	Kitten.create([{name:"leo",age:18,major:"sport"},{name:"jack",age:28,major:"computer"}],(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
	*/
	const arr = [];
	for(let i = 0;i<100;i++){
		arr.push({
			name:getName(),
			age:getRandom(20,100),
			major:getMajor()
		})
	}
	// console.log(arr);
	Kitten.insertMany(arr,(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			console.log(docs);
		}
	})
})