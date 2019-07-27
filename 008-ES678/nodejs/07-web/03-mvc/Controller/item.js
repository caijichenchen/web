const { get:getItem,add:addItem,del:delItem } = require('../model/item.js');
const path = require('path');
const swig = require('swig');
const querystring = require('querystring');
class Controller{
	//index就是action
	index(req,res,...args){
		getItem()
		.then(data=>{
			// console.log("index ...");
			// console.log("1",data);
			
			const filePath = path.normalize(__dirname + "/../View/item/index.html");//规范化解析地址路径
			// console.log(filePath);

			//引入模板
			var template = swig.compileFile(filePath);

			const html = template({
				data:data
			})
			// console.log(html);
			res.setHeader("Content-type","text/html;charset=UTF-8");
			res.end(html);
		})
		.catch(err=>{
			console.log("err:::",err);
			res.setHeader("Content-type","text/html;charset=UTF-8");
			res.statusCode = 404;
			res.end('<h1>请求出错</h1>');
		})
		// res.end("do..ok");
	}
	add(req,res,...args){
		//1.获取参数
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		})
		req.on('end',()=>{
			// console.log(body);
			const query = querystring.parse(body);//根据中间的=  字符串转对象
			//2.根据参数生成任务对象插入文件中
			addItem(query.task)
			.then(data=>{
				//3.将新生成的任务对象返回前台
				res.end(JSON.stringify({
					code:0,
					message:'添加成功',
					data:data
				}))
			})
			.catch(err=>{
				console.log(err);
				res.end(JSON.stringify({
					code:1,
					message:'添加失败'
				}))
			})
		})
	}
	del(req,res,...args){
		// const id = parseUrl.query.id;
		const id = args[0];
		delItem(id)
		.then(data=>{
			//3.将新生成的任务对象返回前台
			res.end(JSON.stringify({
				code:0,
				message:'删除成功',
			}))
		})
		.catch(err=>{
			// console.log(err);
			res.end(JSON.stringify({
				code:1,
				message:'删除失败'
			}))
		})
	}
}


module.exports = new Controller();