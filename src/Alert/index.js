import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Message } from './elements';

/**
 * Alert
 *
 * This component is in charge of displaying
 * an Alert for a user
 *
 * @param {string} className // className needed by styled components.
 * @param {string} message // An alert can have a message description.
 * @param {func} onClose // An alert can have a clickable button to close it.
 * @param {bool} success // An Alert can be success.
 * @param {bool} info // An Alert can be info.
 * @param {bool} warning // An Alert can be warning.
 * @param {bool} error // An Alert can be error.
 *
 * @return {jsx}
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */

const Alert = ({ className, message, onClose, success, info, warning, error }) => (
  <div className={className}>
    {success && <Icon name="check-mark" color={Theme.palette.white} />}
    {info && <Icon name="cog" color={Theme.palette.white} />}
    {(warning || error) && <Icon name="exclamation-mark" color={Theme.palette.white} />}
    <Message>{message}</Message>
    <Icon
      name="cross"
      color={Theme.palette.white}
      width="1.8rem"
      height="1.8rem"
      onClick={onClose}
      role="button"
      tabIndex="0"
    />
  </div>
);

/**
 * PropTypes Validation
 */
const { bool, func, string } = PropTypes;
Alert.propTypes = {
  className: string,
  message: string.isRequired,
  onClose: func,
  success: bool,
  info: bool,
  warning: bool,
  error: bool,
};

/**
 * Default props
 */
Alert.defaultProps = {
  className: '',
  onClose: () => {},
  success: false,
  info: false,
  warning: false,
  error: false,
};

export default styled(Alert)`
  display: flex;

  padding: 1.3rem;
  width: 100%;

  border-radius: 0.5rem;

  color: ${({ theme: { palette } }) => palette.white};
  background: ${({ theme: { palette } }) => palette.darkGrey};

  cursor: pointer;

  /* success */
  ${({ success }) =>
    success &&
    css`
      background: ${({ theme: { palette } }) => palette.success.default};
    `};

  /* info */
  ${({ info }) =>
    info &&
    css`
      background: ${({ theme: { palette } }) => palette.primary.default};
    `};

  /* warning */
  ${({ warning }) =>
    warning &&
    css`
      background: ${({ theme: { palette } }) => palette.warning.default};
    `};

  /* warning */
  ${({ error }) =>
    error &&
    css`
      background: ${({ theme: { palette } }) => palette.failure.default};
    `};
`;
