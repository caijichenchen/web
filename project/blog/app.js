const mongoose = require('mongoose');
const express = require('express');
const swig = require('swig');
const app = express();

//1.连接数据库
mongoose.connect('mongodb://localhost/kuazhu',{useNewUrlParser:true});

//2.获取对象
const db = mongoose.connection;
//3.连接数据库失败
db.on('error',()=>{
	console.log("connect db error");
	throw 'connect db error';
})

db.once('open',()=>{
	
})
//加载静态
app.use(express.static("public"));
//使用模板配置信息
swig.setDefaults({
		cache:false
})
app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');

app.use('/',require('./routes/index.js'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));