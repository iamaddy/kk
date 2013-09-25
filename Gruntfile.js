module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		transport: {
			core : {
				options : {
					idleading : 'dist/src/'
				}
				,files : [{
					 expand: true
					,cwd : 'src'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'build/src'
			   }]
			},
			modules: {
				options : {
					alias: '<%= pkg.spm.alias %>',
					idleading : 'dist/modules/'
				}
				,files : [{
					 expand: true
					,cwd : 'modules'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'build/modules/'
			   }]
			}
		},
		concat: {
			modules: {
				options : {
					include: 'all'
				}
				,files : [{
					 expand: true
					,cwd : 'build/modules/'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'dist/modules/'
			   }]
			}
		},
		uglify : {
			modules : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/modules/',
                        src: ['**/*.js'],
                        dest: 'dist/modules/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean : {
            spm : ['build']
        },
        watch : {
        	scripts: {
                files: ['**/*'],
                tasks: ['build']
            }
        }
	});
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build', ['transport', 'concat', 'uglify', 'watch']);
}

