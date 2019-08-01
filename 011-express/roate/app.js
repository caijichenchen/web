const express = require('express');
const app = express();

app.use(express.static("public"));

// app.get('/', (req, res) => res.send('Hello'));

/*

app.get('/get', (req, res) => res.send('get response data!'));
app.post('/post', (req, res) => res.send('post response data!'));
app.put('put', (req, res) => res.send('put response data!'));
app.delete('/delete', (req, res) => res.send('delete response data!'));
*/
/*
app.all('',(req,res,next)=>{
	console.log("do something ...");
	next()
})
*/

app.get('/', (req, res) => res.send('get response data!'));
app.post('/', (req, res) => res.send('post response data!'));
app.put('/', (req, res) => res.send('put response data!'));
app.delete('/', (req, res) => res.send('delete response data!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));