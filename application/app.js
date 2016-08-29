// VENDOR LIBS
const angular = require('angular');
const angularAnimate = require('angular-animate');
const angularMaterial = require('angular-material');
const angularMessages = require('angular-messages');
const uiRouter = require('angular-ui-router');

const app = angular.module('iisidro', [
    angularAnimate,
    angularMaterial,
    angularMessages,
    uiRouter
]);

app.constant('storagePrefix', 'IISIDRO_');

module.exports = app;
