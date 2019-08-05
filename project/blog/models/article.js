const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
	title:{
        type:String,
        required:[true,"文章标题必须输入"],
    },
    intro:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    click:{
        type:Number,
        default:0
    },
    content:{
        type:String
    }
})
const ArticleModel = mongoose.model('article',ArticleSchema);

module.exports = ArticleModel;