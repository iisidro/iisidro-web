// VENDOR LIBS
const _ = require('lodash');

module.exports.injectComponentTo = function (mod) {
    mod.component('menuList', {
        templateUrl: 'components-core/menu-list.html',
        bindings: {
            items: '='
        },
        controller: [function () {
            console.log(this.items);
        }],
        controllerAs: 'menuListCtrl'
    });
};
