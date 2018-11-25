import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * TabList
 *
 * This component is in charge of displaying
 * a TabList
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // ClassName needed by styled components.
 *
 * @return {jsx}
 */

const TabList = ({ children, className }) => (
  <ul className={className} role="tablist">
    {children}
  </ul>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
TabList.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
TabList.defaultProps = {
  children: null,
  className: '',
};

export default styled(TabList)`
  display: flex;

  height: 5.5rem;

  list-style-type: none;

  background: ${({ theme: { palette } }) => palette.white};
`;
