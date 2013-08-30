/**
 * dom元素的class类
 * @author xubin
 * @mail xuaddy@gmail.com
 * @date 2013-7-18
 * @namespace dom
 * @class class
 */
define(function(require, exports, module){
	var cla = {
		/**
		 * 获取查询节点的class
		 * @method getClass
		 * @param {element| HTMLElement} node节点元素
		 * @return {string} 第一个节点的class
		 */
		getClass: function(node){
			node = singleNode(node);
			return node.className;
		},
		/**
		 * 增加查询节点指定的class
		 * @method addClass
		 * @param {element| HTMLElement} nodes节点元素
		 * @param {string} classname 样式名称
		 * @return {element| HTMLElement}nodes 增加样式后的节点
		 */
		addClass: function(nodes, classname){
			if(typeof classname === 'undefined' || typeof nodes === 'undefined') return;
			if(typeof nodes.length === 'undefined'){
				nodes = [nodes];
			}
			for(var i = 0, len = nodes.length; i < len; i++){
				var node = nodes[i];
				if(node.classList){
					kk.each(classname.split(' '), function(i, item){
						node.classList.add(item);
					});
				} else{
					node.className += ' ' + classname;
				}
			}
			if(nodes.length === 1){
				nodes = nodes[0];
			}
			return nodes;
		},
		/**
		 * 移除查询节点指定的class
		 * @method removeClass
		 * @param {element| HTMLElement} nodes节点元素
		 * @param {string} classname 样式名称
		 * @return {element| HTMLElement}nodes 移除样式后的节点
		 */
		removeClass: function(nodes, classname){
			if(typeof classname === 'undefined' || typeof nodes === 'undefined') return;
			if(typeof nodes.length === 'undefined'){
				nodes = [nodes];
			}
			for(var i = 0, len = nodes.length; i < len; i++){
				var pos,
					node = nodes[i];
				if(node.classList){
					kk.each(classname.split(' '), function(i, item){
						node.classList.remove(item);
					});
				} else{
					if((pos = findClassPos(node, classname)) > -1){
						var classNames = node.className.split(' ');
						classNames.splice(pos, 1);
						node.className = classNames.join(" ");
					}
				}
			}
			if(nodes.length === 1){
				nodes = nodes[0];
			}
			return nodes;
		},
		/**
		 * 查询节点时候存在指定class
		 * @method containsClass
		 * @param {element| HTMLElement} node节点元素
		 * @param {string} classname 样式名称
		 * @return {boolean} 是否存在指定样式
		 */
		containsClass: function(node, classname){
			if(typeof classname === 'undefined' || typeof node === 'undefined') return;
			node = singleNode(node);
			if(node.classList){
				node.classList.contains(classname);
			} else{
				return findClassPos(node, classname) > -1 ? true : false;
			}
		},
		/**
		 * 查询节点时候存在指定class
		 * @method hasClass
		 * @param {element| HTMLElement} node节点元素
		 * @param {string} classname 样式名称
		 * @return {boolean} 是否存在指定样式
		 */
		hasClass: this.containsClass,
		/**
		 * 切换当前节点的class
		 * @method toggleClass
		 * @param {element| HTMLElement} nodes节点元素
		 * @param {string} classname 样式名称
		 * @return {element| HTMLElement}nodes 切换样式后的节点
		 */
		toggleClass: function(nodes, classname){
			if(typeof classname === 'undefined' || typeof nodes === 'undefined') return;
			if(typeof nodes.length === 'undefined'){
				nodes = [nodes];
			}
			for(var i = 0, len = nodes.length; i < len; i++){
				var node = nodes[i];
				if(node.classList){
					node.classList.toggle(classname);
				} else{
					if( findClassPos(node, classname) > -1){
						this.removeClass(classname);
					} else{
						this.addClass(classname);
					}
				}
			}
			if(nodes.length === 1){
				nodes = nodes[0];
			}
			return nodes;
		}
	};
	// 返回第一个节点
	function singleNode(node){
		if(typeof node.length === 'undefined') return node;
		if(node.length && node.length > 0){
			node = node[0];
		}
		return node;
	}
	/**
	 * 查找class的位置
	 * @param node
	 * @param {string} className
	 * @return {int}
	 */
	function findClassPos(node, classname){
		var oriClassNames = node.className.split(/\s+/);
		var pos = -1,
			i, len;
		for(i = 0, len = oriClassNames.length; i < len; i++){
			if(oriClassNames[i] == classname){
				pos = i;
				break;
			}
		}
		return pos;
	}
	return cla;
});