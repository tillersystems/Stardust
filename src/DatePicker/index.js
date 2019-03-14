import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime, Interval } from 'luxon';

import Weeks from './Weeks';
import Weekdays from './Weekdays';
import Header from './Header';
import { Container } from './elements';
import { getPreviousMonth, getNextMonth, isSameDay, isInNextMonth, isInLastMonth } from './helpers';

const { bool, func, number, object, string } = PropTypes;
const localDateTime = DateTime.local();

/**
 * Date Picker
 *
 * This component is in charge of displaying a date picker.
 *
 * @param {string} className - Styled component class name.
 * @param {string} locale - Local to use to display the weekday names.
 * @param {luxon.DateTime} value - Controlled value (the selected date).
 * @param {luxon.DateTime} minDate - Minimum allowed date.
 * @param {luxon.DateTime} maxDate - Maximum allowed date.
 * @param {number} numberOfMonthsToDisplay - The number of month to display (1 or 2).
 * @param {function} onDateChanged - Handler of date change.
 * @param {bool} rangePicker - Whether it is a date picker or a date range picker.
 *
 * @return {jsx}
 */
class DatePicker extends PureComponent {
  /** Display name. */
  static displayName = 'DatePicker';

  /** Validation prop types. */
  static propTypes = {
    className: string,
    locale: string,
    value: object,
    minDate: object,
    maxDate: object,
    numberOfMonthsToDisplay: number,
    onDateChanged: func,
    rangePicker: bool,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    locale: 'en',
    value: null,
    minDate: null,
    maxDate: null,
    numberOfMonthsToDisplay: 1,
    onDateChanged: () => {},
    rangePicker: false,
  };

  /** Internal state. */
  state = {
    /** Initial Calendar date */
    currentDate: localDateTime,

    /** Selected Calendar date */
    selected: localDateTime,

    /** Start date value */
    startDate: null,

    /** End date value */
    endDate: null,
  };

  /**
   * Component lifecycle method
   * Update current month to keep track of the date if provided
   *
   */
  componentDidMount() {
    const { value } = this.props;

    // Set selected & currentDate in componentDidMount if is relies on props
    if (value) {
      this.setState({ selected: value, currentDate: value });
    }
  }

  /**
   * Component lifecycle method
   *
   */
  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps;
    const { value } = this.props;

    if (value !== prevValue) {
      this.setState({ selected: value, currentDate: value });
    }
  }

  /**
   * Get selected Range
   * Take the date range selection
   * and return as an interval
   *
   * @return {luxon.Interval}
   */
  getSelectedRange() {
    const { startDate, endDate } = this.state;
    const { onDateChanged } = this.props;
    const selectedRange = !!startDate && !!endDate;

    if (!selectedRange) {
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
  getSelected() {
    const { selected } = this.state;
    const { onDateChanged } = this.props;

    return onDateChanged(selected);
  }

  /**
   * Handles date change.
   *
   * @param {luxon.DateTime} value - The date that was clicked.
   */
  handleChange = value => {
    const { rangePicker, numberOfMonthsToDisplay } = this.props;
    const { selected: previousValue, startDate, endDate, currentDate } = this.state;

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

      // We check whether value is in the next month (w.r.t. the whole calendar)
      // or the previous month
      if (
        isInNextMonth(value, currentDate, numberOfMonthsToDisplay) ||
        isInLastMonth(value, currentDate)
      ) {
        this.setState(
          { selected: value, startDate: start, endDate: end, currentDate: value },
          () => {
            this.getSelectedRange();
          },
        );
      } else {
        this.setState({ selected: value, startDate: start, endDate: end }, () => {
          this.getSelectedRange();
        });
      }
    } else {
      // First we check if the current value is different from the previsous one,
      // we never call a setState on a already selected value.
      // Then we check whether value is in the next month (w.r.t. the whole calendar)
      // or the previous month
      if (!isSameDay(value, previousValue)) {
        if (
          isInNextMonth(value, currentDate, numberOfMonthsToDisplay) ||
          isInLastMonth(value, currentDate)
        ) {
          this.setState({ selected: value, currentDate: value }, () => {
            this.getSelected();
          });
        } else {
          this.setState({ selected: value }, () => {
            this.getSelected();
          });
        }
      }
    }
  };

  /**
   * Handles click on the previous month button.
   */
  handlePrevMonthClick = () => {
    const { currentDate } = this.state;

    this.setState({ currentDate: getPreviousMonth(currentDate) });
  };

  /**
   * Handles click on the next month button.
   */
  handleNextMonthClick = () => {
    const { currentDate } = this.state;

    this.setState({ currentDate: getNextMonth(currentDate) });
  };

  render() {
    const { className, locale, minDate, maxDate, numberOfMonthsToDisplay } = this.props;
    const { currentDate, selected, startDate, endDate } = this.state;

    const isAfterMinDate = !minDate || currentDate.startOf('month') > minDate.startOf('month');
    const isBeforeMaxDate = !maxDate || currentDate.endOf('month') < maxDate.endOf('month');

    return (
      <div className={className} style={{ display: 'flex' }}>
        {[...Array(numberOfMonthsToDisplay).keys()].map(monthIndex => {
          const stringifiedDate = currentDate
            .plus({ month: monthIndex })
            .setLocale(locale)
            .toLocaleString({ month: 'long', year: 'numeric' });
          return (
            <Container key={monthIndex} numberOfMonthsToDisplay={numberOfMonthsToDisplay}>
              <Header
                title={stringifiedDate}
                numberOfMonthsToDisplay={numberOfMonthsToDisplay}
                monthIndex={monthIndex}
                prev={this.handlePrevMonthClick}
                next={this.handleNextMonthClick}
                shouldDisablePrev={!isAfterMinDate}
                shouldDisableNext={!isBeforeMaxDate}
              />
              <Weekdays locale={locale} />
              <Weeks
                currentDate={currentDate.plus({ month: monthIndex })}
                selected={selected}
                minDate={minDate}
                maxDate={maxDate}
                onDateClick={this.handleChange}
                startDate={startDate}
                endDate={endDate}
              />
            </Container>
          );
        })}
      </div>
    );
  }
}

export default styled(DatePicker)`
  width: ${({ numberOfMonthsToDisplay }) =>
    numberOfMonthsToDisplay === 2 ? 'calc((24.4rem * 2) + 2.4rem)' : '24.4rem'};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;
