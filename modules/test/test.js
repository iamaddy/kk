define(function(require, exports, module){
	var tooltip = require('../../src/components/tooltip');
	var tabs = require('../../src/components/tabs');
	var dom = require('../../src/dom/dom');
	var xu = dom('#xu');
	// console.log(xu);
	/*new tooltip({
		elem: '#xu'
	});*/
	var mytab = new tabs({
		tabElem: '.tab',
		panelElem: ".tab-pannel",
		timeCollection: [1, 5, 10]
	});
	dom.css(xu, 'background', 'yellow');
	// console.log(kk);
});