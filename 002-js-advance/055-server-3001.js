var http = require('http');

var hostname = '127.0.0.1';
var port = 3001;

var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
  res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:3000");
  // res.setHeader("Access-Control-Allow-Origin","*");
 
  if(req.url == "/favicon.ico"){
		res.end("favicon.ico");
	}

	//http://127.0.0.1/050test.html

  if(req.method == "POST"){
    var body = '';
    req.on("data",function(chunk){
      body += chunk;
    })
    req.on("end",function(){
      console.log(body);
      res.end(body);
    })
  }else if(req.method == "GET"){
    if(req.url.search(/\?/) != -1){
      var parm = url.parse(req.url,true).query;
      console.log(parm);
      var objToJSON = JSON.stringify(parm);
      res.end(objToJSON);
    }
    var filePath = './' + req.url;
    fs.readFile(filePath,function(err,data){
      if(err){
        res.statusCode = 404;
        res.end('not found');
      }else{
        res.end(data);
      }
    })
  }else{
    res.end("ok");
  }
});

server.listen(port, hostname, function(){
  console.log('server running at http://127.0.0.1:3001/');
});