'use strict';
process.env.NODE_PATH = __dirname;
require('app-module-path').addPath(__dirname);

// VENDOR LIBS
let path = require('path');
let fs = require('fs');

let tasks = fs.readdirSync('builder/tasks');

tasks.forEach(function(task) {
    require(path.join('builder/tasks', task));
});