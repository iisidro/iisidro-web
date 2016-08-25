'use strict';

// VENDOR LIBS
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const config = requireFromModule('config');
const cssmin = require('gulp-minify-css');
const errorHandler = requireFromHelpers('error-handler');
const gulpif = require('gulp-if');
const path = require('path');
const sass = require('gulp-sass');

gulp.task('styles', function() {

    return gulp.src(config.styles.src)
        .pipe(sass({
            outputStyle: 'nested'
        }))
        .pipe(concat(_.get(config.styles, 'rename', 'style.css')))
        .on('error', errorHandler)
        .pipe(gulpif(global.production, cssmin()))
        .pipe(gulp.dest(path.join(config.dist, config.styles.dest)))
        .pipe(gulpif(config.sync, browserSync.reload({stream: true})));
});
