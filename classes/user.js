// VENDOR LIBS
const path = require('path');

// CONFIG
const classPath = 'users';

class User {

    constructor (data) {
        this.data = {

        };
    }

    static save (user, config = {}) {
        let onSuccess = config.success;
        let onError = config.error;
        let onDone = config.done;
    }
}

module.exports = User;