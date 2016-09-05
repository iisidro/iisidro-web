'use strict';

// VENDOR LIBS
const config = requireFromModule('config');

gulp.task('watch', ['browser-sync'], function() {
    let templatesFolderPattern = _.get(config.templates, 'folder', 'templates');

    gulp.watch(_.get(config.styles, 'src'), ['styles']);
    gulp.watch(_.get(config.html, 'src', 'application/index.html'), ['html']);
    gulp.watch(_.get(config.templates, 'src'), ['templates']);
});
