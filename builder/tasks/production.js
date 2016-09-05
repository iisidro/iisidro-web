'use strict';

// VENDOR LIBS
const runSequence = require('run-sequence');

gulp.task('default', (cb) => {
    let preBuildTasks = ['clean'];
    let buildTasks = ['icons', 'fonts', 'html', 'templates', 'scripts', 'styles'];

    global.production = true;

    return runSequence(preBuildTasks, buildTasks, cb);
});
