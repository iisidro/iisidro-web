module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionsListCtrl', [
        'tablesConfig',
        'Resources',
        '$state',
        '$mdDialog',
        function (tablesConfig, Resources, $state, $mdDialog) {

            this.initialize = () => {
                this.loadSections();
            };

            this.loadSections = () => {
                Resources.getSections()
                    .then((sections) => {
                        this.sections = sections;
                    });
            };

            this.editSection = (section) => {
                $state.go('base.app.admin.sections.edit', {
                    sectionId: section.id
                });
            };

            this.deleteSection = (section) => {
                var deleteDialog = $mdDialog.confirm()
                    .title('Desea eliminar la siguiente seccion?')
                    .targetEvent(event)
                    .ok('SI')
                    .cancel('NO');

                $mdDialog.show(deleteDialog)
                    .then(() => {
                        return Resources.deleteSection(section.id);
                    })
                    .then((data) => {
                        this.loadSections();
                    });
            };

            this.sections = [];
            this.columns = tablesConfig.sectionsTable.columns;
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
