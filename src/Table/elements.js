import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import breakpoint from 'styled-components-breakpoint';

const ROW_PADDING_H = 2; // in rem
const TABLE_CELL_PADDING_H = 1.2; // in rem
const TABLE_CELL_INDENT = 2; // in rem

// Table
export const TableElement = styled.table`
  min-width: 100%;
  border-spacing: 0;
  position: relative;

  ${breakpoint('xs', 'sm')`
    ${({ colsDef }) =>
      colsDef &&
      css`
        width: ${Math.max(
          100,
          colsDef.reduce(
            (calculatedWidth, col) => calculatedWidth + (col.isRowHeader ? 67 : 33),
            0,
          ),
        )}%;
        table-layout: fixed;
      `};
  `};
`;

export const Row = styled.tr`
  position: relative;
  background: ${({ theme: { palette } }) => palette.white};

  & > *:first-child {
    padding-left: ${({ depth }) => `${ROW_PADDING_H + depth * TABLE_CELL_INDENT}rem`};
  }

  & > *:last-child {
    padding-right: ${ROW_PADDING_H}rem;
  }

  ${({ isClickable }) =>
    isClickable &&
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

  ${({ isUnfolded }) =>
    isUnfolded &&
    css`
      &:nth-child(1n) > th,
      &:nth-child(1n) {
        background: ${({ theme: { palette } }) => palette.veryLightGrey};
        box-shadow: inset 3px 0px 0 0px ${({ theme: { palette } }) => palette.primary.default};
      }
    `};
`;

// Table Header
export const THeader = styled.thead`
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
  padding: 0 ${TABLE_CELL_PADDING_H}rem;
  box-sizing: border-box;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  background-color: ${({ theme: { palette } }) => palette.white};
  white-space: nowrap;
  text-align: ${({ align }) => align || 'left'};

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

  ${({ isRowHeader }) =>
    isRowHeader &&
    css`
      z-index: 2;
      left: 0;
      border-right: 1px dotted ${({ theme: { palette } }) => palette.veryLightBlue};
    `}


  ${breakpoint('xs', 'sm')`
    width: 33%;
    overflow:hidden;
    text-overflow: ellipsis;

    ${({ isRowHeader }) =>
      isRowHeader &&
      css`
        width: 67%;
      `}
  `};
`;

export const HeaderLabel = styled.span`
  margin-right: 0.8rem;
  user-select: none;
`;

// Table Body
export const Body = styled.tbody`
  td,
  th {
    border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  }

  tr:last-child td,
  tr:last-child th {
    border-bottom: 0;
  }

  td,
  th {
    height: 5.2rem;
    padding: 0 1.2rem;
    white-space: nowrap;
    vertical-align: middle;
    box-sizing: border-box;
    font-feature-settings: 'tnum';

    ${({ colsLength }) =>
      colsLength &&
      css`
        width: calc(100% / ${colsLength});
      `};

    ${breakpoint('xs', 'sm')`
      width: 33%;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
  }
`;

export const RowHeader = styled.th`
 
  /* Avoid cell to grow when the cell's text overflow */
  max-width: 30rem;
  min-width: 20rem;

  white-space: nowrap;
  box-sizing: border-box;


  text-align: ${({ align }) => align || 'left'};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 1.2rem 0 2rem;
  background-color: ${({ theme: { palette } }) => palette.white};
  border-right: 1px dotted ${({ theme: { palette } }) => palette.veryLightBlue};

  ${({
    theme: {
      fonts: { weight },
    },
    hasChildren,
  }) =>
    hasChildren &&
    css`
      font-weight: ${weight.thick};
    `}

  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: sticky;
      left: 0;
    `}

  ${breakpoint('xs', 'sm')`
    width: 67%;
    min-width: 0;
    max-width: none;
    overflow:hidden;
  `};
`;

export const RowHeaderContent = styled.div`
  display: flex;
  align-items: center;
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

  th,
  td {
    font-feature-settings: 'tnum';
    box-sizing: border-box;
    height: 5.2rem;
    white-space: nowrap;
    padding: 0 1.2rem;
    background-color: ${({ theme: { palette } }) => palette.white};
    color: ${({ theme: { palette } }) => palette.primary.default};
    font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      border-top: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
      box-sizing: border-box;
    }

    ${({ isScrollable }) =>
      isScrollable &&
      css`
        bottom: 0;
        position: sticky;
      `}
  }

  td:last-of-type {
    padding: 0 2rem 0 1.2rem;
  }

  th {
    padding: 0 1.2rem 0 2rem;

    ${({ isScrollable }) =>
      isScrollable &&
      css`
        left: 0;
        z-index: 1;
        border-right: 1px dotted ${({ theme: { palette } }) => palette.veryLightBlue};
      `}
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
  background: ${({ theme: { palette } }) => palette.white};
  height: ${({ containerHeight }) => containerHeight};
  ${({ isScrollable }) =>
    isScrollable &&
    css`
      overflow: scroll;
    `}

  width: 100%;
  position: relative;
`;

// Shadow Container
export const ShadowContainer = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: ${({ firstCellWidth }) => firstCellWidth && `${firstCellWidth}px`};
  z-index: 10;
  box-shadow: ${({ side, theme: { palette } }) => {
    const shadowColor = transparentize(0.9, palette.black);
    if (side === 'left') {
      return `inset -8px 0 6px -6px ${shadowColor};`;
    } else if (side === 'right') {
      return `inset 8px 0 6px -6px ${shadowColor};`;
    } else if (side === 'both') {
      return `inset -8px 0 6px -6px ${shadowColor}, inset 8px 0 6px -6px ${shadowColor};`;
    }
    return null;
  }}
  background-repeat: no-repeat;
  background-size: 10px 100%;
`;

// Shadow Container
export const ShadowWrapped = styled.div`
  position: relative;
  height: ${({ containerHeight }) => containerHeight};
`;
