var moment = require('moment');
var lodash = require('lodash');

var configs = {
    isGreaterThan: {
        extraParameters: ['field']
    },
    isNotEmpty: {
    },
    isLargerThan: {
        extraParameters: ['than']
    }
};

var validations = {

    configs: configs,

    isGreaterThan: function (bigger, lower, equal) {
        var result;

        if (equal) {
            result = bigger >= lower;
        } else {
            result = bigger > lower;
        }

        return result;
    },

    isLowerThan: function (lower, bigger, equal) {
        var result;

        if (equal) {
            result = lower <= bigger;
        } else {
            result = lower < bigger;
        }

        return result;
    },

    isAfterThan: function (after, before, equal) {
        var afterAux = (moment.isMoment(after)) ? after : moment(after);
        var beforeAux = (moment.isMoment(before)) ? before : moment(before);
        var result;

        if (equal) {
            result = afterAux.isSame(beforeAux);

            if (!result) {
                result = afterAux.isAfter(beforeAux);
            }
        } else {
            result = afterAux.isAfter(beforeAux);
        }

        return result;
    },

    isBeforeThan: function (before, after, equal) {
        var beforeAux = (moment.isMoment(before)) ? before : moment(before);
        var afterAux = (moment.isMoment(after)) ? after : moment(after);
        var result;

        if (equal) {
            result = beforeAux.isSame(afterAux);

            if (!result) {
                result = beforeAux.isBefore(afterAux);
            }
        } else {
            result = beforeAux.isBefore(afterAux);
        }

        return result;
    },

    isLargerThan: function (larger, shorter, equal) {
        var result;
        var shorterLength = (lodash.isNumber(shorter)) ? shorter : shorter.length;

        if (equal) {
            result = larger.toString().length >= shorterLength;
        } else {
            result = larger.toString().length > shorterLength;
        }

        return result;
    },

    isShorterThan: function (shorter, larger, equal) {
        var result;

        if (equal) {
            result = shorter.toString().length <= larger.length;
        } else {
            result = shorter.toString().length < larger.length;
        }

        return result;
    },

    isEmail: function (email) {
        var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        return regExp.test(email);
    },

    isEmpty: function (value) {
        return !(Validations.isNotEmpty(value));
    },

    isNotEmpty: function (value) {
        var result = false;

        if (value) {
            result = (value.toString().length > 0);
        }

        return result;
    },

    isRequired: function (value) {
        return Validations.isNotEmpty(value);
    }

};

module.exports = validations;