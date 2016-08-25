// VENDOR LIBS
const angular = require('angular');
const angularMaterial = require('angular-material');
const uiRouter = require('angular-ui-router');

const app = angular.module('iisidro', [
    angularMaterial,
    uiRouter
]);

module.exports = app;
