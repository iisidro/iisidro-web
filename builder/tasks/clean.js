'use strict';

// VENDOR LIBS
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const config = require('builder/config');

gulp.task('clean', function() {
    return del([config.dist]);
});