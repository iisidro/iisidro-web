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
            title: '',
            statement: '',
            type: '',
            maxLength: 255
        };

        if (this.isEditingQuestion()) {
            this.loadQuestion();
        }

        return {
            formData: values,
            submitting: false,
            errors: {
                title: [],
                statement: [],
                type: [],
                maxLength: []
            },
            loaded: false,
            question: null
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
                        <Column md={6} controlId="type">
                            <Input {...this.getTypeProps()} />
                        </Column>
                        <Column md={6} controlId="maxLength">
                            <Input {...this.getMaxLengthProps()} />
                        </Column>
                        <Column md={12} controlId="statement">
                            <Input {...this.getStatementProps()} />
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

    getTypeProps () {
        return {
            controlId: 'type',
            formControlProps: {
                title: 'Tipo de pregunta'
            },
            required: true,
            errors: this.state.errors['type'],
            value: this.state.formData.type
        };
    },

    getMaxLengthProps () {
        return {
            controlId: 'maxLength',
            type: 'number',
            max: 255,
            min: 0,
            formControlProps: {
                title: 'Longitud maxima'
            },
            required: true,
            errors: this.state.errors['maxLength'],
            value: this.state.formData.maxLength
        };
    },

    handleControlValueChange (controlId, value) {
        let nextFormData = _.extend({}, this.state.formData, {[controlId]: value});

        this.setState({formData: nextFormData});
    },

    handleSubmit () {
        if (this.validateForm()) {
            this.submitStarted();

            if (this.isEditingQuestion()) {
                questionsStore.updateQuestion(this.state.formData, this.getQuestionId());
            } else {
                questionsStore.addQuestion(this.state.formData)
                    .then(this.redirectToQuestionsList)
                    .catch(this.submitEnded);
            }
        }
    },

    validateForm () {
        let error = false;
        let formData = this.state.formData;
        let errors = {
            title: [],
            statement: [],
            type: [],
            maxLength: []
        };
        let errorMessages = {
            'TITLE_EMPTY': 'Debe ingresar un titulo para la pregunta',
            'TYPE_EMPTY': 'Debe ingresar un tipo para la pregunta',
            'STATEMENT_EMPTY': 'Debe ingresar un texto para la pregunta',
            'MAX-LENGTH_EMPTY': 'Debe ingresar una longitud maxima para la pregunta',
            'MAX-LENGTH_POSITIVE_ERROR': 'La longitud maxima debe ser un numero positivo'
        };

        if (!formData.title.trim().length) {
            errors['title'].push(errorMessages['TITLE_EMPTY']);
            error = true;
        }

        if (!formData.statement.trim().length) {
            errors['statement'].push(errorMessages['STATEMENT_EMPTY']);
            error = true;
        }

        if (!formData.type.trim().length) {
            errors['type'].push(errorMessages['TYPE_EMPTY']);
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

    loadQuestion () {
        questionsStore.getQuestions(this.getQuestionId()).then((question) => {
            this.setState({
               formData: {
                   title: question.nombre,
                   statement: question.informacion,
                   type: _.get(question, 'tipo.nombre')
               }
            });
        });
    },

    isEditingQuestion () {
        return Boolean(this.getQuestionId());
    },

    getQuestionId () {
        return _.get(this.props, 'params.questionId')
    },

    redirectToQuestionsList () {
        this.context.router.push('/app/admin/questions');
    },

    submitStarted () {
        this.setState({submitting: true});
    },

    submitEnded () {
        this.setState({submitting: false});
    }
});

module.exports = QuestionsCreateEditView;