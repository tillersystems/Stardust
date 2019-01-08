import styled, { css } from 'styled-components';

import { getAppearance, getSize } from './helpers';

/* Button Container */
export const Container = styled.button`
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  max-width: 100%;
  width: ${({ fluid }) => (fluid ? '100%' : 'auto')};

  padding: 0.8rem 1.6rem;

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  line-height: 1.57;

  color: ${({ theme: { palette } }) => palette.white};

  cursor: pointer;
  outline: none;

  transition: background 200ms ease, box-shadow 200ms ease;

  svg > path {
    fill: ${({ theme: { palette } }) => palette.white};
  }

  /* Button Appearance: [default, primary, secondary...] */
  ${({ theme, appearance }) => getAppearance(theme, appearance)};

  /* Button Size: [small, default, large] */
  ${({ theme, size }) => getSize(theme, size)};

  /* Button Disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.4;
    `}
`;

/* Icon Container
 * An icon can be set to the left or to the right.
 * We change the flex order position and add a margin
 * according to the given props [left or right].
 */
export const ContainerIcon = styled.span`
  display: flex;
  order: ${({ right }) => (right ? 1 : 0)};

  margin-right: ${({ left }) => (left ? '1rem' : 0)};
  margin-left: ${({ right }) => (right ? '1rem' : 0)};
`;
