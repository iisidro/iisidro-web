module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyCreateEditCtrl', [
        'Surveys',
        '$state',
        function (Surveys, $state) {

            this.initialize = () => {
                if ($state.params.hasOwnProperty('surveyId')) {
                    Surveys.getOne({
                        surveyId: $state.params.surveyId
                    })
                    .then((survey) => {
                        console.log(survey);
                        this.survey.id = $state.params.surveyId;
                        this.survey.title = survey.nombre;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    console.log(this.survey);
                }
            };

            this.showMessages = (controlId) => {
                let form = this.surveyForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.surveyForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.surveyForm;

                event.preventDefault();

                form.$setSubmitted();

                if (form.$valid) {
                    if (this.survey.id === -1) {
                        Surveys.createInstance({
                            survey: this.survey
                        })
                        .then((survey) => {
                            console.log(survey);

                            this.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    } else {
                        Surveys.updateInstance({
                            survey: this.survey
                        })
                        .then((survey) => {
                            console.log(survey);

                            this.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };

            this.survey = {
                id: -1,
                title: ''
            };
        }
    ]);
};
