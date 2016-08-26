module.exports.injectServicesTo = (mod) => {
    require('libs/api/api').injectServiceTo(mod);
    require('libs/api/auth').injectServiceTo(mod);
    require('libs/storage/storage').injectServiceTo(mod);
};
