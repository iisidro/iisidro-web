module.exports.injectServiceTo = (mod) => {
    mod.service('Sections', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = () => {
                return $q((resolve, reject) => {
                    API.get({
                        url: config.surveyId + '/secciones'
                    })
                    .then((response) => {
                        resolve(response.data);
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
                            nombre: section.title
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

            this.getInstance = (config = {}) => {
                return $q((resolve, reject) =>{
                    API.get({
                        url: config.surveyId + '/secciones/' + config.sectionId
                    })
                    .then((response) =>{
                        resolve(response.data);
                    })
                    .catch((error) =>{
                        reject(error);
                    });
                });
            }

            this.deleteInstance = (config = {}) => {
                return $q((resolve, reject) => {
                    API.delete({
                        url: config.surveyId + '/secciones/' + config.sectionId
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            }
        }
    ]);
};
