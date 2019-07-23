(function($){
	//数据缓存
	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key]=val;
			this.count++;
		},
		getData:function(key){
			return this.data[key];
		}
	}
	function Search($elem,options){
		//1.罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');
		//2.初始化
		this.init();

		this.jqXHR = null;
		//判断html是否被加载
		this.isLoadedHtml = false;

		this.timer = null;
		if(this.options.autocomplete){
			this.autocomplete();
		}
	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			//1.监听提交按钮事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		//点击提交
		submit:function(){
			//如果获取数据为空则不提交
			if(!this.getInputVal()){
				return false;
			}
			//1.获取输入框值提交数据
			this.$searchForm.trigger('submit');
		},
		//获取输入框值
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		//下拉层信息
		autocomplete:function(){
			//1.初始化显示隐藏插件
			this.$searchLayer.showHide(this.options);
			//2.监听输入框输入事件获取jsonp数据
			if(this.options.delayGetData){
				this.$searchInput.on('input',function(){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.delayGetData)
				}.bind(this))
			}
			this.$searchInput.on('input',$.proxy(this.getData,this));
			//3.输入框获取焦点下拉层出现
			this.$searchInput.on('focus',function(){
				//如果输入框值为空则不显示
				if(this.getInputVal()){
					this.showLayer();
				}
			}.bind(this))
			//4.当鼠标点击其他地方下拉层消失
			$(document).on('click',function(){
				this.hideLayer();
			}.bind(this))
			//5.点击输入框阻止事件冒泡
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			//6.事件委托点击每一条数据提交
			var _this=this;
			this.$elem.on('click','.search-item',function(){
				//1.获取当前数据
				var val = $(this).html();
				//2.设置输入框的值
				_this.setInputVal(val);
				//3.点击提交
				_this.submit();
			})
		},
		//获取数据
		getData:function(){
			//如果数据为空则不发送请求，隐藏下拉层
			if(!this.getInputVal()){
				this.hideLayer();
				return;
			}
			//发送请求前查询是否有缓存
			if(cache.getData(this.getInputVal())){
				var cacheData = cache.getData(this.getInputVal());
				this.$elem.trigger('getData',cacheData);
				return;
			}
			//保证获取最新数据
			if(this.jqXHR){
				this.jqXHR.abort();
			}
			this.jqXHR = $.ajax({
				url:this.options.url + this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				//获取数据后自定义事件为懒加载做准备
				this.$elem.trigger('getData',data);
				//存储数据
				cache.addData(this.getInputVal(),data);
			}.bind(this))
			.fail(function(err){
				this.$elem.trigger('getNoData');
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this))
		},
		showLayer:function(){
			if(!this.isLoadedHtml) return;
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		setInputVal:function(val){
			this.$searchInput.val(val);
		},
		appendHTML:function(html){
			this.$searchLayer.html(html);
			this.isLoadedHtml = !!html;
		}
	}
	Search.DEFAULTS = {
		autocomplete:true,
		js:true,
		mode:'slide',
		delayGetData:500,
		url:'https://suggest.taobao.com/sug?q=',
	}
	//暴露方法
	$.fn.extend({
		search:function(options,val){
			//隐式迭代
			this.each(function(){
				var $elem = $(this);
				var search = $elem.data('search');
				if(!search){
					options = $.extend({},Search.DEFAULTS,options);
					search = new Search($elem,options);
					$elem.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options](val);
				}
			})
		}
	})
})(jQuery)