module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionsListCtrl', [
        'tablesConfig',
        'Resources',
        '$state',
        '$mdDialog',
        function (tablesConfig, Resources, $state, $mdDialog) {

            this.initialize = () => {
                this.loadQuestions();
            };

            this.loadQuestions = () => {
                Resources.getQuestions()
                    .then((questions) => {
                        this.questions = questions;
                    });
            };

            this.editQuestion = (question) => {
                $state.go('base.app.admin.questions.edit', {
                    questionId: question.id
                });
            };

            this.deleteQuestion = (question) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente pregunta?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        return Resources.deleteQuestion(question.id);
                    })
                    .then((data) => {
                        this.loadQuestions();
                    })
                    .catch(() => {

                    });
            };

            this.questions = [];
            this.columns = tablesConfig.questionsTable.columns;
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editQuestion
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteQuestion
                }
            ];
        }
    ]);
};
