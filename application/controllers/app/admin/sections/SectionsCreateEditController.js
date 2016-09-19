module.exports.injectControllerTo = (mod) => {
    mod.controller('SectionCreateEditCtrl', [
        'Sections',
        '$state',
        function (Sections, $state) {

            this.initialize = () => {

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

                if (form.$valid) {
                    Sections.createInstance({
                        section: this.section
                    })
                    .then((section) => {
                        console.log(section);

                        this.goBack();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            };

            this.goBack = () => {
                $state.go('base.app.admin.section.list');
            };

            this.section = {
                title: ''
            };
        }
    ]);
};
