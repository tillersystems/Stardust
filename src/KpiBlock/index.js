import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Title, Value, Variation } from './elements';

/**
 * A Kpi Block provides useful data pieces of information that should help users identity
 * the most important things about their data.
 *
 * @return {jsx}
 */

const KpiBlock = ({ className, title, value, variation, isCompacted }) => (
  <div className={className}>
    {variation !== false && variation < 0 && (
      <Variation negative isCompacted={isCompacted}>
        {variation.toFixed(2)} % <Icon name="caret-down" color={Theme.palette.failure.default} />
      </Variation>
    )}
    {variation !== false && variation >= 0 && (
      <Variation positive isCompacted={isCompacted}>
        +{variation.toFixed(2)} % <Icon name="caret-up" color={Theme.palette.success.default} />
      </Variation>
    )}
    {typeof value === 'string' && <Value isCompacted={isCompacted}>{value}</Value>}
    {React.isValidElement(value) && value}
    <Title isCompacted={isCompacted}>{title}</Title>
  </div>
);

/**
 * PropTypes Validation
 */
const { bool, number, node, oneOfType, string } = PropTypes;
KpiBlock.propTypes = {
  /**
   * Class needed by styled component
   */
  className: string,

  /**
   * If compacted, the block will have a smaller height and title, value and variation will stack in this order
   */
  isCompacted: bool,

  /**
   * Title displayed below the value
   */
  title: string.isRequired,

  /**
   * Value displayed at the center of the block
   */
  value: oneOfType([string, node]).isRequired,

  /**
   * Variation, positive or negative, displayed at the top right corner of the block
   */
  variation: oneOfType([bool, number]),
};

/**
 * Default props
 */
KpiBlock.defaultProps = {
  className: '',
  isCompacted: false,
  variation: false,
};

export default styled(KpiBlock)`
  text-align: center;
  background: ${({ theme: { palette } }) => palette.white};
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
  box-sizing: content-box;
  display: grid;
  grid-template-areas: ${({ isCompacted }) =>
    isCompacted ? "'title' 'value' 'variation'" : "'variation' 'value' 'title'"};

  height: ${({ isCompacted }) => (isCompacted ? '7.8rem' : '10rem')};

  ${({ isCompacted }) =>
    !isCompacted &&
    css`
      grid-template-rows: ${({ variation }) =>
        variation ? 'max-content max-content max-content' : 'auto max-content'};
    `};

  padding: ${({ isCompacted }) => (isCompacted ? '1.2rem' : '1rem')};
  position: relative;
`;
