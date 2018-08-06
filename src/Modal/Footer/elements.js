import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: ${({ theme: { dimensions } }) => dimensions.small};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;
