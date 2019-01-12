import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime, Interval } from 'luxon';

import { Button, Icon, Theme } from '../..';
import Weeks from '../Weeks';
import WeekdayNames from '../WeekdayNames';
import { Header, HeaderTitle } from '../elements';
import { PickerContainer, Separator } from './elements';

/**
 * Gets a valid current month from the given date and max date.
 *
 * @param {luxon.DateTime} date - The date.
 * @param {luxon.DateTime} maxDate - The maximum date.
 *
 * @return {luxon.DateTime}
 */
const getCurrentMonth = (date, maxDate) => {
  return date.startOf('month').minus(date.diff(maxDate.startOf('month'), 'months').months + 1);
};

/**
 * DateRangePicker
 *
 * This component is in charge of displaying a date range picker.
 *
 * @param {string} className - Styled component class name.
 * @param {string} locale - Local to use to display the weekday names.
 * @param {luxon.Interval} value - Controlled value (the selected date).
 * @param {luxon.DateTime} minDate - Minimum allowed date.
 * @param {luxon.DateTime} maxDate - Maximum allowed date.
 * @param {function} onChange - Handler of date change.
 *
 * @return {jsx}
 */
class DateRangePicker extends PureComponent {
  /** Display name. */
  static displayName = 'DateRangePicker';

  /** Prop types validation. */
  static propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string,
    value: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    onChange: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    value: null,
    minDate: null,
    maxDate: null,
    locale: 'en',
    onChange: () => {},
  };

  /** Internal state. */
  state = {
    currentMonth: DateTime.local(),
    selectedStartDate: null,
    selectedEndDate: null,
    hoveredDate: null,
  };

  /**
   * Handles mounted event of component's lifecycle.
   */
  componentDidMount() {
    const { maxDate } = this.props;

    // Sets currentMonth in componentDidMount since relies on props
    this.setState({
      ...this.state,
      currentMonth: getCurrentMonth(DateTime.local(), maxDate || DateTime.local()),
    });
  }

  /**
   * Handles click on a date.
   *
   * @param {luxon.DateTime} date - The clicked date.
   */
  handleDateClick = date => {
    const { selectedStartDate, selectedEndDate } = this.state;
    const { onChange, maxDate } = this.props;

    if (!selectedStartDate) {
      this.setState({
        ...this.state,
        currentMonth: getCurrentMonth(date, maxDate || date),
        selectedStartDate: date,
      });
    } else {
      if (!selectedEndDate) {
        const newSelectedStartDate = DateTime.min(selectedStartDate, date);
        const newSelectedEndDate = DateTime.max(selectedStartDate, date);

        this.setState(
          {
            ...this.state,
            currentMonth: getCurrentMonth(
              newSelectedStartDate,
              maxDate || newSelectedStartDate.minus({ month: 1 }),
            ),
            selectedStartDate: newSelectedStartDate,
            selectedEndDate: newSelectedEndDate,
          },
          () => {
            onChange(Interval.fromDateTimes(selectedStartDate, date));
          },
        );
      } else {
        this.setState({
          ...this.state,
          currentMonth: getCurrentMonth(date, maxDate || date),
          selectedStartDate: date,
          selectedEndDate: null,
        });
      }
    }
  };

  /**
   * Handles mouse over a date.
   *
   * @param {luxon.DateTime} date - The date.
   */
  handleDateOver = date => {
    this.setState({ ...this.state, hoveredDate: date });
  };

  /**
   * Handles click on previous month.
   */
  handlePrevMonthClick = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: currentMonth.minus({ months: 1 }),
    });
  };

  /**
   * Handles click on next month.
   */
  handleNextMonthClick = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: currentMonth.plus({ months: 1 }),
    });
  };

  render() {
    const { className, value, locale, minDate, maxDate } = this.props;
    const { currentMonth, selectedStartDate, selectedEndDate, hoveredDate } = this.state;

    const actualSelectedStartDate =
      selectedStartDate && !selectedEndDate
        ? selectedStartDate
        : value
        ? value.start
        : selectedStartDate;
    const actualSelectedEndDate =
      selectedStartDate && !selectedEndDate
        ? selectedStartDate
        : value
        ? value.end
        : selectedEndDate;

    const highlightedStartDate =
      selectedStartDate && selectedEndDate
        ? hoveredDate
        : hoveredDate
        ? DateTime.min(selectedStartDate || hoveredDate, selectedEndDate || hoveredDate)
        : null;
    const highlightedEndDate =
      selectedStartDate && selectedEndDate
        ? hoveredDate
        : hoveredDate
        ? DateTime.max(selectedStartDate || hoveredDate, selectedEndDate || hoveredDate)
        : null;

    const nextMonth = currentMonth.plus({ months: 1 });

    const isAfterMinDate = !minDate || currentMonth.startOf('month') >= minDate.startOf('month');
    const isBeforeMaxDate = !maxDate || nextMonth.endOf('month') <= maxDate.endOf('month');

    return (
      <div className={className} onMouseLeave={() => this.handleDateOver(null)}>
        <PickerContainer>
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
          </Header>
          <>
            <WeekdayNames currentMonth={currentMonth} locale={locale} />
            <Weeks
              currentMonth={currentMonth}
              selectedStartDate={
                actualSelectedStartDate ? actualSelectedStartDate.startOf('day') : null
              }
              selectedEndDate={actualSelectedEndDate ? actualSelectedEndDate.endOf('day') : null}
              highlightedStartDate={
                highlightedStartDate ? highlightedStartDate.startOf('day') : null
              }
              highlightedEndDate={highlightedEndDate ? highlightedEndDate.endOf('day') : null}
              minDate={minDate}
              maxDate={maxDate}
              onDateClick={this.handleDateClick}
              onDateOver={this.handleDateOver}
            />
          </>
        </PickerContainer>

        <Separator />

        <PickerContainer>
          <Header>
            <HeaderTitle>
              {nextMonth.setLocale(locale).toLocaleString({ month: 'long', year: 'numeric' })}
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
            <WeekdayNames currentMonth={nextMonth} locale={locale} />
            <Weeks
              currentMonth={nextMonth}
              selectedStartDate={
                actualSelectedStartDate ? actualSelectedStartDate.startOf('day') : null
              }
              selectedEndDate={actualSelectedEndDate ? actualSelectedEndDate.endOf('day') : null}
              highlightedStartDate={
                highlightedStartDate ? highlightedStartDate.startOf('day') : null
              }
              highlightedEndDate={highlightedEndDate ? highlightedEndDate.endOf('day') : null}
              minDate={minDate}
              maxDate={maxDate}
              onDateClick={this.handleDateClick}
              onDateOver={this.handleDateOver}
            />
          </>
        </PickerContainer>
      </div>
    );
  }
}

export default styled(DateRangePicker)`
  display: grid;
  grid-column-gap: ${({ theme: { dimensions } }) => dimensions.medium};
  grid-template-rows: auto;
  grid-template-columns: 20rem 0.1rem 20rem;
`;
