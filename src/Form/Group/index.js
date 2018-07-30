import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';

/**
 * This component is a form group
 * It will decide the organization of all fields
 */
const Group = ({ row, inlineLabels, labelsWidth, className, children }) => (
  <Container row={row} className={className}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        isRow: row,
        inlineLabel: inlineLabels,
        labelWidth: labelsWidth,
      }),
    )}
  </Container>
);

/**
 * PropTypes validations
 */
const { node, bool, string } = PropTypes;
Group.propTypes = {
  row: bool,
  inlineLabels: bool,
  labelsWidth: string,
  className: string,
  children: node,
};

/**
 * PropTypes default values
 */
Group.defaultProps = {
  row: false,
  inlineLabels: false,
  labelsWidth: '10rem',
  className: '',
  children: null,
};

export default Group;
