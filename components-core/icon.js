// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const iconFonts = [
    'material-design',
    'font-awesome'
];
const iconSizes = [
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large',
    'gigantic'
];


const Icon = React.createClass({

    propTypes: {
        icon: React.PropTypes.string,
        iconFont: React.PropTypes.oneOf(iconFonts),
        iconSize: React.PropTypes.oneOf(iconSizes)
    },

    getDefaultProps () {
        return {
            iconFont: iconFonts[0],
            iconSize: 'medium'
        };
    },

    render () {
        return (
            <i {...this.getProps()}>{this.props.icon}</i>
        );
    },

    getProps () {
        return {
            className: this.getClass()
        };
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let iconSize = props.iconSize;
        let classes = {
            'icon': true,
            'icon_material': (props.iconFont === 'material-design'),
            ['icon_' + iconSize]: true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Icon;