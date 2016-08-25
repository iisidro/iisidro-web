'use strict';

// VENDOR LIBS
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const path = require('path');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const watchify = require('watchify');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const debowerify = require('debowerify');
const errorHandler = require('builder/helpers/error-handler');
const config = require('builder/config');

const build = function (file) {
    let bundler = browserify({
        entries: [
            path.join(config.src, config.scripts.src)
        ],
        debug: !(global.production),
        cache: {},
        packageCache: {},
        fullPaths: true
    }).transform("babelify", {presets: ["es2015", "react"]});

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

gulp.task('js-build', () => {
    return build('app.js');
});