//1.购物车部分
/*focusCart();
function focusCart(){
	var oCart = document.getElementById('cart');
	var oCartMenu = document.getElementById('cartMenu');
	var oLoad = document.querySelector('#cartMenu .loading');
	var oCartMsg = document.querySelector('#cartMenu .cart-msg');
	var oProductMsg = document.querySelector('.header-product .product-msg');

	oCart.onmouseenter = function(){
		oLoad.style.display = "block";
		iChange(oCartMenu,{height:100},false,function(){
			oLoad.style.display = "none";
			oCartMsg.style.display = "block";
		});
	}
	oCart.onmouseleave = function(){
		iChange(oCartMenu,{height:0},false,function(){
			oLoad.style.display = "none";
			oCartMsg.style.display = "none";
		});
	}
}*/


//导航栏部分
/*
function focusProduct(){

	var oHeadList = document.querySelectorAll('.header-nav .header-nav-item');
	var oHeadProduct = document.querySelector('.header .header-product');
	var oProductMsg = document.querySelector('.header-product .product-msg');
	var timer = null;

	//循环遍历每一个Li
	for(var i = 0;i<oHeadList.length-2;i++){
		oHeadList[i].index = i;
		oHeadList[i].onmouseenter = function(){
			clearTimeout(timer);
			oHeadProduct.style.borderTop = "1px solid #ccc";
			iChange(oHeadProduct,{height:200},false);

			//加载数据
			loadDate(this.index);
		}
		oHeadList[i].onmouseleave = function(){
			timer = setTimeout(function(){
				iChange(oHeadProduct,{height:0},false);
				oHeadProduct.style.borderTop = "";
			},500);
		}

	}

	//鼠标移入导航下拉列表显示内容
	oHeadProduct.onmouseenter = function(){
		clearTimeout(timer);
	}
	//鼠标移入导航下拉列表隐藏内容
	oHeadProduct.onmouseleave = function(){
		timer = setTimeout(function(){
			iChange(oHeadProduct,{height:0},false);
			oHeadProduct.style.borderTop = "";
		},500);
	}

	//加载数据
	function loadDate(index){
		var data = oProductNav[index];
		var lastData = data[data.length-1];

		var html = "";
			html += '<ul>';
			for(var i = 0;i<data.length;i++){
				html +=		'<li class="msg-children">';
				html +=			'<a href="'+data[i].url+'">';
				html +=				'<div class="img-box">';
				html +=					'<img src="'+data[i].src+'" alt="">';
				html +=					'<p class="img-msg">'+data[i].msg+'+</p>';
				html +=					'<p class="img-price">'+data[i].price+'元</p>';
				if(data[i].introduce){
					html +=					'<span class="img-introduce">'+data[i].introduce+'</span>';
				}
				html +=				'</div>';
				html +=			'</a>';
				html +=		'</li>';
			}
			html +=	'</ul>';

		oProductMsg.innerHTML = html;
	}
}
focusProduct();
*/

//轮播图
showCurrent();
function showCurrent(){
	new Current({
		id : "coursel",
		width : 1228,
		height : 460,
		img : ["images/b1.jpg","images/b2.jpg","images/b3.jpg"],
		playtime : 1500
	});
}

//隐藏面板
showBox();
function showBox(){
	var oCartBox = document.querySelector('.home .cate-product');
	var oCartList = document.querySelectorAll('.cate .cate-list-item');
	var oCartNav = document.querySelector('.home .cate-box');
	//循环遍历
	for(var i = 0;i<oCartList.length;i++){
		oCartList[i].index = i;
		oCartList[i].onmouseenter = function(){
			oCartBox.style.display = "block";
			loadData(this.index)
		}
		
		
	}
	oCartNav.onmouseleave = function(){
			oCartBox.style.display = "none";
		}

	function loadData(index){
		var dato = oCartProduct[index];
		// console.log(dato)
		var html = '';

		html += '<ul>';
		for(var i = 0;i<dato.length;i++){
			html +=		'<li class="'+dato[i].class+'">';
			html +=			'<a href="'+dato[i].url+'">';
			html +=				'<img src="'+dato[i].src+'" alt="">';
			html +=				'<p class="cate-msg">'+dato[i].msg+'</p>';
			html +=			'</a>';
			html +=		'</li>';
		}
		html += '</ul>';

		oCartBox.innerHTML = html;
	}

}

