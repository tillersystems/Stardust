import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonGroup = ({ children, className }) => <div className={className}>{children}</div>;

const { node, string } = PropTypes;
ButtonGroup.propTypes = {
  children: node,
  className: string,
};

ButtonGroup.defaultProps = {
  children: null,
  className: '',
};

export default styled(ButtonGroup)`
  display: flex;

  button {
    border-radius: 0;

    &:first-of-type {
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-right: 1px solid #e1e7ec;

      &:hover {
        border-right: 1px solid #e1e7ec;
      }
    }

    &:nth-child(n) {
      border-right: 1px solid #e1e7ec;
      border-left: 0;

      &:hover {
        border-right: 1px solid #e1e7ec;
        border-left: 0;
      }
    }

    &:last-of-type {
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-left: 0;

      &:hover {
        border-left: 0;
      }
    }
  }
`;
