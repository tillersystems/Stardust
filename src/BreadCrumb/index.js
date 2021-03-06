import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Item from './Item';

/**
 * A BreadCrumb is a component which organise its childrens in row.
 * Each children is separated with _greater than_ symbol.
 * The main use of that component will be to display the client's history path.
 *
 * @return {jsx}
 */

const BreadCrumb = ({ children, className }) => <ul className={className}>{children}</ul>;

BreadCrumb.Item = Item;

const { node, string } = PropTypes;

/**
 * PropTypes Validation.
 */
BreadCrumb.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node.isRequired,
  /**
   * ClassName needed by styled components
   */
  className: string,
};

/**
 * Default props
 */
BreadCrumb.defaultProps = {
  className: '',
};

const StyledBreadCrumb = styled(BreadCrumb)`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
`;

export default StyledBreadCrumb;
