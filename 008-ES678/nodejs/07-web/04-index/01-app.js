const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const mime = require('./path.json');
const swig = require('swig');
const querystring = require('querystring');
const { get,add,del } = require('./model/item.js');

const server = http.createServer((req,res)=>{
	//req.url表示当前文件夹下的请求路径
	// console.log(req.url);
	const parseUrl = url.parse(req.url,true);//解析url字符串并返回url对象
	// console.log(parseUrl);
	const pathname = parseUrl.pathname;//服务器后面跟的请求
	if(pathname == "/" || pathname == "/index.html"){
		get()
		.then(data=>{
			// console.log(data);
			const filePath = path.normalize(__dirname + "/static/index.html");//请求文件的具体路径

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
			res.setHeader('Content-type',"text/html;charset=UTF-8");
			res.statusCode = 404;
			res.end("<h1>请求出错</h1>")
		})
	}
	else if(pathname == "/add"){
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		})
		req.on('end',()=>{
			// console.log(body);
			const query = querystring.parse(body);//根据中间的=  字符串转对象
			//2.根据参数生成任务对象插入文件中
			add(query.task)
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
	else if(pathname == "/del"){
		const id = parseUrl.query.id;
		del(id)
		.then(data=>{
			//3.将新生成的任务对象返回前台
			res.end(JSON.stringify({
				code:0,
				message:'删除成功',
			}))
		})
		.catch(err=>{
			console.log(err);
			res.end(JSON.stringify({
				code:1,
				message:'删除失败'
			}))
		})
	}
	else{	
		const filePath = path.normalize(__dirname + "/static/" + req.url);//请求文件的具体路径
		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-type',"text/html;charset=UTF-8");
				res.statusCode = 404;
				res.end("<h1>请求出错</h1>")
			}else{
				//解析html里面的css/js文件请求
				const extname = path.extname(filePath);//文件的拓展名(js/css/html)
				const mimeType = mime[extname] || "text/plain";//在拓展文件中匹配
				// console.log(extname);
				res.setHeader('Content-type',mimeType+";charset=UTF-8");
				res.end(data);
			}
		})
	}
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('Server running at http://127.0.0.1:3000');
})