// VENDOR LIBS
const EventEmitter = require('events').EventEmitter;
const lodash = require('lodash');

class Store extends EventEmitter {

    constructor () {
        super();

        if (this.storeWillMount) {
            this.storeWillMount()
        }

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
}

module.exports = Store;