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
	 * @method dom
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
