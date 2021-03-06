import styled, { css } from 'styled-components';
import { hideVisually } from 'polished';

/**
 * Wrapper for the actual check box and its label.
 *
 * @return {jsx}
 */
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.6rem;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};

  > input {
    ${hideVisually()}
  }
`;

/**
 * StyledRadio of the actual check box.
 *
 * @return {jsx}
 */
export const StyledRadio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;
  margin-right: 1.2rem;

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 50%;

  background: linear-gradient(
    0deg,
    ${({ theme: { palette } }) => palette.paleGrey} 0%,
    ${({ theme: { palette } }) => palette.white} 100%
  );
  box-shadow: inset 0 2px 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.05)},
    0 1px 1px 0 ${({ theme: { palette } }) => palette.paleGrey};

  transition: background-color ease 0.25s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `};

  &.checked {
    border: 1px solid ${({ theme: { palette } }) => palette.primary.dark};
    background: ${({ theme: { palette } }) => palette.primary.default}
      linear-gradient(
        0deg,
        ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
        ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
      );
    box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
    transition: border ease 0.25s;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 0.6rem;
      height: 0.6rem;
      transform: translate3d(-50%, -50%, 0);
      background-color: ${({ theme: { palette } }) => palette.white};
      border-radius: 50%;
    }
  }
`;

/**
 * Label of the check box.
 *
 * @return {jsx}
 */
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
