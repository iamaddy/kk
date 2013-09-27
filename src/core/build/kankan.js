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

/**
 * object功能对象，包括继承等
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-10
 * @class kk
 */
;(function(K, undefined){
	var hasEnumBug = !({toString: 1}['propertyIsEnumerable']('toString')),
    enumProperties = [
        'constructor',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toString',
        'toLocaleString',
        'valueOf'
    ];
	/**
	 * 可以扩展kk自身，也可以扩展对象的属性
	 * @method extend
	 */
	// 参照jquery 的继承函数，核心代码，所有的功能基于此函数
	K.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		// 是否深拷贝
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		// 若target不是object或者function，则置为空对象
		if ( typeof target !== "object" && !K.isFunction(target) ) {
			target = {};
		}
		// 若只有一个参数，扩展kk自身
		if ( length === i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) != null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					// 防止循环继承  进入死循环
					if ( target === copy ) {
						continue;
					}
					// 递归继承
					if ( deep && copy && ( K.isPlainObject(copy) || (copyIsArray = K.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && K.isArray(src) ? src : [];
						} else {
							clone = src && K.isPlainObject(src) ? src : {};
						}
						// 不改变原始对象，克隆之
						target[ name ] = K.extend( deep, clone, copy );
					//  过滤value 是undefined值的
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		// 返回扩展的对象
		return target;
	};
	K.extend({
		/**
		 * 获取对象的所有key
		 * @method keys
		 * @param {object} 查询对象
		 * @return {array} 返回可遍历的属性
		 */
		keys: function(o){
			var result = [], p, i;
			for(p in o){
				result.push(p);
			}
			if(hasEnumBug){
				for(i = enumProperties.length - 1; i >= 0; i--){
					p = enumProperties[i];
					if(o.hasOwnProperty(p)){
						result.push(p);
					}
				}
			}
			return result;
		}
	});
})(kk);/**
 * kk的公共模块，类型检测等功能
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-15
 * @class kk
 */
;(function(K, undefined){
	var class2type = {},
		ArrayProto = Array.prototype, 
		ObjProto = Object.prototype, 
		FuncProto = Function.prototype,
		toString= ObjProto.toString,
		hasOwn = Object.prototype.hasOwnProperty;
	var common = {
		/**
		 * 是否是函数
		 * @method isFunction
		 * @param {object} obj
		 * @return {boolean}
		 */
		isFunction: function(obj){
			return this.type(obj) === "function";
		},
		/**
		 * 是否是array
		 * @method isArray
		 * @param {object} obj
		 * @return {boolean}
		 */
		isArray: Array.isArray || function(obj){
			return this.type(obj) === "array";
		},
		/**
		 * 是否是string
		 * @method isString
		 * @param {object} obj
		 * @return {boolean}
		 */
		isString: function(obj){
			return this.type(obj) === "string";
		},
		/**
		 * 是否是window
		 * @method isWindow
		 * @param {object} obj
		 * @return {boolean}
		 */
		isWindow: function(obj){
			return obj && typeof(obj) === "object" && "setInterval" in obj;
		},
		/**
		 * 是否是number
		 * @method isNumber
		 * @param {object} obj
		 * @return {boolean}
		 */
		isNumber: function(obj){
			return this.type(obj) === "number";
		},
		/**
		 * 是否是date
		 * @method isDate
		 * @param {object} obj
		 * @return {boolean}
		 */
		isDate: function(obj){
			return this.type(obj) === "date";
		},
		/**
		 * 是否是正则表达式
		 * @method isRegExp
		 * @param {object} obj
		 * @return {boolean}
		 */
		isRegExp: function(obj){
			return this.type(obj) === "regexp";
		},
		/**
		 * 是否是bool值
		 * @method isBoolean
		 * @param {object} obj
		 * @return {boolean}
		 */
		isBoolean: function(obj){
			return this.type(obj) === "boolean";
		},
		/**
		 * 是否是null值
		 * @method isNull
		 * @param {object} obj
		 * @return {boolean}
		 */
		isNull: function(obj) {
		    return obj === null;
		},
		/**
		 * 是否是Undefined
		 * @method isUndefined
		 * @param {object} obj
		 * @return {boolean}
		 */
		isUndefined: function(obj) {
		    return obj === void 0;
		},
		/**
		 * 是否是空对象
		 * @method isEmptyObject
		 * @param {object} obj
		 * @return {boolean}
		 */
		isEmptyObject: function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},
		/**
		 * 判断是否是纯粹的对象
		 * @method isPlainObject
		 * @param {object} obj
		 * @return {boolean}
		 */
		isPlainObject: function(obj){
			if(!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)){
				return false;
			}
			if(obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")){
				return false;
			}
			var key;
			for(key in obj){}
			return key === undefined || hasOwn.call(obj, key);
		},
		/**
		 * 返回当前的时间戳
		 * @method now
		 * @return {string}
		 */
		now: function() {
			return (new Date()).getTime();
		},
		/**
		 * 遍历
		 * @method each
		 * @param {object} obj
		 * @param {function} callback
		 */
		each: function(obj, callback, context){
			var name, i=0,
				length = obj.length,
				isObj = length === undefined || this.isFunction(obj);
			if(isObj){
				for(name in obj){
					context = context || obj[name];
					if(callback.call(context, name, obj[name]) === false){
						break;
					}
				}
			} else{
				for(;i < length;){
					context = context || obj[ i ];
					if ( callback.call( context, i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
			return obj;
		},
		type: function( obj ) {
			return obj == null ?
				String( obj ) :
				class2type[ toString.call(obj) ] || "object";
		}
	};
	common.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	K.extend(common);
})(kk);/**
 * array功能对象
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-16
 * @class kk
 */
;(function(K, undefined){
	var toString = Object.prototype.toString,
		AP 		= Array.prototype,
		push 	= AP.push,
		indexOf = AP.indexOf,
		lastIndexOf = AP.lastIndexOf,
		every = AP.every,
		filter = AP.filter,
		map = AP.map,
		some = AP.some;
	K.extend({
		/**
		 * @method makeArray
		 * @param {array} array 待合并对象
		 * @param {array} results 目标数组
		 * @example
		 * 		var s = [1, 3];
		 * 		var ret = kk.makeArray(s); // [1,3]
		 * 		result = [3, 5];
		 * 		ret = kk.makeArray(s, result); // [3, 5, 1, 3]
		 * 		s = '12354';
		 * 		ret = kk.makeArray(s, result); // [3, 5, "12354"]
		 * @return {array} 返回合并之后的数组
		 */
		makeArray: function( array, results ) {
			var ret = results || [];
			if ( array != null ) {
				var type = K.type( array );
				if ( array.length == null || type === "string" || type === "function" || type === "regexp" || K.isWindow( array ) ) {
					push.call( ret, array );
				} else {
					K.merge( ret, array );
				}
			}
			return ret;
		},
		
		/**
		 * @method merge
		 * @example
		 * 		var s = [1, 3];
		 * 		var t = [2, 4];
		 * 		var ret = kk.merge(s, t); // [1, 3, 2,4]
		 * 		result = {a: 1, b: "sss"};
		 * 		ret = kk.merge(s, result); // [1, 3, 1, "sss"]
		 * @param {array} target 目标数组
		 * @param {array|object} arr 合并对象，可以数组或者对象
		 * @return {array} 返回合并后的数组
		 */
		merge: function(target, arr){
			var i = target.length,
				j = 0;
			if(typeof arr.length === "number"){
				for(var l = arr.length; j < l; j++){
					target[ i++ ] = arr[ j ];
				}
			} else{
				while(arr[j++] !== undefined){
					target[ i++ ] = arr[ j ];
				}
			}
			return target;
		},
		/**
		 * @method indexOf
		 * @example
		 * 		var number = [1, 3, 4, 3, 5, 5, 4];
		 * 		var ret = kk.indexOf(number, 4) // 2
		 * 		var ret = kk.indexOf(number, 6) // -1
		 * @param {array} arr 查询数组
		 * @param {arr} item 待查找对象
		 * @return {int} 返回item首次出现在数组的位置，优先调用原生接口
		 */
		indexOf: indexOf ?
			function(arr, item){
				return indexOf.call(arr ,item);
			}:
			function(arr, item){
				for(var i = 0, len = arr.length; i < len; i++){
					if(item === arr[i]) return i;
				}
				return -1;
			},
		/**
		 * @method lastIndeOf
		 * @example
		 * 		var number = [1, 3, 4, 3, 5, 5, 4];
		 * 		var ret = kk.lastIndeOf(number, 4) // 0
		 * 		var ret = kk.lastIndeOf(number, 6) // -1
		 * @param {array} arr 查询数组
		 * @param {arr} item 待查找对象
		 * @return {int} 从右往左，返回item首次出现在数组的位置，优先调用原生接口
		 */
		lastIndeOf: lastIndexOf ? 
			function(arr, item){
				return lastIndexOf.call(arr ,item);
			}:
			function(arr, item){
				for(var i = arr.length - 1; i >= 0; i--){
					if(item === arr[i]) return i;
				}
				return -1;
			},
		/**
		 * @method inArray
		 * @example
		 * 		var number = [1, 3, 4, 3, 5, 5, 4];
		 * 		var ret = kk.inArray(number, 4) // true
		 * @param {array} arr 查询数组
		 * @param {arr} item 待查找对象
		 * @return {boolean} 是否存在
		 */
		inArray: function (arr, item) {
            return K.indexOf(arr, item) > -1;
        },
        /**
         * @method map
         * @example
		 * 		var s = [1, 3, 4, 2];
		 * 		var ret = kk.filter(function(item, index, array){
		 * 			return (item * item);
		 * 		})
		 * 		alert(ret); // [1, 9, 16, 4]
		 * @param {array} arr 查询数组
		 * @param {function} iterator 迭代函数
		 * @param {object} context 迭代器的执行环境
		 * @return {array} 调用迭代函数处理数组中的元素，返回处理后的元素，长度与原来的相同
		 */
        map: function(arr, iterator, context){
        	var result = [];
        	if(arr == null) return result;
        	if(map && arr.map === map){
        		return arr.map(iterator, context);
        	}
        	K.each(arr, function(value, index, list) {
    	      results[results.length] = iterator.call(context, value, index, list);
    	    });
        	if (arr.length === +arr.length) results.length = arr.length;
            return results;
        },
        /**
         * @method filter
         * @example
		 * 		var s = [1, 3, 4, 2];
		 * 		var ret = kk.filter(function(item, index, array){
		 * 			return (item > 2);
		 * 		})
		 * 		alert(ret); // [3, 4]
		 * @param {array} arr 查询数组
		 * @param {function} iterator 迭代函数
		 * @param {object} context 迭代器的执行环境
		 * @return {array} 调用迭代函数处理数组中的元素，返回符合过滤条件的元素
		 */
        filter: function(arr, iterator, context){
        	var result = [];
        	if(arr == null) return result;
        	if(filter && arr.filter === filter){
        		return arr.filter(iterator, context);
        	}
        	K.each(arr, function(value, index, list) {
        		if (iterator.call(context, value, index, list)){
        			results[results.length] = value;
        		}
      	    });
        	return results;
        },
        /**
         * @method every
         * @example
		 * 		var s = [1, 3, 4, 2];
		 * 		var ret = kk.every(function(item, index, array){
		 * 			return (item > 2);
		 * 		})
		 * 		alert(ret); // false
		 * @param {array} arr 查询数组
		 * @param {function} iterator 迭代函数
		 * @param {object} context 迭代器的执行环境
		 * @return {boolean} 当数组中所有元素调用迭代函数返回true，就返回ture，否则false
		 */
        every: function(arr, iterator, context){
        	var result = true;
        	if(arr == null) return result;
        	if(every && arr.every === every){
        		return arr.every(iterator, context);
        	}
        	K.each(arr, function(value, index, list) {
        		if (!(result = result && iterator.call(context, value, index, list))) return {};
    	    });
    	    return !!result;
        },
        /**
         * @method some
         * @example
		 * 		var s = [1, 3, 4, 2];
		 * 		var ret = kk.some(function(item, index, array){
		 * 			return (item > 2);
		 * 		})
		 * 		alert(ret); // true
		 * @param {array} arr 查询数组
		 * @param {function} iterator 迭代函数
		 * @param {object} context 迭代器的执行环境
		 * @return {boolean} 当数组中至少有一个元素调用迭代函数返回true，就返回ture，否则false
		 */
        some: function(arr, iterator, context){
        	var result = false;
        	if(arr == null) return result;
        	if(some && arr.some === some){
        		return arr.some(iterator, context);
        	}
        	K.each(arr, function(value, index, list) {
        		if (result || iterator.call(context, value, index, list)) return {};
    	    });
    	    return !!result;
        }
	});
})(kk);/**
 * function功能对象
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-15
 * @class kk 
 */
;(function(K, undefined){
	var rnotwhite = /\S/;
	var isTop, textDiv, scrollIntervalId,
		isPageLoad = false,
		doc = document,
		readyCalls = [];
	
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', loaded, false);
		window.addEventListener('load', loaded, false);
	} else if (window.attachEvent) {
		window.attachEvent("onload", loaded);
		textDiv = document.createElement('div');
		try {
			isTop = window.frameElement === null;
		} catch(e){}
		if(textDiv.doscroll && isTop && window.external){
			scrollIntervalId = setInterval(function () {
                try {
                    testDiv.doScroll();
                    loaded();
                } catch (e) {}
            }, 32);
		}
	}
	if (document.readyState === "complete" || document.readyState === "interactive") {
        loaded();
    }
	
	function bind(fn, context){
		var bound,
			args,
			FP = Function.prototype,
			bind = FP.bind,
			slice = Array.prototype.slice,
			ctor = function(){};
		if(!K.isFunction(fn)) K.error('TypeError');
		if(bind === fn.bind && bind) bind.apply(fn, slice.call(arguments, 1));
		args = slice.call(arguments, 2);
		return bound = function(){
			if(!(this instanceof bound)){
				return fn.apply(context, args.concat(slice.call(arguments)));
			}
			ctor.prototype = fn.prototype;
			var self = new ctor;
			var result = fn.apply(self, args.concat(slice.call(arguments)));
			if (Object(result) === result) return result;
		    return self;
		}
	}
	/**
	 * 执行脚本
	 * @method globalEval 
	 * @param {string} data 脚本内容
	 */
	K.globalEval = function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	};
	function callReady(){
		if(isPageLoad && readyCalls.length){
			for(var i = 0; i < readyCalls.lenght; i++){
				readyCalls[i]();
			}
		}
	}
	function loaded(){
		if(!isPageLoad){
			isPageLoad = true;
			if(scrollIntervalId){
				clearInterval(scrollIntervalId);
			}
			callReady();
		}
	}
	/**
	 * dom ready
	 * @method ready
	 * @param {function} callback 回调函数
	 */
	K.ready = function(callback){
		if(isPageLoad){
			callback();
		} else{
			readyCalls.push(callback);
		}
		return this;
	};
	/**
	 * 节流函数——onscroll/onresize 等事件引起的大量计算
	 * @author addy
	 * @date 2013-09-27
	 * @method throttle
	 * @param {Function}fn
	 * @param {Int} delay
	 * @param {Int} mustRunDelay
	 * @param {Object} context
	 * @return {Function} fn
	 * @example
	 * 		window.onscroll = kk.throttle(myFun, 200, 400);
	 * 
	 */
	K.throttle = function(fn, delay, mustRunDelay, context){
		var timer = null;
		var t_start = +new Date();
		mustRunDelay = 500 || mustRunDelay;
		return function(){
			var context = context || this, args = arguments, t_curr = +new Date();
			clearTimeout(timer);
			if(t_curr - t_start >= mustRunDelay){
				fn.apply(context, args);
				t_start = t_curr;
			} else {
				timer = setTimeout(function(){
					fn.apply(context, args);
				}, 400 || delay);
			}
		};
	};
	K.bind = bind;
})(kk);
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