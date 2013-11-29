/**
 * 类付费首页新片首播轮播图效果
 *
 * @module turn
 * @author lijunjun
 * @version 1.0
 * @example 
 	var t = new Turn();
    t.init({ 
    	current:0,//当前位置
    	allpage:3, //轮播图总数
    	step:484,//像素位移数
    	prev:'bt_movierecom_pre',//点击左箭头ID
    	next:'bt_movierecom_next',//点击右箭头ID
    	div:'div_movierecom',//轮播图父节点ID
    	clickflag:0, //轮播是否正在移动中，默认为0
    	offClsLeft:'off', //左箭头不可点击时添加class
    	offClsRight:'off',//右箭头不可点击时添加class
    	auto:true,//是否自动轮播
    	divSibling:'div_movierecom_1',//和自动轮播有关，复制轮播图节点内容的兄弟节点ID
    	time:3000,//自动轮播间隔,
    	nav:'nav_',
        speed:0.3//移动动画经历的时间
    });
 */
define(function(require, exports, module){
	var d   = require('../dom/dom'),
	    event = require('../event/event');
	    FX  = require('../anim/node');

	function Turn(){
		this.config = {},
		this.node = {},
		this.interval = 0
	}

	Turn.prototype = {
		/**
         * 初始化轮播图配置
         *
         * @method module:turn#init
         * @param {Object} config
         */
		init: function(config){
			for(conf in config){
				this.config[conf] = config[conf];
			}

			this.node = new FX.Node(d(this.config.div)[0]);

			if(this.config.circle === true){
                if(this.config.valign === true){
					d.html(d(this.config.div), d.html(d(this.config.div)) + d.html(d(this.config.div)));
                }else{
					d.html(d(this.config.divSibling), d.html(d(this.config.div)));
                }
                if(this.config.auto === true){
                    this.auto();
                }
			}

			var _self = this;
			if(this.config.prev !== undefined){
				event.add(d(config.prev), 'click', function(){
					_self.pre();
				});
				if(this.config.auto === true){
					event.add(d(config.prev), 'mouseover', function(){
						_self.stop();
					});
					event.add(d(config.prev), 'mouseout', function(){
						_self.auto();
					});
				}
			}

			if(this.config.next !== undefined){
				event.add(d(config.next), 'click',  function(){
					_self.next();
				});
				if(this.config.auto === true){
					event.add(d(config.next), 'mouseover', function(){
						_self.stop();
					});
					event.add(d(config.next), 'mouseout', function(){
						_self.auto();
					});
				}
			}

			if(this.config.nav !== undefined){
				for(var i=0;i<this.config.allpage;i++){
					(function(i){
						event.add(d(_self.config.nav+i), 'click',  function(){
							_self.go(i);
						});
					})(i);
				}				
			}
		},

		/**
         * 轮播图向前滚动
         *
         * @method module:turn#pre
         */
		pre: function(){
			if(this.config.clickflag > 0){
				return;
			}

			if(!this.config.circle && this.config.current==0){
				return;
			}else{
				this.go(this.config.current-1);
			}
		},

		/**
         * 轮播图向后滚动
         *
         * @method module:turn#next
         */
		next: function(){		
			if(this.config.clickflag > 0){
				return;
			}

			if(!this.config.circle && this.config.current==this.config.allpage-1){
				return;
			}else{			
				this.go(this.config.current+1);
			}
		},

		/**
         * 轮播图自动向后滚动
         *
         * @method module:turn#auto
         */
		auto: function(){
			var _self = this;
			this.interval = setInterval(function(){_self.next();}, this.config.time);
		},

		/**
         * 轮播图停止移动
         *
         * @method module:turn#stop
         */
		stop: function(){
			clearInterval(this.interval);
		},

		/**
         * 轮播图移动到指定的图片位置
         *
         * @method module:turn#go
         * @param {Num} index
         */
		go: function(index){
			if(this.config.current === index){
				return;
			}
			this.config.clickflag = 1;
			var go = 0;
			if(index>=this.config.allpage){
				go = -(this.config.allpage * this.config.step);
			}else if(index<0){
                if(this.config.valign === true){
                    d.css(d(this.config.div), 'top', -(this.config.allpage * this.config.step)+'px');
                }else{
                    d.css(d(this.config.div), 'margin-left', -(this.config.allpage * this.config.step)+'px');
                }
				go = -((this.config.allpage-1) * this.config.step);
			}else{
				go = -(index * this.config.step);
			}
			//FX的animate方法调整marginleft
			var _self = this, move_attributes;
            if(this.config.valign === true){
                move_attributes = {'top':{to:go}};
            }else{
                move_attributes = {'marginLeft':{to:go}};
            }
			this.node.animate({
	            duration:this.config.speed,
				attributes:move_attributes,
				callback:function(){
					_self.config.clickflag = 0;
					if(index>=_self.config.allpage){
						_self.config.current = 0;
						setTimeout(function(){
                            if(_self.config.valign === true){
                                d.css(d(_self.config.div), 'top', '0px');	
                            }else{
                                d.css(d(_self.config.div), 'margin-left', '0px');
                            }
						});
					}else if(index<0){
						_self.config.current = _self.config.allpage-1;

					}else{
						_self.config.current = index;
					}
					
					if(_self.config.nav !== undefined){
						for(var i=0;i<_self.config.allpage;i++){
							if(_self.config.current === i){
								d.addClass(d(_self.config.nav+i), 'on');
							}else{
								d.removeClass(d(_self.config.nav+i), 'on');
							}
						}						
					}
				}
			});
			if(!this.config.auto){
				if(index>=this.config.allpage-1){			
					d.addClass(d(this.config.next), this.config.offClsRight);
					d.removeClass(d(this.config.prev), this.config.offClsLeft);
				}else if(index<=0){
					d.removeClass(d(this.config.next), this.config.offClsRight);
					d.addClass(d(this.config.prev), this.config.offClsLeft);	
				}else{
					d.removeClass(d(this.config.next), this.config.offClsRight);
					d.removeClass(d(this.config.prev), this.config.offClsLeft);			
				}
			}
			
		}
	}

	//return Turn;
	module.exports = Turn;
})