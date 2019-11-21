import React from 'react';
import PropTypes from 'prop-types';

import { Footer } from './elements';

const TableFooter = ({ colsDef, dataTotal, isScrollable, isHoverable }) => {
  if (!dataTotal) return null;
  return (
    <Footer data-testid="footer-row" isScrollable={isScrollable} isHoverable={isHoverable}>
      <tr>
        {colsDef.map(({ isRowHeader, total, format, align }, columnIndex) =>
          isRowHeader ? (
            <th scope="row" key={`total-header-${columnIndex}`} align={align}>
              {format ? format(total(dataTotal)) : total(dataTotal)}
            </th>
          ) : (
            <td key={`total-${columnIndex}`} align={align}>
              {format ? format(total(dataTotal)) : total(dataTotal)}
            </td>
          ),
        )}
      </tr>
    </Footer>
  );
};

const { object, arrayOf, bool, func, node, number, oneOf, oneOfType, shape, string } = PropTypes;

/** Prop types. */
TableFooter.propTypes = {
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
  dataTotal: object,
  isHoverable: bool,
  isScrollable: bool,
};

/** Default props. */
TableFooter.defaultProps = {
  dataTotal: null,
  isHoverable: false,
  isScrollable: false,
};

export default React.memo(TableFooter);
