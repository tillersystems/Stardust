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
 * @param {bool} active // Boolean set to display or hide the popover.
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} width // Popover width.
 *
 * @return {jsx}
 */

const Popover = ({ active, arrowPositionX, children, width }) => (
  <PoseGroup>
    {active && (
      <PopOverAnimation
        width={width}
        arrowPositionX={arrowPositionX}
        key="popover"
        data-testid="popover"
      >
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
  arrowPositionX: string,
  children: node,
  width: string,
};

/**
 * Default props
 */
Popover.defaultProps = {
  active: false,
  arrowPositionX: '50%',
  children: null,
  width: 'auto',
};

/**
 * Animation
 */
const PopOverAnimation = posed(PopOver)({
  enter: {
    y: 15,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 900, damping: 30 },
      default: { duration: 150 },
    },
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: { duration: 150 },
  },
});

export default Popover;
