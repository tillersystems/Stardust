import styled, { css } from 'styled-components';

const borderRight = css`
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    border-right: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
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
  padding: 0 0.5rem;

  background-color: ${({ theme: { palette } }) => palette.white};

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
    padding-left: 3rem;
    padding-right: 0.5rem;
    z-index: 2;
    left: 0;
    ${({ isScrollable }) => isScrollable && borderRight}
  }

  &:last-child {
    padding-right: 3rem;
    padding-left: 0.5rem;
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
    padding: 1.6rem 0.5rem;

    font-weight: ${({
      theme: {
        fonts: { weight },
      },
    }) => weight.thick};

    min-width: 10rem;

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
`;

export const RowHeader = styled.th`
  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: sticky;
      left: 0;
      ${borderRight}
    `}

  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};

  padding: 1.8rem 0.5rem 1.8rem 3rem;
  min-width: 15rem;
  background-color: ${({ theme: { palette } }) => palette.white};
`;

// Table Footer
export const Footer = styled.tfoot`
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
    }

    padding: 1.8rem 0.5rem;
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
        ${borderRight}
      `}

    padding: 1.8rem 0.5rem 1.8rem 3rem;
  }

  td:last-of-type {
    padding: 1.8rem 3rem 1.8rem 0.5rem;
  }
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

export const RowHeader = styled.th`
  ${({ isScrollable }) =>
    isScrollable &&
    css`
      position: sticky;
      left: 0;
      ${borderRight}
    `}

  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};

  padding: 1.8rem 0.5rem 1.8rem 3rem;
  min-width: 15rem;
  background-color: ${({ theme: { palette } }) => palette.white};

  ${({ selected }) =>
    selected &&
    css`
      box-shadow: inset 3px 0px 0 0px ${({ theme: { palette } }) => palette.primary.default};
      background: ${({ theme: { palette } }) => palette.veryLightGrey};
    `};
`;

// Table Footer
export const Footer = styled.tfoot`
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
    }

    padding: 1.8rem 0.5rem;
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
        ${borderRight}
      `}

    padding: 1.8rem 0.5rem 1.8rem 3rem;
  }

  td:last-of-type {
    padding: 1.8rem 3rem 1.8rem 0.5rem;
  }
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
