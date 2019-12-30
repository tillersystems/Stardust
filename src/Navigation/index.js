import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { Nav, Item } from './elements';

/**
 * A Navigation wraps all the logic between navigation items,
 * usually you should pass link as child but Navigation accept all tag's type.
 *
 * @return {jsx}
 */
const Navigation = ({ children, isFluid, isVertical }) => {
  return (
    <Nav isVertical={isVertical} data-testid="navigation">
      {Children.map(children, ({ props: { isActive, ...props }, type }, index) => (
        <Item
          isFluid={isFluid}
          isVertical={isVertical}
          key={index}
          as={type}
          isActive={isActive}
          {...props}
        >
          {props.children}
        </Item>
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
