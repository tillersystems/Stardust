import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon } from '../..';
import Theme from '../../Theme';

/** Lookup object for icon name from status. */
const statusToIconName = {
  loading: 'circle-notch',
  info: 'info',
  success: 'check-mark',
  warning: 'exclamation-mark',
  error: 'cross',
  search: 'search',
};

/**
 * Renders a status badge for an input.
 *
 * @param {string} status - The status to display.
 *
 * @return {jsx}
 */
const Status = ({ className, status }) => (
  <div className={className}>
    <Icon
      color={status === 'loading' ? Theme.palette.blue : Theme.palette.white}
      name={statusToIconName[status]}
      width={['loading', 'info', 'warning'].includes(status) ? '2rem' : '1.1rem'}
      height={['loading', 'info', 'warning'].includes(status) ? '2rem' : '1.1rem'}
      spin={status === 'loading'}
    />
  </div>
);

/** Display name. */
Status.displayName = 'Input.Status';

/** Props types. */
const { string } = PropTypes;
Status.propTypes = {
  className: string,
  status: string.isRequired,
};

/** Default props. */
Status.defaultProps = {
  className: '',
};

export default styled(Status)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.8rem;
  height: 1.8rem;

  margin-right: ${({ theme: { dimensions } }) => dimensions.small};

  border-radius: 50%;

  ${({ status }) =>
    status === 'loading' &&
    css`
      background: ${({ theme: { palette } }) => palette.white};
    `};

  ${({ status }) =>
    status === 'info' &&
    css`
      background: ${({ theme: { palette } }) => palette.blue};
    `};

  ${({ status }) =>
    status === 'success' &&
    css`
      background: ${({ theme: { palette } }) => palette.green};
    `};

  ${({ status }) =>
    status === 'warning' &&
    css`
      background: ${({ theme: { palette } }) => palette.orange};
    `};

  ${({ status }) =>
    status === 'error' &&
    css`
      background: ${({ theme: { palette } }) => palette.red};
    `};

  ${({ status }) =>
    status === 'search' &&
    css`
      background: ${({ theme: { palette } }) => palette.gray};
    `};

  ${({ status, hasFocus }) =>
    status === 'search' &&
    hasFocus &&
    css`
      background: ${({ theme: { palette } }) => palette.blue};
    `};
`;
