// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// LIBS
const notificationStore = require('libs/notification/notification-store');
const notificationStoreEvents = require('libs/notification/notification-store-events');

// COMPONENTS CORE
const Message = require('components-core/message');

const PageErrorNotifier = React.createClass({

    getInitialState () {
        return {
            error: notificationStore.getError()
        };
    },

    componentWillMount () {
        notificationStore.addListener(notificationStoreEvents.ERROR_ADDED, this.updateError);
        notificationStore.addListener(notificationStoreEvents.ERROR_REMOVED, this.updateError);
    },

    render () {
        return (
            <div className={this.getClass()}>
                {this.renderErrorMessage()}
            </div>
        );
    },

    renderErrorMessage () {
        let messageNode;
        let error = this.getError();

        if (this.hasError()) {
            messageNode = <Message type="error" title={error.errorTitle}>{error.errorMessage}</Message>;
        }

        return messageNode;
    },

    getClass () {
        let className = this.props.className;
        let classes = {
            'page-error-notifier': true,
            'page-error-notifier_has-error': (this.hasError()),
            [className]: (className)
        };

        return classNames(classes);
    },

    getError () {
        return this.state.error || {};
    },

    hasError () {
        return Boolean(this.state.error);
    },

    updateError () {
        this.setState({
            error: notificationStore.getError()
        });
    }
});

module.exports = PageErrorNotifier;