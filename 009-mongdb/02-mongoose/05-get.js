const mongoose = require('mongoose');
//1.链接数据库
mongoose.connect('mongodb://localhost/kuazhu',{useNewUrlParser:true});
//2.获取对象
const db = mongoose.connection;
//3.执行操作
db.on('open',()=>{
	const UserSchema = new mongoose.Schema({
		name:String,
		age:Number,
		sex:{
			type:String,
			default:"male"
		},
		major:String
	})
	const chen = new mongoose.model('chen',UserSchema);
	const user = new chen({name:"tom",age:18,major:"sport"});
	user.save((err,doc)=>{
		if(!err){
			console.log(doc);
		}
	})
})