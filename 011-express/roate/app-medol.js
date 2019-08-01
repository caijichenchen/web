const express = require('express');
const userRouter = require('../router/user.js');
const blogsRouter = require('../router/blogs.js');
const app = express();

app.use(express.static("public"));

app.use('/users',userRouter);
app.use('/blogs',blogsRouter)

/*
app.get('/users', (req, res) => res.send('get response data!'));
app.post('/users', (req, res) => res.send('post response data!'));
app.put('/users', (req, res) => res.send('put response data!'));
app.delete('/users', (req, res) => res.send('delete response data!'));
app.get('/blogs', (req, res) => res.send('get response data!'));
app.post('/blogs', (req, res) => res.send('post response data!'));
app.put('/blogs', (req, res) => res.send('put response data!'));
app.delete('/blogs', (req, res) => res.send('delete response data!'));
*/


app.listen(3000, () => console.log('Example app listening on port 3000!'));