import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TableElement, ShadowContainer, ShadowWrapped } from './elements';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';

/** Lookup object for next sorting direction. */
const nextSortingDirection = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};

const initialSort = {
  // `index` is either `-1` if no column is to be sorted, or is the index of the column.
  index: -1,
  // `direction` is the direction of sorting and can be one of `none`, `asc` or `desc`.
  direction: 'none',
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
    sort: initialSort,

    // Stores selected row.
    // Use `-1` for no row selected.
    selected: -1,
    selectedRows: [],
    firstCellWidth: 0,
    shadowSide: null,
  };

  rowHeaderRef = createRef();
  containerRef = createRef();
  bodyRef = createRef();

  componentDidMount() {
    const { isScrollable } = this.props;
    if (isScrollable) {
      this.setFirstCellWidth();
      addEventListener('resize', this.onResize);
      this.containerRef.current.addEventListener('scroll', this.onScroll);
    }
  }

  componentDidUpdate({ colsDef: prevColsDef }) {
    const { colsDef } = this.props;
    if (prevColsDef !== colsDef) {
      this.setState({ sort: initialSort });
    }
    this.onResize();
  }

  componentWillUnmount() {
    removeEventListener('resize', this.onResize);
    this.containerRef.current.removeEventListener('scroll', this.onScroll);
  }

  onResize = () => {
    this.setFirstCellWidth();
    this.setContainerShadow();
  };

  onScroll = () => {
    this.setContainerShadow();
  };

  setFirstCellWidth = () => {
    const firstCellWidth =
      this.rowHeaderRef && this.rowHeaderRef.current && this.rowHeaderRef.current.offsetWidth;
    this.setState({ firstCellWidth });
  };

  setContainerShadow = () => {
    const containerRefRect = this.containerRef.current.getBoundingClientRect();
    const bodyRefRect = this.bodyRef.current.getBoundingClientRect();

    let shadowSide = 'both';
    if (
      containerRefRect.left === bodyRefRect.left &&
      containerRefRect.right === bodyRefRect.right
    ) {
      shadowSide = null;
    } else if (containerRefRect.left === bodyRefRect.left) {
      shadowSide = 'left';
    } else if (containerRefRect.right === bodyRefRect.right) {
      shadowSide = 'right';
    }
    this.setState({ shadowSide });
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
    const { selectedRows } = this.state;

    if (selectable) {
      this.setState({ selected: key }, () => {
        if (onSelect) onSelect(item, key);
      });
    }

    if (selectable || item.children) {
      if (selectedRows.includes(key)) {
        const selectedRowsState = selectedRows.filter(keyItem => keyItem !== key);
        this.setState({ selectedRows: selectedRowsState });
      } else {
        this.setState({ selectedRows: [...selectedRows, key] });
      }
    }
  };

  /**
   * Renders the component.
   *
   * @return {jsx}
   */
  render() {
    const {
      colsDef,
      data,
      dataTotal,
      height,
      isHoverable,
      isScrollable,
      rowsDef: { selectable },
      striped,
      width,
    } = this.props;
    const {
      selected,
      selectedRows,
      shadowSide,
      firstCellWidth,
      sort: { index, direction },
    } = this.state;

    const tableHeaderProps = {
      colsDef,
      isScrollable,
      index,
      direction,
      handleSortingClick: this.handleSortingClick,
      rowHeaderRef: this.rowHeaderRef,
    };

    const tableBodyProps = {
      bodyRef: this.bodyRef,
      colsDef,
      data,
      direction,
      handleRowSelect: this.handleRowSelect,
      index,
      isHoverable,
      isScrollable,
      selectable,
      selected,
      selectedRows,
      striped,
    };

    const tableFooterProps = {
      colsDef,
      dataTotal,
      isScrollable,
      isHoverable,
    };

    return (
      <ShadowWrapped containerHeight={height}>
        <ShadowContainer side={shadowSide} firstCellWidth={firstCellWidth} />
        <Container
          ref={this.containerRef}
          data-testid="table-container"
          containerHeight={height}
          isScrollable={isScrollable}
        >
          <TableElement width={isScrollable ? 'initial' : width} colsDef={colsDef}>
            <TableHeader {...tableHeaderProps} />
            <TableBody {...tableBodyProps} />
            <TableFooter {...tableFooterProps} />
          </TableElement>
        </Container>
      </ShadowWrapped>
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
