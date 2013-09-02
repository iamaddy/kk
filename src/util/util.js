/**
 * @submodule util
 */
define(function(require, exports, module){
	var url = require('./base/url');
	var cookie = require('./base/cookie');
	function common(){
	}
	kk.extend(common, url);
	kk.extend(common, cookie);
	return common;
});