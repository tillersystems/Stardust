import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, ContainerIcon } from './elements';

/**
 * Button
 *
 * This component is in charge of displaying
 * a button
 *
 * @param {string} appearance // The base styling to apply to the button.
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // ClassName needed by styled components.
 * @param {bool} fluid // Whether the button is fluid or not.
 * @param {bool} disabled // Whether the button is disabled or not.
 * @param {node} icon // Add icon node here to illustrate the text aside.
 * @param {enum} iconPosition // Set the icon position compared to the text. It will be set to the left side by default.
 * @param {function} onClick // Handler of click on the button.
 * @param {enum} size // Whether the button size is small, default or large. It will be set to default by default.
 * @param {enum} type // Whether it is a button or a form submission.
 *
 * @return {jsx}
 */

const Button = forwardRef(
  (
    {
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
    },
    ref,
  ) => {
    return (
      <Container
        innerRef={ref}
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
  },
);

Button.displayName = 'Button';

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
 * PropTypes Validation.
 */
const { bool, func, node, oneOf, string } = PropTypes;
Button.propTypes = {
  appearance: oneOf(['default', 'primary', 'secondary', 'success', 'danger', 'google']),
  children: node,
  className: string,
  disabled: bool,
  fluid: bool,
  icon: node,
  iconPosition: string,
  onClick: func,
  size: oneOf(['small', 'default', 'large']),
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
