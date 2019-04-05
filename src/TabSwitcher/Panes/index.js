import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';

const { bool, node, number, string } = PropTypes;

/**
 * Panes hold the content of interactive tabs
 *
 * @param {number} activeIndex // index of the active tab
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment)
 * @param {string} className // className needed by styled components
 * @param {boolean} isCompacted // if it should reduce its size by reducing padding and font-size
 *
 * @return {jsx}
 */
const Panes = ({ activeIndex, children, className, isCompacted }) => (
  <Container className={className} isCompacted={isCompacted}>
    {children[activeIndex]}
  </Container>
);

Panes.displayName = 'Panes';

/** Prop types. */
Panes.propTypes = {
  activeIndex: number,
  children: node,
  className: string,
  isCompacted: bool,
};

/** Default props. */
Panes.defaultProps = {
  activeIndex: 0,
  children: null,
  className: '',
  isCompacted: false,
};

export default Panes;
