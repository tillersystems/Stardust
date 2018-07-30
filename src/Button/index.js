import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container } from './elements';

const Button = ({ children, ...rest }) => <Container {...rest}>{children}</Container>;

const { node, func, string, bool } = PropTypes;
Button.propTypes = {
  children: node,
  type: string,
  onClick: func,
  primary: bool,
  secondary: bool,
  light: bool,
  success: bool,
  failure: bool,
  inverted: bool,
  fluid: bool,
  big: bool,
  tiny: bool,
  small: bool,
  rounded: bool,
  disabled: bool,
  isGoogle: bool,
};

Button.defaultProps = {
  children: null,
  type: 'button',
  onClick: () => {},
  primary: false,
  secondary: false,
  light: false,
  success: false,
  failure: false,
  inverted: false,
  fluid: false,
  big: false,
  tiny: false,
  small: false,
  rounded: false,
  disabled: false,
  isGoogle: false,
};

const StyledButton = styled(Button)``;

StyledButton.displayName = 'Button';

export default StyledButton;
