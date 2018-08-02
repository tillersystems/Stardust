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
    {variation < 0 && (
      <Variation negative>
        {variation} % <Icon name="caret-down" color={Theme.palette.red} />
      </Variation>
    )}
    {variation >= 0 && (
      <Variation positive>
        +{variation} % <Icon name="caret-up" color={Theme.palette.green} />
      </Variation>
    )}
    <Value>{value}</Value>
    <Title>{title}</Title>
  </div>
);

/**
 * PropTypes Validation
 */
const { number, string } = PropTypes;
KpiBlock.propTypes = {
  className: string,
  title: string.isRequired,
  value: string.isRequired,
  variation: number.isRequired,
};

/**
 * Default props
 */
KpiBlock.defaultProps = {
  className: '',
};

export default styled(KpiBlock)`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3rem 1rem;

  height: 100%;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  border: 1px solid ${({ theme: { palette } }) => palette.gray};

  background: ${({ theme: { palette } }) => palette.white};
`;
