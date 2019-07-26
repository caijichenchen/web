const http = require('http');

//每一次请求都会createServer方法
const server = http.createServer((req,res)=>{
	//req 可读流
	//res 可写流

	req.write('hello');
	res.end();
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('Server running at http://127.0.0.1:3000');
})