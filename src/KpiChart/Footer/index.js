import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const KpiChartFooter = ({ children, className }) => <div className={className}>{children}</div>;

/**
 * PropTypes Validation
 */
const { node, string } = PropTypes;
KpiChartFooter.propTypes = {
  children: node,
  className: string,
};

/**
 * Default props
 */
KpiChartFooter.defaultProps = {
  children: null,
  className: '',
};

export default styled(KpiChartFooter)`
  position: absolute;
  bottom: 1.5rem;
  left: 1rem;

  button {
    color: ${({ theme: { palette } }) => palette.primary.default};
  }
`;
