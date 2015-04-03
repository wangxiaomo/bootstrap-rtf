USE_COFFEE = false
UGLIFY = true
IMGMIN_OPTIMIZATION_LEVEL = 3

gulp       = require('gulp')
gutil      = require('gulp-util')
livereload = require('gulp-livereload')
usemin     = require('gulp-usemin')
compass    = require('gulp-compass')
coffee     = require('gulp-coffee')
uglify     = require('gulp-uglify')
minifyHTML = require('gulp-minify-html')
imagemin   = require('gulp-imagemin')
rename     = require('gulp-rename')
del        = require('del')


gulp.task 'clean', (cb) ->
  paths = [
    'app/statics/css/*'
    'dist'
  ]
  paths.push 'app/statics/js/*' if USE_COFFEE
  del paths, cb

gulp.task 'coffee', () ->
  if USE_COFFEE
    gulp.src 'app/statics/coffee/**/*.coffee'
      .pipe coffee({bare: true}).on 'error', gutil.log
      .pipe gulp.dest 'app/statics/js'

gulp.task 'compass', () ->
  gulp.src 'app/statics/scss/**/*.scss'
    .pipe compass({
      config_file : 'config.rb'
      css         : 'app/statics/css'
      sass        : 'app/statics/scss'
    })

gulp.task 'fonts', () ->
  gulp.src([
    'app/statics/fonts/*'
    'bower_components/fontawesome/fonts/*'
  ]).pipe gulp.dest 'dist/statics/fonts'

gulp.task 'source-maps', () ->
  gulp.src 'bower_components/**/*.map'
    .pipe rename({dirname: ''})
    .pipe gulp.dest 'dist/statics/js'

gulp.task 'images', () ->
  gulp.src 'app/statics/images/**/*'
    .pipe imagemin({optimizationLevel: IMGMIN_OPTIMIZATION_LEVEL})
    .pipe gulp.dest 'dist/statics/images'

gulp.task 'usemin', ['compass', 'coffee', 'fonts', 'source-maps', 'images'], () ->
  opts = {}
  if UGLIFY
    opts =
      html: [minifyHTML({empty: true})]
      js:   [uglify()]
  gulp.src 'app/**/*.html'
    .pipe usemin(opts)
    .pipe gulp.dest 'dist'

gulp.task 'watch', () ->
  livereload.listen()

  gulp.watch 'app/**/*', ['usemin']
  gulp.watch 'dist/**/*', (e) ->
    console.log "file", e.path, "changed..."
    livereload.reload '/'
    livereload()

gulp.task 'default', ['usemin']
