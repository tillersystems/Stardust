import styled, { css } from 'styled-components';
import { hideVisually, transparentize } from 'polished';
import Icon from '../Icon';

export const Wrapper = styled.div`
  width: 100%;

  input {
    ${hideVisually()}
  }
`;

export const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 1.6rem;
  height: 1.6rem;

  margin-right: 1.2rem;

  color: ${({ theme: { palette } }) => palette.white};
  background: ${({ theme: { palette } }) => palette.white};
  border: 1px solid
    ${({ theme: { palette }, isChecked }) => (isChecked ? palette.primary.dark : palette.lightGrey)};
  border-radius: ${({ theme: { dimensions } }) => `${dimensions.radiusInt}rem`};

  box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};

  transition: all 150ms;

  &.checked {
    background: ${({ theme: { palette } }) =>
      `${palette.primary.default} linear-gradient(0deg, ${palette.whiteOpacity(
        0,
      )} 0%, ${palette.whiteOpacity(0.1)} 100%)`};

    ${Icon} {
      visibility: visible;
    }
  }

  input:focus + & {
    box-shadow: 0 0 0 2px
      ${({ theme: { palette } }) => transparentize(0.6, palette.primary.default)};
  }

  ${Icon} {
    visibility: hidden;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;

  cursor: pointer;

  position: relative;

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};

  ${({ isChecked }) =>
    isChecked &&
    css`
      color: ${({ theme: { palette } }) => palette.primary.default};
      font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
    `};
`;
