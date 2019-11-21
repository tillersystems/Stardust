import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import compare from '../helpers/compare';
import { Icon, Theme } from '..';
import { Body, BodyRow, RowHeader, ChildRow, TextEllipsis } from './elements';

const TableBody = ({
  bodyRef,
  colsDef,
  data,
  direction,
  handleRowSelect,
  index,
  isHoverable,
  isScrollable,
  selectable,
  selected,
  selectedRows,
  striped,
}) => {
  // We actually need to keep track of the original key for sorting purposes
  // and selection purposes (i.e. when the column is sorted, the selected row
  // should still be the same).
  const sortData = dataToSort => {
    let sortedData = dataToSort.map((item, key) => {
      return {
        key,
        item,
      };
    });

    if (index >= 0 && index < colsDef.length) {
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

    return sortedData;
  };

  // Rule:
  // first cell count 2 fractions of the table
  // normal cell count 1 fractions of the table
  // To calculate the cell width we need to know the column's number and add it one to take care of the first cell which take 2 fractions.
  return (
    <Body colsLength={colsDef.length + 1} ref={bodyRef}>
      {sortData(data).map(({ key, item }, index) => (
        <Fragment key={key}>
          <BodyRow
            key={key}
            data-testid="body-row"
            selectable={selectable}
            selected={selectedRows.includes(key)}
            striped={striped}
            onClick={() => handleRowSelect(item, key)}
            isHoverable={isHoverable}
            hasChildren={item.children}
          >
            {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
              isRowHeader ? (
                <RowHeader align={align} isScrollable={isScrollable} key={`row-header-${index}`}>
                  {item.children && (
                    <Icon
                      name={selectedRows.includes(key) ? 'chevron-down' : 'chevron-right'}
                      color={Theme.palette.darkBlue}
                      width="20px"
                      height="20px"
                    />
                  )}
                  <TextEllipsis>{value(item, index)}</TextEllipsis>
                </RowHeader>
              ) : (
                <td key={`row-${index}-column-${columnIndex}`} align={align}>
                  {format ? format(value(item, index), index) : value(item, index)}
                </td>
              ),
            )}
          </BodyRow>
          {selectedRows.includes(key) && (
            <>
              {item.children &&
                sortData(item.children).map(({ key: childrenKey, item: childrenItem }, index) => (
                  <ChildRow
                    key={`${key}-${childrenKey}`}
                    data-testid="body-row"
                    selected={selected === `${key}-${childrenKey}`}
                    selectable={selectable}
                    striped={striped}
                    onClick={() => handleRowSelect(item, `${key}-${childrenKey}`)}
                    isHoverable={isHoverable}
                  >
                    {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
                      isRowHeader ? (
                        <RowHeader
                          align={align}
                          isScrollable={isScrollable}
                          key={`row-header-${key}-${index}`}
                          isChild
                        >
                          <TextEllipsis>{value(childrenItem, index)}</TextEllipsis>
                        </RowHeader>
                      ) : (
                        <td key={`row-${index}-column-${key}-${columnIndex}`} align={align}>
                          {format
                            ? format(value(childrenItem, index), index)
                            : value(childrenItem, index)}
                        </td>
                      ),
                    )}
                  </ChildRow>
                ))}
            </>
          )}
        </Fragment>
      ))}
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
  handleRowSelect: func.isRequired,
  index: number,
  isHoverable: bool,
  isScrollable: bool,
  selectable: bool,
  selected: number.isRequired,
  selectedRows: array.isRequired,
  striped: bool,
};

/** Default props. */
TableBody.defaultProps = {
  direction: 'none',
  index: -1,
  isHoverable: false,
  isScrollable: false,
  selectable: false,
  striped: false,
};

export default React.memo(TableBody);
