import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';
import compare from '../helpers/compare';
import {
  HeaderSortingContainer,
  HeaderLabel,
  Body,
  BodyRow,
  Row,
  TableElement,
  TableHeader,
  TableHeaderCell,
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

const { node, number, func, oneOfType, oneOf, bool, shape, array, string } = PropTypes;

/**
 * Defines a Table component.
 *
 * Displays given data into a table layout and manages the data.
 */
class Table extends PureComponent {
  /** Prop types. */
  static propTypes = {
    colsDef: PropTypes.arrayOf(
      PropTypes.shape({
        title: node.isRequired,
        value: func.isRequired,
        format: func,
        filteredBy: func,
        width: oneOfType([string, number]),
        align: oneOf(['left', 'center', 'right']),
        sortable: bool,
      }),
    ).isRequired,
    rowsDef: shape({
      selectable: bool,
      onSelect: func,
    }),
    data: array.isRequired,
    width: string,
    striped: bool,
  };

  /** Default props. */
  static defaultProps = {
    rowsDef: {
      selectable: false,
      onSelect: () => {},
    },
    width: '100%',
    striped: false,
  };

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
    const { colsDef } = this.props;
    const {
      sort: { index, direction },
    } = this.state;

    return (
      <TableHeader>
        <Row>
          {colsDef.map(({ title, sortable, align }, columnIndex) => (
            <TableHeaderCell
              key={`${title}-${columnIndex}`}
              align={align}
              onClick={() => (sortable ? this.handleSortingClick(columnIndex) : undefined)}
            >
              <HeaderSortingContainer align={align}>
                <HeaderLabel>{title}</HeaderLabel>
                {sortable && (
                  <Icon
                    name={sortingDirectionToIconName[columnIndex == index ? direction : 'none']}
                    color={Theme.palette.mediumGrey}
                    width="10px"
                    height="10px"
                  />
                )}
              </HeaderSortingContainer>
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
      rowsDef: { selectable },
      data,
      striped,
    } = this.props;
    const {
      sort: { index, direction },
      selected,
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
          >
            {colsDef.map(({ value, format, align }, columnIndex) => (
              <td key={`column-${columnIndex}`} align={align}>
                {format ? format(value(item, index), index) : value(item, index)}
              </td>
            ))}
          </BodyRow>
        ))}
      </Body>
    );
  }

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const { width } = this.props;

    return (
      <TableElement width={width}>
        {this.renderHeader()}
        {this.renderBody()}
      </TableElement>
    );
  }
}

export default Table;
