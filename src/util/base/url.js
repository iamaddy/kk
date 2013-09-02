/**
 * url功能对象 ,url跳转，url传参等
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-15
 * @submodule util
 * @class url
 */
define(function(require, exports, module){
	var Url = (function(url) {
		var a = document.createElement('a');
		a.href = typeof url !== 'undefined' ? url : window.location.href;
		return {
			source: a.href,
			host  : a.hostname,
			port  : a.port,
			query : a.search,
			params: (function() {
				var ret = {},
				seg = a.search.replace(/^\?/,'').split('&'),
				len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[s[0]] = decodeURIComponent(s[1]);
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/'),
			protocol: a.protocol.replace(':',''),
			makeurl : function() {
				return (this.protocol? this.protocol+'://': '')
						+ this.host
						+ (this.port? (':'+this.port): '')
						+ this.path
						+ (kk.isEmptyObject(this.params) ? '': '?' + kk.param(this.params))
			}
		};
	});
	// 跳转
	var Redirect = function(params, remove) {
		var $url = new Url(window.location.href);
		kk.extend($url.params, params || {}); // 添加参数
		if(remove) {
			kk.each(remove, function(k, v) {
				delete $url.params[v];
			});
		}
		window.location.href = $url.makeurl();
	};
	/**
	 * 指定url跳转
	 * @method Redirect.url
	 * @param {string} url 
	 * @param {object} params {a: b}
	 * @param {object} remove {a: b}
	 */
	Redirect.url = function(url, params, remove) {
		var $url = new Url(url);
		kk.extend($url.params, params || {}); // 添加参数
		if(remove){
			kk.each(remove, function(k, v) {
				delete $url.params[v];
			})
		}
		window.location.href = $url.makeurl();
	}
	return {
		Url: Url,
		/**
		 * url跳转
		 * @method Redirect
		 * @param {object} params {a: b}
		 * @param {object} remove {a: b}
		 */
		Redirect: Redirect
	};
});