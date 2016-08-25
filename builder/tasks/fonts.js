'use strict';

// VENDOR LIBS
const gulp = require('gulp');
const config = require('../config');
const path = require('path');

gulp.task('fonts', () => {
    return gulp.src(path.join(config.fonts.src, '**/*'))
        .pipe(gulp.dest(path.join(config.dist, config.fonts.dest)));
});
