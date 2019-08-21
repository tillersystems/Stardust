import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';

/**
 * A Form Group shapes the layout of the form fields.
 * Fields can be inline or stacked, and their labels can in turn also be inline or stacked to their field.
 *
 */
const Group = ({ row, inlineLabels, labelsWidth, className, children }) => (
  <Container row={row} className={className} data-testid="form-group">
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        isRow: row,
        inlineLabel: inlineLabels,
        labelWidth: child.props.labelWidth || labelsWidth,
      }),
    )}
  </Container>
);

/**
 * PropTypes validations
 */
const { node, bool, string } = PropTypes;
Group.propTypes = {
  /**
   * Fields of the form, so should be instances of Form.Field component
   */
  children: node,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   *  If labels of fields are inlined or not
   */
  inlineLabels: bool,

  /**
   * Fallback for width of each field if not provided directly to the Fields
   */
  labelsWidth: string,

  /**
   * If the fields should be inline
   */
  row: bool,
};

/**
 * PropTypes default values
 */
Group.defaultProps = {
  children: null,
  className: '',
  inlineLabels: false,
  labelsWidth: '10rem',
  row: false,
};

export default Group;
