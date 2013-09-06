/**
 * 自动提示
 * @author xubin
 * @date 2013-09-04
 * @class autocomplete
 */
define(function(require, exports, module){
	var dom 	= require('../dom/dom');
	var event 	= require('../event/event');
	
	var defaults = {
		  source: []
		, menu: '<ul class="autocomplete menu"></ul>'
		, item: '<li><a href="#"></a></li>'
		, items: 8
		, minLength: 1
	}
	/**
	 * 
	 */
	var AutoComplete = function(elem, options){
		this._elem = dom(elem);
		this.options = kk.extend({}, defaults, options);
		this.source = this.options.source;
		this._menu = dom.append(dom('body'), this.options.menu);
		this.shown = false;
		this.init();
	};
	AutoComplete.prototype = {
		constructor: AutoComplete,
		init: function(){
			event.add(this._elem, 'blur', this.blur, this);
			event.add(this._elem, 'keypress', this.keypress, this);
			event.add(this._elem, 'keyup', this.keyup, this);
		},
		show: function(){
			var position = dom.offset(this._elem);
			dom.css(this._menu, {top: position.top + position.height, left: position.left});
			this.shown = true;
			return this;
		},
		render: function(items){
			items = kk.map(item, function(item, index){
				return '<li><a href="#">' + item + '</a></li>';
			});
			this._menu.innerHTML = items.join("");
			return this;
		},
		select: function(){
			
		},
		hide: function(){
			
		},
		find: function(){
			this.key = dom.val(this._elem);
			if(!this.key || this.key.lenght < this.options.minLength){
				return this.shown ? this.hide() : this;
			}
			var items = this.source;
			return this.parseData(items);
		},
		/**
		 * 默认匹配规则，包含则加入结果集，大小写不敏感
		 */
		matcher: function(item){
			return ~item.toLowerCase().indexOf(this.key.toLowerCase());
		},
		/**
		 * 默认排序规则，最开始能匹配的放第一，大小写敏感的结果在次之
		 */
		sorter: function(items){
			var ret = [],
				caseSen = [],
				caseInt = [],
				item;
			while(item = items.shift()){
				// 字符串最开始命中
				if(!item.toLowerCase().indexOf(this.key.toLowerCase())) ret.push(item);
				else if(~item.indeOf(this.key)) caseSen.push(item);
				else caseInt.push(item);
			}
			return ret.concat(caseSen, caseInt);
		},
		/**
		 * 解析数据
		 */
		parseData: function(items){
			var ret = [];
			kk.each(items, function(i, item){
				 if(this.matcher(item)){
					ret.push(item); 
				 }
			});
			ret = this.sorter(ret);
			if(!ret.length){
				return this.shown ? this.hide() : this;
			}
			this.render(ret.slice(0, this.options.items)).show();
		},
		keyup: function(e){
			switch(e.keyCode){
				case 38: // up
				case 40: // down
					break;
				case 27: // esc
					if(!this.shown) return;
					this.hide();
					break;
				case 9:
				case 13:
					if(!this.shown) return;
					this.select();
					break;
				default:
					this.find();
			}
		},
		keydown: function(){
			this.suppressKeyPressRepeat = !~kk.inArray(e.keyCode, [40,38,9,13,27]);
			this.move(e);
		},
		keypress: function(e){
			if(this.suppressKeyPressRepeat) return;
		    this.move(e);
		},
		/**
		 * 失去焦点则消失
		 */
		blur: function(){
			var self = this;
			setTimeout(function(){
				that.hide();
			}, 150);
		},
		/**
		 * 键盘的上下键控制选中项
		 */
		move: function(e){
			switch(e.keyCode){
				case 9: // tab
				case 13: // enter
				case 27: // escape
					e.preventDefault();
					break;
				case 38: // up
					e.preventDefault();
					this.prev();
					break;
				case 40:
					e.preventDefault();
					this.next();
					break;
			}
			e.stopPropagation();
		},
		next: function(){
			
		},
		prev: function(){
			
		},
		highLight: function(){
			
		}
	}
	module.exports = AutoComplete;
});