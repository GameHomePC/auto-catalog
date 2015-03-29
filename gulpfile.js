"use strict";

var gulp = require('gulp'), // подключаем галп
    concatCSS = require('gulp-concat-css'), // объединяет css файлы
    sass = require('gulp-ruby-sass'), // предпроцессор sass
    minifyCSS = require('gulp-minify-css'), // минифицируем css файлы
    rename = require('gulp-rename'), // переименовывает файлы
    notify = require('gulp-notify'), // показывает приятные подсказки
    prefixer = require('gulp-autoprefixer'), // Плагин префикс
    livereload = require('gulp-livereload'), //
    connect = require('gulp-connect'), // создание мини сервера
    sourcemaps = require('gulp-sourcemaps'), // карта map
    uglifyjs = require('gulp-uglifyjs');

// sass
gulp.task('sass', function() {
    return sass('sass/main.scss', { compass: true, style: 'expanded', sourcemap: true })
        .pipe(gulp.dest('css'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('../css', {
            sourceRoot: '/sass'
        }))
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles task complete styles' }));
});

// javascript
gulp.task('javascript', function(){
    gulp.src('js/*.js')
        .pipe(uglifyjs('index.min.js'))
        .pipe(gulp.dest('js'));
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']); // следим за папкой sass используя таск sass
    gulp.watch('js/*.js', ['javascript']); // следим за папкой js используя таск javascript
});

// default
gulp.task('default', ['sass', 'watch', 'javascript']);

