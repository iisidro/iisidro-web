// VENDOR LIBS
const _ = require('lodash');

const API = require('libs/api/api');

module.exports = {

    addSurvey (survey) {
        return new Promise((resolve, reject) => {
            API.post({
                url: 'encuestas',
                data: {
                    nombre: survey.title
                },
                success (response, status, jqXHR) {
                    resolve(response);
                },
                error (jqXHR, status, error) {
                    reject(jqXHR);
                }
            });
        });
    },

    updateSurvey (survey, id) {
        return new Promise((resolve, reject) => {
            API.put({
                url: 'encuestas/' + id,
                data: {
                    nombre: survey.title
                },
                success (response, status, jqXHR) {
                    resolve(response);
                },
                error (jqXHR, status, error) {
                    reject(jqXHR);
                }
            });
        });
    },

    getSurveys (id) {
        let promiseResolver;

        if (id) {
            promiseResolver = (resolve, reject) => {
                API.get({
                    url: 'encuestas/' + id,
                    success (response, status, jqXHR) {
                        resolve(response);
                    },
                    error (jqXHR, status, error) {
                        reject(jqXHR);
                    }
                });
            };
        } else {
            promiseResolver = (resolve, reject) => {
                API.get({
                    url: 'encuestas',
                    success (response, status, jqXHR) {
                        resolve(response);
                    },
                    error (jqXHR, status, error) {
                        reject(jqXHR);
                    }
                });
            };
        }

        return new Promise(promiseResolver);
    }
};