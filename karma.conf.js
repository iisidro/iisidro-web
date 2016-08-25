var aliases = require('./package.json').aliasify.aliases;
var dirnameRegExp = new RegExp(__dirname);
var coverageifyConfig = {
    ignores: [
        /\.json$/,
        /-test.js/,
        /-mock.js/
    ],
    contains: [
        dirnameRegExp
    ]
};

process.env.NODE_PATH = __dirname;

module.exports = function(config) {
    config.set({

        basePath: './',

        frameworks: ['browserify', 'mocha'],

        files: [
            'node_modules/react-tools/src/test/phantomjs-shims.js',
            'test-utils/globals.js',
            'application*/**/_tests/*-test.js',
            'components*/**/_tests/*-test.js',
            'libs*/**/_tests/*-test.js'
        ],

        preprocessors: {
            'test-utils/globals.js': [ 'browserify' ],
            'application*/**/_tests/*-test.js': [ 'browserify' ],
            'components*/**/_tests/*-test.js': [ 'browserify' ],
            'libs*/**/_tests/*-test.js': [ 'browserify' ]
        },

        browserify: {
            debug: true,
            transform: [ ['coverageify', coverageifyConfig], [ 'rewireify' ], 'aliasify' ]
        },

        browsers : ['PhantomJS'],

        reporters: ['progress', 'coverage'],

        coverageReporter : {
            dir: 'test-coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'cobertura', subdir: 'cobertura'}
            ]
        },

        logLevel: config.LOG_ERROR,

        singleRun: false,

        autoWatch: true
    });
};