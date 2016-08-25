// LIBS
const errorMessages = require('libs/error/error-labels');
const i18n = require('libs/i18n/i18n');
const moment = require('moment');

module.exports = (error) => {
    let errorLabel = errorMessages[error.error];

    return {
        errorLabel: errorLabel,
        errorKey: error.error,
        errorMessage: i18n('ERROR-MESSAGE_' + errorLabel),
        errorTitle: i18n('ERROR-TITLE_' + errorLabel),
        status: error.status,
        timestamp: moment(error.timestamp)
    };
};