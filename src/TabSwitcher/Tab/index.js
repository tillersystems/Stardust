import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from './elements';
import { context } from '..';

/**
 * Tab is a link displaying the content of a pane
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
  /** className needed by styled components */
  className: string,

  /** Anything that can be rendered: numbers, strings, elements or an array (or fragment) */
  children: node.isRequired,

  /** Id of the tab */
  id: string,

  /** If this tab should be interactive or not */
  isDisabled: bool,
};

/**
 * Default props.
 */
Tab.defaultProps = {
  className: undefined,
  id: undefined,
  isDisabled: false,
};

export default memo(Tab);
