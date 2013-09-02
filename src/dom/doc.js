/**
 * dom元素的doc类，处理document文档
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-24
 * @namespance dom
 * @class dom
 */
define(function(require, exports, module){
	var valHooks = {
		// todo
	};
	/**
	 * 清理节点，删除节点前清除改节点的事件绑定
	 */
	function _purge(d) {
	    var a = d.attributes, i, l, n;
	    if (a) {
	        l = a.length;
	        for (i = 0; i < l; i += 1) {
	            n = a[i].name;
	            if (typeof d[n] === 'function') {
	                d[n] = null;
	            }
	        }
	    }
	    a = d.childNodes;
	    if (a) {
	        l = a.length;
	        for (i = 0; i < l; i += 1) {
	            _purge(d.childNodes[i]);
	        }
	    }
	}
	function _empty(elems){
		kk.each(elems, function(i, elem){
			if(elem.nodeType === 1){
				_purge(elem);
			}
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		});
		return elems;
	}
	function _html(elems, value){
		kk.each(elems, function(i, elem){
			if(value === undefined){
				return elem && elem.nodeType === 1 ? elem.innerHTML : null;
			} else if(typeof value === 'string'){
				try {
					if(elem.nodeType === 1){
						elem.getElementsByTagName("*");
						elem.innerHTML = value;
					}
				} catch(e) {
					_empty(elem);
					_append( value );
				}
			}
		});
		return elems;
	}
	function _append(elems, value){
		var rhtml = /<|&#?\w+;/,
			rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
		kk.each(elems, function(i, elem){
			if ( typeof value === "number" ) {
				value += "";
			}
			if(!value){
				return;
			}
			if( typeof value === "string"){
				if ( !rhtml.test( value ) ) {
					value = elem.createTextNode( elem );
				} else {
					value = value.replace(rxhtmlTag, "<$1></$2>");
				}
				elem.innerHTML += value;
			} else{
				elem.appendChild(value);
			}
		});
		return elems;
	}
	/**
	 * @param {HTMLNodes} elems
	 * @returns {string} text
	 * 循环遍历获取子节点的text，除去注释节点
	 */
	function _ergodicNode(elems){
		var ret = "", elem;
		for(var i = 0; elems[i]; i++){
			elem = elems[i];
			if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
				ret += elem.nodeValue;
			} else if ( elem.nodeType !== 8 ) {
				ret += _ergodicNode( elem.childNodes );
			}
		}
		return ret;
	}
	return {
		/**
		 * 获取|设置elem的value值
		 * @method val
		 * @example
		 * 		define(function(require, exports, module){
		 * 			var dom = require('./dom');
		 * 			var elem = dom('#id');
		 * 			var val = dom.val(elem);
		 * 			dom.val(elem, "newval");
		 * 		}
		 * @param {HTMLElement} elems
		 * @param {string} value
		 * @return {string|HTMLElement} 返回elem的value值|修改后的节点
		 */
		val: function(elem, value){
			if(!arguments.length) return;
			if(arguments.length === 1){
				elem = elem && elem[0];
				if(elem){
					return (elem.value || "").replace(/\r/g, "");
				}
				return elem.value;
			}
			kk.each(elem, function(i, item){
				if ( item.nodeType !== 1 ) {
					return;
				}
				var hooks = valHooks[ item.nodeName.toLowerCase() ] || valHooks[ item.type ];
				if ( !hooks || !("set" in hooks) || hooks.set( item, val, "value" ) === undefined ) {
					elem.value = value;
				}
			});
			return elem;
		},
		/**
		 * 获取|改变节点的text值
		 * @method text
		 * @example
		 * 		define(function(require, exports, module){
		 * 			var dom = require('./dom');
		 * 			var elem = dom('#id');
		 * 			var text = dom.text(elem);
		 * 			dom.text(elem, "newtest");
		 * 		}
		 * @param {HTMLElement} elems
		 * @param {string} value
		 * @return {string|HTMLElement} 返回elem的text值|修改后的节点
		 */
		text: function(elems, value){
			if(!arguments.length) return;
			if(arguments.length === 1){
				var elem = elems && elems[0];
				return _ergodicNode([elem]);
			}
			if ( typeof value !== "object" && text !== undefined ) {
				kk.each(elems, function(i, item){
					_empty(item);
					_append(item, (item && item.ownerDocument || document).createTextNode( value ) );
				});
			}
			return elems;
		},
		/**
		 * 改变elems子节点的html，本身不改变
		 * @method html
		 * @param {HTMLElement} elems
		 * @param {string} value
		 * @returns {HTMLElement} elems
		 */
		html: _html,
		/**
		 * 追加element元素
		 * @method append
		 * @example
		 * 		define(function(require, exports, module){
		 * 			var dom = require('./dom');
		 * 			var elem = dom('#id');
		 * 			dom.append(elem, "<div>test</div>");
		 * 			dom.append(elem, newElem);
		 * 		}
		 * @param {HTMLElement} elems
		 * @param {string} value
		 * @return {HTMLElement} elems
		 */
		append: _append,
		
		prepend: function(){
			// todo
		},
		/**
		 * 清空elems子节点的html，本身不改变
		 * @method empty
		 * @example
		 * 		define(function(require, exports, module){
		 * 			var dom = require('./dom');
		 * 			var elem = dom('#id');
		 * 			dom.empty(elem);
		 * 		}
		 * @param {HTMLElement} elems
		 * @return {HTMLElement} elems
		 */
		empty: _empty,
		/**
		 * 移除指定的节点
		 * @method remove
		 * @example
		 * 		define(function(require, exports, module){
		 * 			var dom = require('./dom');
		 * 			var elem = dom('#id');
		 * 			dom.remove(elem);
		 * 		}
		 * @param {HTMLElement} elems
		 */
		remove: function(elems){
			kk.each(elems, function(i, elem){
				var p = elem.parentNode;
				if(p){
					_purge(elem);
					p.removeChild(elem);
				}
			});
		}
	}
});