import styled, { css } from 'styled-components';
import { hideVisually, transparentize } from 'polished';
import Icon from '../Icon';

// Hide checkbox visually but remain accessible to screen readers.
// See: https://polished.js.org/docs/#hidevisually
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  ${hideVisually()}
`;

export const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;

  margin-right: 0.7rem;

  background: ${({ theme: { palette }, checked }) =>
    checked
      ? `${palette.primary.default}
        linear-gradient(
          0deg,
          ${palette.whiteOpacity(0)} 0%,
          ${palette.whiteOpacity(0.1)} 100%
        )`
      : palette.white};
  border: 1px solid
    ${({ theme: { palette }, checked }) => (checked ? palette.primary.dark : palette.lightGrey)};
  border-radius: ${({ theme: { dimensions } }) => `${dimensions.radiusInt}rem`};

  box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};

  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px
      ${({ theme: { palette } }) => transparentize(0.6, palette.primary.default)};
  }

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;

  cursor: pointer;

  position: relative;

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};

  ${({ checked }) =>
    checked &&
    css`
      color: ${({ theme: { palette } }) => palette.primary.default};
      font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
    `};
`;
