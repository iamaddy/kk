define(function(require, exports, module){
	var tabs = require('../../src/components/tabs');
	var dom = require('../../src/dom/dom');
	var mytab = new tabs({
		tabElem: '.tab',
		panelElem: ".tab-pannel",
		timeCollection: [1, 5, 10]
	});
});