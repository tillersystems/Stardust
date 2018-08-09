import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalHeader = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
ModalHeader.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
ModalHeader.defaultProps = {
  children: null,
  className: '',
};

export default styled(ModalHeader)`
  height: 6rem;
  border-bottom: 0.1rem solid ${({ theme: { palette } }) => palette.gray};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
