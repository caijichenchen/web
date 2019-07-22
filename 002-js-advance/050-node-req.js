var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var fs = require('fs');

var server = http.createServer(function(req,res){
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello haha\n');
  console.log(req.url)
  if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}
	//http://127.0.0.1/050test.html
  var filePath = './' + req.url;
  fs.readFile(filePath,function(err,data){
  	if(err){
  		res.statusCode = 404;
  		res.end('not found');
  	}else{
  		res.end(data);
  	}
  })
});

server.listen(port, hostname, function(){
  console.log('server running at http://127.0.0.1:3000/');
});