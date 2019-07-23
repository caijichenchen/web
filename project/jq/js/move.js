;(function($){
	function init($elem){
		this.$elem = $elem;
		this.$elem.removeClass('transition');
		this.nowx = parseFloat(this.$elem.css('left'));
		this.nowy = parseFloat(this.$elem.css('top'));
	}
	function to(x,y,callback){
		x = (typeof x == 'number') ? x : this.nowx;
		y = (typeof y == 'number') ? y : this.nowy;
		if(this.nowx == x && this.nowy == y) return;
		// console.log("will move to...");
		this.$elem.trigger('move');
		typeof callback == 'function' && callback();
		this.nowx = x;
		this.nowy = y;
	}
	function Slide($elem){
		init.call(this,$elem);
	}
	Slide.prototype = {
		constructor : Slide,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem.css({
					left : x,
					top : y
				})
				this.$elem.trigger('moved');
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(y);
		}
	}

	function Js($elem){
		init.call(this,$elem);
	}
	Js.prototype = {
		constructor : Js,
		to:function(x,y){
			to.call(this,x,y,function(){
				this.$elem
				.stop()
				.animate({
					left:x,
					top:y
				},function(){
					this.$elem.trigger('moved');
				}.bind(this))	
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(y);
		}
	}

	//获取显示隐藏动画的方法
	function getmove($elem,options){
		if(options.js){
			var move = new Js($elem);
		}else{
			var move = new Slide($elem);
		}

		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
	}

	//当不传任何参数时的默认显示动画
	var DEFAULTS = {
		js:true
	}

	//封装showHide插件
	$.fn.extend({
		move:function(options,x,y){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!moveObj){
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj);
				}
				//第二次进入该函数则是调用显示隐藏的动画方法
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y)
				}
			})
		}
	})
})(jQuery)