// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');
const ReactRouter = require('react-router');
const browserHistory = ReactRouter.browserHistory;

// COMPONENTS CORE
var Icon = require('components-core/icon');

const Actionable = React.createClass({

    propTypes: {
        actionableSize: React.PropTypes.oneOf(['small', 'medium', 'large']),
        actionableType: React.PropTypes.oneOf([
            'button-primary',
            'button-secondary',
            'button-tertiary',
            'button-quaternary',
            'link-primary',
            'link-secondary',
            'link-tertiary',
            'link-quaternary',
            'link-sidebar',
            'link-date-picker'
        ]),
        block: React.PropTypes.bool,
        icon: React.PropTypes.string,
        iconLocation: React.PropTypes.oneOf([
            'left',
            'right'
        ])
    },

    getDefaultProps: function () {
        return {
            actionableSize: 'medium',
            actionableType: 'button-primary',
            block: true,
            iconLocation: 'left'
        };
    },

    render: function () {
        let props = this.props;
        let Wrapper = (this.isLink()) ? 'a' : 'button';
        let children = this.renderContent();
        let icon = this.renderIcon();
        let content = (props.iconLocation === 'right') ? [children, icon] : [icon, children];

        return (
            <Wrapper {...this.getProps()}>
                {content[0]}
                {content[1]}
            </Wrapper>
        );
    },

    renderContent: function () {
        return (
            <span className="actionable--content">{this.props.children}</span>
        );
    },

    renderIcon: function () {
        let props = this.props;
        let icon;

        if (props.icon) {
            icon = (<Icon className="actionable--icon" icon={this.props.icon} />);
        }

        return icon;
    },

    getProps: function () {
        let props = lodash.pick(this.props, ['disabled', 'href', 'onKeyDown']);

        props.href = (props.disabled) ? null : props.href;
        props.className = this.getClass();
        props.onClick = this.handleClick;

        return props;
    },

    getClass: function () {
        let props = this.props;
        let className = props.className;
        let actionableType = props.actionableType;
        let actionableSize = props.actionableSize;
        let icon = props.icon;
        let iconLocation = props.iconLocation;
        let classes = {
            'actionable': true,
            'actionable_active': (props.active),
            'actionable_selected': (props.selected),
            'actionable_button': (this.hasButtonActionableType()),
            'actionable_link': (!this.hasButtonActionableType()),
            'actionable_block': (this.props.block),
            'actionable_disabled': (props.disabled),
            'actionable_icon': (icon),
            'actionable_icon-only': (icon && !this.hasChildren()),
            'actionable_icon-left': (icon && iconLocation === 'left' && this.hasChildren()),
            'actionable_icon-right': (icon && iconLocation === 'right' && this.hasChildren()),
            ['actionable_' + actionableType]: (actionableType),
            ['actionable_' + actionableSize]: (actionableSize)
        };

        return classNames(classes, className);
    },

    getLocation: function () {
        let props = this.props;

        return props.route || props.href;
    },

    isLink: function () {
        return Boolean(this.getLocation());
    },

    hasChildren () {
        return Boolean(this.props.children);
    },

    hasButtonActionableType: function () {
        return (this.props.actionableType.indexOf('button') > -1);
    },

    handleClick: function (event) {
        if (this.isLink() && !this.props.disabled) {
            event.preventDefault();

            browserHistory.push(this.getLocation());
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

});

module.exports = Actionable;