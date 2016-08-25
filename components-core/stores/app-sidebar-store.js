// VENDOR LIBS
const lodash = require('lodash');

// LIBS
const Store = require('libs/generic/store');
const appSidebarStoreEvents = require('components-core/stores/app-sidebar-store-events');

class AppSidebarStore extends Store {

    getInitialState () {
        return {
            activated: false
        };
    }

    activateSidebar (callback) {
        this.setStateAndEmit({
            activated: true
        }, {
            callback: callback,
            event: appSidebarStoreEvents.SIDEBAR_ACTIVATE
        });
    }

    deactivateSidebar (callback) {
        this.setStateAndEmit({
            activated: false
        }, {
            callback: callback,
            event: appSidebarStoreEvents.SIDEBAR_DEACTIVATE
        });
    }

    isSidebarActive () {
        return (this.state.activated);
    }

    addActivationListener (callback) {
        this.addEventListener(appSidebarStoreEvents.SIDEBAR_ACTIVATE, callback);
    }

    addDeactivationListener (callback) {
        this.addEventListener(appSidebarStoreEvents.SIDEBAR_DEACTIVATE, callback);
    }

    removeActivationListener (callback) {
        this.removeEventListener(appSidebarStoreEvents.SIDEBAR_ACTIVATE, callback);
    }

    removeDeactivationListener (callback) {
        this.addEventListener(appSidebarStoreEvents.SIDEBAR_DEACTIVATE, callback);
    }
}

module.exports = new AppSidebarStore();