/**
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
