// VENDOR LIBS
const _ = require('lodash');

const API = require('libs/api/api');

module.exports = {

    id: 2,
    questions: {
        0: {id: 0, maxLength: 255, statement: 'Descripcion'},
        1: {id: 1, maxLength: 255, statement: 'Descripcion'},
        2: {id: 2, maxLength: 255, statement: 'Descripcion'}
    },

    addQuestion (question) {
        return new Promise((resolve, reject) => {
            API.get({
                url: 'tipo-preguntas',
                success (response, status, jqXHR) {
                    let tipoTexto = _.find(response, (tipoPregunta) => {
                        return tipoPregunta.nombre === 'texto';
                    });

                    API.post({
                        url: 'preguntas',
                        data: {
                            nombre: question.title,
                            informacion: question.statement,
                            tipo: tipoTexto
                        },
                        success (response, status, jqXHR) {
                            resolve(response);
                        },
                        error (jqXHR, status, error) {
                            reject(jqXHR);
                        }
                    });
                },
                error (jqXHR, status, error) {
                    reject(jqXHR);
                }
            });
        });
    },

    updateQuestion (question, id) {
        return new Promise((resolve, reject) => {
            API.put({
                url: 'preguntas/' + id,
                data: {
                    nombre: question.title,
                    informacion: question.statement
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

    getQuestions (id) {
        let promiseResolver;

        if (id) {
            promiseResolver = (resolve, reject) => {
                API.get({
                    url: 'preguntas/' + id,
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
                    url: 'preguntas',
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

window.questionsStore = module.exports;