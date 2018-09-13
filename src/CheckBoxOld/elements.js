import styled, { css } from 'styled-components';

/**
 * Wrapper for the actual check box and its label.
 *
 * @return {jsx}
 */
export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

/**
 * Container of the actual check box.
 *
 * @return {jsx}
 */
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.4rem;
  height: 1.4rem;

  border: 1px solid ${({ theme: { palette } }) => palette.blue};
  border-radius: ${({ theme: { dimensions } }) => `${dimensions.radiusInt - 0.2}rem`};

  background: ${({ theme: { palette } }) => palette.white};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `};
`;

/**
 * Label of the check box.
 *
 * @return {jsx}
 */
export const Label = styled.label`
  display: block;

  margin-left: ${({ theme: { dimensions } }) => dimensions.small};
  color: ${({ theme: { palette } }) => palette.anthracite};

  ${({ disabled, hasFocus }) =>
    !disabled &&
    hasFocus &&
    css`
      color: ${({ theme: { palette } }) => palette.blue};
      font-weight: ${({
        theme: {
          fonts: { weight },
        },
      }) => weight.thick};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `};
`;
