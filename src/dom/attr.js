/**
 * dom元素的attr类
 * 对value、tabindex、boolean类属性做相关hook
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-18
 * @namespace dom
 * @class attr
 */
define(function(require, exports, module){
	var doc = kk.Env.document,
		_FOCUSABLE  = /^(?:button|input|object|select|textarea)$/i,
		_CLICKABLE  = /^a(?:rea)?$/,
		_BOOLEAN	= /^(?:checked|readonly|disabled|selected|hidden)$/,
		propFix = {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		attrFix = {
			tabindex: "tabIndex"
		},
		attrHooks = {
			tabindex: {
				get: function(elem){
					var attributeNode = elem.getAttributeNode("tabindex");
					return attributeNode && attributeNode.specified ?
						parseInt( attributeNode.value, 10 ) :
							_FOCUSABLE.test( elem.nodeName ) || _CLICKABLE.test( elem.nodeName ) && elem.href ?
							0 :
							undefined;
				}
			},
			value: {
				get: function(elem, name){
					// 针对ie6/7 button hook
					if(formHooks && elem.nodeName.toUpperCase() == 'BUTTON'){
						return formHooks.get(elem, name);
					}
					return elem.value;
				},
				set: function(){
					if(formHooks && elem.nodeName.toUpperCase() == 'BUTTON'){
						return formHooks.set(elem, name, value);
					}
					elem.value = value;
				}
			}
		},
		formHooks = attrHooks.name = {
				get: function( elem, name ) {
					var ret;
					ret = elem.getAttributeNode( name );
					// Return undefined if nodeValue is empty string
					return ret && ret.nodeValue !== "" ?
						ret.nodeValue :
						undefined;
				},
				set: function( elem, value, name ) {
					// Check form objects in IE (multiple bugs related)
					// Only use nodeValue if the attribute node exists on the form
					var ret = elem.getAttributeNode( name );
					if ( ret ) {
						ret.nodeValue = value;
						return value;
					}
				}
		},
		boolHooks = {
			// boolean属性值 属性中存在返回属性名称的小写，不存在返回undefined
			get: function(elem, name){
				return elem[propFix[name] || name] ? name.toLowerCase() : undefined;
			},
			set: function(elem, name, value){
				// 属性值为false 移除属性
				if(value === false){
					_removeAttr(elem, name);
				} else {
					var propName = propFix[name] || name;
					// 只有当元素真正存在此属性的时候  则设置该值
					if(propName in elem) elem[propName] = value;
					elem.setAttribute(name, name.toLowerCase());
				}
				return name;
			}
		},
		propHooks = {
			
		};
	function _attr(elem, name, value){
		var nType = elem.nodeType,
			hooks = attrHooks[ name ],
			ret;
		if(!elem || nType === 2 || nType === 3 || nType === 8){
			return undefined;
		}
		if(!('getAttribute' in elem)){
			return prop(elem, name, value);
		}
		// boolean 
		if( !hooks ){
			if(_BOOLEAN.test(name) && 
					(typeof value === 'boolean' || value === undefined || value.toLowerCase() === name.toLowerCase())
			){
				hooks = boolHooks;
			}
		}
		// 设置值
		if(value !== undefined){
			if(value === null){
				_removeAttr(elem, name);
				return undefined;
			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, name, value)) !== undefined ) {
				return ret;
			} else {
				elem.setAttribute(name, "" + value);
				return value;
			}
		} else if(hooks && "get" in hooks){
			return hooks.get(elem, name);
		} else {
			return elem.getAttribute( name );
		}
	}
	/**
	 * @param {HTMLelement} elem
	 * @param {string} name
	 * @param {string} value
	 * 获取或设置节点的属性（节点自定义属性）
	 */
	function _prop(elem, name, value){
		var type = elem.nodeType,
			hooks = propHooks[name],
			result;
		if(!elem || type === 2 || type === 3 || type === 8){
			return undefined;
		}
		if(value !== undefined){
			if(hooks && 'set' in hooks && (result = hooks.set(elem, name, value)) !== undefined){
				return result;
			} else {
				return (elem[name] = value);
			}
		} else {
			if(hooks && 'get' in hooks && (result = hooks.get(elem, name, value)) !== undefined){
				return result;
			} else {
				return elem[name];
			}
		}
	}
	/**
	 * @param {HTMLelement} elem
	 * @param {string} name
	 * @param {string} value
	 * @param {function} 节点属性属性处理函数_prop | _attr
	 * 获取或设置节点的属性（节点自身的原生属性、自定义属性）
	 */
	function _interface(elem, name, value, fn){
		if(kk.isString(elem)) undefined;
		var length = elem.length;
		if(!length){
			elem = [elem];
			length = 1;
		}
		// 设置多个属性
		if ( typeof name === "object" ) {
			for ( var k in name ) {
				fn( elem, k, name[k]);
			}
			return elem;
		}
		// 为对个对象设置值
		if ( value !== undefined ) {
			for ( var i = 0; i < length; i++ ) {
				fn( elem[i], name, value);
			}
			return elem;
		}
		return length ? fn( elem[0], name ) : undefined;
	}
	function _removeAttr(elem, name){
		name = attrFix[name] || name;
		if(elem.nodeType === 1){
			// 浏览器支持removeAttribute则使用 ，不支持则移除对应的属性节点
			if(elem.removeAttribute){
				elem.removeAttribute(name);
			} else {
				_access(elem, name, "");
				elem.removeAttributeNode( elem.getAttributeNode( name ) );
			}
			// 移除boolean属性同时设置属性为false
			var propName;
			if ( _BOOLEAN.test( name ) && (propName = propFix[ name ] || name) in elem ) {
				elem[ propName ] = false;
			}
		}
	}
	// 对外的接口
	return {
		/**
		 * 获取或设置节点的属性（节点的所有属性，包括非原生，自定义的属性）
		 * @method attr
		 * @param {HTMLElement[]|String|HTMLElement} elem 
		 * @param {string} name
		 * @param {value} value
		 * @return {String|undefined|Boolean} 返回节点的属性
		 */
		attr: function(elem, name, value){
			return _interface(elem, name, value, _attr);
		},
		/**
		 * 移除节点的属性
		 * @method removeAttr
		 * @param {HTMLelement} elem
		 * @param {string} name
		 */
		removeAttr: function(elem, name){
			var length = elem.length;
			for ( var i = 0; i < length; i++ ) {
				_removeAttr( elem[i], name);
			}
		},
		/**
		 * 获取或设置节点的属性（节点的自定义属性）
		 * @method prop
		 * @param {HTMLelement} elem
		 * @param {string} name
		 */
		prop: function( elem, name, value ) {
			return _interface(elem, name, value, _prop);
		},
		/**
		 * 移除节点的属性（节点的自定义属性）
		 * @method hasProp
		 * @param {HTMLelement} elem
		 * @param {string} name
		 */
		removeProp: function(elem, name){
			name = propFix[name] || name;
			var length = elem.length;
			for ( var i = 0; i < length; i++ ) {
				try{
					elem[i][name] = undefined;
					delete elem[i][name];
				}catch(e){}
			}
		},
		/**
		 * 判断时候含有指定属性
		 * @method hasProp
		 * @param {HTMLelement} elem
		 * @param {string} name
		 */
		hasProp: function(elem, name){
			var length = elem.length,
				el;
			for (i = 0; i < len; i++) {
                el = elems[i];
                if (_prop(el, name) !== undefined) {
                    return true;
                }
            }
            return false;
		}
	};
});