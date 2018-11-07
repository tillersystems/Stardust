import styled, { css } from 'styled-components';

/**
 * Container of the actual check box.
 *
 * @return {jsx}
 */
export const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;

  margin-right: ${({ theme: { dimensions } }) => dimensions.small};

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: ${({ theme: { dimensions } }) => `${dimensions.radiusInt}rem`};

  background: ${({ theme: { palette } }) => palette.white};

  transition: background-color ease 0.25s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};

  ${({ checked }) =>
    checked &&
    css`
      border: 1px solid ${({ theme: { palette } }) => palette.primary.dark};
      background: ${({ theme: { palette } }) => palette.primary.default}
        linear-gradient(
          0deg,
          ${({ theme: { palette } }) => palette.whiteOpacity(0)} 0%,
          ${({ theme: { palette } }) => palette.whiteOpacity(0.1)} 100%
        );
      box-shadow: inset 0 0.2rem 0 0 ${({ theme: { palette } }) => palette.whiteOpacity(0.1)};
      transition: border ease 0.25s;
    `};
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

  &:focus-within {
    color: ${({ theme: { palette } }) => palette.darkBlue};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};

  ${({ checked }) =>
    checked &&
    css`
      color: ${({ theme: { palette } }) => palette.darkBlue};
    `};
`;
