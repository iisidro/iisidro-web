'use strict';

// VENDOR LIBS
const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {
    global.production = true;

    return runSequence(['sass', 'html', 'images', 'js-build', 'fonts', 'copy-icons'], cb);
});