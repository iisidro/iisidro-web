module.exports.injectControllerTo = (mod) => {
    mod.controller('AppCtrl', [
        'navigationItems',
        'Auth',
        '$state',
        function (navigationItems, Auth, $state) {
            let user = Auth.getUser();

            this.items = navigationItems;

            this.logout = () => {
                Auth.logout();

                this.redirectToAccess();
            };

            this.redirectToAccess = () => {
                $state.go('base.access.login');
            };

            if (!user) {
                this.redirectToAccess();
            }
        }
    ]);
};
