module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionCreateEditCtrl', [
        'Questions',
        'QuestionTypes',
        '$state',
        function (Questions, QuestionTypes, $state) {

            this.initialize = () => {
                QuestionTypes.getInstances()
                    .then((questionTypes) => {
                        this.questionTypes = questionTypes;
                    })
                    .catch(() => {

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
                    Questions.createInstance({
                        question: this.question
                    })
                    .then((question) => {
                        console.log(question);

                        this.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.questions.list');
            };

            this.question = {
                type: '',
                statement: ''
            };
            this.questionTypes = [];
        }
    ]);
};
