// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const Column = React.createClass({

    windowSizes: ['xs', 'sm', 'md', 'lg'],

    propTypes: {
        lg: React.PropTypes.number,
        md: React.PropTypes.number,
        sm: React.PropTypes.number,
        xs: React.PropTypes.number,
        lgOffset: React.PropTypes.number,
        mdOffset: React.PropTypes.number,
        smOffset: React.PropTypes.number,
        xsOffset: React.PropTypes.number,
        lgPull: React.PropTypes.number,
        mdPull: React.PropTypes.number,
        smPull: React.PropTypes.number,
        xsPull: React.PropTypes.number,
        lgPush: React.PropTypes.number,
        mdPush: React.PropTypes.number,
        smPush: React.PropTypes.number,
        xsPush: React.PropTypes.number,
        lgHidden: React.PropTypes.bool,
        mdHidden: React.PropTypes.bool,
        smHidden: React.PropTypes.bool,
        xsHidden: React.PropTypes.bool
    },

    render () {
        return (
            <div {...this.getProps()}>
                {this.props.children}
            </div>
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
        let classes = lodash.extend({
            'column': true,
            ['column-lg-' + this.getColumnSizeValue('lg')]: this.getColumnSizeValue('lg'),
            ['column-md-' + props.md]: this.getColumnSizeValue('md'),
            ['column-sm-' + props.sm]: this.getColumnSizeValue('sm'),
            ['column-xs-' + props.xs]: this.getColumnSizeValue('xs'),
            [className]: (className)
        }, this.getColumnClasses('offset'), this.getColumnClasses('pull'), this.getColumnClasses('push'));

        return classNames(classes);
    },

    getColumnClasses (modifier) {
        let capitalizedModifier = lodash.capitalize(modifier);
        let classes = {};
        let props = this.props;

        if (props['lg' + capitalizedModifier] || props['md' + capitalizedModifier] ||
            props['sm' + capitalizedModifier] || props['xs' + capitalizedModifier]) {

            classes['column-lg-' + modifier + '-' + props['lg' + capitalizedModifier]] = props['lg' + capitalizedModifier];
            classes['column-md-' + modifier + '-' + props['md' + capitalizedModifier]] = props['md' + capitalizedModifier];
            classes['column-sm-' + modifier + '-' + props['sm' + capitalizedModifier]] = props['sm' + capitalizedModifier];
            classes['column-xs-' + modifier + '-' + props['xs' + capitalizedModifier]] = props['xs' + capitalizedModifier];
        } else if (!modifier) {
            classes['column-lg-12'] =  (true);
        }

        return classes;
    },

    getColumnSizeValue (size) {
        let props = this.props;
        let value;

        size = size || 'lg';

        if (props[size]) {
            value = props[size];
        } else if (!props.md && !props.sm && !props.xs && size === 'lg') {
            value = 12;
        }

        return value;
    }
});

module.exports = Column;