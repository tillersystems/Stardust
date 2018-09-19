import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Info } from 'luxon';

import { DayName } from './elements';

/**
 * Week day Names
 *
 * This component is in charge of displaying
 * the week day names
 *
 * @param {string} className // Class needed by styled component.
 *
 * @return {jsx}
 */

const WeekdayNames = ({ className, locale }) => {
  const dayNames = Info.weekdays('short', { locale });
  return (
    <div className={className} key={name}>
      {dayNames.map(dayName => (
        <DayName key={dayName}>{dayName}</DayName>
      ))}
    </div>
  );
};

/**
 * PropTypes Validation.
 */
const { string } = PropTypes;
WeekdayNames.propTypes = {
  className: string,
  locale: string,
};

/**
 * Default props.
 */
WeekdayNames.defaultProps = {
  className: '',
  locale: 'en',
};

export default styled(WeekdayNames)`
  display: grid;
  grid-template-columns: repeat(7, 2.8rem);
  grid-template-rows: 2rem;
  justify-items: stretch;
  align-items: stretch;

  text-align: center;

  border-bottom: 1px solid ${({ theme: { palette } }) => palette.mediumGrey};

  color: ${({ theme: { palette } }) => palette.mediumGrey};
`;
