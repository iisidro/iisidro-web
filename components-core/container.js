// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const Container = React.createClass({

    propTypes: {
        fluid: React.PropTypes.bool
    },

    getDefaultProps () {
        return {
            fluid: true
        };
    },

    render () {
        return (
            <div className={this.getClass()}>
                {this.props.children}
            </div>
        );
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'container': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Container;