var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    usemin = require('gulp-usemin'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    del = require('del');


gulp.task('clean', function(cb) {
  return del(['app/statics/css/*', DIST_ROOT], cb);
});

gulp.task('coffee', function() {
  return gulp.src(APP_ROOT + 'statics/coffee/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(APP_ROOT + 'statics/js/'));
});

gulp.task('compass', function() {
  return gulp.src(APP_ROOT + 'statics/scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: APP_ROOT + 'statics/css',
      sass: APP_ROOT + 'statics/scss'
    }));
});

gulp.task('usemin', ['clean', 'compass', 'coffee'], function() {
  gulp.src(APP_ROOT + 'statics/images/**')
    .pipe(gulp.dest(DIST_ROOT + 'statics/images'));

  gulp.src(APP_ROOT + 'statics/fonts/**')
    .pipe(gulp.dest(DIST_ROOT + 'statics/fonts'));

  gulp.src(['./bower_components/**/*.map'])
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest(DIST_ROOT + 'statics/js'));

  return gulp.src(APP_ROOT + '**/*.html')
    .pipe(usemin({
      css: ['concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('build', ['clean', 'usemin']);
gulp.task('default', ['build']);
