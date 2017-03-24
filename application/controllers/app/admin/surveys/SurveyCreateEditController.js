import _ from 'lodash';

module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyCreateEditCtrl', [
        'tablesConfig',
        'Resources',
        '$state',
        '$scope',
        '$mdDialog',
        function (tablesConfig, Resources, $state, $scope, $mdDialog) {

            this.initialize = () => {
                const surveyId = this.getSurveyId();
                const promises = [];

                promises.push(this.loadSections());

                if (surveyId) {
                    promises.push(this.loadSurvey(surveyId));
                }

                Promise.all(promises)
                    .then(() => {
                        $scope.$apply();
                    });
            };

            this.loadSections = () => {
                return Resources.getSections()
                    .then((sections) => {
                        this.sections = sections;
                    });
            };

            this.loadSurvey = (surveyId) => {
                const promises = [
                    Resources.getSurvey(surveyId),
                    Resources.getSurveySections(surveyId)
                ];

                return Promise.all(promises)
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
                                return Promise.all([
                                    Resources.updateSurvey(this.survey),
                                    Resources.updateSurveySections(this.survey.id, this.survey.secciones)
                                ]);
                            })
                            .then((survey) => {
                                this.goBack();
                            });
                    } else {
                        Resources.createSurvey(_.omit(this.survey, ['secciones']))
                            .then((survey) => {
                                return Resources.updateSurveySections(survey.id, this.survey.secciones);
                            })
                            .then(() => {
                                this.goBack();
                            });
                    }
                }
            };

            this.addSection = () => {
                const section = this.section;

                if (!this.survey.secciones) {
                    this.survey.secciones = [];
                }

                if (section && !this.isSectionAdded(section)) {
                    this.survey.secciones.push(section);
                    this.section = null;
                }
            };

            this.isSectionAdded = (section) => {
                return (!!_.find(this.survey.secciones, (addedSection) => {
                    return (addedSection.id === section.id);
                }));
            };

            this.deleteSection = (sectionToDelete) => {
                const index = _.findIndex(this.survey.secciones, (section) => {
                    return (section.id === sectionToDelete.id);
                });

                this.survey.secciones.splice(index, 1);
            };

            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };

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
