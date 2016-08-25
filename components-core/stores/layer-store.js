// VENDOR LIBS
const lodash = require('lodash');

// LIBS
const Store = require('libs/generic/store');
const appSidebarStoreEvents = require('components-core/stores/app-sidebar-store-events');

class LayerStore extends Store {

    getInitialState () {
        return {
            layer: null
        };
    }

    openLayer () {
        this.setState({layer: true});
    }
}

module.exports = new LayerStore();

window.layerStore = module.exports;