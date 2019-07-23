(function($){

function Coursel($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$carouselItems = this.$elem.find('.carousel-item');
	this.$carouselBtns = this.$elem.find('.btn-item');
	this.$carouselControls = this.$elem.find('.control');

	this.itemsLength = this.$carouselItems.length;

	this.now = this._getIndex(this.options.activeIndex);

	this.timer = null;
	//2.初始化
	this.init();
}
Coursel.prototype = {
	constructor:Coursel,
	init:function(){
		var _this = this;
		//懒加载图片默认显示第一张
		this.$elem.trigger('willLoad-show',[this.now,_this.$carouselItems.eq(this.now)])
		if(this.options.slide){//判断默认动画方式
			//1.默认显示第一张图片
			this.$elem.addClass('slide');
			this.$carouselItems.eq(this.now).css({left:0});
			this.itemsWidth = this.$carouselItems.eq(this.now).width();
			//初始化显示隐藏插件
			this.$carouselItems.move(this.options);
			//懒加载
			this.$carouselItems.on('move',function(ev){
				//获取当前的dom节点，使用动画
				var nowIndex = _this.$carouselItems.index(this);
				// console.log(nowIndex);
				if(_this.now != nowIndex){
					_this.$elem.trigger('willLoad-show',[nowIndex,this]);
				}
			});
			this._tab = this._toggle;
		}else{
			//1.默认显示第一张图片
			this.$carouselItems.hide();
			this.$carouselItems.eq(this.now).show();
			
			//初始化显示隐藏插件
			this.$carouselItems.showHide(this.options);

			this._tab = this._fade;
			//懒加载
			this.$carouselItems.on('show',function(ev){
				var nowIndex = _this.$carouselItems.index(this);
				if(_this.now != nowIndex){
					_this.$elem.trigger('willLoad-show',[nowIndex,this]);
				}
			});
		}
		//2.给底部按钮添加类名
		this.$carouselBtns.eq(this.now).addClass('active');
		//3.鼠标移入显示左右按钮
		this.$elem.hover(function(){
			this.$carouselControls.show();
		}.bind(this),function(){
			this.$carouselControls.hide();
		}.bind(this));
		//4.点击左右按钮切换图片
		this.$elem.on('click','.control-left',function(){
			this._tab(this._getIndex(this.now-1),-1);
		}.bind(this));
		this.$elem.on('click','.control-right',function(ev){
			this._tab(this._getIndex(this.now+1),1);
			ev.stopPropagation();
		}.bind(this));
		//5.自动轮播
		if(this.options.playtime){
			this.autoplay();
			this.$elem.hover($.proxy(this.stop,this),$.proxy(this.autoplay,this));
		}
		//6.点击底部按钮显示图片
		this.$carouselBtns.on('click',function(){
			var nowIndex = _this.$carouselBtns.index(this);
			_this._tab(nowIndex);
		});
	},
	_toggle:function(index,direction){
		//当点击当前所在图片时不再触发事件
		if(this.now == index) return;
		//底部按钮判断将要显示哪张图片
		if(index > this.now){
			direction = 1;
		}
		else if(index < this.now){
			direction = -1;
		}
		//将即将显示图片放在正确位置
		this.$carouselItems.eq(index).css({left:direction*this.itemsWidth});
		//1.隐藏当前图片
		this.$carouselItems.eq(this.now).move('x',-1*direction*this.itemsWidth);
		//2.显示将要显示的图片
		this.$carouselItems.eq(index).move('x',0);
		//3.底部按钮添加类名
		this.$carouselBtns.eq(this.now).removeClass('active');
		this.$carouselBtns.eq(index).addClass('active');
		//4.更新索引
		this.now = index;
	},
	_fade:function(index){
		//1.隐藏当前图片
		if(this.now == index) return;
		this.$carouselItems.eq(this.now).showHide('hide');
		//2.显示将要显示的图片
		this.$carouselItems.eq(index).showHide('show');
		//3.底部按钮添加类名
		this.$carouselBtns.eq(this.now).removeClass('active');
		this.$carouselBtns.eq(index).addClass('active');
		//4.更新索引
		this.now = index;
	},
	_getIndex:function(num){
		if(num >= this.itemsLength) return 0;
		if(num < 0) return this.itemsLength-1;
		return num;
	},
	autoplay:function(){
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			this.$carouselControls.eq(1).trigger('click');
		}.bind(this),this.options.playtime)
	},
	stop:function(){
		clearInterval(this.timer);
	}
}

//当不传参数时的默认配置信息
Coursel.DEFAULTS = {
	slide:true,
	activeIndex:0,
	js:true,
	mode:'fade',
	playtime:0
}

//封装Coursel插件
$.fn.extend({
	coursel:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var coursel = $elem.data('coursel');
			if(!coursel){
				options = $.extend({},Coursel.DEFAULTS,options);
				coursel = new Coursel($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('coursel',coursel);
			}
			//第二次调用coursel则是调用实例上的方法
			if(typeof coursel[options] == 'function'){
				coursel[options]();
			}
		})
	}
})


})(jQuery);