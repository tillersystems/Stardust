import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime, Interval } from 'luxon';

import Weeks from './Weeks';
import Weekdays from './Weekdays';
import Header from './Header';
import { Container } from './elements';
import {
  getPreviousMonth,
  getNextMonth,
  minMaxDate,
  isSameDay,
  isSameMonth,
  isInNextMonth,
  isInPrevMonth,
  isInterval,
} from './helpers';

/* eslint-disable react/destructuring-assignment */

const localDateTime = DateTime.local().startOf('month');

/**
 * A DatePicker can display one or two months. It takes a value (`defaultValue` prop) to set its internal
 * selected value state, or takes the date of today by default.
 * The selected value can either be a date or an interval of Luxon.
 *
 * @return {jsx}
 */
class DatePicker extends PureComponent {
  /** Internal state. */
  state = {
    /**
     * Initial Calendar date
     * DatePicker month(s) display is based upon currentDate and will start
     * from this to iterate through the months it has to display
     */
    currentMonths: [localDateTime],

    /**
     * Selected Calendar date
     * Value of selected date of the DatePicker
     */
    selected: this.props.defaultValue,

    /** Start date value */
    startDate: null,

    /** End date value */
    endDate: null,
  };

  /**
   * Component lifecycle method
   * Set initial sates
   * We need to check if the default value is an interval or not
   * to set initial state correctly.
   *
   */
  componentDidMount() {
    const { defaultValue } = this.props;

    if (isInterval(defaultValue)) {
      // Always set the current date to the start of the interval.
      this.setState({
        selected: null,
        currentMonths: this.getCurrentMonths(defaultValue.start, defaultValue.end),
        startDate: defaultValue.start,
        endDate: defaultValue.end,
      });
    } else {
      this.setState({
        selected: defaultValue,
        currentMonths: this.getCurrentMonths(defaultValue, defaultValue),
        startDate: null,
        endDate: null,
      });
    }
  }

  /**
   * Component lifecycle method
   *
   */
  componentDidUpdate(prevProps) {
    const {
      defaultValue: prevDefaultValue,
      numberOfMonthsToDisplay: prevNumberOfMonthsToDisplay,
      minDate: prevMinDate,
      maxDate: prevMaxDate,
    } = prevProps;

    const { defaultValue, numberOfMonthsToDisplay, minDate, maxDate } = this.props;

    if (defaultValue !== prevDefaultValue) {
      if (isInterval(defaultValue)) {
        this.setState({
          selected: null,
          currentMonths: this.getCurrentMonths(defaultValue.start, defaultValue.end),
          startDate: defaultValue.start,
          endDate: defaultValue.end,
        });
      } else {
        this.setState({
          selected: defaultValue,
          currentMonths: this.getCurrentMonths(defaultValue, defaultValue),
          startDate: null,
          endDate: null,
        });
      }
    } else if (
      numberOfMonthsToDisplay != prevNumberOfMonthsToDisplay ||
      minDate !== prevMinDate ||
      maxDate !== prevMaxDate
    ) {
      const { selected, startDate, endDate } = this.state;

      this.setState({
        currentMonths: this.getCurrentMonths(startDate || selected, endDate || selected),
      });
    }
  }

  getCurrentMonths = (startDate, endDate) => {
    const { numberOfMonthsToDisplay, minDate, maxDate } = this.props;

    const start = minMaxDate(startDate || DateTime.local(), minDate, maxDate);
    const end = minMaxDate(endDate || DateTime.local(), minDate, maxDate);

    if (numberOfMonthsToDisplay === 2) {
      return [
        DateTime.min(start.startOf('month'), end.minus({ month: 1 }).startOf('month')),
        end.startOf('month'),
      ];
    }

    return [end.startOf('month')];
  };

  /**
   * Handles date change.
   *
   * @param {luxon.DateTime} value - The date that was clicked.
   */
  handleChange = (value, index) => {
    const { rangePicker } = this.props;
    const { selected: previousValue, startDate, endDate, currentMonths } = this.state;

    if (currentMonths.length === 1 || !rangePicker) {
      if (isInNextMonth(value, currentMonths[index])) {
        this.handleNextMonth(index);
      } else if (isInPrevMonth(value, currentMonths[index])) {
        this.handlePrevMonth(index);
      }
    }

    if (rangePicker) {
      let start = startDate;
      let end = endDate;

      if (!start) {
        start = value;
      } else {
        if (endDate) {
          start = value;
          end = undefined;
        } else {
          if (value >= start) {
            end = value;
          } else {
            end = start;
            start = value;
          }
        }
      }

      this.setState({ selected: null, startDate: start, endDate: end }, () => {
        this.handleSelectedInterval();
      });
    } else {
      // First we check if the current value is different from the previsous one,
      // we never call a setState on a already selected value.
      // Then we check whether value is in the next month (w.r.t. the whole calendar)
      // or the previous month
      if (!previousValue || !isSameDay(value, previousValue)) {
        this.setState(
          {
            selected: value,
            startDate: null,
            endDate: null,
          },
          () => {
            this.handleSelectedDate();
          },
        );
      }
    }
  };

