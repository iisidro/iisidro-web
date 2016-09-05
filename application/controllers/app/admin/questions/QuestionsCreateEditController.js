module.exports.injectControllerTo = (mod) => {
    mod.controller('QuestionsCreateEditCtrl', [
        'Questions',
        'QuestionTypes',
        '$state',
        function (Questions, QuestionTypes, $state) {

            this.initialize = () => {
                QuestionTypes.getInstances()
                    .then(() => {

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

                    if (this.onFormSubmit) {
                        this.onFormSubmit();
                    }
                }
            };

            this.question = {
                type: '',
                statement: ''
            };

            this.questionTypes = [
                {
                    label: 'Texto',
                    value: 'text'
                }
            ];
        }
    ]);
};
