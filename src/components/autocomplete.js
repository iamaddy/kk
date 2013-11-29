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
		, menu: '<ul class="autocomplete menu" style="display: none;"></ul>'
		, item: '<li><a href="#"></a></li>'
		, items: 8
		, minLength: 1
	};
	/**
	 * 
	 */
	var AutoComplete = function(elem, options){
		this._elem = dom(elem);
		this.options = kk.extend({}, defaults, options);
		this.source = this.options.source;
		this._menu = null;
		this.shown = false;
		this.init();
	};
	AutoComplete.guid = 0;
	AutoComplete.prototype = {
		constructor: AutoComplete,
		/**
		 * 初始化，唯一id，autocom_0，autocom_1……
		 * 绑定事件
		 */
		init: function(){
			dom.append(dom('body'), this.options.menu.replace(/<ul/i, '<ul id="autocom_' + (AutoComplete.guid++) + '"'));
			this._menu = dom('#autocom_' + (AutoComplete.guid - 1));
			event.add(this._elem, 'blur', kk.bind(this.blur, this));
			event.add(this._elem, 'keypress', kk.bind(this.keypress, this));
			event.add(this._elem, 'keyup', kk.bind(this.keyup, this));
			event.add(this._elem, 'keydown', kk.bind(this.keydown, this));
			event.add(this._menu, 'mouseenter', function(){alert(1)});
			event.add(this._menu, 'click', kk.bind(this.click, this));
		},
		/**
		 * 显示结果
		 */
		show: function(){
			var position = dom.offset(this._elem);
			dom.css(this._menu, 'top', position.top + position.height);
			dom.css(this._menu, 'left', position.left);
			dom.css(this._menu, 'display', 'block');
			dom.addClass(this._menu[0].firstChild, 'active');
			this.shown = true;
			return this;
		},
		/**
		 * 渲染结果
		 */
		render: function(items){
			items = kk.map(items, function(item, index){
				return '<li><a href="#">' + item + '</a></li>';
			});
			dom.append(this._menu, items.join(""));
			return this;
		},
		/**
		 * 选中当前值，并将text复制给input，隐藏list
		 */
		select: function(){
			var li = dom('.active', this._menu);
			var text = dom.text(li[0].firstChild);
			dom.val(this._elem, text);
			this.hide();
		},
		hide: function(){
			this.shown = false;
			dom.css(this._menu, 'display', 'none');
		},
		find: function(){
			dom.html(this._menu, "");
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
				else if(~item.indexOf(this.key)) caseSen.push(item);
				else caseInt.push(item);
			}
			return ret.concat(caseSen, caseInt);
		},
		/**
		 * 解析数据
		 */
		parseData: function(items){
			var ret = [];
			var self = this;
			kk.each(items, function(i, item){
				 if(self.matcher(item)){
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
		keydown: function(e){
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
				self.hide();
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
			var current = dom('.active', this._menu);
			dom.removeClass(current, 'active');
			var next = current[0].nextSibling;
			if(!next){
				next = this._menu[0].firstChild;
			}
			dom.addClass(next, 'active');
		},
		prev: function(){
			var current = dom('.active', this._menu);
			dom.removeClass(current, 'active');
			var prev = current[0].previousSibling;
			if(!prev){
				prev = this._menu[0].lastChild;
			}
			dom.addClass(prev, 'active');
		},
		highLight: function(){
			
		},
		menter: function(e){
			var current = dom('.active', this._menu);
			dom.removeClass(current, 'active');
			dom.addClass(e.currentTarget, 'active');
		},
		click: function(e){
			e.preventDefault();
			e.stopPropagation();
			this.select();
		}
	}
	module.exports = AutoComplete;
});