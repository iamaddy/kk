<html>
<head>
<style type="text/css">
.ui-tooltip{
	border-radius: 4px;
	border: 1px solid #aaaaaa;
	padding: 8px;
	position: absolute;
	z-index: 9999;
	max-width: 300px;
	-webkit-box-shadow: 0 0 5px #aaa;
	box-shadow: 0 0 5px #aaa;
}
.tab-pannel {
width: 599px;
padding: 10px;
}
.tab-content {
width: 599px;
overflow: hidden;
border: 1px solid #66cc66;
border-top: 0px;
}
ul.tab-nav {
text-align: left;
margin: 1em 0 0em 0;
font: bold 11px verdana, arial, sans-serif;
border-bottom: 1px solid #6c6;
list-style-type: none;
padding: 3px 10px 3px 10px;
}
ul.tab-nav {
text-align: left;
font: bold 11px verdana, arial, sans-serif;
list-style-type: none;
}
ul.tab-nav li {
display: inline;
}
ul.tab-nav li a {
padding: 3px 4px;
border: 1px solid #6c6;
background-color: #cfc;
color: #666;
margin-right: 0px;
text-decoration: none;
border-bottom: none;
}
li.on a {
border-bottom: 1px solid #fff !important;
background-color: #fff !important;
}
ul.tab-nav a:hover {
background: #fff;
}
</style>
</head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body>
	<a id="xu" data-title="你妹啊 ，是吧" style="background: red;">haha</a>
	<input id="tt" type="radio"/>
	<a id="xiao">啊实打实的<span>asdsd</span></a>
	<a class="dang"></a>
	<div id="p"><a class="dang">nishi</a>&</div>
	<p><textarea  name="url" id="code" type="text">11</textarea></P>
	<div id="Jtab">
	  <ul class="tab-nav">
		<li class="tab" id="tab_0"><a href="#">Tab One</a></li>
		<li class="tab" id="tab_1"><a href="#">Tab Two</a></li>
		<li class="tab" id="tab_2"><a href="#">Tab Three</a></li>
	</ul>
  <div class="tab-content">
	<div class="tab-pannel"><p>Tab One ContentTab One ContentTab One ContentTab One Content</p></div>
    <div class="tab-pannel"><p>Tab Two ContentTab Two ContentTab Two ContentTab Two ContentTab Two Content</p></div>
	<div class="tab-pannel"><p>sdfsdfds</p></div>
  </div>
</div>
</body>
<script>
var node = document.getElementById('tab_0');
</script>
<script type="text/javascript" src="sea.js"></script>
<script type="text/javascript">
seajs.config({
	alias: {
		'jquery': './lib/jquery',
		'kk': './src/core/build/kankan-min'
	},
	preload: [
      'kk',
      'jquery'
	]
});
seajs.use('modules/test/test');
</script>
</html>