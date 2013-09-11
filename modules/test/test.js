define(function(require, exports, module){
	var tooltip = require('../../src/components/tooltip');
	var tabs = require('../../src/components/tabs');
	var dom = require('../../src/dom/dom');
	var event = require('../../src/event/event');
	var mytab = new tabs({
		tabElem: '.tab',
		panelElem: ".tab-pannel",
		timeCollection: [1, 5, 10]
	});
	// var node = dom('#dd');
	function a(){
		this.node = dom('#dd');
		this.init();
	}
	a.prototype.init = function(){
		event.add(this.node, 'click', function(){
			alert(9);
		});
	}
	new a();
	// event.add(node, 'click', function(){alert(9);});
});