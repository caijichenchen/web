(function($){
	//1.只加载一次Html
	function loadHTML($elem,callback){
		var url = $elem.data('load');
		if(!url) return;
		if(!$elem.data('isLoaded')){
			$.getJSON(url,function(data){
				typeof callback == 'function' && callback($elem,data);
			})
		}
	}
	//加载图片
	function loadImg(imgUrl,success,error){
		var newImage = new Image();
		newImage.onload = function(){
			typeof success == 'function' && success(imgUrl);
		}
		newImage.onerror = function(){
			typeof error == 'function' && error(imgUrl);
		}
		newImage.src = imgUrl;
	}
	//只加载一次数据
	function onceData($elem,url,callback){
		//判断是否有数据
		var data = $elem.data('data');
		if(!data){
			$.getJSON(url,function(resData){
				callback(resData);
				//存储数据，下次不用加载
				$elem.data('data',resData);
			})
		}else{
			callback(data);
		}
	}
	//顶部下拉层
	function bulidTop($elem,data){
		var $layer = $elem.find('.dropdown-layer');
		//生成Html
		var html = '';
		for(var i = 0;i<data.length;i++){
			html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
		}
		setTimeout(function(){
			$layer.html(html);
			//数据已经加载
			$elem.data('isLoaded',true);
		},1000);
	}
	/*顶部导航逻辑开始*/
	var $dropdown = $('.top .dropdown');
	$dropdown.dropdown({
		js:true,
		mode:'slide'
	});
	//加载数据
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		/*
		if(ev.type == 'dropdown-show'){
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			//如果没有地址则无需加载数据
			if(!url) return;
			//判断数据如果没有被加载则发送请求
			if(!$elem.data('isLoaded')){
				$.getJSON(url,function(data){
					console.log(data);
					//生成HTML
					var html = '';
					for(var i = 0;i<data.length;i++){
						html += '<li><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
					}
					//将HTML插入到下拉层中
					//模拟网络延迟
					setTimeout(function(){
						$layer.html(html);
						//数据已经加载
						$elem.data('isLoaded',true);
					},1000);
				})
			}
		}
		*/
		if(ev.type == 'dropdown-show'){
			loadHTML($(this),bulidTop);
		}
	});

	/*暴露方法测试*/
	/*
	$('button').on('click',function(){
		$dropdown.dropdown('show');
	})
	*/
	/*顶部导航逻辑结束*/

	/*头部搜索区域开始*/
	var $search = $('.search');
	//成功获取并处理数据
	$search.on('getData',function(ev,data){
		var $elem = $(this);
		var $layer = $elem.find('.search-layer');
		//1.生成html结构
		var data = data.result;
		var html = createSearchLayer(data,10);
		//2.将内容插入到搜索下拉层中
		$elem.search('appendHTML',html);
		//3.显示下拉层
		if(html == ''){
			$elem.search('hideLayer');
		}else{
			$elem.search('showLayer');
		}
	})
	//获取数据失败处理
	$search.on('getNoData',function(ev){
		$elem.search('appendHTML','');
		$elem.search('hideLayer');
	});

	$search.search({});
	//生成搜索下拉列表html结构并且可以控制数据条目
	function createSearchLayer(data,max){
		var html = '';
		for(var i = 0 ;i<data.length;i++){
			if(i >= max) break;
			html += '<li class="search-item">'+data[i][0]+'</li>'
		}
		return html;
	}
	/*头部搜索区域结束*/

	/*分类列表逻辑开始*/
	var $categoryDropdown = $('.focus .dropdown');
	$categoryDropdown.dropdown({
		js:true,
		mode:'fade'
	});
	//信息左拉层
	function bulidLeft($elem,data){
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
	//加载数据
	$categoryDropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		/*
		if(ev.type == 'dropdown-show'){
			var $elem = $(this);
			var $layer = $elem.find('.dropdown-layer');
			var url = $elem.data('load');
			//如果没有地址则无需加载数据
			if(!url) return;
			//判断数据如果没有被加载则发送请求
			if(!$elem.data('isLoaded')){
				$.getJSON(url,function(data){
					// console.log(data);
					//生成HTML
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
				})
			}
		}
		*/
		
		if(ev.type == 'dropdown-show'){
			loadHTML($(this),bulidLeft);
		}
		
	});
	/*分类列表逻辑结束*/

	/*轮播图逻辑开始*/
	//轮播图共通
	function loadCoursel(options){
		var item = {};
		var lengthNum = 0;
		var loadFn = null;
		var allLength = options.allLength;
		var $elem = options.$elem;
		var evName = options.evName;
		var evPrefix = options.evPrefix;
		$elem.on(evName,loadFn = function(ev,index,elem,success){
			if(!item[index]){
				$elem.trigger('load',[index,elem,function(){
					success();
				}]);
				item[index] = 'isLoaded';
				lengthNum++;
				if(lengthNum > allLength){
					// console.log($elem);
					$elem.trigger('willLoad-stopLoad');
				}
			}
			$elem.on('willLoad-stopLoad',function(ev){
				$elem.off('willLoad-show',loadFn);
			})
		})
	}
	var $coursel = $('.carousel .carousel-wrap');
	loadCoursel({
		allLength : $coursel.find('.carousel-img').length-1,
		$elem : $coursel,
		evName : 'willLoad-show',
		evPrefix : 'willLoad'
	})
	$coursel.on('load',function(ev,index,elem,success){
		//1.执行加载
		// $elem.trigger('load',[index,elem]);
		var $elem = $(elem);
		// console.log($elem);
		var $imgs = $elem.find('.carousel-img');
		// console.log($imgs);
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			// console.log(imgUrl);
			loadImg(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','image/images/focus-carousel/placeholder.png');
			});
		})
	})
	/*
	function loadCoursel($elem){
		var item = {};
		var lengthNum = 0;
		var allLength = $elem.find('.carousel-img').length-1;
		var loadFn = null;
		$elem.on('willLoad-show',loadFn = function(ev,index,elem){
			// console.log(index,elem);
			if(!item[index]){
				//实现代码分离
				//1.执行加载
				// $elem.trigger('load',[index,elem]);
				var $elem = $(elem);
				// console.log($elem);
				var $imgs = $elem.find('.carousel-img');
				// console.log($imgs);
				$imgs.each(function(){
					var $img = $(this);
					var imgUrl = $img.data('src');
					// console.log(imgUrl);
					loadImg(imgUrl,function(){
						$img.attr('src',imgUrl);
					},function(){
						$img.attr('src','image/images/focus-carousel/placeholder.png');
					});
					item[index] = 'isLoaded';
					lengthNum++;
				})
				if(lengthNum > allLength){
					// console.log($elem);
					$elem.trigger('will-stopLoad');
				}
			}
			$elem.on('will-stopLoad',function(ev){
				$elem.off('willLoad-show',loadFn);
			})
		})
	}
	*/
	var $coursel = $('.carousel .carousel-wrap');
	// loadCoursel($coursel);
	// var item = {};
	// var lengthNum = 0;
	// var allLength = $coursel.find('.carousel-img').length-1;
	// var loadFn = null;
	// $coursel.on('willLoad-show',loadFn = function(ev,index,elem){
	// 	// console.log(index,elem);
	// 	if(!item[index]){
	// 		//实现代码分离
	// 		//1.执行加载
	// 		$coursel.trigger('load',[index,elem]);
			
	// 		var $elem = $(elem);
	// 		// console.log($elem);
	// 		var $img = $elem.find('.carousel-img');
	// 		var imgUrl = $img.data('src');
	// 		loadImg(imgUrl,function(){
	// 			$img.attr('src',imgUrl);
	// 		},function(){
	// 			$img.attr('src','image/images/focus-carousel/placeholder.png');
	// 		});
	// 		item[index] = 'isLoaded';
	// 		lengthNum++;
	// 		if(lengthNum > allLength){
	// 			$elem.off('willLoad-show',loadFn);
	// 		}
	// 	}
	// })


	/*$coursel.on('load',function(ev,index,elem){
		var $elem = $(elem);
			// console.log($elem);
			var $img = $elem.find('.carousel-img');
			var imgUrl = $img.data('src');
			loadImg(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','image/images/focus-carousel/placeholder.png');
			});
			item[index] = 'isLoaded';
			lengthNum++;
			if(lengthNum > allLength){
				//移除事件
				// $elem.off('willLoad-show',loadFn);
				$coursel.trigger('off');
			}
	})

	$coursel.on('off',function(ev){
		$coursel.off('willLoad-show',loadFn);
	})
	*/
	$coursel.coursel({});
	/*轮播图逻辑结束*/

	/*今日热销逻辑开始*/
	var $todaysCoursel = $('.todays .carousel-wrap');
	// loadCoursel($todaysCoursel);
	loadCoursel({
		allLength : $todaysCoursel.find('.carousel-img').length-1,
		$elem : $todaysCoursel,
		evName : 'willLoad-show',
		evPrefix : 'willLoad'
	})
	$todaysCoursel.on('load',function(ev,index,elem,success){
		//1.执行加载
		// $elem.trigger('load',[index,elem]);
		var $elem = $(elem);
		// console.log($elem);
		var $imgs = $elem.find('.carousel-img');
		// console.log($imgs);
		$imgs.each(function(){
			var $img = $(this);
			var imgUrl = $img.data('src');
			// console.log(imgUrl);
			loadImg(imgUrl,function(){
				$img.attr('src',imgUrl);
			},function(){
				$img.attr('src','image/images/focus-carousel/placeholder.png');
			});
		})
	})
	/*
	var todayItem = {};
	var todaylengthNum = 0;
	var todayallLength = $todaysCoursel.find('.carousel-img').length-1;
	var todayloadFn = null;
	$todaysCoursel.on('willLoad-show',todayloadFn = function(ev,index,elem){
		if(!todayItem[index]){
			var $elem = $(elem);
			var $imgs = $elem.find('.carousel-img');
			// console.log($imgs);
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				// console.log(imgUrl);
				loadImg(imgUrl,function(){
					$img.attr('src',imgUrl);
				},function(){
					$img.attr('src','image/images/focus-carousel/placeholder.png');
				});
			})
			todayItem[index] = 'isLoaded';
			todaylengthNum++;
			if(todaylengthNum > todayallLength){
				$elem.off('willLoad-show',todayloadFn);
			}
		}

	})
	*/
	$todaysCoursel.coursel({});
	/*今日热销逻辑结束*/

	/*楼层逻辑开始*/
	//楼层图片懒加载
	function floorLoadImg($elem){
		var item = {};
		var lengthNum = 0;
		var allLength = $elem.find('.floor-img').length-1;
		var loadFn = null;
		$elem.on('will-show',loadFn = function(ev,index,elem){
			// console.log(lengthNum,allLength);
			if(!item[index]){
				//实现代码分离
				//1.执行加载
				// $elem.trigger('load',[index,elem]);
				var $elem = $(elem);
				var $imgs = $elem.find('.floor-img');
				$imgs.each(function(){
					var $img = $(this);
					var imgUrl = $img.data('src');
					loadImg(imgUrl,function(){
						$img.attr('src',imgUrl);
					},function(){
						$img.attr('src','image/images/focus-carousel/placeholder.png');
					});

				})
				//给所有加载过的页面标记
				item[index] = 'isLoaded';
				//记录下所有加载过页面，更新总数
				lengthNum++;
				//所有页面加载完毕，移除懒加载事件
				if(lengthNum > allLength){
					// console.log(11);
					$elem.off('will-show',loadFn);
				}
			}

		})
	}
	var $floor = $('.floor');
	var $doc = $(document);
	var $win = $(window);

	/*
	$floor.on('will-show',function(ev,index,elem){
		console.log(11);
		console.log(index,elem);
	})
	*/

	//楼层是否加载条件
	function isFloorShow($elem){
		// return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop());
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($elem.offset().top + $elem.height() > $win.scrollTop());
	}
	//判断楼层是否被加载
	function isToShow(){
		//遍历楼层，判断楼层是否加载
		$floor.each(function(index,elem){
			// floorLoadImg($(this));
			if(isFloorShow($(elem))){
				//当确认当前楼层需要被加载，自定义事件，开始执行加载
				$doc.trigger('floor-show',[index,elem]);
			}
		})
	}
	//滚轮滑动，窗口大小变化，页面加载判断是否执行楼层懒加载
	$win.on('load scroll resize',function(){
		//空间防抖，防止不停获取数据
		clearTimeout($floor.Timer);
		$floor.Timer = setTimeout(isToShow,200);
	})
	//楼层html懒加载
	buildHtml();
	function buildHtml($elem){
		var item = {};//0:loaded 1:loaded
		var lengthNum = $floor.length - 1;
		var allLength = 0;
		var loadFn = null;
		//1.开始加载
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			//判断图片有没有被加载
			if(!item[index]){
				$doc.trigger('floor-load',[index,elem]);
			}
		})
		//2.执行加载
		$doc.on('floor-load',function(ev,index,elem){
			//1.生成html结构
			onceData($doc,'data/floorData.json',function(data){
				// console.log(data);
				var html = buildHTML(data[index]);
				// console.log(html);
				//2.加载html
				$(elem).html(html);
				//3.楼层图片懒加载
				floorLoadImg($(elem));
				//4.激活选项卡
				$(elem).tab({});
			})
			//楼层已经被加载
			item[index] = 'isLoaded';
			allLength++;
			//所有图片都被加载则移除事件
			if(allLength > lengthNum){
				$doc.trigger('floor-loaded');
			}
		})
		//3.加载完毕
		$doc.on('floor-loaded',function(){
			$doc.off('floor-show',loadFn);
		})
	}
	//楼层html懒加载
	function buildHTML(floorData){
		var html = '';
		 html += '<div class="container">';
		 html += buildHeadHtml(floorData);
		 html += buildBodyHtml(floorData);
		 html += '</div>';
		return html;
	}
	function buildHeadHtml(floorData){
		var html = '';
		html += '<div class="floor-hd">';
		html += '		<h2 class="floor-title fl">';
		html += '			<span class="floor-title-num">'+floorData.num+'F</span>';
		html += '			<span class="floor-title-text">'+floorData.text+'</span>';
		html += '		</h2>';
		html += '	<ul class="tab-item-wrap fr">';
		for(var i = 0;i<floorData.tabs.length;i++){
			html += '			<li class="fl">';
			html += '				<a class="tab-item" href="javascript:;">'+floorData.tabs[i]+'</a>';
			html += '			</li>';
			if(i != floorData.tabs.length-1){
				html += '			<li class="fl tab-divider"></li>';
			}
		}
		html += '	</ul>';
		html += '</div>';
		return html;
	}
	function buildBodyHtml(floorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0;i<floorData.items.length;i++){
			html += '<ul class="tab-panel clearfix">';
			for(var j = 0;j<floorData.items[i].length;j++){
				html += '<li class="floor-item fl">';
				html += '	<p class="floor-item-pic">';
				html += '		<a href="#">';
				html += '			<img class="floor-img" src='+'image/images/floor/loading.gif'+' data-src="image/images/floor/'+floorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
				html += '		</a>';
				html += '	</p>';
				html += '	<p class="floor-item-name">';
				html += '					<a class="link" href="#">'+floorData.items[i][j].name+'</a>';
				html += '	</p>';
				html += '	<p class="floor-item-price">￥'+floorData.items[i][j].price+' </p>';
				html += '</li>';
			}
			html += '</ul>';
		}
		html += '</div>';
		return html;
	}
	
	// $floor.tab({});
	/*楼层逻辑结束*/
	/*电梯逻辑开始*/
	var $elevator = $('.elevator');
	var $elevatorItems = $elevator.find('.elevator-item');
	//判断显示楼层号
	function getFloor(){
		var num = -1;
		//遍历楼层
		$floor.each(function(index,elem){
			//当前楼层号
			num = index;
			if($(elem).offset().top > $win.height()/2 + $win.scrollTop()){
				//显示楼层的上一层
				num = index-1;
				//当拿到楼层号不再遍历楼层
				return false;
			}
		})
		return num;
	}
	function showElevator(){
		var num = getFloor();
		// console.log(num);.
		if(num == -1){
			$elevator.fadeOut();
		}else{
			$elevator.fadeIn();
			//清除所有
			$elevatorItems.removeClass('elevator-active');
			$elevatorItems.eq(num).addClass('elevator-active');
		}
	}
	$win.on('load scroll resize',function(){
		//空间防抖，防止不停获取数据
		clearTimeout($elevator.Timer);
		$elevator.Timer = setTimeout(showElevator,200);
	})
	$elevator.on('click','.elevator-item',function(){
		var index = $elevatorItems.index(this);
		$('html,body').animate({
			scrollTop:$floor.eq(index).offset().top
		})
	})
	/*电梯逻辑结束*/

	/*工具栏逻辑开始*/
	var $backTop = $('#backToTop');
	$backTop.on('click',function(){
		$('html,body').animate({
			scrollTop:0
		})
	})
	/*工具栏逻辑结束*/
})(jQuery);