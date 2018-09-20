import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Day from '../Day';

/**
 * Week
 *
 * This component is in charge of displaying
 * a week
 *
 * @param {string} className - Class needed by styled component.
 * @param {string} currentMonth - The current month.
 * @param {string} onDateClick - Date click handler.
 * @param {luxon.DateTime} selectedStartDate - Selected start date.
 * @param {luxon.DateTime} selectedEndDate - Selected end date.
 * @param {luxon.DateTime} highlightedStartDate - Highlighted start date.
 * @param {luxon.DateTime} highlightedEndDate - Highlighted end date.
 *
 * @return {jsx}
 */
const Weeks = ({
  className,
  currentMonth,
  selectedStartDate,
  selectedEndDate,
  highlightedStartDate,
  highlightedEndDate,
  minDate,
  maxDate,
  onDateClick,
  onDateOver,
}) => {
  const monthStart = currentMonth.startOf('month');
  const monthEnd = currentMonth.endOf('month');
  const startDate = monthStart.startOf('week');
  const endDate = monthEnd.endOf('week');

  const rows = [];

  let days = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    for (let i = 0; i < 7; i++) {
      const date = currentDate;

      const startOfDay = date.startOf('day');
      const endOfDay = date.endOf('day');

      const isInMonth = monthStart.hasSame(date, 'month');
      const isInRange = (!minDate || date > minDate) && (!maxDate || date < maxDate);

      const isInSelectedRange =
        isInMonth &&
        isInRange &&
        selectedStartDate &&
        selectedEndDate &&
        startOfDay >= selectedStartDate &&
        endOfDay <= selectedEndDate;

      const isInHighlightedRange =
        isInMonth &&
        isInRange &&
        highlightedStartDate &&
        highlightedEndDate &&
        startOfDay >= highlightedStartDate &&
        endOfDay <= highlightedEndDate;

      const isAlwaysStart = i == 0 || monthStart.hasSame(date, 'day');
      const isAlwaysEnd = i == 6 || monthEnd.hasSame(date, 'day');

      days.push(
        <Day
          key={date}
          date={date}
          selected={isInSelectedRange}
          selectionStart={
            isAlwaysStart || (selectedStartDate && selectedStartDate.hasSame(date, 'day'))
          }
          selectionEnd={isAlwaysEnd || (selectedEndDate && selectedEndDate.hasSame(date, 'day'))}
          highlighted={isInHighlightedRange}
          highlightStart={
            isAlwaysStart || (highlightedStartDate && highlightedStartDate.hasSame(date, 'day'))
          }
          highlightEnd={
            isAlwaysEnd || (highlightedEndDate && highlightedEndDate.hasSame(date, 'day'))
          }
          shadowed={!isInMonth}
          disabled={!isInRange}
          onClick={isInRange ? () => onDateClick(date) : null}
          onOver={isInRange && isInMonth ? () => onDateOver(date) : () => onDateOver(null)}
        />,
      );

      currentDate = currentDate.plus({ day: 1 });
    }

    rows.push(
      <div key={currentDate} className={className}>
        {days}
      </div>,
    );
    days = [];
  }

  return <div>{rows}</div>;
};

const { string, object, func } = PropTypes;
Weeks.propTypes = {
  className: string,
  currentMonth: object.isRequired,
  selectedStartDate: object,
  selectedEndDate: object,
  highlightedStartDate: object,
  highlightedEndDate: object,
  minDate: object,
  maxDate: object,
  onDateClick: func,
  onDateOver: func,
};

Weeks.defaultProps = {
  className: '',
  selectedStartDate: null,
  selectedEndDate: null,
  highlightedStartDate: null,
  highlightedEndDate: null,
  minDate: null,
  maxDate: null,
  onDateClick: () => {},
  onDateOver: () => {},
};

export default styled(Weeks)`
  display: grid;
  grid-template-columns: repeat(7, 2.8rem);
  grid-template-rows: 2.8rem;
  justify-items: stretch;
  align-items: stretch;

  text-align: center;

  color: ${({ theme: { palette } }) => palette.mediumGrey};
`;
