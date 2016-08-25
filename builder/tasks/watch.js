'use strict';

const gulp = require('gulp');
const config = require('builder/config');

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch(config.styles.src,                 ['sass']);
    //gulp.watch(config.images.src,                 ['imagemin']);
    //gulp.watch(config.sourceDir + 'index.html',   ['copyIndex']);
});