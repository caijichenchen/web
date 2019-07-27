const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('./path.json');

//每一次请求都会createServer方法
const server = http.createServer((req,res)=>{
	// console.log("req.url",req.url);
	const parseUrl = url.parse(req.url,true);

	const pathname = parseUrl.pathname;

	//静态资源处理
	if(pathname.startsWith('/static/')){//startWith查看字符串是否是以xx开头的 返回布尔值
		const filePath = path.normalize(__dirname + "/" + req.url);//规范化解析地址路径

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
	else{
		//解析路由
		const paths = pathname.split('/');
		console.log(paths);
		const controller = paths[1] || "Index";
		const action = paths[2] || "index";
		const args = paths.splice(3);//拿到后面的参数
		console.log(args);

		/*
		约定：
		所有的Controller文件都保存在./Controller/目录下
		*/
		try{
			const mode = require(path.normalize(__dirname + "/Controller/"+controller));

			// mode[action] && mode[action](...[req,res].concat(args));
			typeof mode[action] == 'function' && mode[action](...[req,res].concat(args));//传入req,res和参数
			// res.end("over")
		}catch(err){
			console.log("err::",err);
			res.setHeader("Content-type","text/html;charset=UTF-8");
			res.statusCode = 404;
			res.end('<h1>请求出错</h1>');
		}
		// res.end('witting..');
	}
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('Server running at http://127.0.0.1:3000');
})