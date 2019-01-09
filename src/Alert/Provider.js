import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import posed, { PoseGroup } from 'react-pose';

import Container from './Container';
import { getPositionAnimation } from './helpers';
import isEmpty from '../helpers/objectIsEmpty';

const { node, number, func, oneOf } = PropTypes;
const { Consumer, Provider } = React.createContext({});

/**
 * Alert Provider
 *
 * @param {node} children // anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {function} component // Presentational component for displaying message.
 * @param {oneOf} position // Position of the alert on the screen.
 * @param {number} timeout // The time until an alert is dismissed, in milliseconds.
 *
 * @return {jsx}
 */

class AlertProvider extends PureComponent {
  /**
   * PropTypes validation
   */
  static propTypes = {
    children: node,
    component: func,
    position: oneOf([
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]),
    timeout: number,
  };

  /**
   * Default propTypes
   */
  static defaultProps = {
    children: null,
    component: null,
    position: 'top-center',
    timeout: 3000,
  };

  /**
   * Component internal state
   */
  state = {
    alert: {},
    active: false,
  };

  /**
   * Show
   *
   * Show the alert container and passes
   * all props to the presentational component
   *
   * @param {object} obj
   */
  show = obj => {
    const { alert } = this.state;

    if (!isEmpty(alert)) {
      return;
    }

    this.setState({ alert: obj, active: true });
  };

  /**
   * Hide
   *
   * Hide the alert container
   *
   */
  hide = () => {
    this.setState({ alert: {}, active: false });
  };

  /**
   * Renders the component.
   *
   * @returns {jsx}
   */
  render() {
    const { children, component, timeout, position } = this.props;
    const { alert, active } = this.state;

    return (
      <Provider value={{ show: this.show, hide: this.hide }}>
        {children}
        <Portal>
          <PoseGroup>
            {active && (
              <ContainerAnimation
                key="Container"
                alertProps={alert}
                component={component}
                onHide={this.hide}
                position={position}
                timeout={timeout}
              />
            )}
          </PoseGroup>
        </Portal>
      </Provider>
    );
  }
}

/**
 * Animation
 */
const ContainerAnimation = posed(Container)({
  enter: {
    y: 0,
    x: ({ position }) => getPositionAnimation(position).x,
    transition: {
      y: { type: 'spring', stiffness: 600, damping: 40 },
      default: { duration: 250 },
    },
  },
  exit: {
    y: ({ position }) => getPositionAnimation(position).y,
    x: ({ position }) => getPositionAnimation(position).x,
    transition: { duration: 150 },
  },
});

export const ContextConsumer = Consumer;
export default AlertProvider;
