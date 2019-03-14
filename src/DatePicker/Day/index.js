import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './elements';

/**
 * A single Day component.
 *
 * @param {node} children -
 * @param {node} disabled -
 * @param {boolean} isSelected - Whether the day is selected or not.
 * @param {boolean} isStartEdge -
 * @param {boolean} isEndEdge -
 * @param {boolean} isInPath -
 * @param {boolean} shadowed - Whether the day is shadowed or not.
 * @param {function} onClick - Handler called when the day is clicked.
 *
 * @return {jsx}
 */
const Day = ({
  disabled,
  isSelected,
  shadowed,
  onClick,
  children,
  isInPath,
  isStartEdge,
  isEndEdge,
}) => (
  <Container onClick={onClick} isInPath={isInPath} isStartEdge={isStartEdge} isEndEdge={isEndEdge}>
    <Content
      disabled={disabled}
      isSelected={isSelected}
      isStartEdge={isStartEdge}
      isEndEdge={isEndEdge}
      shadowed={shadowed}
    >
      {children}
    </Content>
  </Container>
);

/**
 * PropTypes Validation.
 */
Day.displayName = 'Day';

/**
 * Default props.
 */
const { bool, func, node } = PropTypes;
Day.propTypes = {
  disabled: bool,
  isSelected: bool,
  isStartEdge: bool,
  isEndEdge: bool,
  isInPath: bool,
  shadowed: bool,
  onClick: func,
  children: node.isRequired,
};

/**
 * Default props.
 */
Day.defaultProps = {
  disabled: false,
  isSelected: false,
  isStartEdge: false,
  isEndEdge: false,
  isInPath: false,
  shadowed: false,
  onClick: () => {},
};

export default Day;
