module.exports = (function () {
    // VENDOR LIBS
    const React = require('react');
    const ReactRouter = require('react-router');
    const Router = ReactRouter.Router;
    const render = require('react-dom').render;
    const browserHistory = ReactRouter.browserHistory;

    // ROUTE TYPES
    const Route = ReactRouter.Route;
    const IndexRoute = ReactRouter.IndexRoute;
    const IndexRedirect = ReactRouter.IndexRedirect;
    const Redirect = Router.Redirect;

    const views = require('application/views');
    const containers = require('application/containers');

    const ModuleRouter = function () {
        this.routes = (
            <Route path='/' component={containers.App}>
                <Route path='app' component={containers.AppContainer}>
                    <Route path='admin' component={containers.AdminContainer}>
                        <Route path='dashboard' component={views.AdminDashboardView} />
                        <Route path='questions' component={views.AdminQuestionsView}>
                            <IndexRoute component={views.QuestionsListView} />
                            <Route path="new" component={views.QuestionCreateEditView} />
                            <Route path=":questionId" component={views.QuestionCreateEditView} />
                        </Route>
                        <Route path='surveys' component={views.AdminSurveysView}>
                            <IndexRoute component={views.SurveysListView} />
                            <Route path="new" component={views.SurveyCreateEditView} />
                            <Route path=":surveyId" component={views.SurveyCreateEditView} />
                        </Route>

                        <IndexRedirect to='/app/admin/dashboard' />
                    </Route>
                    <IndexRoute component={containers.CommonUserContainer}>
                        <Route path='dashboard' component={views.AdminDashboardView} />

                        <IndexRedirect to='/app/admin/dashboard' />
                    </IndexRoute>
                </Route>
                <Route path='access' component={containers.AccessContainer}>
                    <Route path='login' component={views.LoginView} />
                    <Route path='register' component={views.RegisterView} />
                    <Route path='recovery' component={views.RecoveryView} />

                    <IndexRedirect to='/access/login' />
                </Route>

                <IndexRedirect to='/app' />
            </Route>
        );
    };

    ModuleRouter.prototype.run = function (mountElement) {
        render(<Router history={browserHistory} routes={this.routes} />, mountElement);
    };

    return new ModuleRouter();
})();