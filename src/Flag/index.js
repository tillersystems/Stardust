import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import flags from './data';

const { bool, string } = PropTypes;

/**
 * A Flag displays a country flag from the list in `data.js`. It is drawed with a svg so added data
 * should be kept as light as possible.
 *
 * @return {jsx}
 */
class Flag extends PureComponent {
  /** Reference to the g element grouping flag svg elements. */
  groupRef = createRef();

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

/**
 * PropTypes Validation.
 */
Flag.propTypes = {
  /**
   * Name of the country flag. Available countries are listed in the data file
   */
  name: string.isRequired,

  /**
   * Size of the flag
   */
  size: string,

  /**
   * Displays the flag with rounded corners or not
   */
  rounded: bool,
};

/**
 * Default props.
 */
Flag.defaultProps = {
  size: '20',
  rounded: false,
};

export default Flag;
