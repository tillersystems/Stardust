import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Info } from 'luxon';

import { DayName } from './elements';

/**
 * Week days
 *
 * This component is in charge of displaying
 * the week day names
 *
 * @param {string} className // Class needed by styled component.
 * @param {string} locale // Local to use to display the weekday names.
 *
 * @return {jsx}
 */

const Weekdays = ({ className, locale }) => {
  const dayNames = Info.weekdays('short', { locale });
  return (
    <div className={className}>
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
Weekdays.propTypes = {
  className: string,
  locale: string,
};

/**
 * Default props.
 */
Weekdays.defaultProps = {
  className: '',
  locale: 'en',
};

export default memo(styled(Weekdays)`
  display: flex;
  flex-wrap: nowrap;
  margin: 1.6rem 0 0.8rem;
`);
