/**
 * @submodule util
 */
define(function(require, exports, module){
	var url = require('./base/url');
	var cookie = require('./base/cookie');
	var dragdrop = require('./base/dragdrop');
	function common(){
	}
	kk.extend(common, url);
	kk.extend(common, cookie);
	kk.extend(common, dragdrop);
	return common;
});