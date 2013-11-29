/**
 * tab组件，<a target="_blank" href="http://misc.web.xunlei.com/kk/demo/tabs/tabsdemo.html">查看demo</a>
 * @author xubin
 * @date 2013-8-28
 * @class Tabs
 */
define(function(require, exports, module){
	var dom 	= require('dom');
	var event 	= require('event');
	
	function Tabs(config){
		this.defaults 	= {
			/**
			 * tab选择器，通常为class，tagName等。
			@property tabElem 
			@type String
			@default ""
			**/
			tabElem 	: '',
			/**
			 * panel选择器，通常为class，tagName等。
			@property panelElem 
			@type String
			@default ""
			**/
			panelElem 	: '',
			/**
			 * 每个tab停留的时间(单位秒)
			@property time 
			@type int
			@default 5
			**/
			time 		: 5,
			/**
			 * 默认显示tab的顺序
			@property defaultIndex 
			@type int
			@default 0
			**/
			defaultIndex: 0,
			/**
			 * 触发panel显示的方法，click，mouseover等
			@property handler 
			@type String
			@default "click"
			**/
			handler 	: 'click',
			/**
			 * 轮播一轮之后停留|一直轮播
			@property alwaysRun 
			@type boolean
			@default false
			**/
			alwaysRun 	: false,
			/**
			 * 是否自动轮播
			@property auto 
			@type boolean
			@default true
			**/
			auto 		: true,
			/**
			@property selectedClass 
			@type String
			@default "on"
			**/
			selectedClass : 'on',
			/**
			 * 
			 * 自定义每项tab时间（单位秒）
			@property timeCollection 
			@type arr
			@default []
			**/
			timeCollection : []
		};
		this.tabs 		= [];
		this.panels 	= [];
		this.timer = null;
		this.selectedIndex = this.defaults.defaultIndex;
		this.callbacks = [];
		this._init(config);
	}
	Tabs.prototype = {
		constructor: Tabs,
		/**
		 * 初始化
		 */
		_init: function(config){
			var that = this;
			if(typeof config !== 'object'){
				return;
			}
			kk.extend(this.defaults, config);
			this.tabs 	= dom(this.defaults.tabElem);
			this.panels = dom(this.defaults.panelElem);
			if(this.tabs.length < 1 || this.panels.length < 1){
				return;
			}
			if(this.defaults.defaultIndex > this.tabs.length -1){
				this.defaults.defaultIndex = 0;
			}
			this.setSelectedItem(this.defaults.defaultIndex);
			if(this.defaults.auto) {
				this.play();
				event.add(this.tabs, 'mouseover', function(){that.stop();}); 
				event.add(this.panels, 'mouseover', function(){that.stop();});
				event.add(this.tabs, 'mouseout', function(){that.play();}); 
				event.add(this.panels, 'mouseout', function(){that.play();});
			}
			event.add(this.tabs, this.defaults.handler, function(){
				that.selectedIndex = this.id.split('_')[1];
				that.setSelectedItem(that.selectedIndex);
			});
		},
		/**
		 * 开始自动轮播
		 * @method play
		 * @return {Tabs} 组件对象
		 * @example
		 * 		mytab.play();
		 */
		play: function(){
			var self = this;
			var time = (this.defaults.timeCollection[this.selectedIndex] || this.defaults.time) * 1000;
			this.timer = setInterval(function(){
				self.selectedIndex++;
				if(self.selectedIndex > self.tabs.length - 1){
					self.selectedIndex = 0;
				}
				self.setSelectedItem(self.selectedIndex);
				self.stop().play();
			}, time);
			return this;
		},
		/**
		 * 停止播放
		 * @method stop
		 * @example
		 *  	var mytab = new tabs({
					tabElem: '.tab',
					panelElem: ".tab-pannel",
					timeCollection: [1, 5, 10]
				});
				mytab.stop();
		 */
		stop: function(){
			clearInterval(this.timer);
			return this;
		},
		/**
		 * 设置选中tab
		 * @method setSelectedItem
		 * @param {int} index tab的序号，0<=index<=tab.length -1
		 * @return {Tabs} 组件对象
		 */
		setSelectedItem: function(index){
			if(index < 0 || index > this.tabs.length - 1) return;
			dom.removeClass(this.tabs, this.defaults.selectedClass);
			dom.addClass(this.tabs[index], this.defaults.selectedClass);
			dom.css(this.panels, 'display', 'none');
			dom.css(this.panels[index], 'display','block');
			kk.each(this.callbacks, function(i, item){
				try{
					var fn = item['fn'];
					if(typeof item['context'] === 'undefined'){
						fn();
					} else {
						fn.call(item['context'], arguments);
					}
				}catch(e){}
			});
			// 一直跑|循环一轮后停下在默认位置
			if(!this.defaults.alwaysRun && index === this.defaults.defaultIndex) {
				this.stop();
			}
			return this;
		},
		/**
		 * 单独配置panel的停留时间
		 * @method setPlayTime
		 * @params {object} collection key是panel的顺序，value是时间值，单位为秒
		 * @example
		 * 		mytab.setPlayTime({0: 1, 1: 10});
		 * 		// tab0的停留时间为1秒，tab1的停留时间为10秒
		 */
		setPlayTime: function(collection){
			if(typeof collection !== 'object' || kk.isEmptyObject(collection)){
				return;
			}
			for(var index in collection){
				if(index > this.tabs.length - 1) {
					continue;
				}
				this.defaults.timeCollection[index] = parseInt(collection[index]) * 1000;
			}
		},
		/**
		 * todo 增加一项item
		 */
		addItem: function(tab, panel){
		},
		/**
		 * 获取所有的tabs
		 * @method getTabs
		 * @return {HTMLElement}
		 */
		getTabs: function(){
			return this.tabs;
		},
		/**
		 * 获取所有的panels
		 * @method getPanels
		 * @return {HTMLElement}
		 */
		getPanels: function(){
			return this.panels;
		},
		/**
		 * 返回选中的tab
		 * @method getCurrentTab
		 * @return {HTMLElement}
		 */
		getCurrentTab: function(){
			return this.tabs[this.selectedIndex];
		},
		/**
		 * 返回选中的panel
		 * @method getCurrentPanel
		 * @return {HTMLElement}
		 */
		getCurrentPanel: function(){
			return this.panels[this.selectedIndex];
		},
		/**
		 * 为切换添加回调函数
		 * @method addCallback
		 * @example
		 * 		function a(){
		 * 			alert(0);
		 * 		}
		 * 		mytab.addCallback(a);
		 * @return {Tabs} 组件对象
		 * @param fn {function} 回调函数
		 * @param context {object} 执行上下文
		 */
		addCallback: function(fn, context){
			if(!kk.isFunction(fn)){
				return;
			}
			this.callbacks.push({fn: fn, context: context});
			return this;
		},
		/**
		 * 为切换删除回调函数 支持匿名函数，根据函数toString()值是否相等剔除回调函数
		 * @method removeCallback
		 * @example
		 * 		mytab.removeCallback(a);
		 * @return {Tabs} 组件对象
		 * @param fn {function} 回调函数
		 */
		removeCallback: function(fn){
			var ret = [];
			kk.each(this.callbacks, function(i ,item){
				if(item['fn'] && item['fn'].toString() !== fn.toString()){
					ret.push(item);
				}
			});
			this.callbacks = ret;
			return this;
		}
	}
	module.exports = Tabs;
});