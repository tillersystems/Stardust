import React, { createContext, Children, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Nav, NavItem } from './elements';

export const context = createContext({});

/**
 * A Navigation wraps all the logic between navigation items,
 * usually you should pass link as child but Navigation accept all tag's type.
 *
 * @return {jsx}
 */
const Navigation = ({ children, isFluid, isVertical }) => {
  // eslint-disable-next-line react/prop-types
  const activeItem = children.findIndex(({ props }) => props.isActive);
  const [activeNavItem, setActiveNavItem] = useState(activeItem || 0);

  useEffect(() => setActiveNavItem(activeItem), [activeItem]);

  return (
    <Nav isVertical={isVertical} data-testid="navigation">
      {Children.map(children, ({ props, type }, index) => (
        <NavItem
          isActived={activeNavItem === index}
          isFluid={isFluid}
          isVertical={isVertical}
          onClick={() => setActiveNavItem(index)}
          key={index}
          forwardedAs={type}
          {...props}
        >
          {props.children}
        </NavItem>
      ))}
    </Nav>
  );
};

/**
 * PropTypes Validation
 */
const { node, bool } = PropTypes;
Navigation.propTypes = {
  /** Usually you should pass link as child but Navigation accept all tag's type. */
  children: node,
  /** Does items take all remaining space or not. */
  isFluid: bool,
  /** Does items are rendered in vertical or horizontal display. */
  isVertical: bool,
};

/**
 * Default props.
 */
Navigation.defaultProps = {
  children: null,
  isFluid: false,
  isVertical: false,
};

export default Navigation;
