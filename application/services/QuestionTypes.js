module.exports.injectServiceTo = (mod) => {
    mod.service('QuestionTypes', [
        'API',
        '$q',
        function (API, $q) {

            this.getInstances = () => {
                return $q((resolve, reject) => {
                    API.get({
                        url: 'tipo-preguntas'
                    })
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
                });
            };
        }
    ]);
};
