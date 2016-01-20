"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    browserSync = require('browser-sync'),
    clean = require('gulp-clean'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    less = require('gulp-less'),

    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'app/*.html',
        js: 'app/js/*.js',
        style: 'app/less/main.less',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        style: 'app/less/**/*.less',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    }
};


var config = {  // конфиг для запуска локального сервера
    server: {
        baseDir: "./app"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

// ********************************** Таски **********************************

gulp.task('connect', function () {  // запускаем сервер с liveReload
    browserSync(config);
});

gulp.task('clean', function () {    // очищаем папку production`a
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('fonts', function() {     // отправляем шрифры в dist без изменений
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('img', function() {   // отправляем img в dist без изменений
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
});

gulp.task('dist', ['fonts', 'img'], function () { // отправляем на production
    return gulp.src(path.src.html)
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist:uncss', function () {   // удаляем неиспользуемые стили
    return gulp.src('dist/css/*.css')
        .pipe(uncss({
            html: ['app/index.html', 'http://localhost:63342']
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function () {     // перезагрузим наш сервер для обновлений при изменении html
    gulp.src('app/index.html')
        .pipe(reload({stream: true}));
});

gulp.task('less', function() {  // Конвертируем LESS в CSS
    gulp.src(path.src.style)
        .pipe(less())
        .pipe(prefixer())   // добавляем префиксы для 2 последних версий браузеров
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream: true}));

});

gulp.task('watch', function () {    // отслеживаем изменения файлов
    gulp.watch(path.watch.style, ['less']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.js, ['html']);
});

// Default
gulp.task('default', ['connect', 'watch']);