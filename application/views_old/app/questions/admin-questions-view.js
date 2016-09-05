// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Column = require('components-core/column');
const Heading = require('components-core/heading');
const Row = require('components-core/row');

const AdminQuestionsView = React.createClass({

    render () {
        return (
            <Row>
                <Column>
                    <Heading className="admin-questions-view--heading" >Preguntas</Heading>
                    {this.props.children}
                </Column>
            </Row>
        );
    }
});

module.exports = AdminQuestionsView;