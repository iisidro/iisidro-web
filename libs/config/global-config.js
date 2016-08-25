// LIBS
const defaultConfig = require('libs/config/default-config');
const Store = require('libs/generic/store');
const lodash = require('lodash');

class ConfigStore extends Store {

    getInitialState () {
        let existingConfig = null;
        let state;

        if (!existingConfig) {
            state = lodash.cloneDeep(defaultConfig);
        } else {
            state = existingConfig;
        }

        return state;
    }

}

module.exports = new ConfigStore();