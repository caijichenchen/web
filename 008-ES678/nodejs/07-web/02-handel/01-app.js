const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('./path.json');
const { get } = require('./model/item.js');

//每一次请求都会createServer方法
const server = http.createServer((req,res)=>{
	//req 可读流
	//res 可写流
	// console.log(req.url);
	// const filePath = "./" + req.url;
	// console.log(req.method);

	const parseUrl = url.parse(req.url,true);
	console.log(parseUrl);

	const pathname = parseUrl.pathname;
	console.log(pathname);
	//加载首页
	if(pathname == "/" || pathname == "/index.html"){
		get()
		.then(data=>{
			console.log(data);
			const filePath = path.normalize(__dirname + "/static/index.html");//规范化解析地址路径
			// console.log(filePath);
			//异步程序
			fs.readFile(filePath,(err,data)=>{
				if(err){
					res.setHeader("Content-type","text/html;charset=UTF-8");
					res.statusCode = 404;
					res.end('<h1>请求出错</h1>');
				}else{
					/*
					//根据拓展名text/html
					const extname = path.extname(filePath);//返回文件的拓展名
					const mimeType = mime[extname] || 'text/plain';//匹配mime中的拓展名
					*/
					res.setHeader("Content-type","text/html;charset=UTF-8");
					res.end(data);
				}
			})
		})
	}
	//接受AJAX请求
	else if(pathname == "/add"){
		console.log("add...");
		res.end(JSON.stringify({

		}))
	}
	//静态资源加载,解析html内部引入标签
	else{
		const filePath = path.normalize(__dirname + "/static" + req.url);//规范化解析地址路径
		// console.log(filePath);
		//异步程序
		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader("Content-type","text/html;charset=UTF-8");
				res.statusCode = 404;
				res.end('<h1>请求出错</h1>');
			}else{
				//根据拓展名text/html
				const extname = path.extname(filePath);//返回文件的拓展名
				const mimeType = mime[extname] || 'text/plain';
				res.setHeader("Content-type",mimeType+";charset=UTF-8");
				res.end(data);
			}
		})
	}
	// req.write('hello');
	// res.end('good');
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('Server running at http://127.0.0.1:3000');
})