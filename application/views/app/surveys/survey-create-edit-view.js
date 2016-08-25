// VENDOR LIBS
const React = require('react');
const _ = require('lodash');

// COMPONENTS CORE
const Heading = require('components-core/heading');
const HeadingMixin = require('components-core/mixins/heading-mixin');
const Actionable = require('components-core/actionable');
const Input = require('components-core/input');
const Column = require('components-core/column');
const Row = require('components-core/row');
const Form = require('components-core/form');

// STORES
const surveysStore = require('application/stores/surveys-store');

const SurveysCreateEditView = React.createClass({

    mixins: [HeadingMixin],

    contextTypes: {
        router: React.PropTypes.object
    },

    childContextTypes: {
        formConfig: React.PropTypes.object,
        errors: React.PropTypes.object,
        handleControlValueChange: React.PropTypes.func
    },


    getInitialState () {
        let values = {
            title: ''
        };

        if (this.isEditingSurvey()) {
            this.loadSurvey();
        }

        return {
            formData: values,
            submitting: false,
            errors: {
                title: []
            },
            loaded: false,
            survey: null
        };
    },

    getChildContext () {
        return {
            handleControlValueChange: this.handleControlValueChange
        };
    },

    render () {
        return (
            <div>
                {this.renderHeading()}
                <Row>
                    <Form {...this.getFormProps()}>
                        <Column md={12} controlId="title">
                            <Input {...this.getTitleProps()} />
                        </Column>
                    </Form>
                </Row>
            </div>
        );
    },

    renderHeading () {
        let title;

        if (this.isEditingSurvey()) {
            title = 'Editar encuesta';
        } else {
            title = 'Crear encuesta';
        }

        return (<Heading className="survey-create-edit-view--heading">{title}</Heading>);
    },

    getFormProps () {
        return {
            submitting: this.state.submitting,
            onSubmit: this.handleSubmit
        };
    },

    getTitleProps () {
        return {
            controlId: 'title',
            formControlProps: {
                title: 'Titulo'
            },
            required: true,
            errors: this.state.errors['title'],
            value: this.state.formData.title
        };
    },

    handleControlValueChange (controlId, value) {
        let nextFormData = _.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    },

    handleSubmit () {
        if (this.validateForm()) {
            this.submitStarted();

            if (this.isEditingSurvey()) {
                surveysStore.updateSurvey(this.state.formData, this.getSurveyId());
            } else {
                surveysStore.addSurvey(this.state.formData)
                    .then(this.redirectToSurveysList)
                    .catch(this.submitEnded);
            }
        }
    },

    validateForm () {
        let error = false;
        let formData = this.state.formData;
        let errors = {
            title: []
        };
        let errorMessages = {
            'TITLE_EMPTY': 'Debe ingresar un titulo para la encuesta',
            'TITLE_TOO_LONG': 'El titulo de la encuesta excede los 100 caracteres'
        };

        if (!formData.title.trim().length) {
            errors['title'].push(errorMessages['TITLE_EMPTY']);
            error = true;
        }

        if (formData.title.length > 100) {
            errors['title'].push(errorMessages['TITLE_TOO_LONG']);
            error = true;
        }

        this.setState({errors: errors});

        return !error;
    },

    loadSurvey () {
        surveysStore.getSurvey(this.getSurveyId()).then((survey) => {
            this.setState({
               formData: {
                   title: survey.nombre
               }
            });
        });
    },

    isEditingSurvey () {
        return Boolean(this.getSurveyId());
    },

    getSurveyId () {
        return _.get(this.props, 'params.surveyId')
    },

    redirectToSurveysList () {
        this.context.router.push('/app/admin/surveys');
    },

    submitStarted () {
        this.setState({submitting: true});
    },

    submitEnded () {
        this.setState({submitting: false});
    }
});

module.exports = SurveysCreateEditView;