// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');

// COMPONENTS CORE
const HeadingMixin = require('components-core/mixins/heading-mixin');

const Section = React.createClass({

    mixins: [HeadingMixin],

    render () {
        return (
            <section className={this.getClass()}>
                {this.props.children}
            </section>
        );
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'section': true,
            [className]: (className)
        };

        return classNames(classes);
    }

});

module.exports = Section;