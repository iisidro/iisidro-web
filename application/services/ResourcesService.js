module.exports.injectServiceTo = (mod) => {
    mod.service('Resources', [
        'API',
        function (API) {
            const dataFilter = function (response) {
                return response.data
            };

            // Question
            this.createQuestion = (question) => {
                const config = {
                    url: 'preguntas',
                    data: question
                };

                return API.post(config).then(dataFilter);
            };
            this.deleteQuestion = (questionId) => {
                const config = {
                    url: 'preguntas/' + questionId
                };

                return API.delete(config).then(dataFilter);
            };
            this.getQuestion = (questionId) => {
                const config = {
                    url: 'preguntas/' + questionId
                };

                return API.get(config).then(dataFilter);
            };
            this.getQuestions = () => {
                const config = {
                    url: 'preguntas'
                };

                return API.get(config).then(dataFilter);
            };
            this.updateQuestion = (question) => {
                const config = {
                    url: 'preguntas',
                    data: question
                };

                return API.put(config).then(dataFilter);
            };

            // QuestionType
            this.getQuestionTypes = () => {
                const config = {
                    url: 'tipo-preguntas'
                };

                return API.get(config).then(dataFilter);
            };

            // Section
            this.createSection = (section) => {
                const config = {
                    url: 'secciones',
                    data: section
                };

                return API.post(config).then(dataFilter);
            };
            this.getSection = (sectionId) => {
                const config = {
                    url: 'secciones/' + sectionId
                };

                return API.get(config).then(dataFilter);
            };
            this.getSectionQuestions = (sectionId) => {
                const config = {
                    url: 'preguntas/seccion/' + sectionId
                };

                return API.get(config).then(dataFilter);
            };
            this.getSections = () => {
                const config = {
                    url: 'secciones'
                };

                return API.get(config).then(dataFilter);
            };
            this.getSurveySections = (surveyId) => {
                const config = {
                    url: 'secciones/encuesta/' + surveyId
                };

                return API.get(config).then(dataFilter);
            };
            this.updateSection = (section) => {
                const config = {
                    url: 'secciones',
                    data: section
                };

                return API.put(config).then(dataFilter);
            };

            // Survey
            this.createSurvey = (survey) => {
                const config = {
                    url: 'encuestas',
                    data: survey
                };

                return API.post(config).then(dataFilter);
            };
            this.deleteSurvey = (surveyId) => {
                const config = {
                    url: 'encuestas/' + surveyId
                };

                return API.delete(config).then(dataFilter);
            };
            this.getSurvey = (surveyId) => {
                const config = {
                    url: 'encuestas/' + surveyId
                };

                return API.get(config).then(dataFilter);
            };
            this.getSurveys = () => {
                const config = {
                    url: 'encuestas'
                };

                return API.get(config).then(dataFilter);
            };
            this.updateSurvey = (survey) => {
                const config = {
                    url: 'encuestas',
                    data: survey
                };

                return API.put(config).then(dataFilter);
            };

            // Authentication
            this.authenticate = (user) => {
                const config = {
                    url: 'authenticate',
                    data: user
                };

                return API.post(config).then(dataFilter);
            };
            this.getAccount = () => {
                const config = {
                    url: 'account'
                };

                return API.get(config).then(dataFilter);
            };
        }
    ]);
};
