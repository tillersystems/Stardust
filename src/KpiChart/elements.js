import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 600;
  font-size: ${({ isCompacted, theme: { fonts } }) =>
    isCompacted ? fonts.size.medium : fonts.size.big};

  padding-bottom: ${({ isCompacted }) => (isCompacted ? '1.2rem' : '1.5rem')};

  border-bottom: 3px solid ${({ theme: { palette } }) => palette.primary.default};
  display: flex;
  align-items: center;
`;
