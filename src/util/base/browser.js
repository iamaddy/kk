define(function(require, exports, module){
	var engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,
		ver: null
	};
	var browser = {
		ie: 0,
		firefox: 0,
		safari: 0,
		konq: 0,
		opera: 0,
		chrome: 0,
		ver: null
	};
	var system ={
		win: 0,
		mac: 0,
		x11: 0,
		iphone: 0,
		ipod: 0,
		ipad: 0,
		ios: 0,
		android: 0,
		nokiaN: 0,
		winMobile: 0,
		wii: 0,
		ps: 0
	};
	var ua = navigator.userAgent;
	if(window.opera){
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	} else if(/AppleWebkit\/(\S+)/.test(ua)){
		engine.ver = RegExp("$1");
		engine.webkit = parseFloat(engine.ver);
	}
});