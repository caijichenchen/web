const express = require('express');
const app = express();

app.use(express.static("public"));

app.get('/', (req, res) =>{
	// console.log(req.query);
	// res.send('Hello');
	// res.send('<h1>Hello</h1>');
	// res.send({
	// 	name:"tom"
	// })

	res.end('hello')//只能返回字符串不能返回对象
	res.json({
		name:"tom"
	})//只能返回json
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));