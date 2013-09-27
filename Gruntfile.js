module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		transport: {
			core : {
				options : {
					paths : ['.'],
					alias: '<%= pkg.spm.alias %>', 
					idleading : 'dist/src/'
				}
				,files : [{
					 expand: true
					,cwd : 'src/'
					,src : ['**/*.js', '!core/**/*.js']
					,filter : 'isFile'
					,dest : 'build/src'
			   }]
			},
			modules: {
				// paths：模块的路径，默认的是sea-modules，如果你构建的时候出现找不的模块的话，可能就是这里出了问题。
				// 定义模块别名，这里以grunt支持的一种模板语法来从package.json引入定义：<%= pkg.spm.alias %>
				// idleading:模块ID的前缀
				options : {
					paths : ['.'], 
					alias: '<%= pkg.spm.alias %>',
					idleading : 'dist/modules/'
				}
				,files : [{
					 expand: true
					,cwd : 'modules'
					,src : ['**/*.*']
					,filter : 'isFile'
					,dest : 'build/modules/'
			   }]
			}
		},
		concat: {
			core: {
				options : {
					 paths : ['.'], 
					 include : 'relative' 
				}
				,files : [{
					 expand: true
					,cwd : 'build/'
					,src : ['src/**/*.js']
					,filter : 'isFile'
					,dest : 'dist/'
			   }]
			},
			modules: {
				// 与transport的paths相同
				// include：relative的含义是合并采用相对路径依赖的模块
				options : {
					 paths : ['.'], 
					 include : 'all' 
				}
				,files : [{
					 expand: true
					,cwd : 'build/'
					,src : ['modules/**/*.*']
					,filter : 'isFile'
					,dest : 'dist/'
			   }]
			}
		},
		uglify : {
			modules : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['modules/**/*.js', '!modules/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean : {
            spm : ['build-modules']
        },
        watch : {
        	scripts: {
                files: ['**/*'],
                tasks: ['build-modules']
            }
        }
	});
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean', 'watch']);
	grunt.registerTask('build-modules', ['transport:modules', 'concat:modules', 'uglify:modules', 'clean', 'watch']);
	grunt.registerTask('build-core', ['transport:core', 'concat:core']);
}

