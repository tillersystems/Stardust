import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon } from '../..';
import Theme from '../../Theme';

/**
 * Renders a label with an icon for an input.
 *
 * @return {jsx}
 */
const Label = ({ className, icon }) => (
  <div className={className}>
    <Icon name={icon} color={Theme.palette.grey} width="1.5rem" height="1.5rem" />
  </div>
);

/** Display name. */
Label.displayName = 'Input.Label';

/**Prop types. */
const { string } = PropTypes;
Label.propTypes = {
  className: string.isRequired,
  icon: string,
};

/** Default props. */
Label.defaultProps = {
  icon: 'tiller',
};

export default styled(Label)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.8rem;
  height: 3.8rem;

  background: ${({ theme: { palette } }) => palette.bodyBackground};

  ${({ position }) =>
    position === 'left' &&
    css`
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-right: 1px solid ${({ theme: { palette } }) => palette.gray};
    `};

  ${({ position }) =>
    position === 'right' &&
    css`
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-left: 1px solid ${({ theme: { palette } }) => palette.gray};
    `};
`;
