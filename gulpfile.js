var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var del = require('del');
var livereload = require('gulp-livereload');
var tap = require('gulp-tap');
var nodemon = require('gulp-nodemon');
var path = require('path');
var gutil = require('gulp-util');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var reactify = require('reactify');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();

var appDependencies = require('./package.json').dependencies;
var REACT_FILES = ['./front-end/react/**/*.js'];
var SASS_FILES = ['./sass/**/*.scss'];
var HTML_FILES = ['./public_html/index.html'];
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var envify = require('envify');
var fs = require('fs')


/* livereload loads this page you only get one  
 * 
 * the chrome livereload plugin needs to be installed
 * 
 */
var pageURL = 'http://localhost:3000';
var targetLocation = './public_html/built/';

var sassProcess =


    function() {

        return gulp.src('./sass/styles.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            // .pipe(uglifycss())
            .pipe(gulp.dest(targetLocation + 'css/'))


    }


gulp.task('sass-dev', function() {
    sassProcess();

});

gulp.task('clean', function() {

    del([(targetLocation + "css/"), (targetLocation + "js/")]);

});


function Bundle(envType, debugType) {


    var Bundler = browserify({
        entries: './front-end/react/index.js',
        transform: [
            ["babelify", {
                "presets": ["es2015", "react"]
            }],
            ["envify", {
                NODE_ENV: envType,
                'global': debugType,
                '_': 'purge'
            }]
        ],
        extensions: ['.js'],
        debug: debugType,
        cache: {},
        packageCache: {},
        fullPaths: false
    });
    return Bundler
        .bundle()
        .on('error', console.log);
}

gulp.task('react-build', function() {
    Bundle('development', true)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(targetLocation + 'js/'))
        .on('finish', function() {
            gutil.log("build bundle end");

        });;
});

gulp.task('react-prod', function() {
    Bundle('production', false)
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        //     .pipe(gulpif(argv.production, rename({suffix: '.min'})))
        .pipe(gulp.dest(targetLocation + 'js/'))
        .on('finish', function() {
            gutil.log("build bundle end");

        });;
});




gulp.task('simple', function(cb) {
    browserSync.init({
        server: "./public_html",
        port: 6060,
        ui: {
            port: 6061
        }
    });


});


gulp.task('frontend-serve', function(cb) {
    browserSync.init({
        server: "./public_html",
        port: 6060,
        ui: {
            port: 6061
        }
    });

    watch(SASS_FILES, function(events) {

        sassProcess()
            .on('finish', function() {
                gutil.log("processing change in css");
                browserSync.reload();

            });

    });

    watch(REACT_FILES, function(events, done) {

        gulp.start('react-build');
    });

    watch(HTML_FILES, function(events) {

        browserSync.reload();

    });

    watch(['./public_html/js/*.js', './public_html/built/js/*.js'], function(events) {

        browserSync.reload();
        console.log("react bundle finished")

    });



});



gulp.task('release', ['sass-dev', 'react-prod']); // run as gulp release --production=true for compression
gulp.task('default', ['sass-dev', 'react-build', 'frontend-serve']);
/* end frontend task ---------------------------------------- */