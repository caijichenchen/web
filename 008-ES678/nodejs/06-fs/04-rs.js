const fs = require('fs');

const rs = fs.createReadStream('./rs.txt');

rs.on('open',()=>{
	console.log('write open');
})
rs.on('close',()=>{
	console.log('write close');
})
rs.on('data',(chunk)=>{
	console.log(chunk);
})
rs.on('end',()=>{
	console.log('end');
})