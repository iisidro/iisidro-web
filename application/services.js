module.exports.injectServicesTo = (mod) => {
    require('application/services/Auth').injectServiceTo(mod);
    require('application/services/Loader').injectServiceTo(mod);
    require('libs/api/API').injectServiceTo(mod);
    require('libs/storage/Storage').injectServiceTo(mod);
};
