module.exports.injectControllerTo = (mod) => {
    mod.controller('LoginCtrl', ['Auth', '$state', function (Auth, $state) {

        this.submitting = false;

        this.user = {
            username: '',
            password: ''
        };

        this.handleFormSubmit = () => {
            this.submitting = true;

            Auth.login(this.user)
                .then((response) => {
                    this.submitting = false;

                    $state.go('app');
                })
                .catch((error) => {
                    this.submitting = false;
                });
        };
    }]);
};
