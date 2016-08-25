module.exports.injectRouterTo = (angularModule) => {
    angularModule.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider) => {
            $locationProvider.html5Mode(true);

            // ACCESS CONFIGURATION
            $stateProvider
                .state('access', {
                    abstract: true,
                    resolve: {
                        user: () => {

                        }
                    },
                    templateUrl: 'containers/access-container.html',
                    url: '/access'
                })
                .state('access.login', {
                    url: '/login',
                    templateUrl:  'views/access/login-view.html'
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
                    url: '/app',
                    resolve: {
                        user: () => {

                        }
                    },
                    templateUrl: 'views/abstract.html'
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
            $urlRouterProvider.when(new RegExp('/app/admin/questions*'), '/app/admin/questions/list');

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
            $urlRouterProvider.when(new RegExp('/app/admin/surveys*'), '/app/admin/surveys/list');

            // ADMIN FALLBACKS
            $urlRouterProvider.when(new RegExp('/app/admin*'), '/app/admin/dashboard');

            $urlRouterProvider.otherwise('/app');
        }
    ]);
}
