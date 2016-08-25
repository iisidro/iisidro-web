// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// COMPONENTS CORE
const Container = require('components-core/container');
const Actionable = require('components-core/actionable');
const appSidebarStore = require('components-core/stores/app-sidebar-store');

const AppContent = React.createClass({

    propTypes: {},

    componentWillMount () {
        appSidebarStore.addChangeListener(this.updateContentState);
    },

    componentWillUnmount () {
        appSidebarStore.removeChangeListener(this.updateContentState);
    },

    getInitialState () {
        return {
            shrinked: appSidebarStore.isSidebarActive()
        };
    },

    render () {
        return (
            <div className={this.getClass()}>
                <Container className="app-content--content">
                    {this.props.children}
                </Container>
            </div>
        );
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'app-content': true,
            'app-content_shrinked': (this.isContentShrinked()),
            [className]: (className)
        };

        return classNames(classes);
    },

    updateContentState () {
        this.setState({
            shrinked: appSidebarStore.isSidebarActive()
        })
    },

    isContentShrinked () {
        return (this.state.shrinked);
    }
});

module.exports = AppContent;