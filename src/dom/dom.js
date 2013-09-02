/**
 * @submodule dom
 * @main kk
 * @class dom
 */
define(function(require, exports, module){
	var selector = require('./selector');
	var cla = require('./class');
	var attr = require('./attr');
	var css = require('./css');
	var doc = require('./doc');
	
	var slice = Array.prototype.slice;
	/**
	 * dom选择器，支持id/class/tag，三种选择方式
	 * @method dom
	 * @example
	 * 		define(function(require, exports, module){
	 * 			var dom = require('./dom');
	 * 			var elem = dom('#id');
	 * 			var elem1 = dom('.class');
	 * 			var elem2 = dom('tag');
	 * 		}
	 * @param {string} query
	 * @param {HTMLDocument|HTMLElement} context 上下文
	 * @return {HTMLElement} node 查询到的节点
	 */
	function dom(){
		return selector(slice.call(arguments));
	}
	kk.extend(dom, {
		query: selector
	});
	kk.extend(dom, cla);
	kk.extend(dom, attr);
	kk.extend(dom, css);
	kk.extend(dom, doc);
	kk.extend({query: selector});
	return dom;
});
