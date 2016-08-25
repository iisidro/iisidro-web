// VENDOR LIBS
var classNames = require('classnames');
var lodash = require('lodash');
var React = require('react');

// COMPONENTS CORE
var CoreMixin = require('components-core/mixins/core-mixin');

var Checkbox = React.createClass({

    mixins: [CoreMixin],

    getDefaultProps: function () {

    },

    getInitialState: function () {
        var initialState = {};

        if (this.isUncontrolled('checked')) {
            initialState.checked = this.props.defaultChecked;
        }

        return initialState;
    },

    render: function () {
        return (
            <label {...this.getProps()}>
                <input {...this.getInputProps()} />
                <span className="checkbox--text">{this.props.children}</span>
            </label>
        );
    },

    getProps: function () {
        var props = lodash.extend({}, this.props, {
            className: this.getClass()
        });

        return props;
    },

    getClass: function () {
        var classes = {
            'checkbox': true,
            'checkbox_checked': this.state.checked
        };

        return classNames(classes);
    },

    getInputProps: function () {
        var props = {
            checked: this.getValue('checked'),
            className: 'checkbox--input',
            onChange: this.handleInputChange,
            type: 'checkbox'
        };

        return props;
    },

    handleInputChange: function () {
        this.setState({checked: !this.state.checked});
    }

});

module.exports = Checkbox;