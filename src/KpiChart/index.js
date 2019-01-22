import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { Title } from './elements';

/**
 * Kpi Chart
 *
 * This component is in charge of displaying
 * a Kpi Chart
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment).
 * @param {string} className // Class needed by styled component.
 *
 * @return {jsx}
 */

class KpiChart extends PureComponent {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;
  static Title = Title;

  /** Prop types. */
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  /** Default props. */
  static defaultProps = {
    children: null,
    className: '',
  };

  render() {
    const { children, className } = this.props;
    return <div className={className}>{children}</div>;
  }
}

export default styled(KpiChart)`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 2rem;
  height: 100%;
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  background: ${({ theme: { palette } }) => palette.white};
  font-size: 1.2rem;
`;
