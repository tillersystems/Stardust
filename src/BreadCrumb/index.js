import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Item from './Item';

/**
 *A BreadCrumb helps users keep track of their position on the app.
 * Each child is separated by _"greater than"_ (or left angle bracket) symbol.
 * The main use of that component is to display the client's history path.
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
