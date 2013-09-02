/**
 * dom元素的css类
 * 对opacity属性做相关hook,已经像素属性的相关处理，width、height等。
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-22
 * @namespance dom
 * @class dom
 */
define(function(require, exports, module){
	var partten = /-([a-z])/ig,
		div = document.createElement( "div" ),
		cssHooks = {
			opacity: {
				get:function(elem){
					return elem.style['opacity'] === '' ? '1' : elem.style['opacity'];
				}
			}
		},
		cssNumber = {
			"zIndex": 1,
			"fontWeight": 1,
			"opacity": 1,
			"zoom": 1,
			"lineHeight": 1,
			"widows": 1,
			"orphans": 1
		};
	div.innerHTML = "<a href='/a' style='top:1px;float:left;opacity:.55;'>a</a>";
	var a = div.getElementsByTagName( "a" )[ 0 ];
	var isSupportOpacity =  /^0.55$/.test( a.style.opacity );
	// 针对ie Opacity hook alpha
	if(!isSupportOpacity){
		var ropacity = /opacity=([^)]*)/;
		cssHooks.opacity = {
			get: function(elem){
				return ropacity.test( (elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
						( parseFloat( RegExp.$1 ) / 100 ) + "" : "1";
			},
			set: function(elem, value){
				var ralpha = /alpha\([^)]*\)/i;
				var style = elem.style,
				currentStyle = elem.currentStyle;
				style.zoom = 1;
				var opacity = isNaN( value ) ?
						"" :
						"alpha(opacity=" + value * 100 + ")",
					filter = currentStyle && currentStyle.filter || style.filter || "";

				style.filter = ralpha.test( filter ) ?
					filter.replace( ralpha, opacity ) :
					filter + " " + opacity;
			}
		}
	}
	/**
	 * @params {HTMLelement} elems
	 * @params {string} name
	 * @params {string} value
	 * @return {string|HTMLelement} 节点的css属性|处理后的节点
	 * 遍历处理所有节点，get方法仅返回第一个节点的属性
	 */
	function _css(elems, name, value){
		var style,
			len = elems.length;
		if(typeof len === 'undefined'){
			elems = [elems];
			len = 1;
		}
		if(value === undefined){
			return _style(elems[0], name, value);
		} else{
			for(var i = 0; i < len; i++){
				_style(elems[i], name, value);
			}
			if(len === 1){
				elems = elems[0];
			}
			return elems;
		}
	}
	/**
	 * @params {HTMLelement} elems
	 * @params {string} name
	 * @params {string} value
	 * @return {string} 节点的css属性
	 * set不返回
	 */
	function _style(elem, name, value){
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return undefined;
		}
		var name = _camelWord(name),
			style = elem.style,
			hooks = cssHooks[ name ],
			ret;
		if(name === 'float'){
			name = !!style.cssFloat ? 'cssFloat' : 'styleFloat';
		}
		// value 值存在时 设置
		if(value !== undefined){
			var type = typeof value;
			if ( type === "number" && isNaN( value ) || value == null ) {
				return;
			}
			// 像素单位px处理
			if ( type === "number" && !cssNumber[ origName ] ) {
				value += "px";
			}
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				try {
					style[name] = value;
				} catch(e) {}
			}
		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get(elem)) !== undefined ) {
				return ret;
			}
			return style[name];
		}
	}
	/**
	 * @param {string}
	 * @return {string}
	 * background-color -> backgroundColor
	 */
	function _camelWord(name){
		return name.replace( partten, _fcamelWord );
	}
	function _fcamelWord(all, word){
		return word.toUpperCase();
	}
	return {
		/**
		 * 遍历处理所有节点，get方法仅返回第一个节点的属性
		 * @method css
		 * @params {HTMLelement} elems
		 * @params {string} name
		 * @params {string} value
		 * @return {string|HTMLelement} 节点的css属性|处理后的节点
		 */
		css: _css
	};
})