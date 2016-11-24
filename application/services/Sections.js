module.exports.injectServiceTo = (mod) => {
    mod.service('Sections', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = (config) => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'seccionesByEncuesta/' + config.surveyId
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.getOne = (config) => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'secciones/' + config.sectionId
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.deleteInstance = (config = {}) => {
                return $q((resolve, reject) => {
                    API.delete({
                        url: 'secciones/' + config.sectionId
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };


            this.createInstance = (config) => {
                let section = config.section;

                return $q((resolve, reject) => {
                    API.post({
                        url: 'secciones',
                        data: {
                            codigo: section.cod,
                            nombre: section.nombre,
                            encuesta: section.encuesta,
                            orden: section.orden
                        }
                    }).then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.updateInstance = (config) => {
                let section = config.section;

                return $q((resolve, reject) => {
                    API.put({
                        url: 'secciones',
                        data: {
                            id: section.id,
                            codigo: section.cod,
                            nombre: section.nombre,
                            encuesta: section.encuesta,
                            orden: section.orden
                        }
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };
        }
    ]);
};
