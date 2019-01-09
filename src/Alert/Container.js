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
 * @param {object} alertProps // Alert props passed down to the component
 * @param {function} component // Presentational component for displaying message.
 * @param {function} onHide // Callback function called when alert disapear.
 * @param {function} hostRef // hostRef used by react pose
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
    hostRef: func.isRequired,
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

  /**
   * Handles mounted event of component's lifecycle.
   */
  componentDidMount() {
    this.setState({ status: ACTIVE });
    this.startTimer();
  }

  /**
   * Handles unmounted event of component's lifecycle.
   */
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

  /**
   * Renders the component.
   *
   * @returns {jsx}
   */
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
      <Container
        {...attributes}
        position={position}
        innerRef={hostRef}
        data-testid="alert-container"
      >
        <Component {...alertProps} />
      </Container>
    );
  }
}

export default AlertContainer;
