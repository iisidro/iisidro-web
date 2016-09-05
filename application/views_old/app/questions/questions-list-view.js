// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Heading = require('components-core/heading');
const HeadingMixin = require('components-core/mixins/heading-mixin');
const Table = require('components-core/table');
const Actionable = require('components-core/actionable');

// STORES
const questionsStore = require('application/stores/questions-store');

const QuestionsListView = React.createClass({

    mixins: [HeadingMixin],

    contextTypes: {
        router: React.PropTypes.object
    },

    render () {
        let columns = [
            {
                title: 'ID',
                key: 'id'
            },
            {
                title: 'Descripcion',
                key: 'statement'
            },
            {
                title: 'Longitud maxima',
                key: 'maxLength'
            }
        ];

        return (
            <div>
                <Heading className="questions-list-view--heading">Preguntas registradas</Heading>
                <div className="questions-list-view--actions">
                    <Actionable block={false} actionableSize="small" href="/app/admin/questions/new">
                        Nueva pregunta
                    </Actionable>
                </div>
                <Table columns={columns} data={questionsStore.getQuestions()} onRowClick={this.handleRowClick} />
            </div>
        );
    },

    handleRowClick (rowData) {
        this.context.router.push('/app/admin/questions/' + rowData.id);
    }
});

module.exports = QuestionsListView;