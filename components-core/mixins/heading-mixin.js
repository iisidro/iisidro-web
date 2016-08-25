// VENDOR LIBS
const React = require('react');

module.exports = {
    contextTypes: {
        headingLevel: React.PropTypes.number
    },

    childContextTypes: {
        headingLevel: React.PropTypes.number
    },

    getChildContext () {
        let context = this.context || {};

        return {
            headingLevel: (context.headingLevel + 1) || 1
        };
    }
};