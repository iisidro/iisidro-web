// VENDOR LIBS
const gulp = require('gulp');
const path = require('path');
const config = require('builder/config');

gulp.task('copy-icons', function () {
    return gulp.src([
        path.join(process.env.NODE_PATH, 'node_modules/material-design-icons/iconfont/*')
    ]).pipe(gulp.dest(path.join(config.dist, config.fonts.dest)))
});