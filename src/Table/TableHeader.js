import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Theme } from '..';
import { THeader, Row, TableHeaderCell, HeaderLabel } from './elements';

/** Lookup object for icon name from sorting direction. */
const SORT_ORDER_ICON_NAME = {
  none: 'carets-vertical',
  asc: 'caret-up',
  desc: 'caret-down',
};

const TableHeader = ({ colsDef, onSortChange, isScrollable, rowHeaderRef, sort }) => {
  const handleSortChange = (column, defaultSortOrder = 'asc') => {
    const nextSort = defaultSortOrder === 'asc' ? 'desc' : 'asc';
    if (column) {
      if (sort && sort.column === column && sort.order === defaultSortOrder) {
        onSortChange({ column, order: nextSort });
      } else if (sort && sort.column === column && sort.order === nextSort) {
        onSortChange(null);
      } else {
        onSortChange({ column, order: defaultSortOrder });
      }
    }
  };

  return (
    <THeader>
      <Row>
        {colsDef.map(({ name, title, isSortable, defaultSortOrder, align, isRowHeader }) => (
          <TableHeaderCell
            ref={isRowHeader ? rowHeaderRef : null}
            isScrollable={isScrollable}
            isSortable={isSortable}
            isRowHeader={isRowHeader}
            scope="col"
            key={`${name}`}
            align={align}
            onClick={() =>
              isSortable && name ? handleSortChange(name, defaultSortOrder) : undefined
            }
          >
            <HeaderLabel>{title}</HeaderLabel>
            {isSortable && (
              <Icon
                name={SORT_ORDER_ICON_NAME[(sort && sort.column === name && sort.order) || 'none']}
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
  onSortChange: func.isRequired,
  isScrollable: bool,
  rowHeaderRef: object.isRequired,
  sort: shape({ column: string, order: oneOf(['asc', 'desc']) }),
};

/** Default props. */
TableHeader.defaultProps = {
  isScrollable: false,
  sort: null,
};

export default React.memo(TableHeader);
