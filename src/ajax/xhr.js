/**
 * ajax 封装
 * @author xubin
 * @date 2013-8-9
 * @class xhr
 */
define(function(require, exports, module){
	var rhash = /#.*$/,
		rquery = /\?/,
		rspacesAjax = /\s+/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//;
	// 参数设置
	var ajaxSettings = {
		type: "GET",
		async: true,
		converters: {
			"text": window.String,
			"html": true,
			"json": kk.parseJSON,
			"script": function( text ) {
				kk.globalEval( text );
				return text;
			}
		}
	};
	// 创建XHR对象
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}

	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}

	ajaxSettings.xhr = window.ActiveXObject ?
		function() {
			return createStandardXHR() || createActiveXHR();
		} : createStandardXHR;
	
	function init(target, settings){
		if ( !settings ) {
			settings = target;
			target = kk.extend( true, ajaxSettings, settings );
		} else {
			kk.extend( true, target, ajaxSettings, settings );
		}
		return target;
	}
	// 数据格式转化
	function ajaxConvert(s, response){
		var dataTypes = s.dataTypes,
			current = dataTypes[ 0 ],
			conv;
		conv = s.converters[ current ];
		response = conv && conv( response.text );
		return response;
	}
	function ajax(url, options){
		if(typeof url === "object"){
			options = url;
			url = undefined;
		}
		options = options || {};
		var s = init( {}, options );
		s.url = (( url || s.url ) + "").replace( rhash, "" );
		
		s.dataTypes = kk.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );
		
		if ( s.data && typeof s.data !== "string" ) {
			s.data = kk.param( s.data );
		}
		
		s.type = s.type.toUpperCase();
		s.hasContent = !rnoContent.test( s.type );
		// get
		if ( !s.hasContent ) {
			if(s.data){
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
			}
		}
		/**
		 * 请求完成
		 */
		function done(status, statusText, responses){
			if ( status >= 200 && status < 300 || status === 304 ) {
				if ( status === 304 ) {
					statusText = "notmodified";
					isSuccess = true;
				} else {
					try {
						success = ajaxConvert( s, responses );
						statusText = "success";
						isSuccess = true;
						// 执行回调
						s.success(success);
					} catch(e) {
						statusText = "parsererror";
					}
				}
			} else {
				if( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}
		}
		send(s, done);
	}
	/**
	 * 发送请求
	 */
	function send(s, complete){
		var xhr = s.xhr();
		xhr.open( s.type, s.url, s.async );
		xhr.send( ( s.hasContent && s.data ) || null );
		callback = function(){
			var status,
				statusText,
				responses,
				xml;
			try{
				if ( callback && xhr.readyState === 4 ) {
					callback = undefined;
				
					status = xhr.status;
					responses = {};
					xml = xhr.responseXML;
					
					if ( xml && xml.documentElement ) {
						responses.xml = xml;
					}
					responses.text = xhr.responseText;
					try {
						statusText = xhr.statusText;
					} catch( e ) {
						statusText = "";
					}
					if ( !status ) {
						status = responses.text ? 200 : 404;
					} else if ( status === 1223 ) {
						status = 204;
					}
				}
			} catch(e) {}
			if (responses) {
				complete( status, statusText, responses );
			}
		};
		if ( !s.async || xhr.readyState === 4 ) {
			callback();
		} else {
			xhr.onreadystatechange = callback;
		}
	}
	/**
	 * get请求
	 * @method get
	 * @param {string} url 请求地址
	 * @param {object} data 发送数据
	 * @param {function} cb 回调函数
	 * @param {string} type 'json'|'text'|'xml'
	 */
	kk.each(["get", "post"], function(i, method){
		/**
		 * post 请求
		 * @method post
		 * @param {string} url 请求地址
		 * @param {object} data 发送数据
		 * @param {function} cb 回调函数
		 * @param {string} type 'json'|'text'|'xml'
		 */
		kk[method] = function(url, data, cb, type){
			if(kk.isFunction(data)){
				type = type || cb;
				cb = data;
				data = undefined;
			}
			return ajax({
				type: method,
				url: url,
				data: data,
				success: cb,
				dataType: type
			});
		}
	});
	/**
	 * 获取javascript脚本
	 * @method getScript
	 * @param {string} url 请求地址
	 * @param {function} callback 回调函数
	 */
	kk.getScript = function( url, callback ) {
		return kk.get( url, undefined, callback, "script" );
	};
});