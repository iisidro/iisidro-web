// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// COMPONENTS CORE
const Modal = require('components-core/modal');

const Layer = React.createClass({

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
            <ReactCSSTransitionGroup transitionName="layer" transitionEnterTimeout={200} component='div'>
                {this.renderLayer()}
            </ReactCSSTransitionGroup>
        );
    },

    renderLayer () {
        let layerNode;

        if (this.state.rendered) {
            layerNode = (
                <div className={this.getClass()}>
                    <Modal>
                        {this.props.children}
                    </Modal>
                </div>
            );
        }

        return layerNode;
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'layer': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Layer;