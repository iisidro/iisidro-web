/* ignored by test coverage */

const utils = require('test-utils/utils');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const React = require('react');

chai.use(sinonChai);

window.React = React;
window.expect = chai.expect;
window.sinon = sinon;
window.stub = sinon.stub;
window.spy = sinon.spy;
window.utils = utils;