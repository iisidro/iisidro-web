module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionsListCtrl', [
        'Sections',
        '$state',
        '$mdDialog',
        function (Sections, $state, $mdDialog) {

            this.initialize = () => {
                this.loadSections();
            };

            this.loadSections = () => {
                Sections.getInstances()
                    .then((sections) => {
                        this.Sections = sections;
                    })
                    .catch((error) => {

                    });
            };

            this.editSection = (section) => {
                $state.go('base.app.admin.section.edit', Sections.getInstance({
                        sectionId: section.id
                    });
                );
            };

            this.deleteSection = (section) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente sección?')
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

            this.sections = [];
            this.columns = [
                {
                    key: 'nombre_pregunta',
                    label: 'Nombre'
                },
                {
                    key: 'tipo.nombre_pregunta',
                    label: 'Tipo'
                },
                {
                    key: 'fecha_hora_creacion',
                    label: 'Hora de creacion'
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
};
