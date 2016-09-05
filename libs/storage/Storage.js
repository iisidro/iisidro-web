// VENDOR LIBS
const store = require('store');

module.exports.injectServiceTo = (mod) => {
    mod.service('Storage', ['storagePrefix', function (storagePrefix) {

        this.set = (key, value) => {
            store.set(storagePrefix + key, value);
        };

        this.get = (key) => {
            return store.get(storagePrefix + key);
        };

        this.delete = (key) => {
            return store.delete(storagePrefix + key);
        };

        this.clear = store.clear;
    }]);
};
