const express = require('express');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
//解析urlencoded内容
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('get response data!'));

app.post('',(req,res)=>{
	console.log(req.body);
	res.json({code:0});
})

/*
app.post('/', (req, res) =>{
	// res.send('get response data!');
	let body = '';
	req.on('end',()=>{
		// console.log(body);
		console.log(querystring.parse(body));
	})
	req.on('data',(chunk)=>{
		body += chunk;
	})
	res.json({code:0});
});
*/

app.listen(3000, () => console.log('Example app listening on port 3000!'));