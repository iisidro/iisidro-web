// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Column = require('components-core/column');
const Heading = require('components-core/heading');
const Row = require('components-core/row');

const AdminSurveysView = React.createClass({

    render () {
        return (
            <Row>
                <Column>
                    <Heading className="admin-surveys-view--heading" >Encuestas</Heading>
                    {this.props.children}
                </Column>
            </Row>
        );
    }
});

module.exports = AdminSurveysView;