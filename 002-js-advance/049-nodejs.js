var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req,res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello haha\n');
});

server.listen(port, hostname, function(){
  console.log('server running at http://127.0.0.1:30000/');
});