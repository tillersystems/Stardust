import React from 'react';
import PropTypes from 'prop-types';

import { TabPanelsContainer } from './elements';

/**
 * TabPanels
 *
 * This component is in charge of displaying
 * a Tab Panels
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // ClassName needed by styled components.
 * @param {boolean} noBackground // Remove background from TabPanels.
 * @param {boolean} noBorder // Remove border from TabPanels.
 *
 * @return {jsx}
 */

const TabPanels = ({ children, className, noBackground, noBorder }) => (
  <TabPanelsContainer noBorder={noBorder} noBackground={noBackground} className={className}>
    {children}
  </TabPanelsContainer>
);

/**
 * PropTypes Validation
 */
const { bool, node, string } = PropTypes;
TabPanels.propTypes = {
  children: node,
  className: string,
  noBackground: bool,
  noBorder: bool,
};

/**
 * Default props
 */
TabPanels.defaultProps = {
  children: null,
  className: '',
  noBackground: false,
  noBorder: false,
};

export default TabPanels;
