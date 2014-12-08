var APP_ROOT = './app/',
    DIST_ROOT = './dist/';

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    compass = require('gulp-compass'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload'),
    serveStatic = require('serve-static'),
    rev = require('gulp-rev'),
    del = require('del');

gulp.task('clean', function(cb) {
  return del(['app/statics/css/*', 'dist'], cb);
});

gulp.task('webfont', function() {
  return gulp.src(APP_ROOT + 'statics/fonts/*')
    .pipe(gulp.dest(DIST_ROOT + 'statics/fonts'));
});

gulp.task('compass', function() {
  return gulp.src(APP_ROOT + 'statics/scss/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: APP_ROOT + 'statics/css',
      sass: APP_ROOT + 'statics/scss'
    }));
});

gulp.task('usemin', ['clean', 'webfont', 'compass', 'imagemin'], function() {
  return gulp.src(APP_ROOT + '**/*.html')
    .pipe(usemin({
      css: ['concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest(DIST_ROOT));
});

gulp.task('sync', ['usemin'], function(){
  return gulp.src(APP_ROOT + '**')
    .pipe(livereload());
});

gulp.task('imagemin', function() {
  return gulp.src(APP_ROOT + 'statics/images/*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(DIST_ROOT + 'statics/images'))
});

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();
  server.use(serveStatic('.')).listen(8000, next);
});

gulp.task('watch', ['server'], function() {
  livereload.listen()
  gulp.watch(APP_ROOT + '**/*.html', ['usemin', 'sync']);
  gulp.watch(APP_ROOT + 'statics/scss/*.scss', ['compass', 'usemin', 'sync']);
  gulp.watch(APP_ROOT + 'statics/images/*', ['imagemin']);
});

gulp.task('default', ['clean', 'usemin']);
