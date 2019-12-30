import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';

import { flattenDataWith, sortDataBy, isRoot } from './helpers';
import { Body, RowHeader, RowHeaderContent, Row, TextEllipsis } from './elements';

const TableBody = ({
  bodyRef,
  colsDef,
  data,
  handleRowClick,
  hasClickCallback,
  isHoverable,
  isScrollable,
  sort,
  striped,
  unfoldedRows,
}) => {
  const sortBy = useCallback(sortDataBy(colsDef, sort), [colsDef, sort]);
  const flatten = useCallback(flattenDataWith(sortBy), [sortBy]);

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
              {colsDef.map(({ name, isRowHeader, value, format, align }) =>
                isRowHeader ? (
                  <RowHeader
                    align={align}
                    isScrollable={isScrollable}
                    key={`${key}-${name}`}
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
                  <td key={`${key}-${name}`} align={align}>
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
  handleRowClick: func.isRequired,
  hasClickCallback: bool.isRequired,
  isHoverable: bool,
  isScrollable: bool,
  sort: shape({ column: string, order: oneOf(['asc', 'desc']) }),
  striped: bool,
  unfoldedRows: array.isRequired,
};

/** Default props. */
TableBody.defaultProps = {
  isHoverable: false,
  isScrollable: false,
  sort: null,
  striped: false,
};

export default React.memo(TableBody);
