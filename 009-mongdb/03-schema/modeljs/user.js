const mongoose = require('mongoose');

//1.定义Schema
const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:[true,"用户名必须输入"],
		maxlength:[6,"最大长度为6"]
	},
	age:{
		type:Number,
		min:[10,"年龄最小是10"],
		max:[60,"年龄最大60"]
	},
	major:{
		type:String,
		enum:['sport','computer']
	},
	phone:{
		type:String,
		validate:{
			validator:function(val){
				return /1[3578]\d{9}/.test(val)
			},
			messgae:'{VALUE}不是合法手机号'
		}
	},
	isLocked:{
		type:Boolean,
		default:false
	},
	createdAt:{
		type:Date,
		default:Date.now()
	},
	friends:{
		type:Array
	}
})
/*
UserSchema.methods.findBlogs = function(callback){
	// console.log(this._id);
	console.log(this.model('blog'));
	this.model('blog').find({author:_id},callback);
}
*/
//2.根据Schema定义数据模型
//2.1 model方法第一个参数指定集合名称,mongoose会默认转换为复数
//2.2 model方法第二个参数指定Schema
const Kittens = mongoose.model('user',UserSchema);

module.exports = Kittens;