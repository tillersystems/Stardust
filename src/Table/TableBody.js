import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';

import { flattenDataWith, sortDataBy, isRoot } from './helpers';
import { Body, RowHeader, RowHeaderContent, Row, TextEllipsis } from './elements';

const TableBody = ({
  bodyRef,
  colsDef,
  data,
  direction,
  handleRowClick,
  hasClickCallback,
  index,
  isHoverable,
  isScrollable,
  striped,
  unfoldedRows,
}) => {
  const sort = useCallback(sortDataBy(colsDef, index, direction), [colsDef, index, direction]);
  const flatten = useCallback(flattenDataWith(sort), [sort]);

  const flatData = useMemo(() => flatten(data), [flatten, data]);

  return (
    <Body colsLength={colsDef.length + 1} ref={bodyRef}>
      {flatData.map(
        ({ depth, key, item, parent }) =>
          (isRoot(parent) || unfoldedRows.includes(parent)) && (
            <Row
              key={key}
              data-testid="body-row"
              isClickable={item.children || hasClickCallback}
              isHoverable={isHoverable}
              isUnfolded={unfoldedRows.includes(key)}
              onClick={() => handleRowClick(item, key)}
              striped={striped}
              depth={depth}
            >
              {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
                isRowHeader ? (
                  <RowHeader
                    align={align}
                    isScrollable={isScrollable}
                    key={`${key}-${columnIndex}`}
                    hasChildren={!!item.children}
                  >
                    <RowHeaderContent>
                      {item.children && (
                        <Icon
                          name={unfoldedRows.includes(key) ? 'chevron-down' : 'chevron-right'}
                          color={Theme.palette.darkBlue}
                        />
                      )}
                      <TextEllipsis>
                        {format ? format(value(item, key), key) : value(item, key)}
                      </TextEllipsis>
                    </RowHeaderContent>
                  </RowHeader>
                ) : (
                  <td key={`${key}-${columnIndex}`} align={align}>
                    {format ? format(value(item, key), key) : value(item, key)}
                  </td>
                ),
              )}
            </Row>
          ),
      )}
    </Body>
  );
};

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
TableBody.propTypes = {
  bodyRef: object.isRequired,
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
  data: array.isRequired,
  direction: string,
  handleRowClick: func.isRequired,
  hasClickCallback: bool.isRequired,
  index: number,
  isHoverable: bool,
  isScrollable: bool,
  striped: bool,
  unfoldedRows: array.isRequired,
};

/** Default props. */
TableBody.defaultProps = {
  direction: 'none',
  index: -1,
  isHoverable: false,
  isScrollable: false,
  striped: false,
};

export default React.memo(TableBody);
