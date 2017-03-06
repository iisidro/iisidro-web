const app = require('application/app');

require('application/templates').injectTemplatesTo(app);
require('application/services').injectServicesTo(app);
require('application/constants').injectConstantsTo(app);
require('application/controllers').injectControllersTo(app);
require('application/components').injectComponentsTo(app);
require('application/router').injectRouterTo(app);
