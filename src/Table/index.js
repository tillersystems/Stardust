import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';
import sortElementsInArray from '../helpers/sortElementsInArray';
import {
  Container,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  BodyRow,
  BodyCell,
  HeaderCellTitle,
  HeaderSortingContainer,
  HeaderSortingGhost,
  HeaderLabel,
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
    header: oneOf(['top', 'bottom', 'none']),
    width: string,
    compressedRows: bool,
    noZebra: bool,
  };

  /** Default props. */
  static defaultProps = {
    rowsDef: {
      selectable: false,
      onSelect: () => {},
    },
    width: '100%',
    header: 'top',
    compressedRows: false,
    noZebra: false,
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
      <Header>
        <HeaderRow>
          {/* eslint-disable no-unused-vars */ colsDef.map(
            ({ title, format, value, sortable, align, ...rest }, j) => (
              <HeaderCell j={j} key={j} align={align} {...rest}>
                <HeaderCellTitle>
                  {sortable && (
                    <HeaderSortingContainer
                      align={align}
                      onClick={() => this.handleSortingClick(j)}
                    >
                      <Icon
                        name={sortingDirectionToIconName[j == index ? direction : 'none']}
                        color={Theme.palette.mediumGrey}
                        width="1.5rem"
                        height="1.5rem"
                      />
                    </HeaderSortingContainer>
                  )}
                  <HeaderLabel>{title}</HeaderLabel>
                  {sortable && <HeaderSortingGhost align={align} />}
                </HeaderCellTitle>
              </HeaderCell>
            ),
          )}
        </HeaderRow>
      </Header>
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
      compressedRows,
      noZebra,
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
      if (direction === 'asc') {
        sortedData = sortedData.sort(
          (a, b) =>
            -sortElementsInArray(colsDef[index].value(a.item), colsDef[index].value(b.item)),
        );
      }

      if (direction === 'desc') {
        sortedData = sortedData.sort((a, b) =>
          sortElementsInArray(colsDef[index].value(a.item), colsDef[index].value(b.item)),
        );
      }
    }

    return (
      <Body>
        {sortedData.map(({ key, item }, i) => (
          <BodyRow
            i={i}
            key={i}
            selectable={selectable}
            selected={selected === key}
            compressed={compressedRows}
            noZebra={noZebra}
            onClick={() => this.handleRowSelect(item, key)}
          >
            {colsDef.map(({ value, format, ...rest }, j) => (
              <BodyCell j={j} key={j} {...rest}>
                {format ? format(value(item, i), i) : value(item, i)}
              </BodyCell>
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
    const { width, header } = this.props;

    return (
      <Container {...{ width }}>
        {header === 'top' && this.renderHeader()}
        {this.renderBody()}
        {header === 'bottom' && this.renderHeader()}
      </Container>
    );
  }
}

export default Table;
