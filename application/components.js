module.exports.injectComponentsTo = (mod) => {
    require('components/components-app/access/LoginForm').injectComponentTo(mod);
    require('components/components-core/MenuList').injectComponentTo(mod);
    require('components/components-core/Table').injectComponentTo(mod);
};