//倒计时
function showTime(){
	function toStr(num){
		return num < 10 ? '0'+num : ''+num;
	}
	var oTimerBox = document.querySelectorAll('.timer-box .timer-num');
	var oldDate = new Date('2019-6-6 22:00:00');
	var time = null;
	var o = oldDate.getTime();

	var l = (o - Date.now()) / 1000;
	if(l <= 0){
		l = 0;
		clearInterval(time);
	}
	var iHours = parseInt(l/3600);
	var iMinute = parseInt(l%3600/60);
	var iSecond = parseInt(l%3600%60);
	oTimerBox[0].innerHTML = toStr(iHours);
	oTimerBox[1].innerHTML = toStr(iMinute);
	oTimerBox[2].innerHTML = toStr(iSecond);

	time = setInterval(showTime,1000);
}
showTime();

//处理滑动列表

handMove();
function handMove(){
	var oLeftBtn = document.querySelector('.flash .flash-ctr-left');
	var oRightBtn = document.querySelector('.flash .flash-ctr-right');
	var oMoveBox = document.querySelector('.col2 .product-list');

	oRightBtn.onclick = function(){
		oMoveBox.style.marginLeft = "-980px";
	}
	oLeftBtn.onclick = function(){
		oMoveBox.style.marginLeft = "0";
	}
}



//产品区域
changeBox();
function changeBox(){
	var aTabItem = document.querySelectorAll('.more .tab-item');
	var oBoxItem = document.querySelector('.elec .col2-item');
	loadBox(0);
	for(var i = 0;i<aTabItem.length;i++){
		aTabItem[i].index = i;
		aTabItem[i].onmouseenter = function(){
			for(var j = 0;j<aTabItem.length;j++){
				aTabItem[j].className = 'tab-item';
			}
			this.className = 'tab-item tab-item-active';

			loadBox(this.index);
		}
	}
	//动态加载数据
	function loadBox(index){
		var date = oTabBox[index];
		var html = '';
		for(var i = 0;i<date.length-1;i++){
			html += '<li class="product-item product-item-m">';
			html += 	'<a href="'+date[i].url+'">';
			html += 		'<img src="'+date[i].src+'" alt="">';
			html += 		'<p class="product-item-name">'+date[i].name+'</p>';
			html +=			'<p class="product-item-des">'+date[i].des+'</p>';
			html += 		'<p class="product-item-price">';
			html += 		'<strong>'+date[i].price+'元</strong>';
			html += 		'<del>'+date[i].del+'9元</del>';
			html += 		'</p>';		
			html +=		'</a>';
			if(date[i].falg){
				html +=		'<span class="flag '+date[i].falg.class+'">'+date[i].falg.name+'</span>';
			}
			if(date[i].view){
				html +=		'<div class="'+date[i].view.class+'">';
				html +=			'<p class="commen">'+date[i].view.commen+'</p>';
				html += 		'<p class="author">'+date[i].view.author+'</p>';
				html += 	'</div>';
			}
			html +=	'</li>';
		}
		
		var lastDate = date[date.length-1];
		html += '<li class="product-area">'
		html += 	'<div class="'+lastDate.areatop.class+'">'
		html += 		'<p class=" product-area-top-des">'+lastDate.areatop.name+'</p>'
		html += 		'<strong>'+lastDate.areatop.st+'元</strong>'
		html += 		'<img src="'+lastDate.areatop.src+'" alt="">'
		html += 	'</div>'
		html += 	'<div class="'+lastDate.areabottom.class+'">'
		html += 		'<p class="product-area-bottom-name">'+lastDate.areabottom.name+'</p>'
		html += 		'<p class="product-area-bottom-hot">'
		html += 		''+lastDate.areabottom.hot+''
		html += 		'</p>'
		html += 		'<i class="iconfont">&#xe615;</i>'
		html += 	'</div>'
		html += '</li>'		
		
		oBoxItem.innerHTML = html;
	}
}
