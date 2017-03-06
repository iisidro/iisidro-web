module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveysListCtrl', [
        'tablesConfig',
        'Resources',
        '$state',
        '$mdDialog',
        function (tablesConfig, Resources, $state, $mdDialog) {

            this.initialize = () => {
                this.loadSurveys();
            };

            this.loadSurveys = () => {
                Resources.getSurveys()
                    .then((surveys) => {
                        this.surveys = surveys;
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
                        return Resources.deleteSurvey(survey.id);
                    })
                    .then(() => {
                        this.loadSurveys();
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
