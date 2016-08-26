module.exports.injectComponentsTo = (mod) => {
    require('components/components-app/access/LoginForm').injectComponentTo(mod);
};
