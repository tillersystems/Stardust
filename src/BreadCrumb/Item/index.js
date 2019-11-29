import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Theme from '../../Theme';
import { Icon } from '../..';

const Item = ({ children, className }) => (
  <li className={className}>
    <Icon name="chevron-right" color={Theme.palette.darkBlue} size="medium" title="icon title" />
    <span>{children}</span>
  </li>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
Item.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node,
  /**
   * ClassName needed by styled components
   */
  className: string,
};

/**
 * Default props
 */
Item.defaultProps = {
  children: null,
  className: '',
};

const StyledItem = styled(Item)`
  cursor: default;
  list-style: none;

  display: inline-flex;
  align-items: center;

  font-size: ${Theme.fonts.size.big};
  font-weight: ${Theme.fonts.weight.thick};
  color: ${Theme.palette.primary.default};

  > span {
    padding: 0 0.8rem;
  }

  &:first-of-type {
    > span {
      padding: 0 0.8rem 0 0;
    }
    > svg {
      display: none;
    }
  }

  &:last-of-type {
    > span {
      padding: 0 0 0 0.8rem;
    }
    color: ${Theme.palette.darkBlue};
  }
`;

export default StyledItem;
