// VENDOR LIBS
const React = require('react');
const _ = require('lodash');

// COMPONENTS CORE
const FormControl = require('components-core/form-control');

module.exports = {

    contextTypes: {
        handleControlValueChange: React.PropTypes.func,
        wrapInFormControl: React.PropTypes.bool
    },

    propTypes: {
        controlId: React.PropTypes.string.isRequired,
        formControlProps: React.PropTypes.shape({
            title: React.PropTypes.string
        }),
        required: React.PropTypes.bool,
        errors: React.PropTypes.array
    },

    wrapInFormControl (element) {
        let modifiedElement = element;
        let formControlProps;
        let props = this.props;

        if (this.context.wrapInFormControl) {
            formControlProps = _.extend({}, props.formControlProps, {
                required: props.required,
                errors: props.errors
            });

            modifiedElement = (
                <FormControl {...formControlProps}>
                    {element}
                </FormControl>
            );
        }

        return modifiedElement;
    },

    hasErrors () {
        return Boolean(_.get(this.props, 'errors.length', 0));
    }
};