import styled, { css } from 'styled-components';

export const Value = styled.div`
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({ theme: { fonts } }) => fonts.size.h2};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

export const Variation = styled.div`
  align-items: center;
  display: flex;
  font-size: ${({ theme: { fonts } }) => fonts.size.default};
  position: absolute;
  right: 1rem;
  top: 1rem;

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

export const Title = styled.div`
  color: ${({ theme: { palette } }) => palette.spaceGrey};
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  margin-top: 0.5rem;
`;
