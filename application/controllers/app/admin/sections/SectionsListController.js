module.exports.injectControllerTo = (mod) => {
	mod.controller('SectionsListCtrl', [
		'Surveys',
		'$state',
		'$mdDialog',
		'Sections',
		function (Surveys,$state,$mdDialog,Sections) {

			this.initialize = () => {
				this.loadSections();
                this.loadSurvey();
			};

			this.loadSections = () => {
				Sections.getInstances({
                        surveyId: $state.params.surveyId
                    })
                    .then((sections) => {
                        this.sections = sections;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
			};


            this.loadSurvey = () => {
                Surveys.getOne({
                        surveyId: $state.params.surveyId
                    })
                    .then((survey) => {
                        //console.log(survey);
                        this.survey.id = $state.params.surveyId;
                        this.survey.title = survey.nombre;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };

            this.create = () => {
                $state.go('base.app.admin.sections.create', {
                    surveyId: this.survey.id
                });
            }

            this.deleteSection = (section) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente seccion?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        Sections.deleteInstance({
                            sectionId: section.id
                        })
                        .then((response) => {
                            this.loadSections();
                        })
                        .catch(() => {

                        });
                    });
            };

            this.editSection = (section) => {
                $state.go('base.app.admin.sections.edit', {
                    surveyId: this.survey.id,
                    sectionId: section.id
                });
            };

            this.survey = {
                id: -1,
                title: ''
            };

			this.sections = [];
			this.columns = [
                {
                    key: 'orden',
                    label: 'Orden'
                },
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'nombre',
                    label: 'Nombre'
                }
            ];
            this.actions = [
                {
                    label: 'Editar',
                    onCall: this.editSection
                },
                {
                    label: 'Eliminar',
                    onCall: this.deleteSection
                }
            ];
		}
		]);
}