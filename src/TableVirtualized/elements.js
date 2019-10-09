import styled, { css } from 'styled-components';
import { Grid } from 'react-virtualized';
import { Icon } from '..';

export const Arrows = styled(Icon)`
  margin-left: 0.5rem;
`;

export const BodyCell = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  display: flex;
  height: 50px;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};

  ${({ hasPadding }) =>
    hasPadding &&
    css`
      padding-right: 1rem;
    `}

  ${({ isSelectable }) =>
    isSelectable &&
    css`
      cursor: pointer;
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: ${({ theme: { palette } }) => palette.veryLightGrey};
    `}
`;

export const BodyGrid = styled(Grid)`
  left: ${({ widthFixedColumn }) => `${widthFixedColumn}px`};
  text-align: right;

  /* Override width to adjust to the optional fixed left column */
  width: ${({ columnWidth, width }) => `${width - columnWidth}px`} !important;

  .ReactVirtualized__Grid__innerScrollContainer {
    width: ${({ columnCount, columnWidth }) => `${(columnCount - 1) * columnWidth}px`} !important;
  }
`;

export const BodyGridContainer = styled.div`
  height: ${({ height }) => `${height}px`};

  width: ${({ width }) => `${width}px`};
`;

export const HeaderCell = styled(BodyCell)`
  height: 44px;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};

  ${({ isSortable }) =>
    isSortable &&
    css`
      cursor: pointer;
    `}
`;

export const GridColumn = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export const GridRow = styled.div`
  background-color: ${({ theme: { palette } }) => palette.white};
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const LeftFooterGrid = styled(Grid)`
  background-color: ${({ theme: { palette } }) => palette.white};
  border-top: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  color: ${({ theme: { palette } }) => palette.primary.default};

  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.thick};

  width: 100%;
`;

export const LeftHeaderGrid = styled(Grid)`
  color: ${({ theme: { palette } }) => palette.darkGrey};

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
  overflow: hidden !important;
  text-transform: uppercase;
  width: 100%;
`;

export const HeaderGrid = styled(LeftHeaderGrid)`
  left: ${({ widthFixedColumn }) => `${widthFixedColumn}px`};

  /* Override width to adjust to the optional fixed left column */
  width: ${({ columnWidth, width }) => `${width - columnWidth}px`} !important;

  .ReactVirtualized__Grid__innerScrollContainer {
    width: ${({ columnCount, columnWidth, scrollbarSize }) =>
      `${(columnCount - 1) * columnWidth + scrollbarSize}px`} !important;
  }
`;

export const FooterGrid = styled(LeftFooterGrid)`
  left: ${({ widthFixedColumn }) => `${widthFixedColumn}px`};
  overflow: hidden !important;

  /* Override width to adjust to the optional fixed left column */
  width: ${({ columnWidth, width }) => `${width - columnWidth}px`} !important;

  .ReactVirtualized__Grid__innerScrollContainer {
    width: ${({ columnCount, columnWidth, scrollbarSize }) =>
      `${(columnCount - 1) * columnWidth + scrollbarSize}px`} !important;
  }
`;

export const HeaderGridContainer = styled.div`
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  height: 44px;
  width: ${({ width }) => `${width}px`};
`;

export const LeftSideCell = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.veryLightBlue};
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'left-start'};
  min-height: 50px;
  padding: 1rem 2rem;

  ${({ isSortable, isSelectable }) =>
    (isSortable || isSelectable) &&
    css`
      cursor: pointer;
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: ${({ theme: { palette } }) => palette.veryLightGrey};
      box-shadow: inset 3px 0px 0 0px ${({ theme: { palette } }) => palette.primary.default};
    `}

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    height: 100%;
    border-right: 1px dotted ${({ theme: { palette } }) => palette.veryLightBlue};
  }
`;

export const LeftSideGrid = styled(Grid)`
  color: ${({ theme: { palette } }) => palette.darkBlue};
  overflow: hidden !important;
`;

export const LeftSideGridContainer = styled.div`
  flex: 0 0 75px;
  left: 0;
  position: absolute;
  top: ${({ top }) => (top ? `${top}px` : 0)};
  z-index: 10;

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;
