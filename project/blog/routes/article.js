//查找页面
const express = require('express');
const multer = require('multer');
const upload = multer({dest:'public/uploads/'});
const UserModel = require('../models/user.js');
const ArticleMdoel = require('../models/article.js');
const CategoryMdoel = require('../models/category.js');
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

//显示文章管理首页
router.get('/',(req,res)=>{
	// res.send('hah');
	// res.render('admin/category_list',{
	// 	userInfo:req.userInfo
	// });
	let page = req.query.page;
	const options = {
		page:page,
		method:ArticleMdoel,
		query:{},
		sort:{order:-1}
	}
	Category(options)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/article"
		})
	})
	.catch(err=>{
		console.log(err);
	})
})
//显示添加文章页面信息
router.get('/add',(req,res)=>{
	CategoryMdoel.find({},"name")
    .sort({order:-1})
    .then(categories=>{
    	res.render("admin/article_add",{
			userInfo:req.userInfo,
			categories
		})
    })
})
//处理添加文章
router.post('/add',(req,res)=>{
	const { title,category,intro,content } = req.body
    
    ArticleMdoel.insertMany({
        title,
        category,
        intro,
        content,
        user:req.userInfo._id
    })
    .then(articles=>{
        res.render("admin/success",{
            message:"新增文章成功",
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/article'
        })
    })
})
//编辑分类页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	console.log("id1",id);
	ArticleMdoel.findById(id)
	.then(category=>{
		res.render("admin/category_edit",{
			userInfo:req.userInfo,
			category:category
		})
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"操作失败"
		})
	})
})
//处理编辑
router.post('/edit',(req,res)=>{
	let { name,order,id } = req.body;
	if(!order){
		order = 0;
	}
	ArticleMdoel.findById(id)
	.then(category=>{
		if(category.name == name && category.order == order){
			res.render("admin/err",{
				message:"请更新后再提交"
			})
		}else{
			ArticleMdoel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if(category){
					res.render("admin/err",{
						message:"分类已经存在"
					})
				}else{
					ArticleMdoel.updateOne({_id:id},{name,order})
					.then(result=>{
						res.render("admin/success",{
							message:"更改分类成功"
						})
					})
					.catch(err=>{
						console.log(err);
					})
				}
			})
			.catch(err=>{
				console.log(err);
			})
		}
	})
})
//删除分类
router.get('/del/:id',(req,res)=>{
	const { id } = req.params;
	console.log("id2",id);
	ArticleMdoel.deleteOne({_id:id})
	.then(result=>{
		res.render("admin/success",{
			message:"删除分类成功",
			url:'/category'
		})
	})
	.catch(err=>{
		res.render("admin/err",{
			message:"删除分类失败"
		})
	})
})
//文章上传接口
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadedFilePath = '/uploads/'+req.file.filename;
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})
module.exports = router;
