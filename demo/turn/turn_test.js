define(function(require, exports, module){
	var Turn = require('../../src/components/turn');

	var t = new Turn();
    t.init({ 
    	current:0,
    	allpage:3, 
    	step:484,
    	prev:'#bt_movierecom_pre',
    	next:'#bt_movierecom_next',
    	div:'#div_movierecom',
    	clickflag:0, 
    	offClsLeft:'off', 
    	offClsRight:'off',
    	auto:true,
		circle:true,
    	divSibling:'#div_movierecom_1',
    	time:3000,
        nav:'#nav_prefix_',
        speed:0.3
    });
});