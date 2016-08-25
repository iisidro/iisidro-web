'use strict';
const config = {
    dist: 'dist',
    fonts: {
        src: 'fonts',
        dest: 'assets/fonts'
    },
    html: {
        src: 'application/index.html'
    },
    images: {
        src: 'images',
        dest: './build/images/'
    },
    root: __dirname,
    scripts: {
        src: 'application/index.js',
        dest: 'scripts'
    },
    server: {
        defaultIndexFile: 'index.html',
        host: 'localhost',
        port: '8080'
    },
    styles: {
        src: [
            'sass/main.scss',
            'components*/**/*.scss',
            'application/**/*.scss'
        ],
        dest: 'assets/css'
    },
    sync: true,
    templates: {
        src: [
            'application/templates/**/*.html'
        ],
        dest: 'application'
    }
};

module.exports = config;
