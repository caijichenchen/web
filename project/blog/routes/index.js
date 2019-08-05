//查找页面
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
	// const userInfo = {};
	// if(req.cookies.get('userInfo')){
	// 	userInfo = JSON.parse(req.cookies.get('userInfo'));
	// }
	// const userInfo = req.cookies.get('userInfo') || {};
	res.render('main/index',{
		userInfo:req.userInfo
	})
})

router.get('/list',(req,res)=>{
	res.render('main/list',{
		userInfo:req.userInfo
	})
})

router.get('/detail',(req,res)=>{
	res.render('main/detail',{
		userInfo:req.userInfo
	})
})

module.exports = router;