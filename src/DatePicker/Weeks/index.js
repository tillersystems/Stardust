import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Day from '../Day';
import { getCalendarDates, isSameDay } from '../helpers';

/**
 * Week
 *
 * This component is in charge of displaying
 * a week
 *
 * @param {string} className - Class needed by styled component.
 * @param {string} currentDate - The current month.
 * @param {string} selected - The selected date.
 * @param {string} startDate - The selected start date.
 * @param {string} endDate - The selected end date.
 * @param {string} onDateClick - Date click handler.
 *
 * @return {jsx}
 */
const Weeks = ({
  className,
  currentMonth,
  displayOnlyInMonth,
  minDate,
  maxDate,
  onDateClick,
  selected,
  startDate,
  endDate,
}) => {
  return (
    <div className={className}>
      {getCalendarDates(currentMonth).map(date => {
        // Normalize date from date object
        // @see: https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromJSDate
        const dateNormalized = DateTime.fromObject(date);

        // Check if calendar date is in the same month as the state month and year
        const monthStart = dateNormalized.startOf('month');
        const isInMonth = monthStart.hasSame(currentMonth, 'month');

        // Check if selected date is in range
        const isInRange =
          (!minDate || dateNormalized >= minDate.startOf('day')) &&
          (!maxDate || dateNormalized <= maxDate.startOf('day'));

        const isSelected = selected && isInRange && isSameDay(dateNormalized, selected);

        const startOfDay = dateNormalized.startOf('day');

        const isInPath =
          isInRange && startDate && endDate && startOfDay >= startDate && startOfDay <= endDate;

        const isStartEdge = !!startDate && isInRange && isSameDay(dateNormalized, startDate);
        const isEndEdge = !!endDate && isInRange && isSameDay(dateNormalized, endDate);

        const { day } = dateNormalized;

        // Do not trigger onlick if the day is disabled (below minDate or after maxDate)
        const onDayClick = () => isInRange && onDateClick(dateNormalized);

        return (
          <Day
            key={dateNormalized}
            disabled={!isInRange}
            shadowed={!isInMonth}
            displayOnlyInMonth={displayOnlyInMonth}
            isSelected={isSelected}
            isInPath={isInPath}
            isStartEdge={isStartEdge}
            isEndEdge={isEndEdge}
            onClick={onDayClick}
          >
            {day}
          </Day>
        );
      })}
    </div>
  );
};

const { bool, string, object, func } = PropTypes;
Weeks.propTypes = {
  className: string,
  currentMonth: object.isRequired,
  displayOnlyInMonth: bool,
  selected: object,
  startDate: object,
  endDate: object,
  minDate: object,
  maxDate: object,
  onDateClick: func,
};

Weeks.defaultProps = {
  className: '',
  displayOnlyInMonth: false,
  minDate: null,
  maxDate: null,
  onDateClick: () => {},
  selected: null,
  startDate: null,
  endDate: null,
};

export default styled(Weeks)`
  display: flex;
  flex-wrap: wrap;
`;
