/**
 * dom元素的doc类，处理document文档
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-10
 * @class dom
 */
define(function(require, exports, module) {
	/**
	 * 参照jquery选择器
	 * 选择方式
	 * tag|.class|#id  
	 */
	var Expr = {};
	// 浏览器兼容性检测
	(function(){
		var div = document.createElement("div");
		div.innerHTML = "<div class='test e'></div><div class='test'></div>";
		//  Opera can't find a second classname (in 9.6)
		if(!div.getElementsByClassName || div.getElementsByClassName("e").length === 0){
			return;
		}
		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
		if(div.getElementsByClassName("e").length === 1){
			return;
		}
		Expr.CLASS = function( match, context) {
			if ( typeof context.getElementsByClassName !== "undefined") {
				return context.getElementsByClassName(match[1]);
			}
		};
		// ie 释放内存
		div = null;
	})();
	
	(function(){
		var div = document.createElement("div"),
			id = "script" + (new Date()).getTime(),
			root = document.documentElement;
		div.innerHTML = "<a name='" + id + "'/>";
		root.insertBefore( div, root.firstChild );
		if ( document.getElementById( id ) ) {
			Expr.ID = function( match, context ) {
				if ( typeof context.getElementById !== "undefined") {
					var m = context.getElementById(match[1]);

					return m ?
						m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
							[m] :
							undefined :
						[];
				}
			};
		}
		root.removeChild( div );
		// release memory in IE
		root = div = null;
	})();
	
	/**
	 * @method query
	 * @param {string} query
	 * @param {HTMLDocument|HTMLElement} context 上下文
	 * @return {HTMLElement} node 查询到的节点
	 */
	function find(query, context, extra){
		context = context || document;
		if(context.querySelectorAll){
			return kk.makeArray( context.querySelectorAll(query), extra );
		} else {
			var queryExpr = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/,
				match;
			match = queryExpr.exec(query);
			if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
				if ( match[1] ) {
					return kk.makeArray( context.getElementsByTagName( query ), extra );
				} else if ( match[2]) {
					if(Expr.CLASS && context.getElementsByClassName ){
						return kk.makeArray( context.getElementsByClassName( match[2] ), extra );
					} else{
						var nodes = context.getElementsByTagName('*');
						var ret = [];
						var re = new RegExp('(^| )'+match[2]+'( |$)');
						kk.each(nodes, function(i, item){
							if(re.test(item.className)){
								ret.push(item);
							}
						});
						return kk.makeArray( ret, extra );
					}
				} else if( match[3] && context.getElementById){
					return kk.makeArray( context.getElementById( match[3] ), extra );
				} else {
					return extra || [];
				}
			} else {
				return extra || [];
			}
		}
	}
	return find;
});