/**
 * 图片懒加载
 * @author xubin
 * @date 2013-09-011
 * @class 滚动到图片位置加载
 */
define(function(require, exports, module){
	var dom 	= require('../dom/dom');
	var event 	= require('../event/event');
	var defaults = {
			/**
			 * 事件类型 mouserover|click|scroll
			 * scroll绑定在winsow上，其他绑定的在元素上
			@property type 
			@type String
			@default 'scroll'
			**/
			type: 'scroll',
			/**
			 * img的url地址的属性名称
			@property attrName 
			@type String
			@default "_src"
			**/
			attrName: '_src',
			/**
			 * 设置敏感度,正值向后延迟，负值向前延迟
			@property threshold 
			@type Int
			@default 0
			**/
			threshold: 0,
			/**
			 * 自动加载的延迟时间
			@property time 
			@type Int
			@default 3000
			**/
			time: 3000,
			/**
			 * 延迟时间后自动加载
			@property autoload 
			@type boolean
			@default false
			**/
			autoload: false
			
	};
	/**
	 * 
	 */
	function LazyLoad(elem, options){
		elem = elem || 'img';
		this._elem = dom(elem);
		this.options = kk.extend({}, defaults, options);
		this.container = {
			x: document.body.clientWidth,
			y: document.body.clientHeight
		};
		this.init();
	}
	LazyLoad.prototype = {
		constructor: LazyLoad,
		/**
		 * 初始页加载视野区域的图片
		 * 绑定事件
		 */
		init: function(){
			kk.each(this._elem, function(i, item){
				this.pos(item);
			}, this);
			event.add(window, this.options.type, kk.bind(this.show, this));
			if(this.options.autoload){
				this.loadByTime(this.options.time);
			}
			return this;
		},
		show: function(){
			var that = this;
			setTimeout(function(){
				kk.each(that._elem, function(i, item){
					that.pos(item);
				});
			}, 200);
			return this;
		},
		/**
		 * 计算elem的位置，是否在可视的区域，在则加载图片
		 */
		pos: function(elem){
			var position = dom.offset(elem);
			var scrollX = window.scrollX || document.body.scrollLeft;
			var scrollY = window.scrollY || document.body.scrollTop;
			if(scrollX + this.container.x >= position.left + this.options.threshold && 
				scrollY + this.container.y >= position.top + this.options.threshold){
				var _url = dom.attr(elem, this.options.attrName);
				var url = dom.attr(elem, 'src');
				if(url !== _url){
					dom.attr(elem, 'src', _url);
				}
			}
			return this;
		},
		/**
		 * 延迟一定时间一次性全部加载
		 */
		loadByTime: function(time){
			var that = this;
			setTimeout(function(){
				kk.each(that._elem, function(i, elem){
					var _url = dom.attr(elem, that.options.attrName);
					var url = dom.attr(elem, 'src');
					if(url !== _url){
						dom.attr(elem, 'src', _url);
					}
				}, that);
			}, time);
			return this;
		}
	};
	return LazyLoad;
});