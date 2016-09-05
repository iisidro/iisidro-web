'use strict';

// VENDOR LIBS
const browserSync = require('browser-sync');
const config = requireFromModule('config');
const gulpif = require('gulp-if');
const path = require('path');

gulp.task('html', function () {
    let src = _.get(config.html, 'src', 'application/index.html');

    return gulp.src(src)
        .pipe(gulp.dest(config.dist))
        .pipe(gulpif(config.sync, browserSync.reload({stream: true})));
});
