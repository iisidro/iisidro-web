// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// COMPONENTS CORE
const FormControl = require('components-core/form-control');
const Actionable = require('components-core/actionable');
const Column = require('components-core/column');

const Form = React.createClass({

    contextTypes: {
        handleControlValueChange: React.PropTypes.func
    },

    childContextTypes: {
        handleControlValueChange: React.PropTypes.func,
        wrapInFormControl: React.PropTypes.bool
    },

    propTypes: {
        renderActions: React.PropTypes.func,
        submitting: React.PropTypes.bool,
        onSubmit: React.PropTypes.func,
        wrapInFormControl: React.PropTypes.bool
    },

    getChildContext () {
        return {
            handleControlValueChange: this.context.handleControlValueChange || this.handleControlValueChange,
            wrapInFormControl: this.props.wrapInFormControl
        };
    },

    getDefaultProps () {
        return {
            wrapInFormControl: true
        };
    },

    render () {
        let renderActions = this.props.renderActions || this.renderActions;

        return (
            <form {...this.getProps()}>
                {this.props.children}
                {renderActions()}
            </form>
        );
    },

    renderActions () {
        return (
            <Column>
                <Actionable {...this.getSubmitButtonProps()}>Ingresar</Actionable>
            </Column>
        );
    },

    getProps () {
        return {
            className: this.getClass(),
            onSubmit: this.handleFormSubmit
        }
    },

    getSubmitButtonProps () {
        return {
            actionableType: 'button-quaternary',
            disabled: this.props.submitting
        };
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'form': true,
            [className]: (className)
        };

        return classNames(classes);
    },

    handleFormSubmit (event) {
        let onSubmit = this.props.onSubmit;

        event.preventDefault();

        if (onSubmit) {
            onSubmit();
        }
    },

    handleControlValueChange (controlId, value) {

    }
});

module.exports = Form;