kankan
======

xunlei kankan javascript
模块化，高扩展性

###目录结构
#### src：源码   
* ajax   
* core   
* dom    
* event    
* util   
* components

#### out: api文档
#### modules: 业务模块

###构建工具
* [ant](http://ant.apache.org/ "ant")，ant能帮助前端做些什么，合并js/css文件，调用YUI Compressor自动压缩js/css文件等等。这里只用到合并与压缩的功能，研究的不够深入，请移步[36ria](http://www.36ria.com/4411 "36ria")进一步了解。
* [grunt](http://gruntjs.com/ "grunt")。Grunt是一个自动化的项目构建工具。如果你需要重复的执行像压缩，编译，单元测试，代码检查以及打包发布的任务。那么你可以使用Grunt来处理这些任务，你所需要做的只是配置好Grunt，这样能很大程度的简化你的工作。若不喜欢英文，请移步[中文网](http://www.gruntjs.org/article/home.html "中文网")，花点时间学习下，带来的方便肯定是值得的。在源码目录中的Gruntfile.js和package.json两个文件则是grunt的配置文件，具体说明看官网。

###文档工具
[yuidoc](http://developer.yahoo.com/yui/yuidoc/ "yuidoc")，目前大部分的前端业务代码都呈现出了爆炸式的增长，业务逻辑也越来越复杂，模块越来越多。因此，为了后续的维护，需要对所有代码进行文档化。YUIDOC是用nodejs模块来实现的，并且据官方文档描述颇为简单便捷。具体可以移步到[yuidoc语法](http://yui.github.com/yuidoc/args/index.html "语法")  去学习一下。

###模块管理引擎
[seajs](http://seajs.org/docs/ "ant")提供简单、极致的模块化开发体验，尤其适合web app的应用。个人感觉对多页面的项目并不是很适用，毕竟采用采用模块化编程和传统javascript编写各有利弊。模块化后文件打包，对于刚接触的人并不是能够很快上手，所以建议根据项目的情况采取不同的策略。
