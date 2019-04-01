import styled, { css } from 'styled-components';

export const Title = styled.div`
  grid-area: title;
  color: ${({ theme: { palette } }) => palette.spaceGrey};
  font-size: ${({ isCompacted, theme: { fonts } }) =>
    isCompacted ? fonts.size.default : fonts.size.medium};
  margin-top: 0.3rem;
`;

export const Value = styled.div`
  grid-area: value;
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({ isCompacted, theme: { fonts } }) =>
    isCompacted ? fonts.size.h3 : fonts.size.h2};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

export const Variation = styled.div`
  grid-area: variation;
  align-items: center;
  display: flex;
  font-size: ${({ theme: { fonts } }) => fonts.size.default};
  right: 1rem;
  top: 1rem;
  justify-self: ${({ isCompacted }) => (isCompacted ? 'center' : 'end')};

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
