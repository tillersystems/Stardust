import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container } from './elements';

const { bool, func, node, string } = PropTypes;

/**
 * Tab are a link displaying the content of a pane
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment)
 * @param {string} className // className needed by styled components
 * @param {boolean} isActive // if the tab is the current displayed content
 * @param {boolean} isCompacted // if it should reduce its size by reducing padding and font-size
 * @param {boolean} isDisabled // if this tab should be interactive or not
 * @param {function} onActivate - callback triggered when the tab is clicked
 *
 * @return {jsx}
 */
const Tab = ({ children, className, isActive, isCompacted, isDisabled, onActivate }) => (
  <Container
    className={className}
    onClick={isDisabled ? null : () => onActivate()}
    isActive={isActive}
    isDisabled={isDisabled}
    isCompacted={isCompacted}
  >
    {children}
  </Container>
);

/** Prop types. */
Tab.propTypes = {
  children: node,
  onActivate: func,
  isActive: bool,
  isCompacted: bool,
  isDisabled: bool,
  className: string,
};

/** Default props. */
Tab.defaultProps = {
  children: null,
  onActivate: () => {},
  isActive: false,
  isCompacted: false,
  isDisabled: false,
  className: '',
};

export default memo(Tab);
