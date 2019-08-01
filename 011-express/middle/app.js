const express = require('express');
const app = express();

app.use(express.static("public"));
app.use((req,res,next)=>{
	console.log("do something A ...");
	next();
})

app.use((req,res,next)=>{
	console.log("do something B ...");
	next();
})

app.get('/', (req, res) => res.send('get response data!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));