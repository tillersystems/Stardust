import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cuid from 'cuid';

import Theme from '../Theme';
import { Data } from './data';

const { palette } = Theme;

/**
 * Predefined sizes
 */
const SIZE = {
  small: 10,
  medium: 20,
  large: 30,
};

/**
 * Icon comnponent
 *
 * See README, run storybook or see propTypes below for documentation
 *
 * @return {jsx}
 */
const Icon = ({ className, color, name, size, title, ...restProps }) => {
  const generatedId = useMemo(() => cuid(), [title]);
  const titleElementId = `icon-title-${generatedId}`;

  /**
   * Get icon size
   *
   * @return {string}
   */
  const getIconSize = useMemo(() => {
    if (SIZE.hasOwnProperty(size)) return SIZE[size];
    return size;
  }, [size]);

  /**
   * Get color
   *
   * @return {string}
   */
  const getColor = useMemo(() => {
    if (palette.hasOwnProperty(color)) return palette[color];
    return color;
  }, [color]);

  /**
   * Get icon path
   *
   * @return {string}
   */
  const getIconPath = Data[name];

  /**
   * Icon element
   */
  const IconElement = typeof getIconPath === 'function' && getIconPath;

  const rootProps = {
    'aria-hidden': title ? undefined : true,
    'aria-labelledby': title && titleElementId,
    focusable: 'false',
    height: getIconSize,
    role: 'img',
    viewBox: '0 0 512 512',
    width: getIconSize,
    ...restProps,
  };

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" {...rootProps}>
      {title && <title id={titleElementId}>{title}</title>}
      <g>
        {!IconElement ? (
          <path data-testid="icon-svg-path" fill={getColor} fillRule="evenodd" d={getIconPath} />
        ) : (
          <IconElement fill={getColor} />
        )}
      </g>
    </svg>
  );
};

/**
 * PropTypes Validation
 */
const { number, oneOfType, string } = PropTypes;

Icon.propTypes = {
  /**
   * className needed by styled component
   */
  className: string,

  /**
   * Fill color
   */
  color: string,

  /**
   * Icon name
   */
  name: string.isRequired,

  /**
   * Available sizes, including custom - e.g. '20px'
   */
  size: oneOfType([number, string]),

  /**
   * Alternative text
   */
  title: string,
};

/**
 * Default props.
 */
Icon.defaultProps = {
  className: undefined,
  color: 'white',
  size: SIZE.medium,
  title: null,
};

/**
 * Display name
 */
Icon.displayName = 'Icon';

export default styled(Icon)`
  display: inline-block;
`;