  /**
   * Handles click on the previous month action.
   * This method is safe with more than 2 months displayed
   *
   * @param index - the month display to minus
   */
  handlePrevMonth = index => {
    const { currentMonths } = this.state;

    this.setState({
      currentMonths: currentMonths.reduceRight((newCurrentMonth, currentMonthValue, monthIndex) => {
        if (monthIndex > index) {
          newCurrentMonth.unshift(currentMonthValue);
        } else if (monthIndex === index) {
          newCurrentMonth.unshift(getPreviousMonth(currentMonthValue));
        } else if (
          isSameMonth(currentMonthValue, newCurrentMonth[0]) ||
          currentMonthValue > newCurrentMonth[0]
        ) {
          newCurrentMonth.unshift(getPreviousMonth(newCurrentMonth[0]));
        } else {
          newCurrentMonth.unshift(currentMonthValue);
        }
        return newCurrentMonth;
      }, []),
    });
  };

  /**
   * Handles click on the next month action.
   * This method is safe with more than 2 months displayed
   *
   * @param index - the month display to plus
   */
  handleNextMonth = index => {
    const { currentMonths } = this.state;

    this.setState({
      currentMonths: currentMonths.reduce((newCurrentMonth, currentMonthValue, monthIndex) => {
        if (monthIndex < index) {
          newCurrentMonth.push(currentMonthValue);
        } else if (monthIndex === index) {
          newCurrentMonth.push(getNextMonth(currentMonthValue));
        } else if (
          newCurrentMonth.length > 0 &&
          (isSameMonth(currentMonthValue, newCurrentMonth[newCurrentMonth.length - 1]) ||
            currentMonthValue < newCurrentMonth[newCurrentMonth.length - 1])
        ) {
          newCurrentMonth.push(getNextMonth(newCurrentMonth[newCurrentMonth.length - 1]));
        } else {
          newCurrentMonth.push(currentMonthValue);
        }
        return newCurrentMonth;
      }, []),
    });
  };

  /**
   * Get selected Interval
   * Take the date range selection
   * and return as an interval
   *
   * @return {luxon.Interval}
   */
  handleSelectedInterval() {
    const { startDate, endDate } = this.state;
    const { onDateChanged } = this.props;
    const isSelectedInterval = !!startDate && !!endDate;

    if (!isSelectedInterval) {
      return;
    }

    return onDateChanged(Interval.fromDateTimes(startDate, endDate));
  }

  /**
   * Get selected
   * Take the selected date
   *
   * @return {luxon.DateTime}
   */
  handleSelectedDate() {
    const { selected } = this.state;
    const { onDateChanged } = this.props;

    return onDateChanged(selected);
  }

  render() {
    const { className, locale, minDate, maxDate, displayOnlyInMonth } = this.props;
    const { currentMonths, selected, startDate, endDate } = this.state;

    return (
      <div className={className}>
        {currentMonths.map((currentMonthValue, monthIndex) => {
          const stringifiedDate = currentMonthValue
            .setLocale(locale)
            .toLocaleString({ month: 'long', year: 'numeric' });
          return (
            <Container key={monthIndex} numberOfMonthsToDisplay={currentMonths.length}>
              <Header
                title={stringifiedDate}
                monthIndex={monthIndex}
                prev={this.handlePrevMonth}
                next={this.handleNextMonth}
                disablePrev={minDate && currentMonthValue <= minDate.startOf('month')}
                disableNext={maxDate && currentMonthValue.endOf('month') >= maxDate.endOf('month')}
              />
              <Weekdays locale={locale} />
              <Weeks
                currentMonth={currentMonthValue}
                selected={selected}
                minDate={minDate}
                maxDate={maxDate}
                onDateClick={value => this.handleChange(value, monthIndex)}
                startDate={startDate}
                endDate={endDate}
                displayOnlyInMonth={displayOnlyInMonth}
              />
            </Container>
          );
        })}
      </div>
    );
  }
}

/** Display name. */
DatePicker.displayName = 'DatePicker';

const { bool, func, number, object, string } = PropTypes;

/** Validation prop types. */
DatePicker.propTypes = {
  /**
   * Styled component class name
   */
  className: string,

  /**
   * Controlled selected date value
   */
  defaultValue: object,

  /**
   * Display only days in current month
   */
  displayOnlyInMonth: bool,

  /**
   * Locale used to display the weekday names
   */
  locale: string,

  /**
   * Minimum allowed date
   */
  minDate: object,

  /**
   * Maximum allowed date
   */
  maxDate: object,

  /**
   * The number of months to display (1 or 2)
   */
  numberOfMonthsToDisplay: number,

  /**
   * Handler of date change
   */
  onDateChanged: func,

  /**
   * Whether it is a date picker or a date range picker
   */
  rangePicker: bool,
};

/** Default props. */
DatePicker.defaultProps = {
  className: '',
  defaultValue: localDateTime,
  displayOnlyInMonth: false,
  locale: 'en',
  minDate: null,
  maxDate: null,
  numberOfMonthsToDisplay: 1,
  onDateChanged: () => {},
  rangePicker: false,
};

export default styled(DatePicker)`
  display: flex;
  width: ${({ numberOfMonthsToDisplay }) =>
    numberOfMonthsToDisplay === 2 ? 'calc((24.4rem * 2) + 2.4rem)' : '24.4rem'};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;
