module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyCreateEditCtrl', [
        'Surveys',
        '$state',
        function (Surveys, $state) {

            this.initialize = () => {

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
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };

            this.survey = {
                title: ''
            };
        }
    ]);
};
