import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import initials from 'initials';

import Theme from '../Theme/index.ts';
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
 * Do the sums of the caracteres of a string
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
 * An Avatar depicts an user with an image if its path is provided.
 * It fallbacks to the initials of the person.
 *
 * @return {jsx}
 */

const Avatar = ({ className, name, size, src }) => {
  const abbr = initials(name);
  const normalizeSize = size * 10;

  return (
    <div aria-label={name} className={className}>
      {src && <Image src={src} width={normalizeSize} height={normalizeSize} alt={name} />}
      {!src && <span>{abbr}</span>}
    </div>
  );
};

/**
 * PropTypes validation
 */
Avatar.propTypes = {
  /**
   * className needed by styled component
   */
  className: PropTypes.string,

  /**
   * name that will form the displayed initials
   */
  name: PropTypes.string.isRequired,

  /**
   * size of the avatar
   */
  size: PropTypes.number,

  /**
   * source image of a user
   */
  src: PropTypes.string,
};

/**
 * Default propTypes
 */
Avatar.defaultProps = {
  className: '',
  size: Theme.dimensions.bigInt,
  src: null,
};

export default styled(Avatar)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size || Theme.dimensions.bigInt}rem;
  height: ${({ size }) => size || Theme.dimensions.bigInt}rem;
  border-radius: 50%;
  background: ${({ name }) => defaultColors[sumChars(name) % defaultColors.length]};
  color: white;
`;
