import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { Title } from './elements';

/**
 * A Kpi Chart is a bar chart with a title
 *
 * @param {node} children
 * @param {string} className // Class needed by styled component.
 *
 * @return {jsx}
 */

class KpiChart extends PureComponent {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;
  static Title = Title;

  render() {
    const { children, className } = this.props;
    return <div className={className}>{children}</div>;
  }
}

/** Prop types. */
KpiChart.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment).
   */
  children: PropTypes.node,

  /**
   * ClassName needed by styled components
   */
  className: PropTypes.string,

  /**
   * If true, narrows the padding of the component and the font-size of the title
   */
  // eslint-disable-next-line react/no-unused-prop-types
  isCompacted: PropTypes.bool,
};

/** Default props. */
KpiChart.defaultProps = {
  children: null,
  className: '',
  isCompacted: false,
};

export default styled(KpiChart)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ isCompacted }) => (isCompacted ? '1.2rem 1.6rem' : '2.4rem 3rem')};
  height: 100%;
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  background: ${({ theme: { palette } }) => palette.white};
  font-size: 1.2rem;
`;
