define(function(require, exports, module){
	var auto = require('../../src/components/autocomplete');
	var dom = require('../../src/dom/dom');
	var s = new auto('#dd', {
		source: ['a', 'asd', 'asdsad', 'avfdvdf', 'aedecdscr']
	});
	var t = new auto('#tt', {
		source: ['b', 'asbd', 'basdsad', 'avfdvbdf', 'aedecdbscr']
	});
});