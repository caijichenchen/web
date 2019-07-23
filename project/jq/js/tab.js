(function($){

function Tab($elem,options){
	//1.罗列属性
	this.$elem = $elem;
	this.options = options;
	this.$tabItems = this.$elem.find('.tab-item');
	this.$tabPanels = this.$elem.find(".tab-panel");

	this.itemsLength = this.$tabItems.length;

	this.now = this._getIndex(this.options.activeIndex);

	this.timer = null;
	//2.初始化
	this.init();
}
Tab.prototype = {
	constructor:Tab,
	init:function(){
		//1.默认显示第一张
		this.$tabItems.eq(this.now).addClass('tab-item-active');
		this.$tabPanels.eq(this.now).show();
		//2.初始化
		this.$tabPanels.showHide(this.options);
		//3.判断事件类型
		var evType = '';
		if(this.options.evName == 'click'){
			evType = 'click';
		}else{
			evType = 'mouseenter';
		}
		var _this = this;
		this.$elem.on(evType,'.tab-item',function(){
			//获取当前点击的下标值
			var nowIndex = _this.$tabItems.index(this);
			_this._toggle(nowIndex);
		})
		//4.自动轮播
		if(this.options.playtime){
			this.autoplay();
			this.$elem.hover($.proxy(this.stop,this),$.proxy(this.autoplay,this));
		}
		//5.懒加载
		//默认第一张显示
		this.$elem.trigger('will-show',[this.now,this.$tabPanels.eq(this.now)]);
		this.$tabPanels.on('show',function(ev){
			_this.$elem.trigger('will-show',[_this.$tabPanels.index(this),this]);
		})
	},
	_toggle:function(index){
		//1.隐藏当前的
		this.$tabItems.eq(this.now).removeClass('tab-item-active');
		this.$tabPanels.eq(this.now).showHide('hide');
		//2.显示将要显示的
		this.$tabItems.eq(index).addClass('tab-item-active');
		this.$tabPanels.eq(index).showHide('show');
		//3.更新索引值
		this.now = index;
	},
	_fade:function(index){
		
	},
	_getIndex:function(num){
		if(num >= this.itemsLength) return 0;
		if(num < 0) return this.itemsLength-1;
		return num;
	},
	autoplay:function(){
		clearInterval(this.timer);
			this.timer = setInterval(function(){
				this._toggle(this._getIndex(this.now+1));
			}.bind(this),this.options.playtime)
		},
	stop:function(){
		clearInterval(this.timer);
	}
}

//当不传参数时的默认配置信息
Tab.DEFAULTS = {
	activeIndex:0,
	js:false,
	mode:'fade',
	evName:'click',
	// playtime:1000
}

//封装Coursel插件
$.fn.extend({
	/*
	tab:function(options){
		//1.实现隐式迭代
		this.each(function(){//实现单例模式
			var $elem = $(this);
			var tab = $elem.data('tab');
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				//将实例信息存储在当前dom节点上
				$elem.data('tab',tab);
			}
			//第二次调用tab则是调用实例上的方法
			if(typeof tab[options] == 'function'){
				tab[options]();
			}
		})
	}
	*/tab:function(options){
		//遍历元素，实现隐式迭代
		this.each(function(){
			//实现单例模式
			var $elem = $(this);
			var tab = $elem.data('tab');
			if(!tab){
				options = $.extend({},Tab.DEFAULTS,options);
				tab = new Tab($elem,options);
				$elem.data('tab',tab);
			}
			if(typeof tab[options] == 'function'){
				tab[options]();
			}
		})
	}
})


})(jQuery);