import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * KpiChart Body
 *
 * This component is in charge of displaying
 * the body of a kpi chart
 *
 * @param {string} children // children.
 * @param {string} className // className.
 *
 * @return {jsx}
 */
const KpiChartBody = ({ children, className }) => (
  <div className={className} data-testid="kpichart-body">
    {children}
  </div>
);

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
KpiChartBody.propTypes = {
  children: node,
  className: string,
  // eslint-disable-next-line react/no-unused-prop-types
  height: string,
};

/**
 * Default props
 */
KpiChartBody.defaultProps = {
  children: null,
  className: '',
  height: '37.3rem',
};

export default styled(KpiChartBody)`
  height: ${({ height }) => (/^\d+(rem|px)$/.test(height) ? height : '37.3rem')};
`;
