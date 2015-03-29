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
    sourcemaps = require('gulp-sourcemaps'); // карта map

// styles
gulp.task('sass', function() {
    return sass('sass/main.scss', { compass: true, style: 'expanded', sourcemap: true })
        .pipe(gulp.dest('css'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(notify({ message: 'Styles task complete styles' }));
});

// watch
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']); // следим за папкой css используя таск css
});

// default
gulp.task('default', ['sass', 'watch']);

