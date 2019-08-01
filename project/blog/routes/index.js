const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	res.render('main/index',{
		
	})
})

router.get('/list',(req,res)=>{
	res.render('main/list',{
		
	})
})

router.get('/detail',(req,res)=>{
	res.render('main/detail',{
		
	})
})

module.exports = router;