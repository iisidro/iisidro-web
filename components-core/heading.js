// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

const Heading = React.createClass({

    contextTypes: {
        headingLevel: React.PropTypes.number
    },

    render () {
        let Wrapper = 'h' + this.context.headingLevel;

        return (
            <Wrapper {...this.getProps()}>
                {this.props.children}
            </Wrapper>
        );
    },

    getProps () {
        return {
            className: this.getClass()
        };
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let headingLevel = this.context.headingLevel;
        let classes = {
            'heading': true,
            [className]: (className),
            ['heading_' + headingLevel]: (headingLevel)
        };

        return classNames(classes);
    }

});

module.exports = Heading;