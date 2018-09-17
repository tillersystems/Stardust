import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container, ContainerIconLeft, ContainerIconRight } from './elements';

const displayIconLeft = (side, icon) => {
  return side === 'right' || icon === null ? null : <ContainerIconLeft>{icon}</ContainerIconLeft>;
};
const displayIconRight = (side, icon) => {
  return side === 'left' || icon === null ? null : <ContainerIconRight>{icon}</ContainerIconRight>;
};

const Button = ({ children, icon, iconPosition, ...rest }) => {
  return (
    <Container {...rest}>
      {displayIconLeft(iconPosition, icon)} {children} {displayIconRight(iconPosition, icon)}
    </Container>
  );
};

const { node, func, string, bool } = PropTypes;
Button.propTypes = {
  children: node,
  type: string,
  onClick: func,
  primary: bool,
  secondary: bool,
  success: bool,
  failure: bool,
  fluid: bool,
  big: bool,
  small: bool,
  disabled: bool,
  isGoogle: bool,
  icon: node,
  iconPosition: string,
};

Button.defaultProps = {
  children: null,
  type: 'button',
  onClick: () => {},
  primary: false,
  secondary: false,
  success: false,
  failure: false,
  fluid: false,
  big: false,
  small: false,
  disabled: false,
  isGoogle: false,
  icon: null,
  iconPosition: 'left',
};

const StyledButtonRefactor = styled(Button)``;

StyledButtonRefactor.displayName = 'Button';

export default StyledButtonRefactor;
