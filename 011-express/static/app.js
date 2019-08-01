const express = require('express');
const app = express();

app.use(express.static("public"));

app.get('/', (req, res) => res.send('get response data!'));
app.post('/', (req, res) => res.send('post response data!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));