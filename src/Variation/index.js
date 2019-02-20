import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from '../Icon';
import Theme from '../Theme';

const {
  palette: { success, failure },
} = Theme;

/**
 * Variation
 *
 * This component is in charge of displaying a variation
 *
 * @param {string} className // Classes needed by styled component.
 * @param {string} negative // By default a variation is positive but it can be negative.
 *
 * @return {jsx}
 */

const Variation = ({ className, negative }) => (
  <div className={className}>
    {negative ? (
      <Icon name="triangle-down" color={failure.default} width="10" height="10" />
    ) : (
      <Icon name="triangle-up" color={success.default} width="10" height="10" />
    )}
  </div>
);

/**
 * PropTypes Validation
 */
const { bool, string } = PropTypes;
Variation.propTypes = {
  className: string,
  negative: bool,
};

/**
 * Default props
 */
Variation.defaultProps = {
  className: '',
  negative: false,
};

export default styled(Variation)`
  width: 2rem;
  height: 2rem;
  padding-top: 0.4rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;

  color: ${({ theme: { palette } }) => palette.success.fore};
  background: ${({ theme: { palette } }) => palette.success.back};

  ${({ negative }) =>
    negative &&
    css`
      padding-top: 0.6rem;

      background: ${({ theme: { palette } }) => palette.failure.back};
    `};
`;
