// VENDOR LIBS
const path = require('path');
const config = requireFromModule('config');

gulp.task('icons', function () {
    return gulp.src([
        path.join(process.env.NODE_PATH, 'node_modules/material-design-icons/iconfont/*')
    ]).pipe(gulp.dest(path.join(config.dist, config.fonts.dest)))
});
