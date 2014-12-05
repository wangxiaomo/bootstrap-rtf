var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    compass = require('gulp-compass'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev'),
    del = require('del');

gulp.task('clean', function(cb) {
  return del(['app/statics/css/*', 'dist'], cb);
});

gulp.task('compass', function() {
  return gulp.src(APP_ROOT + 'statics/scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: APP_ROOT + 'statics/css',
      sass: APP_ROOT + 'statics/scss'
    }));
});

gulp.task('usemin', ['clean', 'compass', 'imagemin'], function() {
  return gulp.src(APP_ROOT + '**/*.html')
    .pipe(usemin({
      //css: [minifyCss(), 'concat', rev()],
      //html: [minifyHtml({empty: true})],
      //js: [uglify(), rev()]
      css: ['concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('imagemin', function() {
  return gulp.src(APP_ROOT + 'statics/images/*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(DIST_ROOT + 'statics/images'))
});

gulp.task('watch', function() {
  gulp.watch(APP_ROOT + '**/*.html', ['usemin']);
  gulp.watch(APP_ROOT + 'statics/scss/*.scss', ['compass', 'usemin']);
  gulp.watch(APP_ROOT + 'statics/images/*', ['imagemin']);
});

gulp.task('default', ['usemin']);
