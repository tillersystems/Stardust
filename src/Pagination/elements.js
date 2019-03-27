import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  margin-top: ${({ theme: { dimensions } }) => dimensions.medium};
  align-items: center;
  
  ${({ align }) =>
    align === 'left' &&
    css`
      justify-content: flex-start;
    `}
  ${({ align }) =>
    align === 'right' &&
    css`
      justify-content: flex-end;
    `}
  ${({ align }) =>
    align === 'center' &&
    css`
      justify-content: center;
    `}
`;

export const PaginationContainer = styled.div`
  width: auto;
  height: 4rem;
  display: flex;
  align-items: center;
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  background-color: ${({ theme: { palette } }) => palette.white};
`;

export const PaginationGroup = styled.div`
  height: 3rem;
  display: flex;
`;

export const PaginationItem = styled.div`
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  background-color: ${({ theme: { palette } }) => palette.white};
  height: 3rem;
  width: 3rem;
  line-heigh: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.mediumGrey};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: { palette } }) => palette.lightGrey};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme: { palette } }) => palette.primary.default};
      color: ${({ theme: { palette } }) => palette.white};
      &:hover {
        background-color: ${({ theme: { palette } }) => palette.primary.darker};
      }
    `}
`;

export const BreakItem = styled.div`
  background-color: ${({ theme: { palette } }) => palette.white};
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { palette } }) => palette.mediumGrey};
`;

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  ${({ side }) =>
    side === 'left' &&
    css`
      border-right: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
      margin-right: 1rem;
    `}

  ${({ side }) =>
    side === 'right' &&
    css`
      border-left: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
      margin-left: 1rem;
    `}

  cursor: pointer;
`;
