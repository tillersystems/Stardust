import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, ContainerIcon } from './elements';

/**
 * displayIcon
 *
 * This function is a helper to place
 * the icon correctly inside a button.
 * He return an react element with the
 * good props: left or right.
 *
 * @param {string} side // The side where the icon should be positioned [left or right].
 * @param {jsx} icon // The icon elements.
 *
 * @return {jsx}
 */
const displayIcon = (side, icon) => {
  if (!side || !icon) return null;
  return {
    left: <ContainerIcon left>{icon}</ContainerIcon>,
    right: <ContainerIcon right>{icon}</ContainerIcon>,
  }[side];
};

/**
 * A Button comes in three possible sizes and six visual sizes.
 * An Icon component can be displayed next to the text label of the button, left or right side.
 * For now, instance of the Icon must be passed to the Button so styling is rather free.
 *
 * Button can be a simple standalone button or part of a form.
 *
 * @return {jsx}
 */

const Button = ({
  appearance,
  children,
  className,
  disabled,
  fluid,
  icon,
  iconPosition,
  onClick,
  size,
  type,
  ...rest
}) => {
  return (
    <Container
      appearance={appearance}
      className={className}
      disabled={disabled}
      fluid={fluid}
      icon={icon}
      iconPosition={iconPosition}
      onClick={onClick}
      size={size}
      type={type}
      {...rest}
    >
      {displayIcon(iconPosition, icon)}
      {children}
    </Container>
  );
};

/**
 * PropTypes Validation.
 */
const { bool, func, node, oneOf, string } = PropTypes;
Button.propTypes = {
  /**
   * The base styling to apply to the button
   */
  appearance: oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'google']),

  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * Whether the button is disabled or not
   */
  disabled: bool,

  /**
   * Whether the button is fluid or not
   */
  fluid: bool,

  /**
   * Adds icon next to the text button to illustrate it
   */
  icon: node,

  /**
   * Sets the icon position compared to the text. It will be set to the left side by default
   */
  iconPosition: string,

  /**
   * Handler of click on the button
   */
  onClick: func,

  /**
   * Whether the button size is small, default or large. It will be set to `default` by default
   */
  size: oneOf(['small', 'default', 'large']),

  /**
   * Whether it is a button or a form submission
   */
  type: oneOf(['button', 'submit']),
};

/**
 * Default props.
 */
Button.defaultProps = {
  appearance: 'default',
  children: null,
  className: '',
  disabled: false,
  fluid: false,
  icon: null,
  iconPosition: 'left',
  onClick: () => {},
  size: 'default',
  type: 'button',
};

const styledButton = styled(Button)``;

styledButton.displayName = 'Button';

export default styledButton;
