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
const KpiChartBody = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
KpiChartBody.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
KpiChartBody.defaultProps = {
  children: null,
  className: '',
};

export default styled(KpiChartBody)`
  height: 37.3rem;
`;
