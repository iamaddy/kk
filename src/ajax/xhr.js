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
	 * 通过远程 HTTP GET 请求载入信息。
	 * @method get
	 * @param {string} url 请求地址
	 * @param {Map} data 发送数据
	 * @param {function} cb 回调函数
	 * @param {string} type 'json'|'text'|'xml'
	 * @example
	 * 		// 请求 test.php 网页，忽略返回值。
	 * 		kk.get("test.php");
	 * 
	 * 		// 请求 test.php 网页，传送2个参数，忽略返回值。
	 * 		kk.get("test.php", { name: "John", time: "2pm" } );
	 * 
	 * 		// 显示 test.php 返回值(HTML 或 XML，取决于返回值)。
	 * 		kk.get("test.php", function(data){
  				alert("Data Loaded: " + data);
			});
	 * @return 返回值:XMLHttpRequest
	 */
	kk.each(["get", "post"], function(i, method){
		/**
		 * 通过远程 HTTP POST 请求载入信息
		 * @method post
		 * @param {string} url 请求地址
		 * @param {object} data 发送数据
		 * @param {function} cb 回调函数
		 * @example
		 * 		//请求 test.php 页面，并一起发送一些额外的数据（同时仍然忽略返回值）
		 * 		kk.post("test.php", { name: "John", time: "2pm" } );
		 * 
		 * 		// 获得 test.php 页面返回的 json 格式的内容
		 * 		kk.post("test.php", { "func": "getNameAndTime" },
				   function(data){
				     alert(data.name); // John
				     console.log(data.time); //  2pm
				   }, "json");
		 * @param {string} type 'json'|'text'|'xml'
		 * @return 返回值:XMLHttpRequest
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
	 * 通过 HTTP GET 请求载入并执行一个 JavaScript 文件
	 * @method getScript
	 * @param {string} url 请求地址
	 * @example
	 * 		// 加载并执行 test.js ，成功后显示信息
	 * 		kk.getScript("test.js", function(){
			  alert("Script loaded and executed.");
			});
	 * @param {function} callback 回调函数
	 * @return 返回值:XMLHttpRequest
	 */
	kk.getScript = function( url, callback ) {
		return kk.get( url, undefined, callback, "script" );
	};
});