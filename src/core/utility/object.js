/**
 * object功能对象，包括继承等
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-10
 * @class object
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
})(kk);