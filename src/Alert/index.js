import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { Portal } from 'react-portal';

import { Icon, Theme } from '..';
import { AlertContainer, Message } from './elements';
import { STATUS_ICON_NAMES } from './constants';

/**
 * Alert
 *
 * This component is in charge of displaying
 * an Alert for a user
 *
 * @param {bool} closable // Whether it is possible to close the alert box.
 * @param {string} message // An alert can have a message description.
 * @param {func} onClose // An alert can have a clickable button to close it.
 * @param {enum} type // The type of the message box.
 *
 * @return {jsx}
 */

class Alert extends Component {
  render() {
    const { active, type, message, closable, onClose } = this.props;
    return (
      <Portal>
        <PoseGroup>
          {active && [
            <AlertAnimation role="alert" type={type} key="alert">
              <Icon name={STATUS_ICON_NAMES[type]} color={Theme.palette.white} aria-hidden="true" />
              <Message>{message}</Message>
              {closable && (
                <Icon
                  tabIndex="0"
                  role="button"
                  name="cross"
                  color={Theme.palette.white}
                  width="1.8rem"
                  height="1.8rem"
                  onClick={onClose}
                />
              )}
            </AlertAnimation>,
          ]}
        </PoseGroup>
      </Portal>
    );
  }
}

/**
 * Animation
 */
const AlertAnimation = posed(AlertContainer)({
  enter: {
    y: 0,
    transition: {
      y: { type: 'spring', stiffness: 400, damping: 35 },
      default: { duration: 250 },
    },
  },
  exit: {
    y: -50,
    transition: { duration: 150 },
  },
});

/**
 * PropTypes Validation
 */
const { bool, func, oneOf, string } = PropTypes;
Alert.propTypes = {
  closable: bool,
  message: string.isRequired,
  onClose: func,
  type: oneOf(['success', 'info', 'warning', 'error']),
};

/**
 * Default props
 */
Alert.defaultProps = {
  closable: false,
  onClose: false,
  type: 'info',
};

export default Alert;
