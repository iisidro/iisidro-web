var browserWindow = window;
var browserDocument = document;

var browser = {

    getBrowserDocument: function () {
        return browserDocument;
    },

    getBrowserWindow: function () {
        return browserWindow;
    },

    getElementById: function (id) {
        return this.getBrowserDocument().getElementById(id);
    },

    isFirefox: function () {

    },

    isIE: function () {

    },

    isMobileDevice: function () {

    }

};

module.exports = browser;