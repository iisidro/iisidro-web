// VENDOR LIBS
const lodash = require('lodash');
const path = require('path');

const servicesPath = 'services';
const requiredServices = [
    require('services/users/user-login')
];
const services = {
    POST: {},
    GET: {},
    PUT: {},
    DELETE: {}
};

lodash.each(requiredServices, (service) => {
    let url = service.url;
    let methodsConfig = service.methods;
    let methods = Object.keys(methodsConfig);

    lodash.each(methods, (method) => {
        services[method][url] = methodsConfig[method];
    });

});

module.exports = function (config = {}) {
    let url = config.url;
    let method = lodash.get(config, 'method') || 'get';
    let service = services[method][url];

    if (!lodash.isFunction(service)) {
        if (config.done) {
            config.done(service);
        }

        if (config.always) {
            config.always();
        }
    } else {
        service(config.data, config);
    }
};
