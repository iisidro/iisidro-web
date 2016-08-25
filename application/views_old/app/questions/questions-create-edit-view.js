// VENDOR LIBS
const React = require('react');
const lodash = require('lodash');

// COMPONENTS CORE
const Heading = require('components-core/heading');
const HeadingMixin = require('components-core/mixins/heading-mixin');
const Actionable = require('components-core/actionable');
const Input = require('components-core/input');
const Column = require('components-core/column');
const Row = require('components-core/row');
const Form = require('components-core/form');

// STORES
const questionsStore = require('application/stores/questions-store');

const QuestionsCreateEditView = React.createClass({

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
            statement: '',
            maxLength: '255'
        };
        let question;

        if (this.isEditingQuestion()) {
            question = questionsStore.getQuestions(this.getQuestionId());

            values = {
                statement: question.statement,
                maxLength: question.maxLength
            };
        }

        return {
            formData: values,
            submitting: false,
            errors: {
                statement: [],
                maxLength: []
            }
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
                        <Column md={6} controlId="statement">
                            <Input {...this.getStatementProps()} />
                        </Column>
                        <Column md={6} controlId="maxLength">
                            <Input {...this.getMaxLengthProps()} />
                        </Column>
                    </Form>
                </Row>
            </div>
        );
    },

    renderHeading () {
        let title;

        if (this.isEditingQuestion()) {
            title = 'Editar pregunta';
        } else {
            title = 'Crear pregunta';
        }

        return (<Heading className="questions-create-edit-view--heading">{title}</Heading>);
    },

    getFormProps () {
        return {
            submitting: this.state.submitting,
            onSubmit: this.handleSubmit
        };
    },

    getStatementProps () {
        return {
            controlId: 'statement',
            formControlProps: {
                title: 'Texto de la pregunta'
            },
            required: true,
            errors: this.state.errors['statement'],
            value: this.state.formData.statement
        };
    },

    getMaxLengthProps () {
        return {
            controlId: 'maxLength',
            formControlProps: {
                title: 'Longitud maxima'
            },
            required: true,
            errors: this.state.errors['maxLength'],
            type: 'number',
            min: 0,
            value: this.state.formData.maxLength
        };
    },

    handleControlValueChange (controlId, value) {
        let nextFormData = lodash.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    },

    handleSubmit () {
        if (this.validateForm()) {
            this.setState({
                submitting: true
            });

            if (this.isEditingQuestion()) {
                questionsStore.updateQuestion(this.state.formData, this.getQuestionId());
            } else {
                questionsStore.addQuestion(this.state.formData);
            }

            this.context.router.push('/app/admin/questions');
        }
    },

    validateForm () {
        let error = false;
        let formData = this.state.formData;
        let errors = {
            statement: [],
            maxLength: []
        };
        let errorMessages = {
            'STATEMENT_EMPTY': 'Debe ingresar un texto para la pregunta',
            'MAX-LENGTH_EMPTY': 'Debe ingresar una longitud maxima para la pregunta',
            'MAX-LENGTH_POSITIVE_ERROR': 'La longitud maxima debe ser un numero positivo'
        };

        if (!formData.statement.trim().length) {
            errors['statement'].push(errorMessages['STATEMENT_EMPTY']);
            error = true;
        }

        if (!formData.maxLength.toString().trim().length) {
            errors['maxLength'].push(errorMessages['PASSWORD_EMPTY']);
            error = true;
        } else if (parseInt(formData.maxLength) < 0) {
            errors['maxLength'].push(errorMessages['LENGTH_POSITIVE_ERROR']);
            error = true;
        }

        this.setState({errors: errors});

        return !error;
    },

    isEditingQuestion () {
        return Boolean(this.getQuestionId());
    },

    getQuestionId () {
        return lodash.get(this.props, 'params.questionId')
    }
});

module.exports = QuestionsCreateEditView;