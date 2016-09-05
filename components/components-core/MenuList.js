// VENDOR LIBS
const _ = require('lodash');

module.exports.injectComponentTo = function (mod) {
    mod.component('menuList', {
        templateUrl: 'components-core/menu-list.html',
        bindings: {
            items: '='
        },
        controller: ['$state', function ($state) {
            this.isActiveRoute = (state) => {
                return $state.includes(state);
            };
        }],
        controllerAs: 'menuListCtrl'
    });
};
