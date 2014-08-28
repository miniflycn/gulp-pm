var gulp = require('gulp')
  , pm = require('./');

gulp.task('default', function () {
  gulp.src('src/**/*.js')
    .pipe(pm(require('./config')))
    .pipe(gulp.dest('dest'));
});