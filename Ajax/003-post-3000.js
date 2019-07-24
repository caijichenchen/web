const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
//读取文件
const fs = require('fs');
//req请求 res响应
const server = http.createServer((req, res) => {
	//拿到请求的方法
	console.log(req.method);
	//读取http://127.../文件地址
	if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}

	if(req.method == "POST"){
		let body = "";
		req.on("data",(chunk)=>{
			body += chunk;
		})
		req.on("end",()=>{
			console.log(body);
			res.end(body);
		})
	}else if(req.method == "GET"){
		const filePath = "./" + req.url;
		fs.readFile(filePath,(err,data)=>{
			if(err){
				//返回失败状态码404
				res.statusCode = 404;
				res.end("not found!!!");
			}else{
				res.end(data);
			}
		})
	}else{
		res.end("ok");
	}
	
  // res.end('hello\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});