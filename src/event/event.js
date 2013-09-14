/**
 * @submodule event
 * @class event
 */
define(function(require, exports, module){
	function returnFalse_FN() {
		return false;
	}
	function returnTrue_FN() {
		return true;
	}
	/**
	 * 重新定义事件对象
	 */
	var Event = function(event, props){
		if(!(this instanceof Event)){
			return new Event(event, props);
		}
		if(event && event.type){
			this.originalEvent = event;
			this.type = event.type;
			this.isDefaultPrevented = (event.defaultPrevented || event.returnValue === false ||
					event.getPreventDefault && event.getPreventDefault()) ? returnTrue_FN : returnFalse_FN;
		} else {
			this.type = event;
		}
		this.timeStamp = kk.now();
		kk.extend(this, props);
	};
	Event.prototype = {
		isDefaultPrevented: returnFalse_FN,
		isPropagationStopped: returnFalse_FN,
		isImmediatePropagationStopped: returnFalse_FN,
		/**
		 * 阻止默认行为
		 */
		preventDefault: function(){
			this.isDefaultPrevented = returnTrue_FN;
			var e = this.originalEvent;
			if(!e){
				return;
			}
			e.stopPropagation ? e.preventDefault() : e.returnValue = true;
		},
		/**
		 * 停止事件传播
		 */
		stopPropagation: function(){
			this.isPropagationStopped = returnTrue_FN;
			var e = this.originalEvent;
			if(!e){
				return;
			}
			e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
		},
		/**
		 * todo
		 */
		stopImmediatePropagation: function(){
			this.isImmediatePropagationStopped = returnTrue_FN;
			this.stopPropagation();
		}
	};
	var event = {
			/**
			 * 在选择元素上绑定一个或多个事件的事件处理函数,
			 * @method add
			 * @param {HTMLElement} elems
			 * @param {String} types
			 * @param {Function} handler
			 * @param {Map} data
			 * @example
			 * 		var elem = dom('#node');
			 * 		event.add(elem, "click", function(){
						alert( 1 );
					});
					var form = dom('form');
					event.add(form, function(event) {
					  event.stopPropagation();
					});
			 */
		 add: function(elems, types, handler, data){
			 if(typeof elems === 'undefined') return;
			 if(!kk.isArray(elems)){
				 this._add(elems, types, handler, data);
			 } else{
				 var self = this;
				 kk.each(elems, function(i, item){
					 self._add(item, types, handler, data);
				 });
			 }
		 },
		_add: function(elem, types, handler, data){
			// text节点 comment节点直接返回
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
			if ( handler === false ) {
				handler = returnFalse_FN;
			} else if ( !handler ) {
				return;
			}
			types = types.split(" ");
			var handleObj = {elem: elem, handler: handler},
				fn = function( e ) {
				return e ? event.dispatch.call( elem, arguments, handleObj ) :
					undefined;
			};
			var type, i = 0;
			while((type = types[i++])){
				if ( elem.addEventListener ) {
					elem.addEventListener( type, fn, false );
				} else if ( elem.attachEvent ) {
					elem.attachEvent( "on" + type, function(){
						fn.apply(elem, arguments);
					} );
				}
			}
		},
		_remove: function(elem, types, handler){
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
			if ( handler === false ) {
				handler = returnFalse_FN;
			}
			types = types.split(" ");
			while ( (type = types[ i++ ]) ) {
				if ( elem.removeEventListener ) {
					elem.removeEventListener( type, handler, false );
				} else if ( elem.detachEvent ) {
					elem.detachEvent( "on" + type, handler );
				}
			}
		},
		/**
		 * 修正各浏览器的bug
		 */
		eventFix: function(e){
			var originalEvent = e && e[0],
				copy = originalEvent;
			e = Event( originalEvent );
			for(var prop in copy){
				if(!e[prop]){
					e[prop] = copy[prop];
				}
			}
			if(!e.target){
				e.target = e.srcElement || document;
			}
			// 节点不能是文本
			if(e.target.nodeType === 3){
				e.target = e.target.parentNode;
			}
			return e;
		},
		/**
		 * 事件方法的分派
		 */
		dispatch: function(e, handlerObj){
			e = event.eventFix(e || window.event);
			var args = [].slice.call( arguments, 0 ),
			handlerQueue = [];
			args[0] = e;
			e.delegateTarget = this;
			var ret = handlerObj.handler.apply( handlerObj.elem, args );
		}
	};
	/**
	 * @method click|mouseout|mouseover|load|focus|select|blur|mousedown|mouseup|mouseover
	 * @param {HTMLElement} elem
	 * @param {Function} fn
	 * @example
	 * 		event.click(elem, function(){
	 * 			alert(1);	
	 * 		});
	 * 		
	 * 		event.mouseout(elem, function(){
	 * 			alert(1);	
	 * 		});
	 * 		
	 * 		event.focus(elem, function(){
	 * 			alert(1);	
	 * 		});
	 * 
	 */
	kk.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup error").split(" "), function( i, name ) {
		event[ name ] = function( elem, data, fn ) {
			if ( fn == null ) {
				fn = data;
				data = null;
			}
			event.add( elem, name, fn, data );
		};
	});
	return event;
});