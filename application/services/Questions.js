module.exports.injectServiceTo = (mod) => {
    mod.service('Questions', [
        'API',
        'QuestionTypes',
        '$q',
        function (API, QuestionTypes, $q) {

            this.getInstances = () => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'preguntas'
                    })
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };

            this.createInstance = (question) => {
                return $q((resolve, reject) => {

                });
            };
        }
    ]);
};
