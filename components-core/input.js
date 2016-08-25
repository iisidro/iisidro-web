// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// COMPONENTS CORE
const ControlMixin = require('components-core/mixins/control-mixin');

const Input = React.createClass({

    mixins: [ControlMixin],

    render () {
        return (
            <div {...this.getProps()}>
                {this.renderInput()}
            </div>
        );
    },

    renderInput () {
        return this.wrapInFormControl(<input {...this.getInputProps()} />);
    },

    getProps () {
        return {
            className: this.getClass()
        };
    },

    getInputProps () {
        let props = lodash.pick(this.props, ['value', 'type', 'min', 'max']);

        props.className = 'input--text-block';
        props.onChange = this.handleChange;

        return props;
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        var classes = {
            'input': true,
            'input_error': Boolean(this.hasErrors()),
            [className]: className
        };

        return classNames(classes);
    },

    handleChange (event) {
        this.context.handleControlValueChange(this.props.controlId, event.target.value);
    }

});

module.exports = Input;