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
		title:'跨猪网',
        content:'我是内容',
        name:"tom",
        obj:{
        	name:"leo"
        },
        arr:[18,22,41,62,85]
	})
})

app.get('/base', (req, res) =>{
	res.render('base',{

	})
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));