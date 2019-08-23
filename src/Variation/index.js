import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from '../Icon';
import Theme from '../Theme';

const {
  palette: { success, failure },
} = Theme;

/**
 * A Variation consists of just an arrow icon being down or up.
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
  /** className needed by styled-components */
  className: string,

  /** If the variation is negative */
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
