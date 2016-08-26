// VENDOR LIBS
const _ = require('lodash');
const path = require('path');
//const call = (true) ? require('jquery').ajax : require('services/services');

// LIBS
/*
const Storage = require('libs/generic/storage');

class API extends Storage {

    constructor (config) {
        super(config);

        if (!this.__loaded) {

        }

        this.defaultConfig = {
            beforeSend: API.addAuthTokenToRequest.bind(this, this.config)
        };

        this.saveInStorage();
    }

    getPropertiesToSave () {
        return ['config'];
    }

    getCallbacks (config = {}) {
        return {
            onSuccess: lodash.get(config, 'success'),
            onError: lodash.get(config, 'error'),
            onAlways: lodash.get(config, 'always')
        };
    }

    post (config) {
        return call(lodash.extend(config, {
            url: path.join(this.config.host, this.config.apiRoot, config.url),
            method: 'POST',
            contentType: this.config.contentType,
            data: JSON.stringify(config.data),
            dataType: this.config.dataType,
            done: this.successFilter.bind(this, config.success),
            fail: this.errorFilter.bind(this, config.error)
        }, this.defaultConfig));
    }

    get (config) {
        return call(lodash.extend(config, {
            url: path.join(this.config.host, this.config.apiRoot, config.url),
            method: 'GET',
            contentType: this.config.contentType,
            data: JSON.stringify(config.data),
            dataType: this.config.dataType,
            done: this.successFilter.bind(this, config.success),
            fail: this.errorFilter.bind(this, config.error)
        }, this.defaultConfig));
    }

    successFilter (onSuccess, response, status, jqXHR) {
        let filteredResponse = response;

        console.log('asd');

        if (onSuccess) {
            onSuccess(filteredResponse, status, jqXHR);
        }
    }

    errorFilter (onError, jqXHR, status, error) {
        let filteredError = error;

        if (onError) {
            onError(jqXHR, status, filteredError);
        }
    }

    commonFilter () {

    }

    setAuthToken (authToken) {
        this.config.authToken = authToken;

        this.saveInStorage();
    }

    getAuthToken () {
        return this.config.authToken;
    }

    static addAuthTokenToRequest (config, request) {
        if (config.authToken) {
            request.setRequestHeader("Authority", config.authToken);
            request.setRequestHeader('x-auth-token', config.authToken);
            request.setRequestHeader('X-CSRF-Token', config.authToken);
        }
    }
}

*/

module.exports.injectServiceTo = (mod) => {
    mod.service('API', [
        '$q',
        '$http',
        'Storage',
        function ($q, $http, Storage) {

            this.defaultConfig = {
                apiRoot: 'api',
                contentType: "application/json",
                dataType: 'json',
                host: 'https://iisidro-server.herokuapp.com',
                authToken: null
            };

            this.initialize = () => {
                let storedConfig = Storage.get('API');

                if (!this.config) {
                    this.config = storedConfig || this.defaultConfig;

                    if (!storedConfig) {
                        this.saveInStorage(this.defaultConfig);
                    }
                }
            };

            this.setAuthToken = (authToken) => {
                this.config.authToken = authToken;
                this.saveInStorage();
            };

            this.post = (config) => {
                return $http({
                    url: path.join(this.config.host, this.config.apiRoot, config.url),
                    method: 'POST',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    dataType: this.config.dataType,
                });
            };

            this.saveInStorage = (config) => {
                Storage.set('API', config || this.config);
            };

            this.initialize();
        }
    ]);
};
