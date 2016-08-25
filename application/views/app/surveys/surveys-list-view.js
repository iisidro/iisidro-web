// VENDOR LIBS
const React = require('react');

// COMPONENTS CORE
const Heading = require('components-core/heading');
const HeadingMixin = require('components-core/mixins/heading-mixin');
const Table = require('components-core/table');
const Actionable = require('components-core/actionable');

// STORES
const surveysStore = require('application/stores/surveys-store');

const SurveysListView = React.createClass({

    mixins: [HeadingMixin],

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState () {
        return {
            loaded: false,
            surveys: []
        };
    },

    componentDidMount () {
        this.loadSurveys();
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
            }
        ];

        return (
            <div>
                <Heading className="surveys-list-view--heading">Encuestas registradas</Heading>
                <div className="surveys-list-view--actions">
                    <Actionable block={false} actionableSize="small" href="/app/admin/surveys/new">
                        Nueva encuesta
                    </Actionable>
                </div>
                <Table columns={columns} data={this.state.surveys} onRowClick={this.handleRowClick} />
            </div>
        );
    },

    loadSurveys () {
        surveysStore.getSurveys().then((surveys) => {
            this.setState({
                surveys: surveys
            });
        });
    },

    handleRowClick (rowData) {
        this.context.router.push('/app/admin/surveys/' + rowData.id);
    }
});

module.exports = SurveysListView;