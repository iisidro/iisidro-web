'use strict';

// VENDOR LIBS
const runSequence = require('run-sequence');

gulp.task('default', () => {
    let preBuildTasks = ['clean'];
    let buildTasks = ['fonts', 'html', 'templates', 'scripts', 'styles'];

    runSequence(preBuildTasks, buildTasks);
});
