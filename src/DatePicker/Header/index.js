import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../../Icon';
import Theme from '../../Theme';
import { Title, HeaderButton } from './elements';

/**
 * Header
 *
 * This component is in charge of displaying date picker header.
 *
 * @param {string} className - Class needed by styled component.
 * @param {string} title - The title of the header.
 * @param {func} prev - Prev button handler.
 * @param {func} next - Next button handler.
 * @param {bool} shouldDisablePrev - Indicates if the prev button should be disabled.
 * @param {bool} shouldDisableNext - Indicates if the next button should be disabled.
 * @param {number} monthIndex - Month index ( rely on numberOfMonthsToDisplay).
 * @param {number} numberOfMonthsToDisplay - The number of month to display visualy (1 or 2).
 *
 * @return {jsx}
 */
const Header = ({
  className,
  title,
  prev,
  next,
  shouldDisablePrev,
  shouldDisableNext,
  monthIndex,
  numberOfMonthsToDisplay,
}) => (
  <div className={className}>
    {monthIndex === 0 && (
      <HeaderButton
        data-testid="previous-month-button"
        size="small"
        onClick={prev}
        disabled={shouldDisablePrev}
        css="padding: 0;"
      >
        <Icon color={Theme.palette.spaceGrey} name="chevron-left" />
      </HeaderButton>
    )}
    <Title>{title}</Title>
    {((numberOfMonthsToDisplay < 2 && monthIndex === 0) || monthIndex === 1) && (
      <HeaderButton
        data-testid="next-month-button"
        size="small"
        onClick={next}
        disabled={shouldDisableNext}
        css="padding: 0;"
      >
        <Icon color={Theme.palette.spaceGrey} name="chevron-right" />
      </HeaderButton>
    )}
  </div>
);

/**
 * PropTypes Validation.
 */
const { bool, func, number, string } = PropTypes;
Header.propTypes = {
  className: string,
  title: string,
  prev: func,
  monthIndex: number,
  next: func,
  numberOfMonthsToDisplay: number,
  shouldDisablePrev: bool,
  shouldDisableNext: bool,
};

/**
 * Default props.
 */
Header.defaultProps = {
  className: '',
  title: '',
  prev: () => {},
  monthIndex: 0,
  next: () => {},
  numberOfMonthsToDisplay: 1,
  shouldDisablePrev: false,
  shouldDisableNext: false,
};

const styledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.default};

  line-height: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};
`;

styledHeader.displayName = 'Header';

export default memo(styledHeader);
