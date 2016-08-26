module.exports.injectControllerTo = (mod) => {
    mod.controller('LoginCtrl', ['Auth', function (Auth) {

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
                })
                .catch((error) => {
                    this.submitting = false;
                });
        };
    }]);
};
