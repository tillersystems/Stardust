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
const Label = ({ className, label }) => (
  <div className={className}>
    {label.icon && (
      <Icon name={label.icon} color={Theme.palette.mediumGrey} width="1.6rem" height="1.6rem" />
    )}
    {!label.icon && label.text && <span>{label.text}</span>}
  </div>
);

/** Display name. */
Label.displayName = 'Input.Label';

/**Prop types. */
const { string, shape } = PropTypes;
Label.propTypes = {
  className: string.isRequired,
  label: shape({
    text: string,
    icon: string,
  }),
};

/** Default props. */
Label.defaultProps = {
  label: { text: '' },
};

export default styled(Label)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.1rem;

  color: ${({ theme: { palette } }) => palette.darkGrey};
  background: ${({ theme: { palette } }) => palette.paleGrey};

  ${({ position }) =>
    position === 'left' &&
    css`
      border-right: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
    `};

  ${({ position }) =>
    position === 'right' &&
    css`
      border-left: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
    `};
`;
