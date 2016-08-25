// VENDOR LIBS
const React = require('react');
const lodash = require('lodash');

//LIBS
//const Auth = require('libs/api/auth');

// COMPONENTS CORE
const Input = require('components-core/input');
const Form = require('components-core/form');

const RegisterForm = React.createClass({

    childContextTypes: {
        formConfig: React.PropTypes.object,
        handleControlValueChange: React.PropTypes.func
    },

    propTypes: {
        onLoginSuccess: React.PropTypes.func,
        onLoginFailed: React.PropTypes.func
    },

    getInitialState () {
        return {
            formData: {
                email: '',
                password: '',
                passwordConfirmation: ''
            }
        };
    },

    getChildContext () {
        return {
            formConfig: {
                email: {
                    required: true,
                    title: 'Email'
                },
                password: {
                    required: true,
                    title: 'Password'
                },
                passwordConfirmation: {
                    required: true,
                    title: 'Confirmation'
                }
            },
            handleControlValueChange: this.handleControlValueChange
        };
    },

    render () {
        return (
            <Form {...this.getProps()}>
                <Input {...this.getEmailProps()}/>
                <Input {...this.getPasswordProps()} />
                <Input {...this.getPasswordConfirmationProps()} />
            </Form>
        );
    },

    getProps () {
        return {
            onSubmit: this.handleSubmit
        };
    },

    getEmailProps () {
        return {
            controlId: 'email',
            value: this.state.formData.email
        };
    },

    getPasswordProps () {
        return {
            controlId: 'password',
            type: 'password',
            value: this.state.formData.password
        };
    },

    getPasswordConfirmationProps () {
        return {
            controlId: 'passwordConfirmation',
            type: 'password',
            value: this.state.formData.passwordConfirmation
        };
    },

    handleControlValueChange (controlId, value) {
        let nextFormData = lodash.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    },

    handleSubmit () {
        /*
        Auth.createUser({
            email: this.state.formData.email,
            password: this.state.formData.password,
            success: this.handleUserCreationSuccess,
            error: this.handleUserCreationFailure
        });
        */
    },

    handleUserCreationSuccess () {

    },

    handleUserCreationFailure (error) {
        console.log(error);
    }
});

module.exports = RegisterForm;