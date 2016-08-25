// VENDOR LIBS
const React = require('react');
const lodash = require('lodash');

module.exports.forContext = function (contextShape) {
    return React.createClass({

        childContextTypes: contextShape,

        getChildContext () {
            return this.props.context;
        },

        render () {
            let children = this.props.children;
            let additionalProps = lodash.extend({}, this.state, {ref: 'component'});

            return React.cloneElement(children, additionalProps);
        },

        getComponent () {
            return this.refs.component;
        },

        setProps (props) {
            this.setState(props);
        }
    });
};