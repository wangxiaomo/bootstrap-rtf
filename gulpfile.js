var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    compass = require('gulp-compass'),
    rev = require('gulp-rev'),
    del = require('del');


gulp.task('clean', function(cb) {
  return del(['app/static/css/*', DIST_ROOT], cb);
});

gulp.task('compass', function() {
  return gulp.src(APP_ROOT + 'static/scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: APP_ROOT + 'static/css',
      scss: APP_ROOT + 'static/scss'
    }));
});

gulp.task('usemin', ['clean', 'compass'], function() {
  return gulp.src(APP_ROOT + '**/*.html')
    .pipe(usemin({
      css: ['concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest(DIST_ROOT));
});
