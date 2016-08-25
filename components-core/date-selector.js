// VENDOR LIBS
const classNames = require('classnames');
const lodash = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// DATE PICK
const Actionable = require('components-core/actionable');

const DateSelector = React.createClass({

    AMOUNT_OF_DAYS: 7,

    propTypes: {
        selectedDate: React.PropTypes.object.isRequired,
        displayedDate: React.PropTypes.object.isRequired,
        onKeyDown: React.PropTypes.func,
        nextMonth: React.PropTypes.func,
        previousMonth: React.PropTypes.func,
        selectDate: React.PropTypes.func
    },

    componentWillMount () {
        this.setDateLocalVariables(this.props);
    },

    componentWillReceiveProps (nextProps) {
        this.setDateLocalVariables(nextProps);
    },

    componentDidUpdate () {

    },

    render () {
        return (
            <div className="date-picker--date-selector">
                <div className="date-picker--date-selector-content">
                    {this.renderMonthContainer()}
                    {this.renderWeekDays()}
                    {this.renderWeeks()}
                </div>
            </div>
        );
    },

    renderMonthContainer () {
        let leftArrowButtonProps = {
            icon: 'keyboard_arrow_left',
            actionableType: 'link-tertiary',
            block: false,
            onClick: this.props.previousMonth
        };
        let rightArrowButtonProps = {
            icon: 'keyboard_arrow_right',
            actionableType: 'link-tertiary',
            block: false,
            onClick: this.props.nextMonth
        };

        return (
            <div className="date-picker--date-selector-month-container">
                <Actionable {...leftArrowButtonProps} />
                <ReactCSSTransitionGroup
                    className="date-picker--date-selector-month"
                    transitionName="date-selector--month"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    component='div'
                    >
                    <span key={this.props.displayedDate.format('MMMM YYYY')}
                          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', lineHeight: '38px'}}
                        >
                        {this.props.displayedDate.format('MMMM YYYY')}
                    </span>
                </ReactCSSTransitionGroup>
                <Actionable {...rightArrowButtonProps} />
            </div>
        );
    },

    renderWeekDays () {
        return (
            <div className="date-picker--date-selector-week-days">
                <div className="date-picker--date-selector-week-day">S</div>
                <div className="date-picker--date-selector-week-day">M</div>
                <div className="date-picker--date-selector-week-day">T</div>
                <div className="date-picker--date-selector-week-day">W</div>
                <div className="date-picker--date-selector-week-day">T</div>
                <div className="date-picker--date-selector-week-day">F</div>
                <div className="date-picker--date-selector-week-day">S</div>
            </div>
        );
    },

    renderWeeks () {
        return (
            <ReactCSSTransitionGroup
                className="clearfix"
                transitionName="date-selector--month"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                component='div'
                >
                <div key={this.month} style={{float: 'left'}} className="date-picker--date-selector-weeks">
                    {lodash.times(this.weeksToShow, this.renderWeek)}
                </div>
            </ReactCSSTransitionGroup>
        );
    },

    renderWeek (weekNumber) {
        return (
            <div>
                {lodash.times(this.AMOUNT_OF_DAYS, this.renderDay.bind(this, weekNumber))}
            </div>
        );
    },

    renderDay (weekNumber, dayNumber) {
        let dayNode;
        let monthDayNumber = (weekNumber * this.AMOUNT_OF_DAYS) + dayNumber - this.monthStart + 1;
        let isActionableEnabled = (monthDayNumber > 0 && monthDayNumber < this.daysInMonth + 1);
        let actionableProps = this.getDayActionableProps(isActionableEnabled, monthDayNumber);

        if (isActionableEnabled) {
            dayNode = (<Actionable {...actionableProps}>{monthDayNumber}</Actionable>);
        } else {
            dayNode = (<Actionable {...actionableProps} />);
        }

        return dayNode;
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

    getDayActionableProps (enabled, monthDayNumber) {
        let selected = this.isSelectedDate(monthDayNumber);
        let active = this.isActiveDate(monthDayNumber);

        return {
            active: active,
            selected: selected,
            actionableType: 'link-date-picker',
            block: false,
            disabled: !enabled,
            onKeyDown: (enabled) ? this.props.onKeyDown : null,
            onClick: this.handleDateSelection.bind(this, monthDayNumber, this.month, this.year),
            ref: (selected) ? 'selectedDate' : (active) ? 'activeDate' : null
        };
    },

    isActiveDate (monthDay) {
        let displayedDate = this.props.displayedDate;

        return (
            monthDay === displayedDate.date() &&
            this.month === displayedDate.month() &&
            this.year === displayedDate.year()
        );
    },

    isSelectedDate (monthDay) {
        let selectedDate = this.props.selectedDate;

        return (
            monthDay === selectedDate.date() &&
            this.month === selectedDate.month() &&
            this.year === selectedDate.year()
        );
    },

    getDate () {
        return this.props.date;
    },

    setDateLocalVariables (props) {
        let date = lodash.cloneDeep(props.displayedDate);
        let startOfMonth = date.startOf('month');
        let startingDayOfWeek = parseInt(startOfMonth.day());

        this.year = date.year();
        this.month = date.month();
        this.daysInMonth = date.daysInMonth();
        this.monthStart = startingDayOfWeek;
        this.weeksToShow = 6;
    },

    handleDateSelection (date, month, year) {
        this.props.selectDate(date, month, year);
    }
});

module.exports = DateSelector;