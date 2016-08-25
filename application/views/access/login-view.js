// VENDOR LIBS
const React = require('react');

// COMPONENTS APP
const LoginForm = require('components-app/access/login-form');

const LoginView = React.createClass({

    render () {
        return (
            <LoginForm />
        );
    }
});

module.exports = LoginView;