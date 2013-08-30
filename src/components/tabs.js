/**
 * tabs
 * @author xubin
 * @date 2013-8-28
 * @class tooltip
 */
define(function(require, exports, module){
	var dom 	= require('../dom/dom');
	var event 	= require('../event/event');
	
	function Tabs(config){
		this.defaults 	= {
			tabElem 	: '',
			panelElem 	: '',
			time 		: 5,
			defaultIndex: 2,
			handler 	: 'click',
			fromFirst 	: true,
			alwaysRun 	: false,
			auto 		: true,
			selectedClass : 'on',
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
				this._play();
				event.add(this.tabs, 'mouseover', function(){that.stop();}); 
				event.add(this.panels, 'mouseover', function(){that.stop();});
				event.add(this.tabs, 'mouseout', function(){that._play();}); 
				event.add(this.panels, 'mouseout', function(){that._play();});
			}
			event.add(this.tabs, this.defaults.handler, function(){
				that.selectedIndex = this.id.split('_')[1];
				that.setSelectedItem(that.selectedIndex);
			});
		},
		/**
		 * 开始跑马灯
		 */
		_play: function(){
			var self = this;
			var time = (this.defaults.timeCollection[this.selectedIndex] || this.defaults.time) * 1000;
			this.timer = setInterval(function(){
				self.selectedIndex++;
				if(self.selectedIndex > self.tabs.length - 1){
					self.selectedIndex = 0;
				}
				self.setSelectedItem(self.selectedIndex);
				self.stop()._play();
			}, time);
			return this;
		},
		/**
		 * 停止跑马灯
		 */
		stop: function(){
			clearInterval(this.timer);
			return this;
		},
		/**
		 * 设置选中tab
		 */
		setSelectedItem: function(index){
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
		},
		/**
		 * 单独配置panel的停留时间
		 * @params collection{object}
		 * @example{0: 1, 1: 10}
		 * key是panel的顺序，value是时间值，单位为秒
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
		 */
		getTabs: function(){
			return this.tabs;
		},
		/**
		 * 获取所有的panels
		 */
		getPanels: function(){
			return this.panels;
		},
		/**
		 * 返回选中的tab
		 */
		getCurrentTab: function(){
			return this.tabs[this.selectedIndex];
		},
		/**
		 * 返回选中的panel
		 */
		getCurrentPanel: function(){
			return this.panels[this.selectedIndex];
		},
		/**
		 * 为切换添加回调函数
		 * @params fn {function} 回调函数
		 * @params context {object} 执行上下文
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
		 * @params fn {function} 回调函数
		 */
		removeCallback: function(fn){
			var ret = [];
			kk.each(this.callbacks, function(i ,item){
				if(item['fn'] && item['fn'].toString() !== fn.toString()){
					ret.push(item);
				}
			});
			this.callbacks = ret;
		}
	}
	module.exports = Tabs;
});