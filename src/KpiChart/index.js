import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '..';
import { Body, Header, Footer, Title } from './elements';

/**
 * Kpi Chart
 *
 * This component is in charge of displaying
 * a Kpi Chart
 *
 * @param {string} className // Class needed by styled component.
 *
 * @return {jsx}
 */

class KpiChart extends PureComponent {
  /** Prop types. */
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    render: PropTypes.func,
  };

  /** Default props. */
  static defaultProps = {
    className: '',
    render: () => {},
  };

  render() {
    const { className, title, label, render } = this.props;
    return (
      <div className={className}>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Body>{render()}</Body>
        <Footer>
          <Button ghost>{label}</Button>
        </Footer>
      </div>
    );
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
