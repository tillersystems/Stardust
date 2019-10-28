import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';
import compare from '../helpers/compare';
import {
  Container,
  HeaderLabel,
  Body,
  BodyRow,
  Row,
  TableElement,
  TableHeader,
  TableHeaderCell,
  RowHeader,
  Footer,
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
class Table extends PureComponent {
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
  };

  /**
   * Handles click on the carets to sort a column.
   *
   * @param {Number} i - The column on which the user clicked.
   */
  handleSortingClick = i => {
    const {
      sort: { index, direction },
    } = this.state;

    this.setState({
      ...this.state,
      sort: { index: i, direction: i == index ? nextSortingDirection[direction] : 'asc' },
    });
  };

  /**
   * Handles click on a row.
   *
   * @param {Object} item - The item of the row that was clicked.
   * @param {Number} key - The key of the row that was clicked.
   */
  handleRowSelect = (item, key) => {
    const {
      rowsDef: { selectable, onSelect },
    } = this.props;

    if (selectable) {
      this.setState({ ...this.state, selected: key }, () => {
        if (onSelect) onSelect(item, key);
      });
    }
  };

  /**
   * Renders the header of the table.
   *
   * @return {jsx}
   */
  renderHeader() {
    const { colsDef, isScrollable } = this.props;
    const {
      sort: { index, direction },
    } = this.state;

    return (
      <TableHeader>
        <Row>
          {colsDef.map(({ title, isSortable, align }, columnIndex) => (
            <TableHeaderCell
              isScrollable={isScrollable}
              isSortable={isSortable}
              scope="col"
              key={`${title}-${columnIndex}`}
              align={align}
              onClick={() => (isSortable ? this.handleSortingClick(columnIndex) : undefined)}
            >
              <HeaderLabel>{title}</HeaderLabel>
              {isSortable && (
                <Icon
                  name={sortingDirectionToIconName[columnIndex == index ? direction : 'none']}
                  color={Theme.palette.mediumGrey}
                  width="10px"
                  height="10px"
                />
              )}
            </TableHeaderCell>
          ))}
        </Row>
      </TableHeader>
    );
  }

  /**
   * Renders the body of the table.
   *
   * @return {jsx}
   */
  renderBody() {
    const {
      colsDef,
      data,
      isScrollable,
      isHoverable,
      rowsDef: { selectable },
      striped,
    } = this.props;
    const {
      selected,
      sort: { index, direction },
    } = this.state;

    // We actually need to keep track of the original key for sorting purposes
    // and selection purposes (i.e. when the column is sorted, the selected row
    // should still be the same).
    let sortedData = data.map((item, key) => {
      return {
        key,
        item,
      };
    });
    if (index >= 0) {
      sortedData = sortedData.sort((a, b) => {
        const isSortableObject =
          typeof colsDef[index].value(a.item) === 'object' && !!colsDef[index].filteredBy;

        /**
         * Check if the value should be sorted by an object key or directly by the value itself.
         *
         * @param {object} comparisonElement - element returned by the .sort() methode used to compare and sort data.
         *
         * @return {string|number}
         */
        const sortBy = comparisonElement =>
          isSortableObject
            ? colsDef[index].filteredBy(colsDef[index].value(comparisonElement.item))
            : colsDef[index].value(comparisonElement.item);

        return (
          (direction === 'asc' ? -1 : direction === 'desc' ? 1 : 0) * compare(sortBy(a), sortBy(b))
        );
      });
    }

    return (
      <Body>
        {sortedData.map(({ key, item }, index) => (
          <BodyRow
            key={key}
            data-testid="body-row"
            selectable={selectable}
            selected={selected === key}
            striped={striped}
            onClick={() => this.handleRowSelect(item, key)}
            isHoverable={isHoverable}
          >
            {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
              isRowHeader ? (
                <RowHeader
                  align={align}
                  isScrollable={isScrollable}
                  key={`column-header-${columnIndex}`}
                >
                  {value(item, index)}
                </RowHeader>
              ) : (
                <td key={`column-${columnIndex}`} align={align}>
                  {format ? format(value(item, index), index) : value(item, index)}
                </td>
              ),
            )}
          </BodyRow>
        ))}
      </Body>
    );
  }

  /**
   * Renders the footer of the table.
   *
   * @return {jsx}
   */
  renderFooter() {
    const { colsDef, dataTotal, isScrollable, isHoverable } = this.props;

    return (
      <Footer data-testid="footer-row" isScrollable={isScrollable} isHoverable={isHoverable}>
        <tr>
          {colsDef.map(({ isRowHeader, total, format, align }, columnIndex) =>
            isRowHeader ? (
              <th scope="row" key={`total-header-${columnIndex}`} align={align}>
                {format ? format(total(dataTotal)) : total(dataTotal)}
              </th>
            ) : (
              <td key={`total-${columnIndex}`} align={align}>
                {format ? format(total(dataTotal)) : total(dataTotal)}
              </td>
            ),
          )}
        </tr>
      </Footer>
    );
  }

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { dataTotal, height, isScrollable, width } = this.props;

    return (
      <Container data-testid="table-container" height={height} isScrollable={isScrollable}>
        <TableElement width={isScrollable ? 'initial' : width}>
          {this.renderHeader()}
          {this.renderBody()}
          {dataTotal && this.renderFooter()}
        </TableElement>
      </Container>
    );
  }
}

const {
  array,
  arrayOf,
  bool,
  func,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string,
} = PropTypes;

/** Prop types. */
Table.propTypes = {
  /** Columns definition */
  colsDef: arrayOf(
    shape({
      align: oneOf(['left', 'center', 'right']),
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
   * */
  dataTotal: object,

  /** Height of the table use this props only is the table is scrollable */
  height: string,

  /**
   * Define if the table is scrollable or not.
   * When the table is scrollable the column header stick to the top and the row header stick to the left.
   * The table body going to scroll in both axies x and y depending of the content overflow.
   **/
  isScrollable: bool,

  /**
   * Define if the table is isHoverable or not.
   * When the table is isHoverable if a user hover a row it background change increasing contrast with others improving readability.
   **/
  isHoverable: bool,

  /** Rows definition */
  rowsDef: shape({
    onSelect: func,
    selectable: bool,
  }),

  /** Whether rows should alternate color or not */
  striped: bool,

  /** Width of the table use this props only is the table is not scrollable*/
  width: string,
};

/** Default props. */
Table.defaultProps = {
  dataTotal: null,
  height: 'initial',
  isScrollable: false,
  isHoverable: false,
  rowsDef: {
    onSelect: () => {},
    selectable: false,
  },
  striped: false,
  width: '100%',
};

export default Table;
