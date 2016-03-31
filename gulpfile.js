'use strict';

const addsrc     = require('gulp-add-src')
    , babel      = require('gulp-babel') // also need babel-preset-es2015
    , cleanCSS   = require('gulp-clean-css')
    , concat     = require('gulp-concat')
    , gulp       = require('gulp')
    , gutil      = require('gulp-util')
    , ngAnnotate = require('gulp-ng-annotate')
    , rimraf     = require('rimraf')
    , uglify     = require('gulp-uglify');

const paths = {
  fileSrc: 'source/*',
  jsSrc: 'source/*.js',
  cssSrc: 'source/*.css',
  dest: 'public',
}

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function() {
  gulp.watch(paths.fileSrc, ['build']);
});

gulp.task('build', ['clean'], function() {
  gulp.src(paths.jsSrc)
    .pipe(concat('bundle.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
  gulp.src(paths.cssSrc)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function(cb) {
  rimraf(paths.dest, cb);
});
