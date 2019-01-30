import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import flags from './data';

const { bool, string } = PropTypes;

/**
 * Flag
 *
 * This component is in charge of displaying
 * a flag with svg data
 *
 * @param {string} name // Name of the country flag. Available countries are displayed in the data file
 * @param {string} size // Size of the flag
 * @param {bool} rounded // Display the flag with rounded corners or not
 *
 * @return {jsx}
 */
class Flag extends PureComponent {
  /** Reference to the g element grouping flag svg elements. */
  groupRef = createRef();

  /**
   * PropTypes Validation.
   */
  static propTypes = {
    name: string.isRequired,
    size: string,
    rounded: bool,
  };

  /**
   * Default props.
   */
  static defaultProps = {
    size: '20',
    rounded: false,
  };

  /** Internal state. */
  state = {
    groupWidth: null,
    groupHeight: null,
    groupX: null,
    groupY: null,
  };

  /**
   * Updates the size of the rectangle that hides flag corners when rounded option is enabled
   *
   */
  componentDidMount() {
    const { rounded } = this.props;

    if (rounded) {
      const { x, y, height, width } = this.groupRef.current.getBBox();
      this.setState({ groupX: x, groupY: y, groupHeight: height, groupWidth: width });
    }
  }

  render() {
    const { name, rounded, size, ...rest } = this.props;
    const { groupX, groupY, groupHeight, groupWidth } = this.state;

    return (
      <Container {...rest}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
          width={size}
          height={size}
          viewBox="0 0 512 512"
          data-testid="flagSvg"
        >
          <clipPath id="rounded-corners">
            <rect rx="90" ry="90" x={groupX} y={groupY} width={groupWidth} height={groupHeight} />
          </clipPath>
          <g
            ref={this.groupRef}
            fill="none"
            fillRule="evenodd"
            clipPath={rounded ? 'url(#rounded-corners)' : undefined}
          >
            {flags[name]()}
          </g>
        </svg>
      </Container>
    );
  }
}

export default Flag;
