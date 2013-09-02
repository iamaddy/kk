/**
 * cookie操作类，set、get、clear、remove、length
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-24
 * @submodule util
 * @class cookieStorage
 */
define(function(require, exports, module){
	function cookieStorage(){
		this.cookie = (function(){
			var cookie = {};
			var all = document.cookie;
			if(all === "") return cookie;
			var list = all.split("; ");
			for(var i = 0, l = list.length; i < l; i++){
				var c = list[i];
				var p = c.indexOf("=");
				var name = c.substring(0, p);
				var value = c.substring(p + 1);
				value = encodeURIComponent(value);
				cookie[name] = value;
			}
			return cookie;
		})();
		this.keys = [];
		for(var key in this.cookie) this.keys.push(key);
		/**
		 * cookie 的length
		 */
		this.length = this.keys.length;
	}
	cookieStorage.prototype = {
		constructor: cookieStorage,
		
		/**
		 * 获取指定索引的key
		 * @method key
		 * @param {int} n 序号
		 * @return {string} key
		 */
		key: function(n){
			if(n < 0 || n >= this.length) return null;
			return this.keys[n];
		},
		/**
		 * 获取指定key的value
		 * @method get
		 * @param {string} name key
		 * @return {string} key的value值
		 */
		get: function(name){
			return this.cookie[name] || null;
		},
		/**
		 * 设置cookie值
		 * @method set
		 * @param {string} key 
		 * @param {string} value 
		 */
		set: function(key, value){
			if(!(key in this.cookie)){
				this.keys.push(key);
				this.length++;
			}
			this.cookie[key] = value;
			
			var cookieStr = key + '=' + encodeURIComponent(value);
			document.cookie = cookieStr;
			return this;
		},
		/**
		 * 删除cookie值
		 * @method remove 
		 * @param {string} key 删除某个cookie值
		 */
		remove: function(key){
			if(! (key in this.cookie)) return;
			delete this.cookie[key];
			for(var i = 0; i < this.length; i++){
				if(this.keys[i] === key){
					this.keys.splice(i, 1);
					break;
				}
			}
			this.length--;
			document.cookie = key + '=; max-age=0';
			return this;
		},
		/**
		 * 清除所有cookie值
		 * @method clear
		 */
		clear: function(){
			for(var i = 0; i < this.length; i++){
				document.cookie = keys[i] + '=; max-age=0';
			}
			this.cookie = {};
			this.keys = [];
			this.length = 0;
			return this;
		},
		/**
		 * 设置cookie的过期时间
		 * @method setMaxAge
		 * @param {string} maxage
		 */
		setMaxAge: function(maxage){
			document.cookie = maxage && '; max-age=' + maxage;
		},
		/**
		 * 设置cookie的路径
		 * @method setPath
		 * @param {string} path
		 */
		setPath: function(path){
			document.cookie = path && '; path=' + path;
		}
	};
	return {
		cookieStorage: new cookieStorage()
	}
});