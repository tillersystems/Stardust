import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';

const { node, number, string } = PropTypes;

/**
 * Panes hold the content of interactive tabs
 *
 * @param {number} activeIndex // index of the active tab
 * @param {string} className /// className needed by styled components
 *
 * @return {jsx}
 */
class Panes extends PureComponent {
  static displayName = 'Panes';

  /** Prop types. */
  static propTypes = {
    activeIndex: number,
    children: node,
    className: string,
  };

  /** Default props. */
  static defaultProps = {
    activeIndex: 0,
    children: null,
    className: '',
  };

  render() {
    const { activeIndex, children, className } = this.props;

    return <Container className={className}>{children[activeIndex]}</Container>;
  }
}

export default Panes;
