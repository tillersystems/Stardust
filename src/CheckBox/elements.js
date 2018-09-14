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

  padding: 6px 0;

  ${({ textAnnexe }) =>
    textAnnexe &&
    css`
      margin-bottom: 19px;
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

  border: 1px solid #e2e5ed;
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
      border: 1px solid #1b82b5;
      background: ${({ theme: { palette } }) => palette.blue}
        linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%);
      box-shadow: inset 0 0.2rem 0 0 rgba(255, 255, 255, 0.1);
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
  color: ${({ theme: { palette } }) => palette.clay};

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
      cursor: not-allowed;
    `};

  ${({ checked }) =>
    checked &&
    css`
      color: ${({ theme: { palette } }) => palette.anthracite};
    `};

  /* if label got text annexe  */
  &:after {
    ${({ textAnnexe }) =>
      textAnnexe &&
      css`
        content: "${textAnnexe}";
        position: absolute;
        left: 0;
        bottom: -19px;
        width: 250%;
        max-width: 300px;
        text-align: justify;
        color: #889AA8;
      `};
  }
`;
