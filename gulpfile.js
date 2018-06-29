var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    browserSync = require('browser-sync'),
    inlineCss = require('gulp-inline-css');


//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));
});

//CONVERTE INKY
gulp.task('inky', function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inky())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));
});

//INLINE CSS
gulp.task('inline', function () {
  return gulp.src('./dist/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./dist/inlined'));
});

//Bower Livereload
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'dist' // Директория для сервера - app
        },
        notify: true // Отключаем уведомления
    });
});

//WATCH
gulp.task('default', ['browser-sync'], function() {
    gulp.watch('./scss/**/*.scss',['styles']);
    gulp.watch('./templates/**/*.html',['inky']);
});