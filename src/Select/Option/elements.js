import styled from 'styled-components';

export const ListItem = styled.li`
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 0 0 ${({ theme: { palette } }) => palette.lightGrey};
  &:last-of-type {
    box-shadow: none;
  }
`;

export const Aside = styled.span`
  padding-right: 0.8rem;
`;
