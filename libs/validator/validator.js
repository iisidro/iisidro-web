// VENDOR LIBS
var lodash = require('lodash');

var Validations = require('./validations');

var Validator = {

    getParameters: function (values, validationConfig, parameterIndexes) {
        var parameters = [];
        var valuesKeys = lodash.keysIn(values);

        lodash.each(parameterIndexes, function (index) {
            var realIndexOrValue = validationConfig[index];

            if (valuesKeys.indexOf(realIndexOrValue) > -1) {
                parameters.push(values[realIndexOrValue]);
            } else {
                parameters.push(realIndexOrValue);
            }
        });

        return parameters;
    },

    validate: function (index, values, errors, fieldValidations) {
        var self = this;
        var value = values[index];

        lodash.each(fieldValidations, function (fieldValidation, fieldValidationKey) {
            var validation = Validations[fieldValidationKey];
            var validationConfig = Validations.configs[fieldValidationKey] || {};
            var fieldValidationConfig = fieldValidations[fieldValidationKey];
            var result = false;
            var equal;
            var parameters;

            if (validation) {
                equal = fieldValidationConfig.equal;
                parameters = self.getParameters(values, fieldValidationConfig, validationConfig.extraParameters);

                if (parameters.length === 3) {
                    result = validation(value, parameters[0], parameters[1], parameters[2], equal);
                } else if (parameters.length === 2) {
                    result = validation(value, parameters[0], parameters[1], equal);
                } else if (parameters.length === 1) {
                    result = validation(value, parameters[0], equal);
                } else {
                    result = validation(value, equal);
                }
            }

            if (!result) {
                Validator.addError(errors, index, fieldValidationKey);
            } else {
                Validator.removeError(errors, index, fieldValidationKey);
            }
        });
    },

    validateForm: function (values, errors, configs) {
        configs = configs || {};

        lodash.each(values, function (value, index) {
            Validator.validate(index, values, errors, configs[index]);
        });
    },

    initializeErrorIndex: function (errors, fieldIndex) {
        if (!errors[fieldIndex]) {
            errors[fieldIndex] = [];
        }
    },

    addError: function (errors, fieldIndex, fieldValidationKey) {
        Validator.initializeErrorIndex(errors, fieldIndex);

        if (errors[fieldIndex].indexOf(fieldValidationKey) === -1) {
            errors[fieldIndex].push(fieldValidationKey);
        }
    },

    removeError: function (errors, fieldIndex, fieldValidationKey) {
        var errorIndex;

        if (errors[fieldIndex]) {
            errorIndex = errors[fieldIndex].indexOf(fieldValidationKey);

            if (errorIndex > -1) {
                errors[fieldIndex].splice(errorIndex, 1);
            }
        }
    }

};

module.exports = Validator;