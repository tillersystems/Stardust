import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const KpiChartHeader = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
KpiChartHeader.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
KpiChartHeader.defaultProps = {
  children: null,
  className: '',
};

export default styled(KpiChartHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
