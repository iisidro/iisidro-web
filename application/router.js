// VENDOR LIBS
const _ = require('lodash');

module.exports.injectRouterTo = (mod) => {
    mod.constant('stateRestrictions', [
        {
            stateName: 'app'
        },
        {
            stateName: 'app.admin'
        },
        {
            stateName: 'access'
        }
    ]);
    mod.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider) => {
            $locationProvider.html5Mode(true);

            // ACCESS CONFIGURATION
            $stateProvider
                .state('access', {
                    abstract: true,
                    url: '/access',
                    templateUrl: 'containers/access-container.html',
                    controller: ['Loader', function (Loader) {
                        this.loaded = Loader.isLoaded();

                        this.handleResourcesLoad = () => {
                            this.loaded = true;
                        };

                        Loader.onLoaded(this.handleResourcesLoad);
                    }],
                    controllerAs: 'accessCtrl'
                })
                .state('access.login', {
                    url: '/login',
                    templateUrl:  'views/access/login-view.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'loginCtrl'
                })
                .state('access.register', {
                    url: '/register',
                    templateUrl:  'views/access/register-view.html'
                })
                .state('access.recovery', {
                    url: '/recovery',
                    templateUrl:  'views/access/recovery-view.html'
                });

            // ACCESS FALLBACKS
            $urlRouterProvider.when(new RegExp('/access*'), '/access/login');

            // APP CONFIGURATION
            $stateProvider
                .state('app', {
                    url: '/',
                    templateUrl: 'containers/app-container.html'
                });

            // ADMIN CONFIGURATION
            $stateProvider
                .state('app.admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl: 'views/abstract.html'
                })
                .state('app.admin.dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/app/admin/admin-dashboard-view.html'
                });

            // ADMIN QUESTIONS CONFIGURATION
            $stateProvider
                .state('app.admin.questions', {
                    abstract: true,
                    url: '/questions',
                    templateUrl: 'views/app/admin/questions/questions-view.html'
                })
                .state('app.admin.questions.list', {
                    url: '/list',
                    templateUrl: 'views/app/admin/questions/questions-list-view.html'
                })
                .state('app.admin.questions.create', {
                    url: '/create',
                    templateUrl: 'views/app/admin/questions/question-create-edit-view.html'
                })
                .state('app.admin.questions.edit', {
                    url: '/edit/:questionId',
                    templateUrl: 'views/app/admin/questions/question-create-edit-view.html'
                });

            // ADMIN QUESTIONS FALLBACKS
            $urlRouterProvider.when(new RegExp('/admin/questions*'), '/admin/questions/list');

            // ADMIN SURVEYS CONFIGURATION
            $stateProvider
                .state('app.admin.surveys', {
                    abstract: true,
                    url: '/surveys',
                    templateUrl: 'views/app/admin/surveys/surveys-view.html'
                })
                .state('app.admin.surveys.list', {
                    url: '/list',
                    templateUrl: 'views/app/admin/surveys/surveys-list-view.html'
                })
                .state('app.admin.surveys.create', {
                    url: '/create',
                    templateUrl: 'views/app/admin/surveys/survey-create-edit-view.html'
                })
                .state('app.admin.surveys.edit', {
                    url: '/edit/:surveyId',
                    templateUrl: 'views/app/admin/surveys/survey-create-edit-view.html'
                });

            // ADMIN SURVEYS FALLBACKS
            $urlRouterProvider.when(new RegExp('/admin/surveys*'), '/admin/surveys/list');

            // ADMIN FALLBACKS
            $urlRouterProvider.when(new RegExp('/admin*'), '/admin/dashboard');

            $urlRouterProvider.otherwise('/');
        }
    ]);

    mod.run([
        'stateRestrictions',
        '$rootScope',
        '$state',
        function (stateRestrictions, $rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
                //console.log($state, toState);

                /*
                let restrictions = _.filter(stateRestrictions, (stateRestriction) => {
                    return _.includes(toState.name, stateRestriction.stateName);
                });

                if (restrictions.length) {
                    event.preventDefault();

                    $state.go(toState.name, toParams, {notify: false});
                }
                */
            });
        }
    ]);
};
