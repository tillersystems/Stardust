import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, CellMeasurer, CellMeasurerCache, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/scrollbarSize';

import { Theme } from '..';
import compare from '../helpers/compare';
import {
  Arrows,
  BodyCell,
  BodyGrid,
  BodyGridContainer,
  FooterGrid,
  GridColumn,
  GridRow,
  HeaderCell,
  HeaderGrid,
  HeaderGridContainer,
  LeftFooterGrid,
  LeftHeaderGrid,
  LeftSideCell,
  LeftSideGrid,
  LeftSideGridContainer,
} from './elements';

/** Lookup object for next sorting direction. */
const nextSortingDirection = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};

/** Lookup object for icon name from sorting direction. */
const sortingDirectionToIconName = {
  none: 'carets-vertical',
  asc: 'caret-up',
  desc: 'caret-down',
};

/**
 * A Table displays structured data through rows and columns.
 * It can sort by column (asc, desc).
 *
 */
class TableVirtualized extends PureComponent {
  /** Internal state. */
  state = {
    // Stores which column should be sorted.
    sort: {
      // `index` is either `-1` if no column is to be sorted, or is the index of the column.
      index: -1,
      // `direction` is the direction of sorting and can be one of `none`, `asc` or `desc`.
      direction: 'none',
    },

    // Stores selected row.
    // Use `-1` for no row selected.
    selected: -1,
    cellCache: new CellMeasurerCache({
      defaultHeight: 50,
      defaultWidth: this.props.widthFixedColumn || this.props.minColumnWidth, // eslint-disable-line react/destructuring-assignment
      fixedWidth: true,
    }),
  };

  /**
   * Handles click on the header cells to sort a column
   *
   * @param {number} i - The column on which the user clicked.
   */
  handleSortingClick = i => {
    this.setState(({ sort: { index, direction } }) => ({
      sort: {
        index: i,
        direction: i === index ? nextSortingDirection[direction] : 'asc',
      },
    }));
  };

  /**
   * Handles click on a row.
   *
   * @param {Object} item - The item of the row that was clicked.
   * @param {Number} key - The key of the row that was clicked.
   */
  handleRowSelect = (item, key) => {
    const {
      rowsDef: { isSelectable, onSelect },
    } = this.props;

    isSelectable && this.setState({ selected: key }, () => onSelect && onSelect(item, key));
  };

  /**
   * Check if the value should be sorted by an object key or directly by the value itself.
   *
   * @param {Object} comparisonElement - element returned by the .sort() method used to compare and sort data.
   *
   * @return {string|number}
   */
  sortBy = comparisonElement => {
    const { colsDef } = this.props;
    const {
      sort: { index },
    } = this.state;
    const isSortableObject =
      typeof colsDef[index].value(comparisonElement) === 'object' && !!colsDef[index].filteredBy;

    return isSortableObject
      ? colsDef[index].filteredBy(comparisonElement)
      : colsDef[index].value(comparisonElement);
  };

  /**
   * Sort data if needed.
   *
   * @return {Array}
   */
  getSortedData = () => {
    const { data, footerData } = this.props;
    const {
      sort: { index, direction },
    } = this.state;

    // We actually need to keep track of the original key for sorting purposes
    // and selection purposes (i.e. when the column is sorted, the selected row
    // should still be the same).
    let sortedData = data.map((item, key) => ({
      key,
      item,
    }));
    if (index >= 0) {
      sortedData = sortedData.sort((a, b) => {
        return (
          (direction === 'asc' ? -1 : direction === 'desc' ? 1 : 0) *
          compare(this.sortBy(a), this.sortBy(b))
        );
      });
    }

    return footerData ? [...sortedData, { key: data.length, item: {} }] : sortedData;
  };

