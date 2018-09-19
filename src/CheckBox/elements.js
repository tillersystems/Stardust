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

  padding: 0.6rem 0;

  ${({ textAnnexe }) =>
    textAnnexe &&
    css`
      margin-bottom: 1.9rem;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};
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

  width: 1.6rem;
  height: 1.6rem;

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: ${({ theme: { dimensions } }) => `${dimensions.radiusInt}rem`};

  background: ${({ theme: { palette } }) => palette.white};

  transition: background-color ease 0.25s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
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
  display: block;

  cursor: pointer;

  position: relative;

  margin-left: ${({ theme: { dimensions } }) => dimensions.small};
  color: ${({ theme: { palette } }) => palette.spaceGrey};

  ${({ disabled, hasFocus }) =>
    !disabled &&
    hasFocus &&
    css`
      color: ${({ theme: { palette } }) => palette.primary.default};
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
      cursor: not-allowed;
    `};

  ${({ checked }) =>
    checked &&
    css`
      color: ${({ theme: { palette } }) => palette.darkBlue};
    `};

  /* if label got text annexe  */
  &:after {
    ${({ textAnnexe }) =>
      textAnnexe &&
      css`
        content: "${textAnnexe}";
        position: absolute;
        left: 0;
        bottom: -1.9rem;
        width: 250%;
        max-width: 30rem;
        text-align: justify;
        color: ${({ theme: { palette } }) => palette.darkGrey};
      `};
  }
`;
