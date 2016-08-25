// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// DATE PICK
const Calendar = require('components-core/calendar');

const Modal = React.createClass({

    getInitialState () {
        return {
            rendered: false
        };
    },

    componentDidMount () {
        this.setState({
            rendered: true
        });
    },

    render () {
        return (
            <ReactCSSTransitionGroup className="modal--wrapper" transitionName="modal" transitionEnterTimeout={200}
                component='div'>
                {this.renderModal()}
            </ReactCSSTransitionGroup>
        );
    },

    renderModal () {
        let modalNode;

        if (this.state.rendered) {
            modalNode = (
                <div className={this.getClass()}>
                    {this.props.children}

                    <Calendar />
                </div>
            );
        }

        return modalNode;
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'modal': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Modal;