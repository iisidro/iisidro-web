'use strict';

// VENDOR LIBS
const glob = require('glob');
const path = require('path');

// BUILDER
const env = require('./env');

module.exports = function (config) {
    let tasks = glob.sync(path.join(__dirname, 'tasks/*'));

    env(config);

    tasks.forEach((task) => {
        require(task);
    });
};
