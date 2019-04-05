import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Container } from './elements';

const { bool, func, node, number, string } = PropTypes;

/**
 * Tabs are links displaying the content of a pane
 *
 * @param {number} activeIndex // index of the active tab
 * @param {Array} children // interactive links displaying tabs on click
 * @param {string} className // className needed by styled components
 * @param {boolean} isCompacted // if it should reduce its size by reducing padding and font-size
 * @param {function} onActiveTab // callback triggered when the tab is clicked
 *
 * @return {jsx}
 */
const Tabs = ({ activeIndex, children, className, isCompacted, onActiveTab }) => (
  <Container className={className} isCompacted={isCompacted}>
    {Children.map(children, (child, index) =>
      cloneElement(child, {
        isCompacted,
        isActive: index === activeIndex,
        onActivate: () => {
          onActiveTab(index);
        },
      }),
    )}
  </Container>
);

Tabs.displayName = 'Tabs';

/** Prop types. */
Tabs.propTypes = {
  activeIndex: number,
  children: node,
  className: string,
  isCompacted: bool,
  onActiveTab: func,
};

/** Default props. */
Tabs.defaultProps = {
  activeIndex: 0,
  children: null,
  className: '',
  isCompacted: false,
  onActiveTab: () => {},
};

export default Tabs;
