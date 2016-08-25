// VENDOR LIBS
const MessageFormat = require('messageformat');

//TODO: move this variable to a common place across all application
const language = 'en';
const config = require('libs/config/global-config');

// APP DATA
const languages = {
    en: require('compiled-i18n/en/i18n-data.js'),
    es: require('compiled-i18n/es/i18n-data.js')
};
const i18nData = languages[config.get('language')];

const mf = new MessageFormat(language);

const i18n = function (key, params) {
    let i18nValue = i18nData[key];
    let message = mf.compile(i18nValue);

    return message(params || null);
};

module.exports = i18n;
