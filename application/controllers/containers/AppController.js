module.exports.injectControllerTo = (mod) => {
    mod.controller('AppCtrl', [
        'Auth',
        '$state',
        function (Auth, $state) {
            let user = Auth.getUser();

            this.items = [
                {
                    icon: 'dashboard',
                    label: 'Inicio',
                    rootState: 'base.app.admin.dashboard',
                    sref: 'base.app.admin.dashboard'
                },
                {
                    icon: 'list',
                    label: 'Preguntas',
                    rootState: 'base.app.admin.questions',
                    sref: 'base.app.admin.questions.list'
                },
                {
                    icon: 'list',
                    label: 'Encuestas',
                    rootState: 'base.app.admin.surveys',
                    sref: 'base.app.admin.surveys.list'
                }
            ];
        }
    ]);
};
