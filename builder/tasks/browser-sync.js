'use strict';

// VENDOR LIBS
const browserSync = require('browser-sync');
const config = requireFromModule('config');
const fs = require('fs');
const path = require('path');
const url = require('url');

gulp.task('browser-sync', function() {
    let host = _.get(config.server, 'host', 'localhost');
    let port = _.get(config.server, 'port', '8080');
    let defaultIndexFile = '/' + _.get(config.server, 'defaultIndexFile', 'index.html');

    browserSync.init({
        port: port,
        server: {
            baseDir: _.get(config, 'dist', 'dist'),
            middleware (req, res, next) {
                let fileName = url.parse(req.url);

                fileName = fileName.href.split(fileName.search).join('');

                try {
                    fs.statSync(path.join(config.root, config.dist + fileName));
                } catch (error) {
                    req.url = defaultIndexFile;
                }

                return next();
            }
        }
    });
});
