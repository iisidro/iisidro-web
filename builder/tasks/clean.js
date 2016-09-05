'use strict';

// VENDOR LIBS
const path = require('path');
const del = require('del');
const config = requireFromModule('config');

gulp.task('clean', function() {
    return del([config.dist]);
});
