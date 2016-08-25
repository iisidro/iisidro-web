// LIBS
const Store = require('libs/generic/store');
const lodash = require('lodash');
const notificationStoreEvents = require('libs/notification/notification-store-events');
const errorProcessor = require('libs/error/error-processor');

class NotificationStore extends Store {

    constructor () {
        super();

        this.config = {
            messageDisplayTime: 10000
        };
    }

    getInitialState () {
        return {
            messages: [],
            errors: [],
            warnings: []
        };
    }

    getItems (itemCollectionKey) {
        return this.state[itemCollectionKey].slice(0);
    }

    addError (error) {
        this.add(errorProcessor(error), 'errors', notificationStoreEvents.ERROR_ADDED);
    }

    add (item, itemCollectionKey, event) {
        let newState = {};
        let items = this.getItems(itemCollectionKey);

        items.push(item);

        newState[itemCollectionKey] = items;

        this.setStateAndEmit(newState, {
            event: event,
            callback: this.executeRemoval.bind(this, itemCollectionKey)
        });
    }

    executeRemoval (itemCollectionKey) {
        var collectionRemovals = {
            'errors': this.removeError
        };

        setTimeout(collectionRemovals[itemCollectionKey].bind(this), this.config.messageDisplayTime);
    }

    removeError () {
        this.remove('errors', notificationStoreEvents.ERROR_REMOVED);
    }

    remove (itemCollectionKey, event) {
        let newState = {};
        let items = this.getItems(itemCollectionKey);

        items.shift();

        newState[itemCollectionKey] = items;

        this.setStateAndEmit(newState, {event: event});
    }

    getError () {
        return this.state.errors[0];
    }
}

module.exports = new NotificationStore();