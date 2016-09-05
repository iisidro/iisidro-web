// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Heading = require('components-core/heading');

const AdminDashboardView = React.createClass({

    render () {
        return (
            <div>
                <Heading>Inicio</Heading>

                <span style={{position: 'absolute', bottom: 0}}>asd</span>
            </div>
        );
    }
});

module.exports = AdminDashboardView;