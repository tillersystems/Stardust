import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Wrapper } from './elements';

const ModalFooter = ({ children, className, alignment }) => (
  <div className={className} alignment={alignment}>
    {Children.map(children, (child, index) => (
      <Wrapper key={index}>{child}</Wrapper>
    ))}
  </div>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
ModalFooter.propTypes = {
  children: node,
  className: string,
  alignment: string,
};

/**
 * Default props
 */
ModalFooter.defaultProps = {
  children: null,
  className: '',
  alignment: 'left',
};

export default styled(ModalFooter)`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;

  ${({ alignment }) =>
    alignment === 'left' &&
    css`
      justify-content: flex-start;
    `};

  ${({ alignment }) =>
    alignment === 'right' &&
    css`
      justify-content: flex-end;
    `};

  ${({ alignment }) =>
    alignment === 'center' &&
    css`
      justify-content: center;
    `};

  ${({ alignment }) =>
    alignment === 'spaced' &&
    css`
      justify-content: space-between;
    `};
`;
