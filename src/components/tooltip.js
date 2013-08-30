/**
 * 工具提示按钮
 * @author xubin
 * @date 2013-8-27
 * @class tooltip
 */
define(function(require, exports, module){
	var dom = require('../dom/dom');
	var event = require('../event/event');
	
	function Tooltip(config){
		this.defaults = {};
		this.defaults.textElem = 'data-title';
		this.defaults.divClass = 'ui-tooltip';
		this.defaults.contentClass = 'ui-tooltip-content';
		this.init(config);
	}
	Tooltip.prototype = {
		constructor: Tooltip,
		init: function(config){
			var that = this;
			if(typeof config !== 'object'){
				return;
			}
			kk.extend(this.defaults, config);
			var elems = dom(this.defaults.elem);
			kk.each(elems, function(i, item){
				event.mouseover(item, tips);
				/*event.mouseout(item, function(){
					dom.remove(dom('#tooltip'));
				});*/
			});
			function tips(){
				var text = dom.attr(this, that.defaults.textElem);
				var html = '<div id="tooltip" role="tooltip" class="' + that.defaults.divClass + '">'+
						   	'<div class="' + that.defaults.contentClass + '">' + text + '</div>'+
						   '</div>';
				var elem = dom('body');
				dom.append(elem, html);
			}
		}
	}
	module.exports = Tooltip;
});