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
                if ($state.params.hasOwnProperty('questionId')) {   
                    Questions.getOne({
                        questionId: $state.params.questionId
                    })
                    .then((question) =>{
                        this.question.statement = question.nombre;
                        this.question.type = question.tipo.nombre;
                        this.question.id = $state.params.questionId;
                    })
                    .catch((error) =>{
                        console.log(error);
                    });
                    console.log(this.question);
                }
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
                    if(this.question.id === -1){
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
                    else {
                        Questions.updateInstance({
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
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.questions.list');
            };

            this.question = {
                id: -1,
                type: '',
                statement: ''
            };
            this.questionTypes = [];
        }
    ]);
};
