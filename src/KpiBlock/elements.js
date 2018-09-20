import styled, { css } from 'styled-components';

export const Value = styled.div`
  font-size: ${({ theme: { fonts } }) => fonts.size.big};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};

  color: ${({ theme: { palette } }) => palette.darkBlue};
`;

export const Title = styled.div`
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};

  color: ${({ theme: { palette } }) => palette.mediumGrey};
`;

export const Variation = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;
  align-items: center;

  font-size: ${({ theme: { fonts } }) => fonts.size.default};

  /* Negative */
  ${({ negative }) =>
    negative &&
    css`
      color: ${({ theme: { palette } }) => palette.failure.default};
    `};

  /* Positive */
  ${({ positive }) =>
    positive &&
    css`
      color: ${({ theme: { palette } }) => palette.success.default};
    `};
`;
