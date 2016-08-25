'use strict';

// VENDOR LIBS
const notify = require('gulp-notify');

module.exports = function (error) {

    if (!global.production) {
        let args = Array.prototype.slice.call(arguments);

        notify.onError({
            title: 'Compile Error',
            message: '<%= error.message %>'
        }).apply(this, args);

        this.emit('end');
    } else {
        console.log(error);
        process.exit(1);
    }
};