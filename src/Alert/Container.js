import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import { Status } from './constants';

const { func, number, object, oneOf } = PropTypes;
const { ACTIVE, INACTIVE } = Status;

/**
 * Alert Container
 *
 * This component is in charge of displaying
 * the alert container
 *
 * @param {object} alertProps
 * @param {function} component // Presentational component for displaying message.
 * @param {function} onHide
 * @param {string} position // Position of the alert on the screen.
 * @param {number} timeout // The time until an alert is dismissed, in milliseconds.
 *
 * @return {jsx}
 */

class AlertContainer extends PureComponent {
  /**
   * PropTypes validation
   */
  static propTypes = {
    alertProps: object.isRequired,
    component: func.isRequired,
    onHide: func.isRequired,
    position: oneOf([
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]).isRequired,
    timeout: number.isRequired,
  };

  /**
   * Component internal state
   */
  state = {
    status: INACTIVE,
  };

  componentDidMount() {
    this.setState({ status: ACTIVE });
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  /**
   * Start Timer
   *
   */
  startTimer = () => {
    const { timeout } = this.props;

    this.timer = setTimeout(this.hide, timeout);
  };

  /**
   * Stop Timer
   *
   */
  stopTimer = () => {
    if (!this.timer) return;

    clearTimeout(this.timer);
  };

  /**
   * Hide
   * hides active alert container
   */
  hide = () => {
    const { onHide } = this.props;

    this.stopTimer();

    this.setState({ status: INACTIVE }, () => {
      onHide();
    });
  };

  render() {
    const { alertProps, component: Component, hostRef, position } = this.props;
    const { status } = this.state;
    const attributes = {};

    /**
     * When alert is active we want to stop the timer
     * as long as the user puts the mouse on it
     */
    if (status === ACTIVE) {
      attributes.onMouseEnter = this.stopTimer;
      attributes.onMouseLeave = this.startTimer;
    }

    return (
      <Container {...attributes} position={position} innerRef={hostRef}>
        <Component {...alertProps} />
      </Container>
    );
  }
}

export default AlertContainer;
