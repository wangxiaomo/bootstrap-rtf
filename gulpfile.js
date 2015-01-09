var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename'),
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
      sass: APP_ROOT + 'static/scss'
    }));
});

gulp.task('usemin', ['clean', 'compass'], function() {
  gulp.src(APP_ROOT + 'static/images/**')
    .pipe(gulp.dest(DIST_ROOT + 'static/images'));

  gulp.src(['./bower_components/**/*.map'])
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest(DIST_ROOT + 'static/js'));

  return gulp.src(APP_ROOT + '**/*.html')
    .pipe(usemin({
      css: ['concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('build', ['clean', 'usemin']);
gulp.task('default', ['build']);
