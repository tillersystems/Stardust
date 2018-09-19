import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import initials from 'initials';

import Theme from '../Theme';
import { Image } from './elements';

// Define some colors
const defaultColors = [
  Theme.palette.avatar.emerald,
  Theme.palette.avatar.river,
  Theme.palette.avatar.wisteria,
  Theme.palette.avatar.carrot,
  Theme.palette.avatar.alizarin,
  Theme.palette.avatar.turquoise,
];

/**
 * Sum Chars
 *
 * Do the sums of the carcatere of a string
 *
 * @return {jsx}
 */
function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

/**
 * Avatar
 *
 * This component is in charge of displaying
 * an avatar of a user
 *
 * @return {jsx}
 */

class Avatar extends PureComponent {
  /**
   * PropTypes validation
   */
  static propTypes = {
    className: PropTypes.string, // className needed by styled component.
    name: PropTypes.string.isRequired, // user name.
    size: PropTypes.number, // size of the avatar.
    src: PropTypes.string, // source image of a user.
  };

  /**
   * Default propTypes
   */
  static defaultProps = {
    className: '',
    size: Theme.dimensions.bigInt,
    src: null,
  };

  /**
   * Render function
   */
  render() {
    const { className, name, size, src } = this.props;
    const abbr = initials(name);
    const normalizeSize = size * 10;

    return (
      <div aria-label={name} className={className}>
        {src && <Image src={src} width={normalizeSize} height={normalizeSize} alt={name} />}
        {!src && <span>{abbr}</span>}
      </div>
    );
  }
}

export default styled(Avatar).attrs({
  colors: ({ name }) => defaultColors[sumChars(name) % defaultColors.length],
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size || Theme.dimensions.bigInt}rem;
  height: ${({ size }) => size || Theme.dimensions.bigInt}rem;
  border-radius: 50%;
  background: ${({ colors }) => colors};
  color: white;
`;
