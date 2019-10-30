import styled, { css } from 'styled-components';

const borderRight = height => css`
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    /*
    ** If we use a percentage size on the pseudo element and a fixed height on the element,
    ** it will lead to an etrange behaviour on Safari and shrink the element height.
    ** To avoid this behaviour here we need to set a height to the border when a height is set to the element.
    */
    height: ${height ? height : '100%'};
    border-right: 1px dotted ${({ theme: { palette } }) => palette.veryLightBlue};
  }
`;

// Table
export const TableElement = styled.table`
  min-width: 100%;

  border-collapse: collapse;
  table-layout: fixed;
  position: relative;
`;

export const Row = styled.tr`
  border-top: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  background: ${({ theme: { palette } }) => palette.white};
  &:last-child {
    border-bottom: 0;
  }
  &:first-child {
    border-top: 0;
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
  position: relative;
  height: 4.4rem;
  padding: 0 1.2rem;
  box-sizing: border-box;

  background-color: ${({ theme: { palette } }) => palette.white};

  white-space: nowrap;
  text-align: ${({ align }) => align || 'left'};

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  }

  &:first-child {
    padding-left: 2rem;
    padding-right: 1.2rem;
    z-index: 2;
    left: 0;
    ${({ isScrollable }) => isScrollable && borderRight('4.4rem')}
  }

  &:last-child {
    padding-right: 2rem;
    padding-left: 1.2rem;
  }

  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: sticky;
      top: 0;
      z-index: 1;
    `}

  ${({ isSortable }) =>
    isSortable &&
    css`
      cursor: pointer;
    `}
`;

export const HeaderLabel = styled.span`
  margin-right: 0.8rem;
  user-select: none;
`;

// Table Body
export const Body = styled.tbody`
  td {
    height: 5.2rem;
    padding: 0 1.2rem;
    white-space: nowrap;

    font-feature-settings: 'tnum';

    ${({ colsLenght }) =>
      colsLenght &&
      css`
        width: calc(100% / ${colsLenght});
      `};
    box-sizing: border-box;

    &:first-child {
      padding-left: 2rem;
    }
    &:last-child {
      padding-right: 2.2rem;
    }
  }
`;

export const ChildRow = styled(Row)`
  position: relative;

  ${({ hasChildren, selectable }) =>
    (hasChildren || selectable) &&
    css`
      cursor: pointer;
    `};

  ${({ striped }) =>
    striped &&
    css`
      &:nth-child(even) > th,
      &:nth-child(even) {
        background: ${({ theme: { palette } }) => palette.paleGrey};
      }
    `};

  ${({ selected }) =>
    selected &&
    css`
      &:nth-child(1n) > th,
      &:nth-child(1n) {
        background: ${({ theme: { palette } }) => palette.veryLightGrey};
        box-shadow: inset 3px 0px 0 0px ${({ theme: { palette } }) => palette.primary.default};
      }
    `};

  ${({ isHoverable }) =>
    isHoverable &&
    css`
      &:hover {
        & > th,
        & > td {
          background-color: ${({ theme: { palette } }) => palette.veryLightGrey};
        }
      }
    `}
`;

export const BodyRow = styled(ChildRow)`
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

export const RowHeader = styled.th`
  height: 5.2rem;

  /* Avoid cell to grow when the cell's text overflow */
  max-width: 1px;

  min-width: 20rem;
  white-space: nowrap;
  box-sizing: border-box;

  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: sticky;
      left: 0;
      ${borderRight('5.2rem')}
    `}

  text-align: ${({ align }) => align || 'left'};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  padding: 0 1.2rem 0 2rem;

  ${({ isChild }) =>
    isChild &&
    css`
      padding-left: 4rem;
    `}

  background-color: ${({ theme: { palette } }) => palette.white};
`;

export const TextEllipsis = styled.div`
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;

// Table Footer
export const Footer = styled.tfoot`
  position: sticky;
  bottom: 0;

  text-transform: uppercase;

  td {
    font-feature-settings: 'tnum';
    box-sizing: border-box;
  }

  th,
  td {
    ${({ isScrollable }) =>
      isScrollable &&
      css`
        bottom: 0;
        position: sticky;
      `}

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      border-top: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
      box-sizing: border-box;
    }

    height: 5.2rem;

    padding: 0 1.2rem;
    background-color: ${({ theme: { palette } }) => palette.white};

    color: ${({ theme: { palette } }) => palette.primary.default};
    font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
  }

  th {
    ${({ isScrollable }) =>
      isScrollable &&
      css`
        left: 0;
        z-index: 1;
        ${borderRight('5.2rem')}
      `}

    padding: 0 1.2rem 0 2rem;
  }

  td:last-of-type {
    padding: 0 2rem 0 1.2rem;
  }

  ${({ isHoverable }) =>
    isHoverable &&
    css`
      tr:hover {
        & > th,
        & > td {
          background-color: ${({ theme: { palette } }) => palette.veryLightGrey};
        }
      }
    `}
`;

// Table Container
export const Container = styled.div`
  height: ${({ height }) => height};
  ${({ isScrollable }) =>
    isScrollable &&
    css`
      overflow: scroll;
    `}
  position: relative;
`;
