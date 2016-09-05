'use strict';

// VENDOR LIBS
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const debowerify = require('debowerify');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const path = require('path');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

// BUILDER
const errorHandler = requireFromHelpers('error-handler');
const config = requireFromModule('config');

const build = function (file) {
    let babelifyPresets = ['es2015'];
    let bundler = browserify({
        entries: [config.scripts.src],
        debug: !(global.production),
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = bundler.transform('babelify', {presets: babelifyPresets});

    let bundle = function () {
        let stream = bundler.bundle();

        gutil.log('Bundling...');

        return stream.on('error', errorHandler)
            .pipe(source(file))
            .pipe(buffer())
            .pipe(gulpif(global.production, uglify()))
            .pipe(gulpif(!global.production, sourcemaps.write('./')))
            .pipe(gulp.dest(path.join(config.dist, config.scripts.dest)))
            .pipe(gulpif(config.sync, browserSync.reload({stream: true})));
    };

    if (!global.production) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }

    bundler.transform(babelify);
    bundler.transform(debowerify);

    return bundle();
};

gulp.task('scripts', ['templates'], () => {
    return build(_.get(config.scripts, 'rename', 'app.js'));
});
