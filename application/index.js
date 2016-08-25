const app = require('application/app');

require('application/router').injectRouterTo(app);
require('libs/api/api').injectTo(app);
require('application/templates').injectTemplatesTo(app);
