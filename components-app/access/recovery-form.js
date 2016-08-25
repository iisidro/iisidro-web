// VENDOR LIBS
const React = require('react');
const lodash = require('lodash');

// COMPONENTS CORE
const Input = require('components-core/input');
const Form = require('components-core/form');

const RecoveryForm = React.createClass({

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
                email: ''
            }
        };
    },

    getChildContext () {
        return {
            formConfig: {
                email: {
                    required: true,
                    title: 'Email'
                }
            },
            handleControlValueChange: this.handleControlValueChange
        };
    },

    render () {
        return (
            <Form {...this.getProps()}>
                <Input {...this.getEmailProps()}/>
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

    handleSubmit () {

    },

    handleControlValueChange (controlId, value) {
        let nextFormData = lodash.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    }
});

module.exports = RecoveryForm;