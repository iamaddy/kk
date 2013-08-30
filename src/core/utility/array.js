/**
 * array功能对象
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-16
 * @class array
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
					if(item === arr[i]) break
				}
				return i;
			},
		/**
		 * @method inArray
		 * @param {array} arr 查询数组
		 * @param {arr} item 待查找对象
		 * @return {boolean} 是否存在
		 */
		inArray: function (arr, item) {
            return K.indexOf(arr, item) > -1;
        },
        /**
         * @method map
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
})(kk);