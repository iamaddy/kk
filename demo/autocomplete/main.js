define(function(require, exports, module){
	var auto = require('../../src/components/autocomplete');
	var dom = require('../../src/dom/dom');
	new auto('#text', {
		source: ['a', 'asd', 'asdsad', 'avfdvdf', 'aedecdscr']
	});
	alert(dom.offset(dom('#text')).top);
});