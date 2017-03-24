module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionCreateEditCtrl', [
        'Resources',
        '$state',
        '$scope',
        '$mdDialog',
        function (Resources, $state, $scope, $mdDialog) {

            this.initialize = () => {
                const questionId = this.getQuestionId();
                const promises = [];

                promises.push(this.loadQuestionTypes());

                if (questionId) {
                    promises.push(this.loadQuestion(questionId));
                }

                Promise.all(promises)
                    .then(() => {
                        $scope.$apply()
                    });
            };

            this.loadQuestionTypes = () => {
                return Resources.getQuestionTypes()
                    .then((questionTypes) => {
                        this.questionTypes = questionTypes;
                    });
            };

            this.loadQuestion = (questionId) => {
                return Resources.getQuestion(questionId)
                    .then((question) => {
                        this.question = question;
                    });
            };

            this.showMessages = (controlId) => {
                let form = this.questionForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.questionForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.questionForm;

                event.preventDefault();

                form.$setSubmitted();

                if (form.$valid) {
                    if(this.getQuestionId()){
                        var updateDialog = $mdDialog.confirm()
                            .title('¿Está seguro de que quiere guardar los cambios?')
                            .targetEvent(event)
                            .ok('Aceptar')
                            .cancel('Cancelar');

                        $mdDialog.show(updateDialog)
                            .then(() => {
                                return Resources.updateQuestion(this.question)
                            })
                            .then((question) => {
                                this.goBack();
                            });
                    } else {
                        Resources.createQuestion(this.question)
                            .then((question) => {
                                this.goBack();
                            });
                    }
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.questions.list');
            };

            this.getQuestionId = () => {
                return $state.params.questionId;
            };

            this.question = {};
            this.questionTypes = [];
        }
    ]);
};
