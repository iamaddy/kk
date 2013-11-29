/**
 * string功能对象
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-15
 * @class kk
 */
;(function(K, undefined){
	var EMPTY = '',
		RE_TRIM = /(^\s*)|(\s*$)/g,
		L_TRIM  = /(^\s*)/g,
		R_TRIM  = /(\s*$)/g,
		COMMA	= /(\d)(?=(\d\d\d)+(?!\d))/g,
		
		// JSON RegExp
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		
		trim = String.prototype.trim;
	var Strings = {
		/**
		 * @method trim
		 * @example
		 * 		var str = " sdsdsd sds  ";
		 * 		var ret = kk.trim(str) // "sdsdsd sds"
		 * @param {string} str 查询字符串
		 * @return {string} 空字符串或者trim之后的结果
		 */
		trim: trim ? 
			function(str){
				return str == null ? EMPTY : trim.call(str);
			} :
			function(str){
				return str == null ? EMPTY : (str + EMPTY).replace(RE_TRIM, EMPTY);
			},
		/**
		 * @method trimL
		 * @example
		 * 		var str = " sdsdsd sds  ";
		 * 		var ret = kk.trimL(str) // "sdsdsd sds  "
		 * @param {string} str 查询字符串
		 * @return {string} 截取左侧空字符串之后的结果
		 */
		trimL: function(str){
			return str == null ? EMPTY : (str + EMPTY).replace(L_TRIM, EMPTY);
		},
		/**
		 * @method trimR
		 * @example
		 * 		var str = " sdsdsd sds  ";
		 * 		var ret = kk.trimR(str) // " sdsdsd sds"
		 * @param {string} str 查询字符串
		 * @return {string} 截取右侧空字符串之后的结果
		 */
		trimR: function(str){
			return str == null ? EMPTY : (str + EMPTY).replace(R_TRIM, EMPTY);
		},
		/**
		 * @method startWith
		 * @example
		 * 		var str = "sdsdsd sds";
		 * 		var ret = kk.startWith(str, 'sd') // true
		 * 		ret = kk.startWith(str, 'd') // false
		 * @param {string} str 查询字符串
		 * @param {string} prefix 查询后缀
		 * @return {Boolean} 是否以prefix开头
		 */
		startWith: function(str, prefix){
			if(prefix === EMPTY) return false;
			return (str + EMPTY).lastIndexOf(prefix, 0) === 0;
		},
		/**
		 * @method endWith
		 * @example
		 * 		var str = "sdsdsd sds";
		 * 		var ret = kk.endWith(str, 'sd') // false
		 * 		ret = kk.endWith(str, 's') // true
		 * @param {string} str 查询字符串
		 * @param {string} suffix 查询后缀
		 * @return {Boolean} 是否以suffix结尾
		 */
		endWith: function(str, suffix){
			if(suffix === EMPTY) return false;
			var n = str.length - suffix.length;
			return n >= 0 && (str + EMPTY).indexOf(suffix, n) == n;
		},
		/**
		 * @method upFirst
		 * @example
		 * 		var str = "sdsdsd sds";
		 * 		var ret = kk.upFirst(str) // "Sdsdsd sds"
		 * @param {string} str 处理字符串
		 * @return {string} 返回首字母大写的字符串
		 */
		upFirst: function(str){
			str += EMPTY;
            return str.charAt(0).toUpperCase() + str.substring(1);
		},
		/**
		 * @method commaNumber
		 * @example
		 * 		var str = "1234567";
		 * 		var ret = kk.commaNumber(str) // "1,234,567"
		 * @param {string|number} str 处理字符串
		 * @return {string} 返回以逗号分隔的字符串
		 * 23232312323434 =》 23,232,312,323,434
		 */
		commaNumber: function(str){
			return str.toString().replace(COMMA, '$1,');
		},
		/**
		 * @method param
		 * @example
		 * 		var str = {a: "12", b: "23"};
		 * 		var ret = kk.param(str) // "a=12&b=23"
		 * @param {object} a key value对象 
		 * @return {string} 返回以&连接的字符串
		 */
		param: function(a){
			var s = [],
				add = function( key, value ) {
					s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
				};
			
			if(typeof a === 'object'){
				for(var k in a){
					add(k, a[k]);
				}
			} else{
				return "";
			}
			return s.join('&');
		},
		/**
		 * @method parseJSON
		 * @example
		 * 		var str = "{"a": "12", "b": "23"}";
		 * 		var ret = kk.parseJSON(str) // {a: "12", b: "23"}
		 * @param {string} json字符串
		 * @return {object} json对象
		 */
		parseJSON: function(data){
			if(typeof data !== "string" || !data){
				return null;
			}
			data = kk.trim(data);
			if(window.JSON && window.JSON.parse){
				return window.JSON.parse(data);
			}
			if(rvalidchars.test(data.replace(rvalidescape, "@").
				replace(rvalidtokens, "]").
				replace(rvalidbraces, ""))){
				return (new Function("return " + data))();
			}
			kk.error("Invalid JSON: " + data);
		}
	};
	K.extend(Strings);
})(kk);