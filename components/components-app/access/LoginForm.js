// VENDOR LIBS
const _ = require('lodash');

module.exports.injectComponentTo = function (mod) {
    mod.component('loginForm', {
        templateUrl: 'components-app/access/login-form.html',
        bindings: {
            user: '=',
            onFormSubmit: '=',
            submitting: '='
        },
        controller: [function () {

            this.showMessages = (controlId) => {
                let form = this.loginForm;
                let control = form[controlId];

                return (control.$error !== {} && (control.$touched || form.$submitted));
            };

            this.getErrors = (controlId) => {
                return this.loginForm[controlId].$error;
            };

            this.handleFormSubmit = (event) => {
                let form = this.loginForm;

                event.preventDefault();

                form.$setSubmitted();

                if (form.$valid) {

                    if (this.onFormSubmit) {
                        this.onFormSubmit();
                    }
                }
            };
        }],
        controllerAs: 'loginFormCtrl'
    });
};
