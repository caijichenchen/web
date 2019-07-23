(function($){
	/*共通函数开始*/
	//判断地址信息,是否加载html函数
	function loadHTML($elem,callback){
		var url = $elem.data('load');
		//没有地址则无需加载数据
		if(!url) return;
		//只加载一次数据
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);
			})
		}
	}
	/*共通函数结束*/

	/*顶部逻辑开始*/
	var $dropdown = $('.top .dropdown');
	$dropdown.dropdown({
		js:true,
		mode:'slide'
	});
	//加载下拉层
	function buildTop($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
		}
		setTimeout(function(){
			$layer.html(html);
			$elem.data('isLoaded',true);
		},1000)
	}
	//懒加载(自定义事件)
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHTML($(this),buildTop)
		}
	})
	/*顶部逻辑结束*/

	/*搜素逻辑开始*/
	var $search = $('.search');
	$search.on('getData',function(ev,data){
		var $elem = $(this);
		var $layer = $elem.find('.search-layer');
		//1.加载html
		//拿到有效数据
		var data = data.result;
		var html = loadSearchLayer(data,8);
		//2.将数据内容插入下拉层
		$elem.search('appendHTML',html);
		//3.显示下拉层
		if(html == ''){
			$elem.search('hideLayer');
		}else{
			$elem.search('showLayer');
		}
	})
	$search.on('getNoData',function(ev){
		$elem.search('appendHTML','');
		$elem.search('hideLayer');
	})
	//加载搜索下拉层函数
	function loadSearchLayer(data,max){
		var html = '';
		for(var i = 0;i<data.length;i++){
			if(i >= max) break;
			html += '<li class="search-item">'+data[i][0]+'</li>'
		}
		return html;
	}
	$search.search({});
	/*搜素逻辑结束*/

	/*分类列表逻辑开始*/
	//分类列表左拉层html加载
	function loadLeft($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<dl class="category-details">';
			html +=	'	<dt class="category-details-title fl">';
			html +=	'		<a href="#" class="category-details-title-link">'+data[i].title+'</a>';
			html +=	'	</dt>';
			html +=	'	<dd class="category-details-item fl">';
			for(var j = 0;j<data[i].items.length;j++){
				html +=	'		<a href="#" class="link">'+data[i].items[j]+'</a>';
			}
			html +=	'	</dd>';
			html +=	'</dl>';
		}
		//将HTML插入到下拉层中
		//模拟网络延迟
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}
	var $categoryDropdown = $('.focus .dropdown');
	$categoryDropdown.dropdown({
		js:true,
		mode:'fade'
	});
	$categoryDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if(ev.type == 'dropdown-show'){
			loadHTML($(this),loadLeft)
		}
	})
	/*分类列表逻辑结束*/

	/*轮播图逻辑开始*/
	
	/*轮播图逻辑结束*/
})(jQuery)