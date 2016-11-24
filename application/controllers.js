module.exports.injectControllersTo = (mod) => {
    require('application/controllers/containers/AccessController').injectControllerTo(mod);
    require('application/controllers/containers/AppController').injectControllerTo(mod);
    require('application/controllers/containers/BaseController').injectControllerTo(mod);
    require('application/controllers/access/LoginController').injectControllerTo(mod);
    require('application/controllers/app/admin/questions/QuestionsListController').injectControllerTo(mod);
    require('application/controllers/app/admin/questions/QuestionCreateEditController').injectControllerTo(mod);
    require('application/controllers/app/admin/surveys/SurveysListController').injectControllerTo(mod);
    require('application/controllers/app/admin/surveys/SurveyCreateEditController').injectControllerTo(mod);
    require('application/controllers/app/admin/sections/SectionsListController').injectControllerTo(mod);
    require('application/controllers/app/admin/sections/SectionCreateEditController').injectControllerTo(mod);
};

