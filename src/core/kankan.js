/**
 * 总命名空间kk，项目名称
 * @module kk
 */
;(function(window, undefined){
	var kk = (function(){
		var host = this,
			K,
			EMPTY = '';
		K = {
			/**
			 * 版本号
			 */
			version: "1.0.0",
			/**
			 * kk的执行环境
			 */
			Env: host,
			/**
			 * 是否调试
			 */
			debug: false,
			/**
			 * 配置信息
			 */
			config: function(){
				
			},
			/**
			 * console debug infomation
			 */
			log: function (msg, src) {
	            if (K.debug) {
	                if (src) {
	                    msg = src + ': ' + msg;
	                }
	                if (host['console'] !== undefined && console.log) {
	                    console.log(msg);
	                }
	            }
	        },
	        /**
	         * print error infomation
	         */
	        error: function (msg) {
	            if (K.debug) {
	                throw msg instanceof  Error ? msg : new Error(msg);
	            }
	        }
		}
		return K;
	})();
	window.kk = window.K = kk;
})(window);

