// VENDOR LIBS
const lodash = require('lodash');

// LIBS
const Auth = require('libs/api/auth');

const navigationItems = [
    {
        roles: ['ROLE_ADMIN'],
        key: 'admin-dashboard',
        title: 'Inicio',
        href: '/app/admin/dashboard',
        icon: 'dashboard'
    },
    {
        roles: ['ROLE_ADMIN'],
        key: 'questions',
        title: 'Preguntas',
        href: '/app/admin/questions',
        icon: 'info'
    },
    {
        roles: ['ROLE_ADMIN'],
        key: 'surveys',
        title: 'Encuestas',
        href: '/app/admin/surveys',
        icon: 'assignment_turned_in'
    },
    {
        roles: ['ROLE_ADMIN', 'ROLE_USER'],
        key: 'logout',
        title: 'Cerrar Sesion',
        onClick () {
            Auth.logout();
        },
        icon: 'exit_to_app'
    }
];

const forUser = function (roles) {
    return lodash.filter(navigationItems, (navigationItem) => {
        let rolesEnabled = navigationItem.roles;

        return (lodash.intersection(rolesEnabled, roles).length > 0);
    });
};

module.exports = {
    forUser: forUser
};