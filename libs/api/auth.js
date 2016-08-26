/*
// VENDOR LIBS
const lodash = require('lodash');
const path = require('path');

// LIBS
const API = require('libs/api/api');
const authStore = require('libs/auth/auth-store');
const notificationStore = require('libs/notification/notification-store');

class Auth {

    static createUser (config = {}) {
        let callbacks = API.getCallbacks(config);
    }

    static login (config = {}) {
        let callbacks = API.getCallbacks(config);

        API.post({
            url: 'authenticate',
            data: {
                username: config.username,
                password: config.password
            },
            success (response, status, jqXHR) {
                API.setAuthToken(response.token);
                Auth.getAuthenticatedUser(callbacks);
            },
            error (jqXHR, status, error) {

                notificationStore.addError(jqXHR.responseJSON);

                if (callbacks.onError) {
                    callbacks.onError(jqXHR);
                }

                if (callbacks.onAlways) {
                    callbacks.onAlways();
                }
            }
        });
    }

    static getAuthenticatedUser (callbacks) {
        API.get({
            url: 'account',
            success: (response, status, jqXHR) => {
                let user = response;

                user.roles = user.authorities;

                authStore.authenticateUser(user);

                if (callbacks.onSuccess) {
                    callbacks.onSuccess(response);
                }

                if (callbacks.onAlways) {
                    callbacks.onAlways();
                }
            },
            error: (jqXHR, status, error) => {
                if (callbacks.onError) {
                    callbacks.onError(jqXHR);
                }

                if (callbacks.onAlways) {
                    callbacks.onAlways();
                }
            }
        });
    }

    static logout (config = {}) {
        let callbacks = API.getCallbacks(config);

        authStore.logoutUser();
    }

}

module.exports = Auth;
*/

module.exports.injectServiceTo = (mod) => {
    mod.service('Auth', [
        'API',
        '$q',
        function (API, $q) {

            this.login = (config = {}) => {
                return $q((resolve, reject) => {
                    API.post({
                        url: 'authenticate',
                        data: {
                            username: config.username,
                            password: config.password
                        }
                    }).then((response) => {
                        console.log(response);

                        resolve(response);

                        API.setAuthToken(response.data.token);
                        //Auth.getAuthenticatedUser(callbacks);
                    }).catch((error) => {
                        console.log(error);

                        reject(error);

                        //notificationStore.addError(jqXHR.responseJSON);
                    });
                });
            };
        }
    ]);
};
