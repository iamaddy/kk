seajs.config({
	alias: {
		'jquery': 'jquery',
		'kk': './src/core/build/kankan-min'
	},
	preload: [
      'kk'
	]
});
seajs.use('dist/modules/test/test');