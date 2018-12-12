import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from '..';

/**
 * OnWindowResize
 *
 * This component render a boolean if it's responsive
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 *
 * @return {func}
 */

const { func, oneOf } = PropTypes;

export default class Resize extends React.Component {
  /**
   * PropTypes Validation
   */
  static propTypes = {
    children: func,
    breakpoint: oneOf(['sm', 'md', 'lg', 'xl']),
  };

  /**
   * Default props
   */
  static defaultProps = {
    children: '',
    breakpoint: 'sm',
  };

  /*eslint-disable*/
  /*
   * Linter is disable here cause if this function is placed after componentWillUnmount()
   * it will return undefined when state are initialized
   */
  isBreakpoint = () => {
    const { breakpoint } = this.props;
    return window.innerWidth < Theme.breakpoints[breakpoint];
  };
  /*eslint-enable*/

  onResize = () => {
    this.setState({
      isResponsive: this.isBreakpoint(),
    });
  };

  state = {
    isResponsive: this.isBreakpoint(),
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isResponsive } = this.state;
    if (nextState.isResponsive !== isResponsive) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { isResponsive } = this.state;
    const { children: render } = this.props;
    return render(isResponsive);
  }
}
