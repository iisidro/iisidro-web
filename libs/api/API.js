// VENDOR LIBS
const _ = require('lodash');
const path = require('path');
const url = require('url');

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
                host: 'https://iisidro-server-dev.herokuapp.com',
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

            this.buildUrl = (config) => {
                return url.resolve(this.config.host, path.join(this.config.apiRoot, config.url));
            };

            this.setAuthToken = (authToken) => {
                this.config.authToken = authToken;
                this.saveInStorage();
            };

            this.getAuthToken = () => {
                return this.config.authToken;
            };

            this.post = (config) => {
                return $http(this.addHeaders({
                    url: this.buildUrl(config),
                    method: 'POST',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.put = (config) => {
                return $http(this.addHeaders({
                    url: this.buildUrl(config),
                    method: 'PUT',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };


            this.get = (config) => {
                return $http(this.addHeaders({
                    url: this.buildUrl(config),
                    method: 'GET',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.delete = (config) => {
                return $http(this.addHeaders({
                    url: this.buildUrl(config),
                    method: 'DELETE',
                    contentType: this.config.contentType,
                    data: JSON.stringify(config.data),
                    params: config.params,
                    dataType: this.config.dataType
                }));
            };

            this.saveInStorage = (config) => {
                Storage.set('API', config || this.config);
            };

            this.addHeaders = (config) => {
                if (this.config.authToken) {
                    config.headers = {
                        'Authority': this.config.authToken,
                        'x-auth-token': this.config.authToken,
                        'X-CSRF-Token': this.config.authToken
                    };
                }

                return config;
            };

            this.initialize();
        }
    ]);
};