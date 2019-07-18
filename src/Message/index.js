import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Description } from './elements';
import { STATUS_ICON_NAMES } from './constants';
import { getStatusBackgroundColor } from './helpers';

/**
 * Message
 *
 * This component is in charge of displaying
 * an Message for a user
 *
 * @param {bool} closable // Whether it is possible to close the Message box.
 * @param {string} description // An alert can have a message description.
 * @param {func} onClose // An message can have a clickable button to close it.
 * @param {enum} type // The type of the message box.
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
  className: string,
  description: string.isRequired,
  onClose: func,
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
