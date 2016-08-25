// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const FormControl = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        required: React.PropTypes.bool,
        example: React.PropTypes.string,
        errors: React.PropTypes.array
    },

    getDefaultProps () {
        return {
            errors: []
        };
    },

    render () {
        return (
            <label {...this.getProps()}>
                {this.renderFormControlLabel()}
                {this.props.children}
                {this.renderFormControlError()}
            </label>
        );
    },

    renderFormControlLabel () {
        let node;
        let props = this.props;

        if (props.title || props.example || props.required) {
            node = (
                <div>
                    {this.renderTitle()}
                    {this.renderExample()}
                    {this.renderRequiredMark()}
                </div>
            );
        }

        return node;
    },

    renderTitle () {
        let title = this.props.title;
        let node;

        if (title) {
            node = (
                <span className="form-control--title">{title}</span>
            );
        }

        return node;
    },

    renderExample () {
        let example = this.props.example;
        let node;

        if (example) {
            node = (
                <span className="form-control--example">{example}</span>
            );
        }

        return node;
    },

    renderRequiredMark () {
        let node;

        if (this.props.required) {
            node = (
                <span className="form-control--required-mark">*</span>
            );
        }

        return node;
    },

    renderFormControlError () {
        let errorMessageNode;

        if (this.hasErrors()) {
            errorMessageNode = <div className="form-control--error">{this.props.errors[0]}</div>;
        }

        return errorMessageNode;
    },

    getProps () {
        let props = lodash.pick(this.props, []);

        props.className = this.getClass();

        return props;
    },

    getClass () {
        let className = this.props.className;
        let classes = {
            'form-control': true,
            'form-control_with-errors': (this.hasErrors()),
            [className]: (className)
        };

        return classNames(classes);
    },

    hasErrors () {
        return Boolean(this.props.errors);
    }

});

module.exports = FormControl;