module.exports.injectControllerTo = (mod) => {
    mod.controller('SurveyAnswerCtrl', [
        'Resources',
        '$state',
        '$scope',
        '$mdDialog',
        function (Resources, $state, $scope, $mdDialog) {
            const self = this;

            self.loading = true;

            self.initialize = function () {
                const surveyId = self.getSurveyId();

                Promise.all([
                    Resources.getSurvey(surveyId),
                    Resources.getSurveySections(surveyId)
                ]).then((results) => {
                    const survey = results[0];

                    survey.secciones = results[1];

                    self.survey = survey;
                    self.loading = false;

                    $scope.$apply();
                });
            };

            self.getSurveyId = function () {
                return $state.params.surveyId;
            };

            self.initialize();
        }
    ]);
};
