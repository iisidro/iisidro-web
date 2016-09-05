module.exports.injectControllerTo = (mod) => {
    mod.controller('AccessCtrl', [
        'Auth',
        '$state',
        function (Auth, $state) {
            let user = Auth.getUser();

            if (user) {
                $state.go('base.app.admin.dashboard');
            }
        }
    ]);
};
