'use strict';

// VENDOR LIBS
const runSequence = require('run-sequence');

gulp.task('development', (cb) => {
    let preBuildTasks = ['clean'];
    let buildTasks = ['fonts', 'html', 'templates', 'scripts', 'styles'];
    let watcherTasks = ['watch'];

    global.production = false;

    return runSequence(preBuildTasks, buildTasks, 'watch', cb);
});
