const express = require('express');
const swig = require('swig');
const app = express();

app.use(express.static("public"));
swig.setDefaults({
	cache:false
})

app.engine('html',swig.renderFile);

app.set('views','./views');

app.set('view engine','html');

app.get('/',(req,res)=>{
	res.render('indexs',{
		
	})
})

app.get('/', (req, res) => res.send('get response data!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));