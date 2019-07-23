(function($){
	function Dropdown($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = this.$elem.find('.dropdown-layer');
		this.activeClass = this.$elem.data('active')+'-active';
		//2.初始化
		this.init();
		//3.定时器
		this.timer = null;
	}
	Dropdown.prototype = {
		constructor : Dropdown,
		//初始化
		init:function(){
			//1.初始化显示隐藏插件
			this.$layer.showHide(this.options);
			//2.初始化监听显示隐藏自定义事件
			this.$layer.on('show shown hide hiden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this))
			//3.鼠标移入移出时显示隐藏下拉层
			// this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			//4.判断事件类型
			if(this.options.evName == 'click'){
				this.$elem.on('click',function(ev){
					this.show();
					ev.stopPropagation();
				}.bind(this))
				//鼠标点击其他地方下拉层消失
				$(document).on('click',function(){
					this.hide();
				}.bind(this))
			}else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}
		},
		//显示下拉层
		show:function(){
			//处理鼠标快速划入滑出优化下拉层
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$layer.showHide('show');
					//添加class为下拉层添加css样式
					this.$elem.addClass(this.activeClass);
				}.bind(this),this.options.delay)
			}else{
				this.$layer.showHide('show');
				//添加class为下拉层添加css样式
				this.$elem.addClass(this.activeClass);
			}
		},
		//隐藏下拉层
		hide:function(){
			//清除定时器
			clearTimeout(this.timer);
			this.$layer.showHide('hide');
			//移走时删除下拉层class
			this.$elem.removeClass(this.activeClass);
		}
	}
	//当不传参时默认配置信息
	Dropdown.DEFAULTS = {
		js : true,
		mode:'fade',
		// evName:'click',
		delay:300
	}	
	//将对象方法暴露出去
	$.fn.extend({
		dropdown:function(options){
			//遍历元素，方法共享
			this.each(function(){//实现单例模式
				var $elem = $(this);
				//单例模式判断是否有存储数据
				var dropdown = $elem.data('dropdown');
				if(!dropdown){
					//确认传入属性值
					options = $.extend({},Dropdown.DEFAULTS,options);
					//构造实例，访问原型对象上的方法
					dropdown = new Dropdown($elem,options);
					//存储数据
					$elem.data('dropdown',dropdown);
				}
				//第二次调用创建实例对象上面的方法
				if(typeof dropdown[options] == 'function'){
					dropdown[options]();
				}
			})
		}
	})
})(jQuery)