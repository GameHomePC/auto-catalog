var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        img: 'build/img/',
        js: 'build/js/'
    },
    src: {
        html: 'src/**/*.html',
        css: 'src/sass/main.scss',
        img: 'src/img/**/*.*',
        js: 'src/js/main.js'
    },
    watch: {
        html: 'src/**/*.html',
        css: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*',
        js: 'src/js/main.js'
    },
    clean: './build'
};

var serverConfig = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', function(){

    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));

});

gulp.task('sass:build', function(){

    return sass(path.src.css, { sourcemap: true, compass: true })
        .pipe(sourcemaps.write('maps', {
            sourceRoot: path.src.css,
            includeContent: false
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .on('error', function(error){
            console.error(error.message);
        });

});

gulp.task('javascript:build', function(){

    return gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));

});

gulp.task('clean', function(cb){
    rimraf(path.clean, cb);
});

gulp.task('build', [
    'html:build',
    'sass:build',
    'javascript:build'
]);

gulp.task('watch', function(){

    watch(path.watch.html, function(ev, cb){
        gulp.start('html:build');
    });

    watch(path.watch.css, function(ev, cb){
        gulp.start('sass:build');
    });

    watch(path.watch.js, function(ev, cb){
        gulp.start('javascript:build');
    });

});

gulp.task('webserver', function(){
    browserSync(serverConfig);
});

gulp.task('default', ['build', 'webserver', 'watch']);