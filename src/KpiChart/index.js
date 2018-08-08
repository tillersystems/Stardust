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

  /** Internal state. */
  // state = {
  //   settings: false,
  // };

  /**
   * Handles click event on settings.
   */
  // handleClick = () => {
  //   const { settings } = this.state;
  //   this.setState({ ...this.state, settings: !settings });
  // };

  render() {
    const { className, title, label, render } = this.props;
    return (
      <div className={className}>
        <Header>
          <Title>{title}</Title>
          {/* <Button small ghost onClick={() => this.handleClick}>
            <Icon name="cog" color={Theme.palette.anthracite} width="1.6rem" height="1.6rem" />
          </Button> */}
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

  border: 1px solid ${({ theme: { palette } }) => palette.gray};

  background: ${({ theme: { palette } }) => palette.white};

  font-size: 1.2rem;
`;
