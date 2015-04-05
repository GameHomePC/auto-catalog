var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    imagemin = require("gulp-imagemin"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        img: 'build/images/',
        js: 'build/js/'
    },
    src: {
        html: 'src/**/*.html',
        css: 'src/sass/main.scss',
        img: 'src/images/**/*.*',
        js: 'src/js/**/*.js'
    },
    watch: {
        html: 'src/**/*.html',
        css: 'src/sass/**/*.scss',
        img: 'src/images/**/*.*',
        js: 'src/js/main.js'
    },
    clean: './build'
};

var serverConfig = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000
};

/* html */
gulp.task('html:build', function(){

    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));

});

/* sass */
gulp.task('sass:build', function(){

    return sass(path.src.css, { sourcemap: false, compass: true })
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .on('error', function(error){
            console.error(error.message);
        });

});

/* javascript */
gulp.task('javascript:build', function(){

    return gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));

});

/* images */
gulp.task('images:build', function(){

    return gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));

});

gulp.task('clean', function(cb){
    rimraf(path.clean, cb);
});

/* build */
gulp.task('build', [
    'html:build',
    'sass:build',
    'javascript:build',
    'images:build'
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

