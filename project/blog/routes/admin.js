//查找页面
const express = require('express');
const UserModel = require('../models/user.js');
const Category = require('../util/pagination.js');
const router = express.Router();
//权限验证

router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登陆</h1>')
	}
})

//显示管理员后台管理首页
router.get('/',(req,res)=>{
	// res.send('hah');
	res.render('admin/index',{
		userInfo:req.userInfo
	});
})

//显示用户列表
router.get('/users',(req,res)=>{
	/*
	 * 分页分析
	 * 前提条件：需知道获取第几页,前端发送参数请求 page
	 * 约定：每一页显示多少数据 约定每一页显示两条数据 limit=2

	 * 第一页显示第1,2条  跳过前面0条  skip(0) 取两条 limit(2)
	 * 第二页显示第3,4条  跳过前面两条 skip(2) 取两条 limit(2)
	 * 第三页显示第5,6条  跳过前面四条 skip(4) 取两条 limit(2)

	 第page页,跳过(page-1)*limit条

	*/
	let page = req.query.page;
	
	const options = {
		page:page,
		method:UserModel,
		query:{},
		sort:{_id:-1}
	}
	Category(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			user:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})
	})
	.catch(err=>{
		console.log(err);
	})
	/*
	const limit = 2;
	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}
	//左按钮上一页边界控制
	if(page == 0){
		page = 1;
	}
	
	UserModel.countDocuments((err,count)=>{
		//计算总页数
		const pages = Math.ceil(count/limit);
		//右按钮下一页边界控制
		if(page > pages){
			page = pages;
		}
		//生成页码数组
		const list = [];
		for(let i = 1;i<=pages;i++){
			list.push(i);
		}
		const skip = (page-1)*limit;

		UserModel.find().sort({_id:-1})
		.skip(skip)
		.limit(limit)
		.then(user=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				user:user,
				page:page,
				list:list
			})
		})
		.catch(err=>{
			console.log(err);
		})
	})
	*/
})
module.exports = router;
