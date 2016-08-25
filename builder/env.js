// VENDOR LIBS
const _ = require('lodash');
const requireFrom = require('requirefrom');

module.exports = function (config) {
    process.env.NODE_PATH = config.root;

    // GLOBAL METHODS
    global.requireFromModule = requireFrom('builder');
    global.requireFromHelpers = requireFrom('builder/helpers');
    global.requireFromRoot = requireFrom('');
    global.gulp = require('gulp');
    global._ = require('lodash');

    _.extend(requireFromModule('config'), config);
};
