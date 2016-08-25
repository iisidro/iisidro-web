// VENDOR LIBS
const React = require('react');

const AdminContainer = React.createClass({

    componentWillMount () {
    },

    render () {
        return this.props.children;
    }
});

module.exports = AdminContainer;