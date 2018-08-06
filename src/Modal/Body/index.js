import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalBody = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
ModalBody.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
ModalBody.defaultProps = {
  children: null,
  className: '',
};

export default styled(ModalBody)`
  width: 100%;
  height: auto;
  flex: 1;
  margin: ${({ center }) => (center ? 'auto' : 'initial')};
`;
