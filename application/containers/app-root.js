// VENDOR LIBS
const React = require('react');

// COMPONENTS APP
const PageErrorNotifier = require('components-app/page-error-notifier');

// LIBS
const authStore = require('libs/auth/auth-store');
const authStoreEvents = require('libs/auth/auth-store-events');

// COMPONENTS CORE
const AppBar = require('components-core/app-bar');
const AppContent = require('components-core/app-content');
const AppSidebar = require('components-core/app-sidebar');
const Column = require('components-core/column');
const Container = require('components-core/container');
const HeadingMixin = require('components-core/mixins/heading-mixin');
const Row = require('components-core/row');

const App = React.createClass({

    mixins: [HeadingMixin],

    getInitialState () {
        return {
            loaded: false,
            user: authStore.getUser()
        };
    },

    componentWillMount () {
        authStore.addChangeListener(this.updateUser);
        setTimeout(this.changeLoaded, 2000);
    },

    componentWillUnmount () {
        authStore.removeChangeListener(this.updateUser);
    },

    render () {
        return (this.state.loaded) ? this.renderContent() : null;
    },

    renderContent () {
        return (
            <div className="app-root">
                {this.renderAppBar()}
                {this.renderAppSidebar()}
                {this.renderAppContent()}
            </div>
        );
    },

    renderAppBar () {
        return (
            <AppBar {...this.getAppBarProps()}>
                IISIDRO
            </AppBar>
        );
    },

    renderAppSidebar () {
        var sidebarNode;

        if (this.state.user) {
            sidebarNode = (<AppSidebar user={this.state.user} />);
        }

        return sidebarNode;
    },

    renderAppContent () {
        return (
            <AppContent>
                <Row>
                    <Column xs={12} sm={8} smOffset={2} lg={6} lgOffset={3}>
                        <PageErrorNotifier />
                    </Column>
                </Row>
                {this.props.children}
            </AppContent>
        );
    },

    getAppBarProps () {
        let leftButtonProps;
        let rightButtonProps;
        let menuProps;

        if (this.state.user) {
            leftButtonProps = {
                icon: 'menu',
                onClick: AppSidebar.toggleSidebar
            };
            rightButtonProps = {
                icon: 'face'
            };
            menuProps = {

            };
        }

        return {
            leftButtonProps: leftButtonProps,
            rightButtonProps: rightButtonProps,
            menuProps: menuProps
        };
    },

    updateUser () {
        this.setState({
            user: authStore.getUser()
        });
    },

    changeLoaded () {
        this.setState({
            loaded: true
        });
    }
});

module.exports = App;