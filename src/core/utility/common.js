/**
 * kk的公共模块，类型检测等功能
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-15
 * @class common
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
})(kk);