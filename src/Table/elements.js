import styled, { css } from 'styled-components';

// Table
export const TableElement = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Row = styled.tr`
  border-top: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  background: ${({ theme: { palette } }) => palette.white};
  &:last-child {
    border-bottom: 0;
  }
`;

// Table Header
export const TableHeader = styled.thead`
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.default};
  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.thick};
  line-height: 1.8rem;

  text-transform: uppercase;

  color: ${({ theme: { palette } }) => palette.darkGrey};
`;

export const TableHeaderCell = styled.th`
  height: 4.4rem;

  &:first-child {
    padding-left: 3rem;
  }
  &:last-child {
    padding-right: 3rem;
  }

  text-align: ${({ align }) => align || 'left'};
`;

export const HeaderSortingContainer = styled.div`
  display: flex;
  align-items: center;

  ${({ align }) =>
    align === 'right' &&
    css`
      justify-content: flex-end;
    `};

  cursor: pointer;
`;

export const HeaderLabel = styled.div`
  margin-right: 0.8rem;
  user-select: none;
`;

// Table Body
export const Body = styled.tbody`
  td {
    padding: 1.6rem 0;

    font-weight: ${({
      theme: {
        fonts: { weight },
      },
    }) => weight.thick};

    &:first-child {
      padding-left: 3rem;
    }
    &:last-child {
      padding-right: 3rem;
    }
  }
`;

export const BodyRow = styled(Row)`
  position: relative;

  ${({ selectable }) =>
    selectable &&
    css`
      cursor: pointer;
      }
    `};

  ${({ selected }) =>
    selected &&
    css`
      box-shadow: inset 3px 0px 0 0px ${({ theme: { palette } }) => palette.primary.default};
    `};

  ${({ striped }) =>
    striped &&
    css`
      &:nth-child(even) {
        background: ${({ theme: { palette } }) => palette.paleGrey};
      }
    `};
`;
