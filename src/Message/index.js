import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Description } from './elements';
import { STATUS_ICON_NAMES } from './constants';
import { getStatusBackgroundColor } from './helpers';

/**
 * A Message displays text in one of these styles: success, info, warning or error.
 * It can have a clickable button to trigger a callback, which can update the state
 * to hide the message.
 *
 * @return {jsx}
 */

const Message = ({ className, description, onClose, type }) => (
  <div className={className} type={type}>
    <Icon name={STATUS_ICON_NAMES[type]} color={Theme.palette.white} />
    <Description>{description}</Description>
    {onClose && (
      <Icon
        tabIndex="0"
        role="button"
        name="cross"
        color={Theme.palette.white}
        size="18px"
        onClick={onClose}
        data-testid="close-button"
      />
    )}
  </div>
);

/**
 * PropTypes Validation
 */
const { func, oneOf, string } = PropTypes;
Message.propTypes = {
  /**
   * className needed by styled components
   */
  className: string,

  /**
   * Text displayed in the message box
   */
  description: string.isRequired,

  /**
   * Callback triggered when the close icon is clicked
   */
  onClose: func,

  /**
   * Type of the message box varying the style of the box
   */
  type: oneOf(['success', 'info', 'warning', 'error']),
};

/**
 * Default props
 */
Message.defaultProps = {
  className: '',
  onClose: null,
  type: 'info',
};

const styledMessage = styled(Message)`
  display: flex;
  align-items: center;

  padding: 1.3rem;

  border-radius: 0.5rem;

  color: ${({ theme: { palette } }) => palette.white};

  cursor: pointer;

  ${({ theme, type }) =>
    css`
      background: ${getStatusBackgroundColor(theme, type)};
    `};
`;

styledMessage.displayName = 'Message';

export default styledMessage;
