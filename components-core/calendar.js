// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');
const moment = require('moment');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// COMPONENTS CORE
const Calendar = require('components-core/date-selector');

// DATE PICK
const Actionable = require('components-core/actionable');

const DateSelector = React.createClass({

    propTypes: {
        selectedDate: React.PropTypes.object
    },

    getInitialState () {
        return {
            selectedDate: this.props.selectedDate || moment(),
            displayedDate: this.props.displayedDate || moment()
        };
    },

    render () {
        return (
            <div className="date-picker">
                {this.renderSelectedDateDisplay()}
                <div>
                    {this.renderDateSelector()}
                    {this.renderActions()}
                </div>
            </div>
        );
    },

    renderSelectedDateDisplay () {
        return (
            <div className="date-picker--selected-date-display">
                <div>2016,</div>
                <div>Jul,</div>
                <div>8 Friday</div>
            </div>
        );
    },

    renderDateSelector () {
        return (<Calendar {...this.getCalendarProps()} />);
    },

    renderActions () {
        return (
            <div className="date-picker--actions">
                <Actionable actionableType="link-quaternary" block={false} icon="done" />
                <Actionable actionableType="link-tertiary" block={false} icon="clear" />
            </div>
        );
    },

    getCalendarProps () {
        return {
            displayedDate: this.getDisplayedDate(),
            selectedDate: this.getSelectedDate(),
            nextMonth: this.handleMonthChange.bind(this, 'add', 1),
            previousMonth: this.handleMonthChange.bind(this, 'subtract', 1),
            onKeyDown: this.handleDayKeyDown,
            selectDate: this.selectDate
        };
    },

    getClass () {
        let props = this.props;
        let className = props.className;
        let classes = {
            'modal': true,
            [className]: (className)
        };

        return classNames(classes);
    },

    getSelectedDate () {
        return this.state.selectedDate;
    },

    getDisplayedDate () {
        return this.state.displayedDate;
    },

    handleMonthChange (action, quantity) {
        this.state.selectedDate[action](quantity, 'months');
        this.state.displayedDate[action](quantity, 'months');
    },

    selectDate (date, month, year) {
        console.log(date, month, year);

        this.state.selectedDate.set({
            date: date,
            month: month,
            year: year
        });
        this.state.displayedDate.set({
            date: date,
            month: month,
            year: year
        });
    },

    handleDayKeyDown (event) {
        let displayedDate = this.state.displayedDate;
        let selectedDate = this.state.selectedDate;

        if (event.keyCode === 40) {
            displayedDate.add(1, 'weeks');
            this.forceUpdate();
        } else if (event.keyCode === 39) {
            displayedDate.add(1, 'days');
            this.forceUpdate();
        } else if (event.keyCode === 38) {
            displayedDate.subtract(1, 'weeks');
            this.forceUpdate();
        } else if (event.keyCode === 37) {
            displayedDate.subtract(1, 'days');
            this.forceUpdate();
        } else if (event.keyCode === 13) {
            event.preventDefault();

            this.selectDate(displayedDate.date(), displayedDate.month(), displayedDate.year());
            this.forceUpdate();
        }
    }
});

module.exports = DateSelector;