import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DateTime } from 'luxon';

import { Button, Icon, Theme } from '../..';
import Weeks from '../Weeks';
import WeekdayNames from '../WeekdayNames';
import { Header, HeaderTitle } from '../elements';

/**
 * Date Picker
 *
 * This component is in charge of displaying a date picker.
 *
 * @param {string} className - Styled component class name.
 * @param {string} locale - Local to use to display the weekday names.
 * @param {luxon.DateTime} value - Controlled value (the selected date).
 * @param {luxon.DateTime} defaultValue - Default date (the default date).
 * @param {luxon.DateTime} minDate - Minimum allowed date.
 * @param {luxon.DateTime} maxDate - Maximum allowed date.
 * @param {function} onChange - Handler of date change.
 *
 * @return {jsx}
 */
class DatePicker extends PureComponent {
  /** Display name. */
  static displayName = 'DatePicker';

  /** Validation prop types. */
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onChange: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    locale: 'en',
    value: null,
    defaultValue: DateTime.local(),
    minDate: null,
    maxDate: null,
    onChange: () => {},
  };

  /** Internal state. */
  state = {
    currentMonth: DateTime.local(),
    selectedDate: null,
    highlightedDate: null,
  };

  /**
   * Handles date click.
   *
   * @param {luxon.DateTime} date - The date that was clicked.
   */
  handleDateClick = date => {
    const { onChange } = this.props;
    this.setState({ ...this.state, selectedDate: date, currentMonth: date }, () => {
      onChange(date);
    });
  };

  /**
   * Handles mouse over a date.
   *
   * @param {luxon.DateTime} date - The date the mouse is over.
   */
  handleDateOver = date => {
    this.setState({ ...this.state, highlightedDate: date });
  };

  /**
   * Handles click on the previous month button.
   */
  handlePrevMonthClick = () => {
    const { currentMonth } = this.state;
    this.setState({ ...this.state, currentMonth: currentMonth.minus({ months: 1 }) });
  };

  /**
   * Handles click on the next month button.
   */
  handleNextMonthClick = () => {
    const { currentMonth } = this.state;
    this.setState({ ...this.state, currentMonth: currentMonth.plus({ months: 1 }) });
  };

  render() {
    const { className, locale, value, defaultValue, minDate, maxDate } = this.props;
    const { currentMonth, selectedDate, highlightedDate } = this.state;

    const actualSelectedDate = value || selectedDate || defaultValue;

    const isAfterMinDate = !minDate || currentMonth.startOf('month') >= minDate.startOf('month');
    const isBeforeMaxDate = !maxDate || currentMonth.endOf('month') <= maxDate.endOf('month');

    return (
      <div className={className} onMouseLeave={() => this.handleDateOver(null)}>
        <Header>
          <Button
            data-testid="pervious-month-button"
            appearance="secondary"
            size="small"
            onClick={this.handlePrevMonthClick}
            disabled={!isAfterMinDate}
          >
            <Icon color={Theme.palette.darkBlue} name="chevron-left" />
          </Button>
          <HeaderTitle>
            {currentMonth.setLocale(locale).toLocaleString({ month: 'long', year: 'numeric' })}
          </HeaderTitle>
          <Button
            data-testid="next-month-button"
            appearance="secondary"
            size="small"
            onClick={this.handleNextMonthClick}
            disabled={!isBeforeMaxDate}
          >
            <Icon color={Theme.palette.darkBlue} name="chevron-right" />
          </Button>
        </Header>
        <>
          <WeekdayNames currentMonth={currentMonth} locale={locale} />
          <Weeks
            currentMonth={currentMonth}
            selectedStartDate={actualSelectedDate ? actualSelectedDate.startOf('day') : null}
            selectedEndDate={actualSelectedDate ? actualSelectedDate.endOf('day') : null}
            highlightedStartDate={highlightedDate ? highlightedDate.startOf('day') : null}
            highlightedEndDate={highlightedDate ? highlightedDate.endOf('day') : null}
            minDate={minDate}
            maxDate={maxDate}
            onDateClick={this.handleDateClick}
            onDateOver={this.handleDateOver}
          />
        </>
      </div>
    );
  }
}

export default styled(DatePicker)`
  width: 20rem;
`;
