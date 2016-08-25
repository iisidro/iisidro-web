// VENDOR LIBS
const React = require('react');
const lodash = require('lodash');

//LIBS
const Auth = require('libs/api/auth');

// COMPONENTS CORE
const Input = require('components-core/input');
const Form = require('components-core/form');

const LoginForm = React.createClass({

    childContextTypes: {
        handleControlValueChange: React.PropTypes.func
    },

    propTypes: {
        onLoginSuccess: React.PropTypes.func,
        onLoginFailed: React.PropTypes.func
    },

    getInitialState () {
        return {
            formData: {
                username: '',
                password: ''
            },
            submitting: false,
            errors: {
                username: [],
                password: []
            }
        };
    },

    getChildContext () {
        return {
            handleControlValueChange: this.handleControlValueChange
        };
    },

    render () {
        return (
            <Form {...this.getProps()}>
                <Input {...this.getEmailProps()}/>
                <Input {...this.getPasswordProps()} />
            </Form>
        );
    },

    getProps () {
        return {
            submitting: this.state.submitting,
            onSubmit: this.handleSubmit
        };
    },

    getEmailProps () {
        return {
            formControlProps: {
                title: 'Usuario'
            },
            required: true,
            controlId: 'username',
            errors: this.state.errors['username'],
            value: this.state.formData.username
        };
    },

    getPasswordProps () {
        return {
            formControlProps: {
                title: 'Contraseña'
            },
            required: true,
            controlId: 'password',
            errors: this.state.errors['password'],
            type: 'password',
            value: this.state.formData.password
        };
    },

    handleControlValueChange (controlId, value) {
        let nextFormData = lodash.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    },

    handleSubmit () {
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });

            Auth.login({
                username: this.state.formData.username,
                password: this.state.formData.password,
                success: this.handleUserLoginSuccess,
                error: this.handleUserLoginFailure
            });
        }
    },

    handleUserLoginSuccess () {

    },

    handleUserLoginFailure () {
        this.setState({submitting: false});
    },

    validateForm () {
        let error = false;
        let formData = this.state.formData;
        let errors = {
            username: [],
            password: []
        };
        let errorMessages = {
            'USERNAME_EMPTY': 'Debe ingresar un usuario',
            'PASSWORD_LENGTH_ERROR': 'Contraseña debe contener entre 4 y 32 caracteres',
            'PASSWORD_EMPTY': 'Debe ingresar contraseña'
        };

        if (!formData.username.trim().length) {
            errors['username'].push(errorMessages['USERNAME_EMPTY']);
            error = true;
        }

        if (!formData.password.trim().length) {
            errors['password'].push(errorMessages['PASSWORD_EMPTY']);
            error = true;
        } else if (formData.password.trim().length < 4 || formData.password.trim().length > 32) {
            errors['password'].push(errorMessages['PASSWORD_LENGTH_ERROR']);
            error = true;
        }

        this.setState({errors: errors});

        return !error;
    }
});

module.exports = LoginForm;