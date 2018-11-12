import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Description } from './elements';
import { STATUS_ICON_NAMES } from './constants';
import { getStatusBackgroundColor } from './helpers';

const { func, oneOf, string } = PropTypes;

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

class Message extends PureComponent {
  closeButtonRef = React.createRef();

  /**
   * PropTypes validation
   */
  static propTypes = {
    ariaLabel: string,
    className: string,
    description: string.isRequired,
    onClose: func,
    onCloseText: string,
    type: oneOf(['success', 'info', 'warning', 'error']),
  };

  /**
   * Default propTypes
   */
  static defaultProps = {
    ariaLabel: null,
    className: '',
    onClose: null,
    onCloseText: '',
    type: 'info',
  };

  componentDidMount() {
    const elButton = this.closeButtonRef.current;

    if (!elButton) return;

    if (document.activeElement instanceof HTMLElement) {
      this.previousFocus = document.activeElement;
    }

    elButton.focus();
  }

  componentWillUnmount() {
    this.restoreFocus();
  }

  /**
   * Handle Click
   */
  handleClick = e => {
    const { onClose } = this.props;

    if (onClose) onClose(e);
  };

  /**
   * Handle Blur
   */
  handleBlur = () => {
    this.restoreFocus();
  };

  /**
   * Restor focus
   */
  restoreFocus = () => {
    if (document.activeElement !== this.closeButtonRef.current) return;

    if (this.previousFocus && this.previousFocus.focus) {
      const scrollPosition = window.pageYOffset;
      this.previousFocus.focus();
      window.scrollTo({ top: scrollPosition });
    }

    this.previousFocus = null;
  };

  render() {
    const { className, description, onClose, onCloseText, ariaLabel, type } = this.props;

    return (
      <div className={className} type={type}>
        <span role="alert" aria-label={ariaLabel || description} />
        <Icon name={STATUS_ICON_NAMES[type]} color={Theme.palette.white} aria-hidden="true" />
        <Description>{description}</Description>
        {onClose && (
          <button
            type="button"
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            ref={this.closeButtonRef}
          >
            {onCloseText}
          </button>
        )}
      </div>
    );
  }
}

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

  button {
    font-size: 1.4rem;

    background: none;
    color: ${({ theme: { palette } }) => palette.white};

    cursor: pointer;
  }
`;

styledMessage.displayName = 'Message';

export default styledMessage;
