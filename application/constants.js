module.exports.injectConstantsTo = (mod) => {
    require('application/constants/tablesConfig').injectConstantTo(mod);
    require('application/constants/navigationItems').injectConstantTo(mod);
};
