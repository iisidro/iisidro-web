module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveysListCtrl', [
        'tablesConfig',
        'Surveys',
        '$state',
        '$mdDialog',
        function (tablesConfig, Surveys, $state, $mdDialog) {

            this.initialize = () => {
                this.loadSurveys();
            };

            this.loadSurveys = () => {
                Surveys.getInstances()
                    .then((surveys) => {
                        this.surveys = surveys;
                    })
                    .catch((error) => {

                    });
            };

            this.editSurvey = (survey) => {
                $state.go('base.app.admin.surveys.edit', {
                    surveyId: survey.id
                });
            };

            this.deleteSurvey = (survey) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente encuesta?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        Surveys.deleteInstance({
                            surveyId: survey.id
                        })
                        .then((response) => {
                            this.loadSurveys();
                        })
                        .catch(() => {

                        });
                    });
            };

            this.surveys = [];
            this.columns = tablesConfig.surveysTable.columns;
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editSurvey
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteSurvey
                }
            ];
        }
    ]);
};
