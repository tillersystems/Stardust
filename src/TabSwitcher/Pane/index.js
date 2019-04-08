import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container } from './elements';

const { node, string } = PropTypes;

/**
 * A pane wraps the content displayable by a tab
 *
 * @param {node} children // Anything that can be rendered: numbers, strings, elements or an array (or fragment)
 * @param {string} className // className needed by styled components
 *
 * @return {jsx}
 */

const Pane = ({ children, className }) => <Container className={className}>{children}</Container>;

/** Prop types. */
Pane.propTypes = {
  children: node,
  className: string,
};

/** Default props. */
Pane.defaultProps = {
  children: null,
  className: '',
};

export default memo(Pane);
