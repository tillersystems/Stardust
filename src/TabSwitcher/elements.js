import styled, { css } from 'styled-components';

export const TabContainer = styled.li`
  flex: 1;

  cursor: pointer;


  /* Tab active */
  ${({ isActive }) =>
    isActive &&
    css`
      font-weight: 600;
      box-shadow: inset 0 -2px 0 0px ${({ theme: { palette } }) => palette.primary.default};
    `}

  border-top: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-right: 1px solid ${({ theme: { palette } }) => palette.lightGrey};

  &:first-child {
    border-left: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  }

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const TabPanelsContainer = styled.div`
  padding: 1.6rem 3rem;

  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-left: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-right: 1px solid ${({ theme: { palette } }) => palette.lightGrey};

  background: ${({ theme: { palette } }) => palette.white};

  flex: 1;

  cursor: pointer;

  /* Without Border */
  ${({ noBorder }) =>
    noBorder &&
    css`
      border: 0;
    `}

  /* Without Background */
  ${({ noBackground }) =>
    noBackground &&
    css`
      background: none;
    `}
`;
