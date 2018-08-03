import React from 'react';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';

import { PopOver } from './elements';

/**
 * Popover
 *
 * This component is in charge of displaying
 * a popover
 *
 * @param {boool} active // Boolean set to display or hide the popover.
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} width // Popover width.
 *
 * @return {jsx}
 */

const Popover = ({ active, children, width }) => (
  <PoseGroup animateOnMount>
    {active && (
      <PopOverAnimation width={width} pose={active ? 'enter' : 'exit'} key="ContainerAnimation">
        {children}
      </PopOverAnimation>
    )}
  </PoseGroup>
);

/**
 * PropTypes Validation
 */
const { bool, node, string } = PropTypes;
Popover.propTypes = {
  active: bool,
  children: node,
  width: string,
};

/**
 * Default props
 */
Popover.defaultProps = {
  active: false,
  children: null,
  width: '100rem',
};

/**
 * Animation
 */
const PopOverAnimation = posed(PopOver)({
  enter: { y: 15, opacity: 1 },
  exit: {
    y: 30,
    opacity: 0,
  },
});

export default Popover;
