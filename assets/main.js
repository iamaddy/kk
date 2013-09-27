define(function(require, exports, module){
	$('#nav > li').first().children().addClass('active');
	$(window).on('scroll', function(){
		var height = $(document).scrollTop();
		if( height < 478 * 2 &&　height　> 478){
			$('#nav > li').find('a').removeClass('active');
			$('#nav > li').eq(1).children().addClass('active');
		} else if(height < 478 * 3 && height > 478 * 2){
			$('#nav > li').find('a').removeClass('active');
			$('#nav > li').eq(2).children().addClass('active');
		} else if(height < 478 * 4 && height > 478 * 3){
			$('#nav > li').find('a').removeClass('active');
			$('#nav > li').eq(3).children().addClass('active');
		}else{
			$('#nav > li').find('a').removeClass('active');
			$('#nav > li').eq(0).children().addClass('active');
		}
	});
});