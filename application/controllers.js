module.exports.injectControllersTo = (mod) => {
    require('application/controllers/access/LoginController').injectControllerTo(mod);
};
