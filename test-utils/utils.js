// VENDOR LIBS
const TestUtils = require('react-addons-test-utils');
const lodash = require('lodash');

// TEST UTILS
const simulate = require('test-utils/simulate');

const getRenderer = function (context) {
    let contextTypes = {};
    let contextKeys = lodash.keys(context);

    lodash.each(contextKeys, (key) => {
        let value = context[key];

        if (lodash.isArray(value)) {
            contextTypes[key] = React.PropTypes.array;
        } else if (lodash.isString(value)) {
            contextTypes[key] = React.PropTypes.string;
        } else if (lodash.isBoolean(value)) {
            contextTypes[key] = React.PropTypes.bool;
        } else if (lodash.isFunction(value)) {
            contextTypes[key] = React.PropTypes.func;
        } else if (lodash.isNumber(value)) {
            contextTypes[key] = React.PropTypes.number;
        } else {
            contextTypes[key] = React.PropTypes.object;
        }
    });

    return require('test-utils/renderer').forContext(contextTypes);
};

const getChildComponent = function (value, index) {

};

const utils = {
    render (component, childComponents, context) {
        let Renderer = getRenderer(context);
        let renderer = TestUtils.renderIntoDocument(<Renderer context={context}>{component}</Renderer>);

        renderer.component = renderer.getComponent();

        if (lodash.isArray(childComponents)) {
            lodash.each(childComponents, getChildComponent, renderer);
        }

        return renderer;
    },

    simulate: simulate.generic
};


module.exports = utils;