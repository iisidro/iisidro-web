module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionCreateEditCtrl', [
        'Sections',
        '$state',
        '$mdDialog',
        'Surveys',
        function (Sections, $state, $mdDialog,Surveys) {

            this.initialize = () => {
                Surveys.getOne({
                        surveyId: $state.params.surveyId
                    })
                    .then((survey) => {
                        //console.log(survey);
                        this.section.encuesta.id = $state.params.surveyId;
                        this.section.encuesta.nombre = survey.nombre;
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                Sections.getOne({
                        sectionId: $state.params.sectionId
                    })
                    .then((section) => {
                        //console.log(section);
                        this.section.id = $state.params.sectionId;
                        this.section.nombre = section.nombre;
                        this.section.orden = section.orden;
                        this.section.cod = section.codigo;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };

            this.showMessages = (controlId) => {
                let form = this.sectionForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.sectionForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.sectionForm;

                event.preventDefault();

                form.$setSubmitted();
                if (this.section.id === -1) {
                if (form.$valid) {
                        Sections.createInstance({
                            section: this.section
                        }).then((section) => {
                            console.log(section);

                            this.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                }
                else {
                    var updateDialog = $mdDialog.confirm()
                        .title('¿Está seguro de que quiere guardar los cambios?')
                        .targetEvent(event)
                        .ok('Aceptar')
                        .cancel('Cancelar');

                    $mdDialog.show(updateDialog)
                        .then(() => {
                            this.update();

                            this.goBack();
                            })
                            .catch(() => {

                            });
                }
            };

            this.update = () => {
                Sections.updateInstance({
                    section: this.section
                })
                .then((survey) => {
                    console.log(section);

                    this.goBack();
                })
                .catch((error) => {
                    console.log(error);
                }); 
            };


            this.goBack = () => {
                $state.go('base.app.admin.surveys.list');
            };


            this.survey = {
                id: -1,
                nombre: ''
            };

            this.section = {
                id: -1,
                encuesta : {}
            };

        }
    ]);
};
