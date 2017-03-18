import _ from 'lodash';

module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionCreateEditCtrl', [
        'Resources',
        '$state',
        '$mdDialog',
        function (Resources, $state, $mdDialog) {

            this.initialize = () => {
                const sectionId = this.getSectionId();

                this.loadQuestions();

                if (sectionId) {
                    this.loadSection(sectionId);
                }
            };

            this.loadSection = (sectionId) => {
                const promises = [
                    Resources.getSection(sectionId),
                    Resources.getSectionQuestions(sectionId)
                ];

                Promise.all(promises)
                    .then((results) => {
                        const section = results[0];

                        section.preguntas = results[1];

                        this.section = section;
                    });
            };

            this.loadQuestions = () => {
                Resources.getQuestions()
                    .then((questions) => {
                        this.questions = questions;
                    });
            };

            this.goBack = () => {
                $state.go('base.app.admin.sections.list');
            };

            this.isCreation = () => {
                return !(this.getSectionId());
            };

            this.showMessages = (controlId) => {
                let form = this.form;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.surveyForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.form;

                event.preventDefault();

                form.$setSubmitted();

                if (form.$valid) {
                    if (this.getSectionId()) {
                        var updateDialog = $mdDialog.confirm()
                            .title('¿Está seguro de que quiere guardar los cambios?')
                            .targetEvent(event)
                            .ok('Aceptar')
                            .cancel('Cancelar');

                        $mdDialog.show(updateDialog)
                            .then(() => {
                                return Promise.all([
                                    Resources.updateSection(this.section),
                                    Resources.updateSectionQuestions(this.section.id, this.section.preguntas)
                                ]);
                            })
                            .then((survey) => {
                                this.goBack();
                            });
                    } else {
                        Resources.createSection(_.omit(this.section, ['preguntas']))
                            .then((section) => {
                                return Resources.updateSectionQuestions(section.id, this.section.preguntas);
                            })
                            .then((section) => {
                                this.goBack();
                            });
                    }
                }
            };

            this.addQuestion = () => {
                const question = this.question;

                if (!this.section.preguntas) {
                    this.section.preguntas = [];
                }

                if (question && !this.isQuestionAdded(question)) {
                    this.section.preguntas.push(question);
                    this.question = null;
                }
            };

            this.isQuestionAdded = (question) => {
                return (!!_.find(this.section.preguntas, (addedQuestion) => {
                    return (addedQuestion.id === question.id);
                }));
            };

            this.deleteQuestion = (questionToDelete) => {
                const index = _.findIndex(this.section.preguntas, (question) => {
                    return (question.id === questionToDelete.id);
                });

                this.section.preguntas.splice(index, 1);
            };

            this.getSectionId = () => {
                return $state.params.sectionId;
            };

            this.section = {};
            this.columns = [
                {
                    key: 'nombre',
                    label: 'Nombre'
                }
            ];
            this.actions = [
                {
                    label: 'Eliminar',
                    onCall: this.deleteQuestion
                }
            ];
        }
    ]);
};
