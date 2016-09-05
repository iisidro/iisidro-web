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

app.config(['$mdThemingProvider', function ($mdThemingProvider) {
    $mdThemingProvider
        .theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey', {
            default: '50'
        });

}]);

module.exports = app;
