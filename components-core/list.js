// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const List = React.createClass({

    render () {
        return (
            <ul className={this.getClass()}>
                {this.props.children}
            </ul>
        );
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'list': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = List;