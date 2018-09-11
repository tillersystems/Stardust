import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container } from './elements';

const ButtonRefactor = ({ children, ...rest }) => <Container {...rest}>{children}</Container>;
// TODO: Question pourquoi ...rest et non ...props ?

const { node, func, string, bool } = PropTypes;
ButtonRefactor.propTypes = {
  children: node,
  type: string,
  onClick: func,
  primary: bool,
  light: bool,
  success: bool,
  failure: bool,
  fluid: bool,
  big: bool,
  small: bool,
  disabled: bool,
  isGoogle: bool,
  // secondary: bool,
  // inverted: bool,
  // tiny: bool,
  // rounded: bool,
};

ButtonRefactor.defaultProps = {
  children: null,
  type: 'button',
  onClick: () => {},
  primary: false,
  light: false,
  success: false,
  failure: false,
  fluid: false,
  big: false,
  small: false,
  disabled: false,
  isGoogle: false,
};

const StyledButtonRefactor = styled(ButtonRefactor)``;

StyledButtonRefactor.displayName = 'ButtonRefactor';

export default StyledButtonRefactor;
