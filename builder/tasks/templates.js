'use strict';

// VENDOR LIBS
const browserSync = require('browser-sync');
const config = requireFromModule('config');
const gulpif = require('gulp-if');
const path = require('path');
const templateCache = require('gulp-angular-templatecache');

gulp.task('templates', () => {
    let src = _.get(config.templates, 'src');
    let templatedDestination = _.get(config.templates, 'dest', 'application');
    let files;

    return gulp.src(src)
        .pipe(templateCache({
            templateHeader: 'module.exports.injectTemplatesTo = (angularModule) => { angularModule.run(["$templateCache", function($templateCache) {',
            templateFooter: '}]); };'
        }))
        .pipe(gulp.dest(templatedDestination));
});
