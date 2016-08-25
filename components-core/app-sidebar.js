// VENDOR LIBS
const classNames = require('classnames');
const React = require('react');
const lodash = require('lodash');

// COMPONENTS CORE
const Actionable = require('components-core/actionable');
const List = require('components-core/list');
const appSidebarStore = require('components-core/stores/app-sidebar-store');

// LIBS
const navigation = require('libs/navigation/navigation');
const authStore = require('libs/auth/auth-store');
const authStoreEvents = require('libs/auth/auth-store-events');

const AppSidebar = React.createClass({

    statics: {
        toggleSidebar: function () {
            if (appSidebarStore.isSidebarActive()) {
                appSidebarStore.deactivateSidebar();
            } else {
                appSidebarStore.activateSidebar();
            }
        }
    },

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState () {
        return {
            activated: appSidebarStore.isSidebarActive()
        };
    },

    componentDidMount () {
        appSidebarStore.addChangeListener(this.updateSidebarState);
    },

    componentWillUnmount () {
        appSidebarStore.removeChangeListener(this.updateSidebarState);

        appSidebarStore.deactivateSidebar();
    },

    render () {
        return (this.isUserLogged()) ? this.renderContent() : null;
    },

    renderContent () {
        return (
            <div className={this.getClass()}>
                <div className="app-sidebar--content">
                    {this.renderProfile()}
                    {this.renderNavigationMenu()}
                </div>
            </div>
        );
    },

    renderProfile () {
        let user = this.props.user;

        return (
            <div className="app-sidebar--profile">
                <div className="app-sidebar--profile-photo"></div>
                <div className="app-sidebar--profile-name">{user.firstName} {user.lastName}</div>
                <div className="app-sidebar--profile-email">{user.email}</div>
            </div>
        );
    },

    renderNavigationMenu () {
        let navigationItems = navigation.forUser(this.props.user.roles);

        return (
            <List>
                {lodash.map(navigationItems, this.renderNavigationItem)}
            </List>
        );
    },

    renderNavigationItem (navigationItem) {
        let actionableProps = {
            active: (navigationItem.href && this.context.router.isActive({pathname: navigationItem.href})),
            actionableType: 'link-sidebar',
            href: navigationItem.href,
            icon: navigationItem.icon || 'lens',
            iconSize: 'small',
            children: navigationItem.title,
            onClick: navigationItem.onClick
        };

        return (
            <li key={navigationItem.key}><Actionable {...actionableProps} /></li>
        );
    },

    getClass () {
        var classes = {
            'app-sidebar': true,
            'app-sidebar_activated': (this.isSidebarActive())
        };

        return classNames(classes);
    },

    updateSidebarState () {
        this.setState({
            activated: appSidebarStore.isSidebarActive()
        });
    },

    isSidebarActive () {
        return (this.state.activated);
    },

    isUserLogged () {
        return Boolean(this.props.user);
    }
});

module.exports = AppSidebar;