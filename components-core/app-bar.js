// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// LIBS
/*
const authStore = require('libs/auth/auth-store');
const authStoreEvents = require('libs/auth/auth-store-events');
const Auth = require('libs/api/auth');
*/

// COMPONENTS CORE
const Actionable = require('components-core/actionable');
const appSidebarStore = require('components-core/stores/app-sidebar-store');

const AppBar = React.createClass({

    propTypes: {
        leftButtonProps: React.PropTypes.object,
        rightButtonProps: React.PropTypes.object,
        rightElement: React.PropTypes.node,
        menuProps: React.PropTypes.object
    },

    componentWillMount () {
        appSidebarStore.addChangeListener(this.updateBarState);
    },

    componentWillUnmount () {
        appSidebarStore.removeChangeListener(this.updateBarState);
    },

    getInitialState () {
        return {
            shrinked: appSidebarStore.isSidebarActive()
        };
    },

    render () {
        return (
            <div className={this.getClass()}>
                <div className="app-bar--content">
                    {this.renderLeftToolBox()}
                    <div className="app-bar--children">{this.props.children}</div>
                    {this.renderRightToolBox()}
                </div>
            </div>
        );
    },

    renderLeftToolBox () {
        return (<div className="app-bar--left-toolbox">{this.renderActionButton('left')}</div>);
    },

    renderRightToolBox () {
        let toolBoxContentNode = [];
        let props = this.props;

        if (props.rightElement) {
            toolBoxContentNode[0] = props.rightElement;
        } else {
            toolBoxContentNode[0] = this.renderActionButton('right');

            if (props.menuProps) {
                toolBoxContentNode[1] = this.renderMenuButton();
            }
        }

        return (
            <div className="app-bar--right-toolbox">
                {toolBoxContentNode[0]}
                {toolBoxContentNode[1]}
            </div>
        );
    },

    renderMenuButton () {
        let menuProps = this.props.menuProps;
        let menuButtonProps;
        let menuButtonNode;

        if (menuProps) {
            menuButtonProps = lodash.extend({}, menuProps, {
                actionableType: 'link-tertiary',
                block: false,
                icon: 'more_vert'
            });

            menuButtonNode = (
                <Actionable {...menuButtonProps} />
            );
        }

        return menuButtonNode;
    },

    renderActionButton (location) {
        let props = this.props;
        let actionButtonProps;
        let actionButtonNode;

        if (props[location + 'ButtonProps']) {
            actionButtonProps = lodash.extend({}, props[location + 'ButtonProps'], {
                actionableType: 'link-tertiary',
                block: false
            });

            actionButtonNode = (
                <Actionable {...actionButtonProps} />
            );
        }

        return actionButtonNode;
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'app-bar': true,
            'app-bar_shrinked': (this.isBarShrinked()),
            [className]: (className)
        };

        return classNames(classes);
    },

    reRenderComponent () {
        this.forceUpdate();
    },

    handleLogoutButtonClick () {
        //Auth.logout();
    },

    updateBarState () {
        this.setState({
            shrinked: appSidebarStore.isSidebarActive()
        })
    },

    isBarShrinked () {
        return (this.state.shrinked);
    }
});

module.exports = AppBar;