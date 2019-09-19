import PropTypes from 'prop-types';
import React from 'react';
import { NotificationsList } from './elements';

/**
 * Notification list container
 * @param {string} children - Component containing notifications
 *
 * @return {jsx}
 */
const NotificationsListContainer = ({ children, ...rest }) => (
  <NotificationsList {...rest}>{children}</NotificationsList>
);

/**
 * PropTypes Validation
 */
const { oneOf, oneOfType, node, arrayOf } = PropTypes;

NotificationsListContainer.propTypes = {
  /**
   * Position on the screen
   */
  placement: oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]).isRequired,

  /**
   * Inner content
   */
  children: oneOfType([arrayOf(node), node]).isRequired,
};

NotificationsListContainer.displayName = 'NotificationsListContainer';

export default NotificationsListContainer;
