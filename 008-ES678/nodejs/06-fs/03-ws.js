const fs = require('fs');

const ws = fs.createWriteStream('./ws.txt');

ws.on('open',()=>{
	console.log('write open');
})
ws.on('close',()=>{
	console.log('write close');
})
ws.on('finish',()=>{
	console.log('end');
})

ws.write('hello');
ws.write('good');
ws.end();