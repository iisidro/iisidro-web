// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const Message = React.createClass({

    propTypes: {
        type: React.PropTypes.oneOf([
            'error',
            'info',
            'success',
            'warning'
        ])
    },

    getDefaultProps () {
        return {
            type: 'info'
        };
    },

    render () {
        return (
            <div {...this.getProps()}>
                {this.renderTitle()}
                {this.props.children}
            </div>
        );
    },

    renderTitle () {
        let content;
        let title = this.props.title;

        if (title) {
            content = (
                <div className="message--title">
                    {title}
                </div>
            );
        }

        return content;
    },

    getProps () {
        return {
            className: this.getClass()
        };
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let type = props.type;
        let classes = {
            'message': true,
            'message_info': (type === 'info'),
            'message_error': (type === 'error'),
            'message_success': (type === 'success'),
            'message_warning': (type === 'warning'),
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Message;