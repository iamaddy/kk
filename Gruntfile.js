module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		transport: {
			test : {
				options : {
					idleading : 'dist/test/'
				}
				,files : [{
					 expand: true
					,cwd : 'test'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'build/test'
			   }]
			},
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
					idleading : 'dist/modules/test/'
				}
				,files : [{
					 expand: true
					,cwd : 'modules/test'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'build/modules/test'
			   }]
			}
		},
		concat: {
			test: {
				options: {
					include: 'all'
				},
				files : {
					'dist/test/test.js' : ['build/test/test.js'],
					'dist/test/test-debug.js' : ['build/test/test-debug.js']
				}
			},
			modules: {
				options : {
					include: 'all'
				}
				,files : [{
					 expand: true
					,cwd : 'build/modules/test'
					,src : ['**/*.js']
					,filter : 'isFile'
					,dest : 'dist/modules/test'
			   }]
			}
		},
		uglify : {
			modules : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/modules/test',
                        src: ['*.js'],
                        dest: 'dist/modules/test',
                        ext: '.js'
                    }
                ]
            },
            test : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/test',
                        src: ['*.js'],
                        dest: 'dist/test',
                        ext: '.js'
                    }
                ]
            }
        },
        clean : {
            spm : ['build']
        }
	});
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-cmd-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('build', ['transport', 'concat']);
}

