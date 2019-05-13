import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from './elements';
import { context } from '..';

/**
 * Tab are a link displaying the content of a pane
 *
 * @param {node} children - Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className - className needed by styled components.
 * @param {string} id - Id of the tab.
 * @param {boolean} isDisabled - if this tab should be interactive or not.
 *
 * @return {jsx}
 */
const Tab = ({ children, className, id, isDisabled }) => {
  const { activeTabId, onTabChange } = useContext(context);

  const isActive = activeTabId === id;
  const onClick = isDisabled ? null : () => onTabChange(id);
  const tabIndex = isActive ? 0 : -1;

  return (
    <Container
      className={className}
      onClick={onClick}
      isActive={isActive}
      isDisabled={isDisabled}
      data-isactive={isActive}
      data-isdisabled={isDisabled}
      aria-selected={isActive}
      aria-controls={`panel:${id}`}
      tabIndex={tabIndex}
      role="tab"
    >
      {children}
    </Container>
  );
};

/**
 * PropTypes Validation
 */

const { bool, node, string } = PropTypes;

Tab.propTypes = {
  children: node.isRequired,
  id: string,
  isDisabled: bool,
  className: string,
};

/**
 * Default props.
 */
Tab.defaultProps = {
  id: undefined,
  isDisabled: false,
  className: undefined,
};

export default memo(Tab);
