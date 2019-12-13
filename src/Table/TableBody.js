import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import compare from '../helpers/compare';
import { Icon, Theme } from '..';
import { Body, BodyRow, RowHeader, RowHeaderContent, ChildRow, TextEllipsis } from './elements';

const TableBody = ({
  bodyRef,
  colsDef,
  data,
  direction,
  handleRowClick,
  hasClickCallback,
  hasFoldedRows,
  index,
  isHoverable,
  isScrollable,
  striped,
  unfoldedRows,
}) => {
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
      {sortData(data).map(({ key, item }, rowIndex) => (
        <Fragment key={rowIndex}>
          <BodyRow
            key={rowIndex}
            data-testid="body-row"
            hasPointerCursor={item.children || (!hasFoldedRows && hasClickCallback)}
            isHoverable={isHoverable}
            isUnfolded={unfoldedRows.includes(key)}
            name={unfoldedRows.includes(key) ? 'chevron-down' : 'chevron-right'}
            onClick={() => handleRowClick(item, key)}
            striped={striped}
          >
            {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
              isRowHeader ? (
                <RowHeader align={align} isScrollable={isScrollable} key={`row-header-${rowIndex}`}>
                  <RowHeaderContent>
                    {item.children && (
                      <Icon
                        name={unfoldedRows.includes(key) ? 'chevron-down' : 'chevron-right'}
                        color={Theme.palette.darkBlue}
                        width="20px"
                        height="20px"
                      />
                    )}
                    <TextEllipsis>{value(item, key)}</TextEllipsis>
                  </RowHeaderContent>
                </RowHeader>
              ) : (
                <td key={`row-${rowIndex}-column-${columnIndex}`} align={align}>
                  {format ? format(value(item, key), key) : value(item, key)}
                </td>
              ),
            )}
          </BodyRow>
          {unfoldedRows.includes(key) && (
            <>
              {item.children &&
                sortData(item.children).map(
                  ({ key: childrenKey, item: childrenItem }, childRowIndex) => (
                    <ChildRow
                      key={`${rowIndex}-${childRowIndex}`}
                      data-testid="body-row"
                      hasPointerCursor={hasClickCallback}
                      isHoverable={isHoverable}
                      onClick={() => handleRowClick(childrenItem, `${key}-${childrenKey}`)}
                      striped={striped}
                    >
                      {colsDef.map(({ isRowHeader, value, format, align }, columnIndex) =>
                        isRowHeader ? (
                          <RowHeader
                            align={align}
                            isScrollable={isScrollable}
                            key={`row-header-${rowIndex}-${childRowIndex}`}
                            isChild
                          >
                            <RowHeaderContent>
                              <TextEllipsis>
                                {value(childrenItem, `${key}-${childrenKey}`)}
                              </TextEllipsis>
                            </RowHeaderContent>
                          </RowHeader>
                        ) : (
                          <td
                            key={`row-${rowIndex}-${childRowIndex}-column-${columnIndex}`}
                            align={align}
                          >
                            {format
                              ? format(
                                  value(childrenItem, `${key}-${childrenKey}`),
                                  `${key}-${childrenKey}`,
                                )
                              : value(childrenItem, `${key}-${childrenKey}`)}
                          </td>
                        ),
                      )}
                    </ChildRow>
                  ),
                )}
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
  handleRowClick: func.isRequired,
  hasClickCallback: bool.isRequired,
  hasFoldedRows: bool.isRequired,
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
