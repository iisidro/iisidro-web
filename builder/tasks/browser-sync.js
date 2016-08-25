'use strict';

// VENDOR LIBS
const fs = require('fs');
const url = require('url');
const path = require('path');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const config = require('builder/config');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.dist,
            middleware (req, res, next) {
                let fileName = url.parse(req.url);

                fileName = fileName.href.split(url.parse(req.url).search).join('');
                fileName = fileName.substr(fileName.lastIndexOf('/'));

                const defaultFiles = {
                    '': '/index.html',
                    '/': '/index.html',
                    '.html': fileName,
                    '.css': path.join('/assets/css', fileName),
                    '.js': path.join('/scripts', fileName),
                    '.eot': path.join('/assets/fonts', fileName),
                    '.woff': path.join('/assets/fonts', fileName),
                    '.ttf': path.join('/assets/fonts', fileName)
                };

                req.url = defaultFiles[path.extname(fileName)];

                return next();
            }
        },
        port: config.port,
        ui: {
            port: '3000'
        }
    });
});