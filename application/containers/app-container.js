// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Container = require('components-core/container');

// LIBS
const authStore = require('libs/auth/auth-store');
const authStoreEvents = require('libs/auth/auth-store-events');

const AppContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    componentWillMount () {
        authStore.addEventListener(authStoreEvents['USER_LOGOUT_SUCCEED'], this.handleUserLogout);

        if (!authStore.isLogged()) {
            this.redirectToAccess();
        }
    },

    render () {
        return this.props.children;
    },

    handleUserLogout () {
        if (!authStore.isLogged()) {
            this.redirectToAccess();
        }
    },

    redirectToAccess () {
        this.context.router.push('/access');
    }
});

module.exports = AppContainer;