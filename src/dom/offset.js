/**
 * dom元素的位置信息
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-9-5
 * @class offset
 */
define(function(require, exports, module){
	var offset = null;
	if("getBoundingClientRect" in document.documentElement){
		offset = function(elem, options){
			if(elem.length) elem = elem[0];
			if(!elem || !elem.ownerDocument){
				return null;
			}
			if(elem === elem.ownerDocument.body){
				return bodyOffset(elem);
			}
			if(options){
				return setOffset(elem, options);
			}
			var ret = elem.getBoundingClientRect();
			if(!ret){
				return {left: 0, top: 0};
			}
			/**
			 * todo 
			 * ie和chrome的值相差border宽度
			 */
			var doc = elem.ownerDocument,
				docElem = doc.documentElement,
				clientTop  = docElem.clientTop  || doc.body.clientTop  || 0,
				clientLeft = docElem.clientLeft || doc.body.clientLeft || 0,
				srcollPos = getScrollOffsets(),
				w = ret.width || ret.right - ret.left,
				h = ret.height || ret.bottom - ret.top;
			return {
				left: ret.left + srcollPos.left - clientLeft, 
				top: ret.top + srcollPos.top - clientTop,
				width: w,
				height: h
			};
		}
	}
	else {
		// todo 
		// 传统的offset方法，遍历获取父节点的相对位置累加
		// 传统浏览器，暂不实现
	}
	function setOffset(elem, options){
		
	}
	function bodyOffset(elem){
		
	}
	/**
	 * 返回scroll坐标
	 */
	function getScrollOffsets(w){
		w = w || window;
		if(w.pageXOffset !== undefined) return {left: w.pageXOffset, top: w.pageYOffset};
		var d = w.document;
		if(d.compatMode === 'CSS1Compat'){
			return {left: d.documentElement.scrollLeft, top: d.documentElement.scrollTop};
		}
		return {left: d.body.scrollLeft, top: d.body.scrollTop};
	}
	return {offset: offset};
});