'use strict';

// VENDOR LIBS
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const errorHandler = require('builder/helpers/error-handler');
const config = require('builder/config');
const cssmin = require('gulp-minify-css');

gulp.task('sass', function() {

    return gulp.src(config.styles.src)
        .pipe(sass({
            sourceComments: (global.production),
            sourceMap: (global.production) ? false : 'sass',
            outputStyle: 'nested'
        }))
        .pipe(concat('style.css'))
        .on('error', errorHandler)
        .pipe(gulpif(global.production, cssmin()))
        .pipe(gulp.dest(path.join(config.dist, config.styles.dest)))
        .pipe(gulpif(config.sync, browserSync.reload({stream: true})));
});