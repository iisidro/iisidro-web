// VENDOR LIBS
const lodash = require('lodash');

class Storage {

    constructor (config = {}) {
        let storageKey = config.storageKey;

        this.propertiesToSave = this.getPropertiesToSave();
        this.__storageKey = storageKey;
        this.__loaded = false;

        this.loadFromStorage();
    }

    saveInStorage () {
        if (typeof(Storage) !== "undefined" && this.__storageKey) {
            localStorage.setItem(this.__storageKey, JSON.stringify(lodash.pick(this, this.propertiesToSave)));
        }
    }

    loadFromStorage () {
        let storageData;

        if (typeof(Storage) !== "undefined" && this.__storageKey && localStorage[this.__storageKey]) {
            storageData = JSON.parse(localStorage[this.__storageKey]);

            lodash.each(storageData, (value, key) => {
                this[key] = value;
            });

            this.__loaded = true;
        }
    }
}

module.exports = Storage;