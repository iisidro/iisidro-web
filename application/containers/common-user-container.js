// VENDOR LIBS
const React = require('react');

const CommonUserContainer = React.createClass({

    componentWillMount () {
    },

    render () {
        return this.props.children;
    }
});

module.exports = CommonUserContainer;