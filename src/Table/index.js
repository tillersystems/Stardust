import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

import { Container, TableElement, ShadowContainer, ShadowWrapped } from './elements';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
/**
 * A Table displays structured data through rows and columns.
 * It can sort by column (asc, desc).
 *
 */
class Table extends PureComponent {
  /** Internal state. */
  state = {
    firstCellWidth: 0,
    shadowSide: null,
    // Stores which column should be sorted.
    sort: null,
    unfoldedRows: [],
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

  componentDidUpdate() {
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
  handleSortChange = sort => {
    const { onSortChange } = this.props;

    if (onSortChange) {
      onSortChange(sort);
    } else {
      this.setState({
        sort,
      });
    }
  };

  /**
   * Handles click on a row
   *
   * @param {Object} item - The item of the row that was clicked.
   * @param {Number} key - The key of the row that was clicked.
   */
  handleRowClick = (item, key) => {
    const { unfoldedRows } = this.state;
    const {
      rowsDef: { onClick },
    } = this.props;

    if (item.children) {
      // row needs to be folded back
      if (unfoldedRows.includes(key)) {
        const unfoldedRowsNewState = unfoldedRows.filter(keyItem => !keyItem.startsWith(key));
        this.setState({ unfoldedRows: unfoldedRowsNewState });
      } else {
        this.setState({ unfoldedRows: [...unfoldedRows, key] });
      }
    } else if (onClick) {
      // row is a "leaf", i.e. at the latest level in the data
      onClick(item, key);
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
      rowsDef: { onClick },
      sort: sortProps,
      striped,
      width,
    } = this.props;

    const { firstCellWidth, shadowSide, sort: sortState, unfoldedRows } = this.state;

    const sort = sortProps || sortState;

    const tableHeaderProps = {
      colsDef,
      isScrollable,
      onSortChange: this.handleSortChange,
      rowHeaderRef: this.rowHeaderRef,
      sort,
    };

    const tableBodyProps = {
      bodyRef: this.bodyRef,
      colsDef,
      data,
      handleRowClick: this.handleRowClick,
      hasClickCallback: !!onClick,
      isHoverable,
      isScrollable,
      sort,
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
      defaultSortOrder: oneOf(['asc', 'desc']),
      isRowHeader: bool,
      sortBy: func,
      format: func,
      isSortable: bool,
      name: string.isRequired,
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

  /**
   * Enable controller sort of table
   */
  onSortChange: func,

  /** Rows definition */
  rowsDef: shape({
    onClick: func,
  }),

  sort: shape({ column: string, order: oneOf(['asc', 'desc']) }),

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
  onSortChange: null,
  rowsDef: {
    onClick: null,
  },
  sort: null,
  striped: false,
  width: '100%',
};

export default Table;
