// VENDOR LIBS
const EventEmitter = require('events').EventEmitter;
const lodash = require('lodash');

class StoreAndStorage extends EventEmitter {

    constructor (config = {}) {
        let storageKey = config.storageKey;

        super();

        if (this.storeWillMount) {
            this.storeWillMount()
        }

        this.propertiesToSave = this.getPropertiesToSave();
        this.__storageKey = storageKey;
        this.state = this.getInitialState();
    }

    setState (newState, callback) {
        lodash.extend(this.state, newState);

        this.emitEvent('CHANGE_EVENT');

        if (callback) {
            callback();
        }
    }

    setStateAndEmit (newState, config = {}) {
        lodash.extend(this.state, newState);

        this.emitEvent(config.event);
        this.emitEvent('CHANGE_EVENT');

        if (config.callback) {
            config.callback();
        }
    }

    addEventListener (event, callback) {
        this.on(event, callback);
    }

    removeEventListener (event, callback) {
        this.removeListener(event, callback);
    }

    addChangeListener (callback) {
        this.addEventListener('CHANGE_EVENT', callback);
    }

    removeChangeListener (callback) {
        this.removeEventListener('CHANGE_EVENT', callback);
    }

    emitEvent (event) {
        this.emit(event);
    }

    get (key) {
        return lodash.get(this.state, key);
    }

    saveInStorage () {
        if (typeof(Storage) !== "undefined" && this.__storageKey) {
            localStorage.setItem(this.__storageKey, JSON.stringify(lodash.pick(this, this.propertiesToSave)));
        }
    }
}

module.exports = StoreAndStorage;