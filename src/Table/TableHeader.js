import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Theme } from '..';
import { THeader, Row, TableHeaderCell, HeaderLabel } from './elements';

const TableHeader = ({
  colsDef,
  isScrollable,
  index,
  direction,
  handleSortingClick,
  rowHeaderRef,
}) => {
  /** Lookup object for icon name from sorting direction. */
  const sortingDirectionToIconName = {
    none: 'carets-vertical',
    asc: 'caret-up',
    desc: 'caret-down',
  };

  return (
    <THeader>
      <Row>
        {colsDef.map(({ title, isSortable, align, isRowHeader }, columnIndex) => (
          <TableHeaderCell
            ref={isRowHeader ? rowHeaderRef : null}
            isScrollable={isScrollable}
            isSortable={isSortable}
            isRowHeader={isRowHeader}
            scope="col"
            key={`${title}-${columnIndex}`}
            align={align}
            onClick={() => (isSortable ? handleSortingClick(columnIndex) : undefined)}
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
    </THeader>
  );
};
const { arrayOf, bool, func, node, number, object, oneOf, oneOfType, shape, string } = PropTypes;

/** Prop types. */
TableHeader.propTypes = {
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
  direction: string,
  handleSortingClick: func.isRequired,
  index: number,
  isScrollable: bool,
  rowHeaderRef: object.isRequired,
};

/** Default props. */
TableHeader.defaultProps = {
  direction: 'none',
  index: -1,
  isScrollable: false,
};

export default React.memo(TableHeader);
