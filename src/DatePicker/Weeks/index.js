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
  currentDate,
  minDate,
  maxDate,
  onDateClick,
  selected,
  startDate,
  endDate,
}) => {
  return (
    <div className={className}>
      {getCalendarDates(currentDate).map(date => {
        // Normalize date from date object
        // @see: https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromJSDate
        const dateNormalized = DateTime.fromObject(date);

        // Check if calendar date is in the same month as the state month and year
        const monthStart = dateNormalized.startOf('month');
        const isInMonth = monthStart.hasSame(currentDate, 'month');

        // Check if selected date is in range
        const isInRange =
          (!minDate || dateNormalized > minDate) && (!maxDate || dateNormalized < maxDate);

        // Check if calendar date is same day as selected
        const isSelected = isInMonth && isInRange && isSameDay(dateNormalized, selected);

        const startOfDay = dateNormalized.startOf('day');

        const isInPath =
          isInMonth &&
          isInRange &&
          startDate &&
          endDate &&
          startOfDay >= startDate &&
          startOfDay <= endDate;

        const isStartEdge =
          !!startDate && isInMonth && isInRange && isSameDay(dateNormalized, startDate);
        const isEndEdge = !!endDate && isInMonth && isInRange && isSameDay(dateNormalized, endDate);

        const { day } = dateNormalized;

        // Do not trigger onlick if the day is disabled (below minDate or after maxDate)
        const onDayClick = () => isInRange && onDateClick(dateNormalized);

        return (
          <Day
            key={dateNormalized}
            disabled={!isInRange}
            shadowed={!isInMonth}
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

const { string, object, func } = PropTypes;
Weeks.propTypes = {
  className: string,
  currentDate: object.isRequired,
  selected: object.isRequired,
  startDate: object,
  endDate: object,
  minDate: object,
  maxDate: object,
  onDateClick: func,
};

Weeks.defaultProps = {
  className: '',
  minDate: null,
  maxDate: null,
  onDateClick: () => {},
  startDate: null,
  endDate: null,
};

export default styled(Weeks)`
  display: flex;
  flex-wrap: wrap;
`;
