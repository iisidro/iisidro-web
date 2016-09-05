// VENDOR LIBS
const React = require('react');

// COMPONENTS APP
const RegisterForm = require('components-app/access/register-form');

const RegisterView = React.createClass({

    render () {
        return (
            <RegisterForm />
        );
    }
});

module.exports = RegisterView;