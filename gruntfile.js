/**
 * Created by Administrator on 2017/7/3.
 */


module.exports = function ( grunt ) {

    grunt.initConfig( {
        clean : {
            build : 'build'
        },
        copy : {
            views : {
                expand : true,
                cwd : 'views',
                src : '**/*.html',
                dest : 'build'
            },
            htmlmin_ok : {
                expand : true,
                cwd : 'build',
                src : '**/*.html',
                dest : 'build_ok'
            }
        },
        inline : {
            dist: {
                options:{
                    cssmin: true,
                    uglify: true,
                    tag: ''
                },
                expand: true,
                cwd: 'public/',
                src: ['**/*.html'],
                dest: 'build/'
            }
        },
        htmlmin : {
            release: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS : true,
                    minifyJS : true,
                    removeStyleLinkTypeAttributes : true
                },
                files: [{                                   // Dictionary of files
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'build',      // Src matches are relative to this path.<?xml version="1.0" encoding="utf-8"?>
                    src: ['**/*.html'], // Actual pattern(s) to match.
                    dest: 'build'  // Destination path prefix.
                }]
            }
        },
        critical: {
            home: {
                options: {
                    minify: true,
                    inline: true,
                    inlineImages : true,
                    extract : true,
                    base: './',
                    css: [
                        'public/assets/css/icons/icomoon/styles.css',
                        'public/assets/css/bootstrap.css',
                        'public/assets/css/core.css',
                        'public/assets/css/components.css',
                        'public/assets/css/colors.css',
                        'public/css/dd-shell-index.css',
                        'public/css/dd-content-article.css'
                    ],
                    dimensions: [{
                        height: 9000,
                        width: 5000
                    }, {
                        height: 9000,
                        width: 1500
                    }]
                },
                files: [
                   /* {src: ['views/home.html'], dest: 'build/home.html'},
                    {src: ['views/article_template_c.html'], dest: 'views/article_template.html'},*/
                    {src: ['build/evolution-of-numbers.html'], dest: 'build/evolution-of-numbers.html'}
                    ]
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-inline' );
    grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
    grunt.loadNpmTasks('grunt-critical');

    grunt.registerTask( 'build:release',
        ['clean:build',   'inline:dist', 'htmlmin:release' ] );
    grunt.registerTask( 'build:home',
        ['critical:home' ] );
    grunt.registerTask( 'build:htmlmin',
        ['htmlmin:release', 'copy:htmlmin_ok' ] );

};