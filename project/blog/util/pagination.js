/*
	page : 当前页
	model : 要处理的模型
	query : 查找条件
	sort : 排序
*/
async function pagination(options){
	let { page,method,query,sort } = options;
	const limit = 2;
	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}
	//左按钮上一页边界控制
	if(page == 0){
		page = 1;
	}
	const count = await method.countDocuments();
	//计算总页数
	const pages = Math.ceil(count/limit);
	//右按钮下一页边界控制
	if(page > pages){
		page = pages;
	}
	if(page == 0){
		page = 1;
	}
	//生成页码数组
	const list = [];
	for(let i = 1;i<=pages;i++){
		list.push(i);
	}
	const skip = (page-1)*limit;

	const docs = await method.find(query).sort(sort).skip(skip).limit(limit);
	return {
		docs:docs,
		page:page,
		list:list,
		pages:pages
	}
}

module.exports = pagination;