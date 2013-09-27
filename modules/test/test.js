define(function(require, exports, module){
	var tooltip = require('tooltip');
	var tabs = require('tabs');
	var dom = require('dom');
	var event = require('event');
	var mytab = new tabs({
		tabElem: '.tab',
		panelElem: ".tab-pannel",
		timeCollection: [1, 5, 10]
	});
	var node = dom('#dd');
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
});