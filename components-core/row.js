// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const Row = React.createClass({

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
            'row': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Row;