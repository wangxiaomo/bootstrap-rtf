var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
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

gulp.task('fonts', function() {
  return gulp.src([APP_ROOT + 'statics/fonts/*', './bower_components/fontawesome/fonts/*'])
    .pipe(gulp.dest(DIST_ROOT + 'statics/fonts'));
});

gulp.task('usemin', ['compass', 'coffee', 'fonts'], function() {
  gulp.src(APP_ROOT + 'statics/images/**')
    .pipe(gulp.dest(DIST_ROOT + 'statics/images'));

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

gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('./app/**/*', ['usemin']);
  gulp.watch('./dist/**/*', function(e) {
    console.log("file", e.path, "changed...");
    livereload.reload('/');
    livereload();
  });
});

gulp.task('build', ['usemin']);
gulp.task('default', ['build']);