  renderBodyCell = ({ columnIndex, effectiveWidth, key, parent, rowIndex, sortedData, style }) => {
    if (columnIndex < 1) {
      return;
    }
    const {
      colsDef,
      rowsDef: { isSelectable },
    } = this.props;
    const { cellCache, selected } = this.state;
    const content = this.getContent(columnIndex, sortedData[rowIndex]);

    return (
      <CellMeasurer
        cache={cellCache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <BodyCell
          style={{
            ...style,
            left: style.left - effectiveWidth,
          }}
          columnIndex={columnIndex}
          hasPadding={colsDef.length - 1 === columnIndex}
          isEmpty={!content}
          isSelectable={isSelectable}
          isSelected={selected === sortedData[rowIndex].key}
          justifyContent={colsDef[columnIndex].justifyContent}
          onClick={() => this.handleRowSelect(sortedData[rowIndex].item, sortedData[rowIndex].key)}
        >
          {content}
        </BodyCell>
      </CellMeasurer>
    );
  };

  renderHeaderCell = ({ columnIndex, effectiveWidth, key, style }) => {
    if (columnIndex < 1) {
      return;
    }
    const { colsDef } = this.props;
    const {
      sort: { index, direction },
    } = this.state;
    const { isSortable, title } = colsDef[columnIndex];

    return (
      <HeaderCell
        key={key}
        hasPadding={colsDef.length - 1 === columnIndex}
        isSortable={isSortable}
        justifyContent={colsDef[columnIndex].justifyContent}
        {...(isSortable ? { onClick: () => this.handleSortingClick(columnIndex) } : {})}
        style={{
          ...style,
          left: style.left - effectiveWidth,
        }}
      >
        {title}
        {isSortable && (
          <Arrows
            name={sortingDirectionToIconName[columnIndex === index ? direction : 'none']}
            color={Theme.palette.mediumGrey}
            width="10px"
            height="10px"
          />
        )}
      </HeaderCell>
    );
  };

  renderLeftHeaderCell = ({ columnIndex, key, style }) => {
    const { colsDef } = this.props;
    const {
      sort: { index, direction },
    } = this.state;
    const { isSortable, justifyContent, title } = colsDef[columnIndex];

    return (
      <LeftSideCell
        key={key}
        style={style}
        isSortable={isSortable}
        justifyContent={justifyContent}
        {...(isSortable ? { onClick: () => this.handleSortingClick(columnIndex) } : {})}
      >
        {title}
        {isSortable && (
          <Arrows
            name={sortingDirectionToIconName[columnIndex === index ? direction : 'none']}
            color={Theme.palette.mediumGrey}
            width="10px"
            height="10px"
          />
        )}
      </LeftSideCell>
    );
  };

  renderLeftBottomCell = ({ columnIndex, key, parent, rowIndex, style }) => {
    const { colsDef, footerData, widthFixedColumn } = this.props;
    const { cellCache } = this.state;

    const { justifyContent } = colsDef[columnIndex];
    const content = this.getContent(columnIndex, { item: footerData });

    return (
      <CellMeasurer
        cache={cellCache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <LeftSideCell
          justifyContent={justifyContent}
          style={{
            ...style,
            width: widthFixedColumn,
          }}
        >
          {content}
        </LeftSideCell>
      </CellMeasurer>
    );
  };

  renderBottomCell = ({ columnIndex, effectiveWidth, key, parent, rowIndex, style }) => {
    const { colsDef, footerData } = this.props;
    const { cellCache } = this.state;
    const content = this.getContent(columnIndex, { item: footerData });

    return (
      <CellMeasurer
        cache={cellCache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <BodyCell
          columnIndex={columnIndex}
          hasPadding={colsDef.length - 1 === columnIndex}
          justifyContent={colsDef[columnIndex].justifyContent}
          style={{
            ...style,
            left: style.left - effectiveWidth,
          }}
        >
          {content}
        </BodyCell>
      </CellMeasurer>
    );
  };

  renderLeftSideCell = ({ columnIndex, key, parent, rowIndex, sortedData, style }) => {
    const { cellCache, selected } = this.state;
    const {
      colsDef,
      rowsDef: { isSelectable },
      widthFixedColumn,
    } = this.props;
    const content = this.getContent(columnIndex, sortedData[rowIndex]);

    return (
      <CellMeasurer
        cache={cellCache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <LeftSideCell
          isEmpty={!content}
          isSelectable={isSelectable}
          isSelected={selected === sortedData[rowIndex].key}
          justifyContent={colsDef[columnIndex].justifyContent}
          onClick={() => this.handleRowSelect(sortedData[rowIndex].item, sortedData[rowIndex].key)}
          style={{
            ...style,
            width: widthFixedColumn,
          }}
        >
          {content}
        </LeftSideCell>
      </CellMeasurer>
    );
  };

  getContent = (columnIndex, data) => {
    const { colsDef } = this.props;

    if (Object.keys(data.item).length) {
      const getValue = colsDef[columnIndex].format || colsDef[columnIndex].value;

      return getValue(data);
    }
    return null;
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      footerData,
      minColumnWidth,
      overscanColumnCount,
      overscanRowCount,
      height,
      widthFixedColumn,
    } = this.props;
    const { cellCache, sort } = this.state;
    const sortedData = this.getSortedData();

    const bodyHeight = height - 44;
    const columnCount = Object.keys(sortedData[0].item).length;
    const rowCount = sortedData.length;
    const firstColumnWidth = widthFixedColumn || minColumnWidth;
    cellCache.clearAll();

    return (
      <ScrollSync>
        {({ onScroll, scrollLeft, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              const computedWidth =
                (width - firstColumnWidth - scrollbarSize()) / (columnCount - 1); // remove width of fixed column and divide it by the number of remaining columns
              const effectiveWidth =
                computedWidth > minColumnWidth && computedWidth > 0
                  ? computedWidth
                  : minColumnWidth;
              const hasHorizontalScrollbar = computedWidth < minColumnWidth;

              return (
                <GridRow>
                  <LeftSideGridContainer>
                    <LeftHeaderGrid
                      cellRenderer={this.renderLeftHeaderCell}
                      columnCount={1}
                      columnWidth={firstColumnWidth}
                      height={44}
                      rowCount={1}
                      rowHeight={44}
                      sort={sort}
                      width={firstColumnWidth}
                    />
                  </LeftSideGridContainer>
                  <LeftSideGridContainer
                    top={44}
                    height={bodyHeight - (hasHorizontalScrollbar ? scrollbarSize() : 0)}
                    width={firstColumnWidth}
                  >
                    <LeftSideGrid
                      cellRenderer={props => this.renderLeftSideCell({ ...props, sortedData })}
                      columnCount={1}
                      columnWidth={firstColumnWidth}
                      deferredMeasurementCache={cellCache}
                      height={bodyHeight - (hasHorizontalScrollbar ? scrollbarSize() : 0)}
                      overscanColumnCount={overscanColumnCount}
                      overscanRowCount={overscanRowCount}
                      rowCount={rowCount}
                      rowHeight={cellCache.rowHeight}
                      scrollTop={scrollTop}
                      width={firstColumnWidth}
                    />
                  </LeftSideGridContainer>
                  {footerData && (
                    <LeftSideGridContainer
                      top={height - 50 - (hasHorizontalScrollbar ? scrollbarSize() : 0)}
                    >
                      <LeftFooterGrid
                        cellRenderer={this.renderLeftBottomCell}
                        columnCount={1}
                        columnWidth={firstColumnWidth}
                        height={50}
                        rowCount={1}
                        rowHeight={50}
                        width={firstColumnWidth}
                      />
                    </LeftSideGridContainer>
                  )}
                  <GridColumn>
                    <div>
                      <HeaderGridContainer width={width}>
                        <HeaderGrid
                          cellRenderer={props =>
                            this.renderHeaderCell({ ...props, effectiveWidth })
                          }
                          columnWidth={effectiveWidth}
                          columnCount={columnCount}
                          height={44}
                          overscanColumnCount={overscanColumnCount}
                          rowCount={1}
                          rowHeight={44}
                          scrollbarSize={scrollbarSize()}
                          scrollLeft={scrollLeft}
                          sort={sort}
                          width={width - firstColumnWidth + effectiveWidth}
                          widthFixedColumn={firstColumnWidth}
                        />
                      </HeaderGridContainer>
                      <BodyGridContainer
                        height={bodyHeight - 50 - (hasHorizontalScrollbar ? scrollbarSize() : 0)}
                        width={width}
                      >
                        <BodyGrid
                          cellRenderer={props =>
                            this.renderBodyCell({ ...props, effectiveWidth, sortedData })
                          }
                          columnCount={columnCount}
                          columnWidth={effectiveWidth}
                          data={sortedData}
                          deferredMeasurementCache={cellCache}
                          height={bodyHeight}
                          onScroll={onScroll}
                          overscanColumnCount={overscanColumnCount}
                          overscanRowCount={overscanRowCount}
                          rowCount={rowCount}
                          rowHeight={cellCache.rowHeight}
                          scrollLeft={scrollLeft}
                          scrollTop={scrollTop}
                          width={width - firstColumnWidth + effectiveWidth}
                          widthFixedColumn={firstColumnWidth}
                        />
                      </BodyGridContainer>
                      {footerData && (
                        <div
                          style={{
                            height: 50 + (hasHorizontalScrollbar ? scrollbarSize() : 0),
                            width: width - scrollbarSize(),
                          }}
                        >
                          <FooterGrid
                            cellRenderer={props =>
                              this.renderBottomCell({ ...props, effectiveWidth })
                            }
                            columnCount={columnCount}
                            columnWidth={effectiveWidth}
                            height={50}
                            rowCount={1}
                            rowHeight={50}
                            scrollbarSize={scrollbarSize()}
                            scrollLeft={scrollLeft}
                            width={width - firstColumnWidth + effectiveWidth - scrollbarSize()}
                            widthFixedColumn={firstColumnWidth}
                          />
                        </div>
                      )}
                    </div>
                  </GridColumn>
                </GridRow>
              );
            }}
          </AutoSizer>
        )}
      </ScrollSync>
    );
  }
}

const { array, arrayOf, bool, func, node, number, object, oneOfType, shape, string } = PropTypes;

/** Prop types. */
TableVirtualized.propTypes = {
  /** Columns definition */
  colsDef: arrayOf(
    shape({
      justifyContent: string,
      isRowHeader: bool,
      filteredBy: func,
      format: func,
      isSortable: bool,
      title: node.isRequired,
      total: func,
      value: func.isRequired,
      width: oneOfType([string, number]),
    }),
  ).isRequired,

  /** Data to display */
  data: array.isRequired,

  /**
   * This props going to add a fixed row at the bottom of the table.
   * Usually this props is used to display the total of each column.
   **/
  dataTotal: object,

  /** Data for fixed row at the bottom of the table */
  footerData: object,

  /** Height of the table use this props only is the table is scrollable */
  height: number,

  /**
  /** Minimum width of columns. Width of columns is computed from the remaining width after the fixed column.
   * If the computed width is too small, it will take the minColumnWidth as width
   **/
  minColumnWidth: number,

  /** Number of additional columns to render besides visible ones */
  overscanColumnCount: number,

  /** Number of additional rows to render besides visible ones */
  overscanRowCount: number,

  /** Rows definition */
  rowsDef: shape({
    isSelectable: bool,
    onSelect: func,
  }),

  /** If provided and greater than 0, the table will have its first column fixed */
  widthFixedColumn: number,
};

/** Default props. */
TableVirtualized.defaultProps = {
  dataTotal: null,
  footerData: null,
  height: 400,
  minColumnWidth: 125,
  overscanColumnCount: 2,
  overscanRowCount: 5,
  rowsDef: {
    isSelectable: false,
    onSelect: () => {},
  },
  widthFixedColumn: 0,
};

export default TableVirtualized;
