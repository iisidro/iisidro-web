module.exports.injectConstantTo = (mod) => {
    mod.constant('navigationItems', [
        {
            icon: 'dashboard',
            label: 'Inicio',
            rootState: 'base.app.admin.dashboard',
            sref: 'base.app.admin.dashboard'
        },
        {
            icon: 'list',
            label: 'Preguntas',
            rootState: 'base.app.admin.questions',
            sref: 'base.app.admin.questions.list'
        },
        {
            icon: 'list',
            label: 'Secciones',
            rootState: 'base.app.admin.sections',
            sref: 'base.app.admin.sections.list'
        },
        {
            icon: 'list',
            label: 'Encuestas',
            rootState: 'base.app.admin.surveys',
            sref: 'base.app.admin.surveys.list'
        }
    ]);
};
