// VENDOR LIBS
const gulp = require('gulp');
const config = require('builder/config');

gulp.task('html', function () {
    return gulp.src('builder/helpers/index.html')
        .pipe(gulp.dest(config.dist))
});