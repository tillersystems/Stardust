import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
 *
 * @return {jsx}
 */

const KpiBlock = ({ className, title, value, variation }) => (
  <div className={className}>
    {variation !== false && variation < 0 && (
      <Variation negative>
        {variation.toFixed(2)} % <Icon name="caret-down" color={Theme.palette.failure.default} />
      </Variation>
    )}
    {variation !== false && variation >= 0 && (
      <Variation positive>
        +{variation.toFixed(2)} % <Icon name="caret-up" color={Theme.palette.success.default} />
      </Variation>
    )}
    {typeof value === 'string' && <Value>{value}</Value>}
    {React.isValidElement(value) && value}
    <Title>{title}</Title>
  </div>
);

/**
 * PropTypes Validation
 */
const { bool, number, node, oneOfType, string } = PropTypes;
KpiBlock.propTypes = {
  className: string,
  title: string.isRequired,
  value: oneOfType([string, node]).isRequired,
  variation: oneOfType([bool, number]),
};

/**
 * Default props
 */
KpiBlock.defaultProps = {
  className: '',
  variation: false,
};

export default styled(KpiBlock)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3rem 1rem;

  height: 100%;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};

  background: ${({ theme: { palette } }) => palette.white};
`;
