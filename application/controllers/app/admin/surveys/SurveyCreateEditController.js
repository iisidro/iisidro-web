module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyCreateEditCtrl', [
        'tablesConfig',
        'Resources',
        '$state',
        '$mdDialog',
        function (tablesConfig, Resources, $state, $mdDialog) {

            this.initialize = () => {
                const surveyId = this.getSurveyId();

                this.loadSections();

                if (surveyId) {
                    this.loadSurvey(surveyId);
                }
            };

            this.loadSections = () => {
                Resources.getSections()
                    .then((sections) => {
                        this.sections = sections;
                    });
            };

            this.loadSurvey = (surveyId) => {
                const promises = [
                    Resources.getSurvey(surveyId),
                    Resources.getSurveySections(surveyId)
                ];

                Promise.all(promises)
                    .then((results) => {
                        const survey = results[0];

                        survey.secciones = results[1];

                        this.survey = survey;
                    });
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
                    if (this.getSurveyId()) {
                        var updateDialog = $mdDialog.confirm()
                            .title('¿Está seguro de que quiere guardar los cambios?')
                            .targetEvent(event)
                            .ok('Aceptar')
                            .cancel('Cancelar');

                        $mdDialog.show(updateDialog)
                            .then(() => {
                                return Resources.updateSurvey(this.survey);
                            })
                            .then((survey) => {
                                this.goBack();
                            });
                    } else {
                        Resources.createSurvey(this.survey)
                            .then((survey) => {
                                this.goBack();
                            });
                    }
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };

            this.deleteSection = () => {

            };

            this.editSection = () => {

            }

            this.getSurveyId = () => {
                return $state.params.surveyId;
            };

            this.survey = {};
            this.sections = [];
            this.columns = tablesConfig.surveySectionsTable.columns;
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editSection
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteSection
                }
            ];
        }
    ]);
};
