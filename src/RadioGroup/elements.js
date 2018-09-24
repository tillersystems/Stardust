import styled, { css } from 'styled-components';

/**
 * Wrapper for the actual check box and its label.
 *
 * @return {jsx}
 */
export const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;

  padding: 0.6rem;

  ${({ isRow }) =>
    isRow &&
    css`
      flex-direction: row;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `};
`;
