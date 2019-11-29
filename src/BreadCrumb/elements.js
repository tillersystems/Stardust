import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Item = styled.span`
  cursor: default;

  padding: 0 0.8rem;
  &:first-of-type {
    padding: 0 0.8rem 0 0;
  }
  &:last-of-type {
    padding: 0 0 0 0.8rem;
  }

  font-size: ${({ theme: { fonts } }) => fonts.size.big};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
  color: ${({ theme: { palette }, isLastItem }) =>
    isLastItem ? palette.darkBlue : palette.primary.default};
`;
