'use strict';

// VENDOR LIBS
const gulp = require('gulp');
const path = require('path');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const config = require('builder/config');

gulp.task('images', function() {

    return gulp.src(path.join(config.src, config.images.src, '**/*.{jpeg,jpg,png,gif}'))
        .pipe(gulpif(global.production, imagemin()))
        .pipe(gulp.dest(path.join(config.dist, config.images.dest)))
        .pipe(gulpif(config.sync, browserSync.reload({stream: true, once: true})));
});