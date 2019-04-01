import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { Icon, Theme } from '..';
import { Title, Value, Variation } from './elements';

/**
 * Kpi Block
 *
 * This component is in charge of displaying
 * a Kpi Block
 *
 * @param {string} className // Class needed by styled component.
 * @param {string} title // KpiBlock title.
 * @param {string} value // KpiBlock value.
 * @param {number} variation // KpiBlock variation (negative or positive).
 * @param {boolean} isCompacted // Display or not mobile version of the component
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
  className: string,
  isCompacted: bool,
  title: string.isRequired,
  value: oneOfType([string, node]).isRequired,
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
  align-items: center;
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
      grid-template-rows: max-content max-content max-content;
    `};

  padding: ${({ isCompacted }) => (isCompacted ? '1.2rem' : '1rem')};
  position: relative;
`;
