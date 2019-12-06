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
    firstCellWidth: 0,
    /** Checks if any object from data has a non-empty children value */
    hasFoldedRows: false,
    shadowSide: null,
    // Stores which column should be sorted.
    sort: initialSort,
    unfoldedRows: [],
  };

  rowHeaderRef = createRef();
  containerRef = createRef();
  bodyRef = createRef();

  componentDidMount() {
    const { isScrollable } = this.props;
    this.checkDataDepth();

    if (isScrollable) {
      this.setFirstCellWidth();
      addEventListener('resize', this.onResize);
      this.containerRef.current.addEventListener('scroll', this.onScroll);
    }
  }

  componentDidUpdate({ colsDef: prevColsDef, data: prevData }) {
    const { colsDef, data } = this.props;

    if (prevColsDef !== colsDef) {
      this.setState({ sort: initialSort });
    }
    if (prevData !== data) {
      this.checkDataDepth();
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
   * Handles click on a row
   *
   * @param {Object} item - The item of the row that was clicked.
   * @param {Number} key - The key of the row that was clicked.
   */
  handleRowClick = (item, key) => {
    const { hasFoldedRows, unfoldedRows } = this.state;
    const {
      rowsDef: { onClick },
    } = this.props;

    if (hasFoldedRows && item.children) {
      // row needs to be folded back
      if (unfoldedRows.includes(key)) {
        const unfoldedRowsNewState = unfoldedRows.filter(keyItem => keyItem !== key);
        this.setState({ unfoldedRows: unfoldedRowsNewState });
      } else {
        this.setState({ unfoldedRows: [...unfoldedRows, key] });
      }
    } else if (onClick && (!hasFoldedRows || typeof key === 'string')) {
      // row is a "leaf", i.e. at the latest level in the data
      onClick(item, key);
    }
  };

  /**
   * Checks if data has children and needs folding rows.
   * Helps us getting the proper callback for any row in handleRowClick
   *
   */
  checkDataDepth = () => {
    const { data } = this.props;
    const hasFoldedRows = data.find(d => d.children && d.children.length) !== undefined;
    this.setState({ hasFoldedRows });
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
      rowsDef: { onClick },
      striped,
      width,
    } = this.props;
    const {
      firstCellWidth,
      hasFoldedRows,
      shadowSide,
      sort: { index, direction },
      unfoldedRows,
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
      handleRowClick: this.handleRowClick,
      hasClickCallback: !!onClick,
      hasFoldedRows,
      index,
      isHoverable,
      isScrollable,
      striped,
      unfoldedRows,
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
   * On hover of a row, its background color changes, increasing contrast with others and improving readability.
   **/
  isHoverable: bool,

  /** Rows definition */
  rowsDef: shape({
    onClick: func,
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
    onClick: null,
  },
  striped: false,
  width: '100%',
};

export default Table;
