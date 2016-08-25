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

    getInitialState () {
        return {
            loaded: false,
            questions: []
        };
    },

    componentDidMount () {
        this.loadQuestions();
    },

    render () {
        let columns = [
            {
                title: 'ID',
                key: 'id'
            },
            {
                title: 'Titulo',
                key: 'nombre'
            },
            {
                title: 'Tipo',
                key: 'tipo.nombre'
            },
            {
                title: 'Informacion',
                key: 'informacion'
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
                <Table columns={columns} data={this.state.questions} onRowClick={this.handleRowClick} />
            </div>
        );
    },

    loadQuestions () {
        questionsStore.getQuestions().then((questions) => {
            this.setState({
                questions: questions
            });
        });
    },

    handleRowClick (rowData) {
        this.context.router.push('/app/admin/questions/' + rowData.id);
    }
});

module.exports = QuestionsListView;