// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Row = require('components-core/row');
const Column = require('components-core/column');
const Heading = require('components-core/heading');
const Container = require('components-core/container');

// LIBS
const authStore = require('libs/auth/auth-store');
const authStoreEvents = require('libs/auth/auth-store-events');

const AccessContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    componentWillMount () {
        authStore.addEventListener(authStoreEvents['USER_AUTH_SUCCEED'], this.handleUserLogin);

        if (authStore.isLogged()) {
            this.redirectToApp();
        }
    },

    render () {
        return (
            <Container>
                <Row>
                    <Column xs={10} xsOffset={1} sm={6} smOffset={3} lg={4} lgOffset={4}>
                        <Heading>Acceso IISIDRO</Heading>
                        {this.props.children}
                    </Column>
                </Row>
            </Container>
        );
    },

    handleUserLogin () {
        if (authStore.isLogged()) {
            this.redirectToApp();
        }
    },

    redirectToApp () {
        this.context.router.push('/app');
    }
});

module.exports = AccessContainer;