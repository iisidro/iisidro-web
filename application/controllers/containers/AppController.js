module.exports.injectControllerTo = (mod) => {
    mod.controller('AppCtrl', [
        'Auth',
        '$state',
        function (Auth, $state) {
            let user = Auth.getUser();

            this.items = [
                {
                    title: 'Inicio'
                },
                {
                    title: 'Preguntas'
                },
                {
                    title: 'Encuestas'
                }
            ];
        }
    ]);
};
