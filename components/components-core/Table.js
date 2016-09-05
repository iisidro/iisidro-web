// VENDOR LIBS
const _ = require('lodash');

module.exports.injectComponentTo = function (mod) {
    mod.component('table', {
        templateUrl: 'components-core/table.html',
        bindings: {
            selectable: '=',
            content: '=',
            columns: '=',
            actions: '=',
            onSelect: '&'
        },
        controller: [function () {

        }],
        controllerAs: 'tableCtrl'
    });
};
