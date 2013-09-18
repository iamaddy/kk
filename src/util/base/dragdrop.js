/**
 * 元素拖动
 * @author iamaddy
 * @date 2013-9-18
 * @class DragDrop
 */
define(function(require, exports, module){
	var dom = require('../../../src/dom/dom');
	var event = require('../../../src/event/event');
	var DragDrop = function(){
		var dragging = null,
			diffX = 0,
			diffY = 0;
		/**
		 * 处理三个mouse事件
		 * 绑定 draggable 类属性
		 */
		function handleEvent(event){
			var target = event.target;
			switch(event.type){
				case 'mousedown':
					if(target.className.indexOf('draggable') > -1){
						dragging = target;
						// 拾起元素，防止跳到元素左上角
						diffX = event.clientX - target.offsetLeft;
						diffY = event.clientY - target.offsetTop;
					}
					break;
				case "mousemove":
					if(dragging !== null){
						dom.css(dragging, 'top', event.clientY - diffY);
						dom.css(dragging, 'left', event.clientX - diffX);
					}
					break;
				case "mouseup":
					dragging = null;
					break;
			}
		};
		return {
			/**
			 * 开始拖动
			 * @method enable
			 * @example
			 * 		DragDrop.enable();
			 */
			enable: function(){
				event.add(document, "mousedown", handleEvent);
				event.add(document, "mousemove", handleEvent);
				event.add(document, "mouseup", handleEvent);
			},
			/**
			 * 取消拖动
			 * @method disable
			 * @example
			 * 		DragDrop.disable();
			 */
			disable: function(){
				event.remove(document, "mousedown", handleEvent);
				event.remove(document, "mousemove", handleEvent);
				event.remove(document, "mouseup", handleEvent);
			}
		}
	}();
	return {DragDrop: DragDrop};
});